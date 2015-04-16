/**
 * Generate time : 2012-05-17 15:18:11
 */
var handleClick = true;		//是否响应首页单击记录的事件
var tabIndexOnClick = -1;	//单击记录时，切换到的Tab页(0是第一个页面, <0表示不切换)
var handleDblClick = true;	//是否响应首页双击记录的事件
var tabIndexOnDblClick = "";	//双击记录时，切换到的Tab页(0是第一个页面, <0表示不切换)
var checkTabSwitch = true;	//未选中记录时，是否允许切换Tab页

var selected = null;		//保存单击或者双击选中的记录

var tabNameMapIndex = {"ECCM01":0,
										"ECSM02":1,
										"ECAM06":2,
										"ECSM08":3,
										"ECSM06":4,
										"ECAM05":5,
										//"ECPM03":6,
										"ECAM09":6};

/**
 * 页面加载后的回调
 */
efform_onload = function()
{

    var info = _getEi();
    var pages = info.get("pages");
    if(pages !=null&&pages !=""){
    	pages = pages.split("|");
    	for(var i = 0 ; i <pages.length ; i++)
	    {
		    eftab_hidden("ef_tab_y",tabNameMapIndex[pages[i]]);    	
	    }
    }

	//loadTabPage(parent.pageIndex);
	//子页面切换后，Tab页加载逻辑预处理
	if(parent.curPage != "EC03"){
		var tabName = parent.getTabName();
		if(tabName != null){
			var tabId = parent.getTabId("EC03",tabName);
			parent.pageIndex = tabId;
		}else{
			//alert("上一子页面未定义tab页加载映射，tab页加载逻辑无法使用记忆加载（参考EC05页面ec03_tablist定义）");
		}
	}
	if(frames[parent.pageIndex]!=undefined){
		efRoundIframechange_option("ef_tab_y",parent.pageIndex,onTabChange);
	}else{
		efRoundIframechange_option("ef_tab_y",0,onTabChange);
	}
	
}


 

//站点预览
button_preview_onclick=function(){
	var siteId = ef.get("inqu_status-0-siteId").value;
	var info = new EiInfo();
	info.set("siteId",siteId);
	EiCommunicator.send( "ECSM01", "viewSite" , info, null ); 
	var url=ajaxEi.get("url");
	window.open(url);
}

//增量发布
button_addpub_onclick=function(){
	if(!confirm("确定要发布吗?"))
	{
		return false;
	}
	
	var siteId = ef.get("inqu_status-0-siteId").value;
	var info = new EiInfo();
	info.set("siteId",siteId);
	info.set("isIncre","true");
	EiCommunicator.send( "ECSM01", "releaseSite" , info, null );
	if(ajaxEi!=null){
		var msg=ajaxEi.getMsg();
		alert(msg);   
	}
}

//完全发布
button_publish_onclick=function(){
	if(!confirm("确定要发布吗?"))
	{
		return false;
	}
	
	var siteId = ef.get("inqu_status-0-siteId").value;
	var info = new EiInfo();
	info.set("siteId",siteId);
	EiCommunicator.send( "ECSM01", "releaseSite" , info, null );
	if(ajaxEi!=null){
		var msg=ajaxEi.getMsg();
		alert(msg);  
	}
}

//发布首页
button_homepagepub_onclick=function(){
	if(!confirm("确定要发布吗?"))
	{
		return false;
	}
	var siteId = ef.get("inqu_status-0-siteId").value;
	var info = new EiInfo();
	info.set("siteId",siteId);
	info.set("isMainOnly","true");
	EiCommunicator.send( "ECSM01", "releaseSite" , info, null );
	if(ajaxEi!=null){
		var msg=ajaxEi.getMsg();
		alert(msg);
	}  
}

//修改站点
button_modify_onclick=function(){
	var siteId = ef.get("inqu_status-0-siteId").value;
    parent.modifysite(siteId);
}



/**
 * 当Tab中的页面加载之后的回调
 */
onTabPageLoad = function(wnd, index) {

efRoundIframechange_option("ef_tab_y", parent.pageIndex, null);
	/** 处理第1个页面的多记录点击事件
	if (index == 0 && handleClick) {
		_onRowClicked = wnd.efgrid_onRowClicked;
		wnd.efgrid_onRowClicked = function(grid_id, row_index){
			if (typeof _onRowClicked === "function") {
				_onRowClicked(grid_id, row_index);
			}
			var grid = wnd.efgrid.getGridObject(grid_id);
			selectRow(wnd, grid, row_index);

			if (tabIndexOnClick >= 0) {
				efRoundIframechange_option("ef_tab_y", tabIndexOnClick, onTabChange);
			}
		}
	}
    */
	/** 处理第1个页面的多记录双击事件
	if (index == 0 && handleDblClick && typeof wnd.efgrid_onRowDblClicked === "function") {
		_onRowDblClicked = wnd.efgrid_onRowDblClicked;
		wnd.efgrid_onRowDblClicked = function(grid_id, row_index){
			if (typeof _onRowDblClicked === "function") {
				_onRowDblClicked(grid_id, row_index);
			}
			var grid = wnd.efgrid.getGridObject(grid_id);
			selectRow(wnd, grid, row_index);
			
			if (tabIndexOnDblClick >= 0) {
				efRoundIframechange_option("ef_tab_y", tabIndexOnDblClick, onTabChange);
			}
		}
	}
	*/
}

/**
 * Tab切换的回调
 */
onTabChange = function(currentIndex, index) {
	loadTabPage(index);
	parent.pageIndex = index;
	parent.curPage = "EC03";
}

/**
 *  加载Tab中的子页面
 */
loadTabPage = function(index) {

	var frame = frames[index];
	var _path = composePath(frame, path[index], index);
	if ($(frame).attr("__src") != _path) {

		$(frame).attr("__src", _path);
		frame.src = _path;

		efform.setStatus(0, "正在加载...");
	}
}

/**
 * 当首页单击、或者双击多记录表格的一行时，记录选择的行
 */
selectRow = function(wnd, grid, row_index) {
	selected = grid.getRowData(row_index);
}

/**
 * 拼接Tab页面的路径，一般需要加上页面查询的参数
 * frame: 当前加载页面的iframe
 * path: 配置的路径前缀(页面号)
 * index: Tab页的索引号，从0开始
 */
composePath = function(frame, path, index) {

	return path + "&nodeId="+ef.get("inqu_status-0-siteId").value+"&nodeType=s";
}

