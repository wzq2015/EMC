<!DOCTYPE html>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld"%>
<%
	String actionUrl = request.getContextPath() + "/DispatchAction.do";
%>

<html>
<head>
<meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
<title></title>

<script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
<script type="text/javascript" src="./EU/AF/EUAF12.js"></script>
<style type="text/css">
body, html{
	background-color:#dbebfe;
	background-image:url(./EF/Images/attach/BG-tile.jpg) repeat-x;
}


.totalStyle {
	width:80%;
	height:650px;
	margin:0px;
	padding:15px;
	background:#f0f3f4;
	border:solid 1px #367dbb;
}
.totalStyle tr,td {
border:1px;
padding:0px;
margin:0px;
}

.topStyle {
	font-family:Calibri, Arial, "寰蒋闆呴粦", "瀹嬩綋";
	font-weight:600;
	width:80%;
	text-align:left;
	padding:5px;
}
.topStyle td{
	text-align:left;
	vertical-align:middle;
}
.topStyle div{
	float:left;
}

.leftStyle {
	list-style-type:none;
	text-align:left;
}
.leftStyle li {
	list-style-type:none;
}
.txtStyle{
	width:300px;
	height:22px;
	vertical-align:middle;
	line-height:20px;
	border:solid 1px #969696;
	margin:0 10px;
}
.btnStyle {
	width:28px;
	height:27px;
	background-color: transparent;
	background:url(./EF/Images/attach/searchButton.png) no-repeat;
	border:none;
	cursor:pointer;
	display:block;
}
.btnStyleOver{
	width:28px;
	height:27px;
	background:url(./EF/Images/attach/searchButton-over.png) no-repeat;
	border:none;
	cursor:pointer;
}

.Navigator{
	/*background:url(../../EF/./EF/Images/attach/demo/navigator-bg.jpg);*/
	background-repeat:repeat-y;
	font-size:12px;
	font-family:Arial, Helvetica, sans-serif,寰蒋闆呴粦, 瀹嬩綋;
	color:#000;
}

.scrollBar{
	height:600px;
	overflow:auto;
	overflow-x:hidden;
	border:solid 1px #367dbb;
	margin-right:40px;
}
.embDiv{
	border:solid 1px #367dbb;
	margin-right:10px;
}
.embDiv iframe {
	width:100%;
	margin-right:50px;
}
.titleStyle{
	font-family:Calibri, Arial, "寰蒋闆呴粦", "瀹嬩綋";
	width:100%;
	height:50px;
	font-size:16px;
	text-align:left;
}

.titleStyle span {
	font-size:24px;
	color:#000000;
}
.titleStyle div {
	font-size:15px;
	margin-top:2px;
	margin-bottom:4px;
}

.downloadButton {
	display: block;
	background-image: url(./EF/Images/attach/downloadButton.png);
	background-repeat: no-repeat;
	background-color: transparent;
	width:180px;
	height:49px;
	text-decoration:none;
/*	line-height: 42px;
*/}
.downloadButtonOver {
	display: block;
	background-image: url(./EF/Images/attach/downloadButtonOver.png);
	background-repeat: no-repeat;
	background-color: transparent;
	width:180px;
	height:49px;
	text-decoration:none;
}
#downloadTop {
	color: #000000;
	text-decoration: none;
}

#download {
	font-size: 10px;
}



.Navigator a:link, a:visited {
	color:#0099FF;
	font-size:14px;
	display:block;
	line-height:28px;
	height:28px;
	font-weight:bold;
	text-align:left;
	text-indent:15px;
	text-decoration:none;
}

.Navigator a:hover {
	color:#fff;
	font-size:14px;
	display:block;
	line-height:28px;
	height:28px;
	font-weight:bold;
	text-align:left;
	text-indent:15px;
	background:#0099FF;
	text-decoration:none;
}
</style>
</head>
<body>
	<form id="EUAF12" method="POST" action="<%=actionUrl%>">
<jsp:include flush="false" page="../../EF/Form/iplat.ef.head.jsp"></jsp:include>
<div id = "ef_region_inqu" title="文档信息" efRegionShowClear=true>
	<div style="overflow:hidden;width:100%">
		<center>
		<input type="hidden" id="documentId" >
		<br />
	    	<table class="topStyle" border="0" cellpadding="0" cellspacing="0">
				<tr>
					<td><div style="font-size:14px;">附件信息</div></div>
	                <div>
	                    <input type="text" id="txtContent" class="txtStyle"/>
	                </div>
	                <div>
	                    <img alt="查询" onClick="search()" src="./EF/Images/attach/searchButton.png" style="cursor:pointer;" onMouseOut="this.src='./EF/Images/attach/searchButton.png'" onMouseOver="this.src='./EF/Images/attach/searchButton-over.png'">
	                    </div>
	                </td>
				</tr>
			</table>
		<table class="totalStyle" border="0" cellpadding="0" cellspacing="0">
			<tr>
				<td> <table class="titleStyle">
							<tr><td><span id="titleText">&nbsp;&nbsp;</span></td></tr>
							<tr><td><p>&nbsp;&nbsp;&nbsp;&nbsp;<div  id="contentText"></div></p></td></tr>
					</table></td>
				<td>&nbsp;</td>
			</tr>
			<tr>
				<td>
					<ul class="leftStyle">
						<li><div id="embDiv" class="embDiv">
						<iframe id="mainFrame" name="mainFrame" marginWidth="0" marginHeight="0" src="./EU/AF/EUAF17.jsp" frameBorder="0" border="0" scrolling="auto" height="600px"></iframe>
						 </div></li>
						<li><br /><img alt="下载"  onclick="downFile()" style="cursor:pointer;" src="./EF/Images/attach/downloadButton.png" onMouseOut="this.src='./EF/Images/attach/downloadButton.png'" onMouseOver="this.src='./EF/Images/attach/downloadButtonOver.png'" /></li>
					</ul>
				</td>
				<td valign="top" width="230px"  class="Navigator">
				<div class="scrollBar">
	                	<div id="dataDiv">
						</div>
					</div></td>
			</tr>
		</table>
		</center>
			</div>
</div>
<EF:EFRegion/>
	</form>

</body>
</html>
