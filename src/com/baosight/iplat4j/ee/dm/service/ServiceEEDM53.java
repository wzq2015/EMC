package com.baosight.iplat4j.ee.dm.service;

import com.baosight.iplat4j.core.ei.EiConstant;
import com.baosight.iplat4j.core.ei.EiInfo;
import com.baosight.iplat4j.core.soa.SoaManager;
import com.baosight.iplat4j.ep.ServiceEPBase;

public class ServiceEEDM53 extends ServiceEPBase {
	public EiInfo initLoad(EiInfo inInfo) {
		inInfo.set(EiConstant.serviceName, "EDPI142");
		inInfo.set(EiConstant.methodName, "queryAll");
		return SoaManager.call(inInfo);
	}
}
