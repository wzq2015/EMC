<!DOCTYPE html>
<%@ page contentType="text/html; charset=UTF-8"%>

<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>
<%
	String actionUrl = request.getContextPath() + "/DispatchAction.do";
	String title=request.getParameter("title");
	title=new String(title.getBytes("ISO8859_1"),"UTF-8");
%>

<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; 
	charset=UTF-8" />
	<title>
	</title>
	
	<script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
	<script type="text/javascript" src="./EC/AM/ECAM03.js"></script>
	
</head>
<body class="bodyBackground">

<form id="ECAM03" method="POST" action="<%=actionUrl%>" >

<jsp:include flush="false" page="../../EF/Form/iplat.ef.head.jsp"></jsp:include>

<div id = "ef_region_result" title=<%=title%>的历史信息 style="overflow:scroll"> 
	<div id = "ef_grid_result" title="页面信息" style="overflow: hidden;height:300px;">
	</div> 
	<EF:EFInput blockId="inqu_status" ename="articleId" row="0" type="hidden"/>	
</div>     
  
<EF:EFRegion/>
<EF:EFGrid blockId="result" autoDraw="false" style="operationBar:false" ajax="true" enable="false">
<EF:EFColumn cname="文章操作ID" ename="operateId"  visible="false" />
<EF:EFComboColumn ename="operateType" cname="操作类型" valueProperty="value" labelProperty="lable" >
	<EF:EFOption label="新建" value="0"></EF:EFOption>
	<EF:EFOption label="编辑" value="1"></EF:EFOption>
	<EF:EFOption label="发布" value="2"></EF:EFOption>
	<EF:EFOption label="提交" value="3"></EF:EFOption>
	<EF:EFOption label="撤稿" value="4"></EF:EFOption>
	<EF:EFOption label="审核" value="5"></EF:EFOption>
	<EF:EFOption label="退回" value="6"></EF:EFOption>
	<EF:EFOption label="删除" value="7"></EF:EFOption>
	<EF:EFOption label="还原" value="8"></EF:EFOption>
	<EF:EFOption label="创建并提交" value="9"></EF:EFOption>
	<EF:EFOption label="修改文章排序" value="10"></EF:EFOption>
	<EF:EFOption label="导入" value="11"></EF:EFOption>
	<EF:EFOption label="导出" value="12"></EF:EFOption>
</EF:EFComboColumn>
<EF:EFComboColumn ename="operateState" cname="操作后状态" valueProperty="value" labelProperty="lable" >
	<EF:EFOption label="新稿" value="10"></EF:EFOption>
	<EF:EFOption label="已否" value="20"></EF:EFOption>
	<EF:EFOption label="审核中" value="30"></EF:EFOption>
	<EF:EFOption label="待发布" value="40"></EF:EFOption>
	<EF:EFOption label="已发" value="50"></EF:EFOption>
</EF:EFComboColumn>
<EF:EFColumn cname="操作者" ename="recCreator"  width="150"/>
<EF:EFColumn cname="操作时间" ename="recCreateTime"  width="150" sort="true"/>
</EF:EFGrid>      

<jsp:include flush="false" page="../../EF/Form/iplat.ef.tail.jsp"></jsp:include>
</form>

</body>
</html>   
