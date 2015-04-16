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
   //执行方式：
	List mode_list = new ArrayList();
	mode_list.add( new EFComboBean("1", "定时") );	
	mode_list.add( new EFComboBean("2", "延时") );	
	mode_list.add( new EFComboBean("3", "定时定周期") );	
	mode_list.add( new EFComboBean("4", "延时定周期") );	
	mode_list.add( new EFComboBean("5", "定比率定时定周期") );	
	mode_list.add( new EFComboBean("6", "定比率延时定周期") );		
	request.setAttribute( "execute_mode", mode_list );
	
	//延时
	List delay_list = new ArrayList();
	delay_list.add( new EFComboBean("0", "0") );	
	delay_list.add( new EFComboBean("60", "1分钟") );	
	delay_list.add( new EFComboBean("300", "5分钟") );	
	delay_list.add( new EFComboBean("900", "15分钟") );	
	delay_list.add( new EFComboBean("1800", "30分钟") );	
	delay_list.add( new EFComboBean("3600", "1小时") );	
	delay_list.add( new EFComboBean("7200", "2小时") );
	delay_list.add( new EFComboBean("10800", "3小时") );	
	delay_list.add( new EFComboBean("21600", "6小时") );	
	delay_list.add( new EFComboBean("43200", "12小时") );	
	delay_list.add( new EFComboBean("86400", "1天") );	
	delay_list.add( new EFComboBean("172800", "2天") );	
	delay_list.add( new EFComboBean("259200", "3天") );	
	delay_list.add( new EFComboBean("604800", "7天") );	
	delay_list.add( new EFComboBean("1209600", "14天") );	
	delay_list.add( new EFComboBean("2592000", "30天") );	
	request.setAttribute( "delay_time", delay_list );
	
	//周期
	List period_list = new ArrayList();
	period_list.add( new EFComboBean("0", "0") );	
	period_list.add( new EFComboBean("60", "1分钟") );	
	period_list.add( new EFComboBean("300", "5分钟") );	
	period_list.add( new EFComboBean("900", "15分钟") );	
	period_list.add( new EFComboBean("1800", "30分钟") );	
	period_list.add( new EFComboBean("3600", "1小时") );	
	period_list.add( new EFComboBean("7200", "2小时") );
	period_list.add( new EFComboBean("10800", "3小时") );	
	period_list.add( new EFComboBean("21600", "6小时") );	
	period_list.add( new EFComboBean("43200", "12小时") );	
	period_list.add( new EFComboBean("86400", "1天") );	
	period_list.add( new EFComboBean("172800", "2天") );	
	period_list.add( new EFComboBean("259200", "3天") );	
	period_list.add( new EFComboBean("604800", "7天") );	
	period_list.add( new EFComboBean("1209600", "14天") );	
	period_list.add( new EFComboBean("2592000", "30天") );	
	request.setAttribute( "period_time", period_list );
	
	//是否加载
	List flag_list = new ArrayList();
	flag_list.add( new EFComboBean("0", "否") );
	flag_list.add( new EFComboBean("1", "是") );					
	request.setAttribute( "open_flag", flag_list );
	
%>

<html>
<head>
	<meta http-equiv="Content-Type" content="text/html;
	charset=UTF-8" />
	<title>
	</title>

	<script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
	<script type="text/javascript" src="./EB/EB01.js"></script>

</head>
<body class="bodyBackground">
<form id="EB01" method="POST" action="<%=actionUrl%>">

<jsp:include flush="false" page="../EF/Form/iplat.ef.head.jsp"></jsp:include>

<div id = "ef_region_inqu" title="查询条件" efRegionShowClear=true>
	<div>
		  <table>
		  <tr>
		   <td noWarp=-1 width="15%">
		      类名 ：
		    </td>
		    <td noWarp=-1 width="25%">
		    <EF:EFInput blockId="inqu_status" ename="fclassname" row="0" />
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

	<EF:EFGrid blockId="result" autoDraw="no">
		<EF:EFColumn cname="类名" ename="fclassname" nullable="false" />
		<EF:EFColumn cname="任务描述" ename="fdesc" nullable="false" />
		<EF:EFComboColumn cname="执行方式" ename="fdotype"sourceName="execute_mode" valueProperty="value"  labelProperty="label" />
		<EF:EFColumn cname="定时时间" ename="fbegintime" editType="date" />
		<EF:EFComboColumn cname="延时" ename="fdelay" sourceName="delay_time" valueProperty="value"  labelProperty="label" />	
		<EF:EFComboColumn cname="周期" ename="fperiod" sourceName="period_time" valueProperty="value"  labelProperty="label"  />
		<EF:EFComboColumn cname="是否加载" ename="fopenflag" sourceName="open_flag" valueProperty="value"  labelProperty="label" enable="false" />
		<EF:EFColumn ename="fload" cname="任务加载" width="80"/>		
		<EF:EFColumn ename="funload" cname="任务卸载" width="80"/>	
		<EF:EFColumn cname="加载时间" ename="floadtime" editType="date" readonly="true" enable="false"/>		
		<EF:EFColumn cname="可删除" ename="fcandelete" visible="false" />
	</EF:EFGrid>

<jsp:include flush="false" page="../EF/Form/iplat.ef.tail.jsp"></jsp:include>
</form>
</body>
</html>
