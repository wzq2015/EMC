
<%@ page contentType="text/html; charset=UTF-8"%>

<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF.tld" %>
<%
	String actionUrl = request.getContextPath() + "/DispatchAction.do";
%>

<html>
<head>
	<meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
	<title>
	</title>
	
	<script type="text/javascript" src="./EF/EF.js"></script>
	<script type="text/javascript" src="./ER/ER10.js"></script>
	
</head>
<body class="bodyBackground">

<form id="ER10" method="POST" action="<%=actionUrl%>" >

<jsp:include flush="false" page="../EF/Form/EFFormHead.jsp"></jsp:include>

<div id = "ef_region_inqu" title="查询条件" efRegionShowClear=true>
	<div style="overflow:hidden;width:100%">
		<table>
		  <tr>
		    <td width="20%" align="right">
		      报表标识
		    </td>
		    <td width="20%">
		      <EF:EFInput blockId="inqu_status" ename="reportId" row="0" />
		    </td>
		    <td width="10%" align="right">
		      报表归属
		    </td>
		    <td width="20%">
		      <EF:EFInput blockId="inqu_status" ename="reportBelongTo" row="0" />
		    </td>
		    <td width="10%" align="right">
		      报表版本号
		    </td>
		    <td width="20%">
		      <EF:EFInput blockId="inqu_status" ename="reportVersion" row="0" />
		    </td>
		  </tr>
		  <tr>
		    <td width="20%" align="right">
		      报表文件名
		    </td>
		    <td width="20%">
		      <EF:EFInput blockId="inqu_status" ename="reportFileName" row="0" />
		    </td>
		    <td width="10%" align="right">
		    </td>
		    <td width="20%">
		    </td>
		    <td width="10%" align="right">
		    </td>
		    <td width="20%">
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
<EF:EFGrid blockId="result" autoDraw="yes" enable="false" >	
  <EF:EFColumn ename="reportFileName" cname="文件名" width="250" fix="yes"  />
  <EF:EFColumn ename="reportId" cname="ID" width="50" visible="no"  />
  <EF:EFColumn ename="reportBelongTo" cname="归属" width="50" visible="no" />
  <EF:EFColumn ename="reportVersion" cname="版本" width="30" visible="no" />
  <EF:EFColumn ename="recCreator" cname="创建人" width="50"/>
  <EF:EFColumn ename="recCreateTime" cname="创建时间" visible="no"  />
  <EF:EFColumn ename="recRevisor" visible="no" />
  <EF:EFColumn ename="recReviseTime" visible="no" />
  <EF:EFColumn ename="archiveFlag" visible="no" />
  <EF:EFColumn ename="view" cname="查看" width="40"/>	
</EF:EFGrid>      

<jsp:include flush="false" page="../EF/Form/EFFormTail.jsp"></jsp:include>
</form>

</body>
</html>   
