
efform_onload = function ()
{
 efregion.show("ef_region_result")
}
/*
  点击查询按钮后调用后台的service
*/
button_query_onclick = function () 
{
	
	var TimeStart=ef.get("inqu_status-0-TimeStart").value;
	var TimeEnd=ef.get("inqu_status-0-TimeEnd").value;
    if (TimeStart!=""&&TimeEnd!=""){
	    if (TimeStart > TimeEnd){
		    alert("开始日期,截止日期录入有误，请重新输入！");
		    ef.get("inqu_status-0-TimeStart").value="";
		    ef.get("inqu_status-0-TimeEnd").value="";
		    return ;
	   }
   }
    efgrid.submitInqu( "ef_grid_result", "ec","ECSA01","query");
}
button_export_onclick = function () 
{
     efgrid.submitInqu( "ef_grid_result", "ed","EDFA01","export");
    //  efbutton.setButtonStatus("export", true);
}
//日历控件的操作
efcalendar_click = function (control_source, id) {
  var node = ef.getNodeById(id);
  efcalendar(control_source, node, 'yyyymmdd', true);
}
/*
  文章数目超链接
*/
efgrid_onDataCellClick = function( ef_grid_result, row_index, col_index, cell_value ) {

     var grid=efgrid.getGridObject("ef_grid_result");
     var value=grid.getCellValue(row_index,0,TYPE_DATA); 
     var columnEname = grid.getColumn(0, TYPE_DATA).getEname();
 
     var TimeStart=ef.get("inqu_status-0-TimeStart").value;
     var TimeEnd=ef.get("inqu_status-0-TimeEnd").value;
         
 if (columnEname=="creator"){
      var childWindow = efform.openNewForm('ECSA07', "serviceName=ECSA07&methodName=query&inqu_status-0-creator=" + value+"&inqu_status-0-TimeStart="+TimeStart+"&inqu_status-0-TimeEnd="+TimeEnd);
      childWindow.focus();
    }
      
}
function openChart(){
	if(document.getElementById("isPicture").checked){
		//图形化展示
		document.getElementById("tdCount").style.display="block";
		document.getElementById("ef_region_chart").style.display="block";
		showCondition();
	}else{
		document.getElementById("tdCount").style.display="none";
		document.getElementById("ef_region_chart").style.display="none";
		document.getElementById("count").value="5";	
	}
}

function showCondition(){
		//3D饼状图调用后台数据
		var chartType = "Pie3D";
		var data="1";
		var showValue=document.getElementById("isPicture").checked;
		if(showValue){
			showValue="1";
		}else{
			showValue="0";
		}
		var bgcolor="4DB39E"//"A25E79";
		var plotcolor="22B8DD";
		
		var TimeStart = ef.get("inqu_status-0-TimeStart").value;
		var TimeEnd = ef.get("inqu_status-0-TimeEnd").value;
		
		var number = ef.get("count").value;
		var patrn=/^[1-9]\d*$/; 
		if(!patrn.exec(number)){
			alert("只能输入正整数!");
			return false;
		}
	
		ef.get("chart").src="DispatchAction.do?efFormEname=ECSA0101&chartType="+chartType+"&data="+data+"&showValues="+showValue+"&bgcolor="+bgcolor+"&plotcolor="+plotcolor
		+"&TimeStart="+TimeStart+"&TimeEnd="+TimeEnd+"&number="+number;
}
