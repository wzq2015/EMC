/**
 * efResource构造函数
 * @class efresource对象
 * @constructor
 */
efresource = function() {
	this.international=true;
	this.resource={};
	this.prototype= new Object();
}

efresource.prototype.setResource = function(resource) {
	this.resource=resource;
}

efresource.prototype.get = function(key){
	return this.resource[key];
}
	
efresource.prototype.set = function(key,value){
	this.resource[key]=value;
}
	
efresource.prototype.getInternationalValue = function (key,defaultvalue) {
	var value=this.get(key);
	if(value!=undefined){
		return value;
	}
	var info = new EiInfo();
	info.set("interkey",key);
	info.set("defaultvalue",defaultvalue);
  	EiCommunicator.send("ED11", "getI18nMessages" , info, resourcecallback,false);
}

efresource.prototype.getInternationalValues = function (keys) {
	var info = new EiInfo();
	info.set("keys",keys);
  	EiCommunicator.send("ED11", "getMultiResources" , info, multicallback, false);
}

var resource = new efresource();

resourcecallback={
  	onSuccess: 
    	function(eiInfo){
    		var key=eiInfo.get("interkey");	
     		var value=eiInfo.get("value");
     		resource.set(key,value);
    	},
  	onFail:
    	function(eMsg) {
    	}
}

multicallback = {
	  	onSuccess: 
	    	function(eiInfo){
	  			var i18n = eiInfo.getBlock("i18nResources").getAttr();
	     		for(var key in i18n) {
	     			resource.set(key,i18n[key]);
	     		}
	    	},
	  	onFail:
	    	function(eMsg) {
	    	}
}

//resource.getInternationalValues("ef.Add;ef.AddRow;ef.Ascending;ef.AssignNode;ef.Button;ef.ButtonForbid;ef.ButtonNoAuthority;ef.ButtonNoEvent;ef.CalendarClear;ef.CalendarClose;ef.CalendarDay;ef.CalendarFriday;ef.CalendarMon;ef.CalendarMonth;ef.CalendarMonthInvalid;ef.CalendarSat;ef.CalendarSun;ef.CalendarThurs;ef.CalendarToday;ef.CalendarTues;ef.CalendarWed;ef.CalendarWeek;ef.CalendarYear;ef.CalendarYearInvalid;ef.CallFailed;ef.CanNotConvertJsonString;ef.Choose;ef.ClearRegionData;ef.Col;ef.Confirm;ef.CreatePKFailed;ef.CreateTask;ef.CreateTrigger;ef.CreateUserFailed;ef.DataByte;ef.DataCheckError;ef.DataColumn;ef.DataMax;ef.DataMin;ef.DeleteOrganization;ef.Descending;ef.Detail;ef.DynamicQueryParameterError;ef.EditTriggerFailed;ef.EndTimeEarlierThanCurrentTime;ef.EnterCorrectUserID;ef.Error;ef.ExportExcel;ef.ExportExcelfromModel;ef.Fail;ef.FinishRunButton;ef.FixColumn;ef.FormNotDefine;ef.FormNotDefineAndInvalid;ef.From;ef.GetButtonInformationError;ef.GetPageInformationError;ef.GridAscend;ef.GridCanPersonal;ef.GridColumnEname;ef.GridColumnName;ef.GridColumnWidth;ef.GridConfig;ef.GridDescend;ef.GridDetail;ef.GridDivNotFound;ef.GridFixColumn;ef.GridInit;ef.GridRefresh;ef.GridRowsCopy;ef.GridSave;ef.GridSubTotal;ef.GridSumTotal;ef.GridVisibleColumn;ef.IllegalImportation;ef.ImportDataFail;ef.InvalidReason;ef.JumpPage;ef.Loading;ef.NoPermissiontoImport;ef.NoPermissiontoResetPassword;ef.NotNull;ef.NotSelect;ef.OK;ef.OrganizationPathNotValid;ef.OrganizationsLabeEmpty;ef.OrganizationsNotExist;ef.PageInformation;ef.ParamInvalid;ef.ParameterDefinitionNotCorrect;ef.ParameterNotComplete;ef.ParameterNotExist;ef.QueryConditions;ef.RecordSet;ef.Row;ef.RunButton;ef.RunRegionClear;ef.RunRegionFold;ef.Save;ef.Select");

/**
 * 当参数为1个时，第一个参数为资源信息键
 * 当参数为2个时，第一个参数为资源信息键，第二个为默认值
 * 当参数为3个时，第一个参数为资源信息键，第二个参数为替换占位符的数组数据，第三个为默认值
 */
getI18nMessages = function() {

	if (arguments.length > 0 && arguments.length < 3) {
		var key = arguments[0];
		var defaultvalue = arguments[1];
		if (defaultvalue == undefined) {
			defaultvalue = "";
		}
		if (efresource.config != undefined
				&& efresource.config.INTERNATIONAL != undefined
				&& efresource.config.INTERNATIONAL == "true") {
			resource.getInternationalValue(key, defaultvalue);
			return resource.get(key);
		}
		// 在没有开启平台国际化开关时直接返回默认值
		else {
			return defaultvalue;
		}
	} else if (arguments.length == 3) {
		var key = arguments[0];
		var args = arguments[1];
		var defaultvalue = arguments[2];
		if (defaultvalue == undefined) {
			defaultvalue = "";
		}
		if (efresource.config != undefined
				&& efresource.config.INTERNATIONAL != undefined
				&& efresource.config.INTERNATIONAL == "true") {
			resource.getInternationalValue(key, defaultvalue);
			return replaceParams(resource.get(key),args);
		}
		// 在没有开启平台国际化开关时直接返回默认值
		else {
			return defaultvalue;
		}
	} else {
		alert("Incorrect arguments in getI18nMessages()");
	}
}

function replaceParams(string, replacements) {
    return string.replace(/\{(\d+)\}/g, function() {
        return replacements[arguments[1]];
    });
}