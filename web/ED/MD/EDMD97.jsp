<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
<title></title>

<script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
<script type="text/javascript" src="FormBuilder/lib/js/jquery.json-2.2.min.js"></script>
<script type="text/javascript" src="ED/MD/EDMD97.js"></script>

<script type="text/javascript">

$(function() {
	$('#validate').button().click(function() {
		if (efvalidateForm($('#previewForm').get(0)))
			alert("表单数据合法！");
	});	
});
</script>
</head>

<body>
<form id="EDMD97" method="POST">
	<jsp:include flush="true" page="../../EF/Form/iplat.ef.head.jsp"/>
	<EF:EFInput type="hidden" blockId="inqu_status" ename="formName" row="0"/>
	<EF:EFInput type="hidden" blockId="inqu_status" ename="dataId" row="0"/>
	<EF:EFInput type="hidden" blockId="inqu_status" ename="dataGrids" row="0"/>
	
<div id="ef_region_result" title="自定义表单">
	<div id="dynform">
	</div>
</div>
</form>

<EF:EFRegion/>

<jsp:include flush="false" page="../../EF/Form/iplat.ef.tail.jsp"></jsp:include>
</body>
</html>
