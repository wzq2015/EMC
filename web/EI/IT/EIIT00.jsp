<!DOCTYPE html>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@page import="java.util.*" %>
<%@page import="com.baosight.iplat4j.ef.ui.column.*" %>

<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>
<%
	String actionUrl = request.getContextPath() + "/DispatchAction.do";
%>

<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	<title>	</title>
	
	<script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
	<script type="text/javascript" src="./EI/IT/EIIT00.js"></script>
	
</head>
<body class="bodyBackground">

<form id="EIIT00" method="POST" action="<%=actionUrl%>" >

<jsp:include flush="false" page="../../EF/Form/iplat.ef.head.jsp"></jsp:include>

<div id = "ef_region_inqu" title="查询条件" efRegionShowClear=true>
	<div style="overflow:hidden;width:100%">
		<table>
		  <tr>
		    <td width="20%" align="right">
		      字段索引号
		    </td>
		    <td width="20%">
		      <EF:EFInput blockId="inqu_status" ename="itemSeq" row="0" etc="onkeyup=&quot;value=value.replace(/[^\d]/g,'')&quot;,onbeforepaster=&quot;clipboardData.text=clipboardData.text.replace(/[^\d]/g,'')&quot;" />
		    </td>
		    <td width="10%" align="right">
		      字段英文名
		    </td>
		    <td width="20%">
		      <EF:EFInput blockId="inqu_status" ename="itemEname" row="0" style="text-transform : uppercase;" />
		    </td>
		    <td width="10%" align="right">
		      字段中文名
		    </td>
		    <td width="20%">
		      <EF:EFInput blockId="inqu_status" ename="itemCname" row="0"/>
		    </td>
		  </tr>		  
		</table> 
	</div>
</div>  


<div id = "ef_region_result" title="记录集" style="overflow:scroll"> 
	<div id = "ef_grid_result" title="页面信息" style="overflow: hidden;height:400px;">
	</div> 
</div>     

<div id="ef_tab_y"  lastRange="98%" eftabWidth="100%" eftabType="efRoundDivTab">
<div id="item" title="信息项明细信息" >
<div id = "ef_region_result2" title="信息项明细信息" efRegionShowClear=true>
	<div style="overflow:hidden;width:100%">
	   <table>
		<table>
		  <tr>
		    <td nowrap width="15%" >
		      字段索引号
		    </td>
		    <td nowrap width="20%">
		      <EF:EFInput blockId="result2" ename="itemSeq" row="0" etc="readOnly"/>				
		    </td>
		    <td></td>
		    <td></td>
		    <td></td>
		    <td></td>
		  </tr>
		 </table>
		 <hr>
		 <table>
		    <tr>
		      <td nowrap width="15%">
		        字段英文名
		      </td>
		      <td nowrap width="20%">
		       <EF:EFInput blockId="result2" ename="itemEname" row="0" style="text-transform : uppercase;" etc="maxlength='30'"/>
		      </td>
		      <td nowrap width="15%">
		       字段中文名
		      </td>
		      <td nowrap width="20%">
		        <EF:EFInput blockId="result2" ename="itemCname" row="0" etc="maxlength='50'"/>
		      </td>
		 
		      <td nowrap width="15%">
		       字段等级
		      </td>
		      <td nowrap width="20%">
		       <EF:EFSelect blockId="result2" ename="itemGrade" row="0">
		       <EF:EFOption label="一般" value="0"></EF:EFOption>
		       <EF:EFOption label="高级" value="1"></EF:EFOption>
		       </EF:EFSelect>
		      </td>		    
		  </tr>	              
		  <tr>
		    <td nowrap width="15%">
		      字段类型
		    </td>
		    <td nowrap width="20%">
		    <EF:EFSelect blockId="result2" ename="itemType" row="0"  etc='onChange=itemTypeChange();'>
		     <EF:EFOption label="字符" value="C"></EF:EFOption>
		     <EF:EFOption label="数值" value="N"></EF:EFOption>
		     <EF:EFOption label="BLOB" value="BLOB"></EF:EFOption>
		     <EF:EFOption label="CLOB" value="CLOB"></EF:EFOption>
		     </EF:EFSelect>
		    </td>
		    <td nowrap width="15%">
		       字段长度
		    </td>
		    <td nowrap width="20%">
		      <EF:EFInput blockId="result2" ename="itemLen" row="0"  etc="maxlength='10'"/>
		    </td>
		 
		    <td nowrap width="15%">
		      字段单位
		    </td>
		    <td nowrap width="20%">
		     <EF:EFInput blockId="result2" ename="itemUnit" row="0" etc="maxlength='10'"/>	
		    </td>
		  </tr>
		
		   <tr>
		    <td nowrap width="15%">
		      字段上限值
		    </td>
		    <td nowrap width="20%">
		      <EF:EFInput blockId="result2" ename="itemUpperValue" row="0" etc="maxlength='20'"/>
		    </td>
		    <td nowrap width="15%">
		      字段下限值
		    </td>
		    <td nowrap width="20%">
		      <EF:EFInput blockId="result2" ename="itemLowerValue" row="0"  etc="maxlength='20'"/>
		    </td>
		  
		    <td nowrap width="15%">
		      字段缺省值
		    </td>
		    <td nowrap width="20%">
		      <EF:EFInput blockId="result2" ename="itemDefaultValue" row="0"  etc="maxlength='20'"/>	
		    </td>
		   </tr>
		 
		   <tr>
		    <td nowrap width="15%">
		     字段是否可空
		    </td>
		    <td nowrap width="20%">
		      <EF:EFSelect blockId="result2" ename="itemAllowNull" row="0">
		       <EF:EFOption label="否" value="N"></EF:EFOption>
		       <EF:EFOption label="是" value="Y"></EF:EFOption>
		    </EF:EFSelect>
		    </td>
		    <td nowrap width="15%">
		     备注
		    </td>
		    <td nowrap width="20%">
		    <EF:EFInput type="textarea" blockId="result2" ename="remark" row="0" etc="maxlength='100'"/>
		    </td>
		  </tr>
		  
		  </table>
		      <hr>
		   <table>
		 
		    <tr>
		    <td nowrap width="15%">
		      记录创建责任者
		    </td>
		    <td nowrap width="20%">
		    <EF:EFInput blockId="result2" ename="recCreator" row="0" etc="readOnly"/>	
		    </td>
		    <td nowrap width="15%">
		     记录创建时刻
		    </td>
		    <td nowrap width="20%">
		    <EF:EFInput blockId="result2" ename="recCreateTime" row="0" etc="readOnly" />
		    </td>
		    <td nowrap width="15%">
		     记录修改责任者
		    </td>
		    <td nowrap width="20%">
		    <EF:EFInput blockId="result2" ename="recRevisor" row="0" etc="readOnly" />
		    </td>
		  </tr>
		  
		    <tr>
		    <td nowrap width="15%">
		      记录修改时刻
		    </td>
		    <td nowrap width="20%">
		    <EF:EFInput blockId="result2" ename="recReviseTime" row="0" etc="readOnly"/>	
		    </td>
		    <td nowrap width="15%">
		     归档标记
		    </td>
		    <td nowrap width="20%">
		    <EF:EFInput blockId="result2" ename="archiveFlag" row="0" etc="readOnly" />
		    </td>
		  </tr>
		</table>
		</table>
	</div>
</div>  
</div>

<div id="item2" title="信息项引用表">
<div id = "ef_region_result3" title="信息项引用表" style="overflow:scroll"> 
	<div id = "ef_grid_result3" title="页面信息" style="overflow: hidden;height:200px;">  
	</div> 
		<EF:EFInput blockId="table_inqu_status" ename="itemSeq" row="0" type="hidden"/>	
		<div style="overflow:hidden;width:100%">
		<table>
		  <tr>
		    <td width="20%" align="right">
		      替换后的信息项索引号
		    </td>
		    <td width="20%">
		      <EF:EFInput blockId="inqu1_status" ename="itemSeq1" row="0" etc="onkeyup=&quot;value=value.replace(/[^\d]/g,'')&quot;,onbeforepaster=&quot;clipboardData.text=clipboardData.text.replace(/[^\d]/g,'')&quot;" />
		    </td>
		    <td width="20%" align="right">
		      替换后的信息项信息
		    </td>
		     <td width="20%" align="left">		    
		      <EF:EFInput  blockId="item_result" ename="itemResult" row="0" etc="readonly"/>
		    </td>
		  </tr>	  
		</table> 
		</div>
	</div>
 </div>		
</div>

</div>

<EF:EFRegion/>

<EF:EFGrid blockId="result" ajax="true" style="navigationBar:true;operationBar:false" autoDraw="no">
<EF:EFColumn ename="itemSeq" cname="字段索引号"  width="80" sort="true" fix="yes" readonly="true" />	
<EF:EFColumn ename="itemEname" cname="字段英文名" width="100" readonly="true"/>
<EF:EFColumn ename="itemCname" cname="字段中文名" width="200" readonly="true" />
<EF:EFComboColumn ename="itemGrade" cname="字段等级" valueProperty="value" labelProperty="lable" readonly="true">
<EF:EFOption label="一般" value="0"></EF:EFOption>
<EF:EFOption label="高级" value="1"></EF:EFOption>
</EF:EFComboColumn>	
<EF:EFComboColumn ename="itemType" cname="字段类型" valueProperty="value" labelProperty="lable" readonly="true">
<EF:EFOption label="字符" value="C"></EF:EFOption>
<EF:EFOption label="数值" value="N"></EF:EFOption>
<EF:EFOption label="BLOB" value="BLOB"></EF:EFOption>
<EF:EFOption label="CLOB" value="CLOB"></EF:EFOption>
</EF:EFComboColumn>	
<EF:EFColumn ename="itemLen" cname="字段长度" maxLength="50" readonly="true" />
<EF:EFColumn ename="itemUnit" cname="字段单位" readonly ="true" />	
<EF:EFColumn ename="itemUpperValue" cname="字段上限值" readonly="true"/>
<EF:EFColumn ename="itemLowerValue" cname="字段下限值" readonly="true"/>
<EF:EFColumn ename="itemDefaultValue" cname="字段缺省值" readonly="true"/>
<EF:EFComboColumn ename="itemAllowNull" cname="字段是否可空" valueProperty="value" labelProperty="lable" readonly="true">
<EF:EFOption label="否" value="N"></EF:EFOption>
<EF:EFOption label="是" value="Y"></EF:EFOption>
</EF:EFComboColumn>	
<EF:EFColumn ename="remark" cname="备注" maxLength="50" readonly="true"/>
<EF:EFColumn ename="checkResult" cname="检查结果" width="500" editType="textarea" enable="false" readonly="true"/>	
</EF:EFGrid>  

<EF:EFGrid blockId="result3" ajax="true" style="navigationBar:true;operationBar:false" autoDraw="no" queryMethod="queryTable">

<EF:EFColumn ename="tableEname" cname="引用表英文名" sort="true"/>	
<EF:EFColumn ename="tableCname" cname="表中文名" />
<EF:EFColumn ename="projectEname" cname="项目英文名" sort="true"/>
</EF:EFGrid>     

<EF:EFTab tabId="y" /> 

<jsp:include flush="false" page="../../EF/Form/iplat.ef.tail.jsp"></jsp:include>
</form>

</body>
</html>   
