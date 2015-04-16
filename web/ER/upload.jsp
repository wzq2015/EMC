
<%@ page contentType="text/html;charset=UTF-8"%>
<%@ page language="java" import="com.baosight.iplat4j.upload.*,com.baosight.iplat4j.er.util.*,
								com.baosight.iplat4j.core.spring.SpringApplicationContext,
								com.baosight.iplat4j.dao.*,
								com.baosight.iplat4j.common.er.domain.*,
								java.util.HashMap,
								java.util.Map,
								com.baosight.iplat4j.core.threadlocal.*,
								com.baosight.iplat4j.util.*"%>

<%
	String reportId = (String)request.getParameter("reportId");
	String reportBelongTo = (String) request.getParameter("reportBelongTo");
	String reportVersion = (String) request.getParameter("reportVersion");
	String type = (String) request.getParameter("type");
	
	FileUploadBean Bean = new FileUploadBean();
	Bean.setUploadFiletype(type);
	Bean.setUploadAllChangedName(reportId+"_"+reportBelongTo+"_"+reportVersion);
	Bean.setUploadType(UpLoadUtil.UPLOAD_TO_SERVER);
	String path = ERUtils.getTemplateDir();
	path += "model" + "/"+reportId+"/";
//	String path = request.getRealPath("");
//	path += ERUtils.getTemplateDir();
//	path = path.replaceAll("\\\\","/");
	Bean.setUploadFileKeepedDir(path);
	FileUploadManager manager = new FileUploadManager(Bean);
	manager.execute(pageContext);
//	path += Bean.getUploadFileName(); 

//if(Bean.isStatues())//上传文件成功,把文件路径放到数据库表中
//	{
//		Dao dao = (Dao) SpringApplicationContext.getBean("dao");
//		Map map = new HashMap();
//		String userId = UserSession.getLoginName();
//		if (userId.length() >= 8) 
//			userId = userId.substring(0, 8);	
//		map.put("recRevisor",userId);
//		map.put("recReviseTime",DateUtils.curDateTimeStr14());
//		map.put("reportTemplateFilepath",Bean.getUploadFileName());
//		map.put("reportId",id);
//		dao.update("ER00.updateFilePath",map);
//	}

	pageContext.getResponse().flushBuffer();
%>

<%if(Bean.isStatues()) {%>
<script type="text/javascript">
//window.parent.button_f2_onclick();
</script>
<%}else {%>

<%} %>
<font color="red" > <%=request.getAttribute("upload_message") %> </font>
