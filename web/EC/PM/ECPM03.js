efform_onload = function()
{
    var info = _getEi();
    ef.get("inqu_status-0-nodeId").value=info.get("nodeId");
    ef.get("inqu_status-0-nodeType").value=info.get("nodeType");
}

//渲染按钮
efgrid_onCellDisplayReady = function( div_node_html, row_index, col_index, col_value_c, display_value, grid_id )
{
	if(grid_id=="ef_grid_result"){
		var grid = efgrid.getGridObject( "ef_grid_result" );
		
		var columnEname = grid.getColumn(col_index, TYPE_DATA).getEname();
		if(columnEname=="edit"){   
			var optionButton= "<div align='center' efval=''>";
				optionButton += "<input value='查看' class='buttonclass' type='button' align='center' onclick='efgrid_onDataCellClick(\""+row_index+"\")'>" ;
				optionButton += "</div>" ;
				return optionButton;
		}
	}
}
//新增
button_insert_onclick = function(){
	var nodeId =  ef.get("inqu_status-0-nodeId").value;
	var nodeType = ef.get("inqu_status-0-nodeType").value;
	var bool = window.showModalDialog("./EC/PM/ECPM05.jsp?nodeId="+nodeId+"&nodeType="+nodeType,null,"dialogWidth:350px;dialogHeight:150px;");
	if(bool!=null&&bool=="true"){
		efgrid.submitForm( "ef_grid_result", "EC","ECPM03","query" ,true );
	}
}

//删除
button_delete_onclick = function (){
	var grid = efgrid.getGridObject( "ef_grid_result" );
    var rows=grid.getCheckedRows();
	if(rows.length==0){
		alert("请选中需要删除的记录!");
		return;
    }
   // if(rows.length>1){
    	//alert("请选中一条记录!");
		//return;
    //}
	var count=0;   
	if(confirm("确认删除吗?")){
		for(var i=0;i<rows.length;i++){
		    var info = new EiInfo();
		    var logoId = grid.getCellValue(rows[i],1,TYPE_DATA,true); 
		    info.set("logoId",logoId);
		    EiCommunicator.send( "ECPM03", "delete" , info, null );
		    if(ajaxEi!=null){
		    	if(ajaxEi.getStatus()=="-1"){
					alert(msg);
					return ;
				}else{
					//alert("删除记录成功!");
					//efgrid.submitForm( "ef_grid_result", "EC","ECPM03","query" ,true );
					count++;
				}
		    }
		}
		 
		if(count==rows.length){
			alert("删除记录成功!");
			efgrid.submitForm( "ef_grid_result", "EC","ECPM03","query" ,true ); 
		}
	}
}
//修改Logo序号
button_update_onclick = function (){
	var grid = efgrid.getGridObject( "ef_grid_result" );
    var rows=grid.getCheckedRows();
	if(rows.length==0){
		alert("请选中需要修改的记录!");
		return;
    }
    //if(rows.length>1){
    	//alert("请选中一条记录!");
		//return;
    //}
    var count=0;  
   	if(confirm("确认修改吗?")){ 
	    for(var i=0;i<rows.length;i++){
			var logoSeq = grid.getCellValue(rows[i],0,TYPE_DATA); 
			var logoId = grid.getCellValue(rows[i],1,TYPE_DATA,true); 
			var info = new EiInfo();
			info.set("logoSeq",logoSeq);
			info.set("logoId",logoId);
			EiCommunicator.send( "ECPM03", "update" , info, null );
			if(ajaxEi!=null){
				if(ajaxEi.getStatus()=="-1"){
					alert(msg);
					return;
				}else{
					count++;
				}
			}
		}
		if(count==rows.length){
			alert("修改记录成功!");
			efgrid.submitForm( "ef_grid_result", "EC","ECPM03","query" ,true ); 
		}
	}
}

//查看
efgrid_onDataCellClick=function(row_index)
{
	var grid=efgrid.getGridObject("ef_grid_result");
	var logoId = grid.getCellValue(row_index,1,TYPE_DATA,true);
	
	var info = new EiInfo();
	info.set("logoId",logoId);
	EiCommunicator.send( "ECPM03", "queryFileIdById" , info, ajax_forward_refresh ); 
}

ajax_forward_refresh = {
onSuccess :
   		function(eiInfo)
		{
			var fileId = eiInfo.get("fileId");
			left1=(screen.availWidth-400)/2 ;
			top1=(screen.availHeight-200)/2 ;
	
			var param1={"fileId":encodeURI(fileId)};
			param1=jQuery.param(param1); 
			window.open("./EC/PM/ECPM06.jsp?"+param1,"","left="+left1+",top="+top1+",width=800,height=600,resizable=yes,depend=yes");   
   		},
 	onFail:
   		function(eMsg)
		{
   			alert("操作失败，原因："+eMsg);
		}
};