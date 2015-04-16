<!DOCTYPE html>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page import="com.baosight.iplat4j.core.soa.SoaConfig" %>
<%@ page import="com.baosight.iplat4j.core.soa.SoaConstants" %>
<%@ page import="com.baosight.iplat4j.core.spring.SpringApplicationContext" %>
<%@ page import="com.baosight.iplat4j.core.resource.I18nMessages" %>
<%@ page import="com.baosight.iplat4j.core.FrameworkInfo" %>

<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>
<%
	String actionUrl = request.getContextPath() + "/DispatchAction.do";
%>

<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title></title>

<script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
<script type="text/javascript" src="./EL/EL02.js"></script>

</head>
<body class="bodyBackground">
	<form id="EL02" method="POST" action="<%=actionUrl%>" >
		<jsp:include flush="true" page="../EF/Form/iplat.ef.head.jsp"></jsp:include>
		<div id="ef_region_inqu" title="<%=I18nMessages.getText("label.EFQueryConditions", "查询条件")%>"  efRegionShowClear=true>
		<div id = "ef_div_inqu" style = "overflow:hidden;width:100%">
		<table  border="0">
		<tr>
		<td>
		节点地址：
		<EF:EFInput blockId="inqu_status" ename="nodeURL" row="0" etc="nullable='false'" style="width:250px;" />
		<img title="Hazelcast节点" id="popupWindowId" 
				onload="efico.setImageSrc(this,'efform.efPopupWindow')" src="./EF/Images/eftree_blank.png"
				onmouseover="this.style.cursor='hand'"" onClick="openSubGrid();" />		
		</td>
		</tr>	
		</table>			
		</div>
		</div>
		<div id = "ef_region_result" title="<%=I18nMessages.getText("label.EFRecordSet","记录集") %>" style="overflow:scroll"  efRegionShowClear = true> 
		<div id = "ef_grid_result" title="日志信息" style="overflow: hidden;height:275px;">
		</div> 
		</div>
		<EF:EFRegion />
		<EF:EFInput blockId="inqu_status" ename="nodeType" row="0" type="hidden"/>
		<EF:EFGrid blockId = "result" autoDraw = "false"  ajax = "true" readonly="false">
		<EF:EFColumn ename="name" cname='<%=I18nMessages.getText("label.logfilename","日志文件名") %>' sort="true" readonly="true" width="200" />
		<EF:EFColumn ename="archiving" cname='<%=I18nMessages.getText("label.ifarchive","是否正在归档") %>' readonly="true" width="200" />
		<EF:EFColumn ename="archivingTime" cname='<%=I18nMessages.getText("label.archivetime","归档时间") %>'  readonly="true" width="200" />
		<EF:EFColumn ename="archive" enable="false" cname='<%=I18nMessages.getText("label.archivetime","归档") %>'  displayType="textbutton"  width="200" />
		</EF:EFGrid>			
		<jsp:include flush="false" page="../EF/Form/iplat.ef.tail.jsp"></jsp:include>
	</form>
</body>
</html>
