<!DOCTYPE html>
<%@page pageEncoding="UTF-8" contentType="text/html;charset=UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>
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
	<script type="text/javascript" src="./EL/ELEX00.js"></script>
	
</head>
<body class="bodyBackground">
<form id="forms" method="POST" action="<%=listUrl%>">

<jsp:include flush="false" page="../EF/Form/iplat.ef.head.jsp"></jsp:include>

<div id = "ef_region_inqu" title="查询条件">
	<div>
		<table>
		  <tr>
		    <td noWarp=-1 width="25%">
		      异常类型
		    </td>
		    <td noWarp=-1 width="25%">
			  <input type="text" name="inqu_status:0:exceptionType" value="${inqu.rows[0].exceptionType}" class = "inputField" />
		    </td>
		    <td noWarp=-1 width="25%">
		      
		    </td>
		    <td noWarp=-1 width="25%">
		    </td>
		  </tr>
		  <tr>
		    <td >
		      时间上限
		    </td>
		    <td >
			  <input type="text" name="inqu_status:0:startDat" value="${inqu.rows[0].startDat}" class = "inputField" />
					<img id="efcalendar1" 
					onload="efico.setImageSrc(this,'efcalendar.iconImg')" src="./EF/Images/eftree_blank.png"
					 onClick="efcalendar_1_click(this);">
		    </td>
		    <td >
		      时间下限
		    </td>
		    <td >
			  <input type="text" name="inqu_status:0:endDate" value="${inqu.rows[0].endDate}" class = "inputField" />
					<img id="efcalendar2" 
					onload="efico.setImageSrc(this,'efcalendar.iconImg')" src="./EF/Images/eftree_blank.png"
					 onClick="efcalendar_2_click(this);">
		    </td>
		  </tr>
		</table>
	</div>
</div>  

<div id = "ef_region_result" title="记录集" style="overflow:scroll"> 
	<div id = "ef_grid_r" title="页面信息" style="overflow: hidden;">
	</div> 
</div>     
  
<EF:EFRegion/>

<EF:EFGrid blockId="r" autoDraw="no" readonly="true">	
	<EF:EFColumn ename="time" cname="时间" fix="no" />
	<EF:EFColumn ename="exceptionType" cname="异常类型" fix="no" />
	<EF:EFColumn ename="exceptionInfo" cname="异常信息" fix="no" />
<%--	
    <EF:EFColumn ename="timelong" cname="详细信息" fix="no"  displayType="hyperlink" />
	<EF:EFColumn ename="test" cname="just test" fix="no" />
--%>
	

</EF:EFGrid>      

<jsp:include flush="false" page="../EF/Form/iplat.ef.tail.jsp"></jsp:include>
</form>

</body>
</html>   
