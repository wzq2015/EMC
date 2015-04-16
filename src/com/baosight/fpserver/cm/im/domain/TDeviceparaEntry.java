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
 * TDeviceparaEntry 
 *  
 */
public class TDeviceparaEntry extends DaoEPBase {

	private Integer f_deviceparaEntryId = new Integer(0);		
	private Integer f_emcprojectCycleId = new Integer(0);		
	private String f_deviceparaName = " ";		
	private String f_deviceparaEntryValue = " ";		
	private String f_deviceparaEntryDatetime = " ";		

	/**
	 * initialize the metadata 
	 */
	public void initMetaData() {
		EiColumn eiColumn;
		
	eiColumn = new EiColumn("f_deviceparaEntryId");
	eiColumn.setPrimaryKey(true);
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("f_emcprojectCycleId");
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("f_deviceparaName");
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("f_deviceparaEntryValue");
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("f_deviceparaEntryDatetime");
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	

	}
	/**
	 * the constructor
	 */
	public TDeviceparaEntry() {
		initMetaData();
	}
	
	/**
	 * get the f_deviceparaEntryId 
	 * @return the f_deviceparaEntryId
	 */
	public Integer getF_deviceparaEntryId() {
		return this.f_deviceparaEntryId;
	}
	
	/**
	 * set the f_deviceparaEntryId 
	 */
	public void setF_deviceparaEntryId(Integer f_deviceparaEntryId) {
		this.f_deviceparaEntryId = f_deviceparaEntryId;
	}
	
	/**
	 * get the f_emcprojectCycleId 
	 * @return the f_emcprojectCycleId
	 */
	public Integer getF_emcprojectCycleId() {
		return this.f_emcprojectCycleId;
	}
	
	/**
	 * set the f_emcprojectCycleId 
	 */
	public void setF_emcprojectCycleId(Integer f_emcprojectCycleId) {
		this.f_emcprojectCycleId = f_emcprojectCycleId;
	}
	
	/**
	 * get the f_deviceparaName 
	 * @return the f_deviceparaName
	 */
	public String getF_deviceparaName() {
		return this.f_deviceparaName;
	}
	
	/**
	 * set the f_deviceparaName 
	 */
	public void setF_deviceparaName(String f_deviceparaName) {
		this.f_deviceparaName = f_deviceparaName;
	}
	
	/**
	 * get the f_deviceparaEntryValue 
	 * @return the f_deviceparaEntryValue
	 */
	public String getF_deviceparaEntryValue() {
		return this.f_deviceparaEntryValue;
	}
	
	/**
	 * set the f_deviceparaEntryValue 
	 */
	public void setF_deviceparaEntryValue(String f_deviceparaEntryValue) {
		this.f_deviceparaEntryValue = f_deviceparaEntryValue;
	}
	
	/**
	 * get the f_deviceparaEntryDatetime 
	 * @return the f_deviceparaEntryDatetime
	 */
	public String getF_deviceparaEntryDatetime() {
		return this.f_deviceparaEntryDatetime;
	}
	
	/**
	 * set the f_deviceparaEntryDatetime 
	 */
	public void setF_deviceparaEntryDatetime(String f_deviceparaEntryDatetime) {
		this.f_deviceparaEntryDatetime = f_deviceparaEntryDatetime;
	}
	
	/**
	 * get the value from Map
	 */
	public void fromMap(Map map) {
	
		setF_deviceparaEntryId(NumberUtils.toInteger(StringUtils.toString(map.get("f_deviceparaEntryId")), f_deviceparaEntryId));
		setF_emcprojectCycleId(NumberUtils.toInteger(StringUtils.toString(map.get("f_emcprojectCycleId")), f_emcprojectCycleId));
		setF_deviceparaName(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("f_deviceparaName")), f_deviceparaName));
		setF_deviceparaEntryValue(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("f_deviceparaEntryValue")), f_deviceparaEntryValue));
		setF_deviceparaEntryDatetime(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("f_deviceparaEntryDatetime")), f_deviceparaEntryDatetime));
	}
	
	/**
	 * set the value to Map
	 */
	public Map toMap() {
		
		Map map = new HashMap();
			map.put("f_deviceparaEntryId",StringUtils.toString(f_deviceparaEntryId, eiMetadata.getMeta("f_deviceparaEntryId")));	
			map.put("f_emcprojectCycleId",StringUtils.toString(f_emcprojectCycleId, eiMetadata.getMeta("f_emcprojectCycleId")));	
			map.put("f_deviceparaName",StringUtils.toString(f_deviceparaName, eiMetadata.getMeta("f_deviceparaName")));	
			map.put("f_deviceparaEntryValue",StringUtils.toString(f_deviceparaEntryValue, eiMetadata.getMeta("f_deviceparaEntryValue")));	
			map.put("f_deviceparaEntryDatetime",StringUtils.toString(f_deviceparaEntryDatetime, eiMetadata.getMeta("f_deviceparaEntryDatetime")));	
			
		return map;
	
	}
}