<!DOCTYPE html>
<%@ page contentType="text/html; charset=UTF-8"%>

<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>
<%   
	String actionUrl = request.getContextPath() + "/DispatchAction.do";
%>

<html>
<head>
	<meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
	<title>
	</title>
	<script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
	<script type="text/javascript" src="./ED/MD/EDMD41.js"></script>
</head>
<body class="bodyBackground">

<form id="EEDM41" method="POST" action="<%=actionUrl%>" >

<jsp:include flush="false" page="../../EF/Form/iplat.ef.head.jsp"></jsp:include>

<div id = "ef_region_inqu" title="查询条件" efRegionShowClear=true>
	<div style="overflow:hidden;width:100%">
		<table>
		  <tr>
		  	<td nowrap width="10%" align="right">模型类别</td>
		    <td nowrap width="15%">
		    	<EF:EFSelect blockId="inqu_status" ename="modelType" row="0" etc="style='width=120'">
			    	<EF:EFOption label="--全部--" value=""></EF:EFOption>
					<EF:EFCodeOption codeName="iplat.ed.md.domainModelType" conj="-" />
		    	</EF:EFSelect>
		    </td>
		    <td nowrap width="10%" align="right">模型英文名</td>
		    <td nowrap width="25%">
		    	<EF:EFInput blockId="inqu_status" ename="modelEname" row="0" />
		    </td>
		    <td nowrap width="10%" align="right">模型中文名</td>
		    <td nowrap width="25%">
		    	<EF:EFInput blockId="inqu_status" ename="modelCname" row="0" />
		    </td>
		  </tr>
		</table>
	</div>
</div>

<div id = "ef_region_result" title="记录集" style="overflow:scroll">
	<div id = "ef_grid_result" title="领域模型信息" style="overflow: hidden;height:300px;">
	</div>
</div>

<div id = "ef_region_gen" title="生成代码" efRegionShowClear=false>
	<div id = "ef_div_gen" style="overflow:hidden;width:100%">
		<table align=right>
		  <tr>
		    <td nowrap width=100>
				SqlMap<EF:EFInput blockId="gen_status" ename="codeType" row="0" value="sqlmap" type="checkbox" etc="checked" />
			</td>
			<td nowrap width=100>
				JavaBean<EF:EFInput blockId="gen_status" ename="codeType" row="0" value="bean" type="checkbox" etc="checked" />
			</td>
		  </tr>
		</table>
	</div>
</div>

<EF:EFRegion/>
<EF:EFGrid blockId="result" autoDraw="no" readonly="false" frontSort="true">
    <EF:EFColumn ename="id" width="180" visible="false"/>
    <EF:EFColumn ename="modelEname" width="120" nullable="false" />
    <EF:EFColumn ename="modelCname" width="180" nullable="false" />
    <EF:EFColumn ename="moduleEname1" width="80" nullable="false" />
    <EF:EFColumn ename="moduleEname2" width="80" />
    <EF:EFComboColumn ename="modelType" nullable="false">
    	<EF:EFOption label="请选择" value=""></EF:EFOption>
		<EF:EFCodeOption codeName="iplat.ed.md.domainModelType" conj="-" />
    </EF:EFComboColumn>
<%-- 	<EF:EFSubGridColumn ename="condModelId" cname="条件模型" valueProperty="condModelId"  labelProperty="condModelName"
                        width="120" blockName="result_condMode" serviceName="EDMD41" queryMethod="getCondModel" /> --%>
	<EF:EFPopupColumn ename="condModelId" cname="条件模型" labelProperty="condModelName"
         contentDivId = "condModelId_Popup" width="120" />
	<EF:EFPopupColumn ename="dataModelId" cname="数据模型" labelProperty="dataModelName"
         contentDivId = "dataModelId_Popup" width="120" />
    <%-- <EF:EFSubGridColumn  ename="condModelId" cname="条件模型"  blockName="result_condMode" width="90" valueProperty="id"  serviceName="EDMD41" queryMethod="getCondModel" /> --%>

    <%-- <EF:EFSubGridColumn  ename="dataModelId" cname="数据模型"  blockName="result_dataMode" width="90" valueProperty="id"  serviceName="EDMD41" queryMethod="getDataModel" /> --%>
<%-- 	<EF:EFSubGridColumn ename="dataModelId" cname="数据模型" valueProperty="dataModelId"  labelProperty="dataModelName"
                        width="120" blockName="result_dataMode" serviceName="EDMD41" queryMethod="getDataModel" /> --%>
    <EF:EFColumn ename="buttonName" cname="配置" readonly="true" align="center" width="40" />
    <EF:EFColumn ename="description" width="180"  />
	<EF:EFColumn ename="recCreator" enable="false" />
	<EF:EFColumn ename="recCreateTime" enable="false"  />
	<EF:EFColumn ename="recRevisor" enable="false" />
	<EF:EFColumn ename="recReviseTime" enable="false"  />
	<EF:EFColumn ename="archiveFlag"  enable="true" />
</EF:EFGrid>

<DIV id="condModelId_Popup" title="请选择" class="efwindow" style="overflow:hidden;display:none;">
	<table>
		<tr>
		  <td colspan=2>
			  <table>
				<tr>
				  <td nowrap width="15%">
				      模型英文名
				    </td>
				    <td nowrap width="20%">
				    <EF:EFInput blockId="cond_inqu" ename="modelEname" row="0" />
				  </td>
				  <td nowrap width="15%">
				      模型中文名
				    </td>
				    <td nowrap width="20%">
				    <EF:EFInput blockId="cond_inqu" ename="modelCname" row="0" />
				  </td>
				  <td nowrap width="20%">
					<input class="buttonClass" type="button" value="查询" onclick='condMode_query_onclick();' />
				  </td>
				</tr>
			  </table>
		  </td>
		</tr>
		<tr>
			<td colspan=2>
    			<div id = "ef_grid_result_condMode" title="页面信息" style="overflow: hidden;height:300px;width:450px"></div>
  				<EF:EFGrid blockId="result_condMode" autoDraw="true" ajax="true" enable="false" style="operationBar:false;toolBar:false" />
  			</td>
		</tr>
		<tr>
			<td align='right' colspan=2 >
				<input  class=buttonClass  type=button value='确定' onclick='condMode_popup_save_onclick();' />
			</td>
		</tr>
	</table>
</DIV>

<DIV id="dataModelId_Popup" class="efwindow" title="请选择" style="overflow:hidden;display:none;">
	<table>
		<tr>
		  <td colspan=2>
			  <table>
				<tr>
				  <td nowrap width="15%">
				      模型英文名
				    </td>
				    <td nowrap width="20%">
				    <EF:EFInput blockId="data_inqu" ename="modelEname" row="0" />
				  </td>
				  <td nowrap width="15%">
				      模型中文名
				    </td>
				    <td nowrap width="20%">
				    <EF:EFInput blockId="data_inqu" ename="modelCname" row="0" />
				  </td>
				  <td nowrap width="20%">
					<input class="buttonClass" type="button" value="查询" onclick='dataMode_query_onclick();' />
				  </td>
				</tr>
			  </table>
		  </td>
		</tr>
		<tr>
			<td colspan=2>
    			<div id = "ef_grid_result_dataMode" title="页面信息" style="overflow: hidden;height:300px;width:450px"></div>
  				<EF:EFGrid blockId="result_dataMode" autoDraw="true" ajax="true" enable="false" style="operationBar:false;toolBar:false" />
  			</td>
		</tr>
		<tr>
			<td align='right' colspan=2 >
				<input  class=buttonClass  type=button value='确定' onclick='dataMode_popup_save_onclick();' />
			</td>
		</tr>
	</table>
</DIV>
<input type="hidden" id="reqPage" name="reqPage" value="<%=request.getParameter("previewPage")%>">
<jsp:include flush="false" page="../../EF/Form/iplat.ef.tail.jsp"></jsp:include>
</form>

</body>
</html>
