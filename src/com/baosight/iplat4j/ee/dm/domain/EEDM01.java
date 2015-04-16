  /**
   * Generate time : 2008-07-14 8:50:09
   * Version : 1.0.1.V20070717
   */
package com.baosight.iplat4j.ee.dm.domain;

import java.util.HashMap;
import java.util.Map;

import com.baosight.iplat4j.common.ee.domain.TEEDM01;
import com.baosight.iplat4j.core.ei.EiColumn;
import com.baosight.iplat4j.util.StringUtils;
/**
 * TEEDM01 
 * table comment : 公司信息表 
 */
public class EEDM01 extends TEEDM01 {

	private String continentCode = " ";		/* 洲代号*/
   
	/**
	 * initialize the metadata 
	 */
	public void initMetaData() {
	
		EiColumn eiColumn;

		eiColumn = new EiColumn("continentCode");
		eiColumn.setFieldLength(255);
		eiColumn.setDescName("洲代号");
		eiMetadata.addMeta(eiColumn);

		super.initMetaData();

	}
	
	
	/**
	 * get the value from Map
	 */
	public void fromMap(Map map) {
	
		super.fromMap(map);
		
		setContinentCode(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("continentCode")), continentCode));
	}
	
	/**
	 * set the value to Map
	 */
	public Map toMap() {
		
		Map map = super.toMap();

		map.put("continentCode",StringUtils.toString(continentCode, eiMetadata.getMeta("continentCode")));
			
		return map;
	
	}
	public String getContinentCode() {
		return continentCode;
	}
	public void setContinentCode(String continentCode) {
		this.continentCode = continentCode;
	}
}