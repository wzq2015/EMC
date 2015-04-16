<!DOCTYPE html>
<%@ page contentType="text/html;charset=UTF-8"%>
<HTML>
<BODY BGCOLOR="white">
<HR>
<%
	String action = "EEDM0602.jsp?id="+request.getParameter("id")
			+"&rowIndex="+request.getParameter("rowIndex")
			+"&type="+request.getParameter("type");
%>
<FORM METHOD="POST" action=<%=action%>  enctype="multipart/form-data" >
     <input type="file" name="myfile" /><br/>
     <input type="submit" value="upload"/>

</FORM>
<HR>
<script type="text/javascript">

</script>
</BODY>
</HTML>
