
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF.tld"%>
<%@page import="com.baosight.iplat4j.core.ei.EiInfo"%>
<%@page import="com.baosight.iplat4j.ev.util.*"%>
<c:set var="ctx" value="${pageContext.request.contextPath }" />
<%
	EiInfo Info=(EiInfo)request.getAttribute("ei");
	String portalId = Info.getString("portalId");
	String pageNum = Info.getString("pageNum");
	String portalType = Info.getString("portalType");
	String themaPath = request.getParameter("themaPath"); 
	String contextPath = request.getContextPath();//为菜单配置备用，其余情况使用EV01页面上的值
	String useNode = Info.getString("useNode");
%>

<HEAD>
<title>门户首页配置页面</title>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<link href="./EV/skins/default/ev.css" rel="stylesheet" type="text/css" />
<link href="./EV/skins/<%=themaPath%>/ev.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="./EF/EF.js"></script>
<script type="text/javascript" src="./EV/EV.js"></script>
<script type="text/javascript" src="./EV/EVConfig.js"></script>
<script type="text/javascript" src="./EV/EV0103.js"></script>
<script type="text/javascript" src="./EF/jQuery/jquery.js"></script>

</HEAD>

<body  style="background-color:transparent">

<div id="configMenu" class="config" onclick="showMenu();" >
	<a href="void(0)">
	<table height="87"><tr>
          <td width="50">
          </td>
        </tr>
     </table>
     </a>
</div>

<!-- 配置下拉菜单 -->
<div id="configMenuDiv"  style="diaplay:none;z-index:1">
<div>
	<div class="menu_topleft">
	</div>
	<div class="menu_topbg" >
	</div>
	
  <div class="menu_topright"> 
 </div>
</div>
<div id="menu_contentbg" >
	<div class="menu_leftbg" id="menu_leftbg" ></div>
	<div class="menubg" id="menubg" >
		<table  border="0" cellspacing="0" class="menubox">
		<tr id="themaTr" class="themaTr"  onclick="setThema();" >
        	<td width="30" height="25"><div id="themaTd" class="themaTd" ></div></td>
        	<td height="25" class="config_td" onmouseover="className='config_td_hl'" onmouseout="className='config_td'">主题</td>
        </tr>
		<tr id="layoutTr" class="layoutTr" onclick="setLayout();">
			<td width="30" height="25"><div id="layoutTd" class="layoutTd"></div></td>
			<td height="25" class="config_td" onmouseover="className='config_td_hl'" onmouseout="className='config_td'">布局</td>
		</tr>
		<tr id="menuTr" class="menuTr" onclick="setMenu();">
			<td width="30" height="25"><div id="menuTd" class="menuTd"></div></td>
			<td height="25" class="config_td" onmouseover="className='config_td_hl'" onmouseout="className='config_td'">菜单</td>
		</tr>
		<tr id="portletTr" class="portletTr" onclick="setPortlet();">
			<td width="30" height="25"><div id="portletTd" class="portletTd"></div></td>
			<td height="25" class="config_td" onmouseover="className='config_td_hl'" onmouseout="className='config_td'">portlet</td>
		</tr>
		<tr id="nodeTr" class="nodeTr" onclick="setNode();">
			<td width="30" height="25"><div id="nodeTd" class="nodeTd"></div></td>
			<td height="25" class="config_td" onmouseover="className='config_td_hl'" onmouseout="className='config_td'">节点</td>
		</tr>
		</table>
	</div>	
    <div class="menu_rightbg" id="menu_rightbg" ></div>
</div>
<div class="menu_bottom" >
	<div class="menu_bottomleft"></div>
	<div class="menu_bottombg" ></div>
	<div class="menu_bottomright"></div>
</div>
</div>
</body>
<input type="hidden" id="portalId" value="<%=portalId%>"/>
<input type="hidden" id="pageNum" value="<%=pageNum%>"/>
<input type="hidden" id="portalType" value="<%=portalType%>"/>
<input type="hidden" id="contextPath" value="<%=contextPath%>"/>
<input type="hidden" id="themaPath" value="<%=themaPath%>"/>
<input type="hidden" id="useNode" value="<%=useNode%>"/>
</HTML>
<EF:EiInfo/>
