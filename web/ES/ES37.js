var ES37_row;
efform_onload = function () {

	eftab.show("ef_tab_y");
	ES37_row = 0;
	ef.get("inqu_status-0-pipeline").value = "auth";
}

button_f2_onclick = function() {
  efgrid.submitInqu( "ef_grid_p", "es","ES37","query");	
}

button_f3_onclick = function() {
  efgrid.submitForm( "ef_grid_p", "es","ES37","insert", true );	
}

button_f4_onclick = function() {
  efgrid.submitForm( "ef_grid_p", "es","ES37","update", true );		
}


button_f5_onclick = function() {
  efgrid.submitForm( "ef_grid_p", "es","ES37","delete", true );		
}

button_f6_onclick = function(){
	ef.getNodeById("efFormPopup").value="1";
  	var childW = efform.openNewForm('ESUT20', "chooseType=IANA&&efFormPopup=1&&chooseType_Tabs=page,ROLE");
  	childW.focus();
}
  
button_f7_onclick = function(){
	
	var callback = {
			onSuccess :	function(eiInfo) {
			       efgrid_onRowClicked("ef_grid_p",ES37_row);
				},
				onFail : function(eMsg) {
					alert(eMsg);
				}
	};
	var gridSource = efgrid.getGridObject("ef_grid_p");
	var grid = efgrid.getGridObject("ef_grid_a");
	var list = grid.getSelectRowsData();
	var inInfo = new EiInfo();
	var _arr = new Array();
	var parent = gridSource.getRowData(ES37_row)["label"] ;
	
	inInfo.setByNameValue("inqu_status-parent", parent);  //set role type
	//turn ret to EiInfo
    inInfo.setByNameValue("inqu_status-0-label", "");
    inInfo.setByNameValue("inqu_status-0-limit", grid.getLimit());
    inInfo.setByNameValue("inqu_status-0-offset", grid.getOffset());
    inInfo.setByNameValue("inqu_status-0-source", "3");
    inInfo.setByNameValue("inqu_status-0-type", "0");   
	if(list.length > 0)
	{
			 inInfo.setByNameValue("result-0-source","3");
			 inInfo.setByNameValue("result-0-type", list[0]["type"]);
			 inInfo.setByNameValue("result-0-label", list[0]["label"]);
			 
			 var resultBlock = inInfo.getBlock("result");
			for(var k = 1 ; k < list.length ; k++)
			{
			    	list[k]["source"] = "3";
			    	resultBlock.addRow(resultBlock.getMappedArray(list[k]));
			}
			
			EiCommunicator.send("ES55","delete",inInfo,callback);
    

	 }else{
		 alert("请选择数据");
	 }
 }

function efgrid_onRowClicked( grid_id, row_index )
{
	ES37_row = row_index;
    if( grid_id == "ef_grid_p" )
    {
        var grid = efgrid.getGridObject("ef_grid_p");
        var gridDes = efgrid.getGridObject( "ef_grid_a" );
        var roleTypeLabel = grid.getCellValue(row_index,1,TYPE_FIX);
        var currentTab = "";
        currentTab = $("#ef_tab_y").data("NowNode").id;
        
        ef.get("role_inqu_status-0-roleTypeLabel").value = roleTypeLabel;
        efgrid.submitInqu( "ef_grid_r", "ES", "ES37","queryRole");
      
        
        
        var callback = {
    			onSuccess :
    				  function(eiInfo) {
    					
    					var gridDes = efgrid.getGridObject( "ef_grid_a" );
    					var grid = efgrid.getGridObject("ef_grid_p");
    					var result = eiInfo.getBlock("result");
    					var ret = result.getRows();
    					
    					var _arr = new Array();
    					
    					for(var k=0 ; k< ret.length; k++)
    					{
    						 							  
    						  var _row = {};
    						  _row["label"]=result.getCell(k,"label");
    						  _row["name"] =result.getCell(k,"name");
    						  _row["type"] = result.getCell(k,"type");
    						  _arr.push(_row);
    					}
    					var p = 0;
    					while(gridDes.getRowCount() > 0)
    					{
    						gridDes.removeRow(p);
    					}
    					gridDes.addRowData(_arr);
    					
    					gridDes._clearSelect();
    					gridDes.refresh();
    				
    					
    				  },
    				onFail : 
    				  function(eMsg) {
    					alert(eMsg);
    				  }
        }
        var rowData = grid.getRowData(row_index);
        var eiinfo = new EiInfo();
  	    eiinfo.setByNameValue("inqu_status-parent", rowData["label"]);  
  	    eiinfo.setByNameValue("inqu_status-0-label", "");
  	    eiinfo.setByNameValue("inqu_status-0-limit", gridDes.getLimit());
  	    eiinfo.setByNameValue("inqu_status-0-offset", gridDes.getOffset());
  	    eiinfo.setByNameValue("inqu_status-0-source", "3");
  	    eiinfo.setByNameValue("inqu_status-0-type", "0");
  	    
  	    ef.get("inqu_status-0-source").value = "3";
  	    ef.get("inqu_status-0-type").value = "0";
  	    ef.get("inqu_status-0-parent").value = rowData["label"];
  	    
  	    var show = (currentTab == "ef_region_auth");
  	    
  	    EiCommunicator.send("ES55","query",eiinfo,callback,show);
    }
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
	       efgrid_onRowClicked("ef_grid_p",ES37_row);
		},
		onFail : function(eMsg) {
			alert(eMsg);
		}
	  };
	 // alert(rows.length);
	  var gridSource = efgrid.getGridObject("ef_grid_p");
	  var sel = getSelection(rows); 
	  var curPost = gridSource.getRowData(ES37_row)["label"] ;
	  
	  var eiinfo = new EiInfo();
	  eiinfo.setByNameValue("inqu_status-authorize", sel);  
	  eiinfo.setByNameValue("result-0-clazz", "PSTP");  
	  eiinfo.setByNameValue("result-0-identity", curPost);  
	  EiCommunicator.send( "ES50", "insert" , eiinfo, callback );
}

