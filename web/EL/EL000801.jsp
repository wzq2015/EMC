<!DOCTYPE html>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page import="com.baosight.iplat4j.core.soa.SoaConfig" %>
<%@ page import="com.baosight.iplat4j.core.soa.SoaConstants" %>
<%@ page import="com.baosight.iplat4j.core.spring.SpringApplicationContext" %>
<%@ page import="com.baosight.iplat4j.core.resource.I18nMessages" %>
<%@ page import="com.baosight.iplat4j.core.FrameworkInfo" %>
<%@ page import="com.baosight.iplat4j.util.DateUtils" %>

<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>
<%
	String actionUrl = request.getContextPath() + "/DispatchAction.do";
%>

<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>时间段访问统计(分钟)</title>
<script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
<script type="text/javascript" src="./EL/EL000801.js"></script>
</head>
<body class="bodyBackground">
	<form id="EL000801" method="POST" action="<%=actionUrl%>" >
		<jsp:include flush="true" page="../EF/Form/iplat.ef.head.jsp"></jsp:include>
		<input type="hidden" id="currentdate" value="<%=DateUtils.curDateStr()%>" />
		<div id="ef_region_inqu" title="<%=I18nMessages.getText("label.EFQueryConditions", "查询条件")%>"  efRegionShowClear="true" >
		<div id = "ef_div_inqu" style = "overflow:hidden;width:100%">
		<table  border="0">
		<tr>
		<td>
		日期：
		</td>
		<td>
		<EF:EFInput blockId="inqu_status" ename="selectdate"  popup="date" row="0" etc="nullable='false'" />				
		</td>
		<td nowrap>
		 访问类型：
		</td>
		<td>		
		 <EF:EFSelect blockId="inqu_status" ename="logtype" row="0" >		   
		    <EF:EFCodeOption codeName="iplat.el.logtype" />
		 </EF:EFSelect>			
		</td>
		<td>
		时间：
		</td>
		<td>
		<EF:EFSelect blockId="inqu_status" ename="starttime" row="0" >			  
               <EF:EFOption label="0点" value="00:00" />
              <EF:EFOption label="1点" value="01:00" />
              <EF:EFOption label="2点" value="02:00" />
              <EF:EFOption label="3点" value="03:00" />
              <EF:EFOption label="4点" value="04:00" />
              <EF:EFOption label="5点" value="05:00" />
              <EF:EFOption label="6点" value="06:00" />
              <EF:EFOption label="7点" value="07:00" />
              <EF:EFOption label="8点" value="08:00" />
              <EF:EFOption label="9点" value="09:00" />
              <EF:EFOption label="10点" value="10:00" />
              <EF:EFOption label="11点" value="11:00" />
              <EF:EFOption label="12点" value="12:00" />
              <EF:EFOption label="13点" value="13:00" />
              <EF:EFOption label="14点" value="14:00" />
              <EF:EFOption label="15点" value="15:00" />
              <EF:EFOption label="16点" value="16:00" />
              <EF:EFOption label="17点" value="17:00" />
              <EF:EFOption label="18点" value="18:00" />
              <EF:EFOption label="19点" value="19:00" />
              <EF:EFOption label="20点" value="20:00" />
              <EF:EFOption label="21点" value="21:00" />
              <EF:EFOption label="22点" value="22:00" />  
              <EF:EFOption label="23点" value="23:00" />     
              <EF:EFOption label="24点" value="24:00" />             
		 </EF:EFSelect>		 				
		</td>
		<td newrap>
		~
		</td>
		<td>
			<EF:EFSelect blockId="inqu_status" ename="endtime" row="0" >			 
              <EF:EFOption label="0点" value="00:00" />
              <EF:EFOption label="1点" value="01:00" />
              <EF:EFOption label="2点" value="02:00" />
              <EF:EFOption label="3点" value="03:00" />
              <EF:EFOption label="4点" value="04:00" />
              <EF:EFOption label="5点" value="05:00" />
              <EF:EFOption label="6点" value="06:00" />
              <EF:EFOption label="7点" value="07:00" />
              <EF:EFOption label="8点" value="08:00" />
              <EF:EFOption label="9点" value="09:00" />
              <EF:EFOption label="10点" value="10:00" />
              <EF:EFOption label="11点" value="11:00" />
              <EF:EFOption label="12点" value="12:00" />
              <EF:EFOption label="13点" value="13:00" />
              <EF:EFOption label="14点" value="14:00" />
              <EF:EFOption label="15点" value="15:00" />
              <EF:EFOption label="16点" value="16:00" />
              <EF:EFOption label="17点" value="17:00" />
              <EF:EFOption label="18点" value="18:00" />
              <EF:EFOption label="19点" value="19:00" />
              <EF:EFOption label="20点" value="20:00" />
              <EF:EFOption label="21点" value="21:00" />
              <EF:EFOption label="22点" value="22:00" />  
              <EF:EFOption label="23点" value="23:00" />     
              <EF:EFOption label="24点" value="24:00" />                 
		 </EF:EFSelect>	
		</td>
		</tr>	
		</table>
		</div>
		</div>		
		<div id = "ef_region_result" title="<%=I18nMessages.getText("label.EFRecordSet","记录集") %>" style="overflow:scroll"  efRegionShowClear = true> 
		<div id = "ef_grid_result" title="页面响应平均时间统计" style="overflow: hidden;height:500px;">
		</div> 
		</div>
		<EF:EFRegion />		
		<EF:EFGrid blockId = "result" autoDraw = "false"  ajax = "true" readonly="false" style="navigationBar:false;operationBar:false" >
		<EF:EFColumn ename="id"  cname='<%=I18nMessages.getText("label.rownum","序号")%>'  readonly="true" width="200" />
		<EF:EFColumn ename="timespan" cname='<%=I18nMessages.getText("label.timespan","时间段") %>' readonly="true" width="200" />
		<EF:EFColumn ename="accesscount" cname='<%=I18nMessages.getText("label.accesscount","访问量") %>'  readonly="true" width="200" />
		
		</EF:EFGrid>			
		<jsp:include flush="false" page="../EF/Form/iplat.ef.tail.jsp"></jsp:include>
	</form>
</body>
</html>
