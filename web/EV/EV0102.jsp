
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF.tld"%>
<%@page import="com.baosight.iplat4j.common.ev.domain.Tevcm08"%>
<c:set var="ctx" value="${pageContext.request.contextPath }" />
<%@page import="com.baosight.iplat4j.core.ei.EiInfo"%>
<%@page import="com.baosight.iplat4j.ev.util.*"%>
<%@page import="java.util.*"%>

<%
	EiInfo Info=(EiInfo)request.getAttribute("ei");
	List portalList = (List)Info.get("portalList");
	String pageNum = Info.getString("pageNum");
	String themaPath = request.getParameter("themaPath");
	String useNode = Info.getString("useNode");
%>
<HEAD>
<title>门户首页table页面</title>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<link href="./EV/skins/default/ev.css" rel="stylesheet" type="text/css" />
<link href="./EV/skins/<%=themaPath%>/ev.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="./EF/EF.js"></script>
<script type="text/javascript" src="./EV/EV0102.js"></script>
<script type="text/javascript" src="${ctx}/EV/EV.js"></script>
<script type="text/javascript" src="./EF/jQuery/jquery.js"></script>
<script type="text/javascript" src="./EF/Portlet/EFPortlet.js"></script>
<script type="text/javascript" src="./EF/Portlet/EFPortal.js"></script>
</HEAD>
<body style="background-color:transparent">
<div  style='position: relative; width: 753px; height: 40px; overflow: hidden;' >
<div id='leftScroll'  ></div>
<div id="nav_tab" style='width: 700px; float: left; overflow: hidden;'>
<div id='tab_show' class="ev_benma_ui_tab" style='height: 35px; width:20000'>
	<ul id="main_nav">
				<input type="hidden" id="pageNum" value="<%=pageNum%>" />
				<input type="hidden" id="themaPath" value="<%=themaPath%>"/>
				<input type="hidden" id="useNode" value="<%=useNode%>"/>
				<%
				if(pageNum!=null && pageNum.equals("EV04")){//页面请求肯定来自系统门户维护页面，其余按钮不需要
					String nodeId = Info.getString("nodeId");
					String portalId = Info.getString("portalId");
					String nodeName = Info.getString("nodeName");
					
					%>
					<input type="hidden" id="nodeId" value="<%=nodeId%>"/>
					<input type="hidden" id="portalId" value="<%=portalId%>"/>
					<input type="hidden" id="nodeName" value="<%=nodeName%>"/>
					
					
					<li id="sys" onclick="diversionPortlet('<%=portalId%>','<%=nodeName%>','sys');" onmouseover="changeStyle(this)" onmouseout="recover(this)" name="reset"><div id="sysvalue_<%=portalId%>" style="float:left"><%=nodeName%></div></li>
					<li id="reset" onclick="reset();" onmouseover="changeStyle(this)" onmouseout="recover(this)" name="reset">重 置</li>

					
					<% 
				}else {
					
						for(int i=0;i<portalList.size();i++){
							Map map=(Map)portalList.get(i);
							String nodeId = (String)map.get("nodeId");
							String nodeName = (String)map.get("nodeName");
							String portalType = (String)map.get("portalType");
							String portalId = (String)map.get("portalId");
							String isDefault = (String)map.get("isDefault");
							String isAdd = (String)map.get("isAdd");
							if(isDefault!=null && isDefault.equals("1")){
								%>
								<input type="hidden" id="nodeId" value="<%=nodeId%>"/>
								<input type="hidden" id="portalType" value="<%=portalType%>"/>
								<input type="hidden" id="portalId" value="<%=portalId%>"/>
								<% 
							}
							if(portalType!=null && portalType.equals(PortalConstants.Portal_Type_Personal)){
								%>
					<li name="personal" id="<%=nodeId%>_per_<%=portalId%>" onclick="diversionPortlet('<%=portalId%>','<%=nodeName%>','per');" onmouseover="changeStyle(this)" onmouseout="recover(this)" );"><div id="pervalue_<%=portalId%>" style="float:left" ><%=nodeName%></div>
						<%if(isDefault!=null && isDefault.equals("1")){
						%>
						<div style="float:left"><input type="button" title="删除个人门户" onClick="deletePersonalPortal('<%=nodeId%>','<%=portalId%>',event);" class="deletePersonalPortal"/></div>
						<% 
						}
						%>
					</li>				
						<% 
					}else{
						%>
					<li id="<%=nodeId%>_sys_<%=portalId%>" onclick="diversionPortlet('<%=portalId%>','<%=nodeName%>','');" onmouseover="changeStyle(this)" onmouseout="recover(this)"><div style="float:left"><%=nodeName%></div>
						<%if(isDefault!=null && isDefault.equals("1") && isAdd==null  && useNode.equals("true")){
						%>
						<div style="float:left"><input type="button" title="添加个人门户" onClick="addPersonalPortal('<%=nodeId%>','<%=portalId%>',event);" class="addPersonalPortal"/></div>
						<% 
						}
						else if(isDefault!=null && isDefault.equals("1") && isAdd==null  &&useNode.equals("false")){
							%>
							<div style="float:left"><input type="button" title="添加个人门户" onClick="addPersonalPortal('<%=nodeId%>','<%=portalId%>',event);" class="addPersonalPortal"/></div>
							<%
						}
						%>
					</li>
					<% 
					}
					%>
		<%
						}
				
		}
		%>
		</ul>
</div>
</div>

<div id="rightScroll" ></div>
</div>
<EF:EFRegion/>
<EF:EiInfo/>
</body>
