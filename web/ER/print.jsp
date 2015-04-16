
<%@ page contentType="text/html;charset=UTF-8"%><%@ page language="java" import="
com.jxcell.View,com.baosight.iplat4j.er.util.*"%><%
	System.out.println("print test start ############");
	View myView =  new View();
	String reportId = request.getParameter("reportId");
	String reportBelongTo = request.getParameter("reportBelongTo");
	String reportVersion = request.getParameter("reportVersion");
	
	String url = ERUtils.getTemplateDir()
					+"model/"+reportId+"/"+reportId+"_"+reportBelongTo+"_"+reportVersion;

	try {
		myView.readXML(url+".xml");

		myView.write(url+".xls", View.eFileExcel);
		
	} catch (Exception e) {
		e.printStackTrace();
	}	
	
	System.out.println(url);
	
	
	
	
	
	myView.read(url+".xls");
	myView.filePrint(true);
	System.out.println("print test end ############");
%>

