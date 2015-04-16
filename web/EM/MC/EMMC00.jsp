<!DOCTYPE html>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@page import="com.baosight.iplat4j.core.soa.SoaConfig" %>
<%@page import="com.baosight.iplat4j.core.soa.SoaConstants" %>
<%@page import="com.baosight.iplat4j.core.spring.SpringApplicationContext" %>
<%@page import="com.baosight.iplat4j.core.resource.I18nMessages" %>
<%@page import="com.baosight.iplat4j.core.FrameworkInfo" %>
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
	<%=I18nMessages.getText("label.MGSTYPECONFIG", "消息类型配置页面")%>
	</title>	
	<script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
	<script type="text/javascript" src="./EM/MC/EMMC00.js"></script>
	
</head>
<body class="bodyBackground">

<form id="EMMC00" method="POST" action="<%=actionUrl%>" >

<jsp:include flush="true" page="../../EF/Form/iplat.ef.head.jsp"></jsp:include>
<div id = "ef_region_inqu" title="<%=I18nMessages.getText("label.EFQueryConditions", "查询条件")%>" efRegionShowClear=true>
	<div id = "ef_div_inqu" style="overflow:hidden;width:100%">
		<table>
		  <tr>
		    <td nowrap width="15%">
		      <%=I18nMessages.getText("E_Col.msgCODE","消息编码") %>
		    </td>
		    <td nowrap width="20%">
		    <EF:EFInput blockId="inqu_status" ename="msgCode" row="0" style="text-transform : uppercase;" etc="validateType='string'"/>				
		    </td>
		    <td nowrap width="15%">
		      <%=I18nMessages.getText("E_Col.MSGAPPENAME","应用名称") %>
		    </td>
		    <td nowrap width="20%">
		    <EF:EFInput blockId="inqu_status" ename="appEname" row="0" />
		    </td>
		    <td nowrap width="15%">
		     <%=I18nMessages.getText("E_Col.MSGTYPE"," 消息类型") %>
		    </td>  
		    <td nowrap >
		 	<EF:EFInput blockId="inqu_status" ename="msgType" row="0" />
		    </td>
		  </tr>
		</table>
	</div>
</div>  

<div id = "ef_region_result" style="overflow:scroll" title="<%=I18nMessages.getText("label.msgsetting", "消息配置信息")%>" efRegionShowClear=true>
	<div id = "ef_grid_result" title="<%=I18nMessages.getText("label.msgsetting", "消息配置信息")%>" style="overflow: hidden;height:275px;">		
	</div>
</div>
<EF:EFRegion/>

<EF:EFGrid blockId="result" autoDraw="no" readonly="false">	
	<EF:EFColumn ename="msgCode" cname="消息编号" fix="no" width="80" />
	<EF:EFColumn ename="msgFunctionid" cname="消息功能编号" fix="no" width="80" />
	<EF:EFColumn ename="appEname"  cname="应用简称" width="80" />
	<EF:EFColumn ename="msgType" cname="消息类型" width="80" />
	<EF:EFColumn ename="subscribeType" cname="订阅类型" width="80" />
	<EF:EFColumn ename="msgDesc" cname="消息内容" width="80" />
	<EF:EFColumn ename="attribute1" cname="消息属性一" width="80" />
	<EF:EFColumn ename="attribute2" cname="消息属性二" width="80" />
	<EF:EFColumn ename="attribute3" cname="消息属性三" width="80" />
	<EF:EFColumn ename="rec_creator" enable="false" visible="false"/>
	<EF:EFColumn ename="rec_create_time" enable="false" visible="false"/>
	<EF:EFColumn ename="rec_revisor" enable="false" visible="false"/>
	<EF:EFColumn ename="rec_revise_time" enable="false" visible="false"/>
	<EF:EFColumn ename="archive_flag" enable="false" visible="false"/>
</EF:EFGrid>   

<jsp:include flush="false" page="../../EF/Form/iplat.ef.tail.jsp"></jsp:include>
</form>

</body>
</html>   
