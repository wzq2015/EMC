package com.baosight.iplat4j.ee.md.service;

import java.util.List;
import org.apache.log4j.Logger;
import com.baosight.iplat4j.core.ei.EiInfo;
import com.baosight.iplat4j.ep.ServiceEPBase;
import com.baosight.iplat4j.core.spring.SpringApplicationContext;
import com.baosight.iplat4j.ed.util.CodesetBiz;
import com.baosight.iplat4j.core.ei.EiBlock;
import com.baosight.iplat4j.core.ei.EiColumn;
import com.baosight.iplat4j.ee.md.domain.EEMD00;

public class ServiceEEMD00 extends ServiceEPBase {

	private static final Logger logger = Logger.getLogger(ServiceEEMD00.class);

	/**
	 * 页面初始化
	 * 
	 * @param EiInfo
	 * @return EiInfo
	 */
	public EiInfo initLoad(EiInfo inInfo) {
		EiInfo outInfo = new EiInfo();
		outInfo.addBlock(getCodeOfformType());
		return outInfo;
	}

	/**
	 * delete
	 * 
	 * @param 包含参数的EiInfo
	 * @return 包含结果数据集的EiInfo
	 */
	public EiInfo delete(EiInfo inInfo) {
		super.delete(inInfo, "EEMD00.delete");
		EiInfo outInfo = super.query(inInfo, "EEMD00.query", new EEMD00());
		return outInfo;
	}

	/**
	 * insert
	 * 
	 * @param 包含参数的EiInfo
	 * @return 包含结果数据集的EiInfo
	 */
	public EiInfo insert(EiInfo inInfo) {
		super.insert(inInfo, "EEMD00.insert");
		EiInfo outInfo = super.query(inInfo, "EEMD00.query", new EEMD00());
		return outInfo;
	}

	/**
	 * query
	 * 
	 * @param 包含参数的EiInfo
	 * @return 包含结果数据集的EiInfo
	 */
	public EiInfo query(EiInfo inInfo) {
		EiInfo outInfo = super.query(inInfo, "EEMD00.query", new EEMD00());
		return outInfo;
	}

	/**
	 * update
	 * 
	 * @param 包含参数的EiInfo
	 * @return 包含结果数据集的EiInfo
	 */
	public EiInfo update(EiInfo inInfo) {
		super.update(inInfo, "EEMD00.update");
		EiInfo outInfo = super.query(inInfo, "EEMD00.query", new EEMD00());
		return outInfo;
	}

	/**
	 * 返回小代码名称为 "P0001" 的EiBlock
	 * 
	 * @return EiBlock
	 */
	private EiBlock getCodeOfformType() {
		EiBlock block = new EiBlock("P0001");

		CodesetBiz codeBiz = (CodesetBiz) SpringApplicationContext
				.getBean("codesetBiz");
		List list = codeBiz.getCodeSet("P0001", "");

		EiColumn eiColumn = new EiColumn("label");
		eiColumn.setType("C");
		block.addMeta(eiColumn);

		eiColumn = new EiColumn("value");
		eiColumn.setType("C");
		block.addMeta(eiColumn);

		block.setRows(list);
		return block;
	}

}
