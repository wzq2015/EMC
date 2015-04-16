<!DOCTYPE html>
<%@ page contentType="text/html; charset=UTF-8"%>

<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>
<%
	String actionUrl = request.getContextPath() + "/DispatchAction.do";
%>


<%@page import="com.baosight.iplat4j.core.resource.I18nMessages"%><html>
<head>	
  <script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
  <script type="text/javascript" src="./EC/EC31.js"></script>
</head>
 
<body class="bodyBackground">
<form id="EC31" method="POST" action="<%=actionUrl%>" >

<jsp:include flush="false" page="../EF/Form/iplat.ef.head.jsp"></jsp:include>
    <input type="hidden" id="inqu_status-parent" name="inqu_status-parent" value="" />
    <input type="hidden" id="roleTypeCode" name="roleTypeCode" value="" />
 	<div id = "ef_region_top"  efRegionShowClear=false>
 	<div>
    	<table id="mainFrameTable" width="100%" height="82%"  cellspacing=0 >
		  <tr height=100%>
			 
			 <td id="left" vAlign="top" width="30%" height="100%" style="padding-top:10px;">
   <div id = "ef_region_role" title="角色类型列表" style="overflow:scroll"> 
	 <div id = "ef_grid_role" title="角色类型列表" style="overflow: hidden;height:300px;">
     </div>
   </div>
			 </td>
			 
			<td id="middleSplitter" width="60px" vAlign="middle" style='cursor:e-resize'>
		  		<IMG id="img_splitter_id" 
		  			onload="efico.setImageSrc(this,'efform.imgVgrabber')" src="./EF/Images/eftree_blank.png">
        	</td>
			
			<td id="rightContent" width=100% vAlign="top" style="padding-top:10px;">
   				<div id = "ef_region_roleUser" title="角色下人员信息" style="overflow:scroll"> 
		        	<div id = "ef_grid_roleUser" title="角色下人员信息" style="overflow: hidden;height:200px;">
		           	</div>
				</div>
	        <br/>
   				<div id = "ef_region_user" title="人员信息" style="overflow:scroll"> 
		        	<div id = "ef_grid_user" title="人员信息" style="overflow: hidden;height:380px;">
		           	</div>
				</div>
				
	        </td>
	        
		  </tr>
	    </table>
	</div>    
    </div>

	<EF:EFRegion/>
  <EF:EFGrid blockId="role"  autoDraw="yes" readonly="false" ajax="false" paintId="ef_grid_role" style="navigationBar:false;" >
     <EF:EFColumn ename="id" visible="false"/>
     <EF:EFColumn ename="label" width="80" cname="角色代码" fix="yes" sort="false" nullable="false" minLength='0' maxLength='128' validateErrorPrompt='<%= I18nMessages.getText("ep.ESRoleTypeLabelError","对不起,角色类型标签应该最多128个字节大小的字符组成。") %>'/>
     <EF:EFColumn ename="name"  width="80" cname="角色名称" nullable='true' minLength='0' maxLength='128' validateErrorPrompt='<%= I18nMessages.getText("ep.ESRoleTypeNameError","对不起,角色类型名称应该最多128个字节大小的字符组成。") %>'/>
     <EF:EFColumn ename="showUser" cname="用户查看" enable="false" visible="true" width="60"/>
	 <EF:EFColumn ename="rec_creator" visible="false" />
	 <EF:EFColumn ename="rec_create_time" visible="false" />
	 <EF:EFColumn ename="rec_revisor" visible="false" />
	 <EF:EFColumn ename="rec_revise_time" visible="false" />
	 <EF:EFColumn ename="archive_flag" visible="false"/>
  </EF:EFGrid>
  
    <EF:EFGrid blockId="user" autoDraw="no" ajax="true" paintId="ef_grid_user" style="navigationBar:false;" >
    <EF:EFColumn ename="userId" fix="yes" width="100" sort="false"/>
    <EF:EFColumn ename="userCname" fix="yes" width="120" sort="false"/>

    <EF:EFColumn ename="userMobile" visible="true" enable="true" width="120"/>
    <EF:EFColumn ename="userEmail" visible="true" enable="true" width="180"/>
    <EF:EFColumn ename="idcardNo" visible="false" enable="false" readonly="true" width="150"/>    
    <EF:EFColumn ename="recCreator" visible="false" enable="false" readonly="true"/>
    <EF:EFColumn ename="recCreateTime" visible="false" enable="false" readonly="true"/>
    <EF:EFColumn ename="recRevisor" visible="false" enable="false" readonly="true"/>
    <EF:EFColumn ename="recReviseTime" visible="false" enable="false" readonly="true"/>  
    
    <EF:EFColumn ename="orgCode" sort="false" visible="false"/>
    <EF:EFColumn ename="orgName" width="200" sort="false" visible="false"/>
    </EF:EFGrid>
  
    <EF:EFGrid blockId="roleUser" autoDraw="yes"   ajax="true" paintId="ef_grid_roleUser" style="navigationBar:false;operationBar:false" >
    <EF:EFColumn ename="userId" fix="yes" width="100" sort="false"/>
    <EF:EFColumn ename="userCname" fix="yes" width="120" sort="false"/>

    <EF:EFColumn ename="userMobile" visible="true" enable="false" readonly="true" width="120"/>
    <EF:EFColumn ename="userEmail" visible="true" enable="false" readonly="true" width="180"/>
    <EF:EFColumn ename="idcardNo" visible="false" width="150"/>   
    <EF:EFColumn ename="roleLable" visible="false" width="150"/>   
    <EF:EFColumn ename="recCreator" visible="false" enable="false" readonly="true"/>
    <EF:EFColumn ename="recCreateTime" visible="false" enable="false" readonly="true"/>
    <EF:EFColumn ename="recRevisor" visible="false" enable="false" readonly="true"/>
    <EF:EFColumn ename="recReviseTime" visible="false" enable="false" readonly="true"/>   
    
    <EF:EFColumn ename="orgCode" sort="false" visible="false"/>
    <EF:EFColumn ename="orgName" width="200" sort="false" visible="false"/>
    </EF:EFGrid>
    
    
    
 
    
    
</form>

</body>
</html>
