
<%@page contentType="text/html;charset=UTF-8"%>
<%@page import="java.util.*" %>
<%@page import="com.baosight.iplat4j.ef.ui.column.*" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF.tld" %>
<%
	
String actionUrl = request.getContextPath() + "/DispatchAction.do";

List combo_source = new ArrayList();

combo_source.add( new EFComboBean("1", "srt模板") );	
combo_source.add( new EFComboBean("2", "excel模板") );	

request.setAttribute( "combobox_source", combo_source );

%>

<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; 
	charset=UTF-8" />
	<title>
	</title>
	
	<script type="text/javascript" src="./EF/EF.js"></script>
	<script type="text/javascript" src="./ER/ER03.js"></script>
	
</head>
<body class="bodyBackground">

<form id="ER03" method="POST" action="<%=actionUrl%>" >

<jsp:include flush="false" page="../EF/Form/EFFormHead.jsp"></jsp:include>
<EF:EFInput blockId="" ename="type" row="" type="hidden" />
<div id = "ef_region_inqu" title="查询条件" efRegionShowClear=true>
	<div style="overflow:hidden;width:100%">
		<table>
		  <tr>
		    <td width="20%" align="right">
		      报表标识
		    </td>
		    <td width="20%">
		      <EF:EFInput blockId="inqu_status" ename="reportId" row="0" />
		    </td>
		    <td width="10%" align="right">
		      报表归属
		    </td>
		    <td width="20%">
		      <EF:EFInput blockId="inqu_status" ename="reportBelongTo" row="0" />
		    </td>
		    <td width="10%" align="right">
		      报表版本号
		    </td>
		    <td width="20%">
		      <EF:EFInput blockId="inqu_status" ename="reportVersion" row="0" />
		    </td>
		  </tr>
		  <tr>
		    <td width="20%" align="right">
		      报表文件名
		    </td>
		    <td width="20%">
		      <EF:EFInput blockId="inqu_status" ename="reportFileName" row="0" />
		    </td>
		    <td width="10%" align="right">
		    </td>
		    <td width="20%">
		    </td>
		    <td width="10%" align="right">
		    </td>
		    <td width="20%">
		    </td>
		  </tr>
		</table>
	</div>
</div>  

<div id = "ef_region_result" title="报表模板文件" style="overflow:scroll"> 
	<div id = "ef_grid_result" title="页面信息" style="overflow: hidden;height:160px;">
	</div> 
</div>     
  

	<EF:EFInput blockId="" ename="reportId" row="" type="hidden" />
	<EF:EFInput blockId="" ename="reportBelongTo" row="" type="hidden" />
	<EF:EFInput blockId="" ename="reportVersion" row="" type="hidden" />

<EF:EFGrid blockId="result" autoDraw="no" readonly="false" ajax="true" paintId="ef_grid_result" serviceName="ER00" 
	queryMethod="query" >
<EF:EFColumn ename="reportId"  fix="yes" cname="报表标识" validateRegex="/^[A-Za-z0-9_]+$/" nullable="true" minLength="1"  validateErrorPrompt="报表标识只能由字母,数字,下划线组成!"/>
<EF:EFColumn ename="reportName" width="100"/>
<EF:EFColumn ename="reportBelongTo" cname="报表归属" />
<EF:EFColumn ename="reportVersion" cname="版本" width="40" />
<EF:EFComboColumn ename="reportClassify" cname="报表分类" 
                     valueProperty="value"  labelProperty="label"  width="150" formatString="#valueString#-#labelString#">
   	<EF:EFOption value="1" label="固定类报表" />
   	<EF:EFOption value="2" label="内部客户类报表" />
   	<EF:EFOption value="3" label="主营类明细报表" />
</EF:EFComboColumn>
<EF:EFComboColumn ename="reportType" sourceName="combobox_source" valueProperty="value" labelProperty="label"/>
<EF:EFColumn ename="reportStatus" cname="状态" width="40" />

<EF:EFColumn ename="reportLocker" cname="报表锁定者" width="120"/>	

</EF:EFGrid>         

<div id = "ef_region_result2" title="报表文件" style="overflow:scroll"> 
	<div id = "ef_grid_result2" title="页面信息" style="overflow: hidden;height:300px;">
	</div> 
</div>     

<EF:EFGrid blockId="result" ajax="true" autoDraw="yes" readonly="false" paintId="ef_grid_result2" serviceName="ER10" queryMethod="query">	
  <EF:EFColumn ename="reportFileName" cname="文件名" width="250" fix="yes"  />
  <EF:EFColumn ename="reportId" cname="ID" width="50" visible="no"  />
  <EF:EFColumn ename="reportBelongTo" cname="归属" width="50" visible="no" />
  <EF:EFColumn ename="reportVersion" cname="版本" width="30" visible="no" />
  <EF:EFColumn ename="recCreator" cname="创建人" width="50"/>
  <EF:EFColumn ename="recCreateTime" cname="创建时间" visible="no"  />
  <EF:EFColumn ename="recRevisor" visible="no" />
  <EF:EFColumn ename="recReviseTime" visible="no" />
  <EF:EFColumn ename="archiveFlag" visible="no" />
  <EF:EFColumn ename="view" cname="查看" width="40"/>	
  <EF:EFColumn ename="uploadReport" cname="上传" width="40"/>
</EF:EFGrid>   
<EF:EFRegion/>
<jsp:include flush="false" page="../EF/Form/EFFormTail.jsp"></jsp:include>
</form>

</body>
</html>   
