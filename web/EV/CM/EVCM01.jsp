
<%@ page contentType="text/html; charset=UTF-8"%>

<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF.tld" %>
<%
	String actionUrl = request.getContextPath() + "/DispatchAction.do";
	
%>

<html>
<head>
	<meta http-equiv="Content-Type" content="text/html;  charset=UTF-8" />
	<title>
	</title>
	
	<script type="text/javascript" src="./EF/EF.js"></script>
	<script type="text/javascript" src="./EV/CM/EVCM01.js"></script>
	
</head>
<body class="bodyBackground">

<form id="EVCM01" method="POST" action="<%=actionUrl%>" enctype="multipart/form-data" target="uploadIframe">

<jsp:include flush="false" page="../../EF/Form/EFFormHead.jsp"></jsp:include>

<div id = "ef_region_inqu" title="查询条件" efRegionShowClear=true>
 <input id="themaId"  type="hidden" />
 <input id="themaEname"  type="hidden" />
	<div style="overflow:hidden;width:100%">
		<table>
		  <tr>
		    <td nowrap width="15%">
		      主题名称
		    </td>
		    <td nowrap width="20%">
		    <EF:EFInput blockId="inqu_status" ename="themaName" row="0" />
		    </td>
		    
		    <td nowrap width="15%">
		      主题英文名称
		    </td>
		    <td nowrap width="20%">
		    <EF:EFInput blockId="inqu_status" ename="themaEname" row="0" />
		    </td>
		  </tr>
		</table>
	</div>
</div>  

<div id = "ef_region_result" title="记录集" style="overflow:scroll"> 
	<div id = "ef_grid_result" title="页面信息" style="overflow: hidden;height:300px;">
	</div> 
</div>     
 
<div id="upload" class="efwindow">
	<table width="300">
		<tr>
			<td>
				<div id="ef_region_upload" title="上传主题文件" style="overflow:scroll">
				<table>
					<tr>
					   <td width="20%">
					     主题文件
					   </td>
						<td width="80%">
						<input type="file" name="thema_file" id="thema_file" contenteditable="false">
						</td>
					</tr>
					<tr>
					    <td width="20%">
					     效果图
					    </td>
						<td width="80%">
						<input type="file" name="thema_view" id="thema_view" contenteditable="false"  >
						</td>
					</tr>
					<tr>
					<td colspan="2">
					   <font color="red">*主题文件上传zip文件</font>
					</td>
					</tr>
					<tr>
					<td colspan="2">
					   <font color="red">*效果图上传图片文件</font>
					</td>
					</tr>
				</table>
				</div>
			</td>
		</tr>
	</table>
</div>
  
<EF:EFRegion/>
<EF:EFGrid blockId="result" autoDraw="no" style="navigationBar:false" ajax="true">
	<EF:EFColumn ename="themaId"  visible="false"/>
	<EF:EFColumn ename="themaName" minLength="1"  maxLength="20"  nullable="false" validateErrorPrompt="主题名称"/>
	<EF:EFColumn ename="themaEname" minLength="1" maxLength="20"  nullable="false" validateType="string" validateErrorPrompt="主题英文名" readonly="true"/>
	<EF:EFColumn ename="upload" cname="上传主题" align="right" enable="false"/>
	<EF:EFColumn ename="themaImag" displayType="image" readonly="true"/>
</EF:EFGrid>      

<iframe id="uploadIframe" name="uploadIframe" style="display:none"/>
<jsp:include flush="false" page="../../EF/Form/EFFormTail.jsp"></jsp:include>
</form>

</body>
</html>   
