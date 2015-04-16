<!DOCTYPE html>
<%@ page contentType="text/html; charset=UTF-8"%>

<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>
<%
	String actionUrl = request.getContextPath() + "/DispatchAction.do";
	//String articleStr=request.getParameter("articleStr").toString();
%>

<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; 
	charset=UTF-8" />
	<title>
	</title>
	
	<script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
	<script type="text/javascript" src="./EC/AM/ECAM08.js"></script>
	
</head>
<body class="bodyBackground">

<form id="ECAM08" method="POST" action="<%=actionUrl%>"  enctype="multipart/form-data" target="uploadArtilceIframe">

<jsp:include flush="false" page="../../EF/Form/iplat.ef.head.jsp"></jsp:include>

<div id = "ef_region_all" title="文章导入" efRegionShowClear=false>
	<div id="ef_region_main">
    		  <div id="leftTreeDiv" style='overflow:auto;width:200; height:100%;'>
    		    <EF:EFTree model="tableTreeModel" id="nTree" text="站点栏目树" configFunc="configTree">
    		    </EF:EFTree>
    		  </div>

	</div>
</div>  

<div id="importArticle" class="efwindow">
	<table width="300">
		<tr>
			<td>
				<div id="ef_region_impart" title="请选择导入文章(Zip格式)" style="overflow:scroll;">
					 <table width="100%">
						<tr>
							<td style="padding-left:50px;">
							    <input type="hidden" id="hdColumnId"/>
 								<input type="file" name="importFile" id="importFile" contenteditable="false">
							</td>
						 </tr>
					 </table>
				</div>
			</td>
		</tr>
	</table>
</div>

<EF:EFRegion/>  
<iframe id="uploadArtilceIframe" name="uploadArtilceIframe" style="display:none"/>
<jsp:include flush="false" page="../../EF/Form/iplat.ef.tail.jsp"></jsp:include>
</form>

</body>
</html>   
