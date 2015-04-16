efform_onload = function ()
{
  efsplitter("leftTree", "leftTreeDiv", "middleSplitter");
 var type=ef.get("type").value;
 //type=1图片;type=0;文档
 if(type=='0'){
 	model="ECDMT0";
 }else if(type=='1'){
 	model="ECDMT1";
 }else if(type=='2'){
	model="ECDMT2";
 }else if(type=='3'){
 	model="ECDMT3";
 }
  var tableTreeModel=new eiTreeModel(model) ;
  var nTree=new EFTree(tableTreeModel,"nTree","文档管理树");
  configTree(nTree);
  $('#nTree').append(nTree.render()); 
 ef.get("inqu_status-0-typeId").value="null";
  efbutton.setButtonStatus("upload", false);
}


var treeNode;
function configTree(tree){
  tree.emptyNodeAsLeaf = false;
  tree.activeEmptyJudger = false;
  tree.topNodeActive = false;
  tree.nodeInitializer = treeNodeInitializer;
  tree.expand();
}

function treeNodeInitializer(node){
 node.textClicked = function(){ treeNodeClicked( node ); return false;};
    
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
  efbutton.setButtonStatus("upload", true);
  ef.get("inqu_status-0-typeId").value=node._label;
  
  efgrid.submitInqu( "ef_grid_result", "ec","ECDMTT","query");
 }else
 efbutton.setButtonStatus("upload", false);
}

efgrid_onCellDisplayReady = function( div_node_html, row_index, col_index, col_value_c, display_value, grid_id )
{
      if(grid_id=="ef_grid_result"){
      var grid = efgrid.getGridObject( "ef_grid_result" );
      var columnEname = grid.getColumn(col_index, TYPE_DATA).getEname();
       var value=ef.get("type").value;
      var userId=ef.get("userId").value;
      var recCreator=grid.getCellValue(row_index,3,TYPE_DATA,true);
      
      if(columnEname=="preview"){ 
        if(value=='1'){
        return "\<input value='预览' class='buttonclass' type='button' align='center' onclick='efgrid_onDataCellClick(\""+grid_id+"\",\""+row_index+"\",\""+col_index+"\",\""+value+"\")'>" ;
       
       }
      }
        else if(columnEname=="dele"){ 
        if(userId==recCreator)
        return "\<input value='删除' class='buttonclass' type='button' align='center' onclick='efgrid_onDataCellClick(\""+grid_id+"\",\""+row_index+"\",\""+col_index+"\",\""+value+"\")'>" ;
      }
      }
}

efgrid_onDataCellClick=function(grid_id,row_index,col_index,cell_value)
{
   left1=(screen.availWidth-400)/2 ;
	top1=(screen.availHeight-200)/2 ;
   
  if(grid_id=="ef_grid_result")
   { 
     var grid=efgrid.getGridObject("ef_grid_result");
     var columnEname = grid.getColumn(col_index, TYPE_DATA).getEname();
      if(columnEname=="preview"){ 
     
        var filePath=grid.getCellValue(row_index,2,TYPE_DATA,true);
      
       window.open("./EC/DM/ECDM0103.jsp?filePath="+filePath,"","left="+left1+",top="+top1+",width=1000,height=800,resizable=yes,depend=yes");   
      }else if(columnEname=="dele"){
         var rows=grid.getCheckedRows();
         if(rows.length>1)
            alert("一次只能删除一个文件");
         else{
         if(rows.length==1&&rows[0]!=row_index)
           alert("选中记录与删除记录不一致")
           else{
         grid.setRowChecked(row_index,true);
         efgrid.submitForm( "ef_grid_result", "ec","ECDMTT","delete",true );
         }
         }
         }
      }
}
button_confirm_onclick=function()
{

   var grid=efgrid.getGridObject("ef_grid_result");
   var rows=grid.getCheckedRows();
   if(rows.length!=1){
     	alert("请选中一条记录");
    	return;
    }  
    var type=ef.get("type").value;
     
    // value=grid.getCellValue(rows[0],2,TYPE_DATA,true);
    value=grid.getCellValue(rows[0],0,TYPE_DATA,true);
    name=grid.getCellValue(rows[0],0,TYPE_DATA);
    path=grid.getCellValue(rows[0],2,TYPE_DATA,true); 
    
	if(type=='0'){ 
	   window.returnValue=path+"@"+name;
	}else if(type=='1'){
	   window.returnValue=value;
	}else if(type=='2'){
	   window.returnValue=path;
	}else if(type=='3'){
	   window.returnValue=path;
	}else{
	   window.returnValue=value;
	}
   window.close();
   
}
button_cancel_onclick=function()
{
  window.close();
}
button_upload_onclick=function()
{
   left1=(screen.availWidth-400)/2 ;
	top1=(screen.availHeight-200)/2 ;
    typeId=ef.get("inqu_status-0-typeId").value;
     var type=ef.get("type").value;
     if(type=="1"){
		window.open("./EC/DM/ECDM0105.jsp?typeId="+typeId+"&type="+type,"","left="+left1+",top="+top1+",width=400,height=250,resizable=yes,depend=yes");
     }else{
		window.open("./EC/DM/ECDM0101.jsp?typeId="+typeId+"&type="+type,"","left="+left1+",top="+top1+",width=400,height=250,resizable=yes,depend=yes");
     }
}
efform_onPopupReturn = function(winId, returnValue)
{
  
  if(returnValue=="0")
  efgrid.submitInqu( "ef_grid_result", "ec","ECDMTT","query");
}

button_query_onclick=function()
{
	 efgrid.submitInqu( "ef_grid_result", "ec","ECDMTT","query");
}








