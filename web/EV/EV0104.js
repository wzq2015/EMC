window.onload = function (){
	onloadEV();
	genTree();//EV01_Menu.js中的方法
}
function genTree(){
	var portalId = ef.get("portalId").value;
  	var MenuModel;
  	MenuModel=new eiTreeModel("EVPM0601") ;
  	var nMenu=new EFMenu(MenuModel,"nMenu","nMenu");
  	configMenu(nMenu);
  	nMenu._rootNode=new EFMenuItem(nMenu, null, portalId, "", false, null); 
  	ef.get("nMenu").innerHTML="";
  	$('#nMenu').append(nMenu.render());
}
function openForm(label) {
  //label结构
  //tevpm06.getNodeEname() + "#" + tevpm06.getMenuType() + "#" + tevpm06.getMenuUrl()+ "#" + tevpm06.getSsoSystemId()+ "#" +portalId
  ary_label=label.split("#");
  if(ary_label[1]==0){//平台页面
     window.open("DispatchAction.do?efFormEname="+ary_label[2]);     
  }else if(ary_label[1]==1 && (ary_label[3].trim()).length>0){//需要进行单点登录--互信方式
    info = new EiInfo();
    info.set("ssoSystemId",ary_label[3]);
    info.set("ssoUrl",ary_label[2]);
	EiCommunicator.send("EV01", "getTrustUrlInfo", info,null);
	if(ajaxEi != null){
	   window.open(ajaxEi.get("ssoUrl"));
    }
  }else if(ary_label[1]==2){//内容管理
    //根据传入值进行跳转处理
     info = new EiInfo();
     info.set("menuUrl",ary_label[2]);
     info.set("resourceType","3");
	 EiCommunicator.send("EV01", "getCmsContentInfo", info,null);
	 if(ajaxEi != null){
	   window.open(ajaxEi.getBlock("result").get("menu_url"));
     }
  }else{
    window.open(ary_label[2]);  
  }        
}  
 

function activeFormByNode(node){  
  if ( node.leaf() ) {
    activeForm(node.label());
  }
} 

function activeForm(label){  
    openForm(label);
} 

function configMenu(menu){
  menu.depth(8);
  menu.textClicked = activeFormByNode;
  menu.hoverExpand = function(n){ if ( n.depth()==1 ) return false; else return true; }
  
}

function configTree(tree){
  tree.depth(8);
  tree.emptyNodeAsLeaf = true;
  tree.activeEmptyJudger = false;
  tree.nodeInitializer = treeNodeInitializer;
}

function treeNodeInitializer(node){  
  node.textClicked = function(){ activeFormByNode( node ); };
}