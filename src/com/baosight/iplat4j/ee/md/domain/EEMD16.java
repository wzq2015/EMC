package com.baosight.iplat4j.ee.md.domain;

import com.baosight.iplat4j.core.ei.EiColumn;
import com.baosight.iplat4j.ep.DaoEPBase;
import java.util.HashMap;
import java.util.Map;
import com.baosight.iplat4j.util.StringUtils;
import com.baosight.iplat4j.util.NumberUtils;

/**
 * EEMD16
 */
public class EEMD16 extends DaoEPBase {

	private String trustId = ""; /* 委托单号 */

	private String projectName = ""; /* 工程名称 */

	private Float jxglapplyId; /* 检修委托单表_内码 */

	/**
	 * initialize the metadata
	 */
	public void initMetaData() {
		EiColumn eiColumn;
		eiColumn = new EiColumn("trustId");
		eiColumn.setPrimaryKey(false);
		eiColumn.setFieldLength(20);
		eiColumn.setMaxLength(20);
		eiColumn.setDescName("委托单号");
		eiColumn.setType("C");
		eiColumn.setValueProperty("label");
		eiColumn.setEditor("Text");
		eiColumn.setReadonly(false);
		eiColumn.setVisible(true);
		eiColumn.setLabelProperty("value");
		eiMetadata.addMeta(eiColumn);
		eiColumn = new EiColumn("projectName");
		eiColumn.setPrimaryKey(false);
		eiColumn.setFieldLength(100);
		eiColumn.setMaxLength(100);
		eiColumn.setDescName("工程名称");
		eiColumn.setType("C");
		eiColumn.setValueProperty("label");
		eiColumn.setEditor("Text");
		eiColumn.setReadonly(false);
		eiColumn.setVisible(true);
		eiColumn.setLabelProperty("value");
		eiMetadata.addMeta(eiColumn);
		eiColumn = new EiColumn("jxglapplyId");
		eiColumn.setPrimaryKey(false);
		eiColumn.setFieldLength(15);
		eiColumn.setMaxLength(15);
		eiColumn.setDescName("检修委托单表_内码");
		eiColumn.setType("N");
		eiColumn.setValueProperty("label");
		eiColumn.setEditor("Text");
		eiColumn.setReadonly(false);
		eiColumn.setVisible(true);
		eiColumn.setLabelProperty("value");
		eiMetadata.addMeta(eiColumn);
	}

	/**
	 * the constructor
	 */
	public EEMD16() {
		initMetaData();
	}

	/**
	 *get the trustId - 委托单号
	 * 
	 * @return the trustId
	 */
	public String getTrustId() {
		return this.trustId;
	}

	/**
	 *set the trustId - 委托单号
	 */
	public void setTrustId(String trustId) {
		this.trustId = trustId;
	}

	/**
	 *get the projectName - 工程名称
	 * 
	 * @return the projectName
	 */
	public String getProjectName() {
		return this.projectName;
	}

	/**
	 *set the projectName - 工程名称
	 */
	public void setProjectName(String projectName) {
		this.projectName = projectName;
	}

	/**
	 *get the jxglapplyId - 检修委托单表_内码
	 * 
	 * @return the jxglapplyId
	 */
	public Float getJxglapplyId() {
		return this.jxglapplyId;
	}

	/**
	 *set the jxglapplyId - 检修委托单表_内码
	 */
	public void setJxglapplyId(Float jxglapplyId) {
		this.jxglapplyId = jxglapplyId;
	}

	/**
	 * get the value from Map
	 */
	public void fromMap(Map map) {
		setTrustId(StringUtils.defaultIfEmpty(StringUtils.toString(map
				.get("trustId")), trustId));
		setProjectName(StringUtils.defaultIfEmpty(StringUtils.toString(map
				.get("projectName")), projectName));
		setJxglapplyId(NumberUtils.toFloat(StringUtils.toString(map
				.get("jxglapplyId")), jxglapplyId));
	}

	/**
	 * set the value to Map
	 */
	public Map toMap() {
		Map map = new HashMap();
		map.put("trustId", StringUtils.toString(trustId, eiMetadata
				.getMeta("trustId")));
		map.put("projectName", StringUtils.toString(projectName, eiMetadata
				.getMeta("projectName")));
		map.put("jxglapplyId", StringUtils.toString(jxglapplyId, eiMetadata
				.getMeta("jxglapplyId")));
		return map;

	}
}