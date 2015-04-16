var portalId = null;


efform_onload = function() {
	//去掉右上角的三个小图标
	document.getElementById("iplat_helpImage_id").style.visibility="hidden";
	document.getElementById("iplat_printImage_id").style.visibility="hidden";
	document.getElementById("iplat_pageClose_id").style.visibility="hidden";
	//
	info = _getEi();

	var themaBlock = info.getBlock("result");
	if (themaBlock.getRows().length > 0) {
		var html = "<center><table>";
         html+="<br><br>";
		for (i = 0; i < themaBlock.getRows().length; i++) {
			if(themaBlock.getCell(i, "themaImag")==" " || themaBlock.getCell(i, "themaImag")==""){
				html = html + "<tr><div align='center'><img height='150' width='250' id='image' src='./EV/images/chacha.jpg'/></div></tr>";
			}else{
			html = html + "<tr><img height='200' width='500' id='image' src='"
					+ "./"+themaBlock.getCell(i, "themaImag") + "'/></tr>";
			}
			html = html
					+ "<tr><div align=center><input type='radio' name='template' id='"
					+ themaBlock.getCell(i, "themaId") + "'/>";
			html = html + "&nbsp;" + themaBlock.getCell(i, "themaName")
					+ "</div></tr>";
			html+="<br>";
		}

		html = html + "</table></center>";
		
		var node = document.getElementById("tag");
		node.innerHTML = html;
		themaId = info.get("themaId");

		if (themaId != null && themaId.trim() != "") {
			if (document.getElementById(themaId) != null) {
				document.getElementById(themaId).checked = true;
			}
		}
	} else {
		alert("系统中未配置任何模板!");
	}
}

//	点击保存按钮触发函数
button_update_onclick = function() {
	var templateId = null;
	var template = document.getElementsByName("template");

	for ( var i = 0; i < template.length; i++) {
		if (template[i].checked) {
			templateId = template[i].id;
			break;
		}
	}

	if (templateId != null && templateId.trim() != "") {
		var inInfo = new EiInfo();
		inInfo.set("templateId", templateId);
		inInfo.set("portalId", document.getElementById("portalId").value);

		EiCommunicator.send("EV10", "save", inInfo, callback);
	} else {
		alert("未选中任何模板!");
	}
}

//	回调函数
var callback = {
	onSuccess : function(eiInfo) {
		alert("修改成功!");
		 window.close();
	},
	onFail : function(eMsg) {
		alert("failure");
		 window.close();
	}
}