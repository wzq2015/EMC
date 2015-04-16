
var outlayoutid;
efform_onload = function(){
	//去掉右上角的三个小图标
	document.getElementById("iplat_helpImage_id").style.visibility="hidden";
	document.getElementById("iplat_printImage_id").style.visibility="hidden";
	document.getElementById("iplat_pageClose_id").style.visibility="hidden";
	//
}


//点击切换按钮
button_update_onclick = function () {
	if(!outlayoutid){
		alert("请选择布局");
		return;
	}
	var portalId = document.getElementById("portalId").value;
	if(!portalId||'null'==portalId){
		alert("找不到门户，不能切换");
		return;
	}
	var inInfo = new EiInfo();
	inInfo.set("personalTemplateLayout", outlayoutid);
	inInfo.set("portalId", portalId);
	document.getElementById("layoutId").value=outlayoutid;
	EiCommunicator.send("EV11", "save", inInfo,
			personalTemplateLayout_callback);
	return;
}

var personalTemplateLayout_callback = {
	onSuccess : function(eiInfo) {
		alert("修改成功!");
		 window.close();
	},
	onFail : function(eMsg) {
		alert("failure");
		 window.close();
	}
}

//点击radio按钮时�?
button_check_onclick = function (layoutId) {
	outlayoutid = layoutId;
}

//渲染单选按�?
efgrid_onCellDisplayReady = function( div_node_html, row_index, col_index, col_value_c, display_value, grid_id ){
	var inlayoutid = document.getElementById("layoutId").value;
	if(grid_id=="ef_grid_result"){
      	var grid = efgrid.getGridObject("ef_grid_result");
      	var columnEname = grid.getColumn(col_index, TYPE_DATA).getEname();
       	var rowData = grid.getRowData(row_index);
       	var value = rowData.layoutId;
      	if(columnEname=="radio"){ 
      		if(inlayoutid==value){
      			outlayoutid = value;
      			return "<div align='center' efval=''><input name='change' checked type='radio' align='center' onclick='button_check_onclick(\""+value+"\")'></div>";
      		}else{
      			return "<div align='center' efval=''><input name='change' type='radio' align='center' onclick='button_check_onclick(\""+value+"\")'></div>";
      		} 		
      	}
    }
}