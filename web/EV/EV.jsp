
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF.tld"%>

<%@page import="com.baosight.iplat4j.core.FrameworkInfo"%>
<%@page import="com.baosight.iplat4j.ev.util.PortalUtil,com.baosight.iplat4j.util.PlatUtils, com.baosight.iplat4j.core.ei.*"%>

<%
    com.baosight.iplat4j.core.threadlocal.UserSession.web2Service(request);
	String user = PlatUtils.getUserId();
	EiInfo Info=(EiInfo)request.getAttribute("ei");
	String portalId =(String)Info.get("portalId");
	String portalType =(String)Info.get("portalType");
	String userId =(String)Info.get("userId");
	String isSysOnly = (String)Info.get("isSysOnly");
	String nodeId = (String)Info.get("nodeId");
	String hasPer = (String)Info.get("hasPer");
	String isDefault = (String)Info.get("isDefault");
	
	String displaySysButton =(String)Info.get("displaySysButton");
	String displayPerButton = (String)Info.get("displayPerButton");
	String displayAddButton = (String)Info.get("displayAddButton");
	String displaySetButton = (String)Info.get("displaySetButton");
	String displaySwitchButton = (String)Info.get("displaySwitchButton");
	String displayResetButton = (String)Info.get("displayResetButton");
%>


<HTML>
<HEAD>
<title>门户首页</title>

<script language="JavaScript" type="text/javascript">
	window.moveTo(0,0) ;
	window.resizeTo(screen.availWidth,screen.availHeight); //窗口最大化
</script>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<link href="./EF/Portlet/EFPortlet.css" rel="stylesheet" type="text/css" />
<link href="./EV/Common/divWindow.css" rel="stylesheet" type="text/css" />
<link href="./EF/Images/tab.css" rel="stylesheet" type="text/css"/>	
<link href="./EF/EF.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="./EF/jQuery/jquery.js"></script>
<script type="text/javascript" src="./EF/jQuery/jquery.tab.js"></script>
<script type="text/javascript" src="./EF/EF.js"></script>
<script type="text/javascript" src="./EV/EV01.js"></script>
<script type="text/javascript" src="./EV/EV01_Menu.js"></script>
<!-- <script type="text/javascript" src="./EV/Common/divWindow.js"></script> -->
<!--<script type="text/javascript" src="./EV/Common/EFPortal.js"></script> -->
<!--  <script type="text/javascript" src="./EV/Common/EFPortlet.js"></script> -->
<script type="text/javascript" src="./EF/Portlet/EFPortlet.js"></script>
<script type="text/javascript" src="./EF/Portlet/EFPortal.js"></script>

<style type="text/css">

html,body {
	background: #CCCCCC none repeat scroll 0%;
	color: #000000;
	margin: 0px auto;
	padding: 0px;
	text-align: center;
}

body {
	text-align: center;
}

.txt_head {
	color: #293D6B;
	font-family: arial, nsimsun, sans-serif;
	font-size: 12px;
	font-weight: bold;
	height:25px;
}

li.rss_content {
	line-height: 20px;
	text-decoration: none;
	list-style:none; 
	clear:both;
}
</style>

</HEAD>

<!-- 
	<body onbeforeunload="javascript:return '将关闭打开的所有子窗口！'">
	 -->
<body>
<input type="hidden" id="portalId" value="<%=portalId%>"/>
<input type="hidden" id="portalType" value="<%=portalType%>"/>
<input type="hidden" id="userId" value="<%=userId%>"/>
<input type="hidden" id="isSysOnly" value="<%=isSysOnly%>"/>
<input type="hidden" id="nodeId" value="<%=nodeId%>"/>
<input type="hidden" id="hasPer" value="<%=hasPer%>"/>
<input type="hidden" id="isDefault" value="<%=isDefault%>"/>
<!-- 外围表格 -->
<table width="100%" height="100%" border="0" cellspacing="0"
	cellpadding="0">
	<tr height="100%">
		<!-- frame框架 -->
		<td width="100%">
		<table width="100%" height="100%" border="0" cellspacing="0"
			cellpadding="0">

			<!-- 页眉 -->
			<tr id="frameHeadLine" height="70">
				<td>
				<table id="tableMain" width="100%" border="0" cellspacing="0"
					cellpadding="0" height="70" background="EV/images/iplat_portal.jpg">
					<tr>
						<td align="right" valign="bottom">
						<table width="100%" border="0" cellspacing="0" cellpadding="0"
							height="50">
							<tr>
								<td align="right" class="txt_head"><%=FrameworkInfo.getProjectCname()%>[<%=FrameworkInfo.getProjectTypeDesc()%>]</td>
							</tr>
							<tr>
								<td align="right">
								<table>
									<tr>
										<td>当前用户：</td>
										<td><%=user%>
										</td>
										<td><a href="login.jsp">[注销]</a></td>
									</tr>
								</table>
								</td>
							</tr>
							<tr>
								<td>
									<table width="100%" height="100%"><tr>
										<td>
											<table><tr id="trPortal">
												<%if(displayResetButton.equals("true")) { %>
												<td id="reset" onclick="reset();" name="reset" style="height:25px; width:40px; background-color:#CCCCCC; font-size:15px;" align="center" onmouseover="changeShape(this);" >重 置</td>
												<%}
												if(displaySysButton.equals("true")) { %>
												<td id="default" style="width: 40px; height: 25px; background-color: #CCCCCC; font-size: 15px;" align="center" onmouseover="changeShape(this);" onclick="diversionPortlet(0);">系统</td>
												<%} 
												if(displayPerButton.equals("true")) { %>
												<td id="user" style="width: 40px; height: 25px; background-color: #CCCCCC; font-size: 15px" align="center" onmouseover="changeShape(this);"  onclick="diversionPortlet(1);">个人</td>
												<td id="deletePersonalPortal" style="width: 20px; height: 25px; background-color: #CCCCCC; font-size: 15px" align="center" onmouseover="changeShape(this);"  onclick="deletePersonalPortal();">X</td>
												<%}
												if(displayAddButton.equals("true")) { %>
												<td id="add" style="width: 20px; height: 25px; background-color: #CCCCCC; font-size: 15px" align="center" onclick="addPersonalPortal();">+</td>
												<%} %>
											</tr></table>
										</td>
										<td align="right" class="txt_head">
											<table>
												<tr>
													<td id="setButton" class="txt_head">
														<%if(displaySetButton.equals("true")) { %>
														<a id="setTemplate" href="javascript:setTemplate();" >更换模板</a>
														<a id="setLayout" href="javascript:setLayout();" >更换布局</a>
														<a id="setMenu" href="javascript:setMenu();" >定义菜单</a>
														<a id="setPortlet" href="javascript:setPortlet();" >选择Portlet</a>
														<a id="setTab" href="javascript:setTab();" >选择TAB</a>
														<%}%>
													</td>
													<td id="switchButton" class="txt_head">
														<%if(displaySwitchButton.equals("true")) {%>
														<a id="switchPortal" href="javascript:switchPortalNode();" >门户切换</a>
														<%} %>
													</td>
												</tr>
											</table>
											
											
										</td>
									</tr></table>
								</td>		
							</tr>
						</table>
						</td>
						<td width="2%">&nbsp;</td>
					</tr>
				</table>
				</td>
			</tr>

			<!-- 菜单条 -->
			<tr height="21px">
				<td>
				<table width="100%" height="100%" cellpadding="0" cellspacing="0"
					background="./EF/Images/bgline02.gif">
					<tr height="21px">
						<td width="100%" align='left'>
						<div id="nMenu"></div>
						</td>
					</tr>
				</table>
				</td>
			</tr>
			<!-- 主界面 -->
			<tr id="portalMain" height='100%'>
				<td id="text1">
				<div id='portalNodeId' width='800' height='600'></div>
				<script>
					ef.get("portalNodeId").width = document.body.clientWidth;
				</script>
				</td>
			</tr>
		</table>
		</td>
	</tr>
</table>
<div id="selectAddPer" class="efwindow">
 	<table width="300"><tr>
		<td>
		<div id = "ef_region_select" title="新增个人门户" style="overflow:scroll">
		 <table>
			<tr>
			 <td>	
			 你确定要添加"个人"标签页及其内容吗？
			 </td>
			</tr>
			</table>
		</div>		
		</td> 	
 	</tr>
 	</table>	
 </div>
 <div id="selectDeletePer" class="efwindow">
 	<table width="300"><tr>
		<td>
		<div id = "ef_region_person" title="删除个人门户" style="overflow:scroll">
		 <table>
			<tr>
			 <td>	
			 你确定要删除"个人"标签页及其内容吗？
			 </td>
			</tr>
			</table>
		</div>		
		</td> 	
 	</tr>
 	</table>	
 </div>
  <div id="selectResetPer" class="efwindow">
 	<table width="300"><tr>
		<td>
		<div id = "ef_region_reset" title="删除个人门户" style="overflow:scroll">
		 <table>
			<tr>
			 <td>	
			  你是否要重置本节点的系统门户为系统默认门户？
			 </td>
			</tr>
			</table>
		</div>		
		</td> 	
 	</tr>
 	</table>	
 </div>
 <EF:EFRegion/>
 <EF:EiInfo/>
</body>
</HTML>
