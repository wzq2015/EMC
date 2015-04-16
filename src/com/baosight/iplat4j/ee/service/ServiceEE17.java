package com.baosight.iplat4j.ee.service;

import com.baosight.iplat4j.core.ei.EiConstant;
import com.baosight.iplat4j.core.ei.EiInfo;
import com.baosight.iplat4j.core.soa.SoaManager;
import com.baosight.iplat4j.ep.ServiceEPBase;

public class ServiceEE17 extends ServiceEPBase {

	public EiInfo initLoad(EiInfo inInfo) {

		inInfo.set("keys", "test_resource_a;test_resource_b");
		inInfo.set(EiConstant.serviceName, "ED11");
		inInfo.set(EiConstant.methodName, "getMultiResources");
		return SoaManager.invoke(inInfo);
	}
}