package com.baosight.iplat4j.ee.md.service;

import java.util.List;
import org.apache.log4j.Logger;
import com.baosight.iplat4j.core.ei.EiInfo;
import com.baosight.iplat4j.ep.ServiceEPBase;
import com.baosight.iplat4j.core.spring.SpringApplicationContext;
import com.baosight.iplat4j.ed.util.CodesetBiz;
import com.baosight.iplat4j.core.ei.EiBlock;
import com.baosight.iplat4j.core.ei.EiColumn;
import com.baosight.iplat4j.ee.md.domain.EEMD16;

public class ServiceEEMD16 extends ServiceEPBase {

	private static final Logger logger = Logger.getLogger(ServiceEEMD16.class);

	/**
	 * 页面初始化
	 * 
	 * @param EiInfo
	 * @return EiInfo
	 */
	public EiInfo initLoad(EiInfo inInfo) {
		EiInfo outInfo = super.initLoad(inInfo, "eemd16_result", new EEMD16());

		return outInfo;
	}

	/**
	 * delete
	 * 
	 * @param 包含参数的EiInfo
	 * @return 包含结果数据集的EiInfo
	 */
	public EiInfo delete(EiInfo inInfo) {
		super.delete(inInfo, "EEMD16.delete");
		EiInfo outInfo = super.query(inInfo, "EEMD16.query", new EEMD16());
		return outInfo;
	}

	/**
	 * insert
	 * 
	 * @param 包含参数的EiInfo
	 * @return 包含结果数据集的EiInfo
	 */
	public EiInfo insert(EiInfo inInfo) {
		super.insert(inInfo, "EEMD16.insert");
		EiInfo outInfo = super.query(inInfo, "EEMD16.query", new EEMD16());
		return outInfo;
	}

	/**
	 * query
	 * 
	 * @param 包含参数的EiInfo
	 * @return 包含结果数据集的EiInfo
	 */
	public EiInfo query(EiInfo inInfo) {
		EiInfo outInfo = super.query(inInfo, "EEMD16.query", new EEMD16());
		return outInfo;
	}

	/**
	 * update
	 * 
	 * @param 包含参数的EiInfo
	 * @return 包含结果数据集的EiInfo
	 */
	public EiInfo update(EiInfo inInfo) {
		super.update(inInfo, "EEMD16.update");
		EiInfo outInfo = super.query(inInfo, "EEMD16.query", new EEMD16());
		return outInfo;
	}

}
