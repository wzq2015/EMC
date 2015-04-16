var head = null;//头
var table = null;//table页
var config = null;//配置页
//var menu = null;//菜单页
var portal = null;//portal必须要的

function onloadEV(){
	try{
		head = window.parent.document.getElementsByName("head")[0];
	}catch(e){
	}
	try{
		table = window.parent.document.getElementsByName("table")[0];
	}catch(e){
	}
	try{
		config = window.parent.document.getElementsByName("config")[0];
	}catch(e){
	}
	/**
	try{
		menu = window.parent.frames("menu");
		menu = window.parent.document.getElementsByName("menu")[0];
	}catch(e){
	}
	*/
	try{
		portal = window.parent.document.getElementsByName("portal")[0];
	}catch(e){
	}	
	
}

      /*生成菜单*/
function genMenuTree(portalId){
  	var MenuModel;
  	MenuModel=new eiTreeModel("EVPM0601") ;
  	var nMenu=new EFMenu(MenuModel,"nMenu","nMenu");
  	configMenu(nMenu);
  	nMenu._rootNode=new EFMenuItem(nMenu, null, portalId, "", false, null); 
    var  nmenuNode=document.getElementById("nMenu");
    if(nmenuNode!=null)
    {
	 	nmenuNode.innerHTML="";
	 	var nMenuObj = nMenu.render();
	 	if(nMenuObj!=null){
	 		nmenuNode.appendChild(nMenu.render());
	 	}
	 }
 	
}

function openForm(label) {
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

function genUserParam(evUserParam){
        var reg1=/=/g;
        var reg2=/&/g;
		var	evUser =evUserParam.replace( reg1, "\*");
		evUserParam = evUser.replace( reg2, "\|");

return evUserParam;
}


function treeNodeInitializer(node){  
  node.textClicked = function(){ activeFormByNode( node ); };
}
var modalWin;
var newMask={
    "position": "absolute",
    "top": "0px",
    "left": "0px",
    "width": "100%",
    "height": "100%",
    "opacity": ".3",
    "filter": "alpha(opacity=0)",
    "display":"none"
}
function showMask(){
	if(modalWin==undefined){
	  modalWin=new EFModalWindow('progressWindow');
    $(modalWin.popupMask).removeClass("efModalWindowMask");
    $(modalWin.popupMask).css(newMask);
    $(modalWin.popupMask).focus(function(){hideMask();$("div[popdiv='true']").hide()});
	}
	modalWin.show(30, 30);
}
function hideMask(){
	if(modalWin)
	   modalWin.hide();
}