<%@page import="com.baosight.iplat4j.core.FrameworkInfo"%>
<%@page import="com.baosight.iplat4j.common.ec.domain.Tecdm01"%>
<%@page import="com.baosight.iplat4j.core.spring.SpringApplicationContext"%>
<%@page import="com.baosight.iplat4j.dao.Dao"%>
<%@ page language="java" pageEncoding="UTF-8"%>
<%@ page import="java.util.*"%>
<%@ page import="java.io.BufferedInputStream"%>
<%@ page import="java.io.BufferedOutputStream"%>
<%@ page import="java.io.File"%>
<%@ page import="java.io.InputStream"%>
<%@ page import="java.io.OutputStream"%>
<%@ page import="java.io.FileOutputStream"%>
<%@ page import="java.util.regex.Matcher" %>
<%@ page import="java.util.regex.Pattern" %>
<%
	String imgStr = "";
	Dao dao = (Dao) SpringApplicationContext.getBean("dao");
	HashMap map = new HashMap();
	map.put("typeId","0000000000000102");
	List list = dao.query("ECDM01.queryFile",map);
	String filepath ="";
	String filename="";
	List list2 = new ArrayList();
	for(int i=0;i<list.size();i++){
		Tecdm01 tecdm01 = (Tecdm01)list.get(i);

		filename = tecdm01.getFileName();
		if(!list2.contains(filename)){
			list2.add(filename);
			imgStr+="EC/DM/ECDM0104.jsp?fileId="+tecdm01.getFileId()+"ue_separate_ue";
		}
	}
	imgStr = imgStr.substring(0,imgStr.lastIndexOf("ue_separate_ue"));
	response.getWriter().print(imgStr);
%>

