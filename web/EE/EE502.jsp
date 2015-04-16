<!DOCTYPE html>

<%@page contentType="text/html;charset=UTF-8"%>
<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>


<html>
<head>
	<meta http-equiv="Content-Type" content="text/html;
	charset=UTF-8" />
	<title>
	</title>
	<script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
	<script type="text/javascript" src="./EE/EE502.js"></script>
	<script class="javascript" src="./EF/SyntaxHighlighter/shCore.js"></script>
	<script class="javascript" src="./EF/SyntaxHighlighter/shBrushJScript.js"></script>
	<script class="javascript" src="./EF/SyntaxHighlighter/shBrushXmlOrJsp.js"></script>
	<link type="text/css" rel="stylesheet" href="./EF/SyntaxHighlighter/SyntaxHighlighter.css"></link>
</head>

<body class="bodyBackground">
<jsp:include flush="false" page="../EF/Form/iplat.ef.head.jsp"></jsp:include>

<div id = "ef_region_inqu1" title="FORM提交校验" efRegionShowClear=true>
	<div style="overflow:hidden;width:100%">
	<form id="EE502" method="POST" action="" >
	<table>
	<tr>
	<td nowrap>
	Email地址校验：
	</td>
	<td nowrap>
	<EF:EFInput blockId="inqu_status" ename="email" row="0" style="text-transform : uppercase;" etc="validateType='email' validateGroupName='group1' "/>
	</td>
	<td nowrap>
	 正整数：
	</td>
	<td nowrap >
	<EF:EFInput blockId="inqu_status" ename="positiveNumber" row="0" etc=" nullable='true' minLength='4'  maxLength='6'  validateType='positive_integer' errorPrompt='正整数 integer'" />
	</td>
	<td nowrap>
	自定义：
	</td>
	<td nowrap>
	<EF:EFInput blockId="inqu_status" ename="userDefined" row="0" etc=" minLength='4'  maxLength='6'  errorPrompt='自定义输入有错' regex='/^[1-9]+[0-9]{0,}$/' validateGroupName='group1' " />
	</td>
	<td nowrap>
	textarea校验:
	</td>
	<td nowrap>
	<textarea id="textarea" rows="2" cols="8" validateType="email" style="overflow:auto"></textarea>
	</td>
	<td nowrap>
	选择框:
	</td>
	<td>
		    <EF:EFSelect blockId="inqu_status" ename="form_type_form" row="0" etc="nullable='true' errorPrompt='选择框值'">
		    <EF:EFOption label="全部" value="" />
		    <EF:EFOption label="测试1" value="test1"></EF:EFOption>
		    </EF:EFSelect>
	</td>
	<td nowrap>
	多重校验：
	</td>
	<td nowrap>
	<EF:EFInput blockId="inqu_status" ename="multRegexs" row="0" etc=" minLength='4'  maxLength='6'  errorPrompt='长度大于3的数字' regex='/^[0-9]{3,}$/' errorPrompt0='长度小于10的数字' regex0='/^[0-9]{0,10}$/' errorPrompt1='只允许出现3到9的数字' regex1='/^[3-9]{0,}$/' errorPrompt2='只允许出现0到7的数字' regex2='/^[0-7]{0,}$/' " />
	</td>
	<td nowrap>
	隐藏框:
	</td>
	<td>
	<input type="text" id="hiddenText" nullable='false' style='visibility:hidden'>
	</td>
	</tr>
	</table>
	</form>
</div>
</div>

<div id = "ef_region_inqu2" title="单个输入框校验" efRegionShowClear=true>
	<div style="overflow:hidden;width:100%">
	<table>
	<tr>
	<td nowrap>
	Email地址校验：
	</td>
	<td nowrap>
	<EF:EFInput blockId="inqu_status" ename="email" row="0" style="text-transform : uppercase;" etc="validateType='email' onblur=efvalidateObj(this)"/>
	</td>
	<td nowrap>
	 正整数：
	</td>
	<td nowrap >
	<EF:EFInput blockId="inqu_status" ename="positiveNumber" row="0" etc=" minLength='4'  maxLength='6'  validateType='positive_integer' onblur=efvalidateObj(this)" />
	</td>
	<td nowrap>
	自定义：
	</td>
	<td nowrap>
	<EF:EFInput blockId="inqu_status" ename="userDefined" row="0" etc=" minLength='4'  maxLength='6'  errorPrompt='自定义输入有错' regex='/^[1-9]+[0-9]{0,}$/' onblur=efvalidateObj(this)" />
	</td>
	<td nowrap>
	textarea校验:
	</td>
	<td nowrap>
	<textarea id="textarea" rows="2" cols="8" validateType="email" style="overflow:auto" onblur=efvalidateObj(this)></textarea>
	</td>
	<td nowrap>
	选择框:
	</td>
	<td>
		    <EF:EFSelect blockId="inqu_status" ename="form_type_1" row="0" etc="nullable='false' errorPrompt='选择框值' onblur=efvalidateObj(this)">
		    <EF:EFOption label="全部" value="" />
		    <EF:EFOption label="测试1" value="test1"></EF:EFOption>
		    </EF:EFSelect>
	</td>
	<td nowrap>
	多重校验：
	</td>
	<td nowrap>
	<EF:EFInput blockId="inqu_status" ename="multRegexs" row="0" etc=" minLength='4'  maxLength='6'  errorPrompt='长度大于3的数字' regex='/^[0-9]{3,}$/' errorPrompt0='长度小于10的数字' regex0='/^[0-9]{0,10}$/' errorPrompt1='只允许出现3到9的数字' regex1='/^[3-9]{0,}$/' errorPrompt2='只允许出现0到7的数字' regex2='/^[0-7]{0,}$/' onblur=efvalidateObj(this)" />
	</td>
	</tr>
	</table>
</div>
</div>

<div id = "ef_region_inqu3" title="DIV区域提交校验" efRegionShowClear=true>
	<div id="validateDiv" style="overflow:hidden;width:100%">
	<table>
	<tr>
	<td nowrap>
	Email地址校验：
	</td>
	<td nowrap>
	<EF:EFInput blockId="inqu_status" ename="email" row="0" style="text-transform : uppercase;" etc="validateType='email' validateGroupName='group1' "/>
	</td>
	<td nowrap>
	 正整数：
	</td>
	<td nowrap >
	<EF:EFInput blockId="inqu_status" ename="positiveNumber" row="0" etc=" nullable='false' minLength='4'  maxLength='6'  validateType='positive_integer'" />
	</td>
	<td nowrap>
	自定义：
	</td>
	<td nowrap>
	<EF:EFInput blockId="inqu_status" ename="userDefined" row="0" etc=" minLength='4'  maxLength='6'  errorPrompt='自定义输入有错' regex='/^[1-9]+[0-9]{0,}$/' validateGroupName='group1' " />
	</td>
	<td nowrap>
	textarea校验:
	</td>
	<td nowrap>
	<textarea id="textarea" rows="2" cols="8" validateType="email" style="overflow:auto"></textarea>
	</td>
	<td nowrap>
	选择框:
	</td>
	<td>
		    <EF:EFSelect blockId="inqu_status" ename="form_type_div" row="0" etc="nullable='false' errorPrompt='选择框值'">
		    <EF:EFOption label="全部" value="" />
		    <EF:EFOption label="测试1" value="test1"></EF:EFOption>
		    </EF:EFSelect>
	</td>
	<td nowrap>
	多重校验：
	</td>
	<td nowrap>
	<EF:EFInput blockId="inqu_status" ename="multRegexs" row="0" etc=" minLength='4'  maxLength='6'  errorPrompt='长度大于3的数字' regex='/^[0-9]{3,}$/' errorPrompt0='长度小于10的数字' regex0='/^[0-9]{0,10}$/' errorPrompt1='只允许出现3到9的数字' regex1='/^[3-9]{0,}$/' errorPrompt2='只允许出现0到7的数字' regex2='/^[0-7]{0,}$/' " />
	</td>
	</tr>
	</table>
</div>

<EF:EFRegion/>
<jsp:include flush="false" page="../EF/Form/iplat.ef.tail.jsp"></jsp:include>
</body>
</html>
