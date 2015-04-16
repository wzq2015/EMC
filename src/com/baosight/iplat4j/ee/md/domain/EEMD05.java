package com.baosight.iplat4j.ee.md.domain;

import com.baosight.iplat4j.core.ei.EiColumn;
import com.baosight.iplat4j.ep.DaoEPBase;
import java.util.HashMap;
import java.util.Map;
import com.baosight.iplat4j.util.StringUtils;

/**
 * EEMD05
 */
public class EEMD05 extends DaoEPBase {

	private String fproviderkey = ""; /* 提供的键值 */

	private String fprovidername = ""; /* 提供者名称 */

	private String frestable = ""; /* 关联资源表 */

	private String fsuffix = ""; /* 资源后缀 */

	private String fvalue = ""; /* 资源信息 */

	/**
	 * initialize the metadata
	 */
	public void initMetaData() {
		EiColumn eiColumn;
		eiColumn = new EiColumn("fproviderkey");
		eiColumn.setPrimaryKey(true);
		eiColumn.setFieldLength(32);
		eiColumn.setMaxLength(32);
		eiColumn.setDescName("提供的键值");
		eiColumn.setType("C");
		eiColumn.setValueProperty("label");
		eiColumn.setEditor("Text");
		eiColumn.setReadonly(false);
		eiColumn.setVisible(true);
		eiColumn.setLabelProperty("value");
		eiMetadata.addMeta(eiColumn);
		eiColumn = new EiColumn("fprovidername");
		eiColumn.setPrimaryKey(false);
		eiColumn.setFieldLength(64);
		eiColumn.setMaxLength(64);
		eiColumn.setDescName("提供者名称");
		eiColumn.setType("C");
		eiColumn.setValueProperty("label");
		eiColumn.setEditor("Text");
		eiColumn.setReadonly(false);
		eiColumn.setVisible(true);
		eiColumn.setLabelProperty("value");
		eiMetadata.addMeta(eiColumn);
		eiColumn = new EiColumn("frestable");
		eiColumn.setPrimaryKey(false);
		eiColumn.setFieldLength(16);
		eiColumn.setMaxLength(16);
		eiColumn.setDescName("关联资源表");
		eiColumn.setType("C");
		eiColumn.setValueProperty("label");
		eiColumn.setEditor("Text");
		eiColumn.setReadonly(false);
		eiColumn.setVisible(true);
		eiColumn.setLabelProperty("value");
		eiMetadata.addMeta(eiColumn);
		eiColumn = new EiColumn("fsuffix");
		eiColumn.setPrimaryKey(true);
		eiColumn.setFieldLength(16);
		eiColumn.setMaxLength(16);
		eiColumn.setDescName("资源后缀");
		eiColumn.setType("C");
		eiColumn.setValueProperty("label");
		eiColumn.setEditor("Text");
		eiColumn.setReadonly(false);
		eiColumn.setVisible(true);
		eiColumn.setLabelProperty("value");
		eiMetadata.addMeta(eiColumn);
		eiColumn = new EiColumn("fvalue");
		eiColumn.setPrimaryKey(false);
		eiColumn.setFieldLength(255);
		eiColumn.setMaxLength(255);
		eiColumn.setDescName("资源信息");
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
	public EEMD05() {
		initMetaData();
	}

	/**
	 *get the fproviderkey - 提供的键值
	 * 
	 * @return the fproviderkey
	 */
	public String getFproviderkey() {
		return this.fproviderkey;
	}

	/**
	 *set the fproviderkey - 提供的键值
	 */
	public void setFproviderkey(String fproviderkey) {
		this.fproviderkey = fproviderkey;
	}

	/**
	 *get the fprovidername - 提供者名称
	 * 
	 * @return the fprovidername
	 */
	public String getFprovidername() {
		return this.fprovidername;
	}

	/**
	 *set the fprovidername - 提供者名称
	 */
	public void setFprovidername(String fprovidername) {
		this.fprovidername = fprovidername;
	}

	/**
	 *get the frestable - 关联资源表
	 * 
	 * @return the frestable
	 */
	public String getFrestable() {
		return this.frestable;
	}

	/**
	 *set the frestable - 关联资源表
	 */
	public void setFrestable(String frestable) {
		this.frestable = frestable;
	}

	/**
	 *get the fsuffix - 资源后缀
	 * 
	 * @return the fsuffix
	 */
	public String getFsuffix() {
		return this.fsuffix;
	}

	/**
	 *set the fsuffix - 资源后缀
	 */
	public void setFsuffix(String fsuffix) {
		this.fsuffix = fsuffix;
	}

	/**
	 *get the fvalue - 资源信息
	 * 
	 * @return the fvalue
	 */
	public String getFvalue() {
		return this.fvalue;
	}

	/**
	 *set the fvalue - 资源信息
	 */
	public void setFvalue(String fvalue) {
		this.fvalue = fvalue;
	}

	/**
	 * get the value from Map
	 */
	public void fromMap(Map map) {
		setFproviderkey(StringUtils.defaultIfEmpty(StringUtils.toString(map
				.get("fproviderkey")), fproviderkey));
		setFprovidername(StringUtils.defaultIfEmpty(StringUtils.toString(map
				.get("fprovidername")), fprovidername));
		setFrestable(StringUtils.defaultIfEmpty(StringUtils.toString(map
				.get("frestable")), frestable));
		setFsuffix(StringUtils.defaultIfEmpty(StringUtils.toString(map
				.get("fsuffix")), fsuffix));
		setFvalue(StringUtils.defaultIfEmpty(StringUtils.toString(map
				.get("fvalue")), fvalue));
	}

	/**
	 * set the value to Map
	 */
	public Map toMap() {
		Map map = new HashMap();
		map.put("fproviderkey", StringUtils.toString(fproviderkey, eiMetadata
				.getMeta("fproviderkey")));
		map.put("fprovidername", StringUtils.toString(fprovidername, eiMetadata
				.getMeta("fprovidername")));
		map.put("frestable", StringUtils.toString(frestable, eiMetadata
				.getMeta("frestable")));
		map.put("fsuffix", StringUtils.toString(fsuffix, eiMetadata
				.getMeta("fsuffix")));
		map.put("fvalue", StringUtils.toString(fvalue, eiMetadata
				.getMeta("fvalue")));
		return map;

	}
}