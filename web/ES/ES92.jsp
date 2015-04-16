<!DOCTYPE html>
<%@page pageEncoding="UTF-8" contentType="text/html;charset=UTF-8"%>

<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>

<%
	String contextpath = request.getContextPath();
	String baseUrl = contextpath;
	String listUrl = baseUrl + "/DispatchAction.do";
%>

<html>
 <head>	
  <script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
  <script type="text/javascript" src="./ES/ES92.js"></script>
 </head>
 
 <body class="bodyBackground">
  <form method="POST" action="<%=listUrl%>">
    <jsp:include flush="false" page="../EF/Form/iplat.ef.head.jsp"></jsp:include>   
    
    <EF:EFInput blockId="inqu_status" row="0" ename="parentOrgCodeT" type="hidden"/>
    <EF:EFInput blockId="inqu_status" row="0" ename="oldOrgCodeT" type="hidden"/>
    <EF:EFInput blockId="inqu_status" row="0" ename="newOrgCodeT" type="hidden"/>
    
    <table id="mainFrameTable" width="100%"  height="87%">      
    
	  <tr height=100%>
	    <td id="leftTree" vAlign="top" width="270px" height="100%" style="background-color: #f0f3f4; padding-top:10px;">		                    
		   <div id = "ef_region_mtree" title="原机构列表" efRegionShowClear=false>
		     <table width="100%" height="250px">
		         <tr height="45%" border=1><td vAlign="top">
		           <div id="leftMTreeDiv" style='overflow:auto; width:210px; height:100%;'>
		             <EF:EFTree model="HROGTreeModel" id="mTree" text="原组织架构树" configFunc="configOriginalTree">
                     </EF:EFTree>
                   </div>
		         </td></tr>
		       </table>		   
		   </div>
		  
           <div id = "ef_region_ntree" title="现机构列表" efRegionShowClear=false> 
		       <table width="100%" height="250px">
		         <tr height="45%" border=1><td vAlign="top">
		           <div id="leftTreeDiv" style='overflow:auto; width:210px; height:100%;'>
		             <EF:EFTree model="HROGTreeModel" id="nTree" text="现组织架构树" configFunc="configCurrentTree">
                     </EF:EFTree>
                   </div>
		         </td></tr>
		       </table>
		     </div>		  	      
		 </td>

		<td id="rightContent" width=100%  vAlign="top" >
		        <div id = "ef_region_inqu" title="搜索条件" efRegionShowClear=false>		        		         
                 <div>
                 <table border=0>
                  <tr>
                   <td  nowrap>开始日期</td>
		           <td  style="width:20%">
		            <EF:EFInput blockId="inqu_status" ename="IMP_DATE_START" row="0" popup="date" etc="maxLength='8' size='8'" />			  
		           </td>
		           <td>&nbsp;&nbsp;</td>
		           
		           <td  nowrap>截止日期</td>
		           <td  style="width:20%">
		            <EF:EFInput blockId="inqu_status" ename="IMP_DATE_END" row="0" popup="date" etc="maxLength='8' size='8'" />			  
		           </td>
		           <td>&nbsp;&nbsp;</td>
		           
                     <td nowrap>变动类型</td>
		             <td style="width:20%">
		               <EF:EFSelect blockId="inqu_status" ename="changeType" row="0" >
		                <EF:EFOption label="全部" value="" />
		                <EF:EFOption label="离职" value="O" />
		                <EF:EFOption label="调动" value="M" />
		                <EF:EFOption label="新进" value="I" />
		               </EF:EFSelect>
		             </td>
		             <td>&nbsp;&nbsp;</td>
		             
		             <td nowrap>员工过滤</td>
		             <td style="width:20%">
		               <EF:EFSelect blockId="inqu_status" ename="rangeUser" row="0" >
		                <EF:EFOption label="所有员工" value="" />
		                <EF:EFOption label="系统用户" value="TRUE" />
		               </EF:EFSelect>
		             </td>
		             
                   </tr>
		           <tr>		             
		             <td nowrap>员工工号</td>
		             <td style="width:20%"><EF:EFInput blockId="inqu_status" ename="empCode" row="0" etc='size=8'/></td>
		             <td>&nbsp;&nbsp;</td>
		             
		             <td nowrap>员工姓名</td>
		             <td style="width:20%"><EF:EFInput blockId="inqu_status" ename="empName" row="0" etc='size=10'/></td>
		             <td>&nbsp;&nbsp;</td>
		            <!--  
		             <td nowrap>原机构递归</td>
		             <td><EF:EFInput type="checkbox" blockId="inqu_status" ename="recursiveOld" row="0"/></td>
		             <td>&nbsp;&nbsp;</td>
		             
		             <td nowrap>现机构递归</td>
		             <td><EF:EFInput type="checkbox" blockId="inqu_status" ename="recursiveNew" row="0"/></td>
		              -->
	               </tr>
	              </table>
                 </div>
                </div>


	      <div id = "ef_region_result" title="员工变动" efRegionShowClear=false>		        
		      <div id = "ef_grid_e" title="员工变动" style="overflow: hidden;height:400px;">
          </div>
        </td>
	  </tr>
    </table>

    <EF:EFRegion/>

  
   <EF:EFGrid blockId="result" autoDraw="no" ajax="true" style="operationBar:false" paintId="ef_grid_e" queryMethod="queryEmpChange"  serviceName="ESHR01">
	<EF:EFColumn ename="empCode" cname="工号" enable="false" fix="yes" sort="false"/>
	<EF:EFColumn ename="empName" cname="姓名" enable="false" />	
	<EF:EFColumn ename="oldOrgCode" cname="原机构编码" enable="false"/>
	<EF:EFColumn ename="oldOrgName" cname="原机构名称" enable="false" />
	<EF:EFColumn ename="newOrgCode" cname="现机构编码" enable="false"/>
	<EF:EFColumn ename="newOrgName" cname="现机构名称" enable="false" />
	<EF:EFColumn ename="changeDate" cname="变动日期" enable="false" />
	<EF:EFColumn ename="changeType" cname="变动类型" enable="false" />
  </EF:EFGrid>
  

    <jsp:include flush="false" page="../EF/Form/iplat.ef.tail.jsp"></jsp:include>
  </form>
</body>
</html>
