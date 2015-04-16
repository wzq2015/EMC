<!DOCTYPE html>

<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>
<%  String actionUrl = request.getContextPath() + "/DispatchAction.do"; %>

<html>
<head>
  <meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
  <title>SubGrid列、Popup列</title>
	<script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
	<script type="text/javascript" src="./EE/DM/EEDM97.js"></script>
</head>

<body class="bodyBackground">

<form id="EEDM01" method="POST" action="<%=actionUrl%>" >
  <jsp:include flush="false" page="../../EF/Form/iplat.ef.head.jsp" />

  <div id="ef_region_inqu" title="查询条件" efRegionShowClear=true>
    <div style="overflow:hidden;width:100%">
      <table style="width:100%">
        <tr>
          <td align="right" nowrap style="width:6%">产品代号：</td>
          <td nowrap style="width:5%">
            <EF:EFInput blockId="inqu_status" ename="productCode" row="0" />
          </td>

          <td align="right" nowrap style="width:5%">产品名称：</td>
          <td nowrap style="width:5%">
            <EF:EFInput blockId="inqu_status" ename="productName" row="0" />
          </td>
          <td align="right" nowrap style="width:5%">动态选择类型：</td>
          <td nowrap style="width:20%">
            <EF:EFPopupInput blockId="inq"  row="0"  ename="iplatDynamicSelect"  readonly = "false" shouldShowDeleteButton = "true"
            			fieldId = "iplatDynamicSelect" valueProperty="FORM_ENAME" labelProperty="FORM_CNAME"
            			popupType = "DynamicGrid" visibleColumnNames = "FORM_ENAME,FORM_CNAME,FORM_TYPE"
            			visibleColumnDisplayNames = "页面英文名,页面中文名,页面类型"
            			backFillFieldIds="inqu_status-0-productCode,inqu_status-0-productName"
            			backFillColumnIds="FORM_ENAME,FORM_CNAME"
            			etc=" style='width:180px'"/>
          </td>
        </tr>
        <tr>
          <td align="right" nowrap >是否生产：</td>
          <td nowrap >
            <EF:EFSelect blockId="inqu_status" ename="isproduced" row="0" etc='style="width:138px;height:26px"'>
              <EF:EFOption label="" value="" />
              <EF:EFOption label="否" value="0" />
              <EF:EFOption label="是" value="1" />
            </EF:EFSelect>
          </td>
          <td align="right" nowrap >公司代号(名称)：</td>
          <td nowrap >
              <EF:EFPopupInput blockId="inqu_status" ename="companyCode" row="0" readonly = "false" shouldShowDeleteButton = "true"
              			contentDivId = "ef_Popup" labelProperty="companyName" />
          </td>
          <td align="right" nowrap >动态选择类型带查询：</td>
          <td nowrap >
            <EF:EFPopupInput blockId="in"  row="0"  ename="iplatSelectWithParam" readonly = "true" shouldShowDeleteButton = "true"
            			fieldId = "iplatSelectWithParam" valueProperty="FORM_ENAME" labelProperty="FORM_CNAME" 
            			popupType = "DynamicGrid" visibleColumnNames = "FORM_ENAME,FORM_CNAME,FORM_TYPE"  etc=" style='width:180px'; title='动态选择类型带查询'"/>
          </td>
          <td />
          
        </tr>
      </table>
    </div>
  </div>

  <div id = "ef_region_result" title="记录集" style="overflow:scroll">
    <div id = "ef_grid_result" title="页面信息" style="overflow: hidden;height:300px;"></div>
  </div>
<!-- <EF:EFSubGridColumn ename="companyCode" cname="公司代号(名称)" valueProperty="companyCode"  labelProperty="companyName"
                        sort="true" width="120" blockName="company" serviceName="EEDM97" queryMethod="getCompany" /> -->
  <EF:EFRegion/>
  <EF:EFGrid blockId="result" autoDraw="false" ajax="false" canPageAll="true">
  	<EF:EFColumn ename="productCode" cname="产品代号"  width="120" />
    <EF:EFColumn ename="productName" cname="产品名称"  width="120" />
    <EF:EFPopupColumn ename="companyCode" cname="公司代号(名称)(popup*)" labelProperty="companyName"
         contentDivId = "ef_Popup" sort="true" width="150" />
    <EF:EFColumn ename="productPrice" cname="产品价格" sort="false" align="right" width="120" formatString="#,###,##0.00" />
    <EF:EFComboColumn ename="isproduced" cname="是否生产" sort="true" align="center" width="80">
      <EF:EFOption value="0" label="否" />
      <EF:EFOption value="1" label="是" />
    </EF:EFComboColumn>
  	<EF:EFSubGridColumn ename="companyCode1" cname="公司代号(名称)(subgrid*)" valueProperty="companyCode"  labelProperty="companyName"
                        sort="true" width="150" blockName="company" serviceName="EEDM97" queryMethod="getCompany" />
    <EF:EFPopupColumn ename="companyCode1" cname="动态选择类型(popup*)"
         fieldId = "iplatDynamicSelect" valueProperty="FORM_ENAME" labelProperty="FORM_CNAME"
         popupType = "DynamicGrid" visibleColumnNames = "FORM_ENAME,FORM_CNAME,FORM_TYPE"
         visibleColumnDisplayNames = "页面英文名,页面中文名,页面类型"
         sort="true" width="150" backFillFieldIds="productCode,productName,FORM_CNAME" backFillColumnIds="FORM_ENAME,FORM_CNAME,FORM_CNAME"/>
 	 <EF:EFColumn ename="FORM_CNAME" cname="画面中文名"  width="120" visible='false'/>
  </EF:EFGrid>
  </form>
  <!-- Popup列(EFPopupColumn)的弹出内容部分，可任意自定制 （外层DIV  id=ef_Popup class=efwindow 为固定写法。）-->
  <DIV  id="ef_Popup" class="efwindow" title='详情' style="overflow:hidden;display:none">
	<table>
		<!--<tr>
			<td align='left' id='containerOuter'>&nbsp;详情&nbsp;</td>
			<td align='right' id='containerOuter'><IMG src='EF\Images\efcalendar_close.gif' onclick='efwindow.hide();'/></td>
		</tr>-->
		<tr>
		  <td colspan=2>
			  <table>
				<tr>
				  <td nowrap width="15%">
				      公司代号
				    </td>
				    <td nowrap width="20%">
				    <EF:EFInput blockId="inqu_block" ename="companyCode" row="0" />
				  </td>
				  <td nowrap width="20%">
					<input class="buttonRegular" type="button" value="查询" onclick='button_subgrid_query_onclick();' />
				  </td>
				</tr>
			  </table>
		  </td>
		</tr>
		<tr>
			<td colspan=2>
    			<div id = "ef_grid_company" title="页面信息" style="overflow: hidden;height:200px;width:650px"></div>
  				<EF:EFGrid blockId="company" autoDraw="true" ajax="true" queryMethod="queryCompany"  />
  			</td>
		</tr>
		<tr>
			<td align='right' colspan=2 >
				<input  class='buttonRegular'  type=button value='保存' onclick='eedm02_popup_save_onclick();' />
			</td>
		</tr>
	</table>
</DIV>

</body>
</html>
