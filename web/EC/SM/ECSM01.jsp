<!DOCTYPE html>
<%@ page contentType="text/html; charset=UTF-8"%>

<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>
<%
	String actionUrl = request.getContextPath() + "/DispatchAction.do";
%>

<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; 
	charset=UTF-8" />
	<title>
	</title>
	
	<script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
	<script type="text/javascript" src="./EC/SM/ECSM01.js"></script>
	<link href="./EC/Images/css.css" rel="stylesheet" type="text/css"/>
	
</head>
<body class="bodyBackground">

<form id="ECSM01" method="POST" action="<%=actionUrl%>" >

<jsp:include flush="false" page="../../EF/Form/iplat.ef.head.jsp"></jsp:include>

<div id = "ef_region_inqu" title="查询条件" efRegionShowClear=true>
 <EF:EFInput blockId="inqu_status" ename="siteType" row="0" type="hidden" />
 <EF:EFInput blockId="inqu_status" ename="siteId" row="0" type="hidden" />
	<div style="overflow:hidden;width:100%">
		<table width="100%">
		  <tr>
		    <td nowrap align="center">站点名称：</td>
		    <td><EF:EFInput blockId="inqu_status" ename="siteName" row="0" />
		    </td>
		  </tr>
		</table>
	</div>
</div>  

<div id = "ef_region_result" title="记录集" style="overflow:scroll"> 
	<div id = "ef_grid_result" title="页面信息" style="overflow: hidden;height:300px;">
	</div> 
</div>     

<div id="detailContent" class="efwindow">
 	<table width="300">
 	<tr>
		<td>
			<div id = "ef_region_siteinfo" title="新站点信息" style="overflow:scroll">
		 		<table>
					<tr>
			 			<td>	
			 				新站点名称:<input type="text"  name="newSiteName"  class="inputField" />
			 				<input type="hidden" name="siteId" id="_siteId"/>
			 			</td>
					</tr>
					<tr>
						<td>
			 				新站点存放位置:<input  type="text"  name="newSiteAlias"  class="inputField"/>
						 </td>
					</tr>
				</table>
			</div>		
		</td> 	
 	</tr>
 	</table>	
 </div>
 

<div id="detailContent1" class="efwindow" >
	<div  id="ef_region_detail" title="详细内容" style="width:530px;overflow:scroll">
			<input  type="hidden" id="d-0-flag" name="d-0-flag" id="d-0-flag"  />
			<input  type="hidden" id="d-0-siteId" name="d-0-siteId" />
			<input  type="hidden" id="d-0-jobId" name="d-0-jobId"   />
			<table width="100%" align="center" >
			<tr>
	 			<td align="right" width="20%">	
	 				站点名称:
	 			</td>
				<td width="40%">
	 				<input  type="text" id="d-0-siteName" name="d-0-siteName"  />
				 </td>
				 <td align="right" width="20%"> 	
	 				设置站点状态:
	 			 </td>
				 <td>
					<EF:EFSelect  blockId="d" ename="siteState" row="0" >
						<EF:EFOption value="0" label="正常" />
						<EF:EFOption value="1" label="关闭" />
					</EF:EFSelect>
				 </td>
			</tr>
			<tr>
	 			<td align="right">	
	 				存放位置:
	 			</td>
	 			<td>	
	 				<input type="text" id="d-0-siteAlias" name="d-0-siteAlias" onblur="value=value.replace(/[\W]/g,'');" 
					   onbeforepaste="clipboardData.setData('text',clipboardData.getData('text').replace(/[^\d]/g,''))" />(数字或字母)
	 			</td>
	 			<td align="right">	
	 				是否静态访问:
	 			</td>
				<td>
				    <EF:EFSelect blockId="d" ename="isStaticRelease" row="0" etc="onChange='releaseOptionChange(this.value)'">
					    <EF:EFOption label="是" value="1"></EF:EFOption>
					    <EF:EFOption label="否" value="0"></EF:EFOption>
				    </EF:EFSelect>
				 </td>
			</tr>
			<tr>
	 			<td align="right">	
	 				站点排序标识:
	 			</td>
				<td>
	 				<input  type="text" id="d-0-siteSeq" name="d-0-siteSeq"  />
				 </td>
				 <td align="right">	
	 				允许匿名访问:
	 			 </td>
				 <td>
				    <EF:EFSelect blockId="d" ename="isAnony" row="0" >
					    <EF:EFOption label="是" value="1"></EF:EFOption>
					    <EF:EFOption label="否" value="0"></EF:EFOption>
				    </EF:EFSelect>
				 </td>
			</tr>
			<tr>
				<td colspan="4">
					<hr style="border:1px dashed gray;" />
				</td>
			</tr>
			<tr>
	 			<td align="right">	
	 				站点首页模板:
	 			<!-- <input type="hidden" id="d-0-firsetLevelColumn" name="d-0-firsetLevelColumn" />  -->
					<input type="hidden" id="templatelink_nodeId" name="templatelink_nodeId" />
	 			</td>
	 			<td colspan="3">
	 				<input type="text" id="SiteTemplatePreview0" readOnly class="readOnly" /><!--style="cursor:hand" onClick="previewTemplate(0,0)"-->
	 				<button type='button' id="SiteTemplateIns"  class="inputField" onClick="selectTemplateIns('SiteTemplatePreview0',0)">选择</button>
	 				<button type='button' id="SiteTemplate"  class="inputField" onClick="selectTemplate('SiteTemplatePreview0',0)">新增</button>
	 				<button type='button' id="undoSiteTemplate"  class="inputField" onClick="onUndoClick('SiteTemplatePreview0',0,0)">撤销</button>
	 				<button type='button' id="previewSiteTemplate"  class="inputField" onClick="previewTemplate(0,0)">设置</button>
	 				<button type='button' id="previewSite"  class="inputField" onClick="preview(0,0)">预览</button>
	 				<input type="hidden" id="templateInsId00" />
	 				<input type="hidden" id="templateInsName00"/>
	 			</td>
			</tr>
			<tr>
				<td align="right">
	 				栏目首页模板:
				 </td>
	 			<td colspan="3"> 
	 				<input type="text" id="ColumnTemplatePreview0" readOnly class="readOnly"/><!--style="cursor:hand" onClick="previewTemplate(1,0)"-->
	 				<button type='button'  id="ColumnTemplateIns"  class="inputField" onClick="selectTemplateIns('ColumnTemplatePreview0',1)">选择</button>
	 				<button type='button'  id="ColumnTemplate"  class="inputField" onClick="selectTemplate('ColumnTemplatePreview0',1)">新增</button>
	 				<button type='button' id="undoColumnTemplate"  class="inputField" onClick="onUndoClick('ColumnTemplatePreview0',1,0)">撤销</button>
	 				<button type='button' id="previewColumnTemplate"  class="inputField" onClick="previewTemplate(1,0)">设置</button>
	 				<button type='button' id="previewColumn"  class="inputField" onClick="preview(1,0)">预览</button>
	 				<input type="hidden" id="templateInsId01" />
	 				<input type="hidden" id="templateInsName01"/>
	 			</td>
	 			
			</tr>
			<tr>
				<td align="right">
	 				文章明细模板:
				 </td> 
	 			<td colspan="3">
	 				<input type="text" id="ArticleTemplatePreview0" readOnly class="readOnly"/><!--style="cursor:hand" onClick="previewTemplate(3,0)"-->
	 				<button type='button'   id="ArticleTemplateIns"  class="inputField" onClick="selectTemplateIns('ArticleTemplatePreview0',3)">选择</button>
	 				<button type='button'   id="ArticleTemplate"  class="inputField" onClick="selectTemplate('ArticleTemplatePreview0',3)">新增</button>
	 				<button type='button' id="undoArticleTemplate"  class="inputField" onClick="onUndoClick('ArticleTemplatePreview0',3,0)">撤销</button>
	 				<button type='button' id="previewArticleTemplate"  class="inputField" onClick="previewTemplate(3,0)">设置</button>
	 				<button type='button' id="previewArticle"  class="inputField" onClick="preview(3,0)">预览</button>
	 				<input type="hidden" id="templateInsId03" />
	 				<input type="hidden" id="templateInsName03"/>
	 			</td>
			</tr>
			<tr>
				<td colspan="4">
					<hr style="border:1px dashed gray;"  />
				</td>
			</tr>
			<tr>
				<td  align="right">
					文章发布状态:
				</td>
				<td colspan="3">
					<input id="stateCreate"  name="articlestates" type="checkbox" value="10" style="cursor:hand;"/>新稿 
					<input id="stateDenial" name="articlestates" type="checkbox" value="20" style="cursor:hand;"/>已否  
					<input id="stateAudit" name="articlestates" type="checkbox" value="30" style="cursor:hand;"/>审核中
					<input id="statePublishing" name="articlestates" type="checkbox" value="40" style="cursor:hand;"/>待发布
					<input id="stateRelease" name="articlestates" type="checkbox" value="50" style="cursor:hand;"/>已发
					<input type="hidden" id="articleReleaseStates" name="d-0-articleReleaseStates" />
				</td>
			</tr>
			<tr>
				<td  align="right">
					文章按钮设置:
				</td>
				<td colspan="3" style="padding-top:15px;">
					<input id="Preview" name="chkBtnBox" type="checkbox" value="01" checked="checked" style="cursor:hand;"/><label for="Preview" style="cursor:hand;">预览</label>&nbsp; 
					<input id="Save" name="chkBtnBox" type="checkbox" value="02" checked="checked" style="cursor:hand;"/><label for="Save" style="cursor:hand;">保存</label>&nbsp;  
					<input id="Close" name="chkBtnBox"  type="checkbox" value="03" checked="checked" style="cursor:hand;"/><label for="Close" style="cursor:hand;">关闭</label>&nbsp;
					<input id="SaveSubmit" name="chkBtnBox" type="checkbox" value="04" style="cursor:hand;"/><label for="SaveSubmit" style="cursor:hand;">保存并提交</label>&nbsp;
					<input id="SaveCreate" name="chkBtnBox" type="checkbox" value="05" style="cursor:hand;"/><label for="SaveCreate" style="cursor:hand;">保存并新建</label>&nbsp;<br/>
					<input id="SubmitCreate" name="chkBtnBox" type="checkbox" value="06" style="cursor:hand;"/><label for="SubmitCreate" style="cursor:hand;">提交并新建</label>&nbsp;
					<input id="SaveClose" name="chkBtnBox" type="checkbox" value="07" style="cursor:hand;"/><label for="SaveClose" style="cursor:hand;">保存并关闭</label>&nbsp;
					<input id="SavePublish" name="chkBtnBox" type="checkbox" value="08" style="cursor:hand;"/><label for="SavePublish" style="cursor:hand;">保存并发布</label>&nbsp;
					<input id="ShenPi" name="chkBtnBox" type="checkbox" value="09" style="cursor:hand;"/><label for="ShenPi" style="cursor:hand;">审批</label>&nbsp;
					<input type="hidden" id="siteArticleButton" name="d-0-siteArticleButton" value=""/>
				</td>
			</tr>
			<tr>
				<td colspan="4">
					<hr style="border:1px dashed gray;" />
				</td>
			</tr>
		</table>
		<table>
			<tr>
	 			<td align="right">定时发布:	
	 				<input  type="radio" id="d-0-jobType" name="d-0-jobType" value="0"  onchange="changeJobType(0)" onClick="this.blur();" />
	 			</td>
				<td>
					不配置计划
				 </td>
			</tr>
			<tr>
	 			<td align="right">	
	 				<input  type="radio" id="d-0-jobType" name="d-0-jobType" value="1"  onchange="changeJobType(this.value)" onClick="this.blur();" />
	 			</td>
				<td>
					每天发布一次
				 </td>
				 <td>
				 <table>
				 	<tr id="jt1">
				 			<td align="right">	
				 				发布时间：
				 			</td>
							<td>
				 				<input  type="text"  name="d-0-jobStartHour1" id="d-0-jobStartHour1" style="width:30px" maxlength="2" onkeydown="if(event.keyCode==13)event.keyCode=9" onKeyPress="if ((event.keyCode<48 || event.keyCode>57)) event.returnValue=false"/>:
				 				<input  type="text"  name="d-0-jobStartMin1" id="d-0-jobStartMin1" style="width:30px" maxlength="2" onkeydown="if(event.keyCode==13)event.keyCode=9" onKeyPress="if ((event.keyCode<48 || event.keyCode>57)) event.returnValue=false"/>
							 </td>
						</tr>
				 </table>
				 </td>
			</tr>
						
			<tr>
	 			<td align="right">	
	 				<input  type="radio" id="d-0-jobType" name="d-0-jobType" value="2"  onchange="changeJobType(this.value)" onClick="this.blur();" />
	 			</td>
				<td>
					一天发布多次
				 </td>
				 <td>
				 	<table>
				 		<tr id="jt2">
				 			<td align="right">	
				 				开始时间
				 			</td>
							<td>
				 				<input  type="text"  name="d-0-jobStartHour" id="d-0-jobStartHour"  style="width:30px" maxlength="2" onkeydown="if(event.keyCode==13)event.keyCode=9" onKeyPress="if ((event.keyCode<48 || event.keyCode>57)) event.returnValue=false"/>:
				 				<input  type="text"  name="d-0-jobStartMin"  id="d-0-jobStartMin" style="width:30px" maxlength="2" onchange="changeMin()" onkeydown="if(event.keyCode==13)event.keyCode=9" onKeyPress="if ((event.keyCode<48 || event.keyCode>57)) event.returnValue=false"/>
							 </td>
						</tr>
				 	</table>
				 </td>
				 <td>
				 	<table>	
				 		<tr id="jt3">
				 			<td align="right">	
				 				结束时间
				 			</td>
							<td>
				 				<input  type="text"  name="d-0-jobEndHour" id="d-0-jobEndHour" style="width:30px" maxlength="2" onkeydown="if(event.keyCode==13)event.keyCode=9" onKeyPress="if ((event.keyCode<48 || event.keyCode>57)) event.returnValue=false"/>:
				 				<input  type="text"  name="d-0-jobEndMin" id="d-0-jobEndMin" style="width:30px" maxlength="2" onkeydown="if(event.keyCode==13)event.keyCode=9" onKeyPress="if ((event.keyCode<48 || event.keyCode>57)) event.returnValue=false"/>
							 </td>
						</tr>
				 	</table>
				 </td>
				 <td>
				 	<table>
				 		<tr id="jt4">
				 			<td align="right">	
				 				间隔时间
				 			</td>
							<td>
				 				<input  type="text"  name="d-0-jobIntervalHour" id="d-0-jobIntervalHour" style="width:30px" maxlength="2" onkeydown="if(event.keyCode==13)event.keyCode=9" onKeyPress="if ((event.keyCode<48 || event.keyCode>57)) event.returnValue=false"/>:
				 				<input  type="text"  name="d-0-jobIntervalMin" id="d-0-jobIntervalMin" style="width:30px" maxlength="2" onkeydown="if(event.keyCode==13)event.keyCode=9" onKeyPress="if ((event.keyCode<48 || event.keyCode>57)) event.returnValue=false"/>
							 </td>
						</tr>
				 	</table>
				 </td>
			</tr>
		</table>
	</div>		
 </div>
 
<EF:EFGrid blockId="result" autoDraw="no" style="navigationBar:false;operationBar:false" >
<EF:EFColumn ename="siteId" width="150" nullable="false"  cname="唯一标识" enable="false"/>
<EF:EFColumn ename="siteName" maxLength="50" minLength="1" nullable="false"  validateType="chinese_string" validateErrorPrompt="站点名称" cname="站点名称" enable="false"/>
<EF:EFColumn ename="siteAlias" maxLength="50"  minLength="1" nullable="false" validateType="chinese_string" validateErrorPrompt="存放位置" cname="存放位置" enable="false"/>
<EF:EFColumn ename="siteSeq" enable="false"/>	
<EF:EFComboColumn ename="isAnony" enable="false">
	<EF:EFOption value="0" label="否" />
	<EF:EFOption value="1" label="是" />
</EF:EFComboColumn>
<EF:EFComboColumn ename="siteState" enable="false">
	<EF:EFOption value="0" label="正常" />
	<EF:EFOption value="1" label="关闭" />
</EF:EFComboColumn>
<EF:EFComboColumn ename="isStaticRelease" enable="false">
	<EF:EFOption value="0" label="否" />
	<EF:EFOption value="1" label="是" />
</EF:EFComboColumn>

<EF:EFColumn ename="siteType" visible="false"/>
<EF:EFColumn ename="jobId" visible="false" cname="定时任务" />
<EF:EFColumn ename="jobType" visible="false"/>
<EF:EFColumn ename="jobStartHour" visible="false"/>
<EF:EFColumn ename="jobStartMin" visible="false" />
<EF:EFColumn ename="jobEndHour" visible="false" />
<EF:EFColumn ename="jobEndMin" visible="false"/>
<EF:EFColumn ename="jobIntervalHour" visible="false"/>
<EF:EFColumn ename="jobIntervalMin" visible="false"/>
<EF:EFColumn ename="siteArticleButton" visible="false"/>
<EF:EFColumn ename="articleReleaseStates" visible="false"/>

<EF:EFColumn ename="option" cname="操作" enable="false"/>	
<EF:EFColumn ename="history" cname="历史记录" />
<EF:EFColumn ename="deploy" cname="站点分发" />
<EF:EFColumn ename="siteDeployTime" cname="站点发布时间" visible="false" enable="false"/>
</EF:EFGrid>      

<EF:EFRegion/>
<jsp:include flush="false" page="../../EF/Form/iplat.ef.tail.jsp"></jsp:include>
</form>

</body>
</html>   
