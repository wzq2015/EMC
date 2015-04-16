<!DOCTYPE html>
<%@page pageEncoding="UTF-8" language="java" contentType="text/html;charset=UTF-8"%>

<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<c:set var="inqu" value="${ei.blocks.inqu_data}"/>
<%
	String contextpath = request.getContextPath();
	String baseUrl = contextpath;
	String listUrl = baseUrl + "/DispatchAction.do";
%>

<html>
<head>
	<meta http-equiv="Content-Type" content="text/html;
	charset=UTF-8" />
	<title>
	</title>

	<script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
	<script type="text/javascript" src="./EE/EE1005.js"></script>
	<script class="javascript" src="./EF/SyntaxHighlighter/shCore.js"></script>
	<script class="javascript" src="./EF/SyntaxHighlighter/shBrushJScript.js"></script>
	<script class="javascript" src="./EF/SyntaxHighlighter/shBrushXmlOrJsp.js"></script>
	<link type="text/css" rel="stylesheet" href="./EF/SyntaxHighlighter/SyntaxHighlighter.css"></link>
</head>

<body class="bodyBackground">
<form method="POST" action="<%=listUrl%>">

<jsp:include flush="false" page="../EF/Form/iplat.ef.head.jsp"></jsp:include>
<div id = "ef_region_result" title="记录集" style="overflow:scroll">
	<div id = "ef_grid_result" title="页面信息" style="overflow: hidden;height:300px;">
	</div>
</div>

<EF:EFRegion/>

<EF:EFGrid blockId="result" autoDraw="no" style="navigationBar:false;operationBar:false">

	<EF:EFColumn ename="team_name" cname="球队名称" fix="yes"  />

	<EF:EFComboColumn ename="continent_name" cname="所在洲" blockName="continent"
		valueProperty="continent_ename"  labelProperty="continent_cname" />

	<EF:EFComboColumn ename="country_name" cname="所在国家" blockName="country"
		valueProperty="country_ename"  labelProperty="country_cname" >
		<EF:EFOption value="" label="请选择" />
	</EF:EFComboColumn>

	<EF:EFComboColumn ename="city_ename" cname="所在城市英文名" blockName="city"
		valueProperty="city_ename"  labelProperty="city_ename" width="150" >
		<EF:EFOption value="" label="请选择" />
	</EF:EFComboColumn>

	<EF:EFColumn ename="city_cname" cname="所在城市中文名" fix="no" enable="false" width="150" />

</EF:EFGrid>
<!-- 代码展示  -->
<div id = "ef_region_codeDemo" title="示例代码">
<div id="ef_tab_x"  lastRange="99%" eftabType="efRoundDivTab">
	<div id="jsp" title="JSP 源代码" >
	<textarea  name="code" class="html">
&lt;div id = "ef_region_result" title="记录集" style="overflow:scroll"&gt;
	&lt;div id = "ef_grid_result" title="页面信息" style="overflow: hidden;height:300px;"&gt;
	&lt;/div&gt;
&lt;/div&gt;

&lt;EF:EFRegion/&gt;

&lt;EF:EFGrid blockId="result" autoDraw="no" style="navigationBar:false;operationBar:false"&gt;

	&lt;EF:EFColumn ename="team_name" cname="球队名称" fix="yes"  /&gt;

	&lt;EF:EFComboColumn ename="continent_name" cname="所在洲" blockName="continent"
		valueProperty="continent_ename"  labelProperty="continent_cname" /&gt;

	&lt;EF:EFComboColumn ename="country_name" cname="所在国家" blockName="country"
		valueProperty="country_ename"  labelProperty="country_cname" &gt;
		&lt;EF:EFOption value="" label="请选择" /&gt;
	&lt;/EF:EFComboColumn&gt;

	&lt;EF:EFComboColumn ename="city_ename" cname="所在城市英文名" blockName="city"
		valueProperty="city_ename"  labelProperty="city_ename" width="150" &gt;
		&lt;EF:EFOption value="" label="请选择" /&gt;
	&lt;/EF:EFComboColumn&gt;

	&lt;EF:EFColumn ename="city_cname" cname="所在城市中文名" fix="no" enable="false" width="150" /&gt;

&lt;/EF:EFGrid&gt;
	</textarea>
</div>
<div id="javascript" title="Javasript 源代码" >
	<textarea name="code" class="javascript">
var all_countries = new Object();
var all_cities = new Object();

efgrid_onBeforeGridDisplay = function( grid_id )
{
	var ei = _getEi();
	var block = ei.getBlock( "all_countries" );
	for( var i=0; i< block.getRows().length; i++ )
	{
		all_countries[block.getCell(i,"country_ename")] =
			block.getCell(i,"country_cname");
	}
	block = ei.getBlock( "all_cities" );
	for( var i=0; i< block.getRows().length; i++ )
	{
		all_cities[block.getCell(i,"city_ename")] =
			block.getCell(i,"city_cname");
	}
}

efgrid_onBeforeCellEditNodeDisplay = function( grid_id, row_index,
	col_index, data_type )
{
	var grid = efgrid.getGridObject( grid_id );

	if( col_index == 1 && data_type == TYPE_DATA )
	{
		load_country( row_index, grid.getCellValue( row_index, 0, TYPE_DATA  ) );
	}
	if( col_index == 2 && data_type == TYPE_DATA )
	{
		load_city( row_index, grid.getCellValue( row_index, 1, TYPE_DATA  ) );
	}
}

efgrid_onCellEditNodeDisplayReady = function( grid_id, row_index,
	col_index, cell_value, data_type, div_node )
{

}

efgrid_onCellDisplayReady = function( div_node_html, row_index,
	col_index, cell_value, display_value, grid_id )
{
	if( col_index == 1 && isAvailable(cell_value) )
	{
		var div_node = document.createElement( "div" );
		div_node.innerHTML = div_node_html;

		div_node.firstChild.innerText = all_countries[cell_value];

		return div_node.innerHTML;
	}
	if( col_index == 2 && isAvailable(cell_value) )
	{
		var div_node = document.createElement( "div" );
		div_node.innerHTML = div_node_html;

		div_node.firstChild.innerText = cell_value;

		return div_node.innerHTML;
	}
	return div_node_html;
}

efgrid_onDataCellSaved = function( grid_id, row_index, col_index, cell_value )
{
	var grid = efgrid.getGridObject( grid_id );

	if( col_index == 0 )
	{
		grid.setCellValue( row_index, 1, "", TYPE_DATA  );
		grid.setCellValue( row_index, 2, "", TYPE_DATA  );
		grid.setCellValue( row_index, 3, "", TYPE_DATA  );
		//grid.refreshRow( row_index );
		grid.refreshCell( row_index, 1 , TYPE_DATA );
		grid.refreshCell( row_index, 2 , TYPE_DATA );
		grid.refreshCell( row_index, 3 , TYPE_DATA );
	}
	if( col_index == 1 )
	{
		grid.setCellValue( row_index, 2, "", TYPE_DATA  );
		grid.setCellValue( row_index, 3, "", TYPE_DATA  );
		//grid.refreshRow( row_index );
		grid.refreshCell( row_index, 2 , TYPE_DATA );
		grid.refreshCell( row_index, 3 , TYPE_DATA );
	}
	if( col_index == 2 )
	{
		var cname = isAvailable( cell_value )? all_cities[cell_value]: "";
		grid.setCellValue( row_index, 3, cname, TYPE_DATA  );
		grid.refreshCell( row_index, 3 , TYPE_DATA );
	}
}

load_country = function( row_index, continent )
{
	var ajax_callback =
	{
		onSuccess :
    		function(eiInfo)
			{
				load_country_callback( row_index, eiInfo );
    		},
  		onFail:
    		function(eMsg)
			{
    			alert("服务调用失败: " + eMsg);
			}
	};
	var ei_info = new EiInfo();
	ei_info.setByNameValue( "inqu_data-0-continent_name", continent );

	EiCommunicator.send( "EE1005", "loadCountry" , ei_info, ajax_callback );
}

load_country_callback = function( row_index, eiInfo )
{
	var block = eiInfo.getBlock( "country" );
	if( !isAvailable( block ) || block.getRows().length <=0 )
	{
		return;
	}

	var grid = efgrid.getGridObject( "ef_grid_result" );
	var column = grid.getColumn( 1, TYPE_DATA );
	column.prepareData( eiInfo );

	grid.setCellValue( row_index, 1, "", TYPE_DATA  );
	grid.setCellValue( row_index, 2, "", TYPE_DATA  );
	grid.setCellValue( row_index, 3, "", TYPE_DATA  );

	grid.refreshCell( row_index, 1 , TYPE_DATA );
	grid.refreshCell( row_index, 2 , TYPE_DATA );
	grid.refreshCell( row_index, 3 , TYPE_DATA );

	//grid.refreshRow( row_index );
}

load_city = function( row_index, country )
{
	var ajax_callback =
	{
		onSuccess :
    		function(eiInfo)
			{
				load_city_callback( row_index, eiInfo );
    		},
  		onFail:
    		function(eMsg)
			{
    			alert("服务调用失败: " + eMsg);
			}
	};
	var ei_info = new EiInfo();
	ei_info.setByNameValue( "inqu_data-0-country_name", country );

	EiCommunicator.send( "EE1005", "loadCity" , ei_info, ajax_callback );
}

load_city_callback = function( row_index, eiInfo )
{
	var block = eiInfo.getBlock( "city" );
	if( !isAvailable( block ) || block.getRows().length <=0 )
	{
		return;
	}

	var grid = efgrid.getGridObject( "ef_grid_result" );
	var column = grid.getColumn( 2, TYPE_DATA );
	column.prepareData( eiInfo );

	grid.setCellValue( row_index, 2, "", TYPE_DATA  );
	grid.setCellValue( row_index, 3, "", TYPE_DATA  );

	grid.refreshCell( row_index, 2 , TYPE_DATA );
	grid.refreshCell( row_index, 3 , TYPE_DATA );
	//grid.refreshRow( row_index );
}

	</textarea>
 </div>
 </div>
<EF:EFTab tabId="x" action="fundiv"/>
<script type="text/javascript">
	dp.SyntaxHighlighter.HighlightAll('code');
</script>
</div>
<jsp:include flush="false" page="../EF/Form/iplat.ef.tail.jsp"></jsp:include>
</form>
<script type="text/javascript">
var tab  = ef.get("jquery_tab_div_content");
tab.style.height = "";
var tab1 = ef.get("jsp");
tab1.style.display = "block";
tab1.style.height = "";
tab1.style.width = "100%";
var tab2 = ef.get("javascript");
tab2.style.height = "";
tab2.style.width = "100%";
</script>
</body>
</html>
