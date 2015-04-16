package com.baosight.iplat4j.ee.dm.service;
import java.util.HashMap;

import java.util.List;
import java.util.Map;

import com.baosight.iplat4j.core.FrameworkInfo;
import com.baosight.iplat4j.core.ei.EiBlock;
import com.baosight.iplat4j.core.ei.EiBlockMeta;
import com.baosight.iplat4j.core.ei.EiColumn;
import com.baosight.iplat4j.core.ei.EiConstant;
import com.baosight.iplat4j.core.ei.EiInfo;

import com.baosight.iplat4j.ep.ServiceEPBase;

public class ServiceEEDM54 extends ServiceEPBase {

	private EiBlockMeta eiMetadata = null;

	public EiInfo initLoad(EiInfo info) {
		info = super.initLoad(info);
		return queryAll(info);
	}

	//加载数据，处理数据
	public EiInfo queryAll(EiInfo inInfo) {
		EiInfo outInfo = new EiInfo();
		String project = FrameworkInfo.getProjectEname();
		Map params = new HashMap();
		List ret = dao.query("EEDM54.queryNodes", params);
		for (int i = 0; i < ret.size(); i++) {
			Map node = (Map) ret.get(i);
			String blockName = (String) node.get("parent");
			if ("root".equals(blockName) || project.equals(blockName)) {
				blockName = "$";
			}
			EiBlock block = outInfo.getBlock(blockName);
			if (block == null) {
				block = outInfo.addBlock(blockName);
				block.addBlockMeta(initMetaData());
				outInfo.addBlock(block);
			}
			block.addRow(node);
			String leaf = node.get("leaf").toString();
			if ("0".equals(leaf)) {
				String label = (String) node.get("label");
				EiBlock b = outInfo.getBlock(label);
				if (b == null) {
					b = outInfo.addBlock(label);
					b.addBlockMeta(initMetaData());
					outInfo.addBlock(b);
				}
			}
		}
		return outInfo;
	}
	// 初始化元数据
	public EiBlockMeta initMetaData() {
		if (eiMetadata == null) {
			eiMetadata = new EiBlockMeta();
			EiColumn eiColumn = new EiColumn("label");
			eiColumn.setDescName("label");
			eiColumn.setNullable(false);
			eiColumn.setPrimaryKey(false);
			eiMetadata.addMeta(eiColumn);

			eiColumn = new EiColumn("text");
			eiColumn.setDescName("text");
			eiColumn.setNullable(false);
			eiColumn.setPrimaryKey(false);
			eiMetadata.addMeta(eiColumn);

			eiColumn = new EiColumn("leaf");
			eiColumn.setDescName("leaf");
			eiColumn.setType(EiConstant.COLUMN_TYPE_NUMBER);
			eiColumn.setNullable(false);
			eiColumn.setPrimaryKey(false);
			eiMetadata.addMeta(eiColumn);
		}
		return eiMetadata;
	}

}
