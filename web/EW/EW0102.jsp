<!DOCTYPE html>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>
<%@page import="com.baosight.iplat4j.core.ei.EiInfo"%>
<%@page import="com.baosight.iplat4j.core.ei.EiConstant"%>
<%@page import="com.baosight.iplat4j.core.ei.EiBlock"%><html>

<%
	String actionUrl = request.getContextPath() + "/DispatchAction.do";
	EiInfo info = new EiInfo();
	info.set(EiConstant.EF_FORM_BUTTON_DESC, "{}");
	pageContext.setAttribute("ei", info);
%>

<head>
	<meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
	<title>流程属性设置</title>
	<script type="text/javascript" src="EF/iplat-ui-2.0.js"></script>
	<script type="text/javascript" src="EW/EW0102.js"></script>
	<script type="text/javascript" src="EW/WorkflowDesigner/js/DomHelper.js"></script>
	<script type="text/javascript" src="FormBuilder/js/dynform.js"></script>
	<link type="text/css" rel="stylesheet" href="EF/SyntaxHighlighter/SyntaxHighlighter.css"></link>
</head>
<body class="bodyBackground">

<form id="EW0102" method="POST" action="<%=actionUrl%>" >

<jsp:include flush="false" page="../EF/Form/iplat.ef.head.jsp"></jsp:include>
<div id="ef_tab_y" lastRange="98%" eftabWidth="100%" eftabType="efRoundDivTab">
<div id="basicAttr" title="基本属性" >
<div id="ef_region_basicAttr" title="" style="overflow: hidden;height:320px;">
	<div>
		<table width="100%">
		<tr >
			<td nowrap="nowrap" width="25%" align="right">&nbsp;</td>
			<td nowrap="nowrap">&nbsp;</td>
		 </tr>	
		 <tr >
			<td nowrap="nowrap" width="25%" align="right">&nbsp;</td>
			<td nowrap="nowrap">&nbsp;</td>
		 </tr>
		  <tr>
			<td nowrap="nowrap" width="25%" align="right">流程名称:</td>
			<td nowrap="nowrap">
				<EF:EFInput blockId="basic" ename="name" 
					etc=" nullable='false' minLength='1'  maxLength='40' errorPrompt='活动名称不能含有特殊字符、空格' regex='/^[-\w_.\u4e00-\u9fa5]*$/' "/>
			</td>
		 </tr>
		  <tr>
			<td nowrap="nowrap" align="right">流程显示名称:</td>
			<td nowrap="nowrap" >
				<EF:EFInput blockId="basic" ename="displayName"
					etc=" nullable='false' minLength='1'  maxLength='40' errorPrompt='活动显示名称不能含有特殊字符、空格' regex='/^[\w()、/\\\u4e00-\u9fa5]*$/' "/>
			</td>
		  </tr>
		  <tr>
			<td nowrap="nowrap" align="right">流程描述信息:</td>
			<td nowrap="nowrap">
				<EF:EFInput blockId="basic" ename="description" etc="size=\"40px\""/>
			</td>
		  </tr>
		  <tr>
			<td nowrap="nowrap" align="right">创建人:</td>
			<td nowrap="nowrap">
				<EF:EFInput blockId="basic" ename="author" etc="size=\"40px\""/>
			</td>
		  </tr>
		  <tr>
			<td nowrap="nowrap" align="right">发布时间:</td>
			<td nowrap="nowrap">
			 <input id="deployTime" size="40px" disabled/>
			</td>
		  </tr>
		  <tr>
			<td nowrap="nowrap" align="right">版本信息:</td>
			<td nowrap="nowrap">
			 <input id="version" size="40px" disabled/>		
			</td>
		  </tr>
		</table>
	</div>
</div>
</div>

<div id="country" title="扩展属性" >
	<div id = "ef_grid_vars" title="页面信息" style="overflow:hidden;">
	</div>
</div>

<div id="events" title="事件配置" >
	<div id = "ef_grid_events" title="页面信息" style="overflow:hidden;">
	</div>
</div>

</div>

<script type="text/javascript">
	fix_direct_load();
</script>
<EF:EFGrid blockId="vars" autoDraw="no" ajax="true" style="navigationBar:false;removeBar:true">
  <EF:EFColumn ename="name" cname="名称"/>
  <EF:EFComboColumn ename="type" cname="类型">
  	<EF:EFOption value="String" label="String" />
  </EF:EFComboColumn>
  <EF:EFColumn ename="value" cname="值"/>
  <EF:EFColumn ename="description" cname="描述"/>
</EF:EFGrid>

<EF:EFGrid blockId="events" autoDraw="no" ajax="true" style="navigationBar:false;removeBar:true">
  <EF:EFComboColumn ename="type" cname="触发类型">
  	<EF:EFOption value="start" label="流程开始时" />
  	<EF:EFOption value="end" label="流程结束时" />
  </EF:EFComboColumn>
  <EF:EFColumn ename="class" cname="触发方法"/>
  <EF:EFColumn ename="description" cname="描述"/>
</EF:EFGrid>
<EF:EFTab tabId="y" />

<div style="overflow:hidden;width:100%">
		<table>
		  <tr>
		   <td nowrap width="50%">		   
		    </td>
		    <td nowrap >
		    	<EF:EFButton ename="confirm" cname="确定"  />
		    </td>
		     <td nowrap >
		    	<EF:EFButton ename="cancel" cname="取消" />
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
