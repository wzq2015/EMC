<!DOCTYPE html>
<%@ page contentType="text/html;charset=UTF-8"%><%@ page language="java" import="com.baosight.iplat4j.upload.*,
java.util.HashMap,
java.util.Map,
com.baosight.iplat4j.dao.*,
com.baosight.iplat4j.ee.dm.domain.EEDM06,
com.baosight.iplat4j.core.spring.SpringApplicationContext,
java.util.List"%><%
	FileUploadBean bean = new FileUploadBean();
	bean.setUploadType(UpLoadUtil.DOWNLOAD_FROM_SERVER_TO_CLIENT);
	
	//取url
	Dao dao = (Dao) SpringApplicationContext.getBean("dao");
	Map map = new HashMap();
	map.put("fileCode",request.getParameter("id"));
	List list = dao.query("EEDM06.query",map);
	EEDM06 eedm06 = (EEDM06)list.get(0);
	
	bean.setFileURLOfDownServerToClient(eedm06.getFileUrl());
	FileUploadManager manager= new FileUploadManager(bean);
	manager.execute(pageContext);
%>

