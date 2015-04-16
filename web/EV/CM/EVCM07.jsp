
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF.tld" %>
<%
	String actionUrl = request.getContextPath() + "/DispatchAction.do";
%>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; 
	charset=UTF-8" />
	<title>
	</title>
	
	<script type="text/javascript" src="./EF/EF.js"></script>
	<script type="text/javascript" src="./EV/CM/EVCM07.js"></script>
	
</head>
<body class="bodyBackground">

<form id="EVCM07" method="POST" action="<%=actionUrl%>" >

<jsp:include flush="false" page="../../EF/Form/EFFormHead.jsp"></jsp:include>

<div id = "ef_region_inqu" title="查询条件" efRegionShowClear=true>
	<div style="overflow:hidden;width:100%">
		<table width="100%">
		  <tr>
		    <td width="20%" align="center">
		     	布局名称
		    </td>
            <td width="30%">
            	<EF:EFInput blockId="inqu_status" ename="layoutName" row="0" etc="nullable='true' minLength='0' maxLength='100' errorPrompt='\"名称\"应该由至少0个，最多100个字节大小的字符组成。'"/>
            </td>
            <td width="20%" align="center">
            </td>
            <td width="30%">
            </td>
		  </tr>
		</table>
	</div>
</div>  

<table id="mainFrameTable" width="100%" cellpadding=1 cellspacing=0 >
 	<tr height=100%>
	<td>
	 	<td width="40%" valign="top">
			<div id = "ef_region_result" title="布局记录" >		         
		   		<div id = "ef_grid_result" title="页面信息" style="overflow: hidden;height:450px;">
		   		</div>
			</div>
		</td>
		<td width="60%" valign="top">
	   		<div id = "ef_region_son" title="布局列记录" >		         
	            <div id = "ef_grid_son" title="已定义列信息" style="overflow: hidden;height:450px;">	                    
	            </div>
	            <EF:EFInput blockId="son_inqu_status" ename="layoutId" row="0" type="hidden"/> 
	        </div>		                  	   					          
	  	</td>
	</td>
	</tr>
</table>

<EF:EFRegion/>

<EF:EFGrid blockId="result" ajax='true'>
  <EF:EFColumn ename="layoutName" maxLength="100" minLength="1" nullable="false" displayType="hyperlink"/>
  <EF:EFColumn ename="layoutId" visible="false"/>
</EF:EFGrid>

<EF:EFGrid blockId="son" ajax='true' queryMethod="queryRow" style="navigationBar:false">
  <EF:EFColumn ename="layoutColumnName" maxLength="100" minLength="1" nullable="false"/>
  <EF:EFColumn ename="layoutColumnSeq" defaultValue="1" minLength="1" maxLength="16" nullable="false"/>
  <EF:EFComboColumn ename="layoutColumnType" >
     <EF:EFOption value="1" label="无固定值" />
     <EF:EFOption value="2" label="百分比" />
     <EF:EFOption value="3" label="数值" />
  </EF:EFComboColumn>
  <EF:EFColumn ename="layoutColumnValue" cname="列数值" maxLength="50" validateType="positive_number"/>
</EF:EFGrid>     

<jsp:include flush="false" page="../../EF/Form/EFFormTail.jsp"></jsp:include>
</form>
</body>
</html>  
