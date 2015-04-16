efform_onload = function() {
	efregion.show("ef_region_all");
};

efUpload_CallBack = function() {
	alert('上传加载回调');
	return true;
};

function saveFileInfo(){
    var eiInfo = new EiInfo();
    eiInfo.setByNameValue("docId",ef.get("all-0-documentId").value);
    EiCommunicator.send( "EUAF05", "saveFileInfo", eiInfo, null, false,true );
}

/*
$(document).ready(function() {
	btn_click = function() {
		$.fn.setDocumentId("221");
	};
});
*/