<!DOCTYPE html>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>

<%@page import="com.baosight.iplat4j.core.FrameworkInfo" %>
<%@page import="com.baosight.iplat4j.core.resource.I18nMessages"%>
<%@page import="com.baosight.iplat4j.core.threadlocal.UserSession"%>
<%@page import="com.baosight.iplat4j.security.bridge.SecurityBridgeFactory"%>
<%@page import="com.baosight.iplat4j.util.StringUtils"%>
<%@page import="com.baosight.iplat4j.util.AuthorizationUtils"%>
<%@ page import="com.baosight.iplat4j.ec.tm.utils.TemplateInitInfo" %>
<%
	//request.getSession().setMaxInactiveInterval( 2*60*60 );
	if(TemplateInitInfo.getContextPath() == null){
		TemplateInitInfo.setContextPath(request.getContextPath());//存上下文
    	TemplateInitInfo.setIp(request.getServerName());//存ip
    	TemplateInitInfo.setPort(request.getServerPort());//存port
	}
%>
<%
	String actionUrl = request.getContextPath() + "/DispatchAction.do";
	String webPath=request.getRealPath("/");

	UserSession.web2Service(request);
	boolean selectPost = false;
	String user = (String) request.getSession().getAttribute("loginname");
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

	String viewSiteManager = request.getContextPath() + "/DispatchAction.do?efFormEname=ECSM01";  //站点列表维护路径
%>

<HTML>
	<HEAD>
	 	<title><%=I18nMessages.getText("label.EPWelcomeTo","欢迎使用") %> <%=FrameworkInfo.getProjectCname() %>[<%=FrameworkInfo.getProjectTypeDesc() %>]</title>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
		<meta http-equiv="Pragma" content="no-cache"> 
		<meta http-equiv="Cache-Control" content="no-cache"> 
		<meta http-equiv="Expires" content="0"> 

	
		<script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
		
		<script class="javascript" src="./EF/SyntaxHighlighter/shCore.js"></script>
		<script class="javascript" src="./EF/SyntaxHighlighter/shBrushJScript.js"></script>
		<script class="javascript" src="./EF/SyntaxHighlighter/shBrushXmlOrJsp.js"></script>
		<link type="text/css" rel="stylesheet" href="./EF/SyntaxHighlighter/SyntaxHighlighter.css"></link> 
		<link type="text/css" rel="stylesheet" href="./EF/Themes/styleApple/iplat-ui-theme-2.0.css"></link> 
		<%
		//  从后台服务获取是否国际化开关
		if(FrameworkInfo.isInternational())
		{%>
			<script type="text/javascript">
			if(efresource.config != undefined && efresource.config.INTERNATIONAL != undefined ){efresource.config.INTERNATIONAL="true";}
			</script>
		<%}
		%>
		<!-- <script type="text/javascript" src="./userIco.js"></script> -->
		<script type="text/javascript" src="./EC/EC05.js"></script>

		<link href="./EC/Images/css.css" rel="stylesheet" type="text/css"/>
		<link href="./EF/iplat-ui-2.0.css" rel="stylesheet" type="text/css"/>
		<%
		//从session中获得用户选择的风格和字体，如未选择过，默认为蓝色风格和小号字体
		String choose_one = "default";
		String para = (String)session.getAttribute("userInterfaceStyle");
		if(para!=null&&para.length()>0){
			choose_one = para;
		}
		if(choose_one.equals("default")){%>

		<%}else{
			new_href = "./EF/style/style"+choose_one+"/EF.css";%>

			<link href="<%=new_href%>" rel="stylesheet" type="text/css"/>
			<script type="text/javascript" src="./EF/style/style<%=choose_one %>/EFIco.js"></script>
		<%}%>

		<style type="text/css">

html, body {
			background:#fff none repeat scroll 0%;
			color:#000000;
			margin:0px auto;
			padding:0px;
			overflow-y:hidden;
		}


		body {
			height:100%;
			width:100%;
			
			position:absolute;
		}

		</style>
	</HEAD>
<body >
<!--<body leftmargin="0" topmargin="0" marginwidth="0" marginheight="0">-->
<form id="EC05" style="padding:0px;height:100%;overflow:visible;" name='form1' method="POST" action="<%=actionUrl%>"  enctype="multipart/form-data">
	
	<input type="hidden" id="templatelink_nodeId" name="templatelink_nodeId" /><!--模板关联公共参数-->
		
		<input type="hidden" id="hdUrl" value="<%=viewSiteManager%>">
		<script type="text/javascript" >
			var get_choose = "<%=choose_one%>";
			var image_setpath ;
			if(get_choose!="default"){
				image_setpath = "/EF/style/style"+get_choose+"/Images/";
			}

			var get_csspath = image_setpath;
			if(get_csspath!=null&&get_csspath.indexOf("EF/style")!=-1)
				EF_IMAGES_PATH=CONTEXT_PATH+get_csspath;

		</script>
		<input type="hidden" id="context" value="<%=request.getContextPath()%>">

		<!-- 外围表格 -->
	   <table width="100%" height="100%" border="0" cellspacing="0" cellpadding="0" style='height:100%;'>
		 <!-- 页眉 -->
		 <tr id="frameHeadLine">
			<td style="width: 100%; height: 70px;  background: #1396ce url(./EC/Images/header.jpg); background-repeat: no-repeat;">

				<div style="float: right; width: 90px; margin-top: 5px">
					<a class="headerButton" href="javascript:void(0)"
						onClick="activeFormNotRefresh('ES23')"
						onMouseOver="efico.setImageSrc('ChangePwd','efpage.changePwdOn')"
						onMouseOut="efico.setImageSrc('ChangePwd','efpage.changePwd')">
						<div class='txt_head' align="center">
							<div style="margin: 3px; float: left">
								<img id="ChangePwd"
									onload="efico.setImageSrc(this,'efpage.changePwd')"
									src="./EF/Images/eftree_blank.png" />
							</div>
							<div style="float: left; margin-top: 7px"><%=I18nMessages.getText("label.EPChangePassword", "修改密码")%></div>
						</div>
					</a>
				</div>

				<div style="float: right; width: 67px; margin-top: 5px">
					<a class="headerButton" href="login.jsp"
						onMouseOver="efico.setImageSrc('LogOut','efpage.logOutOn')"
						onMouseOut="efico.setImageSrc('LogOut','efpage.logOut')">
						<div class='txt_head' align="center">
							<div style="margin: 3px; float: left">
								<img id="LogOut"
									onload="efico.setImageSrc(this,'efpage.logOut')"
									src="./EF/Images/eftree_blank.png" />
							</div>
							<div style="float: left; margin-top: 7px"><%=I18nMessages.getText("label.EPLogout", "注&nbsp;&nbsp;销")%></div>
						</div>
					</a>
				</div>
				<div id="userInfo"
					style="color: #FFF; float: right; position: absolute; top: 28px; margin-right: 12px; right: 157px; font-family: 微软雅黑, 宋体; font-size: 12px; max-height: 12px; font-weight: bold"><%=I18nMessages.getText("label.EPWelcome", "欢迎您!")%>&nbsp;&nbsp;<%=user%><%=extraInfo%>
				</div>

			</td>
		</tr>

                <!-- 菜单条 -->
		        <tr width="100%" height="26px">
		          <td colspan="2">
		             <!-- 菜单条 -->
                      <table width="100%" style="border:solid 1px #7b9dc0;" id="iplat_menu_id" cellpadding="0" cellspacing="0">
		                <tr height="26px">
		                  <td valign="middle" >

		                    <EF:EFMenu model="MenuModel" id="nMenu" configFunc="configMenu">
		                    </EF:EFMenu>
						  </td>
				          <td width=20 align='center' onclick="toggleMenu()" style="CURSOR: hand" title="折叠上方菜单">
							<IMG id="toggleMenuImg" onload="efico.setImageSrc('toggleMenuImg','efform.efframeMenuUp')" src="./EF/Images/eftree_blank.png">
						  </td>
		                </tr>
		              </table>
		          </td>
		        </tr>
		        <!-- 主界面 -->
		        <tr  width="100%" height="100%" style="background-color: #D2D3D4;">
					<td id='mainFrameTableTD' colspan="2" >
					<div id='mainFrameDiv' style='bottom:0;top:99px;width:100%;position:fixed;overflow:hidden'>
					  <table id="mainFrameTable" width="100%" height="100%"  cellpadding=0 cellspacing=0 style="width: 100%; position: absolute;">
						<tr height=100%>
						  <td id="leftTree" vAlign="top" height="100%" style="min-width:188px;height:100%;width:188px;background-color: #f4f9ff; border:solid #7b9dc0 1px; padding-bottom:2px; border-top:none">
							<div id='selectAndTree' style='top:30px;position:absolute;height: 100%;min-width: 188px; border:#9da1a4 1px solid;'>
		                    <div id="leftTreeDiv" style='overflow:auto; min-width:160px; 
		                    		position:absolute;float: left;'>
								<EF:EFTree model="tableTreeModel" id="nTree" text="站点栏目树" configFunc="configTree" >
				    		    </EF:EFTree>
		                    </div>
							</div>
						  </td>

						  <td id="middleSplitter" style="repeat-y; cursor: e-resize; width:6px; border:solid 1px #7b9dc0; border-left:none; border-top:none" onclick="toggleTree()">
                          </td>

						  <td id="rightContent" width="100%" height="100%" vAlign="top" style="width:auto;">
						    <iframe id="mainFrame" name="mainFrame" marginWidth="0" marginHeight="0" src="" frameBorder="0" width="100%" scrolling="auto" height="100%"> </iframe>
						  </td>
						</tr>
					  </table>
	<div id='SiteSelect' style='top:0px;float:left;index-z:1000;position:absolute;'>
							<EF:EFSelect blockId="siteList" ename="siteId" row="0" etc=' onChange="onSiteListChange();"'>
								<EF:EFOptions blockId="siteList1" labelColumn="label" valueColumn="value"></EF:EFOptions>
							</EF:EFSelect>
							<input type="hidden" id="siteId" />
							</div>
					  </div>
					</td>
		        </tr>
		      </table>

<!-- 站点信息编辑 -->
<div id="modifysite" title='站点信息编辑' class="efwindow" style="width:530px;">
 <input type="hidden" id="hdViewId" />
	<div  id="ef_region_modifysite" title="站点信息" style="width:530px;overflow:scroll">
			<input  type="hidden"  name="result-0-flag"   />
			<input  type="hidden"  name="result-0-siteId" />
			<input  type="hidden"  name="result-0-jobId"   />
			<table width="100%" align="center">
			<tr>
	 			<td align="right" width="20%">	
	 				站点名称:
	 			</td>
				<td width="40%">
	 				<input  type="text"  name="result-0-siteName"  />
				 </td>
				 <td align="right" width="20%">	
	 				设置站点状态:
	 			 </td>
				 <td>
					<EF:EFSelect  blockId="result" ename="siteState" row="0" >
						<EF:EFOption value="0" label="正常" />
						<EF:EFOption value="1" label="关闭" />
					</EF:EFSelect>
				 </td>
			</tr>
			<tr>
	 			<td align="right">	
	 				存放位置:
	 			</td>
	 			<td>	
	 				<input type="text"  name="result-0-siteAlias" onblur="value=value.replace(/[\W]/g,'');" 
					   onbeforepaste="clipboardData.setData('text',clipboardData.getData('text').replace(/[^\d]/g,''))" />(数字或字母)
	 			</td>
	 			<td align="right">	
	 				是否静态访问:
	 			</td>
				<td>
				    <EF:EFSelect blockId="result" ename="isStaticRelease" row="0" etc="onChange='releaseOptionChange(this.value)'">
					    <EF:EFOption label="是" value="1"></EF:EFOption>
					    <EF:EFOption label="否" value="0"></EF:EFOption>
				    </EF:EFSelect>
				 </td>
			</tr>
			<tr>
	 			<td align="right">	
	 				站点排序标识:
	 			</td>
				<td>
	 				<input  type="text"  name="result-0-siteSeq"  />
				 </td>
				 <td align="right">	
	 				允许匿名访问:
	 			 </td>
				 <td>
				    <EF:EFSelect blockId="result" ename="isAnony" row="0" >
					    <EF:EFOption label="是" value="1"></EF:EFOption>
					    <EF:EFOption label="否" value="0"></EF:EFOption>
				    </EF:EFSelect>
				 </td>
			</tr>
						<tr>
				<td colspan="4">
					<hr style="border:1px dashed gray;" />
				</td>
			</tr>
			<tr>
	 			<td align="right">	
	 				站点首页模板:
	 			<!-- <input type="hidden" name="d-0-firsetLevelColumn" />  -->
					
	 			</td>
	 			<td colspan="3">
	 				<input type="text" id="SiteTemplatePreview0" readOnly class="readOnly"/><!--style="cursor:hand" onClick="previewTemplate(0,0)"-->
	 				<button id="SiteTemplateIns0" type='button' class="inputField" onClick="selectTemplateIns0('SiteTemplatePreview0',0)">选择</button>
	 				<button id="SiteTemplate0" type='button' class="inputField" onClick="selectTemplate0('SiteTemplatePreview0',0)">新增</button>
	 				<button id="undoSiteTemplate0" type='button' class="inputField" onClick="onUndoClick0('SiteTemplatePreview0',0,0)">撤销</button>
	 				<button id="previewSiteTemplate0" type='button' class="inputField" onClick="previewTemplate0(0,0)">设置</button>
	 				<button id="previewSiteT0" type='button' class="inputField" onClick="preview(0,0,'s')">预览</button>
	 				<input type="hidden" id="templateInsId00" />
	 				<input type="hidden" id="templateInsName00"/>
	 			</td>
			</tr>
			<tr>
				<td align="right">
	 				栏目首页模板:
				 </td>
	 			<td colspan="3"> 
	 				<input type="text" id="ColumnTemplatePreview0" readOnly class="readOnly"/><!--style="cursor:hand" onClick="previewTemplate(1,0)"-->
	 				<button  id="ColumnTemplateIns0" type='button' class="inputField" onClick="selectTemplateIns0('ColumnTemplatePreview0',1)">选择</button>
	 				<button  id="ColumnTemplate0" type='button' class="inputField" onClick="selectTemplate0('ColumnTemplatePreview0',1)">新增</button>
	 				<button id="undoColumnTemplate0" type='button'  class="inputField" onClick="onUndoClick0('ColumnTemplatePreview0',1,0)">撤销</button>
	 				<button id="previewColumnTemplate0" type='button'  class="inputField" onClick="previewTemplate0(1,0)">设置</button>
	 				<button id="previewColumnT0" type='button'  class="inputField" onClick="preview(1,0,'s')">预览</button>
	 				<input type="hidden" id="templateInsId01" />
	 				<input type="hidden" id="templateInsName01"/>
	 			</td>
	 			
			</tr>
			<tr>
				<td align="right">
	 				文章明细模板:
				 </td> 
	 			<td colspan="3">
	 				<input type="text" id="ArticleTemplatePreview0" readOnly class="readOnly"/><!--style="cursor:hand" onClick="previewTemplate(3,0)"-->
	 				<button   id="ArticleTemplateIns0" type='button'  class="inputField" onClick="selectTemplateIns0('ArticleTemplatePreview0',3)">选择</button>
	 				<button   id="ArticleTemplate0" type='button'  class="inputField" onClick="selectTemplate0('ArticleTemplatePreview0',3)">新增</button>
	 				<button id="undoArticleTemplate0" type='button'  class="inputField" onClick="onUndoClick0('ArticleTemplatePreview0',3,0)">撤销</button>
	 				<button id="previewArticleTemplate0" type='button'  class="inputField" onClick="previewTemplate0(3,0)">设置</button>
	 				<button id="previewArticleT0" type='button'  class="inputField" onClick="preview(3,0,'s')">预览</button>
	 				<input type="hidden" id="templateInsId03" />
	 				<input type="hidden" id="templateInsName03"/>
	 			</td>
			</tr>
			<tr>
				<td colspan="4">
					<hr style="border:1px dashed gray;"  />
				</td>
			</tr>
			<tr>
				<td  align="right">
					文章发布状态:
				</td>
				<td colspan="3">
					<input id="stateCreate"  name="articlestates" type="checkbox" value="10" style="cursor:hand;"/>新稿 
					<input id="stateDenial" name="articlestates" type="checkbox" value="20" style="cursor:hand;"/>已否  
					<input id="stateAudit" name="articlestates" type="checkbox" value="30" style="cursor:hand;"/>审核中
					<input id="statePublishing" name="articlestates" type="checkbox" value="40" style="cursor:hand;"/>待发布
					<input id="stateRelease" name="articlestates" type="checkbox" value="50" style="cursor:hand;"/>已发
					<input type="hidden" id="articleReleaseStates" name="result-0-articleReleaseStates" />
				</td>
			</tr>
			<tr>
				<td  align="right">
					文章按钮设置:
				</td>
				<td colspan="3" style="padding-top:15px;">
					<input id="Preview" name="chkBtn" type="checkbox" value="01"  style="cursor:hand;"/><label for="Preview" style="cursor:hand;">预览</label>&nbsp; 
					<input id="Save" name="chkBtn" type="checkbox" value="02" style="cursor:hand;"/><label for="Save" style="cursor:hand;">保存</label>&nbsp;  
					<input id="Close" name="chkBtn"  type="checkbox"  value="03" style="cursor:hand;"/><label for="Close" style="cursor:hand;">关闭</label>&nbsp;
					<input id="SaveSubmit" name="chkBtn" type="checkbox"  value="04" style="cursor:hand;"/><label for="SaveSubmit" style="cursor:hand;">保存并提交</label>&nbsp;
					<input id="SaveCreate" name="chkBtn" type="checkbox" value="05" style="cursor:hand;"/><label for="SaveCreate" style="cursor:hand;">保存并新建</label>&nbsp;<br/>
					<input id="SubmitCreate" name="chkBtn" type="checkbox"  value="06" style="cursor:hand;"/><label for="SubmitCreate" style="cursor:hand;">提交并新建</label>&nbsp;
					<input id="SaveClose" name="chkBtn" type="checkbox"  value="07" style="cursor:hand;"/><label for="SaveClose" style="cursor:hand;">保存并关闭</label>&nbsp;
					<input id="SavePublish" name="chkBtn" type="checkbox"  value="08" style="cursor:hand;"/><label for="SavePublish" style="cursor:hand;">保存并发布</label>&nbsp;
					<input id="ShenPi" name="chkBtn" type="checkbox" value="09" style="cursor:hand;"/><label for="ShenPi" style="cursor:hand;">审批</label>&nbsp;
					<input type="hidden" id="siteArticleButton" name="result-0-siteArticleButton" value=""/>
				</td>
			</tr>
			<tr>
				<td colspan="4">
					<hr style="border:1px dashed gray;" />
				</td>
			</tr>
			
		</table>
		<table>
			<tr>
	 			<td align="right" style="padding-left:10px;">	
	 				定时任务:<input  type="radio" id="result-0-jobType" name="result-0-jobType" value="0"  onchange="changeJobType(0)" onClick="this.blur();" />
	 			</td>
				<td>
					不配置计划
				 </td>
			</tr>
			<tr>
	 			<td align="right">	
	 				<input  type="radio" id="result-0-jobType" name="result-0-jobType" value="1"  onchange="changeJobType(1)" onClick="this.blur();" />
	 			</td>
				<td>
					每天发布一次
				 </td>
				 <td>
				 	<table>
						<tr id="jt1">
				 			<td align="right">	
				 				发布时间：
				 			</td>
							<td>
				 				<input  type="text"  id="result-0-jobStartHour1" name="result-0-jobStartHour1" style="width:30px" maxlength="2" onkeydown="if(event.keyCode==13)event.keyCode=9" onKeyPress="if ((event.keyCode<48 || event.keyCode>57)) event.returnValue=false"/>:
				 				<input  type="text"  id="result-0-jobStartMin1" name="result-0-jobStartMin1" style="width:30px" maxlength="2" onkeydown="if(event.keyCode==13)event.keyCode=9" onKeyPress="if ((event.keyCode<48 || event.keyCode>57)) event.returnValue=false"/>
							 </td>
						</tr>
				 	</table>
				 </td>
			</tr>

			<tr>
	 			<td align="right">	
	 				<input  type="radio" id="result-0-jobType" name="result-0-jobType" value="2"  onchange="changeJobType(2)" onClick="this.blur();" />
	 			</td>
				<td>
					一天发布多次
				 </td>
				 <td>
				 	<table>
				 		<tr id="jt2">
				 			<td align="right">	
				 				开始时间
				 			</td>
							<td>
				 				<input  type="text"  name="result-0-jobStartHour" id="result-0-jobStartHour"  style="width:30px" maxlength="2" onkeydown="if(event.keyCode==13)event.keyCode=9" onKeyPress="if ((event.keyCode<48 || event.keyCode>57)) event.returnValue=false"/>:
				 				<input  type="text"  name="result-0-jobStartMin"  id="result-0-jobStartMin" style="width:30px" maxlength="2" onchange="changeMin()" onkeydown="if(event.keyCode==13)event.keyCode=9" onKeyPress="if ((event.keyCode<48 || event.keyCode>57)) event.returnValue=false"/>
							 </td>
						</tr>
				 	</table>
				 </td>
				 <td>
				 	<table>
				 		<tr id="jt3">
				 			<td align="right">	
				 				结束时间
				 			</td>
							<td>
				 				<input  type="text"  name="result-0-jobEndHour" id="result-0-jobEndHour"  style="width:30px" maxlength="2" onkeydown="if(event.keyCode==13)event.keyCode=9" onKeyPress="if ((event.keyCode<48 || event.keyCode>57)) event.returnValue=false"/>:
				 				<input  type="text"  name="result-0-jobEndMin" id="result-0-jobEndMin"  style="width:30px" maxlength="2" onkeydown="if(event.keyCode==13)event.keyCode=9" onKeyPress="if ((event.keyCode<48 || event.keyCode>57)) event.returnValue=false"/>
							 </td>
						</tr>
				 	</table>
				 </td>
				 <td>
				 	<table>
				 		<tr id="jt4">
				 			<td align="right">	
				 				间隔时间
				 			</td>
							<td>
				 				<input  type="text"  name="result-0-jobIntervalHour" id="result-0-jobIntervalHour"  style="width:30px" maxlength="2" onkeydown="if(event.keyCode==13)event.keyCode=9" onKeyPress="if ((event.keyCode<48 || event.keyCode>57)) event.returnValue=false"/>:
				 				<input  type="text"  name="result-0-jobIntervalMin" id="result-0-jobIntervalMin"  style="width:30px" maxlength="2" onkeydown="if(event.keyCode==13)event.keyCode=9" onKeyPress="if ((event.keyCode<48 || event.keyCode>57)) event.returnValue=false"/>
							 </td>
						</tr>
				 	</table>
				 </td>
			</tr>
		</table>
	</div>		
 </div>
  
<div id="insertcolumn" class="efwindow" title="栏目信息编辑" >
	<div id="ef_region_insertcolumn" title="栏目编辑" style="width:550px;">
		<input type="hidden" id="isUpdate"/>
		<input type="hidden" name="d-0-firsetLevelColumn" />
		<input type="hidden" name="inqu_status-0-parentId" id="inqu_status-0-parentId"/>
		<input type="hidden" name="inqu_status-0-siteId" id="inqu_status-0-siteId"/>
		<input type="hidden" name="inqu_status-0-parentType" id="inqu_status-0-parentType"/>
		<input type="hidden" name="inqu_status-0-columnId" />
		<table width="100%" style="text-align:left;">
			<tr>
				<td align="right" width="20%">所属站点:</td>
				<td width="25%">
					<input type="text" name="d-0-siteName" id="d-0-siteName"  readonly="true"  class="readOnly"/>
				</td>
				<td align="right" width="15%">父级栏目:</td>
				<td>
					<input type="text" name="d-0-parentName" id="d-0-parentName"  readonly="true"  class="readOnly"/>
					<input type="hidden" name="d-0-parentId" id="d-0-parentId" /> 
				</td>
			</tr>
			<tr>
				<td align="right">栏目名称:</td>
				<td><input type="text" name="d-0-columnName" class="" /></td>
				<td align="right">栏目序号:</td>
				<td><input type="text" name="d-0-columnSeq" class="" style="ime-mode:disabled" onkeydown="if(event.keyCode==13)event.keyCode=9" onKeyPress="if ((event.keyCode<48 || event.keyCode>57)) event.returnValue=false"/></td>
			</tr>
			<tr>
				<td align="right">栏目分组:</td>
				<td>
					<input type="hidden" id="d-0-columnId" name="d-0-columnId" /> 
					<input type="hidden" id="d-0-columnType" name="d-0-columnType" /> 
					<script>
	 					function aa(){
	 						if(ef.get("d-0-columnCategory").value!='00'){
	 							document.getElementById("columnModel").style.display = "none";
	 							document.getElementById("articleModel").style.display = "none";
	 							document.getElementById("columnModel1").style.display = "none";
	 							document.getElementById("articleModel1").style.display = "none";
	 						}else{
	 							document.getElementById("columnModel").style.display = "";
	 							document.getElementById("articleModel").style.display = "";
	 							document.getElementById("columnModel1").style.display = "";
	 							document.getElementById("articleModel1").style.display = "";
	 						}
	 					}
	 				</script> 
				 	<EF:EFSelect blockId="d" ename="columnCategory" row="0" etc="onchange='aa()'">
						<EF:EFOption value="00" label="普通栏目" />
						<EF:EFOption value="01" label="虚拟栏目" />
						<EF:EFOption value="02" label="头条新闻" />
						<EF:EFOption value="04" label="图片新闻" />
					</EF:EFSelect>
				</td>
				<td align="right">存放位置:</td>
				<td><input type="text" name="d-0-columnAlias" class="" onblur="value=value.replace(/[\W]/g,'');" 
					   onbeforepaste="clipboardData.setData('text',clipboardData.getData('text').replace(/[^\d]/g,''))"/>(数字或字母)</td>
			</tr>
			<tr>
				<td align="right">需要审核:</td>
				<td>
					<EF:EFSelect blockId="d" ename="isAudit" row="0">
						<EF:EFOption label="否" value="0" />
						<EF:EFOption label="是" value="1" />
					</EF:EFSelect>
				</td>
				<td align="right">检索条件:</td>
				<td>
					<input type="hidden" id="d-0-retrievalConditionMode" name="d-0-retrievalConditionMode" />
					<input type="text" id="d-0-retrievalConditionSql" name="d-0-retrievalConditionSql"/>
					<button id="selectCondition" type='button' class="inputField" onClick="selectConClick()">选择</button>
				</td>
			</tr>
			<tr>
				<td align="right">允许外部引用:</td>
				<td>
					<EF:EFSelect blockId="d" ename="isRefer" row="0">
						<EF:EFOption label="是" value="1" />
						<EF:EFOption label="否" value="0" />
					</EF:EFSelect>
				</td>
				<td align="right">排序方式:</td>
				<td>
					<input type="text" id="d-0-orderCondition" name="d-0-orderCondition" class="" />
					<button id="sort" type='button' class="inputField" onClick="orderConClick()">选择</button>
				</td>
			</tr>
			<tr>
				<td align="right">允许匿名访问:</td>
				<td>
					<EF:EFSelect blockId="d" ename="isAnony" row="0">
						<EF:EFOption label="是" value="1" />
						<EF:EFOption label="否" value="0" />
					</EF:EFSelect>
				</td>
				<td colspan="2"></td>
			</tr>
			<tr>
				<td id="columnModel" align="right">
					栏目首页模板:
				</td>
				<td id="columnModel1" colspan="3">
					<input type="text" id="ColumnTemplatePreview" readOnly  class="readOnly"/>
					<button id="ColumnTemplateIns" type='button' class="inputField" onClick="selectTemplateIns('ColumnTemplatePreview',1)">选择</button>
					<button id="ColumnTemplate" type='button' class="inputField" onClick="selectTemplate('ColumnTemplatePreview',1)">新增</button>
					<button id="undoColumnTemplate" type='button' class="inputField" onClick="onUndoClick('ColumnTemplatePreview',1,1)">撤销</button>
					<button id="previewColumnTemplate" type='button' class="inputField" onClick="previewTemplate(1,1)">设置</button>
					<button id="previewColumnT" type='button' class="inputField" onClick="preview(1,1,'c')">预览</button>
					<input type="hidden" id="templateInsId1" /> 
					<input type="hidden" id="templateInsName1" />
				</td>
			</tr>
			<tr>
				<td id="articleModel" align="right">文章明细模板:</td>
				<td id="articleModel1" colspan="3">
					<input type="text" id="ArticleTemplatePreview" readOnly  class="readOnly"/>
					<button id="ArticleTemplateIns" type='button' class="inputField" onClick="selectTemplateIns('ArticleTemplatePreview',3)">选择</button>
					<button id="ArticleTemplate" type='button' class="inputField" onClick="selectTemplate('ArticleTemplatePreview',3)">新增</button>
					<button id="undoArticleTemplate" type='button' class="inputField" onClick="onUndoClick('ArticleTemplatePreview',3,1)">撤销</button>
					<button id="previewArticleTemplate" type='button' class="inputField" onClick="previewTemplate(3,1)">设置</button>
					<button id="previewArticleT" type='button' class="inputField" onClick="preview(3,1,'c')">预览</button>
					<input type="hidden" id="templateInsId3" /> 
					<input type="hidden" id="templateInsName3" />
				</td>
			</tr>
		</table>
		<table>
			<tr>
				<td align="right" style="padding-left:10px;">定时任务:
					<input type="radio" id="d-0-jobType" name="d-0-jobType" value="0" class="" onchange="changeJobType1(0)" onClick="this.blur();" />
				</td>
				<td>不配置计划</td>
			</tr>
			<tr>
				<td align="right">
					<input type="radio" id="d-0-jobType" name="d-0-jobType" value="1" class="" onchange="changeJobType1(1)" onClick="this.blur();" />
				</td>
				<td>每天发布一次</td>
				<td>
				<table>
					<tr id="jt11">
						<td align="right">发布时间：</td>
						<td>
							<input type="text" name="d-0-jobStartHour1" id="d-0-jobStartHour1" class="" style="width:30px" maxlength="2" alt="时" onkeydown="if(event.keyCode==13)event.keyCode=9" onKeyPress="if ((event.keyCode<48 || event.keyCode>57)) event.returnValue=false"/>: 
							<input type="text" name="d-0-jobStartMin1" id="d-0-jobStartMin1" class="" style="width:30px" maxlength="2" alt="分" onkeydown="if(event.keyCode==13)event.keyCode=9" onKeyPress="if ((event.keyCode<48 || event.keyCode>57)) event.returnValue=false"/>
						</td>
					</tr>
				</table>
				</td>
			</tr>
			<tr>
				<td align="right">
					<input type="radio" id="d-0-jobType" name="d-0-jobType" value="2" class="" onchange="changeJobType1(2)" onClick="this.blur();" />
				</td>
				<td>一天发布多次</td>
				<td>
				<table>
					<tr id="jt21">
						<td align="right">开始时间</td>
						<td>
							<input type="text" name="d-0-jobStartHour" id="d-0-jobStartHour" class="" style="width:30px" maxlength="2" alt="时" onkeydown="if(event.keyCode==13)event.keyCode=9" onKeyPress="if ((event.keyCode<48 || event.keyCode>57)) event.returnValue=false"/>: 
							<input type="text" name="d-0-jobStartMin" id="d-0-jobStartMin" class="" style="width:30px" maxlength="2" alt="分" onkeydown="if(event.keyCode==13)event.keyCode=9" onKeyPress="if ((event.keyCode<48 || event.keyCode>57)) event.returnValue=false"/>
						</td>
					</tr>
				</table>
				</td>
				<td>
				<table>
					<tr id="jt31">
						<td align="right">结束时间</td>
						<td>
							<input type="text" name="d-0-jobEndHour" id="d-0-jobEndHour" class="" style="width:30px" maxlength="2" alt="时" onkeydown="if(event.keyCode==13)event.keyCode=9" onKeyPress="if ((event.keyCode<48 || event.keyCode>57)) event.returnValue=false"/>: 
							<input type="text" name="d-0-jobEndMin" id="d-0-jobEndMin" class="" style="width:30px" maxlength="2" alt="分" onkeydown="if(event.keyCode==13)event.keyCode=9" onKeyPress="if ((event.keyCode<48 || event.keyCode>57)) event.returnValue=false"/>
						</td>
					</tr>
				</table>
				</td>
				<td>
				<table>
					<tr id="jt41">
						<td align="right">间隔时间</td>
						<td>
							<input type="text" name="d-0-jobIntervalHour" id="d-0-jobIntervalHour" class="" style="width:30px" maxlength="2" alt="时" onkeydown="if(event.keyCode==13)event.keyCode=9" onKeyPress="if ((event.keyCode<48 || event.keyCode>57)) event.returnValue=false"/>: 
							<input type="text" name="d-0-jobIntervalMin" id="d-0-jobIntervalMin" class="" style="width:30px" maxlength="2" alt="分" onkeydown="if(event.keyCode==13)event.keyCode=9" onKeyPress="if ((event.keyCode<48 || event.keyCode>57)) event.returnValue=false"/>
						</td>
					</tr>
				</table>
				</td>
			</tr>
		</table>
		</div>

</div>

 <div id="importTemplate" class="efwindow">
	<table width="300">
		<tr>
			<td>
				<div id="ef_region_import" title="请选择导入文件或Zip包" style="overflow:scroll">
					<input type="hidden" id="nodeId" name="nodeId" />
					<input type="hidden" id="nodeType" name="nodeType"/>
					<input type="hidden" id="path" name="path" value='<%=webPath%>'>
					<table>
						<tr>
							<td width="100%" id="file2">
								<!--<input type="file" name="importFile" id="importFile" contenteditable="false">-->
								
							</td>
						</tr>
					</table>
				</div>
			</td>
		</tr>
	</table>
</div>
 
<iframe id = "importFrame" name="importFrame" width=0 height=0 style="display:none"></iframe>
 
 <div id="templateupload" title="新增模板" class="efwindow">
	<div  id="ef_region_template" title="详细内容" style="width:640px;">
		<table width="100%">
 	  	<tr>
 	  	  <td>模板名称:</td>
 	  	  <td>
 	  	  	<input type="text" id="templateDefName"/>
 	  	  	<input type="hidden" id="opstatus"/>
 	  	  	<input type="hidden" id="templateDefId"/>
 	  	  	<input type="hidden" id="templateFileName"/>
 	  	  	<input type="hidden" id="template_nodeId"/>
 	  	  	<input type="hidden" id="template_nodeType"/>
 	  	  </td>
 	  	  
 	  	   <td>后缀:</td>
		   <td>
 	  	  	<input type="text" id="suffix" value="">
 	  	   </td>
 	  	   
 	  	  <td>模板类型:</td>
 	  	  <td>
 	  	  	<select id="templateTypeId" disabled = "true" style="width:150px">
 	  	  		<option value="0">站点首页模板</option>
 	  	  		<option value="1">栏目首页模板</option>
 	  	  		<option value="3">文章显示模板</option>
 	  	  	</select>
 	  	  </td>
 	  	</tr>
 	  	
 	  	<tr>
 	  	   <td>维护方式:</td>
		   <td>
 	  	  	<input type="radio" id="onlineEditMode" name="mode" value="0" onClick="editModeSelect()">在线编辑
 	  	  	<input type="radio" id="uploadMode" name="mode" value="1" onClick="editModeSelect()">上传
 	  	  </td>
 	  	  <td colspan="4">&nbsp;</td>
 	  	</tr>
 	  </table>
 	  <div id="ef_region_upload" title="上传模板" style="width:640px;display:none">
 	  	<table width="100%"> 
	 	  	  <tr>
	 	  	  	<td width="10%">模板文件:</td>
	 	  	  	<td width="15%" id="file1"></td>
	 	  	  	<td colspan="4">&nbsp;</td>
	 	  	  </tr>
	 	  	  <tr>
				<td align="left" style="color:orange;" colspan="6">
					*上传模板的编码集为UTF-8。
				</td>
			 </tr>
	 	  	  
		</table>
 	  </div>
 	  
 	  <div id="ef_region_onlineedit" title="在线编辑" style="width:640px;display:none">
	 	 <table width="100%">
	 	  	  <tr><td align = "left">在线编辑</td></tr>
			  <tr>
			  	<td>
			  		<EF:EFInput type="textarea" blockId="" row="" ename="templateContent" etc="cols='100' rows='20' style='height:300px;overflow-x:auto;overflow-y:auto'"/>
			  	</td>
			  </tr>
		</table>
 	 </div>
 	 
	</div>
</div>

<iframe id = "uploadFrame1" name="uploadFrame1" width=0 height=0 style="display:none"></iframe>
 
		<script type="text/javascript" >
			efico.setNodeIcoUrl('iplat_menu_id','efpage.menuDivBgImg');
			efico.setNodeIcoUrl('middleSplitter','efpage.middleSplitter');
		</script>
		
		
		
		
<div id="copyoption" class="efwindow" title="复制选项">
	<div id="ef_region_copyoption" title="" style="width:350px;">
		<input id="copyOption_nodeId" type="hidden"/>
		<input id="copyOption_nodeType" type="hidden"/>
		<table>
			<tr>
				<td width="100%">
					<input  type="radio"  name="copyType" value="0"  />复制当前节点	
				</td>
			</tr>
			<tr>
				<td width="100%">
					<input  type="radio"  name="copyType" value="1"  />复制所有节点(包含下级)			
				</td>
			</tr>
		</table>
	</div>		
</div>
<EF:EFRegion/>


</form>
				
	</body>

</HTML>
