package com.baosight.iplat4j.ee.service;

import com.baosight.iplat4j.core.ei.EiInfo;
import com.baosight.iplat4j.core.spring.SpringApplicationContext;
import com.baosight.iplat4j.core.threadlocal.UserSession;
import com.baosight.iplat4j.ep.ServiceEPBase;
import com.baosight.iplat4j.security.bridge.SecurityBridgeFactory;
import com.baosight.iplat4j.security.sso.SSOCredential;

public class ServiceEE07 extends ServiceEPBase {

	public EiInfo initLoad(EiInfo inInfo) {
		
		String userName = SecurityBridgeFactory.getBridge().getSessionUserName();
		String target = "iplat";
		String authenType = "Trust";		
		
		String session_role = (String) UserSession.getInSessionProperty("role");
		SSOCredential credentialChecker = (SSOCredential) SpringApplicationContext.getBean(authenType);		
		String cre = credentialChecker.composeCredential(userName, target);
		inInfo.set("authen", authenType);
		inInfo.set("userName", userName);
		inInfo.set("credential", cre);
		inInfo.set("session_role", session_role);
		return inInfo;
	}
}
