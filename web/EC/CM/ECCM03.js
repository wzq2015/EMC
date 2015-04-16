

//初始化复选框
efgrid_onCellDisplayReady = function( div_node_html, row_index, col_index, col_value_c, display_value, grid_id ){
  var grid = efgrid.getGridObject("ef_grid_p");
  if(grid_id =="ef_grid_p"){
  	var column = grid.getColumn( col_index, TYPE_DATA ); 
  	var name = column.getEname();
  	if(name=="visitCol"){
  		return "\<div align='center'><input name='visit' type='checkbox' value='column_"+grid.getCellValue(row_index,0,TYPE_DATA,true )+"_visit'/></div>" ;
  	}else if(name=="manageCol"){
  		return "\<div align='center'><input name='manage' type='checkbox' value='column_"+grid.getCellValue(row_index,0,TYPE_DATA,true )+"_manage'/></div>" ;
  	}else if(name=="templateCol"){
  		return "\<div align='center'><input name='template' type='checkbox' value='column_"+grid.getCellValue(row_index,0,TYPE_DATA,true )+"_template'/></div>" ;
  	}else if(name=="auditCol"){
  		return "\<div align='center'><input name='audit' type='checkbox' value='column_"+grid.getCellValue(row_index,0,TYPE_DATA,true )+"_audit'/></div>" ;	
  	}else if(name=="articlemanageCol"){
  		return "\<div align='center'><input name='articlemanage' type='checkbox' value='column_"+grid.getCellValue(row_index,0,TYPE_DATA,true )+"_articlemanage'/></div>" ;	
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
  exCheckedAllOrUn(null,"colCheckAuth");
}

//获取选中的栏目权限资源
getSelection = function() 
{
  var auths = [];
  var res_grid = efgrid.getGridObject("ef_grid_p");
  
  var visit = document.getElementsByName("visit");//获取所有manage复选对象
  for(var i=0; i<visit.length; i++){
  	if(visit[i].checked){//获取所有选中对象
  	    auths.push("TYPE_EC|");
  		auths.push(visit[i].value);
  		auths.push(",");
  	}
  }
  
  var manage = document.getElementsByName("manage");//获取所有manage复选对象
  for(var i=0; i<manage.length; i++){
  	if(manage[i].checked){//获取所有选中对象
  	    auths.push("TYPE_EC|");
  		auths.push(manage[i].value);
  		auths.push(",");
  	}
  }
  var template = document.getElementsByName("template");//获取所有template复选对象
  for(var i=0; i<template.length; i++){
  	if(template[i].checked){
  	    auths.push("TYPE_EC|");
  		auths.push(template[i].value);
  		auths.push(",");
  	}
  }
  var audit = document.getElementsByName("audit");//获取所有audit复选对象
  for(var i=0; i<audit.length; i++){
  	if(audit[i].checked){
  	    auths.push("TYPE_EC|");
  		auths.push(audit[i].value);
  		auths.push(",");
  	}
  }
  var articlemanage = document.getElementsByName("articlemanage");//获取所有articlemanage复选对象
  for(var i=0; i<articlemanage.length; i++){
  	if(articlemanage[i].checked){
  	    auths.push("TYPE_EC|");
  		auths.push(articlemanage[i].value);
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
   var visit = document.getElementsByName("visit");
   var manage = document.getElementsByName("manage");
   var template = document.getElementsByName("template");
   var audit = document.getElementsByName("audit");
   var articlemanage = document.getElementsByName("articlemanage");
   var j =0;
   var target;
   
    for(var i=0; i<visit.length; i++){
  	if(visit[i].checked){//获取所有选中对象
  	    if (j==0){
  	      target = visit[i].value;
  	      j++;
  	    }else{
  	      alert("只能对其中一个资源进行查看！");
  	      return false;
  	    }
  	}
  }
   
   for(var i=0; i<manage.length; i++){
  	if(manage[i].checked){//获取所有选中对象
  	    if (j==0){
  	      target = manage[i].value;
  	      j++;
  	    }else{
  	      alert("只能对其中一个资源进行查看！");
  	      return false;
  	    }
  	}
  }
   for(var i=0; i<template.length; i++){
  	if(template[i].checked){//获取所有选中对象
  	    if (j==0){
  	      target = template[i].value;
  	      j++;
  	    }else{
  	      alert("只能对其中一个资源进行查看！");
  	      return false;
  	    }
  	}
  }
  for(var i=0; i<audit.length; i++){
  	if(audit[i].checked){//获取所有选中对象
  	    if (j==0){
  	      target = audit[i].value;
  	      j++;
  	    }else{
  	      alert("只能对其中一个资源进行查看！");
  	      return false;
  	    }
  	}
  }
  for(var i=0; i<articlemanage.length; i++){
  	if(articlemanage[i].checked){//获取所有选中对象
  	    if (j==0){
  	      target = articlemanage[i].value;
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
  debugger;
  alert(ajaxEi.getMsg());
}

var tableTreeModel =  new eiTreeModel('ECCM04');
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

function treeNodeInitializer(node)
{
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
	var selfAble = (node._label).split("@")[3];
	  if(selfAble=="false"){
	     alert("没有权限，不允许访问!");
	     return ;
	  }
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

   efgrid.submitInqu( "ef_grid_p", "ec","ECCM03","queryList");   
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
