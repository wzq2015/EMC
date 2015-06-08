  /**
   * Generate time : 2015-05-29 10:25:53
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
 * TEventLog 
 *  
 */
public class TEventLog extends DaoEPBase {

	private Integer f_eventLogId = new Integer(0);		
	private String f_eventLogName = " ";		
	private String f_eventLogDate = " ";		
	private String f_eventLogDesc = " ";		
	private String f_eventLogRemindDate = " ";		
	private Integer f_eventLogType = new Integer(0);		
	private Integer f_eventLogBelongId = new Integer(0);		
	private Integer f_eventLogRemindSwitch = new Integer(0);		

	/**
	 * initialize the metadata 
	 */
	public void initMetaData() {
		EiColumn eiColumn;
		
	eiColumn = new EiColumn("f_eventLogId");
	eiColumn.setPrimaryKey(true);
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("f_eventLogName");
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("f_eventLogDate");
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("f_eventLogDesc");
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("f_eventLogRemindDate");
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("f_eventLogType");
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("f_eventLogBelongId");
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("f_eventLogRemindSwitch");
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	

	}
	/**
	 * the constructor
	 */
	public TEventLog() {
		initMetaData();
	}
	
	/**
	 * get the f_eventLogId 
	 * @return the f_eventLogId
	 */
	public Integer getF_eventLogId() {
		return this.f_eventLogId;
	}
	
	/**
	 * set the f_eventLogId 
	 */
	public void setF_eventLogId(Integer f_eventLogId) {
		this.f_eventLogId = f_eventLogId;
	}
	
	/**
	 * get the f_eventLogName 
	 * @return the f_eventLogName
	 */
	public String getF_eventLogName() {
		return this.f_eventLogName;
	}
	
	/**
	 * set the f_eventLogName 
	 */
	public void setF_eventLogName(String f_eventLogName) {
		this.f_eventLogName = f_eventLogName;
	}
	
	/**
	 * get the f_eventLogDate 
	 * @return the f_eventLogDate
	 */
	public String getF_eventLogDate() {
		return this.f_eventLogDate;
	}
	
	/**
	 * set the f_eventLogDate 
	 */
	public void setF_eventLogDate(String f_eventLogDate) {
		this.f_eventLogDate = f_eventLogDate;
	}
	
	/**
	 * get the f_eventLogDesc 
	 * @return the f_eventLogDesc
	 */
	public String getF_eventLogDesc() {
		return this.f_eventLogDesc;
	}
	
	/**
	 * set the f_eventLogDesc 
	 */
	public void setF_eventLogDesc(String f_eventLogDesc) {
		this.f_eventLogDesc = f_eventLogDesc;
	}
	
	/**
	 * get the f_eventLogRemindDate 
	 * @return the f_eventLogRemindDate
	 */
	public String getF_eventLogRemindDate() {
		return this.f_eventLogRemindDate;
	}
	
	/**
	 * set the f_eventLogRemindDate 
	 */
	public void setF_eventLogRemindDate(String f_eventLogRemindDate) {
		this.f_eventLogRemindDate = f_eventLogRemindDate;
	}
	
	/**
	 * get the f_eventLogType 
	 * @return the f_eventLogType
	 */
	public Integer getF_eventLogType() {
		return this.f_eventLogType;
	}
	
	/**
	 * set the f_eventLogType 
	 */
	public void setF_eventLogType(Integer f_eventLogType) {
		this.f_eventLogType = f_eventLogType;
	}
	
	/**
	 * get the f_eventLogBelongId 
	 * @return the f_eventLogBelongId
	 */
	public Integer getF_eventLogBelongId() {
		return this.f_eventLogBelongId;
	}
	
	/**
	 * set the f_eventLogBelongId 
	 */
	public void setF_eventLogBelongId(Integer f_eventLogBelongId) {
		this.f_eventLogBelongId = f_eventLogBelongId;
	}
	
	/**
	 * get the f_eventLogRemindSwitch 
	 * @return the f_eventLogRemindSwitch
	 */
	public Integer getF_eventLogRemindSwitch() {
		return this.f_eventLogRemindSwitch;
	}
	
	/**
	 * set the f_eventLogRemindSwitch 
	 */
	public void setF_eventLogRemindSwitch(Integer f_eventLogRemindSwitch) {
		this.f_eventLogRemindSwitch = f_eventLogRemindSwitch;
	}
	
	/**
	 * get the value from Map
	 */
	public void fromMap(Map map) {
	
		setF_eventLogId(NumberUtils.toInteger(StringUtils.toString(map.get("f_eventLogId")), f_eventLogId));
		setF_eventLogName(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("f_eventLogName")), f_eventLogName));
		setF_eventLogDate(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("f_eventLogDate")), f_eventLogDate));
		setF_eventLogDesc(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("f_eventLogDesc")), f_eventLogDesc));
		setF_eventLogRemindDate(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("f_eventLogRemindDate")), f_eventLogRemindDate));
		setF_eventLogType(NumberUtils.toInteger(StringUtils.toString(map.get("f_eventLogType")), f_eventLogType));
		setF_eventLogBelongId(NumberUtils.toInteger(StringUtils.toString(map.get("f_eventLogBelongId")), f_eventLogBelongId));
		setF_eventLogRemindSwitch(NumberUtils.toInteger(StringUtils.toString(map.get("f_eventLogRemindSwitch")), f_eventLogRemindSwitch));
	}
	
	/**
	 * set the value to Map
	 */
	public Map toMap() {
		
		Map map = new HashMap();
			map.put("f_eventLogId",StringUtils.toString(f_eventLogId, eiMetadata.getMeta("f_eventLogId")));	
			map.put("f_eventLogName",StringUtils.toString(f_eventLogName, eiMetadata.getMeta("f_eventLogName")));	
			map.put("f_eventLogDate",StringUtils.toString(f_eventLogDate, eiMetadata.getMeta("f_eventLogDate")));	
			map.put("f_eventLogDesc",StringUtils.toString(f_eventLogDesc, eiMetadata.getMeta("f_eventLogDesc")));	
			map.put("f_eventLogRemindDate",StringUtils.toString(f_eventLogRemindDate, eiMetadata.getMeta("f_eventLogRemindDate")));	
			map.put("f_eventLogType",StringUtils.toString(f_eventLogType, eiMetadata.getMeta("f_eventLogType")));	
			map.put("f_eventLogBelongId",StringUtils.toString(f_eventLogBelongId, eiMetadata.getMeta("f_eventLogBelongId")));	
			map.put("f_eventLogRemindSwitch",StringUtils.toString(f_eventLogRemindSwitch, eiMetadata.getMeta("f_eventLogRemindSwitch")));	
			
		return map;
	
	}
}