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
import com.baosight.iplat4j.core.ei.EiConstant;
import com.baosight.iplat4j.ee.md.domain.EEMD17;

public class ServiceEEMD17 extends ServiceEPBase {

	private static final Logger logger = Logger.getLogger(ServiceEEMD17.class);

	/**
	 * 页面初始化
	 * 
	 * @param EiInfo
	 * @return EiInfo
	 */
	public EiInfo initLoad(EiInfo inInfo) {		
		
		EEMD17 bean = new EEMD17();
		
		EiInfo outInfo = super.initLoad(inInfo, "eemd17_result", bean);

//		EiBlock block = outInfo.addBlock("eemd17_result");		
//
//		block.setBlockMeta(bean.eiMetadata);

		outInfo.addBlock(getCodeOfrepType());
		return outInfo;
	}

	/**
	 * delete
	 * 
	 * @param 包含参数的EiInfo
	 * @return 包含结果数据集的EiInfo
	 */
	public EiInfo delete(EiInfo inInfo) {
		super.delete(inInfo, "EEMD17.delete", null, false, "eemd17_result");
		EiInfo outInfo = super.query(inInfo, "EEMD17.query", new EEMD17(),
				false, null, "inqu_status", "eemd17_result", "eemd17_result");
		return outInfo;
	}

	/**
	 * insert
	 * 
	 * @param 包含参数的EiInfo
	 * @return 包含结果数据集的EiInfo
	 */
	public EiInfo insert(EiInfo inInfo) {
		super.insert(inInfo, "EEMD17.insert", null, false, "eemd17_result");
		EiInfo outInfo = super.query(inInfo, "EEMD17.query", new EEMD17(),
				false, null, "inqu_status", "eemd17_result", "eemd17_result");
		return outInfo;
	}

	/**
	 * query
	 * 
	 * @param 包含参数的EiInfo
	 * @return 包含结果数据集的EiInfo
	 */
	public EiInfo query(EiInfo inInfo) {
		EiInfo outInfo = super.query(inInfo, "EEMD17.query", new EEMD17(),
				false, null, "inqu_status", "eemd17_result", "eemd17_result");
		return outInfo;
	}

	/**
	 * update
	 * 
	 * @param 包含参数的EiInfo
	 * @return 包含结果数据集的EiInfo
	 */
	public EiInfo update(EiInfo inInfo) {
		super.update(inInfo, "EEMD17.update", null, false, "eemd17_result");
		EiInfo outInfo = super.query(inInfo, "EEMD17.query", new EEMD17(),
				false, null, "inqu_status", "eemd17_result", "eemd17_result");
		return outInfo;
	}

	/**
	 * 返回小代码名称为 "N04011" 的EiBlock
	 * 
	 * @return EiBlock
	 */
	private EiBlock getCodeOfrepType() {
		EiBlock block = new EiBlock("N04011");

		CodesetBiz codeBiz = (CodesetBiz) SpringApplicationContext
				.getBean("codesetBiz");
		List list = codeBiz.getCodeSet("N04011", "");

		String format = "%2-%1";
		String displayFormat = "";
		if (format.trim().equals("")) {
			displayFormat = "%1$2s";
		} else {
			displayFormat = format.trim().replace("%1", "%1$2s").replace("%2",
					"%2$2s");
		}

		List codeSetList = new ArrayList();
		for (int i = 0; i < list.size(); i++) {
			HashMap map = (HashMap) list.get(i);
			String label = map.get("label").toString();
			String value = map.get("value").toString();

			HashMap codeSetMap = new HashMap();
			codeSetMap.put("value", value);
			codeSetMap.put("label", String.format(displayFormat, label, value));
			codeSetList.add(codeSetMap);
		}

		EiColumn eiColumn = new EiColumn("label");
		eiColumn.setType("C");
		block.addMeta(eiColumn);

		eiColumn = new EiColumn("value");
		eiColumn.setType("C");
		block.addMeta(eiColumn);

		block.setRows(codeSetList);
		return block;
	}

}
