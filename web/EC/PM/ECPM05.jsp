<!DOCTYPE html>
<%@ page contentType="text/html;charset=UTF-8"%>
<%@ page language="java" import="java.io.File"%>
<%
	String nodeId = request.getParameter("nodeId");
	String nodeType = request.getParameter("nodeType");
	String action = "ECPM04.jsp?nodeId="+nodeId+"&nodeType="+nodeType;  //qt区分ECDM0102中返回的方法
	
%>

<HTML>
<head>
	<meta http-equiv="Content-Type" content="text/html; 
	charset=UTF-8" />
	<title>添加图片</title>
	<script type="text/javascript">CONTEXT_PATH = "../.."</script>
	<script type="text/javascript" src="../../EF/iplat-ui-2.0.js"></script>
	<script type="text/javascript" src="ECPM05.js"></script>
</head>
<BODY BGCOLOR="white">
<HR>

<FORM  METHOD="POST" action="<%=action%>" enctype="multipart/form-data" target="uploadFileIframe">  
  
  <table id="uploadTable">
    <tr>
	    <td>
	    	<font>Logo序号:</font>
	    </td>
	    <td>
	   		<input type="text" id="logoSeq" name="logoSeq" value=""/>
	    </td>
    </tr>
  <tr>
    <td >
    <font>上传路径:</font>
    </td>
    <td >
    <input type="file" name="myfile" id="myfile" maxlength="255" contentEditable="false" /><br/>
    <font color="red" size="-1">(上传的logo不要超过1M)</font>
    </td>
    </tr>
    <tr>
    <td/>
    <td align="right">
     <input type="button" onclick ="upload()"  value="开始上传" />
     </td>
     </tr>
     </table>
     <iframe id="uploadFileIframe" name="uploadFileIframe" style="display:none" onload="this.height=uploadFileIframe.document.body.scrollHeight" 
     frameborder="no" allowtransparency="allowtransparency" width="350px" height="150px" />
</FORM>
<HR>

</BODY>
</HTML>
