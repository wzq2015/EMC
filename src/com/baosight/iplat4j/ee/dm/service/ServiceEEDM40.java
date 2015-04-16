package com.baosight.iplat4j.ee.dm.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;

import com.baosight.iplat4j.common.ee.domain.TEEDM04;
import com.baosight.iplat4j.core.ei.EiBlock;
import com.baosight.iplat4j.core.ei.EiBlockMeta;
import com.baosight.iplat4j.core.ei.EiColumn;
import com.baosight.iplat4j.core.ei.EiInfo;
import com.baosight.iplat4j.ed.md.domain.EDMD40;
import com.baosight.iplat4j.ed.md.service.ServiceEDMD40;
import com.baosight.iplat4j.ep.ServiceEPBase;
import com.baosight.iplat4j.ep.util.MethodParamConstants;
import com.baosight.iplat4j.util.util.EiInfoUtil;

public class ServiceEEDM40 extends ServiceEPBase{
	private static final Logger logger = Logger.getLogger(ServiceEEDM40.class);

	/**
	 * 页面初始化
	 * @param EiInfo
	 * @return EiInfo
	 */
	public EiInfo initLoad(EiInfo inInfo) {

		EDMD40 edmd40 = new EDMD40();
		EiInfo outInfo = super.initLoad(inInfo, edmd40);

		// 查询数据
		List list = dao.query("EEDM04.queryToDisplay", null);

		// 查询下拉框数据
		EiBlock block = new EiBlock("dataBlock");

		EiBlockMeta metas = new EiBlockMeta();
		EiColumn eiColumn = new EiColumn("id");
		eiColumn.setFieldLength(255);
		eiColumn.setDescName("产品代码");
		metas.addMeta(eiColumn);

		eiColumn = new EiColumn("name");
		eiColumn.setFieldLength(255);
		eiColumn.setDescName("产品名称");
		metas.addMeta(eiColumn);

		eiColumn = new EiColumn("info");
		eiColumn.setFieldLength(255);
		eiColumn.setDescName("产品信息");
		metas.addMeta(eiColumn);
		
		block.setBlockMeta(metas);
		block.setRows(list);

		outInfo.addBlock(block);

		System.out.println("----" + EiInfoUtil.toXML(outInfo));

		return outInfo;
	}

	/**
	 * 查询
	 * @param 包含查询参数的EiInfo
	 * @return 包含查询结果数据集的EiInfo
	 */
	public EiInfo query(EiInfo inInfo) {
		System.out.println("----" + EiInfoUtil.toXML(inInfo));
		TEEDM04 eedm04 = new TEEDM04();
		String code=(String)inInfo.getCell("inqu_status", 0, "productCode");
		if(StringUtils.isNotBlank(code))
			eedm04.setProductCode(code);
		inInfo.setMethodParam(MethodParamConstants.sqlName, "EEDM04.queryToDisplay");
		inInfo.setMethodParam(MethodParamConstants.daoEPBaseBean, eedm04);

		EiInfo outInfo = super.query(inInfo, true);
		outInfo = getData(outInfo);
		outInfo.getBlock("result").setBlockMeta(outInfo.getBlock("dataBlock").getBlockMeta());
		return outInfo;
	}

	/**
	 * 查询下拉框数据
	 *
	 * @param info
	 * @return
	 */
	public EiInfo getData(EiInfo info) {
		System.out.println(EiInfoUtil.toXML(info));

		// 取得查询字段
		String q = StringUtils.defaultIfEmpty(info.getString("q"), "");

		Map map = new HashMap();
		map.put("productName", q);

		// 查询数据
		List list = dao.query("EEDM04.queryToDisplay", map);

		// 查询下拉框数据
		EiBlock block = new EiBlock("dataBlock");

		EiBlockMeta metas = new EiBlockMeta();
		EiColumn eiColumn = new EiColumn("id");
		eiColumn.setFieldLength(255);
		eiColumn.setDescName("产品代码");
		metas.addMeta(eiColumn);

		eiColumn = new EiColumn("name");
		eiColumn.setFieldLength(255);
		eiColumn.setDescName("产品名称");
		metas.addMeta(eiColumn);

		eiColumn = new EiColumn("info");
		eiColumn.setFieldLength(255);
		eiColumn.setDescName("产品信息");
		metas.addMeta(eiColumn);		
		
		block.setBlockMeta(metas);
		block.setRows(list);

		info.set("totalResult", list.size());

		info.addBlock(block);

		return info;
	}
}
