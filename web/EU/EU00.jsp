<%@ page contentType="text/html;charset=UTF-8"%><%@ page language="java" import="com.baosight.iplat4j.upload.*,
com.baosight.iplat4j.core.ei.EiInfo,com.baosight.iplat4j.util.transform.DataParser,
com.baosight.iplat4j.core.spring.SpringApplicationContext"%><%
	
	EiInfo info = (EiInfo)request.getAttribute("ei");
	DataParser parser = (DataParser)SpringApplicationContext.getBean("xlsDataParser");
	Object parseObj = parser.parseData(info);
	//response.reset();

		FileUploadManager manager = new FileUploadManager();	
		manager.downloadFromObjectToClient(info.getString("serviceName") + ".xls",parseObj,pageContext);
%>
