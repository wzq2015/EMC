
<%@page contentType="text/html;charset=UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF.tld" %>
<%
	String actionUrl = request.getContextPath() + "/DispatchAction.do";
	String url = application.getRealPath("");
%>

<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; 
	charset=UTF-8" />
	<title>
	</title>
	
	<script type="text/javascript" src="./EF/EF.js"></script>
	<script type="text/javascript">
	  var baseUrl = "<%= request.getContextPath() %>";
	</script>
	<script type="text/javascript" src="./ER/ERTools.js"></script>
	<script type="text/javascript" src="./ER/ER22.js"></script>
	
</head>

<body class="bodyBackground">

<form id="ER22" method="POST" action="<%=actionUrl%>" >
<jsp:include flush="false" page="../EF/Form/EFFormHead.jsp"></jsp:include>
<EF:EFInput blockId="" ename="currentEditId" row="" type="hidden" />
<div id="commonPara">
</div>

<div id = "ef_region_head" title="报表生成"> 
   <table cellpadding=0 cellspacing=0  width=100%>
     <tr>
       <td width=50% valign="top">
         <div id = "ef_region_report" title="报表信息" style="overflow:scroll" efRegionShowClear=true> 
           <div id="reportPara" style="overflow:auto;width:100%;height:80px;">
             <table>
               <tr>
                 <td width=50% align='right'>
                   报表ID
                 </td>
                 <td width=50% nowarp>
                   <EF:EFInput blockId="" ename="reportId" row="" />
                 </td>
               </tr>
               <tr>
                 <td width=50% align='right'>
                   报表归属
                 </td>
                 <td width=50% nowarp>
                   <EF:EFInput blockId="" ename="reportBelongTo" row="" />
                 </td>
               </tr>
               <tr>
                 <td width=50% align='right'>
                   报表版本
                 </td>
                 <td width=50% nowarp>
                   <EF:EFInput blockId="" ename="reportVersion" row="" />
  				   <EF:EFInput blockId="" ename="xmlStr" row="" type="hidden" />
  				   <EF:EFInput blockId="" ename="reportFileName" row="" type="hidden" />
  				   <EF:EFInput blockId="" ename="reportGenNow" row="" type="hidden" />
                 </td>
               </tr>
             </table>
           </div>
         </div>
       </td>
       <td width=50% valign="top">
         <div id = "ef_region_para" title="报表生成参数" style="overflow:scroll" efRegionShowClear=true> 
           <div id = "ef_para_list" style="overflow:auto;width:100%;height:80px;">
           </div>
         </div>
       </td>
     </tr>
   </table>	
</div>

<div id = "ef_region_excel" title="EXCEL报表生成" style="overflow:scroll"> 
  <div id="spreadSheetDiv" style="overflow:hidden;width:100%">

  </div>
</div>
  
 <div id="printContent" class="efwindow">
 	<table width="300"><tr>
		<td>
		<div id = "ef_region_PRCT" title="打印设置" style="overflow:scroll">
		 <table>
			<tr><td>	
			<input  type="radio" id="select_book" name="print_Content" value="2" class="inputField"  />整个工作簿(E)
			</td></tr><tr><td>
			<input  type="radio" id="select_sheet" name="print_Content" value="3" class="inputField"  checked/>当前选定工作表(V)
			</td></tr>
			</table>
		</div>		
		
		</td> 	
 	</tr>
 	</table>
 </div>  
  
<EF:EFRegion/>

<jsp:include flush="false" page="../EF/Form/EFFormTail.jsp"></jsp:include>
</form>

</body>
</html>   
