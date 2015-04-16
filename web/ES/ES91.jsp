<!DOCTYPE html>
<%@page pageEncoding="UTF-8" contentType="text/html;charset=UTF-8"%>

<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld"%>

<%
	String contextpath = request.getContextPath();
	String baseUrl = contextpath;
	String listUrl = baseUrl + "/DispatchAction.do";
%>

<html>
 <head>	
  <script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
  <script type="text/javascript" src="./ES/ES91.js"></script>
 </head>
 
 <body class="bodyBackground">
  <form method="POST" action="<%=listUrl%>">
    <jsp:include flush="false" page="../EF/Form/iplat.ef.head.jsp"></jsp:include>
    <EF:EFInput blockId="inqu_status" row="0" ename="parent" type="hidden"/>
    <EF:EFInput blockId="inqu_status" row="0" ename="pnode" type="hidden"/>
    <EF:EFInput blockId="inqu_status" row="0" ename="page" type="hidden"/>
    <EF:EFInput blockId="inqu_status" row="0" ename="authorize" type="hidden"/>
    <input type="hidden" id="inqu_status-0-pageType" name="inqu_status-0-pageType" value="IANA" />
    <input type="hidden" id="inqu_status-type" name="inqu_status-type" value="" />
    <input type="hidden" id="inqu_status-target" name="inqu_status-target" value="" />
    
    <EF:EFInput blockId="inqu_status" row="0" ename="parentOrgCodeT" type="hidden"/>
    
    <table id="mainFrameTable" width="100%"  height="87%">      
    
	  <tr height=100%>
	    <td id="leftTree" vAlign="top" width="280px" height="100%" style="background-color: #f0f3f4; padding-top:10px;">		                    
          <div id = "ef_region_tree" title="子机构列表" efRegionShowClear=false> 
		       <table width="100%" height="550px">
		         <tr height="90%" border=1><td vAlign="top">
		           <div id="leftTreeDiv" style='overflow:auto; width:210px; height:100%;'>
		             <EF:EFTree model="HROGTreeModel" id="nTree" text="组织架构树" configFunc="configHROGTree">
                     </EF:EFTree>
                   </div>
		         </td></tr>
		       </table>
		     </div>
		 </td>

		<td id="rightContent" width=100%  vAlign="top" >
		  <table width="100%">		   
		   <tr>
		    <td width="100%">
	       
		        <div id = "ef_region_org" title="子机构列表" efRegionShowClear=true>
		         <div>
		           <table border=0>
		           <tr>
		             <td nowrap>机构编码</td>
		             <td><EF:EFInput blockId="inqu_status" ename="orgCode" row="0" etc='size=20'/></td>
		             <td>&nbsp;&nbsp;</td>
		             <td nowrap>机构名称</td>
		             <td><EF:EFInput blockId="inqu_status" ename="orgName" row="0" etc='size=20'/></td>
		             <td>&nbsp;&nbsp;</td>
		             <!--
		             <td nowrap>搜索子机构<EF:EFInput type="checkbox" blockId="inqu_status" ename="recursiveOrg" row="0"/></td>
		             <td>&nbsp;&nbsp;</td>
		             -->
		             <!-- <td nowrap class='buttonRegular'><span style='CURSOR: hand;' onclick=button_f2_onclick()>&nbsp;查询&nbsp;</span></td>  -->
		             <td>
		            <EF:EFButton  type="button" ename="f2" cname="查询" /> 
		             </td>  	 		 		             
	               </tr>
	              </table>
		         </div>		         
                 <div id = "ef_grid_p" title="子机构列表" style="overflow: hidden;height:200px;">
                 </div>
                </div>
		       </td>
		      </tr>
		      <tr>		         
		       <td>
		        <div id = "ef_region_emp" title="员工列表" efRegionShowClear=false>
		        <div>
		         <table width="100%" border=0>
		           <tr>
		             <td nowrap>员工过滤</td>
		             <td style="width:20%">
		               <EF:EFSelect blockId="inqu_status" ename="rangeUser" row="0" >
		                <EF:EFOption label="所有员工" value="" />
		                <EF:EFOption label="系统用户" value="TRUE" />
		               </EF:EFSelect>
		             </td>
		             <td>&nbsp;&nbsp;</td>
		             <td nowrap>员工工号</td>
		             <td style="width:20%"><EF:EFInput blockId="inqu_status" ename="empCode" row="0" etc='size=15'/></td>
		             <td>&nbsp;&nbsp;</td>
		             <td nowrap>员工姓名</td>
		             <td style="width:20%"><EF:EFInput blockId="inqu_status" ename="empName" row="0" etc='size=15'/></td>
		             <td>&nbsp;&nbsp;</td>
  	                </tr>
	               	<tr>
	               	 <td nowrap>机构编码</td>
		             <td style="width:20%"><EF:EFInput blockId="inqu_status" ename="orgCode" row="0" etc='size=15'/></td>
		             <td>&nbsp;&nbsp;</td>
		             <td nowrap>机构名称</td>
		             <td style="width:20%"><EF:EFInput blockId="inqu_status" ename="orgName" row="0" etc='size=15'/></td>
		             <!--  
		             <td nowrap>搜索子机构<EF:EFInput type="checkbox" blockId="inqu_status" ename="recursiveEmp" row="0"/></td>
		             <td>&nbsp;&nbsp;</td>
		             -->
	               	<td colspan="10" align="right">
		             <EF:EFButton type="button"	ename="f3" cname="查询" /> 	
		             </td>	
	               </tr>
	              </table>
			     <div id = "ef_grid_e" title="员工列表" style="overflow: hidden;height:250px;">
                 </div>
		       </td>
		      </tr>
		     </table>

		   </td>		   
	  </tr>
    </table>

    <EF:EFRegion/>

    <EF:EFGrid blockId="result" autoDraw="no" ajax="true" style="operationBar:false" queryMethod="query" paintId="ef_grid_p" serviceName = "ESHR01">
	  <EF:EFColumn ename="orgCode" cname="机构编码" enable="false" fix="yes"/>
	  <EF:EFColumn ename="orgName" cname="机构名称" width="200" enable="false"/>
	  <EF:EFColumn ename="targetOrgMgCode" cname="父机构" width="100" enable="false"/>
	  <EF:EFColumn ename="orgBriefName" cname="机构简称" width="200" enable="false"/>	  
	  <EF:EFColumn ename="path" cname="机构路径" width="300" enable="false"/>	  	
    </EF:EFGrid>
  
  
   <EF:EFGrid blockId="result" autoDraw="no" ajax="true" style="operationBar:false" paintId="ef_grid_e" queryMethod="queryEmp"  serviceName="ESHR01">
	<EF:EFColumn ename="empCode" cname="工号" enable="false" fix="yes" sort="false"/>
	<EF:EFColumn ename="empName" cname="姓名全称" enable="false" />
	<EF:EFColumn ename="orgId"  enable="false" visible="false"/>
	<EF:EFColumn ename="orgCode" cname="机构编码" enable="false" width="150"/>
	<EF:EFColumn ename="orgName" cname="机构名称" enable="false" />
	<EF:EFColumn ename="idcardNo" cname="证件号码" enable="false" width="150"/>
  </EF:EFGrid>
  

    <jsp:include flush="false" page="../EF/Form/iplat.ef.tail.jsp"></jsp:include>
  </form>
</body>
</html>
