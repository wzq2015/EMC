<!DOCTYPE html>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>

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
	<script type="text/javascript" src="./EC/CM/ECCM05.js"></script>
</head>

<body class="bodyBackground">

<form id="ECCM05"  method="POST" action="<%=actionUrl%>" >

<jsp:include flush="false" page="../../EF/Form/iplat.ef.head.jsp"></jsp:include>

<div id = "ef_region_result" title="栏目信息" efRegionShowClear=true>
<div>	
		<EF:EFInput blockId="result" ename="columnId" row="0" type="hidden"/>
		<table>		  
		  <tr>
		    <td  nowrap width="15%">栏目名称</td>
		    <td  width="85%">
			  <EF:EFInput blockId="result" ename="columnName" row="0" trim="false"
			  etc="validateType='chinese_string' nullable='false' minLength='1' maxLength='50' errorPrompt='对不起,栏目名称应该由至少一个，最多50个字节大小的字符组成，仅包含中文，英文字母数字和下划线。'"/>					
		    </td>
		   </tr> 
		  <tr>
		    <td  nowrap width="15%">栏目存放位置</td>
		    <td  width="85%">
			  <EF:EFInput blockId="result" ename="columnAlias" row="0" trim="false"
			  etc="validateType='string' nullable='false' minLength='1' maxLength='50' errorPrompt='对不起,栏目存放位置应该由至少1个，最多50个字节大小的字符组成，仅包含英文字母、数字和下划线。'"/>					
		    </td>
		   </tr> 		   
		   <tr> 
		    <td  nowrap width="15%">排序标识</td>
		    <td   width="85%">
			  <EF:EFInput blockId="result" ename="columnSeq" row="0" etc="readonly"/>					
		    </td>	
		   </tr> 

		   <tr > 
		    <td  nowrap width="15%">所属文章审核控制</td>
		    <td   width="85%">
			  <EF:EFSelect blockId="result" ename="isAudit" row="0">
	          <EF:EFOption label="是" value="1"/>
	          <EF:EFOption label="否" value="0"/>
	          </EF:EFSelect>						  					
		    </td>	
		   </tr> 

		   <tr> 
		    <td  nowrap width="15%">所属文章引用控制</td>
		    <td   width="85%">
			  <EF:EFSelect blockId="result" ename="isRefer" row="0">
	          <EF:EFOption label="是" value="1"/>
	          <EF:EFOption label="否" value="0"/>
			  </EF:EFSelect>
		    </td>	
		   </tr> 

		   <tr> 
		    <td  nowrap width="15%">是否允许匿名浏览</td>
		    <td   width="85%">
			  <EF:EFSelect blockId="result" ename="isAnony" row="0">
	          <EF:EFOption label="是" value="1"/>
	          <EF:EFOption label="否" value="0"/>
			  </EF:EFSelect>
		    </td>	
		   </tr> 
		   
		   <tr> 
		    <td  nowrap width="15%">栏目类型</td>
		    <td   width="85%">
			  <EF:EFSelect blockId="result" ename="columnType" row="0">
	          <EF:EFOption label="普通栏目" value="0"/>
	          <EF:EFOption label="cognos类型" value="2"/>
			  </EF:EFSelect>
		    </td>	
		   </tr>
     
		</table>
	</div>
</div>
<EF:EFRegion/>  
<jsp:include flush="false" page="../../EF/Form/iplat.ef.tail.jsp"></jsp:include>
</form>
</body>
</html>
