
var orgTreeModel =  new eiTreeModel('ESUTTR28');

efform_onload = function () {
	efsplitter("leftTree", "leftTreeDiv", "middleSplitter");
	efbutton.setButtonStatus("INSERT", false);
	efbutton.setButtonStatus("DELETE", false);
	efbutton.setButtonStatus("UPDATE", false);
}

button_query_onclick = function(){
   efgrid.submitInqu( "ef_grid_r", "es","ES28","query");   
	
}

button_delete_onclick = function() {
  	efgrid.submitForm( "ef_grid_r", "es","ES28","delete", true );  
}

button_update_onclick = function() {
  	efgrid.submitForm( "ef_grid_r", "es","ES28","update", true );  
}

button_insert_onclick = function() {
	ef.getNodeById("efFormPopup").value="1";
  	var childW = efform.openNewForm('ESUT10', "chooseType=USER&&efFormPopup=1");
  	childW.focus();
}

efcalendar_1_click = function (control_source) {
	  var node = ef.getNodeById("inqu_status-0-effectEndTime");
	  efcalendar(control_source, node, 'yyyymmdd', true);
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
   efbutton.setButtonStatus("UPDATE", true);
   efgrid.submitInqu( "ef_grid_r", "es","ES28","query");
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
    rPost.proxy = rows[i].id;
    blockA.addRow(blockA.getMappedArray(rPost));
  }
  var eiinfo = new EiInfo();
  eiinfo.setByNameValue("inqu_status-parent", nTree.getCurrent().data().id);  
  eiinfo.addBlock(blockA);  
    EiCommunicator.send( "ES28", "insert" , eiinfo, callback );
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
