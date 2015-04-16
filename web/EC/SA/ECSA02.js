
//	设置序号
efgrid_onCellDisplayReady = function(div_node_html, row_index, col_index,
		cell_value, display_value, grid_id) {
	if (grid_id == "ef_grid_result" && col_index == 0) {
		var ei = _getEi();
		var grid = efgrid.getGridObject(grid_id);
		var num = grid.getOffset() + row_index + 1;
		return "<div>"+num+"</div>";
	}
}

//	弹出站点栏目选择窗口
button_selectColumn_onclick = function() {
	efwindow.show(ef.getNodeById("inqu_status-0-columnname"), "selectColumn", "fixed");
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
		ef.get("inqu_status-0-columnname").value = "全部";
		return;
	}
   	var selectedItem = option.split("@");
    //alert(selectedItem[1]);
	if (selectedItem[0] == "column") {
	    var name = nTree.option._text;
		ef.get("inqu_status-0-columnid").value = selectedItem[1];
		ef.get("inqu_status-0-siteid").value = "";
		ef.get("inqu_status-0-columnname").value = name;
		efwindow.hide();
	} 
	if(selectedItem[0] == "site") {
	    var name = nTree.option._text;
	    ef.get("inqu_status-0-siteid").value = selectedItem[1];
	    ef.get("inqu_status-0-columnid").value = "";
	    ef.get("inqu_status-0-columnname").value = name;
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
{    var columnname=ef.get("inqu_status-0-columnname").value;
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
	efgrid.submitInqu( "ef_grid_result", "ec","ECSA02","query");
}


/*
  文章数目超链接
*/
efgrid_onDataCellClick = function( ef_grid_result, row_index, col_index, cell_value ) {
 var grid=efgrid.getGridObject("ef_grid_result");
      var value=grid.getCellValue(row_index,0,TYPE_DATA,true); 
      var columnName=grid.getCellValue(row_index,2,TYPE_DATA); 
      var columnEname = grid.getColumn(2,TYPE_DATA).getEname();
      var TimeStart= ef.get("inqu_status-0-TimeStart").value;
      var TimeEnd= ef.get("inqu_status-0-TimeEnd").value;
        //alert(value+"==="+columnEname);
 if (columnEname=="columnname"){
      var childWindow = efform.openNewForm('ECSA07', "serviceName=ECSA07&methodName=query&inqu_status-0-columnid=" + value+"&inqu_status-0-TimeStart="+TimeStart+"&inqu_status-0-TimeEnd="+TimeEnd+"&columnEname="+encodeURI(columnName));
      childWindow.focus();
    }
      
}
//日历控件的操作
efcalendar_click = function (control_source, id) {
  var node = ef.getNodeById(id);
  efcalendar(control_source, node, 'yyyymmdd', true);
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
		//3D柱状图调用后台数据
		var chartType = "Column3D";
		var data="0";
		var showValue=document.getElementById("isPicture").checked;
		if(showValue){
			showValue="1";
		}else{
			showValue="0";
		}
		var bgcolor="4DB39E"//"A25E79";
		var plotcolor="22B8DD";
		
		var columnid = ef.get("inqu_status-0-columnid").value;
		var siteid = ef.get("inqu_status-0-siteid").value;	
		var TimeStart = ef.get("inqu_status-0-TimeStart").value;
		var TimeEnd = ef.get("inqu_status-0-TimeEnd").value;
		
		var number = ef.get("count").value;
		var patrn=/^[1-9]\d*$/; 
		if(!patrn.exec(number)){
			alert("只能输入正整数!");
			return false;
		}
		
		ef.get("chart").src="DispatchAction.do?efFormEname=ECSA0101&chartType="+chartType+"&data="+data+"&showValues="+showValue+"&bgcolor="+bgcolor+"&plotcolor="+plotcolor
		+"&columnid="+columnid+"&siteid="+siteid+"&TimeStart="+TimeStart+"&TimeEnd="+TimeEnd+"&number="+number;
}

