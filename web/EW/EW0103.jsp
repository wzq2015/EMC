<!DOCTYPE html>
<%@page contentType="text/html; charset=UTF-8"%>
<%@taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>
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
	<title>设置相关数据</title>
	<script type="text/javascript" src="EF/iplat-ui-2.0.js"></script>
	<script type="text/javascript" src="EW/EW0103.js"></script>
	<script type="text/javascript" src="EW/WorkflowDesigner/js/DomHelper.js"></script>
	<script type="text/javascript" src="FormBuilder/js/Math.uuid.js"></script>
	<script type="text/javascript" src="FormBuilder/js/dynform.js"></script>
	<link type="text/css" rel="stylesheet" href="EF/SyntaxHighlighter/SyntaxHighlighter.css"></link>
</head>

<body class="bodyBackground">
<form id="EW0103" method="POST" action="<%=actionUrl%>" >
<jsp:include flush="true" page="../EF/Form/iplat.ef.head.jsp"/>


<div id="ef_grid_datafields" title="页面信息" style="overflow:hidden;height:350px;">
</div>

<script type="text/javascript">
	fix_direct_load();
</script>
<EF:EFGrid blockId="datafields" autoDraw="no" ajax="true" style="navigationBar:false;removeBar:true">
  <EF:EFColumn ename="id" visible="false"/>
  <EF:EFColumn ename="value" visible="false"/>
  <EF:EFColumn ename="name" cname="名称"/>
  <EF:EFComboColumn ename="type" cname="类型">
  	<EF:EFOption value="string" label="string" />
  	<EF:EFOption value="long" label="long" />
  	<EF:EFOption value="double" label="double" />
  </EF:EFComboColumn>
  <EF:EFColumn ename="description" cname="描述"/>
</EF:EFGrid>

<div style="overflow:hidden;width:100%">
	<table>
		  <tr>
		   <td nowrap width="50%">
		    </td>
		    <td nowrap >
		    	<EF:EFButton ename="confirm" cname="确定" />
		    </td>
		     <td nowrap >
		    	<EF:EFButton ename="cancel" cname="取消" />
		    </td>
		     <td nowrap width="50%">
		    </td>
		  </tr>  
 	</table>
</div>
<jsp:include flush="true" page="../EF/Form/iplat.ef.tail.jsp"/>
</form>

</body>
</html>
