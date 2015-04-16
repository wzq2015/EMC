package com.baosight.iplat4j.ee.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.baosight.iplat4j.core.ei.EiBlockMeta;
import com.baosight.iplat4j.core.ei.EiColumn;
import com.baosight.iplat4j.core.ei.EiInfo;
import com.baosight.iplat4j.ef.ui.tree.TreeService;

public class ServiceEE03 extends TreeService {

	public EiInfo initLoad(EiInfo inInfo) {
		EiInfo outInfo = new EiInfo();
		return outInfo;
	}

	
	public List getTopNodes() {
		List ret = new ArrayList();
		for (int i = 0; i < 10; i++) {
			ret.add(toNode(i + "", i + ""));
		}
		return ret;
	}
	
	public List getChildNodes(String p) {
		List ret = new ArrayList();		
		for (int i = 0; i < 10; i++) {
			Map tnode = toNode(p + i, p + i);
			ret.add(tnode);
		}
		return ret;
	}

	private Map toNode(String lb, String txt) {
		Map map = new HashMap();
		map.put("label", lb);
		map.put("text", txt);
		return map;
	}

	public EiBlockMeta initMetaData() {
		EiBlockMeta eiMetadata = new EiBlockMeta();

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

		return eiMetadata;
	}



}
