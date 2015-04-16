<!DOCTYPE html>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@page import="com.baosight.iplat4j.core.soa.SoaConfig" %>
<%@page import="com.baosight.iplat4j.core.soa.SoaConstants" %>
<%@page import="com.baosight.iplat4j.core.spring.SpringApplicationContext" %>
<%@page import="com.baosight.iplat4j.core.resource.I18nMessages" %>

<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>
<%
	String actionUrl = request.getContextPath() + "/DispatchAction.do";
	String display="none";

	String formEname = " ";
	String formCname = " ";
	String formId = "-1";

	if( request.getParameterMap().containsKey( "formEname" ))
	{
		formEname = request.getParameter("formEname");
	}

	if( request.getParameterMap().containsKey( "formCname" ))
	{
		formCname = request.getParameter("formCname");
		//formCname=new String(formCname.getBytes("ISO8859_1"),"UTF-8");
		//new String(request.getParameter("formCname").getBytes("ISO8859-1"),"UTF-8");
		//formCname = new String(request.getParameter("formCname").getBytes("ISO8859-1"),"UTF-8");
	}

	if( request.getParameterMap().containsKey( "formId" ))
	{
		formId = request.getParameter("formId");
	}

%>

<html>
<head>
	<meta http-equiv="Content-Type" content="text/html;
	charset=UTF-8" />
	<title>
	</title>

	<script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
	<script type="text/javascript" src="./ED/MD/EDMD53.js"></script>

</head>
<body class="bodyBackground">

<form id="EDMD53" method="POST" action="<%=actionUrl%>" >

<jsp:include flush="true" page="../../EF/Form/iplat.ef.head.jsp"></jsp:include>
<EF:EFInput blockId="inqu_status" ename="regionId" row="0" type="hidden"></EF:EFInput>
<input type="hidden" id="formEname" value="<%=formEname %>"/>
<input type="hidden" id="formCname" value="<%=formCname %>"/>
<input type="hidden" id="formId" value="<%=formId %>"/>


<!--EF:EFInput blockId="inqu_status" ename="formEname" type="hidden" row="0" etc=" style='width:300px' "/-->

 	<div id = "ef_region_top" title="页面配置" efRegionShowClear=false>
 	<div>
    	<table id="mainFrameTable" width="100%" style="height:600px" cellpadding=1 cellspacing=0 >
		  <tr height=100%>

			 <td id="leftTree" vAlign="top" width="200px" height="100%" style="background-color: #f0f3f4; padding-top:10px;">
			  <div id="leftTreeDiv" style='overflow:auto; width:200px; height:100%;'>
				    <!-- 所以树根在树枝下 -->
				    <!--
					<EF:EFTree model="orgTreeModel" id="nTree" text="区域配置管理" configFunc="configTree">
					</EF:EFTree>
					-->
					<div id="nTree"> </div>
			 	</div>
			  </div>
			 </td>


			<td id="middleSplitter" width="4px" vAlign="middle" style='cursor:e-resize'>
		  		<IMG id="img_splitter_id"
		  			onload="efico.setImageSrc(this,'efform.imgVgrabber')" src="./EF/Images/eftree_blank.png">
        	</td>

			<td id="rightContent" width=100%  vAlign="top" >
			    <div id="ef_region_region" title="区域配置" style="overflow:scroll" efRegionShowClear=true>
				<div>
					<table style="padding: 10px;">
					<tr style="margin-top: 10px;">
						<td nowrap >
						      区域名称:&nbsp;&nbsp;
						</td>
						<td nowrap >
							<EF:EFInput blockId="result" ename="id" type="hidden" row="0" etc=" style='width:200px' "/>
							<EF:EFInput blockId="result" ename="regionEname"  row="0" etc=" style='width:200px;' readOnly='true' "/>
							&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
						</td>
						<td nowrap >
						   可配置项:&nbsp;&nbsp;
						</td>
						<td nowrap >
							<!--
							<EF:EFInput blockId="result" ename="regionType" row="0" etc=" style='width:200px' "/>
							 -->

							<EF:EFSelect ename="regionType" blockId="result" row="0" etc=" class='pulldown' style='width:200px' disabled='disabled' " >
						    	<EF:EFCodeOption codeName="iplat.edmd.regiontype" />
						    </EF:EFSelect>

						</td>
					</tr>
					<tr>
						<td nowrap >
						   功能控件组:
						</td>
						<td nowrap >
							<EF:EFPopupInput blockId="result" ename="funcId"  labelProperty="funcCname" row="0" contentDivId="ef_Popup" />
                            <%-- <EF:EFInput blockId="result" ename="funcId" row="0" etc="readonly" /> --%>
                            <%--<input type="text" id="result-0-funcId">--%>
							<%--<EF:EFFlexBox blockId="result" ename="funcId" row="0" dataBlockId="funcBlock" displayValue="funcCname"  hiddenValue="id"  detailInfo="funcCname" onSelect="select()"/>--%>
						    <%--<EF:EFSelect blockId="result" ename="funcId" row="0" etc=" class='pulldown' style='width:200px' " >--%>
						    <%--<EF:EFOptions blockId="funcBlock" labelColumn="funcDisplay" valueColumn="funcId"/>--%>
						    <%--</EF:EFSelect>							--%>

						</td>
					</tr>
					</table>
				</div>
				</div>

				<div id = "ef_region_args" title="区域参数" style="overflow:scroll">
					<div id = "ef_grid_args" title="区域参数" style="overflow: hidden;height:200px;">
					</div>
				</div>

			    <div id="ef_region_button" title="按钮配置" style="overflow:scroll" efRegionShowClear=true>
				<div>
					<table style="padding: 10px;">
					<tr>
						<td nowrap >
						      按钮英文名:&nbsp;&nbsp;
						</td>
						<td nowrap >
							<EF:EFInput blockId="button" ename="id" row="0" type="hidden" etc=" style='width:200px' " />
							<EF:EFInput blockId="button" ename="regionId" row="0" type="hidden" etc=" style='width:200px' " />
							<EF:EFInput blockId="button" ename="buttonEname" row="0" etc=" style='width:200px;text-transform:uppercase;' readOnly='true' " />
							&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
						</td>

						<td>
						 	按钮中文:
						</td>
						<td nowrap >
							<EF:EFInput blockId="button" ename="buttonCname" row="0" etc=" style='width:200px' " />
						</td>

					</tr>
					<tr>

						<td nowrap >
						      检核组:
						</td>
						<td nowrap>
						    <EF:EFInput blockId="button" ename="validateGroup" row="0" etc=" style='width:200px' " />
						    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
						</td>

						<td nowrap>
						      序号:&nbsp;&nbsp;
						</td>
						<td nowrap >
							<EF:EFInput blockId="button" ename="nodeSortId" row="0" etc=" style='width:200px' "/>&nbsp;&nbsp;&nbsp;&nbsp;
						</td>

					</tr>
					<tr>
						<td nowrap >
						 	服务名:
						</td>
						<td nowrap >
							<EF:EFInput blockId="button" ename="serviceEname" row="0" etc=" style='width:200px' " />
							&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
						</td>
						<td nowrap >
						      方法名:
						</td>
						<td nowrap >
							<EF:EFInput blockId="button" ename="methodEname" row="0" etc=" style='width:200px' "
							/>
						</td>
					</tr>
					<tr style="margin-top: 10px">
						<td nowrap >
						 	按钮代码:
						</td>
						<td nowrap colspan="3" >
							<EF:EFInput blockId="button" ename="buttonCode" row="0" type="textarea"
							etc=" style='width:100%;height:100px;overflow:hidden' " />
						</td>
					</tr>
					</table>
				</div>
				</div>
	        </td>
		  </tr>
	    </table>
	</div>
    </div>

	<EF:EFRegion/>

<!--

	<div id = "ef_region_result" title="记录集" style="overflow:scroll;display='none';">
		<div id = "ef_grid_result" title="页面信息" style="overflow: hidden;height:250px;visibility: false;" >
		</div>
	</div>

	<div id = "ef_region_button" title="记录集" style="overflow:scroll;display:none;">
		<div id = "ef_grid_button" title="页面信息" style="overflow: hidden;height:250px;visibility: false;" >
		</div>
	</div>



	<EF:EFGrid blockId="result" autoDraw="true" style="display:none;" readonly="true" ajax="true">
	</EF:EFGrid>

-->
	<EF:EFGrid blockId="args" autoDraw="false" style="display:none;operationBar:false;navigationBar:false;toolBar:false" ajax="true">

		<EF:EFColumn ename="id" width="150" visible="false"  />
		<EF:EFColumn ename="templetId" cname="布局模板ID" width="150" visible="false" />
		<EF:EFColumn ename="newArg" visible="false" />
		<EF:EFColumn ename="regionId" cname="区域ID" visible="false" width="150"  />
		<EF:EFColumn ename="keyName" cname="参数名称" fix="yes" width="150" />
		<EF:EFColumn ename="keyValue" cname="参数值" width="150" />
		<EF:EFColumn ename="keyDesc" cname="参数描述" readonly="true" width="300" />
	</EF:EFGrid>

<!-- 弹出框内容 -->
<DIV id="ef_Popup" class="efwindow" title="功能选择" style="overflow:hidden;display:none;width:500px">
	<table>
		<tr>
		  <td colspan=2>
			  <table>
				<tr>
				  <td nowrap width="15%">
				      英文名
				    </td>
				    <td nowrap width="20%">
				    <EF:EFInput blockId="inqu_status" ename="funcEname" row="0" />
				  </td>
				   <td nowrap width="15%">
				      中文名
				    </td>
				    <td nowrap width="20%">
				    <EF:EFInput blockId="inqu_status" ename="funcCname" row="0" />
				  </td>
				  <td nowrap width="20%">
					<input class="buttonClass" type="button" value="查询" onclick='button_subgrid_query_onclick();' />
				  </td>
				</tr>
			  </table>
		  </td>
		</tr>
		<tr>
			<td colspan=2>
    			<div id = "ef_grid_funcgrid" title="页面信息" style="overflow:hidden;height:300px;"></div>
  				<EF:EFGrid blockId="funcgrid" autoDraw="false" enable="false" ajax="true" serviceName="EDMD45" queryMethod="queryFunc" readonly="true">
  					<EF:EFColumn ename="id" width="0" visible="false"/>
					<EF:EFColumn ename="funcEname" cname="功能英文名" width="150" />
					<EF:EFColumn ename="funcCname" cname="功能中文名" width="250"  />
  				</EF:EFGrid>
  			</td>
		</tr>
		<tr>
			<td align='right' colspan=2 >
				<input  class=buttonClass  type=button value='保存' onclick='funcgrid_popup_save_onclick();' />
			</td>
		</tr>
	</table>
</DIV>
<jsp:include flush="false" page="../../EF/Form/iplat.ef.tail.jsp"></jsp:include>
</form>

</body>
</html>
