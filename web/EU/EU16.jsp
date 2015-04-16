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
<script type="text/javascript" src="./EU/EU16.js"></script>

</head>
<body class="bodyBackground">
	<form id="EU16" method="POST" action="<%=actionUrl%>" >
		<jsp:include flush="true" page="../EF/Form/iplat.ef.head.jsp"></jsp:include>
		<div id="ef_region_connect" title="主机连接信息"  efRegionShowClear=true>
		<table  border="0">
		<tr>
		<td>
		主机名称：
		<EF:EFInput  blockId="connect"  ename="hostname"  row="0" style="text-align:left;" />
		<img title="<%=I18nMessages.getText("label.LATESTHOST","常用主机列表") %>" id="popupWindowId" 
				onload="efico.setImageSrc(this,'efform.efPopupWindow')" src="./EF/Images/eftree_blank.png"
				onmouseover="this.style.cursor='hand'" onClick="openSubGrid()" />
		主机账号：
		<EF:EFInput  blockId="connect"   ename="username"  row="0" style="text-align:left;" />
		密码：
		<EF:EFInput  blockId="connect"  type="password" ename="password"  row="0" style="text-align:left;" />
		 &nbsp;<%=I18nMessages.getText("EU16.helpinfo","提示：输入多个命令，中间用\"&&\"隔开,如：pwd&&ls") %>
		</td>
		</tr>
		<tr>
		<td>输入命令：
		<EF:EFInput blockId="inqu_status"   ename="command" row="0" etc="style='text-align:left;width:800px' onkeydown='onPressEnter()'" />
		<img title="<%=I18nMessages.getText("label.LATESTCOMMAND","常用命令列表") %>" id="popupWindowId" 
				onload="efico.setImageSrc(this,'efform.efPopupWindow')" src="./EF/Images/eftree_blank.png"
				onmouseover="this.style.cursor='hand'" onClick="openCommandList()" />
		</td>
		<td>
		<EF:EFButton ename="query" type="button" cname="提交" />
		 </td>		
		</tr>
		</table>			
		</div>
		<div id="ef_region_inqu" title="控制台" efRegionShowClear=true>
		<div style="overflow:hidden;width:100%">		
		<EF:EFInput  blockId="result" ename="output" row="0" type="textarea"  trim="false" 
									etc="minLength='0' style='background:black;color:green' cols='200' rows='30' value=''"/>
		</div>		
		</div>
		<EF:EFRegion />				
		<jsp:include flush="false" page="../EF/Form/iplat.ef.tail.jsp"></jsp:include>
	</form>
</body>
</html>
