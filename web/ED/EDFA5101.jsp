<!DOCTYPE html>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@page import="com.baosight.iplat4j.core.soa.SoaConfig" %>
<%@page import="com.baosight.iplat4j.core.soa.SoaConstants" %>
<%@page import="com.baosight.iplat4j.core.spring.SpringApplicationContext" %>
<%@page import="com.baosight.iplat4j.core.resource.I18nMessages" %>
<%@page import="com.baosight.iplat4j.core.FrameworkInfo" %>

<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
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
	<script type="text/javascript" src="./ED/EDFA5101.js"></script>
	
</head>
<body class="bodyBackground">

<form id="EDFA00" method="POST" action="<%=actionUrl%>" >

<jsp:include flush="false" page="../EF/Form/iplat.ef.head.jsp"></jsp:include>

<%--<div id = "ef_region_inqu" title="查询条件" efRegionShowClear=true>
	<div style="overflow:hidden;width:100%">
		<table>
		  <tr>
		    <td nowrap width="15%">
		      画面英文名
		    </td>
		    <td nowrap width="20%">
		    <EF:EFInput blockId="inqu_status" ename="formEname" row="0" style="text-transform : uppercase;" etc="validateType='string' maxLength='8' size='8'"/>
				<img title="结点英文名列表" src="./EF/Images/ef_pop_up_window.gif" >
		    </td>
		    <td nowrap width="15%">
		      画面中文名
		    </td>
		    <td nowrap width="20%">
		    <EF:EFInput blockId="inqu_status" ename="funcId" row="0" />
		    </td>
		    <td nowrap width="15%">
		      画面类型
		    </td>  
		    <td nowrap >
		    </td>
		  </tr>
		  <tr>
		    <td nowrap >
		      记录创建开始日期
		    </td>
		    <td nowrap >
		    	<EF:EFInput blockId="inqu_status" ename="userId" row="0" popup="date" etc="maxLength='8' size='8'" />
		    </td>
		    <td nowrap >
		      记录创建截止日期
		    </td>
		    <td nowrap >
		    	<EF:EFInput blockId="inqu_status" ename="rec_create_time_end" row="0" popup="date" etc="maxLength='8' size='8'" />
		    </td>
		    <td nowrap width="15%">
		      工程
		    </td>  
		    <td nowrap >
		    </td>
		  </tr>
		  
		</table>
	</div>
</div>  
 --%>
 
 <EF:EFInput blockId="inqu_status" ename="formEname" row="0" type="hidden"></EF:EFInput>
 <EF:EFInput blockId="inqu_status" ename="funcId" row="0" type="hidden"></EF:EFInput>
 <EF:EFInput blockId="inqu_status" ename="userId" row="0" type="hidden"></EF:EFInput>

<div id = "ef_region_r" title="信息区" >
	<table width=100% cellpadding=0 cellspacing=0 >
	  <tr>
	    <td width=50%  valign="top">
	      <div id = "ef_region_result" title="已定义列信息" style="width=100%;">
	        <div id = "ef_grid_result" title="已定义列" style="overflow:hidden;">
	        </div> 
	      </div>     
	    </td>
	    <td width=50%  valign="top">
	      <div id = "ef_region_uresult" title="未定义列信息" style="width=100%;">
	        <div id = "ef_grid_uresult" title="未定义列" style="overflow: hidden;">
	        </div>
	      </div>     
	    </td>
	  </tr> 
	</table>
</div>
  
<EF:EFRegion/>

<EF:EFGrid blockId="result" autoDraw="no" readonly="false" ajax="true" style="operationBar:false;">
	<EF:EFColumn ename="seqNo"  />
	<EF:EFColumn ename="itemDisplayCname" />
	<EF:EFComboColumn ename="itemMustFlag" valueProperty="itemMustFlag" readonly="true">
	    	<EF:EFOption value="1" label="是" />
	    	<EF:EFOption value="0" label="否" />
	</EF:EFComboColumn>
	
</EF:EFGrid>      

<EF:EFGrid blockId="uresult" autoDraw="no" queryMethod="queryUnDefine" ajax="true" readonly="false" style="operationBar:false;">
	<EF:EFColumn ename="itemDisplayCname" readonly="true"/>
	<EF:EFComboColumn ename="itemMustFlag" valueProperty="itemMustFlag" readonly="true">
	    	<EF:EFOption value="1" label="是" />
	    	<EF:EFOption value="0" label="否" />
	</EF:EFComboColumn>
	
</EF:EFGrid>      
<jsp:include flush="false" page="../EF/Form/iplat.ef.tail.jsp"></jsp:include>
</form>

</body>
</html>   
