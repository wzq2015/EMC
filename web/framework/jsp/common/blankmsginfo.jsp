<!DOCTYPE html>
<%@ page contentType="text/html;charset=UTF-8"%>
<%@ include file="/framework/jsp/common/taglibs.jsp" %>
<HTML>
<HEAD>
<title><bean:message key="label.action"/></title>
<%@ include file="/framework/jsp/common/base.jsp"%>
<script Language="JavaScript">
function doPromt(){
<html:messages message="true" id="msg" >
                alert("${msg}");
</html:messages>
}
</script>

<body onload="doPromt();" >

</body>
</html>
