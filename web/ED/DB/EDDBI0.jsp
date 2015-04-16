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
	<script type="text/javascript" src="./ED/DB/EDDBI0.js"></script>
	
</head>
<body class="bodyBackground">

<form id="EDDBI0" method="POST" action="<%=actionUrl%>" >

<jsp:include flush="false" page="../../EF/Form/iplat.ef.head.jsp"></jsp:include>

<div id = "ef_region_inqu" title="表索引维护" efRegionShowClear=false>
	<div id="ef_region_main">
        <table id="mainFrameTable" width="100%"  height="82%" cellpadding=1 cellspacing=0 >
    	  
    	  <tr height="100%">
    	        <td id="leftTree" vAlign="top"  >
                     <div id="leftTreeDiv" class="ef-tree-div" style='overflow:auto;height:100%;'>
    		    <EF:EFTree model="tableTreeModel" id="nTree" text="表信息" configFunc="configTree">
    		    </EF:EFTree>
    		  </div>                   
    		 </td>
    		
            <td id="rightContent" width="75%"  vAlign="top" >
			  <div id = "ef_region_result" title="表体信息" style="overflow:scroll"> 
				<div id = "ef_grid_result" title="表体信息" style="overflow: hidden;height:400px;">
				</div> 
				<div id = "ef_region_select" align="right"> 
		           排序方式:
		          <EF:EFSelect blockId="select" ename="itemSortType" row="0" etc=' styleClass="inputField" '>
	              <EF:EFOption value="D" label="降序-D" />
                  <EF:EFOption value="A" label="升序-A" />
                  </EF:EFSelect>
	            </div> 
               </div>       
            </td> 
          </tr>
          
          <EF:EFInput blockId="inqu_status" ename="projectEname" row="0" type="hidden"/>
		  <EF:EFInput blockId="inqu_status" ename="tableEname" row="0" type="hidden"/>
   
        <tr>
    	   <td id="result1"  width="25%">
    	      <div id = "ef_region_result1" title="表索引信息" style="overflow:scroll"> 
				<div id = "ef_grid_result1" title="表索引信息" style="overflow: hidden;height:150px;">
				</div> 
			  </div>
    	    </td>
    	 
      
    	    <td id="result2" width="75%"  vAlign="top" >
                <div id = "ef_region_result2" title="索引对应的信息项" style="overflow:scroll"> 
				   <div id = "ef_grid_result2" title="索引对应的信息项" style="overflow: hidden;height:150px;">
				   </div> 
			    </div>
    	    </td>
    	  </tr>
        
        </table>
	</div>
</div>  

  
<EF:EFRegion/>
<%--<EF:EFGrid blockId="result" ajax="true" autoDraw="yes" style="navigationBar:false;operationBar:false">	
</EF:EFGrid> --%>

<EF:EFGrid blockId="result" ajax="true" autoDraw="no"  style="navigationBar:false;operationBar:false">
	<EF:EFColumn ename="projectEname" readonly="true" width="80" />
	<EF:EFColumn ename="tableEname" readonly="true" width="80" />
	<EF:EFColumn ename="itemSeq"  cname="数据项" readonly="true"/>
	<EF:EFColumn ename="tableItemSeq" cname="序号"  readonly="true" width="30"/>
	<EF:EFColumn ename="tableItemType" cname="类型" readonly="true" width="30"/>
	<EF:EFColumn ename="modelTableEname"  readonly="true"/>
	<EF:EFColumn ename="itemEname"  readonly="true"/>
	<EF:EFColumn ename="itemCname"  readonly="true"/>
	<EF:EFColumn ename="tableIndexType"  readonly="true"/>
	<EF:EFColumn ename="itemType"  readonly="true"/>
	<EF:EFColumn ename="itemLen"  readonly="true"/>
	<EF:EFColumn ename="itemUnit"  readonly="true"/>
	<EF:EFColumn ename="checkResult"  readonly="true"/>
	
</EF:EFGrid>      

<EF:EFGrid blockId="result1" ajax="true" autoDraw="no" style="navigationBar:false;operationBar:true">
<EF:EFColumn ename="indexEname"  cname="索引英文名"   readonly="true"  fix="yes" sort="false" nullable="false" maxLength="40" />
<EF:EFComboColumn ename="tableIndexType" cname="索引类型" valueProperty="value"  labelProperty="label"  formatString="#labelString#-#valueString#" readonly="true" >
<EF:EFOption value="PK" label="主键索引" />
<EF:EFOption value="UI" label="唯一索引" />
<EF:EFOption value="I" label="其它" />
</EF:EFComboColumn>
</EF:EFGrid> 


 
<EF:EFGrid blockId="result2" ajax="true" autoDraw="no"  style="navigationBar:false;operationBar:false">	
<EF:EFColumn ename="projectEname"  cname="项目英文名"  fix="yes" sort="false"  width="100" nullable="false"  readonly="true" />
<EF:EFColumn ename="tableEname" cname="表英文名"   fix="yes" sort="false" width="100" nullable="false"   readonly="true"/>
<EF:EFColumn ename="indexEname" cname="索引英文名"  fix="yes" sort="false" width="100" nullable="false"  readonly="true"/>
<EF:EFColumn ename="tableIndexType" cname="索引类型"     width="100" nullable="false"   readonly="true"/>
<EF:EFColumn ename="indexSeq" cname="索引号"   fix="yes" sort="false"  width="100" nullable="false"  readonly="true" />
<EF:EFColumn ename="itemSeq" cname="信息项号"    width="100" nullable="false"  readonly="true"/>
<EF:EFColumn ename="itemSortType" cname="信息项排列顺序"   width="100" nullable="false"  readonly="true" />
</EF:EFGrid>       

<jsp:include flush="false" page="../../EF/Form/iplat.ef.tail.jsp"></jsp:include>
</form>

</body>
</html>   
