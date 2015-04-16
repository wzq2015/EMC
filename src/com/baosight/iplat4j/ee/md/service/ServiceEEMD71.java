package com.baosight.iplat4j.ee.md.service;

import java.util.List;
import org.apache.log4j.Logger;
import com.baosight.iplat4j.core.ei.EiInfo;
import com.baosight.iplat4j.ep.ServiceEPBase;
import com.baosight.iplat4j.core.spring.SpringApplicationContext;
import com.baosight.iplat4j.ed.util.CodesetBiz;
import com.baosight.iplat4j.core.ei.EiBlock;
import com.baosight.iplat4j.core.ei.EiColumn;
import com.baosight.iplat4j.ee.md.domain.EEMD71;

public class ServiceEEMD71 extends ServiceEPBase {

	private static final Logger logger = Logger.getLogger(ServiceEEMD71.class);

	/**
	 * 页面初始化
	 * 
	 * @param EiInfo
	 * @return EiInfo
	 */
	public EiInfo initLoad(EiInfo inInfo) {
		EiInfo outInfo = new EiInfo();

		EiBlock block = outInfo.addBlock("result");

		EEMD71 bean = new EEMD71();

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
		super.delete(inInfo, "EEMD71.delete");
		EiInfo outInfo = super.query(inInfo, "EEMD71.query", new EEMD71());
		return outInfo;
	}

	/**
	 * insert
	 * 
	 * @param 包含参数的EiInfo
	 * @return 包含结果数据集的EiInfo
	 */
	public EiInfo insert(EiInfo inInfo) {
		super.insert(inInfo, "EEMD71.insert");
		EiInfo outInfo = super.query(inInfo, "EEMD71.query", new EEMD71());
		return outInfo;
	}

	/**
	 * query
	 * 
	 * @param 包含参数的EiInfo
	 * @return 包含结果数据集的EiInfo
	 */
	public EiInfo query(EiInfo inInfo) {
		EiInfo outInfo = super.query(inInfo, "EEMD71.query", new EEMD71());
		return outInfo;
	}

	/**
	 * update
	 * 
	 * @param 包含参数的EiInfo
	 * @return 包含结果数据集的EiInfo
	 */
	public EiInfo update(EiInfo inInfo) {
		super.update(inInfo, "EEMD71.update");
		EiInfo outInfo = super.query(inInfo, "EEMD71.query", new EEMD71());
		return outInfo;
	}

}
