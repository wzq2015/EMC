<!DOCTYPE html>
<%
String path = request.getParameter("path");
if(path!=null&&!path.equals("")){
	request.getRequestDispatcher(path).forward(request,response);
}
%>
