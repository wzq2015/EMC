<!DOCTYPE html>
<%@ page contentType="text/html; charset=UTF-8"%>

<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld"%>
<%
String actionUrl = request.getContextPath() + "/DispatchAction.do";
%>

<html>
<head>
<meta http-equiv="Content-Type" content="text/html; 
	charset=UTF-8" />
<title></title>

<script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
<script type="text/javascript" src="./ED/EDFA50.js"></script>

</head>
<body class="bodyBackground">

<form id="EDFA00" method="POST" action="<%=actionUrl%>"><jsp:include
	flush="false" page="../EF/Form/iplat.ef.head.jsp"></jsp:include>

<div id="ef_region_result" title="可提供个性化设置的查询选项" >
<div style="overflow:hidden;width:100%">

<EF:EFInput blockId="inqu_status" ename="formEname" row="0" type="hidden"/>
<EF:EFInput blockId="inqu_status" ename="funcId" row="0" type="hidden"/>
<EF:EFInput blockId="inqu_status" ename="gridId" row="0" type="hidden"/>

<table>
	<tr>
		<td width="45%">
		    <div id = "ef_region_unseleted" title="查询界面还可以添加的字段" style="overflow:scroll"> 
	        <div style="overflow:hidden;width=100%">
	            <EF:EFSelect blockId="" ename="unselected" row=""
	            	etc="style='width=100%;height:204px' multiple=true 
	            	onclick=Button_Status_Set(this) ondblclick=ef.get('button_rightAll').click()">
	            </EF:EFSelect>
	        </div>
	        <div id = "leftCheckBox" align=center>
	        <EF:EFInput blockId="" ename="leftCheckAll" row="" type="checkbox" etc="onclick=button_checkAll_onclick(this);Button_Status_Set(ef.get('unselected'));">
	        </EF:EFInput> 全选  
	        </div>	   
   
	      </div>
		</td>
		
		<td width="10%">
		<div nowrap class='buttonRegular' height=40 id="button_leftMoveAll"
			onClick="button_moveAll_onclick(ef.get('selected'),ef.get('unselected'))">
			<span style='CURSOR: hand;' >&nbsp;<<&nbsp;</span>
		</div>
		<br>		
		<div nowrap class='buttonRegular' height=40 id="button_leftAll"
			onClick="button_move_onclick(ef.get('selected'),ef.get('unselected'));">
			<span style='CURSOR: hand;' >&nbsp;<&nbsp;</span>
		</div>
	
		<br>
		<div nowrap class='buttonRegular' height=40 id="button_rightAll"
			onClick="button_move_onclick(ef.get('unselected'),ef.get('selected'))">
			<span style='CURSOR: hand;' >&nbsp;>&nbsp;</span>
		</div>		
		<br>
		<div nowrap class='buttonRegular' height=40 id="button_rightMoveAll"
			onClick="button_moveAll_onclick(ef.get('unselected'),ef.get('selected'))">
			<span style='CURSOR: hand;' >&nbsp;>>&nbsp;</span>
		</div>			
		</td>
		<td width="45%">
		    <div id = "ef_region_selected" title="已经选择的字段" style="overflow:scroll"> 
	        <div style="overflow:hidden;width=100%">
				<EF:EFSelect blockId="" ename="selected" row="" etc="multiple=true  style='width=100%;height:204px' 
						onclick=Button_Status_Set(this) ondblclick=ef.get('button_leftAll').click()">	   
				</EF:EFSelect>         
	        </div>
	        <div id = "rightCheckBox" align=center>
	        <EF:EFInput blockId="" ename="rightCheckAll" row="" type="checkbox" etc="onclick=button_checkAll_onclick(this);Button_Status_Set(ef.get('selected'));">
	        </EF:EFInput> 全选  	        	
	        </div>
	      </div>
		</td>
		<td width="10%">
		<div id="moveUpButton" nowrap class='buttonRegular' onClick="button_moveUp_onclick(true);" height=40 >
			<span style='CURSOR: hand;'  >&nbsp;向上&nbsp;</span>
		</div>			
		<br>
		<div id="moveDownButton" nowrap class='buttonRegular' height=40 onClick="button_moveUp_onclick(false);">
			<span style='CURSOR: hand;'  >&nbsp;向下&nbsp;</span>
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
