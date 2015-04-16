var orgTreeModel =  new eiTreeModel('ESUTTR10');
var userTreeModel =  new eiTreeModel('ESUTTR11');
var HROGTreeModel =  new eiTreeModel('ESUTTR30');

gridIds = [ "ef_grid_user", "ef_grid_post", "ef_grid_postType", "ef_grid_hrog" ];
gridMeta = {
  
  "ef_grid_user"     : ["USER",  getI18nMessages("label.ESUser","用户"), 
                        function(rowData){
                          if(ef.get("userType").value == "POLEUSER")
                            return rowData["loginName"];
                          else
                            return rowData["userId"]; 
                        },
                        function(rowData){
                          if(ef.get("userType").value == "POLEUSER")
                            return rowData["loginName"];
                          else
                            return rowData["userId"]; 
                        },
                        function(rowData){
                          if(ef.get("userType").value == "POLEUSER")
                            return rowData["displayName"]; 
                          else
                            return rowData["userCname"];
                        },
                        function(rowData){
                          if(ef.get("userType").value == "POLEUSER")
                            return rowData["displayName"]; 
                          else
                            return rowData["orgCode"];
                        },
                        function(rowData){
                          if(ef.get("userType").value == "POLEUSER")
                            return rowData["displayName"]; 
                          else
                            return rowData["orgName"];
                        }],
  "ef_grid_post"     : [ "POST",  getI18nMessages("label.ESRole","角色"), 
                         function(rowData){ return rowData["postId"] }, 
                         function(rowData){ return rowData["postLabel"] },
                         function(rowData){ return rowData["postName"] }
                       ],
  "ef_grid_hrog"     : [ "HROG",  getI18nMessages("label.ESOrg","组织机构"), 
                         function(rowData){ return rowData["orgCode"] }, 
                         function(rowData){ return rowData["orgCode"] },
                         function(rowData){ return rowData["orgName"] }
                       ],
  "ef_grid_postType" : ["PSTP",  getI18nMessages("label.ESRoleType","角色类型"),
                        function(rowData){ return rowData["id"] },
                        function(rowData){ return rowData["label"] },
                        function(rowData){ return rowData["name"] }]
}

var tabs = "USER,POST,PSTP,HROG";
var efFormPopup = true;
var callbackFunc = "efform_onPopupReturn";

efform_onload = function () {
  initTabs();
  filterTabs();
}

initTabs = function(){
  efbutton.setButtonStatus("resultconf", efFormPopup);
  var gridselectvalue = efgrid.getGridObject("ef_grid_selectValues");
  gridselectvalue.blockData.rows.pop();
  
  if(isAvailable(ef.get("ef_region_user")))
	efregion.show("ef_region_user");
  var userSplitter = efsplitter("userLeftTree", "userLeftTreeDiv", "userMiddleSplitter");
  userSplitter.onCompleted = function (){
    var grid = efgrid.getGridObject("ef_grid_user");
    grid.paint();
  }
  
  var postSplitter = efsplitter("leftTree", "leftTreeDiv", "middleSplitter");
  postSplitter.onCompleted = function (){var grid = efgrid.getGridObject("ef_grid_post");grid.paint(); }

  efgrid.submitInqu( "ef_grid_postType", "es","ES37","initLoad");	
  
  var postSplitter = efsplitter("HROGLeftTree", "HROGLeftTreeDiv", "HROGMiddleSplitter");
}

filterTabs = function(){
   
   var tabDoms = ef.get("ef_tab_x").childNodes;
   var total = tabDoms.length;
   for(var k=total-1;k>=0;k--){
     var tabDom = tabDoms[k];
     if(tabs.indexOf(tabDom.id) == -1)
     {
     	tabDom.parentNode.removeChild(tabDom);
     	//efform._removeGrid( gridIds[k] );      
     }
   }
   eftab.show("ef_tab_x");
} 

button_resultconf_onclick = function(){

  var grid = efgrid.getGridObject("ef_grid_selectValues");	
  if (!window.opener.closed) {
    var cb = window.opener[callbackFunc];    
    cb.call(this, "ESUT10", grid.getSelectRowsData());	
  }
  window.close();
}

button_resultdelete_onclick = function(){
  var grid = efgrid.getGridObject("ef_grid_selectValues");
  var rowLength = grid.getCheckedRows().length;
  for(i=rowLength-1;i>=0;i--){
    grid.removeRow(grid.getCheckedRows()[i]);
  }
  grid.refresh();	
  efform.setStatus(0,rowLength+getI18nMessages("label.ESRowsHasDeletedSuccess","条记录删除成功!"));
}

button_f3_onclick = function(){
  efgrid.submitForm( "ef_grid_postType", "es","ES37","query", true );	
}

button_f2_onclick = function(){
  queryUsers();
}

button_f4_onclick = function(){
  efgrid.submitInqu( "ef_grid_hrog", "es","ESHR01","query" );
}

efgrid_onRowClicked = function(grid_id ,row_index){
  if("ef_grid_selectValues" == grid_id){
    return;
  }
  selectRow( grid_id, row_index );
} 

efgrid_onRowCheckboxClicked = function( grid_id, row_index, div_node ){
  if("ef_grid_selectValues" == grid_id){
    return;
  }
  var grid = efgrid.getGridObject( grid_id );	
  if( !grid.isRowChecked( row_index ))
    selectRow(grid_id,row_index);
  else
    unselectRow(grid_id,row_index);
}

efgrid_onSelectAllClicked = function( grid_id, div_node ){
  if("ef_grid_selectValues" == grid_id){
    return;
  }	
  if(div_node.firstChild.checked == true){
	selectAll(grid_id);
  }else{
    unselectAll(grid_id);
  }
}

// 用户TAB树相关
configUserTree = function (tree){
  tree.emptyNodeAsLeaf = false;
  tree.activeEmptyJudger = false;
  tree.topNodeActive = false;
  tree.nodeInitializer = userTreeNodeInitializer;
}

userTreeNodeInitializer = function (node){
  if ( node.top() ){ 
    node.active(true);
    node.textClicked = function(){ userTreeNodeClicked( node ); };
    return;
  };
  if ( node.data().type == "2"  ) {
    node.icon(efico.get("efgrid.addRow"));
    node.openIcon(efico.get("efgrid.addRow"));
    node.text(node.text()+"["+ node.label() + "]");
    node.textClicked = function(){ userTreeNodeClicked( node ); };    
  }else{
    node.active(false);
  }  
}

userTreeNodeClicked = function (node) {
  if ( node.top() ){
	ef.get("userType").value = "USER";
	ef.get("inquOrgIDName").style.display="block";
	ef.get("inqu_status-0-orgCode").style.display="block";
  } else {
    ef.get("userType").value = "POLEUSER";
	ef.get("inquOrgIDName").style.display="none";
	ef.get("inqu_status-0-orgCode").style.display="none";
	ef.get("inqu_status-parent").value = node.data().id;
  }	
  queryUsers();
}

queryUsers = function() 
{
  var grid = efgrid.getGridObject("ef_grid_user");
  if(ef.get("userType").value == "POLEUSER"){    
	var custom_cols = {"index":{"loginName":0},"metas":[{"primaryKey":true,"pos":0,"attr":{"enable":false},"name":"loginName","descName":getI18nMessages("label.ESUserId","用户标识")}]};						
	grid.setCustomColumns(custom_cols);
	grid.setServiceName("ES32");
	grid.setQueryMethod("query");	
	efgrid.submitInqu( "ef_grid_user", "es", "ES32","query");
  }else{
    grid.setCustomColumns({});
	grid.setServiceName("ES20");
	grid.setQueryMethod("query");	    
    efgrid.submitInqu( "ef_grid_user", "es", "ES20","query");	  
  }		
}


// 角色TAB树相关
function configTree(tree){
  tree.emptyNodeAsLeaf = false;
  tree.activeEmptyJudger = false;
  tree.nodeInitializer = treeNodeInitializer;
}

function treeNodeInitializer(node){  
  if ( node.top() ){ return; };
  node.textClicked = function(){ treeNodeClicked( node ); };
}

function treeNodeClicked(node){
	var info = new EiInfo();
	ef.get("inqu_status-parent").value = node.data().label;
	ef.get("inqu_status-parentName").value = node.data().text;
	info.setByNameValue("inqu_status-parent",node.data().label);
	EiCommunicator.send("ES31","query",info,{
			onSuccess :
				function(eiInfo){
						var grid = efgrid.getGridObject("ef_grid_post");
						grid.setData(eiInfo);
						grid.refresh();
				},
		    onFail    : 
		    function(eMsg) {
		      alert("failure");
		    }	
		} );	
}

function configHROGTree(tree){
  tree.nodeInitializer = HROGTreeNodeInitializer;
}

function HROGTreeNodeInitializer(node){  
  if ( node.top() ){ 
    node.active(true);

    node.textClicked = function(){ ef.get("inqu_status-0-parentOrgCodeT").value="root";
  	efgrid.submitInqu( "ef_grid_hrog", "es","ESHR01","query" ); }; 
    return;
  };
  node.textClicked = function(){ HROGTreeNodeClicked( node ); };
}

function HROGTreeNodeClicked(node){
    ef.get("inqu_status-0-parentOrgCodeT").value=node.data().label;
  	efgrid.submitInqu( "ef_grid_hrog", "es","ESHR01","query" );
}

// select functions
mapRowId = function(gridSelect, gridCandidate, row) { 
  var gridId = gridCandidate.gridId;  
  var gridSelectType = gridMeta[gridId][0];
  var id = gridMeta[gridId][2].call(this, row)
  
  for(i = 0;i<gridSelect.getRowCount();i++){
	if( gridSelect.getCellValue(i,0,TYPE_DATA,true) == gridSelectType && 
	    gridSelect.getCellValue(i,1,TYPE_DATA,true) == id )
	  return i;
  }
  return -1;
} 

selectRow = function(grid ,row_index){
  var gridCandidate = efgrid.getGridObject(grid);  
  var gridSelect = efgrid.getGridObject("ef_grid_selectValues");
  var rowData = gridCandidate.getRowData(row_index);
  
  var mapRowIdex = mapRowId(gridSelect, gridCandidate, rowData);
  if(mapRowIdex >= 0){
    return;
  }
  
  var _row = {};
  //alert( "grid = " + grid );
  _row["clazz"]=gridMeta[grid][0];
  _row["className"]=gridMeta[grid][1];
  _row["id"] = gridMeta[grid][2].call(this, rowData);
  _row["label"] = gridMeta[grid][3].call(this, rowData);
  _row["name"] =gridMeta[grid][4].call(this, rowData);
  if( grid == "ef_grid_user" )
  {
	  _row["orgCode"] = gridMeta[grid][5].call(this, rowData);
	  _row["orgName"] = gridMeta[grid][6].call(this, rowData);
  }
  
  
  
  var _arr = new Array();
  _arr.push(_row);
  gridSelect.addRowData( _arr );
  for(var k = 0;k<gridSelect.getRowCount();k++)
	 gridSelect.setRowChecked(k,true);					
  gridSelect.refresh(); 
}

unselectRow = function(grid ,row_index) {
  var gridCandidate = efgrid.getGridObject(grid);  
  var gridSelect = efgrid.getGridObject("ef_grid_selectValues");
  var rowData = gridCandidate.getRowData(row_index);
  
  var mapRowIdex = mapRowId(gridSelect, gridCandidate, rowData);
  if( mapRowIdex >= 0 ){
    gridSelect.removeRow(mapRowIdex);	
  }  	
  gridSelect.refresh();
} 

selectAll = function(grid_id){
  var grid = efgrid.getGridObject( grid_id );
  for(var i=0;i<grid.getRowCount();i++)
	selectRow(grid_id,i);
}

unselectAll = function(grid_id){
  var grid = efgrid.getGridObject( grid_id );
  for(var i=0;i<grid.getRowCount();i++)
	unselectRow(grid_id,i);
}

