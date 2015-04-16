<!DOCTYPE html>
<%@ page contentType="text/html; charset=UTF-8"%>

<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>
<%
	String actionUrl = request.getContextPath() + "/DispatchAction.do";
%>

<html>
<head>
	<meta http-equiv="Content-Type" content="text/html;	charset=UTF-8" />
	<title>
	</title>

	<script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
	<script type="text/javascript" src="./EE/DM/EEDM00.js"></script>
	<style type="text/css"  rel="stylesheet">
*{
	margin:0px;
	padding:0px;
	border:0px;
}

html, body{
	background:#f0f3f4;
	color:#000000;
	height:100%;
	text-align:center;
	overflow:hidden;
}

body{
	overflow:auto;
}


a:link, a:visited {
	color:#0464bb;
	text-decoration:none;
}
a:hover {
	color:#FF5C0F;
	text-decoration:none;
}

.wrapBox{
	width:95%;
	height:90%;
	padding-top:15px;
}

.wrap{
	height:100%;
}

.Navigator{
	background:url(./EF/Images/demo/navigator-bg.jpg);
	background-repeat:repeat-y;
	font-size:12px;
	font-family:Arial, Helvetica, sans-serif, 微软雅黑, 宋体;
	color:#000;
	border:solid 1px;
	border-color:#b3b3b3;
}


.Navigator a:link, a:visited {
	font-size:14px;
	display:block;
	line-height:28px;
	height:28px;
	font-weight:bold;
	text-align:left;
	text-indent:15px;
}

.Navigator a:hover {
	color:#0464bb;
	background:url(./EF/Images/demo/navigationButtonOver.jpg) repeat-x;
	font-size:14px;
	display:block;
	line-height:28px;
	height:28px;
	font-weight:bold;
	text-align:left;
	text-indent:15px;
}

.Navigator img{
	margin-right:6px;
}

.content_1{
	height:100%;
	background:#f5f9fa;
	font-size:12px;
	font-family:Arial, Helvetica, sans-serif, 微软雅黑, 宋体;
	color:#777777;
	border:solid 1px;
	border-color:#b3b3b3;
}

.myscrollBar{

	overflow:auto;
	overflow-x:hidden;
	padding:0px;
}

.content_1 tr.title{
	background:url(./EF/Images/demo/titleBG.jpg) repeat-y;
	height:30px;
	font-size:15px;
	font-weight:bold;
	color:#3764a0;
	text-indent:10px;
}

.title td{
	border-bottom:#b3b3b3 solid 1px;
	border-top:#b3b3b3 solid 1px;
}

.rectTop{
	background:url(./EF/Images/demo/rectTop.jpg);
	background-repeat:repeat-x;
}

.rectBottom{
	background:#cae1ed;
	border-top:solid 1px;
	border-color:#b3b3b3;
	}

 .previewRow{
	Margin:20px;
}
.previewRow table{
	margin-bottom:20px;
}
.previewRow td.previewImg{
	width:118px;
	height:88px;
	border:#b3b3b3 solid 1px;
}

.previewRow table.previewContent{
	text-align:left;
	width:auto;
	margin-left:10px;
	margin-right:10px;
}

.previewContent tr.header{
	color:#555555;
	font-size:13px;
	font-weight:bold;
	margin-bottom:50px;
}

	</style>
</head>
<body class="bodyBackground">

<form id="EEDM00" method="POST" action="<%=actionUrl%>" >
<input type="hidden" id="context" value="<%=request.getContextPath()%>">
<jsp:include flush="false" page="../../EF/Form/iplat.ef.head.jsp"></jsp:include>
<center>
<table class="wrapBox" id="mywrap" cellspacing="0" cellpadding="0" align="center">
    	<tr  class="wrap" align="center">
        	<td class="content_1">
        	    <table cellspacing="0" cellpadding="0" width="100%" height="100%">
                	<tr height="8px">
                    	<td class="rectTop"/>
                    </tr>
                    <tr>
                    	<td valign="top"><div id="myDemoList" class="myscrollBar"></div></td>
                    </tr>
                    <tr height="4px">
                    	<td class="rectBottom"/>
                    </tr>
                </table>
            </td>
        	<td width="15px">
            </td>
        	<td class="Navigator" width="195px" valign="top"><div class="myscrollBar">
                	<div id="treeDiv" ></div></div>
            </td>
        </tr>
    </table>
    </center>
<EF:EFRegion/>
<jsp:include flush="false" page="../../EF/Form/iplat.ef.tail.jsp"></jsp:include>
</form>

</body>
</html>
