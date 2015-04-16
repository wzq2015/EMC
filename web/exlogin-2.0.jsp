<%@ page contentType="text/html; charset=UTF-8" %>

<%@page import="com.baosight.iplat4j.core.FrameworkInfo" %>
<%@page import="com.baosight.license.LicenseStub" %>

<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>

<%@ page language="java" import="java.util.List"%>
<%@ page language="java" import="java.util.Map"%>
<%@ page language="java" import="java.util.HashMap"%>
<%@ page language="java" import="com.baosight.iplat4j.core.spring.SpringApplicationContext"%>
<%@ page language="java" import="com.baosight.iplat4j.ed.util.CodesetBiz" %>


<%
	org.acegisecurity.context.SecurityContextHolder.clearContext();
	LicenseStub.setLicenseDir(application.getRealPath("/WEB-INF"));
	String[] ret = LicenseStub.checkLicense2();
	boolean valid = "true".equals(ret[0]); //LicenseStub.checkLicense2();
	int days = 0;
	if (!"".equals(ret[2]) && !"0".equals(ret[2])) {
		days = Integer.parseInt(ret[2]);
	}
	String licMsg = valid ? (("false".equals(ret[3]) && days >= -10 && days < 0) ? "<div style='color:#ee9933;font-weight:bold;font-size:18px'>许可证还有[" + (-days) + "]天将过期!</div>" : "")
			: "<div style='color:red;font-weight:bold;font-size:22px'>许可证非法!</div>";

	Exception exp = (Exception) request.getAttribute("AuthenticationException");
	String user = (String) request.getAttribute("AuthenticationUser");
	String username = "";
	String password = "";
	String captcha = "";
	if (exp != null) {
		username = user;
	}

	String usrHeader = request.getHeader("user-agent");
%>

<html>
	<head>
		<title><%=FrameworkInfo.getProjectCname()%>登录界面</title>
		<script language="JavaScript" type="text/javascript">
				if (self.parent.frames.length != 0) {
						self.parent.location=document.location;
				}
		</script>
		    <%
		    	String domain = FrameworkInfo.getProjectAppTopDomain();
		    	if (domain != null && domain.startsWith(".")) {
		    		domain = domain.substring(1);
		    %>
	    <script type="text/javascript">
	        try {
	            document.domain='<%=domain%>';
	        } catch (ex) {
	            alert('domain not valid[<%=domain%>]');
	        }
	    </script>
	    <%
	    	}
	    %>

		<script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
		<script type="text/javascript" src="./EF/jQuery/reflection.js"></script>
		<script type="text/javascript" src="./login.js"></script>
		<link href="./exlogin-2.0.css" rel="stylesheet" type="text/css" />
		<style>
			html,body { 
				margin:0px;
				height:100%;
				overflow:hidden
			}
		</style>
	</head>

	<body id="home" class="homeBackInit">
	
	<form id="ef-LoginForm" action="login" method="POST">
	<!-- 页面背景 -->
	<div id="homeBackGround">
      <img id="homeBackGroundImg" src="./EF/Images/login/loginbg7.jpg" class="homeImgStretch" alt="" />
    </div>	

	<div id="page">

	<div id="header">
		<table border="0" cellspacing="0" cellpadding="0" style="width: 100%; height: 100%">
			<tr>
				<td class="leftBanner">
					<div>
						<img src="./EF/Images/login/login-logo.png" >
					</div>
				</td>
				<td class="titleLabel" style="line-height:70px;color:white;font-weight:bold;font-size:20px">
				    远程能源管理系统
				</td>
				<td class="topRightLabel">
					
				</td>
			</tr>
		</table>
	</div>

	<div id="hero">
		<div id="login-panel">
		  <table cellpadding="0" cellspacing="0">
			<tr>
			<td width=150px height=200px align="center">
				  <img src="./EF/Images/login/pic.png">		
		    </td>
			<td width=250px align="right">
			  <table>
		          <!-- 第一行 用户 -->
			      <tr>
			          <td align="right">用户名:</td>
			          <td><input id="p_username" name="p_username" type="text" class="inputField" value="<%=username%>"  onFocus="usernameOnFocus()" onkeypress="keyPressLogin(event)"></td>
			       </tr>
		          <!-- 第二行 密码 -->
			       <tr>
			           <td align="right">密码:</td>
			           <td><input id="p_password" name="p_password" type="password" class="inputField" value="<%=password%>" onFocus="passwordOnFocus()" onkeypress="keyPressLogin(event)"></td>
			       </tr>
			             
		          <!-- 登陆按钮行 -->
			       <tr>
			         <td colspan=2>
			         	<span style="width:150px"></span>
			            <a class="buttonLink" href="#" onmouseover="loginbuttondiv.className='loginbutton-on'" onmouseout="loginbuttondiv.className='loginbutton'" onmousedown="loginbuttondiv.className='loginbutton-pressed'" onmouseup="loginbuttondiv.className='loginbutton'" onclick="javascript:loginClick();">
				            <div id=loginbuttondiv class="loginbutton" onmouseover="this.style.cursor='hand'">
				            </div>
			            </a>
	             	    <input id="p_header" name="p_header" type="hidden" value="<%=usrHeader%>"/>
			          </td>
			       </tr>
			  </table>
			</td>
			</tr>
	      </table>
		</div>
	
		<div id="hintDiv" style="text-align:right;padding:10px;font-size:14px">
			常用软件下载：&nbsp&nbsp&nbsp&nbsp&nbsp<br>
			<a href="Silverlight.exe">32位Silverlight下载</a><br>
			<a href="Silverlight_x64.exe">64位Silverlight下载</a>
		</div>
	</div>
		
		<div id="footer" >
			<table border="0" cellspacing="0" cellpadding="0" style="width: 100%; height: 100%">
				<tr>
					<td class="topLeftLabel">
						
					</td>
					<td class="bottomRightLabel" style="line-height:50px;font-size:15px">
					    <span>上海宝钢节能环保技术有限公司</span>
					</td>
				</tr>
			</table>
		</div>
	</div>

    </form>
  	</body>
</html>