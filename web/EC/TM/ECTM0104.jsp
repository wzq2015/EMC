<!DOCTYPE html>
<%@ page contentType="text/html; charset=UTF-8"%>

<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>
<%
	String actionUrl = request.getContextPath() + "/DispatchAction.do";
	String objId=(String)request.getParameter("objId");
	//避免16位字符串产生错误id指向
	Integer integer_commentId = Integer.valueOf(objId);
    objId = integer_commentId.toString();
	String objType=(String)request.getParameter("objType");
	String templateTypeId=(String)request.getParameter("templateTypeId");
%>

<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; 
	charset=UTF-8" />
	<title>新建模板实例
	</title>
	
	<script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
	<script type="text/javascript" src="./EC/TM/ECTM0104.js"></script>
	
</head>
<body class="bodyBackground">

<form id="ECTM01" method="POST" action="<%=actionUrl%>" >

<jsp:include flush="false" page="../../EF/Form/iplat.ef.head.jsp"></jsp:include>
<div id = "ef_region_all" title="" efRegionShowClear=false>
	<div id="ef_region_main">
		<table id="mainFrameTable" width="100%"  height="82%" cellpadding=1 cellspacing=0>
    	  <tr height=100%>
    	    <!-- 左侧树 -->
    	    <td id="leftTree" vAlign="top" height="100%" width="24%" style="">
			  <div style="border:#ffffff 1px solid;">
				<div id="leftTreeDiv" style='overflow:auto; height:444; border:#bbbbbb 1px solid; background-color:#FFFFFF'>
				    <!-- 树枝必须长在树根上 -->
				    <EF:EFTreeModel id="tModel">
					  <EF:EFTemplate id="NewsSite">
						<EF:EFLeaf label="0" text="站点首页模板"></EF:EFLeaf>
						<EF:EFLeaf label="1" text="栏目首页模板"></EF:EFLeaf>
						<EF:EFLeaf label="2" text="栏目列表模板"></EF:EFLeaf>
						<EF:EFLeaf label="3" text="文章显示模板"></EF:EFLeaf>
					  </EF:EFTemplate>
				    </EF:EFTreeModel>
				    <!-- 所以树根在树枝下 -->
					<EF:EFTree model="tModel" id="tree" text="模板类别" configFunc="configTree">	 	 
					</EF:EFTree>
			 	</div>
			  </div>
			</td>
    		<!-- 中间分隔 -->
    		<td id="" width="" vAlign="middle">
            </td>
    		<!-- 右侧区域 -->
    		<td id="rightContent" width=75%  vAlign="top" >
    		  <div id = "ef_region_inqu" title="查询条件" efRegionShowClear=true>
    			<EF:EFInput blockId="inqu_status" ename="templateTypeId" row="0" type="hidden" />
    			<EF:EFInput blockId="template_info" ename="templateDefName" row="0" type="hidden" />
    			<EF:EFInput blockId="template_info" ename="templateDefId" row="0" type="hidden" />
    			<EF:EFInput blockId="template_info" ename="objId" row="0" type="hidden" />
    			<EF:EFInput blockId="template_info" ename="objType" row="0" type="hidden" />
    			<EF:EFInput blockId="template_info" ename="templateTypeId2" row="0" type="hidden" />
    			<EF:EFInput blockId="template_info" ename="templateInsName" row="0" type="hidden" />
    		  </div>
			  <div id = "ef_region_result" title="记录集" style="overflow:scroll" efRegionShowClear=false> 
				<div id = "ef_grid_result" title="模板信息" style="overflow: hidden;height:380px;">
				</div>
				<div>　<!-- 模板实例名称 -->　<EF:EFInput blockId="result" ename="templateDefNameEdited" row="0" etc="size=30 maxlength=25" type="hidden" /></div>
			  </div>
            </td>
    	  </tr>
        </table>
	</div>
</div>

<EF:EFRegion/>
<EF:EFGrid blockId="result" ajax="true" autoDraw="false" style="operationBar:false;">
<EF:EFColumn ename="templateDefId" cname="模板定义标识" visible="false"/>
<EF:EFColumn ename="templateDefName" cname="模板定义名称" nullable="false" readonly="true"/>
<EF:EFColumn ename="templateFilename" cname="模板文件名" nullable="false" readonly="true"/>
</EF:EFGrid>
<jsp:include flush="false" page="../../EF/Form/iplat.ef.tail.jsp"></jsp:include>
</form>
<script type='text/javascript'>
document.getElementById('template_info-0-objId').value=<%=objId%>;
document.getElementById('template_info-0-objType').value=<%=objType%>;
document.getElementById('template_info-0-templateTypeId2').value=<%=templateTypeId%>;
</script>
</body>
</html>   
