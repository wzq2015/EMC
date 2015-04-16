<!DOCTYPE html>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld"%>
<%String actionUrl = request.getContextPath() + "/DispatchAction.do";%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title></title>
<script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
<script type="text/javascript" src="./EC/SA/ECSA05.js"></script>
</head>
<body class="bodyBackground">
	<form id="ECSA05" method="POST" action="<%=actionUrl%>">
		<jsp:include flush="false" page="../../EF/Form/iplat.ef.head.jsp"></jsp:include>
		<div id="ef_region_inqu" title="查询条件" efRegionShowClear="true">
			<div id="ef_div_inqu" style="overflow:hidden;width:100%">
				<table>
					<tr>
						<td width="15%">所属站点栏目</td>
						<td width="25%">
							<EF:EFInput blockId="inqu_status" ename="siteColumn" row="0"
										 etc="maxLength='16' size='16' readOnly" />
							<EF:EFInput type="hidden" blockId="inqu_status" ename="siteId" row="0" />
							<EF:EFInput type="hidden" blockId="inqu_status" ename="columnId" row="0" />
							  <img id="popupWindowId" 
							  onload="efico.setImageSrc(this,'efform.efPopupWindow')" src="./EF/Images/eftree_blank.png"
							  onClick="button_selectColumn_onclick();">
						</td>
						<td width="15%">新闻数目</td>
						<td width="20%">
							<EF:EFInput blockId="inqu_status" ename="newsCount" row="0"
										etc="maxLength='5' size='5' validateType='positive_integer'" />
						</td>
					</tr>
					<tr>
						<td width="20%">文件创建日期　开始日期</td>
						<td width="15%">
							<EF:EFInput blockId="inqu_status" ename="beginDate" row="0"
										popup="date" etc="maxLength='8' size='8' readOnly" />
						</td>
						<td width="15%">截止日期</td>
						<td width="15%">
							<EF:EFInput blockId="inqu_status" ename="endDate" row="0"
										popup="date" etc="maxLength='8' size='8' readOnly" />
						</td>
					</tr>							
				</table>
			</div>
		</div>
		<div id="selectColumn" class="efwindow">
			<div id="ef_region_sel_col" title="选择栏目" style="overflow:scroll; width:350px;height: 400px;">
				<table style="width:350px;height:350px;">
					<tr>
						<td>
							<div id="leftTreeDiv" style='overflow:auto; width:100%; height:100%;'>
								<EF:EFTree model="tableTreeModel" id="nTree" text="站点栏目树" configFunc="configTree">
								</EF:EFTree>
							</div>
						</td> 	
					</tr>
				</table>
			</div>
		</div>

		<div id="ef_region_result" title="记录集" style="overflow: scroll">
			<div id="ef_grid_result" title="页面信息" style="overflow: hidden; height: 400px;">
			</div>
		</div>
		<EF:EFRegion />
		<EF:EFGrid blockId="result" autoDraw="no" enable="false">
			<EF:EFColumn ename="seq" cname="序号" readonly="true" width="50" />
			<EF:EFColumn ename="siteName" cname="站点" readonly="true" width="100" />
			<EF:EFColumn ename="columnName" cname="栏目" readonly="true" width="100" />
			<EF:EFColumn ename="articleTitle" cname="标题" readonly="true" width="300" />
			<EF:EFColumn ename="vistiedNum" cname="访问量" readonly="true" width="100" />
 		</EF:EFGrid>
		<jsp:include flush="false" page="../../EF/Form/iplat.ef.tail.jsp"></jsp:include>
	</form>
</body>
</html>
