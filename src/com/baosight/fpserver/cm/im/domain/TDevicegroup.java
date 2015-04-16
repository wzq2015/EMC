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
 * TDevicegroup 
 *  
 */
public class TDevicegroup extends DaoEPBase {

	private Integer f_devicegroupId = new Integer(0);		
	private Integer f_emcprojectId = new Integer(0);		
	private Integer f_parentDevicegroupId = new Integer(0);		
	private String f_devicegroupName = " ";		
	private String f_devicegroupDesc = " ";		

	/**
	 * initialize the metadata 
	 */
	public void initMetaData() {
		EiColumn eiColumn;
		
	eiColumn = new EiColumn("f_devicegroupId");
	eiColumn.setPrimaryKey(true);
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("f_emcprojectId");
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("f_parentDevicegroupId");
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("f_devicegroupName");
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("f_devicegroupDesc");
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	

	}
	/**
	 * the constructor
	 */
	public TDevicegroup() {
		initMetaData();
	}
	
	/**
	 * get the f_devicegroupId 
	 * @return the f_devicegroupId
	 */
	public Integer getF_devicegroupId() {
		return this.f_devicegroupId;
	}
	
	/**
	 * set the f_devicegroupId 
	 */
	public void setF_devicegroupId(Integer f_devicegroupId) {
		this.f_devicegroupId = f_devicegroupId;
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
	 * get the f_parentDevicegroupId 
	 * @return the f_parentDevicegroupId
	 */
	public Integer getF_parentDevicegroupId() {
		return this.f_parentDevicegroupId;
	}
	
	/**
	 * set the f_parentDevicegroupId 
	 */
	public void setF_parentDevicegroupId(Integer f_parentDevicegroupId) {
		this.f_parentDevicegroupId = f_parentDevicegroupId;
	}
	
	/**
	 * get the f_devicegroupName 
	 * @return the f_devicegroupName
	 */
	public String getF_devicegroupName() {
		return this.f_devicegroupName;
	}
	
	/**
	 * set the f_devicegroupName 
	 */
	public void setF_devicegroupName(String f_devicegroupName) {
		this.f_devicegroupName = f_devicegroupName;
	}
	
	/**
	 * get the f_devicegroupDesc 
	 * @return the f_devicegroupDesc
	 */
	public String getF_devicegroupDesc() {
		return this.f_devicegroupDesc;
	}
	
	/**
	 * set the f_devicegroupDesc 
	 */
	public void setF_devicegroupDesc(String f_devicegroupDesc) {
		this.f_devicegroupDesc = f_devicegroupDesc;
	}
	
	/**
	 * get the value from Map
	 */
	public void fromMap(Map map) {
	
		setF_devicegroupId(NumberUtils.toInteger(StringUtils.toString(map.get("f_devicegroupId")), f_devicegroupId));
		setF_emcprojectId(NumberUtils.toInteger(StringUtils.toString(map.get("f_emcprojectId")), f_emcprojectId));
		setF_parentDevicegroupId(NumberUtils.toInteger(StringUtils.toString(map.get("f_parentDevicegroupId")), f_parentDevicegroupId));
		setF_devicegroupName(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("f_devicegroupName")), f_devicegroupName));
		setF_devicegroupDesc(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("f_devicegroupDesc")), f_devicegroupDesc));
	}
	
	/**
	 * set the value to Map
	 */
	public Map toMap() {
		
		Map map = new HashMap();
			map.put("f_devicegroupId",StringUtils.toString(f_devicegroupId, eiMetadata.getMeta("f_devicegroupId")));	
			map.put("f_emcprojectId",StringUtils.toString(f_emcprojectId, eiMetadata.getMeta("f_emcprojectId")));	
			map.put("f_parentDevicegroupId",StringUtils.toString(f_parentDevicegroupId, eiMetadata.getMeta("f_parentDevicegroupId")));	
			map.put("f_devicegroupName",StringUtils.toString(f_devicegroupName, eiMetadata.getMeta("f_devicegroupName")));	
			map.put("f_devicegroupDesc",StringUtils.toString(f_devicegroupDesc, eiMetadata.getMeta("f_devicegroupDesc")));	
			
		return map;
	
	}
}