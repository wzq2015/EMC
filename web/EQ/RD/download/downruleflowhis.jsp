<%@ page contentType="text/html;charset=UTF-8"%>
<%@ page language="java" 
import="com.baosight.iplat4j.upload.*,
java.util.HashMap,
java.util.Map,
com.baosight.iplat4j.dao.*,
com.baosight.iplat4j.core.spring.SpringApplicationContext,
com.baosight.eqrd.common.rd.domain.TRdDRuleArtifact,
java.util.List,
com.baosight.iplat4j.core.FrameworkInfo"
%>

<%
FileUploadBean bean = new FileUploadBean();
bean.setTableBlobName("content");
bean.setTableName(FrameworkInfo.getPlatSchema()+".T_RD_D_RULE_ARTIFACT_HIS");
//根据规则工件ID和版本确定指定规则流
bean.setTableKeys("RULE_ARTIFACT_ID="+"'"+request.getParameter("ruleArtifactId")+"'"+",VERSION="+"'"+request.getParameter("version")+"'");
bean.setUploadType("downloadFromDBToClient");
//取中文名
Dao dao = (Dao) SpringApplicationContext.getBean("dao");
Map map = new HashMap();
map.put("ruleArtifactId",request.getParameter("ruleArtifactId"));
map.put("version",request.getParameter("version"));
List list = dao.query("teqRdDRuleArtifactHistory.query",map);
TRdDRuleArtifact rf=(TRdDRuleArtifact)list.get(0);
bean.setFileNameOfDownloadFromDBToClient(rf.getName()+ ".rf");
FileUploadManager manager= new FileUploadManager(bean);
manager.execute(pageContext);
out.clear();
out = pageContext.pushBody();
%>