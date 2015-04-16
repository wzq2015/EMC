var appTreeModel =  new eiTreeModel('ES06');

efform_onload = function () {
  efsplitter("leftTree", "leftTreeDiv", "middleSplitter");
}
button_f4_onclick = function() 
{
  	efgrid.submitForm( "ef_grid_r", "es","ES51","delete", true );
}

button_f5_onclick = function() 
{
  efform.openNewForm("ESUT10", "chooseType=POST,PSTP&&efFormPopup=1");
}

efform_onPopupReturn = function(eform, rows){ 
    var ajaxCallBack = { 
		 onSuccess: function(ei){
			 efgrid.submitInqu( "ef_grid_r", "es","ES50","query");		 
		 },
         onFail: function(xmlR, status, e){ alert("ERROR"); }
    };    
    
  var grid = efgrid.getGridObject( "ef_grid_r" );
  var blockA = new EiBlock( grid.getBlockData().getBlockMeta() );
  for( var i=0; i<rows.length; i++ ){  
    var uc = {};
    uc.clazz = rows[i].clazz
    uc.identity = rows[i].id;
    blockA.addRow(blockA.getMappedArray(uc));    
  }
  var eiinfo = new EiInfo();
  eiinfo.setByNameValue("inqu_status-authorize", treeSelection()); 
  eiinfo.addBlock(blockA);    
  EiCommunicator.send( "ES50", "insert", eiinfo, ajaxCallBack, false  );
}

function configTree(tree){
  tree.emptyNodeAsLeaf = false;
  tree.activeEmptyJudger = false;
  tree.nodeInitializer = treeNodeInitializer;
  document.onkeydown = function(e){ if(event.keyCode==17){ tree.status(1); } };
  document.onkeyup =  function(e){ if(event.keyCode==17){ tree.status(0); } };
}

function treeNodeInitializer(node){  
  if ( node.top() ){ node.open(true); return; };  
  if ( node.data().type == "2"  ) {
    node.icon(efico.get("efgrid.addRow"));
    node.openIcon(efico.get("efgrid.addRow"));
    if ( node.data().admin == "0" ){
      node.active(false);
      node.textDom().style.textDecoration = "line-through";
    }
  } else if( node.data().type == "3" ){
    node.icon(efico.get("eftree.cu"));
    if ( node.data().admin == "0" ){
      node.active(false);
      node.textDom().style.textDecoration = "line-through";
    }
  } else {
    node.active(false);
  } 
  node.textClicked = function(){ treeNodeClicked( node ); };
}

function treeNodeClicked(node){
   document.getElementById("inqu_status-target").value=node.data().target;  
   document.getElementById("inqu_status-type").value=node.data().type;  
   efgrid.submitInqu( "ef_grid_r", "es","ES51","query");
}

function treeSelection(){
  var auths = [];
  var nodes = nTree.getSeleted(); 
  for( var i=0; i<nodes.length;i++ ){
    var node = nodes[i];
    auths.push(node.data().type);
    auths.push("_");
    auths.push(node.data().target);
    auths.push(",");
  }  
  return auths.join('');
}


