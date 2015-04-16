<!DOCTYPE html>
<%@page pageEncoding="UTF-8" language="Java" contentType="text/html;charset=UTF-8"%>
<%@ page import="java.util.List,java.util.ArrayList,java.util.Collection,
				 com.baosight.iplat4j.ew.util.EiInfoUtilWF,
	             com.baosight.iplat4j.core.ei.EiInfo"%>
	             <%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld"%>
<%@ taglib prefix="WF" uri="/WEB-INF/tlds/ieasyflow.tld"%>
<jsp:useBean id="ei" scope="request"
	class="com.baosight.iplat4j.core.ei.EiInfo" />
<%
EiInfo info = (EiInfo)request.getAttribute("ei");
String contextpath = request.getContextPath();
String actionUrl = contextpath + "/DispatchAction.do";
String characterEncoding = request.getCharacterEncoding();
String processInsId=info.getString("ProcessInstanceId");
String customFormName=info.getString("FormName");
if(customFormName==null)
{
	customFormName="EW01";
}

if(processInsId==null)
{
	processInsId="aaa";
}

System.out.println("contextpath:" + contextpath + "    characterEncoding:" + characterEncoding);


String serviceName = info.getString("efFormEname");

String processDefinitionName = "EWDF00Process";
String taskIdString = (String)info.get("workItemId");
%>

<html>
  <head>
    <title></title>
    <link href="framework/css/style.css" rel="stylesheet" type="text/css">
    <script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
    <script type="text/javascript" src="./EW/DF/EWDF00.js"></script>
	
  </head>

  <body id = "ewdf00_body">
  <jsp:include flush="true" page="../../EF/Form/iplat.ef.head.jsp"></jsp:include>
     <div title="业务模板">
<!--<h3>业务模板</h3>
<hr />
  -->
<EF:EFFormRender autoFormEname="<%=customFormName%>" processInstanceID="<%=processInsId%>"></EF:EFFormRender>

</div>


<div id="ef_region_audit" title="审核信息" efRegionShowClear=false>

<div style="overflow: hidden; width: 100%">
<table>
	<tr>
		<td nowrap width="20%"><WF:WorkflowHistoryControl
			processId="<%=processInsId%>" historyList="<%=info%>"
			contextPath="<%=contextpath%>" serviceName="<%=serviceName%>" />
		</td>
	</tr>

</table>
</div>
</div>						
					

<div id="ef_region_operate" title="操作区域" efRegionShowClear=false>

<div style="overflow: hidden; width: 100%">
<table>
	<tr>
		<td nowrap width="20%"><WF:WorkflowOperationControl
			processName="<%=processDefinitionName%>" taskId="<%=taskIdString %>"
			processInfo="<%=info%>" contextPath="<%=contextpath%>"
			serviceName="<%=serviceName%>" /></td>
	</tr>

</table>
</div>
</div>

  </body>
</html>
