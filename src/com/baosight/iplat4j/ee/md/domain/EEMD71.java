package com.baosight.iplat4j.ee.md.domain;

import com.baosight.iplat4j.core.ei.EiColumn;
import com.baosight.iplat4j.ep.DaoEPBase;
import java.util.HashMap;
import java.util.Map;
import com.baosight.iplat4j.util.StringUtils;

/**
 * EEMD71
 */
public class EEMD71 extends DaoEPBase {

	private String recCreator = ""; /* 记录创建责任者 */

	private String recCreateTime = ""; /* 记录创建时间 */

	private String recRevisor = ""; /* 记录修改责任者 */

	/**
	 * initialize the metadata
	 */
	public void initMetaData() {
		EiColumn eiColumn;
		eiColumn = new EiColumn("recCreator");
		eiColumn.setPrimaryKey(false);
		eiColumn.setFieldLength(256);
		eiColumn.setMaxLength(256);
		eiColumn.setDescName("记录创建责任者");
		eiColumn.setType("C");
		eiColumn.setValueProperty("label");
		eiColumn.setEditor("Text");
		eiColumn.setReadonly(false);
		eiColumn.setVisible(true);
		eiColumn.setLabelProperty("value");
		eiMetadata.addMeta(eiColumn);
		eiColumn = new EiColumn("recCreateTime");
		eiColumn.setPrimaryKey(false);
		eiColumn.setFieldLength(14);
		eiColumn.setMaxLength(14);
		eiColumn.setDescName("记录创建时间");
		eiColumn.setType("C");
		eiColumn.setValueProperty("label");
		eiColumn.setEditor("Text");
		eiColumn.setReadonly(false);
		eiColumn.setVisible(true);
		eiColumn.setLabelProperty("value");
		eiMetadata.addMeta(eiColumn);
		eiColumn = new EiColumn("recRevisor");
		eiColumn.setPrimaryKey(false);
		eiColumn.setFieldLength(256);
		eiColumn.setMaxLength(256);
		eiColumn.setDescName("记录修改责任者");
		eiColumn.setType("C");
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
	public EEMD71() {
		initMetaData();
	}

	/**
	 *get the recCreator - 记录创建责任者
	 * 
	 * @return the recCreator
	 */
	public String getRecCreator() {
		return this.recCreator;
	}

	/**
	 *set the recCreator - 记录创建责任者
	 */
	public void setRecCreator(String recCreator) {
		this.recCreator = recCreator;
	}

	/**
	 *get the recCreateTime - 记录创建时间
	 * 
	 * @return the recCreateTime
	 */
	public String getRecCreateTime() {
		return this.recCreateTime;
	}

	/**
	 *set the recCreateTime - 记录创建时间
	 */
	public void setRecCreateTime(String recCreateTime) {
		this.recCreateTime = recCreateTime;
	}

	/**
	 *get the recRevisor - 记录修改责任者
	 * 
	 * @return the recRevisor
	 */
	public String getRecRevisor() {
		return this.recRevisor;
	}

	/**
	 *set the recRevisor - 记录修改责任者
	 */
	public void setRecRevisor(String recRevisor) {
		this.recRevisor = recRevisor;
	}

	/**
	 * get the value from Map
	 */
	public void fromMap(Map map) {
		setRecCreator(StringUtils.defaultIfEmpty(StringUtils.toString(map
				.get("recCreator")), recCreator));
		setRecCreateTime(StringUtils.defaultIfEmpty(StringUtils.toString(map
				.get("recCreateTime")), recCreateTime));
		setRecRevisor(StringUtils.defaultIfEmpty(StringUtils.toString(map
				.get("recRevisor")), recRevisor));
	}

	/**
	 * set the value to Map
	 */
	public Map toMap() {
		Map map = new HashMap();
		map.put("recCreator", StringUtils.toString(recCreator, eiMetadata
				.getMeta("recCreator")));
		map.put("recCreateTime", StringUtils.toString(recCreateTime, eiMetadata
				.getMeta("recCreateTime")));
		map.put("recRevisor", StringUtils.toString(recRevisor, eiMetadata
				.getMeta("recRevisor")));
		return map;

	}
}