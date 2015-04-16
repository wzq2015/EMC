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
 * TSystemLog 
 *  
 */
public class TSystemLog extends DaoEPBase {

	private Integer f_systemLogId = new Integer(0);		
	private Integer f_emcprojectId = new Integer(0);		
	private String f_systemLogTime = " ";		
	private Integer f_systemLogLevel = new Integer(0);		
	private String f_systemLogContent = " ";		

	/**
	 * initialize the metadata 
	 */
	public void initMetaData() {
		EiColumn eiColumn;
		
	eiColumn = new EiColumn("f_systemLogId");
	eiColumn.setPrimaryKey(true);
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("f_emcprojectId");
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("f_systemLogTime");
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("f_systemLogLevel");
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("f_systemLogContent");
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	

	}
	/**
	 * the constructor
	 */
	public TSystemLog() {
		initMetaData();
	}
	
	/**
	 * get the f_systemLogId 
	 * @return the f_systemLogId
	 */
	public Integer getF_systemLogId() {
		return this.f_systemLogId;
	}
	
	/**
	 * set the f_systemLogId 
	 */
	public void setF_systemLogId(Integer f_systemLogId) {
		this.f_systemLogId = f_systemLogId;
	}
	
	/**
	 * get the f_emcprojectId 
	 * @return the f_emcprojectId
	 */
	public Integer getF_emcprojectId() {
		return this.f_emcprojectId;
	}
	
	/**
	 * set the f_emcprojectId 
	 */
	public void setF_emcprojectId(Integer f_emcprojectId) {
		this.f_emcprojectId = f_emcprojectId;
	}
	
	/**
	 * get the f_systemLogTime 
	 * @return the f_systemLogTime
	 */
	public String getF_systemLogTime() {
		return this.f_systemLogTime;
	}
	
	/**
	 * set the f_systemLogTime 
	 */
	public void setF_systemLogTime(String f_systemLogTime) {
		this.f_systemLogTime = f_systemLogTime;
	}
	
	/**
	 * get the f_systemLogLevel 
	 * @return the f_systemLogLevel
	 */
	public Integer getF_systemLogLevel() {
		return this.f_systemLogLevel;
	}
	
	/**
	 * set the f_systemLogLevel 
	 */
	public void setF_systemLogLevel(Integer f_systemLogLevel) {
		this.f_systemLogLevel = f_systemLogLevel;
	}
	
	/**
	 * get the f_systemLogContent 
	 * @return the f_systemLogContent
	 */
	public String getF_systemLogContent() {
		return this.f_systemLogContent;
	}
	
	/**
	 * set the f_systemLogContent 
	 */
	public void setF_systemLogContent(String f_systemLogContent) {
		this.f_systemLogContent = f_systemLogContent;
	}
	
	/**
	 * get the value from Map
	 */
	public void fromMap(Map map) {
	
		setF_systemLogId(NumberUtils.toInteger(StringUtils.toString(map.get("f_systemLogId")), f_systemLogId));
		setF_emcprojectId(NumberUtils.toInteger(StringUtils.toString(map.get("f_emcprojectId")), f_emcprojectId));
		setF_systemLogTime(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("f_systemLogTime")), f_systemLogTime));
		setF_systemLogLevel(NumberUtils.toInteger(StringUtils.toString(map.get("f_systemLogLevel")), f_systemLogLevel));
		setF_systemLogContent(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("f_systemLogContent")), f_systemLogContent));
	}
	
	/**
	 * set the value to Map
	 */
	public Map toMap() {
		
		Map map = new HashMap();
			map.put("f_systemLogId",StringUtils.toString(f_systemLogId, eiMetadata.getMeta("f_systemLogId")));	
			map.put("f_emcprojectId",StringUtils.toString(f_emcprojectId, eiMetadata.getMeta("f_emcprojectId")));	
			map.put("f_systemLogTime",StringUtils.toString(f_systemLogTime, eiMetadata.getMeta("f_systemLogTime")));	
			map.put("f_systemLogLevel",StringUtils.toString(f_systemLogLevel, eiMetadata.getMeta("f_systemLogLevel")));	
			map.put("f_systemLogContent",StringUtils.toString(f_systemLogContent, eiMetadata.getMeta("f_systemLogContent")));	
			
		return map;
	
	}
}