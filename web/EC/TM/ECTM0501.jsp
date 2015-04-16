<!DOCTYPE html>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page language="java" import="							
								java.util.HashMap,
								org.apache.commons.lang.StringUtils,
								java.util.List,
								java.util.Iterator,
								java.util.Map.Entry
								"%>
<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>
<html>
<head>
<title>【系统提示】</title>
</head>
<body class="bodyBackground" style='font-size:12px'>								
<%
	String queryStr=request.getQueryString();
	if(queryStr==null){
		//websphere下getQueryString方法返回null
		queryStr = (String)request.getAttribute( "javax.servlet.forward.query_string");
	}
	
    String url=request.getParameter("url");
    if(url!=null){
    int index=queryStr.indexOf(url);
    if(index!=-1){
    	String realStr=queryStr.substring(index);
    	 realStr=StringUtils.replace(realStr, "&", "?", 1);
    	 realStr="/"+realStr;
    	 RequestDispatcher rd = request.getRequestDispatcher(realStr);
			try {
				rd.forward(request, response);
			} catch (ServletException e1) {
				e1.printStackTrace();
			}finally{
			out.clear();
			out = pageContext.pushBody();
		}
    }   
    }
     
  
%>
</body>
</html>
