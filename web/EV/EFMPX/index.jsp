
<%@ page contentType="text/html;charset=UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<c:set var="contextpath" value="${pageContext.request.contextPath }" />

<head>
	<title>门户首页</title>
</head>
<frameset rows="82,*"  border="0" frameborder="no" framespacing="0" >
	<frame frameborder="0" src="<c:out value="${contextpath}"/>/EFMPX/head.html" noresize scrolling="no">
	<frameset cols="164,*" border="0" frameborder="no" framespacing="0" name="mainFrm">
		<frame name="left"
			src="<c:out value="${contextpath}"/>/EFMPX/left.html"
			target="right" scrolling="no" >
		<frame name="right"
			src="<c:out value="${contextpath}"/>/DispatchAction.do?efFormEname=EV01"
			scrolling="auto" >
	</frameset>
</frameset>
