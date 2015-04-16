<!DOCTYPE html>
<%@ page contentType="text/html; charset=UTF-8"%>

<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>
<%
	String actionUrl = request.getContextPath() + "/DispatchAction.do";
%>

<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; 
	charset=UTF-8" />
	<title>
	</title>
	
	<script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
	<script type="text/javascript" src="./ED/BL/EDBL12.js"></script>
	
</head>
<body class="bodyBackground">

<form id="EDBL12" method="POST" action="<%=actionUrl%>" >

<jsp:include flush="false" page="../../EF/Form/iplat.ef.head.jsp"></jsp:include>

<div id = "ef_region_inqu" title="查询条件" efRegionShowClear=true>
	<div style="overflow:hidden;width:100%">
		<table>
		  <tr>
		    <td nowrap width="15%">
		      功能标识
		    </td>
		    <td nowrap width="20%">
		    <EF:EFInput blockId="inqu_status" ename="funcId" row="0" />
		    </td>
		</table>
	</div>
</div>  

<div id = "ef_region_result" title="记录集" style="overflow:scroll"> 
	<div id = "ef_grid_result" title="页面信息" style="overflow: hidden;height:300px;">
	</div> 
</div>     
  
<EF:EFRegion/>
<EF:EFGrid blockId="result" autoDraw="yes" readonly="false" >	
	<EF:EFColumn ename="funcId" width="200" fix="yes"/>
	<EF:EFColumn ename="primary_key_1" width="50" fix="yes"/>
	<EF:EFColumn ename="primary_key_2" width="50" fix="yes"/>
	<EF:EFColumn ename="primary_key_3" width="50" fix="yes"/>
    <EF:EFComboColumn ename="paraInOutType" cname="参数输入输出类型" valueProperty="value" sort="true" fix="yes" align="center" width="100">
      <EF:EFOption value="I" label="输入类型" />
      <EF:EFOption value="O" label="输出类型" />
    </EF:EFComboColumn>
    <EF:EFColumn ename="paraContext" fix="yes" width="200" />
    <EF:EFComboColumn ename="paraDataType" cname="参数数据类型" valueProperty="value"  sort="true"  align="center" width="100">
      <EF:EFOption value="S" label="单数据类型" />
      <EF:EFOption value="M" label="多数据类型" />
    </EF:EFComboColumn>    
    <EF:EFComboColumn ename="paraReadonly" cname="参数只读标识" valueProperty="value"    align="center" width="100">
      <EF:EFOption value="true" label="只读" />
      <EF:EFOption value="false" label="读写" />
    </EF:EFComboColumn>      
	<EF:EFColumn ename="recCreator" enable="false" />
	<EF:EFColumn ename="recCreateTime" enable="false" />
	<EF:EFColumn ename="recRevisor" enable="false" />
	<EF:EFColumn ename="recReviseTime" enable="false" />
</EF:EFGrid>      

<jsp:include flush="false" page="../../EF/Form/iplat.ef.tail.jsp"></jsp:include>
</form>

</body>
</html>   
