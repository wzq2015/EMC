<!DOCTYPE html>
<%@page contentType="text/html; charset=UTF-8"%>
<%@taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>
<%
	String actionUrl = request.getContextPath() + "/DispatchAction.do";
%>

<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; 
	charset=UTF-8" />
	<title>
	</title>
	
	<script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
	<script type="text/javascript" src="./EC/AF/ECAF01.js"></script>
	
</head>
<body class="bodyBackground">

<form id="ECAF01" method="POST" action="<%=actionUrl%>" >
<jsp:include flush="false" page="../../EF/Form/iplat.ef.head.jsp"></jsp:include>

<div id = "ef_region_inqu" title="查询条件" efRegionShowClear=true>
	<div style="overflow:hidden;width:100%">
		<table style="width:100%">
		  <tr>
            <td nowrap width="30%" align="right">
              所属文章标题:
            </td>
            <td nowrap width="20%">
            <EF:EFInput blockId="inqu_status" ename="articleTitle" row="0" />
            </td>
            <td nowrap width="10%" align="right">
              审核状态:
            </td>
            <td nowrap width="40%">
     
			 <EF:EFSelect blockId="inqu_status" ename="isPassAudit"  row="0">
			 <EF:EFOption label="" value=""></EF:EFOption>
			 <EF:EFOption label="未审核" value="0"></EF:EFOption>
			 <EF:EFOption label="未通过" value="1"></EF:EFOption>
			 <EF:EFOption label="已通过" value="2"></EF:EFOption>
			 </EF:EFSelect>
						
            </td>
            </tr>
         </table>
	</div>
</div>

<div id="checkContent" class="efwindow">
 	<table width="300"><tr>
		<td>
		<div id = "ef_region_check" title="审核" style="overflow:scroll">
		 <table>
		    <tr>
		     <td nowrap width="15%">
               文章标题:
             </td>
             <td nowrap width="20%">
             <EF:EFInput blockId="check" ename="articleTitle" row="0" etc=" style='width:400px;' readOnly='true' "/>
             </td>   
		    </tr>
		    <tr>
		     <td nowrap width="15%">
               评论内容:
             </td>
             <td nowrap width="20%">
             <EF:EFInput blockId="check" ename="commentContent"   type="textarea" etc=" style='width:400px;height:200px' readOnly='true' " row="0"/>
             </td>   
		    </tr>
			<tr>
			 <td>	
				审核结果:
			 </td>
			 <td>
				 <input  type="radio" id="check_pass" name="isPassAudit" value="2" class="inputField"  />通过
				 <input  type="radio" id="check_unpass" name="isPassAudit" value="1" class="inputField"  checked/>不通过
			 </td>
			 </tr>
		  </table>
		</div>		
		
		</td> 	
 	</tr>
 	</table>	
 </div>
 
<div id = "ef_region_result" title="记录集" style="overflow:scroll"> 
	<div id = "ef_grid_result" title="页面信息" style="overflow: hidden;height:300px;">
	</div> 
</div>     
  
<EF:EFRegion/>
<EF:EFGrid blockId="result"  ajax="true" style="operationBar:false">
<EF:EFColumn ename="articleTitle" cname="所属文章标题" width="300" enable="false"/>	
<EF:EFColumn ename="commentContent" cname="评论内容" width="250" enable="false"/>
<EF:EFColumn ename="recCreateTime" cname="评论发布时间" width="150" enable="false" sort="true"/>
<EF:EFComboColumn ename="isPassAudit" cname="审核状态" width="100" valueProperty="value" labelProperty="label" enable="false" >
  <EF:EFOption label="" value=""></EF:EFOption>
  <EF:EFOption label="未审核" value="0"></EF:EFOption>
  <EF:EFOption label="未通过" value="1"></EF:EFOption>
  <EF:EFOption label="已通过" value="2"></EF:EFOption>
</EF:EFComboColumn>
<EF:EFColumn ename="commentId" visible="false"/>
<EF:EFColumn ename="articleId" visible="false"/>
<EF:EFColumn ename="isPassAudit" visible="false"/>
</EF:EFGrid> 
     
<jsp:include flush="false" page="../../EF/Form/iplat.ef.tail.jsp"></jsp:include>
</form>

</body>
</html>   
