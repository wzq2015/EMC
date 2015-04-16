<!DOCTYPE html>
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
  LicenseStub.setLicenseDir(request.getSession().getServletContext().getRealPath("/WEB-INF"));
  String[] ret = LicenseStub.checkLicense2();
  boolean valid = "true".equals(ret[0]); //LicenseStub.checkLicense2();
  int days = 0;
  if (!"".equals(ret[2]) && !"0".equals(ret[2])) {
    days = Integer.parseInt(ret[2]);
  }
  String licMsg = valid?(("false".equals(ret[3]) && days >= -10 && days < 0)?"<div style='color:#ee9933;font-weight:bold;font-size:18px'>许可证还有["+(-days)+"]天将过期!</div>":""):"<div style='color:red;font-weight:bold;font-size:22px'>许可证非法!</div>";

  Exception exp = (Exception)request.getAttribute("AuthenticationException");
  String user = (String)request.getAttribute("AuthenticationUser");
  String username = "";
  String password = "";
  String captcha = "";
  if ( exp != null ){
	  username = user;
  }
%>

<html>
	<head>
		<title><%=FrameworkInfo.getProjectCname() %>[<%=FrameworkInfo.getProjectTypeDesc() %>]登录界面</title>
		<link href="./login.css" rel="stylesheet" type="text/css" />
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
			
		
		<script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
	    <script type="text/javascript" src="./login.js"></script>
    	<script language="JavaScript" type="text/javascript">
   	       self.parent.document.loginType = "popup";
         </script>
	    
	    
	</head>

	<body>
	<form id="ef-LoginForm" action="login" method="POST">
	<table class="wrap" cellpadding="0" cellspacing="0">
		<tr>
		<td class="middleWrap" >
		<div class="middle">
			<div class="middleTop" >
			<table>
			<tr>
			  <td>
			  <img class="themeImg" src="./EF/Images/login/pic.png">		
			  </td>
			  <td>
		      <table cellpadding="0" cellspacing="0" class="box">
		      <tr>
		        <td>
		        <table cellpadding="0" cellspacing="0">
		        	<tr>
		        	 <td colSpan="2">
		               <span  id="loginTip"></span> 
		             </td>
		             <td>
		             </td>

		             </tr>
		            <tr>
		                <td>
		                    <div class="user">用户名:</div>
		                </td>
		                <td>
		                    <div class="user">
		                    	<input id="p_username" name="p_username" type="text" readonly="readonly" class="inputField" onclick="return false;">
		                    </div>
		                    <script language="JavaScript" type="text/javascript">
					   	       var topWnd = getTopWnd();
					   	       var loggedUser = topWnd.document.getElementById("userName").value;
					   	       $('#p_username').val(loggedUser);
				            </script>
	    
		                 </td>
		             </tr>
		             <tr>
		                 <td>
		                    <div class="pwd">密&nbsp;&nbsp;码:</div>
		                </td>
		                <td>
		                    <div class="pwd">
		                    	<input id="p_password" name="p_password" type="password" class="inputField" value="<%=password%>" onFocus="passwordOnFocus()" onkeypress="keyPressLogin(event)">
		                    </div>
		                 </td>
		             </tr>
		              <%
		              boolean isInternational = FrameworkInfo.isInternational();
		              if(isInternational) {
		              CodesetBiz codeBiz = (CodesetBiz) SpringApplicationContext
						.getBean("codesetBiz");

		      			List optionList = codeBiz.getCodeSet("iplat.locale",null);

		      			out.print("<tr><td><div class='language'><div>语&nbsp;&nbsp;言:</div></td>");
		      			out.print("<td><div class='language'><select name='locale' id='locale' class='languageSelect'>");

		      			StringBuffer sBuf = new StringBuffer();
		    			String optionValue = null;
		    			String optionLabel = null;
		      			for(int i=0; i< optionList.size(); i++)
		    			{
		    				optionValue = ((HashMap)optionList.get(i)).get("value").toString();
		    				optionLabel = ((HashMap)optionList.get(i)).get("label").toString();
		    				sBuf.append("<option value=\"");
		    				sBuf.append(optionValue);


		    				sBuf.append("\" >");

		    				sBuf.append(optionLabel);
		    				sBuf.append("</option>\n");
		    			}
		      			out.print(sBuf.toString());
		      			out.println("</select></div>");
		      			out.print("</td></tr>");
		              }
		      			%>
		      		<%
		             if(FrameworkInfo.isCaptchaEnabled()) {
		             %>
		             <tr>
		                 <td>
		                    <div class="identifyingcodediv">验证码:</div>
		                </td>
		                <td>
		                    <div class="identifyingcodediv">
		                    	<input id="p_captcha" name="p_captcha" type="text" class="identifyingcodeInputField" value="<%=captcha%>" style="vertical-align:top;" onFocus="captchaOnFocus()" onkeypress="keyPressLogin(event)">
		                        <img class="identifyingcodeImg" src="./captcha.jpg" style="vertical-align:top;cursor:pointer;" title="点击刷新" onclick="javacript:this.src='./captcha.jpg?'+(new Date()).getTime();" />	                        
		                    </div>
		                 </td>
		             </tr>
		             <%
		             }
		             %>
		        </table>
		        </td>
		      </tr>
		      </table>
		      </td>
		    </tr>
		    </table>
		    </div>
			<div class="middleBottom">
				<table>
				<tr>
					<td>
					<div class="hotlineMessageDiv">
	           			 运维平台热线<br>
	           			 8008200220&nbsp;73145&nbsp;66680339
	            	</div>
					</td>
		             	<td>
		                	<div class="buttonBox">
		                        <div id="loginbutton"><a class="buttonLink" href="#" onmouseover="loginbuttondiv.className='loginbutton-on'" onmouseout="loginbuttondiv.className='loginbutton'" onmousedown="loginbuttondiv.className='loginbutton-pressed'" onmouseup="loginbuttondiv.className='loginbutton'" onclick="javascript:loginClick();"><div id=loginbuttondiv class="loginbutton"  onmouseover="this.style.cursor='hand'"></div></a>
		                        <a class="buttonLink" href="DispatchAction.do?efFormEname=EP09" onmouseover="resetbuttondiv.className='resetbutton-on'" onmouseout="resetbuttondiv.className='resetbutton'" onmousedown="resetbuttondiv.className='resetbutton-pressed'" onmouseup="resetbuttondiv.className='resetbutton'" onclick="javascript:resetClick();"><div id=resetbuttondiv class="resetbutton" onmouseover="this.style.cursor='hand'"></div></a></div>
		                    </div>
		                </td>
				</tr>
				</table>
			</div>
			</div>
		</td>
		</tr>
	</table>
	</form>
  	</body>
</html>

