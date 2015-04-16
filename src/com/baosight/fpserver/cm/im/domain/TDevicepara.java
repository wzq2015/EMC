  /**
   * Generate time : 2013-08-30 13:39:40
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
 * TDevicepara 
 *  
 */
public class TDevicepara extends DaoEPBase {

	private Integer f_deviceparaId = new Integer(0);		
	private Integer f_deviceId = new Integer(0);		
	private String f_deviceparaName = " ";		
	private String f_deviceparaDesc = " ";		
	private String f_deviceparaTagname = " ";		

	/**
	 * initialize the metadata 
	 */
	public void initMetaData() {
		EiColumn eiColumn;
		
	eiColumn = new EiColumn("f_deviceparaId");
	eiColumn.setPrimaryKey(true);
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("f_deviceId");
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("f_deviceparaName");
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("f_deviceparaDesc");
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("f_deviceparaTagname");
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	

	}
	/**
	 * the constructor
	 */
	public TDevicepara() {
		initMetaData();
	}
	
	/**
	 * get the f_deviceparaId 
	 * @return the f_deviceparaId
	 */
	public Integer getF_deviceparaId() {
		return this.f_deviceparaId;
	}
	
	/**
	 * set the f_deviceparaId 
	 */
	public void setF_deviceparaId(Integer f_deviceparaId) {
		this.f_deviceparaId = f_deviceparaId;
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
	 * get the f_deviceparaDesc 
	 * @return the f_deviceparaDesc
	 */
	public String getF_deviceparaDesc() {
		return this.f_deviceparaDesc;
	}
	
	/**
	 * set the f_deviceparaDesc 
	 */
	public void setF_deviceparaDesc(String f_deviceparaDesc) {
		this.f_deviceparaDesc = f_deviceparaDesc;
	}
	
	/**
	 * get the f_deviceparaTagname 
	 * @return the f_deviceparaTagname
	 */
	public String getF_deviceparaTagname() {
		return this.f_deviceparaTagname;
	}
	
	/**
	 * set the f_deviceparaTagname 
	 */
	public void setF_deviceparaTagname(String f_deviceparaTagname) {
		this.f_deviceparaTagname = f_deviceparaTagname;
	}
	
	/**
	 * get the value from Map
	 */
	public void fromMap(Map map) {
	
		setF_deviceparaId(NumberUtils.toInteger(StringUtils.toString(map.get("f_deviceparaId")), f_deviceparaId));
		setF_deviceId(NumberUtils.toInteger(StringUtils.toString(map.get("f_deviceId")), f_deviceId));
		setF_deviceparaName(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("f_deviceparaName")), f_deviceparaName));
		setF_deviceparaDesc(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("f_deviceparaDesc")), f_deviceparaDesc));
		setF_deviceparaTagname(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("f_deviceparaTagname")), f_deviceparaTagname));
	}
	
	/**
	 * set the value to Map
	 */
	public Map toMap() {
		
		Map map = new HashMap();
			map.put("f_deviceparaId",StringUtils.toString(f_deviceparaId, eiMetadata.getMeta("f_deviceparaId")));	
			map.put("f_deviceId",StringUtils.toString(f_deviceId, eiMetadata.getMeta("f_deviceId")));	
			map.put("f_deviceparaName",StringUtils.toString(f_deviceparaName, eiMetadata.getMeta("f_deviceparaName")));	
			map.put("f_deviceparaDesc",StringUtils.toString(f_deviceparaDesc, eiMetadata.getMeta("f_deviceparaDesc")));	
			map.put("f_deviceparaTagname",StringUtils.toString(f_deviceparaTagname, eiMetadata.getMeta("f_deviceparaTagname")));	
			
		return map;
	
	}
}