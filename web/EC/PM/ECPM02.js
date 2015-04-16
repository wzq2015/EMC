

//初始化复选框
efgrid_onCellDisplayReady = function( div_node_html, row_index, col_index, col_value_c, display_value, grid_id ){
  var grid = efgrid.getGridObject("ef_grid_p");
  if(grid_id =="ef_grid_p"){
  	var column = grid.getColumn( col_index, TYPE_DATA ); 
  	var name = column.getEname();
  	var nodeId = grid.getCellValue(row_index,0,TYPE_DATA,true);
  	var nodeType = grid.getCellValue(row_index,1,TYPE_DATA,true);
  	if(name=="permitCol"){
  		return "\<div align='center'><input name='permit' type='checkbox' value='ecpermit_"+nodeType+"_"+nodeId+"'/></div>" ;
  	}
  }
}
//----------------------------------批量选择、取消start-------------------------------------
  exCheckedAllOrUn = function(node,name){
       if(node != null){
          var arr = document.getElementsByName(name);
          for(var i=0;i<arr.length;i++){
             arr[i].checked = node.checked;
          }
       }else{
          var colArr = document.getElementsByName(name);
          for(var i=0;i<colArr.length;i++){
              colArr[i].checked = false;
          }
       }
   }
//-------------------------------------------end-------------------------------------------
//选择角色
button_selectrole_onclick = function() 
{
  efform.openNewForm("ESUT10", "chooseType=POST,PSTP&&efFormPopup=1");
}

//批量授权
button_batchgrant_onclick = function() 
{
  var sel = getSelection();
  if ( sel == "" ){
    alert( "请选中需要授权的站点权限资源!" );
    return;
  }
  document.getElementById("inqu_status-0-authorize").value = sel; 
  efgrid.submitForm( "ef_grid_r", "es","ES50","insert", true );  
  var page_grid = efgrid.getGridObject("ef_grid_p");
  page_grid._clearSelect();
  page_grid.refresh();  	
  exCheckedAllOrUn(null,"checkAuth");
}

//获取选中的栏目权限资源
getSelection = function() 
{
  var auths = [];
  var res_grid = efgrid.getGridObject("ef_grid_p");
  
  var visit = document.getElementsByName("permit");//获取所有permit复选对象
  for(var i=0; i<visit.length; i++){
  	if(visit[i].checked){//获取所有选中对象
  	    auths.push("TYPE_EC|");
  		auths.push(visit[i].value);
  		auths.push(",");
  	}
  }
  return auths.join('');
}

//回调函数
efform_onPopupReturn = function(eform, rows){    
  var grid = efgrid.getGridObject( "ef_grid_r" ); 
  var tempArray = new Array();

  for( var i=0; i<rows.length; i++ ){
    var row = rows[i];  
    var uc = {};
    uc.clazz = row["clazz"];//post
    uc.clazzName = row["className"];
    uc.identity = row["id"];
    uc.desc = row["name"];
    tempArray.push(uc);
  }
  grid.addRowData(tempArray, false );
}

//查看权限
button_query_onclick = function (target){

  var res_grid = efgrid.getGridObject("ef_grid_p");
   var permit = document.getElementsByName("permit");
   var j =0;
   var target;
   
    for(var i=0; i<permit.length; i++){
  	if(permit[i].checked){//获取所有选中对象
  	    if (j==0){
  	      target = permit[i].value;
  	      j++;
  	    }else{
  	      alert("只能对其中一个资源进行查看！");
  	      return false;
  	    }
  	}
  }
   
  if (j==0){
    alert("请选择其中一个资源！");
    return false;
  }else{
      document.getElementById("inqu_status-target").value=target; // 资源对象 
      document.getElementById("inqu_status-type").value="TYPE_EC";  
      efgrid.submitInqu("ef_grid_c", "es","ES50","query");
  }
}

// 删除权限
button_delete_onclick = function() 
{
  efgrid.submitForm( "ef_grid_c", "es","ES50","delete", true );
}

var tableTreeModel =  new eiTreeModel('ECTree');
efform_onload = function ()
{
  efsplitter("leftTree", "leftTreeDiv", "middleSplitter"); 
}
function configTree(tree){
  tree.emptyNodeAsLeaf = false;
  tree.activeEmptyJudger = false;
  tree.topNodeActive = false;
  tree.nodeInitializer = treeNodeInitializer;
  tree.expand();
}

function treeTopNodeClicked(topNode){
	treeNode=topNode;
	efgrid.submitInqu( "ef_grid_p", "ec","ECPM02","querySiteList");   
}

function treeNodeInitializer(node)
{
	 if ( node.top() ){ 
		   	node.active(true);
		   	node.textClicked = function(){ treeTopNodeClicked( node ); };	
		   	return;
	 };  
 node.textClicked = function(){ treeNodeClicked( node ); };
  if ( node.leaf() ){ 
    node.icon("EF/Images/eftree_file.png");
    node.openIcon("EF/Images/eftree_file.png");
    return;
  }else{
      node.icon("EF/Images/eftree_foldericon.png");
    node.openIcon("EF/Images/eftree_openfoldericon.png");
  }   
}

function treeNodeClicked(node){
   var label=node._label;
   
   var type=[];
   var parentType;
   var parentId
   type=label.split('@');
  
   if(type.length>=2){
   parentId=type[1];
   parentType=type[0];
   }
   
  
   if(parentType=='site')
     parentType='0';
     else if(parentType=='column')
     parentType='1';
    
   document.getElementById("inqu_status-0-parentId").value=parentId;
   document.getElementById("inqu_status-0-columnId").value=parentId;
   document.getElementById("inqu_status-0-parentType").value=parentType;

   efgrid.submitInqu( "ef_grid_p", "ec","ECPM02","queryColumnList");   
}
//删除角色集合
button_deleterole_onclick = function(){
	var grid = efgrid.getGridObject("ef_grid_r");
	var rowLength = grid.getCheckedRows().length;
	for(i=rowLength-1;i>=0;i--){
		grid.removeRow(grid.getCheckedRows()[i]);
	}
	grid.refresh();	
	efform.setStatus(0,"删除"+rowLength+"条记录成功!");
}
