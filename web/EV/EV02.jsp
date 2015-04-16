
<%@page pageEncoding="UTF-8" contentType="text/html;charset=UTF-8"%>
<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF.tld" %>

<%
	String contextpath = request.getContextPath();
	String baseUrl = contextpath;
	String listUrl = baseUrl + "/DispatchAction.do";
%>

<html>
 <head>	
  <script type="text/javascript" src="./EF/EF.js"></script>
  <script type="text/javascript" src="./EV/EV02.js"></script>
 </head>
 
 <body class="bodyBackground">
  <form method="POST" action="<%=listUrl%>">
    <jsp:include flush="false" page="../EF/Form/EFFormHead.jsp"></jsp:include>
    

    <EF:EFInput blockId="inqu_status" row="0" ename="authorize" type="hidden"/>
     <EF:EFInput blockId="inqu_status" row="0" ename="type" type="hidden"/>
     <EF:EFInput blockId="inqu_status" row="0" ename="target" type="hidden"/>
     <!-- 
       <input type="hidden" id="inqu_status-type" name="inqu_status-type" value="" />
       <input type="hidden" id="inqu_status-target" name="inqu_status-target" value="" />
      -->
    
    
    <table width="100%"  height="100%">      
	  <tr height=100%>
		  <td width="60%" valign="top">
		         <div id = "ef_region_page" title="Portlet资源信息" efRegionShowClear=false>		         
                    <div id = "ef_grid_p" title="Portlet资源信息" style="overflow: hidden;height:450px;">
                    </div>
                 </div>
                 <!--  
                 <div id = "ef_region_tab" title="TAB资源信息" efRegionShowClear=false>		         
                    <div id = "ef_grid_t" title="TAB资源信息" style="overflow: hidden;height:200px;">
                    </div>
                 </div>
                 -->
		   </td>
		   <td width="40%" valign="top">
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
    
    <EF:EFGrid blockId="result_portlet" autoDraw="no" enable="true" readonly="false"  style="operationBar:false" paintId="ef_grid_p">
	    <EF:EFColumn ename="portletId" readonly="true"/>
	    <EF:EFColumn ename="portletName" readonly="true"/>
	    <EF:EFComboColumn ename="portletContentType" align="center" width="100" readonly="true">
		     <EF:EFOption value="1" label="IFrame" />
		     <EF:EFOption value="2" label="RSS" />
		     <EF:EFOption value="4" label="内容接口" />
	    </EF:EFComboColumn>
	    <EF:EFColumn ename="portletUrl" width="350" readonly="true"/>
    </EF:EFGrid>
    
    <!--  
    <EF:EFGrid blockId="result_tab" autoDraw="no" paintId="ef_grid_t">
	    <EF:EFColumn ename="tabId" />
	    <EF:EFColumn ename="tabName" />
	    <EF:EFComboColumn ename="tabType"   align="center" width="100" >
		     <EF:EFOption value="1" label="IFrame" />
		     <EF:EFOption value="2" label="RSS" />
		     <EF:EFOption value="4" label="内容接口" />
	    </EF:EFComboColumn>
	    <EF:EFColumn ename="tabUrl"  width="350"/>
    </EF:EFGrid>
    -->
    <EF:EFGrid blockId="result" autoDraw="no" enable="true"  ajax="true" paintId="ef_grid_c" style="operationBar:false;navigationBar:false;">
      <EF:EFColumn ename="clazz" width="50" visible="false"/>
      <EF:EFColumn ename="identity" visible="false"/>
	  <EF:EFColumn ename="clazzName" cname="用户集合类型" width="100" readonly="true"  />
	  <EF:EFColumn ename="desc" cname="用户集合描述" width="200" readonly="true"  />
    </EF:EFGrid>

    <EF:EFGrid blockId="result" autoDraw="no" enable="true" ajax="true" paintId="ef_grid_r" style="operationBar:false;navigationBar:false;">
      <EF:EFColumn ename="clazz" width="50" visible="false"/>
      <EF:EFColumn ename="identity" visible="false"/>
	  <EF:EFColumn ename="clazzName" cname="用户集合类型" width="100" enable="false"  />
	  <EF:EFColumn ename="desc" cname="用户集合描述" width="200" enable="false"  />
    </EF:EFGrid>
    

    <jsp:include flush="false" page="../EF/Form/EFFormTail.jsp"></jsp:include>
  </form>
</body>
</html>
