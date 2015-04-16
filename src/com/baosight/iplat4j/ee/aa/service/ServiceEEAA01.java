/**
 * Generate time : 2011-07-26 14:30:44
 */
package com.baosight.iplat4j.ee.aa.service;
import org.apache.log4j.Logger;
import com.baosight.iplat4j.core.ei.EiInfo;
import com.baosight.iplat4j.ep.ServiceEPBase;

public class ServiceEEAA01 extends ServiceEPBase {

	private static final Logger logger = Logger.getLogger(ServiceEEAA01.class);

	/**
	 * 页面初始化
	 * @param EiInfo
	 * @return EiInfo
	 */
	public EiInfo initLoad(EiInfo inInfo) {
		EiInfo outInfo = super.initLoad(inInfo);		
		return outInfo;
	}


}
