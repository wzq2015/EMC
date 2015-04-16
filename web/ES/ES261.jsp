<!DOCTYPE html>
<%@page pageEncoding="UTF-8" contentType="text/html;charset=UTF-8"%>

<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>
<%
	String actionUrl = request.getContextPath() + "/DispatchAction.do";
	String etc1 =  "onblur=efvalidateObjectNode(this,true,true) maxLength='256' regex='/^[a-z0-9]{1,256}$/i' nullable='false' minLength='1' maxLength='256' errorPrompt='"+I18nMessages.getText("label.EFSorry","对不起") +"," +I18nMessages.getText("label.ESUserIdRestraint","用户名只能是256位英文字母或者数字字符。")+"'";
	String etc2 =  "onblur=efvalidateObjectNode(this,true,true) maxLength='30' regex='/^[^\\x22\\x27]+$/' nullable='false' minLength='1' maxLength='30' errorPrompt='"+ I18nMessages.getText("label.EFSorry","对不起")+","+I18nMessages.getText("label.ESUserCnameRestraint","用户姓名应该由至少一个，最多30个字节大小的字符组成，并且不能包含控制字符和单，双引号。")+"'"; 
	String etc3 =  "onblur=efvalidateObjectNode(this,true,true) maxLength='18' regex='/^[0-9a-zA-Z#*]{0,24}$/' nullable='true'  maxLength='18' errorPrompt='"+I18nMessages.getText("label.EFSorry","对不起")+","+I18nMessages.getText("label.ESUserIdcardNoRestraint","身份证件号码由少于等于18个数字字符,字母，#和*组成。")+"'";
%>
<%@page import="com.baosight.iplat4j.core.resource.I18nMessages"%>
<html>
<head>	
  <script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
  <script type="text/javascript" src="./ES/ES261.js"></script>
</head>
 
<body class="bodyBackground">
<form id="ES261" method="POST" action="<%=actionUrl%>" >

<jsp:include flush="false" page="../EF/Form/iplat.ef.head.jsp"></jsp:include>
  
  <div id = "ef_region_result" title="<%=I18nMessages.getText("label.EFUserDetail","用户详情") %>" efRegionShowClear=true>
   <div>	
		<table>		  
		  <tr>
		    <td  nowrap width="15%">工号</td>
		    <td   width="85%">
			  <EF:EFInput blockId="inqu_status" ename="userId" row="0" 
			  etc="<%=etc1%>"
			  />
			  <span id="inqu_status-0-userId-prompt" color=red style='background-color:white;'>【您的工号】</span>	<EF:EFButton ename="checkUser" type="button" cname='<%=I18nMessages.getText("label.ESCheckUserIdIsExist","检测用户是否存在") %>' />
		    </td>
		   </tr> 
		   <tr> 
		    <td  nowrap width="15%">姓名</td>
		    <td   width="85%">
			  <EF:EFInput blockId="inqu_status" ename="userCname" row="0" trim="false"
			  etc="<%=etc2%>"/>	
			  <span id="inqu_status-0-userCname-prompt" color=red style='background-color:white;'>【<%=I18nMessages.getText("label.ESUserCnameRestraint","用户姓名应该由字符组成，不能包含控制字符和单，双引号。") %>】</span>			
		    </td>	
		   </tr> 


		   <tr > 
		    <td  nowrap width="15%">密码</td>
		    <td   width="85%">
			  <EF:EFInput blockId="inqu_status" ename="userPassword" etc="type='password'" row="0" trim="false"/>	
			  <span id="inqu_status-0-userPassword-prompt" color=red style='background-color:white;'>【请输入密码】</span>	
		    </td>	
		   </tr> 
		   
		   <tr > 
		    <td  nowrap width="15%">重复密码</td>
		    <td   width="85%">
			  <EF:EFInput blockId="inqu_status" ename="userPassword1" etc="type='password'" row="0" trim="false"/>
			  <span id="inqu_status-0-userPassword1-prompt" color=red style='background-color:white;'>【请再次输入密码】</span>				
		    </td>	
		   </tr> 
			<tr > 
		    <td  nowrap width="15%">身份证号</td>
		    <td   width="85%">
			  <EF:EFInput blockId="inqu_status" ename="userIdcardNo" row="0" trim="false"/>	
			  <span id="inqu_status-0-userIdcardNo-prompt" color=red style='background-color:white;'>【请输入身份证号】</span>	
		    </td>	
		   </tr> 
		   <tr> 
		    <td  nowrap width="15%"><%=I18nMessages.getText("E_Col.userMobile","手机号码") %></td>
		    <td   width="85%">
			  <EF:EFInput blockId="inqu_status" ename="userMobile" row="0" trim="false"
			  etc="onblur=efvalidateObjectNode(this,true,true) maxLength='11' validateType='mobile_phone' "/>
			  <span id="inqu_status-0-userMobile-prompt" color=red style='background-color:white;'>【13、15或者18开头的11位长的数字，必填】</span>				
		    </td>	
		   </tr> 
		   
		   <tr> 
		    <td  nowrap width="15%"><%=I18nMessages.getText("E_Col.userEmail","电子邮件") %></td>
		    <td   width="85%">
			  <EF:EFInput blockId="inqu_status" ename="userEmail" row="0" trim="false"
			  etc="onblur=efvalidateObjectNode(this,true,true) maxLength='64' validateType='email' "/>
			  <span id="inqu_status-0-userEmail-prompt" color=red style='background-color:white;'>【字母、数字、\".\"、\"_\"、\"-\")@(字母数字_-).(字母数字)，总长不能超过64位，必填】</span>				
		    </td>	
		   </tr> 		

		   
		</table>
	</div>
   </div>  
  <EF:EFRegion/>
 
 </form>
 </body>
</html>
