package com.baosight.iplat4j.ee.service;

import com.baosight.iplat4j.core.ei.EiInfo;
import com.baosight.iplat4j.core.spring.SpringApplicationContext;
import com.baosight.iplat4j.ep.ServiceEPBase;
import com.baosight.iplat4j.security.bridge.SecurityBridgeFactory;
import com.baosight.iplat4j.security.sso.SSOCredential;

public class ServiceEE06 extends ServiceEPBase {

	public EiInfo initLoad(EiInfo inInfo) {
		//String userName = UserSessionUtils.getSessionUser().getLoginName();
		
		String userName = SecurityBridgeFactory.getBridge().getSessionUserName();
		String target = "SIM";
		String authenType = "Trust";		
		
		SSOCredential credentialChecker = (SSOCredential) SpringApplicationContext.getBean(authenType);		
		String cre = credentialChecker.composeCredential(userName, target);
		inInfo.set("authen", authenType);
		inInfo.set("userName", userName);
		inInfo.set("credential", cre);
		return inInfo;
	}
}
