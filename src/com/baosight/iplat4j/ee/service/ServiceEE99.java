package com.baosight.iplat4j.ee.service;

import com.baosight.iplat4j.core.ei.EiInfo;
import com.baosight.iplat4j.core.threadlocal.UserSession;
import com.baosight.iplat4j.ep.ServiceEPBase;
import com.baosight.iplat4j.security.bridge.SecurityBridge;
import com.baosight.iplat4j.security.bridge.SecurityBridgeFactory;

public class ServiceEE99 extends ServiceEPBase 
{

	public EiInfo mockDnsRouter( EiInfo info )
	{
		String userName = UserSession.getLoginName();
		
		SecurityBridge bridge = SecurityBridgeFactory.getBridge();
		//String displayName = bridge.getUserDisplayName( userName );
		
		EiInfo outInfo = new EiInfo();
		outInfo.set( "displayName", "我来自 PlatDemo-ServiceEE99!" );
		
		return outInfo;
	}
}
