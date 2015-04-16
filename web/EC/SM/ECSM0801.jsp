<!DOCTYPE html>
<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>

<%@ page import= "com.baosight.iplat4j.ec.util.TemplateConstant" %>
<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>

<%

String templateDefId = request.getParameter("templateDefId");
String suffix = request.getParameter("suffix");
String templateDefName = request.getParameter("templateDefName");
String templateTypeId = request.getParameter("templateTypeId");
String templateFileName = request.getParameter("templateFileName");

String nodeId = request.getParameter("nodeId");
String nodeType = request.getParameter("nodeType");
String opstatus = request.getParameter("opstatus");
com.baosight.iplat4j.core.threadlocal.UserSession.web2Service(request);
%>

<html>
<head>
<title>新增模板
</title>

<script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
<script type="text/javascript" src="./EC/SM/ECSM0801.js"></script>
</head>
<body class="bodyBackground">
  <form id="ECSM0801" name='form1' method="POST"  action="" enctype="multipart/form-data">
	<jsp:include flush="false" page="../../EF/Form/iplat.ef.head.jsp"></jsp:include>
	<div id = "ef_region_result" title="上传文件"  >
	  <input type='hidden' id='templateDefId' name='templateDefId' value='<%=templateDefId%>'/>
	  <input type='hidden' id='nodeId' name='nodeId' value='<%=nodeId%>'/>
	  <input type='hidden' id='nodeType' name='nodeType' value='<%=nodeType%>'/>
	  <input type='hidden' id='opstatus' name='opstatus' value='<%=opstatus %>'/>
	  <div style="overflow:hidden;width:100%">
	  <table>
 	  	<tr>
 	  	  <td nowrap width="15%">模板定义名称</td>
 	  	  <td nowrap width="35%">
 	  	  	<input type="text" id="templateDefName" value="${param.templateDefName==null?'':param.templateDefName}" disabled = "true">
 	  	  </td>
		  <td nowrap width="15%">模板文件名</td>
		   <td nowrap width="35%">
 	  	  	<input type="text" id="templateFileName" value="${param.templateFileName==null?'':param.templateFileName}" disabled = "true">
 	  	  </td>
 	  	</tr>
 	  	<tr>
 	  	  <td nowrap width="15%">模板类型</td>
 	  	  <td nowrap width="35%">
 	  	  	<select id="templateTypeId" disabled = "true">
 	  	  	<%if(TemplateConstant.NODE_TYPE_SITE.equals(nodeType)) {%>
 	  	  		<option value="0" ${param.templateTypeId==null||param.templateTypeId==0?'selected':''}>站点首页模板</option>
 	  	  	<%} %>
 	  	  	
 	  	  	<%if(!TemplateConstant.NODE_TYPE_ARTICLE.equals(nodeType)){ %>
 	  	  		<option value="1" ${param.templateTypeId==1?'selected':''}>栏目首页模板</option>
 	  	  	<%} %>
 	  	  		<option value="3" ${param.templateTypeId==3?'selected':''}>文章显示模板</option>
 	  	  
 	  	  	</select>
 	  	  </td>
		  <td nowrap width="15%">后缀</td>
		   <td nowrap width="35%">
 	  	  	<input type="text" id="suffix" value="${param.suffix==null?'':param.suffix}">
 	  	  </td>
 	  	</tr>
 	  	<tr>
 	  	  <td nowrap width="15%">模板文件</td>
		  <td nowrap width="35%"><input type="file" name="model_file" id="model_file" contenteditable="false" ></td>
 	  	  <td nowrap width="15%">zip包文件</td>
		  <td nowrap width="35%"><input type="file" name="zip_file" id="zip_file" contenteditable="false"></td>
 	  	</tr>
 	  	
 	  </table>
	  </div>
	</div>
	<div style="border:#ffffff 1px solid;">
		<div id="leftTreeDiv" style='overflow:auto; border:#bbbbbb 1px solid; background-color:#FFFFFF'>
		<table>
			<tr><td height='40' valign=center>　　只允许上传jsp和zip文件。<br>　　操作步骤：<br>　　　　1.请将jsp模板文件所用到的jpg、gif、png和css文件放入同一文件夹内，所有文件平级，且该文件夹内不要存在子文件夹<br>　　　　2.选中该文件夹内所有文件打包成images.zip文件<br>　　　　3.上传
			</td></tr>
		</table>
		</div>
	  </div>
	</div>
	<EF:EFRegion/>
  	<jsp:include flush="false" page="../../EF/Form/iplat.ef.tail.jsp"></jsp:include>
  </form>
  <script>
  	//alert(document.getElementById("nodeType").value);
  </script >
</body>
</html>
