<!DOCTYPE html>
<%@page pageEncoding="UTF-8" contentType="text/html;charset=UTF-8"%>

<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>

<%
	response.setHeader("Pragma","No-Cache");
	response.setHeader("Cache-Control","No-Cache");
	response.setDateHeader("Expires", 0);
%>

<html>
<head>	
	<title>请上传模板</title>
	<script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
	<script type="text/javascript" src="./ED/EDFA7001.js"></script>
</head>
       
<body class="bodyBackground">
<form id="EDFA7001" name="actionForm"  method="POST" action="ED/EDFA70Upload.jsp?" enctype="multipart/form-data">
<jsp:include flush="false" page="../EF/Form/iplat.ef.head.jsp"></jsp:include>

<div id = "ef_region_head" title="模板信息"> 
   <div>
   <table cellpadding=0 cellspacing=0  width=100%>
     <tr>
       <td width=100% valign="top">
         <div id = "ef_region_template" title="模板属性" style="overflow:hidden" efRegionShowClear=true> 
           <div id="templateInfo" style="overflow:hidden;width:100%;">
             <table>
               <tr>
                 <td width=100% align='left'>
                  	表格标识
                 </td>
                 <td width=100% nowarp>
                   <EF:EFInput blockId="" ename="gridId" row="" etc="readonly"/>
                 </td>
               </tr>
               <tr>
                 <td width=100% align='left'>
                   	模板标识
                 </td>
                 <td width=100% nowarp>
                   <EF:EFInput blockId="" ename="templateId" row="" etc="readonly"/>
                 </td>
               </tr>
               <tr>
                 <td width=100% align='left'>
                   	模板名称
                 </td>
                 <td width=100% nowarp>
                   <EF:EFInput blockId="" ename="templateName" row="" />
                 </td>
               </tr>
               <tr>
                 <td width=100% align='left'>
                 	 模板文件
                 </td>
                 <td width=100% nowarp>
                     <EF:EFInput blockId="" ename="templateFilepath" etc="contentEditable='false'" row="" type="file" />
                 </td>
               </tr>            
             </table>
           </div>
         </div>
       </td>
     </tr>
   </table>	
   </div>
</div>  
<EF:EFRegion/>		
<jsp:include flush="false" page="../EF/Form/iplat.ef.tail.jsp"></jsp:include> 		
</form>
</body>
</html>
