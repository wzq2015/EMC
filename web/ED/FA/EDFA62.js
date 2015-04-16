$(document).ready ( function() {
	
	$('#styleEname').change( function() { 
	  var styleNow = $(this).children('option:selected').val(); 
		openForm("EE10", "__forceUIStyle=" + styleNow);
		
		efform.setStatus(1,  "正在载入用户自定义风格[" + styleNow + "]...");
	});
	     
});

iFrameLoaded = function() {
	efform.setStatus(0,  "完成载入用户自定义风格!");
};

function efform_onload() {
	var iframe = $("#ef_tab_y iframe")[0];
	if (iframe.attachEvent) {
		iframe.attachEvent("onload", iFrameLoaded);
	} else {
		iframe.onload = iFrameLoaded;
	}
	openForm("EE10");
	efform.setStatus(0,  "载入用户自定义风格完成！");
}

button_f2_onclick = function() {
	
	document.getElementById("methodName").value="save";
	document.forms[0].submit();
	
		//cookie.setCookie('iplat4j_UIStyle',$('#styleEname')[0].value);
};	

function openForm(form_ename, form_load_var) {
    
	try {
		var iframe = $("#ef_tab_y iframe")[0];
		var iframeSrc =  CONTEXT_PATH + "/DispatchAction.do?efFormEname=" + form_ename;
		if (typeof(form_load_var) !== 'undefined')  iframeSrc += '&' + form_load_var;
		
		iframe.src = iframeSrc ;
	} catch (ex) {
	}

}