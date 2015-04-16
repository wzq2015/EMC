//	弹出站点栏目选择窗口
button_selectColumn_onclick = function() {
	efwindow.show(ef.getNodeById("inqu_status-0-columnName"), "selectColumn", "fixed");
}

var tableTreeModel = new eiTreeModel("ECCM04");

// 定义树组件
function configTree(tree) {
	tree.emptyNodeAsLeaf = false;
	tree.activeEmptyJudger = false;
	tree.topNodeActive = false;
	tree.nodeInitializer = treeNodeInitializer;
}

//	初始化树组件
function treeNodeInitializer(node) {
	node.type(new radioItemType(false));
	node.textClicked = function() {
		treeNodeClicked(node);
	};
	if (node.depth() == 1) {
		node.icon("EF/Images/eftree_foldericon.png");
		node.openIcon("EF/Images/eftree_openfoldericon.png");
	} else if (node.depth() > 1) {
		node.icon("EF/Images/eftree_file.png");
		node.openIcon("EF/Images/eftree_file.png");
	}
}

//	点击确定按钮
button_confirm_onclick = function() {
	var option = nTree.getOption();
		//alert(option);
	if (option==""){
	alert("请选择站点栏目!");
	return;
	}
    if (option == null) {
		efwindow.hide();
		ef.get("inqu_status-0-columnid").value = "";
		ef.get("inqu_status-0-siteid").value = "";
		ef.get("inqu_status-0-columnName").value = "全部";
		return;
	}
   	var selectedItem = option.split("@");
    //alert(selectedItem[1]);
	if (selectedItem[0] == "column") {
	    var name = nTree.option._text;
		ef.get("inqu_status-0-columnid").value = selectedItem[1];
		ef.get("inqu_status-0-siteid").value = "";
		ef.get("inqu_status-0-columnName").value = name;
		efwindow.hide();
	} 
	if(selectedItem[0] == "site") {
	    var name = nTree.option._text;
	    ef.get("inqu_status-0-siteid").value = selectedItem[1];
	    ef.get("inqu_status-0-columnid").value = "";
	    ef.get("inqu_status-0-columnName").value = name;
		efwindow.hide();
	}
	
}

//	点击取消按钮
button_cancel_onclick = function() {
	efwindow.hide();
}


efform_onload = function ()
{
 efregion.show("ef_region_result")
}
/*
  点击查询按钮后调用后台的service
*/
button_query_onclick = function () 
{    var columnname=ef.get("inqu_status-0-columnName").value;
    if(columnname==""){
    ef.get("inqu_status-0-columnid").value="";
    ef.get("inqu_status-0-siteid").value="";
    }
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
	efgrid.submitInqu( "ef_grid_result", "ec","ECSA07","query");
}

/*
  文章标题、访问量超链接
*/
efgrid_onDataCellClick = function( ef_grid_result, row_index, col_index, cell_value ) {
     /*debugger;*/
      var grid=efgrid.getGridObject("ef_grid_result");
      var columnEname = grid.getColumn(col_index, TYPE_DATA).getEname();
      var value=grid.getCellValue(row_index,0,TYPE_DATA); 
      var columnid=grid.getCellValue(row_index,0,TYPE_DATA,true); 
    
      //alert(value);
   /* 文章标题超链接*/
   if (columnEname=="articleid"){
      var objId = value;
     //alert(objId+"+++"+value);
	  var nodeType="a";
	  var info = new EiInfo();
	  info.set("artId",objId);
	  EiCommunicator.send( "ECTM10", "getUrl" , info, null );
	  url=ajaxEi.get("url");
	  efform.openNewForm('ECTM40',"key="+url);
	  //efform.openNewForm('ECTM40',"nodeId="+objId+"&nodeType="+nodeType+"&templateType=3");

      }
   
    /*文章访问量超链接*/ 
	if (columnEname=="visitednum"){
		var childWindow = efform.openNewForm('ECSA08', "serviceName=ECSA08&methodName=query&inqu_status-0-nodeId=" + value);
		childWindow.focus();
	    }
      
}

//日历控件的操作
efcalendar_click = function (control_source, id) {
  var node = ef.getNodeById(id);
  efcalendar(control_source, node, 'yyyymmdd', true);
}
