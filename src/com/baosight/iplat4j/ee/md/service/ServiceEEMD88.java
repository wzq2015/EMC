package com.baosight.iplat4j.ee.md.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import org.apache.log4j.Logger;
import com.baosight.iplat4j.core.ei.EiInfo;
import com.baosight.iplat4j.ep.ServiceEPBase;
import com.baosight.iplat4j.core.spring.SpringApplicationContext;
import com.baosight.iplat4j.ed.util.CodesetBiz;
import com.baosight.iplat4j.core.ei.EiBlock;
import com.baosight.iplat4j.core.ei.EiColumn;
import com.baosight.iplat4j.ee.md.domain.EEMD88;

public class ServiceEEMD88 extends ServiceEPBase {

	private static final Logger logger = Logger.getLogger(ServiceEEMD88.class);

	/**
	 * 页面初始化
	 * 
	 * @param EiInfo
	 * @return EiInfo
	 */
	public EiInfo initLoad(EiInfo inInfo) {
		EiInfo outInfo = super.initLoad(inInfo, "eemd88_result", new EEMD88());

		EiBlock block = outInfo.addBlock("eemd88_result");

		EEMD88 bean = new EEMD88();

		block.setBlockMeta(bean.eiMetadata);

		return outInfo;
	}

	/**
	 * delete
	 * 
	 * @param 包含参数的EiInfo
	 * @return 包含结果数据集的EiInfo
	 */
	public EiInfo delete(EiInfo inInfo) {
		super.delete(inInfo, "EEMD88.delete", null, false, "eemd88_result");
		EiInfo outInfo = super.query(inInfo, "EEMD88.query", new EEMD88(),
				false, null, "eemd88_inqu_status", "eemd88_result",
				"eemd88_result");
		return outInfo;
	}

	/**
	 * insert
	 * 
	 * @param 包含参数的EiInfo
	 * @return 包含结果数据集的EiInfo
	 */
	public EiInfo insert(EiInfo inInfo) {
		super.insert(inInfo, "EEMD88.insert", null, false, "eemd88_result");
		EiInfo outInfo = super.query(inInfo, "EEMD88.query", new EEMD88(),
				false, null, "eemd88_inqu_status", "eemd88_result",
				"eemd88_result");
		return outInfo;
	}

	/**
	 * query
	 * 
	 * @param 包含参数的EiInfo
	 * @return 包含结果数据集的EiInfo
	 */
	public EiInfo query(EiInfo inInfo) {
		EiInfo outInfo = super.query(inInfo, "EEMD88.query", new EEMD88(),
				false, null, "eemd88_inqu_status", "eemd88_result",
				"eemd88_result");
		return outInfo;
	}

	/**
	 * update
	 * 
	 * @param 包含参数的EiInfo
	 * @return 包含结果数据集的EiInfo
	 */
	public EiInfo update(EiInfo inInfo) {
		super.update(inInfo, "EEMD88.update", null, false, "eemd88_result");
		EiInfo outInfo = super.query(inInfo, "EEMD88.query", new EEMD88(),
				false, null, "eemd88_inqu_status", "eemd88_result",
				"eemd88_result");
		return outInfo;
	}

}
