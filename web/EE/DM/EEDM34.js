/*
  点击查询按钮后调用后台的service
*/
var ifShow = false;
var ajaxFlag = false;
var callDate;
var startTime;
var serviceSpanTime = 0;
var transforTime = 0;
var COLS = 500;
var ROWS = 0;
var _TYPE = '';


efform_onload = function (){
	efregion.show("ef_region_result");
}

button_aquery_onclick = function()
{
	ajaxFlag = true;
}

button_naquery_onclick = function()
{
	ajaxFlag = false;
}


button_query50_onclick = function () 
{
	ROWS = 50;	
	__flage = "query";
	var grid = efgrid.getGridObject("ef_grid_result");
	grid.setShowModel("");
	grid.setLimit( 50 );
	grid.setAjax(ajaxFlag);
	callDate = new Date();	
	document.getElementById( 'startTime' ).value = callDate.getTime();	
	efgrid.submitInqu( "ef_grid_result", "ee","EEDM34","query", true );	

}

button_query100_onclick = function () 
{
	ROWS = 100;
	__flage = "query";
	var grid = efgrid.getGridObject("ef_grid_result");
	grid.setShowModel("");
	grid.setLimit( 100 );
	grid.setAjax(ajaxFlag);
	callDate = new Date();	
	document.getElementById( 'startTime' ).value = callDate.getTime();	
	efgrid.submitInqu( "ef_grid_result", "ee","EEDM34","query", true );	
	
}

button_query500_onclick = function () 
{
	ROWS = 500;	
	__flage = "query";
	var grid = efgrid.getGridObject("ef_grid_result");
	grid.setShowModel("");
	grid.setLimit( 500 );
	grid.setAjax(ajaxFlag);
	callDate = new Date();	
	document.getElementById( 'startTime' ).value = callDate.getTime();	
	efgrid.submitInqu( "ef_grid_result", "ee","EEDM34","query", true );	
	
}

button_query1000_onclick = function () 
{
	ROWS = 1000;	
	__flage = "query";
	var grid = efgrid.getGridObject("ef_grid_result");
	grid.setShowModel("");
	grid.setLimit( 1000 );
	grid.setAjax(ajaxFlag);
	callDate = new Date();	
	document.getElementById( 'startTime' ).value = callDate.getTime();	
	efgrid.submitInqu( "ef_grid_result", "ee","EEDM34","query", true );	
	
}


efgrid_onCellDisplayReady = function( div_node_html, row_index, col_index, col_value_c, display_value, grid_id )
{
  //多Grid时的检验
  if (grid_id != "ef_grid_result") return;
  var grid = efgrid.getGridObject( grid_id );
  var columnEname = grid.getColumn(col_index, TYPE_DATA).getEname();

  switch (columnEname) {
     case "archieveFlag":
       //设置对”归档标记“属性checkbox
       var html = "";
       if (display_value == 'true' || display_value == '1'){
         html = "<div align=center><input hidefocus='-1' type='checkbox' checked /></div>";
       } else {
         html = "<div align=center><input hidefocus='-1' type='checkbox' /></div>";
       }
       return html;
       
     case "loadOnDemand":
       //设置对”按需加载“属性checkbox
       var html = "";
       if (display_value == 'true' || display_value == '1'){
         html = "<div align=center><input hidefocus='-1' type='checkbox' checked /></div>";
       } else {
         html = "<div align=center><input hidefocus='-1' type='checkbox' /></div>";
       }
       return html;

       break;    
  }
}

efgrid.prototype.refresh = function( eiinfo ) {
	var start =  new Date();
	//debugger; 
	
	this.cellEditNode = null;
	this.cellOriginEditNode = null;
	this.cellOriginNodeType = -1;
	this.cellOriginNodeValue = "";
	
	
	if( isAvailable(eiinfo) ) {		// 更新blockData
		var meta = eiinfo.getBlock( this.blockId ).getBlockMeta();
		var repaintHead = isAvailable(meta);	// 如果包含元数据，重画表头 
		if (repaintHead) {	// 如果重画表头，设置表格数据 
			this.setData(eiinfo); 
		} else {			// 如果不重画表头，保留原元数据 
			meta = this.blockData.getBlockMeta();
			this.blockData = eiinfo.getBlock( this.blockId );
			this.blockData.setBlockMeta( meta );
		}
		
		this._clearRowState();	
		if( this.getStyleSetting( STYLE_CONSTANT["INIT_SELECT"] ) === "true"
			&& this.blockData.getRows().length > 0 )
			this._currentRow = 0;
		else
			this._currentRow = -1;
		
		this._clearStyle();
	}
	
	// 重画表格:
	var grid_table = this.getGridTableNode();
	var div_node = document.createElement("div");

	
	// FuncDiv：功能栏区域 
	
	
	var funcDiv = efgrid.getFuncDiv( grid_table );
	
	if(this.isLazyLoad())
		div_node.innerHTML = efgrid.divFunc.buildLFuncDiv( this );
	else	
		div_node.innerHTML = efgrid.divFunc.buildFuncDiv( this );
		
	funcDiv.innerHTML = div_node.firstChild.innerHTML;

	// CornerDiv：固定列头区域 
	div_node.innerHTML = efgrid.divCorner.buildCornerDiv( this );
	var conerDiv = efgrid.getCornerDiv( grid_table );
	conerDiv.innerHTML = div_node.firstChild.innerHTML;
	//conerDiv.parentNode.innerHTML = efgrid.divCorner.buildCornerDiv( this );


	
	// FixDiv：固定列区域 

	var html = efgrid.divData.buildFixDataDiv(this);
	
	var fix_div_node = document.createElement("div");
	fix_div_node.innerHTML = html[0];
	var fixDiv = efgrid.getFixDiv( grid_table );
	///fixDiv.innerHTML = '';
	///fixDiv.appendChild(fix_div_node.firstChild.firstChild);

	//fixDiv.parentNode.innerHTML = html[0];
	
	////fixDiv.parentNode.innerHTML = efgrid.divFix.buildFixDiv( this );
	
	fixDiv.innerHTML = fix_div_node.firstChild.innerHTML;
	
	// DataDiv：数据区域 
	
	var data_div_node = document.createElement("div");
	data_div_node.innerHTML = html[1];
    
    var dataDiv = efgrid.getDataDiv( grid_table );
	dataDiv.innerHTML = data_div_node.firstChild.innerHTML;
	///dataDiv.innerHTML = '';
	//dataDiv.parentNode.innerHTML = html[1];
    ////dataDiv.parentNode.innerHTML = efgrid.divData.buildDataDiv( this );
	///dataDiv.appendChild(data_div_node.firstChild.firstChild);
	//dataDiv.innerHTML = efgrid.divData.buildDataDiv( this );
	
	

	if(this.needSum()){
		var sumHtml = efgrid.divSum.buildSumDiv(this);
		var sum_div_node = document.createElement("div");
		sum_div_node.innerHTML = sumHtml[0];
		var sumFixDiv = efgrid.getSumFixDiv(grid_table);
		sumFixDiv.innerHTML = sum_div_node.firstChild.innerHTML;
		var sumDataDiv = efgrid.getSumDataDiv(grid_table);
		var sumData_div_node = document.createElement("div");
		sumData_div_node.innerHTML = sumHtml[1];
		sumDataDiv.innerHTML = sumData_div_node.firstChild.innerHTML;
	}	
    
    
    
	// HeadDiv：表头区域 
	if (repaintHead) {
		div_node.innerHTML = efgrid.divHead.buildHeadDiv( this );
		var dataDiv = efgrid.getHeadDiv( grid_table );
		dataDiv.innerHTML = div_node.firstChild.innerHTML;
		this._resizeHeader(grid_table);
	}
	
	this._setScrollStyle();
	//var headDiv = efgrid.getHeadDiv(grid_table);
	//headDiv.scrollLeft = dataDiv.scrollLeft;
	
	//配置子grid的回调
	if(grid_table.parentNode.id == "efgrid_config_sub_grid"){

	     var grid=efgrid.getGridObject("efgrid_config_sub_grid");
	     var rowCount=grid.getRowCount();
	     for(var i=0;i<rowCount;i++)
	     {
	       var canPersonal=grid.getCellValue(i,0,TYPE_DATA,true);
	       if(canPersonal == "false")
	         efgrid.setRowDisplayStyle(grid_table.parentNode.id,i,"show");
	     }    
	     		
	}else if(typeof efgrid_onGridDisplayReady == "function") {
		try {
			efgrid_onGridDisplayReady( grid_table.parentNode );
		} catch( ex ) {
			efgrid.processException(ex, "Callback to efgrid_onGridDisplayReady failed");
		}
	}
	serviceSpanTime = eiinfo.get( "serviceSpanTime" );
		
//	var end =  new Date();
//	//ef.get( "_eiMsg" ).innerHTML += "<span style='color:red'>"+"正常展示"+(__flage=="query"?"":"非")+"格式化数据耗时：<b>"+(end.getTime()-start.getTime())+"</b> 毫秒</span>";
//
//	ef.get( "_eiMsg" ).innerHTML += "<span style='color:red'><b>"+"总时间:"+(end.getTime()-callDate.getTime()) +
//		"毫秒 ---  渲染:" + (end.getTime()-start.getTime()) + "毫秒 ---  后台: " + (start.getTime()-callDate.getTime()) +  "毫秒 </b></span>";
	countTime( "前端- " );
	//logTime( _totaltime, _renderTime, _serviceTime  );
	
}

window.onload=function()
{
	countTime( "后端-" );
}

countTime = function( _type )
{
	_TYPE = _type;
	var end =  new Date();
	
	var _startTime = document.getElementById( 'startTime' ).value;
	
	if( _startTime != undefined && _startTime != '' )
	{
		var _totalTime = end.getTime()-_startTime;
		var _serviceTime = startTime.getTime()- _startTime;
		var _renderTime = end.getTime()- startTime.getTime();
		transforTime = _serviceTime - serviceSpanTime;
		
		logTime( _totalTime, _renderTime, _serviceTime );	
	}
}

logTime = function( _totalTime, _renderTime, _serviceTime )
{
	document.getElementById( 'startTime' ).value = '';
	var _rows = document.getElementById( 'rows' ).value;
	document.getElementById( 'rows' ).value = '';
	
		var info = new EiInfo(); 
		info.set( "totaltime",_totalTime );
		info.set( "rendertime",_renderTime );
		info.set( "servicetime",_serviceTime );
		info.set( "querytime",serviceSpanTime );
		info.set( "jsontransftime",transforTime );
		
		info.set( "row",_rows );
		info.set( "col",COLS );								
		
		EiCommunicator.send( "EEDM35", "log" , info, {
			onSuccess : function(eiInfo) { 
				ef.get( "_eiMsg" ).innerHTML += "<span style='color:red'><b>"+ _TYPE + "总时间:"+ _totalTime +
					" -渲染:" + _renderTime + "-后台: " + _serviceTime +  " -服务:" + serviceSpanTime + " -传输:" + transforTime +"</b></span>";	
				
			},
  			onFail: function(eMsg) {
  				alert("Error occured on call service: " + eMsg);
			}
		});
}

efgrid.prototype.paint = function() {
	var start =  new Date();

	/* 重置编辑单元格 */
	this.cellEditNode = null;
	this.cellOriginEditNode = null;
	this.cellOriginNodeValue = "";
	this.cellOriginNodeType = -1;
	
	/* 清空校验错误信息 */
	efform.clearErrorMessage();
	
	/* 初始化当前行 */
	if( this._currentRow < 0 ) {
		if( this.getStyleSetting( STYLE_CONSTANT["INIT_SELECT"] ) === "true"
			&& this.blockData.getRows().length > 0 ) {
			this._currentRow = 0;
		}
	}
	
	/* 绘制前的回调 */
	if (typeof efgrid_onBeforeGridDisplay == "function") {
		try {
			efgrid_onBeforeGridDisplay( this.gridId );
		} catch( ex ) {
			efgrid.processException(ex, "Callback to efgrid_onBeforeGridDisplay failed");
		}
	}
	
	var paint_div_id = this.gridId;
	var paintDivElement = document.getElementById(paint_div_id);
	if ( !paintDivElement ) {
		alert( getI18nMessages(EF_ERROR_MSG["GRID_DIV_NOT_FOUND"],"欲显示的efgrid对象必须置于有效<Div>元素中！" ) );
		return -1;
	}
	
	ef.debug( "[" + new Date().getTime().toString() + "]paint start." );
	var aa = paintDivElement;
	
	

	/* 获得表格DIV样式 */
	var w_total = aa.style.width ? parseInt(aa.style.width) : parseInt(aa.scrollWidth);
	if( w_total > document.body.clientWidth ) w_total = document.body.clientWidth - 20;
	this.leftWidth  = efgrid.divFix.calcFixWidth(this);
	this.rightWidth = w_total - this.leftWidth - 2;
				
	var h_total = aa.style.height ? parseInt(aa.style.height) : parseInt(aa.clientHeight);
	if( h_total < 50 ) h_total = 300;
	this.bottomHeight = h_total - this.rowHeight * 2 ;
	
	if(efgrid.divFunc.isBuildNavigationBar(this))
		this.bottomHeight -=10;
	
		
	
		
	
	var sumTR = "";
	if(this.needSum()){
		if(this.getRenderSumType() == "all"){
			height =  this.rowHeight * 2 ;
			this.sumDivRowCount = 2;
		}	
		else{
			height = this.rowHeight;
			this.sumDivRowCount = 1;
		}
		height += 5;
		if(!this.isEnable())
			height +=10;
		this.bottomHeight -= height;
		this.sumDivHeight = height;
		var sumHtml = efgrid.divSum.buildSumDiv(this);
		 
		sumTR = "<TR efGridTopTable=1 height=" + (this.sumDivHeight) + ">" + 
		  "  <TD efGridTopTable=1>" + sumHtml[0]   + "</TD>" + 
		  "  <TD efGridTopTable=1>" + sumHtml[1]  + "</TD>" + 
		  "</TR>";
	}		

	if ( this.isLazyLoad() ) {
		this.rightWidth = this.rightWidth - 17;
		this.setShowCount(true);
		this.setLimit( parseInt( (this.bottomHeight-10) / (this.rowHeight+3) ) );
		var scrollClientHeight = this.bottomHeight + this.rowHeight;
		
		var scrollDivHeight = Math.floor(scrollClientHeight / 8) * this.getCount();
		if ( scrollDivHeight < scrollClientHeight )
			scrollDivHeight = scrollClientHeight - 20;
		var scrollHtml = 
			"<DIV id='" + this.gridId + EF_SPLIT + "scroll_div' " + 
					"style='height:" + scrollClientHeight+ ";overflow:scroll' " +
					"onscroll='var grid = efgrid.getGridObject( \""+this.gridId+"\" );grid.onScroll();wsug(event, grid.getScrollTooltip())' " + 
					"onmouseout='wsug(event, 0)'>" +
				"<DIV style='height:" + scrollDivHeight + "'></DIV>" + 
			"</DIV>";	
	}	
	
	/* 绘制表格各部分 */
	var funcDivHtml   = efgrid.divFunc.buildFuncDiv( this );
	
	var LFuncDivHtml = efgrid.divFunc.buildLFuncDiv( this );
	
	var cornerDivHtml = efgrid.divCorner.buildCornerDiv( this );		
	//var fixDivHtml    = efgrid.divFix.buildFixDiv( this );
	
	var headDivHtml   = efgrid.divHead.buildHeadDiv( this );		
	//var dataDivHtml   = efgrid.divData.buildDataDiv( this );		
	
	var html = efgrid.divData.buildFixDataDiv( this );
	
	
	
	/* 合并各部分HTML */
	var grid_table_html = "<TABLE id='" + this.gridId + EF_SPLIT + "grid_table' " +
		"class='ef-grid-border' style='table-layout:fixed;' " + 
		"width=" + w_total +  " border=0 cellspacing=0 cellpadding=0 cols=2>" +
		"<col width=" + this.leftWidth  + ">" + 
		"<col width=" + this.rightWidth + ">";
	grid_table_html += 
	  "<TR class=tableHeader efGridTopTable=1>" + 
	  (this.isLazyLoad()?("<TD colspan = 3 efGridTopTable=1 align=left>" + LFuncDivHtml + "</TD>"):("<TD align=left >"+LFuncDivHtml+"</TD>"+
	  "<TD colspan = 2 efGridTopTable=1 align=right>" + funcDivHtml + "</TD>"))+
	  "</TR>" +
	  "<TR efGridTopTable=1 height=" + this.rowHeight + ">" + 
	  "  <TD efGridTopTable=1>" + cornerDivHtml + "</TD>" + 
	  "  <TD efGridTopTable=1>" + headDivHtml   + "</TD>" +
	  (this.isLazyLoad()?(" <TD rowspan=2>" + scrollHtml + "</TD>"):"")+
	  "</TR>" + 
	  "<TR efGridTopTable=1 height=" + this.bottomHeight + ">" + 
	  "  <TD efGridTopTable=1>" + html[0]   + "</TD>" + 
	  "  <TD efGridTopTable=1>" +html[1]  + "</TD>" + 
	  "</TR>" + sumTR+
	  "</TABLE>";
    
    
	paintDivElement.innerHTML = grid_table_html;


	this._resizeHeader(paintDivElement.firstChild);
	


	ef.debug( "[" + new Date().getTime().toString() + "]build table node finish." );
	
	/* 保存表格对象引用 */
	var grid_table = paintDivElement.firstChild;          
	grid_table.efgrid = this;
	
	this._setScrollStyle();
	
	
	/* 绘制结束的回调 */
	if(paintDivElement.id == "efgrid_config_sub_grid"){

	     var grid=efgrid.getGridObject("efgrid_config_sub_grid");
	     var rowCount=grid.getRowCount();
	     for(var i=0;i<rowCount;i++)
	     {
	       var canPersonal=grid.getCellValue(i,0,TYPE_DATA,true);
	       if(canPersonal == "false")
	         efgrid.setRowDisplayStyle(paintDivElement.id,i,"show");
	     }    
	     		
	}else if (typeof efgrid_onGridDisplayReady == "function") {
		try {
			efgrid_onGridDisplayReady( paintDivElement );
		} catch( ex ) {
			efgrid.processException(ex, "Callback to efgrid_onGridDisplayReady failed");
		}
	}
	
	ef.debug( "[" + new Date().getTime() + "] build grid finish" );
	efform.showErrorMessage();

	this.showModel = "";
	
	
	if (this.isLazyLoad() && this.scrollLastPos != -1)
		this.getScrollDivNode().scrollTop = this.scrollLastPos;	

//	var end =  new Date();
//	//ef.get( "_eiMsg" ).innerHTML += "<span style='color:red'>"+"快速展示格式化数据耗时：<b>"+(end.getTime()-start.getTime())+"</b> 毫秒</span>"; 
//	//alert();		
//		
//	var _startTime = document.getElementById( 'startTime' ).value;
//	
//	if( _startTime != undefined && _startTime != '' )
//	{
//		var _totalTime = end.getTime()-_startTime;
//		var _serviceTime = start.getTime()- _startTime;
//		var _renderTime = end.getTime()- start.getTime();
//		
//		//alert( _totalTime );
//		//alert( _serviceTime );
//		//alert( _renderTime );				
//		
//		//ef.get( "_eiMsg" ).innerHTML += "<span style='color:red'><b>"+"(快速)总时间:"+ _totalTime +
//		//	"毫秒 ---  渲染:" + _renderTime + "毫秒 ---  后台: " + _serviceTime +  "毫秒 </b></span>";	
//		
//		logTime( _totalTime, _renderTime, _serviceTime  );
//	}	
}

