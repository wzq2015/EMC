
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF.tld" %>
<%@page import="java.io.File"%>
<%
	String actionUrl = request.getContextPath() + "/DispatchAction.do";
	String filePath= request.getSession().getServletContext().getRealPath(File.separator)+"EV"+File.separator+"upload_pic"+File.separator;
%>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; 
	charset=UTF-8" />
	<title>
	</title>
	
	<script type="text/javascript" src="./EF/EF.js"></script>
	<script type="text/javascript" src="./EV/CM/EVCM0700.js"></script>
	
</head>
<body class="bodyBackground">

<form id="EVCM07" method="POST" action="<%=actionUrl%>" enctype="multipart/form-data" target="uploadIframe">

<jsp:include flush="false" page="../../EF/Form/EFFormHead.jsp"></jsp:include>

<div id = "ef_region_inqu" title="查询条件" efRegionShowClear=true>
 <input id="layoutId"  type="hidden" />
	<div style="overflow:hidden;width:100%">
		<table width="100%">
		  <tr>
		    <td width="20%" align="center">
		     	布局名称
		    </td>
            <td width="30%">
                <input type="hidden" name="inqu_status-0-filePath" id="inqu_status-0-filePath" value="<%=filePath %>"/>
            	<EF:EFInput blockId="inqu_status" ename="layoutName" row="0" etc="nullable='true' minLength='0' maxLength='100' errorPrompt='\"名称\"应该由至少0个，最多100个字节大小的字符组成。'"/>
            </td>
            <td width="20%" align="center">
            </td>
            <td width="30%">
            </td>
		  </tr>
		</table>
	</div>
</div>  

<div id="upload" class="efwindow">
	<table width="300">
		<tr>
			<td>
				<div id="ef_region_upload" title="上传布局效果图片" style="overflow:scroll">
				<table>
					<tr>
					    <td width="20%">
					     效果图
					    </td>
						<td width="80%">
						<input type="file" name="layout_view" id="layout_view" contenteditable="false"  >
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



<table id="mainFrameTable" width="100%" cellpadding=1 cellspacing=0 >
 	<tr height=80%>
	<td>
	 	<td width="100%" valign="top">
			<div id = "ef_region_result" title="布局记录" >		         
		   		<div id = "ef_grid_result" title="页面信息" style="overflow: hidden;height:300px;">
		   		</div>
			</div>
		</td>
	</td>
	</tr>
</table>

<EF:EFRegion/>

<EF:EFGrid blockId="result" ajax='true'>
  <EF:EFColumn ename="layoutName" maxLength="100" minLength="1" nullable="false" displayType="hyperlink"/>
  <EF:EFColumn ename="layoutId" visible="false"/>
  <EF:EFColumn  ename="edit" cname="编辑"   enable="false"/>
  <EF:EFColumn ename="upload" cname="上传图片" align="right" enable="false"/>
</EF:EFGrid>

    
<iframe id="uploadIframe" name="uploadIframe" style="display:none"/>
<jsp:include flush="false" page="../../EF/Form/EFFormTail.jsp"></jsp:include>
</form>
</body>
</html>  
