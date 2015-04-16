<!DOCTYPE html>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@page import="com.baosight.iplat4j.core.ei.*" %>
<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>
<%
	String actionUrl = request.getContextPath() + "/DispatchAction.do";
	String showtype = ((EiInfo)request.getAttribute("ei")).getString("showtype");
	if(showtype==null){
		showtype = "1";
	}
%>

<html>
<head>
	<meta http-equiv="Content-Type" content="text/html;
	charset=UTF-8" />
	<title>
	</title>
	<script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
	<script type="text/javascript" src="./EJ/EJcommon.js"></script>
	<script type="text/javascript" src="./EE/DM/EEDM23.js"></script>
	<script class="javascript" src="./EF/SyntaxHighlighter/shCore.js"></script>
	<script class="javascript" src="./EF/SyntaxHighlighter/shBrushJScript.js"></script>
	<script class="javascript" src="./EF/SyntaxHighlighter/shBrushXmlOrJsp.js"></script>
	<link type="text/css" rel="stylesheet" href="./EF/SyntaxHighlighter/SyntaxHighlighter.css"></link>

</head>
<body class="bodyBackground">
<form id="EEDM23" method="POST" action="<%=actionUrl%>" >
	<jsp:include flush="false" page="../../EF/Form/iplat.ef.head.jsp"></jsp:include>



<div id="divStatus" style="color: blue"></div>
<div id = "ef_region_inqu" title="查询条件" efRegionShowClear=true>
	<div style="overflow:hidden;width:100%">
		<table>
		  <tr>
		    <td nowrap width="15%">
		      数据一
		    </td>
		    <td nowrap width="20%">
		    <EF:EFInput blockId="inqu_status" ename="double1" row="0" />
		    </td>
		  </tr>
		</table>
	</div>
</div>



<div id = "ef_region_result" title="记录集" style="overflow:scroll">
	<div id = "ef_grid_result" title="页面信息" style="overflow: auto;height:300px;">
		<%if(showtype.equals("1")){%>
		<EF:EFHtmlGrid blockId="result"/>
		<%}else if(showtype.equals("2")){%>
		<EF:EFHtmlGrid blockId="result" isPager="true"/>
		<input type="hidden" id="showtype" name="showtype" value="2"/>
		<%}else if(showtype.equals("3")){%>
		<EF:EFHtmlGrid blockId="result" isSeq="true"/>
		<%}else if(showtype.equals("4")){%>
		<EF:EFHtmlGrid blockId="result" showColumns="double1,double2,double3"/>
		<%}else if(showtype.equals("5")){%>
		<EF:EFHtmlGrid blockId="result">
			<EF:EFHtmlColumn cname="数据一换名" ename="double1" width="100"></EF:EFHtmlColumn>
		  	<EF:EFHtmlColumn cname="数据二换名" ename="double2" width="200" displayType="BigDecimal" format="$#,###,##0.000"/>
		</EF:EFHtmlGrid>
		<%}else if(showtype.equals("6")){%>
		<EF:EFHtmlGrid blockId="result"/>
		<%}else if(showtype.equals("genSubgGid")){%>
		<EF:EFHtmlGrid blockId="result" isGroup="true"/>
		<%}else{%>
		<EF:EFHtmlGrid blockId="result"/>
		<%}%>
	</div>
</div>

<div id="ef_region_link" title="页面功能展示按钮" style="overflow:hidden"/>
	<div style="overflow:hidden;width:100%">
	<table>
		<tr><td nowrap width="25%">页面功能按钮</td><td></td></tr>
	</table>
	</div>
</div>
<div id="ef_region_linkdesc" title="页面帮助及链接" style="overflow:hidden"/>
	<div style="overflow:hidden;width:100%">
		<table  cellpadding=0 cellspacing=0 style='border-top:1px solid #A6C9E2;border-right:1px solid #A6C9E2;'>
			<tr><td nowrap width="25%" >EF:EFHtmlGrid标签属性</td><td>
				<table cellpadding=0 cellspacing=0 class='ef-grid-border'><tr  class="tableRow0"><td>blockId</td><td>所在页面Ei中待渲染的block名</td></tr>
				<tr  class="tableRow1"><td>showColumns</td><td>显示哪些列</td></tr>
				<tr class="tableRow0"><td>isSeq</td><td>是否采用行序号</td></tr>
				<tr class="tableRow1"><td>isPager</td><td>是否采用翻页处理</td></tr>
				<tr class="tableRow0"><td>columns</td><td>自定义列集合</td></tr>
				</table>
			</td></tr>
		</table>
		<table  cellpadding=0 cellspacing=0 style='border-top:1px solid #A6C9E2;border-right:1px solid #A6C9E2;'>
			<tr class="tableRow0"><td>演示方法1</td><td>&lt EF:EFHtmlGrid blockId="result"/ &gt </td><td>默认block全字段输出</td></tr>
			<tr class="tableRow1"><td>演示方法2</td><td>&lt EF:EFHtmlGrid blockId="result" isPager="true"/ &gt </td><td>默认block全字段输出，且含分页格式</td></tr>
			<tr class="tableRow0"><td>演示方法3</td><td>&lt EF:EFHtmlGrid blockId="result" isSeq="true" &gt</td><td>默认block全字段输出，且有序列号列表</td></tr>
			<tr class="tableRow1"><td>演示方法4</td><td>&lt EF:EFHtmlGrid blockId="result" showColumns="double1,double2,double3"/ &gt </td><td>指定字段及其格式输出</td></tr>
			<tr class="tableRow0"><td>演示方法5</td><td>&lt EF:EFHtmlGrid blockId="result"&gt <br>
					 &lt EF:EFHtmlColumn cname="数据一换名" ename="double1" width="100"&gt &lt /EF:EFHtmlColumn&gt <br>
		  	         &lt EF:EFHtmlColumn cname="数据二换名" ename="double2" width="200" displayType="BigDecimal" format="$#,###,##0.000"/ &gt <br>
		             &lt/EF:EFHtmlGrid &gt / &gt  </td><td>指定字段名输出</td></tr>
			<tr class="tableRow1"><td>演示方法6</td><td>&lt EF:EFHtmlGrid blockId="result"/ &gt </td><td>1000行数据输出</td></tr>
		</table>
	</div>
</div>
 <EF:EFRegion/>


<jsp:include flush="false" page="../../EF/Form/iplat.ef.tail.jsp"></jsp:include>
</form>

</body>
</html>
