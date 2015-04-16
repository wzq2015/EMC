efform_onload = function ()
{
     //创建 进度窗口
     evcm01_modalWin  = new EFModalWindow('evcm01_progressWindow');
     evcm01_isShow = false;
}
//点击查询按钮时候出发函数
button_query_onclick = function () {
	if(efvalidateDiv("ef_region_inqu")){
		efgrid.submitInqu( "ef_grid_result", "EVCM","EVCM07","query");
    }
}

efgrid_onCellDisplayReady = function( div_node_html, row_index, col_index, col_value_c, display_value, grid_id )
{
      if(grid_id=="ef_grid_result"){
      var grid = efgrid.getGridObject( "ef_grid_result" );
      var columnEname = grid.getColumn(col_index, TYPE_DATA).getEname();
      var value=grid.getCellValue(row_index, 0, TYPE_DATA,true);
     if(columnEname=="edit"){ 
        return "\<input value='编辑' class='buttonclass' type='button' align='center' onclick='efgrid_onDataCellClick(\""+grid_id+"\",\""+row_index+"\",\""+col_index+"\",\""+value+"\")'>" ;
      }
      if(columnEname=="upload"){
      	return "\<input value='上传图片' class='buttonclass' type='button' align='center' onclick='efgrid_onDataCellClick(\""+grid_id+"\",\""+row_index+"\",\""+col_index+"\",\""+value+"\")'>" ;

      }
      }
}


//点击按钮查询布局列
efgrid_onDataCellClick = function( grid_id, row_index, col_index, value ) {
	if( grid_id == "ef_grid_result" ){
		var grid = efgrid.getGridObject("ef_grid_result");
		if(grid.rowStatus[row_index]==0 || grid.rowStatus[row_index]==2){
      	var columnEname = grid.getColumn(col_index, TYPE_DATA).getEname();
       	if(columnEname=='edit'){
       	   efform.openNewForm('EVCM0702', "serviceName=EVCM0702&methodName=query&layoutId=" + value);
       	}
       	if(columnEname=='upload'){
       	   ef.get("layoutId").value=value;
       	   efwindow.show(null,"upload","center");
       	}
		}else if(grid.rowStatus[row_index]==1 || grid.rowStatus[row_index]==3){
			alert("请先新增该记录，再进行相关操作!");
		}
	}

}

button_upload_onclick = function (){
	
	var layout_view = ef.get('layout_view').value;
	var layout_a=layout_view.split(".");
	var length=layout_a.length;
	var pic=".jpg,.png,gif";
	if(length==1||pic.indexOf(layout_a[length-1].toLowerCase())==-1){
		alert('请上传图片文件!');
		return false;
	}

	//调用导出进度标志
	evcm01_modalWin.showProgressBar();
	evcm01_isShow = true;
	var layoutId = ef.get("layoutId").value;
	ef.get("EVCM07").action = "./EV/CM/EVCM0710.jsp?layoutId="+layoutId;
	document.forms[0].submit();
	
}

function uploadcallBack(msg) {
        evcm01_modalWin.hide();
		efwindow.hide();
		ef.get("uploadIframe").src = "";
		alert(msg);
		window.location.href="../../DispatchAction.do?efFormEname=EVCM0700&methodName=initLoad";
   }

//----------------------------------------------添加布局数据验证 start------------------------------------
//判断是否包含非法字符：\'",<>+-*%^=!&|()[]{}:;~`#$
function isLegal(str,colName){
   
	var reg2 = /[\\\'\"\,\，\、\<\>\+\.\。\_\-\*\%\^\=\\\!\&\|\/\(\)\【\】\[\]\{\}\：\；\‘\’\”\“\:\;\~\`\#\$\?\？]+/g;
	var include2 = reg2.test(str);
	if(include2){
		window.alert( colName +"数据【 " + str + " 】只能输入英文字母、数字、中文字符");
		return false;
	}
}

//获得新输入的节点标示值 
function vlidateAddNodeId(grid,rows,colName){
	var gVFlag = true;
  	for(var i=0;i<rows.length;i++){
    	 var nodeValue = grid.getCellValue(rows[i] , 0, TYPE_DATA);
     	 var vldateFlag = isLegal(nodeValue,colName);
     	  if(vldateFlag == false){
     	     gVFlag = false;
     	     break;
     	  }
   }
    return gVFlag;
}

//验证【布局列记录】【列类型-百分比选项】【列数值】输入框 取值范围1-100
function validateColumnVa(columnName,colV){
    if(colV > 100 || colV < 1){
         alert("布局列名称是【 " + columnName + " 】的列数值取值范围为1-100");
     	 return false;
    }
}
//获取【布局列记录】【列类型-百分比选项】【列数值】输入的数据
function getColumnVa(grid,rows){
    var colFlagG = true;
    for(var i=0;i<rows.length;i++){
	      //获得布局列名称
	      var columnName = grid.getCellValue(rows[i] , 0, TYPE_DATA);
	      //获得[列选项-百分比选项值2]
	      var colType = grid.getCellValue(rows[i] ,  2, TYPE_DATA);
	      //获得[列数值]数据
	      var colValue = grid.getCellValue(rows[i] , 3, TYPE_DATA);
	      //若列选项选中了[百分比选项]
	      //调用验证方法
	       if(colType == 2){
	         var colFlagR = validateColumnVa(columnName,colValue);
	         if(colFlagR == false){
	         	colFlagG = false;
	         	break;
	         }
	       }
     }
     return colFlagG;
}


//添加[布局记录] 点击新增按钮的时候触发函数
button_insert_onclick = function () {
     //过滤特殊字符
	 var grid = efgrid.getGridObject("ef_grid_result");
	 var rows = grid.getCheckedRows();
	 var vFlag = vlidateAddNodeId(grid,rows,"布局名称");
	 if(!vFlag){
		return;
 	 }
	efgrid.submitForm( "ef_grid_result", "EVCM","EVCM07","insert",true);
}





//点击[布局记录]修改按钮
button_update_onclick = function () {
     //过滤特殊字符
	 var grid = efgrid.getGridObject("ef_grid_result");
	 var rows = grid.getCheckedRows();
	 var vFlag = vlidateAddNodeId(grid,rows,"布局名称");
	 if(!vFlag){
		 return;
	  }
	efgrid.submitForm( "ef_grid_result", "EVCM","EVCM07","update",true);
}


//点击删除按钮
button_delete_onclick = function () {
	var grid = efgrid.getGridObject( "ef_grid_result" );
	var count = grid.getCheckedRowCount();
	if(count==0){
		alert("请选择需要删除的数据！");
		return ;
	}
	efgrid.submitForm( "ef_grid_result", "EVCM","EVCM07","delete", true );
}

