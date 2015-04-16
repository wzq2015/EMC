
<%@ page contentType="text/html; charset=UTF-8"%>
<jsp:useBean id="ei" scope="request"
	class="com.baosight.iplat4j.core.ei.EiInfo" />

<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF.tld"%>
<%@page import="com.baosight.iplat4j.core.ei.EiBlock"%>
<%
	EiBlock block = ei.getBlock("result");
	int rowCount = block.getRowCount();
	String actionUrl = request.getContextPath() + "/DispatchAction.do";
	String checkedId=request.getParameter("layoutId");
%>
<html >

<head>
<% 

response.setHeader("Cache-Control","no-cache");

response.setHeader("Pragma","no-cache"); 

response.setDateHeader ("Expires", 0); 

%> 


<title>布局选择</title>

<meta http-equiv="content-type" content="text/html;charset=UTF-8" />
<script type="text/javascript" src="./EF/jQuery/jquery.js"></script>
<script type="text/javascript" src="./EF/jQuery/easySlider.js"></script>
<script type="text/javascript" src="./EF/EF.js"></script>

<script type="text/javascript">
	$(document).ready(function(){	
		$("#slider").easySlider({
			auto: false, 
			continuous: true
		});
	});	
	
	function choose(id){
	   ef.get(id).checked=true;
	}
</script>

<link href="./EF/screen.css" rel="stylesheet" type="text/css"
	media="screen" />

</head>
<body>

<div id="container">
<div id="slider">
<ul id="pic">
	<%
			for (int i = 0; i < rowCount; i++) {
			String layoutId = block.getCellStr(i, "layoutId");
			String layoutName = block.getCellStr(i, "layoutName");
			String picName = layoutId + ".jpg";
			String fullPath = "./EV/upload_pic/" + picName;
			String urlPath="DispatchAction.do?efFormEname=EVCM0702&serviceName=EVCM0702&methodName=query&layoutId="+layoutId;
            if(layoutId.equals(checkedId)){
	%>
	<script type="text/javascript">
	     var html="<li><a style='cursor:pointer' onclick=\"choose('<%=layoutId %>')\"><img src='<%=fullPath %>' alt='布局:<%= layoutName%>'><br>"+
	"</img><div align=center><input   type='radio' checked='true' name='realLayout' id='<%=layoutId%>' value='<%= layoutId%>'><%=layoutName%></input></div></a></li>";
	    $("#pic").prepend(html);
     </script>
	<%}else{ %>
	<li><a style='cursor:pointer' onclick="choose('<%=layoutId %>')"><img src="<%=fullPath %>" alt="布局:<%= layoutName%>"><br>
	</img><div align="center"><input   type='radio' name='realLayout' id='<%=layoutId%>' value="<%= layoutId%>"><%=layoutName%></input></div></a></li>
	<%
	}
	}
	%>
</ul>
</div>
</div>

</body>
</html>
<EF:EiInfo />
