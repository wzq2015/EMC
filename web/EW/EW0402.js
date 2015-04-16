$(function() {
	dynform_init($('#formDiv'));
	$('#tempStore').click(function() {
		var info = dynform_eiinfo();
		EiCommunicator.send('EW0402', 'save', info, {
			onSuccess : function(outInfo) {
				alert("已暂存!");
			},
			onFail : function(message) {
				alert(message);
			}
		}, false, false);
	});
	
	$('#save').click(function() {
		if (!efvalidateForm($('#EW0402').get(0))){
			return;
		}
		var info = dynform_eiinfo();
		info.set("comment", editor.getContent());
		if($('#returnTo').attr('checked')=='checked'){
		info.set("historyActivity", $('#historyActivity').val());
		EiCommunicator.send('EW0402', 'returnsTo', info, {
			onSuccess : function(outInfo) {
				$('#tempStore').hide();
				$('#save').hide();				
				alert("提交成功!");
			},
			onFail : function(message) {
				alert(message);
			}
		}, false, false);
		}
		if($('#nextStep').attr('checked')=='checked'){		
		info.set("transition", $('#transition').val());
		EiCommunicator.send('EW0402', 'submit', info, {
			onSuccess : function(outInfo) {
				$('#tempStore').hide();
				$('#save').hide();				
				alert("提交成功!");
			},
			onFail : function(message) {
				alert(message);
			}
		}, false, false);
		}
		
	});
	
});
