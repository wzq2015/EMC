
<%@page pageEncoding="UTF-8" contentType="text/html;charset=UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF.tld" %>
<%
	String actionUrl = request.getContextPath() + "/DispatchAction.do";
	String portalId = request.getParameter("portalId");
	if(portalId==null)portalId="";
	String sourceType = request.getParameter("sourceType");
%>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; 
	charset=UTF-8" />
	<title>
	</title>
	<script type="text/javascript" src="./EF/EF.js"></script>
	<script type="text/javascript" src="./EV/EV14.js"></script>
	
</head>
<body class="bodyBackground">

<form id="EV14" method="POST" action="<%=actionUrl%>" >
<jsp:include flush="false" page="../EF/Form/EFFormHead.jsp"></jsp:include>
<div id = "ef_region_inqu" title="查询条件" efRegionShowClear="true" style="display:block" >
	<div style="overflow:hidden;width:100%">
		<table>
		  <tr>
		  	 <td width="15%">节点树英文名</td>
             <td width="15%">
                 <input id="portalId" name="portalId" value="<%=portalId%>" type="hidden">
                 <input id="sourceType" name="sourceType" value="<%=sourceType%>" type="hidden">
             	<EF:EFInput blockId="inqu_status" ename="portalId" value="<%=portalId%>"  row="0" type="hidden" />
                 <EF:EFInput blockId="inqu_status" ename="treeEname" row="0" etc="maxLength='50'"/>
	         </td>
	         <td width="15%">节点英文名</td>
             <td width="15%">
                 <EF:EFInput blockId="inqu_status" ename="nodeEname" row="0" etc="maxLength='50'"/>
	         </td>
	         <td width="15%">菜单名称</td>
             <td width="15%">
                 <EF:EFInput blockId="inqu_status" ename="menuCname" row="0" etc="maxLength='100'"/>
	         </td>
		  </tr>
		  
		  <tr>
		  	 <td width="15%">菜单类型</td>
             <td width="20%">
                 <EF:EFSelect blockId="inqu_status" ename="menuType" row="0" etc=""> 
	              <EF:EFOption label="全部" value="" />
			      <EF:EFOption value="0" label="来自平台" />
			      <EF:EFOption value="1" label="用户自定义" />
			      <EF:EFOption value="2" label="来自内容管理" />
	            </EF:EFSelect>
	         </td>
		  	 <td width="15%">节点类型</td>
             <td width="20%">
                 <EF:EFSelect blockId="inqu_status" ename="nodeType" row="0" etc="">
	              <EF:EFOption label="全部" value="" />
				  <EF:EFOption value="0" label="树节点" />
				  <EF:EFOption value="1" label="叶子节点" />
	            </EF:EFSelect>
	         </td>
		  </tr>
		  
		  
		</table>
	</div>
</div>  


<div id = "ef_region_result" title="记录集" style="overflow:scroll"> 
	<div id = "ef_grid_result" title="页面信息" style="overflow: hidden;height:300px;">
	</div> 
</div>     

<EF:EFRegion/>
 <EF:EFGrid blockId="result" autoDraw="no" ajax="true" readonly="false" paintId="ef_grid_result" style="operationBar:false">
	<EF:EFColumn ename="treeEname"  cname="节点树英文名" maxLength="50" nullable="false" fix="yes"/>
	<EF:EFColumn ename="nodeEname"  cname="节点英文名" maxLength="50" nullable="false" fix="yes"/>
	<EF:EFComboColumn ename="menuType" cname="菜单类型" align="center" width="100" readonly="true">
      <EF:EFOption value="0" label="来自平台菜单" />
      <EF:EFOption value="1" label="用户自定义" />
      <EF:EFOption value="2" label="来自内容管理" />
    </EF:EFComboColumn>
    
    
	<EF:EFColumn ename="menuCname"  cname="菜单名称" maxLength="100" nullable="false" readonly="true"/>
	<EF:EFComboColumn ename="nodeType" cname="节点类型" align="center" width="100" readonly="true">
      <EF:EFOption value="0" label="树节点"/>
      <EF:EFOption value="1" label="叶子节点" />
    </EF:EFComboColumn>
	<EF:EFSubGridColumn ename="menuUrl" cname="菜单地址" nullable="true" fix="no" width="300" blockName="" valueProperty=""  readonly="true"/>
	<EF:EFColumn ename="nodeSortId"  cname="节点排序标识" maxLength="50" nullable="true" fix="no" readonly="true"/>
	
	<EF:EFColumn ename="ssoSystemId"  cname="单点登录系统标识" readonly="true"/>
	
	
    
    
</EF:EFGrid>

<jsp:include flush="false" page="../EF/Form/EFFormTail.jsp"></jsp:include>
</form>

</body>
</html>   
