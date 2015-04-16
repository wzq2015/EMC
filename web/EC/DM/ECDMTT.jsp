<!DOCTYPE html>
<%@page contentType="text/html; charset=UTF-8"%>
<%@ page language="java" import="com.baosight.iplat4j.core.threadlocal.*"%>
<%@taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>
<%
	String actionUrl = request.getContextPath() + "/DispatchAction.do";
	String type = request.getParameter("type");
	String userId = UserSession.getLoginName();
	
%>

<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; 
	charset=UTF-8" />
	<title>
	</title>
	
	<script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
	<script type="text/javascript" src="./EC/DM/ECDMTT.js"></script>
	<base target="_self">
</head>
<body class="bodyBackground">

<form id="ECDMTT" method="POST" action="<%=actionUrl%>" >

<jsp:include flush="false" page="../../EF/Form/iplat.ef.head.jsp"></jsp:include>
<div id = "ef_region_all" title="文档维护" efRegionShowClear=false>

   <div id="ef_region_main">
        <table id="mainFrameTable" width="100%"  height="82%" cellpadding=1 cellspacing=0 >
    	  <tr height=100%>
    	    <td id="leftTree" vAlign="top" >
              <div id="leftTreeDiv" class="ef-tree-div" style='overflow:auto;width:200px;height:100%;'>
    		   <div id="nTree"> </div>
    		  </div>                  
    		 </td>
    		 
    		<td id="middleSplitter" width="4px" vAlign="middle" style='cursor:e-resize'>
    		  <IMG src="./EF/Images/vgrabber.gif" >
            </td>
    		
    		<td id="rightContent" width=80%  vAlign="top" >
    		<input value="<%=userId%>" id="userId" name="userId" type="hidden"/>
    		 <input type="hidden" id="type" name="type" value="<%=type%>">
			 <EF:EFInput blockId="inqu_status" ename="typeId" row="0" type="hidden" />

<div id = "ef_region_inqu" title="查询条件" efRegionShowClear=true efRegionSave=true>
	<div id = "ef_div_inqu" style="overflow:hidden;">
		<table>
		  <tr>
		    <td>
		      	文件名称:
		    </td>
		    <td>
		    	<EF:EFInput blockId="inqu_status" ename="fileName" row="0"/>
		    </td>
		    <td>
		      	文件描述:
		    </td>
		    <td>
		    	<EF:EFInput blockId="inqu_status" ename="fileDes" row="0"/>
		    </td>
		  </tr>
		</table>
	</div>
</div> 
			 <div id = "ef_region_result" title="记录集" style="overflow:scroll"> 
				<div id = "ef_grid_result" title="页面信息" style="overflow: hidden;height:300px;">
				</div> 
			</div>     
            </td>
    	  </tr>
        </table>
	</div>  
</div>
  
<EF:EFRegion/>
<EF:EFGrid blockId="result"  ajax="true" style="operationBar:false">
<EF:EFColumn ename="fileId" visible="false"/>
<EF:EFColumn ename="typeId" visible="false"/>
<EF:EFColumn ename="filePath" visible="false"/>
<EF:EFColumn ename="recCreator" visible="false"/>
<EF:EFColumn ename="fileName" sort="true" enable="false"/>
<EF:EFColumn ename="fileDes" editType="textarea" width="300" enable="false"/>
<EF:EFColumn ename="fileSize" readonly="true"/>
<EF:EFColumn ename="recCreateTime" enable="false"/>
<EF:EFColumn ename="preview" cname="预览" align="right" enable="false"/>
<EF:EFColumn ename="dele" cname="删除" align="right" enable="false"/>
</EF:EFGrid>	

   
<jsp:include flush="false" page="../../EF/Form/iplat.ef.tail.jsp"></jsp:include>
 
</form>

</body>
</html>   
