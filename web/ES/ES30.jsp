<!DOCTYPE html>
<%@page pageEncoding="UTF-8" contentType="text/html;charset=UTF-8"%>

<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>

<%
	String contextpath = request.getContextPath();
	String baseUrl = contextpath;
	String listUrl = baseUrl + "/DispatchAction.do";
%>


<%@page import="com.baosight.iplat4j.core.resource.I18nMessages"%><html>
 <head>	
  <script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
  <script type="text/javascript" src="./ES/ES30.js"></script>
 </head>
 
 <body class="bodyBackground">
  <form method="POST" action="<%=listUrl%>">    
    <jsp:include flush="false" page="../EF/Form/iplat.ef.head.jsp"></jsp:include>
    <input type="hidden" id="inqu_status-parent" name="inqu_status-parent" value="" />
    
 	<div id="ef_region_result" title="<%=I18nMessages.getText("label.ESOrgBuild","组织建设") %>" efRegionShowClear=false>
      <div id="ef_region_main" style="overflow:auto">
        <table id="mainFrameTable" width="100%"  height="82%" cellpadding=1 cellspacing=0 >
    	  <tr height=100%>
    	    <td id="leftTree" vAlign="top" width="200px" height="100%" style="background-color: #f0f3f4; padding-top:10px;">
    		                    
    		  <div id="outer" style="width:200px;" >
		   		  <div id="leftTreeDiv" style='overflow:auto; min-height:30px; height:100%;'>
		   		    <EF:EFTree model="orgTreeModel" id="nTree" text='<%=I18nMessages.getText("label.ESOrganization","组织机构") %>' configFunc="configTree">
		   		    </EF:EFTree>
		   		  </div>
    		  </div>
    		                    
    		 </td>
    		 
    		
    		<td id="rightContent" width=100%  vAlign="top" >
    		  <div id = "ef_region_org" title="<%=I18nMessages.getText("label.ESSubOrgAdmin","子组织管理") %>" efRegionShowClear=false>		  
    	        <div id = "ef_grid_r" title="<%=I18nMessages.getText("label.EFPageInfo","页面信息") %>" style="overflow: hidden;height:400px;">
                </div> 
              </div>                           
            </td>
    	  </tr>
        </table>
      </div>
    </div>

    <EF:EFRegion/>
    <EF:EFGrid blockId="result" autoDraw="yes" readonly="false"  ajax="true" paintId="ef_grid_r">
      <EF:EFColumn ename="label" fix="yes" sort="false" nullable="false" minLength="1" maxLength="64" />
      <EF:EFColumn ename="name" nullable="false" minLength="1" maxLength="256" />
      <EF:EFColumn ename="tel" validateRegex="/^[0-9#*\x20-]{0,24}$/" nullable="true" minLength="1" maxLength="24" validateErrorPrompt='<%=I18nMessages.getText("ep.TelValidateErrorPrompt","组织机构联系电话最多由２４个数字,*,#,-字符组成！") %>'/>    
      <EF:EFColumn ename="fax" validateRegex="/^[0-9#*\x20-]{0,24}$/" nullable="true" minLength="1" maxLength="24" validateErrorPrompt='<%=I18nMessages.getText("ep.FaxValidateErrorPrompt","组织机构传真最多由２４个数字,*,#,-字符组成！") %>'/>          
      <EF:EFColumn ename="desc" />
      <EF:EFColumn ename="postCode" validateRegex="/^[0-9#\x20]{0,16}$/" nullable="true" minLength="1" maxLength="16" validateErrorPrompt='<%=I18nMessages.getText("ep.ZipValidateErrorPrompt","组织机构邮编最多由１６个数字,#,空格组成！") %>'/>   
      <EF:EFColumn ename="location" />
      <EF:EFColumn ename="sortIndex" />        
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
