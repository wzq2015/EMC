var dataModelEname = "";
var subWindow;

efform_onload = function ()	{
	subWindow = new EFSubWindow("ef_region_table", "选择表", 900, 500);
	
	efsplitter("leftTree", "leftTreeDiv", "middleSplitter");
//	efregion.show("ef_region_inqu");
}

button_query_onclick = function() {
	efgrid.submitInqu("ef_grid_result", "ed", "EDMD42", "query");
};

button_insert_onclick = function() {
	 if(ef.get("inqu_status-0-modelId").value==null || ef.get("inqu_status-0-modelId").value.trim()=="" || ef.get("inqu_status-0-modelId").value.trim()=="-1")
	 {
	 	alert("请选择数据模型！");
	 	return;
	 }
	efgrid.submitForm("ef_grid_result", "ed", "EDMD42", "insert", true);
};

button_update_onclick = function() {
	efgrid.submitForm("ef_grid_result", "ed", "EDMD42", "update", true);
};

button_delete_onclick = function() {
	if(window.confirm("请谨慎删除模型字段！\n相关的功能可能受到影响！\n确定要删除么？")){
		efgrid.submitForm("ef_grid_result", "ed", "EDMD42", "delete", true);
	}
};

button_return_onclick = function() {
    window.close();
//	window.location.href="DispatchAction.do?efFormEname=EDMD41";
};

function model_select(){
	efgrid.submitInqu("ef_grid_result", "ed", "EDMD42", "query");
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
	    if(selectedRows[i]["tableIndexType"].trim()=="PK")
	    {
	    	uc["isPrimaryKey"]="1";
	    }
	    else
	    {
	    	uc["isPrimaryKey"]="0";
	    }
	    uc["fieldType"]=selectedRows[i]["itemType"];
	    uc["fieldLen"]=selectedRows[i]["itemLen"];
	    uc["dateFormat"]=" ";
	    uc["exprField"]=" ";
	    uc["codesetCode"]=" ";
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

function getNickName(name)
{
	var names=[];
	names = name.split("_");
	var nickName="";
	for(var i=0; i<names.length;i++)
	{
		var item = names[i];
		if(i==0)
		{
			nickName.concat(item.toLowerCase());
		}
		else
		{
			var firstChar = item.charAt(0);
			nickItem = firstChar.toUpperCase();
			var otherChars = item.substring(1,item.length);
			nickItem = nickItem.concat(otherChars);
			nickName.concat(nickItem);
		}
	}
	return nickName;
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

function treeNodeClicked(node){
   var project = node.project;
   var table = node.key;

   ef.get("inqu_status-0-projectEname").value=project;
   ef.get("inqu_status-0-tableEname").value=table;
     
   efgrid.submitInqu( "ef_grid_select", "ed","EDMD42","queryTable" );
   
}