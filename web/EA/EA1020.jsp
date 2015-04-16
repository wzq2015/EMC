<!DOCTYPE html>
<%@page contentType="text/html;charset=UTF-8"%>
<%@page import="com.baosight.iplat4j.core.ei.*" %>
<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>
<%
	String actionUrl = request.getContextPath() + "/DispatchAction.do";
%>
<%
EiInfo currentEiInfo=(EiInfo)request.getAttribute("ei");
%>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; 
	charset=UTF-8" />
	<title>
	</title>
	
	<script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
	<script type="text/javascript" src="./EA/EA1020.js"></script>
	
</head>
<body class="bodyBackground" style="overflow:scroll">

<form id="EA1020" method="POST" action="<%=actionUrl%>" >

<jsp:include flush="false" page="../EF/Form/iplat.ef.head.jsp"></jsp:include>

<div id = "ef_region_inqu" title="查询条件" efRegionShowClear=true>
	<div style="overflow:hidden;width:100%">
		<table>
		  <tr>
		    <td nowrap width="15%">
		     消息流水号:
		    </td>
		    <td nowrap width="25%">
		    <EF:EFInput blockId="inqu_status" ename="fd_message_id" row="0"  etc="minLength='4' maxLength='12' errorPrompt='流水号格式出错' regex='/^[1-9]+[0-9]{0,}$/'"/>
		    </td>
		    <td nowrap width="15%">
		     消息号:
		    </td>
		    <td nowrap width="25%">
		    <EF:EFInput blockId="inqu_status" ename="fd_message_code" row="0" etc="maxLength='6'  validateType='string'"/>
		    </td>
		  </tr>
		  <tr>
		    <td nowrap width="15%">
		     状态:
		    </td>
		    <td nowrap width="25%">
		    <EF:EFSelect blockId="inqu_status" ename="fd_message_state" row="0" >
			    <EF:EFOption label="----------全部---------" value="" />
			    <EF:EFOption label="1 发送成功" value="1" />
			    <EF:EFOption label="0 准备发送" value="0" />
			    <EF:EFOption label="-1 发送失败等待重发" value="-1" />
			    <EF:EFOption label="-2 严重错误不再重发" value="-2" />
			    <EF:EFOption label="4 正在发送" value="4" />
			    <EF:EFOption label="5 正在写入" value="5" />
		    </EF:EFSelect>
		    </td>
		    <td nowrap width="15%">
		     分组:
		    </td>
		    <td nowrap width="25%">
		    <EF:EFInput blockId="inqu_status" ename="fd_message_group_name" row="0" />
		    </td>
		  </tr>
		  <tr>
		    <td nowrap width="15%">
		     类型:
		    </td>
		    <td nowrap width="25%">
		    <EF:EFInput blockId="inqu_status" ename="fd_message_type" row="0" />
		    </td>
		    <td nowrap width="15%">

		    </td>
		    <td nowrap width="25%">
	
		    </td>
		  </tr>
		  <tr>
		    <td nowrap width="15%">
		    (发送)写入时间 起始：
		    </td>
		    <td nowrap width="25%">
		    <EF:EFInput blockId="inqu_status" ename="fd_message_send_time_begin" row="0" popup="date" etc="maxLength='19' size='19' errorPrompt='起始时间格式错误' regex='/^((((1[6-9]|[2-9]\d)\d{2})-(0?[13578]|1[02])-(0?[1-9]|[12]\d|3[01]))|(((1[6-9]|[2-9]\d)\d{2})-(0?[13456789]|1[012])-(0?[1-9]|[12]\d|30))|(((1[6-9]|[2-9]\d)\d{2})-0?2-(0?[1-9]|1\d|2[0-8]))|(((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))-0?2-29-)) (20|21|22|23|[0-1]?\d):[0-5]?\d:[0-5]?\d$/'"/>
		    </td>
		    <td nowrap width="15%">
			(发送)写入时间 结束：
		    </td>
		    <td nowrap width="25%">
		    <EF:EFInput blockId="inqu_status" ename="fd_message_send_time_end" row="0" popup="date" etc="maxLength='19' size='19' errorPrompt='结束时间格式错误' regex='/^((((1[6-9]|[2-9]\d)\d{2})-(0?[13578]|1[02])-(0?[1-9]|[12]\d|3[01]))|(((1[6-9]|[2-9]\d)\d{2})-(0?[13456789]|1[012])-(0?[1-9]|[12]\d|30))|(((1[6-9]|[2-9]\d)\d{2})-0?2-(0?[1-9]|1\d|2[0-8]))|(((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))-0?2-29-)) (20|21|22|23|[0-1]?\d):[0-5]?\d:[0-5]?\d$/'"/>
		    </td>
		  </tr>
		  <tr>
		    <td nowrap width="15%">
		    	消息(电文)内容：
		    </td>
		    <td nowrap width="75%" colspan="3">
		   		<EF:EFInput blockId="inqu_status" ename="fd_message_body_part" row="0" etc="size='90'"/>
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
<EF:EFGrid blockId="result" autoDraw="false" readonly="false" >
	<EF:EFColumn ename="fd_message_id" cname="消息序列号（后台生成）" fix="yes" width="150" editType="none" readonly="true" nullable="true" defaultValue="*后台生成*填写无效*" />
	<EF:EFColumn ename="fd_message_code" cname="<font color=red>*</font>消息号" fix="no" editType="none" nullable="false" />
	<EF:EFColumn ename="fd_message_body" cname="<font color=red>*</font>消息体" fix="no" editType="textarea" displayType="text"/>
	<EF:EFColumn ename="fd_message_state" cname="状态" fix="no" enable="false"   />
	<EF:EFColumn ename="fd_message_state_info" cname="状态信息" fix="no" enable="false"  />
	<EF:EFColumn ename="fd_message_send_time" cname="（发送）写入时间" fix="no" editType="date" dateFormat="yyyy-mm-dd 23:59:59" enable="false" readonly="true" width="150"/>
	<EF:EFColumn ename="fd_message_group_name" cname="分组" fix="no" editType="none" />
	
	<EF:EFColumn ename="doHandleOneMessage" cname="发送本条" width="100" displayType="textbutton"/>
	<EF:EFColumn ename="viewMessage" cname="查看信息" readonly="true" />
</EF:EFGrid>      

<jsp:include flush="false" page="../EF/Form/iplat.ef.tail.jsp"></jsp:include>
</form>

</body>
</html>   
