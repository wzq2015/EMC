<!DOCTYPE html>
<%@ page contentType="text/html; charset=UTF-8"%>

<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>
<%
    String actionUrl = request.getContextPath() + "/DispatchAction.do";
%>

<html>
<head>
    <meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
    <title>
    </title>
    <script type="text/javascript" src="./EF/jQuery/jquery.js"></script>
    <script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
    <script type="text/javascript" src="./EU/AF/EUAF05.js"></script>
</head>
<body class="bodyBackground">
<jsp:useBean id="ei" scope="request"
             class="com.baosight.iplat4j.core.ei.EiInfo" />
<form id="EUAF05" method="POST" action="<%=actionUrl%>" >
    <jsp:include flush="false" page="../../EF/Form/iplat.ef.head.jsp"></jsp:include>
    <!--input type="button" value="点击触发" onclick="btn_click()"/-->
    <input type="button" class="ui-button" onclick="saveFileInfo()" value="save">
    <div id = "ef_region_all" title="文档附件上传" efRegionShowClear=false style="overflow:hidden">
        <EF:EFUpload code="006" blockId="all" row="0" ename="documentId" height="300" fileType="*.doc"></EF:EFUpload>
    </div>
    <jsp:include flush="false" page="../../EF/Form/iplat.ef.tail.jsp"></jsp:include>
</form>
</body>
</html>

