
/**
 * 根据EDFA70中的选择，自动填入gridId，并自动生成templateId
 * dialogArguments: 父页面window对象
 */
efform_onload = function (){
	ef.get("gridId").value = dialogArguments.ef.get("gridId").value;
	ef.get("templateId").value = "template_" + (new Date().getTime());
};

/**
 * 关闭对话框
 */
button_close_onclick = function(){
	window.close();
};

/**
 * 上传模板文件
 * 上传功能由EDFA70Upload.jsp完成
 */
button_upload_onclick = function() {

	var gridId = ef.get("gridId").value;
	var templateId = ef.get("templateId").value;
	var templateName = ef.get("templateName").value;

	templateName = templateName.trim();

	if (edfa7001_checkInput()) {			//暂时去除 && edfa7001_checkSize()
		document.forms[0].action += "&gridId=" + gridId + "&templateId="
				+ templateId + "&templateName=" + (encodeURI(templateName));
		document.forms[0].submit();
	}
};


/**
 * 文件上传前的各输入区域合法性检查
 */
edfa7001_checkInput = function() {

	var fileName = edfa7001_getFileName();
	if (fileName != false) {
		var fileLength = efutils.getTotalBytes(fileName);
		var templateName = ef.get("templateName").value;
		templateName = templateName.trim();
		var templateNameLength = efutils.getTotalBytes(templateName);

		if (fileLength > 255) {
			alert("文件名长度不能超过255个字符");
			return false;
		}
		if (templateNameLength == 0) {
			alert("模板名称不能为空");
			return false;
		}
		if (templateNameLength > 50) {
			alert("模板名称长度不能超过50个字符");
			return false;
		}
		if (!edfa7001_checkSuffix()){
			//由于有两种提示信息，因此将提示动作交由被调函数处理
			return false;
		}
		
		return true;
	} else {
		alert("文件路径不可为空");
		return false;
	}
};

/**
 * 文件上传前的大小判断 用到了ActiveX，待改进
 * 为防止在不同IE环境中可能存在的错误风险，暂去除该功能
 */
//edfa7001_checkSize = function() {
//	var filespec = document.getElementById("templateFilepath").value;
//	var fso, f;
//	var maxsize = 50 * 1024 * 1024;// 定义允许文件的大小，单位B
//	fso = new ActiveXObject("Scripting.FileSystemObject");
//
//	if (fso.FolderExists(filespec)) {
//		f = fso.GetFolder(filespec);
//	} else if (fso.FileExists(filespec)) {
//		f = fso.GetFile(filespec);
//	} else {
//		alert("该文件不存在！");
//		return false;
//	}
//	if (f.size > maxsize) {
//		alert("上传文件大小不可超过50M");
//		return false;
//	}
//	return true;
//};

/**
 * 判断上传文件后缀名是否正确
 */
edfa7001_checkSuffix = function() {
	var fileName = edfa7001_getFileName();
	if (fileName != false) {
		var index = fileName.lastIndexOf(".");
		var suffix = '';
		// 若该文件有后缀名
		if (index != -1 && index != fileName.length - 1) {
			suffix = fileName.substring(index + 1);
			suffix = suffix.toLowerCase();
		}
		if (suffix == "xls") {
			return true;
		} else {
			alert("请上传Excel文件(.xls)");
			return false;
		}

	} else {
		return false;
	}
};

/**
 * 获取文件名，不包含后缀部分
 */
edfa7001_getFileName = function() {
	var fileName = ef.get("templateFilepath").value;
	fileName = fileName.trim();
	if (fileName != '') {
		var index1 = fileName.lastIndexOf('/');
		var index2 = fileName.lastIndexOf('\\');
		var index = 0;
		if (index1 != -1)
			index = index1;
		if (index2 != -1 && index2 > index1)
			index = index2;
		if (index == 0) {
			alert("上传文件路径不正确");
			return false;
		} else{
			fileName = fileName.substring(index + 1);
		}
		return fileName;
	} else{
		return false;
	}
};

/**
 * 关闭对话框的回调函数
 */	
efform_onPopupReturn = function(winId, returnValue){		
	dialogArguments.edfa70_onDialogReturn();	     
	window.close();
};