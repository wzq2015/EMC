<%@page contentType="text/html;charset=UTF-8"%>
<%@page import="com.baosight.iplat4j.core.ei.EiConstant"%>
<%@page import="com.baosight.iplat4j.core.FrameworkInfo"%>

<%
	String new_href = "";
	String image_setpath = "";
	String new_tab_href = "";
%>

<%
		//从session中获得用户选择的风格和字体，如未选择过，默认为蓝色风格和小号字体
		String choose_one = "default";
		String para = (String)session.getAttribute("userInterfaceStyle");
		if(para!=null&&para.length()>0){
			choose_one = para;
		}
	%>
		<script type="text/javascript" >
			var get_choose = "<%=choose_one%>";
			if(get_choose!="default"){
				image_setpath = "/EF/style/style"+get_choose+"/Images/";
			}
			var image_setpath ;
			var get_csspath = image_setpath;
			if(get_csspath!=null&&get_csspath.indexOf("EF/style")!=-1)
				EF_IMAGES_PATH=CONTEXT_PATH+get_csspath;


		</script>
<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF.tld"%>
<script type="text/javascript" src="./EF/jQuery/jquery.js"></script>
<script type="text/javascript" src="./EF/jQuery/jquery.tab.js"></script>
<!-- <script type="text/javascript" src="./userIco.js"></script> -->
<link href="./EF/EF.css" rel="stylesheet" type="text/css"/>
<%
	if(choose_one.equals("default")){%>

		<link href="./EF/Images/tab.css" rel="stylesheet" type="text/css"/>
	<%}else{

		new_href = "./EF/style/style"+choose_one+"/EF.css";
		new_tab_href = "./EF/style/style"+choose_one+"/Images/tab.css";
		image_setpath = "/EF/style/style"+choose_one+"/Images/";

		%>

		<link href="<%=new_href%>" rel="stylesheet" type="text/css"/>
		<link href="<%=new_tab_href%>" rel="stylesheet" type="text/css"/>

	<%}%>
