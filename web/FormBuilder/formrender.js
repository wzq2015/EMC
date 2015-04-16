$(function() {
	__eiInfo.set('formData', window.opener.jsonFormData());
	EiCommunicator.send('EDMD91', 'renderForm', __eiInfo, {
		onSuccess : function(outInfo) {
			__eiInfo = outInfo;
			var html = outInfo.get('__html');
			__eiInfo.set("__html", null);
			$('#result').append($(html));
		},
		onFail : function(message) {
			alert(message);
		}
	}, false, false);

	/*
	efregion.showTitle="yes";
	efregion.buttonBarPosition="";
	*/
	var ef_region_result__buttonbar = new efbuttonbar();
	ef_region_result__buttonbar.buttonCount = 0;
	efregion.show("ef_region_result");
	ef_region_result__buttonbar.paint("ef_region_result__buttonbar");
});
