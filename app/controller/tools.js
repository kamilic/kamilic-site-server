'use strict';

const Controller = require('egg').Controller;

class ToolsController extends Controller {
	async ['publish-project'](ctx) {
		switch (ctx.accepts('html', 'json')) {
			case 'html':
				{
					this.service.tools.publish(this.ctx.query.repoKey);
					ctx.response.redirect("/tools/publish-status");
				}
				break;

			case 'json':
				{
					let { code, msg } = await this.service.tools.publish(this.ctx.query.repoKey);
					ctx.response.type = 'application/json';
					ctx.body = JSON.parse({ code, msg });
				}
				break;
		}
	}

	async ['publish-status'](ctx) {
		let { code, msg } = await this.service.tools.checkPublishStatus();

		switch (ctx.request.accepts('html', 'json')) {
			case 'html':
				{
					await this.ctx.render('tools/publish-project.tpl', { msg, code });
				}
				break;

			case 'json':
				{
					ctx.response.type = 'application/json';
					ctx.body = JSON.stringify({ code, msg });
				}
				break;
		}
	}
}

module.exports = ToolsController;
