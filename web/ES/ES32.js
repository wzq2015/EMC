
var orgTreeModel =  new eiTreeModel('ESUTTR11');

efform_onload = function () {
	efsplitter("leftTree", "leftTreeDiv", "middleSplitter");
	efbutton.setButtonStatus("INSERT", false);
	efbutton.setButtonStatus("DELETE", false);
}

button_delete_onclick = function() {
  	efgrid.submitForm( "ef_grid_r", "es","ES32","delete", true );  
}

button_insert_onclick = function() {
	ef.getNodeById("efFormPopup").value="1";
  	var childW = efform.openNewForm('ESUT10', "chooseType=USER&&efFormPopup=1");
  	childW.focus();
}

function configTree(tree){
  tree.emptyNodeAsLeaf = false;
  tree.activeEmptyJudger = false;
  tree.topNodeActive = false;
  tree.nodeInitializer = treeNodeInitializer;
  document.onkeydown = function(e){ if(event.keyCode==17){ tree.status(1); } };
  document.onkeyup =  function(e){ if(event.keyCode==17){ tree.status(0); } };
}

function treeNodeInitializer(node){  
  if ( node.top() ){ return; };
  if ( node.data().type == "2"  ) {
    node.icon(efico.get("efgrid.addRow"));
    node.openIcon(efico.get("efgrid.addRow"));
    node.textClicked = function(){ treeNodeClicked( node ); };
    node.text("["+ node.label() + "]" + node.text());
  }else{
    node.active(false);
  }  
}

function treeNodeClicked(node){
   document.getElementById("inqu_status-parent").value=node.data().id; 
   efbutton.setButtonStatus("INSERT", true);
   efbutton.setButtonStatus("DELETE", true);
   efgrid.submitInqu( "ef_grid_r", "es","ES32","query");
}

efgrid_onCellDisplayReady = function( div_node_html, row_index, col_index, col_value_c, display_value ){
  //if( col_index == 5){
  if( col_index == 6){
  　　return "\<a href='javascript:void(0)' onclick='showStation("+ row_index + ","+ col_index +" )'>&nbsp;"+getI18nMessages("label.EFShow","查看")+"&nbsp;</a>" ;		
  }  
}

showStation = function (row_index,col_index){
  var grid = efgrid.getGridObject( "ef_grid_r" );
  var loginName = grid.getCellValue(row_index, 1, TYPE_FIX); 
  efform.openNewForm('ES22', "inqu_status-0-loginName=" + loginName );
}

/*
 * 打开窗口的回调函数,利用ajax方式提交
*/
efform_onPopupReturn = function(formname,rows){

var callback = {
	onSuccess :
	function(eiInfo) {
	
 var grid = efgrid.getGridObject("ef_grid_r");
						grid.setData(eiInfo);
					grid.refresh();
	
	},
	onFail : 
	function(eMsg) {
		alert(eMsg);
		}
	};
	
  var grid = efgrid.getGridObject( "ef_grid_r" );
  
  var blockA = new EiBlock( grid.getBlockData().getBlockMeta() );
  blockA.extAttr["limit"] = grid.blockData.extAttr["limit"];
  blockA.extAttr["offset"] = grid.blockData.extAttr["offset"];
  for( var i=0; i<rows.length; i++ ){
    var rPost = {};
    rPost.loginName = rows[i].id;
    blockA.addRow(blockA.getMappedArray(rPost));
  }
  var eiinfo = new EiInfo();
  eiinfo.setByNameValue("inqu_status-parent", nTree.getCurrent().data().id);  
  eiinfo.setByNameValue("inqu_status-bussiness", treeSelection()); 
  eiinfo.addBlock(blockA);  
    EiCommunicator.send( "ES32", "insert" , eiinfo, callback );
}



/* multiple slection*/
function treeSelection(){
  var auths = [];
  var nodes = nTree.getSeleted(); 
  for( var i=0; i<nodes.length;i++ ){
    var node = nodes[i];
    auths.push(node.data().id);
    auths.push(",");
  }  
  return auths.join('');
}
