'use strict';

module.exports = (appInfo) => {
	const config = (exports = {});

	// use for cookie sign key, should change to your own and keep security
	config.keys = appInfo.name + '_1527303358866_2984';

	// add your config here
	config.middleware = [];

	// view configs
	config.view = {
		defaultViewEngine: 'nunjucks',
		mapping: {
			'.tpl': 'nunjucks'
		}
	};

	// kamilic-site-server 的根目录
	config.appRoot = "/home/kamilic-site-server";
	
	// kamilic-site 的根目录
	config.siteRoot = "/home/kamilic-site";

	return config;
};
