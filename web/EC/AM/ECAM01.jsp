<!DOCTYPE html>
<%@ page contentType="text/html;charset=UTF-8"%>
<%@ page language="java" import="java.io.File"%>
<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>
<%
	String actionUrl = request.getContextPath() + "/DispatchAction.do";
	String nodeId = request.getParameter("nodeId");
	String webPath = request.getRealPath(request.getContextPath());
	webPath=webPath.substring(0,webPath.lastIndexOf(File.separator)); 
%>

<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; 
	charset=UTF-8" />
	<title>
	</title>
	
	<script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
	<script type="text/javascript" src="./EC/AM/ECAM01.js"></script>
	
</head>
<body class="bodyBackground">

<form id="ECAM01" method="POST" action="<%=actionUrl%>" enctype="multipart/form-data" target="uploadArtilceIframe">
   <EF:EFInput blockId="inqu_status" ename="articleIdList" row="0" type="hidden"/>
   <EF:EFInput blockId="inqu_status" ename="typeList" row="0" type="hidden" />
   <EF:EFInput blockId="inqu_status" ename="idList" row="0" type="hidden" />
   <EF:EFInput blockId="inqu_status" ename="descList" row="0" type="hidden" />
	
   <input id='url' type="hidden" value="<%=actionUrl %>">
   <input id='webPath' type="hidden" value="<%=webPath %>">
<jsp:include flush="false" page="../../EF/Form/iplat.ef.head.jsp"></jsp:include>
 
        <table id="mainFrameTable" width="100%"  height="82%" cellpadding=1 cellspacing=0 >
    	  <tr height=100%>
    		<td id="middleSplitter" width="4px" vAlign="middle" style='cursor:e-resize'>
    		  <IMG src="./EF/Images/vgrabber.gif" >
            </td>
    		
    		<td id="rightContent" width=100%  vAlign="top" >
    		<div id = "ef_region_inqu" title="查询条件" efRegionShowClear=true>
    		   <EF:EFInput blockId="inqu_status" ename="columnId" row="0" type="hidden" />
    		   <input type="hidden" id="nodeId" value="<%=nodeId %>"/>
			  <div style="overflow:hidden;width:100%">
						<table>
						  <tr>
						    <td nowrap width="15%">
						     文章标题
						    </td>
						    <td nowrap width=25%">
						    <EF:EFInput blockId="inqu_status" ename="articleTitle" row="0" />
						    </td>
                            <td nowrap width="15%">
						     文章作者
						    </td>
						    <td nowrap width=25%">
						    <EF:EFInput blockId="inqu_status" ename="author" row="0" />
						    </td>
						    <td nowrap width="15%">
						     文章状态
						    </td>
						    <td nowrap width=25%">
						    <EF:EFSelect blockId="inqu_status" ename="articleState" row="0">
						    <EF:EFOption label="" value=""></EF:EFOption>
						    <EF:EFOption label="新稿" value="10"></EF:EFOption>
						    <EF:EFOption label="已否" value="20"></EF:EFOption>
						    <EF:EFOption label="审核中" value="30"></EF:EFOption>
						    <EF:EFOption label="待发布" value="40"></EF:EFOption>
						    <EF:EFOption label="已发" value="50"></EF:EFOption>
						    </EF:EFSelect>
						    </td>
						  </tr>
						  <tr>
						    <td nowrap width="15%">
						     创建起始时间
						    </td>
						    <td nowrap width=25%">
						    <EF:EFInput blockId="inqu_status" ename="recCreateTimeStart" row="0" popup="date" etc="maxLength='8' size='8'"/>
						    </td>
						     <td nowrap width="15%">
						     创建截止时间
						    </td>
						    <td nowrap width=25%">
						    <EF:EFInput blockId="inqu_status" ename="recCreateTimeEnd" row="0" popup="date" etc="maxLength='8' size='8'"/>
						    </td>
						  </tr>
						</table>
					</div>
				</div>  
			  <div id = "ef_region_result" title="记录集" style="overflow:scroll" efRegionShowClear=false> 
				<div id = "ef_grid_result" title="文章信息" style="overflow: hidden;">
				</div>
			  </div>  
            </td>
    	  </tr>
        </table>


   <%--
       ================================加入文章的导出功能 start
    --%>
    
    	<div id="exportArticle" class="efwindow">
			<table width="300">
						<tr>
								<td>
										<div id="ef_region_expart" title="文章导出" style="overflow:scroll">
											 <table>
													<tr>
															<td width="100%">
															<input type="radio" id="exportDirect" name="expType"
																value="0" class="inputField" checked="checked"/>导出直属文章
															</td>
													 </tr>
													<tr>
														<td width="100%">
														<input type="radio" id="exportAllChild" name="expType"
															value="1" class="inputField"/>导出所有下级文章(包含子栏目下的)
														
														</td>
													</tr>
													<tr>
													<td width="100%">
														
														<input type="radio" id="exportChecked" name="expType"
															value="2" class="inputField"/>导出选中的记录
														
													</td>
													</tr>
													
												 </table>
										</div>
								</td>
				</tr>
			</table>
	</div>
      <iframe id = "downloadObject" width=0 height=0></iframe>
   <%--
       ================================ 文章的导出功能 end
    --%>
    
       <%--
       ================================加入文章的导入功能 start
    --%>
    
    	<div id="importArticle" class="efwindow">
			<table width="300">
						<tr>
								<td>
										<div id="ef_region_impart" title="请选择导入文章(Zip格式)" style="overflow:scroll">
											 <table>
													<tr>
															<td width="100%">
															<input type="file" name="importFile" id="importFile" contenteditable="false">
															</td>
													 </tr>
												 </table>
										</div>
								</td>
				</tr>
			</table>
	</div>
   
   <%--
       ================================ 文章的导入功能 end
    --%>


<div id="templatelink" title="模板关联设置" class="efwindow">
	<div id = "ef_region_templatelink"  style="width:600px">
		 	<table width="100%">
				<tr>
					<td>
			 			文章明细模板:
			 			<input type="hidden" id="templatelink_nodeId" name="templatelink_nodeId"/>
					</td>
						 
			 		<td>
			 			<input type="text" id="ArticleTemplatePreview" readOnly/><!--style="cursor:hand" onclick="previewTemplate(3,2)"-->
			 			<button type='button' id="ArticleTemplateIns"  class="inputField" onClick="selectTemplateIns('ArticleTemplatePreview',3)">选择</button>
			 			<button type='button' id="ArticleTemplate"  class="inputField" onClick="selectTemplate('ArticleTemplatePreview',3)">新增</button>
			 			<button type='button' id="undoArticleTemplate"  class="inputField" onClick="onUndoClick('ArticleTemplatePreview',3,2)">撤销</button>
			 			<button type='button' id="previewArticleTemplate"  class="inputField" onClick="previewTemplate(3,2)">设置</button>
			 			<button type='button' id="previewArticle"  class="inputField" onClick="preview(3,2)">预览</button>
			 			<input type="hidden" id="templateInsId3" />
			 			<input type="hidden" id="templateInsName3"/>
			 		</td>
				</tr>
			</table>
	</div>		
 </div>

<EF:EFRegion/>
<EF:EFGrid blockId="result" ajax="true" autoDraw="false" style="operationBar:false" >
<EF:EFColumn ename="articleTitle" cname="文章标题" nullable="false" width="200" readonly="true"/>
<EF:EFColumn ename="author" cname="文章作者" readonly="true"/>
<EF:EFComboColumn ename="articleState" cname="文章状态" valueProperty="value" labelProperty="label" enable="false" >
  	<EF:EFOption label="" value=""></EF:EFOption>
  	<EF:EFOption label="新稿" value="10"></EF:EFOption>
  	<EF:EFOption label="已否" value="20"></EF:EFOption>
	<EF:EFOption label="审核中" value="30"></EF:EFOption>
	<EF:EFOption label="待发布" value="40"></EF:EFOption>
	<EF:EFOption label="已发" value="50"></EF:EFOption>
</EF:EFComboColumn>
<EF:EFColumn ename="articleSeq" cname="文章排序标识"/>
<EF:EFColumn ename="auditer" cname="审核人" enable="false"/>
<EF:EFColumn ename="recCreateTime" cname="创建时间" width="150" enable="false"  editType="date" dateFormatString="yyyy-MM-dd hh:mm:ss"/>
<EF:EFColumn ename="recCreator" cname="录入人" enable="false"/>
<EF:EFColumn ename="isRefer" cname="是否引用" visible="false"/>
<EF:EFColumn ename="columnId" cname="栏目id"   visible="false"/>
<EF:EFColumn ename="articleId" cname="文章ID"   visible="false" />
<EF:EFColumn ename="edit" cname="操作" width="150" align="right" enable="false"/>
</EF:EFGrid>      
 
 <iframe id="uploadArtilceIframe" name="uploadArtilceIframe" style="display:none"/>
<jsp:include flush="false" page="../../EF/Form/iplat.ef.tail.jsp"></jsp:include>
</form>

</body>
</html>   
