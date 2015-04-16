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
	<script type="text/javascript" src="./EC/SA/ECSA07.js"></script>
	
</head>
<body class="bodyBackground">

<form id="ECSA07" method="POST" action="<%=actionUrl%>" >

<jsp:include flush="false" page="../../EF/Form/iplat.ef.head.jsp"></jsp:include>

<div id = "ef_region_inqu" title="查询条件" efRegionShowClear=true>
<div id="ef_div_inqu" style="overflow:hidden;width:100%"> 
                     <table>
                       <tr>
                        <td width="15%">文章标题</td>
                        <td width="25%">
							<EF:EFInput blockId="inqu_status" ename="articleTitle" row="0"  etc="maxLength='16' size='16'"  />
						</td>
                        <td width="15%">创建者</td>
                        <td width="25%">
							<EF:EFInput blockId="inqu_status" ename="creator" row="0"  etc="maxLength='40' size='40'"  />
						</td>
					   <tr>
						<td width="15%">所属站点栏目</td>
						<td width="25%">
							<EF:EFInput blockId="inqu_status" ename="columnid" row="0" etc="maxLength='16' size='16' " type="hidden"/>
							<EF:EFInput blockId="inqu_status" ename="columnName" row="0" etc="maxLength='16' size='16' readOnly"/>
							<EF:EFInput blockId="inqu_status" ename="siteid" row="0" etc="maxLength='16' size='16' " type="hidden"/>
							<img id="popupWindowId" 
							onload="efico.setImageSrc(this,'efform.efPopupWindow')" src="./EF/Images/eftree_blank.png"
							onClick="button_selectColumn_onclick();">
						</td>
						    <td nowrap width="15%">
						      文章创建日期：开始日期
						    </td>
						    <td nowrap width=25%">
						    <EF:EFInput blockId="inqu_status" ename="TimeStart" row="0" popup="date" etc="maxLength='8' size='8' readOnly" />
						    </td>
						     <td nowrap width="15%">
						     截止日期
						    </td>
						    <td nowrap width=25%">
						    <EF:EFInput blockId="inqu_status" ename="TimeEnd" row="0" popup="date" etc="maxLength='8' size='8' readOnly" />
						    </td>
						  </tr>
						</table>
					</div>
					
</div>  
<div id="selectColumn" class="efwindow">
			<div id="ef_region_sel_col" title="选择栏目" style="overflow:scroll; width:350px;height: 400px;">
				<table  style="width:350px;height:300px;">
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
<EF:EFGrid blockId="result"  ajax="true" readonly="true" enable="false" >
<EF:EFColumn ename="articleid" cname="文章标识" readonly="true" align="center" displayType="hyperlink"/>	
<EF:EFColumn ename="columnid" cname="栏目标识" readonly="true" align="center" visible="false"/>	
<EF:EFColumn ename="articleTitle" cname="文章标题" enable="false"  readonly="true" align="center"  width="160"/>
<EF:EFColumn ename="siteName" cname="站点" maxLength="50"  align="center" />	
<EF:EFColumn ename="columnName" cname="栏目" maxLength="50" align="center" />
<EF:EFColumn ename="creator" cname="创建者" readonly="true" align="center" width="50"/>	
<EF:EFColumn ename="createTime" cname="创建日期" readonly="true" align="center" width="160"/>	
<EF:EFColumn ename="visitednum" cname="访问量" readonly="true" align="center" width="60" enable="false" displayType="hyperlink"/>	

</EF:EFGrid>          

<jsp:include flush="false" page="../../EF/Form/iplat.ef.tail.jsp"></jsp:include>
</form>

</body>
</html>   
