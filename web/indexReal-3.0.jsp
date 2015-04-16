<!DOCTYPE html>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF.tld" %>
<%@page import="com.baosight.iplat4j.core.FrameworkInfo" %>
<%@page import="com.baosight.iplat4j.core.resource.I18nMessages"%>
<%@page import="com.baosight.iplat4j.core.threadlocal.UserSession"%>
<%@page import="com.baosight.iplat4j.security.bridge.SecurityBridgeFactory"%>
<%@page import="com.baosight.iplat4j.util.StringUtils"%>
<%@page import="com.baosight.iplat4j.util.AuthorizationUtils"%>
<%
	UserSession.web2Service(request);
	boolean selectPost = false;
	String user = (String) request.getSession().getAttribute("loginname");
	String projectName = (String) request.getSession().getAttribute("projectName");
	if (user == null) {
		user = I18nMessages.getText("label.EPNotloginedIn", "未登陆");
	} else {
		String welcomeName = FrameworkInfo.getWelcomeName();
		if ("name".equals(welcomeName)) {
			user = SecurityBridgeFactory.getBridge().getUserDisplayName(user);
		}
	}
	String authorizeSubject = FrameworkInfo.getAuthorizeSubject();
	String extraInfo = "";
	if ("org".equals(authorizeSubject)&&!AuthorizationUtils.isExceptUsersLoginByOrg(user)) {
		String orgCode = StringUtils.defaultIfEmpty((String) UserSession.getInSessionProperty("org"), "");

		if (orgCode == null || orgCode == "") {
			extraInfo = "[无组织机构]";
		} else {
			String orgName = SecurityBridgeFactory.getBridge().getAuthzNodeDisplayName(orgCode);
			extraInfo = "[机构代码:" + orgCode + "][机构名称:" + orgName + "] <a href=\"DispatchAction.do?efFormEname=ESAA01\">切换组织机构</a>";
		}
	}
	if ("role".equals(authorizeSubject)) {
		String roleLabel = StringUtils.defaultIfEmpty((String) UserSession.getInSessionProperty("role"), "");

		if (roleLabel == null || roleLabel == "") {
			extraInfo = "[无角色]";
		} else {
			String roleName = SecurityBridgeFactory.getBridge().getRoleDisplayName(roleLabel);
			extraInfo = "[角色标识:" + roleLabel + "][角色名称:" + roleName + "] <a href=\"DispatchAction.do?efFormEname=ESAA03\">切换角色</a>";
		}
	}
	String projectEname = FrameworkInfo.getProjectEname();
	String new_href = "";
	//String indexPage = "DispatchAction.do?efFormEname=CM02";
	String indexPage = "GIS.jsp";
%>

<HTML style="overflow-x:hidden;">
	<HEAD>
	 	<title>欢迎使用 <%=FrameworkInfo.getProjectCname()%></title>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
		<meta http-equiv="Pragma" content="no-cache"> 
		<meta http-equiv="Cache-Control" content="no-cache"> 
		<meta http-equiv="Expires" content="0">
		<script type="text/javascript">
	        var username = '<%= user %>';
	    </script>
		<%
        String domain = FrameworkInfo.getProjectAppTopDomain();
        if (domain != null && domain.startsWith(".")) {
            domain = domain.substring(1);
	    %>
	    <script type="text/javascript">
	        try {
	            document.domain='<%= domain %>';
	        } catch (ex) {
	            alert('domain not valid[<%= domain %>]');
	        }
	    </script>
	    <%
	        }
	    %>
	<script type="text/javascript" src="./EF/EF.js"></script>
	<script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
		<%
			if (FrameworkInfo.isInternational()) {
		%>
			<script type="text/javascript">
			if(efresource.config != undefined && efresource.config.INTERNATIONAL != undefined ){efresource.config.INTERNATIONAL="true";}
			</script>
		<%
			}
		%>

	<script type="text/javascript" src="./indexReal-3.0.js"></script>
	<link href="./indexReal-3.0.css" rel="stylesheet" type="text/css"/>
	<link href="./EF/iplat-ui-2.0.css" rel="stylesheet" type="text/css"/>
	<link href="./EF/Themes/styleApple/jquery-ui.custom.css" rel="stylesheet" type="text/css" />
	<link href="./EF/Themes/styleApple/iplat-ui-theme-2.0.css" rel="stylesheet" type="text/css" />

	<style type="text/css">
		html, body 
		{
			background:#fff none repeat scroll 0%;
			color:#000000;
			margin:0px auto;
			padding:0px;
			text-align:center;
			overflow-y:hidden;
		}
		body 
		{
			text-align:center;
		}
		
		/* CSS Document */
		ul,li {padding:0; margin:0;}
		ul,li {list-style-type:none; text-transform:capitalize;}
		.clear {clear:both; *display:inline;/*IE only*/}
		
		/*menu*/
		#menu {margin: 0px auto; display:block; width:100%; height:30px; background:#3f240e;}
		#nav {display:block;}
		#nav .mainlevel {float:left; background:#3f240e; text-align:center; display:block;}
		#nav .mainlevel a {color:#fff; text-decoration:none; line-height:30px; height:30px; text-align:center; padding:0 20px; display:block; _width:48px;}
		#nav .mainlevel a:hover {color:#3f240e; text-decoration:none; background:#678900 url(./EF/Images/slide-pannel_14.png) 0 0 repeat-x;}
		#nav .mainlevel ul {position:absolute; display:none; *width:2000px;z-index:100}
		#nav .mainlevel li {float:left; background:#3f240e;}
		#nav .mainlevel li a {padding:0 12px; line-height:30px; height:30px; display:block; _padding-bottom:6px;/*IE6 only*/}
		#nav .mainlevel li a:hover {color:#3f240e; text-decoration:none; background:#678900 url(./EF/Images/slide-pannel_14.png) 0 0 repeat-x;}
		#nav li a em {padding:0 3px;}
		.note {color:#3f240e; border-right:1px solid #fff; background:#678900 url(./EF/Images/slide-pannel_14.png) 0 0 repeat-x; display:block; line-height:34px; padding:0 3em;}
		.log {margin:100px auto; width:1000px; text-transform:capitalize; line-height:200%;}
	</style>
	<script>
		function resizeiframe() {
			document.getElementById("mainFrame").height = document.getElementById("mainFrameDiv").clientHeight;
			document.getElementById("mainFrame").width = document.getElementById("mainFrameDiv").clientWidth;
		}
	</script>
	</HEAD>

	<body id='indexRealBody' leftmargin="0" topmargin="0" marginwidth="0" marginheight="0" style="background:#D4D4D4;height:100%;width:100%;position:absolute;">
    <input type="hidden" id="userName" name="dir" value="<%=user%>">
	<!-- 外围表格 -->
	<table id="iplat_topDivBg_id" style="width:100%;height:80px;border:0px;background:#1396ce url(./EF/Images/ef_logo_iplat1.png);background-repeat:yes;" cellspacing="0" cellpadding="0">
		<tr style="height:50px">
			<td style="width:400px">
				<div class='indexRealLogo' style="width:400px">
					<div id="divProjectName" style="font-size:15px;float:right;margin-top:12px;left:250px;height:30px">
						当前项目：<%=projectName %>
					</div>
				</div>
			</td>
			<td style="width:100%;">
			</td>
			<td style="width:300px;">
				<div id="userInfo" style="font-size:13px;color:white;height:26px;width:300px;float:right;margin-top:12px;font-weight:bold">
					欢迎您&nbsp;&nbsp;<%=user%><%=extraInfo%>&nbsp;&nbsp;
					<a href="login.jsp" style="color:white;font-weight:bold">注&nbsp;销</a>&nbsp;&nbsp;
					<a href="#" onclick="modifyPassword()" style="color:white;font-weight:bold">修改密码</a>
				</div>
			</td>
		</tr>
		<tr style="height:30px">
			<td colspan=3>
					<div id="menu">
				<ul id="nav">
					<li class="mainlevel" id="mainlevel_01"><a href="#" onclick="setPageType('gis')">电子地图</a></li>
					<li class="mainlevel" id="menuMonitor"><a href="#" onclick="setPageType('monitor')" id="menuMonitorPage">监控页面</a></li>
				    <li class="mainlevel" id="menuCodeManagement"><a href="#" onclick="openForm('CM02')">项目编码管理</a></li>
				    <li class="mainlevel" id="menuEnergyManagement"><a href="#">节能量管理</a>
					    <ul class="sub_nav_01">
					    <li><a href="#" onclick="openForm('CM11')">项目周期管理</a></li>
					    <li><a href="#" onclick="openForm('CM12')">节能量类型管理</a></li>
					    <li><a href="#" onclick="openForm('CM13')">设备参数录入</a></li>
					    <li><a href="#" onclick="openForm('CM14')">节能量结果周期查询</a></li>
					    <li><a href="#" onclick="openForm('CM17')">节能量结果时间查询</a></li>
					    <li><a href="#" onclick="openForm('CM18')">节能量结果按天查询</a></li>
					    <li><a href="#" onclick="openForm('CM16')">节能量结果图表查询</a></li>
					    </ul>
				    </li>
				    <li class="mainlevel" id="menuExpenseManagement"><a href="#">费用管理</a>
					    <ul class="sub_nav_01">
					    <li><a href="#" onclick="openForm('CM21')">费用类型管理</a></li>
					    <li><a href="#" onclick="openForm('CM22')">预算费用管理</a></li>
					    <li><a href="#" onclick="openForm('CM23')">实际费用管理</a></li>
					    <li><a href="#" onclick="openForm('CM24')">费用结果查询</a></li>
					    <li><a href="#" onclick="openForm('CM26')">费用结果图形查询</a></li>
					    </ul>
				    </li>
				    <li class="mainlevel" id="menuLogManagement"><a href="#">日志管理</a>
					    <ul class="sub_nav_01">
					    <li><a href="#" onclick="openForm('CM81')">系统日志查询</a></li>
					    <li><a href="#" onclick="openForm('CM82')">操作日志查询</a></li>
					    </ul>
				    </li>
				    <li class="mainlevel" id="menuReportQuery"><a href="#">报表查询</a>
					    <ul class="sub_nav_01">
					    <li><a href="#" onclick="openForm('CM32')">报表模板管理</a></li>
					    <li><a href="#" onclick="openForm('CM31')">报表查询</a></li>
					    <li><a href="#" onclick="openForm('CM33')">固定报表查询</a></li>
					    </ul>
				    </li>
				    <li class="mainlevel" id="mainlevel_01"><a href="#" onclick="efChangeProject()">切换项目</a></li>
				    <li id="menuAuthorization" class="mainlevel" style="display:none"><a href="#">系统授权</a>
					    <ul class="sub_nav_01">
					    <li><a href="#" onclick="openForm('ES20')">用户管理</a></li>
					    <li><a href="#" onclick="openForm('ES37')">角色管理</a></li>
					    <li><a href="#" onclick="openForm('ES30')">组织机构管理</a></li>
					    <li><a href="#" onclick="openForm('ES31')">机构角色管理</a></li>
					    <li><a href="#" onclick="openForm('ES32')">角色成员设置</a></li>
					    <li><a href="#" onclick="openForm('ES55')">角色权限查看</a></li>
					    <li><a href="#" onclick="openForm('CM93')">项目权限配置</a></li>
					    </ul>
				    </li>
				    <li id="menuSystemManagement" class="mainlevel" style="display:none"><a href="#">系统管理</a>
					    <ul class="sub_nav_01">
					    <li><a href="#" onclick="openForm('CM01')">系统信息编码管理</a></li>
					    <li><a href="#" onclick="openForm('CM92')">项目位置设置</a></li>
					    </ul>
				    </li>
				</ul>
				</div>
			</td>
		</tr>
	</table>
	
	<div id='mainFrameDiv' style='background:#D4D4D4;top:80px;bottom:0px;left:0px;right:0px;position:absolute;'>
		<iframe id="mainFrame" name="mainFrame" width="100%" height="100%" frameBorder="0" scrolling="auto" onload="resizeiframe()">
		</iframe>
	</div>
</body>
</HTML>