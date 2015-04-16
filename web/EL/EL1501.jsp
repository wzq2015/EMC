<!DOCTYPE html>
<%@page contentType="text/html; charset=UTF-8"%>
<%@taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>
<%@page import="com.baosight.iplat4j.core.resource.I18nMessages"%>
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
	<script type="text/javascript" src="./EL/EL1501.js"></script>
	
</head>
<body class="bodyBackground">

<form id="EL1501" method="POST" action="<%=actionUrl%>" >
<jsp:include flush="false" page="../EF/Form/iplat.ef.head.jsp"></jsp:include>

<div id = "ef_region_inqu" title="<%=I18nMessages.getText("label.EFQueryConditions","查询条件") %>" efRegionShowClear=true>
	<div style="overflow:hidden;width:100%">
		<table>
		  <tr>
		  <td nowrap width="15%">
			 <%=I18nMessages.getText("label.ELFormUrl","页面号") %>
			 </td>
			<td nowrap width=25%">
			<EF:EFInput blockId="inqu_status" ename="furl" row="0" />
			</td>  
		  
		   <td nowrap width="15%">
		      <%=I18nMessages.getText("label.ELTimeStart","访问时间") %>
		    </td>
		    <td nowrap width="20%">
		     <EF:EFInput blockId="inqu_status" ename="recTimeStart" row="0" popup="date" etc="maxLength='8' size='8'"/>
		     </td>
		     <td nowrap width="10%">
		     <%=I18nMessages.getText("label.ELTimeTo","至") %>:
		     </td >
		     <td nowrap width="20%">
		     <EF:EFInput blockId="inqu_status" ename="recTimeEnd" row="0" popup="date" etc="maxLength='8' size='8'"/>
		    </td>
		  
		      		   
            </tr>
         </table>
	</div>
</div>

<div id = "ef_region_result" title="<%=I18nMessages.getText("label.EFRecordSet","记录集") %>" style="overflow:scroll"> 
	<div id = "ef_grid_result" title="<%=I18nMessages.getText("label.EFPageInformation","页面信息") %>" style="overflow: hidden;height:300px;">
	</div> 
</div>     
  
<EF:EFRegion/>
<EF:EFGrid blockId="result" autoDraw="true" enable="false">
	
</EF:EFGrid> 
     
<jsp:include flush="false" page="../EF/Form/iplat.ef.tail.jsp"></jsp:include>
</form>

</body>
</html>   
