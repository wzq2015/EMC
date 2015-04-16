<%@ page contentType="text/html; charset=UTF-8" %>
<%@ taglib uri="http://www.baosight.com/ec" prefix="template"%>
<%@page import="com.baosight.iplat4j.core.FrameworkInfo" %>

<%
  Exception exp = (Exception)request.getAttribute("AuthenticationException");
  String user = (String)request.getAttribute("AuthenticationUser");
  String username = "admin";
  String password = "admin";
  if ( exp != null ){
	  username = user;
  }
%>

<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<title><%=FrameworkInfo.getProjectCname() %>[<%=FrameworkInfo.getProjectTypeDesc() %>]登录界面</title>
		<script language="JavaScript" type="text/javascript">
				if (self.parent.frames.length != 0) {
						self.parent.location=document.location;
				}
		</script>
		<script type="text/javascript" src="./EF/jQuery/jquery.js"></script>
		<script type="text/javascript" src="./EF/EF.js"></script>
		<script type="text/javascript" src="./login.js"></script>
		<style type="text/css">
		.title_white {
			color: #FFFFFF;
			font-size: 26px;
			font-weight: bold;
			font-family: "";
		}

		td{
		color:#FFFFFF;
		}
		a:link{
			color:white;
		}
		a:hover{
			color:333333;
			text-decoration:underline;
		}
		.a {
			font-size: 12px;
			color: #FFFFFF;
			text-decoration: none;
		}
		.input {
			height: 15px;
			border-top-width: 0px;
			border-right-width: 0px;
			border-bottom-width: 0px;
			border-left-width: 0px;
			font-size: 12px;
			font-family: arail;
			color: #330099;
		}

		</style>
	</head>

	<body bgcolor="#FFFFFF" leftmargin="0" topmargin="0" marginwidth="0" marginheight="0" background="<%=request.getContextPath()+request.getParameter("imagespath")%>/lodingbg.jpg">    
	<form action="login" method="POST">
		<table border="0" align="center" cellpadding="0" cellspacing="0">
		  <tr>
		    <td><table border="0" cellspacing="0" cellpadding="0">
		      <tr>
		        <td>
				<table  width="779" height="595" border="0" cellpadding="0" cellspacing="0">
		          <tr>
		            <td colspan="7" width="778" height="49"><img src="<%=request.getContextPath()+request.getParameter("imagespath")%>/load_01.jpg" alt=""></td>
		            <td><img src="<%=request.getContextPath()+request.getParameter("imagespath")%>/spacer.gif" width="1" height="49" alt=""></td>
		          </tr>
		          <tr>
		            <td width="505" height="231" rowspan="3" valign="top"><table width="100%"  border="0" cellspacing="0" cellpadding="00">
		              <tr>
		                <td valign="top" background="<%=request.getContextPath()+request.getParameter("imagespath")%>/logo.jpg" width="505" height="95"></td>
		              </tr>
		              <tr>
		                <td height="136" valign="top" background="<%=request.getContextPath()+request.getParameter("imagespath")%>/bg01.jpg"><table width="100%"  border="0" cellspacing="1" cellpadding="1">
		                  <tr>
		                    <td height="70" align="right" class="title_white">
		                    <%=FrameworkInfo.getProjectCname() %>
		                    <br/><%=FrameworkInfo.getProjectTypeDesc() %>
		                    <br/><span class="a">请使用IE6进行访问</span>
		                    <br/><%=FrameworkInfo.getProjectHint() %>
							</td>
		                    <td width="17%" class="title_white">&nbsp;</td>
		                  </tr>
		                </table></td>
		              </tr>
		            </table></td>
		            <td width="192" colspan="5" rowspan="3" background="<%=request.getContextPath()+request.getParameter("imagespath")%>/load_30.jpg"></td>
		            <td rowspan="4" background="<%=request.getContextPath()+request.getParameter("imagespath")%>/load_04.jpg"></td>
		            <td><img src="<%=request.getContextPath()+request.getParameter("imagespath")%>/spacer.gif" width="1" height="47" alt=""></td>
		          </tr>
		          <tr>
		            <td height="169"><img src="<%=request.getContextPath()+request.getParameter("imagespath")%>/spacer.gif" width="1" height="169" alt=""></td>
		          </tr>
		          <tr>
		            <td height="15"><img src="<%=request.getContextPath()+request.getParameter("imagespath")%>/spacer.gif" width="1" height="15" alt=""></td>
		          </tr>
		          <tr>
		            <td rowspan="4" background="<%=request.getContextPath()+request.getParameter("imagespath")%>/load_07.jpg" align="center" valign="top">
					  <table align="right" width="60%">
					  	<tr>
						  <td class="title_link"><template:union id="1" name="留白1"></template:union></td>
						</tr>
					  </table>
					</td>
		            <td colspan="5" rowspan="2" background="<%=request.getContextPath()+request.getParameter("imagespath")%>/load_08.jpg">
					<table width="100%" border="0" cellspacing="0" cellpadding="0">
		              <tr>
		                <td width="50" height="20" valign="middle" class="a">用户：</td>
		                <td valign="middle">
		                  <input id="p_username" name="p_username" type="text" class="input" style="width: 150px"  value="<%=username%>"  onFocus="usernameOnFocus()" onKeyPress="keyPressLogin()"></td>
		              </tr>
		              <tr>
		                <td width="50" height="20" valign="middle" class="a">密码：</td>
		                <td valign="middle">
		                  <input id="p_password" name="p_password" type="password" class="input" style="width: 150px"  value="<%=password%>" onFocus="passwordOnFocus()" onKeyPress="keyPressLogin()">		                </td>
		              </tr>
		            </table>					</td>
		            <td><img src="<%=request.getContextPath()+request.getParameter("imagespath")%>/spacer.gif" width="1" height="1" alt=""></td>
		          </tr>
		          <tr>
		            <td rowspan="3" background="<%=request.getContextPath()+request.getParameter("imagespath")%>/load_09.jpg" width="81" height="271"></td>
		            <td><img src="<%=request.getContextPath()+request.getParameter("imagespath")%>/spacer.gif" width="1" height="79" alt=""></td>
		          </tr>
		          <tr>
		            <td><img src="<%=request.getContextPath()+request.getParameter("imagespath")%>/load_10.jpg" width="75" height="22" alt=""></td>
		            <td><img src="<%=request.getContextPath()+request.getParameter("imagespath")%>/btn_login.gif" alt="" width="52" height="22" border="0" onMouseOver="javascript:this.style.cursor='hand'" onClick="javascript:loginClick();"></td>
		            <td><img src="<%=request.getContextPath()+request.getParameter("imagespath")%>/load_12.jpg" width="8" height="22" alt=""></td>
		            <td><img src="<%=request.getContextPath()+request.getParameter("imagespath")%>/btn_afresh.gif" alt="" width="52" height="22" border="0" onMouseOver="javascript:this.style.cursor='hand'" onClick="javascript:resetClick();"></td>
		            <td><img src="<%=request.getContextPath()+request.getParameter("imagespath")%>/load_14.jpg" width="5" height="22" alt=""></td>
		            <td><img src="<%=request.getContextPath()+request.getParameter("imagespath")%>/spacer.gif" width="1" height="22" alt=""></td>
		          </tr>
		          <tr>
		            <td colspan="5" background="<%=request.getContextPath()+request.getParameter("imagespath")%>/load_15.jpg" width="192" height="170"><template:union id="2" name="留白2"></template:union></td>
		            <td><img src="./EF/Images/spacer.gif" width="1" height="170" alt=""></td>
		          </tr>
		          <tr>
		            <td colspan="7" background="<%=request.getContextPath()+request.getParameter("imagespath")%>/load_16.jpg" width="778" height="43" class="a" align="center">运维平台热线<br/>8008200220 73145 66680339</td>
		            <td><img src="<%=request.getContextPath()+request.getParameter("imagespath")%>/spacer.gif" width="1" height="43" alt=""></td>
		          </tr>
		        </table></td>
		        <td><table height="595" border="0" cellpadding="0" cellspacing="0">
		          <tr>
		            <td height="15">&nbsp;</td>
		          </tr>
		          <tr>
		            <td bgcolor="#094B6C">&nbsp;</td>
		          </tr>
		        </table></td>
		      </tr>
		    </table></td>
		  </tr>
		  <tr>
		    <td><table width="100%" border="0" cellspacing="0" cellpadding="0">
		      <tr>
		        <td width="15">&nbsp;</td>
		        <td height="9" bgcolor="#094B6C">&nbsp;</td>
		      </tr>
		    </table></td>
		  </tr>
		</table>
    </form>
  </body>
</html>
<script language="JavaScript" type="text/javascript">
<% 
  if ( exp!=null ){
    String msg = exp.getMessage();
%>
	alert("<%=msg%>");
<% } %>
</script>
