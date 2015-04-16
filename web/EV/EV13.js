
efform_onload = function() {
	//去掉右上角的三个小图标
	document.getElementById("iplat_helpImage_id").style.visibility="hidden";
	document.getElementById("iplat_printImage_id").style.visibility="hidden";
	document.getElementById("iplat_pageClose_id").style.visibility="hidden";
	//
	var info = _getEi();
	update_grid_selection();
}

update_grid_selection = function() {
	var grid = efgrid.getGridObject("ef_grid_result");

	for (i = 0; i < grid.getRowCount(); i++) {
		var row = grid.getRowData(i);

		if (row["selected"] != null && row["selected"] == "true") {
			grid.setRowChecked(i, true);
		}
	}

	grid.refresh();
}

button_save_onclick = function() {
	var grid = efgrid.getGridObject("ef_grid_result");
	if(ef.get("portalId").value =="null"){
			alert("没有门户标识不允许操作！");
			return;
		}
	//efgrid.submitForm("ef_grid_result", "EV", "EV13", "save", true);
	var portalId = ef.get("portalId").value;
	var rows = grid.getCheckedRows();
	var tabId_checked = "";
	for( var i=0; i< rows.length;i++ ){
		var rowData = grid.getRowData(rows[i]);
      		var tabId = rowData.tabId;
      		tabId_checked = tabId_checked + tabId + ',';  	  	
	}
	var inInfo = new EiInfo();
	inInfo.set("tabId_checked", tabId_checked);
	inInfo.set("portalId", portalId);
	EiCommunicator.send("EV13", "save", inInfo,save_callback);
}

var save_callback = {
	onSuccess : function(eiInfo) {
		alert("保存成功");
		window.close();
	},
	onFail : function(eMsg) {
		alert("保存失败");
		window.close();
	}
}
