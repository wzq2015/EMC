package com.baosight.iplat4j.ee.service;

import com.baosight.iplat4j.common.ee.domain.TEE11;
import com.baosight.iplat4j.core.ei.EiBlockMeta;
import com.baosight.iplat4j.core.ei.EiConstant;
import com.baosight.iplat4j.core.ei.EiInfo;
import com.baosight.iplat4j.core.soa.SoaManager;
import com.baosight.iplat4j.core.threadlocal.UserSession;
import com.baosight.iplat4j.ep.ServiceEPBase;
import com.baosight.iplat4j.ep.util.MethodParamConstants;

public class ServiceEE11 extends ServiceEPBase {

	public EiInfo initLoad(EiInfo inInfo) {
		TEE11 tee11 = new TEE11();

		return super.initLoad(inInfo, tee11);

	}

	public EiInfo query(EiInfo inInfo) {
		TEE11 tee11 = new TEE11();
		
		EiBlockMeta trueMeta = this.getUserDefineMetas("EE11", "RESULT", tee11.eiMetadata);
		
		
		inInfo.setMethodParam(MethodParamConstants.sqlName, "tee11.query");
		inInfo.setMethodParam(MethodParamConstants.daoEPBaseBean, tee11);
		inInfo.setMethodParam(MethodParamConstants.eiBlockMeta, trueMeta);
		
		EiInfo outInfo = super.query(inInfo, true);
		
		return outInfo;

	}

}