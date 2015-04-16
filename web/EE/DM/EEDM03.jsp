<!DOCTYPE html>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@page import="com.baosight.iplat4j.core.soa.SoaConfig" %>
<%@page import="com.baosight.iplat4j.core.soa.SoaConstants" %>
<%@page import="com.baosight.iplat4j.core.spring.SpringApplicationContext" %>
<%@page import="java.util.*" %>

<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>
<%
    String contextpath = request.getContextPath();
    String actionUrl = request.getContextPath() + "/DispatchAction.do";
%>

<html>
<head>
    <meta http-equiv="Content-Type" content="text/html;
	charset=UTF-8" />
    <title>
    </title>

    <script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
    <script type="text/javascript" src="./EE/DM/EEDM03.js"></script>
    <script class="javascript" src="./EF/SyntaxHighlighter/shCore.js"></script>
    <script class="javascript" src="./EF/SyntaxHighlighter/shBrushJScript.js"></script>
    <script class="javascript" src="./EF/SyntaxHighlighter/shBrushXmlOrJsp.js"></script>
    <script class="javascript" src="./EF/Form/EFFormPage.js"></script>
    <link type="text/css" rel="stylesheet" href="./EF/SyntaxHighlighter/SyntaxHighlighter.css"></link>

</head>
<body class="bodyBackground">

<form id="EEDM03" method="POST" action="<%=actionUrl%>" >

<jsp:include flush="false" page="../../EF/Form/iplat.ef.head.jsp"></jsp:include>
<div id = "ef_region_inqu" title="查询条件" efRegionShowClear=true>
    <div style="overflow:hidden;width:100%">
        <table>
            <tr>
                <td nowrap width="15%">
                    产品名称
                </td>
                <td nowrap width="20%">
                    <%--<EF:EFSelect blockId="inqu_status" ename="productCode" row="0" etc='multiple="true"'>--%>
                        <%--<EF:EFOption label="选择产品代号" value="" />--%>
                        <%--<EF:EFOptions conj="-" blockId="product" labelColumn="productName" valueColumn="productCode"/>--%>
                    <%--</EF:EFSelect>--%>
                     <EF:EFInput blockId="inqu_status" ename="productName" row="0" type="text" trim="false" etc=" minLength=0  maxLength=32 validateType='chinese_string' onblur='efvalidateObj(this)'"/>

                </td>
        </table>
    </div>
</div>

<div id = "ef_region_result" title="记录集" style="overflow:scroll">
    <div style="overflow:hidden;width:100%">
        <table>
            <tr>
                <td nowrap width="15%">
                    产品代号
                </td>
                <td nowrap width="20%">
                    <EF:EFInput blockId="result" ename="productCode" row="0" etc="readonly"/>

                </td>
                <td nowrap width="15%">
                    产品价格
                </td>
                <td nowrap width="20%">
                    <EF:EFInput blockId="result" ename="productPrice" row="0" etc="validateType='positive_integer' onblur=efvalidateObj(this)"/>
                </td>

            </tr>
            <tr>
                <td nowrap >
                    产品名称
                </td>
                <td nowrap >
                    <EF:EFInput blockId="result" ename="productName" row="0" type="textarea" trim="false" etc=" minLength=0  maxLength=32 validateType='chinese_string' onblur='efvalidateObj(this)'"/>
                </td>
                <td nowrap >
                    所属公司
                </td>
                <td nowrap >
                    <EF:EFSelect blockId="result" ename="companyCode" row="0" >
                        <EF:EFOption label="选择公司代号" value="" />
                        <EF:EFOptions conj="-" blockId="company" labelColumn="companyName" valueColumn="companyCode"/>
                    </EF:EFSelect>
                </td>

            </tr>
            <tr>
                <td nowrap >
                    是否生产
                </td>
                <td nowrap >
                    <EF:EFInput blockId="result" ename="isproduced" row="0" type="checkbox" value="1" />
                </td>
            </tr>
        </table>
    </div>
    <div align="right" id="pageBar">
           <EF:EFPageBar blockId="result" formId="EEDM03" wrapDiv="pageBar" methodName="query" ajax="true" serviceName="EEDM03"></EF:EFPageBar>
    </div>
</div>

<EF:EFRegion/>


<jsp:include flush="false" page="../../EF/Form/iplat.ef.tail.jsp"></jsp:include>
</form>

</body>
</html>
