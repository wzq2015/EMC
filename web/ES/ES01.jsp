<!DOCTYPE html>
<%@page pageEncoding="UTF-8" language="Java" contentType="text/html;charset=UTF-8"%>

<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>
<%
	String contextpath = request.getContextPath();
	String baseUrl = contextpath;
	String listUrl = baseUrl + "/DispatchAction.do?efFormEname=ES01";
%>

<c:set var="rows" value="${ei.blocks.result.rows}"/>

<html>
  <head>
    <title></title>
    <link href="framework/css/style.css" rel="stylesheet" type="text/css">
	<script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
	<script type="text/javascript" src="./ES/ES01.js"></script>
  </head>

  <body topmargin="100">
    <form id="forms" method="POST" action="<%=listUrl%>">      
      <input type="hidden" type="text" id="serviceName" name="serviceName" value="ES01" />
      <input type="hidden" type="text" id="methodName" name="methodName" value="setPost"/>
      <EF:EFInput blockId="result" ename="postId" row="0" type="hidden" value="Manager"/>

      <table width="400" class='ef-grid-border' border="0" align="center" cellpadding="0" cellspacing="0">
        <tr class='tableHeader'>
	      <td width="50%">Organization</td>
	      <td width="50%">Post</td>
	    </tr>

        <c:forEach var="row" items="${rows}">  
        <tr class=tableRow0 onclick="javascript:selPost('<c:out value="${row.postId}"/>')" onmouseover="this.style.cursor='hand';">
	      <td><c:out value="${row.postOrg}"/></td>
	      <td><c:out value="${row.postName}"/></td>
	    </tr>
        </c:forEach>
      </table>

    </form>
  </body>
</html>
