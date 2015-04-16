package com.baosight.iplat4j.ee.tt.service;

import com.baosight.iplat4j.core.ei.EiInfo;
import com.baosight.iplat4j.ep.ServiceEPBase;

public class ServiceEETT00 extends ServiceEPBase {
	
	public EiInfo initLoad(EiInfo inInfo) {

		inInfo.set("testCodeSelect", "1");
		inInfo.set("testTableSelect", "EDFA00");
		
		return inInfo;
	}


}
