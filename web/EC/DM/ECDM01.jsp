<!DOCTYPE html>
<%@page contentType="text/html; charset=UTF-8"%>
<%@taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>
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
	<script type="text/javascript" src="./EC/DM/ECDM01.js"></script>
	
</head>
<body class="bodyBackground">

<form id="ECDM01" method="POST" action="<%=actionUrl%>" >
<jsp:include flush="false" page="../../EF/Form/iplat.ef.head.jsp"></jsp:include>
<div id = "ef_region_all" title="文档维护" efRegionShowClear=false>

   <div id="ef_region_main">
        <table id="mainFrameTable" width="100%"  height="82%" cellpadding=1 cellspacing=0 >
    	  <tr height=100%>
    	     <td id="leftTree" vAlign="top" >
              <div id="leftTreeDiv" class="ef-tree-div" style='overflow:auto;width:200px;height:100%;'>
    		    <EF:EFTree model="tableTreeModel" id="nTree" text="文档分类树" configFunc="configTree">
    		    </EF:EFTree>
    		  </div>
    		                    
    		 </td>
    		 
    		<td id="middleSplitter" width="4px" vAlign="middle" style='cursor:e-resize'>
    		  <IMG src="./EF/Images/vgrabber.gif" >
            </td>
    		
    		<td id="rightContent" width=100%  vAlign="top" >
			 <div id="fileType">
			 <div id = "ef_region_inqu" title="查询条件" efRegionShowClear=true>
			 <EF:EFInput blockId="inqu_status" ename="parentType" row="0" type="hidden" />
				<div style="overflow:hidden;width:100%">
					<table>
					  <tr>
			            <td nowrap width="15%">
			             类别名称
			            </td>
			            <td nowrap width="20%">
			            <EF:EFInput blockId="inqu_status" ename="typeName" row="0" />
			            </td>
			            </tr>
			         </table>
				</div>
			</div>
			
			<div id = "ef_region_result" title="记录集" style="overflow:scroll"> 
				<div id = "ef_grid_result" title="页面信息" style="overflow: hidden;height:300px;">
				</div> 
			</div>     
			</div>
			<div id="file">
			<div id = "ef_region_inqu1" title="查询条件" efRegionShowClear=true>
			 <EF:EFInput blockId="inqu1_status" ename="typeId" row="0" type="hidden" />
			 <EF:EFInput blockId="inqu1_status" ename="parentType" row="0" type="hidden" />
			 
				<div style="overflow:hidden;width:100%">
					<table>
					  <tr>
			            <td nowrap width="15%">
			              文件名称
			            </td>
			            <td nowrap width="20%">
			            <EF:EFInput blockId="inqu1_status" ename="fileName" row="0" />
			            </td>
			           <td nowrap width="15%">
					   创建起始时间
					   </td>
					   <td nowrap width=25%">
					   <EF:EFInput blockId="inqu1_status" ename="recCreateTimeStart" row="0" popup="date" etc="maxLength='8' size='8' readOnly"/>
					    </td>
						<td nowrap width="15%">
						创建截止时间
						 </td>
						 <td nowrap width=25%">
						<EF:EFInput blockId="inqu1_status" ename="recCreateTimeEnd" row="0" popup="date" etc="maxLength='8' size='8' readOnly"/>
						 </td>
			            </tr>
			         </table>
				</div>
			</div>
			<div id = "ef_region_result1" title="记录集" style="overflow:scroll"> 
	           <div id = "ef_grid_result1" title="页面信息" style="overflow: hidden;height:300px;">
	           </div> 
			</div>
			</div>
            </td>
    	  </tr>
        </table>
	</div>  
</div>
  
<EF:EFRegion/>
<EF:EFGrid blockId="result" autoDraw="yes" ajax="true">
<EF:EFColumn ename="typeId" visible="false"/>
<EF:EFColumn ename="parentType" visible="false"/>
<EF:EFColumn ename="typeName" sort="true" nullable="false" maxLength="50" minLength="1"/>
<EF:EFColumn ename="typeDes" editType="textarea" width="500" maxLength="100"/>
</EF:EFGrid>
<EF:EFGrid blockId="result1" autoDraw="false"  ajax="true" style="operationBar:false" >
<EF:EFColumn ename="fileId" visible="false" />
<EF:EFColumn ename="typeId" visible="false"/>
<EF:EFColumn ename="filePath" visible="false"/>
<EF:EFColumn ename="recCreator" visible="false"/>
<EF:EFColumn ename="fileName"  enable="false" sort="true"/>
<EF:EFColumn ename="fileDes" editType="textarea" width="200" maxLength="100" validateErrorPrompt="长度"/>
<EF:EFColumn ename="fileSize" readonly="true"/>
<EF:EFColumn ename="recCreateTime" width="150" readonly="true"/>
<EF:EFColumn ename="preview" cname="预览" width="150" align="left" enable="false"/>
</EF:EFGrid>	

     
<jsp:include flush="false" page="../../EF/Form/iplat.ef.tail.jsp"></jsp:include>
</form>

</body>
</html>   
