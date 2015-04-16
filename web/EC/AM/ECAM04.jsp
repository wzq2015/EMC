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
	<script type="text/javascript" src="./EC/AM/ECAM04.js"></script>
	
</head>
<body class="bodyBackground">

<form id="ECAM04" method="POST" action="<%=actionUrl%>" >

<jsp:include flush="false" page="../../EF/Form/iplat.ef.head.jsp"></jsp:include>

<div id = "ef_region_all" title="文章维护" efRegionShowClear=false>
	<div id="ef_region_main">
        <table id="mainFrameTable" width="100%"  height="82%" cellpadding=1 cellspacing=0 >
    	  <tr height=100%>
    	     <td id="leftTree" vAlign="top" >
               <div id="leftTreeDiv" class="ef-tree-div" style='overflow:auto;width:200px;height:100%;'>
    		    <EF:EFTree model="tableTreeModel" id="nTree" text="站点栏目树" configFunc="configTree">
    		    </EF:EFTree>
    		  </div>
    		                    
    		 </td>
    		 
    		<td id="middleSplitter" width="4px" vAlign="middle" style='cursor:e-resize'>
    		  <IMG src="./EF/Images/vgrabber.gif" >
            </td>
    		
    		<td id="rightContent" width=100%  vAlign="top" >
    		<div id = "ef_region_inqu" title="查询条件" efRegionShowClear=true>
    		   <EF:EFInput blockId="inqu_status" ename="columnId" row="0" type="hidden" />
    		  <EF:EFInput blockId="inqu_status" ename="referColumnId" row="0" type="hidden" />
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
				<div id = "ef_grid_result" title="文章信息" style="overflow: hidden;height:400px;">
				</div>
			  </div>  
            </td>
    	  </tr>
        </table>
	</div>
</div>  
 <div id="checkContent" class="efwindow">
 	<table width="300"><tr>
		<td>
		<div id = "ef_region_check" title="审核" style="overflow:scroll">
		 <table>
			<tr>
			<td>	
			<input  type="radio" id="check_pass" name="check_Content" value="0" class="inputField"  />通

过
			</td>
			<td>
			<input  type="radio" id="check_unpass" name="check_Content" value="1" class="inputField"  

checked/>不通过
			</td>
			</tr>
			</table>
		</div>		
		
		</td> 	
 	</tr>
 	</table>	
 </div>
<EF:EFRegion/>
<EF:EFGrid blockId="result" ajax="true" autoDraw="false" >
<EF:EFColumn ename="articleTitle" cname="文章标题" nullable="false"/>
<EF:EFColumn ename="author" cname="文章作者"/>
<EF:EFComboColumn ename="articleState" cname="文章状态" valueProperty="value" labelProperty="label" enable="false">
  <EF:EFOption label="" value=""></EF:EFOption>
   <EF:EFOption label="新稿" value="10"></EF:EFOption>
   <EF:EFOption label="已否" value="20"></EF:EFOption>
   <EF:EFOption label="审核中" value="30"></EF:EFOption>
   <EF:EFOption label="待发布" value="40"></EF:EFOption>
   <EF:EFOption label="已发" value="50"></EF:EFOption>
</EF:EFComboColumn>
<EF:EFColumn ename="auditer" cname="审核人" enable="false"/>
<EF:EFColumn ename="recCreateTime" cname="创建时间" enable="false"/>
<EF:EFColumn ename="recCreator" cname="录入人" enable="false"/>
<EF:EFColumn ename="isRefer" cname="是否引用" visible="false"/>
<EF:EFColumn ename="articleId" cname="文章ID"  visible="false"/>
</EF:EFGrid>      
<jsp:include flush="false" page="../../EF/Form/iplat.ef.tail.jsp"></jsp:include>
</form>

</body>
</html>   
