'use strict';

module.exports = (appInfo) => {
	const config = (exports = {});

	// kamilic-site-server 的根目录
	config.appRoot = "/home/kamilic-site-server";
	
	// kamilic-site 的根目录
	config.siteRoot = "/home/kamilic-site";

	// token
	config.token = process.env.build_token;

	return config;
};
