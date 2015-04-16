<!DOCTYPE html>
<%@ page contentType="text/html; charset=UTF-8"%>

<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>
<%
	String actionUrl = request.getContextPath() + "/DispatchAction.do";
%>

<html>
<head>
	<meta http-equiv="Content-Type" content="text/html;
	charset=UTF-8" />
	<title>
	</title>
	<script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
	<script class="javascript" src="./EF/SyntaxHighlighter/shCore.js"></script>
	<script class="javascript" src="./EF/SyntaxHighlighter/shBrushJScript.js"></script>
	<script class="javascript" src="./EF/SyntaxHighlighter/shBrushXmlOrJsp.js"></script>
	<link type="text/css" rel="stylesheet" href="./EF/SyntaxHighlighter/SyntaxHighlighter.css"></link>
	<script type="text/javascript" src="./EE/DM/EEDM21.js"></script>

</head>
<body class="bodyBackground">
<form id="EEDM21" method="POST" action="<%=actionUrl%>" >
	<jsp:include flush="false" page="../../EF/Form/iplat.ef.head.jsp"></jsp:include>



<div id="divStatus" style="color: blue"></div>
<div id = "ef_region_inqu" title="查询条件" efRegionShowClear=true>
	<div style="overflow:hidden;width:100%">
		<table style="width:100%">
		  <tr>
		    <td align="right" nowrap style="width:10%">
		      数据一：
		    </td>
		    <td >
		    <EF:EFInput blockId="inqu_status" ename="double1" row="0" />
		    </td>
		  </tr>
		</table>
	</div>
</div>

<div id = "ef_region_result" title="记录集" style="overflow:scroll">
	<div id = "ef_grid_result" title="页面信息" style="overflow: hidden;height:300px;">
	</div>
</div>

<EF:EFRegion/>
<EF:EFGrid blockId="result" autoDraw="yes" frontSort="true" sumType="none" showModel="quickShow"  ajax="false" enable="true"  style="modelXlsBar:true;">

	<EF:EFColumn ename="double1" cname="数据一" sort="true" align="left" width="150" canPersonal="false" formatString="￥#,###,##0.000" />
	<EF:EFColumn ename="double2" cname="数据二" sort="true" align="right" width="150" formatString="$#,###,##0.000" />
	<EF:EFColumn ename="double3" cname="数据三" sort="true" align="right" width="150" formatString="￥#,###,##0.000" />
	<EF:EFColumn ename="double4" cname="数据四" sort="true" width="150" formatString="￥#,###,##0.000" />
	<EF:EFColumn ename="double5" cname="数据五" sort="true" width="150" formatString="￥#,###,##0.000" />

    <EF:EFColumn ename="double6" cname="数据六" sort="true" formatString="￥#,###,##0.000" />
	<EF:EFColumn ename="double7" cname="数据七" sort="true" formatString="￥#,###,##0.000" />
	<EF:EFColumn ename="double8" cname="数据八" sort="true" formatString="￥#,###,##0.000" />
	<EF:EFColumn ename="double9" cname="数据九" sort="true" formatString="$#,###,##0.000" />
	<EF:EFColumn ename="double10" cname="数据十" sort="true" formatString="$#,###,##0.000" />

    <EF:EFColumn ename="double11" cname="数据十一" sort="true" formatString="$#,###,##0.000" />
	<EF:EFColumn ename="double12" cname="数据十二" sort="true" formatString="$#,###,##0.000" />
	<EF:EFColumn ename="double13" cname="数据十三" sort="true" formatString="$#,###,##0.000" />
	<EF:EFColumn ename="double14" cname="数据十四" sort="true" formatString="￥#,###,##0.000" />
	<EF:EFColumn ename="double15" cname="数据十五" sort="true" formatString="￥#,###,##0.000" />

    <EF:EFColumn ename="double16" cname="数据十六" sort="true" formatString="#,###,##0.000" />
	<EF:EFColumn ename="double17" cname="数据十七" sort="true" formatString="#,###,##0.000" />
	<EF:EFColumn ename="double18" cname="数据十八" sort="true" formatString="#,###,##0.000" />
	<EF:EFColumn ename="double19" cname="数据十九" sort="true" formatString="#,###,##0.000" />
	<EF:EFColumn ename="double20" cname="数据二十" sort="true" formatString="#,###,##0.000" />
</EF:EFGrid>

<jsp:include flush="false" page="../../EF/Form/iplat.ef.tail.jsp"></jsp:include>
</form>

</body>
</html>
