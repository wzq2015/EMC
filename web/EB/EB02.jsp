<!DOCTYPE html>
<%@page contentType="text/html;charset=UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>

<%@page import="java.util.*" %>
<%@page import="com.baosight.iplat4j.ef.ui.column.*" %>

<%
	String actionUrl = request.getContextPath() + "/DispatchAction.do";
%>
<% 
	List combo_source = new ArrayList();

	combo_source.add( new EFComboBean("1", "成功") );	
	combo_source.add( new EFComboBean("0", "失败") );		
	
	request.setAttribute( "execute_result", combo_source );
%>

<html>
<head>
	<meta http-equiv="Content-Type" content="text/html;
	charset=UTF-8" />
	<title>
	</title>

	<script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
	<script type="text/javascript" src="./EB/EB02.js"></script>

</head>
<body class="bodyBackground">
<form id="EB02" method="POST" action="<%=actionUrl%>">

<jsp:include flush="false" page="../EF/Form/iplat.ef.head.jsp"></jsp:include>

<div id = "ef_region_inqu" title="查询条件" efRegionShowClear=true>
	<div>
		  <table>
		  <tr>
		    <td noWarp=-1 width="5%">
		      任务类名：
		    </td>
		    <td noWarp=-1 width="20%">
		    <EF:EFSelect blockId="inqu_status" ename="fclassname" row="0" >
		    <EF:EFOption label="全部" value=""></EF:EFOption>
		    <EF:EFOptions blockId="className" labelColumn="fclassname" valueColumn="fclassname"></EF:EFOptions>
		    </EF:EFSelect>
		    </td>
		    <td noWarp=-1 width="5%">
		      执行结果 ：
		    </td>
		    <td noWarp=-1 width="15%">
		    <EF:EFSelect blockId="inqu_status" ename="fresult" row="0" >
		    <EF:EFOption label="全部" value="" />
		    <EF:EFOption label="成功" value="1" />
		    <EF:EFOption label="失败" value="0" />
		    </EF:EFSelect>
		    </td>
		   </tr>
		   <tr>	   
		   <td noWarp=-1 width="5%">
		      开始时间 ：
		    </td>
		    <td noWarp=-1 width="20%">
		    <EF:EFInput blockId="inqu_status" ename="start_time" row="0" popup="date"/>
		    </td>
		    <td noWarp=-1 width="5%">
		      到 ：
		    </td>
		    <td noWarp=-1 width="20%">
		    <EF:EFInput blockId="inqu_status" ename="end_time" row="0" popup="date"/>
		    </td>
		    
		  </tr>
		</table> 
	</div>
</div>

<div id = "ef_region_result" title="记录集" style="overflow:scroll">
	<div id = "ef_grid_result" title="页面信息" style="overflow: hidden;">
	</div>
</div>

<EF:EFRegion/>
	<EF:EFGrid blockId="result" autoDraw="no" style="operationBar:false">
		<EF:EFColumn cname="类名" ename="fclassname" />
		<EF:EFColumn cname="开始时间" ename="fbegintime" />
		<EF:EFColumn cname="结束时间" ename="fendtime" />
		<EF:EFComboColumn cname="执行结果" ename="fresult"sourceName="execute_result" 
		valueProperty="value"  labelProperty="label" />
		<EF:EFColumn cname="错误信息" ename="ferrinfo" />
	</EF:EFGrid>

<jsp:include flush="false" page="../EF/Form/iplat.ef.tail.jsp"></jsp:include>
</form>
</body>
</html>
