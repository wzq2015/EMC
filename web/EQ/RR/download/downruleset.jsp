<%@ page contentType="text/html;charset=UTF-8"%>
<%@ page language="java" import="com.baosight.iplat4j.upload.*,
java.util.HashMap,
java.util.Map,
com.baosight.iplat4j.dao.*,
com.baosight.iplat4j.core.spring.SpringApplicationContext,
com.baosight.eqrr.common.rr.domain.TRuleset,
com.baosight.eqrr.helper.RulesetDownLoadHelper,
java.util.List"%>
<%
RulesetDownLoadHelper manager=new RulesetDownLoadHelper();
manager.downloadRuleset(pageContext);
out.clear(); 
out = pageContext.pushBody(); 
%>