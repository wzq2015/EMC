<!DOCTYPE html>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@page import="org.apache.commons.lang.StringEscapeUtils"%>

<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>

<%
	String filePath = application.getRealPath(request.getParameter("EEDMFILEPATH"));//application.getRealPath(request.getServletPath());
	java.io.FileInputStream fis;
	java.io.InputStreamReader isr;
	StringBuffer sbuf = new StringBuffer();
	
	char[] cbuf;
	int l;
	 try{
		fis = new java.io.FileInputStream(filePath);
		
		isr = new java.io.InputStreamReader(fis,"UTF-8");
		
		cbuf = new char[1024];
	
		while ((l=isr.read(cbuf)) != -1)
			sbuf.append(cbuf,0,l);
	
		isr.close();
		fis.close();
	 }catch(Exception ex){
		  sbuf.append("未找到对应jsp文件！注意，当前只能展示/EE/DM目录下的代码。");
	  } 
	
	StringBuffer jsBuf = new StringBuffer();
	if (filePath!=null &&  filePath.length()>1) {
		filePath = filePath.substring(0, filePath.length() - 1);
	  try{
		fis = new java.io.FileInputStream(filePath);
		
		isr = new java.io.InputStreamReader(fis,"UTF-8");
		cbuf = new char[1024];
		while ((l=isr.read(cbuf)) != -1)
			jsBuf.append(cbuf,0,l);

		isr.close();
		fis.close();
	  }catch(Exception ex){
		  jsBuf.append("未找到对应js文件！");
	  }
	}

%>

<EF:EFPage>
<EF:EFHead >
	<EF:EFScript src="./EF/SyntaxHighlighter/shCore.js"/>
	<EF:EFScript src="./EF/SyntaxHighlighter/shBrushJScript.js"/>
	<EF:EFScript src="./EF/SyntaxHighlighter/shBrushXmlOrJsp.js"/>
	<link type="text/css" rel="stylesheet" href="./EF/SyntaxHighlighter/SyntaxHighlighter.css"/>	
</EF:EFHead>

<body class="bodyBackground" scroll="yes">


<div id="ef_tab_x" style="overflow: auto"  lastRange="99%" eftabType="efRoundDivTab">  
	<div id="org" title="JSP代码" eftabHeight="500">
			<textarea name="code" class="html" rows="28" cols="150"><%=StringEscapeUtils.escapeHtml(sbuf.toString()) %></textarea>
	<br>
	</div>
	<div id="lead" title="JS代码" eftabHeight="500">
			<textarea name="code" class="javascript" rows="28" cols="150"><%=jsBuf.toString() %></textarea>
	</div>
 </div>  
 
 <EF:EFTab tabId="x"/>

<script type="text/javascript">
	dp.SyntaxHighlighter.HighlightAll('code');
</script>

 
</body>

</EF:EFPage>
