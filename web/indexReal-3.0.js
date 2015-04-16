var mainTreeObject = 0; 
//首页界面的标识
var RootWndID = "root";

//是否触发indexReal.jsp页面中的注销操作
var triggerUnload = true;

//以下代码处理提交FORM时遇到SESSION过期的情况
var lastActivity = new Date().getTime();

//鼠标单击SPLITTER是否显示左侧树
var showLeftTree= true;

window.onunload = function() {
    for(var propName in winMap) {
        try {                
            winMap[propName].close(); 
        }catch(e) {
            //alert(e.message);
        }           
    }
}

var MenuModel =  new eiTreeModel('EDPI12');

/* 是否打开新窗口 */
var __newForm = false;
function changFormOpenMethod()
{

	if(__newForm == true)
	{
		__newForm = false;
		ef.get("formOpenMethod").src = efico.get("efpage.popUpWinInact");
	}
	else
	{
		__newForm = true;
		ef.get("formOpenMethod").src = efico.get("efpage.popUpWindow");
	}
}

function changeOnMouseOver()
{
	if(__newForm == true)
	{
		ef.get("formOpenMethod").src = efico.get("efpage.popUpWindowOn");
	}
	else
	{
		ef.get("formOpenMethod").src = efico.get("efpage.popUpWinInactOn");	
	}
}

function changeOnMouseOut()
{
	if(__newForm == true)
	{
		ef.get("formOpenMethod").src = efico.get("efpage.popUpWindow");
	}
	else
	{
		ef.get("formOpenMethod").src = efico.get("efpage.popUpWinInact");
	}
}

var menuStatus = "inline";
function toggleMenu()
{
	if(menuStatus == "inline")
	{
		menuStatus = "none";
		ef.get("frameHeadLine").style.display = "none";
		ef.get("toggleMenuImg").src = efico.get("efform.efframeMenuDown");
	}
	else
	{
		menuStatus = "inline";  
		ef.get("frameHeadLine").style.display = "inline";
		ef.get("toggleMenuImg").src = efico.get("efform.efframeMenuUp");
	}
}

function openFormById(eventTag){
    var event = eventTag||window.event;
    if(event.keyCode==13) {
      var formEname = ef.get("formEname").value.toUpperCase();
  	  formEname = $.trim(formEname);
      if (isAvailable(formEname)) {
        activeForm(formEname);
      }	  
    }         
}

var start_time;

function newForm(label) {
   start_time = new Date().getTime();
   efform.openNewForm(label);
}

function openForm(label) {
  parent.document.mainFrame.location = "DispatchAction.do?efFormEname=" + label;      
}  
 
//因为通过EFTree的打开新的链接的时候会触发window.beforeUnload，所以需要特殊处理一下
function activeFormByNode(node){  
  triggerUnload	= false;
  if ( node.leaf() ) {
    activeForm(node.label());
  }
} 

function activeFormByMenu(node){  
	  if ( node.leaf() ) {
	    activeForm(node.label());
	  }
} 

function activeForm(label){  
    if (__newForm == true) {
      newForm(label);
    } else {
      openForm(label);
    }
} 

//在首页打开页面时不触发刷新操作 
function activeFormNotRefresh(label)
{
	 triggerUnload = false;
	 newForm(label);
}

function configMenu(menu){
  menu.depth(8);
  menu.textClicked = activeFormByMenu;
  menu.hoverExpand = function(n){ return true; }	// { if ( n.depth()==1 ) return false; else return true; }
}

function configTree(tree){
  tree.depth(8);
  tree.emptyNodeAsLeaf = true;
  tree.activeEmptyJudger = false;
  tree.nodeInitializer = treeNodeInitializer;
  mainTreeObject = tree;
  tree.initialExpandDepth = 2;
}

function treeNodeInitializer(node) {
  node.textClicked = function(){ activeFormByNode( node ); };
}

//初始化状态提示
function _initFormStatusDiv() {

	if ($('#' + 'efFormStatus').attr("_init") === true) return;
		
	// 状态行提示图标
	$('#' + '_eiStatusImg').click(function(event) {
		ef.toggleDivDisplay('efFormDetailDiv');
		return false;
	});

	// 关闭状态行图标
	$('#' + '_closeStatus').click(function(event) {
		$('#efFormStatus').dialog('close');
		return false;
	});

	// 固定状态行图标
	$('#' + '_stickStatus').attr("stickStatus", "w").click(function() {
		if ($('#' + '_stickStatus').attr("stickStatus") == "w") {
			$('#' + '_stickStatus').addClass('ui-icon-pin-s').removeClass("ui-icon-pin-w").attr("stickStatus", "s");
			clearTimeout($("#efFormStatus").attr("timeId"));
		} else {
			$('#' + '_stickStatus').addClass('ui-icon-pin-w').removeClass("ui-icon-pin-s").attr("stickStatus", "w");
		}
		return false;
	});

	$('#' + 'efFormStatus').attr("_init", true);
}

$(document).ready(function() {
	_initFormStatusDiv();
	
	var searchUrl = window.location.search;
	if (searchUrl.indexOf('monitor') != -1) {
		pageType = 'monitor';
		setPageType(pageType);
	}
	else if (searchUrl.indexOf('info') != -1)
	{
		pageType = 'info';
		setPageType(pageType);
	}
	else
	{
		setPageType('gis');
	}
	
	$('li.mainlevel').mousemove(function(){
		$(this).find('ul').slideDown("1000");
		});
		$('li.mainlevel').mouseleave(function(){
		$(this).find('ul').slideUp("fast");
	});
	
	if (username == "admin")
	{
		$('#menuAuthorization')[0].style.display = 'block';
		$('#menuSystemManagement')[0].style.display = 'block';
	}
});

//处理移动
efform_onload = function () { 	
	load_es_init_user();
}

function load_es_init_user()
{
	var ajax_callback = 
	{
		onSuccess : 
    		function(eiInfo)
			{
				if (eiInfo.status == 0) {
				  ef.get("userInfo").style.textDecoration  = "none ";
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

// 对应用例ID：99573
var keyCode = "";
document.onkeydown = function (e){   
	var e = e || window.event;
	//debugger;
	if(e){
		keyCode = e.keyCode;
	}
}   

window.onbeforeunload = function()
{  
	if ($.browser.msie)
	{
		if (!triggerUnload)
		{
			triggerUnload = true;
		}
	}
}

function efChangeProject() {
	EFColorbox({href:"DispatchAction.do?efFormEname=CM91", title:"切换项目", innerWidth:400, innerHeight:255, iframe:true, scrolling:true});
}

function modifyPassword() {
	EFColorbox({href:"DispatchAction.do?efFormEname=ES23", title:"修改密码", innerWidth:400, innerHeight:200, iframe:true, scrolling:true});
}

var pageType = 'info';
function setPageType(type) {
	if (type == 'info') {
		openForm('CM02');
	}
	else if (type == 'monitor') {
		parent.document.mainFrame.location = "ZTDisplay.jsp";
		$('#divProjectName').css("display", "block");
		$('#menuMonitor').css("display", "block");
		$('#menuCodeManagement').css("display", "block");
		$('#menuEnergyManagement').css("display", "block");
		$('#menuExpenseManagement').css("display", "block");
		$('#menuLogManagement').css("display", "block");
		$('#menuReportQuery').css("display", "block");
	}
	else if (type == "gis") {
		parent.document.mainFrame.location = "GIS.jsp";
		$('#divProjectName').css("display", "none");
		$('#menuMonitor').css("display", "none");
		$('#menuCodeManagement').css("display", "none");
		$('#menuEnergyManagement').css("display", "none");
		$('#menuExpenseManagement').css("display", "none");
		$('#menuLogManagement').css("display", "none");
		$('#menuReportQuery').css("display", "none");
	}
}

function setProjectName(projectName) {
	$('#divProjectName').html("当前项目: " + projectName);
}