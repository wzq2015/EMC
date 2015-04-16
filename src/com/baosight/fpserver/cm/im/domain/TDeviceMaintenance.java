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
 * TDeviceMaintenance 
 *  
 */
public class TDeviceMaintenance extends DaoEPBase {

	private Integer f_deviceMaintenanceId = new Integer(0);		
	private Integer f_deviceId = new Integer(0);		
	private String f_deviceMaintenanceDate = " ";		
	private Integer f_deviceMaintenanceType = new Integer(0);		
	private String f_deviceMaintenanceDesc = " ";		

	/**
	 * initialize the metadata 
	 */
	public void initMetaData() {
		EiColumn eiColumn;
		
	eiColumn = new EiColumn("f_deviceMaintenanceId");
	eiColumn.setPrimaryKey(true);
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("f_deviceId");
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("f_deviceMaintenanceDate");
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("f_deviceMaintenanceType");
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("f_deviceMaintenanceDesc");
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	

	}
	/**
	 * the constructor
	 */
	public TDeviceMaintenance() {
		initMetaData();
	}
	
	/**
	 * get the f_deviceMaintenanceId 
	 * @return the f_deviceMaintenanceId
	 */
	public Integer getF_deviceMaintenanceId() {
		return this.f_deviceMaintenanceId;
	}
	
	/**
	 * set the f_deviceMaintenanceId 
	 */
	public void setF_deviceMaintenanceId(Integer f_deviceMaintenanceId) {
		this.f_deviceMaintenanceId = f_deviceMaintenanceId;
	}
	
	/**
	 * get the f_deviceId 
	 * @return the f_deviceId
	 */
	public Integer getF_deviceId() {
		return this.f_deviceId;
	}
	
	/**
	 * set the f_deviceId 
	 */
	public void setF_deviceId(Integer f_deviceId) {
		this.f_deviceId = f_deviceId;
	}
	
	/**
	 * get the f_deviceMaintenanceDate 
	 * @return the f_deviceMaintenanceDate
	 */
	public String getF_deviceMaintenanceDate() {
		return this.f_deviceMaintenanceDate;
	}
	
	/**
	 * set the f_deviceMaintenanceDate 
	 */
	public void setF_deviceMaintenanceDate(String f_deviceMaintenanceDate) {
		this.f_deviceMaintenanceDate = f_deviceMaintenanceDate;
	}
	
	/**
	 * get the f_deviceMaintenanceType 
	 * @return the f_deviceMaintenanceType
	 */
	public Integer getF_deviceMaintenanceType() {
		return this.f_deviceMaintenanceType;
	}
	
	/**
	 * set the f_deviceMaintenanceType 
	 */
	public void setF_deviceMaintenanceType(Integer f_deviceMaintenanceType) {
		this.f_deviceMaintenanceType = f_deviceMaintenanceType;
	}
	
	/**
	 * get the f_deviceMaintenanceDesc 
	 * @return the f_deviceMaintenanceDesc
	 */
	public String getF_deviceMaintenanceDesc() {
		return this.f_deviceMaintenanceDesc;
	}
	
	/**
	 * set the f_deviceMaintenanceDesc 
	 */
	public void setF_deviceMaintenanceDesc(String f_deviceMaintenanceDesc) {
		this.f_deviceMaintenanceDesc = f_deviceMaintenanceDesc;
	}
	
	/**
	 * get the value from Map
	 */
	public void fromMap(Map map) {
	
		setF_deviceMaintenanceId(NumberUtils.toInteger(StringUtils.toString(map.get("f_deviceMaintenanceId")), f_deviceMaintenanceId));
		setF_deviceId(NumberUtils.toInteger(StringUtils.toString(map.get("f_deviceId")), f_deviceId));
		setF_deviceMaintenanceDate(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("f_deviceMaintenanceDate")), f_deviceMaintenanceDate));
		setF_deviceMaintenanceType(NumberUtils.toInteger(StringUtils.toString(map.get("f_deviceMaintenanceType")), f_deviceMaintenanceType));
		setF_deviceMaintenanceDesc(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("f_deviceMaintenanceDesc")), f_deviceMaintenanceDesc));
	}
	
	/**
	 * set the value to Map
	 */
	public Map toMap() {
		
		Map map = new HashMap();
			map.put("f_deviceMaintenanceId",StringUtils.toString(f_deviceMaintenanceId, eiMetadata.getMeta("f_deviceMaintenanceId")));	
			map.put("f_deviceId",StringUtils.toString(f_deviceId, eiMetadata.getMeta("f_deviceId")));	
			map.put("f_deviceMaintenanceDate",StringUtils.toString(f_deviceMaintenanceDate, eiMetadata.getMeta("f_deviceMaintenanceDate")));	
			map.put("f_deviceMaintenanceType",StringUtils.toString(f_deviceMaintenanceType, eiMetadata.getMeta("f_deviceMaintenanceType")));	
			map.put("f_deviceMaintenanceDesc",StringUtils.toString(f_deviceMaintenanceDesc, eiMetadata.getMeta("f_deviceMaintenanceDesc")));	
			
		return map;
	
	}
}