
const SocketHooks = module.exports;
const socketAdmin = require.main.require('./src/socket.io/admin');
socketAdmin.plugins.debugHook = {};

const sockets = require.main.require('./src/socket.io');
const plugins = require.main.require('./src/plugins');

async function filterHook(hookData) {
	if (hookData && hookData.caller && hookData.caller.uid) {
		let message = '';
		try {
			message = JSON.stringify(hookData.params, null, 4);
		} catch (err) {
			message = `${hookData.hook}: ${err.message}`;
		}
		sockets.in(`uid_${hookData.caller.uid}`).emit(
			'admin:hooks:filterfire', {
				hook: hookData.hook,
				message: message,
			}
		);
	}
	return hookData;
}

socketAdmin.plugins.debugHook.start = async function (socket, data) {
	plugins.hooks.unregister('core', 'filter:plugins.firehook', filterHook);
	plugins.hooks.register('core', {
		hook: 'filter:plugins.firehook',
		method: filterHook,
	});
};

socketAdmin.plugins.debugHook.stop = async function (socket, data) {
	plugins.hooks.unregister('core', 'filter:plugins.firehook', filterHook);
};
