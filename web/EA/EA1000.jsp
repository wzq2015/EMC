<!DOCTYPE html>
<%@page contentType="text/html;charset=UTF-8"%>
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
	<script type="text/javascript" src="./EA/EA1000.js"></script>
	
</head>
<body class="bodyBackground">

<form id="EA1000" method="POST" action="<%=actionUrl%>" >

<jsp:include flush="false" page="../EF/Form/iplat.ef.head.jsp"></jsp:include>

<div id = "ef_region_inqu" title="查询条件" efRegionShowClear=true>
	<div style="overflow:hidden;width:100%">
		<table>
		  <tr>

		    <td nowrap width="10%">
		     消息号:
		    </td>
		    <td nowrap width="20%">
		    <EF:EFInput blockId="inqu_status" ename="fd_message_code" row="0" />
		    </td>
		    <td nowrap width="10%">
		     处理器:
		    </td>
		    <td nowrap width="20%">
		    <EF:EFInput blockId="inqu_status" ename="fd_message_handler_name" row="0"/>
		    </td>
		    <td nowrap width="10%">
		     分组:
		    </td>
		    <td nowrap width="20%">
		    <EF:EFInput blockId="inqu_status" ename="fd_message_group_name" row="0"/>
		    </td>
		  </tr>
		  <tr>
		    <td nowrap width="10%">
		     模块:
		    </td>
		    <td nowrap width="20%">
		    <EF:EFInput blockId="inqu_status" ename="fd_business_module" row="0" />
		    </td>
		    <td nowrap width="10%">
		     状态:
		    </td>
		    <td nowrap width="20%">
		    <EF:EFInput blockId="inqu_status" ename="fd_message_state" row="0" />
		    </td>
		    <td nowrap width="10%">
		     类型:
		    </td>
		    <td nowrap width="20%">
		    <EF:EFSelect blockId="inqu_status" ename="fd_message_type" row="0">
		    	<EF:EFOption label="全部" value="" />
				<EF:EFOption label="异步" value="1" />
				<EF:EFOption label="同步" value="2" />
		    </EF:EFSelect>
<%-- 		    <EF:EFInput blockId="inqu_status" ename="fd_message_type" row="0" /> --%>
		    </td>
		  </tr>
		  
		</table>
	</div>
</div>  

<div id = "ef_region_result" title="记录集" style="overflow:scroll"> 
	<div id = "ef_grid_result" title="页面信息" style="overflow: hidden;height:300px;">

	</div> 
</div>     
  
<EF:EFRegion/>

<EF:EFGrid blockId="result" autoDraw="yes" readonly="false" >
	<EF:EFColumn ename="fd_message_code" cname="消息号" fix="yes" editType="none" readonly="true" nullable="false"/>
	<EF:EFColumn ename="fd_message_handler_name" cname="消息处理器"  nullable="false"  width="300" defaultValue="com.baosight.iplat4j.common.handler.MessageHandler"/>
	<EF:EFColumn ename="fd_message_group_name" cname="所在组"  nullable="true" />
	<EF:EFComboColumn ename="fd_message_type" cname="类型" nullable="true">
		<EF:EFOption label="" value="" />
		<EF:EFOption label="异步" value="1" />
		<EF:EFOption label="同步" value="2" />
	</EF:EFComboColumn>
	<EF:EFColumn ename="fd_business_module" cname="被调用Service名称"  nullable="false"  width="150" />
	<EF:EFColumn ename="fd_business_function" cname="被调用Service的方法名"  nullable="false"  width="150"/>
	<EF:EFColumn ename="fd_business_para_one" cname="业务参数1（电文对应的主bean类）"  nullable="true" width="200" />
	<EF:EFColumn ename="fd_business_para_two" cname="业务参数2（电文对应的明细类）"  nullable="true"  width="200" />
	<EF:EFColumn ename="fd_business_para_three" cname="业务参数3（明细类的个数）"  nullable="true" width="200" />
	<EF:EFColumn ename="fd_business_para_four" cname="业务参数4（需要排除的字段）"  nullable="true" width="200" />
	<EF:EFColumn ename="fd_business_para_five" cname="业务参数5（是否扩展小数位）"  nullable="true" width="200" />
</EF:EFGrid>      

<jsp:include flush="false" page="../EF/Form/iplat.ef.tail.jsp"></jsp:include>
</form>

</body>
</html>   
