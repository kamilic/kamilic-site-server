'use strict';

module.exports = (appInfo) => {
	const config = (exports = {});

	// kamilic-site-server 的根目录
	config.appRoot = "/mnt/c/Users/xx/Documents/xx-doc/Projects/lab/kamilic-site-server/";
	
	// kamilic-site 的根目录
	config.siteRoot = "/mnt/c/Users/xx/Documents/xx-doc/Projects/lab/kamilic-site/";

	// token
	config.token = "test";

	return config;
};
