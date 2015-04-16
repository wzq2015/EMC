/**
 *
 */
package com.baosight.iplat4j.ee.dm.service;

import org.apache.log4j.Logger;

import com.baosight.iplat4j.common.ee.domain.TEEDM04;
import com.baosight.iplat4j.core.ei.EiBlock;
import com.baosight.iplat4j.core.ei.EiConstant;
import com.baosight.iplat4j.core.ei.EiInfo;
import com.baosight.iplat4j.core.soa.SoaManager;
import com.baosight.iplat4j.ep.ServiceEPBase;
import com.baosight.iplat4j.ep.util.MethodParamConstants;


public class ServiceEEDM98 extends ServiceEPBase {

	private static final Logger logger = Logger.getLogger(ServiceEEDM98.class);

	public EiInfo initLoad(EiInfo inInfo) {
		return query(inInfo);
	}

	public EiInfo query(EiInfo inInfo) {
		TEEDM04 teedm04 = new TEEDM04();

		inInfo.setMethodParam(MethodParamConstants.sqlName, "EEDM04.query2");
		inInfo.setMethodParam(MethodParamConstants.daoEPBaseBean, teedm04);
		EiInfo outInfo = super.query(inInfo, true);

		outInfo.addBlock(getCompanyBlock());
		return outInfo;
	}

	protected EiBlock getCompanyBlock() {
		// 复用用ServiceEEDM01.query
		EiInfo info = new EiInfo();
		info.set(EiConstant.serviceName, "EEDM01");
		info.set(EiConstant.methodName, "query");
		EiInfo outInfo = SoaManager.call(info);
		EiBlock block = outInfo.getBlock("result");
		block.getBlockMeta().setBlockId("company");
		return block;
	}

}
