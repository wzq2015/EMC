<!DOCTYPE html>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>
<%  String actionUrl = request.getContextPath() + "/DispatchAction.do"; %>
<html>
<head>
  <meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
  <title>Grid分组、明细、多列头演示</title>
  <script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
<script class="javascript" src="./EF/SyntaxHighlighter/shCore.js"></script>
<script class="javascript" src="./EF/SyntaxHighlighter/shBrushJScript.js"></script>
<script class="javascript" src="./EF/SyntaxHighlighter/shBrushXmlOrJsp.js"></script>
<link type="text/css" rel="stylesheet" href="./EF/SyntaxHighlighter/SyntaxHighlighter.css"></link>
</head>

<body class="bodyBackground">

<form id="EEDM98" method="POST" action="<%=actionUrl%>" >
  <jsp:include flush="false" page="../../EF/Form/iplat.ef.head.jsp" />
	<script type="text/javascript" src="./EE/DM/EEDM98.js"></script>
<div id="ef_region_inqu" title="查询条件" efRegionShowClear=true>
  <div style="width:100%">
    <table style="width:100%">
      <tr>
        <td align="right" nowrap style="width:5%">产品代号 ：</td>
        <td style="width:10%">
          <EF:EFInput blockId="inqu_status" ename="productCode" row="0" />
        </td>
        <td align="right" nowrap style="width:5%">产品名称 ：</td>
        <td style="width:20%">
          <EF:EFInput blockId="inqu_status" ename="productName" row="0" />
        </td>
      </tr>
      <tr>
        <td nowrap  align="right">是否生产 ：</td>
        <td >
          <EF:EFSelect blockId="inqu_status" ename="isproduced" row="0" etc="style='width:138px;height:26px'">
            <EF:EFOption label="" value="" />
            <EF:EFOption label="否" value="0" />
            <EF:EFOption label="是" value="1" />
          </EF:EFSelect>
        </td>

        <td align="right" nowrap >组织机构(测试字段)：</td>
        <td >
          <EF:EFTreeInput blockId="inqu_status" ename="companyCustomizeField" row="0"  modelName="EDPI12"
          		configFunc="myConfigTree" label="tree"  text="组织机构"  isRefresh="true"/>
        </td>
      </tr>
    </table>
  </div>
</div>

<div id = "ef_region_result" title="记录集" style="overflow:scroll">
	<div id = "ef_grid_result" title="页面信息" style="overflow: hidden;height:400px;"></div>
</div>

<EF:EFRegion/>

<DIV  style="display:none">
	<div id="result_detail_div" style="height:auto">
		<table style='border-style:dashed;border-width:1px;border-color:gray'>
		<tr>
			<td rowspan="4"><a href="#" onclick="openpic_onclick()"><img src="./EE/DM/ohoopee1.jpg" width="120" height="100"></a></td>
		</tr>
		  <tr>
		    <td nowrap width="15%">
		      产品代号
		    </td>
		    <td nowrap width="50%">
		    <EF:EFInput blockId="result" ename="productCode" row="0" type="text" style='width:200px'/>
		    </td>
		    <td nowrap width="15%">
		      产品名称
		    </td>
		    <td nowrap width="50%">
		    <EF:EFInput blockId="result" ename="productName" row="0" type="text" style='width:200px'/>
		    </td>
		   </tr>
		   <tr>
		    <td nowrap width="15%">
			公司代号
		    </td>
		    <td nowrap width="50%">
		    <EF:EFInput blockId="result" ename="companyCode" row="0" type="text" style='width:200px'/>
		    </td>
		    <td nowrap width="15%">
			产品价格
		    </td>
		    <td nowrap width="50%">
		    <EF:EFInput blockId="result" ename="productPrice" row="0" type="text"/>元/吨
		    </td>
		   </tr>
		   <tr>
		    <td nowrap width="15%">
			是否生产
		    </td>
		    <td nowrap width="50%">
			    <EF:EFSelect blockId="result" ename="isproduced" row="0" etc=' styleClass="inputField";style="width:138px" '>
					<EF:EFOption value="0" label="否" />
					<EF:EFOption value="1" label="是" />
			    </EF:EFSelect>
		    </td>
		    <td nowrap width="15%">
		    </td>
		    <td nowrap width="50%">
		    </td>
		   </tr>
		</table>
	</div>
</DIV>

<EF:EFGrid blockId="result" autoDraw="no" rowDetailDivID="result_detail_div" enableColumnSetter="true" groupField="companyCode" frontSort="true">
	<EF:EFColumnGroup  cname="产品编号" >
		<EF:EFColumn ename="productCode" cname="产品代号" width="150" />
		<EF:EFColumn ename="productName" cname="产品名称" width="150" />

		<EF:EFSubGridColumn ename="companyCode" cname="公司代号" sort="true" width="150"
		                    blockName="company" valueProperty="companyCode" serviceName="EEDM02" queryMethod="getCompany" />
	</EF:EFColumnGroup>

		<EF:EFColumn ename="productPrice" cname="产品价格" sort="false" align="right" width="150" formatString="#,###,##0.00" />
	<EF:EFColumnGroup  cname="产品状态" >
		<EF:EFComboColumn ename="isproduced" cname="是否生产" sort="true" align="center" width="100">
			<EF:EFOption value="0" label="否" />
			<EF:EFOption value="1" label="是" />
		</EF:EFComboColumn>
	</EF:EFColumnGroup>
</EF:EFGrid>

<jsp:include flush="false" page="../../EF/Form/iplat.ef.tail.jsp" />
</form>

</body>
</html>
