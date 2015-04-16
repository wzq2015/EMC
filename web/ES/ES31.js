var orgTreeModel =  new eiTreeModel('ESUTTR10');

efform_onload = function () {
  efbutton.setButtonStatus("F2", false);
  efbutton.setButtonStatus("F4", false);
  efbutton.setButtonStatus("F1", false);
  efsplitter("leftTree", "leftTreeDiv", "middleSplitter");
  efregion.show("ef_region_top");
  var ef_region_top_buttonbar = new efbuttonbar();
  ef_region_top_buttonbar.paint("ef_region_top");
}

button_f2_onclick = function(){
	win = efform.openNewForm("ESUT10", "efFormPopup=1&chooseType=PSTP");
	win.focus();
}

button_f4_onclick = function() 
{
  	efgrid.submitForm( "ef_grid_r", "es","ES31","delete", true );
}

button_f1_onclick = function(){
	//win = efform.openNewForm("ESUT10", "efFormPopup=1&chooseType=PSTP");
	//win.focus();
	
   //ef.get("inqu_status-parent").value=node.label();
   efgrid.submitInqu( "ef_grid_r", "es","ES31","query");   
	
}


efform_onPopupReturn = function(formEname, value)
{
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
  
  for( var i = 0; i < value.length; i++ ){
    var rPost = {};
	rPost.postName = value[i]["name"];
	rPost.postLabel = value[i]["label"];
	rPost.orgLabel = ef.get("inqu_status-parent").value;
	rPost.postTypeId = value[i]["id"];
	rPost.postId = "-1";
    blockA.addRow(blockA.getMappedArray(rPost));
  }
  
  var eiinfo = new EiInfo();
  eiinfo.setByNameValue("inqu_status-parent", ef.get("inqu_status-parent").value);  
  eiinfo.addBlock(blockA);  
  EiCommunicator.send( "ES31", "insert" , eiinfo, callback );
}

function configTree(tree){
  tree.emptyNodeAsLeaf = false;
  tree.activeEmptyJudger = false;
  tree.topNodeActive = false;
  tree.nodeInitializer = treeNodeInitializer;
}

function treeNodeInitializer(node){  
  if ( node.top() ){ return; };
  if ( node.data().type == "2"  ) {
    node.icon(efico.get("efgrid.addRow"));
    node.openIcon(efico.get("efgrid.addRow"));
  } else if( node.data().type == "3" ){
    node.icon(efico.get("eftree.cu"));
  }  
  node.textClicked = function(){ treeNodeClicked( node ); };
}

function treeNodeClicked(node){
   ef.get("inqu_status-parent").value=node.label();  
   efbutton.setButtonStatus("F2", true);
   efbutton.setButtonStatus("F4", true);
   efbutton.setButtonStatus("F1", true);
   efgrid.submitInqu( "ef_grid_r", "es","ES31","query");   
}

