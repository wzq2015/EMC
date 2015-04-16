<!DOCTYPE html>
<%@page pageEncoding="UTF-8" contentType="text/html;charset=UTF-8"%>
<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>

<%
	String contextpath = request.getContextPath();
	String baseUrl = contextpath;
	String listUrl = baseUrl + "/DispatchAction.do";
%>

<html>
 <head>	
  <script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
  <script type="text/javascript" src="./EC/SM/ECSM03.js"></script>
 </head>
 
 <body class="bodyBackground">  
  <form method="POST" action="<%=listUrl%>">
    <jsp:include flush="false" page="../../EF/Form/iplat.ef.head.jsp"></jsp:include>
    <EF:EFInput blockId="inqu_status" row=""  ename="target" type="hidden"></EF:EFInput>
    <EF:EFInput blockId="inqu_status" row="0" ename="parent" type="hidden"/>
    <EF:EFInput blockId="inqu_status" row="0" ename="pnode" type="hidden"/>
    <EF:EFInput blockId="inqu_status" row="0" ename="page" type="hidden"/>
    <EF:EFInput blockId="inqu_status" row="0" ename="authorize" type="hidden"/>
    <EF:EFInput blockId="inqu_status" row="0" ename="pageType" type="hidden"/>
    <EF:EFInput blockId="inqu_status" row="" ename="type" type="hidden"/>
    <table width="100%"  height="100%">      
	  <tr height=100%>
		  <td width="70%" valign="top">
		         <div id = "ef_region_result" title="站点权限信息" efRegionShowClear=false>		         
                    <div id = "ef_grid_p" title="站点权限信息" style="overflow: hidden;height:450px;">
                    </div>
                 </div>
		   </td>
		    <td width="30%" valign="top">
		    <div id = "ef_region_show" title="权限查看" efRegionShowClear=false>		         
	              <div id = "ef_grid_c" title="权限查看" style="overflow: hidden;height:200px;">	                    
                  </div>
              </div>
                  
			   <div id = "ef_region_auth" title="批量授权" efRegionShowClear=false>	               	   
		          <div id = "ef_grid_r" title="批量授权" style="overflow: hidden;height:200px;">
	              </div>
	           </div>	    
			          
	       </td>
	  </tr>
    </table>

    <EF:EFRegion/>
    
    <EF:EFGrid blockId="result_auth" autoDraw="no" enable="true" readonly="true"  style="navigationBar:false;operationBar:false" paintId="ef_grid_p" enable="false">
    	<EF:EFColumn ename="siteId" visible="false"/>
	    <EF:EFColumn ename="siteName"/>
  	    <EF:EFColumn ename="manageCol" cname="站点管理<input  type='checkbox' name='checkSiteCol'  onclick='exCheckedAllOrUn(this,&quot;manage&quot;)'/>"/>
	    <EF:EFColumn ename="templateCol" cname="站点模板设置<input  type='checkbox' name='checkSiteCol'  onclick='exCheckedAllOrUn(this,&quot;template&quot;)'/>"/>
	    <EF:EFColumn ename="visitSiteCol" cname="站点访问<input  type='checkbox' name='checkSiteCol'  onclick='exCheckedAllOrUn(this,&quot;visit&quot;)'/>"/>
    </EF:EFGrid>
    
    <EF:EFGrid blockId="result" autoDraw="no" enable="true" readonly="false"  ajax="true" paintId="ef_grid_c" style="operationBar:false;navigationBar:false;">
      <EF:EFColumn ename="clazz" width="50" visible="false"/>
      <EF:EFColumn ename="identity" visible="false"/>
	  <EF:EFColumn ename="clazzName" cname="用户集合类型" width="100" readonly="true"/>
	  <EF:EFColumn ename="desc" cname="用户集合描述" width="200" readonly="true"/>
    </EF:EFGrid>
    
    <EF:EFGrid blockId="result" autoDraw="no" enable="true"   ajax="true" paintId="ef_grid_r" style="operationBar:false;navigationBar:false;">
      <EF:EFColumn ename="clazz" width="50" visible="false"/>
      <EF:EFColumn ename="identity" visible="false"/>
	  <EF:EFColumn ename="clazzName" cname="用户集合类型" width="100" enable="false"/>
	  <EF:EFColumn ename="desc" cname="用户集合描述" width="200" enable="false"/>
    </EF:EFGrid>
    
    <jsp:include flush="false" page="../../EF/Form/iplat.ef.tail.jsp"></jsp:include>
  </form>
</body>
</html>
