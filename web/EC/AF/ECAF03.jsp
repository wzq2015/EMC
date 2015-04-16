<!DOCTYPE html>
<%@ page contentType="text/html; charset=UTF-8"%>

<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>
<%
	String actionUrl = request.getContextPath() + "/DispatchAction.do";
	String url =request.getContextPath() + "/DispatchAction.do?efFormEname=ECAM01&methodName=query";
%>

<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; 
	charset=UTF-8" />
	<title>
	</title>
	
	<script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
	<script type="text/javascript" src="./EC/AF/ECAF03.js"></script>
	
</head>
<body class="bodyBackground">

<form id="ECAF03" method="POST" action="<%=actionUrl%>" >


<input type="hidden" name="inqu_status-0-columnCategory" id="inqu_status-0-columnCategory" value="00"/>
<input type="hidden" id="nodeType" value="c"/>
 <EF:EFInput blockId="inqu_status" ename="columnId" row="0" type="hidden" />
 <input type="hidden" id="url" value="<%=url%>"/>
<jsp:include flush="false" page="../../EF/Form/iplat.ef.head.jsp"></jsp:include>

<div id = "ef_region_all" title="公告管理">
	<div id="ef_region_main">
        <table id="mainFrameTable" width="100%"  height="82%" cellpadding=1 cellspacing=0 >
    	  <tr>
    	   <td id="leftTree" vAlign="top" >
              <div id="leftTreeDiv" class="ef-tree-div" style='overflow:auto;width:200px;height:100%;'>
    		    <EF:EFTree model="tableTreeModel" id="nTree" text="站点树" configFunc="configTree">
    		    </EF:EFTree>
    		  </div>
    		                    
    		 </td>
    		 
    		<td id="middleSplitter" width="4px" vAlign="middle" style='cursor:e-resize'>
    		  <IMG src="./EF/Images/vgrabber.gif" >
            </td>
    		
    		<td id="rightContent" width="100%" height="100%" vAlign="top" >
    		
			  <iframe style="height:600px" id="mainFrame" name="mainFrame" marginWidth="0" marginHeight="0" src="" frameBorder="0" width="100%" scrolling="auto" height="100%"> </iframe>
            </td>
            
    	  </tr>
        </table>
	</div>
</div>  


<EF:EFRegion/>
<EF:EFGrid blockId="result" ajax="true" autoDraw="false" >
<EF:EFColumn ename="articleTitle" cname="公告标题" nullable="false" readonly="true" maxLength='50' minLength='1'/>
<EF:EFColumn ename="author" cname="公告作者" readonly="true" maxLength='20'/>
<EF:EFComboColumn ename="articleState" cname="公告状态" valueProperty="value" labelProperty="label" enable="false" >
  	<EF:EFOption label="" value=""></EF:EFOption>
  	<EF:EFOption label="新稿" value="10"></EF:EFOption>
  	<EF:EFOption label="已否" value="20"></EF:EFOption>
	<EF:EFOption label="审核中" value="30"></EF:EFOption>
	<EF:EFOption label="待发布" value="40"></EF:EFOption>
	<EF:EFOption label="已发" value="50"></EF:EFOption>
</EF:EFComboColumn>
<EF:EFColumn ename="articleSeq" cname="文章排序标识" maxLength='16'/>
<EF:EFColumn ename="auditer" cname="审核人" enable="false"/>
<EF:EFColumn ename="recCreateTime" cname="创建时间" enable="false"  editType="date" />
<EF:EFColumn ename="recCreator" cname="录入人" enable="false"/>
<EF:EFColumn ename="isRefer" cname="是否引用" visible="false"/>
<EF:EFColumn ename="columnId" cname="栏目id"   visible="false"/>
<EF:EFColumn ename="articleId" cname="文章ID"   visible="false" />
<EF:EFColumn ename="edit" cname="编辑" align="right" enable="false"/>
</EF:EFGrid>      


<jsp:include flush="false" page="../../EF/Form/iplat.ef.tail.jsp"></jsp:include>
</form>

</body>
</html>   
