
queryimg_onClick=function(clickIndex)
{
  if(clickIndex=="0"){
    ef_region_inqu2.style.display="";
    ef_region_inqu.style.display="none";
    ef.get("dyQueryFlag").value = "1";


  }else if(clickIndex=="1"){
    ef_region_inqu2.style.display="none";
    ef_region_inqu.style.display="";
    ef.get("dyQueryFlag").value = "";

  }else if(clickIndex=="2"){
   ef_region_inqu2.style.display="none";
    ef_region_inqu.style.display="none";

   }else{

  }
}

function fundiv(currentIndex,index){
//	alert((209).toString(16)+(214).toString(16)+(240).toString(16));
//	alert("he");
	return true;
}

//c查询，o排序，m书签
button_bt_dynamicCNew_onclick = function ()
{
    _zb_fun_addRecord("ef_grid_inqu_dy");
}
button_bt_dynamicONew_onclick = function ()
{
    _zb_fun_addRecord("ef_grid_inqu_dy_orderby");
}

 button_bt_dynamicCDelete_onclick = function ()
{
    _zb_fun_deleteRecord("ef_grid_inqu_dy");
}

button_bt_dynamicODelete_onclick = function ()
{
    _zb_fun_deleteRecord("ef_grid_inqu_dy_orderby");
}

button_bt_dynamicCQuery_onclick = function ()
{
    ef.get("dyMQueryFlag").value = "";
    _zb_fun_submitInqu_Dy();

}

button_bt_dynamicOQuery_onclick = function ()
{
    ef.get("dyMQueryFlag").value = "";
     _zb_fun_submitInqu_Dy();
}
button_bt_dynamicMNew_onclick = function ()
{
    _zb_fun_Dy_parseSQL();

    var info = new EiInfo();
    var dyQueryString = document.getElementById("dyQueryString").value;
    var dyOrderString = document.getElementById("dyOrderString").value;
    var dyTableName = document.getElementById("dyTableName").value;
    var dySqlId = document.getElementById("dySqlId").value;
    var dyBeanClass = document.getElementById("dyBeanClass").value;
    var dyEpassString = document.getElementById("dyEpassString").value;
    var dyMarkMemo = document.getElementById("dyMarkMemo").value;
    var dyMarkName = document.getElementById("dyMarkName").value;
    var formEname = document.getElementById("efFormEname").value;
    
    if(dyMarkName == null || dyMarkName == ''){
    	alert('请输入书签名称!');
    	return;	
    }

    //组织EiInfo 的数据
    info.setByNameValue("dyQueryString",dyQueryString);
    info.setByNameValue("dyOrderString",dyOrderString);
    info.setByNameValue("dyTableName",dyTableName);
    info.setByNameValue("dySqlId",dySqlId);
    info.setByNameValue("dyBeanClass",dyBeanClass);
    info.setByNameValue("dyEpassString",dyEpassString);
    info.setByNameValue("dyMarkMemo",dyMarkMemo);
    info.setByNameValue("dyMarkName",dyMarkName);
    info.setByNameValue("formEname",formEname);

    EiCommunicator.send("EDFA83","insert",info, button_bt_dynamicMNew_callback );


    //efgrid.submitInqu( "ef_grid_result", "ed","EDFA83","insert");
}

button_bt_dynamicMNew_callback={
	onSuccess :
			function (info){
				//alert("保存成功");
				//var block = info.getBlock("result");
			    //ef.getNodeById("inqu_status-0-form_cname").value =
				//block.getCell(0,"form_cname");
				if(info!=null){
				var newMarkId=info.get("newMarkId");
				
				if(newMarkId!=null){
				   ef.get("dyMarkId").value=newMarkId;
				}
				}
            }
}

button_bt_dynamicMDelete_onclick = function ()
{

   if(typeof(before_DynamicQuery)=="function"){
	   before_DynamicQuery();
   }
    var info=new EiInfo();
    var dyMarkId=document.getElementById("dyMarkId").value;
    if(dyMarkId.trim()!='')
    info.set("dyMarkId",dyMarkId);
    else{
    alert("请选中一个标签");
    return;
    }
    EiCommunicator.send("EDFA83","delete",info, null );
    document.getElementById("dyMarkId").value = "";
    document.getElementById("dyMarkName").value = "";
    document.getElementById("dyMarkMemo").value = "";
}

/**
 * 书签查询按钮
 */
button_bt_dynamicMQuery_onclick = function ()
{
//启动标记，为书签查询
    ef.get("dyMQueryFlag").value = "1";
    _zb_fun_submitInqu_Dy();
}

//添加行
_zb_fun_addRecord=function(grid_id){
    var grid = efgrid.getGridObject(grid_id );
    //alert(grid)
	if(grid){
	 var copy=false;
     var selcount=grid.getCheckedRowCount();
	 if(selcount>0)
          copy=confirm("["+selcount+"]" +　getI18nMessages("ef.GridRowsCopy","条记录被选中，将它们复制为新记录吗？"));

		  grid.newLine(copy);
		  grid.refresh();
		  var grid_table=document.getElementById(grid_id+EF_SPLIT+"grid_table");
		  var dataDiv=efgrid.getDataDiv(grid_table);dataDiv.scrollTop=dataDiv.scrollHeight;
		  var rows=grid.getCheckedRows();
		  for(var i=0;i<rows.length;i++){
			  if(grid.isNewLine(rows[i])){
				  grid.cellOriginNodeType=TYPE_FIX;
				  efgrid._shiftCell(grid,rows[i],0,2);break;}
		      }
	      }
}

//删除行
_zb_fun_deleteRecord=function(grid_id){
    var grid = efgrid.getGridObject( grid_id );
  	var rowLength = grid.getCheckedRows().length;
	for(i=rowLength-1;i>=0;i--){
		grid.removeRow(grid.getCheckedRows()[i]);
	}
	grid.refresh();
	//efform.setStatus(0,"删除"+rowLength+"条记录成功!");
}

/**
 * 动态查询，书签查询
 */
_zb_fun_submitInqu_Dy=function(){
  
 
  //  var grid = efgrid.getGridObject("ef_grid_inqu_dy");
  //  alert(grid.getCellValue(0,5,TYPE_DATA));
    //万能查询之前的调用函数
   if(typeof(before_DynamicQuery)=="function"){
	   before_DynamicQuery();
   }

	_zb_fun_Dy_parseSQL();
	
	//寻找各自的service，method by zhong
	var serviceName = ef.get("callBackServiceName").value;
		if(serviceName == "")
			serviceName = ef.get("serviceName").value;
	var methodName = ef.get("callBackMethodName").value;
		if(methodName == "")
			methodName = "query";
	var gridId=ef.get("callBackGridId").value;
	    if(gridId=="")
	       gridId="ef_grid_result";
	//alert(serviceName + "======" + methodName);
	var grid=efgrid.getGridObject( gridId );
	if(grid.ajax)
	efgrid.submitInqu( gridId, "ed",serviceName,methodName);
   
//选中动态查询条件Tab所有行
  else{
    setAllRowCheckd("ef_grid_inqu_dy");
     setAllRowCheckd("ef_grid_inqu_dy_orderby");
   // var grid_ids=[];
//	grid_ids.push(gridId);
	//grid_ids.push("ef_grid_inqu_dy");
//	grid_ids.push("ef_grid_inqu_dy_orderby");
	//efgrid._submitFormData( grid_ids, "ed", serviceName, 
//		methodName, true ,true);
   efgrid.submitAllGridsData("ed",serviceName,methodName);
	}	
  //采用ajax刷新后,调用的回调函数
  if(typeof(after_DynamicQuery)=="function"){
     after_DynamicQuery();
  }

 // var grid = efgrid.getGridObject("ef_grid_inqu_dy");
  //  grid.setCellValue("1","1","or",TYPE_DATA);
}
function setAllRowCheckd(grid_id){
   var grid = efgrid.getGridObject( grid_id );
   var rowCount=grid.getRowCount();
   for(i=0;i<rowCount;i++)
      grid.setRowChecked(i,true);
}
//组装sql和orderby
_zb_fun_Dy_parseSQL=function(){
    var conditionString=_zb_fun_Dy_getCondition();
    var orderbyString=_zb_fun_Dy_getOrderBy();

    document.forms[0].dyQueryString.value=conditionString;
    document.forms[0].dyOrderString.value=orderbyString;
    //alert( document.forms[0].dyQueryString.value)
}


//未使用？
_zb_fun_Dy_getCondition2=function(){
	alert("被调用了嘛？_zb_fun_Dy_getCondition2");
    var condition = "";
    var order = "";
    var grid = efgrid.getGridObject("ef_grid_inqu_dy");
  	var rowLength = grid.blockData.getRows().length;
  	var colLength = grid.getColCount();

  	for(i=0;i<rowLength;i++){
  	   var currentRow=grid.getRowData(i);
  	   var line = "";
        var j=0;
         for (var value in currentRow){

           var cellObj=currentRow[value];
           if (j> 0) line += '^';
     	   line += (cellObj)?cellObj:" ";
     	   j++;
         }
  	     if (condition.length > 0) condition += '\r\n';
    	 condition += line;
  	 }

     return condition;
}

//获取查询sql
_zb_fun_Dy_getCondition=function(){
    var condition = "";
    var order = "";
    var grid = efgrid.getGridObject("ef_grid_inqu_dy");
  	var rowLength = grid.blockData.getRows().length;
  	var colLength = grid.getColCount();

  	for(i=0;i<rowLength;i++){
  	   var currentRow=grid.getRowData(i);
  	   var line = "";
       var j=0;
       line=_zb_fun_Dy_appendCondition(currentRow,"brack");
       line+=_zb_fun_Dy_appendCondition(currentRow,"andor");
       line+=_zb_fun_Dy_appendCondition(currentRow,"brackA");
       line+=_zb_fun_Dy_appendCondition(currentRow,"field");
       line+=_zb_fun_Dy_appendCondition(currentRow,"operation");
       line+=_zb_fun_Dy_appendCondition(currentRow,"value");
       line+=_zb_fun_Dy_appendCondition(currentRow,"valueAnd");
       line+=_zb_fun_Dy_appendCondition(currentRow,"brackB");
       line+="^string"
       //line+=_zb_fun_Dy_appendCondition(currentRow,"dataType");

       if (condition.length > 0)
       condition += '\n';
    	 condition += line;
  	 }

     return condition;
}

//sql的append函数
_zb_fun_Dy_appendCondition=function(currentRow,value){
     var showString="";
     var cellObj=currentRow[value];
    if(value!="brack"){
       showString='^';
      }
     showString+=(cellObj)?cellObj:" ";
     return showString;

}

_zb_fun_Dy_getOrderBy=function(){
    var order = "";
    var grid = efgrid.getGridObject("ef_grid_inqu_dy_orderby");
  	var rowLength = grid.blockData.getRows().length;
  	var colLength = grid.getColCount();

  	for(i=0;i<rowLength;i++){
  	   var currentRow=grid.getRowData(i);
  	   var line = "";
       var j=0;
         for (var value in currentRow){
           var cellObj=currentRow[value];
           if (j > 0) line += '^';
     	   line += (cellObj)?cellObj:" ";
     	   j++;
         }
  	     if (order.length > 0) order += '\n';
    	 order += line;
  	 }
  	return order;
}


efgrid_onCellDisplayReady = function( div_node, row_index, col_index, col_value_c,display_value, grid_id )
{
    if(grid_id=="ef_grid_inqu_dy"){
       var grid = efgrid.getGridObject("ef_grid_inqu_dy");
       switch(col_index){
          case 1:
                 if(row_index>0){
                   var  html = "<div align=center><input hidefocus='-1' type='radio' value='and' name='andors"+row_index+"' checked  onclick='_zb_fun_setAndOr("+row_index+","+col_index+",this);'/>和<input  name='andors"+row_index+"' type='radio' value='or' onclick='_zb_fun_setAndOr("+row_index+","+col_index+",this);'/>或</div>";
                   if(col_value_c==""){
                     grid.setCellValue(row_index,col_index,'and',TYPE_DATA);
                   }else if(col_value_c=="or"){
                     var  html = "<div align=center><input hidefocus='-1' type='radio' value='and' name='andors"+row_index+"'   onclick='_zb_fun_setAndOr("+row_index+","+col_index+",this);'/>和<input  name='andors"+row_index+"' type='radio' value='or' checked onclick='_zb_fun_setAndOr("+row_index+","+col_index+",this);'/>或</div>";
                   }
                   return html;

                 }else{
                  // alert("col_value:"+col_value_c+"  display_value:"+display_value+"  row_index:"+row_index+" col_index:"+col_index);
                   var  html = "<div align=center></div>";
                   grid.setCellValue(row_index,col_index,'',TYPE_DATA);
                   return html;
                  }
                 break;

          case 3:
                //var conditionBlock=_getEi().getBlock("inqu_dy_condition");
                //var rowLength = conditionBlock.getRows().length;
  				//for(i=0;i<rowLength;i++){
  	  				// var columnValue=conditionBlock.getCell(i,"columnName");
  	  				// var dataType=conditionBlock.getCell(i,"dataType");
  	  				// if(col_value_c==columnValue){
  	  				       //grid.getBlockData().setCell(row_index,"dataType",dataType);
  	  				     ////grid.setCellValue(row_index,col_index+5,dataType,TYPE_DATA)
  	  				     ////grid.refresh();
  	  				//}
  	  			//}


                break;
          case 4:
                //var cu_node=grid.getCellDivNode(row_index,col_index,TYPE_DATA);
                //alert(cu_node)
                //return ;

                //if(col_value_c=="between" ||col_value_c=="not between" ){
                   //  grid.refreshCell(row_index,col_index+2,TYPE_DATA);
              // }
                break;
        
             
          case 6:
               var  html = "<div efVal='' onclick='_zb_fun_setValueEnd("+row_index+");'> </div>";
              // alert(div_node)
              // return html;

                break;


          default:

       }


      // alert("col_value:"+col_value_c+"  display_value:"+display_value+"  row_index:"+row_index+" col_index:"+col_index);
    }
}

//and or
_zb_fun_setAndOr=function(row_index,col_index,symbol){
    // symbol.checked=true;
    var grid = efgrid.getGridObject("ef_grid_inqu_dy");
    grid.setCellValue(row_index,col_index,symbol.value,TYPE_DATA)
}

//验证几元操作符，是否between等
_zb_fun_setValueEnd=function(row_index){
    // symbol.checked=true;
    var grid = efgrid.getGridObject("ef_grid_inqu_dy");
    var currentRow=grid.getRowData(row_index);
    var v_col=currentRow["operation"];
    if(v_col!="between" &&v_col!="not between" ){
        alert("此操作符情况下填写无效");
    }
}

//标签下拉
efcascadeselect_ensure_onclick = function(id){
	//alert("被调用了嘛？");
	grid_id = efcascadeselect.getDivWindowSubNodeId("_efselect_divwindow")
	var grid = efgrid.getGridObject( grid_id );
	var index = grid.getCurrentRowIndex();
	if( index < 0 ) {
		alert( getI18nMessages("ef.NotSelect","未选择记录")  );
		return;
	}

	var type = TYPE_DATA;
	var cellValue = grid.getCellValue(index,0, type);
	var dyMarkName = grid.getCellValue(index,1, type);
	var dyMarkMemo = grid.getCellValue(index,2, type);

	document.getElementById("dyMarkId").value = cellValue;
	document.getElementById("dyMarkName").value = dyMarkName;
	document.getElementById("dyMarkMemo").value = dyMarkMemo;
}
/*
  一般用于efgrid_onCellEditNodeDisplayReady回调之中
   div_node：单元格
*/
function genDateCell(div_node){
      var img_left = div_node.parentNode.offsetWidth - 16 ;
     div_node.firstChild.id="date_input";
        var canlanda="<img style='position: absolute; top:2; left:" + img_left + "' src='" + EF_IMAGES_PATH +"efcalendar_icon.gif' " 
	    + "onClick=\"efcalendar(this, date_input,'yyyymmdd' ,false);\">"
	   div_node.innerHTML+=canlanda;
}
/*
  一般用于efgrid_onCellEditNodeDisplayReady回调之中
  col_index:列数
  div_node：该单元格对应的node节点
  blockName:所希望显示的block名
   label:option显示所对应的列明
   value:option的值所对应的列名
   list:手动添加的option的内容
*/
function genComboCell(col_index,div_node,blockName,label,value,list){      
         var grid = efgrid.getGridObject("ef_grid_inqu_dy");      
         var oldColumn=grid.getColumn(col_index,TYPE_DATA); 
         var comboColumn=grid.getColumn(3,TYPE_DATA)
         var customed=comboColumn.customSetting;
         var map={"label":"","value":""};
         var attr=[];
         attr.push(map);
         if(isAvailable(list))      
         attr=attr.concat(list);
       //  column.set("source",attr);
         customed["width"]=oldColumn.customSetting["width"];
         customed["editor"]="combo";
         customed["sourceName"]="source";
         customed["attr"]["source"]=attr;
        customed["formatter"]="#valueString#-#labelString#";
         labelProperty=(label!=null)?label:"label";
         valueProperty=(value!=null)?value:"value";
         if(isAvailable(labelProperty))
         customed["labelProperty"]=labelProperty;
         if(isAvailable(valueProperty))
         customed["valueProperty"]=valueProperty;
         if(!isAvailable(blockName))
              blockName="";
         customed["blockName"]=blockName;
        column= efColumn.build( customed, oldColumn.eiColumn, _getEi());
         div_node.removeChild(div_node.firstChild);  
         div_node.innerHTML=column.getEditNodeHtml();   
}

