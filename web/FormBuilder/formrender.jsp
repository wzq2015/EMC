<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>
<EF:EFPage>
<EF:EFHead>
<script type="text/javascript" src="FormBuilder/lib/js/jquery.json-2.2.min.js"></script>
<script type="text/javascript" src="FormBuilder/js/dynform.js"></script>
<link type="text/css" href="FormBuilder/css/formrender.css" media="screen" rel="stylesheet" />

<script type="text/javascript">
$(function() {
	$('#validate').button().click(function() {
		if (efvalidateForm($('#EDMD91').get(0)))
			alert("表单数据合法！");
	});	
});
</script>
</EF:EFHead>

<body>
<form id="EDMD91" method="POST">
	<jsp:include flush="true" page="../EF/Form/iplat.ef.head.jsp"/>
	<EF:EFRegion regionId="ef_region_result" title="自定义表单">
		<div id="result" style="overflow:hidden;width:100%;">
		</div>
	</EF:EFRegion>
</form>
<br/>
<input type="button" name="validate" value="验证" id="validate"/>

<jsp:include flush="false" page="../EF/Form/iplat.ef.tail.jsp"></jsp:include>
</body>
</EF:EFPage>
