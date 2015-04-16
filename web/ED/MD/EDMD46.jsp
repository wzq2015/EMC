<!DOCTYPE html>
<%@ page contentType="text/html; charset=UTF-8"%>

<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld"%>
<%
	String actionUrl = request.getContextPath() + "/DispatchAction.do";
%>

<html>
<head>
<meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
<title></title>

<script type="text/javascript" src="./EF/jQuery/jquery.js"></script>
<script type="text/javascript" src="./EF/Common/EFSubWindow.js"></script>
<script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
<script type="text/javascript" src="./ED/MD/EDMD46.js"></script>

</head>
<body class="bodyBackground">

	<form id="EEDM46" method="POST" action="<%=actionUrl%>">

		<jsp:include flush="false" page="../../EF/Form/iplat.ef.head.jsp"></jsp:include>

		<div id="ef_region_inqu" title="查询条件" efRegionShowClear=true>
			<div id="ef_div_inqu" style="width: 100%" id="inline1">
				<table>
					<tr>
						<td>功能模型</td>
						<td><EF:EFFlexBox blockId="inqu_status" ename="funcId"
								row="0" displayValue="name" hiddenValue="id"
								initialValue="--请选择--" initialKey="-1" dataBlockId="funcModelBlock"
								displayAll="true" onSelect="model_select()" /></td>
								
					</tr>
				</table>
			</div>
		</div>

		<div id="ef_region_condition" title="条件信息" style="overflow: scroll">
			<div id="ef_grid_condition" title="条件信息"
				style="overflow: hidden; height: 200px;"></div>
		</div>

		<div id="ef_region_data" title="数据信息" style="overflow: scroll">
			<div id="ef_grid_data" title="数据信息"
				style="overflow: hidden; height: 300px;"></div>
		</div>

		<div id="ef_region_diff" title="记录集" style="overflow: scroll;display:none;"
			efRegionShowClear=false>
			<div id="ef_grid_diff" title="差异比较"
				style="overflow: hidden; height: 480px;"></div>
		</div>

		<EF:EFRegion />
		<EF:EFGrid blockId="condition" autoDraw="no" style="operationBar:false">
			<EF:EFColumn ename="fieldEname" readonly="true" width="140" fix="yes"/>
			<EF:EFColumn ename="fieldCname" />
			<EF:EFColumn ename="seqId" width="40" />
			<EF:EFColumn ename="groupNo" width="40" />
			<EF:EFColumn ename="rowNo" width="40" />
			<EF:EFColumn ename="columnNo" width="40" />
			<EF:EFColumn ename="colSpan" width="40" />
			<EF:EFMultiSelectColumn ename="validateRules" cname="检核规则" width="150"
				blockName="validatesBlock" labelProperty="description"
				valueProperty="id" formatString="#valueString#-#labelString#">
			</EF:EFMultiSelectColumn>
			<EF:EFColumn ename="validateGroup" width="60" />
			<EF:EFComboColumn ename="nullable" width="80">
				<EF:EFOption label="是" value="1"></EF:EFOption>
				<EF:EFOption label="否" value="0"></EF:EFOption>
			</EF:EFComboColumn>
			<EF:EFComboColumn ename="compId" cname="控件类型" width="150"
				blockName="controlsBlock" labelProperty="cnName"
				valueProperty="id" formatString="#valueString#-#labelString#">
				<EF:EFOption value="0" label="请选择" />
			</EF:EFComboColumn>
			<EF:EFColumn ename="propName1" enable="false" />
			<EF:EFColumn ename="propEnum1" enable="false" />
			<EF:EFColumn ename="propValue1" />
			<EF:EFColumn ename="propName2" enable="false" />
			<EF:EFColumn ename="propEnum2" enable="false" />
			<EF:EFColumn ename="propValue2" />
			<EF:EFColumn ename="propName3" enable="false" />
			<EF:EFColumn ename="propEnum3" enable="false" />
			<EF:EFColumn ename="propValue3" />
			<EF:EFColumn ename="propName4" enable="false" />
			<EF:EFColumn ename="propEnum4" enable="false" />
			<EF:EFColumn ename="propValue4" />
			<EF:EFColumn ename="propName5" enable="false" />
			<EF:EFColumn ename="propEnum5" enable="false" />
			<EF:EFColumn ename="propValue5" />
			<EF:EFColumn ename="propName6" enable="false" />
			<EF:EFColumn ename="propEnum6" enable="false" />
			<EF:EFColumn ename="propValue6" />
			<EF:EFColumn ename="propName7" enable="false" />
			<EF:EFColumn ename="propEnum7" enable="false" />
			<EF:EFColumn ename="propValue7" />
			<EF:EFColumn ename="propName8" enable="false" />
			<EF:EFColumn ename="propEnum8" enable="false" />
			<EF:EFColumn ename="propValue8" />
			<EF:EFColumn ename="propName9" enable="false" />
			<EF:EFColumn ename="propEnum9" enable="false" />
			<EF:EFColumn ename="propValue9" />
			<EF:EFColumn ename="propName10" enable="false" />
			<EF:EFColumn ename="propEnum10" enable="false" />
			<EF:EFColumn ename="propValue10" />
			<EF:EFColumn ename="propName11" enable="false" />
			<EF:EFColumn ename="propEnum11" enable="false" />
			<EF:EFColumn ename="propValue11" />
			<EF:EFColumn ename="propName12" enable="false" />
			<EF:EFColumn ename="propEnum12" enable="false" />
			<EF:EFColumn ename="propValue12" />
			<EF:EFColumn ename="propName13" enable="false" />
			<EF:EFColumn ename="propEnum13" enable="false" />
			<EF:EFColumn ename="propValue13" />
			<EF:EFColumn ename="propName14" enable="false" />
			<EF:EFColumn ename="propEnum14" enable="false" />
			<EF:EFColumn ename="propValue14" />
			<EF:EFColumn ename="propName15" enable="false" />
			<EF:EFColumn ename="propEnum15" enable="false" />
			<EF:EFColumn ename="propValue15" />
			<EF:EFColumn ename="propName16" enable="false" />
			<EF:EFColumn ename="propEnum16" enable="false" />
			<EF:EFColumn ename="propValue16" />
			<EF:EFColumn ename="propName17" enable="false" />
			<EF:EFColumn ename="propEnum17" enable="false" />
			<EF:EFColumn ename="propValue17" />
			<EF:EFColumn ename="propName18" enable="false" />
			<EF:EFColumn ename="propEnum18" enable="false" />
			<EF:EFColumn ename="propValue18" />
			<EF:EFColumn ename="propName19" enable="false" />
			<EF:EFColumn ename="propEnum19" enable="false" />
			<EF:EFColumn ename="propValue19" />
			<EF:EFColumn ename="propName20" enable="false" />
			<EF:EFColumn ename="propEnum20" enable="false" />
			<EF:EFColumn ename="propValue20" />
			<EF:EFColumn ename="id" visible="false" />
			<EF:EFColumn ename="funcId" visible="false" />
			<EF:EFColumn ename="detailType" visible="false" />
			<EF:EFColumn ename="recCreator" visible="false" />
			<EF:EFColumn ename="recCreateTime" visible="false" />
			<EF:EFColumn ename="recRevisor" visible="false" />
			<EF:EFColumn ename="recReviseTime" visible="false" />
			<EF:EFColumn ename="archiveFlag" visible="false" />
			<EF:EFColumn ename="modelItemId" visible="false" />
		</EF:EFGrid>
		<EF:EFGrid blockId="data" autoDraw="no" style="operationBar:false">
			<EF:EFColumn ename="fieldEname" readonly="true" width="140" fix="yes"/>
			<EF:EFColumn ename="fieldCname" />
			<EF:EFColumn ename="seqId" width="40" />
			<EF:EFColumn ename="groupNo" width="40" />
			<EF:EFColumn ename="rowNo" width="40" />
			<EF:EFColumn ename="columnNo" width="40" />
			<EF:EFColumn ename="colSpan" width="40" />
			<EF:EFMultiSelectColumn ename="validateRules" cname="检核规则" width="150"
				blockName="validatesBlock" labelProperty="description"
				valueProperty="id" formatString="#valueString#-#labelString#">
			</EF:EFMultiSelectColumn>
			<EF:EFColumn ename="validateGroup" width="60" />
			<EF:EFComboColumn ename="nullable" width="80">
				<EF:EFOption label="是" value="1"></EF:EFOption>
				<EF:EFOption label="否" value="0"></EF:EFOption>
			</EF:EFComboColumn>
			<EF:EFComboColumn ename="compId" cname="控件类型" width="150"
				blockName="controlsBlock" labelProperty="cnName"
				valueProperty="id" formatString="#valueString#-#labelString#">
				<EF:EFOption value="0" label="请选择" />
			</EF:EFComboColumn>
			<EF:EFColumn ename="propName1" enable="false" />
			<EF:EFColumn ename="propEnum1" enable="false" />
			<EF:EFColumn ename="propValue1" />
			<EF:EFColumn ename="propName2" enable="false" />
			<EF:EFColumn ename="propEnum2" enable="false" />
			<EF:EFColumn ename="propValue2" />
			<EF:EFColumn ename="propName3" enable="false" />
			<EF:EFColumn ename="propEnum3" enable="false" />
			<EF:EFColumn ename="propValue3" />
			<EF:EFColumn ename="propName4" enable="false" />
			<EF:EFColumn ename="propEnum4" enable="false" />
			<EF:EFColumn ename="propValue4" />
			<EF:EFColumn ename="propName5" enable="false" />
			<EF:EFColumn ename="propEnum5" enable="false" />
			<EF:EFColumn ename="propValue5" />
			<EF:EFColumn ename="propName6" enable="false" />
			<EF:EFColumn ename="propEnum6" enable="false" />
			<EF:EFColumn ename="propValue6" />
			<EF:EFColumn ename="propName7" enable="false" />
			<EF:EFColumn ename="propEnum7" enable="false" />
			<EF:EFColumn ename="propValue7" />
			<EF:EFColumn ename="propName8" enable="false" />
			<EF:EFColumn ename="propEnum8" enable="false" />
			<EF:EFColumn ename="propValue8" />
			<EF:EFColumn ename="propName9" enable="false" />
			<EF:EFColumn ename="propEnum9" enable="false" />
			<EF:EFColumn ename="propValue9" />
			<EF:EFColumn ename="propName10" enable="false" />
			<EF:EFColumn ename="propEnum10" enable="false" />
			<EF:EFColumn ename="propValue10" />
			<EF:EFColumn ename="propName11" enable="false" />
			<EF:EFColumn ename="propEnum11" enable="false" />
			<EF:EFColumn ename="propValue11" />
			<EF:EFColumn ename="propName12" enable="false" />
			<EF:EFColumn ename="propEnum12" enable="false" />
			<EF:EFColumn ename="propValue12" />
			<EF:EFColumn ename="propName13" enable="false" />
			<EF:EFColumn ename="propEnum13" enable="false" />
			<EF:EFColumn ename="propValue13" />
			<EF:EFColumn ename="propName14" enable="false" />
			<EF:EFColumn ename="propEnum14" enable="false" />
			<EF:EFColumn ename="propValue14" />
			<EF:EFColumn ename="propName15" enable="false" />
			<EF:EFColumn ename="propEnum15" enable="false" />
			<EF:EFColumn ename="propValue15" />
			<EF:EFColumn ename="propName16" enable="false" />
			<EF:EFColumn ename="propEnum16" enable="false" />
			<EF:EFColumn ename="propValue16" />
			<EF:EFColumn ename="propName17" enable="false" />
			<EF:EFColumn ename="propEnum17" enable="false" />
			<EF:EFColumn ename="propValue17" />
			<EF:EFColumn ename="propName18" enable="false" />
			<EF:EFColumn ename="propEnum18" enable="false" />
			<EF:EFColumn ename="propValue18" />
			<EF:EFColumn ename="propName19" enable="false" />
			<EF:EFColumn ename="propEnum19" enable="false" />
			<EF:EFColumn ename="propValue19" />
			<EF:EFColumn ename="propName20" enable="false" />
			<EF:EFColumn ename="propEnum20" enable="false" />
			<EF:EFColumn ename="propValue20" />
			<EF:EFColumn ename="id" visible="false" />
			<EF:EFColumn ename="funcId" visible="false" />
			<EF:EFColumn ename="detailType" visible="false" />
			<EF:EFColumn ename="recCreator" visible="false" />
			<EF:EFColumn ename="recCreateTime" visible="false" />
			<EF:EFColumn ename="recRevisor" visible="false" />
			<EF:EFColumn ename="recReviseTime" visible="false" />
			<EF:EFColumn ename="archiveFlag" visible="false" />
			<EF:EFColumn ename="modelItemId" visible="false" />
		</EF:EFGrid>
		<EF:EFGrid blockId="diff" autoDraw="yes"
			style="navigationBar:false;operationBar:false" enable="false">
			<EF:EFColumn ename="fieldId" width="50" />
			<EF:EFColumn ename="seqId" width="50" />
			<EF:EFColumn ename="fieldEname" width="200" /> 
			<EF:EFComboColumn ename="status" valueProperty="value"
				align="center" width="100">
				<EF:EFOption value="1" label="新增" />
				<EF:EFOption value="0" label="删除" />
			</EF:EFComboColumn>
			<EF:EFComboColumn ename="type" valueProperty="value"
				align="center" width="100">
				<EF:EFOption value="0" label="条件模型" />
				<EF:EFOption value="1" label="数据模型" />
			</EF:EFComboColumn>
		</EF:EFGrid>

		<jsp:include flush="false" page="../../EF/Form/iplat.ef.tail.jsp"></jsp:include>
	</form>
</body>
</html>
