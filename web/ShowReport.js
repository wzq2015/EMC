var reportItemList = [];
var reportType = undefined;

$(function() {
	var info = new EiInfo();
	info.set("f_emcprojectId", currentProjectId);
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
		if (i < 10)
			data.push({'text':i.toString()+'月', 'value':'0' + i});
		else
			data.push({'text':i.toString()+'月', 'value':i});
		}
	
	$('#selectQuarterMonth').combobox('loadData', data);
	$('#selectQuarterMonth').combobox('select', '01');
}

function getTimeCondition(timeSpan) {
	if (reportType == '1') {
		var value = $('#selectYear').combobox('getValue');
		timeSpan.fromTime = value + '-01-01 00:00:00';
		timeSpan.toTime = value + '-12-31' + ' 23:59:59';
		timeSpan.year = value;
	}
	else if (reportType == '2') {
		var yearValue = $('#selectYear').combobox('getValue');
		var quarterValue = $('#selectQuarterMonth').combobox('getValue');
		timeSpan.year = yearValue;
		timeSpan.quarter = quarterValue;
		if (quarterValue == 1) {
			timeSpan.fromTime = yearValue + '-01-01 00:00:00';
			timeSpan.toTime = yearValue + '-03-31 23:59:59';
		} 
		else if (quarterValue == 2) {
			timeSpan.fromTime = yearValue + '-04-01 00:00:00';
			timeSpan.toTime = yearValue + '-06-30 23:59:59';
		} 
		else if (quarterValue == 3) {
			timeSpan.fromTime = yearValue + '-07-01 00:00:00';
			timeSpan.toTime = yearValue + '-09-30 23:59:59';
		} 
		else {
			timeSpan.fromTime = yearValue + '-10-01 00:00:00';
			timeSpan.toTime = yearValue + '-12-31 23:59:59';
		}
	}
	else if (reportType == '3') {
		var yearValue = $('#selectYear').combobox('getValue');
		var monthValue = $('#selectQuarterMonth').combobox('getValue');
		timeSpan.year = yearValue;
		timeSpan.month = monthValue;
		timeSpan.fromTime = yearValue + '-' + monthValue + '-01 00:00:00';
		timeSpan.toTime = yearValue + '-' + monthValue + '-' + getDaysInMonth(yearValue, monthValue) + ' 23:59:59';
	}
	else if (reportType == '4') {
		var dayValue = $('#dateSelectDay').datebox('getValue');
		timeSpan.day = dayValue;
		timeSpan.fromTime = dayValue + ' 00:00:00';
		timeSpan.toTime = dayValue + ' 23:59:59';
	}
}

function getDaysInMonth(year, month) {
	month = parseInt(month, 10);
    var temp = new Date(year, month, 0);
    return temp.getDate();
}

function doSearch() {
	var reportTemplatePath = getReportTemplatePath();
	if (reportTemplatePath == undefined) {
		$.messager.alert('警告','请选择报表名称');
		return;
	}
	
	if (reportType == '0') {
		var cycleIndex = $('#selectCycleIndex').combobox('getValue');
		var info = new EiInfo();
		var queryObj = {};
		queryObj.f_emcprojectId = currentProjectId;
		queryObj.f_emcproject_cycle_index = cycleIndex;
		info.set('TemplateName', reportTemplatePath);
		info.set('QueryString', JSON.stringify(queryObj));
		EiCommunicator.send("CMIMReportGenerator", 'queryReport', info, onSearchCallback);
	}
	else {
		var info = new EiInfo();
		var timeSpan = { fromTime:'', toTime:'', year:'', quarter:'', month:'', day:'' };
		getTimeCondition(timeSpan);
		var queryObj = {};
		queryObj.starttime = timeSpan.fromTime;
		queryObj.endtime = timeSpan.toTime;
		queryObj.year = timeSpan.year;
		queryObj.quarter = timeSpan.quarter;
		queryObj.month = timeSpan.month;
		queryObj.day = timeSpan.day;
		queryObj.f_emcprojectId = currentProjectId;
		info.set('TemplateName', reportTemplatePath);
		info.set('QueryString', JSON.stringify(queryObj));
		EiCommunicator.send("CMIMReportGenerator", 'queryReport', info, onSearchCallback);
	}
}

function getReportTemplatePath() {
	var reportTemplatePath = undefined;
	var reportId = $('#selectReport').combobox('getValue');
	for (var i=0; i<reportItemList.length; i++) {
		if (reportItemList[i].id == reportId) {
			return reportItemList[i].path;
		}
	}
	return undefined;
}

var strHtmlFilename;
var xlsFileName;

onSearchCallback = {              
	onSuccess : function(eiInfo) {
		if (eiInfo.get("errorcode") == "-1") {
			$.messager.alert('错误','生成报表失败');
		}
		
		strHtmlFilename = eiInfo.get('TempHtmlFileName');
		xlsFileName = eiInfo.get('TempXlsFileName');
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

function doDownloadXls() {
	if (xlsFileName != '') {
		//var a = window.open(xlsFileName, 'self', 'toolbar=no,status=no,menubar=no,scrollbars=no,resizable=no');
		window.open(xlsFileName);
	}
}