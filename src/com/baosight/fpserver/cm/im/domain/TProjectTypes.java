  /**
   * Generate time : 2015-04-27 10:39:51
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
 * TProjectTypes 
 *  
 */
public class TProjectTypes extends DaoEPBase {

	private Integer f_projectTypeId = new Integer(0);		
	private String f_projectTypeName = " ";		
	private Integer f_projectTypeStatus = new Integer(0);		

	/**
	 * initialize the metadata 
	 */
	public void initMetaData() {
		EiColumn eiColumn;
		
	eiColumn = new EiColumn("f_projectTypeId");
	eiColumn.setPrimaryKey(true);
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("f_projectTypeName");
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("f_projectTypeStatus");
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	

	}
	/**
	 * the constructor
	 */
	public TProjectTypes() {
		initMetaData();
	}
	
	/**
	 * get the f_projectTypeId 
	 * @return the f_projectTypeId
	 */
	public Integer getF_projectTypeId() {
		return this.f_projectTypeId;
	}
	
	/**
	 * set the f_projectTypeId 
	 */
	public void setF_projectTypeId(Integer f_projectTypeId) {
		this.f_projectTypeId = f_projectTypeId;
	}
	
	/**
	 * get the f_projectTypeName 
	 * @return the f_projectTypeName
	 */
	public String getF_projectTypeName() {
		return this.f_projectTypeName;
	}
	
	/**
	 * set the f_projectTypeName 
	 */
	public void setF_projectTypeName(String f_projectTypeName) {
		this.f_projectTypeName = f_projectTypeName;
	}
	
	/**
	 * get the f_projectTypeStatus 
	 * @return the f_projectTypeStatus
	 */
	public Integer getF_projectTypeStatus() {
		return this.f_projectTypeStatus;
	}
	
	/**
	 * set the f_projectTypeStatus 
	 */
	public void setF_projectTypeStatus(Integer f_projectTypeStatus) {
		this.f_projectTypeStatus = f_projectTypeStatus;
	}
	
	/**
	 * get the value from Map
	 */
	public void fromMap(Map map) {
	
		setF_projectTypeId(NumberUtils.toInteger(StringUtils.toString(map.get("f_projectTypeId")), f_projectTypeId));
		setF_projectTypeName(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("f_projectTypeName")), f_projectTypeName));
		setF_projectTypeStatus(NumberUtils.toInteger(StringUtils.toString(map.get("f_projectTypeStatus")), f_projectTypeStatus));
	}
	
	/**
	 * set the value to Map
	 */
	public Map toMap() {
		
		Map map = new HashMap();
			map.put("f_projectTypeId",StringUtils.toString(f_projectTypeId, eiMetadata.getMeta("f_projectTypeId")));	
			map.put("f_projectTypeName",StringUtils.toString(f_projectTypeName, eiMetadata.getMeta("f_projectTypeName")));	
			map.put("f_projectTypeStatus",StringUtils.toString(f_projectTypeStatus, eiMetadata.getMeta("f_projectTypeStatus")));	
			
		return map;
	
	}
}