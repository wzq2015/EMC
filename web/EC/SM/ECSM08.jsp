<!DOCTYPE html>
<%@ page contentType="text/html; charset=UTF-8"%>

<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>
<%
	String actionUrl = request.getContextPath() + "/DispatchAction.do";
	//String nodeId = request.getParameter("inqu_status-0-parentId");//request.getParameter("nodeId");
	//String nodeType = request.getParameter("type");//request.getParameter("nodeType");
	
	String nodeId =request.getParameter("nodeId");
	String nodeType =request.getParameter("nodeType");
	
	String webPath=request.getRealPath("/");
%>

<html>
<head>
	<meta http-equiv="Content-Type" content="text/html;  charset=UTF-8" />
	<title>
	</title>
	
	<script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
	<script type="text/javascript" src="./EC/SM/ECSM08.js"></script>
	
</head>
<body class="bodyBackground">

<form id="ECSM08" name='form1' method="POST" action="<%=actionUrl%>"  enctype="multipart/form-data">

<jsp:include flush="false" page="../../EF/Form/iplat.ef.head.jsp"></jsp:include>
<input type="hidden" id="nodeType" value='<%=nodeType%>'>
<input type="hidden" id="nodeId" value='<%=nodeId%>'>
<input type="hidden" id="path" name="path" value='<%=webPath%>'>
<input id="url" type="hidden" value="<%=actionUrl %>">

<div id = "ef_region_inqu" title="查询条件" efRegionShowClear=true>
	<EF:EFInput blockId="inqu_status" ename="nodeType" row="0" type="hidden"/>
	<EF:EFInput blockId="inqu_status" ename="nodeId" row="0" type="hidden"/>
	<div style="overflow:hidden;width:100%">
		<table>
		  <tr>
		  	<td nowrap width="20%" align="right">
		      模板定义名称:
		    </td>
		    <td width="15%" >
		    <EF:EFInput blockId="inqu_status" ename="templateDefName" row="0" />
		    </td>
		    <td nowrap width="15%" align="right"> 
		      模板类型:
		    </td>
		    <td  width="15%"> 
		    <EF:EFSelect blockId="inqu_status" ename="templateTypeId" row="0">
		    	<EF:EFOption label="==请选择==" value=""></EF:EFOption>
		    	<EF:EFOption label="站点首页模板" value="0"></EF:EFOption>
		    	<EF:EFOption label="栏目首页模板" value="1"></EF:EFOption>
		    	<EF:EFOption label="文章显示模板" value="3"></EF:EFOption>
		    </EF:EFSelect>
		    </td>
		    <td  nowrap width="15%" align="right">
		      后缀:
		    </td>
		    <td nowrap width="20%">
		    <EF:EFInput blockId="inqu_status" ename="suffix" row="0" />
		    </td>
		  </tr>
		</table>
	</div>
</div>  

<div id = "ef_region_result" title="记录集" style="overflow:scroll"> 
	<div id = "ef_grid_result" title="页面信息" style="overflow: hidden;height:300px;">
	</div> 
</div>  

<div id="templateupload" title="模板信息" class="efwindow">
	<div  id="ef_region_template" title="详细内容" style="width:640px;">
		<table width="100%">
 	  	<tr>
 	  	  <td nowrap >模板名称:</td>
 	  	  <td nowrap >
 	  	  	<input type="text" id="templateDefName"/>
 	  	  	<input type="hidden" id="templateDefName_old"/>
 	  	  	<input type="hidden" id="opstatus"/>
 	  	  	<input type="hidden" id="templateDefId"/>
 	  	  	<input type="hidden" id="templateFileName"/>
 	  	  </td>
 	  	  
 	  	   <td nowrap >后缀:</td>
		   <td nowrap >
 	  	  	<input type="text" id="suffix" value="">
 	  	   </td>
 	  	   
 	  	  <td nowrap >模板类型:</td>
 	  	  <td nowrap >
 	  	  	<select id="templateTypeId" disabled = "true" style="width:150px">
 	  	  		<option value="0">站点首页模板</option>
 	  	  		<option value="1">栏目首页模板</option>
 	  	  		<option value="3">文章显示模板</option>
 	  	  	</select>
 	  	  </td>
 	  	</tr>
 	  	
 	  	<tr>
 	  	   <td nowrap >维护方式:</td>
		   <td nowrap >
 	  	  	<input type="radio" id="onlineEditMode" name="mode" value="0" onClick="editModeSelect()">在线编辑
 	  	  	<input type="radio" id="uploadMode" name="mode" value="1" onClick="editModeSelect()">上传
 	  	  </td>
 	  	  <td colspan="4">&nbsp;</td>
 	  	</tr>
 	  </table>
 	  <div id="ef_region_upload" title="上传模板" style="display:none">
 	  	<table>
	 	  	  <tr>
	 	  	  	<td>模板文件:</td>
	 	  	  	<td id="file1">
	 	  	  		<!--<input type="file" name="model_file" id="model_file" contenteditable="false"/>-->
	 	  	  	</td>
	 	  	  	<td colspan="4">&nbsp;</td>
	 	  	  </tr>
	 	  	  
	 	  	  <tr>
				<td align="left" style="color:orange;" colspan="6">
					*上传模板的编码集为UTF-8。
				</td>
			 </tr>
			  
		</table>
 	  </div>
 	  
 	  <div id="ef_region_onlineedit" title="在线编辑" style="display:none">
	 	 <table width="100%" align="center">
	 	  	  <tr><td >在线编辑</td></tr>
			  <tr>
			  	<td>
			  		<EF:EFInput type="textarea" blockId="" row="" ename="templateContent" etc="cols='100' rows='20' style='height:290px;overflow-x:auto;overflow-y:auto'"/>
			  	</td>
			  </tr>
		</table>
 	 </div>
 	 
	</div>
</div>
<iframe id = "uploadFrame" name="uploadFrame" width=0 height=0 style="display:none"></iframe>

<div id="exportTemplate" class="efwindow">
	<table width="300">
		<tr>
			<td>
				<div id="ef_region_export" title="模板导出" style="overflow:scroll">
					<table>
						<tr>
							<td width="100%">
								<input type="radio" id="exportDirect" name="expType" value="0" class="inputField" checked="checked"/>导出直属模板
							</td>
						</tr>
						<tr>
							<td width="100%">
								<input type="radio" id="exportAllChild" name="expType" value="1" class="inputField"/>导出所有下级模板(包含子栏目下的)
							</td>
						</tr>
						<tr>
							<td width="100%">
								<input type="radio" id="exportChecked" name="expType" value="2" class="inputField"/>导出选中的模板
							</td>
						</tr>				
					</table>
				</div>
			</td>
		</tr>
	</table>
</div>
<iframe id = "downloadObject" width=0 height=0></iframe>

<div id="importTemplate" class="efwindow">
	<table width="300">
		<tr>
			<td>
				<div id="ef_region_import" title="请选择导入模板(Zip格式)" style="overflow:scroll;height:200px">
					<table>
						<tr>
							<td width="100%" id="file2">
								<!--<input type="file" name="importFile" id="importFile" contenteditable="false">-->
							</td>
						</tr>
						<tr>
							<td width="100%" align="left" style="color:orange;">
								*导入模板的编码集为UTF-8。
							</td>
						</tr>
					</table>
				</div>
			</td>
		</tr>
	</table>
</div>
 
<iframe id = "importFrame" name="importFrame" width=0 height=0 style="display:none"></iframe>

<EF:EFGrid blockId="result" ajax="true" autoDraw="false"  style="operationBar:false;">
<EF:EFColumn ename="templateDefName"  width="100" cname="模板定义名称" nullable="false" readonly="true"/>
<EF:EFColumn ename="templateFilename" width="150" cname="模板文件名" nullable="false" readonly="true"/>
<EF:EFComboColumn ename="templateTypeId"  cname="模板类型" readonly="true">
	<EF:EFOption value="0" label="站点首页模板" />
	<EF:EFOption value="1" label="栏目首页模板" />
	<EF:EFOption value="3" label="文章显示模板" />
</EF:EFComboColumn>
<EF:EFColumn ename="columnName" cname="所属栏目"  readonly="true"/>
<EF:EFComboColumn ename="columnCategory"  cname="所属栏目类型" readonly="true">
	<EF:EFOption value="s" label="站点" />
	<EF:EFOption value="00" label="普通栏目" />
	<EF:EFOption value="01" label="虚拟栏目" />
	<EF:EFOption value="02" label="头条新闻" />
	<EF:EFOption value="04" label="图片新闻" />
</EF:EFComboColumn>
<EF:EFColumn ename="suffix" cname="后缀" width="50" readonly="true"/>
<EF:EFColumn ename="edit"  width="250" cname="操作" align="right" enable="false" />
<EF:EFColumn ename="recCreator" cname="创建人" readonly="true"/>
<EF:EFColumn ename="recCreateTime"  width="120" cname="创建时间" readonly="true" editType="date" dateFormatString="yyyy-MM-dd hh:mm:ss"/>
<EF:EFColumn ename="recRevisor" cname="修改人" readonly="true"/>
<EF:EFColumn ename="recReviseTime"  width="120" cname="修改时间" readonly="true" editType="date" dateFormatString="yyyy-MM-dd hh:mm:ss"/>
<EF:EFColumn ename="templateDefId" cname="模版ID" visible="false"/>
</EF:EFGrid> 

<EF:EFRegion/>

<jsp:include flush="false" page="../../EF/Form/iplat.ef.tail.jsp"></jsp:include>
</form>



</body>
</html>   
