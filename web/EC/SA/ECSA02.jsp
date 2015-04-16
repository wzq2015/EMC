<!DOCTYPE html>
<%@ page contentType="text/html; charset=UTF-8"%>

<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld"%>
<%
	String actionUrl = request.getContextPath() + "/DispatchAction.do";
%>

<html>
<head>
<meta http-equiv="Content-Type" content="text/html; 
	charset=UTF-8" />
<title></title>

<script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
<script type="text/javascript" src="./EC/SA/ECSA02.js"></script>

</head>
<body class="bodyBackground">

	<form id="ECSA02" method="POST" action="<%=actionUrl%>">

		<jsp:include flush="false" page="../../EF/Form/iplat.ef.head.jsp"></jsp:include>

		<div id="ef_region_inqu" title="查询条件" efRegionShowClear=true>
			<div id="ef_div_inqu" style="overflow: hidden; width: 100%">
				<table>
					<tr>
						<td width="10%">所属站点栏目</td>
						<td width="20%"><EF:EFInput blockId="inqu_status"
								ename="columnid" row="0" etc="maxLength='16' size='16' "
								type="hidden" /> <EF:EFInput blockId="inqu_status"
								ename="columnname" row="0"
								etc="maxLength='16' size='16' readOnly" /> <EF:EFInput
								blockId="inqu_status" ename="siteid" row="0"
								etc="maxLength='16' size='16' " type="hidden" /> <img
							id="popupWindowId"
							onload="efico.setImageSrc(this,'efform.efPopupWindow')"
							src="./EF/Images/eftree_blank.png"
							onClick="button_selectColumn_onclick();">
						</td>
						<td nowrap align="right" style="width: 10%">文章创建开始日期：</td>
						<td nowrap" align="left" style="width: 15%"><EF:EFInput
								blockId="inqu_status" ename="TimeStart" row="0" popup="date"
								etc="maxLength='8' size='8' readOnly" />
						</td>
						<td nowrap align="right" style="width: 10%">文章创建截止日期：</td>
						<td nowrap " align="left" style="width: 15%"><EF:EFInput
								blockId="inqu_status" ename="TimeEnd" row="0" popup="date"
								etc="maxLength='8' size='8' readOnly" />
						</td>
						<td nowrap align="right" style="width: 10%"><input
							type="checkbox" id="isPicture" onclick="openChart()" />图形化展示</td>
						<td nowrap align="center" style="width: 10%">
							<div id="tdCount" style="display: none;">
								前<input type="text" id="count" value="5" maxlength="3"
									style="width: 30px;" onchange="showCondition()" />条记录
							</div>
						</td>
					</tr>
				</table>
			</div>

		</div>
		<div id="selectColumn" class="efwindow">

			<div id="ef_region_sel_col" title="选择栏目"
				style="overflow: scroll">
				<table style="width: 350px; height: 300px;">
					<tr>
						<td>
						   <div id="leftTreeDiv"
											style='overflow: auto; width: 100%; height: 100%;'>
											<EF:EFTree model="tableTreeModel" id="nTree" text="站点栏目树"
												configFunc="configTree">
											</EF:EFTree>
						  </div>
						</td>
					</tr>
				</table>
			</div>
		</div>


		<div id="ef_region_result" title="记录集"
			style="ovFerflow: scroll; width: 450px; float: left;">
			<div id="ef_grid_result" title="页面信息"
				style="overflow: hidden; height: 300px; width: 450px;"></div>
		</div>
		<div id="ef_region_chart" title="图形区域"
			style="width: 400px; float: left; display: none;">
			<iframe id="chart" height="300" width="100%"
				style="overflow: hidden; float: left;"></iframe>
		</div>
		<EF:EFRegion />
		<EF:EFGrid blockId="result" readonly="ture" enable="false">
			<EF:EFColumn ename="seq" cname="序号" readonly="true" width="30"
				align="center" />
			<EF:EFColumn ename="columnid" cname="栏目ID" align="center"
				visible="false" />
			<EF:EFColumn ename="sitename" cname="站点" maxLength="50"
				align="center" width="150" />
			<EF:EFColumn ename="columnname" cname="栏目" maxLength="50"
				align="center" width="150" />
			<EF:EFColumn ename="num" cname="文章数目" enable="false"
				displayType="hyperlink" align="center" />
		</EF:EFGrid>

		<jsp:include flush="false" page="../../EF/Form/iplat.ef.tail.jsp"></jsp:include>
	</form>

</body>
</html>