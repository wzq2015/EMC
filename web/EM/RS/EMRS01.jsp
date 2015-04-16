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
	<script type="text/javascript" src="./EM/RS/EMRS01.js"></script>
	
</head>
<body class="bodyBackground">

<form id="EMRS01" method="POST" action="<%=actionUrl%>" >

<jsp:include flush="false" page="../../EF/Form/iplat.ef.head.jsp"></jsp:include>

<div id = "ef_region_inqu" title="查询条件" efRegionShowClear=true>
	<div style="overflow:hidden;width:100%">
		<table>
		  <tr>
		    <td nowrap width="10%">
		    REST消息标志:
		    </td>
		    <td nowrap width="20%">
		    <EF:EFInput blockId="inqu_status" ename="restMessageId" row="0" />
		    </td>
		    <td nowrap width="10%">
		    REST消息目标地址
		    </td>
		    <td nowrap width="20%">
		    <EF:EFInput blockId="inqu_status" ename="restMessageRemoteTarget" row="0"/>
		    </td>
		    <td nowrap width="10%">
		    REST消息方法名
		    </td>
		    <td nowrap width="20%">
		    <EF:EFInput blockId="inqu_status" ename="restMessageFuncId" row="0"/>
		    </td>
		  </tr>
		  <tr>
		    <td nowrap width="10%">
		   REST消息应用名 
		    </td>
		    <td nowrap width="20%">
		    <EF:EFInput blockId="inqu_status" ename="restMessageSourceAppCode" row="0" />
		    </td>
		  
		  
		    <td nowrap width="10%">
		   REST消息发送时间
		    </td>
		    <td align="left" width="15%">
			 <EF:EFInput  blockId="inqu_status" ename="restMessageSendTime" row="0" type="text" style="width:70%" />
			 <img id="efcalendar1" 
			  onload="efico.setImageSrc(this,'efcalendar.iconImg')" src="./EF/Images/eftree_blank.png"
			    onClick="efcalendar_1_click(this);">
			 </td>
		  </tr>
		  
		</table>
	</div>
</div>  


<div id="ef_region_result" title="记录集" efRegionShowClear="false">
	<div id="ef_tab_x"  lastRange="98.5%" eftabWidth="100%"> 
		<div  id="success" title="发送完成"  eftabHeight="100%"   eftabSrc="">
		</div>
		<div  id="fail" title="发送失败"  eftabHeight="100%"  eftabSrc="">
			
		</div>
	    <div  id="waiting" title="等待中的"  eftabHeight="100%" eftabSrc="">
		
		</div>
	    <div  id="process" title="请求中的"  eftabHeight="100%" eftabSrc="">
			
		</div> 
	</div>
	<div id = "ef_grid_result" title="记录集" style="overflow: hidden;height:300px;">
    </div>  
</div>	
<EF:EFTab tabId="x" action="fun"/>    
 
<div id = "ef_region_detail" title="返回结果" efRegionShowClear="false"  >
		<div style="overflow:hidden;width:100%;padding:10px;background:#fff;">
		   <table width = "100%">
				<tr>
					<td nowrap align="right" width="10%" valign="top">发送信息</td>
					<td nowrap colspan="1" width="40%">
						<EF:EFInput blockId="detail" ename="restMessageBody" row="0" type="textarea" style='width:100%;height:100px' />
					</td>
					<td nowrap align="right" width="10%" valign="top">返回信息</td>
					<td nowrap colspan="1" width="40%">
						<EF:EFInput blockId="detail" ename="restMessageReturnBody" row="0" type="textarea" style='width:100%;height:100px' />
					</td>
				
				</tr>
			</table>
		</div>

</div>
<EF:EFRegion/>
<EF:EFInput blockId="inqu_status" ename="restMessageState" row="0" type="hidden"/>
<EF:EFInput blockId="inqu_status" ename="restMessageState_1" row="0" type="hidden"/>
<EF:EFInput blockId="inqu_status" ename="restMessageState_2" row="0" type="hidden"/>
<EF:EFGrid blockId="result" autoDraw="false" readonly="true" ajax="true">
	<EF:EFColumn ename="restMessageId" cname="消息标识" width="150"  sort="true"  fix="yes"/>
	<EF:EFColumn ename="restMessageBody" cname="消息内容" width="0" visible="false" />
	<EF:EFColumn ename="restMessageRemoteTarget" cname="消息目标地址" width="250" sort="true" />
	<EF:EFColumn ename="restMessageFuncId" cname="消息方法名" width="150" sort="true" />
	<EF:EFColumn ename="restMessageSourceAppCode" cname="消息应用名" width="100" sort="true" />
	<EF:EFComboColumn ename="restMessageType" cname="消息类型" width="80" blockName="restTypeDesc" valueProperty="restMessageType" labelProperty="restMessageType_desc" formatString="#valueString#-#labelString#"  sort="true" />
	<EF:EFComboColumn ename="restMessageState" cname="消息调用状态" width="80" blockName="restStateDesc" valueProperty="restMessageState" labelProperty="restMessageState_desc" formatString="#valueString#-#labelString#"  sort="true" />
	<EF:EFColumn ename="restMessageSendTime" cname="消息发送时间" width="150" sort="true" />
	<EF:EFColumn ename="restMessageOperateStart" cname="调用开始时间" width="150" sort="true" />
	<EF:EFColumn ename="restMessageOperateEnd" cname="调用结束时间" width="150" sort="true" />
	<EF:EFColumn ename="restMessageOperateCount" cname="消息操作次数" width="80" sort="true" />
	<EF:EFColumn ename="restMessageOperateResult" cname="返回结果" visible="true" width="150"/>
	<EF:EFColumn ename="restMessageReturnBody" cname="结果" visible="false" width="150" />
	<EF:EFColumn ename="restIsSend" cname="操作"  displayType="textbutton" readonly="true" width="100" align="center"  visible="false"/>
	<EF:EFColumn ename="restMessageSeq" cname="消息序号" width="150" visible="false" />
	<EF:EFColumn ename="restMessageDepth" cname="消息层次" width="150" visible="false" />
</EF:EFGrid>      
<jsp:include flush="false" page="../../EF/Form/iplat.ef.tail.jsp"></jsp:include>
</form>

</body>
</html>   
