
button_close_onclick = function(){
	window.close();
}

button_ensure_onclick = function(){
	var map = new Array();
	map["reportSaveAsId"] = ef.get("reportSaveAsId").value;
	map["reportSaveAsBelongTo"] = ef.get("reportSaveAsBelongTo").value;
	map["reportSaveAsVersion"] = ef.get("reportSaveAsVersion").value;
	window.opener.reportSaveAs(map);
	window.close();
}



country_callback = {
      onSuccess : function(eiInfo){ 
      
	var divwindow = document.getElementById("test_divwindow");
	  efwindow.hide();
   	  var style_config = new Object();
	  style_config["operationBar"] = "true";
	  var grid = new efgrid("result",divwindow.id+"subNode");
	  var custom_cols = {"index":{},"metas":[]};
	  grid.setEnable( false );
	  grid.setReadonly( true );
	  grid.setAjax( true );
	  grid.setAutoDraw( true );
	  grid.setServiceName( "ER24" );
	  grid.setQueryMethod( "query" );
	  grid.setCustomColumns( custom_cols );
	  grid.setData( eiInfo );
	  
	  grid.setStyle( style_config );
	  for(i=grid.dataColumns.length;i>=1;i--){
	  	column = grid.getColumn( i-1, TYPE_DATA );
	  	column.set( "width", 300/grid.dataColumns.length);
	  } 
	  grid.paint();	

	  efwindow.show(document.getElementById(ef.get("id").value),divwindow.id);  
	    				;
                  },
      onFail    : function(eMsg){
                     alert("failure");
                  }
    }

function showDivWindow(id){
      var info = new EiInfo(); 
      info.set("id",id);
	  ef.get("id").value=id;
//	  info.setById(id);
	  switch(id){
	    case "reportSaveAsBelongTo":
	   		info.set("reportBelongTo",ef.get("reportSaveAsBelongTo").value);
	    	info.set("reportId",ef.get("reportSaveAsId").value);
	    	info.set("id","reportBelongTo");
	    	break;
	    case "reportSaveAsVersion":	
	    	info.set("reportVersion",ef.get("reportSaveAsVersion").value);
	    	info.set("reportId",ef.get("reportSaveAsId").value);
	    	info.set("reportBelongTo",ef.get("reportSaveAsBelongTo").value);
	    	info.set("id","reportVersion");
	    	break;
	    case "reportSaveAsId":
	    	info.set("reportId",ef.get("reportSaveAsId").value);
	    	info.set("id","reportId");
	    	break;
	    default:
	    	break;	
	  }

      var divWindow = efcascadeselect.createDivWindow( "test_divwindow", "efwindow","选择报表信息",350,270,"","关闭");      
      efwindow.show(ef.get(id),"test_divwindow_ajax_loading");	
      EiCommunicator.send( "ER24", "query", info, country_callback ,false,true ); 
}

function efgrid_onRowClicked( grid_id, row_index ){
	grid = efgrid.getGridObject(grid_id);
	data = grid.getRowData(row_index);	
	if(ef.get("id").value == "reportSaveAsId")
		curr_id = "reportId";
	else if(ef.get("id").value == "reportSaveAsBelongTo")
		curr_id = "reportBelongTo";
	else if(ef.get("id").value == "reportSaveAsVersion")
		curr_id = "reportVersion";	
			
	ef.get(ef.get("id").value).value = data[curr_id];
	efwindow.hide();
}
efcascadeselect.ensure_onclick = function(){
	efwindow.hide();
}
