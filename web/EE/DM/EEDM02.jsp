<!DOCTYPE html>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>
<%  String actionUrl = request.getContextPath() + "/DispatchAction.do"; %>

<html>
<head>
  <meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
  <title>复杂单表、Grid回调及UserSession演示</title>

  <script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
  <script type="text/javascript" src="./EE/DM/EEDM02.js"></script>
	<script class="javascript" src="./EF/SyntaxHighlighter/shCore.js"></script>
	<script class="javascript" src="./EF/SyntaxHighlighter/shBrushJScript.js"></script>
	<script class="javascript" src="./EF/SyntaxHighlighter/shBrushXmlOrJsp.js"></script>
	<link type="text/css" rel="stylesheet" href="./EF/SyntaxHighlighter/SyntaxHighlighter.css"></link>
  <!-- 添加此脚步演示grid回调函数的使用 -->
  <script type="text/javascript" src="./EE/DM/EEDM02_callback.js"></script>

</head>

<body class="bodyBackground">

<form id="EEDM01" method="POST" action="<%=actionUrl%>" >
  <jsp:include flush="false" page="../../EF/Form/iplat.ef.head.jsp" />

  <div id="ef_region_inqu" title="查询条件" efRegionShowClear=true>
    <div style="overflow:hidden;width:100%">
      <table style="width:100%">
        <tr>
          <td align="right" nowrap style="width:5%">产品代号：</td>
          <td nowrap style="width:8%">
            <EF:EFInput blockId="inqu_status" ename="productCode" row="0" />
          </td>

          <td align="right" nowrap style="width:5%">产品名称：</td>
          <td nowrap style="width:20%">
            <EF:EFInput blockId="inqu_status" ename="productName" row="0" />
          </td>
        </tr>

        <tr>
          <td align="right">公司代号：</td>
          <td >
            <EF:EFInput blockId="inqu_status" ename="companyCode" row="0" etc="readonly onclick='openSelectCompany()'"/>
	        <img title="公司代号" id="tree_list_node"
	        onload="efico.setImageSrc(this,'efform.efImgList')" src="./EF/Images/eftree_blank.png"
	         onmouseover="this.style.cursor='hand'" onClick="openSelectCompany()">
          </td>

          <td align="right">是否生产：</td>
          <td >
            <EF:EFSelect blockId="inqu_status" ename="isproduced" row="0" etc='style="width:142PX"'>
              <EF:EFOption label="" value="" />
              <EF:EFOption label="否" value="0" />
              <EF:EFOption label="是" value="1" />
            </EF:EFSelect>
          </td>
        </tr>
      </table>
    </div>
  </div>

  <div id = "ef_region_result" title="记录集" style="overflow:scroll">
    <div id = "ef_grid_result" title="页面信息" style="overflow: hidden;height:300px;"></div>
  </div>

  <EF:EFRegion/>

  <!-- 演示efgrid_onAjaxSubmitSuccess回调前请将ajax属性设为true -->
  <!-- 演示将canPageAll属性设为true可以单页查询全部-->
  <EF:EFGrid blockId="result" autoDraw="false" ajax="false" canPageAll="true">
    <!-- 自定义列属性，可覆盖Service返回的元数据列信息 和 添加自定义列 -->
    <EF:EFColumn ename="productName" cname="产品名称" fix="yes" width="150" />
    <EF:EFSubGridColumn ename="companyCode" cname="公司代号" sort="true" width="150"
                        blockName="company" valueProperty="companyCode" serviceName="EEDM02" queryMethod="getCompany" />
    <EF:EFColumn ename="productPrice" cname="产品价格" sort="false" align="right" width="150" formatString="#,###,##0.00" />
    <EF:EFComboColumn ename="isproduced" cname="是否生产" sort="true" align="center" width="100">
      <EF:EFOption value="0" label="否" />
      <EF:EFOption value="1" label="是" />
    </EF:EFComboColumn>
    <EF:EFColumn ename="custom1" cname="自定义列1" displayType="textbutton" align="center" readonly="true" width="150" />
    <EF:EFColumn ename="custom2" cname="自定义列2" width="100" />
    <EF:EFColumn ename="custom2" cname="自定义列3" width="100" />
  </EF:EFGrid>


  <jsp:include flush="false" page="../../EF/Form/iplat.ef.tail.jsp" />
</form>

</body>
</html>
