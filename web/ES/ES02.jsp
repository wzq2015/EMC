<!DOCTYPE html>
<%@ page contentType="text/html; charset=UTF-8" %>

<%@page import="com.baosight.iplat4j.core.FrameworkInfo" %>

<%
	org.acegisecurity.context.SecurityContextHolder.clearContext();
%>

<html>
	<head>
		<title>Login</title>
		<script language="JavaScript" type="text/javascript">
				if (self.parent.frames.length != 0) {
						self.parent.location=document.location;
				}
		</script>
		<script type="text/javascript" src="./EF/jQuery/jquery.js"></script>
		<script type="text/javascript" src="./EF/jQuery/jquery-select.js"></script>
		<script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
		<script type="text/javascript" src="./login.js"></script>
		<style type="text/css">
		<!--
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
			color: #330099;
		}
		-->
		</style>
	</head>

	<body bgcolor="#FFFFFF" leftmargin="0" topmargin="0" marginwidth="0" marginheight="0" background="./EF/Images/lodingbg.jpg">    
	<form action="login" method="POST">
		<table border="0" align="center" cellpadding="0" cellspacing="0">
		  <tr>
		    <td><table border="0" cellspacing="0" cellpadding="0">
		      <tr>
		        <td><table  width="779" height="595" border="0" cellpadding="0" cellspacing="0">
		          <tr>
		            <td colspan="7"><img src="./EF/Images/load_01.jpg" width="778" height="49" alt=""></td>
		            <td><img src="./EF/Images/spacer.gif" width="1" height="49" alt=""></td>
		          </tr>
		          <tr>
		            <td width="505" height="231" rowspan="3" valign="top"><table width="100%"  border="0" cellspacing="0" cellpadding="00">
		              <tr>
		                <td valign="top"><img src="./EF/Images/logo.jpg" width="505" height="95"></td>
		              </tr>
		              <tr>
		                <td height="136" valign="top" background="./EF/Images/bg01.jpg"><table width="100%"  border="0" cellspacing="1" cellpadding="1">
		                  <tr>
		                    <td height="70" align="right" class="title_white">
		                    <%=FrameworkInfo.getProjectCname() %>(<%=FrameworkInfo.getProjectEname() %>)
		                    </td>
		                    <td width="17%" class="title_white">&nbsp;</td>
		                  </tr>
		                </table></td>
		              </tr>
		            </table></td>
		            <td colspan="5"><img src="./EF/Images/load_03.jpg" width="192" height="47" alt=""></td>
		            <td rowspan="4"><img src="./EF/Images/load_04.jpg" width="81" height="232" alt=""></td>
		            <td><img src="./EF/Images/spacer.gif" width="1" height="47" alt=""></td>
		          </tr>
		          <tr>
		            <td colspan="5"><img src="./EF/Images/load_05.jpg" width="192" height="169" alt=""></td>
		            <td><img src="./EF/Images/spacer.gif" width="1" height="169" alt=""></td>
		          </tr>
		          <tr>
		            <td colspan="5"><img src="./EF/Images/load_06.jpg" width="192" height="15" alt=""></td>
		            <td><img src="./EF/Images/spacer.gif" width="1" height="15" alt=""></td>
		          </tr>
		          <tr>
		            <td rowspan="4" background="./EF/Images/load_07.jpg">&nbsp;</td>
		            <td colspan="5" rowspan="2" background="EF/Images/load_08.jpg"><table width="100%" border="0" cellspacing="0" cellpadding="0">
		              <tr>
		                <td width="50" height="20" valign="middle" class="a">用户：</td>
		                <td valign="middle">
		                  <input id="j_username" name="j_username" type="text" class="input" size="23" value="admin" ONBLUR="javascript:nameChanged()">                </td>
		              </tr>
		              <tr>
		                <td width="50" height="20" valign="middle" class="a">密码：</td>
		                <td valign="middle"><input id="j_password" name="j_password" type="password" class="input" size="25" value="admin"></td>
		              </tr>
                      <tr>
		                <td width="50" height="20" valign="middle" class="a">岗位：</td>
		                <td width="15" valign="middle">
		                  <select class="pulldown" id="j_post" name="j_post" style="width:150px" onmousedown="javascript:loadPost();" >
		                    <option value="">请选择岗位信息</option>		                 
		                  </select>
		                </td>
		              </tr>
		            </table></td>
		            <td><img src="./EF/Images/spacer.gif" width="1" height="1" alt=""></td>
		          </tr>
		          <tr>
		            <td rowspan="3"><img src="EF/Images/load_09.jpg" width="81" height="271" alt=""></td>
		            <td><img src="./EF/Images/spacer.gif" width="1" height="79" alt=""></td>
		          </tr>
		          <tr>
		            <td><img src="./EF/Images/load_10.jpg" width="75" height="22" alt=""></td>
		            <td><img src="./EF/Images/btn_login.gif" alt="" width="52" height="22" border="0" onmouseover="javascript:this.style.cursor='hand'" onclick="javascript:loginClick();"></td>
		            <td><img src="./EF/Images/load_12.jpg" width="8" height="22" alt=""></td>
		            <td><img src="./EF/Images/btn_afresh.gif" alt="" width="52" height="22" border="0" onmouseover="javascript:this.style.cursor='hand'" onclick="javascript:resetClick();"></td>
		            <td><img src="./EF/Images/load_14.jpg" width="5" height="22" alt=""></td>
		            <td><img src="./EF/Images/spacer.gif" width="1" height="22" alt=""></td>
		          </tr>
		          <tr>
		            <td colspan="5"><img src="EF/Images/load_15.jpg" width="192" height="170" alt=""></td>
		            <td><img src="./EF/Images/spacer.gif" width="1" height="170" alt=""></td>
		          </tr>
		          <tr>
		            <td colspan="7"><img src="EF/Images/load_16.jpg" width="778" height="43" alt=""></td>
		            <td><img src="./EF/Images/spacer.gif" width="1" height="43" alt=""></td>
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
