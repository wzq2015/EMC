efform_onload = function ()
{
 efsplitter("leftTree", "leftTreeDiv", "middleSplitter");
 document.getElementById('file').style.display = "none";
  efbutton.setButtonStatus("insert", false);
  efbutton.setButtonStatus("delete", false);
  efbutton.setButtonStatus("update", false);
}
//日历控件的操作
efcalendar_click = function (control_source, id) {
  var node = ef.getNodeById(id);
  efcalendar(control_source, node, 'yyyymmdd', true);
}
var tableTreeModel =  new eiTreeModel('ECDM00');
var treeNode;
function configTree(tree){
  tree.emptyNodeAsLeaf = false;
  tree.activeEmptyJudger = false;
  tree.topNodeActive = false;
  tree.nodeInitializer = treeNodeInitializer;
  tree.expand();
}

function treeNodeInitializer(node){
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
 treeNode=node;
if(node.leaf()){

 document.getElementById('fileType').style.display = "none";
 document.getElementById('file').style.display = "";
  ef.get("inqu1_status-0-parentType").value=node.key;
 ef.get("inqu1_status-0-typeId").value=node._label;
 efgrid.submitInqu( "ef_grid_result1", "ec","ECDM01","queryFile");
  var grid = efgrid.getGridObject( "ef_grid_result1" );
 grid.paint();
 }else{
  efbutton.setButtonStatus("insert", true);
  efbutton.setButtonStatus("delete", true);
  efbutton.setButtonStatus("update", true);
 document.getElementById('fileType').style.display = "";
 document.getElementById('file').style.display = "none";
 ef.get("inqu_status-0-parentType").value=node._label;
 efgrid.submitInqu( "ef_grid_result", "ec","ECDM01","query");
 var grid = efgrid.getGridObject( "ef_grid_result" );
 grid.paint();
 }
}

efgrid_onCellDisplayReady = function( div_node_html, row_index, col_index, col_value_c, display_value, grid_id )
{
     if(grid_id=="ef_grid_result1"){
	     var grid = efgrid.getGridObject( "ef_grid_result1" );
	     var columnEname = grid.getColumn(col_index, TYPE_DATA).getEname();
	     var value=ef.get("inqu1_status-0-parentType").value; 
	     
	     if(columnEname=="preview"){ 
	        if(value=='1'){
	        	return "\<input value='预览' class='buttonclass' type='button' align='center' onclick='efgrid_onDataCellClick(\""+grid_id+"\",\""+row_index+"\",\""+col_index+"\",\""+value+"\")'>" ;
	        }
	     }
      }
}

efgrid_onDataCellClick=function(grid_id,row_index,col_index,cell_value)
{
   left1=(screen.availWidth-400)/2 ;
	top1=(screen.availHeight-200)/2 ;
  if(grid_id=="ef_grid_result1")
   { 
     var grid=efgrid.getGridObject("ef_grid_result1");
      if(col_index==4){   
    	var filePath=grid.getCellValue(row_index,2,TYPE_DATA,true);
        var param1={"filePath":encodeURI(filePath)};
    	var fileId=grid.getCellValue(row_index,0,TYPE_DATA,true);
    	var param2={"fileId":encodeURI(fileId)};
    	param1 = jQuery.param(param1);
    	param2 = jQuery.param(param2);
      window.open("./EC/DM/ECDM0103.jsp?"+ param1 +"&"+ param2,"","left="+left1+",top="+top1+",width=1000,height=800,resizable=yes,depend=yes");   
    //  window.open("/showImage?filePath="+filePath,"","left="+left1+",top="+top1+",width=1000,height=800,resizable=yes,depend=yes");
      }
      }
}
/*
  点击查询按钮后调用后台的service
*/

button_query_onclick = function () 
{
	efgrid.submitInqu( "ef_grid_result", "ec","ECDM01","query");
	
}

/*
  点击删除按钮后调用后台的service
*/
button_delete_onclick = function () 
{
  	efgrid.submitForm( "ef_grid_result", "ec","ECDM01","delete", true );
    if(ajaxEi!=null)
      {   
         var flag=ajaxEi.get("flag");
         if(flag=="false")
            alert("类别下有文件，无法删除类别");
      }
      if(treeNode!=null)
      treeNode.reload();
}

/*
  点击新增按钮后调用后台的service
*/
button_insert_onclick = function () 
{
	efgrid.submitForm( "ef_grid_result", "ec","ECDM01","insert",true );
    if(ajaxEi!=null){
       var flag=ajaxEi.get("flag");
       if(flag=="false"){
          alert("该类别下已经有同名自定义类别，请更换类别名称！");
       }
    }
    if(treeNode!=null)
	treeNode.reload();
	
}

/*
  点击修改按钮后调用后台的service
*/
button_update_onclick = function () 
{
	efgrid.submitForm( "ef_grid_result", "ec","ECDM01","update",true );
	if(ajaxEi!=null){
       var flag=ajaxEi.get("flag");
       if(flag=="false"){
          alert("该类别下已经有同名自定义类别，请更换类别名称！");
       }
    }
    if(treeNode!=null)
    treeNode.reload();
}
button_upload_onclick=function()
{
   left1=(screen.availWidth-400)/2 ;
	top1=(screen.availHeight-200)/2 ;
    typeId=ef.get("inqu1_status-0-typeId").value;
    type=ef.get("inqu1_status-0-parentType").value;
	window.open("./EC/DM/ECDM0101.jsp?typeId="+typeId+"&type="+type,"","left="+left1+",top="+top1+",width=400,height=250,resizable=yes,depend=yes");
   
}
button_query1_onclick=function()
{
  efgrid.submitInqu( "ef_grid_result1", "ec","ECDM01","queryFile");
}
button_update1_onclick=function()
{
  efgrid.submitForm( "ef_grid_result1", "ec","ECDM01","updateFile",true );
  
}
button_delete1_onclick=function()
{	
	var grid = efgrid.getGridObject( "ef_grid_result1" );
   	var rows=grid.getCheckedRows();
  	if(rows.length==0){
  		alert("请选择需要删除的记录！");
  		return ;
  	}
  	
	if(confirm("确认删除吗?")){
 		efgrid.submitForm( "ef_grid_result1", "ec","ECDM01","deleteFile",true );
	}
}
efform_onPopupReturn = function(winId, returnValue)
{
  if(returnValue=="0")
  efgrid.submitInqu( "ef_grid_result1", "ec","ECDM01","queryFile");
}
