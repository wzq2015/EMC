/*
  点击查询按钮后调用后台的service
*/
var ifShow = false;

efform_onload = function (){
	efregion.show("ef_region_result");
	//efregion.show("ef_region_codeDemo");
	//efregion.toggleShow("ef_region_codeDemo");
}


button_query_onclick = function ()
{
	__flage = "query";
	var grid = efgrid.getGridObject("ef_grid_result");
	grid.setShowModel("");
	grid.setAjax(true);
	efgrid.submitInqu( "ef_grid_result", "ee","EEDM21","query", true );

}

button_query2_onclick = function ()
{
	var grid = efgrid.getGridObject("ef_grid_result");
	grid.setShowModel("quickShow");
	grid.setAjax(false);
	efgrid.submitInqu( "ef_grid_result", "ee","EEDM21","query", true );

}

var __flage = "query";
button_query3_onclick = function ()
{
	__flage = "query3";
	var grid = efgrid.getGridObject("ef_grid_result");
	grid.setShowModel("");
	grid.setAjax(true);
	grid.setAutoDraw('yes');
	grid.setCustomColumns({});
	efgrid.submitInqu( "ef_grid_result", "ee","EEDM21","query", true );

}

button_squery_onclick = function ()
{
	var modalWin = new EFModalWindow('progressWindow');
	modalWin.showProgressBar();

	var grid = efgrid.getGridObject("ef_grid_result");
	var info = new EiInfo();
	info.setByNodeObject( document.forms[0] );
	var block = info.getBlock( grid.blockId );
	if( !isAvailable( block ) ) {
			block = new EiBlock( grid.getBlockData().getBlockMeta() );
			info.addBlock( block );
	}

	block.setAttr( grid.getBlockData().getAttr() );
	block.set( "orderBy", grid.getOrderBy() );


	EiCommunicator.send( "EEDM21", "squery" , info, {
		onSuccess : function(eiInfo) {
			// Ajax提交成功后回调
			modalWin.hide();
        	var grid = efgrid.getGridObject("ef_grid_result");
			grid.setData(eiInfo);
			grid.refresh();
		},
			onFail: function(eMsg) {
				alert("Error occured on call service: " + eMsg);
		}
	}, false, true);

}


/*
  点击删除按钮后调用后台的service
*/
button_delete_onclick = function ()
{
  	efgrid.submitForm( "ef_grid_result", "ee","EEDM21","delete", true );
}

/*
  点击新增按钮后调用后台的service
*/
button_insert_onclick = function ()
{
	efgrid.submitForm( "ef_grid_result", "ee","EEDM21","insert",true );
}

/*
  点击修改按钮后调用后台的service
*/
button_update_onclick = function ()
{
	//efgrid.submitForm( "ef_grid_result", "ee","EEDM21","update",true );
	//var grid = efgrid.getGridObject("ef_grid_result");
	var dataDiv = efgrid.getDataDiv(ef.get("ef_grid_result__grid_table"));
	alert(dataDiv.scrollHeight);
	alert(dataDiv.scrollTop);


}


/**

	<EF:EFColumn ename="double1" cname="数据一" sort="true" formatString="#,###,##0.000" />
	<EF:EFColumn ename="double2" cname="数据二" sort="true" formatString="#,###,##0.000" />
	<EF:EFColumn ename="double3" cname="数据三" sort="true" formatString="#,###,##0.000" />
	<EF:EFColumn ename="double4" cname="数据四" sort="true" formatString="#,###,##0.000" />
	<EF:EFColumn ename="double5" cname="数据五" sort="true" formatString="#,###,##0.000" />

    <EF:EFColumn ename="double6" cname="数据六" sort="true" formatString="#,###,##0.000" />
	<EF:EFColumn ename="double7" cname="数据七" sort="true" formatString="#,###,##0.000" />
	<EF:EFColumn ename="double8" cname="数据八" sort="true" formatString="#,###,##0.000" />
	<EF:EFColumn ename="double9" cname="数据九" sort="true" formatString="#,###,##0.000" />
	<EF:EFColumn ename="double10" cname="数据十" sort="true" formatString="#,###,##0.000" />

    <EF:EFColumn ename="double11" cname="数据十一" sort="true" formatString="#,###,##0.000" />
	<EF:EFColumn ename="double12" cname="数据十二" sort="true" formatString="#,###,##0.000" />
	<EF:EFColumn ename="double13" cname="数据十三" sort="true" formatString="#,###,##0.000" />
	<EF:EFColumn ename="double14" cname="数据十四" sort="true" formatString="#,###,##0.000" />
	<EF:EFColumn ename="double15" cname="数据十五" sort="true" formatString="#,###,##0.000" />

    <EF:EFColumn ename="double16" cname="数据十六" sort="true" formatString="#,###,##0.000" />
	<EF:EFColumn ename="double17" cname="数据十七" sort="true" formatString="#,###,##0.000" />
	<EF:EFColumn ename="double18" cname="数据十八" sort="true" formatString="#,###,##0.000" />
	<EF:EFColumn ename="double19" cname="数据十九" sort="true" formatString="#,###,##0.000" />
	<EF:EFColumn ename="double20" cname="数据二十" sort="true" formatString="#,###,##0.000" />


**/

//
//efgrid.prototype.refresh = function( eiinfo ) {
//	var start =  new Date();
//	//debugger;
//
//	this.cellEditNode = null;
//	this.cellOriginEditNode = null;
//	this.cellOriginNodeType = -1;
//	this.cellOriginNodeValue = "";
//
//
//	if( isAvailable(eiinfo) ) {		// 更新blockData
//		var meta = eiinfo.getBlock( this.blockId ).getBlockMeta();
//		var repaintHead = isAvailable(meta);	// 如果包含元数据，重画表头
//		if (repaintHead) {	// 如果重画表头，设置表格数据
//			this.setData(eiinfo);
//		} else {			// 如果不重画表头，保留原元数据
//			meta = this.blockData.getBlockMeta();
//			this.blockData = eiinfo.getBlock( this.blockId );
//			this.blockData.setBlockMeta( meta );
//		}
//
//		this._clearRowState();
//		if( this.getStyleSetting( STYLE_CONSTANT["INIT_SELECT"] ) === "true"
//			&& this.blockData.getRows().length > 0 )
//			this._currentRow = 0;
//		else
//			this._currentRow = -1;
//
//		this._clearStyle();
//	}
//
//	// 重画表格:
//	var grid_table = this.getGridTableNode();
//	var div_node = document.createElement("div");
//
//
//	// FuncDiv：功能栏区域
//
//
//	var funcDiv = efgrid.getFuncDiv( grid_table );
//
//	if(this.isLazyLoad())
//		div_node.innerHTML = efgrid.divFunc.buildLFuncDiv( this );
//	else
//		div_node.innerHTML = efgrid.divFunc.buildFuncDiv( this );
//
//	funcDiv.innerHTML = div_node.firstChild.innerHTML;
//
//	// CornerDiv：固定列头区域
//	div_node.innerHTML = efgrid.divCorner.buildCornerDiv( this );
//	var conerDiv = efgrid.getCornerDiv( grid_table );
//	conerDiv.innerHTML = div_node.firstChild.innerHTML;
//	//conerDiv.parentNode.innerHTML = efgrid.divCorner.buildCornerDiv( this );
//
//
//
//	// FixDiv：固定列区域
//
//	var html = efgrid.divData.buildFixDataDiv(this);
//
//	var fix_div_node = document.createElement("div");
//	fix_div_node.innerHTML = html[0];
//	var fixDiv = efgrid.getFixDiv( grid_table );
//	///fixDiv.innerHTML = '';
//	///fixDiv.appendChild(fix_div_node.firstChild.firstChild);
//
//	//fixDiv.parentNode.innerHTML = html[0];
//
//	////fixDiv.parentNode.innerHTML = efgrid.divFix.buildFixDiv( this );
//
//	fixDiv.innerHTML = fix_div_node.firstChild.innerHTML;
//
//	// DataDiv：数据区域
//
//	var data_div_node = document.createElement("div");
//	data_div_node.innerHTML = html[1];
//
//    var dataDiv = efgrid.getDataDiv( grid_table );
//	dataDiv.innerHTML = data_div_node.firstChild.innerHTML;
//	///dataDiv.innerHTML = '';
//	//dataDiv.parentNode.innerHTML = html[1];
//    ////dataDiv.parentNode.innerHTML = efgrid.divData.buildDataDiv( this );
//	///dataDiv.appendChild(data_div_node.firstChild.firstChild);
//	//dataDiv.innerHTML = efgrid.divData.buildDataDiv( this );
//
//
//
//	if(this.needSum()){
//		var sumHtml = efgrid.divSum.buildSumDiv(this);
//		var sum_div_node = document.createElement("div");
//		sum_div_node.innerHTML = sumHtml[0];
//		var sumFixDiv = efgrid.getSumFixDiv(grid_table);
//		sumFixDiv.innerHTML = sum_div_node.firstChild.innerHTML;
//		var sumDataDiv = efgrid.getSumDataDiv(grid_table);
//		var sumData_div_node = document.createElement("div");
//		sumData_div_node.innerHTML = sumHtml[1];
//		sumDataDiv.innerHTML = sumData_div_node.firstChild.innerHTML;
//	}
//
//
//
//	// HeadDiv：表头区域
//	if (repaintHead) {
//		div_node.innerHTML = efgrid.divHead.buildHeadDiv( this );
//		var dataDiv = efgrid.getHeadDiv( grid_table );
//		dataDiv.innerHTML = div_node.firstChild.innerHTML;
//		this._resizeHeader(grid_table);
//	}
//
//	this._setScrollStyle();
//	//var headDiv = efgrid.getHeadDiv(grid_table);
//	//headDiv.scrollLeft = dataDiv.scrollLeft;
//
//	//配置子grid的回调
//	if(grid_table.parentNode.id == "efgrid_config_sub_grid"){
//
//	     var grid=efgrid.getGridObject("efgrid_config_sub_grid");
//	     var rowCount=grid.getRowCount();
//	     for(var i=0;i<rowCount;i++)
//	     {
//	       var canPersonal=grid.getCellValue(i,0,TYPE_DATA,true);
//	       if(canPersonal == "false")
//	         efgrid.setRowDisplayStyle(grid_table.parentNode.id,i,"show");
//	     }
//
//	}else if(typeof efgrid_onGridDisplayReady == "function") {
//		try {
//			efgrid_onGridDisplayReady( grid_table.parentNode );
//		} catch( ex ) {
//			efgrid.processException(ex, "Callback to efgrid_onGridDisplayReady failed");
//		}
//	}
//
//	var end =  new Date();
//	ef.get( "_eiMsg" ).innerHTML += "<span style='color:red'>"+"正常展示"+(__flage=="query"?"":"非")+"格式化数据耗时：<b>"+(end.getTime()-start.getTime())+"</b> 毫秒</span>";
//}
//
//
//efgrid.prototype.paint = function() {
//	var start =  new Date();
//
//	/* 重置编辑单元格 */
//	this.cellEditNode = null;
//	this.cellOriginEditNode = null;
//	this.cellOriginNodeValue = "";
//	this.cellOriginNodeType = -1;
//
//	/* 清空校验错误信息 */
//	efform.clearErrorMessage();
//
//	/* 初始化当前行 */
//	if( this._currentRow < 0 ) {
//		if( this.getStyleSetting( STYLE_CONSTANT["INIT_SELECT"] ) === "true"
//			&& this.blockData.getRows().length > 0 ) {
//			this._currentRow = 0;
//		}
//	}
//
//	/* 绘制前的回调 */
//	if (typeof efgrid_onBeforeGridDisplay == "function") {
//		try {
//			efgrid_onBeforeGridDisplay( this.gridId );
//		} catch( ex ) {
//			efgrid.processException(ex, "Callback to efgrid_onBeforeGridDisplay failed");
//		}
//	}
//
//	var paint_div_id = this.gridId;
//	var paintDivElement = document.getElementById(paint_div_id);
//	if ( !paintDivElement ) {
//		alert( getI18nMessages(EF_ERROR_MSG["GRID_DIV_NOT_FOUND"],"欲显示的efgrid对象必须置于有效<Div>元素中！" ) );
//		return -1;
//	}
//
//	ef.debug( "[" + new Date().getTime().toString() + "]paint start." );
//	var aa = paintDivElement;
//
//
//
//	/* 获得表格DIV样式 */
//	var w_total = aa.style.width ? parseInt(aa.style.width) : parseInt(aa.scrollWidth);
//	if( w_total > document.body.clientWidth ) w_total = document.body.clientWidth - 20;
//	this.leftWidth  = efgrid.divFix.calcFixWidth(this);
//	this.rightWidth = w_total - this.leftWidth - 2;
//
//	var h_total = aa.style.height ? parseInt(aa.style.height) : parseInt(aa.clientHeight);
//	if( h_total < 50 ) h_total = 300;
//	this.bottomHeight = h_total - this.rowHeight * 2 ;
//
//	if(efgrid.divFunc.isBuildNavigationBar(this))
//		this.bottomHeight -=10;
//
//
//
//
//
//	var sumTR = "";
//	if(this.needSum()){
//		if(this.getRenderSumType() == "all"){
//			height =  this.rowHeight * 2 ;
//			this.sumDivRowCount = 2;
//		}
//		else{
//			height = this.rowHeight;
//			this.sumDivRowCount = 1;
//		}
//		height += 5;
//		if(!this.isEnable())
//			height +=10;
//		this.bottomHeight -= height;
//		this.sumDivHeight = height;
//		var sumHtml = efgrid.divSum.buildSumDiv(this);
//
//		sumTR = "<TR efGridTopTable=1 height=" + (this.sumDivHeight) + ">" +
//		  "  <TD efGridTopTable=1>" + sumHtml[0]   + "</TD>" +
//		  "  <TD efGridTopTable=1>" + sumHtml[1]  + "</TD>" +
//		  "</TR>";
//	}
//
//	if ( this.isLazyLoad() ) {
//		this.rightWidth = this.rightWidth - 17;
//		this.setShowCount(true);
//		this.setLimit( parseInt( (this.bottomHeight-10) / (this.rowHeight+3) ) );
//		var scrollClientHeight = this.bottomHeight + this.rowHeight;
//
//		var scrollDivHeight = Math.floor(scrollClientHeight / 8) * this.getCount();
//		if ( scrollDivHeight < scrollClientHeight )
//			scrollDivHeight = scrollClientHeight - 20;
//		var scrollHtml =
//			"<DIV id='" + this.gridId + EF_SPLIT + "scroll_div' " +
//					"style='height:" + scrollClientHeight+ ";overflow:scroll' " +
//					"onscroll='var grid = efgrid.getGridObject( \""+this.gridId+"\" );grid.onScroll();wsug(event, grid.getScrollTooltip())' " +
//					"onmouseout='wsug(event, 0)'>" +
//				"<DIV style='height:" + scrollDivHeight + "'></DIV>" +
//			"</DIV>";
//	}
//
//	/* 绘制表格各部分 */
//	var funcDivHtml   = efgrid.divFunc.buildFuncDiv( this );
//
//	var LFuncDivHtml = efgrid.divFunc.buildLFuncDiv( this );
//
//	var cornerDivHtml = efgrid.divCorner.buildCornerDiv( this );
//	//var fixDivHtml    = efgrid.divFix.buildFixDiv( this );
//
//	var headDivHtml   = efgrid.divHead.buildHeadDiv( this );
//	//var dataDivHtml   = efgrid.divData.buildDataDiv( this );
//
//	var html = efgrid.divData.buildFixDataDiv( this );
//
//
//
//	/* 合并各部分HTML */
//	var grid_table_html = "<TABLE id='" + this.gridId + EF_SPLIT + "grid_table' " +
//		"class='ef-grid-border' style='table-layout:fixed;' " +
//		"width=" + w_total +  " border=0 cellspacing=0 cellpadding=0 cols=2>" +
//		"<col width=" + this.leftWidth  + ">" +
//		"<col width=" + this.rightWidth + ">";
//	grid_table_html +=
//	  "<TR class=tableHeader efGridTopTable=1>" +
//	  (this.isLazyLoad()?("<TD colspan = 3 efGridTopTable=1 align=left>" + LFuncDivHtml + "</TD>"):("<TD align=left >"+LFuncDivHtml+"</TD>"+
//	  "<TD colspan = 2 efGridTopTable=1 align=right>" + funcDivHtml + "</TD>"))+
//	  "</TR>" +
//	  "<TR class='tableColumnHeader' efGridTopTable=1 height=" + this.rowHeight + ">" +
//	  "  <TD efGridTopTable=1>" + cornerDivHtml + "</TD>" +
//	  "  <TD efGridTopTable=1>" + headDivHtml   + "</TD>" +
//	  (this.isLazyLoad()?(" <TD rowspan=2>" + scrollHtml + "</TD>"):"")+
//	  "</TR>" +
//	  "<TR  efGridTopTable=1 height=" + this.bottomHeight + ">" +
//	  "  <TD efGridTopTable=1>" + html[0]   + "</TD>" +
//	  "  <TD efGridTopTable=1>" +html[1]  + "</TD>" +
//	  "</TR>" + sumTR+
//	  "</TABLE>";
//
//
//	paintDivElement.innerHTML = grid_table_html;
//
//
//	this._resizeHeader(paintDivElement.firstChild);
//
//
//
//	ef.debug( "[" + new Date().getTime().toString() + "]build table node finish." );
//
//	/* 保存表格对象引用 */
//	var grid_table = paintDivElement.firstChild;
//	grid_table.efgrid = this;
//
//	this._setScrollStyle();
//
//
//	/* 绘制结束的回调 */
//	if(paintDivElement.id == "efgrid_config_sub_grid"){
//
//	     var grid=efgrid.getGridObject("efgrid_config_sub_grid");
//	     var rowCount=grid.getRowCount();
//	     for(var i=0;i<rowCount;i++)
//	     {
//	       var canPersonal=grid.getCellValue(i,0,TYPE_DATA,true);
//	       if(canPersonal == "false")
//	         efgrid.setRowDisplayStyle(paintDivElement.id,i,"show");
//	     }
//
//	}else if (typeof efgrid_onGridDisplayReady == "function") {
//		try {
//			efgrid_onGridDisplayReady( paintDivElement );
//		} catch( ex ) {
//			efgrid.processException(ex, "Callback to efgrid_onGridDisplayReady failed");
//		}
//	}
//
//	ef.debug( "[" + new Date().getTime() + "] build grid finish" );
//	efform.showErrorMessage();
//
//	this.showModel = "";
//
//
//	if (this.isLazyLoad() && this.scrollLastPos != -1)
//		this.getScrollDivNode().scrollTop = this.scrollLastPos;
//
//	var end =  new Date();
//	ef.get( "_eiMsg" ).innerHTML += "<span style='color:red'>"+"快速展示格式化数据耗时：<b>"+(end.getTime()-start.getTime())+"</b> 毫秒</span>";
//	//alert();
//
//}

