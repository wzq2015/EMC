  /**
   * Generate time : 2008-07-14 8:50:09
   * Version : 1.0.1.V20070717
   */
package com.baosight.iplat4j.common.ee.domain;

import com.baosight.iplat4j.core.ei.EiColumn;
import com.baosight.iplat4j.ep.DaoEPBase;
import java.util.HashMap;
import java.util.Map;
import com.baosight.iplat4j.util.StringUtils;
/**
 * Teedm02 
 * table comment : 大洲信息表 
 */
public class TEEDM02 extends DaoEPBase {

	private String continentCode = " ";		/* 洲代号*/
	private String continentName = " ";		/* 洲名称*/

	/**
	 * initialize the metadata 
	 */
	public void initMetaData() {
		EiColumn eiColumn;
		
	eiColumn = new EiColumn("continentCode");
	eiColumn.setPrimaryKey(true);
	eiColumn.setFieldLength(255);	
	eiColumn.setDescName("洲代号");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("continentName");
	eiColumn.setFieldLength(255);	
	eiColumn.setDescName("洲名称");
	eiMetadata.addMeta(eiColumn);
	

	}
	/**
	 * the constructor
	 */
	public TEEDM02() {
		initMetaData();
	}
	
	/**
	 * get the continentCode - 洲代号
	 * @return the continentCode
	 */
	public String getContinentCode() {
		return this.continentCode;
	}
	
	/**
	 * set the continentCode - 洲代号
	 */
	public void setContinentCode(String continentCode) {
		this.continentCode = continentCode;
	}
	
	/**
	 * get the continentName - 洲名称
	 * @return the continentName
	 */
	public String getContinentName() {
		return this.continentName;
	}
	
	/**
	 * set the continentName - 洲名称
	 */
	public void setContinentName(String continentName) {
		this.continentName = continentName;
	}
	
	/**
	 * get the value from Map
	 */
	public void fromMap(Map map) {
	
		setContinentCode(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("continentCode")), continentCode));
		setContinentName(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("continentName")), continentName));
	}
	
	/**
	 * set the value to Map
	 */
	public Map toMap() {
		
		Map map = new HashMap();
			map.put("continentCode",StringUtils.toString(continentCode, eiMetadata.getMeta("continentCode")));	
			map.put("continentName",StringUtils.toString(continentName, eiMetadata.getMeta("continentName")));	
			
		return map;
	
	}
}