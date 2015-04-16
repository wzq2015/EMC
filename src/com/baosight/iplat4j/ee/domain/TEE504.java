  /**
   * Generate time : 2007-05-28 11:17:08
   * Version : 1.0.1.V20070516
   */
package com.baosight.iplat4j.ee.domain;

import com.baosight.iplat4j.util.NumberUtils;
import com.baosight.iplat4j.core.ei.EiColumn;
import com.baosight.iplat4j.ep.DaoEPBase;
import java.util.HashMap;
import java.util.Map;
import com.baosight.iplat4j.util.StringUtils;
/**
 * TEE504 
 *  
 */
public class TEE504 extends DaoEPBase {

	private Long typeLong = new Long(0);	
	private Integer typeInteger = new Integer(0);		
	private Float typeFloat = new Float(0);		
	private Double typeDouble = new Double(0);		
	private String typeString = " ";		

	/**
	 * initialize the metadata 
	 */
	public void initMetaData() {
		EiColumn eiColumn;
		
	eiColumn = new EiColumn("typeLong");
	eiColumn.setType("N");
	eiColumn.setScaleLength(0);
	eiColumn.setFieldLength(10);
	eiColumn.setNullable(false);
	eiColumn.setPrimaryKey( true );	
	eiColumn.setDescName("10位Long类型");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("typeInteger");
	eiColumn.setType("N");
	eiColumn.setScaleLength(0);
	eiColumn.setFieldLength(8);
	eiColumn.setDescName("8位Integer类型");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("typeFloat");
	eiColumn.setType("N");
	eiColumn.setScaleLength(2);
	eiColumn.setFieldLength(8);
	eiColumn.setDescName("8.2位Float类型");
	eiMetadata.addMeta(eiColumn);

	eiColumn = new EiColumn("typeDouble");
	eiColumn.setType("N");
	eiColumn.setScaleLength(4);
	eiColumn.setFieldLength(16);
	eiColumn.setDescName("16.4位Double类型");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("typeString");
	eiColumn.setFieldLength(20);	
	eiColumn.setDescName("20位String类型");
	eiColumn.setType("C");
	eiMetadata.addMeta(eiColumn);
	
	
	}
	/**
	 * the constructor
	 */
	public TEE504() {
		initMetaData();
	}
	
	/**
	 * get the typeLong 
	 * @return the typeLong
	 */
	public Long getTypeLong() {
		return this.typeLong;
	}
	
	/**
	 * set the typeLong 
	 */
	public void setTypeLong(Long typeLong) {
		this.typeLong = typeLong;
	}
	
	/**
	 * get the typeInteger 
	 * @return the typeInteger
	 */
	public Integer getTypeInteger() {
		return this.typeInteger;
	}
	
	/**
	 * set the typeInteger 
	 */
	public void setTypeInteger(Integer typeInteger) {
		this.typeInteger = typeInteger;
	}
	
	/**
	 * get the typeFloat 
	 * @return the typeFloat
	 */
	public Float getTypeFloat() {
		return this.typeFloat;
	}
	
	/**
	 * set the typeFloat 
	 */
	public void setTypeFloat(Float typeFloat) {
		this.typeFloat = typeFloat;
	}
	
	/**
	 * get the typeDouble 
	 * @return the typeDouble
	 */
	public Double getTypeDouble() {
		return this.typeDouble;
	}
	
	/**
	 * set the typeDouble 
	 */
	public void setTypeDouble(Double typeDouble) {
		this.typeDouble = typeDouble;
	}
	
	/**
	 * get the typeString 
	 * @return the typeString
	 */
	public String getTypeString() {
		return this.typeString;
	}
	
	/**
	 * set the typeString 
	 */
	public void setTypeString(String typeString) {
		this.typeString = typeString;
	}
	
	/**
	 * get the value from Map
	 */
	public void fromMap(Map map) {
	
		setTypeLong(NumberUtils.toLong(((String)map.get("typeLong")), typeLong));
		setTypeInteger(NumberUtils.toInteger(((String)map.get("typeInteger")), typeInteger));
		setTypeFloat(NumberUtils.toFloat(((String)map.get("typeFloat")), typeFloat));
		setTypeDouble(NumberUtils.toDouble(((String)map.get("typeDouble")), typeDouble));
		setTypeString(StringUtils.defaultIfEmpty(((String)map.get("typeString")), typeString));
	}
	
	/**
	 * set the value to Map
	 */
	public Map toMap() {
		
		Map map = new HashMap();
			map.put("typeLong",StringUtils.toString(typeLong, eiMetadata.getMeta("typeLong").getFieldLength(), eiMetadata.getMeta("typeLong").getScaleLength()));	
			map.put("typeInteger",StringUtils.toString(typeInteger, eiMetadata.getMeta("typeInteger").getFieldLength(), eiMetadata.getMeta("typeInteger").getScaleLength()));	
			map.put("typeFloat",StringUtils.toString(typeFloat, eiMetadata.getMeta("typeFloat").getFieldLength(), eiMetadata.getMeta("typeFloat").getScaleLength()));	
			map.put("typeDouble",StringUtils.toString(typeDouble, eiMetadata.getMeta("typeDouble").getFieldLength(), eiMetadata.getMeta("typeDouble").getScaleLength()));	
			map.put("typeString",StringUtils.toString(typeString, eiMetadata.getMeta("typeString").getFieldLength(), eiMetadata.getMeta("typeString").getScaleLength()));	
			
		return map;
	
	}
}