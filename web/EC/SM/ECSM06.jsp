<!DOCTYPE html>
<%@ page contentType="text/html; charset=UTF-8"%>

<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>
<%
	String actionUrl = request.getContextPath() + "/DispatchAction.do";
%>

<%@
page import="java.io.PrintWriter"%>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; 
	charset=UTF-8" />
	<title>
	</title>
	
	<script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
	<script type="text/javascript" src="./EC/SM/ECSM06.js"></script>
	
</head>
<body class="bodyBackground">

<form id="ECSM06" method="POST" action="<%=actionUrl%>" >

<jsp:include flush="false" page="../../EF/Form/iplat.ef.head.jsp"></jsp:include>

<input type="hidden" id="nodeId" name="nodeId" value="" />
<EF:EFInput blockId="inqu_status" ename="siteId" row="0" type="hidden" />
<div id = "ef_region_inqu" title="查询条件" efRegionShowClear=true>
	<div style="overflow:hidden;width:100%">
		<table>
		  <tr>
		    <td align="right" nowrap width="10%">
		      状态
		    </td>
		    <td nowrap width="20%">
				<EF:EFSelect blockId="inqu_status" row="0" ename="status" etc="style='width:120px'">
					<EF:EFOption value="" label="全部" />
					<EF:EFCodeOption condition="" codeName="iplat.ec.transStatus"/>
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

<div id="detailContent" class="efwindow" >
<div style="width:350px;">
	<div id="ef_region_detail">
	 	<table width="100%">
	 	<tr>
			<td>
				<div id = "ef_region_siteinfo" title="详细内容" style="overflow:scroll">
			 		<table>
						<tr>
				 			<td align="right" width="40%">	
				 				文件传输方式:
				 			</td>
				 			<td style="padding-left:10px;">
				 				<input  type="hidden" id="d-0-flag" name="d-0-flag"  class="inputField" />
				 				<input  type="hidden" id="d-0-transId" name="d-0-transId"  class="inputField" />
				 				<input  type="hidden" id="d-0-siteId" name="d-0-siteId"  class="inputField" />
				 				<input  type="hidden" id="d-0-status" name="d-0-status"  class="inputField" />
							    <EF:EFSelect blockId="d" ename="transMode" row="0" >
									<EF:EFOption value="00" label="文件系统" />
									<EF:EFOption value="01" label="ftp" />
									<EF:EFOption value="02" label="sftp" />
							    </EF:EFSelect>
				 			</td>
						</tr>
						<tr>
				 			<td align="right">	
				 				文件传输地址:
				 			</td>
							<td style="padding-left:10px;">
				 				<input  type="text" id="d-0-transAddr" name="d-0-transAddr" class="inputField" />
							 </td>
						</tr>
						<tr>
				 			<td align="right">	
				 				用户名:
				 			</td>
				 			<td style="padding-left:10px;">	
				 				<input type="text" id="d-0-accId" name="d-0-accId"  class="inputField" />
				 			</td>
						</tr>
						<tr>
				 			<td align="right">	
				 				密码:
				 			</td>
							<td style="padding-left:10px;">
				 				<input  type="text" id="d-0-password" name="d-0-password"  class="inputField"/>
							 </td>
						</tr>
					</table>
				</div>		
			</td> 	
	 	</tr>
	 	</table>	
	 </div>
</div>
</div>
<EF:EFRegion/>
<EF:EFGrid blockId="result" autoDraw="no" style="operationBar:false">
<EF:EFComboColumn ename="status" cname="状态" >
	<EF:EFOption value="00" label="启用" />
	<EF:EFOption value="01" label="禁止" />
</EF:EFComboColumn>
<EF:EFComboColumn ename="transMode" cname="文件传输方式" >
	<EF:EFOption value="00" label="文件系统" />
	<EF:EFOption value="01" label="ftp" />
	<EF:EFOption value="02" label="sftp" />
</EF:EFComboColumn>
<EF:EFColumn ename="transAddr" maxLength="50" width="200" minLength="1" nullable="false" cname="文件传输地址" />
<EF:EFColumn ename="option" cname="操作" />
<EF:EFColumn ename="transId" visible="false"/>
<EF:EFColumn ename="siteId"   visible="false" />
<EF:EFColumn ename="accId" visible="false"/>
<EF:EFColumn ename="password" visible="false"/>
</EF:EFGrid>      

<jsp:include flush="false" page="../../EF/Form/iplat.ef.tail.jsp"></jsp:include>
</form>

</body>
</html>   
