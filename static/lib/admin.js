'use strict';

define('admin/plugins/debug-hook', ['alerts'], function (alerts) {
	const Hooks = {};
	Hooks.init = function () {
		$('#hookStart').on('click', function () {
			socket.emit('admin.plugins.debugHook.start', {}, function (err) {
				if (err) {
					return alerts.error(err);
				}
				$('#hookStart').addClass('hidden');
				$('#hookStop').removeClass('hidden');
			});
		});
		$('#hookStop').on('click', function () {
			socket.emit('admin.plugins.debugHook.stop', {}, function (err) {
				if (err) {
					return alerts.error(err);
				}
				$('#hookStart').removeClass('hidden');
				$('#hookStop').addClass('hidden');
				$('#hookOutput').text('');
			});
		});
		socket.on('admin:hooks:filterfire', function (data) {
			if (data.hook === $('#currentHook').val()) {
				$('#hookOutput').text(
					data.hook + ':\n' +
					data.message + '\n\n' + $('#hookOutput').text()
				);
			}
		});
	};
	return Hooks;
});
