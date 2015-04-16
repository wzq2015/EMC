<!DOCTYPE html>
<%@ page contentType="text/html; charset=UTF-8"%>

<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>
<%
	String actionUrl = request.getContextPath() + "/DispatchAction.do";
%>

<html>
<head>
	<meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
	<title>
	</title>
<!-- 	<script type="text/javascript" src="./EF/jQuery/jquery.js"></script>  -->
	<script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>

</head>
<body class="bodyBackground">

<form id="EEDM40" method="POST" action="<%=actionUrl%>" >

<jsp:include flush="false" page="../../EF/Form/iplat.ef.head.jsp"></jsp:include>
	<script type="text/javascript" src="./ED/MD/EDMD40.js"></script>
<div id = "ef_region_inqu" title="查询条件" efRegionShowClear=true>
	<div style="width:100%" id="inline1">
		<table>
		<tr>
			<td>
			   产品代码
			</td>
			<td>
				<EF:EFFlexBox blockId="inqu_status" ename="product" row="0" dataBlockId="dataBlock" displayValue="name" hiddenValue="id" displayAll="true" initialValue="123" detailInfo="info" onSelect="select()"/>
		    </td>
		    <td>
			   产品代码2
			</td>
			<td>
				<EF:EFFlexBox blockId="inqu_status" ename="product2" row="0" serviceName="EDMD40" methodName="getData" dataBlockId="dataBlock" displayAll="true" detailInfo="info"/>
		    </td>
		     
		 </tr>
		  <tr>
		    <td nowrap width="15%">
		      检核标记
		    </td>
		    <td nowrap width="20%">
		    <EF:EFInput blockId="inqu_status" ename="validateId" row="0" />
		    </td>
		    <td nowrap width="15%">
		      父检核标记
		    </td>
		    <td nowrap width="20%">
		    <EF:EFInput blockId="inqu_status" ename="parentValidateId" row="0" />
		    </td>
		  </tr>
		  <tr>
		    <td nowrap width="15%">
		      消息号码
		    </td>
		    <td nowrap width="20%">
		    <EF:EFInput blockId="inqu_status" ename="messageId" row="0" />
		    </td>
		    <td nowrap width="15%">
		      业务逻辑服务英文名
		    </td>
		    <td nowrap width="20%">
		    <EF:EFInput blockId="inqu_status" ename="serviceEname" row="0" />
		    </td>
		   </tr>
		  <tr>
		    <td nowrap width="15%">
		      业务逻辑方法英文名
		    </td>
		    <td nowrap width="20%">
		    <EF:EFInput blockId="inqu_status" ename="methodEname" row="0" />
		    </td>
		    <td nowrap width="15%">
		      记录创建者
		    </td>
		    <td nowrap width="20%">
		    <EF:EFInput blockId="inqu_status" ename="recCreator" row="0" />
		    </td>
		   </tr>
			<tr>
				<td colspan="4">
					<input id="alert_button" type="button" value="警告框">
					<input id="confirm_button" type="button" value="确认框" />
					<input id="prompt_button" type="button" value="输入框" />
					<input id="alert_button_with_html" type="button" value="显示HTML消息" />
				</td>
			</tr>
			<tr>
				<td colspan="4">
					<li><a href="./ED/MD/ohoopee1.jpg" rel="example1" title="Me and my grandfather on the Ohoopee.">Photo 1</a></li>
					<li><a class='example2' href="./ED/MD/ajax.html" title="Homer Defined">Outside HTML (Ajax)</a></li>
					<li><a class='example2' href="./ED/MD/flash.html" title="Royksopp: Remind Me">Flash / Video (Ajax/Embedded)</a></li>
					<li><a class='example3' href="http://www.adobe.com/jp/events/cs3_web_edition_tour/swfs/perform.swf" title="The Knife: We Share Our Mother's Health">Flash / Video (Iframe)</a></li>
					<li><a class='example4' href="http://www.baidu.com">Outside Webpage (Iframe)</a></li>
					<li><a class='example5' href="#">Inline HTML</a></li>
						<!-- This contains the hidden content for inline calls -->
					<div style='display:none'>
						<div id='inline_example1' style='padding:10px; background:#fff;'>
						<p><strong>This content comes from a hidden element on this page.</strong></p>
						<p>The inline option preserves bound JavaScript events and changes, and it puts the content back where it came from when it is closed.<br />
						<a id="click" href="#" style='padding:5px; background:#ccc;'>Click me, it will be preserved!</a></p>
						
						<p><strong>If you try to open a new ColorBox while it is already open, it will update itself with the new content.</strong></p>
						<p>Updating Content Example:<br />
						<a class="example5" href="../content/flash.html">Click here to load new content</a></p>
						</div>
					</div>
				</td>
			</tr>
		</table>
	</div>
</div>

<div id = "ef_region_result" title="记录集" style="overflow:scroll">
	<div id = "ef_grid_result" title="页面信息" style="overflow: hidden;height:300px;">
	</div>
</div>

<EF:EFRegion/>
<EF:EFGrid blockId="result" autoDraw="yes" readonly="false" >
</EF:EFGrid>

<jsp:include flush="false" page="../../EF/Form/iplat.ef.tail.jsp"></jsp:include>
</form>
</body></html>
