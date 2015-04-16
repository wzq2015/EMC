<!DOCTYPE html>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>

<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	<title>LOGO维护</title>
	<script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
	<script type="text/javascript" src="./EC/PM/ECPM03.js"></script>
</head>
<body class="bodyBackground">
	<jsp:include flush="false" page="../../EF/Form/iplat.ef.head.jsp"></jsp:include>
		<form id="upload" method="POST" action="" enctype="multipart/form-data">
			<input type="hidden" id="isUpdate"/>
			<EF:EFInput blockId="inqu_status" ename="nodeId" row="0" type="hidden"></EF:EFInput>
			<EF:EFInput blockId="inqu_status" ename="nodeType" row="0" type="hidden"></EF:EFInput>
			
			<div id = "ef_region_result" title="记录集" style="overflow:scroll" efRegionShowClear=false> 
				<div id = "ef_grid_result" title="文章信息" style="overflow: hidden;">
				</div>
			</div>  

			<EF:EFRegion/>
				
			<EF:EFGrid blockId="result" ajax="true" autoDraw="false" style="operationBar:false">
			<EF:EFColumn ename="logoSeq" cname="LOGO序号" nullable="false"/>
			<EF:EFColumn ename="logoPath" cname="文件名称" readonly="true" width="200"/>
			<EF:EFColumn ename="edit" cname="操作" align="right" enable="false"/>
			<EF:EFColumn ename="fileId" cname="id" visible="false"/>
			<EF:EFColumn ename="logoId" cname="logo标识" visible="false"/>
			<EF:EFColumn ename="nodeId" cname="节点标识" visible="false"/>
			<EF:EFColumn ename="nodeType" cname="节点类型" visible="false"/>
			
			</EF:EFGrid>      
			
		</form>
	<jsp:include flush="false" page="../../EF/Form/iplat.ef.tail.jsp"></jsp:include>
</body>
</html>   
