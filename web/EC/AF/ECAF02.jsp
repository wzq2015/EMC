<!DOCTYPE html>
<%@page contentType="text/html; charset=UTF-8"%>
<%@ page language="java"
	import="com.baosight.iplat4j.upload.*,com.baosight.iplat4j.core.spring.SpringApplicationContext,com.baosight.iplat4j.dao.*,java.util.HashMap,java.util.Map,com.baosight.iplat4j.ee.dm.utils.*,com.baosight.iplat4j.core.threadlocal.*,com.baosight.iplat4j.ec.af.domain.ECAF01,java.io.File,java.util.ArrayList,java.util.List,java.util.Date,com.baosight.iplat4j.core.ei.*,com.baosight.iplat4j.core.threadlocal.UserSession,com.baosight.iplat4j.core.ei.EiConstant,com.baosight.iplat4j.util.*"%>
<%@taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld"%>
<%
	String actionUrl = request.getContextPath() + "/DispatchAction.do";
	EiInfo info = (EiInfo)request.getAttribute("ei");
	String articleTitle = info.getString("articleTitle");
%>

<html>
<head>
<meta http-equiv="Content-Type" content="text/html; 
	charset=UTF-8" />
<title></title>

<script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
<script type="text/javascript" src="./EC/AF/ECAF02.js"></script>
<style>
	#btn{
		background-image: url(./EF/Images/connect_deliver.jpg);
		background-repeat: no-repeat;
		height: 29px;
		width: 87px;
		border-top-style: none;
		border-right-style: none;
		border-bottom-style: none;
		border-left-style: none;
		background-color: #FFF;
		color: #FFF;
	}
</style>
</head>
<body class="bodyBackground">

<form id="ECAF02" method="POST" action="<%=actionUrl%>"><jsp:include
	flush="false" page="../../EF/Form/iplat.ef.head.jsp"></jsp:include>
<P align=center>
	<strong> 
		<font face="隶书" size="5"><%=articleTitle%></font>
	</strong>
</P>
<div id="ef_region_result" title="文章评论" efRegionShowClear=false>
<div style="overflow:hidden;width:100%"><EF:EFInput blockId=""
	ename="articleId" row="" type="hidden" /> <%
 	EiInfo Info = (EiInfo) request.getAttribute("ei");
 	List commentList = (ArrayList) Info.get("commentList");
 	String userId = String.valueOf(UserSession.getLoginName());
 	String commentId = null;
 	ECAF01 bean = null;
 	for (int i = 0; i < commentList.size(); i++) {
 		bean = (ECAF01) commentList.get(i);
 		commentId = bean.getCommentId();

 		out.print("<P align=left > <font size='2' >评论者:"
 		+ bean.getRecCreator() + "&nbsp;&nbsp;&nbsp;&nbsp;"
 		+ "评论者IP:" + bean.getRecCreatorIp());

 		out.print("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp" + "评论时间:"
 		+ bean.getRecCreateTime() + "</font></P>");
 		out
 		.print("<P align=left><textarea style='width:1300px;height:15px ;overflow-y:hidden  onscroll=this.rows++; overflow:visible;border-style:none;  border-color:#fff;'   readonly>");
 		out.print(bean.getCommentContent());
 		out.print("</textarea></P>");
 		if (bean.getRecCreator().equals(userId)
 		&& (!bean.getIsPassAudit().equals("2"))
 		&& (!bean.getRecCreator().equals(EiConstant.anonymous))) {
 			out.print("<P align=right>");
 			Integer integer_commentId = Integer.valueOf(commentId);
 			commentId = integer_commentId.toString();
 			out
 			.print("<a style='cursor:pointer' onclick='deleteComment("
 			+ commentId
 			+ ' '
 			+ ")'><font size='2' color='blue'>删除</font></a>");
 			out
 			.print("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");
 			out.print("</P>");
 		}
 		out.print("<hr align='left' />");
 	}
 %>

<table width="60%">
	<tr>
		<td nowrap width="12%" align="center">发表评论:</td>
		<td nowrap><EF:EFInput blockId="result" ename="comment" row="0"
			type="textarea" etc="style='width:400px;height:200px' " /></td>
	</tr>
	<tr>
		<td align="center">验证码:</td>
		<td align="center">
			<div style="float:left;">
			<input name="checkCode" type="text"
			id="checkCode" size="6" maxlength="4"
			onkeyup="value=value.replace(/[^\d]/g,'')"
			onbeforepaste="clipboardData.setData('text',clipboardData.getData('text').replace(/[^\d]/g,''))" /><font color="red">*</font> 
			<img id="code" src="EC/MM/authCode.jsp" />
			<button type="button" onclick="checkconfirm();" id="btn"/></button>
		</td>
	</tr>
</table>
</div>
</div>




<EF:EFRegion /> <jsp:include flush="false"
	page="../../EF/Form/iplat.ef.tail.jsp"></jsp:include></form>

</body>
</html>
