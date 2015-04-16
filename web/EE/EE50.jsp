<!DOCTYPE html>
<%@page contentType="text/html;charset=UTF-8"%>
<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@page import="java.util.*" %>
<%@page import="com.baosight.iplat4j.ef.ui.column.*" %>
<c:set var="r" value="${ei.blocks.r}"/>
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
	<script type="text/javascript" src="./EE/EE50.js"></script>
		<script class="javascript" src="./EF/SyntaxHighlighter/shCore.js"></script>
	<script class="javascript" src="./EF/SyntaxHighlighter/shBrushJScript.js"></script>
	<script class="javascript" src="./EF/SyntaxHighlighter/shBrushXmlOrJsp.js"></script>
	<link type="text/css" rel="stylesheet" href="./EF/SyntaxHighlighter/SyntaxHighlighter.css"></link>
</head>

<body class="bodyBackground">
<jsp:include flush="false" page="../EF/Form/iplat.ef.head.jsp"></jsp:include>

<table>
<tr>
<td>
<div id = "ef_region_result" title="记录集" style="overflow:scroll">
	<div id = "ef_grid_result" title="页面信息" style="overflow: hidden;height:300px;">
	</div>
</div>
</td>
<td>
<img id="image" width="300px" height="320px" src="./EE/uploadjsp/showimage1.jsp?id=5">
</td>
</tr>
</table>



<EF:EFRegion/>
<EF:EFGrid paintId="ef_grid_result" blockId="result" ajax="true" enable="false" autoDraw="no" readonly="false" serviceName="EE50" queryMethod="query">
<EF:EFColumn ename="id" cname="序号" fix="yes"/>
<EF:EFColumn ename="name" cname="文件名" />
<EF:EFColumn ename="upload" enable="false"  cname="上传"/>
<EF:EFColumn ename="download" enable="false" cname="下载"/>

</EF:EFGrid>

<div id = "efwindow_id" class="efwindow">
<img id="image2" width="300px" height="300px" src="./EE/uploadjsp/showimage1.jsp?id=5">
</div>
<div id="ef_tab_x"  lastRange="99.2%" eftabType="efRoundDivTab">
	<div id="org" title="插入空Blob字段" >
	1.在往带有blob字段的表中插入blob字段的时候，<br>
	可以先插入：empty_blob() 进行blob字段初始化<br>
	这个可在ibatise的xml配置文件中配置。<br>
	</div>
	<div id="lead" title="判断空Blob字段" eftabSrc="" >
	2.判断是否为空的blob字段，用法如下： <br>
	DBMS_LOB.GETLENGTH(blob字段名)>0 <br>
	DBMS_LOB.GETLENGTH(blob字段名) <br>
	大于0则不为空，否则表示blob字段为空。	<br>
	</div>
 </div>
<EF:EFTab tabId="x"/>
<br>
<iframe id = "downloadObject" width=0 height=0></iframe>
<font color="blue" bold><a style='cursor:pointer' onclick="downloadObject()"> 下载文件对象</a></font>
<input id='url' type="hidden" value="<%=actionUrl %>">


<script type="text/javascript">
function upload(id){
	left1=(screen.availWidth-400)/2 ;
	top1=(screen.availHeight-200)/2 ;
	window.open("./EE/uploadjsp/filechoose.jsp?id="+id,"","left="+left1+",top="+top1+",width=400,height=200,resizable=yes,depend=yes");
}
function showimage(id){
	document.getElementById("image").src="./EE/uploadjsp/showimage1.jsp?id="+id;
}
function popwindow(node,id){
	document.getElementById("image2").src="./EE/uploadjsp/showimage1.jsp?id="+id;
	efwindow.show(node,'efwindow_id');
}

function downloadObject(){
	ef.get("downloadObject").src=ef.get("url").value+"?efFormEname=EU00&serviceName=EDFA00&methodName=query";
}
</script>

<!-- 代码展示  -->
<div id = "ef_region_codeDemo" title="示例代码">
<div id="ef_tab_h"  lastRange="99%" eftabType="efRoundDivTab">
	<div id="jsp" title="JSP 源代码" >
	<textarea  name="codeh" class="html">

&lt;table&gt;
&lt;tr&gt;
&lt;td&gt;
&lt;div id = "ef_region_result" title="记录集" style="overflow:scroll"&gt;
	&lt;div id = "ef_grid_result" title="页面信息" style="overflow: hidden;height:300px;"&gt;
	&lt;/div&gt;
&lt;/div&gt;
&lt;/td&gt;
&lt;td&gt;
&lt;img id="image" width="300px" height="320px" src="./EE/uploadjsp/showimage1.jsp?id=5"&gt;
&lt;/td&gt;
&lt;/tr&gt;
&lt;/table&gt;



&lt;EF:EFRegion/&gt;
&lt;EF:EFGrid paintId="ef_grid_result" blockId="result" ajax="true" enable="false" autoDraw="no" readonly="false" serviceName="EE50" queryMethod="query"&gt;
&lt;EF:EFColumn ename="id" cname="序号" fix="yes"/&gt;
&lt;EF:EFColumn ename="name" cname="文件名" /&gt;
&lt;EF:EFColumn ename="upload" enable="false"  cname="上传"/&gt;
&lt;EF:EFColumn ename="download" enable="false" cname="下载"/&gt;

&lt;/EF:EFGrid&gt;

&lt;div id = "efwindow_id" class="efwindow"&gt;
&lt;img id="image2" width="300px" height="300px" src="./EE/uploadjsp/showimage1.jsp?id=5"&gt;
&lt;/div&gt;
&lt;div id="ef_tab_x"  lastRange="99.2%" eftabType="efRoundDivTab"&gt;
	&lt;div id="org" title="插入空Blob字段" &gt;
	1.在往带有blob字段的表中插入blob字段的时候，&lt;br&gt;
	可以先插入：empty_blob() 进行blob字段初始化&lt;br&gt;
	这个可在ibatise的xml配置文件中配置。&lt;br&gt;
	&lt;/div&gt;
	&lt;div id="lead" title="判断空Blob字段" eftabSrc="" &gt;
	2.判断是否为空的blob字段，用法如下： &lt;br&gt;
	DBMS_LOB.GETLENGTH(blob字段名)&gt;0 &lt;br&gt;
	DBMS_LOB.GETLENGTH(blob字段名) &lt;br&gt;
	大于0则不为空，否则表示blob字段为空。	&lt;br&gt;
	&lt;/div&gt;
 &lt;/div&gt;
&lt;EF:EFTab tabId="x"/&gt;
&lt;br&gt;
&lt;iframe id = "downloadObject" width=0 height=0&gt;&lt;/iframe&gt;
&lt;font color="blue" bold&gt;&lt;a style='cursor:pointer' onclick="downloadObject()"&gt; 下载文件对象&lt;/a&gt;&lt;/font&gt;
&lt;input id='url' type="hidden" value="&lt;%=actionUrl %&gt;"&gt;


&lt;script type="text/javascript"&gt;
function upload(id){
	left1=(screen.availWidth-400)/2 ;
	top1=(screen.availHeight-200)/2 ;
	window.open("./EE/uploadjsp/filechoose.jsp?id="+id,"","left="+left1+",top="+top1+",width=400,height=200,resizable=yes,depend=yes");
}
function showimage(id){
	document.getElementById("image").src="./EE/uploadjsp/showimage1.jsp?id="+id;
}
function popwindow(node,id){
	document.getElementById("image2").src="./EE/uploadjsp/showimage1.jsp?id="+id;
	efwindow.show(node,'efwindow_id');
}

function downloadObject(){
	ef.get("downloadObject").src=ef.get("url").value+"?efFormEname=EU00&serviceName=EDFA00&methodName=query";
}
&lt;/script&gt;
	</textarea>
</div>
<div id="javascript" title="Javasript 源代码" >
	<textarea name="codeh" class="javascript">
efform_onload = function()
{
	efregion.toggleShow("ef_region_codeDemo");
}
efgrid_onCellDisplayReady = function( div_node_html, row_index, col_index, col_value_c, display_value ){
	  var grid = efgrid.getGridObject( "ef_grid_result" );

	  var cellValue = grid.getCellValue(row_index,0,TYPE_DATA);
	  var id = grid.getCellValue(row_index,1,TYPE_FIX);


	  if( col_index == 1 ){

	    if("" != id)
	    	return "\<input value='上传' class='buttonClass' type='button' onclick='showUpdateWindow(\""+id+"\",\""+row_index+"\")'>" ;
	    else
	    	return "";
	  }
	  if(col_index == 2){
	    if("" !=cellValue)
	    	return "\<a href='./EE/uploadjsp/downfromdbtoclient.jsp?id="+id+"'>下载</a>" ;
	    else
	    	return "" ;
	  }
}

showUpdateWindow = function(id,row){
	left1=(screen.availWidth-400)/2 ;
	top1=(screen.availHeight-200)/2 ;
	window.open("./EE/uploadjsp/filechoose.jsp?id="+id+"&rowIndex="+row,"","left="+left1+",top="+top1+",width=400,height=200,resizable=yes,depend=yes");

}

efgrid_onRowClicked = function (id ,row_index){
	var grid = efgrid.getGridObject(id);
	showimage(grid.getCellValue(row_index,1,TYPE_FIX));

}

uploadSuc = function (id,row){
	var grid = efgrid.getGridObject("ef_grid_result");

	grid.setCellValue(row,0,id,TYPE_DATA);

	grid.refreshCell(row,0,TYPE_DATA);

}
	</textarea>
 </div>
 </div>
<EF:EFTab tabId="h" action="fundivh"/>
<script type="text/javascript">
	dp.SyntaxHighlighter.HighlightAll('codeh');
</script>
</div>
<script type="text/javascript">
var tab1 = ef.get("jsp");
var tab  = tab1.parentNode;
tab.style.height = "";
tab1.style.display = "block";
tab1.style.height = "";
tab1.style.width = "100%";
var tab2 = ef.get("javascript");
tab2.style.height = "";
tab2.style.width = "100%";
</script>
<jsp:include flush="false" page="../EF/Form/iplat.ef.tail.jsp"></jsp:include>
</body>
</html>
