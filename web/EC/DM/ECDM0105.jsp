<!DOCTYPE html>
<%@ page contentType="text/html;charset=UTF-8"%>
<%@ page language="java" import="java.io.File,com.baosight.iplat4j.ec.util.*"%>
<%
	
	String nodeId = request.getParameter("nodeId");
	String nodeType = request.getParameter("nodeType");
    String type="1";
    String typeName = request.getParameter("typeName");
    String typeId = ECUtil.getFileTypeIdByName(type,typeName);
    
    String action = "ECDM0102.jsp?typeId="+typeId+"&type="+type+"&qt=1&nodeId="+nodeId +"&nodeType="+nodeType;  //qt区分ECDM0102中返回的方法
%>
<script>
		function showTD(obj){
			if(obj.checked){
				document.getElementById("div").style.display="block";
			}else{
				document.getElementById("div").style.display="none";
			}	
		}	
</script>
<HTML>
<head>
	<meta http-equiv="Content-Type" content="text/html; 
	charset=UTF-8" />
	<title>上传图片</title>
	<script type="text/javascript">CONTEXT_PATH = "../.."</script>
	<script type="text/javascript" src="../../EF/iplat-ui-2.0.js"></script>
	<script type="text/javascript" src="ECDM0105.js"></script>
</head>
<BODY BGCOLOR="white">
<HR>
<input type="hidden" id="type" value="<%=type%>"/>
<input type="hidden" id="typeId" value="<%=typeId%>"/>

<FORM  METHOD="POST" action="<%=action%>" enctype="multipart/form-data" target="uploadFileIframe">  
  
  <table id="uploadTable">
  <tr>
    <td width="25%">
    <font>图片路径:</font>
    </td>
    <td>
    <input type="file" name="myfile" id="myfile" maxlength="255" contentEditable="false" /><br/>
    <font color="red" size="-1">(上传图片大小不可超过1M)</font>
    </td>
    </tr>
    <tr>
    <td>
    <font>图片描述:</font>
    </td>
    <td>
    <textarea id="fileDes" name="fileDes" rows="4" cols="23" style="overflow:hidden;"></textarea>&nbsp;&nbsp;
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
