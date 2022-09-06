'use strict';

define('admin/plugins/debug-hook', function () {
	const Hooks = {};
	Hooks.init = function () {
		$('#hookStart').on('click', function () {
			socket.emit('admin.plugins.hooks.start', {});
		});
		$('#hookStop').on('click', function () {
			socket.emit('admin.plugins.hooks.stop', {});
			$('#hookOutput').text('');
		});
		socket.on('admin:hooks:filterfire', function (data) {
			if (data.hook === $('#currentHook').val()) {
				$('#hookOutput').text(data.message + '\n\n' + $('#hookOutput').text());
			}
		});
	};
	return Hooks;
});