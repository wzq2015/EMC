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
	<script type="text/javascript" src="./EE/EE60Z.js"></script>
	
</head>
<body class="bodyBackground">

<form id="EDFA00" method="POST" action="<%=actionUrl%>" >

<jsp:include flush="false" page="../EF/Form/iplat.ef.head.jsp"></jsp:include>

<div id = "ef_region_inqu" title="查询条件" efRegionShowClear=true>
	<%-- <div style="overflow:hidden;width:100%">
		<table>
		  <tr>
		    <td nowrap width="15%">
		      页面代号
		    </td>
		    <td nowrap width="20%">
		    <EF:EFInput blockId="inqu_status" ename="form_ename" row="0" style="text-transform : uppercase;" etc="validateType='string' "/>
		    </td>
		    <td nowrap width="15%">
		      页面中文
		    </td>
		    <td nowrap width="20%">
		    <EF:EFInput blockId="inqu_status" ename="form_cname" row="0"/>
		    </td>
		    <td nowrap width="15%">
		      页面类型
		    </td>
		    <td nowrap >
		    <EF:EFSelect blockId="inqu_status" ename="form_type" row="0" >
		    <EF:EFOption label="全部" value="" />
		    <EF:EFOptions conj="-" blockId="formTypeDesc" labelColumn="form_type_desc" valueColumn="form_type"/>
		    </EF:EFSelect>
		    </td>
		  </tr>
		  <tr>
		    <td nowrap >
		      记录创建起始时刻
		    </td>
		    <td nowrap >
		    	<EF:EFInput blockId="inqu_status" ename="rec_create_time_start" row="0" />
					<img title="日历选择" src="./EF/Images/efcalendar_icon.gif" onmouseover="javascript:this.style.cursor='hand'" onClick="efcalendar_click(this,'inqu_status-0-rec_create_time_start');">
		    </td>
		    <td nowrap >
		      记录创建截止时刻
		    </td>
		    <td nowrap >
		    	<EF:EFInput blockId="inqu_status" ename="rec_create_time_end" row="0" />
					<img title="日历选择" src="./EF/Images/efcalendar_icon.gif" onmouseover="javascript:this.style.cursor='hand'" onClick="efcalendar_click(this,'inqu_status-0-rec_create_time_end');">
		    </td>
		  </tr>
		  
		</table>
	</div>
	 --%>
	 
	 		<table>
		  <tr>
		    <td nowrap width="15%">
		      页面代号
		    </td>
		    <td nowrap width="20%">
		    <EF:EFInput blockId="" ename="count_i" row="" />
		    </td>
		  </tr>
		</table>
	 
</div>  

<div id = "ef_region_result" title="记录集" style="overflow:scroll"> 
	<div id = "ef_grid_result" title="页面信息" style="overflow: hidden;height:300px;">
	</div> 
</div>     
  
<EF:EFRegion/>

<EF:EFGrid blockId="result" autoDraw="yes" readonly="false" >	
</EF:EFGrid>      

<jsp:include flush="false" page="../EF/Form/iplat.ef.tail.jsp"></jsp:include>
</form>

</body>
</html>   
