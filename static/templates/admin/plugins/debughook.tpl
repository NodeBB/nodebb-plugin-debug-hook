<div class="row">
	<div class="col-lg-3">
		<select id="currentHook" class="form-control">
			<option value="">Select Hook to display data</option>
			{{{ each hooks }}}
			<option value="{hooks.hookName}">{hooks.hookName}</option>
			{{{ end }}}
		</select>
	</div>
	<div class="col-lg-3">
		<button id="hookStart" class="btn btn-primary">Start</button>
		<button id="hookStop" class="btn btn-danger">Stop</button>
	</div>
</div>
<div class="row">
	<div class="col-lg-12">
		<pre id="hookOutput"></pre>
	</div>
</div>