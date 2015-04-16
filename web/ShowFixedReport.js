var reportItemList = [];
var reportType = undefined;

$(function() {
	var info = new EiInfo();
	info.set("f_emcprojectId", currentProjectId);
	info.set("f_reportTemplateAutogenerate", "1");
	EiCommunicator.send("CMIMReportTemplate", 'queryReportTemplateByProjectId', info, queryReportTemplateCallback);
});

queryReportTemplateCallback = {
	onSuccess : function(eiInfo) {
		if (eiInfo.get("errorcode") == "-1") {
			$.messager.alert('错误','获取报表模板信息失败');
			return;
		}
		var resultBlock = eiInfo.blocks.result;
		var metas = resultBlock.meta.metas;
		var data = [];
		for (var i=0; i<resultBlock.rows.length; i++) {
			var row = resultBlock.rows[i];
			var reportItem = {};
			reportItem.id = row[metas.f_reportTemplateId.pos];
			reportItem.type = row[metas.f_reportTemplateType.pos];
			reportItem.name = row[metas.f_reportTemplateName.pos];
			reportItem.desc = row[metas.f_reportTemplateDesc.pos];
			reportItem.path = row[metas.f_reportTemplatePath.pos];
			reportItemList.push(reportItem);
		}
		initReportTypeCombo();
	},
	onFail : function(eMsg) {
		$.messager.alert('错误','获取报表模板信息失败');
	}
}

function initReportTypeCombo() {
	var data = [];
	data.push({'text':'分享周期', 'value':'0'});
	data.push({'text':'年报', 'value':'1'});
	data.push({'text':'季报', 'value':'2'});
	data.push({'text':'月报', 'value':'3'});
	data.push({'text':'日报', 'value':'4'});
	$('#selectReportType').combobox('loadData', data);
	$('#selectReportType').combobox({
		onSelect: function(record) {
			var data = [];
			reportType = record.value;
			for (var i=0; i<reportItemList.length; i++) {
				if (reportItemList[i].type == reportType) {
					data.push({'text':reportItemList[i].name, 'value':reportItemList[i].id, 'type':reportItemList[i].type});
				}
			}
			$('#selectReport').combobox('loadData', data);
			if (data.length > 0) {
				$('#selectReport').combobox('select', data[0].value);
			}
			else {
				$('#selectReport').combobox('clear');
			}
			if (reportType == '0') {
				$('#divSelectCycleIndex')[0].style.display = '';
				$('#divSelectYear')[0].style.display = 'none';
				$('#divSelectQuarterMonth')[0].style.display = 'none';
				$('#divSelectDay')[0].style.display = 'none';
				var info = new EiInfo();
		    	info.set("f_emcprojectId", currentProjectId);
				EiCommunicator.send("CMIMEmcproject", "queryEmcprojectById", info, queryProjectCallback);
			}
			else if (reportType == '1') {
				$('#divSelectCycleIndex')[0].style.display = 'none';
				$('#divSelectYear')[0].style.display = '';
				$('#divSelectQuarterMonth')[0].style.display = 'none';
				$('#divSelectDay')[0].style.display = 'none';
				initYearCombo();
			}
			else if (reportType == '2') {
				$('#divSelectCycleIndex')[0].style.display = 'none';
				$('#divSelectYear')[0].style.display = '';
				$('#divSelectQuarterMonth')[0].style.display = '';
				$('#divSelectDay')[0].style.display = 'none';
				$('#divSelectQuarterMonth').val('选择季度');
				initYearCombo();
				initQuarterCombo();
			}
			else if (reportType == '3') {
				$('#divSelectCycleIndex')[0].style.display = 'none';
				$('#divSelectYear')[0].style.display = '';
				$('#divSelectQuarterMonth')[0].style.display = '';
				$('#divSelectDay')[0].style.display = 'none';
				$('#divSelectQuarterMonth').val('选择月份');
				initYearCombo();
				initMonthCombo();
			}
			else if (reportType == '4') {
				$('#divSelectCycleIndex')[0].style.display = 'none';
				$('#divSelectYear')[0].style.display = 'none';
				$('#divSelectQuarterMonth')[0].style.display = 'none';
				$('#divSelectDay')[0].style.display = '';
			}
		}
	});
	$('#selectReportType').combobox('select', '0');
}

queryProjectCallback = {
	onSuccess : function(eiInfo) {
		if (eiInfo.get("errorcode") == "-1") {
			$.messager.alert('错误','获取项目信息失败');
			return;
		}
		var resultBlock = eiInfo.blocks.result;
		var metas = resultBlock.meta.metas;
		if (resultBlock.rows.length != 1) {
			return;
		}
	    var row = resultBlock.rows[0];
	    var totalCycleNo = parseInt(row[metas.f_emcprojectTotalcyclenumber.pos]);
	    var data = [];
		for (var i = 1; i<totalCycleNo + 1; i++) {			
			data.push({'text':i, 'value': i });
			$('#selectCycleIndex').combobox('loadData', data);
		}
		$('#selectCycleIndex').combobox('select', '1');
	},
	onFail : function(eMsg) {
		$.messager.alert('错误','获取项目信息失败');
	}
}

function initYearCombo() {
	var myDate = new Date();
	var data = [];
	for (var i = myDate.getFullYear(); i >= 2010; --i) {
		data.push({'text':i.toString()+'年', 'value':i.toString()});
	}
		
	$('#selectYear').combobox('loadData', data);
	$('#selectYear').combobox('select', myDate.getFullYear().toString());
}

function initQuarterCombo() {
	var data = [];
	for (var i = 1; i <= 4; ++i) {
		data.push({'text':'第'+i.toString()+'季度', 'value':i.toString()});
	}
	$('#selectQuarterMonth').combobox('loadData', data);
	$('#selectQuarterMonth').combobox('select', '1');
}

function initMonthCombo() {
	var data = []; 
	for (var i = 1; i <= 12; ++i) {
		data.push({'text':i.toString()+'月', 'value':i});
	}
	
	$('#selectQuarterMonth').combobox('loadData', data);
	$('#selectQuarterMonth').combobox('select', '1');
}

function doSearch() {
	var reportId = $('#selectReport').combobox('getValue');
	if (reportId == '') {
		$.messager.alert('提示','请选择报表名称');
		return;
	}
		
	if (reportType == '0') {
		var cycleIndex = $('#selectCycleIndex').combobox('getValue');
		if (cycleIndex == '') {
			$.messager.alert('提示','请选择结算周期');
			return;
		}
		var info = new EiInfo();
		info.set("reportType", reportType);
		info.set("f_reportTemplateId", reportId);
		info.set("f_reportFixedperiodGeneratedCycleindex", cycleIndex);
		EiCommunicator.send("CMIMReportGenerated", 'queryGeneratedReport', info, queryReportCallback);
	}
	else if (reportType == "1") {
		var year = $('#selectYear').combobox('getValue');
		if (year == '') {
			$.messager.alert('提示','请选择年份');
			return;
		}
		var info = new EiInfo();
		info.set("reportType", reportType);
		info.set('f_reportTemplateId', reportId);
		info.set('f_reportFixedperiodGeneratedYear', year);
		EiCommunicator.send("CMIMReportGenerated", 'queryGeneratedReport', info, queryReportCallback);
	}
	else if ((reportType == "2") || (reportType == "3")) {
		var year = $('#selectYear').combobox('getValue');
		if (year == '') {
			$.messager.alert('提示','请选择年份');
			return;
		}
		var quarterMonth = $('#selectQuarterMonth').combobox('getValue');
		if (quarterMonth == '') {
			$.messager.alert('提示','请选择季度或月份');
			return;
		}
		var info = new EiInfo();
		info.set("reportType", reportType);
		info.set('f_reportTemplateId', reportId);
		info.set('f_reportFixedperiodGeneratedYear', $('#selectYear').combobox('getValue'));
		info.set('f_reportFixedperiodGeneratedIndex', $('#selectQuarterMonth').combobox('getValue'));
		EiCommunicator.send("CMIMReportGenerated", 'queryGeneratedReport', info, queryReportCallback);
	}
	else if (reportType == "4") {
		var selectDay = $('#dateSelectDay').combobox('getValue');
		if (selectDay == '') {
			$.messager.alert('提示','请选择日期');
			return;
		}
		var index = selectDay.indexOf('-');
		var year = selectDay.substring(0, index);
		var day = selectDay.substring(index + 1);
		var info = new EiInfo();
		info.set("reportType", reportType);
		info.set('f_reportTemplateId', reportId);
		info.set('f_reportFixedperiodGeneratedYear', year);
		info.set('f_reportFixedperiodGeneratedIndex', day);
		EiCommunicator.send("CMIMReportGenerated", 'queryGeneratedReport', info, queryReportCallback);
	}
}

var strHtmlFilename = undefined;

queryReportCallback = {
	onSuccess : function(eiInfo) {
		if (eiInfo.get("errorcode") == "-1") {
			$.messager.alert('错误','查询报表失败');
		}
		
		strHtmlFilename = eiInfo.get('HtmlFileName');
		if (strHtmlFilename != '') {
			document.getElementById('reportFrame').src = strHtmlFilename;
		}
	},
	onFail : function(eMsg) {
		$.messager.alert('错误','生成报表失败');
	}
}

function doDownload() {
	if (strHtmlFilename != '') {
		var a = window.open(strHtmlFilename, '_blank', 'toolbar=no,status=no,menubar=no,scrollbars=no,resizable=no');
	}
}