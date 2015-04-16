<!DOCTYPE html>
<%@page pageEncoding="UTF-8" contentType="text/html;charset=UTF-8"%>
<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>
<%
	String contextpath = request.getContextPath();
	String baseUrl = contextpath;
	String listUrl = baseUrl + "/DispatchAction.do";
%>
<EF:EFPage>
<EF:EFHead />
 <body class="bodyBackground">
 <EF:EFForm formId="ES5000">
    <EF:EFInput blockId="inqu_status" row="0" ename="parent" type="hidden" version="1.0" />
    <EF:EFInput blockId="inqu_status" row="0" ename="pnode" type="hidden" version="1.0"/>
    <EF:EFInput blockId="inqu_status" row="0" ename="page" type="hidden" version="1.0"/>
    <EF:EFInput blockId="inqu_status" row="0" ename="authorize" type="hidden" version="1.0"/>
    <input type="hidden" id="inqu_status-0-pageType" name="inqu_status-0-pageType" value="IANA" />
    <input type="hidden" id="inqu_status-type" name="inqu_status-type" value="" />
    <input type="hidden" id="inqu_status-target" name="inqu_status-target" value="" />
 <EF:EFLayout col="2" cols="220px,100%">
  	<EF:EFTab tabId="ef_tab_x" eftabWidth="220px">
		<EF:EFTabItem id="mod" title="模块视角" eftabHeight="540px" >
			<EF:EFLayout rows="85%,5%,5%,5%" style="height:100%">
				<EF:EFTree id="nTree" model="appTreeModel" text="系统模块" configFunc="configAppTree" style="overflow:auto; width:220; height:100%;"></EF:EFTree>
				<EF:EFInput bindId="inqu_status-0-pageLabel" cname="页面标签"></EF:EFInput>
				<EF:EFInput bindId="inqu_status-0-pageName" cname="页面名称"></EF:EFInput>
					<EF:EFLayout col="2">
					<EF:EFInput bindId="inqu_status-0-recursive" cname="搜索子模块" type="checkbox" ratio="1:1"></EF:EFInput>
					<EF:EFPanel>
					<EF:EFButton ename="f2" cname="查询"/>
					</EF:EFPanel>
					</EF:EFLayout>
			</EF:EFLayout>
		</EF:EFTabItem >
		<EF:EFTabItem id="menu" title="菜单视角" eftabHeight="540px" >
				<EF:EFTree id="tTree" model="menuTreeModel" text="系统菜单" configFunc="configMenuTree" style="overflow:auto; width:220; height:100%;"></EF:EFTree>
		</EF:EFTabItem>
	</EF:EFTab>
 	<EF:EFRegion regionId="rightContent" style="height:100%;width:100%">
 		 <EF:EFLayout row="2" col="2" style="height:100%;width:100%;overflow:scroll"  cols="50%,50%">
 		 	<EF:EFRegion regionId="ef_region_page" title="页面信息"  rowPos="1" colPos="1" efRegionShowClear="false">
				<EF:EFGrid blockId="result" paintId="ef_grid_p" autoDraw="no" enable="true" readonly="false" style="overflow: hidden;height:320px;" ajax="true">
					<EF:EFColumn ename="label" cname="页面标签" fix="yes" width="80" sort="false"/>
					<EF:EFColumn ename="name" cname="页面名称" width="250" enable="false"/>
					<EF:EFColumn ename="view" cname="权限" width="60" visible="true" enable="false"/>
				</EF:EFGrid>
 		 	</EF:EFRegion>
 		 	<EF:EFRegion regionId="ef_region_show" title="权限查看"  rowPos="1" colPos="2" efRegionShowClear="false">
			    <EF:EFGrid blockId="result" paintId="ef_grid_c" autoDraw="no" enable="true" readonly="false"  ajax="true" style="overflow: hidden;height:296px;">
			        <EF:EFColumn ename="clazz" width="50" visible="false"/>
			        <EF:EFColumn ename="identity" visible="false"/>
			        <EF:EFColumn ename="clazzName" cname="用户集合类型" width="200"/>
			        <EF:EFColumn ename="desc" cname="用户集合描述" width="200"/>
			    </EF:EFGrid>
 		 	</EF:EFRegion>
 		 	<EF:EFRegion regionId="ef_region_elem" title="按钮信息"  rowPos="2" colPos="1" efRegionShowClear="false">
				<EF:EFGrid blockId="result" paintId="ef_grid_e" autoDraw="no" enable="true" readonly="false" style="overflow: hidden;height:220px;" ajax="true" >
					<EF:EFColumn ename="label" cname="按钮标签" fix="yes" width="80" sort="false"/>
					<EF:EFColumn ename="name" cname="按钮名称" width="250" enable="false"/>
					<EF:EFColumn ename="view" cname="权限" width="60"   visible="true"  enable="false"/>
				</EF:EFGrid>
 		 	</EF:EFRegion>
 		 	<EF:EFPanel>
 		 	
 		 	<EF:EFRegion regionId="ef_region_auth" title="批量授权"  rowPos="2" colPos="2" efRegionShowClear="false">
 		 	<input type="checkbox" name="inqu_status-0-inheritance" value="true" >页面授权时授予所有按钮权限
				<EF:EFGrid blockId="result" paintId="ef_grid_r" autoDraw="no" enable="true" readonly="false"  ajax="true" style="overflow: hidden;height:170px;">
			        <EF:EFColumn ename="clazz" width="50" visible="false"/>
			        <EF:EFColumn ename="identity" visible="false"/>
			        <EF:EFColumn ename="clazzName" cname="用户集合类型" width="200"/>
			        <EF:EFColumn ename="desc" cname="用户集合描述" width="200"/>
				</EF:EFGrid>
 		 	</EF:EFRegion>
 		 	</EF:EFPanel>

 		 </EF:EFLayout>
	</EF:EFRegion>
 </EF:EFLayout>
 </EF:EFForm>
  <script type="text/javascript">
    var grid = efgrid.getGridObject( "ef_grid_e" ); 
    grid.blockData = new EiBlock("result");
  </script>
</body>
</EF:EFPage>
