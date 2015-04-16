<!DOCTYPE html>

<%@page pageEncoding="UTF-8" language="java" contentType="text/html;charset=UTF-8"%>

<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>

<%@page import="java.util.*" %>
<%@page import="com.baosight.iplat4j.ef.ui.column.*" %>
<%
	String contextpath = request.getContextPath();
	String baseUrl = contextpath;
	String listUrl = baseUrl + "/DispatchAction.do";
%>
<%
	List combo_source = new ArrayList();

	combo_source.add( new EFComboBean("SonyEricsson", "索尼爱立信") );
	combo_source.add( new EFComboBean("NOKIA", "诺基亚") );
	combo_source.add( new EFComboBean("Samsung", "三星") );
	combo_source.add( new EFComboBean("Philips", "飞利浦") );

	request.setAttribute( "combobox_source", combo_source );
%>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html;
	charset=UTF-8" />
	<title>
	</title>

	<script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
	<script type="text/javascript" src="./EE/EE1006.js"></script>
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

<EF:EFGrid blockId="result" autoDraw="yes" style="keyEvent:true;checkNewLine:false" >

	<EF:EFColumn ename="product_id" cname="产品代号" fix="yes" />
	<EF:EFColumn ename="price" cname="价格(不可编辑)" fix="yes" enable="false" />
	<EF:EFColumn ename="sale_date" cname="上市日期" fix="yes" />

	<EF:EFComboColumn ename="company_name" cname="公司名称" sourceName="combobox_source"
		valueProperty="value"  labelProperty="label"  width="150" />

	<EF:EFColumn ename="search" cname="Google(不可编辑)" enable="false" />
	<EF:EFColumn ename="validate_0" cname="手机校验(只读)" readonly="true" />

</EF:EFGrid>
<!-- 代码展示  -->
<div id = "ef_region_codeDemo" title="示例代码">
<div id="ef_tab_x"  lastRange="99%" eftabType="efRoundDivTab">
	<div id="jsp" title="JSP 源代码" >
	<textarea  name="code" class="html">
&lt;div id = "ef_region_result" title="记录集" style="overflow:scroll"&gt;
	&lt;div id = "ef_grid_r" title="页面信息" style="overflow: hidden;height:300px;"&gt;
	&lt;/div&gt;
&lt;/div&gt;

&lt;EF:EFRegion/&gt;

&lt;EF:EFGrid blockId="r" autoDraw="yes" style="keyEvent:true;checkNewLine:false" &gt;

	&lt;EF:EFColumn ename="product_id" cname="产品代号" fix="yes" /&gt;
	&lt;EF:EFColumn ename="price" cname="价格(不可编辑)" fix="yes" enable="false" /&gt;
	&lt;EF:EFColumn ename="sale_date" cname="上市日期" fix="yes" /&gt;

	&lt;EF:EFComboColumn ename="company_name" cname="公司名称" sourceName="combobox_source"
		valueProperty="value"  labelProperty="label"  width="150" /&gt;

	&lt;EF:EFColumn ename="search" cname="Google(不可编辑)" enable="false" /&gt;
	&lt;EF:EFColumn ename="validate_0" cname="手机校验(只读)" readonly="true" /&gt;

&lt;/EF:EFGrid&gt;
	</textarea>
</div>
<div id="javascript" title="Javasript 源代码" >
	<textarea name="code" class="javascript">
button_save_onclick = function ()
{
	efgrid.submitForm( "ef_grid_r", "ee","EE1006","update",true );
}

button_remove_onclick = function ()
{
  	efgrid.submitForm( "ef_grid_r", "ee","EE1006","delete", true );
}

button_create_onclick = function ()
{
	efgrid.submitForm( "ef_grid_r", "ee","EE1006","insert", true );
}

efgrid_onFixCellClick = function( grid_id, row_index, col_index, cell_value )
{
	if( col_index >0 )
	{
		var grid = efgrid.getGridObject( grid_id );
		grid.setCurrentRowIndex( row_index );
	}
}

efgrid_onGridSubmit = function()
{
	alert( "本页面禁止翻页操作！" );
	return false;
}

	</textarea>
 </div>
 </div>
<EF:EFTab tabId="x" action="fundiv"/>
<script type="text/javascript">
	dp.SyntaxHighlighter.HighlightAll('code');
</script>
</div>
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
<jsp:include flush="false" page="../EF/Form/iplat.ef.tail.jsp"></jsp:include>
</form>

</body>
</html>
