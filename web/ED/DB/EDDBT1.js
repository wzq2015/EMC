efform_onload = function ()
{
  efsplitter("leftTree", "leftTreeDiv", "middleSplitter");

	efregion.show("ef_region_inqu");
}	

/*
  点击删除按钮后调用后台的service
*/
button_delete_onclick = function () 
{
  var grid = efgrid.getGridObject("ef_grid_result");
  var rowLength = grid.getCheckedRows().length;
  for(i=rowLength-1;i>=0;i--){
    grid.removeRow(grid.getCheckedRows()[i]);
  }
  grid.refresh();	
  efform.setStatus(0,"删除"+rowLength+"条记录成功!");
}

/*
  点击新增按钮后
*/
button_insert_onclick = function () 
{
  if(!isTableSelected()) {
    return;
  }
  var childWindow = efform.openNewForm('EIIT0001', "serviceName=EIIT00");
  childWindow.focus();
}

/*
  点击增加模板表按钮后
*/
button_model_onclick = function () 
{
  if(!isTableSelected()) {
    return;
  }
  var projectEname = ef.get("inqu_status-0-projectEname").value;
  var childWindow = efform.openNewForm('EDDBT001', "serviceName=EDDBT0&methodName=queryModelTable&inqu_status-0-projectEname=" + projectEname);
  childWindow.focus();
	
}

/*
  点击表间选择按钮后
*/
button_copy_onclick = function () 
{
  if(!isTableSelected()) {
    return;
  }
  var childWindow = efform.openNewForm('EDDBT101', "serviceName=EDDBT1");
  childWindow.focus();
	
}

/*
  点击移动按钮后
*/
button_move_onclick = function () 
{
  if(!efvalidateDiv("moveStep",false)) {
    alert("请输入正确的移动位置，必需为正整数");
    return;
  }
    
  var step = ef.get("step").value;
  var grid = efgrid.getGridObject("ef_grid_result");
  var count = grid.getRowCount();
  if(step > count+1)
    step = count+1;
  
  if(step <= 0)
    step = 1;  
  
  var rowLength = grid.getCheckedRows().length;
  if(rowLength <= 0) {
    alert("请选择需要移动的记录！");
    return;
  }
  
  var checkedRows = grid.getSelectRowsData();//保存被选中需要移动的记录
  var newRows = new Array();
  
  for(i=0;i<step-1;i++){
    if(!grid.isRowChecked(i))
      newRows.push(grid.getRowData(i));
  }
  newRows = newRows.concat(checkedRows);
  for(i=step-1;i<count;i++) {
    if(!grid.isRowChecked(i))
      newRows.push(grid.getRowData(i));
  }
  
  for(i=count-1;i>=0;i--){
    grid.removeRow(i);
  }
  
  grid.addRowData( newRows );

  grid.refresh();	
  efform.setStatus(0,"移动"+rowLength+"条记录成功!");
	
}

/*
  点击更新按钮后调用后台的service
*/
button_update_onclick = function () 
{
    if(!isTableSelected()) {
      return;
    }
    var grid = efgrid.getGridObject("ef_grid_result");
	var count = grid.getRowCount();
	var seq;
	var module="";
	var moduleName="";
	var flag=0;
	for(i=0;i<count;i++) {

	 seq=grid.getCellValue(i,0,TYPE_DATA);
	 if(seq==-1){
	  moduleName=grid.getCellValue(i,3,TYPE_DATA);
	  if(moduleName!=null&&moduleName!=""){
	    for(j=0;j<count;j++){
	     module=grid.getCellValue(j,3,TYPE_DATA);
	     if(j!=i&&module==moduleName)
	       flag=1;
	    }
	  }
	  }
	  
	}
	if(flag==1){
	  alert("存在重复的模板表，无法更新");
	  return;
	}else{
		for(i=0;i<count;i++) {
			grid.setRowChecked(i,true);
		}
	}
	
    grid.refresh();	
	efgrid.submitForm( "ef_grid_result", "ed","EDDBT1","update",true );
}

//从弹出窗口返回
efform_onPopupReturn = function(winId, returnValue)
{
  var project = ef.get("inqu_status-0-projectEname").value;
  var table = ef.get("inqu_status-0-tableEname").value;
  
  var grid = efgrid.getGridObject("ef_grid_result");
  if(winId == "EIIT0001") {//信息项选择
  	for(i= 0; i<returnValue.length; i++){
  	 returnValue[i]["projectEname"]=project;
  	 returnValue[i]["tableEname"]=table;
     returnValue[i]["tableItemSeq"]="-1";
     returnValue[i]["tableItemType"]="0";
  	}
    grid.addRowData( returnValue );
    efform.setStatus(1, "新增数据项成功！"); 
   }
  if(winId == "EDDBT001") {//模板表选择
  	for(i= 0; i<returnValue.length; i++){
     returnValue[i]["tableItemSeq"]="-1";
     returnValue[i]["tableItemType"]="1";
     returnValue[i]["modelTableEname"]=returnValue[i]["tableEname"];
     returnValue[i]["tableEname"]=table;
  	}
    grid.addRowData( returnValue );
    efform.setStatus(1, "新增模板表成功！"); 
   }
  if(winId == "EDDBT101") {//表数据项复制
  	for(i= 0; i<returnValue.length; i++){
  	 returnValue[i]["projectEname"]=project;
  	 returnValue[i]["tableEname"]=table;
     returnValue[i]["tableItemSeq"]="-1";
  	}
    grid.addRowData( returnValue );
    efform.setStatus(1, "复制数据项成功！"); 
   }
  
}

//判断是否选中了表
isTableSelected = function() {
   var project;
   var table;
   project = ef.get("inqu_status-0-projectEname").value;
   table = ef.get("inqu_status-0-tableEname").value;
   
   if(project == undefined || project == "" || table == undefined || table == "" ) {
     alert("请先选择表");
     return false;
   }
   return true;
}


var tableTreeModel =  new eiTreeModel('EDDBTT');

function configTree(tree){
  tree.emptyNodeAsLeaf = false;
  tree.activeEmptyJudger = false;
  tree.topNodeActive = false;
  tree.nodeInitializer = treeNodeInitializer;
}

function treeNodeInitializer(node){
  if(node.depth() == 1){
    node.icon(efico.get("eftree.treeImgActv"));
    node.openIcon(efico.get("eftree.treeImgActv"));
    return;
  }
    
  if ( node.leaf() ){ 
    node.textClicked = function(){ treeNodeClicked( node ); };
    node.icon(efico.get("eftree.file"));
    node.openIcon(efico.get("eftree.file"));
    if(node.ref=="T")
       node.textDom().style.color = "red";
    return;
  }
  
  if(node.depth() == 2) {
    node.icon(efico.get("eftree.treeImgForum"));
    node.openIcon(efico.get("eftree.treeImgForum"));
  }
  
}

function treeNodeClicked(node){
   var project = node.project;
   var table = node.key;

   ef.get("inqu_status-0-projectEname").value=project;
   ef.get("inqu_status-0-tableEname").value=table;
     
   efgrid.submitInqu( "ef_grid_result", "ed","EDDBT1","query" );
   
}


