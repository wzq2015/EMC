<!DOCTYPE html>
<%@ page contentType="text/html; charset=UTF-8"%>

<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>
<%
	String path = request.getContextPath();
	String actionUrl = path + "/DispatchAction.do";
%>

<html>
<head>
	<meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
	<title>
	</title>
    <script type="text/javascript" src="./EF/jQuery/jquery.js"></script>
	<script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
	<script type="text/javascript" src="./ED/MD/EDMD56.js"></script>
</head>
<body class="bodyBackground">
<form id="EDMD56" method="POST" action="<%=actionUrl%>" >
<input type="hidden" id="context" value="<%=request.getContextPath()%>">
<jsp:include flush="false" page="../../EF/Form/iplat.ef.head.jsp"></jsp:include>
  <table id="mainFrameTable" width="98%"  height="80%" cellpadding=0 cellspacing=0 >
	<tr>
     <td id="leftTree" vAlign="top" >
          <div id="leftTreeDiv" class="ef-tree-div" style='overflow-y:auto;width:180px;height:100%;margin:1px; border:#9da1a4 1px solid'>
            <EF:EFTree model="tableTreeModel" id="nTree" text="节点树" configFunc="configTree">
			</EF:EFTree>
          </div>
	  </td>
	  <td id="middleSplitter"></td>
	  <td id="rightContent" vAlign="top" >
		  <div id = "ef_region_all56" title="控件维护" efRegionShowClear=false >
				<div id="ef_region_main56"  >
			     		<div id = "ef_region_inqu56" title="查询条件" efRegionShowClear=true>
						   <div style="width:100%">
									<table>
									  <tr>
									    <td nowrap width="10%">
									    控件类型
									    </td>
									    <td nowrap>
									    <EF:EFSelect blockId="inqu56_status" ename="compType" row="0" >
									    		<EF:EFOption label="全部" value="" />
												<EF:EFCodeOption codeName="iplat.edmd.compType"  />
									    </EF:EFSelect>
									    <EF:EFInput blockId="inqu56_status" ename="controlId" row="0" type="hidden"></EF:EFInput>
									    </td>

									    <td nowrap width="10%">
									     控件名称
									    </td>
									    <td nowrap>
									    <EF:EFInput blockId="inqu56_status" ename="cnName" row="0" etc=" maxLength='250'"/>
									    </td>
									   </tr>
									</table>
								</div>
							</div>
						  <div id = "ef_region_result56" title="记录集" efRegionShowClear=false>
							<div id = "ef_grid_result56" title="控件信息" style="height:400px;">
							</div>
						  </div>
				</div>
			</div>
			<div id = "ef_region_all57" title="控件属性维护" efRegionShowClear=false style=" height:50%;display:none;">
				<div id="ef_region_main57" style="overflow:auto">
			    		<div id = "ef_region_inqu57" title="查询条件" efRegionShowClear=true>
						   <div style="width:100%">
									<table>
									  <tr>
									    <td nowrap width="10%">
									    控件名称
									    </td>

									    <td nowrap>
									      <EF:EFInput blockId="inqu57_status" ename="controlName" row="0" etc=" maxLength='250'"/>
									      <EF:EFInput blockId="inqu57_status" ename="controlId" row="0" type="hidden"></EF:EFInput>
									      <EF:EFInput blockId="inqu57_status" ename="hidden_cmpName" row="0" type="hidden"></EF:EFInput>
									    </td>

									    <td nowrap width="10%">
									    属性英文名
									    </td>
									    <td nowrap>
									    <EF:EFInput blockId="inqu57_status" ename="propEname" row="0" etc=" maxLength='250'"/>
									    </td>

									   </tr>
									</table>
								</div>
							</div>
						  <div id = "ef_region_result57" title="记录集" efRegionShowClear=false>
							<div id = "ef_grid_result57" title="控件属性信息" style="height:400px;">
							</div>
						  </div>
				</div>
			</div>
			<EF:EFRegion/>
			<div id="ef_grid_all56">
			<EF:EFGrid blockId="result56" autoDraw="false" ajax="true"  serviceName="EDMD56" queryMethod="query">
				<EF:EFColumn ename="id" cname="编码"  maxLength="50" visible="false" />
				<EF:EFColumn ename="cnName" cname="控件名称" nullable="false"  width="150"/>
				<EF:EFColumn ename="description" cname="控件描述"   maxLength="250" width="250"/>
				<EF:EFComboColumn ename="compType" cname="控件类型" nullable="false">
					<EF:EFOption label="请选择" value=""></EF:EFOption>
					<EF:EFCodeOption codeName="iplat.edmd.compType" />
				</EF:EFComboColumn>
			</EF:EFGrid>
			</div>
			<div id="ef_grid_all57" style="display:none;">
			<EF:EFGrid blockId="result57" autoDraw="false" ajax="true" serviceName="EDMD57" queryMethod="query">
				<EF:EFColumn ename="id" cname="编码" visible="false"/>
				<EF:EFColumn ename="controlName" cname="控件名称" enable="false"/>
				<EF:EFColumn ename="compId" cname="控件Id" enable="false"  visible="false"/>
				<EF:EFColumn ename="propEname" cname="属性英文名" nullable="false"/>
				<EF:EFColumn ename="propCname" cname="属性中文名"   nullable="false"/>
				<EF:EFComboColumn ename="propType" cname="属性类别 " nullable="false">
					<EF:EFOption label="请选择" value=""></EF:EFOption>
				   	<EF:EFCodeOption codeName="iplat.edmd.propType"/>
				</EF:EFComboColumn>
				<EF:EFColumn ename="seqId" cname="排序" validateType="positive_integer" nullable="false" width="40"/>
				<EF:EFColumn ename="propEnum" cname="枚举值" width="200"/>
				<EF:EFColumn ename="defaultValue" cname="默认值"  width="200"/>
				<EF:EFColumn ename="description" cname="说明"  width="200"/>
			</EF:EFGrid>
			</div>
	  </td>
	</tr>
  </table>
<jsp:include flush="false" page="../../EF/Form/iplat.ef.tail.jsp"></jsp:include>
</form>
</body>
</html>
