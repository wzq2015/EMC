<!DOCTYPE html>
<%@page contentType="text/html; charset=UTF-8"%>
<%@taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>
<%
	String actionUrl = request.getContextPath() + "/DispatchAction.do";
%>
<%@page import="com.baosight.iplat4j.core.resource.I18nMessages"%>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; 
	charset=UTF-8" />
	<title>
	</title>
	
	<script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
	<script type="text/javascript" src="./EE/DM/EEDM1002.js"></script>
	
</head>
<body class="bodyBackground">

<form id="EEDM1002" method="POST" action="<%=actionUrl%>" >
<EF:EFResource keys="EEDM1002" />
<jsp:include flush="false" page="../../EF/Form/iplat.ef.head.jsp"></jsp:include>

<div id = "ef_region_inqu" title="<%=I18nMessages.getText("ef.QueryConditions","查询条件") %>" efRegionShowClear=true>
	<div style="overflow:hidden;width:100%">
		<table>
		  <tr>
		    <td nowrap width="10%">
		      <%=I18nMessages.getText("ee.interItem1") %>
		    </td>
		    <td nowrap width="15%">
		    <EF:EFInput blockId="inqu_status" ename="interItem1" row="0" />
				
		    </td>
		    <td nowrap width="10%">
		      <%=I18nMessages.getText("ee.interItem2") %>
		    </td>
		    <td nowrap width="15%">
		    <EF:EFInput blockId="inqu_status" ename="interItem2" row="0" />
		    </td>
		    <td nowrap width="10%">
		      <%=I18nMessages.getText("ee.interItem3") %>
		    </td>
		    <td nowrap width="15%">
		    <EF:EFInput blockId="inqu_status" ename="interItem3" row="0" />
		    </td>
		   	<td nowrap width="10%">
		      <%=I18nMessages.getText("ee.interItem4") %>
		    </td>
		    <td nowrap width="15%">
		    <EF:EFInput blockId="inqu_status" ename="interItem4" row="0" />
		    </td>
		    <td nowrap width="10%">
		      <%=I18nMessages.getText("ee.interItem5") %>
		    </td>
		    <td nowrap width="15%">
		    <EF:EFInput blockId="inqu_status" ename="interItem5" row="0" />
		    </td>
		  </tr>
		  
		  <tr>
		    <td nowrap width="10%">
		      <%=I18nMessages.getText("ee.interItem6") %>
		    </td>
		    <td nowrap width="15%">
		    <EF:EFInput blockId="inqu_status" ename="interItem6" row="0" />
				
		    </td>
		    <td nowrap width="10%">
		      <%=I18nMessages.getText("ee.interItem7") %>
		    </td>
		    <td nowrap width="15%">
		    <EF:EFInput blockId="inqu_status" ename="interItem7" row="0" />
		    </td>
		    <td nowrap width="10%">
		      <%=I18nMessages.getText("ee.interItem8") %>
		    </td>
		    <td nowrap width="15%">
		    <EF:EFInput blockId="inqu_status" ename="interItem8" row="0" />
		    </td>
		   	<td nowrap width="10%">
		      <%=I18nMessages.getText("ee.interItem9") %>
		    </td>
		    <td nowrap width="15%">
		    <EF:EFInput blockId="inqu_status" ename="interItem9" row="0" />
		    </td>
		    <td nowrap width="10%">
		      <%=I18nMessages.getText("ee.interItem10") %>
		    </td>
		    <td nowrap width="15%">
		    <EF:EFInput blockId="inqu_status" ename="interItem10" row="0" />
		    </td>
		  </tr>
		  
		  <tr>
		    <td nowrap width="10%">
		      <%=I18nMessages.getText("ee.interItem11") %>
		    </td>
		    <td nowrap width="15%">
		    <EF:EFInput blockId="inqu_status" ename="interItem11" row="0" />
				
		    </td>
		    <td nowrap width="10%">
		      <%=I18nMessages.getText("ee.interItem12") %>
		    </td>
		    <td nowrap width="15%">
		    <EF:EFInput blockId="inqu_status" ename="interItem12" row="0" />
		    </td>
		    <td nowrap width="10%">
		      <%=I18nMessages.getText("ee.interItem13") %>
		    </td>
		    <td nowrap width="15%">
		    <EF:EFInput blockId="inqu_status" ename="interItem13" row="0" />
		    </td>
		   	<td nowrap width="10%">
		     <%=I18nMessages.getText("ee.interItem14") %>
		    </td>
		    <td nowrap width="15%">
		    <EF:EFInput blockId="inqu_status" ename="interItem14" row="0" />
		    </td>
		    <td nowrap width="10%">
		     <%=I18nMessages.getText("ee.interItem15") %>
		    </td>
		    <td nowrap width="15%">
		    <EF:EFInput blockId="inqu_status" ename="interItem15" row="0" />
		    </td>
		  </tr>
		  
		  <tr>
		    <td nowrap width="10%">
		      <%=I18nMessages.getText("ee.interItem16") %>
		    </td>
		    <td nowrap width="15%">
		    <EF:EFInput blockId="inqu_status" ename="interItem16" row="0" />
				
		    </td>
		    <td nowrap width="10%">
		     <%=I18nMessages.getText("ee.interItem17") %>
		    </td>
		    <td nowrap width="15%">
		    <EF:EFInput blockId="inqu_status" ename="interItem17" row="0" />
		    </td>
		    <td nowrap width="10%">
		      <%=I18nMessages.getText("ee.interItem18") %>
		    </td>
		    <td nowrap width="15%">
		    <EF:EFInput blockId="inqu_status" ename="interItem18" row="0" />
		    </td>
		   	<td nowrap width="10%">
		      <%=I18nMessages.getText("ee.interItem19") %>
		    </td>
		    <td nowrap width="15%">
		    <EF:EFInput blockId="inqu_status" ename="interItem19" row="0" />
		    </td>
		    <td nowrap width="10%">
		      <%=I18nMessages.getText("ee.interItem20") %>
		    </td>
		    <td nowrap width="15%">
		    <EF:EFInput blockId="inqu_status" ename="interItem20" row="0" />
		    </td>
		  </tr>
		  
		  <tr>
		    <td nowrap width="10%">
		     <%=I18nMessages.getText("ee.interItem21") %>
		    </td>
		    <td nowrap width="15%">
		    <EF:EFInput blockId="inqu_status" ename="interItem21" row="0" />
				
		    </td>
		    <td nowrap width="10%">
		      <%=I18nMessages.getText("ee.interItem22") %>
		    </td>
		    <td nowrap width="15%">
		    <EF:EFInput blockId="inqu_status" ename="interItem22" row="0" />
		    </td>
		    <td nowrap width="10%">
		      <%=I18nMessages.getText("ee.interItem23") %>
		    </td>
		    <td nowrap width="15%">
		    <EF:EFInput blockId="inqu_status" ename="interItem23" row="0" />
		    </td>
		   	<td nowrap width="10%">
		      <%=I18nMessages.getText("ee.interItem24") %>
		    </td>
		    <td nowrap width="15%">
		    <EF:EFInput blockId="inqu_status" ename="interItem24" row="0" />
		    </td>
		    <td nowrap width="10%">
		      <%=I18nMessages.getText("ee.interItem25") %>
		    </td>
		    <td nowrap width="15%">
		    <EF:EFInput blockId="inqu_status" ename="interItem25" row="0" />
		    </td>
		  </tr>
		  
		  <tr>
		    <td nowrap width="10%">
		      <%=I18nMessages.getText("ee.interItem26") %>
		    </td>
		    <td nowrap width="15%">
		    <EF:EFInput blockId="inqu_status" ename="interItem26" row="0" />
				
		    </td>
		    <td nowrap width="10%">
		      <%=I18nMessages.getText("ee.interItem27") %>
		    </td>
		    <td nowrap width="15%">
		    <EF:EFInput blockId="inqu_status" ename="interItem27" row="0" />
		    </td>
		    <td nowrap width="10%">
		      <%=I18nMessages.getText("ee.interItem28") %>
		    </td>
		    <td nowrap width="15%">
		    <EF:EFInput blockId="inqu_status" ename="interItem28" row="0" />
		    </td>
		   	<td nowrap width="10%">
		      <%=I18nMessages.getText("ee.interItem29") %>
		    </td>
		    <td nowrap width="15%">
		    <EF:EFInput blockId="inqu_status" ename="interItem29" row="0" />
		    </td>
		    <td nowrap width="10%">
		      <%=I18nMessages.getText("ee.interItem30") %>
		    </td>
		    <td nowrap width="15%">
		    <EF:EFInput blockId="inqu_status" ename="interItem30" row="0" />
		    </td>
		  </tr>
		  
		  <tr>
		    <td nowrap width="10%">
		      <%=I18nMessages.getText("ee.interItem31") %>
		    </td>
		    <td nowrap width="15%">
		    <EF:EFInput blockId="inqu_status" ename="interItem31" row="0" />
				
		    </td>
		    <td nowrap width="10%">
		      <%=I18nMessages.getText("ee.interItem32") %>
		    </td>
		    <td nowrap width="15%">
		    <EF:EFInput blockId="inqu_status" ename="interItem32" row="0" />
		    </td>
		    <td nowrap width="10%">
		      <%=I18nMessages.getText("ee.interItem33") %>
		    </td>
		    <td nowrap width="15%">
		    <EF:EFInput blockId="inqu_status" ename="interItem33" row="0" />
		    </td>
		   	<td nowrap width="10%">
		      <%=I18nMessages.getText("ee.interItem34") %>
		    </td>
		    <td nowrap width="15%">
		    <EF:EFInput blockId="inqu_status" ename="interItem34" row="0" />
		    </td>
		    <td nowrap width="10%">
		      <%=I18nMessages.getText("ee.interItem35") %>
		    </td>
		    <td nowrap width="15%">
		    <EF:EFInput blockId="inqu_status" ename="interItem35" row="0" />
		    </td>
		  </tr>
		  
		  <tr>
		    <td nowrap width="10%">
		      <%=I18nMessages.getText("ee.interItem36") %>
		    </td>
		    <td nowrap width="15%">
		    <EF:EFInput blockId="inqu_status" ename="interItem36" row="0" />
				
		    </td>
		    <td nowrap width="10%">
		      <%=I18nMessages.getText("ee.interItem37") %>
		    </td>
		    <td nowrap width="15%">
		    <EF:EFInput blockId="inqu_status" ename="interItem37" row="0" />
		    </td>
		    <td nowrap width="10%">
		      <%=I18nMessages.getText("ee.interItem38") %>
		    </td>
		    <td nowrap width="15%">
		    <EF:EFInput blockId="inqu_status" ename="interItem38" row="0" />
		    </td>
		   	<td nowrap width="10%">
		      <%=I18nMessages.getText("ee.interItem39") %>
		    </td>
		    <td nowrap width="15%">
		    <EF:EFInput blockId="inqu_status" ename="interItem39" row="0" />
		    </td>
		    <td nowrap width="10%">
		      <%=I18nMessages.getText("ee.interItem40") %>
		    </td>
		    <td nowrap width="15%">
		    <EF:EFInput blockId="inqu_status" ename="interItem40" row="0" />
		    </td>
		  </tr>
		  
		  <tr>
		    <td nowrap width="10%">
		      <%=I18nMessages.getText("ee.interItem41") %>
		    </td>
		    <td nowrap width="15%">
		    <EF:EFInput blockId="inqu_status" ename="interItem41" row="0" />
				
		    </td>
		    <td nowrap width="10%">
		      <%=I18nMessages.getText("ee.interItem42") %>
		    </td>
		    <td nowrap width="15%">
		    <EF:EFInput blockId="inqu_status" ename="interItem42" row="0" />
		    </td>
		    <td nowrap width="10%">
		      <%=I18nMessages.getText("ee.interItem43") %>
		    </td>
		    <td nowrap width="15%">
		    <EF:EFInput blockId="inqu_status" ename="interItem43" row="0" />
		    </td>
		   	<td nowrap width="10%">
		      <%=I18nMessages.getText("ee.interItem44") %>
		    </td>
		    <td nowrap width="15%">
		    <EF:EFInput blockId="inqu_status" ename="interItem44" row="0" />
		    </td>
		    <td nowrap width="10%">
		      <%=I18nMessages.getText("ee.interItem45") %>
		    </td>
		    <td nowrap width="15%">
		    <EF:EFInput blockId="inqu_status" ename="interItem45" row="0" />
		    </td>
		  </tr>
		  
		  <tr>
		    <td nowrap width="10%">
		      <%=I18nMessages.getText("ee.interItem46") %>
		    </td>
		    <td nowrap width="15%">
		    <EF:EFInput blockId="inqu_status" ename="interItem46" row="0" />
				
		    </td>
		    <td nowrap width="10%">
		      <%=I18nMessages.getText("ee.interItem47") %>
		    </td>
		    <td nowrap width="15%">
		    <EF:EFInput blockId="inqu_status" ename="interItem47" row="0" />
		    </td>
		    <td nowrap width="10%">
		      <%=I18nMessages.getText("ee.interItem48") %>
		    </td>
		    <td nowrap width="15%">
		    <EF:EFInput blockId="inqu_status" ename="interItem48" row="0" />
		    </td>
		   	<td nowrap width="10%">
		      <%=I18nMessages.getText("ee.interItem49") %>
		    </td>
		    <td nowrap width="15%">
		    <EF:EFInput blockId="inqu_status" ename="interItem49" row="0" />
		    </td>
		    <td nowrap width="10%">
		      <%=I18nMessages.getText("ee.interItem50") %>
		    </td>
		    <td nowrap width="15%">
		    <EF:EFInput blockId="inqu_status" ename="interItem50" row="0" />
		    </td>
		  </tr>
		</table>
	</div>
</div>

<div id = "ef_region_result" title="<%=I18nMessages.getText("ef.RecordSet","记录集") %>" style="overflow:scroll"> 
	<div id = "ef_grid_result" title="<%=I18nMessages.getText("ef.PageInformation","页面信息") %>" style="overflow: hidden;height:300px;">
	</div> 
</div>     
  
<EF:EFRegion/>
<EF:EFGrid blockId="result" autoDraw="yes">	
</EF:EFGrid> 
     
<jsp:include flush="false" page="../../EF/Form/iplat.ef.tail.jsp"></jsp:include>
</form>

</body>
</html>   
