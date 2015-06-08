  /**
   * Generate time : 2015-04-29 15:27:41
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
 * TEnergysavingtypeTemplate 
 *  
 */
public class TEnergysavingtypeTemplate extends DaoEPBase {

	private Integer f_energysavingtypeTemplateId = new Integer(0);		
	private String f_energysavingTypeName = " ";		
	private String f_energysavingTypeDesc = " ";		
	private String f_energysavingTypeFormula = " ";		
	private Integer f_typeTemplateId = new Integer(0);		

	/**
	 * initialize the metadata 
	 */
	public void initMetaData() {
		EiColumn eiColumn;
		
	eiColumn = new EiColumn("f_energysavingtypeTemplateId");
	eiColumn.setPrimaryKey(true);
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("f_energysavingTypeName");
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("f_energysavingTypeDesc");
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("f_energysavingTypeFormula");
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("f_typeTemplateId");
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	

	}
	/**
	 * the constructor
	 */
	public TEnergysavingtypeTemplate() {
		initMetaData();
	}
	
	/**
	 * get the f_energysavingtypeTemplateId 
	 * @return the f_energysavingtypeTemplateId
	 */
	public Integer getF_energysavingtypeTemplateId() {
		return this.f_energysavingtypeTemplateId;
	}
	
	/**
	 * set the f_energysavingtypeTemplateId 
	 */
	public void setF_energysavingtypeTemplateId(Integer f_energysavingtypeTemplateId) {
		this.f_energysavingtypeTemplateId = f_energysavingtypeTemplateId;
	}
	
	/**
	 * get the f_energysavingTypeName 
	 * @return the f_energysavingTypeName
	 */
	public String getF_energysavingTypeName() {
		return this.f_energysavingTypeName;
	}
	
	/**
	 * set the f_energysavingTypeName 
	 */
	public void setF_energysavingTypeName(String f_energysavingTypeName) {
		this.f_energysavingTypeName = f_energysavingTypeName;
	}
	
	/**
	 * get the f_energysavingTypeDesc 
	 * @return the f_energysavingTypeDesc
	 */
	public String getF_energysavingTypeDesc() {
		return this.f_energysavingTypeDesc;
	}
	
	/**
	 * set the f_energysavingTypeDesc 
	 */
	public void setF_energysavingTypeDesc(String f_energysavingTypeDesc) {
		this.f_energysavingTypeDesc = f_energysavingTypeDesc;
	}
	
	/**
	 * get the f_energysavingTypeFormula 
	 * @return the f_energysavingTypeFormula
	 */
	public String getF_energysavingTypeFormula() {
		return this.f_energysavingTypeFormula;
	}
	
	/**
	 * set the f_energysavingTypeFormula 
	 */
	public void setF_energysavingTypeFormula(String f_energysavingTypeFormula) {
		this.f_energysavingTypeFormula = f_energysavingTypeFormula;
	}
	
	/**
	 * get the f_typeTemplateId 
	 * @return the f_typeTemplateId
	 */
	public Integer getF_typeTemplateId() {
		return this.f_typeTemplateId;
	}
	
	/**
	 * set the f_typeTemplateId 
	 */
	public void setF_typeTemplateId(Integer f_typeTemplateId) {
		this.f_typeTemplateId = f_typeTemplateId;
	}
	
	/**
	 * get the value from Map
	 */
	public void fromMap(Map map) {
	
		setF_energysavingtypeTemplateId(NumberUtils.toInteger(StringUtils.toString(map.get("f_energysavingtypeTemplateId")), f_energysavingtypeTemplateId));
		setF_energysavingTypeName(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("f_energysavingTypeName")), f_energysavingTypeName));
		setF_energysavingTypeDesc(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("f_energysavingTypeDesc")), f_energysavingTypeDesc));
		setF_energysavingTypeFormula(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("f_energysavingTypeFormula")), f_energysavingTypeFormula));
		setF_typeTemplateId(NumberUtils.toInteger(StringUtils.toString(map.get("f_typeTemplateId")), f_typeTemplateId));
	}
	
	/**
	 * set the value to Map
	 */
	public Map toMap() {
		
		Map map = new HashMap();
			map.put("f_energysavingtypeTemplateId",StringUtils.toString(f_energysavingtypeTemplateId, eiMetadata.getMeta("f_energysavingtypeTemplateId")));	
			map.put("f_energysavingTypeName",StringUtils.toString(f_energysavingTypeName, eiMetadata.getMeta("f_energysavingTypeName")));	
			map.put("f_energysavingTypeDesc",StringUtils.toString(f_energysavingTypeDesc, eiMetadata.getMeta("f_energysavingTypeDesc")));	
			map.put("f_energysavingTypeFormula",StringUtils.toString(f_energysavingTypeFormula, eiMetadata.getMeta("f_energysavingTypeFormula")));	
			map.put("f_typeTemplateId",StringUtils.toString(f_typeTemplateId, eiMetadata.getMeta("f_typeTemplateId")));	
			
		return map;
	
	}
}