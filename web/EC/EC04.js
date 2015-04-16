/**
 * Generate time : 2012-05-17 15:18:11
 */
var handleClick = true;		//是否响应首页单击记录的事件
var tabIndexOnClick = -1;	//单击记录时，切换到的Tab页(0是第一个页面, <0表示不切换)
var handleDblClick = true;	//是否响应首页双击记录的事件
var tabIndexOnDblClick = "";	//双击记录时，切换到的Tab页(0是第一个页面, <0表示不切换)
var checkTabSwitch = true;	//未选中记录时，是否允许切换Tab页

var selected = null;		//保存单击或者双击选中的记录

var columnCategory =  null; //栏目类型 普通、虚拟、头条、图片（非普通栏目，仅加载文章TAB页）
var tabNameMapIndex = {"ECAM01":0,
						"ECCM01":1,
						"ECAM06":2,
						"ECSM08":3,
						"ECCM06":4,
						"ECAM05":6,
						"ECPM03":7};
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
			if("ECCM06"==pages[i])
			{
				eftab_hidden("ef_tab_y",4);
				eftab_hidden("ef_tab_y",5);
			}else
		    eftab_hidden("ef_tab_y",tabNameMapIndex[pages[i]]);    	
	    }
    }
 	//alert(document.getElementById("inqu_status-0-columnCategory").value);
 	columnCategory = document.getElementById("inqu_status-0-columnCategory").value;
 	if(columnCategory!="00"&&columnCategory!="null"&&columnCategory!="01"){
 		eftab_hidden("ef_tab_y",1);
 		eftab_hidden("ef_tab_y",2);
 		eftab_hidden("ef_tab_y",3);
 		eftab_hidden("ef_tab_y",4);
 		eftab_hidden("ef_tab_y",5);
 		eftab_hidden("ef_tab_y",6);
 		efRoundIframechange_option("ef_tab_y",0,onTabChange);
 		parent.pageIndex = 0;     //撤销原Tab页记录联动，并记录为从第一TAB页开始加载
 	} else if(columnCategory=="01"){
 		eftab_hidden("ef_tab_y",0);
 		eftab_hidden("ef_tab_y",1);
 		eftab_hidden("ef_tab_y",2);
 		eftab_hidden("ef_tab_y",3);
 		eftab_hidden("ef_tab_y",4);
 		eftab_hidden("ef_tab_y",5);
 		eftab_hidden("ef_tab_y",6);
 		efRoundIframechange_option("ef_tab_y",7,onTabChange);
 		parent.pageIndex = 7;     //撤销原Tab页记录联动，并记录为从第一TAB页开始加载
 	} 
 	else{
 		//子页面切换后，Tab页加载逻辑预处理
 		if(parent.curPage != "EC04"){
 			var tabName = parent.getTabName();
 			if(tabName != null){
 				var tabId = parent.getTabId("EC04",tabName);
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
	
}


//移动
button_move_onclick=function(){
	var columnId = ef.get("inqu_status-0-columnId").value;
	var childWindow = efform.openNewForm('ECCM02', "serviceName=ECCM01&methodName=initLoad&columnId=" + columnId);
    childWindow.focus();
}


//删除
button_delete_onclick=function(){
	var columnId = ef.get("inqu_status-0-columnId").value;
	var info = new EiInfo();
	info.set("columnId",columnId);
	EiCommunicator.send( "ECCM01", "deletColumn" , info, ajax_show_refresh ); 
}

ajax_show_refresh = {
	onSuccess : function(eiInfo){	
		if(eiInfo.getStatus()=='-1'){
			alert(eiInfo.getMsg());
			return ;
		}
		alert("删除成功!");
		if(ajaxEi!=null){
  	    	if(ajaxEi.get("tag")=="true"){
  	  			alert("栏目下有文章(包括回收站中的文章)或者子栏目，不允许删除该栏目！");
  	  		}else{
	  	  		parent.onSiteListChange();
  			}
  		}
      },
      onFail: function(eMsg){
      	alert("failure");
      }
}

//增量发布
button_addpub_onclick=function(){
	if(!confirm("确定要发布吗?"))
	{
		return false;
	}
	var columnId = ef.get("inqu_status-0-columnId").value;
	var info = new EiInfo();
	info.set("columnId",columnId);
	info.set("isIncre","true");
	EiCommunicator.send( "ECSM01", "releaseColumn" , info, null ); 
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
	var columnId = ef.get("inqu_status-0-columnId").value;
	var info = new EiInfo();
	info.set("columnId",columnId);
	EiCommunicator.send( "ECSM01", "releaseColumn" , info, null ); 
	if(ajaxEi!=null){
		var msg=ajaxEi.getMsg();
		alert(msg);
	}   
}

//发布首页
button_outlinepub_onclick=function(){
	if(!confirm("确定要发布吗?"))
	{
		return false;
	}
	var columnId = ef.get("inqu_status-0-columnId").value;
	var info = new EiInfo();
	info.set("columnId",columnId);
	info.set("isMainOnly","true");
	EiCommunicator.send( "ECSM01", "releaseColumn" , info, null ); 
	if(ajaxEi!=null){
		var msg=ajaxEi.getMsg();
		alert(msg);
	}
}

//修改站点
button_modify_onclick=function(){
	var columnId = ef.get("inqu_status-0-columnId").value;
    parent.modifycolumn(columnId);
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
	parent.curPage = "EC04";

}

/**
 *  加载Tab中的子页面
 */
loadTabPage = function(index) {
	var frame = frames[index];
	var _path =  composePath(frame, path[index], index);
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
	return path + "&nodeId="+ef.get("inqu_status-0-columnId").value+"&nodeType=c";
}
