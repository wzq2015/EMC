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
 * TArea 
 *  
 */
public class TArea extends DaoEPBase {

	private Integer f_areaId = new Integer(0);		
	private String f_areaName = " ";		
	private String f_areaDesc = " ";		

	/**
	 * initialize the metadata 
	 */
	public void initMetaData() {
		EiColumn eiColumn;
		
	eiColumn = new EiColumn("f_areaId");
	eiColumn.setPrimaryKey(true);
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("f_areaName");
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("f_areaDesc");
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	

	}
	/**
	 * the constructor
	 */
	public TArea() {
		initMetaData();
	}
	
	/**
	 * get the f_areaId 
	 * @return the f_areaId
	 */
	public Integer getF_areaId() {
		return this.f_areaId;
	}
	
	/**
	 * set the f_areaId 
	 */
	public void setF_areaId(Integer f_areaId) {
		this.f_areaId = f_areaId;
	}
	
	/**
	 * get the f_areaName 
	 * @return the f_areaName
	 */
	public String getF_areaName() {
		return this.f_areaName;
	}
	
	/**
	 * set the f_areaName 
	 */
	public void setF_areaName(String f_areaName) {
		this.f_areaName = f_areaName;
	}
	
	/**
	 * get the f_areaDesc 
	 * @return the f_areaDesc
	 */
	public String getF_areaDesc() {
		return this.f_areaDesc;
	}
	
	/**
	 * set the f_areaDesc 
	 */
	public void setF_areaDesc(String f_areaDesc) {
		this.f_areaDesc = f_areaDesc;
	}
	
	/**
	 * get the value from Map
	 */
	public void fromMap(Map map) {
	
		setF_areaId(NumberUtils.toInteger(StringUtils.toString(map.get("f_areaId")), f_areaId));
		setF_areaName(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("f_areaName")), f_areaName));
		setF_areaDesc(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("f_areaDesc")), f_areaDesc));
	}
	
	/**
	 * set the value to Map
	 */
	public Map toMap() {
		
		Map map = new HashMap();
			map.put("f_areaId",StringUtils.toString(f_areaId, eiMetadata.getMeta("f_areaId")));	
			map.put("f_areaName",StringUtils.toString(f_areaName, eiMetadata.getMeta("f_areaName")));	
			map.put("f_areaDesc",StringUtils.toString(f_areaDesc, eiMetadata.getMeta("f_areaDesc")));	
			
		return map;
	
	}
}