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
 * Teedm03 
 * table comment : 国家信息表 
 */
public class TEEDM03 extends DaoEPBase {

	private String countryCode = " ";		/* 国家代号*/
	private String countryName = " ";		/* 国家名称*/
	private String continentCode = " ";		/* 洲代号*/

	/**
	 * initialize the metadata 
	 */
	public void initMetaData() {
		EiColumn eiColumn;
		
	eiColumn = new EiColumn("countryCode");
	eiColumn.setPrimaryKey(true);
	eiColumn.setFieldLength(255);	
	eiColumn.setDescName("国家代号");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("countryName");
	eiColumn.setFieldLength(255);	
	eiColumn.setDescName("国家名称");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("continentCode");
	eiColumn.setFieldLength(255);	
	eiColumn.setDescName("洲代号");
	eiMetadata.addMeta(eiColumn);
	

	}
	/**
	 * the constructor
	 */
	public TEEDM03() {
		initMetaData();
	}
	
	/**
	 * get the countryCode - 国家代号
	 * @return the countryCode
	 */
	public String getCountryCode() {
		return this.countryCode;
	}
	
	/**
	 * set the countryCode - 国家代号
	 */
	public void setCountryCode(String countryCode) {
		this.countryCode = countryCode;
	}
	
	/**
	 * get the countryName - 国家名称
	 * @return the countryName
	 */
	public String getCountryName() {
		return this.countryName;
	}
	
	/**
	 * set the countryName - 国家名称
	 */
	public void setCountryName(String countryName) {
		this.countryName = countryName;
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
	 * get the value from Map
	 */
	public void fromMap(Map map) {
	
		setCountryCode(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("countryCode")), countryCode));
		setCountryName(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("countryName")), countryName));
		setContinentCode(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("continentCode")), continentCode));
	}
	
	/**
	 * set the value to Map
	 */
	public Map toMap() {
		
		Map map = new HashMap();
			map.put("countryCode",StringUtils.toString(countryCode, eiMetadata.getMeta("countryCode")));	
			map.put("countryName",StringUtils.toString(countryName, eiMetadata.getMeta("countryName")));	
			map.put("continentCode",StringUtils.toString(continentCode, eiMetadata.getMeta("continentCode")));	
			
		return map;
	
	}
}