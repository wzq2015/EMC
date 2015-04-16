efform_onload = function ()
{
  efsplitter("leftTree", "leftTreeDiv", "middleSplitter");
  ef.get("inqu_status-0-columnId").value="site";
  ef.get("inqu_status-0-articleState").value="50";
  ef.get("inqu_status-0-articleState").readOnly=true;
}	
//将引用的文章，用红色标记出来
efgrid_onGridDisplayReady=function(div_node)
{

  if(div_node.id=="ef_grid_result")
  {
     var grid=efgrid.getGridObject("ef_grid_result");
     var rowCount=grid.getRowCount();
     for(var i=0;i<rowCount;i++)
     {
       var isRefer=grid.getCellValue(i,0,TYPE_DATA,true).trim();

       if(isRefer.length>0)
         efgrid.setRowDisplayStyle(div_node.id,i,"show");
     }    
     }
     
}
efcalendar_click = function (control_source, id) {
  var node = ef.getNodeById(id);
  efcalendar(control_source, node, 'yyyymmdd', true);
}
var tableTreeModel =  new eiTreeModel('ECAM00');

function configTree(tree){
  tree.emptyNodeAsLeaf = false;
  tree.activeEmptyJudger = false;
  tree.topNodeActive = false;
  tree.nodeInitializer = treeNodeInitializer;
  tree.expand();
}

function treeNodeInitializer(node){
 node.textClicked = function(){ treeNodeClicked( node ); };
    
 /* if ( node.leaf() ){ 
    node.icon("EF/Images/eftree_file.png");
    node.openIcon("EF/Images/eftree_file.png");
    return;
  }else{
      node.icon("EF/Images/eftree_foldericon.png");
    node.openIcon("EF/Images/eftree_openfoldericon.png");
  }  
  */
  if(node.depth() == 1) {
    node.icon("EF/Images/eftree_foldericon.png");
    node.openIcon("EF/Images/eftree_openfoldericon.png");
  }else if(node.depth()>1){
     node.icon("EF/Images/eftree_file.png");
    node.openIcon("EF/Images/eftree_file.png");
  }   
}

function treeNodeClicked(node){
  var column = node.key;
  ef.get("inqu_status-0-columnId").value=column;
  var isRefer;
  if(column!="site"){
      var selfAble = (node._label).split("@")[3];
	  if(selfAble=="false"){
	     ef.get("inqu_status-0-columnId").value="site";
	     alert("没有权限，不允许访问！");
	     return ;
	  }
     efgrid.submitInqu( "ef_grid_result", "ec","ECAM04","isRefer");
  if(ajaxEi!=null)
  {
     isRefer=ajaxEi.get("isRefer");
     if(isRefer=="0"){
      ef.get("inqu_status-0-columnId").value="site";
       alert("该栏目的文章不允许被引用");
       }
       else
       efgrid.submitInqu( "ef_grid_result", "ec","ECAM01","query");
  }
  }
}
//点击查询按钮
button_query_onclick = function () {
   efgrid.submitInqu( "ef_grid_result", "ec","ECAM01","query");
}
//点击取消按钮
button_cancel_onclick=function(){
  window.close();
}
//点击确定按钮
button_confirm_onclick=function(){
  var grid=efgrid.getGridObject("ef_grid_result");
   var rowCount=grid.getCheckedRowCount();
   var sourceColumnId=ef.get("inqu_status-0-columnId").value;
   var referColumnId=ef.get("inqu_status-0-referColumnId").value;
   var conflict;
   if(rowCount>0)
   {
     if(sourceColumnId==referColumnId){
     alert("不可在同栏目下进行引用");
     return;
     }
     else{
    efgrid.submitForm( "ef_grid_result", "ec","ECAM04","refer",true,false,true);
    if(ajaxEi!=null){
      conflict=ajaxEi.get("conflict");
      if(conflict=="true"){
         alert("不可重复引用同文章");
        button_query_onclick();
         return;
         }
     if (!window.opener.closed) {
	             window.opener.efform_onPopupReturn("ECAM02", "0");	
             }
               
     }
     }
   }
   window.close();
     
}

