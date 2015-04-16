
<%@page pageEncoding="UTF-8" contentType="text/html;charset=UTF-8"%>

<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF.tld" %>

<%
	String actionUrl = request.getContextPath() + "/DispatchAction.do";
%>

<html>
 <head>	
  <script type="text/javascript" src="./EF/EF.js"></script>
  <script type="text/javascript" src="./ER/ER24.js"></script>
 </head>
 
<body class="bodyBackground">
 <form id="ER24" name="actionForm" method="POST" action="<%=actionUrl%>" >
  <jsp:include flush="false" page="../EF/Form/EFFormHead.jsp"></jsp:include>
	<EF:EFInput blockId="" ename="id" row="" type="hidden" />
	<EF:EFInput blockId="" ename="reportId" row="" type="hidden" />
	<EF:EFInput blockId="" ename="reportBelongTo" row="" type="hidden" />
	<EF:EFInput blockId="" ename="reportVersion" row="" type="hidden" />
  <div id = "ef_region_result" title="文件另存为" efRegionShowClear=true>
   <div>
		<table>		  
		  <tr>
		    <td >报表标识</td>
		    <td >
		    <div style="position:relative;">
		      <EF:EFInput blockId="" ename="reportSaveAsId" row="" />
		      <IMG style='position: absolute; top:2; left:128; cursor:pointer' id="tree_list_node" 
		      onload="efico.setImageSrc(this,'efform.efImgList')" src="./EF/Images/eftree_blank.png"
			       onClick='showDivWindow("reportSaveAsId")'/>
			</div> 		      
		    </td>
		  </tr>
		  <tr>
		      <td >报表归属</td>
		    <td >
		    <div style="position:relative;">
		      <EF:EFInput blockId="" ename="reportSaveAsBelongTo" row="" />
		      <IMG style='position: absolute; top:2; left:128; cursor:pointer' id="tree1_list_node" 
		      onload="efico.setImageSrc(this,'efform.efImgList')" src="./EF/Images/eftree_blank.png"
			       onClick='showDivWindow("reportSaveAsBelongTo")'/>
			</div>  		      
		    </td>
		  </tr>
		  <tr>
		     <td >报表版本</td>
		    <td >
		    <div style="position:relative;">
		      <EF:EFInput blockId="" ename="reportSaveAsVersion" row="" />
		      <IMG style='position: absolute; top:2; left:128; cursor:pointer' id="tree2_list_node" 
			       onload="efico.setImageSrc(this,'efform.efImgList')" src="./EF/Images/eftree_blank.png"
			       onClick='showDivWindow("reportSaveAsVersion")'/>
			</div>       
		    </td>
		  </tr>
		  
		</table>
	</div>
   </div>    
	<EF:EFRegion/>		
 <jsp:include flush="false" page="../EF/Form/EFFormTail.jsp"></jsp:include> 		

 </body>
</html>
