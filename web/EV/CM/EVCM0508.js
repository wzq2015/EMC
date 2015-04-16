var tableTreeModel =  new eiTreeModel('EVCM0507');
function settingNodeId(){
	ef.get("inqu_status-0-parentNodeId").value="ROOT";
	checkAuth();
}

efform_onload = function ()
{
   var info=_getEi();
   var nodevalue = info.get("useNode");
 
   var iframe=parent.document.getElementById('mainFrame');
  
   if(nodevalue!=null && nodevalue =="false" ){
   alert("该模式下不能进行此操作!");
		 window.close();
	
	if(parent.document.location.href !=  document.location.href){
		 iframe.src="";
		 }
   }  
		
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
   var nodeId=node._label;
   ef.get("inqu_status-0-parentNodeId").value=nodeId;
   checkAuth();
}

function checkAuth(){

   ef.get("inqu_status-0-authType").value="accredit";  
   var info = new EiInfo();
   info.setByNode("evcm0508_inqu"); 
   EiCommunicator.send( "EVCM0508", "checkAuth" , info, null ); 
   if(ajaxEi!=null){
		    var infoMsg=ajaxEi.getMsg();
		    if(infoMsg!="true"){
			   alert(infoMsg);
		       return  false;
		    }else{
		    	efgrid.submitInqu( "ef_grid_p", "ev","EVCM0508","query");   
		    }
		}
}

//初始化复选框
efgrid_onCellDisplayReady = function( div_node_html, row_index, col_index, col_value_c, display_value, grid_id ){
  var grid = efgrid.getGridObject("ef_grid_p");
  if(grid_id =="ef_grid_p"){
  	var node = grid.getColumn( col_index, TYPE_DATA ); 
  	var name = node.getEname();
  	if(name=="maintainCol"){
  		return "\<div align='center'><input name='maintain' type='checkbox' value='node_"+grid.getCellValue(row_index,0,TYPE_DATA,true )+"_maintain'/></div>" ;
  	}else if(name=="accreditCol"){
  		return "\<div align='center'><input name='accredit' type='checkbox' value='node_"+grid.getCellValue(row_index,0,TYPE_DATA,true )+"_accredit'/></div>" ;
  	}else if(name=="accessCol"){
  		return "\<div align='center'><input name='access' type='checkbox' value='node_"+grid.getCellValue(row_index,0,TYPE_DATA,true )+"_access'/></div>" ;	
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
   var maintain = document.getElementsByName("maintain");
   var accredit = document.getElementsByName("accredit");
   var access = document.getElementsByName("access");
   var j =0;
   var target;
   for(var i=0; i<maintain.length; i++){
  	if(maintain[i].checked){//获取所有选中对象
  	    if (j==0){
  	      target = maintain[i].value;
  	      j++;
  	    }else{
  	      alert("只能对其中一个资源进行查看！");
  	      return false;
  	    }
  	}
  }
   for(var i=0; i<accredit.length; i++){
  	if(accredit[i].checked){//获取所有选中对象
  	    if (j==0){
  	      target = accredit[i].value;
  	      j++;
  	    }else{
  	      alert("只能对其中一个资源进行查看！");
  	      return false;
  	    }
  	}
  }
  for(var i=0; i<access.length; i++){
  	if(access[i].checked){//获取所有选中对象
  	    if (j==0){
  	      target = access[i].value;
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
      ef.get("inqu_status-target").value=target; // 资源对象 
      ef.get("inqu_status-type").value="TYPE_EV2";  
      efgrid.submitInqu("ef_grid_c", "es","ES50","query");
  }
}

//获取选中的栏目权限资源
getSelection = function() 
{
  var auths = [];
  var res_grid = efgrid.getGridObject("ef_grid_p");
  var maintain = document.getElementsByName("maintain");//获取所有maintain复选对象
  for(var i=0; i<maintain.length; i++){
  	if(maintain[i].checked){//获取所有选中对象
  	    auths.push("TYPE_EV2|");
  		auths.push(maintain[i].value);
  		auths.push(",");
  	}
  }
  var accredit = document.getElementsByName("accredit");//获取所有accredit复选对象
  for(var i=0; i<accredit.length; i++){
  	if(accredit[i].checked){
  	    auths.push("TYPE_EV2|");
  		auths.push(accredit[i].value);
  		auths.push(",");
  	}
  }
  var access = document.getElementsByName("access");//获取所有access复选对象
  for(var i=0; i<access.length; i++){
  	if(access[i].checked){
  	    auths.push("TYPE_EV2|");
  		auths.push(access[i].value);
  		auths.push(",");
  	}
  }
  return auths.join('');
}

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
    alert( "请选中需要授权的节点权限资源!" );
    return;
  }
  ef.get("inqu_status-0-authorize").value = sel; 
  efgrid.submitForm( "ef_grid_r", "es","ES50","insert", true );  
  var page_grid = efgrid.getGridObject("ef_grid_p");
  page_grid._clearSelect();
  page_grid.refresh();  	
  exCheckedAllOrUn(null,"portalTreeCheckCol");
}
function efgrid_onAjaxSubmitSuccess( grid_id, service_name, method_name, eiInfo ){
	  if ( grid_id != "ef_grid_r" ){
	    var ef_grid = efform.getGrid( grid_id );	 
	    ef_grid.refresh( eiInfo );
	  }
}
// 删除权限
button_delete_onclick = function() 
{
  efgrid.submitForm( "ef_grid_c", "es","ES50","delete", true );
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