  /**
   * Generate time : 2007-07-03 10:20:36
   * Version : 1.0.1.V20070516
   */
package com.baosight.iplat4j.ee.domain;

import com.baosight.iplat4j.util.NumberUtils;
import com.baosight.iplat4j.core.ei.EiColumn;
import com.baosight.iplat4j.ep.DaoEPBase;
import java.util.HashMap;
import java.util.Map;
import com.baosight.iplat4j.util.StringUtils;
/**
 * TEE11 
 * table comment : 测试 
 */
public class TEE11 extends DaoEPBase {

	public String rec_creator = " ";		// 记录创建责任者
	public Long w_model_id = new Long(0);	// 模型标识
	public String w_model_name = " ";		// 模型名称
	public String w_model_label = " ";		// 模型标签
	public String w_created_time = " ";		// 模型创建时间
	public String w_descr = " ";		// 描述信息
	public String rec_create_time = " ";		// 记录创建时刻
	public String rec_revisor = " ";		// 记录修改责任者
	public String rec_revise_time = " ";		// 记录修改时刻
	public String archive_flag = " ";		// 归档标记

	/**
	 * initialize the metadata 
	 */
	public void initMetaData() {
		EiColumn eiColumn;
		
	eiColumn = new EiColumn("rec_creator");
	eiColumn.setPrimaryKey(true);
	eiColumn.setFieldLength(256);	
	eiColumn.setDescName("记录创建责任者");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("w_model_id");
	eiColumn.setType("N");
	eiColumn.setScaleLength(0);
	eiColumn.setFieldLength(11);
	eiColumn.setDescName("模型标识");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("w_model_name");
	eiColumn.setFieldLength(64);	
	eiColumn.setDescName("模型名称");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("w_model_label");
	eiColumn.setFieldLength(64);	
	eiColumn.setDescName("模型标签");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("w_created_time");
	eiColumn.setFieldLength(64);	
	eiColumn.setDescName("模型创建时间");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("w_descr");
	eiColumn.setFieldLength(255);	
	eiColumn.setDescName("描述信息");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("rec_create_time");
	eiColumn.setFieldLength(14);	
	eiColumn.setDescName("记录创建时刻");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("rec_revisor");
	eiColumn.setFieldLength(256);	
	eiColumn.setDescName("记录修改责任者");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("rec_revise_time");
	eiColumn.setFieldLength(14);	
	eiColumn.setDescName("记录修改时刻");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("archive_flag");
	eiColumn.setFieldLength(1);	
	eiColumn.setDescName("归档标记");
	eiMetadata.addMeta(eiColumn);
	

	}
	/**
	 * the constructor
	 */
	public TEE11() {
		initMetaData();
	}
	
	/**
	 * get the rec_creator - 记录创建责任者
	 * @return the rec_creator
	 */
	public String getRec_creator() {
		return this.rec_creator;
	}
	
	/**
	 * set the rec_creator - 记录创建责任者
	 */
	public void setRec_creator(String rec_creator) {
		this.rec_creator = rec_creator;
	}
	
	/**
	 * get the w_model_id - 模型标识
	 * @return the w_model_id
	 */
	public Long getW_model_id() {
		return this.w_model_id;
	}
	
	/**
	 * set the w_model_id - 模型标识
	 */
	public void setW_model_id(Long w_model_id) {
		this.w_model_id = w_model_id;
	}
	
	/**
	 * get the w_model_name - 模型名称
	 * @return the w_model_name
	 */
	public String getW_model_name() {
		return this.w_model_name;
	}
	
	/**
	 * set the w_model_name - 模型名称
	 */
	public void setW_model_name(String w_model_name) {
		this.w_model_name = w_model_name;
	}
	
	/**
	 * get the w_model_label - 模型标签
	 * @return the w_model_label
	 */
	public String getW_model_label() {
		return this.w_model_label;
	}
	
	/**
	 * set the w_model_label - 模型标签
	 */
	public void setW_model_label(String w_model_label) {
		this.w_model_label = w_model_label;
	}
	
	/**
	 * get the w_created_time - 模型创建时间
	 * @return the w_created_time
	 */
	public String getW_created_time() {
		return this.w_created_time;
	}
	
	/**
	 * set the w_created_time - 模型创建时间
	 */
	public void setW_created_time(String w_created_time) {
		this.w_created_time = w_created_time;
	}
	
	/**
	 * get the w_descr - 描述信息
	 * @return the w_descr
	 */
	public String getW_descr() {
		return this.w_descr;
	}
	
	/**
	 * set the w_descr - 描述信息
	 */
	public void setW_descr(String w_descr) {
		this.w_descr = w_descr;
	}
	
	/**
	 * get the rec_create_time - 记录创建时刻
	 * @return the rec_create_time
	 */
	public String getRec_create_time() {
		return this.rec_create_time;
	}
	
	/**
	 * set the rec_create_time - 记录创建时刻
	 */
	public void setRec_create_time(String rec_create_time) {
		this.rec_create_time = rec_create_time;
	}
	
	/**
	 * get the rec_revisor - 记录修改责任者
	 * @return the rec_revisor
	 */
	public String getRec_revisor() {
		return this.rec_revisor;
	}
	
	/**
	 * set the rec_revisor - 记录修改责任者
	 */
	public void setRec_revisor(String rec_revisor) {
		this.rec_revisor = rec_revisor;
	}
	
	/**
	 * get the rec_revise_time - 记录修改时刻
	 * @return the rec_revise_time
	 */
	public String getRec_revise_time() {
		return this.rec_revise_time;
	}
	
	/**
	 * set the rec_revise_time - 记录修改时刻
	 */
	public void setRec_revise_time(String rec_revise_time) {
		this.rec_revise_time = rec_revise_time;
	}
	
	/**
	 * get the archive_flag - 归档标记
	 * @return the archive_flag
	 */
	public String getArchive_flag() {
		return this.archive_flag;
	}
	
	/**
	 * set the archive_flag - 归档标记
	 */
	public void setArchive_flag(String archive_flag) {
		this.archive_flag = archive_flag;
	}
	
	/**
	 * get the value from Map
	 */
	public void fromMap(Map map) {
	
		setRec_creator(StringUtils.defaultIfEmpty(((String)map.get("rec_creator")), rec_creator));
		setW_model_id(NumberUtils.toLong(((String)map.get("w_model_id")), w_model_id));
		setW_model_name(StringUtils.defaultIfEmpty(((String)map.get("w_model_name")), w_model_name));
		setW_model_label(StringUtils.defaultIfEmpty(((String)map.get("w_model_label")), w_model_label));
		setW_created_time(StringUtils.defaultIfEmpty(((String)map.get("w_created_time")), w_created_time));
		setW_descr(StringUtils.defaultIfEmpty(((String)map.get("w_descr")), w_descr));
		setRec_create_time(StringUtils.defaultIfEmpty(((String)map.get("rec_create_time")), rec_create_time));
		setRec_revisor(StringUtils.defaultIfEmpty(((String)map.get("rec_revisor")), rec_revisor));
		setRec_revise_time(StringUtils.defaultIfEmpty(((String)map.get("rec_revise_time")), rec_revise_time));
		setArchive_flag(StringUtils.defaultIfEmpty(((String)map.get("archive_flag")), archive_flag));
	}
	
	/**
	 * set the value to Map
	 */
	public Map toMap() {
		
		Map map = new HashMap();
			map.put("rec_creator",StringUtils.toString(rec_creator, eiMetadata.getMeta("rec_creator").getFieldLength(), eiMetadata.getMeta("rec_creator").getScaleLength()));	
			map.put("w_model_id",StringUtils.toString(w_model_id, eiMetadata.getMeta("w_model_id").getFieldLength(), eiMetadata.getMeta("w_model_id").getScaleLength()));	
			map.put("w_model_name",StringUtils.toString(w_model_name, eiMetadata.getMeta("w_model_name").getFieldLength(), eiMetadata.getMeta("w_model_name").getScaleLength()));	
			map.put("w_model_label",StringUtils.toString(w_model_label, eiMetadata.getMeta("w_model_label").getFieldLength(), eiMetadata.getMeta("w_model_label").getScaleLength()));	
			map.put("w_created_time",StringUtils.toString(w_created_time, eiMetadata.getMeta("w_created_time").getFieldLength(), eiMetadata.getMeta("w_created_time").getScaleLength()));	
			map.put("w_descr",StringUtils.toString(w_descr, eiMetadata.getMeta("w_descr").getFieldLength(), eiMetadata.getMeta("w_descr").getScaleLength()));	
			map.put("rec_create_time",StringUtils.toString(rec_create_time, eiMetadata.getMeta("rec_create_time").getFieldLength(), eiMetadata.getMeta("rec_create_time").getScaleLength()));	
			map.put("rec_revisor",StringUtils.toString(rec_revisor, eiMetadata.getMeta("rec_revisor").getFieldLength(), eiMetadata.getMeta("rec_revisor").getScaleLength()));	
			map.put("rec_revise_time",StringUtils.toString(rec_revise_time, eiMetadata.getMeta("rec_revise_time").getFieldLength(), eiMetadata.getMeta("rec_revise_time").getScaleLength()));	
			map.put("archive_flag",StringUtils.toString(archive_flag, eiMetadata.getMeta("archive_flag").getFieldLength(), eiMetadata.getMeta("archive_flag").getScaleLength()));	
			
		return map;
	
	}
}