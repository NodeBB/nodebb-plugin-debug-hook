'use strict';

const plugins = require.main.require('./src/plugins');
const sockets = require.main.require('./src/socket.io');
const routeHelpers = require.main.require('./src/routes/helpers');
const socketAdmin = require.main.require('./src/socket.io/admin');
socketAdmin.plugins.debugHook = {};

const plugin = module.exports;

const uids = {};
const offlineCutoff = 1000 * 60 * 15; // 15minutes

plugin.init = async (params) => {
	const { router /* , middleware , controllers */ } = params;
	routeHelpers.setupAdminPageRoute(router, '/admin/plugins/debug-hook', [], renderAdminPage);
};

function renderAdminPage (req, res) {
	const hooks = Object.keys(plugins.loadedHooks).map(
		key => ({ hookName: key })
	);

	hooks.sort((a, b) => a.hookName.toLowerCase().localeCompare(b.hookName.toLowerCase()));
	res.render('admin/plugins/debug-hook', {
		hooks: hooks,
		enabled: uids[req.uid] > Date.now() - offlineCutoff,
	});
};


plugin.addAdminNavigation = (header) => {
	header.plugins.push({
		route: '/plugins/debug-hook',
		icon: 'fa-tint',
		name: 'Debug Hook',
	});

	return header;
};

plugin.filterPluginsFireHook = async (hookData) => {
	if (hookData && hookData.caller && hookData.caller.uid) {
		const { uid } = hookData.caller;
		if (!uids[uid] || uids[uid] < Date.now() - offlineCutoff) {
			return hookData;
		}
		let message = '';
		if (hookData.params.hasOwnProperty('req')) {
			hookData.params.req = undefined;
		}
		if (hookData.params.hasOwnProperty('res')) {
			hookData.params.res = undefined;
		}
		try {
			message = JSON.stringify(hookData.params, null, 4);
		} catch (err) {
			message = `${err.message}`;
		}
		sockets.in(`uid_${uid}`).emit(
			'admin:hooks:filterfire', {
				hook: hookData.hook,
				message: message,
			}
		);
	}
	return hookData;
};

socketAdmin.plugins.debugHook.start = async function (socket) {
	uids[socket.uid] = Date.now();
};

socketAdmin.plugins.debugHook.stop = async function (socket) {
	delete uids[socket.uid];
};