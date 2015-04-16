var orgTreeModel =  new eiTreeModel('ESUTTR11');
button_f4_onclick = function() 
{
  	efgrid.submitForm( "ef_grid_r", "es","ES22","delete", true );
}

button_f5_onclick = function() 
{
	//addPosts();
	var grid = efgrid.getGridObject("ef_grid_r");
	efform.openNewForm("ESUT10","chooseType=POST&&efFormPopup=1");	
}

function efform_onPopupReturn(formname,rowsData){
	info = new EiInfo();
	
	postStr = "";
	for(var i = 0;i<rowsData.length;i++){
		postStr += rowsData[i]["id"] + ",";
	} 
	if(postStr != ""){
		info.set("postStr",postStr);
		info.setById("inqu_status-0-loginName");
		EiCommunicator.send("ES22","insert",info,{
				onSuccess :
					function(eiInfo){
							var grid = efgrid.getGridObject("ef_grid_r");
							grid.setData(eiInfo);
							grid.refresh();
					},
			    onFail    : 
			    function(eMsg) {
			      alert("failure");
			    }	
			} );
	} 
	return true;
}

function addPosts(){
	 _selectedItems = nTree.getCheckedNods();
	 info = new EiInfo();
	// info.addBlock("inqu_status");
	 var postStr = "";
	 for( var i=0; i<_selectedItems.length;i++ ){
	      postStr +=_selectedItems[i].data().id + ",";
	 }
	info.set("postStr",postStr);
	info.setById("inqu_status-0-loginName");
	EiCommunicator.send("ES22","insert",info,{
			onSuccess :
				function(eiInfo){
						var grid = efgrid.getGridObject("ef_grid_r");
						grid.setData(eiInfo);
						grid.refresh();
				},
		    onFail    : 
		    function(eMsg) {
		      alert("failure");
		    }	
		} );

}

function configTree(tree){
  tree.emptyNodeAsLeaf = false;
  tree.activeEmptyJudger = false;
  tree.nodeInitializer = treeNodeInitializer;
}



function treeNodeInitializer(node){  
  if ( node.top() ){ return; };
	if( node.data().type == "2" ){
    node.icon(efico.get("eftree.cu"));
    node.type( new checkItemType() );
  }  
//  node.textClicked = function(){ treeNodeClicked( node ); };
}

function treeNodeClicked(node){

	alert(node.data().id);

}
/* Splitter Control */
efform_onload = function () {

}
