var orgTreeModel =  new eiTreeModel('ESUTTR11');

efform_onload = function () {
	efsplitter("leftTree", "leftTreeDiv", "middleSplitter");
	efregion.show("ef_region_top");
	efbutton.setButtonStatus("QUERY", false);
	efbutton.setButtonStatus("DELETE", false);
	efbutton.setButtonStatus("INSERT", false);
	var ef_region_top_buttonbar = new efbuttonbar();
	ef_region_top_buttonbar.paint("ef_region_top");
	
}

button_query_onclick = function () {
	efgrid.submitForm( "ef_grid_r", "es","ES55","query", true );
}

button_delete_onclick = function () {
	efgrid.submitForm( "ef_grid_r", "es","ES55","delete", true );
}

button_insert_onclick = function () {	
	ef.getNodeById("efFormPopup").value="1";
  	var childW = efform.openNewForm('ESUT20', "chooseType=IANA&&efFormPopup=1&&chooseType_Tabs=page,POST");
  	childW.focus();
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
    node.textClicked = function(){ treeNodeClicked( node ); };
    node.text("["+ node.label() + "]" + node.text());
  }else{
    node.active(false);
  } 
  
}

function treeNodeClicked(node){
   document.getElementById("inqu_status-parent").value=node.data().id; 
   efbutton.setButtonStatus("QUERY", true);
   efbutton.setButtonStatus("DELETE", true);
   efbutton.setButtonStatus("INSERT", true);
   efgrid.submitInqu( "ef_grid_r", "es","ES55","query", true );
   //efgrid.submitForm( "ef_grid_r", "es","ES55","query" );
}

function getSelection(rows){
  var auths = [];
  for( var i=0; i<rows.length; i++ ){
    var row = rows[i];
    if( row["clazz"] == "PAGE" ){
      auths.push("TYP_PAGE|" + row["label"]);
    } else if ( row["clazz"] == "ELEM" ){
      auths.push("TYP_ELEM|" + row["label"]);
    } 
    
    auths.push(",");
  }  
  return auths.join('');
}

efform_onPopupReturn = function(formname,rows){
 var callback = {
	onSuccess :	function(eiInfo) {
       efgrid.submitForm( "ef_grid_r", "es","ES55","query", true );
	},
	onFail : function(eMsg) {
		alert(eMsg);
	}
  };
 // alert(rows.length);
  var sel = getSelection(rows); 
  var curPost =  document.getElementById("inqu_status-parent").value;
  
  var eiinfo = new EiInfo();
  eiinfo.setByNameValue("inqu_status-authorize", sel);  
  eiinfo.setByNameValue("result-0-clazz", "POST");  
  eiinfo.setByNameValue("result-0-identity", curPost);  
  EiCommunicator.send( "ES50", "insert" , eiinfo, callback );
}

