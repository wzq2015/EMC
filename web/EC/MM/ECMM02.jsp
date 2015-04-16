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
	<title></title>
	
	<script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
	<script type="text/javascript" src="./EC/MM/ECMM02.js"></script>
</head>
<body class="bodyBackground">
<input type="hidden" id="hdMsg" value=""/>
<form id="ECMM02"  method="POST" action="<%=actionUrl%>" >

<jsp:include flush="false" page="../../EF/Form/iplat.ef.head.jsp"></jsp:include>

<div id = "ef_region_inqu" title="查询条件" efRegionShowClear=true>
 <EF:EFInput blockId="inqu_status" ename="siteType" row="0" type="hidden" />
	<div style="overflow:hidden;width:100%">
		<table width="100%">
		    <tr>
				<td nowrap align="right"  width="20%">
				  	留言姓名:
				</td>
				<td nowrap align="left" width="15%">
					<EF:EFInput blockId="inqu_status" ename="fullName" row="0" />
				</td>
				<td  nowrap align="right" width="15%" >
					留言类型：
				</td>
				<td align="left" width="15%" >
					<EF:EFSelect blockId="inqu_status" ename="msgType" row="0">
						<EF:EFOption value="" label="=请选择=" />
				        <EF:EFOption value="01" label="留言" />
						<EF:EFOption value="02" label="咨询" />
						<EF:EFOption value="03" label="建议" />
						<EF:EFOption value="04" label="投诉" />
				 	</EF:EFSelect>
				</td>
				<td  nowrap align="right" width="15%" >
					留言处理：
				</td>
				<td align="left" width="20%" >
					<EF:EFSelect blockId="inqu_status" ename="handleStatus" row="0">
					<EF:EFOption value="" label="=请选择=" />
					<EF:EFOption value="00" label="未处理" />
	                <EF:EFOption value="01" label="已阅知" />
					<EF:EFOption value="02" label="已反馈" />
					<EF:EFOption value="03" label="内部处理" />
					<EF:EFOption value="04" label="其他" />
			    </EF:EFSelect>
				</td>
		     </tr>
		</table>
	</div>
</div>  

<div id = "ef_region_result" title="记录集" style="overflow:scroll"> 
	<div id = "ef_grid_result" title="页面信息" style="overflow: hidden;height:300px;">
	</div> 
</div>     

<div id="message" class="efwindow">
	<table width="480">
		<tr>
			<td>
				<div id = "ef_region_message" title="访客留言详情"> 
						<table id="print" align="center" width="80%" border="0" cellspacing="0" cellpadding="0">
							<tr>
								<td align="center">
									<table width="100%" border="0" cellpadding="0" cellspacing="1">
										<tr>
											<td align="right" width="25%">
												姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名：
											</td>
											<td  align="left" width="25%">
												<EF:EFInput blockId="result" ename="fullName" etc="style='width:150px;' readonly='true'"  row="0" />
												<input type="hidden" id="msgId"/> 
											</td>
											<td align="right" width="25%">
												电&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;话：
											</td>
											<td align="left" width="25%">
												<EF:EFInput blockId="result" ename="tel" etc="style='width:150px;' readonly='true'"  row="0" />
											</td>
										</tr>
										<tr>
											<td align="right">
												所在单位：
											</td>
											<td align="left">
												<EF:EFInput blockId="result" ename="company" etc="style='width:150px;' readonly='true'"  row="0" />
											</td>
											<td align="right">
												职&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;务：
											</td>
											<td align="left">
												<EF:EFInput blockId="result" ename="post" etc="style='width:150px;' readonly='true'"  row="0" />
											</td>
										</tr>
										<tr>
											<td align="right">
												电子邮箱：
											</td>
											<td align="left">
												<EF:EFInput blockId="result" ename="email" etc="style='width:150px;' readonly='true'"  row="0" />
											</td>
											<td align="right">
												留言类型：
											</td>
											<td align="left">
												<EF:EFInput blockId="result" ename="msgType" etc="style='width:150px;' readonly='true'"  row="0" />
											</td>
										</tr>
										<tr>
											<td align="right">
												留言时间：
											</td>
											<td align="left">
												<EF:EFInput blockId="result" ename="time" etc="style='width:150px;' readonly='true'"  row="0" />
											</td>
										</tr>
										<tr>
											<td align="right">
												留言内容：
											</td>
											<td colspan="3" align="left" style="word-break: break-all; work-wrap:break-word">
												<EF:EFInput blockId="result" type="textarea"  ename="message" etc="style='width:400px;height:100px' readonly='true'" row="0"/>
											</td>
										</tr>
										<tr>
											<td colspan="4" style="height: 20px;" align="center">
											<br/>
											-------------------------------------<label id="msgType"></label>处理区域-------------------------------------
											</td>
										</tr>
										<tr>
											<td align="right">
												处理类型：
											</td>
											<td  colspan="3" align="left">
												<EF:EFSelect blockId="result" ename="handleStatus" row="0">
													<EF:EFOption value="" label="=请选择=" />
									                <EF:EFOption value="01" label="已阅知" />
													<EF:EFOption value="02" label="已反馈" />
													<EF:EFOption value="03" label="内部处理" />
													<EF:EFOption value="04" label="其他" />
											    </EF:EFSelect>
											</td>
										</tr>
										<tr>
											<td align="right">
												处理意见：								
											</td>
											<td colspan="3" align="left">
												<EF:EFInput blockId="result" type="textarea" etc="style='width:400px;height:100px'"  ename="handleOpinion" row="0"/>
											</td>
										</tr>
										<tr>
											<td align="right">
												处理人  ：
											</td>
											<td align="left" colspan="3">
												<EF:EFInput blockId="result" ename="handlePerson" etc="style='width:150px;'" row="0" />
											</td>
										</tr>
									</table>						
								</td>
							</tr>
						</table>
				</div> 
			</td> 	
		</tr>
	</table>
</div> 

<EF:EFGrid blockId="result" autoDraw="no" style="operationBar:false;" >

<EF:EFColumn ename="msgType" nullable="false" cname="留言类型" width="60" enable="false"/>
<EF:EFComboColumn ename="handleStatus" cname="处理类型" readonly="true">
	<EF:EFOption value="00" label="未处理" />
	<EF:EFOption value="01" label="已阅知" />
	<EF:EFOption value="02" label="已反馈" />
	<EF:EFOption value="03" label="内部处理" />
	<EF:EFOption value="04" label="其他" />
</EF:EFComboColumn>

<EF:EFColumn ename="message" nullable="false" cname="留言内容" width="220" enable="false"/>
<EF:EFColumn ename="fullName" nullable="false" cname="留言人" width="100" enable="false"/>
<EF:EFColumn ename="time" nullable="false" cname="留言时间" width="130"  enable="false"/>

<EF:EFColumn ename="handlePerson" nullable="false" cname="处理人" enable="false"/>
<EF:EFColumn ename="handleTime" cname="处理时间" enable="false" width="110"/>
<EF:EFColumn  ename="option"  cname="操作" width="110" enable="fasle"/>

<EF:EFColumn ename="msgId" visible="false"/>
<EF:EFColumn ename="tel" maxLength="50"  nullable="false" cname="电话" visible="false"/>
<EF:EFColumn ename="company" maxLength="50"  nullable="false" cname="单位" visible="false"/>
<EF:EFColumn ename="post" nullable="false" cname="职务" visible="false"/>
<EF:EFColumn ename="email" nullable="false" cname="邮箱" width="150" visible="false"/>
</EF:EFGrid>      

<EF:EFRegion/>
<jsp:include flush="false" page="../../EF/Form/iplat.ef.tail.jsp"></jsp:include>
</form>

</body>
</html>   
