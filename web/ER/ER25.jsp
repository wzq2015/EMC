
<%@page pageEncoding="UTF-8" contentType="text/html;charset=UTF-8"%>

<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF.tld" %>

<%
	String actionUrl = request.getContextPath() + "/DispatchAction.do";
	response.setHeader("Pragma","No-Cache");
	response.setHeader("Cache-Control","No-Cache");
	response.setDateHeader("Expires", 0);
%>

<html>
 <head>	
  <script type="text/javascript" src="./EF/EF.js"></script>
  <script type="text/javascript" src="./ER/ER25.js"></script>
  <script type="text/javascript" src="./ER/ERTools.js"></script>
 </head>
<base target="_self">          
<body class="bodyBackground">
 <form id="ER25" name="actionForm"  method="POST" action="ER/uploadReportFile.jsp" enctype="multipart/form-data">
  <jsp:include flush="false" page="../EF/Form/EFFormHead.jsp"></jsp:include>

<div id = "ef_region_head" title="报表文件上传"> 
   <div>
   <table cellpadding=0 cellspacing=0  width=100%>
     <tr>
       <td width=50% valign="top">
         <div id = "ef_region_report" title="报表基本参数" style="overflow:scroll" efRegionShowClear=true> 
           <div id="reportPara" style="overflow:auto;width:100%;height:120px;">
             <table>
               <tr>
                 <td width=50% align='right'>
                   报表ID
                 </td>
                 <td width=50% nowarp>
                   <EF:EFInput blockId="" ename="reportId" row="" etc="readonly"/>
                 </td>
               </tr>
               <tr>
                 <td width=50% align='right'>
                   报表归属
                 </td>
                 <td width=50% nowarp>
                   <EF:EFInput blockId="" ename="reportBelongTo" row="" etc="readonly"/>
                 </td>
               </tr>
               <tr>
                 <td width=50% align='right'>
                   报表版本
                 </td>
                 <td width=50% nowarp>
                   <EF:EFInput blockId="" ename="reportVersion" row="" etc="readonly"/>
                 </td>
               </tr>
               <tr>
                 <td width=50% align='right'>
                   报表文件
                 </td>
                 <td width=50% nowarp>
                   <EF:EFInput blockId="" ename="reportFile" row="" type="file"/>
                 </td>
               </tr>               
             </table>
           </div>
         </div>
       </td>
       <td width=50% valign="top">
         <div id = "ef_region_para" title="报表运行时参数" style="overflow:scroll" efRegionShowClear=true> 
           <div id = "ef_para_list" style="overflow:auto;width:100%;height:80px;">
           </div>
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
