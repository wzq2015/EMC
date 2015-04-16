

button_rolenew_onclick = function() {
  
  var callbackCreaterRoleType = {
	onSuccess :
	  function(eiInfo) {
	
       var grid = efgrid.getGridObject("ef_grid_role");
	   grid.setData(eiInfo);
	   grid.refresh();
	
	  },
	onFail : 
	  function(eMsg) {
		alert(eMsg);
	  }
  };
  var grid = efgrid.getGridObject( "ef_grid_role" );
  
  var blockA = new EiBlock( grid.getBlockData().getBlockMeta() );
  blockA.extAttr["limit"] = grid.blockData.extAttr["limit"];
  blockA.extAttr["offset"] = grid.blockData.extAttr["offset"];
  var rows = grid.getCheckedRows();
  for( var i=0; i< rows.length; i++ )
	{
    var role = {};
	role.label = grid.getCellValue( rows[i], 1,true );
	role.name = grid.getCellValue( rows[i], 0);
    blockA.addRow(blockA.getMappedArray(role));
  }
  
  var eiinfo = new EiInfo();
  eiinfo.addBlock(blockA);  
  EiCommunicator.send( "EC31", "createrRoleType" , eiinfo, callbackCreaterRoleType );	
}

button_roleedit_onclick = function() {
//  efgrid.submitForm( "ef_grid_role", "ec","EC31","editRoleType",true);	
}

button_roledel_onclick = function() {
  
  var callbackDelRoleType = {
	onSuccess :
	  function(eiInfo) {
	
       var grid = efgrid.getGridObject("ef_grid_role");
	   grid.setData(eiInfo);
	   grid.refresh();
	
	  },
	onFail : 
	  function(eMsg) {
		alert(eMsg);
	  }
  };
  var grid = efgrid.getGridObject( "ef_grid_role" );
  
  var blockA = new EiBlock( grid.getBlockData().getBlockMeta() );
  blockA.extAttr["limit"] = grid.blockData.extAttr["limit"];
  blockA.extAttr["offset"] = grid.blockData.extAttr["offset"];
  var rows = grid.getCheckedRows();
  for( var i=0; i< rows.length; i++ )
	{
    var role = {};
	role.label = grid.getCellValue( rows[i], 1,true );
	role.name = grid.getCellValue( rows[i], 0);
    blockA.addRow(blockA.getMappedArray(role));
  }
  
  var eiinfo = new EiInfo();
  eiinfo.addBlock(blockA);  
  EiCommunicator.send( "EC31", "delRoleType" , eiinfo, callbackDelRoleType );
}

button_usernew_onclick = function() {
  var callbackCreaterUser = {
	onSuccess :
	  function(eiInfo) {
	
       var grid = efgrid.getGridObject("ef_grid_user");
	   grid.setData(eiInfo);
	   grid.refresh();
	
	  },
	onFail : 
	  function(eMsg) {
		alert(eMsg);
	  }
  };
  var grid = efgrid.getGridObject( "ef_grid_user" );
  
  var blockA = new EiBlock( grid.getBlockData().getBlockMeta() );
  blockA.extAttr["limit"] = grid.blockData.extAttr["limit"];
  blockA.extAttr["offset"] = grid.blockData.extAttr["offset"];
  var rows = grid.getCheckedRows();
  for( var i=0; i< rows.length; i++ )
	{
    var user = {};
	user.userId = grid.getCellValue( rows[i], 1,true );
	user.userCname = grid.getCellValue( rows[i], 2,true);
	user.userMobile = grid.getCellValue( rows[i], 0);
	user.userEmail = grid.getCellValue( rows[i], 1);
//	user.idcardNo = grid.getCellValue( rows[i], 2);
    blockA.addRow(blockA.getMappedArray(user));
  }
  
  var eiinfo = new EiInfo();
  eiinfo.addBlock(blockA);  
  EiCommunicator.send( "EC31", "createrUser" , eiinfo, callbackCreaterUser );
}

button_useredit_onclick = function() {
  var callbackCreaterUser = {
	onSuccess :
	  function(eiInfo) {
	
       var grid = efgrid.getGridObject("ef_grid_user");
	   grid.setData(eiInfo);
	   grid.refresh();
	
	  },
	onFail : 
	  function(eMsg) {
		alert(eMsg);
	  }
  };
  var grid = efgrid.getGridObject( "ef_grid_user" );
  
  var blockA = new EiBlock( grid.getBlockData().getBlockMeta() );
  blockA.extAttr["limit"] = grid.blockData.extAttr["limit"];
  blockA.extAttr["offset"] = grid.blockData.extAttr["offset"];
  var rows = grid.getCheckedRows();
  for( var i=0; i< rows.length; i++ )
	{
    var user = {};
	user.userId = grid.getCellValue( rows[i], 1,true );
	user.userCname = grid.getCellValue( rows[i], 2,true);
	user.userMobile = grid.getCellValue( rows[i], 0);
	user.userEmail = grid.getCellValue( rows[i], 1);
//	user.idcardNo = grid.getCellValue( rows[i], 2);
    blockA.addRow(blockA.getMappedArray(user));
  }
  
  var eiinfo = new EiInfo();
  eiinfo.addBlock(blockA);  
  EiCommunicator.send( "EC31", "editUser" , eiinfo, callbackCreaterUser );
}

button_userdel_onclick = function() {
  var callbackCreaterUser = {
	onSuccess :
	  function(eiInfo) {
	
       var grid = efgrid.getGridObject("ef_grid_user");
	   grid.setData(eiInfo);
	   grid.refresh();
	
	  },
	onFail : 
	  function(eMsg) {
		alert(eMsg);
	  }
  };
  var grid = efgrid.getGridObject( "ef_grid_user" );
  
  var blockA = new EiBlock( grid.getBlockData().getBlockMeta() );
  blockA.extAttr["limit"] = grid.blockData.extAttr["limit"];
  blockA.extAttr["offset"] = grid.blockData.extAttr["offset"];
  var rows = grid.getCheckedRows();
  for( var i=0; i< rows.length; i++ )
	{
    var user = {};
	user.userId = grid.getCellValue( rows[i], 1,true );
	user.userCname = grid.getCellValue( rows[i], 2,true);
	user.userMobile = grid.getCellValue( rows[i], 0);
	user.userEmail = grid.getCellValue( rows[i], 1);
//	user.idcardNo = grid.getCellValue( rows[i], 2);
    blockA.addRow(blockA.getMappedArray(user));
  }
  
  var eiinfo = new EiInfo();
  eiinfo.addBlock(blockA);  
  EiCommunicator.send( "EC31", "delUser" , eiinfo, callbackCreaterUser );
}

efgrid_onCellDisplayReady = function( div_node_html, row_index, col_index, col_value_c, display_value ,grid_id){
  if( col_index == 1 && grid_id=="ef_grid_role"){
		return "\<a href='javascript:void(0)' onclick='queryUser("+ row_index + ","+ col_index +" )'>&nbsp;查看&nbsp;</a>" ;
  }
}

queryUser = function(row_index,col_index) {
  var callbackQueryRoleUser = {
	onSuccess :
	  function(eiInfo) {
	
       var grid = efgrid.getGridObject("ef_grid_roleUser");
	   grid.setData(eiInfo);
	   grid.refresh();
	
	  },
	onFail : 
	  function(eMsg) {
		alert(eMsg);
	  }
  };
  
  var grid = efgrid.getGridObject( "ef_grid_role" );
  var label = grid.getCellValue(row_index, 1, TYPE_FIX); 
  ef.get("roleTypeCode").value=label;
  var eiinfo = new EiInfo();
  eiinfo.set("label",label);  
  EiCommunicator.send( "EC31", "queryRoleUser" , eiinfo, callbackQueryRoleUser );
}


button_roleuserdel_onclick = function() {
  var callbackRevokeUserToRole = {
	onSuccess :
	  function(eiInfo) {
	
       var grid = efgrid.getGridObject("ef_grid_roleUser");
	   grid.setData(eiInfo);
	   grid.refresh();
	
	  },
	onFail : 
	  function(eMsg) {
		alert(eMsg);
	  }
  };
  var grid = efgrid.getGridObject( "ef_grid_roleUser" );
  var row = grid.getCheckedRows();
  if(row.length==0)
  {
  	alert("请至少选择一个人员进行取消授权。");
  	return false;
  }
  var eiinfo = new EiInfo();
  var userId = new Array();
  var label = ef.get("roleTypeCode").value;
  for( var i=0; i< row.length; i++ )
  {
    //label = grid.getCellValue( row[i],0,TYPE_DATA,true );alert(label);alert( row[i]);
	userId[i]=  grid.getCellValue( row[i], 1,true );
  }
  eiinfo.set("label",label);
  eiinfo.set("userId",userId);
  EiCommunicator.send( "EC31", "revokeUserToRole" , eiinfo, callbackRevokeUserToRole );
}


button_roleusernew_onclick = function() {
  var callbackGrantUserToRole = {
	onSuccess :
	  function(eiInfo) {
	
       var grid = efgrid.getGridObject("ef_grid_roleUser");
	   grid.setData(eiInfo);
	   grid.refresh();
	
	  },
	onFail : 
	  function(eMsg) {
		alert(eMsg);
	  }
  };
  
  var gridRole = efgrid.getGridObject( "ef_grid_role" );
  var gridUser = efgrid.getGridObject( "ef_grid_user" );
  var rowsRole = gridRole.getCheckedRows();
  var rowsUser = gridUser.getCheckedRows();
  if(rowsRole.length!=1)
  {
  	alert("请选择一个角色进行授权。");
  	return false;
  }
  if(rowsUser.length==0)
  {
  	alert("请至少选择一个人员进行授权。");
  	return false;
  }
  var eiinfo = new EiInfo();
  for( var i=0; i< rowsRole.length; i++ )
  {
    var userId = new Array();
	var label = gridRole.getCellValue( rowsRole[i], 1,true );
  	eiinfo.set("label",label);
	for( var i=0; i< rowsUser.length; i++ )
	{
	  userId[i]=  gridUser.getCellValue( rowsUser[i], 1,true );
	}
  	eiinfo.set("userId",userId);
  }
  
  EiCommunicator.send( "EC31", "grantUserToRole" , eiinfo, callbackGrantUserToRole );
}
