handleError = function(sMessage, sUrl, sLine) {
	return true;
};

window.onerror = handleError;

var iFrameLoadStatus = false;
var testFormInfoBlock;
var formLoopCount = 0;
var formLoopTestNow = 0;
var formTestCount = 0;
var formTestSum = 0;
var formOffset = 0;

var formLoadInfo = new Array();
var formEnameNow;

iFrameLoaded = function() {
	formLoadInfo[formTestCount].end_time = new Date().getTime().toString();
	formLoadInfo[formTestCount].load_time = (Number(formLoadInfo[formTestCount].end_time) - Number(formLoadInfo[formTestCount].start_time))
			.toString();
	formLoadInfo[formTestCount].load_result = "失败";

	var iframe = $("#ef_tab_y iframe")[0];
	try {
		var formStatus = iframe.contentWindow.efform.__loadSuccessFlag;
		if (formStatus) {
			formLoadInfo[formTestCount].load_result = "成功";
		}
	} catch (ex) {

	}

	formTestCount++;
	startNewTestForm();
};
startNewTestForm = function() {
	if (formLoopCount > 0) {
		if (formOffset == 0) {
			formTestSum = testFormInfoBlock.get("count");
		}
		if (formLoopTestNow < formLoopCount) {
			formEnameNow = testFormInfoBlock.getCell(formLoopTestNow,
					"form_ename");
			formLoadInfo[formTestCount] = new Object();
			formLoadInfo[formTestCount].form_ename = formEnameNow;
			formLoadInfo[formTestCount].form_cname = testFormInfoBlock.getCell(
					formLoopTestNow, "form_cname");
			formLoadInfo[formTestCount].start_time = new Date().getTime()
					.toString();

			efform.setStatus(0, "正在执行页面[" + formEnameNow + "]的测试["
					+ formTestCount + "/" + formTestSum + "]...");

			openDiagnoseForm(formEnameNow);
			formLoopTestNow++;
		} else {
			formOffset += formLoopCount;
			getNewFormBlock();
		}
	} else {
		efform.setStatus(0, "测试结束!");
		efform.getGrid("ef_grid_testResult").addRowData(formLoadInfo);
	}
};
getNewFormBlock = function() {
	var info = new EiInfo();
	info.setById("inqu_status-0-project_prefix");
	info.setById("inqu_status-0-form_ename");
	info.setByNameValue("inqu_status-0-form_type", "0");

	info.setByNameValue("result-offset", formOffset);
	info.setByNameValue("result-orderBy", "form_ename asc");
	if (formOffset == 0) {
		info.setByNameValue("result-showCount", true);
	}

	EiCommunicator.send("EDFA00", "query", info,
			button_execute_onclick_callback);
	
	
};

function customAlert() {
}

function efform_onload() {
	$("#ef_tab_y > br").filter(":first").css("display", "none");
	//$("#ef_tab_y > #jquery_tab_div_content").css("border", "0px");
	$("#ef_tab_y");

	var iframe = $("#ef_tab_y iframe")[0];
	iframe.onerror = handleError;
	iframe.contentWindow.alert = customAlert;

	if (iframe.attachEvent) {
		iframe.attachEvent("onload", iFrameLoaded);
	} else {
		iframe.onload = iFrameLoaded;
	}

	// alert("asdasd");
	// window.alert = function() {};
	// alert("sdddddd");
}

button_execute_onclick = function() {
	// formLoadInfo = new EiInfo();
	getNewFormBlock();

};

var button_execute_onclick_callback = {
	onSuccess : function(eiInfo) {
		testFormInfoBlock = eiInfo.getBlock("result");
		formLoopCount = testFormInfoBlock.getRows().length;
		formLoopTestNow = 0;
		startNewTestForm();
	},
	onFail : function(eMsg) {
		alert("failure");
	}
	//$("#id").
	
	
};

function openDiagnoseForm(form_ename) {
    
	try {
		var iframe = $("#ef_tab_y iframe")[0];
		iframe.contentWindow.alert = customAlert;
		iframe.src = CONTEXT_PATH + "/DispatchAction.do?efFormEname="
				+ form_ename + "&efRunAutoTestFlag=1";
		// + "/DispatchAction.do?efFormEname=" + "EDFA00";
		iframe.contentWindow.alert = customAlert;
	} catch (ex) {
	}

}