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
	<script type="text/javascript" src="./EE/DM/EEDM09.js"></script>
		<script class="javascript" src="./EF/SyntaxHighlighter/shCore.js"></script>
	<script class="javascript" src="./EF/SyntaxHighlighter/shBrushJScript.js"></script>
	<script class="javascript" src="./EF/SyntaxHighlighter/shBrushXmlOrJsp.js"></script>
	<link type="text/css" rel="stylesheet" href="./EF/SyntaxHighlighter/SyntaxHighlighter.css"></link>

</head>
<body class="bodyBackground">

<form id="EEDM05" method="POST" action="<%=actionUrl%>" >

<jsp:include flush="false" page="../../EF/Form/iplat.ef.head.jsp"></jsp:include>



<div id = "ef_region_inqu" title="查询条件" efRegionShowClear=true>
	<div style="overflow:hidden;width:100%">
		<table style="width:100%">
		  <tr>
		    <td align="right" nowrap style="width:8%"> 公司代号：</td>
		    <td nowrap style="width:20%">
		    <EF:EFInput blockId="inqu_status" ename="companyCode" row="0" />
            </td>
		    <td align="right" nowrap style="width:5%">公司名称： </td>
		    <td nowrap style="width:20%">
		    <EF:EFInput blockId="inqu_status" ename="companyName" row="0" />
		    </td>
		    <td align="right" nowrap style="width:5%"> 国家代号：</td>
		    <td nowrap style="width:25%">
		    <EF:EFInput blockId="inqu_status" ename="countryCode" row="0" />
		    <img title="国家代号信息" id="tree_list_node"
		    onload="efico.setImageSrc(this,'efform.efImgList')" src="./EF/Images/eftree_blank.png"
		     onmouseover="javascript:this.style.cursor='hand'" onClick="show_divwindow()">
		    </td>
		  </tr>
		  
		  <tr>
		     <td align="right" nowrap> 成立日期：  </td>
		     <td>
		      <EF:EFInput blockId="inqu_status" ename="companyDate" value ="20120821" row="0" popup="date" etc="maxLength='18' size=‘18'" />
		     </td>
            
		   <td align="right" nowrap> 起止日期：</td>
		    <td>
		    <EF:EFDateStartEnd blockId="inqu_status" startName="companyStartDate" endName="companyEndDate" row="0" etc="maxLength='10' size='10'" />
		    </td>
		     
		    
		  </tr>
		</table>
	</div>
</div>

<div id = "ef_region_result" title="记录集" style="overflow:scroll">
	<div id = "ef_grid_result" title="页面信息" style="overflow: hidden;height:300px;">
	</div>
</div>

<div id="ef_tab_y"  lastRange="98%" eftabWidth="100%" eftabType="efRoundDivTab">
<div id="company" title="公司明细信息" >
<div id = "ef_region_result2" title="公司明细信息" efRegionShowClear=true>
	<div style="overflow:hidden;height:400px;width:100%">
		<table>
		  <tr>
		    <EF:EFInput blockId="" ename="rowIndex" row="" type="hidden"/>
		    <td nowrap width="15%">
		      公司代号
		    </td>
		    <td nowrap width="20%">
		    <EF:EFInput blockId="result2" ename="companyCode" row="0" etc="readOnly"/>

		    </td>
		    <td nowrap width="15%">
		      公司名称
		    </td>
		    <td nowrap width="20%">
		    <EF:EFInput blockId="result2" ename="companyName" row="0" />
		    </td>
		  </tr>

		  <tr>
		    <td nowrap width="15%">
		      公司电话
		    </td>
		    <td nowrap width="20%">
		    <EF:EFInput blockId="result2" ename="companyTel" row="0" />

		    </td>
		    <td nowrap width="15%">
		      公司地址
		    </td>
		    <td nowrap width="20%">
		    <EF:EFInput blockId="result2" ename="companyAddr" row="0" />
		    </td>
		  </tr>
		  <tr>
		    <td nowrap width="15%">
		      国家代号
		    </td>
		    <td nowrap width="20%">
			<EF:EFSelect blockId="result2" ename="countryCode" row="0" >
			    <EF:EFOption label="选择国家代号" value="" />
			    <EF:EFOptions conj="-" blockId="country" labelColumn="countryName" valueColumn="countryCode"/>
			</EF:EFSelect>
		    </td>
		    <td nowrap width="15%">
		      成立日期
		    </td>
		    <td nowrap width="20%">
		    <EF:EFInput blockId="result2" ename="companyDate" row="0" popup="date" etc="size=20 maxLength='8' size='8'" />
		  
		    </td>
		  </tr>
		</table>
	</div>
</div>
</div>


<div id="product" title="产品列表信息" >
<div id = "ef_region_inqu3" title="查询条件" efRegionShowClear=true>
	<div style="overflow:hidden;width:100%">
		<table>
		  <tr>
		    <EF:EFInput blockId="inqu_status" ename="productCompanyCode" row="0" type="hidden"/>
		    <td nowrap width="15%">
		      产品代号
		    </td>
		    <td nowrap width="20%">
		    <EF:EFInput blockId="inqu_status" ename="productCode" row="0" />
		    </td>
		    <td nowrap width="15%">
		      产品名称
		    </td>
		    <td nowrap width="20%">
		    <EF:EFInput blockId="inqu_status" ename="productName" row="0" />
		    </td>
		  </tr>
		</table>
	</div>
</div>

<div id = "ef_region_result3" title="记录集" style="overflow:scroll">
	<div id = "ef_grid_result3" title="页面信息" style="overflow: hidden;height:300px;">
	</div>
</div>

</div>


</div>



<EF:EFRegion/>

<EF:EFGrid blockId="result" autoDraw="no" readonly="false" paintId="ef_grid_result" ajax="true" serviceName="EEDM09" queryMethod="query">
<EF:EFColumn ename="companyCode" cname="公司代号" sort="true" fix="true" readonly="true"/>
<EF:EFColumn ename="companyName" cname="公司名称"  />
<EF:EFColumn ename="companyTel" cname="公司电话"  />
<EF:EFColumn ename="companyAddr" cname="公司地址"  width="200"/>
<EF:EFComboColumn ename="countryCode" cname="国家代号" blockName="country"
                      valueProperty="countryCode"  labelProperty="countryName"  width="200" formatString="#valueString#-#labelString#">
</EF:EFComboColumn>

 <EF:EFColumn ename="companyDate" cname="成立日期"  editType="date" dateFormat="yyyy/mm/dd"/>
 <EF:EFColumn ename="companyDate"  cname="上市日期" editType="date" dateFormat="yyyy-mm-dd" />
</EF:EFGrid>

<EF:EFGrid blockId="result" autoDraw="no" readonly="false" paintId="ef_grid_result3" ajax="true" serviceName="EEDM09" queryMethod="queryProduct">
<EF:EFColumn ename="productCode" cname="产品代号" sort="true" fix="true" readonly="true"/>
<EF:EFColumn ename="productName" cname="产品名称"  />
<EF:EFComboColumn ename="companyCode" cname="所属公司" blockName="company"
                      valueProperty="companyCode"  labelProperty="companyName"  width="200" formatString="#valueString#-#labelString#">
</EF:EFComboColumn>
<EF:EFColumn ename="productPrice" cname="价格"  />
<EF:EFColumn ename="isproduced" cname="是否生产"  />
</EF:EFGrid>

<EF:EFTab tabId="y" />


<jsp:include flush="false" page="../../EF/Form/iplat.ef.tail.jsp"></jsp:include>
</form>

</body>
</html>
