'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;

  router.get('/', controller.home.index);

  router.get('/tools/publish', controller.tools['publish-project']);
  router.get('/tools/publish-status', controller.tools['publish-status']);
};
