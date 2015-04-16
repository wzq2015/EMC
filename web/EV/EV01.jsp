
<%@ page contentType="text/html;charset=UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF.tld" %>
<%@page import="com.baosight.iplat4j.core.FrameworkInfo"%>
<%@page import="com.baosight.iplat4j.util.PlatUtils"%>
<%@page import="java.util.*"%>
<%@page import="com.baosight.iplat4j.core.ei.EiInfo"%>
<%@page import="com.baosight.iplat4j.ev.util.*"%>
<%@page import="java.util.Map"%>
<%@page import="org.apache.commons.lang.*"%>
<%@page import="com.baosight.iplat4j.core.resource.I18nMessages"%>
<%@page import="com.baosight.iplat4j.security.bridge.SecurityBridgeFactory"%>

<c:set var="ctx" value="${pageContext.request.contextPath }" />
<%
    com.baosight.iplat4j.core.threadlocal.UserSession.web2Service(request);
	String user = PlatUtils.getUserId();
	String userDisplayName = SecurityBridgeFactory.getBridge().getUserDisplayName(user);
	EiInfo Info=(EiInfo)request.getAttribute("ei");
	String portalId = Info.getString("portalId");
	String pageNum = Info.getString("pageNum");
	String queryString = request.getQueryString();
	if(queryString==null){
		//websphere下getQueryString方法返回null
		queryString = (String)request.getAttribute( "javax.servlet.forward.query_string");
	}
	String nodeId = Info.getString("nodeId");
	String themaPath = request.getParameter("themaPath"); 
	String contextPath = request.getContextPath();
	if(StringUtils.isBlank(themaPath)){
		themaPath = Info.getString("themaPath");
		if(StringUtils.isBlank(themaPath)){
			themaPath=PortalConstants.defaultThemaPath;
		}
	}
	String url = "";
	String qs[] = queryString.split("&");
	for(int i=0;i<qs.length;i++){
		String param[] = qs[i].split("=");
		if("efFormEname".equals(param[0])|| "serviceName".equals(param[0]) || "methodName".equals(param[0])){
			
		}else{
			url = url+"&"+qs[i];
		}
	}

	if(url.indexOf("portalId=")>0){
		
	}else{
		url = url+"&portalId="+portalId;
	}
	
	if(url.indexOf("nodeId=")>0){
		
	}else{
		url = url+"&nodeId="+nodeId;
	}
	
	if(url.indexOf("themaPath=")>0){
		
	}else{
		url = url+"&themaPath="+themaPath;
	}
%>
<script language="JavaScript" type="text/javascript">
	window.moveTo(0,0) ;
	window.resizeTo(screen.availWidth,screen.availHeight); //窗口最大化
</script>
<html>
<head>
	<title>门户首页</title>
	<link href="./EF/Images/tab.css" rel="stylesheet" type="text/css"/>	
	<link href="./EF/EF.css" rel="stylesheet" type="text/css" />
	<link href="./EV/skins/default/ev.css" rel="stylesheet" type="text/css" />
	<link href="./EV/skins/<%=themaPath%>/ev.css" rel="stylesheet" type="text/css" />
  	<script type="text/javascript" src="./EF/EF.js"></script>	
	<script type="text/javascript" src="./EF/jQuery/jquery.js"></script>
	<script type="text/javascript" src="./EV/EV01.js"></script>
	<script type="text/javascript" src="./EV/EV.js"></script>
	<script type="text/javascript" src="./EV/EVConfig.js"></script>
</head>

<body leftmargin="0" topmargin="0" style="overflow-y:hidden;" >

<table width="100%" height="98%" border="0" cellpadding="0" cellspacing="0">
<input type="hidden" id="portalId" value="<%=portalId%>"/>
<input type="hidden" id="pageNum" value="<%=pageNum%>"/>
<input type="hidden" id="contextPath" value="<%=contextPath%>"/>
<input type="hidden" id="themaPath" value="<%=themaPath%>"/>
<input id="url" value="<%=url%>" type="hidden">
  <tr > 
    <td ><div > 
        <div class="headerBG"> 
          <div class="logo"> 
            <div > 
              <table width="100%" height="87" border="0" cellpadding="0" cellspacing="0" >
                <tr > 
                  <td width="101" rowspan="2">&nbsp;</td>
                  <td width="615">&nbsp;</td>
                </tr>
                <tr > 
                  <td height="30" valign="bottom"><div id="tableDiv" style="width:100%; height:10px;"></div></td>
                </tr>
              </table>
            </div>
          </div>
          <div style="float: right"> 
            <table height="87">
              <tr > 
                <td width="50" id="configDiv">
                </td>
              </tr>
            </table>
          </div>
          
          <div style="float: right"> 
            <table height="50">
              <tr > 
                <td width="150">
                <div id="userInfo" style="color:#FFF; float:left; margin-top:20px; font-family:微软雅黑, 宋体; font-size:15px; font-weight:bold" class='txt_head'><%=I18nMessages.getText("label.EPWelcome","欢迎您!") %>&nbsp;&nbsp;<%=userDisplayName%>
			    </div>
                 
                </td>
              </tr>
            </table>
          </div>
          
          
        </div>
      </div></div>
      </td>
  </tr>
  <tr height="4px" > 
    <td height="4" class="line" id="menuArea">&nbsp;</td>


  </tr>
  <tr > 
    <td height="100%" ><div id="portalDiv"></div></td>
  </tr>
</table>
<div id="configDivTemp" style="diaplay:none"></div>
</body>
</html>
