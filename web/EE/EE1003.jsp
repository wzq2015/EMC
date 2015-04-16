<!DOCTYPE html>
<%@page pageEncoding="UTF-8" language="java" contentType="text/html;charset=UTF-8"%>

<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<%@page import="java.util.*" %>

<%
	String contextpath = request.getContextPath();
	String baseUrl = contextpath;
	String listUrl = baseUrl + "/DispatchAction.do";
%>

<html>
<head>
	<meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
	<title>
	</title>
	
	<script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
	<script type="text/javascript" src="./EE/EE1003.js"></script>
	
</head>

<body class="bodyBackground">
<jsp:include flush="false" page="../EF/Form/iplat.ef.head.jsp"></jsp:include>
<div id = "ef_region_detail" title="Ajax记录示例">
	<div>
	<table>
	<tr>
		<td colspan=4 >
			<font color='blue'><b>Ajax记录获取演示，输入对应产品代号，点击按钮获取其他信息</b></font>
		</td>
	</tr>
	<tr>
		<td nowrap >
		      产品代号:&nbsp;&nbsp;
		</td>
		<td nowrap >
			<EF:EFInput blockId="result" ename="product_id" row="0" etc=" style='width:300px' "/>&nbsp;&nbsp;&nbsp;&nbsp;
		</td>
		<td nowrap >
		      公司名称:&nbsp;&nbsp;
		</td>
		<td nowrap >
			<EF:EFInput blockId="result" ename="company_name" row="0" etc=" style='width:300px' "/>
		</td>
	</tr>
	<tr>
		<td nowrap >
		 	产地:
		</td>
		<td nowrap >
			<EF:EFSelect blockId="result" ename="made_country" row="0" etc=" class='pulldown' style='width:300px' " >
				<EF:EFOption value="" label="请选择"/>
				<EF:EFOption value="China" label="中国"/>
				<EF:EFOption value="Sweden" label="瑞典"/>
				<EF:EFOption value="Korea" label="韩国"/>
				<EF:EFOption value="Germany" label="德国"/>
				<EF:EFOption value="USA" label="美国"/>
				<EF:EFOption value="Argentina" label="阿根廷"/>
			</EF:EFSelect>
		</td>
		<td nowrap >
		      上市日期:
		</td>
		<td nowrap>
			<EF:EFInput blockId="result" ename="sale_date" row="0" popup="date" etc=" style='width:300px' "/>
		</td>
	</tr>
	<tr>
		<td nowrap >
		 	价格:
		</td>
		<td nowrap >
			<EF:EFInput blockId="result" ename="price" row="0" etc=" style='width:300px' " />
		</td>
		<td nowrap >
		      公司主页:
		</td>
		<td nowrap >
			<EF:EFInput blockId="result" ename="company_page" row="0" type="textarea" 
				etc=" style='width:300px' "
			/>
		</td>
	</tr>
	<tr>
		<td nowrap colspan=4>
			<EF:EFButton ename="show_other" cname="显示其他字段" />
		</td>
	</tr>
	</table>
		<div id="other_field" >
		<table>
		<tr>
			<td nowrap>
		      验证字段0:
			</td>
			<td nowrap >
				<EF:EFInput blockId="result" ename="validate_0" row="0" etc=" style='width:300px' "/>&nbsp;&nbsp;&nbsp;&nbsp;
			</td>
			<td nowrap >
		      验证字段1:
			</td>
			<td nowrap>
				<EF:EFInput blockId="result" ename="validate_1" row="0" etc=" style='width:300px' "/>
			</td>
		</tr>
		<tr>
			<td nowrap>
		      验证字段2:
			</td>
			<td nowrap>
				<EF:EFInput blockId="result" ename="validate_2" row="0" etc=" style='width:300px' "/>
			</td>
			<td nowrap>
		      验证字段3:
			</td>
			<td nowrap>
				<EF:EFInput blockId="result" ename="validate_3" row="0" etc=" style='width:300px' "/>
			</td>
		</tr>
		<tr>
			<td nowrap>
		      验证字段4:
			</td>
			<td nowrap>
				<EF:EFInput blockId="result" ename="validate_4" row="0" etc=" style='width:300px' "/>
			</td>
			<td nowrap>
		      验证字段5:
			</td>
			<td nowrap>
				<EF:EFInput blockId="result" ename="validate_5" row="0" etc=" style='width:300px' "/>
			</td>
		</tr>
		<tr>
			<td nowrap>
		      验证字段6:
			</td>
			<td nowrap>
				<EF:EFInput blockId="result" ename="validate_6" row="0" etc=" style='width:300px' "/>
			</td>
			<td nowrap>
		      验证字段7:
			</td>
			<td nowrap>
				<EF:EFInput blockId="result" ename="validate_7" row="0" etc=" style='width:300px' "/>
			</td>
		</tr>
		<tr>
			<td nowrap>
		      验证字段8:
			</td>
			<td nowrap>
				<EF:EFInput blockId="result" ename="validate_8" row="0" etc=" style='width:300px' "/>
			</td>
			<td nowrap>
		      验证字段9:
			</td>
			<td nowrap>
				<EF:EFInput blockId="result" ename="validate_9" row="0" etc=" style='width:300px' "/>
			</td>
		</tr>
		</table>
		</div>
	</div>
</div>  

<EF:EFRegion/>  

<jsp:include flush="false" page="../EF/Form/iplat.ef.tail.jsp"></jsp:include>

</body>
</html>   
	
