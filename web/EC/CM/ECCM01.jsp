<!DOCTYPE html>
<%@ page contentType="text/html; charset=UTF-8"%>

<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld"%>
<%@ page language="java"
	import="com.baosight.iplat4j.ec.util.TemplateConstant,com.baosight.iplat4j.ec.util.ECUtil"%>
<%
	String actionUrl = request.getContextPath() + "/DispatchAction.do";

	String nodeId = request.getParameter("nodeId");
	String nodeType = request.getParameter("nodeType");
	String columnInfo = null;
	if (TemplateConstant.NODE_TYPE_SITE.equals(nodeType)) {
		columnInfo = ECUtil.SITE + "@" + nodeId;
	} else {
		columnInfo = ECUtil.COLUMN + "@" + nodeId;
	}
%>

<html>
<head>
<meta http-equiv="Content-Type" content="text/html; 
	charset=UTF-8" />
<title></title>

<script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
<script type="text/javascript" src="./EC/CM/ECCM01.js"></script>
<link href="./EC/Images/css.css" rel="stylesheet" type="text/css"/>
</head>
<body class="bodyBackground">

<form id="ECCM01" method="POST" action="<%=actionUrl%>"><input
	type="hidden" id="context" value="<%=request.getContextPath()%>">
<jsp:include flush="false" page="../../EF/Form/iplat.ef.head.jsp"></jsp:include>

<table id="mainFrameTable" width="100%" height="82%" cellpadding=1
	cellspacing=0>
	<tr height=100%>
		<td id="rightContent" width=100% vAlign="top">
		<div id="ef_region_inqu" title="查询条件" efRegionShowClear=true><EF:EFInput
			blockId="inqu_status" ename="siteId" row="0" type="hidden" /> <EF:EFInput
			blockId="inqu_status" ename="siteName" row="0" type="hidden" /> <EF:EFInput
			blockId="inqu_status" ename="parentId" row="0" type="hidden" /> <EF:EFInput
			blockId="inqu_status" ename="parentName" row="0" type="hidden" /> <EF:EFInput
			blockId="inqu_status" ename="parentType" row="0" type="hidden" /> <input
			id="columnInfo" type="hidden" value=<%=columnInfo%> /> <EF:EFInput
			blockId="" ename="columns" row="" type="hidden" /> <EF:EFInput
			blockId="inqu_status" ename="parentType" row="0" type="hidden" /> <input
			type="hidden" id="nodeId" value="<%=nodeId %>" /> <input
			type="hidden" id="nodeType" value="<%=nodeType %>" />
		<div style="overflow:hidden;width:100%">
		<table>
			<tr>
				<td nowrap width="10%">栏目名称</td>

				<td nowrap width=15%"><EF:EFInput blockId="inqu_status"
					ename="columnName" row="0" /></td>

				<td nowrap width="10%">
				&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
				所属文章审核控制</td>
				<td nowrap width=15%"><EF:EFSelect blockId="inqu_status"
					ename="isAudit" row="0">
					<EF:EFOption label="-请选择-" value="" />
					<EF:EFOption label="是" value="1" />
					<EF:EFOption label="否" value="0" />
				</EF:EFSelect></td>
				<td nowrap width="10%">所属文章引用控制</td>
				<td nowrap width=15%"><EF:EFSelect blockId="inqu_status"
					ename="isRefer" row="0">
					<EF:EFOption label="-请选择-" value="" />
					<EF:EFOption label="是" value="1" />
					<EF:EFOption label="否" value="0" />
				</EF:EFSelect></td>
			</tr>
		</table>
		</div>
		</div>
		<div id="ef_region_result" title="记录集" style="overflow:scroll"
			efRegionShowClear=false>
		<div id="ef_grid_result" title="栏目信息" style="overflow: hidden;">
		</div>
		</div>
		</td>
	</tr>
</table>



<div id="checkContent" class="efwindow">
<table width="300">
	<tr>
		<td>
		<div id="ef_region_check" title="栏目名称及栏目存放位置" style="overflow:scroll">
		<table>
			<tr>
				<td>栏目名称</td>
				<td><input type="text" id="column_name" maxlength="50"
					name="check_Content" validateType="chinese_string"
					validateErrorPrompt="栏目名称为" /></td>
			</tr>
			<tr>
				<td>栏目存放位置</td>
				<td><input type="text" id="column_alias" maxlength="50"
					name="check_Content2" validateType="string"
					validateErrorPrompt="栏目存放位置为" /></td>
			</tr>
		</table>
		</div>
		</td>
	</tr>
</table>
</div>


<div id="detail" title="栏目编辑" class="efwindow">
<table>
	<tr>
		<td>
		<div id="ef_region_detail"  style="">
		<table width="550px;">
			<tr>
				<td align="right" width="20%">所属站点:</td>
				<td width="25%">
					<input type="hidden" name="d-0-flag" id="d-0-flag"/> 
					<input type="hidden" name="d-0-siteId" id="d-0-siteId" /> 
					<input type="text" name="d-0-siteName" id="d-0-siteName" readonly="true" class="readOnly" />
					<input type="hidden" name="d-0-firsetLevelColumn" />
				</td>
				<td align="right" width="15%">父级栏目:</td>
				<td>
					<input type="hidden" name="d-0-parentId" id="d-0-parentId"/> 
					<input type="text" name="d-0-parentName" id="d-0-parentName" readonly="true" class="readOnly" />
				</td>
			</tr>
			<tr>
				<td align="right">栏目名称:</td>
				<td>
					<input type="text" id="d-0-columnName" name="d-0-columnName" class="" />
				</td>
				<td align="right">栏目序号:</td>
				<td>
					<input type="text" id="d-0-columnSeq" name="d-0-columnSeq" style="ime-mode:disabled" onkeydown="if(event.keyCode==13)event.keyCode=9" onKeyPress="if ((event.keyCode<48 || event.keyCode>57)) event.returnValue=false"> 
				</td>
			</tr>
			<tr>
				<td align="right">栏目分组:</td>
				<td>
					<input type="hidden" id="d-0-columnId" name="d-0-columnId" id="d-0-columnId"/> 
					<input type="hidden" id="d-0-columnType" name="d-0-columnType" id="d-0-columnType"/> 
					<script>
	 					function aa(){
	 						if(ef.get("d-0-columnCategory").value!='00'){
	 							document.getElementById("columnModel").style.display = "none";
	 							document.getElementById("articleModel").style.display = "none";
	 							document.getElementById("columnModel1").style.display = "none";
	 							document.getElementById("articleModel1").style.display = "none";
	 						}else{
	 							document.getElementById("columnModel").style.display = "";
	 							document.getElementById("articleModel").style.display = "";
	 							document.getElementById("columnModel1").style.display = "";
	 							document.getElementById("articleModel1").style.display = "";
	 						}
	 					}
	 				</script> 
				 	<EF:EFSelect blockId="d" ename="columnCategory" row="0" etc="onchange='aa()'">
						<EF:EFOption value="00" label="普通栏目" />
						<EF:EFOption value="01" label="虚拟栏目" />
						<EF:EFOption value="02" label="头条新闻" />
						<EF:EFOption value="04" label="图片新闻" />
					</EF:EFSelect>
				</td>
				<td align="right">存放位置:</td>
				<td>
					<input type="text" id="d-0-columnAlias" name="d-0-columnAlias" class="" onblur="value=value.replace(/[\W]/g,'');" 
					   onbeforepaste="clipboardData.setData('text',clipboardData.getData('text').replace(/[^\d]/g,''))" />(数字或字母)
				</td>
			</tr>
			<tr>
				<td align="right">需要审核:</td>
				<td>
					<EF:EFSelect blockId="d" ename="isAudit" row="0">
						<EF:EFOption label="否" value="0" />
						<EF:EFOption label="是" value="1" />
					</EF:EFSelect>
				</td>
				<td align="right">检索条件:</td>
				<td>
					<input type="hidden" id="d-0-retrievalConditionMode" name="d-0-retrievalConditionMode" />
					<input type="text" id="d-0-retrievalConditionSql" name="d-0-retrievalConditionSql" class="" />
					<button type='button' id="selectCondition" class="inputField" onClick="selectConClick()">选择</button>
				</td>
			</tr>
			<tr>
				<td align="right">允许外部引用:</td>
				<td>
					<EF:EFSelect blockId="d" ename="isRefer" row="0">
						<EF:EFOption label="是" value="1" />
						<EF:EFOption label="否" value="0" />
					</EF:EFSelect>
				</td>
				<td align="right">排序方式:</td>
				<td>
					<input type="text" id="d-0-orderCondition" name="d-0-orderCondition" class="" />
					<button type='button' id="sort" class="inputField" onClick="orderConClick()">选择</button>
				</td>
			</tr>
			<tr>
				<td align="right">允许匿名访问:</td>
				<td>
					<EF:EFSelect blockId="d" ename="isAnony" row="0">
						<EF:EFOption label="是" value="1" />
						<EF:EFOption label="否" value="0" />
					</EF:EFSelect>
				</td>
				<td colspan="2"></td>
			</tr>
			<tr>
				<td id="columnModel" align="right">栏目首页模板:
					<input type="hidden" id="templatelink_nodeId" name="templatelink_nodeId" />
				</td>
				<td id="columnModel1" colspan="3">
					<input type="text" id="ColumnTemplatePreview" readOnly class="readOnly" /><!--style="cursor:hand" onClick="previewTemplate(1,1)" -->
					<button type='button' id="ColumnTemplateIns" class="inputField" onClick="selectTemplateIns('ColumnTemplatePreview',1)">选择</button>
					<button type='button' id="ColumnTemplate" class="inputField" onClick="selectTemplate('ColumnTemplatePreview',1)">新增</button>
					<button type='button' id="undoColumnTemplate" class="inputField" onClick="onUndoClick('ColumnTemplatePreview',1,1)">撤销</button>
					<button type='button' id="previewColumnTemplate" class="inputField" onClick="previewTemplate(1,1)">设置</button>
					<button type='button' id="previewColumn" class="inputField" onClick="preview(1,1)">预览</button>
					<input type="hidden" id="templateInsId1" /> 
					<input type="hidden" id="templateInsName1" />
				</td>
			</tr>
			<tr>
				<td id="articleModel" align="right">文章明细模板:</td>
				<td id="articleModel1" colspan="3">
					<input type="text" id="ArticleTemplatePreview" readOnly class="readOnly" /><!--style="cursor:hand" onClick="previewTemplate(3,1)" -->
					<button type='button' id="ArticleTemplateIns" class="inputField" onClick="selectTemplateIns('ArticleTemplatePreview',3)">选择</button>
					<button type='button' id="ArticleTemplate" class="inputField" onClick="selectTemplate('ArticleTemplatePreview',3)">新增</button>
					<button type='button' id="undoArticleTemplate" class="inputField" onClick="onUndoClick('ArticleTemplatePreview',3,1)">撤销</button>
					<button type='button' id="previewArticleTemplate" class="inputField" onClick="previewTemplate(3,1)">设置</button>
					<button type='button' id="previewArticle" class="inputField" onClick="preview(3,1)">预览</button>
					<input type="hidden" id="templateInsId3" /> 
					<input type="hidden" id="templateInsName3" />
				</td>
			</tr>
		</table>
		<table>
			<tr>
				<td align="right" style="padding-left:10px;">定时任务:
					<input type="radio" id="d-0-jobType" name="d-0-jobType" value="0" class="" onchange="changeJobType(0)" onClick="this.blur();" />
				</td>
				<td>不配置计划</td>
			</tr>
			<tr>
				<td align="right">
					<input type="radio" id="d-0-jobType" name="d-0-jobType" value="1" class="" onchange="changeJobType(this.value)" onClick="this.blur();" />
				</td>
				<td>每天发布一次</td>
				<td>
				<table>
					<tr id="jt1">
						<td align="right">发布时间：</td>
						<td>
							<input type="text" name="d-0-jobStartHour1" id="d-0-jobStartHour1" class="" style="width:30px" maxlength="2" alt="时" onkeydown="if(event.keyCode==13)event.keyCode=9" onKeyPress="if ((event.keyCode<48 || event.keyCode>57)) event.returnValue=false"/>: 
							<input type="text" name="d-0-jobStartMin1" id="d-0-jobStartMin1" class="" style="width:30px" maxlength="2" alt="分" onkeydown="if(event.keyCode==13)event.keyCode=9" onKeyPress="if ((event.keyCode<48 || event.keyCode>57)) event.returnValue=false"/></td>
					</tr>
				</table>
				</td>
			</tr>
			<tr>
				<td align="right">
					<input type="radio" id="d-0-jobType" name="d-0-jobType" value="2" class="" onchange="changeJobType(this.value)" onClick="this.blur();" />
				</td>
				<td>一天发布多次</td>
				<td>
				<table>
					<tr id="jt2">
						<td align="right">开始时间</td>
						<td>
							<input type="text" name="d-0-jobStartHour" id="d-0-jobStartHour" class="" style="width:30px" maxlength="2" alt="时" onkeydown="if(event.keyCode==13)event.keyCode=9" onKeyPress="if ((event.keyCode<48 || event.keyCode>57)) event.returnValue=false"/>: 
							<input type="text" name="d-0-jobStartMin" id="d-0-jobStartMin" class="" style="width:30px" maxlength="2" alt="分" onkeydown="if(event.keyCode==13)event.keyCode=9" onKeyPress="if ((event.keyCode<48 || event.keyCode>57)) event.returnValue=false"/>
						</td>
					</tr>
				</table>
				</td>
				<td>
				<table>
					<tr id="jt3">
						<td align="right">结束时间</td>
						<td>
							<input type="text" name="d-0-jobEndHour" id="d-0-jobEndHour" class="" style="width:30px" maxlength="2" alt="时" onkeydown="if(event.keyCode==13)event.keyCode=9" onKeyPress="if ((event.keyCode<48 || event.keyCode>57)) event.returnValue=false"/>: 
							<input type="text" name="d-0-jobEndMin" id="d-0-jobEndMin" class="" style="width:30px" maxlength="2" alt="分" onkeydown="if(event.keyCode==13)event.keyCode=9" onKeyPress="if ((event.keyCode<48 || event.keyCode>57)) event.returnValue=false"/>
						</td>
					</tr>
				</table>
				</td>
				<td>
				<table>
					<tr id="jt4">
						<td align="right">间隔时间</td>
						<td>
							<input type="text" name="d-0-jobIntervalHour" id="d-0-jobIntervalHour" class="d-0-jobIntervalHour" style="width:30px" maxlength="2" alt="时" onkeydown="if(event.keyCode==13)event.keyCode=9" onKeyPress="if ((event.keyCode<48 || event.keyCode>57)) event.returnValue=false"/>: 
							<input type="text" name="d-0-jobIntervalMin" id="d-0-jobIntervalMin" class="d-0-jobIntervalMin" style="width:30px" maxlength="2" alt="分" onkeydown="if(event.keyCode==13)event.keyCode=9" onKeyPress="if ((event.keyCode<48 || event.keyCode>57)) event.returnValue=false"/>
						</td>
					</tr>
				</table>
				</td>
			</tr>
		</table>
		</div>
		</td>
	</tr>
</table>
</div>

		<EF:EFRegion /> 
			<input type="hidden" id="hdIsIncre" name="isIncre" />
			<input type="hidden" id="hdIsMainOnly" name="isMainOnly" /> 
		<EF:EFGrid blockId="result" ajax="true" autoDraw="false" style="operationBar:false;">
			<EF:EFColumn ename="columnId" width="150" cname="栏目ID" enable="false"/>
			<EF:EFColumn ename="columnName" width="150" cname="栏目名称" nullable="false" maxLength="50" minLength="1" validateType="chinese_string" validateErrorPrompt="栏目名称" enable="false"/>
			<EF:EFComboColumn ename="columnCategory" cname="栏目分组" enable="false">
				<EF:EFOption value="00" label="普通栏目" />
				<EF:EFOption value="01" label="虚拟栏目" />
				<EF:EFOption value="02" label="头条新闻" />
				<EF:EFOption value="04" label="图片新闻" />
			</EF:EFComboColumn>
			<EF:EFComboColumn ename="isAudit" cname="审核控制" width="70" enable="false">
				<EF:EFOption value="0" label="否" />
				<EF:EFOption value="1" label="是" />
			</EF:EFComboColumn>
			<EF:EFComboColumn ename="isRefer" cname="引用控制" width="70" enable="false">
				<EF:EFOption value="0" label="否" />
				<EF:EFOption value="1" label="是" />
			</EF:EFComboColumn> 
			<EF:EFComboColumn ename="isAnony" cname="允许匿名浏览" width="100" enable="false">
				<EF:EFOption value="0" label="否" />
				<EF:EFOption value="1" label="是" />
			</EF:EFComboColumn>

			<EF:EFColumn ename="columnSeq" cname="排序标识" width="70" enable="false"/>
			<EF:EFColumn ename="uploadColumnImg" cname="操作" enable="fasle" width="280" />
			
			<EF:EFColumn ename="jobType" visible="false" />
			<EF:EFColumn ename="parentType" cname="父结点类型" visible="fasle" />
			<EF:EFColumn ename="parentID" cname="父结点ID" visible="fasle" />
			<EF:EFColumn ename="siteID" cname="所属站点ID" visible="fasle" />
			<EF:EFColumn ename="columnPath" cname="栏目路径" visible="fasle" />
			<EF:EFColumn ename="columnImg" cname="对应图片" visible="fasle" />
			<EF:EFColumn ename="viewColumnImg" cname="查看" enable="fasle" width="50" visible="false" />
			<EF:EFColumn ename="columnAlias" cname="栏目存放位置" nullable="false" maxLength="50" minLength="1" validateType="string" validateErrorPrompt="栏目存放位置" visible="false" />
			<EF:EFColumn ename="siteName" cname="站点名称" visible="false" />
			<EF:EFColumn ename="parentName" visible="false" />
			<EF:EFColumn ename="creater" visible="false" />
			<EF:EFColumn ename="columnCategory" visible="false" />
			<EF:EFColumn ename="jobId" visible="false" />
			<EF:EFColumn ename="jobStartHour" visible="false" />
			<EF:EFColumn ename="jobStartMin" visible="false" />
			<EF:EFColumn ename="jobEndHour" visible="false" />
			<EF:EFColumn ename="jobEndMin" visible="false" />
			<EF:EFColumn ename="jobIntervalHour" visible="false" />
			<EF:EFColumn ename="jobIntervalMin" visible="false" />
			<EF:EFColumn ename="orderCondition" visible="false" />
			<EF:EFColumn ename="jobCancelTime" visible="false" />
			<EF:EFColumn ename="retrievalConditionSrc" visible="false" />
			<EF:EFColumn ename="retrievalConditionSql" visible="false" />
			<EF:EFColumn ename="retrievalConditionMode" visible="false" />
			<EF:EFColumn ename="columnType" cname="栏目类型" width="100" enable="false" visible="fasle"/>
		</EF:EFGrid> 
		<jsp:include flush="false" page="../../EF/Form/iplat.ef.tail.jsp"></jsp:include>
		</form>
</body>
</html>
