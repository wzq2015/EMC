<!DOCTYPE html>
<%@page pageEncoding="UTF-8" contentType="text/html;charset=UTF-8"%>

<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>

<%
	String contextpath = request.getContextPath();
	String baseUrl = contextpath;
	String listUrl = baseUrl + "/DispatchAction.do";
%>

<html>
 <head>	
  <script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
  <script type="text/javascript" src="./ES/ES52.js"></script>
 </head>
 
 <body class="bodyBackground">
  <form method="POST" action="<%=listUrl%>">
    <jsp:include flush="false" page="../EF/Form/iplat.ef.head.jsp"></jsp:include>
    <EF:EFInput blockId="inqu_status" row="0" ename="target" type="hidden"/>
    <EF:EFInput blockId="inqu_status" row="0" ename="aotype" type="hidden"/>
    <EF:EFInput blockId="inqu_status" row="0" ename="aoid" type="hidden"/>
    <EF:EFInput blockId="inqu_status" row="0" ename="behavior" type="hidden"/>
    <EF:EFInput blockId="inqu_status" row="0" ename="behaviors" type="hidden"/>
    
 	<div id = "ef_region_result" title="系统授权" efRegionShowClear=false>
    <table width="100%"  height="87%" border=0>
	  <tr height=100%>
	  	<td width="50%">		
		  <table width=100%>
		    <tr>
              <td>		       
		        <div id = "ef_region_page" title="权限列表" efRegionShowClear=false>
                  <div id = "ef_grid_p" title="权限列表" style="overflow: hidden;height:160px;">
                  </div>
                </div>
		      </td>
		    </tr>
		    <tr>		         
		      <td>
		        <div id = "ef_region_auth" title="批量授权" efRegionShowClear=false>
		          <div id = "ef_grid_r" title="批量授权" style="overflow: hidden;height:250px;">
                  </div>
                </div>
		      </td>
		    </tr>
		   </table>
		 </td>
		   
		 <td width="45%" valign="top">
           <table width="100%" border=0>		     
		     <tr>
		       <td>
                 <div id = "ef_region_show" title="权限查看" efRegionShowClear=false>		         
	               <div id = "ef_grid_c" title="权限查看" style="overflow: hidden;height:440px;">	                    
                   </div>
                 </div>
               </td>
              </tr>              	     
		   </table>		  
	      </td>
	    </tr>
	  </table>

    </div>

    <EF:EFRegion/>

    <EF:EFGrid blockId="result" autoDraw="no" enable="true" readonly="true" style="operationBar:false" ajax="true" paintId="ef_grid_p">
     <EF:EFColumn ename="label" width="50" />
     <EF:EFColumn ename="name" width="120" />
     <EF:EFColumn ename="desc" width="500" />
    </EF:EFGrid>

    <EF:EFGrid blockId="result" autoDraw="no" enable="true" readonly="true"  ajax="true" paintId="ef_grid_c" style="operationBar:false;navigationBar:false;">      
      <EF:EFColumn ename="clazz" width="50" visible="false"/>
      <EF:EFColumn ename="identity" visible="false"/>
      <EF:EFColumn ename="clazzName" cname="集合类型"/>
	  <EF:EFColumn ename="desc" cname="集合描述" width="200"/>
    </EF:EFGrid>
    
    <EF:EFGrid blockId="result" autoDraw="no" enable="true" readonly="true"  ajax="true" paintId="ef_grid_r" style="operationBar:false;navigationBar:false;">      
      <EF:EFColumn ename="clazz" width="50" visible="false"/>
      <EF:EFColumn ename="identity" visible="false"/>
      <EF:EFColumn ename="clazzName" cname="集合类型"/>
	  <EF:EFColumn ename="desc" cname="集合描述" width="200"/>
    </EF:EFGrid>    
    
    

    <jsp:include flush="false" page="../EF/Form/iplat.ef.tail.jsp"></jsp:include>
  </form>
</body>
</html>
