<!DOCTYPE html>
<%@page contentType="text/html;charset=UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>
<%
	String actionUrl = request.getContextPath() + "/DispatchAction.do";
%>
<%@page import="com.baosight.iplat4j.core.resource.I18nMessages"%>
<html>
<head>	
	<title>
	</title>
	<script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
	<script type="text/javascript" src="./ED/EDPI10.js"></script>
</head>
<body class="bodyBackground" >
<form id="EDPI10" method="POST" action="<%=actionUrl%>">

<jsp:include flush="false" page="../EF/Form/iplat.ef.head.jsp"></jsp:include>

<div id ="cascadeSelect" cascadeSelectIds="inqu_status-0-tree_ename,inqu_status-0-node_ename" 
cascadeService="EDPI10Cascade" cascadeServiceMethod="getCascadeSelect"> 
</div>
<!-- 对应的原始需求ID号：100455 -->
<div id = "ef_region_inqu" title="<%=I18nMessages.getText("label.EFQueryConditions", "查询条件")%>"  efRegionShowClear=true>
	<div style="overflow:hidden;width:100%">
		<table width="100%">
		  <tr>
		    <td  nowrap width="20%" >
		      <%=I18nMessages.getText("E_Col.tree_ename","节点树英文名") %>
		    </td>
		    <td  nowrap width="30%" >
		      <EF:EFInput blockId="inqu_status" ename="tree_ename" row="0" etc=""/>
				<img title="<%=I18nMessages.getText("label.EDTreeNodesList", "树结点列表")%>" id="tree_list_node" 
				onload="efico.setImageSrc(this,'efform.efImgList')" src="./EF/Images/eftree_blank.png"
				 onmouseover="javascript:this.style.cursor='hand'" onClick="efcascadeselect.getEiInfo(ef.get('inqu_status-0-tree_ename'))">
		    </td>
		    <td  nowrap width="20%">
		      <%=I18nMessages.getText("E_Col.node_ename","节点英文名") %>
		    </td>
		    <td  nowrap width="30%" >
		      <EF:EFInput blockId="inqu_status" ename="node_ename" row="0" etc=""/>	
				<img title="<%=I18nMessages.getText("label.EDNodeEnameList", "结点英文名列表")%>" id="popupWindowId" 
				onload="efico.setImageSrc(this,'efform.efPopupWindow')" src="./EF/Images/eftree_blank.png"
				 onmouseover="javascript:this.style.cursor='hand'" onClick="efcascadeselect.getEiInfo(ef.get('inqu_status-0-node_ename'))">
		    </td>
		  </tr>
		  <tr>
		    <td nowrap width="20%">
		      <%=I18nMessages.getText("E_Col.node_type","节点类型") %>
		    </td>
		    <td nowrap width="30%" >
			    <EF:EFSelect blockId="inqu_status" ename="node_type" row="0" >
			    <EF:EFOption label='<%=I18nMessages.getText("label.EFAll","全部") %>' value="" />
			    <EF:EFOptions conj="-" blockId="nodeTypeDesc" labelColumn="node_type_desc" valueColumn="node_type"/>
			    </EF:EFSelect>
		    </td>
		    <td nowrap width="20%"><%=I18nMessages.getText("E_Col.node_cname","节点中文名") %></td>
		    <td nowrap width="30%"><EF:EFInput blockId="inqu_status" ename="node_cname" row="0" etc=""/></td>
		  </tr>
		</table>
	</div>
</div>

<div id = "ef_region_result" title="<%=I18nMessages.getText("label.EFRecordSet","记录集") %>" style="overflow:scroll">
	<div id = "ef_grid_result" title="<%=I18nMessages.getText("label.EDNodeTreeInfo","节点树信息") %>" style="overflow: hidden;height:300px;">
	</div>
</div>


<EF:EFRegion/>

<EF:EFGrid blockId="result" autoDraw="yes">
	<EF:EFComboColumn ename="node_type" width="80" blockName="nodeTypeDesc" valueProperty="node_type" labelProperty="node_type_desc" formatString="#valueString#-#labelString#" />
	<EF:EFColumn ename="tree_ename" width="80" readonly="true"/>
	<EF:EFColumn ename="node_ename" width="80" readonly="true"/>
	<EF:EFColumn ename="node_cname" width="200" />
	<EF:EFColumn ename="rec_creator" enable="false" />
	<EF:EFColumn ename="rec_create_time" enable="false" />
	<EF:EFColumn ename="rec_revisor" enable="false" />
	<EF:EFColumn ename="rec_revise_time" enable="false" />
</EF:EFGrid>

<jsp:include flush="false" page="../EF/Form/iplat.ef.tail.jsp"></jsp:include>
</form>

</body>
</html>


