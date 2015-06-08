  /**
   * Generate time : 2015-06-05 11:19:16
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
 * TEnergyConsumption 
 *  
 */
public class TEnergyConsumption extends DaoEPBase {

	private Integer f_energyConsumptionId = new Integer(0);		
	private String f_energyConsumptionName = " ";		
	private String f_energyConsumptionDesc = " ";		
	private String f_energyConsumptionFormula = " ";		
	private Double f_energyConsumptionTargetvalue = new Double(0);		
	private Integer f_emcprojectId = new Integer(0);		

	/**
	 * initialize the metadata 
	 */
	public void initMetaData() {
		EiColumn eiColumn;
		
	eiColumn = new EiColumn("f_energyConsumptionId");
	eiColumn.setPrimaryKey(true);
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("f_energyConsumptionName");
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("f_energyConsumptionDesc");
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("f_energyConsumptionFormula");
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("f_energyConsumptionTargetvalue");
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("f_emcprojectId");
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	

	}
	/**
	 * the constructor
	 */
	public TEnergyConsumption() {
		initMetaData();
	}
	
	/**
	 * get the f_energyConsumptionId 
	 * @return the f_energyConsumptionId
	 */
	public Integer getF_energyConsumptionId() {
		return this.f_energyConsumptionId;
	}
	
	/**
	 * set the f_energyConsumptionId 
	 */
	public void setF_energyConsumptionId(Integer f_energyConsumptionId) {
		this.f_energyConsumptionId = f_energyConsumptionId;
	}
	
	/**
	 * get the f_energyConsumptionName 
	 * @return the f_energyConsumptionName
	 */
	public String getF_energyConsumptionName() {
		return this.f_energyConsumptionName;
	}
	
	/**
	 * set the f_energyConsumptionName 
	 */
	public void setF_energyConsumptionName(String f_energyConsumptionName) {
		this.f_energyConsumptionName = f_energyConsumptionName;
	}
	
	/**
	 * get the f_energyConsumptionDesc 
	 * @return the f_energyConsumptionDesc
	 */
	public String getF_energyConsumptionDesc() {
		return this.f_energyConsumptionDesc;
	}
	
	/**
	 * set the f_energyConsumptionDesc 
	 */
	public void setF_energyConsumptionDesc(String f_energyConsumptionDesc) {
		this.f_energyConsumptionDesc = f_energyConsumptionDesc;
	}
	
	/**
	 * get the f_energyConsumptionFormula 
	 * @return the f_energyConsumptionFormula
	 */
	public String getF_energyConsumptionFormula() {
		return this.f_energyConsumptionFormula;
	}
	
	/**
	 * set the f_energyConsumptionFormula 
	 */
	public void setF_energyConsumptionFormula(String f_energyConsumptionFormula) {
		this.f_energyConsumptionFormula = f_energyConsumptionFormula;
	}
	
	/**
	 * get the f_energyConsumptionTargetvalue 
	 * @return the f_energyConsumptionTargetvalue
	 */
	public Double getF_energyConsumptionTargetvalue() {
		return this.f_energyConsumptionTargetvalue;
	}
	
	/**
	 * set the f_energyConsumptionTargetvalue 
	 */
	public void setF_energyConsumptionTargetvalue(Double f_energyConsumptionTargetvalue) {
		this.f_energyConsumptionTargetvalue = f_energyConsumptionTargetvalue;
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
	
		setF_energyConsumptionId(NumberUtils.toInteger(StringUtils.toString(map.get("f_energyConsumptionId")), f_energyConsumptionId));
		setF_energyConsumptionName(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("f_energyConsumptionName")), f_energyConsumptionName));
		setF_energyConsumptionDesc(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("f_energyConsumptionDesc")), f_energyConsumptionDesc));
		setF_energyConsumptionFormula(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("f_energyConsumptionFormula")), f_energyConsumptionFormula));
		setF_energyConsumptionTargetvalue(NumberUtils.toDouble(StringUtils.toString(map.get("f_energyConsumptionTargetvalue")), f_energyConsumptionTargetvalue));
		setF_emcprojectId(NumberUtils.toInteger(StringUtils.toString(map.get("f_emcprojectId")), f_emcprojectId));
	}
	
	/**
	 * set the value to Map
	 */
	public Map toMap() {
		
		Map map = new HashMap();
			map.put("f_energyConsumptionId",StringUtils.toString(f_energyConsumptionId, eiMetadata.getMeta("f_energyConsumptionId")));	
			map.put("f_energyConsumptionName",StringUtils.toString(f_energyConsumptionName, eiMetadata.getMeta("f_energyConsumptionName")));	
			map.put("f_energyConsumptionDesc",StringUtils.toString(f_energyConsumptionDesc, eiMetadata.getMeta("f_energyConsumptionDesc")));	
			map.put("f_energyConsumptionFormula",StringUtils.toString(f_energyConsumptionFormula, eiMetadata.getMeta("f_energyConsumptionFormula")));	
			map.put("f_energyConsumptionTargetvalue",StringUtils.toString(f_energyConsumptionTargetvalue, eiMetadata.getMeta("f_energyConsumptionTargetvalue")));	
			map.put("f_emcprojectId",StringUtils.toString(f_emcprojectId, eiMetadata.getMeta("f_emcprojectId")));	
			
		return map;
	
	}
}