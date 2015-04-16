<!DOCTYPE html>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page import="java.util.*" %>
<%@ page import="com.baosight.iplat4j.ef.ui.column.*" %>
<%@ page import="com.baosight.iplat4j.dao.*" %>
<%@ page import="com.baosight.iplat4j.core.spring.SpringApplicationContext" %>
<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>
<%
	String actionUrl = request.getContextPath() + "/DispatchAction.do";
%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
<title></title>

<script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
<script type="text/javascript" src="ED/MD/EDMD99.js"></script>

</head>
<body class="bodyBackground">
<form id="EDMD99" method="POST" action="<%=actionUrl%>">
<jsp:include flush="true" page="../../EF/Form/iplat.ef.head.jsp"></jsp:include>
<div id="ef_region_inqu" title="注册页面">
	<div style="overflow: hidden;height:300px;">
		<table>
		<tr >
			<td nowrap="nowrap" align="right" width="50%" >&nbsp;</td>
			<td nowrap="nowrap">&nbsp;</td>
		 </tr>	
		  <tr>
			<td nowrap="nowrap" align="right" width="50%">画面英文名:</td>
			<td nowrap="nowrap" >
				<EF:EFInput  blockId="inqu_status"  row="0"  ename="form_ename" />
			</td>
		 </tr>
		  <tr>
			<td nowrap="nowrap" align="right">画面中文名:</td>
			<td nowrap="nowrap" >
			<EF:EFInput  blockId="inqu_status"  row="0"  ename="form_cname" />
			</td>
		  </tr>
		  <tr>
			<td nowrap="nowrap" align="right">菜单所在父节点名:</td>
			<td nowrap="nowrap">
				 <EF:EFTreeInput blockId="inqu_status" ename="tree_ename" row="0"  modelName="EDPI12"
          		configFunc="myConfigTree" label="tree"  text="系统菜单"  isRefresh="true"/>
			</td>
		  </tr>
		</table>
	</div>
</div>
<div style="overflow:hidden;width:100%">
		<table>
		  <tr>
		   <td nowrap width="50%">
		   
		    </td>		    
		    <td nowrap>
		    	<EF:EFButton ename="confirm" cname="保存"  />
		    </td>
		     
		     <td nowrap >
		    	<EF:EFButton ename="cancel" cname="取消" />
		    </td>
		    <td nowrap width="50%">
		   
		    </td>
		    </tr>
 	</table>
</div>
</form>

<jsp:include flush="false" page="../../EF/Form/iplat.ef.tail.jsp"></jsp:include>
</body>
</html>