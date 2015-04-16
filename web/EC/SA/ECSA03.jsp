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
	<script type="text/javascript" src="./EC/SA/ECSA03.js"></script>
	
</head>
<body class="bodyBackground">

<form id="ECSA03" method="POST" action="<%=actionUrl%>" >

<jsp:include flush="false" page="../../EF/Form/iplat.ef.head.jsp"></jsp:include>

<div id = "ef_region_inqu" title="查询条件" efRegionShowClear=true>
	<div style="overflow:hidden;width:100%">
						<table>
					  <tr>
						<td width="15%">所属站点栏目</td>
						<td width="25%">
							<EF:EFInput blockId="inqu_status" ename="columnid" row="0" etc="maxLength='16' size='16'" type="hidden"/>
							<EF:EFInput blockId="inqu_status" ename="columnname" row="0" etc="maxLength='16' size='16' readOnly"/>
							<EF:EFInput blockId="inqu_status" ename="siteid" row="0" etc="maxLength='16' size='16'" type="hidden"/>
							<img id="popupWindowId" 
							onload="efico.setImageSrc(this,'efform.efPopupWindow')" src="./EF/Images/eftree_blank.png"
							onClick="button_selectColumn_onclick();">
						</td>
						<td nowrap width="20%">文章创建日期：开始日期</td>
						<td nowrap width=15%">
						<EF:EFInput blockId="inqu_status" ename="TimeStart" row="0" popup="date" etc="maxLength='8' size='8' readOnly" />
						</td>
						<td nowrap width="15%">截止日期</td>
						<td nowrap width=25%">
						<EF:EFInput blockId="inqu_status" ename="TimeEnd" row="0" popup="date" etc="maxLength='8' size='8' readOnly" />
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

<div id = "ef_region_result" title="记录集" style="ovFerflow:scroll"> 
	<div id = "ef_grid_result" title="页面信息" style="overflow: hidden;height:300px;">
	</div> 
</div>     
  
<EF:EFRegion/>
<EF:EFGrid blockId="result"  readonly="ture" enable="false" >
<EF:EFColumn ename="seq" cname="序号" readonly="true" width="50" align="center"/>
<EF:EFColumn ename="sitename" cname="站点" align="center"/>	
<EF:EFColumn ename="columnname" cname="栏目" align="center"/>		
<EF:EFColumn ename="articleTitle" cname="文章标题" align="center" displayType="hyperlink"/>	
<EF:EFColumn ename="visitednum" cname="访问量" align="center" />
<EF:EFColumn ename="articleid" cname="文章ID" align="center" visible="false"/>
</EF:EFGrid>      

<jsp:include flush="false" page="../../EF/Form/iplat.ef.tail.jsp"></jsp:include>
</form>

</body>
</html>   
