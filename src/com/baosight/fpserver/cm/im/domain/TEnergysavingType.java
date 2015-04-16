  /**
   * Generate time : 2013-11-25 9:42:22
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
 * TEnergysavingType 
 *  
 */
public class TEnergysavingType extends DaoEPBase {

	private Integer f_energysavingTypeId = new Integer(0);		
	private Integer f_emcprojectId = new Integer(0);		
	private String f_energysavingTypeName = " ";		
	private String f_energysavingTypeDesc = " ";		
	private String f_energysavingTypeFormula = " ";		
	private Double f_energysavingTypeTargetvalue = new Double(0);		
	private String f_energysavingTypeCalcstep = " ";		

	/**
	 * initialize the metadata 
	 */
	public void initMetaData() {
		EiColumn eiColumn;
		
	eiColumn = new EiColumn("f_energysavingTypeId");
	eiColumn.setPrimaryKey(true);
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("f_emcprojectId");
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
	
	eiColumn = new EiColumn("f_energysavingTypeTargetvalue");
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("f_energysavingTypeCalcstep");
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	

	}
	/**
	 * the constructor
	 */
	public TEnergysavingType() {
		initMetaData();
	}
	
	/**
	 * get the f_energysavingTypeId 
	 * @return the f_energysavingTypeId
	 */
	public Integer getF_energysavingTypeId() {
		return this.f_energysavingTypeId;
	}
	
	/**
	 * set the f_energysavingTypeId 
	 */
	public void setF_energysavingTypeId(Integer f_energysavingTypeId) {
		this.f_energysavingTypeId = f_energysavingTypeId;
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
	 * get the f_energysavingTypeTargetvalue 
	 * @return the f_energysavingTypeTargetvalue
	 */
	public Double getF_energysavingTypeTargetvalue() {
		return this.f_energysavingTypeTargetvalue;
	}
	
	/**
	 * set the f_energysavingTypeTargetvalue 
	 */
	public void setF_energysavingTypeTargetvalue(Double f_energysavingTypeTargetvalue) {
		this.f_energysavingTypeTargetvalue = f_energysavingTypeTargetvalue;
	}
	
	/**
	 * get the f_energysavingTypeCalcstep 
	 * @return the f_energysavingTypeCalcstep
	 */
	public String getF_energysavingTypeCalcstep() {
		return this.f_energysavingTypeCalcstep;
	}
	
	/**
	 * set the f_energysavingTypeCalcstep 
	 */
	public void setF_energysavingTypeCalcstep(String f_energysavingTypeCalcstep) {
		this.f_energysavingTypeCalcstep = f_energysavingTypeCalcstep;
	}
	
	/**
	 * get the value from Map
	 */
	public void fromMap(Map map) {
	
		setF_energysavingTypeId(NumberUtils.toInteger(StringUtils.toString(map.get("f_energysavingTypeId")), f_energysavingTypeId));
		setF_emcprojectId(NumberUtils.toInteger(StringUtils.toString(map.get("f_emcprojectId")), f_emcprojectId));
		setF_energysavingTypeName(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("f_energysavingTypeName")), f_energysavingTypeName));
		setF_energysavingTypeDesc(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("f_energysavingTypeDesc")), f_energysavingTypeDesc));
		setF_energysavingTypeFormula(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("f_energysavingTypeFormula")), f_energysavingTypeFormula));
		setF_energysavingTypeTargetvalue(NumberUtils.toDouble(StringUtils.toString(map.get("f_energysavingTypeTargetvalue")), f_energysavingTypeTargetvalue));
		setF_energysavingTypeCalcstep(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("f_energysavingTypeCalcstep")), f_energysavingTypeCalcstep));
	}
	
	/**
	 * set the value to Map
	 */
	public Map toMap() {
		
		Map map = new HashMap();
			map.put("f_energysavingTypeId",StringUtils.toString(f_energysavingTypeId, eiMetadata.getMeta("f_energysavingTypeId")));	
			map.put("f_emcprojectId",StringUtils.toString(f_emcprojectId, eiMetadata.getMeta("f_emcprojectId")));	
			map.put("f_energysavingTypeName",StringUtils.toString(f_energysavingTypeName, eiMetadata.getMeta("f_energysavingTypeName")));	
			map.put("f_energysavingTypeDesc",StringUtils.toString(f_energysavingTypeDesc, eiMetadata.getMeta("f_energysavingTypeDesc")));	
			map.put("f_energysavingTypeFormula",StringUtils.toString(f_energysavingTypeFormula, eiMetadata.getMeta("f_energysavingTypeFormula")));	
			map.put("f_energysavingTypeTargetvalue",StringUtils.toString(f_energysavingTypeTargetvalue, eiMetadata.getMeta("f_energysavingTypeTargetvalue")));	
			map.put("f_energysavingTypeCalcstep",StringUtils.toString(f_energysavingTypeCalcstep, eiMetadata.getMeta("f_energysavingTypeCalcstep")));	
			
		return map;
	
	}
}