  /**
   * Generate time : 2013-08-27 11:17:21
   * Version : 1.0.1.V20070717
   */
package com.baosight.fpserver.cm.im.domain;

import com.baosight.iplat4j.util.NumberUtils;
import com.baosight.iplat4j.core.ei.EiColumn;
import com.baosight.iplat4j.ep.DaoEPBase;
import java.util.HashMap;
import java.util.Map;
import com.baosight.iplat4j.util.StringUtils;
/**
 * TReportTemplateHistory 
 *  
 */
public class TReportTemplateHistory extends DaoEPBase {

	private Integer f_reportTemplateHistoryId = new Integer(0);		
	private String f_reportTemplateHistoryPath = " ";		
	private String f_reportTemplateHistoryModifiedtime = " ";		
	private Integer f_reportTemplateId = new Integer(0);		

	/**
	 * initialize the metadata 
	 */
	public void initMetaData() {
		EiColumn eiColumn;
		
	eiColumn = new EiColumn("f_reportTemplateHistoryId");
	eiColumn.setPrimaryKey(true);
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("f_reportTemplateHistoryPath");
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("f_reportTemplateHistoryModifiedtime");
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("f_reportTemplateId");
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	

	}
	/**
	 * the constructor
	 */
	public TReportTemplateHistory() {
		initMetaData();
	}
	
	/**
	 * get the f_reportTemplateHistoryId 
	 * @return the f_reportTemplateHistoryId
	 */
	public Integer getF_reportTemplateHistoryId() {
		return this.f_reportTemplateHistoryId;
	}
	
	/**
	 * set the f_reportTemplateHistoryId 
	 */
	public void setF_reportTemplateHistoryId(Integer f_reportTemplateHistoryId) {
		this.f_reportTemplateHistoryId = f_reportTemplateHistoryId;
	}
	
	/**
	 * get the f_reportTemplateHistoryPath 
	 * @return the f_reportTemplateHistoryPath
	 */
	public String getF_reportTemplateHistoryPath() {
		return this.f_reportTemplateHistoryPath;
	}
	
	/**
	 * set the f_reportTemplateHistoryPath 
	 */
	public void setF_reportTemplateHistoryPath(String f_reportTemplateHistoryPath) {
		this.f_reportTemplateHistoryPath = f_reportTemplateHistoryPath;
	}
	
	/**
	 * get the f_reportTemplateHistoryModifiedtime 
	 * @return the f_reportTemplateHistoryModifiedtime
	 */
	public String getF_reportTemplateHistoryModifiedtime() {
		return this.f_reportTemplateHistoryModifiedtime;
	}
	
	/**
	 * set the f_reportTemplateHistoryModifiedtime 
	 */
	public void setF_reportTemplateHistoryModifiedtime(String f_reportTemplateHistoryModifiedtime) {
		this.f_reportTemplateHistoryModifiedtime = f_reportTemplateHistoryModifiedtime;
	}
	
	/**
	 * get the f_reportTemplateId 
	 * @return the f_reportTemplateId
	 */
	public Integer getF_reportTemplateId() {
		return this.f_reportTemplateId;
	}
	
	/**
	 * set the f_reportTemplateId 
	 */
	public void setF_reportTemplateId(Integer f_reportTemplateId) {
		this.f_reportTemplateId = f_reportTemplateId;
	}
	
	/**
	 * get the value from Map
	 */
	public void fromMap(Map map) {
	
		setF_reportTemplateHistoryId(NumberUtils.toInteger(StringUtils.toString(map.get("f_reportTemplateHistoryId")), f_reportTemplateHistoryId));
		setF_reportTemplateHistoryPath(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("f_reportTemplateHistoryPath")), f_reportTemplateHistoryPath));
		setF_reportTemplateHistoryModifiedtime(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("f_reportTemplateHistoryModifiedtime")), f_reportTemplateHistoryModifiedtime));
		setF_reportTemplateId(NumberUtils.toInteger(StringUtils.toString(map.get("f_reportTemplateId")), f_reportTemplateId));
	}
	
	/**
	 * set the value to Map
	 */
	public Map toMap() {
		
		Map map = new HashMap();
			map.put("f_reportTemplateHistoryId",StringUtils.toString(f_reportTemplateHistoryId, eiMetadata.getMeta("f_reportTemplateHistoryId")));	
			map.put("f_reportTemplateHistoryPath",StringUtils.toString(f_reportTemplateHistoryPath, eiMetadata.getMeta("f_reportTemplateHistoryPath")));	
			map.put("f_reportTemplateHistoryModifiedtime",StringUtils.toString(f_reportTemplateHistoryModifiedtime, eiMetadata.getMeta("f_reportTemplateHistoryModifiedtime")));	
			map.put("f_reportTemplateId",StringUtils.toString(f_reportTemplateId, eiMetadata.getMeta("f_reportTemplateId")));	
			
		return map;
	
	}
}