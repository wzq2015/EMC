var tableTreeModel =  new eiTreeModel('EDMD56Tree');
var treeNode;
efform_onload = function ()
{
   var split = efsplitter("leftTree", "leftTreeDiv", "middleSplitter");
}
function configTree(tree){
  tree.emptyNodeAsLeaf = false;
  tree.activeEmptyJudger = false;
  tree.topNodeActive = false;
  tree.nodeInitializer = treeNodeInitializer;
  tree.expand();
}
function treeNodeInitializer(node){
	 if (node.top()){
	    node.active(true);
	   	node.textClicked = function(){ treeTopNodeClicked( node ); };
	   	return;
	 };
	  node.textClicked = function(){ treeNodeClicked( node ); };
}
function treeTopNodeClicked(topNode){
	treeNode=topNode;
    ef.get("inqu56_status-0-compType").value = "";
    ef.get("inqu56_status-0-controlId").value = "";
    efgrid.submitInqu( "ef_grid_result56", "ed","EDMD56","query");
}
function treeNodeClicked(node){
   treeNode=node;
   var key = node.key;
   if(key == "0"){
	   ef.get("inqu56_status-0-compType").value = node._label;
	   ef.get("inqu56_status-0-controlId").value = "";
	   setDisplay("56");
	   efgrid.submitInqu( "ef_grid_result56", "ed","EDMD56","query");
   }else{
	   ef.get("inqu57_status-0-hidden_cmpName").value = node._text;
	   ef.get("inqu57_status-0-controlId").value = node._label;
	   setDisplay("57");
	   efgrid.submitInqu( "ef_grid_result57", "ed","EDMD57","query");
   }
}
reloadCurrentNode = function()
{
	nTree.reload(tableTreeModel);
}

//控制div显示
function setDisplay(flag){
	if(flag == "56"){
		ef.get("ef_region_all56").style.display = "block";
		ef.get("ef_region_all57").style.display = "none";
		ef.get("ef_grid_all56").style.display = "block";
		ef.get("ef_grid_all57").style.display = "none";
	}else{
		ef.get("ef_region_all56").style.display = "none";
		ef.get("ef_region_all57").style.display = "block";
		ef.get("ef_grid_all56").style.display = "none";
		ef.get("ef_grid_all57").style.display = "block";
	}
}

/** 56控件维护 */
//查询56
button_query56_onclick = function () {
    efgrid.submitInqu( "ef_grid_result56", "ed","EDMD56","query");
}
//删除 56
button_delete56_onclick = function ()
{
	if(validateSel56()){
		if(window.confirm("确定要删除么？")){
		  	efgrid.submitForm( "ef_grid_result56", "ED","EDMD56","delete", true,false,true );
		  	reloadCurrentNode();
		}
	}else{
		alert('请先选择数据！');
	}
}
// 新增56
button_insert56_onclick = function ()
{
	if(validateSel56()){
		efgrid.submitForm( "ef_grid_result56", "ED","EDMD56","insert",true );
	  	reloadCurrentNode();
	}else{
		alert('请先选择数据！');
	}
}

//修改56
button_update56_onclick = function ()
{
	if(validateSel56()){
		efgrid.submitForm( "ef_grid_result56", "ed","EDMD56","update",true );
	  	reloadCurrentNode();
	}else{
		alert('请先选择数据！');
	}
}
//验证56
function validateSel56(){
	var grid = efgrid.getGridObject("ef_grid_result56");
  	var rows = grid.getCheckedRows();
  	if(rows == ''){
  		return false;
  	}
  	return true;
}

/**57 控件属性维护*/
//查询57
button_query57_onclick = function () {
    ef.get("inqu57_status-0-hidden_cmpName").value = "";
    ef.get("inqu57_status-0-controlId").value = "";
    efgrid.submitInqu( "ef_grid_result57", "ed","EDMD57","query");
    //loadTree();
}
// 删除57
button_delete57_onclick = function ()
{
	if(validateSel57()){
		if(window.confirm("确定要删除么？")){
		  	efgrid.submitForm( "ef_grid_result57", "ED","EDMD57","delete", true);
		  	//loadTree();
		}
	}else{
		alert('请先选择数据！');
	}
}
// 新增 57
button_insert57_onclick = function ()
{
	if(validateSel57()){
		efgrid.submitForm( "ef_grid_result57", "ED","EDMD57","insert",true );
		//loadTree();
	}else{
		alert('请先选择数据！');
	}
}

//修改 57
button_update57_onclick = function ()
{
	if(validateSel57()){
		efgrid.submitForm( "ef_grid_result57", "ed","EDMD57","update",true );
		//loadTree();
	}else{
		alert('请先选择数据！');
	}
}
//验证 57
function validateSel57(){
	var grid = efgrid.getGridObject("ef_grid_result57");
  	var rows = grid.getCheckedRows();
  	if(rows == ''){
  		return false;
  	}
  	return true;
}
/* 添加一行信息 加载控件信息 */
efgrid_onAddNewRow = function( grid_id ){
	if(grid_id == "ef_grid_result56"){
		return true;
	}
	var grid = efgrid.getGridObject( grid_id );
	var id = ef.get("inqu57_status-0-controlId").value;
	var cname = ef.get("inqu57_status-0-hidden_cmpName").value;
	if(id == ""||cname==""){
		alert("请选择控件名称！");
		return false;
	}else{
		var tempArray = new Array();
	    var uc = {};
	    uc.controlName = cname;
	    uc.compId = id;
	    tempArray.push(uc);
		grid.addRowData(tempArray, false );
		return false;
	}
}

