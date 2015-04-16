<!DOCTYPE html>
<!-- Generate time : 2012-08-16 13:25:34 -->
<%@page contentType="text/html; charset=UTF-8"%>
<%@taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>
<%
	String actionUrl = request.getContextPath() + "/DispatchAction.do";
%>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
	<title></title>
	<script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
	<script type="text/javascript" src="./EL/EL00.js"></script>
</head>
<body class="bodyBackground">
<form id="EL00" method="POST" action="<%=actionUrl%>" >
<jsp:include flush="false" page="../EF/Form/iplat.ef.head.jsp"></jsp:include>


<div id = "ef_region_inqu" title="查询条件" efRegionShowClear="true">
	<div style="overflow:hidden;width:100%">
		<table width="100%">
			<tr>
				<td nowrap align="right" width="10%">日志串接序列号</td>
				<td nowrap colspan="1" width="15%">
					<EF:EFInput blockId="inqu_status" ename="seqId" row="0" type="text" style="width:100%" />
				</td>
				<td nowrap align="right" width="10%">日志序号</td>
				<td nowrap colspan="1" width="5%">
					<EF:EFInput blockId="inqu_status" ename="id" row="0" type="text" style="width:50px" />
				</td>
				<td nowrap align="right" width="10%">日志父序号</td>
				<td nowrap colspan="1" width="5%">
					<EF:EFInput blockId="inqu_status" ename="parent" row="0" type="text" style="width:50px" />
				</td>
				<td colspan ="2" width="45%">
				</td>				
			</tr>
			<tr>
			 <td align="right" width="10%">
			 开始日期
			 </td>
			 <td align="left" width="15%">
			 <EF:EFInput  blockId="inqu_status" ename="startDate" row="0" type="text" style="width:85%" popup="date" isRequired="true" etc="nullable='false'"/>
			 </td>
			 <td align="right" width="10%">
			 结束日期
			 </td>
			 <td align="left" width="15%">
			 <EF:EFInput  blockId="inqu_status" ename="endDate" row="0" type="text" style="width:85%" popup="date" />
			 </td>
			</tr>
			<tr>
				 <td align="right" width="10%">日志类型编号 </td>
				 <td nowrap colspan="1" width="5%">
					<EF:EFInput blockId="inqu_status" ename="logId" row="0" popup="tree"  modelName="EL0001"
          			configFunc="myConfigTree" label="tree"  text="日志类型"  cname="日志类型"  isRefresh="true"/>
				</td>
				 <td align="right" width="10%">日志类型英文名 </td>
				 <td nowrap colspan="1" width="5%">
					<EF:EFInput blockId="inqu_status" ename="logName" row="0" type="text" style="width:100px" />
				</td>			
			</tr>
			<tr>
				 <td align="right" width="10%">执行状态 </td>
				 <td align="left" nowrap width="5%">
		      		<EF:EFSelect blockId="inqu_status" ename="status" row="0">
		      		<EF:EFOption label="--请选择--" value =""></EF:EFOption>
		       		<EF:EFOption label="成功" value="I"></EF:EFOption>
		       		<EF:EFOption label="失败" value="E"></EF:EFOption>
		    		</EF:EFSelect>
		    	</td>
		    	
		    	<td align="right" width="10%">日志执行类型 </td>
				 <td align="left" nowrap width="5%">
		      	    <EF:EFSelect blockId="inqu_status" ename="position" row="0">
		      	    <EF:EFOption label="--请选择--" value =""></EF:EFOption>
		       		<EF:EFOption label="起始" value="S"></EF:EFOption>
		       		<EF:EFOption label="结束" value="E"></EF:EFOption>
		       		<EF:EFOption label="单条" value="L"></EF:EFOption>
		    		</EF:EFSelect>
		    	</td>
			</tr>
			<tr>
				 <td align="right" width="10%">耗时 &gt;</td>
				 <td nowrap colspan="1" width="15%">
					<EF:EFInput blockId="inqu_status" ename="minCost" row="0" type="text" style="width:80px" />ms
				</td>
				<td align="right" width="10%">耗时&lt;</td>
				 <td nowrap colspan="1" width="15%">
					<EF:EFInput blockId="inqu_status" ename="maxCost" row="0" type="text" style="width:80px" />ms
				</td>
				<td width="50%" colspan = "2">
				</td>
			</tr>
		</table>
	</div>
</div>


<div id = "ef_region_result" title="记录集" style="overflow:scroll"> 
	<div id = "ef_grid_result" title="记录信息" style="overflow: hidden;height:300px;">
	</div>
</div>

<div style='display:none;'>
	<div id = "ef_region_detail" title="明细区" efRegionShowClear="false"  >
		<div style="overflow:hidden;width:100%;padding:10px;background:#fff;">
			<table width="100%">
				<tr>
					<td nowrap align="right" width="10%">日志串接序列号</td>
					<td nowrap colspan="1" width="15%">
						<EF:EFInput blockId="detail" ename="seqId" row="0" type="text" style="width:100%" etc="readOnly" />
					</td>
					<td nowrap align="right" width="10%">日志序号</td>
					<td nowrap colspan="1" width="5%">
						<EF:EFInput blockId="detail" ename="id" row="0" type="text" style="width:50px" etc="readOnly"/>
					</td>
					<td nowrap align="right" width="10%">日志父序号</td>
					<td nowrap colspan="1" width="5%">
						<EF:EFInput blockId="detail" ename="parent" row="0" type="text" style="width:50px" etc="readOnly"/>
					</td>
					<td nowrap align="right" width="10%">日志类型</td>
					<td nowrap width="5%">
			      		<EF:EFSelect blockId="detail" ename="position" row="0">
			       		<EF:EFOption label="起始" value="S"></EF:EFOption>
			       		<EF:EFOption label="结束" value="E"></EF:EFOption>
			       		<EF:EFOption label="单条" value="L"></EF:EFOption>
			    		</EF:EFSelect>
			    	</td>

					
					<td nowrap align="right" width="40%">
					</td>
				</tr>
				<tr>
					<td nowrap align="right" width="10%">日志类型英文名</td>
					<td nowrap colspan="1" width="15%">
							<EF:EFInput blockId="detail" ename="logName" row="0" type="text" style="width:100%"  etc="readOnly"/>
					</td>
					<td nowrap align="right" width="10%">日志类型编号</td>
					<td nowrap colspan="1" width="5%">
						<EF:EFInput blockId="detail" ename="logId" row="0" type="text" style="width:50px" etc="readOnly"/>
					</td>
					<td nowrap  colspan="8" align="right" width="50%">
					</td>
			   </tr>
			</table>
			<hr>
			<table width = "100%">
				<tr>
					<td nowrap align="right" width="10%">叶子节点</td>
						<td nowrap width="5%">
			      		<EF:EFSelect blockId="detail" ename="leaf" row="0">
			       		<EF:EFOption label="否" value="F"></EF:EFOption>
			       		<EF:EFOption label="是" value="T"></EF:EFOption>
			       		<EF:EFOption label="未知" value="U"></EF:EFOption>
			    		</EF:EFSelect>
			    	</td>
					<td nowrap align="right" width="10%">调用层次</td>
					<td nowrap colspan="1" width="5%">
						<EF:EFInput blockId="detail" ename="depth" row="0" type="text" style="width:50px" etc="readOnly"/>
					</td>
					</td>
					<td nowrap align="right" width="10%">执行状态</td>
					<td nowrap width="5%">
			      		<EF:EFSelect blockId="detail" ename="status" row="0">
			       		<EF:EFOption label="成功" value="I"></EF:EFOption>
			       		<EF:EFOption label="失败" value="E"></EF:EFOption>
			    		</EF:EFSelect>
			    	</td>
					
			    	<td nowrap align="right" width="10%">耗时</td>
					<td nowrap colspan="1" width="5%">
						<EF:EFInput blockId="detail" ename="cost" row="0" type="text" style="width:50px" etc="readOnly"/>
						ms
					</td>
					<td nowrap align="right" width="10%">日期</td>
					<td nowrap colspan="1" width="5%">
						<EF:EFInput blockId="detail" ename="time" row="0" type="text" style="width:200px" etc="readOnly"/>
					</td>
					<td nowrap width = "25%">
					</td>
				</tr>
			</table>
			   <hr>
			   <table width = "100%" >
			   <tr id="EL00_Context1_TR">	
					<td nowrap align="right" width="10%" id="EL00_Context1_Text">日志上下文1</td>
					<td nowrap colspan="1" width="30%">
						<EF:EFInput blockId="detail" ename="context1" row="0" type="text" style="width:100%" etc="readOnly"/>
					</td>
					<td  width="60%">
					</td>
			   </tr>
			   <tr id="EL00_Context2_TR">
					<td nowrap align="right" width="10%" id="EL00_Context2_Text">日志上下文2</td>
					<td nowrap colspan="1" width="30%">
						<EF:EFInput blockId="detail" ename="context2" row="0" type="text" style="width:100%" etc="readOnly"/>
					</td>
					<td  width="60%">
					</td>
			   </tr>
			   <tr id="EL00_Context3_TR">
					<td nowrap align="right" width="10%" id="EL00_Context3_Text">日志上下文3</td>
					<td nowrap colspan="1" width="30%">
						<EF:EFInput blockId="detail" ename="context3" row="0" type="text" style="width:100%" etc="readOnly"/>
					</td>
					<td  width="60%">
					</td>
			   </tr>
			   <tr id="EL00_Context4_TR">
					<td nowrap align="right" width="10%" id="EL00_Context4_Text">日志上下文4</td>
					<td nowrap colspan="1" width="30%">
						<EF:EFInput blockId="detail" ename="context4" row="0" type="text" style="width:100%" etc="readOnly"/>
					</td>
					<td  width="60%">
					</td>
			   </tr>
			   <tr id="EL00_Context5_TR">
					<td nowrap align="right" width="10%" id="EL00_Context5_Text">日志上下文5</td>
					<td nowrap colspan="1" width="30%">
						<EF:EFInput blockId="detail" ename="context5" row="0" type="text" style="width:100%" etc="readOnly"/>
					</td>
					<td  width="60%">
					</td>
			   </tr>
			</table>
			<hr>
			<table width = "100%">
				<tr>
					<td nowrap align="right" width="10%">信息</td>
					<td nowrap colspan="1" width="40%">
						<EF:EFInput blockId="detail" ename="information" row="0" type="textarea" style='width:100%;height:100px' />
					</td>
					<td width="50%">
					</td>
				</tr>
			</table>
			
		</div>
	</div>
</div>

<div style='display:none;'>
<div id = "ef_region_treetable" title="结构层次" efRegionShowClear=true> 
	<div id="ef_grid_treetable" title = "信息"  style="overflow: visible;background:#fff;">
		<EF:EFTreeGrid blockId="$" treeColumn="0" >
		<EF:EFTreeColumn ename="text" cname="菜单" width="200" />
		<EF:EFTreeColumn ename="label" cname="标签"/>
		<EF:EFTreeColumn ename="leaf" cname="是否为叶子节点"/>
		<EF:EFTreeColumn ename="parent" cname="父节点"/>
		</EF:EFTreeGrid>
	</div>
</div>
</div>

<EF:EFRegion/>

<EF:EFGrid blockId="result" sumType="none" ajax="true"  >
	<EF:EFColumn ename="seqId" cname="日志串接序列号" width="180"  sort="true"  fix="yes"/>
	<EF:EFColumn ename="id" cname="日志序号" width="60" sort="true" />
	<EF:EFColumn ename="parent" cname="日志父序号" width="70" sort="true" />
	<EF:EFColumn ename="leaf" cname="叶子节点" width="60" sort="true" />
	<EF:EFColumn ename="depth" cname="调用层次" width="60" sort="true" />
	<EF:EFColumn ename="logId" cname="日志类型编号" width="80" sort="true" />
	<EF:EFColumn ename="logName" cname="日志类型英文名" width="130" sort="true" />
	<EF:EFColumn ename="status" cname="执行状态" width="60" sort="true" />
	<EF:EFColumn ename="position" cname="日志类型" width="60" sort="true" />
	<EF:EFColumn ename="time" cname="时间" width="150" sort="true" />
	<EF:EFColumn ename="cost" cname="耗时(ms)" width="60" sort="true" />
	<EF:EFColumn ename="context1" cname="日志上下文1" visible="false" width="100" />
	<EF:EFColumn ename="context2" cname="日志上下文2" visible="false" width="100" />
	<EF:EFColumn ename="context3" cname="日志上下文3" visible="false" width="100" />
	<EF:EFColumn ename="context4" cname="日志上下文4" visible="false" width="100" />
	<EF:EFColumn ename="context5" cname="日志上下文5" visible="false" width="100" />
	<EF:EFColumn ename="information" cname="信息" visible="false" width="500" />
</EF:EFGrid>



<jsp:include flush="false" page="../EF/Form/iplat.ef.tail.jsp"></jsp:include>
</form>
</body>
</html>
