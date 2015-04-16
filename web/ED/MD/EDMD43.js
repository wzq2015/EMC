var dataModelEname = "";
var subWindow;
var sqlWindow;

efform_onload = function ()	{
	subWindow = new EFSubWindow("ef_region_table", "选择表", 800, 500);
	sqlWindow = new EFSubWindow("ef_region_sql", "预览SQL", 800, 500);
	efsplitter("leftTree", "leftTreeDiv", "middleSplitter");
//	efregion.show("ef_region_inqu");
}

button_query_onclick = function() {
	efgrid.submitInqu("ef_grid_result", "ed", "EDMD43", "query");
};

button_insert_onclick = function() {
	 if(ef.get("inqu_status-0-modelId").value==null || ef.get("inqu_status-0-modelId").value.trim()=="" || ef.get("inqu_status-0-modelId").value.trim()=="-1")
	 {
	 	alert("请选择数据模型！");
	 	return;
	 }
	efgrid.submitForm("ef_grid_result", "ed", "EDMD43", "insert", true);
};

button_update_onclick = function() {
	efgrid.submitForm("ef_grid_result", "ed", "EDMD43", "update", true);
};

button_delete_onclick = function() {
	if(window.confirm("请谨慎删除模型字段！\n相关的功能可能受到影响！\n确定要删除么？")){
		efgrid.submitForm("ef_grid_result", "ed", "EDMD43", "delete", true);
	}
};

button_return_onclick = function() {
    window.close();
//	window.location.href="DispatchAction.do?efFormEname=EDMD41";
};

setAllCondFlag = function (node){
	var grid = efgrid.getGridObject("ef_grid_result");
	for(i=0;i<=grid.getRowCount()-1;i++){
		grid.getBlockData().setCell(i,"condFlag",node.checked+"");
	}
	grid.refresh();
}

setAllOrderFlag = function (node){
	var grid = efgrid.getGridObject("ef_grid_result");
	for(i=0;i<=grid.getRowCount()-1;i++){
		grid.getBlockData().setCell(i,"orderFlag",node.checked+"");
	}
	grid.refresh();
}

setAllGroupFlag = function (node){
	var grid = efgrid.getGridObject("ef_grid_result");
	for(i=0;i<=grid.getRowCount()-1;i++){
		grid.getBlockData().setCell(i,"groupFlag",node.checked+"");
	}
	grid.refresh();
}

setAllSpecialFlag = function (node){
	var grid = efgrid.getGridObject("ef_grid_result");
	for(i=0;i<=grid.getRowCount()-1;i++){
		grid.getBlockData().setCell(i,"specialFlag",node.checked+"");
	}
	grid.refresh();
}

//设置是否"条件标记"属性
setFlag = function(row_index, col_index, flag){

	var grid = efgrid.getGridObject("ef_grid_result");

	if(flag){
		grid.setCellValue(row_index, col_index, '1',TYPE_DATA);
	}else{
		grid.setCellValue(row_index, col_index, '0',TYPE_DATA);
	}
}

efgrid_onCellDisplayReady = function( div_node_html, row_index, col_index, col_value_c, display_value, grid_id )
{
  //多Grid时的检验
  if (grid_id != "ef_grid_result") return;
  var grid = efgrid.getGridObject( grid_id );
  var columnEname = grid.getColumn(col_index, TYPE_DATA).getEname();

  switch (columnEname) {
     case "condFlag":
       //设置对”条件标记“属性checkbox
       var html = "";
       if (display_value == '1'){
         html = "<div align=center><input hidefocus='-1' type='checkbox' checked onclick='setFlag("+row_index+","+col_index+",this.checked);'/></div>";
       } else {
         html = "<div align=center><input hidefocus='-1' type='checkbox' onclick='setFlag("+row_index+","+col_index+",this.checked)'/></div>";
       }
       return html;

     case "orderFlag":
       //设置对”排序标记“属性checkbox
       var html = "";
       if (display_value == '1'){
         html = "<div align=center><input hidefocus='-1' type='checkbox' checked onclick='setFlag("+row_index+","+col_index+",this.checked);'/></div>";
       } else {
         html = "<div align=center><input hidefocus='-1' type='checkbox' onclick='setFlag("+row_index+","+col_index+",this.checked)'/></div>";
       }
       return html;

      case "groupFlag":
       //设置对”分组标记“属性checkbox
       var html = "";
       if (display_value == '1'){
         html = "<div align=center><input hidefocus='-1' type='checkbox' checked onclick='setFlag("+row_index+","+col_index+",this.checked);'/></div>";
       } else {
         html = "<div align=center><input hidefocus='-1' type='checkbox' onclick='setFlag("+row_index+","+col_index+",this.checked)'/></div>";
       }
       return html;

      case "specialFlag":
       //设置对”特殊标记“属性checkbox
       var html = "";
       if (display_value == '1'){
         html = "<div align=center><input hidefocus='-1' type='checkbox' checked onclick='setFlag("+row_index+","+col_index+",this.checked);'/></div>";
       } else {
         html = "<div align=center><input hidefocus='-1' type='checkbox' onclick='setFlag("+row_index+","+col_index+",this.checked)'/></div>";
       }
       return html;

       break;
  }
}

function model_select(){
	efgrid.submitInqu("ef_grid_result", "ed", "EDMD43", "query");
}

button_confirm_onclick = function()
{
	 if(ef.get("inqu_status-0-modelId").value==null || ef.get("inqu_status-0-modelId").value.trim()=="" || ef.get("inqu_status-0-modelId").value.trim()=="-1")
	 {
	 	alert("请选择数据模型！");
	 	return;
	 }
	 var grid = efgrid.getGridObject("ef_grid_result");
	 var tableGrid = efgrid.getGridObject("ef_grid_select");
	 var selectedRows = tableGrid.getSelectRowsData();
	 if(selectedRows.length==0)
	 {
	 	alert("请选择字段！");
	 	return;
	 }
	 var gridRows = new Array();
	 for(i = 0;i<selectedRows.length;i++)
	 {
	 	var uc = {};
	 	uc["id"]="-1";
	 	uc["modelId"]=ef.get("inqu_status-0-modelId").value;
	    uc["seqId"]="0";
	    uc["tableName"]=ef.get("inqu_status-0-tableEname").value;
	    uc["tableNickName"]=" ";
	    uc["fieldEname"]=selectedRows[i]["itemEname"];
	    uc["fieldCname"]=selectedRows[i]["itemCname"];
	    uc["fieldType"]=selectedRows[i]["itemType"];
	    uc["fieldLen"]=selectedRows[i]["itemLen"];
	    uc["dateFormat"]=" ";
	    uc["codesetCode"]=" ";
	    uc["condFlag"]="1";
	    uc["condSeq"]="0";
	    uc["operateLogic"]="AND";
	    uc["operatePtfront"]=" ";
	    uc["operateSymbol"]=" ";
	    uc["operatePtback"]=" ";
	    uc["orderFlag"]=" ";
	    uc["orderSeq"]=" ";
	    uc["orderType"]=" ";
	    uc["groupFlag"]=" ";
	    uc["groupSeq"]=" ";
	    uc["specialFlag"]=" ";
	    uc["specialCond"]=" ";
	    uc["recCreator"]=" ";
	    uc["recCreateTime"]=" ";
	    uc["recRevisor"]=" ";
	    uc["recReviseTime"]=" ";
	    uc["archiveFlag"]=" ";
	    gridRows.push(uc);
	 }
	 grid.addRowData( gridRows );
	 subWindow.hide();
}

button_tableselect_onclick = function() {
	subWindow.show();
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

/**
 * 预览SQL按钮事件
 */
button_preview_onclick = function()
{
	var val = ef.get("inqu_status-0-modelId").value;

	 if(val == null || val.trim() == "" || val.trim()=="--请选择--" || val.trim()=="-1")
	 {
	 	alert("请选择模型！");
	 	return;
	 }
	var inInfo = new EiInfo();
	// 设置查询条件
	inInfo.setByNode("ef_region_inqu");
	var serviceName = "EDMD43";
	var queryMethod = "preview";


	EiCommunicator.send(serviceName, queryMethod, inInfo);
	if (ajaxEi == null)
		return;

	document.getElementById("sql").value = ajaxEi.get("sql");
	sqlWindow.show();
}

function treeNodeClicked(node){
   var project = node.project;
   var table = node.key;

   ef.get("inqu_status-0-projectEname").value=project;
   ef.get("inqu_status-0-tableEname").value=table;

   efgrid.submitInqu( "ef_grid_select", "ed","EDMD43","queryTable" );

}