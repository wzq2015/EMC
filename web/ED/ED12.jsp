<!DOCTYPE html>
<%@page contentType="text/html;charset=UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
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
	<script type="text/javascript" src="./ED/ED12.js"></script>

</head>
<body class="bodyBackground">
<form id="ED12" method="POST" action="<%=actionUrl%>">

<jsp:include flush="false" page="../EF/Form/iplat.ef.head.jsp"></jsp:include>

<div id = "ef_region_inqu" title="查询条件" efRegionShowClear=true>
	<div  style="overflow:hidden;width:100%">
		 <table>
		  <tr>
		    
		    <td width="25%">
		      资源信息键
		    </td>
		    <td width="25%">
		      <EF:EFInput blockId="inqu_status" ename="fkey" row="0" />
		    </td>
		    <td width="25%">资源后缀</td>
		    <td width="25%">
		      <EF:EFInput blockId="inqu_status" ename="fsuffix" row="0" />
		    </td> 
		  </tr>
		</table> 
	</div>
</div>

<div id = "ef_region_result" title="记录结果" style="overflow:scroll">
	<div  style="overflow:hidden;width:100%">
		 <table>
		  <tr>
		    
		    <td width="25%">
		      资源信息键
		    </td>
		    <td width="25%">
		      <EF:EFInput blockId="result" ename="fkey" row="0" />
		    </td>
		    <td width="25%">资源后缀</td>
		    <td width="25%">
		      <EF:EFInput blockId="result" ename="fsuffix" row="0" />
		    </td> 
		  </tr>
		</table> 
		 <table>
		  <tr>
		    
		    <td width="15%">
		      问题描述
		    </td>
		    <td width="85%">
				<EF:EFInput blockId="result" ename="question_desc" row="0"
						type="textarea"
						etc="cols='70' rows='12' validateType='text' " />	
		    </td>
		  </tr>
		  <tr>
		    <td width="15%">解决方法描述</td>
		    <td width="85%">
				<EF:EFInput blockId="result" ename="solution_desc" row="0"
						type="textarea"
						etc="cols='70' rows='12' validateType='text' " />	
		    </td> 
		  </tr>
		</table> 

	</div>
</div>

<EF:EFRegion/>

<jsp:include flush="false" page="../EF/Form/iplat.ef.tail.jsp"></jsp:include>
</form>

</body>
</html>
