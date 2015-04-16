efform_onload = function (){

}	

//渲染按钮
efgrid_onCellDisplayReady = function( div_node_html, row_index, col_index, col_value_c, display_value, grid_id )
{
      if(grid_id=="ef_grid_result"){
      	var grid = efgrid.getGridObject( "ef_grid_result" );
      	var columnEname = grid.getColumn(col_index, TYPE_DATA).getEname();
		var msgId=grid.getCellValue(row_index,0,TYPE_DATA,true);
		
      	if(columnEname=="option"){   
    		var optionButton= "\<input value='查  看' class='buttonclass' type='button' align='center' width='50' onclick='efgrid_detail_onclick(\""+row_index+"\",\""+msgId+"\")'>";
      		return optionButton;
      	}
      }
}
/*
	查询
*/
button_query_onclick = function(){
	efgrid.submitForm( "ef_grid_result", "EC","ECMM02","query",true);
}

/*
  点击明细按钮
*/
efgrid_detail_onclick = function(row_index,msgId)
{	
	//alert("msgId:"+msgId+"rowIndex:"+row_index);
	var inInfo = new EiInfo();
	inInfo.set("msgId",msgId);
	
	EiCommunicator.send( "ECMM02", "query" , inInfo , ajax_bindDetail_refresh);
}
/*
  绑定留言详细信息
*/
ajax_bindDetail_refresh = {
      onSuccess : function(eiInfo){	
        //显示留言类型
		document.getElementById("msgType").innerHTML = eiInfo.get("result-0-msgType");
		//隐藏域
		document.getElementById("msgId").value = eiInfo.get("result-0-msgId"); 
		efform.fillDiv("ef_region_message",eiInfo);
		efwindow.show(null,"message","center");
      },
      onFail: function(eMsg){
      	alert("failure");
      }
}

//验证处理信息
checkInfo = function(){
	var handleStatus = ef.get("result-0-handleStatus").value;
	if(handleStatus==""){
		alert("处理类型不能为空!");
		return false;
	}
	
	var handleOpinion = ef.get("result-0-handleOpinion").value;
	if(handleOpinion==""){
		alert("处理内容不能为空!");
		return false;
	}
	
	var handlePerson = ef.get("result-0-handlePerson").value;
	if(handlePerson==""){
		alert("处理人不能为空!");
		return false;
	}
	return true;
}

//保存
button_save_onclick=function(){
	if(checkInfo()==true){
		var info = new EiInfo();
		info.setByNode("ef_region_message");
		info.set("msgId",document.getElementById("msgId").value);
		EiCommunicator.send( "ECMM02", "saveMessage" , info , queryMsg);
	}
}

queryMsg = {
	onSuccess : function(eiInfo){
		var msg	= eiInfo.getMsg();
		alert(msg);
		if(eiInfo.getStatus()!=-1){
			efgrid.submitForm( "ef_grid_result", "EC","ECMM02","query",true);
		}else{
			alert("保存信息有误!");
		}
	},
	onFail: function(eMsg){
		alert("failure");
	}
}

//关闭按钮
button_close_onclick=function(){
	efwindow.hide();
}
