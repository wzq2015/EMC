<!DOCTYPE html>

<%@ page contentType="text/html;charset=UTF-8"%>
<%@ page language="java" import="com.baosight.iplat4j.core.*"%>
<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>
<%@page import="com.baosight.iplat4j.core.resource.I18nMessages"%>
<html>
<head>
	<title></title>
	<script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
	<script class="javascript" src="./EF/SyntaxHighlighter/shCore.js"></script>
	<script class="javascript" src="./EF/SyntaxHighlighter/shBrushJScript.js"></script>
	<script class="javascript" src="./EF/SyntaxHighlighter/shBrushXmlOrJsp.js"></script>
	<link type="text/css" rel="stylesheet" href="./EF/SyntaxHighlighter/SyntaxHighlighter.css"></link>
	<script type="text/javascript">
	efform_onload = function(){
		efregion.show("ef_region_codeDemo");
		efregion.toggleShow("ef_region_codeDemo");
	}

	</script>
</head>
<body>

<%
	String sql = "select form_ename as \"value\", form_cname as \"label\" from "
			+ FrameworkInfo.getPlatSchema()
			+ ".tedfa00 where form_ename like 'ED%' order by form_ename desc";
	String jsql = "select teiit00.ITEM_ENAME as \"value\" , teiit00.ITEM_CNAME as \"label\" from teddbt1, teiit00 where teddbt1.ITEM_SEQ = teiit00.ITEM_SEQ and teddbt1.TABLE_ENAME = 'TEEDM01'";
	String tableName = FrameworkInfo.getPlatSchema() + ".tedfa00";

	String etc = I18nMessages.getText("label.EPWelcomeTo","欢迎使用") + "onclick=\"alert('ok')\"" + " onclick='javascript:alert(\"当前项的选中状态\" + this.checked);'";
%>
<jsp:include flush="false" page="../../EF/Form/iplat.ef.head.jsp"></jsp:include>
<br>

checkbox(小代码):

<EF:EFCheckbox blockId="inqu_status" row="0" ename="companyAddr"
	codeName="iplat.shifou" conj="" etc="<%=etc%>">
</EF:EFCheckbox>

<br>
checkbox(只显示手工设置值):
<EF:EFCheckbox blockId="inqu_status" row="0" ename="companyAddr"
	labelList="苹果,安卓,塞班" valueList="0,1,2,3" both="false"
	codeName="iplat.shifou" conj="" etc=" onclick='javascript:alert(\"当前项的选中状态\" + this.checked);'">
</EF:EFCheckbox>
<br>
checkbox(都显示):
<EF:EFCheckbox blockId="inqu_status" row="0" ename="companyAddr"
	labelList="苹果,安卓,塞班" valueList="0,1,2,3" both="true"
	codeName="iplat.shifou" conj="" etc=" onclick='javascript:alert(\"当前项的选中状态\" + this.checked);'">
</EF:EFCheckbox>
<br>
Radio(小代码):
<EF:EFRadio blockId="inqu_status" row="0" ename="companyAddr"
	codeName="iplat.shifou" conj="" etc=" onclick='javascript:alert(\"当前项的选中状态\" + this.checked);'">
</EF:EFRadio>

<br>
Radio(只显示手工设置值):
<EF:EFRadio blockId="inqu_status" row="0" ename="companyAddr"
	labelList="苹果,安卓,塞班" valueList="0,1,2,3" both="false"
	codeName="iplat.shifou" conj="" etc=" onclick='javascript:alert(\"当前项的选中状态\" + this.checked);'">
</EF:EFRadio>
<br>
Radio(都显示):
<EF:EFRadio blockId="inqu_status" row="0" ename="companyAddr"
	labelList="苹果,安卓,塞班" valueList="0,1,2,3" both="true"
	codeName="iplat.shifou" conj="" etc=" onclick='javascript:alert(\"当前项的选中状态\" + this.checked);'">
</EF:EFRadio>
<br>
<EF:EFSelect blockId="" row="" ename="testTableSelect" etc=" onChange=javascript:alert('etc') ">
	<EF:EFOption label="全部" value="" />
	<EF:EFCodeOption codeName="iplat.interfaceStyle" />
	<EF:EFTableOption beanName="edfa00Select" conj="-" condition=" FORM_ENAME like 'E%' " />
	<EF:EFCodeOption codeName="iplat.shifou" conj="#"/>
	<EF:EFOption label="全部end" value="" />
</EF:EFSelect>
<br>
<br>
<EF:EFSelect blockId="" row="" ename="testTableSelect" etc=" onChange=javascript:alert('etc') ">
	<EF:EFTableOption beanName="edfa00Select" conj="*" condition=" FORM_ENAME like 'ES%' " />
	<EF:EFTableOption tableName="<%=tableName%>" valueColumnName="form_ename" labelColumnName="form_cname" orderBy="form_ename desc" condition="form_ename like 'EE%'" conj="-" />
	<EF:EFTableOption sql="<%=sql%>" conj="#" />
	<EF:EFTableOption beanName="edfa00Select" sql="<%=jsql %>" tableName="<%=tableName%>" condition=" FORM_ENAME like 'EP%' " conj="aa" />
	<EF:EFTableOption beanName="edfa00Select" sql="" tableName="" conj="bb" />
	<EF:EFTableOption beanName="" sql="<%=jsql %>" tableName="" conj="cc" />
	<EF:EFTableOption beanName="" sql="" tableName="<%=tableName%>" conj="dd" />
	<EF:EFTableOption beanName="" sql="<%=jsql %>" tableName="<%=tableName%>" condition=" FORM_ENAME like 'EP%' " conj="ee" />
	<EF:EFOption label="全部end" value="" />
</EF:EFSelect>
<br>
<br>
<EF:EFSelect blockId="" row="" ename="testCodeSelect" etc=" onChange=javascript:alert('etc') ">
	<EF:EFCodeOption codeName="iplat.shifou" />
</EF:EFSelect>
<br>
<br>
<EF:EFSelect blockId="" row="" ename="testCodeSelect" etc=" onChange=javascript:alert('etc') ">
	<EF:EFCodeOption codeName="iplat.shifou" conj="" />
</EF:EFSelect>
<br>
<br>
<EF:EFSelect blockId="" row="" ename="testCodeSelect" etc=" onChange=javascript:alert('etc') ">
	<EF:EFCodeOption codeName="iplat.shifou" conj="-" />
</EF:EFSelect>
<br>
<br>
<EF:EFSelect blockId="" row="" ename="testCodeSelect" etc=" onChange=javascript:alert('etc') ">
	<EF:EFCodeOption codeName="iplat.shifou" conj=" " condition=" "/>
</EF:EFSelect>
<br>
<br>
<EF:EFSelect blockId="" row="" ename="testCodeSelect" etc=" onChange=javascript:alert('etc') ">
	<EF:EFCodeOption codeName="iplat.shifou" conj="#" condition=" ITEM_CNAME like '%是%'"/>
</EF:EFSelect>
<br>
<br>
<EF:EFSelect blockId="" row="" ename="testCodeSelect" etc=" onChange=javascript:alert('etc') ">
	<EF:EFCodeOption codeName="iplat.shifou" conj="*" condition=" ITEM_CNAME like '%是%'"/>
</EF:EFSelect>
<br>

<!-- 代码展示  -->
<div id = "ef_region_codeDemo" title="示例代码">
<div id="ef_tab_h"  lastRange="99%" eftabType="efRoundDivTab">
	<div id="jsp" title="JSP 源代码" >
	<textarea  name="codeh" class="html">
&lt;EF:EFSelect blockId="" row="" ename="testTableSelect" etc=" onChange=javascript:alert('etc') "&gt;
	&lt;EF:EFOption label="全部" value="" /&gt;
	&lt;EF:EFCodeOption codeName="iplat.interfaceStyle" /&gt;
	&lt;EF:EFTableOption beanName="edfa00Select" conj="-" condition=" FORM_ENAME like 'E%' " /&gt;
	&lt;EF:EFCodeOption codeName="iplat.shifou" conj="#"/&gt;
	&lt;EF:EFOption label="全部end" value="" /&gt;
&lt;/EF:EFSelect&gt;
&lt;br&gt;
&lt;br&gt;
&lt;EF:EFSelect blockId="" row="" ename="testTableSelect" etc=" onChange=javascript:alert('etc') "&gt;
	&lt;EF:EFTableOption beanName="edfa00Select" conj="*" condition=" FORM_ENAME like 'ES%' " /&gt;
	&lt;EF:EFTableOption tableName="&lt;%=tableName%&gt;" valueColumnName="form_ename" labelColumnName="form_cname" orderBy="form_ename desc" condition="form_ename like 'EE%'" conj="-" /&gt;
	&lt;EF:EFTableOption sql="&lt;%=sql%&gt;" conj="#" /&gt;
	&lt;EF:EFTableOption beanName="edfa00Select" sql="&lt;%=jsql %&gt;" tableName="&lt;%=tableName%&gt;" condition=" FORM_ENAME like 'EP%' " conj="aa" /&gt;
	&lt;EF:EFTableOption beanName="edfa00Select" sql="" tableName="" conj="bb" /&gt;
	&lt;EF:EFTableOption beanName="" sql="&lt;%=jsql %&gt;" tableName="" conj="cc" /&gt;
	&lt;EF:EFTableOption beanName="" sql="" tableName="&lt;%=tableName%&gt;" conj="dd" /&gt;
	&lt;EF:EFTableOption beanName="" sql="&lt;%=jsql %&gt;" tableName="&lt;%=tableName%&gt;" condition=" FORM_ENAME like 'EP%' " conj="ee" /&gt;
	&lt;EF:EFOption label="全部end" value="" /&gt;
&lt;/EF:EFSelect&gt;
&lt;br&gt;
&lt;br&gt;
&lt;EF:EFSelect blockId="" row="" ename="testCodeSelect" etc=" onChange=javascript:alert('etc') "&gt;
	&lt;EF:EFCodeOption codeName="iplat.shifou" /&gt;
&lt;/EF:EFSelect&gt;
&lt;br&gt;
&lt;br&gt;
&lt;EF:EFSelect blockId="" row="" ename="testCodeSelect" etc=" onChange=javascript:alert('etc') "&gt;
	&lt;EF:EFCodeOption codeName="iplat.shifou" conj="" /&gt;
&lt;/EF:EFSelect&gt;
&lt;br&gt;
&lt;br&gt;
&lt;EF:EFSelect blockId="" row="" ename="testCodeSelect" etc=" onChange=javascript:alert('etc') "&gt;
	&lt;EF:EFCodeOption codeName="iplat.shifou" conj="-" /&gt;
&lt;/EF:EFSelect&gt;
&lt;br&gt;
&lt;br&gt;
&lt;EF:EFSelect blockId="" row="" ename="testCodeSelect" etc=" onChange=javascript:alert('etc') "&gt;
	&lt;EF:EFCodeOption codeName="iplat.shifou" conj=" " condition=" "/&gt;
&lt;/EF:EFSelect&gt;
&lt;br&gt;
&lt;br&gt;
&lt;EF:EFSelect blockId="" row="" ename="testCodeSelect" etc=" onChange=javascript:alert('etc') "&gt;
	&lt;EF:EFCodeOption codeName="iplat.shifou" conj="#" condition=" ITEM_CNAME like '%是%'"/&gt;
&lt;/EF:EFSelect&gt;
&lt;br&gt;
&lt;br&gt;
&lt;EF:EFSelect blockId="" row="" ename="testCodeSelect" etc=" onChange=javascript:alert('etc') "&gt;
	&lt;EF:EFCodeOption codeName="iplat.shifou" conj="*" condition=" ITEM_CNAME like '%是%'"/&gt;
&lt;/EF:EFSelect&gt;
&lt;br&gt;
	</textarea>
</div>
<div id="javascript" title="Javasript 源代码" >
	<textarea name="codeh" class="javascript">
	efform_onload = function(){
		efregion.show("ef_region_codeDemo");
		efregion.toggleShow("ef_region_codeDemo");
	}

	</textarea>
 </div>
<EF:EFTab tabId="h" action="fundivh"/>
<script type="text/javascript">
	dp.SyntaxHighlighter.HighlightAll('codeh');
</script>
</div>
<script type="text/javascript">
var tab  = ef.get("jquery_tab_div_content");
tab.style.height = "";
var tab1 = ef.get("jsp");
tab1.style.display = "block";
tab1.style.height = "";
tab1.style.width = "100%";
var tab2 = ef.get("javascript");
tab2.style.height = "";
tab2.style.width = "100%";
</script>
</body>
</html>
