efform_onload = function ()
{
 
}	
var validinfo = null;
/*
  点击查询按钮后调用后台的service
*/
button_query_onclick = function () {
   efgrid.submitInqu( "ef_grid_result", "ec","ECCM06","query");
}

//日历控件的操作
efcalendar_click = function (control_source, id) {
  //var value=ef.get("inqu_status-0-flag").value;
  //if(value=="true"||value=="insert"){
  var node = ef.getNodeById(id);
  efcalendar(control_source, node, 'yyyymmdd', true);
  //}
}

//新增
button_insert_onclick = function(){
	//清空页面
	cleanInsertDiv();
	
	//操作符赋值
	document.getElementById("opstatus").value = 0;
	efwindow.show(null,"newinfo","center");
}

function selectColumn(){

	var synType = document.getElementById("inqu_status-0-synType").value;
	var columnId = document.getElementById("inqu_status-0-columnId").value;
	var synMode = document.getElementsByName("insert-0-synMode");
	var synModeVal = null;
	for(var i=0;i<synMode.length;i++){
		if(synMode[i].checked == true){
			synModeVal = synMode[i].value;
			break;
		}
	}
	//alert(synModeVal);
	var childWindow = efform.openNewForm('ECCM0601', "serviceName=ECCM01&methodName=initLoad&columnId=" + columnId +"&synType="+synType+"&synMode="+synModeVal);
    childWindow.focus();
}

button_confirm_onclick = function(){
	var opstatus = document.getElementById("opstatus").value;
	if(!checkValid()){
		return;
	}
	
	if(opstatus == 0){ //新增操作
		efgrid.submitForm( "ef_grid_result", "ec","ECCM06","insert",true );
	}else if(opstatus == 1){ //修改操作
		efgrid.submitForm( "ef_grid_result", "ec","ECCM06","update",true );
	}
	cleanInsertDiv();
	efwindow.hide(null,"newinfo","center");
}
//重置DIV数据
function cleanInsertDiv(){
/*
	 document.getElementById("insert-0-validStartTime").value ="";
	 document.getElementById("insert-0-validEndTime").value  ="";
	 document.getElementById("insert-0-articleCreateStartTime").value  ="";
	 document.getElementById("insert-0-articleCreateEndTime").value  ="";
	 document.getElementById("insert-0-conditionSql").value  ="";
	 */
	 //清空页面
	 efform.clearDiv("newinfo");
	 document.getElementsByName("insert-0-allowedStatus")[0].checked = true;
	 document.getElementsByName("insert-0-synMode")[0].checked = true;
	 document.getElementById("relationTitle").style.display = "none";
	 document.getElementById("relation").innerHTML ="";
	 validinfo = null;
}

function checkValid(){
	var validStartTime = document.getElementById("insert-0-validStartTime");
	var validEndTime = document.getElementById("insert-0-validEndTime");
	var articleCreateStartTime = document.getElementById("insert-0-articleCreateStartTime");
	var articleCreateEndTime = document.getElementById("insert-0-articleCreateEndTime");
	var selectItem = document.getElementById("relation-0-columnId");
	//var allowedStatus = document.getElementById("allowedStatus");
	//var synMode = document.getElementById("synMode");
	
	if(validStartTime.value.length==0){
		alert("请填写分发开始时间");
		validStartTime.focus();
		return false;
	}
	if(validEndTime.value.length==0){
		alert("请填写分发结束时间");
		validEndTime.focus();
		return false;
	}
	if(validStartTime.value > validEndTime.value){
		alert("分发开始时间不能大于结束时间");
		validStartTime.focus();
		return false;
	}
	if(articleCreateStartTime.value.length==0){
		alert("请填写文章创建开始时间");
		articleCreateStartTime.focus();
		return false;
	}
	if(articleCreateEndTime.value.length==0){
		alert("请填写文章创建截止时间");
		articleCreateEndTime.focus();
		return false;
	}
	if(articleCreateStartTime.value > articleCreateEndTime.value){
		alert("文章创建开始时间不能大于截止时间");
		articleCreateStartTime.focus();
		return false;
	}
	if(selectItem==null || selectItem.value=="undefined"){
		alert("请选择分发汇总的栏目");
		return false;
	}
	
	var synMode = document.getElementsByName("insert-0-synMode");
	var synType = document.getElementById("inqu_status-0-synType").value;
	var synModeVal = null;
	for(var i=0;i<synMode.length;i++){
		if(synMode[i].checked == true){
			synModeVal = synMode[i].value;
			break;
		}
	}
	if(synType=="0" && synModeVal == "10" && validinfo != null){
		for(var i=0;i<validinfo.length;i++){
			if(validinfo[i].colType == "02"){
				alert("头条栏目["+validinfo[i].colName+"]不能以复制模式分发，请重新选择！");
				return false;
			}
			if(validinfo[i].colType == "04"){
				alert("图片栏目["+validinfo[i].colName+"]不能以复制模式分发，请重新选择！");
				return false;
			}
		}
		
	}
	
	return true;
	
}
button_cancel_onclick = function(){
	cleanInsertDiv();
	efwindow.hide(null,"newinfo","center");
}

//点击删除按钮
button_delete_onclick=function(){ 
    var  grid=efgrid.getGridObject("ef_grid_result");
     if(confirm("确定要删除选中记录吗？"))
     	efgrid.submitForm( "ef_grid_result", "ec","ECCM06","delete",true);
     else
      	return; 
}

button_update_onclick=function(){ 
	//操作符赋值
	document.getElementById("opstatus").value = 1;
	if(checkOneReccord()){
		var grid=efgrid.getGridObject("ef_grid_result");
		var rows=grid.getSelectRowsData();
		//div区域赋值
		document.getElementById("insert-0-synId").value =rows[0]["synId"];
		document.getElementById("insert-0-validStartTime").value =rows[0]["validStartTime"];
	 	document.getElementById("insert-0-validEndTime").value  =rows[0]["validEndTime"];
	 	document.getElementById("insert-0-articleCreateStartTime").value  =rows[0]["articleCreateStartTime"];
	 	document.getElementById("insert-0-articleCreateEndTime").value  =rows[0]["articleCreateEndTime"];
	 	document.getElementById("insert-0-conditionSql").value  =rows[0]["conditionSql"];
	 	
	 	var allowedStatus = document.getElementsByName("insert-0-allowedStatus");
	 	for(var i=0;i<allowedStatus.length;i++){
	 		if(allowedStatus[i].value == rows[0]["allowedStatus"])
	 			allowedStatus[i].checked = true;
	 	}
	 	var synMode = document.getElementsByName("insert-0-synMode");
	 	for(var i=0;i<synMode.length;i++){
	 		if(synMode[i].value == rows[0]["synMode"])
	 			synMode[i].checked = true;
	 	}
		
    	var synId=rows[0]["synId"];
    	var synType=rows[0]["synType"];
    	var info = new EiInfo();
    	info.set("synId",synId);
    	info.set("synType",synType);
    	//查询synId所关联的分发汇总栏目，并生成隐藏域
    	EiCommunicator.send( "ECCM06", "queryCM07" , info, null );
		if(ajaxEi!=null){
	 		var eiBlock = ajaxEi.getBlock("relation");
	 		var str ="";
	 		validinfo=new Array();
	 		for(var i=0;i<eiBlock.getRows().length;i++){
   				selectColumnId = eiBlock.getCell(i,"columnId")    
   				selectColumnName = eiBlock.getCell(i,"columnName");
   				columnType = eiBlock.getCell(i,"columnCategory");
   				if(i!=0 && i%3==0) {
   					str += "<br/>";
   				}
   				if(i!=0 && i%3!=0) str += ",";
   				str +=selectColumnName +"<input type = 'hidden' id='relation-"+ i +"-columnId' name='relation-"+ i +"-columnId' value='"+ selectColumnId +"'/>";
   				var oValid=new Object(); 
   	   			oValid.colName=selectColumnName; 
   	   	   		oValid.colType=columnType; 
   	   	   		validinfo.push(oValid);
	 		}
	 		document.getElementById("relation").innerHTML =str;
	 		document.getElementById("relationTitle").style.display = "block";
	 		efwindow.show(null,"newinfo","center");
		}else{
			cleanInsertDiv();
		}
	}
}

/*
	校验是否有且只有选中一条记录
*/
function checkOneReccord(){
	var grid=efgrid.getGridObject("ef_grid_result");
    var rowCount=grid.getCheckedRowCount();
    if(rowCount!=1){
      alert("请选择一条记录进行操作!");
      return false;
     }else{
     	return true;
     }
}
setValidinfo = function(object){
	validinfo = new Array();

	for(var i=0;i<object.length;i++){
		var oValid=new Object(); 
  		oValid.colName=object[i].colName; 
  	   	oValid.colType=object[i].colType; 
  	   	validinfo.push(oValid);
	}
		
}

