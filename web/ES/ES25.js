efform_onload = function () {

}

button_f3_onclick = function() {
  ef.getNodeById("efFormPopup").value="1";
  var childW = efform.openNewForm('ESUT10', "chooseType=USER&&efFormPopup=1");
  childW.focus();
}

button_f5_onclick = function() {
  efgrid.submitForm( "ef_grid_p", "es","ES25","delete", true );		
}

efform_onPopupReturn = function(formname,rows){
  var callback = {
	onSuccess :	function(eiInfo) {	
        var grid = efgrid.getGridObject("ef_grid_p");
		grid.setData(eiInfo);
		grid.refresh();	
	},
	onFail : function(eMsg) {
		alert(eMsg);
	}
  };
	
  var grid = efgrid.getGridObject( "ef_grid_p" );
  
  var blockA = new EiBlock( grid.getBlockData().getBlockMeta() );
  blockA.extAttr["limit"] = grid.blockData.extAttr["limit"];
  blockA.extAttr["offset"] = grid.blockData.extAttr["offset"];
  for( var i=0; i<rows.length; i++ ){
    var rPost = {};
    rPost.loginName = rows[i].id;
    blockA.addRow(blockA.getMappedArray(rPost));
  }
  var eiinfo = new EiInfo();
  eiinfo.addBlock(blockA);  
  EiCommunicator.send( "ES25", "insert" , eiinfo, callback );
}
  


