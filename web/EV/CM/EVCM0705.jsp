
<%@ page contentType="text/html; charset=UTF-8"%>
<jsp:useBean id="ei" scope="request"
	class="com.baosight.iplat4j.core.ei.EiInfo" />

<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF.tld"%>
<%@page import="com.baosight.iplat4j.core.ei.EiBlock"%>
<%@page import="java.io.File"%>
<%
	EiBlock block = ei.getBlock("result");
	int rowCount = block.getRowCount();
	String actionUrl = request.getContextPath() + "/DispatchAction.do";
	String checkedId=request.getParameter("themaId");
	String bashPath = request.getRealPath(request.getContextPath());
	bashPath=bashPath.substring(0,bashPath.lastIndexOf(File.separator)); 
	String toFile = bashPath+File.separator+"EV"+File.separator+"upload_pic/topic"+File.separator ;
%>
<html >

<head>
<% 

response.setHeader("Cache-Control","no-cache");

response.setHeader("Pragma","no-cache"); 

response.setDateHeader ("Expires", 0); 

%> 


<title>主题选择</title>

<meta http-equiv="content-type" content="text/html;charset=UTF-8" />
<style type="text/css">
body {margin:0px 0px; padding:0px; }
#content {width:396px; margin:0px auto;}
#desc {margin:10px; float:left; font-family: Arial, sans-serif; font-size: 12px;}
</style>
<script type="text/javascript" src="./EF/jQuery/jquery-1.7.js"></script>
<script type="text/javascript" src="./EF/jQuery/jquery.tn3lite.min.js"></script>
<script type="text/javascript" src="./EF/EF.js"></script>
<script type="text/javascript" src="./EV/CM/EVCM0705.js"></script>
<script type="text/javascript" src="./EV/EV.js"></script>
<script type="text/javascript">
	
</script>

<link type="text/css" rel="stylesheet" href="./EF/tn3/skins/tn3/tn3.css"></link>

</head>
<body>
 <div id="content">
    <div class="mygallery">
	<div class="tn3 album">
	    <h4>Fixed Dimensions</h4>
	    <div class="tn3 description">Images with fixed dimensions</div>
	   
	    <ol>
	    	<%
	    	int checkIndex=0;
			for (int i = 0; i < rowCount; i++) {
			String themaId = block.getCellStr(i, "themaId");
			String themaName = block.getCellStr(i, "themaName");
			String picName = themaId + ".jpg";
			String fullPath = "./EV/upload_pic/" + picName;
            if(themaId.equals(checkedId)){
            	checkIndex=i;
            }
	    %>	      
	      <li>
		    <h4><%= themaName%></h4>
		    <div class="tn3 description"><%= themaId%></div>
		    <%
		    File bigImg=new File(toFile+"396x171/"+themaId+".jpg");
		    if(bigImg.exists()){
		    %>
		    <a href="./EV/upload_pic/topic/396x171/<%=themaId%>.jpg"/>
		    <%}else{ %>
		     <a href="./EV/upload_pic/topic/396x171/notexist.jpg"/>
		    <%}
		    File littleImg=new File(toFile+"35x35/"+themaId+".jpg"); 
		    if(littleImg.exists()){
		    %>
			<img src="./EV/upload_pic/topic/35x35/<%=themaId%>.jpg" />
			<%}else{ %>
			<img src="./EV/upload_pic/topic/35x35/notexist.jpg" />
			<%} %>
		    </a>
		</li>
	        
	     <%
	    }
	%>
		
		
	    </ol>
	</div>
    </div>
</div>
<input type="hidden" id="checkedIndex" value="<%=checkIndex %>"/>
</body>
</html>
<EF:EiInfo />
