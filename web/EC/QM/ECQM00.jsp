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
  <script type="text/javascript" src="./EC/QM/ECQM00.js"></script>
 </head>
 
 <body class="bodyBackground">
  <form method="POST" action="<%=listUrl%>">
  <jsp:include flush="false" page="../../EF/Form/iplat.ef.head.jsp"></jsp:include>
  <table style="width:100%;height:87%;">  
  	<tr>
  		<td  vAlign="top" style="width:100%;">
  			<div id = "ef_region_inqu" title="查询条件" efRegionShowClear=true>
				<div style="overflow:hidden;">
					<table width="100%">
		  				<tr>
		  					<td>
		  						问卷名称：
		  					</td>
		    				<td>
		    					<EF:EFInput blockId="inqu_status" ename="questionnaireName" row="0" etc="style='width:100px;'"/>
		    				</td>
		    				<td>
		    					是否匿名：
		  					</td>
		    				<td>
		    					<EF:EFSelect blockId="inqu_status" ename="isAnony" row="0" etc="style='width:100px;'">
					    			<EF:EFOption label="" value=""></EF:EFOption>
					    			<EF:EFOption label="是" value="1"></EF:EFOption>
					    			<EF:EFOption label="否" value="0"></EF:EFOption>
				    			</EF:EFSelect>
		    				</td>
		    				<td>
		    					状态：
		  					</td>
		    				<td>
		    					<EF:EFSelect blockId="inqu_status" ename="questionnaireState" row="0" etc="style='width:100px;'">
					    			<EF:EFOption label="" value=""></EF:EFOption>
					    			<EF:EFOption label="有效" value="1"></EF:EFOption>
					    			<EF:EFOption label="无效" value="0"></EF:EFOption>
				    			</EF:EFSelect>
		    				</td>
		  				</tr>
					</table>
				</div>
			</div>
  			<div id = "ef_region_page" title="调查问卷信息" efRegionShowClear=false>		         
                 <div id = "ef_grid_n" title="调查问卷信息" style="overflow: hidden;height:320px;">
                 </div>
            </div>
  		</td>
  	</tr>
  	
  	<tr>
  	<td>
  		<table border="0" style="width:100%;">
  		<tr>
	  		<td style="width:55%;" vAlign="top">
	  			<div id = "ef_region_question" title="问卷题目信息" efRegionShowClear=false>		         
	                 <EF:EFInput blockId="inqu_status" ename="questionnaireId" row="0" type="hidden"/>
	                 <div id = "ef_grid_q" title="问卷题目信息" style="overflow:hidden;height:320px;">
	                 </div>
	            </div>
	  		</td>
	  		<td style="width:45%;" vAlign="top">
	  			<div id = "ef_region_selection" title="问卷选项信息" efRegionShowClear=false>	
	  				<EF:EFInput blockId="inqu_status" ename="questionId" row="0" type="hidden"/>	         
	                 <div id = "ef_grid_s" title="问卷选项信息" style="overflow:hidden;height:320px;">
	                 </div>
	            </div>
	  		</td>
  		</tr>
  		</talbe>
  	</td>
  	</tr>
  </table>
  
  <div id="modifyn" title='问卷信息编辑' class="efwindow" style="width:530px;">
	<div  id="ef_region_modifyn" title="问卷信息" style="width:500px;overflow:auto">
		<input  type="hidden" id="r1-0-questionnaireId"  name="r1-0-questionnaireId"/>
		<input  type="hidden" id="opstatus_r1"/>
		<input  type="hidden" id="r1-0-recCreator"  name="r1-0-recCreator"/>
		<input  type="hidden" id="r1-0-recCreateTime"  name="r1-0-recCreateTime"/>
		<table width="100%" align="center">
		<tr>
	 		<td>	
	 			问卷名称:
	 		</td>
			<td>
	 			<EF:EFInput blockId="r1" ename="questionnaireName" row="0" />
			</td>
			<td>	
	 			问卷状态:
	 		</td>
			<td>
				<EF:EFSelect  blockId="r1" ename="questionnaireState" row="0" etc="style='width:100px'">
					<EF:EFOption value="0" label="无效" />
					<EF:EFOption value="1" label="有效" />
				</EF:EFSelect>
			</td>
		</tr>
		<tr>
	 		<td>	
	 			开始时间:
	 		</td>
			<td>
	 			<EF:EFInput blockId="r1" ename="startTime" row="0" popup="date" etc="style='width:120px'"/>  
			</td>
			<td>	
	 			是否匿名:
	 		</td>
			<td>
	 			<EF:EFSelect  blockId="r1" ename="isAnony" row="0" etc="style='width:100px'">
					<EF:EFOption value="1" label="是" />
					<EF:EFOption value="0" label="否" />
				</EF:EFSelect>
			</td>
		</tr>
		<tr>
		<td>	
	 			结束时间:
	 		</td>
			<td>
				<EF:EFInput blockId="r1" ename="endTime" row="0" popup="date" etc="style='width:120px'"/>  	
			</td>
	 		
			<td>调查限制:</td>
			<td>
				<EF:EFSelect  blockId="r1" ename="isLimit" row="0" etc="style='width:100px'">
					<EF:EFOption value="0" label="无限制" />
					<EF:EFOption value="1" label="限单次" />
				</EF:EFSelect>
			</td>
		</tr>
		<tr>
	 		<td>	
	 			问卷前言:
	 		</td>
			<td colspan="3">
	 			<EF:EFInput type="textarea" blockId="r1" row="0" ename="questionnaireForeword" etc="cols='65' rows='20' style='height:200px;overflow-x:auto;overflow-y:auto'"/>
			</td>
			
		</tr>
	</table>
	</div>
</div>
  <EF:EFRegion/>
  <!--问卷Grid-->
  <EF:EFGrid blockId="result" autoDraw="no" enable="true" readonly="false" style="operationBar:false" ajax="true" paintId="ef_grid_n" queryMethod="queryQuestionnaire">
    <EF:EFColumn ename="questionnaireId" cname="问卷标识" fix="yes" width="150" enable="false"/>
    <EF:EFColumn ename="questionnaireName" cname='问卷名称' width="150" enable="false"/>
    <EF:EFComboColumn ename="isAnony" cname="是否匿名" width="80" readonly="true" enable="false">
		<EF:EFOption value="1" label="是" />
		<EF:EFOption value="0" label="否" />
	</EF:EFComboColumn>
	<EF:EFComboColumn ename="isLimit" cname="调查限制" width="80" readonly="true" enable="false">
		<EF:EFOption value="0" label="无限制" />
		<EF:EFOption value="1" label="限单次" />
	</EF:EFComboColumn>
	<EF:EFColumn ename="startTime" cname='开始日期' width="100" readonly="true" editType="date" dateFormatString="yyyy-MM-dd" enable="false"/>
	<EF:EFColumn ename="endTime" cname='结束日期' width="100" visible="true" readonly="true" editType="date" dateFormatString="yyyy-MM-dd" enable="false"/>
  	<EF:EFComboColumn ename="questionnaireState" cname='状态' width="100" readonly="true" enable="false">
  		<EF:EFOption label="" value=""/>
  		<EF:EFOption value="0" label="无效" />
		<EF:EFOption value="1" label="有效" />
  	</EF:EFComboColumn>
  	<EF:EFColumn ename="edit"  width="200" cname="操作" align="right" enable="false" />
  	<EF:EFColumn ename="recCreator" cname='创建人' width="100" readonly="true" enable="false"/>
  	<EF:EFColumn ename="recCreateTime" cname='创建时间' width="100" readonly="true" editType="date" dateFormatString="yyyy-MM-dd hh:mm:ss" enable="false"/>
  	<EF:EFColumn ename="recRevisor" cname='修改人' width="100" readonly="true" enable="false"/>
  	<EF:EFColumn ename="recReviseTime" cname='修改时间' width="100" readonly="true" editType="date" dateFormatString="yyyy-MM-dd hh:mm:ss" enable="false"/>
  	
  	<EF:EFColumn ename="questionnaireForeword" cname="问卷前言" visible="false"/>
  </EF:EFGrid>
  
  <!--问题Grid-->
  <EF:EFGrid blockId="result" autoDraw="no" enable="true" readonly="false" ajax="true" paintId="ef_grid_q" queryMethod="queryQuestion">
    <EF:EFColumn ename="orderCondition" cname='序号' fix="yes" validateType="number" validateErrorPrompt="序号"/>
	<EF:EFColumn ename="questionDesc" cname='问题描述' width="150"  validateType="NotEmpty"/>
	<EF:EFComboColumn ename="questionType" cname="问题类型" >
		<EF:EFOption label="" value=""></EF:EFOption>
		<EF:EFOption value="0" label="单选" />
		<EF:EFOption value="1" label="多选" />
	</EF:EFComboColumn>
  	<EF:EFComboColumn ename="selectionLimitType" cname='选项限制'>
  		<EF:EFOption label="" value=""/>
  		<EF:EFOption value="=" label="="/>
		<EF:EFOption value=">" label=">"/>
		<EF:EFOption value="<" label="<"/>
		<EF:EFOption value=">=" label=">="/>
		<EF:EFOption value="<=" label="<="/>
  	</EF:EFComboColumn>
  	<EF:EFColumn ename="selectionLimitValue" cname='限制值' />
  	<EF:EFColumn ename="recCreator" cname='创建人' width="100" readonly="true" enable="false"/>
  	<EF:EFColumn ename="recCreateTime" cname='创建时间' width="100" readonly="true" editType="date" dateFormatString="yyyy-MM-dd hh:mm:ss" enable="false"/>
  	<EF:EFColumn ename="recRevisor" cname='修改人' width="100" readonly="true" enable="false"/>
  	<EF:EFColumn ename="recReviseTime" cname='修改时间' width="100" readonly="true" editType="date" dateFormatString="yyyy-MM-dd hh:mm:ss" enable="false"/>
  	<EF:EFColumn ename="questionId" cname="问题ID" visible="false"/>
  	<EF:EFColumn ename="questionnaireId" cname="问卷ID" visible="false"/>
  </EF:EFGrid>
  
   <!--选项Grid-->
  <EF:EFGrid blockId="result" autoDraw="no" enable="true" readonly="false"  ajax="true" paintId="ef_grid_s" queryMethod="querySelection">
   	<EF:EFColumn ename="selectionDesc" cname='选项描述' width="150"/>
  	<EF:EFColumn ename="recCreator" cname='创建人' width="100" readonly="true" enable="false"/>
  	<EF:EFColumn ename="recCreateTime" cname='创建时间' width="100" readonly="true" editType="date" dateFormatString="yyyy-MM-dd hh:mm:ss" enable="false"/>
  	<EF:EFColumn ename="recRevisor" cname='修改人' width="100" readonly="true" enable="false"/>
  	<EF:EFColumn ename="recReviseTime" cname='修改时间' width="100" readonly="true" editType="date" dateFormatString="yyyy-MM-dd hh:mm:ss" enable="false"/>
  	<EF:EFColumn ename="selectionId" cname="选项ID" visible="false"/>
  	<EF:EFColumn ename="questionId" cname="问题ID" visible="false"/>
  </EF:EFGrid>
  <jsp:include flush="false" page="../../EF/Form/iplat.ef.tail.jsp"></jsp:include>
  </form>
  
  </body>
  </html>