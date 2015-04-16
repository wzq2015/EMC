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
	<script type="text/javascript" src="./EE/DM/EEDM04.js"></script>
		<script class="javascript" src="./EF/SyntaxHighlighter/shCore.js"></script>
	<script class="javascript" src="./EF/SyntaxHighlighter/shBrushJScript.js"></script>
	<script class="javascript" src="./EF/SyntaxHighlighter/shBrushXmlOrJsp.js"></script>
	<link type="text/css" rel="stylesheet" href="./EF/SyntaxHighlighter/SyntaxHighlighter.css"></link>

</head>
<body class="bodyBackground">

<form id="EEDM04" method="POST" action="<%=actionUrl%>" >

<jsp:include flush="false" page="../../EF/Form/iplat.ef.head.jsp"></jsp:include>

<div id = "ef_region_inqu" title="查询条件" efRegionShowClear=true>
	<div style="overflow:hidden;width:100%">
		<table style="width:100%">
		 <tr>
			<td nowrap style="width:15%" align="right">
		      洲名称：
		    </td>
		    <td nowrap style="width:40%" align="left">
		    <EF:EFSelect blockId="inqu_status" ename="continentCode" row="0" etc=' style="width:138px;height:26px" styleClass="inputField" onChange=getCountryOfContinent();'>
		      <EF:EFOption label="全部" value="" />
		      <EF:EFOptions blockId="continent" conj="-" labelColumn="continentName" valueColumn="continentCode"></EF:EFOptions>
		    </EF:EFSelect>
		    </td>
	
		   <td nowrap style="width:5%" align="right">
		      公司电话：
		    </td>
		    <td nowrap align="left">
		    	<EF:EFInput blockId="inqu_status" ename="companyTel" row="0" etc=" style='width:150px' validateType='phone_with_area_code'  " />
		    </td>
		  </tr>
		  <tr>
		     <td nowrap  align="right">
		      国家名称：
		    </td>
		    <td nowrap  align="left">
	        <EF:EFSelect blockId="inqu_status" ename="countryCode" row="0" etc='style="width:138px;height:26px"' >
	          <EF:EFOption label="全部" value="" />
		      <EF:EFOptions blockId="country"  labelColumn="countryName" valueColumn="countryCode"></EF:EFOptions>
		    </EF:EFSelect>
		    </td>
		 
		   <td nowrap align="right">
		      成立日期：
		    </td>
		    <td nowrap align="left">
		    	<EF:EFInput blockId="inqu_status" ename="companyDate" row="0" dateFormatString="yyyy-MM-dd hh:mm:ss SSS" etc=" style='width:150px' value='20120315140430999'" />
		    </td>

		  </tr>
		  <tr>
		     <td nowrap align="right">
		      公司代号：
		    </td>
		    <td nowrap  align="left">
		    <EF:EFInput blockId="inqu_status" ename="companyCode"  row="0" etc=" maxLength='8' " />
		    </td>
		    <td nowrap align="right">
		      注册资金：
		    </td>
		    <td nowrap align="left">
		    	<EF:EFInput blockId="inqu_status" ename="companyPrice" row="0" formatString="$###,###,###,##0.0 刀" etc=" style='width:150px' value='3200000.00'" />
		    </td>
		  </tr>
		  <tr>
		  <td  nowrap align="right">
		      	checkbox(只显示手工设置值)：
		    </td>
		    <td nowrap align="left" >
				<EF:EFCheckbox blockId="inqu_status" row="0" ename="companyAddr"
					labelList="苹果,安卓,塞班,小米,摩托,索尼," valueList="0,1,2,3,4,5" both="false" numInLine="3"
					codeName="iplat.shifou" conj="" etc=" onclick='javascript:alert(\"当前项的选中状态\" + this.checked);'">
				</EF:EFCheckbox>
		    </td>
		     <td nowrap align="right">
		      	Radio(只显示手工设置值)：
		    </td>
		    <td nowrap >
				<EF:EFRadio blockId="inqu_status" row="0" ename="companyAddr1"
					labelList="苹果,安卓,塞班,小米,摩托,索尼" valueList="0,1,2,3,4,5" both="false" numInLine="2"
					codeName="iplat.shifou" conj="" etc=" onclick='javascript:alert(\"当前项的选中状态\" + this.checked);'">
				</EF:EFRadio>
		    </td>
		    
		  </tr>
		  <tr>
		    <td nowrap align="right">
		      	checkbox(小代码)：
		    </td>
		    <td  nowrap align="left">
				<EF:EFCheckbox blockId="inqu_status" row="0" ename="companyAddr"
					codeName="iplat.shifou" conj="" etc=" onclick='javascript:alert(\"当前项的选中状态\" + this.checked);'">
				</EF:EFCheckbox>
		    </td>
		    <td nowrap align="right">
		      	Radio(小代码)：
		    </td>
		    <td nowrap align="left">
				<EF:EFRadio blockId="inqu_status" row="0" ename="companyAddr0"
					codeName="iplat.shifou" conj="" etc=" onclick='javascript:alert(\"当前项的选中状态\" + this.checked);'">
				</EF:EFRadio>
		    </td>
		  </tr>
		  <tr>
		  <td nowrap align="right">
		      	checkbox(都显示)：
		    </td>
		    <td nowrap align="left" colspan="3">
				<EF:EFCheckbox blockId="inqu_status" row="0" ename="companyAddr"
					labelList="苹果,安卓,塞班" valueList="0,1,2,3" both="true"
					codeName="iplat.shifou" conj="" etc=" onclick='javascript:alert(\"当前项的选中状态\" + this.checked);'">
				</EF:EFCheckbox>
		    </td>
		  </tr>
		  <tr>
		   <td nowrap align="right">
		      	Radio(都显示)：
		    </td>
		    <td nowrap align="left" >
				<EF:EFRadio blockId="inqu_status" row="0" ename="companyAddr2"
					labelList="苹果,安卓,塞班" valueList="0,1,2,3" both="true"
					codeName="iplat.shifou" conj="" etc=" onclick='javascript:alert(\"当前项的选中状态\" + this.checked);'">
				</EF:EFRadio>
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
<EF:EFGrid blockId="result" autoDraw="no" readonly="false" ajax="true">
	<EF:EFColumn ename="companyCode"  fix="yes" cname="公司代号" nullable="false" minLength="1"  maxLength="8" />
	<EF:EFColumn ename="companyName" cname="公司名称" nullable="false"/>
	<EF:EFColumn ename="companyTel" cname="公司电话" validateType="phone_with_area_code"/>
	<EF:EFColumn ename="companyAddr" cname="公司地址" />

	<EF:EFComboColumn ename="continentCode" cname="所在洲" blockName="continent"
			valueProperty="continentCode"  labelProperty="continentName" />

	<EF:EFComboColumn ename="countryCode" cname="所在国家" blockName="country"
			 valueProperty="countryCode"  labelProperty="countryName" >
	</EF:EFComboColumn>

	<EF:EFColumn ename="companyDate" cname="成立日期" width="150" editType="date" dateFormatString="yyyy-MM-dd hh:mm:ss"  dateFormat="yyyy-mm-dd"  nullable="false"/>
</EF:EFGrid>


<jsp:include flush="false" page="../../EF/Form/iplat.ef.tail.jsp"></jsp:include>
</form>

</body>
</html>
