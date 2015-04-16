<%@ page contentType="text/html;charset=UTF-8"%><%@ page language="java" import="com.baosight.iplat4j.upload.*,
java.util.HashMap,
java.util.Map,
com.baosight.iplat4j.dao.*,
com.baosight.iplat4j.core.spring.SpringApplicationContext,
com.baosight.eqrd.common.rd.domain.TRdDRuleBasePubPkg,
com.baosight.eqrd.common.rd.domain.TRdDRuleBase,
com.baosight.iplat4j.core.threadlocal.UserSession,
com.baosight.eqrd.helper.RuleAppHelper,
com.baosight.eqrd.common.rd.domain.TRdDRuleApp,
java.util.List,
com.baosight.iplat4j.core.FrameworkInfo"%>
<%
FileUploadBean bean = new FileUploadBean();
RuleAppHelper helper=new RuleAppHelper();
bean.setTableBlobName("content");
bean.setTableName(FrameworkInfo.getPlatSchema()+".T_RD_D_RULE_BASE_PUB_PKG");
bean.setTableKeys("PUB_PKG_ID="+"'"+request.getParameter("pubPkgId")+"'");
bean.setUploadType("downloadFromDBToClient");
//取中文名
Dao dao = (Dao) SpringApplicationContext.getBean("dao");
Map map = new HashMap();
map.put("pubPkgId",request.getParameter("pubPkgId"));
List list = dao.query("teqRdDRuleBasePubPkg.query",map);
TRdDRuleBasePubPkg pkg=(TRdDRuleBasePubPkg)list.get(0);
map.put("ruleBaseId",pkg.getRuleBaseId());
list = dao.query("teqRdDRuleBase.query",map);
TRdDRuleBase rb=(TRdDRuleBase)list.get(0);
String rulesAppId = (String)UserSession.getInSessionProperty("ruleAppId");
TRdDRuleApp ruleApp=helper.getRuleApp(rulesAppId);
bean.setFileNameOfDownloadFromDBToClient(ruleApp.getLabel()+"@"+rb.getLabel()+ ".jar");
FileUploadManager manager= new FileUploadManager(bean);
manager.execute(pageContext);
out.clear(); 
out = pageContext.pushBody();
%>