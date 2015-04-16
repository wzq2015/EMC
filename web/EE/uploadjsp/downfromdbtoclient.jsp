<!DOCTYPE html>
<%@ page contentType="text/html;charset=UTF-8"%><%@ page language="java" import="com.baosight.iplat4j.upload.*,
java.util.HashMap,
java.util.Map,
com.baosight.iplat4j.core.*,
com.baosight.iplat4j.dao.*,
com.baosight.iplat4j.core.spring.SpringApplicationContext,
java.util.List"%><%

FileUploadBean bean = new FileUploadBean();
bean.setTableBlobName("tempfile");
bean.setTableName(FrameworkInfo.getPlatSchema()+".tee50");
bean.setTableKeys("id="+request.getParameter("id"));
bean.setUploadType("downloadFromDBToClient");

//取中文名
Dao dao = (Dao) SpringApplicationContext.getBean("dao");
Map map = new HashMap();
map.put("id",request.getParameter("id"));
List list = dao.query("EE50.distQuery",map);
map = (Map)list.get(0);
System.out.println(map.get("name"));


bean.setFileNameOfDownloadFromDBToClient(map.get("name")+ "");
FileUploadManager manager= new FileUploadManager(bean);
manager.execute(pageContext);
%>
