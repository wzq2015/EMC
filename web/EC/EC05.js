var isSite = null;
var id = null;
var columnCategory = null;
//维护窗口列表
var winMap = new Object();
var winCount = 0;
var mainTreeObject = 0; 
var pageIndex = 0;	  // tab id
var curPage = "EC03"; // EC03 OR EC04

//EC03页面 tab序列id与名称映射对象
//用于:子页面之间相互切换的时候（如EC03与EC04之间），优先加载并切换到之前具有相同tabName的TAB页，
//如果之前所在的tabName在切换后的子页面不存在，则默认从第一个tab页加载
var ec03_tablist = [];
var ec03_tab0 ={"tabId":0,"tabName":"column"};
var ec03_tab1 ={"tabId":1,"tabName":"article"};
var ec03_tab2 ={"tabId":2,"tabName":"audit"};
var ec03_tab3 ={"tabId":3,"tabName":"template"};
var ec03_tab4 ={"tabId":4,"tabName":"siteFF"};
var ec03_tab5 ={"tabId":5,"tabName":"articleRecy"};
var ec03_tab6 ={"tabId":6,"tabName":"colLogo"};
ec03_tablist.push(ec03_tab0);
ec03_tablist.push(ec03_tab1);
ec03_tablist.push(ec03_tab2);
ec03_tablist.push(ec03_tab3);
ec03_tablist.push(ec03_tab4);
ec03_tablist.push(ec03_tab5);
ec03_tablist.push(ec03_tab6);

//EC04页面 tab序列id与名称映射对象
var ec04_tablist = [];
var ec04_tab0 ={"tabId":0,"tabName":"article"};
var ec04_tab1 ={"tabId":1,"tabName":"column"};
var ec04_tab2 ={"tabId":2,"tabName":"audit"};
var ec04_tab3 ={"tabId":3,"tabName":"template"};
var ec04_tab4 ={"tabId":4,"tabName":"FF"};
var ec04_tab5 ={"tabId":5,"tabName":"HZ"};
var ec04_tab6 ={"tabId":6,"tabName":"articleRecy"};
var ec04_tab7 ={"tabId":7,"tabName":"colLogo"};
ec04_tablist.push(ec04_tab0);
ec04_tablist.push(ec04_tab1);
ec04_tablist.push(ec04_tab2);
ec04_tablist.push(ec04_tab3);
ec04_tablist.push(ec04_tab4);
ec04_tablist.push(ec04_tab5);
ec04_tablist.push(ec04_tab6);
ec04_tablist.push(ec04_tab7);

/*
* curPage:所在的子页面名称 EC03 或 EC04等
* return： 查找curPage页的映射对象，返回 pageIndex所标识的TAB页的名称
*/
getTabName = function(){
	var tabid = pageIndex;
	var tablist = null;
	var tabName = null;
	if(curPage =="EC03"){
		tablist = ec03_tablist;
	}else if(curPage=="EC04"){
		tablist = ec04_tablist;
	}
	for(var i=0;i< tablist.length || 0;i++)
	{
		if(tablist[i].tabId == tabid){
			tabName =  tablist[i].tabName;
			break;
		}
	}
	return tabName;
}
/*
* curPage : 所在的子页面 EC03 或 EC04
* tabName：tab页名称
* return：查找curPage页的映射对象，返回与名称对应的加载ID
*/
getTabId = function(curPage,tabName){
	var tabId = 0;
	var tablist = null;
	if(curPage =="EC03"){
		tablist = ec03_tablist;
	}else if(curPage=="EC04"){
		tablist = ec04_tablist;
	}
	for(var i=0;i< tablist.length || 0;i++)
	{
		if(tablist[i].tabName == tabName){
			tabId =  tablist[i].tabId;
			break;
		}
	}
	return tabId;
}

var MenuModel =  new eiTreeModel('EC10');

//隐藏头部菜单
var menuStatus = "inline";
function toggleMenu()
{
	if(menuStatus == "inline")
	{
		menuStatus = "none";
		$("#mainFrameDiv").css('top','29px');
		ef.get("frameHeadLine").style.display = "none";
		ef.get("toggleMenuImg").src = efico.get("efform.efframeMenuDown");
	}
	else
	{
		menuStatus = "inline";  
		$("#mainFrameDiv").css('top','99px');
		ef.get("frameHeadLine").style.display = "table-row";		
		ef.get("toggleMenuImg").src = efico.get("efform.efframeMenuUp");
	}
}

/* 是否打开新窗口 */
var __newForm = true;


var treeStatus = "inline";		
function toggleTree()
{
	if(treeStatus == "inline")
	{
		treeStatus = "none";
		ef.get("leftTree").style.display = "none";
		ef.get("middleSplitter").style.display = "none";
		ef.get("toggleTreeImg").src = efico.get("eftree.treeImgInActv");
	}
	else
	{
		treeStatus = "inline";
		ef.get("leftTree").style.display = "inline";
		ef.get("middleSplitter").style.display = "inline";
		ef.get("toggleTreeImg").src = efico.get("eftree.treeImgActv"); 
	}
}

var start_time;

function configMenu(menu){
  menu.depth(8);
  menu.textClicked = activeFormByNode;
  menu.hoverExpand = function(n){ return true; }	// { if ( n.depth()==1 ) return false; else return true; }
}

function configTree(tree){
  tree.emptyNodeAsLeaf = false;
  tree.activeEmptyJudger = false;
  tree.topNodeActive = false;
  tree.nodeInitializer = treeNodeInitializer;
  tree.expand();
  mainTreeObject = tree;
}

function loadMenuItem(node){
	var label = node._label;
	if(label==null){
		//根节点
		node.addMenuItem("", {
				label : "addSite",
				parent : "",
				text : "新增站点",
				leaf : "1",
				func : function() {
					insertsite();  //新增站点
				}
			});
		node.addMenuItem("", {
				label : "siteManage",
				parent : "",
				text : "站点列表维护",
				leaf : "1",
				func : function() {
					var url = document.getElementById("hdUrl").value;
					window.open(url);//打开站点列表维护页面
				}
			});
		
	}else{
		var nodeType = (node._label).split("@")[0];
		if(nodeType=="site"){
			
			   node.addMenuItem("", {
					label : "updateSite",
					parent : "",
					text : "修改站点",
					leaf : "1",
					func : function(id, label) {
						var siteId = id.split("@")[1];
						modifysite(siteId);
					}
				});
				
				node.addMenuItem("", {
					label : "viewSite",
					parent : "",
					text : "预览这个站点",
					leaf : "1",
					func : function(id, label) {
						var siteId = id.split("@")[1];
						var info = new EiInfo();
						info.set("siteId",siteId);
						EiCommunicator.send( "ECSM01", "viewSite" , info, null ); 
						var url=ajaxEi.get("url");
						window.open(url);
					}
				});
				
				node.addMenuItem("", {
					label : "copySite",
					parent : "",
					text : "复制站点",
					leaf : "1",
					func : function(id, label) {
						var siteId = id.split("@")[1];
						showCopyOptionDiv(siteId,'s');
					}
				});
				
				node.addMenuItem("", {
					label : "addpub",
					parent : "",
					text : "增量发布",
					leaf : "1",
					func : function(id, label) {
						var siteId = id.split("@")[1];
						if(!confirm("确定要发布吗?"))
						{
							return false;
						}
						var info = new EiInfo();
						info.set("siteId",siteId);
						info.set("isIncre","true");
						EiCommunicator.send( "ECSM01", "releaseSite" , info, null );
						var msg=ajaxEi.getMsg();
						alert(msg);
					}
				});
				node.addMenuItem("", {
					label : "homepagepub",
					parent : "",
					text : "发布首页",
					leaf : "1",
					func : function(id, label) {
						var siteId = id.split("@")[1];
						if(!confirm("确定要发布吗?"))
						{
							return false;
						}
						var info = new EiInfo();
						info.set("siteId",siteId);
						info.set("isMainOnly","true");
						EiCommunicator.send( "ECSM01", "releaseSite" , info, null );
						var msg=ajaxEi.getMsg();
						alert(msg);
					}
				});
				node.addMenuItem("", {
					label : "addColumn",
					parent : "",
					text : "新建栏目",
					leaf : "1",
					func : function(id, label) {
						var siteId = id.split("@")[1];
						var tag = "site";
						insertcolumn(siteId,tag);
					}
				});
				
				node.addMenuItem("", {
					label : "newtemplate_site",
					parent : "",
					text : "新增模板",
					leaf : "1",
					func : function(id, label) {
						var nodeId = id.split("@")[1];
						var nodeType = "s";
						newTemplate(nodeId,nodeType);
					}
				});
				
				node.addMenuItem("", {
					label : "upload_images",
					parent : "",
					text : "上传图片与样式表",
					leaf : "1",
					func : function(id, label) {
						var nodeId = id.split("@")[1];
						var nodeType = "s";
						document.getElementById("nodeId").value = nodeId;
						document.getElementById("nodeType").value = nodeType;
						
						removeFileObj();
						var file2 = document.getElementById("file2");
						var fileObj=document.createElement('input');
						fileObj.type = "file";
						fileObj.name = "importFile";
						fileObj.id = "importFile";
						fileObj.contentEditable = false;
						if(!file2.hasChildNodes()){
							file2.appendChild(fileObj);
						}
						
						efwindow.show(null,"importTemplate","center");
										}
				});
				
				node.addMenuItem("", {
					label : "release_images",
					parent : "",
					text : "分发图片与样式表",
					leaf : "1",
					func : function(id, label) {
						var nodeId = id.split("@")[1];
						var info = new EiInfo();
						info.set("siteId",nodeId);
						EiCommunicator.send( "ECSM01", "releaseImages" , info, null );
						if(ajaxEi!=null){
							var msg=ajaxEi.getMsg();
							alert(msg);
						}  
										}
				});
		}else if(nodeType=="column"){
			
			if((node._label).split("@").length >= 4){
				columnCategory = (node._label).split("@")[4];
			}
			
				node.addMenuItem("", {
					label : "updateColumn",
					parent : "",
					text : "修改栏目",
					leaf : "1",
					func : function(id, label) {
						var columnId = id.split("@")[1];
						modifycolumn(columnId);
					}
				});
				
				node.addMenuItem("", {
					label : "copyColumn",
					parent : "",
					text : "复制栏目",
					leaf : "1",
					func : function(id, label) {
						var columnId = id.split("@")[1];
						showCopyOptionDiv(columnId,'c');
					}
				});
				
				node.addMenuItem("", {
					label : "transfer",
					parent : "",
					text : "移动",
					leaf : "1",
					func : function(id, label) {
						var childWindow = efform.openNewForm('ECCM02', "serviceName=ECCM01&methodName=initLoad&columnId=" + id.split("@")[1]);
      					childWindow.focus();
					}
				});
				
				node.addMenuItem("", {
					label : "viewColumn",
					parent : "",
					text : "预览",
					leaf : "1",
					func : function(id, label) {
						var columnId = id.split("@")[1];
						var info = new EiInfo();
						info.set("columnId",columnId);
						EiCommunicator.send( "ECCM01", "viewColumn" , info, null ); 
						var url=ajaxEi.get("url");
						//alert("../"+url);
						window.open(url);
					}
				});
				
				node.addMenuItem("", {
					label : "addpub",
					parent : "",
					text : "增量发布",
					leaf : "1",
					func : function(id, label) {
						var columnId = id.split("@")[1];
						if(!confirm("确定要发布吗?"))
						{
							return false;
						}
						var info = new EiInfo();
						info.set("columnId",columnId);
						info.set("isIncre","true");
						EiCommunicator.send( "ECSM01", "releaseColumn" , info, null ); 
						var msg=ajaxEi.getMsg();
						alert(msg);
					}
				});
				
				node.addMenuItem("", {
					label : "outlinepub",
					parent : "",
					text : "发布首页",
					leaf : "1",
					func : function(id, label) {
						var columnId = id.split("@")[1];
						if(!confirm("确定要发布吗?"))
						{
							return false;
						}
						
						var info = new EiInfo();
						info.set("columnId",columnId);
						info.set("isMainOnly","true");
						EiCommunicator.send( "ECSM01", "releaseColumn" , info, null ); 
						var msg=ajaxEi.getMsg();
						alert(msg);
					}
				});
				if(columnCategory=="00"){ //非标准栏目，屏蔽右键菜单
					node.addMenuItem("", {
						label : "addArticle",
						parent : "",
						text : "新建文章",
						leaf : "1",
						func : function(id, label) {
							var nodeId = id.split("@")[1];
							var childWindow = efform.openNewForm('ECAM02', "&inqu_status-0-flag=insert&inqu_status-0-columnId="+nodeId);
						    childWindow.focus();
						}
					});
				}
				
				node.addMenuItem("", {
					label : "addColumn",
					parent : "",
					text : "新建子栏目",
					leaf : "1",
					func : function(id, label) {
						var columnId = id.split("@")[1];
						var tag = "column";
						insertcolumn(columnId,tag);
					}
				});
				
				node.addMenuItem("", {
					label : "newtemplate_column",
					parent : "",
					text : "新增模板",
					leaf : "1",
					func : function(id, label) {
						var nodeId = id.split("@")[1];
						var nodeType = "c";
						newTemplate(nodeId,nodeType);
										}
				});
		}
		}
}

function treeNodeInitializer(node){
    var isReq=node.isreq;
    
	if ( node.top() ){ 
	  	node.active(true);
	  	node.textClicked = function(){ treeTopNodeClicked( node ); };	
	};  
	node.textClicked = function(){ treeNodeClicked( node ); };

	if(node.depth() == 0) {
		node.icon("EC/Images/eftree_1.png");
		node.openIcon("EC/Images/eftree_1.png");
	}else
	if(node.depth()==1){
		node.icon("EC/Images/eftree_2.png");
		node.openIcon("EC/Images/eftree_2.png");
	}else
	{
		if(node.leaf()!=1)
		{
			node.icon("EC/Images/eftree_4.png");
			node.openIcon("EC/Images/eftree_4.png");
		}
		else
		{
			node.icon("EC/Images/eftree_4.png");
			node.openIcon("EC/Images/eftree_4.png");
		}
	}
	loadMenuItem(node);//加载右键菜单
}

 ajax_callback_open= {
	onSuccess :
   		function(eiInfo)
		{
			var hasPermission = eiInfo.get("hasPermission");
			if(hasPermission == "false"){
				alert("您无权操作当前节点！");
				
			}
			else{
				if(isSite=="site") 
					parent.document.mainFrame.location =
						"DispatchAction.do?efFormEname=EC03&inqu_status-0-siteId="	 + id;
				else
					parent.document.mainFrame.location = 
						"DispatchAction.do?efFormEname=EC04&inqu_status-0-columnId=" + id + "&inqu_status-0-columnCategory=" + columnCategory;
			}
   		},
 	onFail:
   		function(eMsg)
		{
   			alert("获取授权信息失败，原因："+eMsg);
		}
}

function readyToOpenForm(){
	var info = new EiInfo();
	info.set("nodeId",id);
	if(isSite=="site") info.set("nodeType","s");
	else info.set("nodeType","c");
	EiCommunicator.send( "ECPM02", "hasPermission" , info, ajax_callback_open );
}



function treeNodeClicked(node){
	
	isSite = (node._label).split("@")[0];
	id = (node._label).split("@")[1];
	if((node._label).split("@").length >= 4){
		columnCategory = (node._label).split("@")[4];
	}
	readyToOpenForm();
}
//根据站点Id刷新
function onSiteListChange()
{
	nTree.param = ef.get("siteList-0-siteId").value;
	nTree.reload(tableTreeModel);
	isSite = "site";
	id = ef.get("siteList-0-siteId").value;
	document.getElementById("siteId").value=id;
	readyToOpenForm();
	mainTreeObject.rootNode().getChildNodes()[0].onArchClicked();//默认展开站点节点
}

var tableTreeModel =  new eiTreeModel('ECHometree');


efform_onload = function () {
	//创建 进度窗口
	ec05_modalWin  = new EFModalWindow('ec05_progressWindow');
	ec05_isShow = false;
	//第一个参数左边的TD的ID， 第二个左边TD内DIV的ID，第三个中间分割TD的ID
	var split = efsplitter("leftTree", "selectAndTree", "middleSplitter");
    //split.catchEvent(window.mainFrame);
    load_es_init_user();
    onSiteListChange();
}

// 对应用例ID：99573
var keyCode = "";
document.onkeydown   =   function   (e)   {   
	var e = e || window.event;
	if(e){
		keyCode = e.keyCode;
	}
}   
 /***************************新增站点*********************************/
insertsite = function(){
		btnSiteDisabled();//模板按钮不可用
		
		document.getElementById("hdViewId").value = '1';
		efform.clearDiv("modifysite");
		efwindow.show(null,"modifysite","center");
	    //清空模版
	    document.getElementById("templateInsId00").value = "";
		document.getElementById("SiteTemplatePreview0").value = "";
		document.getElementById("templateInsName00").value = "";
		
		document.getElementById("templateInsId01").value = "";
		document.getElementById("ColumnTemplatePreview0").value = "";
		document.getElementById("templateInsName01").value = "";
		
		document.getElementById("templateInsId03").value = "";
		document.getElementById("ArticleTemplatePreview0").value = "";
		document.getElementById("templateInsName03").value = "";
		//已发和代发默认选中
		cleanArticleStates();
		document.getElementById("statePublishing").checked = true;
		document.getElementById("stateRelease").checked = true;
		//预览、保存、关闭按钮默认选中
		cleanArticleBtns();
		document.getElementById("Preview").checked = true;
		document.getElementById("Save").checked = true;
		document.getElementById("Close").checked = true;
		//不配置定时任务默认选中
		document.getElementsByName("result-0-jobType")[0].checked = true;
		var jobType = getRadioValue("result-0-jobType");
		changeJobType(jobType);
	
}

function cleanArticleStates(){
	var chkbox = document.getElementsByName("articlestates");
	for(var i=0;i<chkbox.length;i++){
		chkbox[i].checked = false;
	}
}

function cleanArticleBtns(){
	var chkbox = document.getElementsByName("chkBtn");
	for(var i=0;i<chkbox.length;i++){
		chkbox[i].checked = false;
	}
}

/***************************修改站点*********************************/
//修改站点
modifysite = function(siteId){
	document.getElementById("hdViewId").value = '0';
	ef.get("inqu_status-0-siteId").value = siteId;
	ef.get("templatelink_nodeId").value = siteId;
    var info = new EiInfo();
	info.setById("inqu_status-0-siteId");
	EiCommunicator.send( "EC03", "query" , info, ajax_callback_openmodifysite );
}

ajax_callback_openmodifysite = {
	onSuccess :
   		function(eiInfo){
   			efform.clearDiv("modifysite");
   			efform.fillDiv("modifysite",eiInfo); //将站点信息填充到div
   			/********************************************站点、栏目、文章模板值绑定到页面**********************************/
			//ef.get("d-0-firsetLevelColumn").value = "true";
			var siteId = eiInfo.get("result-0-siteId");
			//ef.get("templatelink_nodeId").value = siteId;  //选择模版时所需要的SiteId
			
			clear();//清空模板内容
		    btnSiteUnDisabled();//模板按钮可用
		    
		    for(var i=0;i<3;i++){
				var info = new EiInfo(); 
				info.set("objId",siteId); //节点编号
				var nodeType=0; 
				var templateTypeId;
				for(var i=0;i<3;i++){
					if(i%3=='0'){
						/* 站点 */
						templateTypeId = 0; //0:站点首页模板1:栏目首页模板2:栏目列表模板3:文章显示模板
						//nodeType = 0; //0:站点 1：栏目 2：文章
						info.set("templateTypeId",templateTypeId);//模板类型标识
						info.set("objType",nodeType); //节点类型
					}else if(i%3=='1'){
						/* 栏目 */
						templateTypeId = 1; 
						//nodeType = 1; 
						info.set("templateTypeId",templateTypeId);
						info.set("objType",nodeType); 
					}else{
						templateTypeId = 3;
						//nodeType = 2; 
						info.set("templateTypeId",templateTypeId);
						info.set("objType",nodeType);
					}
					EiCommunicator.send( "ECTM03", "getTemplateFileName" , info, null );
					
					if(ajaxEi!=null){
						templateInsId = ajaxEi.get("templateInsId");
						templateInsName = ajaxEi.get("templateInsName");
						if(i%3=='0'){
							//绑定栏目模版实例名称
							document.getElementById("templateInsId00").value = templateInsId;//预览时需要的模板实例ID 
							document.getElementById("SiteTemplatePreview0").value = templateInsName;
							document.getElementById("templateInsName00").value = templateInsName;
						}else if(i%3=='1'){
							//绑定栏目模版实例名称
							document.getElementById("templateInsId01").value = templateInsId;//预览时需要的模板实例ID 
							document.getElementById("ColumnTemplatePreview0").value = templateInsName;
							document.getElementById("templateInsName01").value = templateInsName;
						}else{
							//绑定栏文章模版实例名称
							document.getElementById("templateInsId03").value = templateInsId;//预览时需要的模板实例ID
							document.getElementById("ArticleTemplatePreview0").value = templateInsName;
							document.getElementById("templateInsName03").value = templateInsName;
						}
					}	
				}
		    }
  	
			/***************************************模板绑定结束**********************************/
	
			//Bind SiteArticleButton
			var articleBtn= eiInfo.get("result-0-siteArticleButton");
	     	var btns = articleBtn.split("#");
			for(var i=0;i< btns.length;i++){
				if(btns[i]=="01")
					document.getElementById("Preview").checked = true;
				if(btns[i]=="02")
					document.getElementById("Save").checked = true;	
				if(btns[i]=="03")
					document.getElementById("Close").checked = true;		
				if(btns[i]=="04")
					document.getElementById("SaveSubmit").checked = true;		
				if(btns[i]=="05")
					document.getElementById("SaveCreate").checked = true;		
				if(btns[i]=="06")
					document.getElementById("SubmitCreate").checked = true;		
				if(btns[i]=="07")
					document.getElementById("SaveClose").checked = true;		
				if(btns[i]=="08")
					document.getElementById("SavePublish").checked = true;		
				if(btns[i]=="09")
					document.getElementById("ShenPi").checked = true;				
			}
			//Bind ArticleReleaseStates
			var value= eiInfo.get("result-0-articleReleaseStates");
			var tmpvalue = value.split(",");
			cleanArticleStates();
			for(var i =0;i<tmpvalue.length;i++){
		    	if(tmpvalue[i]=="10")
		    		document.getElementById("stateCreate").checked = true;
		    	else if(tmpvalue[i]=="20")	
		    		document.getElementById("stateDenial").checked = true;
		    	else if(tmpvalue[i]=="30")
		    		document.getElementById("stateAudit").checked = true;
		    	else if(tmpvalue[i]=="40")
		    		document.getElementById("statePublishing").checked = true;
		    	else if(tmpvalue[i]=="50")
		    		document.getElementById("stateRelease").checked = true;
		    }
		    
			if(" "==document.getElementById("d-0-jobStartHour").value)
				document.getElementById("d-0-jobStartHour").value = "";
			if(" "==document.getElementById("d-0-jobStartMin").value)
				document.getElementById("d-0-jobStartMin").value = "";
			if(" "==document.getElementById("d-0-jobEndHour").value)
				document.getElementById("d-0-jobEndHour").value = "";
			if(" "==document.getElementById("d-0-jobEndMin").value)
				document.getElementById("d-0-jobEndMin").value = "";
			if(" "==document.getElementById("d-0-jobIntervalHour").value)
				document.getElementById("d-0-jobIntervalHour").value = "";
			if(" "==document.getElementById("d-0-jobIntervalMin").value)
				document.getElementById("d-0-jobIntervalMin").value = "";
				
			var jobType = eiInfo.get("result-0-jobType");
			if(jobType==null||jobType.trim()==""){
				document.getElementsByName("result-0-jobType")[0].checked = true;
				changeJobType(0);
			}else{
				if(jobType=="1"){
					document.getElementById("result-0-jobStartHour1").value = document.getElementById("result-0-jobStartHour").value;
					document.getElementById("result-0-jobStartMin1").value = document.getElementById("result-0-jobStartMin").value;
					document.getElementById("result-0-jobStartHour").value = "";
					document.getElementById("result-0-jobStartMin").value = "";
				}
				document.getElementsByName("result-0-jobType")[jobType].checked = true;
				changeJobType(jobType);
			}
			
			efwindow.show(null,"modifysite","center");
   		},
 	onFail:
   		function(eMsg)
		{
   			alert("获取站点信息失败，原因："+eMsg);
		}
};

/************************************************站点保存***************************************************/
//点击保存按钮
button_save1_onclick=function(){
	if(ef.get("result-0-siteName").value==""){
		alert("站点名称不能为空!");
		return false;
	}
	
	if(ef.get("result-0-siteAlias").value==""){
		alert("存放位置不能为空!");
		return false;
	}
	
	if(ef.get("result-0-siteSeq").value==""){
		alert("站点排序标识不能为空!");
		return false;
	}
	
	if(!confirm("是否保存当前数据？"))
	{
		return false;
	}
	
	var isConfirmS = geCheckStateValue();//保存文章状态
	if (isConfirmS == false) return false;	
	var isConfirmB = geCheckBoxValue();//保存文章按钮
	if (isConfirmB == false) return false;	
	
	var jobType = getRadioValue("result-0-jobType");
	changeTimeValue(jobType);
	
	var info = new EiInfo();
	info.setByNode("ef_region_modifysite");
	info.set("jobType",jobType);
	
	if(document.getElementById("hdViewId").value=='0'){
		EiCommunicator.send( "ECSM01", "update1" , info, ajax_callback_savemodifysite );//修改站点
	}else{
		EiCommunicator.send( "ECSM01", "saveSite" , info, ajax_callback_savemodifysite );//新增站点
	}
}

ajax_callback_savemodifysite = {
	onSuccess :
   		function(eiInfo)
		{
			if(eiInfo.getMsg()!=null && eiInfo.getStatus()=='-1'){
				alert(eiInfo.getMsg());
			}else{
				alert("保存成功");
				efwindow.hide();
				if(eiInfo.get("siteState")!='1'){
					document.getElementById("siteId").value = eiInfo.get("siteId");
					//下拉框重新加载
					var info = new EiInfo();
					EiCommunicator.send( "EC05", "initLoad" , info, ajax_bindOptions_callback ); 
				}else{
					//站点修改成关闭状态,刷新父及框架
					window.top.location.reload();
				}
			}
   		},
 		onFail:
   		function(eMsg)
		{
   			alert("保存失败，原因："+eMsg);
		}
};

var ajax_bindOptions_callback = {
  onSuccess : 
	function(eiInfo){ 
		var eiBlock = eiInfo.getBlock("siteList1");
		ef.get("siteList-0-siteId").options.length=0;//清空下拉框中的数据
		for(i=0;i<eiBlock.getRows().length;i++){
			label = eiBlock.getCell(i,"label");
			value = eiBlock.getCell(i,"value");
			var objOption = new Option(label,value); 
			ef.get("siteList-0-siteId").options[i]=objOption;
			//alert("------------1:---------"+ef.get("siteList-0-siteId").options[i].value+"--2--"+document.getElementById("siteId").value);
			if(objOption.value==document.getElementById("siteId").value){
				ef.get("siteList-0-siteId").options[i].selected="selected";
			}
		}
     	onSiteListChange(); //刷新左侧树菜单
    },
  onFail: 
    function(eMsg) {
    }
}
//保存文章按钮
geCheckBoxValue = function (){
	var str="";
	var btnBoxs = document.getElementsByName("chkBtn");
	
    for (var i=0;i<btnBoxs.length;i++ ){
		if(btnBoxs[i].checked){
			str=str + "0" + (i+1) + "#";  
		}
    }
    if(str==""){
		   var sure1 = confirm("文章按钮设置为空，默认为'预览、保存、关闭'，是否继续？");
		   if (!sure1) return false;
		   str = "01#02#03#"; //默认预览保存关闭 
	}
    var leg = str.length - 1;
    str = str.substring(0,leg);
	//document.getElementById("result-0-siteArticleButton").value=str;
    document.getElementById("siteArticleButton").value=str;
    return true;
}

//保存文章状态
geCheckStateValue = function (){
	var chkstatus = document.getElementsByName("articlestates");
	var articleReleaseStates = "";
	for(var i=0;i<chkstatus.length;i++){
		if(chkstatus[i].checked==true){			
				articleReleaseStates += "," + (i+1) +"0";
		}
	}
	if(articleReleaseStates==""){
		   var sure2=confirm("文章状态为空，默认为'待发布，已发'，是否继续？");
		   if (!sure2) return false;
		   articleReleaseStates = "40,50"; //待发布，已发
	}
	document.getElementById("articleReleaseStates").value = articleReleaseStates;
	return true;
}
/************************************************保存结束***************************************************/

//点击取消按钮
button_cancel1_onclick=function(){
  efwindow.hide();
}

//保存前调整清理时间信息
changeTimeValue=function(value){
	if(value=="1"){
		document.getElementById("result-0-jobStartHour").value = document.getElementById("result-0-jobStartHour1").value;
		document.getElementById("result-0-jobStartMin").value = document.getElementById("result-0-jobStartMin1").value;
		document.getElementById("result-0-jobEndHour").value = "";
		document.getElementById("result-0-jobEndMin").value = "";
		document.getElementById("result-0-jobIntervalHour").value = "";
		document.getElementById("result-0-jobIntervalMin").value = "";
	}else if(value=="2"){
		/*document.getElementById("result-0-jobStartHour").value = "";
		document.getElementById("result-0-jobStartMin").value = "";
		document.getElementById("result-0-jobEndHour").value = "";
		document.getElementById("result-0-jobEndMin").value = "";
		document.getElementById("result-0-jobIntervalHour").value = "";
		document.getElementById("result-0-jobIntervalMin").value = "";*/
	}else{
		document.getElementById("result-0-jobStartHour").value = "";
		document.getElementById("result-0-jobStartMin").value = "";
		document.getElementById("result-0-jobEndHour").value = "";
		document.getElementById("result-0-jobEndMin").value = "";
		document.getElementById("result-0-jobIntervalHour").value = "";
		document.getElementById("result-0-jobIntervalMin").value = "";
	}
}
/***************************修改站点 结束*********************************/

/***************************修改栏目 开始********************************/
//修改栏目
modifycolumn=function(columnId){
	btnUnDisabled();
	var siteId = document.getElementById("siteId").value;
	document.getElementById("templatelink_nodeId").value = columnId;
    var info = new EiInfo();
    info.set("columnId",columnId);
    info.set("siteId",siteId);
	EiCommunicator.send( "EC04", "queryColumnInfo" , info, ajax_callback_openmodifycolumn );
}

 ajax_callback_openmodifycolumn = {
	onSuccess :
   		function(eiInfo)
		{
			if(eiInfo.getStatus()==-1){
				alert(eiInfo.getMsg());
				return ;
			}
			efform.fillDiv("ef_region_insertcolumn",eiInfo);
			
			var nodeId = eiInfo.get("columnId");
			var parentId = eiInfo.get("d-0-parentId");
			var siteId = eiInfo.get("d-0-siteId");
			//绑定父级栏目
			if(siteId==parentId){
				ef.get("d-0-parentName").value = '无';
			}else{
				ef.get("d-0-parentName").value = eiInfo.get("d-0-parentName");
		    }

    		/************************************将栏目首页模板值绑定到页面上**********************************/
    		/*
			if(nodeId==parentId){
				ef.get("d-0-firsetLevelColumn").value = "true";
				ef.get("templatelink_nodeId").value = nodeId;  //选择模版时所需要的SiteId
			}else{	
				ef.get("d-0-firsetLevelColumn").value = "false";
				ef.get("templatelink_nodeId").value = nodeId;  //选择模版时所需要的ColumnId
			}*/
			//alert("nodeId:"+nodeId);
			clear();//清空模板内容
		    
		    for(var i=0;i<2;i++){
				var info = new EiInfo(); 
				info.set("objId",nodeId); //节点编号
				var nodeType=1;   //by lch：nodeType为1，表示当前进行关联操作的节点类型是栏目
				var templateTypeId;
				for(var i=0;i<2;i++){
					if(i%2=='0'){
						templateTypeId = 1; //0:站点首页模板1:栏目首页模板2:栏目列表模板3:文章显示模板
						//nodeType = 1; //0:站点 1：栏目 2：文章
						info.set("templateTypeId",templateTypeId);//模板类型标识
						info.set("objType",nodeType); //节点类型
					}else{
						templateTypeId = 3;
						//nodeType = 2; 
						info.set("templateTypeId",templateTypeId);
						info.set("objType",nodeType);
					}
					EiCommunicator.send( "ECTM03", "getTemplateFileName" , info, null );
					
					if(ajaxEi!=null){
						templateInsId = ajaxEi.get("templateInsId");
						templateInsName = ajaxEi.get("templateInsName");
						if(i%2=='0'){
							//绑定栏目模版实例名称
							document.getElementById("templateInsId1").value = templateInsId;//预览时需要的模板实例ID 
							document.getElementById("ColumnTemplatePreview").value = templateInsName;
							document.getElementById("templateInsName1").value = templateInsName;
						}else{
							//绑定栏文章模版实例名称
							document.getElementById("templateInsId3").value = templateInsId;//预览时需要的模板实例ID
							document.getElementById("ArticleTemplatePreview").value = templateInsName;
							document.getElementById("templateInsName3").value = templateInsName;
						}
					}	
				}
		    }
			/***************************************绑定模板结束**********************************/
			
			var jobType = eiInfo.get("d-0-jobType");
			if(jobType=="1"){
				ef.get("d-0-jobStartHour1").value = ef.get("d-0-jobStartHour").value;
				ef.get("d-0-jobStartMin1").value = ef.get("d-0-jobStartMin").value;
				ef.get("d-0-jobStartHour").value = "";
				ef.get("d-0-jobStartMin").value = "";
			}
			changeJobType1(jobType); //隐藏定时任务框
			setRadioValue("d-0-jobType",jobType);
			
			if(ef.get("d-0-columnCategory").value!='00'){
				document.getElementById("columnModel").style.display = "none";
				document.getElementById("articleModel").style.display = "none";
				document.getElementById("columnModel1").style.display = "none";
				document.getElementById("articleModel1").style.display = "none";
			}else{
				document.getElementById("columnModel").style.display = "";
				document.getElementById("articleModel").style.display = "";
				document.getElementById("columnModel1").style.display = "";
				document.getElementById("articleModel1").style.display = "";
			}
			
			efwindow.show(null,"insertcolumn","center");
			document.getElementById("isUpdate").value=true;
   		},
 	onFail:
   		function(eMsg)
		{
   			alert("获取站点信息失败，原因："+eMsg);
		}
}

function  clear(){
	document.getElementById("templateInsId1").value = "";
	document.getElementById("ColumnTemplatePreview").value = "";
	document.getElementById("templateInsId3").value = "";
	document.getElementById("ArticleTemplatePreview").value = "";
}
/*****************************站点编辑页面模板按钮设置***************************/
function btnSiteDisabled(){
	document.getElementById("SiteTemplate0").disabled="true";
	document.getElementById("undoSiteTemplate0").disabled="true";
	document.getElementById("previewSiteTemplate0").disabled="true";
	document.getElementById("SiteTemplateIns0").disabled="true";
	document.getElementById("previewSiteT0").disabled="true";
	
	document.getElementById("ColumnTemplate0").disabled="true";
	document.getElementById("undoColumnTemplate0").disabled="true";
	document.getElementById("previewColumnTemplate0").disabled="true";
	document.getElementById("ColumnTemplateIns0").disabled="true";
	document.getElementById("previewColumnT0").disabled="true";
	
	document.getElementById("ArticleTemplate0").disabled="true";
	document.getElementById("undoArticleTemplate0").disabled="true";
	document.getElementById("previewArticleTemplate0").disabled="true";
	document.getElementById("ArticleTemplateIns0").disabled="true";
	document.getElementById("previewArticleT0").disabled="true";
	
}

function btnSiteUnDisabled(){
	document.getElementById("SiteTemplate0").disabled="";
	document.getElementById("undoSiteTemplate0").disabled="";
	document.getElementById("previewSiteTemplate0").disabled="";
	document.getElementById("SiteTemplateIns0").disabled="";
	document.getElementById("previewSiteT0").disabled="";
	
	document.getElementById("ColumnTemplate0").disabled="";
	document.getElementById("undoColumnTemplate0").disabled="";
	document.getElementById("previewColumnTemplate0").disabled="";
	document.getElementById("ColumnTemplateIns0").disabled="";
	document.getElementById("previewColumnT0").disabled="";
	
	document.getElementById("ArticleTemplate0").disabled="";
	document.getElementById("undoArticleTemplate0").disabled="";
	document.getElementById("previewArticleTemplate0").disabled="";
	document.getElementById("ArticleTemplateIns0").disabled="";
	document.getElementById("previewArticleT0").disabled="";
}
/*****************************栏目编辑页面模板按钮设置***************************/
function btnDisabled(){
	document.getElementById("ColumnTemplate").disabled="true";
	document.getElementById("undoColumnTemplate").disabled="true";
	document.getElementById("previewColumnTemplate").disabled="true";
	document.getElementById("ColumnTemplateIns").disabled = "true";
	document.getElementById("previewColumnT").disabled = "true";
	
	document.getElementById("ArticleTemplate").disabled="true";
	document.getElementById("undoArticleTemplate").disabled="true";
	document.getElementById("previewArticleTemplate").disabled="true";
	document.getElementById("ArticleTemplateIns").disabled="true";
	document.getElementById("previewArticleT").disabled="true";
}

function btnUnDisabled(){
	document.getElementById("ColumnTemplate").disabled="";
	document.getElementById("undoColumnTemplate").disabled="";
	document.getElementById("previewColumnTemplate").disabled="";
	document.getElementById("ColumnTemplateIns").disabled = "";
	document.getElementById("previewColumnT").disabled = "";
	
	document.getElementById("ArticleTemplate").disabled="";
	document.getElementById("undoArticleTemplate").disabled="";
	document.getElementById("previewArticleTemplate").disabled="";
	document.getElementById("ArticleTemplateIns").disabled="";
	document.getElementById("previewArticleT").disabled="";
}

function setRadioValue(name,value) 
{ 
	l=document.getElementsByName(name) 
	for(i=0;i<l.length;i++) { 
		if(i==value) {
			l[i].checked = true;
		}else{
			l[i].checked = false;
		}
	} 
} 

//点击取消按钮
button_cancel2_onclick=function(){
  efwindow.hide();
}

updateCloumnValidate = function(){
	if(ef.get("result-0-columnName").value.trim()==""){
		alert("栏目名称不能为空!");
		return false;
	}
	
	if(ef.get("result-0-columnAlias").value.trim()==""){
		alert("栏目存放位置不能为空!");
		return false;
	}
	
	if(ef.get("result-0-columnSeq").value.trim()==""){
		alert("排序标识不能为空!");
		return false;
	}
	return true;
}
/***************************修改栏目 结束********************************/

/***************************新增栏目 开始********************************/
//新增栏目
insertcolumn=function(obj,tag){	
	if(tag=="site"){
		/****************************站点下新建栏目****************************/
		ef.get("inqu_status-0-parentId").value = obj;
    	var info = new EiInfo();
		info.setById("inqu_status-0-parentId");
		info.set("firsetLevelColumn","true");//站点下第一级新增栏目时选择栏目模版或文章模版情况
		EiCommunicator.send( "EC04", "getSiteInfo" , info, ajax_callback_openinsertcolumn );
	}else{
		/***************************栏目下新建子栏目***************************/
		ef.get("inqu_status-0-columnId").value = obj;
    	var info = new EiInfo();
		info.setById("inqu_status-0-columnId");
		info.set("firsetLevelColumn","false");//站点下第一级新增栏目时选择栏目模版或文章模版情况
		EiCommunicator.send( "EC04", "query1" , info, ajax_callback_openinsertcolumn );
	}
}

ajax_callback_openinsertcolumn = {
	onSuccess :
   		function(eiInfo)
		{
			efform.fillDiv("ef_region_insertcolumn",eiInfo);
			
			efwindow.show(null,"insertcolumn","center");

			btnDisabled();//模板按钮设为不可用
			clear();//清空模板选择区域
			
			var siteId = eiInfo.get("siteId");
			var parentId = eiInfo.get("parentId");
			
			document.getElementById("d-0-parentId").value = parentId;
			document.getElementById("d-0-siteName").value = eiInfo.get("siteName");
			document.getElementById("d-0-parentName").value = eiInfo.get("parentName");
			
			document.getElementById("inqu_status-0-siteId").value = siteId;
			document.getElementById("inqu_status-0-parentId").value = parentId;
			document.getElementById("inqu_status-0-parentType").value = eiInfo.get("parentType");
			
    		changeJobType1(0);
    		setRadioValue("d-0-jobType",0);
    		document.getElementById("isUpdate").value=false;
    		
    		/*站点下一级栏目模版选择逻辑处理
    		if(eiInfo.get("firsetLevelColumn")=="true"){
    			ef.get("d-0-firsetLevelColumn").value = "true";
    			ef.get("templatelink_nodeId").value =  eiInfo.get("siteId");
    		}else{
    			ef.get("d-0-firsetLevelColumn").value = "false";
    			ef.get("templatelink_nodeId").value =  eiInfo.get("parentId");
    		}*/
   		},
 	onFail:
   		function(eMsg)
		{
   			alert("获取站点信息失败，原因："+eMsg);
		}
}

//点击保存按钮
button_save3_onclick=function(){
	var bool = document.getElementById("isUpdate").value;
	
	if(checkColumnValue("d")==true){
		if(!confirm("是否保存当前数据？")){
			return false;
		}
		
		if(ef.get("d-0-columnCategory").value!='00'){
			//当栏目类型改成非普通栏目时删除相关联的模版
			var info = new EiInfo();
			info.set("objId",ef.get("templatelink_nodeId").value); //节点编号
			var nodeType; 
			var templateTypeId;
			
			for(var i=0;i<2;i++){
				if(i%2=='0'){
					templateTypeId = 1;
					nodeType = 1;
					info.set("templateTypeId",templateTypeId);//模板类型标识
					info.set("objType",nodeType); //节点类型
				}else{
					templateTypeId = 3;
					nodeType = 2;				
					info.set("templateTypeId",templateTypeId);//模板类型标识
					info.set("objType",nodeType); //节点类型
				}
				EiCommunicator.send( "ECTM05", "undoIns" , info, null );
			}
		}
		
    	var jobType = getRadioValue("d-0-jobType");
		changeTimeValue1(jobType);
		
		var info = new EiInfo();
		info.set("jobType", jobType);
		info.setByNode("ef_region_insertcolumn");
		
		if(bool == "false"){
			EiCommunicator.send( "ECCM01", "insert" , info, ajax_callback_saveinsertcolumn );
		}else{
			ef.get("inqu_status-0-siteId").value = document.getElementById("siteId").value;
			EiCommunicator.send( "ECCM01", "update" , info, ajax_callback_saveinsertcolumn );
		}
	}	
}

ajax_callback_saveinsertcolumn ={
	onSuccess :
   		function(eiInfo)
		{
			if(eiInfo.getStatus()==-1){
				alert(eiInfo.getMsg());
				return ;
			}
			alert("操作成功!");
			efwindow.hide(); //隐藏窗口
			
			document.getElementById("siteId").value = ef.get("inqu_status-0-siteId").value;
			var info = new EiInfo();
			EiCommunicator.send( "EC05", "initLoad" , info, ajax_bindOptions_callback );   //刷新页面
   		},
 		onFail:
   		function(eMsg)
		{
   			alert("保存失败，原因："+eMsg);
		}
};

/***************************验证新增栏目信息******************************/
checkColumnValue = function (obj){
	var block = obj;
	if(ef.get(block+"-0-columnName").value.trim()==""){
		alert("请输入栏目名称!");
		return false;
	};

	if(ef.get(block+"-0-columnSeq").value.trim()==""){
		alert("请输入栏目序号!");
		return false;
	};
	
	if(ef.get(block+"-0-columnAlias").value.trim()==""){
		alert("请输入存放位置!");
		return false;
	};
	return true;
}

function getRadioValue(name) 
{ 
	var l=document.getElementsByName(name) 
	for(i=0;i<l.length;i++) {
		if(l[i].checked) return i; 
	} 
} 

//保存前调整清理时间信息
changeTimeValue1=function(value){
	if(value=="1"){
		document.getElementById("d-0-jobStartHour").value = document.getElementById("d-0-jobStartHour1").value;
		document.getElementById("d-0-jobStartMin").value = document.getElementById("d-0-jobStartMin1").value;
		document.getElementById("d-0-jobEndHour").value = "";
		document.getElementById("d-0-jobEndMin").value = "";
		document.getElementById("d-0-jobIntervalHour").value = "";
		document.getElementById("d-0-jobIntervalMin").value = "";
	}else if(value=="2"){
		/*document.getElementById("d-0-jobStartHour").value = "";
		document.getElementById("d-0-jobStartMin").value = "";
		document.getElementById("d-0-jobEndHour").value = "";
		document.getElementById("d-0-jobEndMin").value = "";
		document.getElementById("d-0-jobIntervalHour").value = "";
		document.getElementById("d-0-jobIntervalMin").value = "";*/
	}else{
		document.getElementById("d-0-jobStartHour").value = "";
		document.getElementById("d-0-jobStartMin").value = "";
		document.getElementById("d-0-jobEndHour").value = "";
		document.getElementById("d-0-jobEndMin").value = "";
		document.getElementById("d-0-jobIntervalHour").value = "";
		document.getElementById("d-0-jobIntervalMin").value = "";
	}
}

//选择发布定时类型时显示对应时间
changeJobType=function(value){
	if(value=="1"){
		document.getElementById("jt1").style.display = "";
		document.getElementById("jt2").style.display = "none";
		document.getElementById("jt3").style.display = "none";
		document.getElementById("jt4").style.display = "none";
	}else if(value=="2"){
		document.getElementById("jt1").style.display = "none";
		document.getElementById("jt2").style.display = "";
		document.getElementById("jt3").style.display = "";
		document.getElementById("jt4").style.display = "";
	}else{
		document.getElementById("jt1").style.display = "none";
		document.getElementById("jt2").style.display = "none";
		document.getElementById("jt3").style.display = "none";
		document.getElementById("jt4").style.display = "none";
	}
}

changeJobType1=function(value){
	if(value=="1"){
		document.getElementById("jt11").style.display = "";
		document.getElementById("jt21").style.display = "none";
		document.getElementById("jt31").style.display = "none";
		document.getElementById("jt41").style.display = "none";
	}else if(value=="2"){
		document.getElementById("jt11").style.display = "none";
		document.getElementById("jt21").style.display = "";
		document.getElementById("jt31").style.display = "";
		document.getElementById("jt41").style.display = "";
	}else{
		document.getElementById("jt11").style.display = "none";
		document.getElementById("jt21").style.display = "none";
		document.getElementById("jt31").style.display = "none";
		document.getElementById("jt41").style.display = "none";
	}
}

//点击取消按钮
button_cancel3_onclick=function(){
  efwindow.hide();
}

//选择检索条件
selectConClick=function(){
	var retrievalConditionMode = document.getElementById("d-0-retrievalConditionMode").value;
	var columnId = document.getElementById("d-0-columnId").value;
	var context=ef.get("context").value;
	var url=context+"/DispatchAction.do?efFormEname=ECCM08&columnId="+columnId+"&retrievalType=1&retrievalConditionMode="+retrievalConditionMode;
	var data = showModalDialog(url, "","dialogHeight: 450px; dialogWidth: 600px; center: Yes; help: No; status: No; resizable:yes;edge unken");
	if(data){
		document.getElementById("d-0-retrievalConditionSql").value=data.retrievalConditionSql;
		document.getElementById("d-0-retrievalConditionMode").value=data.retrievalConditionMode;
	}
}

//选择排序方式
orderConClick=function(){
	var columnId = document.getElementById("d-0-columnId").value;
	var context=ef.get("context").value;
	var url=context+"/DispatchAction.do?efFormEname=ECCM0801&serviceName=ECCM08&methodName=query&columnId="+columnId+"&retrievalType=3";
	var data = showModalDialog(url, "","dialogHeight: 850px; dialogWidth: 1000px; center: Yes; help: No; status: No; resizable:yes;edge unken");
	if(data){
		var orderCondition = data.orderCondition;
		document.getElementById("d-0-orderCondition").value=orderCondition;
	}
}
/***************************设置模板按钮相关操作********************************/
function selectTemplate(preObjectId,templateTypeId)
{ 	 
     var nodeId = ef.get("templatelink_nodeId").value;

     /*
     if(ef.get("d-0-firsetLevelColumn").value=="true"){
     	var childWindow = efform.openNewForm('ECSM0101',"nodeId="+ nodeId + "&preObjectId=" + preObjectId + "&templateTypeId="+templateTypeId +"&nodeType=s" +"&objType=0"); //objType节点类型 0 站点 1 栏目 2 文章
     }else{
    	
    	 
		if(templateTypeId=='1'){
			var childWindow = efform.openNewForm('ECSM0101',"nodeId="+ nodeId + "&preObjectId=" + preObjectId + "&templateTypeId="+templateTypeId +"&nodeType=c" +"&objType=1"); //objType节点类型 0 站点 1 栏目 2 文章
		}
		if(templateTypeId=='3'){
			var childWindow = efform.openNewForm('ECSM0101',"nodeId="+ nodeId + "&preObjectId=" + preObjectId + "&templateTypeId="+templateTypeId +"&nodeType=c" +"&objType=2"); //objType节点类型 0 站点 1 栏目 2 文章
		}
	 }*/
     var childWindow = efform.openNewForm('ECSM0101',"nodeId="+ nodeId + "&preObjectId=" + preObjectId + "&templateTypeId="+templateTypeId +"&nodeType=c" +"&objType=1"); //objType节点类型 0 站点 1 栏目 2 文章
     childWindow.focus();  
}

//选择模板实例按钮相关操作:栏目模版
function selectTemplateIns(preObjectId,templateTypeId)
{
	var nodeId = ef.get("templatelink_nodeId").value;
 	var childWindow = efform.openNewForm('ECSM0102', "nodeId="+ nodeId + "&nodeType=c&preObjectId=" + preObjectId + "&templateTypeId="+templateTypeId +"&objType=1");
     childWindow.focus();
}

//新增模板实例按钮相关操作:站点模版
function selectTemplate0(preObjectId,templateTypeId)
{
	var nodeId = ef.get("templatelink_nodeId").value;
	/*
	if(templateTypeId=='0'){
		var childWindow = efform.openNewForm('ECSM0101',"nodeId="+ nodeId + "&preObjectId=" + preObjectId + "&templateTypeId="+templateTypeId +"&objType=0"); //objType节点类型 0 站点 1 栏目 2 文章
	}
	if(templateTypeId=='1'){
		var childWindow = efform.openNewForm('ECSM0101',"nodeId="+ nodeId + "&preObjectId=" + preObjectId + "&templateTypeId="+templateTypeId +"&objType=1"); //objType节点类型 0 站点 1 栏目 2 文章
	}
	if(templateTypeId=='3'){
		var childWindow = efform.openNewForm('ECSM0101',"nodeId="+ nodeId + "&preObjectId=" + preObjectId + "&templateTypeId="+templateTypeId +"&objType=2"); //objType节点类型 0 站点 1 栏目 2 文章
	}*/
	var childWindow = efform.openNewForm('ECSM0101',"nodeId="+ nodeId + "&nodeType=s&preObjectId=" + preObjectId + "&templateTypeId="+templateTypeId +"&objType=0"); //objType节点类型 0 站点 1 栏目 2 文章
     childWindow.focus();  
}

//选择模板实例按钮相关操作:站点模版
function selectTemplateIns0(preObjectId,templateTypeId)
{
	var nodeId = ef.get("templatelink_nodeId").value;
 	var childWindow = efform.openNewForm('ECSM0102', "nodeId="+ nodeId + "&nodeType=s&preObjectId=" + preObjectId + "&templateTypeId="+templateTypeId +"&objType=0");
     childWindow.focus();
}

/*
  撤销栏目列表模板实例
  textobj : 实例文本框对象名称
  templateTypeId：模板类型
  nodeType：节点类型
*/
function onUndoClick(textobj,templateTypeId,nodeType)
{	
	if(ef.get("templateInsName"+templateTypeId).value==""){
		alert("没有可供撤销的模板实例！");
		return false;
	}
	if(confirm("是否确认撤销？")){
		var info = new EiInfo();
		
		//节点编号
		info.set("objId",ef.get("templatelink_nodeId").value); 
		//节点类型
		info.set("objType",nodeType); 
		//模板类型标识
		info.set("templateTypeId",templateTypeId);
		
		EiCommunicator.send( "ECTM05", "undoIns" , info, null );
		
		if(ajaxEi!=null){
			var returnValSeq = templateTypeId*1+1; //返回值序号
		    ef.get("templateInsId"+templateTypeId).value=check(ajaxEi.get("templateInsId"+returnValSeq));
		    ef.get("templateInsName"+templateTypeId).value=check(ajaxEi.get("templateInsId"+returnValSeq));
		    ef.get(textobj).value = check(ajaxEi.get("templateInsId"+returnValSeq));
		}
	}
}

function onUndoClick0(textobj,templateTypeId,nodeType)
{	
	if(ef.get("templateInsName0"+templateTypeId).value==""){
		alert("没有可供撤销的模板实例！");
		return false;
	}

	if(confirm("是否确认撤销？")){
		var info = new EiInfo();
		
		//节点编号
		info.set("objId",ef.get("templatelink_nodeId").value); 
		//节点类型
		info.set("objType",nodeType); 
		//模板类型标识
		info.set("templateTypeId",templateTypeId);
		
		EiCommunicator.send( "ECTM05", "undoIns" , info, null );
		
		if(ajaxEi!=null){
			
			var returnValSeq = templateTypeId*1+1; //返回值序号
		    ef.get("templateInsId0"+templateTypeId).value=check(ajaxEi.get("templateInsId"+returnValSeq));
		    ef.get("templateInsName0"+templateTypeId).value=check(ajaxEi.get("templateInsId"+returnValSeq));
		    ef.get(textobj).value = check(ajaxEi.get("templateInsId0"+returnValSeq));
		}
	}
}

function check(value){
	return typeof(value)=="undefined"?"":value;
}

previewTemplate = function (type,objType){
	//alert(document.getElementById("templateInsId"+type).value);
	//alert(document.getElementById("templateInsName"+type).value);
	
	var templateFilename = '';
	//当前模板实例编号
	var insId = document.getElementById("templateInsId"+type).value;//document.getElementById("result4-0-templateInsId").value;

	if(insId == null || insId.trim() ==""){
		alert("没有可供设置的模版实例!");
		return ;
	}
	
	var info = new EiInfo();
	info.set("templateInsId",insId);
	
	var objId = ef.get("templatelink_nodeId").value;//ef.get("inqu_status-0-objId").value;
	
	var objType = objType;//ef.get("inqu_status-0-objType").value;
	
	var nodeType="c";
	
	var filepath = "EC/File/module/";
	
	EiCommunicator.send( "ECTM03", "getTemplateFileNameByInsId" , info, null );
	
	if(ajaxEi!=null){
			templateFilename = ajaxEi.get("templateFilename");
			templateDefId = ajaxEi.get("templateDefId");
			templateTypeId = ajaxEi.get("templateTypeId");
			open_template_window(filepath,templateTypeId,templateFilename,templateDefId,insId,objId,nodeType,type+1,"&mode=edit_1_plus_1");
		}
}

previewTemplate0 = function (type,objType){
	//alert(document.getElementById("templateInsId"+type).value);
	//alert(document.getElementById("templateInsName"+type).value);
	
	var templateFilename = '';
	//当前模板实例编号
	var insId = document.getElementById("templateInsId0"+type).value;//document.getElementById("result4-0-templateInsId").value;

	if(insId == null || insId.trim() ==""){
		alert("没有可供设置的模版实例!");
		return ;
	}
	
	var info = new EiInfo();
	info.set("templateInsId",insId);
	
	var objId = ef.get("templatelink_nodeId").value;//ef.get("inqu_status-0-objId").value;
	
	var objType = objType;//ef.get("inqu_status-0-objType").value;
	
	var nodeType="s";
	
	var filepath = "EC/File/module/";
	
	EiCommunicator.send( "ECTM03", "getTemplateFileNameByInsId" , info, null );
	
	if(ajaxEi!=null){
			templateFilename = ajaxEi.get("templateFilename");
			templateDefId = ajaxEi.get("templateDefId");
			templateTypeId = ajaxEi.get("templateTypeId");
	
			open_template_window(filepath,templateTypeId,templateFilename,templateDefId,insId,objId,nodeType,type+1,"&mode=edit_1_plus_1");
		}
}

preview = function (type,objType,nodeType){
	//alert(document.getElementById("templateInsId"+type).value);
	//alert(document.getElementById("templateInsName"+type).value);
	
	var templateFilename = '';
	//当前模板实例编号
	var insId = "";
	if(nodeType == "s"){
		insId = document.getElementById("templateInsId0"+type).value;
	}else{
		insId = document.getElementById("templateInsId"+type).value;
	}
		
	if(insId == null || insId.trim() ==""){
		alert("没有可供设置的模版实例!");
		return false;
	}
	
	var info = new EiInfo();
	info.set("templateInsId",insId);
	
	var objId = ef.get("templatelink_nodeId").value;//ef.get("inqu_status-0-objId").value;
	var objType = objType;//ef.get("inqu_status-0-objType").value;
	
	//var nodeType="c";
	
	var filepath = "EC/File/module/";
	
	EiCommunicator.send( "ECTM03", "getTemplateFileNameByInsId" , info, null );
	
	if(ajaxEi!=null){
			templateFilename = ajaxEi.get("templateFilename");
			templateDefId = ajaxEi.get("templateDefId");
			templateTypeId = ajaxEi.get("templateTypeId");
			open_template_window(filepath,templateTypeId,templateFilename,templateDefId,insId,objId,nodeType,type+1,"");
	
		}
}

/*开窗通用方法*/
function open_template_window(filepath,templateTypeId,templateFilename,templateDefId,insId,objId,nodeType,area,param){
	var url=filepath + templateTypeId +"/" + templateFilename + "?tempDefId="+templateDefId+ param +"&tempInsId="+insId+"&nodeId="+objId+"&nodeType="+nodeType+"&area="+area+"&imagespath=/"+filepath + templateTypeId +"/images";
	var url1=filepath + templateTypeId +"/" + templateFilename + "&tempDefId="+templateDefId+ param +"&tempInsId="+insId+"&nodeId="+objId+"&nodeType="+nodeType+"&area="+area+"&imagespath=/"+filepath + templateTypeId +"/images";

	window.open( "DispatchAction.do?efFormEname=ECTM0501&url="+url1,"模板设置","top=0,left=0,menubar=no,width="+screen.width+",height="+screen.availHeight+",scrollbars=yes,resizable=yes");
}

function check(value){
	//alert(typeof(value)=="undefined");
	return typeof(value)=="undefined"?"":value;
}
/******************************设置模版结束***********************************/

efform_onPopupReturn = function(winId, returnValue)
{
  if(returnValue=="0"){
	if(winId=="ECAM02"){
		var articleTabId = getTabId(curPage,"article");
	  	if(articleTabId != null){
	  		document.mainFrame.frames[articleTabId].contentWindow.efform_onPopupReturn(winId, returnValue);
	  	}
	}else if(winId=="ECCM02"){
	  	nTree.reload(nTree._model);
	}
  }
}


//执行导入
button_imp_onclick=function(){
	var importFile = document.getElementById('importFile').value;
	var suffix = importFile.substring(importFile.length-3,importFile.length);
	var extName = suffix.toLowerCase();
	if(extName!='.js'&& extName!='zip' && extName!= 'css'&& extName!= 'jpg'&& extName!= 'bmp'&& extName!= 'png' && extName!= 'gif'){
		alert('只能上传图片、css样式表、JS 或ZIP文件');
		return false;
	}else{
		//调用导出进度标志
		ec05_modalWin.showProgressBar();
		ec05_isShow = true;
		var nodeId = ef.get("nodeId").value;
		var nodeType = ef.get("nodeType").value;
		
	    ef.get("EC05").action = "./EC/EC0501.jsp?nodeId="+nodeId+"&nodeType="+nodeType;
		ef.get("EC05").target = "importFrame";
		document.form1.submit();
	}
}

uploadImagesCallBack = function(msg) {
    ec05_modalWin.hide();
	efwindow.hide();
	document.getElementById("importFrame").src="";
	document.form1.target = "_self";
	alert(msg);
	document.form1.reset();
}


//**********************************新增模板JS**********************************************************
//新增模板
function newTemplate(nodeId,nodeType){
	
	var opstatus = document.getElementById("opstatus").value;
	//操作状态改变，DIV重新初始化
	if(opstatus!="" && opstatus !="insert"){
		initDivData();
	}
	document.getElementById("template_nodeId").value = nodeId;
	document.getElementById("template_nodeType").value = nodeType;
	document.getElementById("opstatus").value = "insert";
	addoptions(nodeType);
	document.getElementById("templateTypeId").disabled = false;
	document.getElementsByName("mode")[0].checked = true;
	editModeSelect();
	removeFileObj();
	var file1 = document.getElementById("file1");
	var fileObj=document.createElement('input');
	fileObj.type = "file";
	fileObj.name = "model_file";
	fileObj.id = "model_file";
	fileObj.contentEditable = false;
	if(!file1.hasChildNodes()){
		file1.appendChild(fileObj);
	}
	efwindow.show(null,"templateupload","center");
}
//清除DIV数据
function initDivData(){
	document.getElementById("templateDefName").value = "";
	document.getElementById("opstatus").value = "";
	document.getElementById("templateDefId").value = "";
	document.getElementById("templateFileName").value = "";
	document.getElementById("templateContent").value = "";
	document.getElementById("suffix").value = "";
	//clearFileInput(document.getElementById("model_file"));
	document.getElementsByName("mode")[0].checked = true;
	addoptions(document.getElementById("template_nodeType").value);
	document.getElementById("templateTypeId").disabled = true;
}
//模板新增下拉选项
function addoptions(nodeType){
	cleanoptions();
	var obj = document.getElementById("templateTypeId");
	var item = null;
	if(nodeType!="" && nodeType == "s"){
		item = new Option("站点首页模板",0); 
		obj.options.add(item); 
	}
	if(nodeType!="" && nodeType != "a" ){
		item = new Option("栏目首页模板",1);   
		obj.options.add(item); 
	}
	item = new Option("文章显示模板",3);    
	obj.options.add(item);  
}

function cleanoptions(){
	var obj = document.getElementById("templateTypeId");
	for(var i=obj.length-1;i>=0;i--){
		obj.options.remove(i);
	}
}

function editModeSelect(){
	var opmode = getRadioVal("mode");
	var onlineEditRegion = document.getElementById("ef_region_onlineedit");
	var uploadRegion = document.getElementById("ef_region_upload");
	if(opmode =="1"){
		uploadRegion.style.display = "block";
		onlineEditRegion.style.display = "none";
	}else{
		onlineEditRegion.style.display = "block";
		uploadRegion.style.display = "none";
	}
}
function getRadioVal(radioName){
	var opmode = null;
	var objmode = document.getElementsByName(radioName);
	for(var i=0;i<objmode.length;i++){
		if(objmode[i].checked){
			opmode = objmode[i].value;
			break;
		}
	} 
	return opmode;
}
button_confirm_onclick = function(){
	var opstatus = document.getElementById("opstatus").value;
	var opmode = getRadioVal("mode");
	if(opmode == "0"){
		onlineEdit_Insert();
	}else if(opmode == "1"){
		uploadTemplate();
	}
	
}
//模板上传
function uploadTemplate()
{
	var model_file = document.getElementById('model_file').value;
	var exp1 = model_file.substring(model_file.length-3,model_file.length);
	var nodeId = ef.get("template_nodeId").value;
	var nodeType = ef.get("template_nodeType").value;
	var templateTypeId =document.getElementById("templateTypeId").value;
	var templateDefName = document.getElementById("templateDefName").value;
	if(nodeId==null || nodeId == "" ){
		alert("节点ID获取失败！");
		return false;
	}
	if(nodeType==null || nodeType == "" ){
		alert("节点类型获取失败！");
		return false;
	}
	
	if(exp1.toLowerCase()!='jsp'){
		alert('请上传jsp文件！');
		return false;
	}
	if(templateDefName==""){
		alert('请输入模板定义名称！');
		return false;
	}
	var info = new EiInfo();
	//info.set("fileName",model_file.substring(0,model_file.length-4));
	info.set("fileName",templateDefName);
	EiCommunicator.send("ECTM01", "checkTemplateName", info, null);
	if(ajaxEi!=null){
		var flag = ajaxEi.get("flag");
		if(flag == "false"){
			alert("模板定义名称已存在，请修改文件名称！");
			return false;
		}
	}
	var templateDefId = ef.get("templateDefId").value;
	var templateFileName =ef.get("templateFileName").value ;
	var templateTypeId = templateTypeId;
	var suffix = ef.get("suffix").value;
	var actionUrl= "./EC/SM/ECSM0802.jsp"+"?templateTypeId="+templateTypeId+"&templateDefId="+templateDefId;
		
	actionUrl += "&templateDefName=" + encodeURI(templateDefName);
	actionUrl += "&templateFileName= " + templateFileName;
	actionUrl += "&suffix=" + suffix;
	actionUrl += "&nodeId=" + nodeId;
	actionUrl += "&nodeType=" + nodeType;
		
	ef.get("EC05").action = actionUrl;
		
	//var childWindow = efform.openNewForm('ECSM0801', "&nodeId="+ nodeId + "&nodeType="+nodeType + "&opstatus=insert");
	ef.get("EC05").target = "uploadFrame1";
	document.form1.submit();
	
}

//模板以在线编辑方式新增
function onlineEdit_Insert(){
	var nodeId = ef.get("template_nodeId").value;
	var nodeType = document.getElementById("template_nodeType").value;
	var suffix = ef.get("suffix").value;
	var templateTypeId = document.getElementById("templateTypeId").value;
	var templateDefName = document.getElementById("templateDefName").value;
	
   if(templateDefName==null || templateDefName==""){
	   alert("请输入模版名称");
   	   return false;
   }
   var info1 = new EiInfo();
   info1.set("fileName",templateDefName);
   EiCommunicator.send("ECTM01", "checkTemplateName", info1, null);
   if(ajaxEi!=null){
	   var flag = ajaxEi.get("flag");
	   if(flag == "false"){
		   alert("模板定义名称已存在，请修改模板名称！");
		   return false;
	   }
	}
   var info=new EiInfo();
   info.set("defName",templateDefName);
   info.set("templateTypeId",templateTypeId);
   info.set("nodeId",nodeId);
   info.set("nodeType",nodeType);
   info.set("suffix",suffix);
   info.set("templateContent",document.getElementById("templateContent").value);
   EiCommunicator.send("ECTM0105", "InsertTemplate", info, ajax_onDoTemplate_finish);
}

//模板新增、编辑结束回调 
ajax_onDoTemplate_finish = {
	      onSuccess : function(eiInfo){
	    	  if(eiInfo.getStatus() == "0"){
	    		  alert("操作成功!");
	    		  initDivData();
	    		  var templateTabId = getTabId(curPage,"template");
	    		  if(templateTabId != null){
	    		  	document.mainFrame.frames[templateTabId].contentWindow.efgrid.submitInqu("ef_grid_result", "ec","ECSM08","query");;
	    		  }
	    		  efwindow.hide();
	    	  }else{
	    		  alert(eiInfo.getMsg());
	    	  }
	      },
	      onFail: function(eMsg){
	      	alert("failure");
	      }
}

//模板上传结束回调
function uploadcallBack(msg,status) {
	document.getElementById("uploadFrame1").src="";
	document.form1.target = "_self";
	alert(msg);
	if(status=='0'){
		initDivData();
		var templateTabId = getTabId(curPage,"template");
		if(templateTabId != null){
		  	document.mainFrame.frames[templateTabId].contentWindow.efgrid.submitInqu("ef_grid_result", "ec","ECSM08","query");;
		}
		efwindow.hide();
	}
}

button_cancel_onclick = function(){
	initDivData();
	efwindow.hide();
}
//模板校验回调
function uploadcallBack2(msg) {
	document.getElementById("uploadFrame1").src="";
	document.form1.target = "_self";
	alert(msg.replaceAll("<br>","\n",true));
}

//移除页面FILE控件，待相应DIV显示的时候再动态添加，以免冲突
function removeFileObj(){
	var f = document.getElementById("file1");      
	var childs = f.childNodes;    
	for(var i = childs.length - 1; i >= 0; i--) {      
	    //alert(childs[i].nodeName);      
	    f.removeChild(childs[i]);      
	}   
	 f = document.getElementById("file2");      
	 childs = f.childNodes;    
	 for(var i = childs.length - 1; i >= 0; i--) {      
	    //alert(childs[i].nodeName);      
	    f.removeChild(childs[i]);      
	}   
}
//模板校验-在线编辑
function onlineEdit_valid(){
	var info=new EiInfo();
	var templateTypeId = document.getElementById("templateTypeId").value;
	var templateDefName = document.getElementById("templateDefName").value;
	
    if(templateDefName==null || templateDefName==""){
    	alert("请填写模版定义名称");
    	return;
    }
	info.set("defName",templateDefName);
	info.set("templateTypeId",templateTypeId);
	
	info.set("templateContent",document.getElementById("templateContent").value);
	EiCommunicator.send("ECTM01", "onLineEditValid", info, null);
	if(ajaxEi!=null){
		var msg = ajaxEi.get("validMsg");
		alert(msg.replaceAll("<br>","\n",true));
	}
}
//模板校验-上传
function uploadTemplate_valid()
{
	var model_file = document.getElementById('model_file').value;
	var exp1 = model_file.substring(model_file.length-3,model_file.length);
	var templateTypeId =document.getElementById("templateTypeId").value;
	if(exp1.toLowerCase()!='jsp'){
		alert('请上传jsp文件！');
		return false;
	}else{
		var templateDefId = ef.get("templateDefId").value;
		var templateTypeId = templateTypeId;
		var actionUrl= "./EC/SM/ECSM0802.jsp"+"?templateTypeId="+templateTypeId+"&templateDefId="+templateDefId;
		actionUrl += "&isCheck=true";
		
		ef.get("EC05").action = actionUrl;
		ef.get("EC05").target = "uploadFrame1";
		document.form1.submit();
	}
}

button_valid_onclick=function()
{
	var opstatus = document.getElementById("opstatus").value;
	var opmode = getRadioVal("mode");
	
	if(opmode == "0"){
		onlineEdit_valid();
	}else if(opmode == "1"){
		uploadTemplate_valid();
	}	
}

String.prototype.replaceAll = function(reallyDo, replaceWith, ignoreCase) {    
	if (!RegExp.prototype.isPrototypeOf(reallyDo)) {    
	      return this.replace(new RegExp(reallyDo, (ignoreCase ? "gi": "g")), replaceWith);    
	} else {    
	      return this.replace(reallyDo, replaceWith);    
	}    
}

function openFormById(eventTag){
    var event = eventTag||window.event;
    if(event.keyCode==13) {
      var formEname = ef.get("formEname").value.toUpperCase();
      if (formEname != null) {
        activeForm(formEname);
      }	  
    }         
}

function openFormOnClick(){
	var formEname = ef.get("formEname").value.toUpperCase();
	if (formEname != null) {
	  activeForm(formEname);
	}	
}

function newForm( label ) {
	   start_time = new Date().getTime();
	   winMap[winCount ++] = efform.openNewForm( label );
	}



	function openForm( label ) {
	  window.mainFrame.location = "DispatchAction.do?efFormEname=" + label;      
	}  
	 

	function activeFormByNode(node){  
	  if ( node.leaf() ) {
	    activeForm(node.label());
	  }
	} 

	function activeForm(label){  
	//debugger;
		//if((useNode!=null && useNode ==false)&&(label=="EVCM05" || label=="EVCM0508" || label=="EV04")){
		//alert("该模式下不能进行此操作!");
		//return;
		//}
	    if (__newForm == true) {
	      newForm(label);
	    } else {
	      openForm(label);
	    }
	} 
	
	function load_es_init_user () 
	{
		var ajax_callback = 
		{
			onSuccess : 
	    		function(eiInfo)
				{
					if (eiInfo.status == 0) {
					  ef.get("userInfo").style.textDecoration  = "underline ";
					  ef.get("userInfo").title  = "该用户目前从属于" + eiInfo.get("unitPostCount") + "个角色";
					}

	    		},
	  		onFail: 
	    		function(eMsg) 
				{
	    			
				}
		}; 	
		var eiInfo = new EiInfo();	

		EiCommunicator.send( "ESInitUser", "init" , eiInfo, ajax_callback, false, true );
	}



//在首页打开页面时不触发刷新操作 
function activeFormNotRefresh(label)
{
	 triggerUnload	= false;
	 activeForm(label);
}


function showCopyOptionDiv(nodeId,nodeType){
	ef.get("copyOption_nodeId").value= nodeId;
	ef.get("copyOption_nodeType").value= nodeType;
	efwindow.show(null,"copyoption","center");
}
button_confirmcopy_onclick=function(){
	var nodeId = ef.get("copyOption_nodeId").value;
	var nodeType = ef.get("copyOption_nodeType").value;
	var copyType = "";
	var copyTypeObj = document.getElementsByName("copyType");
	for(var i=0;i<copyTypeObj.length;i++){
		if(copyTypeObj[i].checked == true){
			copyType = copyTypeObj[i].value;
			break;
		}
	}
	if(copyType==""){
		alert("请选择复制类型!");
		return false;
	}
	var info = new EiInfo();
	info.set("nodeId",nodeId);
	info.set("nodeType",nodeType);
	info.set("copyType",copyType);
	EiCommunicator.send( "ECSM01", "copy" , info, null);
	if(ajaxEi!=null){
		if(ajaxEi.getStatus()==0){
			alert("操作成功!");
			if(nodeType=="c"){
				onSiteListChange();
			}else{
				document.getElementById("siteId").value = nodeId;
				//下拉框重新加载
				var info = new EiInfo();
				EiCommunicator.send( "EC05", "initLoad" , info, ajax_bindOptions_callback ); 
			}
			efwindow.hide();
		}else{
			alert(ajaxEi.getMsg());
		}
	}
}
button_cancelcopy_onclick=function(){
	efwindow.hide();
}

function releaseOptionChange(value){
	//alert(value);
	isAnonyChange(value)
	
}
function isAnonyChange(value){
	var obj = document.getElementById("result-0-isAnony");
	if(value == "1"){
		obj.disabled= true;
		for(var i=0;i<obj.options.length;i++){
			if(obj.options[i].value = value){
				obj.options[i].selected = true;
				break;
			}
		}
	}else{
		obj.disabled= false;
	}
}