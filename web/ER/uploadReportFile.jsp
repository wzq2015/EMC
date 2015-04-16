
<%@ page contentType="text/html;charset=UTF-8"%>
<%@ page language="java" import="com.baosight.iplat4j.upload.*,com.baosight.iplat4j.er.util.*,
								com.baosight.iplat4j.core.spring.SpringApplicationContext,
								com.baosight.iplat4j.dao.*,
								com.baosight.iplat4j.common.er.domain.*,
								java.util.HashMap,
								java.util.Map,
								com.baosight.iplat4j.core.threadlocal.*,
								com.baosight.iplat4j.util.*,
								com.baosight.iplat4j.core.ei.EiInfo,
								com.baosight.iplat4j.core.ei.EiConstant,
								java.lang.String"%>

<%
	UserSession.web2Service(request);
	EiInfo inInfo = new EiInfo();
	String reportId = (String)request.getParameter("reportId");
	String reportBelongTo = (String) request.getParameter("reportBelongTo");
	String reportVersion = (String) request.getParameter("reportVersion");
	String funcCommonPara = (String) request.getParameter("funcCommonPara");

	try{
		funcCommonPara = new String(funcCommonPara.getBytes("ISO8859_1"),"UTF-8");

	}catch(Exception e){
		e.printStackTrace();
	}	
	
	inInfo.set("reportId",reportId);
	inInfo.set("reportBelongTo",reportBelongTo);
	inInfo.set("reportVersion",reportVersion);
	inInfo.set("funcCommonPara",funcCommonPara);
	System.out.println(funcCommonPara);
	
	FileUploadBean Bean = new FileUploadBean();
	Bean.setUploadFiletype("xml");
	Bean.setUploadAllChangedName(reportId+"_"+reportBelongTo+"_"
			+reportVersion+ "_" + DateUtils.curDateMselStr18());
	inInfo.set("reportFileName",Bean.getUploadAllChangedName());
	
	Bean.setUploadType(UpLoadUtil.UPLOAD_TO_SERVER);
	String path = ERUtils.getTemplateDir();
	path += "data" + "/"+reportId+"/";

	Bean.setUploadFileKeepedDir(path);
	FileUploadManager manager = new FileUploadManager(Bean);
	manager.execute(pageContext);


		
		
if(Bean.isStatues())//上传文件成功,把文件路径放到数据库表中
	{
		inInfo.set(EiConstant.serviceName,"ERUtils");
		inInfo.set(EiConstant.methodName, "insertReportFile");
		com.baosight.iplat4j.core.soa.SoaManager.call(inInfo);			
		
	}

	pageContext.getResponse().flushBuffer();
%>

<%if(Bean.isStatues()) {%>
<script type="text/javascript">
//window.parent.button_f2_onclick();
</script>
<%}else {%>

<%} %>
<font color="red" > <%=request.getAttribute("upload_message") %> </font>
