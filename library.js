'use strict';

const controllers = require('./lib/controllers');

const routeHelpers = require.main.require('./src/routes/helpers');

const plugin = module.exports;

require('./lib/sockets');

plugin.init = async (params) => {
	const { router /* , middleware , controllers */ } = params;
	routeHelpers.setupAdminPageRoute(router, '/admin/plugins/debug-hook', [], controllers.renderAdminPage);
};


plugin.addAdminNavigation = (header) => {
	header.plugins.push({
		route: '/plugins/debug-hook',
		icon: 'fa-tint',
		name: 'Debug Hook',
	});

	return header;
};

