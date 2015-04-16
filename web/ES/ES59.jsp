<!DOCTYPE html>
<%@page pageEncoding="UTF-8" contentType="text/html;charset=UTF-8"%>

<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld"%>

<%
	String contextpath = request.getContextPath();
	String baseUrl = contextpath;
	String listUrl = baseUrl + "/DispatchAction.do";
%>
<%@page import="com.baosight.iplat4j.core.resource.I18nMessages"%>
<html>
<head>
<script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
<script type="text/javascript" src="./ES/ES59.js"></script>
</head>

<body class="bodyBackground">
<form method="POST" action="<%=listUrl%>">
<jsp:include flush="false" page="../EF/Form/iplat.ef.head.jsp"></jsp:include>
<EF:EFInput blockId="inqu_status" ename="name" row="0" type="hidden"></EF:EFInput>
  <div id = "ef_region_inqu" title="<%=I18nMessages.getText("label.ESPermTest","权限测试") %>" efRegionShowClear=true>
  	<div style="overflow:hidden;width:100%">
	  <table>
	    <tr>
		  <td  nowrap width="15%"><%=I18nMessages.getText("label.ESRescourceId","资源代码") %></td>
		  <td>
		    <EF:EFInput blockId="inqu_status" ename="permission" row="0" etc="style='text-transform : uppercase;'"/>					
		  </td>
		  <td  nowrap width="15%"><%=I18nMessages.getText("label.ESTestUser","测试用户") %></td>
		  <td>
		    <EF:EFInput blockId="inqu_status" ename="user" row="0" />					
		  </td>
		</tr>		
	   </table> 
	</div>
  </div>



<EF:EFRegion /> 


</form>
</body>
</html>
