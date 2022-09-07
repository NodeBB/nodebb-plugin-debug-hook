<div class="row">
	<div class="col-lg-12">
		<p class="help-block">Select the hook you want to track from the dropdown and click start. Once the hook is triggered by you the resulting data will be printed below.</p>
		<p>Too see which plugins are listening for different hooks consult the <a href="{config.relative_path}/admin/advanced/hooks">hooks</a> page.</p>
	</div>
</div>
<div class="row">
	<div class="col-lg-4">
		<select id="availableHooks" class="form-control">
			<option value="">Select Hook</option>
			{{{ each hooks }}}
			<option value="{hooks.hookName}">{hooks.hookName}</option>
			{{{ end }}}
		</select>
	</div>
	<div class="col-lg-4">
		<input type="text" id="activeHook" class="form-control" >
	</div>
	<div class="col-lg-3">
		<button id="hookStart" class="btn btn-primary {{{ if enabled }}} hidden {{{ end }}}">Start</button>
		<button id="hookStop" class="btn btn-danger {{{ if !enabled }}} hidden {{{ end }}}">Stop</button>
	</div>
</div>
<hr/>
<div class="row">
	<div class="col-lg-12">
		<pre id="hookOutput"></pre>
	</div>
</div>