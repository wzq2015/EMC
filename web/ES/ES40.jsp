<!DOCTYPE html>
<%@page pageEncoding="UTF-8" contentType="text/html;charset=UTF-8"%>

<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>

<%
	String contextpath = request.getContextPath();
	String baseUrl = contextpath;
	String listUrl = baseUrl + "/DispatchAction.do";
%>
<%@page import="com.baosight.iplat4j.core.resource.I18nMessages"%>
<html>
 <head>	
  <script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
  <script type="text/javascript" src="./ES/ES40.js"></script>
 </head>
 
 <body class="bodyBackground" style='height:100%;'>
  <form method="POST" action="<%=listUrl%>">    
    <jsp:include flush="false" page="../EF/Form/iplat.ef.head.jsp"></jsp:include>
    <input type="hidden" id="inqu_status-parent" name="inqu_status-parent" value="" />
    <input type="hidden" id="inqu_status-0-pageType" name="inqu_status-0-pageType" value="IANA" />
    
 	<div id = "ef_region_frame" title="<%=I18nMessages.getText("label.EFSystemConfig","系统建设") %>" efRegionShowClear=false style='height:95%;'>
 	<div style='height:100%;'>
    <table id="mainFrameTable" width="100%"  height="82%" cellpadding=1 cellspacing=0 >
	  <tr height=100%>
	    <td id="leftTree" vAlign="top" width="200px" height="100%" style="background-color: #f0f3f4; padding-top:10px;">
		  
		      <div id="outer" style="width:200px;" >
		   		  <div id="leftTreeDiv" style='overflow:auto; min-height:30px; height:100%;'>
		   		    <EF:EFTree model="appTreeModel" id="nTree" text='<%=I18nMessages.getText("label.EFAppSystem","应用系统") %>' configFunc="configTree">
		   		    </EF:EFTree>
		   		  </div>
    		  </div>  
		                    
		</td>
		
		<td id="rightContent" width=100%  vAlign="top" >
            <div id = "ef_region_module" title="<%=I18nMessages.getText("label.ESModuleConfig","模块管理") %>" efRegionShowClear=false>
              <div id = "ef_grid_r" title="<%=I18nMessages.getText("label.ESPageInfo","页面信息") %>" style="overflow: hidden;height:50%;">
              </div>
            </div>
            <div id = "ef_region_page" title="<%=I18nMessages.getText("label.ESPageConfig","页面管理") %>" efRegionShowClear=false>
              <div id = "ef_grid_p" title="<%=I18nMessages.getText("label.ESPageInfo","页面信息") %>" style="overflow: hidden;height:50%;">
              </div>
            </div>
        </td>
	  </tr>
    </table>
    </div>
    </div>

    <EF:EFRegion/>
    <EF:EFGrid blockId="result" autoDraw="yes" readonly="false"  ajax="true" paintId="ef_grid_r">
      <EF:EFColumn ename="label" fix="yes" width="150" sort="false"/>
	  <EF:EFColumn ename="name" width="150"/>
	  <EF:EFColumn ename="desc" width="200"/>
    </EF:EFGrid>
    
     <EF:EFGrid blockId="result" autoDraw="yes" readonly="false"  ajax="true" paintId="ef_grid_p" serviceName = "ES41">
      <EF:EFColumn ename="label" fix="yes" width="150" sort="false"/>
	  <EF:EFColumn ename="name" width="150"/>
	  <EF:EFColumn ename="desc" width="200"/>
	  <EF:EFColumn ename="elements" cname='<%=I18nMessages.getText("label.ESButtonConfig","按钮维护") %>' visible="true" />
    </EF:EFGrid>
    <jsp:include flush="false" page="../EF/Form/iplat.ef.tail.jsp"></jsp:include>
  </form>
  
  	<script type="text/javascript" >
        $(document).ready(function()
        {
        	$("#outer").css("height", $("#outer").parent().css("height"));
        	$("#leftTreeDiv").css("height", $("#outer").parent().css("height"));
            $("#outer").resizable({handles:"e,w"}); 
        });
	</script>
</body>
</html>
