<!DOCTYPE html>
<%@ page contentType="text/html;charset=UTF-8"%>
<%@ page language="java" import="java.io.File,com.baosight.iplat4j.ec.util.*"%>
<%
	String nodeId = request.getParameter("nodeId");
	String nodeType = request.getParameter("nodeType");
	String type="2";
	String typeName = request.getParameter("typeName");
    String typeId = ECUtil.getFileTypeIdByName(type,typeName);
    
    String action = "ECDM0102.jsp?typeId="+typeId+"&type="+type+"&qt=1&nodeId="+nodeId+"&nodeType="+nodeType;
%>

<HTML>
<head>
	<meta http-equiv="Content-Type" content="text/html; 
	charset=UTF-8" />
	<title>上传Flash</title>
	<script type="text/javascript">CONTEXT_PATH = "../.."</script>
	<script type="text/javascript" src="../../EF/iplat-ui-2.0.js"></script>
	<script type="text/javascript" src="ECDM0106.js"></script>
</head>
<BODY BGCOLOR="white">
<HR>

<FORM METHOD="POST" action=<%=action%>  enctype="multipart/form-data" target="uploadFileIframe">
   
   <input type="hidden" id="type" value=<%=type%>>
  <table id="uploadTable">
  <tr>
    <td width="25%">
     Flash路径:
    </td>
    <td>
	    <input type="file" name="myfile" id="myfile" maxlength="255" contentEditable="false"/><br/>
	    <font color="red">(上传文件大小不可超过50M)</font>
    </td>
    </tr>
    <tr>
    <td>
    Flash描述: 
    </td>
    <td>
     <textarea id="fileDes" rows="4" cols="23" style="overflow:hidden" ></textarea> 
    </td>
    </tr>
    <tr>
    <td/>
    <td align="right">
     <input type="button" onclick ="upload()"  value="上传" />
     </td>
     </tr>
     </table>
     <iframe id="uploadFileIframe" name="uploadFileIframe" style="display:none;overflow:hidden;" frameborder="no" allowtransparency="allowtransparency" width="100%" height="100%" scrolling="no"/>    
</FORM>
<HR>


</BODY>
</HTML>
