<!DOCTYPE html>
<%@ page contentType="text/html; charset=UTF-8"%>

<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>
<%
	String actionUrl = request.getContextPath() + "/DispatchAction.do";
	String nodeId = request.getParameter("nodeId");
	String synType = request.getParameter("inqu_status-0-synType").toString();
%>

<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; 
	charset=UTF-8" />
	<title>
	</title>
	
	<script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
	<script type="text/javascript" src="./EC/CM/ECCM06.js"></script>
	
</head>
<body class="bodyBackground">

<form id="ECCM06" method="POST" action="<%=actionUrl%>" >
	
<jsp:include flush="false" page="../../EF/Form/iplat.ef.head.jsp"></jsp:include>
	
	<div id = "ef_region_inqu" title="查询条件" efRegionShowClear=true>
    	<EF:EFInput blockId="inqu_status" ename="columnId" row="0" type="hidden" />
    	<EF:EFInput blockId="inqu_status" ename="synType" row="0" type="hidden" />
		<input type="hidden" id="nodeId" value="<%=nodeId %>"/>
		
		<div style="overflow:hidden;width:100%">
			<table>
				<tr>
					<td nowrap width="10%">
						栏目名称:
					</td> 
					<td nowrap width=15%">
						 <EF:EFInput blockId="inqu_status" ename="columnName" row="0" />
					</td>
					<td nowrap width="10%">
						同步状态:
					</td>
					<td nowrap width=15%">
						<EF:EFSelect blockId="inqu_status" ename="allowedStatus" row="0" etc="style='width:150px'">
							<EF:EFOption value="" label="" />
							<EF:EFOption value="10" label="新稿" />
							<EF:EFOption value="30" label="审核中" />
							<EF:EFOption value="40" label="待发布" />
							<EF:EFOption value="50" label="已发布" />
						</EF:EFSelect> 
					</td>
					<td nowrap width="10%">
						同步模式:
					</td>
					<td nowrap width=15%">
						<EF:EFSelect blockId="inqu_status" ename="synMode" row="0" etc="style='width:150px'">
							<EF:EFOption value="" label="" />
							<EF:EFOption value="10" label="复制" />
							<EF:EFOption value="30" label="引用" />
						</EF:EFSelect> 
					</td>
				</tr>
			</table>
		</div>
	</div>  
	<div id = "ef_region_result" title="记录集" style="overflow:scroll" efRegionShowClear=false> 
		<div id = "ef_grid_result" title="栏目同步信息" style="overflow: hidden;">
		</div>
	</div>
	
<div id="newinfo" class="efwindow">
 	<table width="410">
 	<tr>
		<td>
			<div id = "ef_region_newinfo" title="栏目<%=synType.equals("0")?"分发":"汇总"%>详细" style="overflow:scroll">
		 		<table>
					<tr>
						<td nowrap>
							<b>有效时间</b>
						</td>
						<td nowrap colspan="4">
							<EF:EFInput blockId="insert" ename="synId" row="0" type="hidden"></EF:EFInput>
							<input type="hidden" id="opstatus"/> <!-- 操作按钮标记（点击 新增0 或 修改1） -->
						</td>
					</tr>
					
					<tr>
			 			<td nowrap>	
			 				<%=synType.equals("0")?"分发":"汇总"%>开始时间:
			 			</td>
			 			<td nowrap> 
			 				<EF:EFInput blockId="insert" ename="validStartTime" row="0" popup="date" etc="maxLength='8' size='8'" etc="style='width:100px'"/>  	
			 			</td>
			 			<td nowrap colspan="3"> 
			 			</td>
			 			
					</tr>
					
					<tr>
			 			<td nowrap>	
			 				<%=synType.equals("0")?"分发":"汇总"%>结束时间:
			 			</td>
			 			<td nowrap> 
			 				<EF:EFInput blockId="insert" ename="validEndTime" row="0" popup="date" etc="maxLength='8' size='8'" etc="style='width:100px'"/>  	
			 			</td>
			 			<td nowrap colspan="3"> 
			 			</td>
			 			
					</tr>
					
					<tr>
						<td nowrap>
							<b><%=synType.equals("0")?"分发":"汇总"%>条件</b>
						</td>
						<td nowrap colspan="4">
							
						</td>
					</tr>
					<tr>
						<td nowrap>
			 				文档创建时间界于:
						 </td>
			 			<td nowrap> 
			 				<EF:EFInput blockId="insert" ename="articleCreateStartTime" row="0" popup="date" etc="maxLength='8' size='8'" etc="style='width:100px'"/>  	
			 			</td>
			 			<td nowrap> 
			 				和
			 			</td>
			 			<td>
			 				<EF:EFInput blockId="insert" ename="articleCreateEndTime" row="0" popup="date" etc="maxLength='8' size='8'" etc="style='width:100px'"/>  	
			 			</td>
			 			<td>
			 				&nbsp;&nbsp;
			 			</td>
					</tr>
					<tr>
						<td nowrap>
			 				筛选条件(SQL语句):
						 </td>
						 <td colspan="4">
						 	<EF:EFInput blockId="insert" ename="conditionSql" row="0" etc="style='width:239px'"></EF:EFInput>
						 </td>		
					</tr>
					<tr>
						<td nowrap>
			 				允许<%=synType.equals("0")?"分发":"汇总"%>的状态:
						 </td>
						 <td nowrap colspan="4">
			 				<input type="radio" name="insert-0-allowedStatus" value="10" checked>新稿
			 				<input type="radio" name="insert-0-allowedStatus" value="30">审核中
			 				<input type="radio" name="insert-0-allowedStatus" value="40">待发布
			 				<input type="radio" name="insert-0-allowedStatus" value="50">已发布
						 </td>
					</tr>
					<tr>
						<td nowrap>
			 				<%=synType.equals("0")?"分发":"汇总"%>模式:
						 </td>
						 <td nowrap colspan="4">
			 				<input type="radio" name="insert-0-synMode" value="10" checked>复制
			 				<input type="radio" name="insert-0-synMode" value="30">引用
			 				<!-- <input type="radio" name="insert-0-synMode" value="40">镜像 -->
						 </td>
					</tr>
					<tr>
						<td nowrap>
			 				选择栏目:
						 </td>
						 <td nowrap colspan="4">
			 				<button type="button" id="selectcolumn" onclick="selectColumn()">选择</button>	
			 				<EF:EFInput blockId="" ename="selectColumnId" row="" type="hidden"></EF:EFInput>		 				
						 </td>
					</tr>
					<tr>
						 <td nowrap id="relationTitle" style="display:none">
			 				已选栏目:
						 </td>
						<td id="relation" colspan="4">
						</td>
					</tr>
					<tr>
						 <td colspan="5" align = "left" style="color:silver;">
						 	<hr style="height:1px;border:none;border-top:1px solid;">
						 	筛选条件(SQL语句)填写示例：</br>
						 	示例1:author='admin'</br>
			 				示例2:author='admin' and article_title like '科技频道%'
						 </td>
					</tr>
				</table>
			</div>		
		</td> 	
 	</tr>
 	</table>	
 </div>
	
	
	<EF:EFRegion/>

<EF:EFGrid blockId="result" ajax="true" autoDraw="false" queryMethod="query" style="operationBar:false" >

<EF:EFColumn ename="synId" cname="同步标识" readonly="true" visible="false"/>
<EF:EFColumn ename="columnId" cname="所属栏目标识" readonly="true" visible="false"/>
<EF:EFColumn ename="columnName" cname="栏目名称" readonly="true"/>

<EF:EFComboColumn ename="synType" cname="同步类别" readonly="true">
<EF:EFOption value="0" label="分发" />
<EF:EFOption value="1" label="汇总" />
</EF:EFComboColumn>

<EF:EFComboColumn ename="allowedStatus" cname="允许同步状态" readonly="true">
<EF:EFOption value="10" label="新稿" />
<EF:EFOption value="30" label="审核中" />
<EF:EFOption value="40" label="待发布" />
<EF:EFOption value="50" label="已发布" />
</EF:EFComboColumn>

<EF:EFComboColumn ename="synMode" cname="同步模式" readonly="true">
<EF:EFOption value="10" label="复制" />
<EF:EFOption value="30" label="引用" />
</EF:EFComboColumn>

<EF:EFColumn ename="conditionSql" cname="筛选条件" readonly="true"/>
<EF:EFColumn ename="articleCreateStartTime" cname="文章创建开始时间" readonly="true" editType="date" dateFormatString="yyyy-MM-dd hh:mm:ss"/>
<EF:EFColumn ename="articleCreateEndTime" cname="文章创建截止时间" readonly="true" editType="date" dateFormatString="yyyy-MM-dd hh:mm:ss"/>
<EF:EFColumn ename="validStartTime" cname="有效开始时间" readonly="true" editType="date" dateFormatString="yyyy-MM-dd hh:mm:ss"/>
<EF:EFColumn ename="validEndTime" cname="有效截至时间" readonly="true" editType="date" dateFormatString="yyyy-MM-dd hh:mm:ss"/>




</EF:EFGrid> 
<jsp:include flush="false" page="../../EF/Form/iplat.ef.tail.jsp"></jsp:include>
</form>
</body>
</html>  
