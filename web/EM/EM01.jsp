<!DOCTYPE html>
<%@page pageEncoding="UTF-8" contentType="text/html;charset=UTF-8"%>

<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>
<%@page import="com.baosight.iplat4j.core.resource.I18nMessages"%>
<%
	String actionUrl = request.getContextPath() + "/DispatchAction.do";
%>
   
<html>
 <head>	
  <script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
  <script type="text/javascript" src="./EM/EM01.js"></script>
 </head>
 
<body class="bodyBackground">
 <form id="EM01" name="actionForm" method="POST" action="<%=actionUrl%>" >
  <jsp:include flush="false" page="../EF/Form/iplat.ef.head.jsp"></jsp:include>
  <EF:EFInput blockId="inqu_status" ename="render" row="0" type="hidden"/>

  <div id = "ef_region_sendsms" title="<%=I18nMessages.getText("label.EMSendMessage","发送短信") %>" efRegionShowClear=true>
   <div>
		<table>		  
		  <tr>
		    <td ><%=I18nMessages.getText("label.EMUserId","用户ID")%></td>
		    <td >
		      <input id="userID" name = "userID" type='text'/>
		    </td>
		  </tr>
		  <tr>
		      <td ><%=I18nMessages.getText("label.EMMobilePhone","手机号码")%></td>
		    <td >
		      <input  id="mobileNum" name="mobileNum"  type='text'/>
		    </td>
		  </tr>
		  <tr>
		     <td ><%=I18nMessages.getText("label.EMSendContent","发送内容")%></td>
		    <td >
		      <textarea cols="50" rows="10" id="content" name="content"/>
	          </textarea>
	          <label><font color="red">*限制只能发送250个字符</font></label>		      
		    </td>
		  </tr>
		  
		</table>
	</div>
   </div>    
		
 <jsp:include flush="false" page="../EF/Form/iplat.ef.tail.jsp"></jsp:include> 		

 </body>
</html>
