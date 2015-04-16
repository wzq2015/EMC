
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF.tld" %>
<%
	String actionUrl = request.getContextPath() + "/DispatchAction.do";
%>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; 
	charset=UTF-8" />
	<title>
	</title>
	
	<script type="text/javascript" src="./EF/EF.js"></script>
	<script type="text/javascript" src="./EV/CM/EVCM04.js"></script>
	
</head>
<body class="bodyBackground">

<form id="EVCM04" method="POST" action="<%=actionUrl%>" >

<jsp:include flush="false" page="../../EF/Form/EFFormHead.jsp"></jsp:include>

<div id = "ef_region_inqu" title="查询条件" efRegionShowClear=true>
	<div style="overflow:hidden;width:100%">
		<table>
		  <tr>
		  	<td width="15%">模板名称</td>
		  	<td width="30%">
		  		<EF:EFInput blockId="inqu_status" ename="templateName" row="0" etc="maxLength='50'"/>
		  	</td>
		  </tr>
		</table>
	</div>
</div>  

<div id = "ef_region_result" title="记录集" style="overflow:scroll"> 
<div id = "ef_grid_result" title="页面信息" style="overflow: hidden;height:300px;"></div> 
</div>     
  
<EF:EFRegion/>
<EF:EFGrid blockId="result" autoDraw="no" ajax='true' readonly="false" style="operationBar:false;">
  <EF:EFColumn ename="templateId" readonly="true"/>
  <EF:EFColumn ename="templateName" readonly="true"/>
  <EF:EFColumn ename="bgcolor" readonly="true"/> 
  <EF:EFColumn ename="fontColor" readonly="true"/>
  <EF:EFColumn ename="fontSize" readonly="true"/>
  <EF:EFComboColumn ename="fontType" align="center" readonly="true">
     <EF:EFOption label="Arial" value="Arial" />
		<EF:EFOption label='Times New Roman' value='Times New Roman' />
		<EF:EFOption label='Helvetica' value='Helvetica' />
		<EF:EFOption label='Courier' value='Courier' />
		<EF:EFOption label='sans-serif' value='sans-serif' />
		<EF:EFOption label='mono' value='mono' />
		<EF:EFOption label='Verdana' value='Verdana' />
		<EF:EFOption label='Georgia' value='Georgia' />
		<EF:EFOption label="黑体" value="黑体" />
	    <EF:EFOption value="宋体" label="宋体" />
	    <EF:EFOption value="幼圆" label="幼圆" />
	    <EF:EFOption value="微软雅黑" label="微软雅黑" />
	    <EF:EFOption value="仿宋_GB2312" label="仿宋_GB2312" />
	    <EF:EFOption value="楷体_GB2312" label="楷体_GB2312" />
  </EF:EFComboColumn>
  <EF:EFColumn ename="portletColor" readonly="true"/>
  <EF:EFComboColumn ename="portletBorderFlag" cname="是否显示Portlet边框" align="center" width="130" readonly="true">
     <EF:EFOption value="0" label="否" />
     <EF:EFOption value="1" label="是" />
  </EF:EFComboColumn>
  <EF:EFComboColumn ename="portletImageFlag" cname="是否显示Portlet图标" align="center" width="130" readonly="true">
     <EF:EFOption value="0" label="否" />
     <EF:EFOption value="1" label="是" />
  </EF:EFComboColumn>
  <EF:EFColumn ename="templateStyleurl" cname="效果图" displayType="image" readonly="true"/>
  <EF:EFColumn ename="portletDistance" cname="Portlet间距" align="center" width="130"  readonly="true"/>
</EF:EFGrid>      

<jsp:include flush="false" page="../../EF/Form/EFFormTail.jsp"></jsp:include>
</form>
</body>
</html>  
