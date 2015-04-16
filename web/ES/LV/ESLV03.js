var orgTreeModel =  new eiTreeModel('ESUTTR51');
var refreshTab0 = true;
var refreshTab1 = true;

efform_onload = function () {
  efsplitter("leftTree", "leftTreeDiv", "middleSplitter");
  efregion.show("ef_region_main");
  enableButtons(false);
}

button_f4_onclick = function() 
{
  var grid = efgrid.getGridObject("ef_grid_r");
  var count = grid.getCheckedRows().length;
  if( count >0 && confirm(getI18nMessages("label.ESConfirmDeleteOrganization","确定要删除该组织机构及其下的子机构吗"))){
  	efgrid.submitForm( "ef_grid_r", "es","ESLV12","delete", true );
  	reloadCurrentNode();
  }	
}

button_f5_onclick = function() 
{
	efgrid.submitForm( "ef_grid_r", "es","ESLV12","insert",true );	
	reloadCurrentNode();
}

button_f6_onclick = function() 
{
	efgrid.submitForm( "ef_grid_r", "es","ESLV12","update", true );
	reloadCurrentNode();
}

button_f7_onclick = function() 
{
	var win = efform.openNewForm("ESUT10", "efFormPopup=1&chooseType=PSTP");
	win.focus();
}

button_f8_onclick = function() 
{
	efgrid.submitForm( "ef_grid_e", "es","ES31","delete", true );
}

efform_onPopupReturn = function(formEname, value)
{
  var callback = {
	onSuccess :
	  function(eiInfo) {	
       var grid = efgrid.getGridObject("ef_grid_e");
	   grid.setData(eiInfo);
	   grid.refresh();
	
	  },
	onFail : 
	  function(eMsg) {
		alert(eMsg);
	  }
  };
	
  var grid = efgrid.getGridObject( "ef_grid_e" );
  
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
  if ( node.top() ){
    node.icon(efico.get("efform.dev"));
    node.openIcon(efico.get("efform.dev")); 
    
    
    var can = document.getElementById("TopOrgManager").value;
    if ( can == "1" ){
      node.active(true);
      node.textClicked = function(){ treeTopNodeClicked( node ); };
    }else{
	    node.icon(efico.get("eftree.treeImgForum"));
	    node.openIcon(efico.get("eftree.treeImgForum"));     	
    }
    return;
  };
  
  var nodeData = node.data();
  if ( nodeData.SubOrgManage=="1" || nodeData.RoleManage=="1" ){
    node.icon(efico.get("efform.dev"));
    node.openIcon(efico.get("efform.dev"));    
    node.textClicked = function(){ treeNodeClicked( node ); };
   }else{
    node.icon(efico.get("eftree.treeImgForum"));
    node.openIcon(efico.get("eftree.treeImgForum"));
    node.active(false);
   }
}

function treeNodeClicked(node){
  
   enableButtons(true);
   var org = node.label();
   if ( !node.top() ){ org = node.label(); }
   document.getElementById("inqu_status-parent").value=org;  
   eftab_show("ef_tab_x", 0); 
    eftab_show("ef_tab_x", 1);  
   if ( node.data().RoleManage!="1" ){
     eftab_hidden("ef_tab_x", 0);
   }
   
   if ( node.data().SubOrgManage!="1" ){     
    eftab_hidden("ef_tab_x", 1);
   }
   
   refreshTab0 = true;
   refreshTab1 = true;
   
   var cur = eftab_current("ef_tab_x");
   if( cur == "0" ){
     efgrid.submitInqu( "ef_grid_e", "es","ES31","query"); 
     refreshTab0 = false;    
   } else if ( cur == "1" ){
     efgrid.submitInqu( "ef_grid_r", "es","ESLV12","query");  
     refreshTab1 = false;
   }
}

switchTabCallback = function( from, to ){
 /* var cur =nTree.getCurrent();
  if( cur == null ){
    alert("请先选择目标机构");
    return false;
  }*/
  if( to == "0" && refreshTab0 ){
     efgrid.submitInqu( "ef_grid_e", "es","ES31","query");
     refreshTab0 = false;
   } else if ( to == "1" && refreshTab1){
   	 if(ef.get("inqu_status-parent").value != "")
     	efgrid.submitInqu( "ef_grid_r", "es","ESLV12","query");
       
     refreshTab1 = false;
   }  
  return true;
}

function treeTopNodeClicked(node){
   enableButtons(true);
   document.getElementById("inqu_status-parent").value="";  
   eftab_hidden("ef_tab_x", 0); 
   efgrid.submitInqu( "ef_grid_r", "es","ESLV12","query"); 
}

reloadCurrentNode = function()
{
    var no = nTree.getCurrent();
  	if ( no == null ){
  	  nTree.reload(orgTreeModel);	 
  	} else {  	
	  no.reload();
	}  
}

function enableButtons(enable){
  efbutton.setButtonStatus("F4", enable);
  efbutton.setButtonStatus("F5", enable);
  efbutton.setButtonStatus("F6", enable);
  efbutton.setButtonStatus("F7", enable);
  efbutton.setButtonStatus("F8", enable);
}






