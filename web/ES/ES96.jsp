<!DOCTYPE html>
<%@page pageEncoding="UTF-8" contentType="text/html;charset=UTF-8"%>

<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld"%>

<%
	String contextpath = request.getContextPath();
	String baseUrl = contextpath;
	String listUrl = baseUrl + "/DispatchAction.do";
	String etc1 =  "regex='/^[^\\x22\\x27]+$/' nullable='false' minLength='1' maxLength='30' errorPrompt='"+I18nMessages.getText("label.EFSorry","对不起") +"," +I18nMessages.getText("label.ESUserCnameRestraint","对不起,用户姓名应该由至少一个，最多30个字节大小的字符组成，并且不能包含控制字符和单，双引号。")+"'";
	String etc2 =  "regex='/^[0-9a-zA-Z#*]{0,24}$/' nullable='true'  maxLength='18' errorPrompt='"+I18nMessages.getText("label.EFSorry","对不起")+","+I18nMessages.getText("label.ESUserIdcardNoRestraint","身份证件号码由少于等于18个数字字符,字母，#和*组成。")+"'";
	String etc3 =  "regex='/^[^\\x22\\x27]+$/' nullable='true' minLength='1' maxLength='16' errorPrompt='"+I18nMessages.getText("label.EFSorry","对不起")+","+I18nMessages.getText("label.ESUserOrgCodeRestraint","组织机构代码应该由至少一个，最多16个字节大小的字符组成，并且不能包含控制字符和单，双引号。")+"'";
	String etc4 =  "regex='/^[^\\x22\\x27]+$/' nullable='true' minLength='1' maxLength='100' errorPrompt='"+I18nMessages.getText("label.EFSorry","对不起")+","+I18nMessages.getText("label.ESUserOrgNameRestraint","组织机构名称应该由至少一个，最多100个字节大小的字符组成，并且不能包含控制字符和单，双引号。")+"'";

%>
<%@page import="com.baosight.iplat4j.core.resource.I18nMessages" %>
<html>
<head>
<script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
<script type="text/javascript" src="./ES/ES96.js"></script>
</head>

<body class="bodyBackground">
 <form method="POST" action="<%=listUrl%>">
   <jsp:include	flush="false" page="../EF/Form/iplat.ef.head.jsp"></jsp:include>
   <input type="hidden" id="inqu_status-parent" name="inqu_status-parent" value="" />
     <div id="org" title="<%=I18nMessages.getText("label.ESMyInformation","我的信息") %>" >
	  <div id = "ef_region_result" title="<%=I18nMessages.getText("label.ESUserDetail","用户详情") %>" >
	   <div>	
			<table>
			  <tr>
			    <td  nowrap width="15%"><%=I18nMessages.getText("E_Col.userId","用户标识") %></td>
			    <td   width="85%">
				  <EF:EFInput blockId="inqu_status" ename="userId" row="0" 
				  etc="readonly "/>					
			    </td>
			   </tr> 
			   <tr> 
			    <td  nowrap width="15%"><%=I18nMessages.getText("E_Col.userCname","用户中文名") %></td>
			    <td   width="85%">
				  <EF:EFInput blockId="inqu_status" ename="userCname" row="0" trim="false"
				  etc="<%=etc1%>"/>					
			    </td>
			   </tr>
	
			   <tr style="display:none">
			    <td  nowrap width="15%"><%=I18nMessages.getText("E_Col.userType","用户类型") %></td>
			    <td   width="85%">
				  <EF:EFInput blockId="inqu_status" ename="userType" row="0" etc="readonly"/>					
			    </td>	
			   </tr> 
			   <tr > 
			    <td  nowrap width="15%"><%=I18nMessages.getText("E_Col.userIdcardNo","用户身份证号") %></td>
			    <td   width="85%">
				  <EF:EFInput blockId="inqu_status" ename="userIdcardNo" row="0" trim="false"
				  etc="<%=etc2%>"/>					
				  					
			    </td>	
			   </tr> 
	
			   <tr> 
			    <td  nowrap width="15%"><%=I18nMessages.getText("E_Col.userOrgCode","组织机构代码") %></td>
			    <td   width="85%">
				  <EF:EFInput blockId="inqu_status" ename="userOrgCode" row="0" trim="false"			  
				  etc="<%=etc3%>"/>					
			    </td>	
			   </tr> 
	
			   <tr> 
			    <td  nowrap width="15%"><%=I18nMessages.getText("E_Col.userOrgName","组织机构名称") %></td>
			    <td   width="85%">
				  <EF:EFInput blockId="inqu_status" ename="userOrgName" row="0" trim="false"		 
				   etc="<%=etc4%>"/>					
			    </td>	
			   </tr> 
			   
			   <tr> 
			    <td  nowrap width="15%"><%=I18nMessages.getText("E_Col.userTel","电话号码") %></td>
			    <td   width="85%">
				  <EF:EFInput blockId="inqu_status" ename="userTel" row="0" trim="false"
				  etc="maxLength='24' validateType='phone_with_area_code' "/>					
			    </td>	
			   </tr> 
	
			   <tr> 
			    <td  nowrap width="15%"><%=I18nMessages.getText("E_Col.userMobile","手机号码") %></td>
			    <td   width="85%">
				  <EF:EFInput blockId="inqu_status" ename="userMobile" row="0" trim="false"
				  etc="validateType='mobile_phone' "/>					
			    </td>	
			   </tr> 
			   
			   <tr> 
			    <td  nowrap width="15%"><%=I18nMessages.getText("E_Col.userEmail","电子邮件") %></td>
			    <td   width="85%">
				  <EF:EFInput blockId="inqu_status" ename="userEmail" row="0" trim="false"
				  etc="maxLength='64' validateType='email' "/>					
			    </td>	
			   </tr> 		
	
			   <tr> 
			    <td  nowrap width="15%"><%=I18nMessages.getText("E_Col.userLock","是否锁定") %></td>
			    <td   width="85%">
				  <EF:EFInput blockId="inqu_status" ename="userLock" row="0" type="checkbox" value="1" trim="false" />					
			    </td>	
			   </tr> 	
			   
			   <tr style = "display:none"> 
				<td nowrap width="15%"><%=I18nMessages.getText("E_Col.userDetail","描述") %></td>
				<td  width="85%">
					<EF:EFInput blockId="inqu_status" ename="userDetail" row="0"
					type="textarea" trim="false"
					etc="cols='100' rows='6'" />
				</td>				
			   </tr> 		      
			</table>
		</div>
	   </div>  
     </div>

    <EF:EFRegion />
    
  </form>
 </body>
</html>
