<!DOCTYPE html>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>
<%@page import="com.baosight.iplat4j.core.ei.EiInfo"%>
<%@page import="com.baosight.iplat4j.core.ei.EiConstant"%>
<%@page import="com.baosight.iplat4j.core.ei.EiBlock"%>
<%@page import="com.baosight.ieasyflow.dao.CategoryDAO"%>
<%@page import="com.baosight.iplat4j.common.ew.domain.Tewwd04"%><html>

<%
	String actionUrl = request.getContextPath() + "/DispatchAction.do";
	String dbid = request.getParameter("id");
	if (dbid == null)
		throw new IllegalArgumentException();
	CategoryDAO dao = new CategoryDAO();
	Tewwd04 tewwd04 = dao.query(dbid);
	
	EiInfo info = new EiInfo();
	EiBlock block = new EiBlock("categoryInfo");
	block.addBlockMeta(tewwd04.eiMetadata);
	block.addRow(tewwd04);
	info.setBlock(block);
	pageContext.setAttribute("ei", info);
%>

<head>
	<meta http-equiv="X-UA-Compatible" content="IE=8,IE=9">
	<title>查看目录信息</title>
	<script type="text/javascript" src="EF/iplat-ui-2.0.js"></script>
	<script type="text/javascript" src="EW/EW0117.js"></script>
	<link type="text/css" rel="stylesheet" href="EF/SyntaxHighlighter/SyntaxHighlighter.css"></link>
</head>
<body class="bodyBackground">

<form id="EW0117" method="POST" action="<%=actionUrl%>" >

<jsp:include flush="false" page="../EF/Form/iplat.ef.head.jsp"></jsp:include>

<div id="ef_region_categoryInfo" title="" style="overflow: hidden;height:150px;">
	<EF:EFInput ename="operateMode" blockId="categoryInfo" row="0" type="hidden"/>
	<EF:EFInput ename="dbid" blockId="categoryInfo" row="0" type="hidden"/>
	<div id="basicAttrInputs">
		<table width="100%">
		<tr >
			<td nowrap="nowrap" align="right" width="25%" >&nbsp;</td>
			<td nowrap="nowrap">&nbsp;</td>
		 </tr>	
		  <tr>
			<td nowrap="nowrap" width="25%" align="right">目录名称:</td>
			<td nowrap="nowrap">
				<EF:EFInput blockId="categoryInfo" row="0" ename="name" type="text" 
					etc=" nullable='false' minLength='1'  maxLength='40' errorPrompt='活动名称不能含有特殊字符、空格' regex='/^[-\w_.\u4e00-\u9fa5]*$/' "/>
			</td>
		 </tr>
		  <tr>
			<td nowrap="nowrap" align="right">目录显示名称:</td>
			<td nowrap="nowrap" >
				<EF:EFInput blockId="categoryInfo" row="0" ename="displayname" type="text"
					etc=" nullable='false' minLength='1'  maxLength='40' errorPrompt='活动显示名称不能含有特殊字符、空格' regex='/^[\w()、/\\\u4e00-\u9fa5]*$/' "/>
			</td>
		  </tr>
		  <tr>
			<td nowrap="nowrap" align="right">目录描述:</td>
			<td nowrap="nowrap">
				<EF:EFInput blockId="categoryInfo" row="0" ename="desc" type="text" etc="size=\"40px\""/>
			</td>
		  </tr>
		</table>
	</div>
</div>
<EF:EFRegion/>

<div style="overflow:hidden;width:100%">
		<table>
		  <tr>
		   <td nowrap width="50%">		   
		    </td>
		    <td nowrap >
		    	<EF:EFButton ename="confirm" cname="保存" />
		    </td>
		     <td nowrap >
		    	<EF:EFButton ename="cancel" cname="关闭" />
		    </td>
		     <td nowrap width="50%">		   
		    </td>
		  </tr>  
 	</table>
</div>
<jsp:include flush="false" page="../EF/Form/iplat.ef.tail.jsp"></jsp:include>
</form>

</body>
</html>
