  /**
   * Generate time : 2014-05-05 10:12:52
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
 * TEmcprojectAuth 
 *  
 */
public class TEmcprojectAuth extends DaoEPBase {

	private Integer f_emcprojectAuthId = new Integer(0);		
	private String f_username = " ";		
	private Integer f_emcprojectId = new Integer(0);		

	/**
	 * initialize the metadata 
	 */
	public void initMetaData() {
		EiColumn eiColumn;
		
	eiColumn = new EiColumn("f_emcprojectAuthId");
	eiColumn.setPrimaryKey(true);
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("f_username");
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("f_emcprojectId");
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	

	}
	/**
	 * the constructor
	 */
	public TEmcprojectAuth() {
		initMetaData();
	}
	
	/**
	 * get the f_emcprojectAuthId 
	 * @return the f_emcprojectAuthId
	 */
	public Integer getF_emcprojectAuthId() {
		return this.f_emcprojectAuthId;
	}
	
	/**
	 * set the f_emcprojectAuthId 
	 */
	public void setF_emcprojectAuthId(Integer f_emcprojectAuthId) {
		this.f_emcprojectAuthId = f_emcprojectAuthId;
	}
	
	/**
	 * get the f_username 
	 * @return the f_username
	 */
	public String getF_username() {
		return this.f_username;
	}
	
	/**
	 * set the f_username 
	 */
	public void setF_username(String f_username) {
		this.f_username = f_username;
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
	 * get the value from Map
	 */
	public void fromMap(Map map) {
	
		setF_emcprojectAuthId(NumberUtils.toInteger(StringUtils.toString(map.get("f_emcprojectAuthId")), f_emcprojectAuthId));
		setF_username(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("f_username")), f_username));
		setF_emcprojectId(NumberUtils.toInteger(StringUtils.toString(map.get("f_emcprojectId")), f_emcprojectId));
	}
	
	/**
	 * set the value to Map
	 */
	public Map toMap() {
		
		Map map = new HashMap();
			map.put("f_emcprojectAuthId",StringUtils.toString(f_emcprojectAuthId, eiMetadata.getMeta("f_emcprojectAuthId")));	
			map.put("f_username",StringUtils.toString(f_username, eiMetadata.getMeta("f_username")));	
			map.put("f_emcprojectId",StringUtils.toString(f_emcprojectId, eiMetadata.getMeta("f_emcprojectId")));	
			
		return map;
	
	}
}