<!DOCTYPE html>
<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>

<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>
<%
String classid = request.getParameter("classid");
String templateDefId = request.getParameter("templateDefId");
com.baosight.iplat4j.core.threadlocal.UserSession.web2Service(request);
%>

<html>
<head>
<title>模板上传
</title>

<script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
<script type="text/javascript" src="./EC/TM/ECTM0102.js"></script>
</head>
<body class="bodyBackground">
  <form id="ECTM0102" name='form1' method="POST"  action="" enctype="multipart/form-data">
	<jsp:include flush="false" page="../../EF/Form/iplat.ef.head.jsp"></jsp:include>
	<div id = "ef_region_result" title="上传文件"  >
	  <input type='hidden' id='classid' name='classid' value='<%=classid%>'>
	  <input type='hidden' id='templateDefId' name='templateDefId' value='<%=templateDefId%>'>
	  <div style="overflow:hidden;width:100%">
	  <table>
 	  	<tr>
 	  	  <td nowrap width="15%">模板文件</td>
		  <td nowrap width="85%"><input type="file" name="model_file" id="model_file" contenteditable="false"></td>
 	  	</tr>
 	  	<tr>
 	  	  <td nowrap width="15%">zip包文件</td>
		  <td nowrap width="85%"><input type="file" name="zip_file" id="zip_file" contenteditable="false"></td>
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
</body>
</html>
