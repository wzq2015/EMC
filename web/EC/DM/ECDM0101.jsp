<!DOCTYPE html>
<%@ page contentType="text/html;charset=UTF-8"%>
<%@ page language="java" import="java.io.File"%>
<%
    String type=request.getParameter("type");
    String typeId=request.getParameter("typeId");
	String action = "ECDM0102.jsp?typeId="+typeId+"&type="+type;
	
%>

<HTML>
<head>
	<meta http-equiv="Content-Type" content="text/html; 
	charset=UTF-8" />
	<title>文件上传</title>
	<script type="text/javascript">CONTEXT_PATH = "../.."</script>
	<script type="text/javascript" src="../../EF/iplat-ui-2.0.js"></script>
	<script type="text/javascript" src="ECDM0101.js"></script>
</head>
<BODY BGCOLOR="white">
<HR>

<FORM METHOD="POST" action=<%=action%>  enctype="multipart/form-data" target="uploadFileIframe">
   
   <input type="hidden" id="type" value=<%=type%>> 
  <table id="uploadTable">
  <tr>
  <font color="red">(上传文件大小不可超过50M)</font>
  </tr>
  <tr>
    <td>
     文件路径:
    </td>
    <td>
    
    <input type="file" name="myfile" id="myfile" maxlength="255" contentEditable="false"/>
    
    </td>
    </tr>
    <tr>
    <td>
    文件描述: 
    </td>
    <td>
     <textarea id="fileDes" name="fileDes" rows="5" cols="20" style="overflow:hidden" ></textarea> 
    </td>
    </tr>
    <tr>
    <td/>
    <td align="right">
     <input type="button" onclick ="upload()"  value="upload" />
     </td>
     </tr>
     </table>
      <iframe id="uploadFileIframe" name="uploadFileIframe" style="display:none" onload="this.height=uploadFileIframe.document.body.scrollHeight" 
     frameborder="no" allowtransparency="allowtransparency" width="350" height="140" />
</FORM>
<HR>


</BODY>
</HTML>
