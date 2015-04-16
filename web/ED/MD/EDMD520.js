/**
 * Generate time : 2011-11-16 14:55:50
 */
var handleClick = true;		//是否响应首页单击记录的事件
var tabIndexOnClick = -1;	//单击记录时，切换到的Tab页(0是第一个页面, <0表示不切换)
var handleDblClick = true;	//是否响应首页双击记录的事件
var tabIndexOnDblClick = 1;	//双击记录时，切换到的Tab页(0是第一个页面, <0表示不切换)
var checkTabSwitch = true;	//未选中记录时，是否允许切换Tab页

var selected = null;		//保存单击或者双击选中的记录

/**
 * 页面加载后的回调
 */
efform_onload = function()
{
	loadTabPage(0);
}

/**
 * 当Tab中的页面加载之后的回调
 */
onTabPageLoad = function(wnd, index) {
	/** 处理第1个页面的多记录点击事件*/
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
	
	/** 处理第1个页面的多记录双击事件*/
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
	
	if (index > 0) {
		//隐藏查询区域
		wnd.$("#ef_region_inqu").css("display", "none");
	}
}

/**
 * Tab切换的回调
 */
onTabChange = function(currentIndex, index) {
	/** Tab切换时加载对应页面的逻辑*/
	if (index == 0) { //切换到第1个Tab
		return true;
	}
	if (index > 0 && selected==null && checkTabSwitch ) { //未选中记录时，不能切换到后续的Tab页
		alert("请选择记录!");
		return false;
	}
	loadTabPage(index);
	return true; 
}

/**
 *  加载Tab中的子页面（如果页面没有变化不会重复加载）
 */
loadTabPage = function(index) {
	var frame = frames[index];
	var _path = selected==null ? path[index] : composePath(frame, path[index], index);
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
	switch(index) {
	case 0: //第1个Tab页
		return path;
	case 1: //第2个Tab页
		return path + "&methodName=queryByForm&inqu_status-0-formId=" + selected["id"];
	case 2: //第3个Tab页
		return path + "&methodName=queryByForm&inqu_status-0-formId=" + selected["id"];
	case 3: //第4个Tab页
		return path + "&methodName=query&inqu_status-0-yourQueryKey=" + selected["yourQueryKey"];
	case 4: //第5个Tab页
		return path + "&methodName=query&inqu_status-0-yourQueryKey=" + selected["yourQueryKey"];
	case 5: //第6个Tab页
		return path + "&methodName=query&inqu_status-0-yourQueryKey=" + selected["yourQueryKey"];
	case 6: //第7个Tab页
		return path + "&methodName=query&inqu_status-0-yourQueryKey=" + selected["yourQueryKey"];
	default:
		return null;
	}
}
