/**
 * 页面加载后的回调
 */
efform_onload = function()
{

}

//日历控件的操作
efcalendar_click = function (control_source, id) {
	var node = ef.getNodeById(id);
	efcalendar(control_source, node, 'yyyymmdd', true);
}
//按钮渲染
efgrid_onCellDisplayReady = function( div_node_html, row_index, col_index, col_value_c, display_value, grid_id )
{
   if(grid_id=="ef_grid_n"){
      var grid = efgrid.getGridObject( "ef_grid_n" );
      var columnEname = grid.getColumn(col_index, TYPE_DATA).getEname();
      /*
      if(columnEname =="questionnaireName"){//
    	  var value=grid.getCellValue(row_index,0,TYPE_DATA);
    	  var Id = grid.getCellValue(row_index,0,TYPE_DATA,true);
    	  return "<div align='center'><a href='javascript:void(0)' onclick='queryQuestionData(\""+Id+"\")'>"+value+"</a></div>";
      }*/
      if(columnEname=="edit"){   
    	return "<div align='center' efval=''>"
    	+"<input value='修改' class='buttonclass' type='button' align='center' onclick='efgrid_onEdit1Click(\""+grid_id+"\",\""+row_index+"\",\""+col_index+"\")'>&nbsp;"
    	+"<input value='预览' class='buttonclass' type='button' align='center' onclick='efgrid_onView1Click(\""+grid_id+"\",\""+row_index+"\")'>&nbsp;"
    	+"<input value='调查结果' class='buttonclass' type='button' align='center' onclick='efgrid_onViewResultClick(\""+grid_id+"\",\""+row_index+"\")'>&nbsp;"
    	+"</div>" ;
      }
    }
   /*
   if(grid_id=="ef_grid_q"){
	   var grid = efgrid.getGridObject( "ef_grid_q" );
	   var columnEname = grid.getColumn(col_index, TYPE_DATA).getEname();
	   if(col_index==0){//
		   var value=grid.getCellValue(row_index,0,TYPE_DATA);
		   var Id = grid.getCellValue(row_index,0,TYPE_DATA,true);
		   return "<div align='center'><a href='javascript:void(0)' onclick='querySelectionData(\""+Id+"\")'>"+value+"</a></div>";
	   }   
   }
   */
}

/** 点击固定列的回调函数 */
efgrid_onFixCellClick = function(grid_id, row_index, col_index, cell_value) {
	if (grid_id == "ef_grid_n") {
		var grid = efgrid.getGridObject(grid_id);
		if (col_index == 1) {	// 点击第1列即产品代号
			// 获取该行数据列第0列，即产品名称
			var Id = grid.getCellValue(row_index,1,TYPE_FIX);
			queryQuestionData(Id);
		}
	}
	if(grid_id=="ef_grid_q"){
		var grid = efgrid.getGridObject( "ef_grid_q" );
		var columnEname = grid.getColumn(col_index, TYPE_DATA).getEname();
		if(col_index==1){//
			var Id = grid.getCellValue(row_index,0,TYPE_DATA,true);
			querySelectionData(Id);
		}   
	}
}
//问卷-问卷修改
efgrid_onEdit1Click = function(grid_id,row_index){
	var grid = efgrid.getGridObject(grid_id);
	modifynClean();
	
	document.getElementById("r1-0-questionnaireId").value = grid.getCellValue(row_index,1,TYPE_FIX);
	document.getElementById("opstatus_r1").value = "update";
	document.getElementById("r1-0-questionnaireName").value = grid.getCellValue(row_index,0,TYPE_DATA);
	
	document.getElementById("r1-0-startTime").value = grid.getCellValue(row_index,3,TYPE_DATA);
	document.getElementById("r1-0-endTime").value =grid.getCellValue(row_index,4,TYPE_DATA);
	document.getElementById("r1-0-questionnaireForeword").value =  grid.getCellValue(row_index,0,TYPE_DATA,true);
	document.getElementById("r1-0-recCreator").value =grid.getCellValue(row_index,7,TYPE_DATA);
	document.getElementById("r1-0-recCreateTime").value =  grid.getCellValue(row_index,8,TYPE_DATA);
	var isAnonyValue = grid.getCellValue(row_index,1,TYPE_DATA);
	var state = grid.getCellValue(row_index,5,TYPE_DATA);
	var isLimit = grid.getCellValue(row_index,2,TYPE_DATA);
	var obj1 = document.getElementById("r1-0-isAnony").options;
	var obj2 = document.getElementById("r1-0-questionnaireState").options;
	var obj3 = document.getElementById("r1-0-isLimit").options;
	for(var i=0;i<obj1.length;i++){
		if(obj1[i].value == isAnonyValue){
			obj1[i].selected = true;
			break;
		}
	}
	for(var i=0;i<obj2.length;i++){
		if(obj2[i].value == state){
			obj2[i].selected = true;
			break;
		}
	}
	for(var i=0;i<obj3.length;i++){
		if(obj3[i].value == isLimit){
			obj3[i].selected = true;
			break;
		}
	}
	efwindow.show(null,"modifyn","center");
}
//问卷-问卷预览
efgrid_onView1Click = function(grid_id,row_index){
	var grid = efgrid.getGridObject( "ef_grid_n" );
	var id = grid.getCellValue(row_index,1,TYPE_FIX);
	var param = "&isView=true&inqu_status-0-questionnaireId="+id;
	//window.open( "DispatchAction.do?efFormEname=ECQM01"+param,"问卷预览","top=0,left=0,menubar=no,width="+screen.width+",height="+screen.availHeight+",scrollbars=yes,resizable=yes");
	window.open( "DispatchAction.do?efFormEname=ECQM01"+param,"问卷预览","top=0,left=0,menubar=no,width="+800+",height="+600+",scrollbars=yes,resizable=yes");
}
//问卷-调查结果
efgrid_onViewResultClick = function(grid_id,row_index){
	var grid = efgrid.getGridObject( "ef_grid_n" );
	var id = grid.getCellValue(row_index,1,TYPE_FIX);
	var param = "&inqu_status-0-questionnaireId="+id;
	//data:1单数据类型2多数据类型 showValues:1显示数字0不显示 
	param+="&chartType=Bar2D&data=1&showValues=1&bgcolor=&plotcolor=";
	window.open( "DispatchAction.do?efFormEname=ECQM03"+param,"问卷调查结果","top=0,left=0,menubar=no,width="+640+",height="+480+",scrollbars=yes,resizable=yes");
}

//问卷查询
button_query_onclick = function(){
	var info = new EiInfo(); 
	info.setByNode("ef_region_inqu");
    EiCommunicator.send( "ECQM00", "queryQuestionnaire", info, button_query_callback  );
	//efgrid.submitInqu( "ef_grid_n", "ec","ECQM00","queryQuestionnaire");
}

var button_query_callback = {
		  onSuccess : 
		    function(eiInfo){  
			  var ef_grid = efgrid.getGridObject("ef_grid_n");
			  ef_grid.setData(eiInfo);
			  ef_grid.paint();
		    },
		  onFail    : 
		    function(eMsg) {
		      alert("failure");
		    }
}
//问卷新增
button_insert1_onclick = function(){
	ef.get("opstatus_r1").value = "insert";
	efwindow.show(null,"modifyn","center");
}
//问卷新增取消 
button_cancel1_onclick = function(){
	modifynClean();
	efwindow.hide();
}
//问卷修改确定
button_confirm1_onclick = function(){
	if(!modifynValid()){
		return false;
	}
	var opstatus = ef.get("opstatus_r1").value;
	if(opstatus == "insert"){ //新增操作
		efgrid.submitForm( "ef_grid_n", "ec","ECQM00","insertQuestionnaire",true );
	}else if(opstatus == "update"){ //修改操作
		efgrid.submitForm( "ef_grid_n", "ec","ECQM00","updateQuestionnaire",true );
	}
	if(ajaxEi!=null){
		var result = ajaxEi.getStatus();
		if(result!=-1){
			modifynClean();
			efwindow.hide(null,"modifyn","center");
		}
	}
}
//问卷删除
button_delete1_onclick = function(){
	
	if(!checkNullRow("ef_grid_n")){
		return false;
	}
	if(confirm("确定要删除选中记录吗？"))
	   efgrid.submitForm( "ef_grid_n", "ec","ECQM00","deleteQuestionnaire",true);
	else
	  return false; 
	
}
//判断有没有选择记录
function checkNullRow(gridName){
   var grid=efgrid.getGridObject(gridName);
   var rowCount=grid.getCheckedRowCount();
     if(rowCount==0){
      alert("请选择一条记录进行操作!");
      return false;
     }
     else
      return true;
}
modifynValid = function(){
	var validStartTime = document.getElementById("r1-0-startTime");
	var validEndTime = document.getElementById("r1-0-endTime");
	var questionnaireName = document.getElementById("r1-0-questionnaireName");
	if(validStartTime.value.length==0){
		alert("请填写问卷开始时间");
		validStartTime.focus();
		return false;
	}
	if(validEndTime.value.length==0){
		alert("请填写问卷结束时间");
		validEndTime.focus();
		return false;
	}
	if(validStartTime.value > validEndTime.value){
		alert("问卷开始时间不能大于结束时间");
		validStartTime.focus();
		return false;
	}
	if(questionnaireName.value.length=0){
		alert("请填写问卷名称");
		questionnaireName.focus();
		return false;
	}
	return true;
}
modifynClean = function(){
	document.getElementById("r1-0-questionnaireId").value = "";
	document.getElementById("opstatus_r1").value = "";
	document.getElementById("r1-0-questionnaireName").value = "";
	document.getElementById("r1-0-startTime").value = "";
	document.getElementById("r1-0-endTime").value = "";
	document.getElementById("r1-0-recCreator").value = "";
	document.getElementById("r1-0-recCreateTime").value = "";
	document.getElementById("r1-0-questionnaireForeword").value = "";
	document.getElementById("r1-0-isAnony").options[0].selected = true;
	document.getElementById("r1-0-questionnaireState").options[0].selected = true;
}

queryQuestionData = function(id){
	
	document.getElementById("inqu_status-0-questionnaireId").value = id;
	var info = new EiInfo(); 
	info.setByNode("ef_region_question");
    EiCommunicator.send( "ECQM00", "queryQuestion", info, button_query2_callback  );
	//efgrid.submitInqu( "ef_grid_q", "ec","ECQM00","queryQuestion");
}
var button_query2_callback = {
		  onSuccess : 
		    function(eiInfo){  
			  var ef_grid = efgrid.getGridObject("ef_grid_q");
			  ef_grid.setData(eiInfo);
			  ef_grid.paint();
		    },
		  onFail    : 
		    function(eMsg) {
		      alert("failure");
		    }
}

button_insert2_onclick = function(){
	var questionnaireId= ef.get("inqu_status-0-questionnaireId").value;
	if(!checkNullRow("ef_grid_q")){
		return false;
	}
	if(!questionnaireId){
		alert("请选择问卷后再新增题目!");
		return false;
	}
	efgrid.submitForm( "ef_grid_q", "ec","ECQM00","insertQuestion",true );
}
button_update2_onclick = function(){
	if(!checkNullRow("ef_grid_q")){
		return false;
	}
	efgrid.submitForm( "ef_grid_q", "ec","ECQM00","updateQuestion",true);
}
button_delete2_onclick = function(){
	if(!checkNullRow("ef_grid_q")){
		return false;
	}
	if(confirm("确定要删除选中记录吗？")){
		efgrid.submitForm( "ef_grid_q", "ec","ECQM00","deleteQuestion",true);
	}
	else
	  return false; 
}

querySelectionData = function(id){
	
	document.getElementById("inqu_status-0-questionId").value = id;
	var info = new EiInfo(); 
	info.setByNode("ef_region_selection");
    EiCommunicator.send( "ECQM00", "querySelection", info, button_query3_callback  );
	//efgrid.submitInqu( "ef_grid_q", "ec","ECQM00","queryQuestion");
}
var button_query3_callback = {
		  onSuccess : 
		    function(eiInfo){  
			  var ef_grid = efgrid.getGridObject("ef_grid_s");
			  ef_grid.setData(eiInfo);
			  ef_grid.paint();
		    },
		  onFail    : 
		    function(eMsg) {
		      alert("failure");
		    }
}
button_insert3_onclick = function(){
	var questionId= ef.get("inqu_status-0-questionId").value;
	if(!checkNullRow("ef_grid_s")){
		return false;
	}
	if(!questionId){
		alert("请选择问题后再新增选项!");
		return false;
	}
	efgrid.submitForm( "ef_grid_s", "ec","ECQM00","insertSelection",true );
}
button_update3_onclick = function(){
	if(!checkNullRow("ef_grid_s")){
		return false;
	}
	efgrid.submitForm( "ef_grid_s", "ec","ECQM00","updateSelection",true );
}
button_delete3_onclick = function(){
	
	if(!checkNullRow("ef_grid_s")){
		return false;
	}
	if(confirm("确定要删除选中记录吗？"))
	   efgrid.submitForm( "ef_grid_s", "ec","ECQM00","deleteSelection",true);
	else
	  return false; 
}
