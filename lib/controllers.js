'use strict';

const Controllers = module.exports;

const plugins = require.main.require('./src/plugins');

Controllers.renderAdminPage = function (req, res) {
	const hooks = Object.keys(plugins.loadedHooks).map(
		key => ({ hookName: key })
	);

	hooks.sort((a, b) => a.hookName.toLowerCase().localeCompare(b.hookName.toLowerCase()));
	res.render('admin/plugins/debug-hook', {
		hooks: hooks,
	});
};

module.exports = Controllers;
