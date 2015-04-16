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
	<title>
	</title>

	<script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
	<script type="text/javascript" src="./EE/DM/EEDM14.js"></script>

</head>
<body class="bodyBackground">

<form id="EEDM05" method="POST" action="<%=actionUrl%>" >

<jsp:include flush="false" page="../../EF/Form/iplat.ef.head.jsp"></jsp:include>



<div id = "ef_region_inqu" title="查询条件" efRegionShowClear=true efRegionSave=true>
	<div style="overflow:hidden;width:100%">
		<table>
		  <tr>
		    <td nowrap width="15%">
		      公司代号
		    </td>
		    <td nowrap width="20%">
		    <EF:EFInput blockId="inqu_status" ename="companyCode" row="0" />

		    </td>
		    <td nowrap width="15%">
		      公司名称
		    </td>
		    <td nowrap width="20%">
		    <EF:EFInput blockId="inqu_status" ename="companyName" row="0" />
		    </td>
		    <td nowrap width="15%">
		      国家代号
		    </td>
		    <td nowrap width="20%">
		    <EF:EFInput blockId="inqu_status" ename="countryCode" row="0" />
		    <img title="国家代号信息" id="tree_list_node"
		    onload="efico.setImageSrc(this,'efform.efImgList')" src="./EF/Images/eftree_blank.png"
		     onmouseover="javascript:this.style.cursor='hand'" onClick="show_divwindow()">
		    </td>
		  </tr>

		  <tr>
		    <td nowrap >
		      记录创建开始日期
		    </td>
		    <td nowrap >
		    	<EF:EFInput blockId="inqu_status" ename="companyStartDate" row="0" popup="date" etc="maxLength='10' size='10'" />
		    </td>
		    <td nowrap >
		      记录创建截止日期
		    </td>
		    <td nowrap >
		    	<EF:EFInput blockId="inqu_status" ename="companyEndDate" row="0" popup="date" etc="maxLength='10' size='10'" />
		    </td>
		    <td nowrap >
		      查询条件名称
		    </td>
		    <td nowrap >
		    	<EF:EFInput blockId="" ename="iplat4jSName" row="" />
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

<EF:EFGrid blockId="result" autoDraw="no" readonly="false" paintId="ef_grid_result" ajax="true" >
<EF:EFColumn ename="companyCode" cname="公司代号" sort="true" fix="true" readonly="true"/>
<EF:EFColumn ename="companyName" cname="公司名称"  />
<EF:EFColumn ename="companyTel" cname="公司电话"  />
<EF:EFColumn ename="companyAddr" cname="公司地址"  width="200"/>
<EF:EFComboColumn ename="countryCode" cname="国家代号" blockName="country"
                      valueProperty="countryCode"  labelProperty="countryName"  width="200" formatString="#valueString#-#labelString#">
</EF:EFComboColumn>

<EF:EFColumn ename="companyDate" cname="成立日期"  editType="date" dateFormat="yyyy/mm/dd"/>
</EF:EFGrid>
<jsp:include flush="false" page="../../EF/Form/iplat.ef.tail.jsp"></jsp:include>
</form>

</body>
</html>
