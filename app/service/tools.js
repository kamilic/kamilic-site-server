const Service = require('egg').Service;
const fs = require('fs-extra');
const path = require('path');
const shelljs = require('shelljs');
const moment = require('moment');
const runningStatus = {
	runningTime: 0,
	isRunning: false,
	msg: '',
	lastTimeMessage: ''
};

function resetRunningStatus() {
	runningStatus.runningTime = 0;
	runningStatus.isRunning = false;
	runningStatus.lastTimeMessage = runningStatus.msg;
	runningStatus.msg = '';
}

/**
 * @param {String} repoKey - repo.json 中的 repoKey，用于拉取相应的 git 仓库
 * @param {String} path - 脚本文件的路径 
 */
function runPullRepoScripts(repoKey, path) {
	if (runningStatus.isRunning === false) {
		runningStatus.isRunning = true;
		runningStatus.runningTime = moment();
		return new Promise((res, rej) => {
			let child = shelljs.exec(
				`node ${path} --repoKey=${repoKey} --single`,
				{ async: true },
				(code, stdout, stderr) => {
					if (code === 0) {
						res({
							code: ToolsService.CODE_SUCCESS,
							msg: stdout
						});
					} else {
						let parsedError = new Error(/Error:\s(.*?)\n/g.exec(stderr)[1]);
						rej(parsedError);
					}
					resetRunningStatus();
				}
			);

			child.stdout.on('data', (data) => {
				runningStatus.msg += data;
			});

			child.stderr.on('data', (data) => {
				runningStatus.msg += data;
			});
		});
	}
}

class ToolsService extends Service {
	async publish(repoKey) {
		if (repoKey === undefined) {
			return Promise.reject(new Error('请提供 repoKey'));
		}

		if (runningStatus.isRunning === true) {
			return {
				code: ToolsService.CODE_RUNNING
			};
		}

		let { config } = this;
		let siteRepoPath = config.siteRoot;
		let repoJsonPath = path.join(siteRepoPath, '/configs/git-repos/repo.json');
		let pullRepoPath = path.join(siteRepoPath, '/scripts/pull-repo.js');

		let isRepoConfigsExist = await fs.exists(repoJsonPath, 'r');
		let isPullRepoScriptExist = await fs.exists(pullRepoPath, 'r');

		let fulfillRequirement = isRepoConfigsExist && isPullRepoScriptExist;

		if (fulfillRequirement) {
			return runPullRepoScripts(repoKey, pullRepoPath);
		} else {
			return Promise.reject(new Error('在 kamilic-site 项目中，发布项目代码所依赖的代码不存在，请重新拉取 kamilic-site'));
		}
	}

	async checkPublishStatus() {
		if (runningStatus.isRunning) {
			return {
				code: ToolsService.CODE_RUNNING,
				msg: `更新程序目前正在运行中...
				 这是程序运行后 ${moment().diff(runningStatus.runningTime, 'seconds')} 秒的输出结果:
				${runningStatus.msg}
				上次拉取的结果：
				${runningStatus.lastTimeMessage}`
			};
		} else {
			return {
				code: ToolsService.CODE_PENDING,
				msg: `最近一次拉取的结果：
				${runningStatus.lastTimeMessage}`
			};
		}
	}
}

ToolsService.CODE_SUCCESS = 0;
ToolsService.CODE_RUNNING = 1;
ToolsService.CODE_PENDING = 2;
ToolsService.CODE_ERROR = 3;

module.exports = ToolsService;
