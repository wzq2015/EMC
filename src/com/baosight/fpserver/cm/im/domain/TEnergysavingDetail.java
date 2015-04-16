  /**
   * Generate time : 2013-12-06 10:29:13
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
 * TEnergysavingDetail 
 *  
 */
public class TEnergysavingDetail extends DaoEPBase {

	private Integer f_energysavingDetailId = new Integer(0);		
	private Integer f_energysavingTypeId = new Integer(0);		
	private Integer f_emcprojectCycleIndex = new Integer(0);		
	private String f_energysavingDetailAcqcalcstep = " ";		
	private Double f_energysavingDetailAcqvalue = new Double(0);		
	private String f_energysavingDetailInputcalcstep = " ";		
	private Double f_energysavingDetailInputvalue = new Double(0);		

	/**
	 * initialize the metadata 
	 */
	public void initMetaData() {
		EiColumn eiColumn;
		
	eiColumn = new EiColumn("f_energysavingDetailId");
	eiColumn.setPrimaryKey(true);
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("f_energysavingTypeId");
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("f_emcprojectCycleIndex");
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("f_energysavingDetailAcqcalcstep");
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("f_energysavingDetailAcqvalue");
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("f_energysavingDetailInputcalcstep");
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("f_energysavingDetailInputvalue");
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	

	}
	/**
	 * the constructor
	 */
	public TEnergysavingDetail() {
		initMetaData();
	}
	
	/**
	 * get the f_energysavingDetailId 
	 * @return the f_energysavingDetailId
	 */
	public Integer getF_energysavingDetailId() {
		return this.f_energysavingDetailId;
	}
	
	/**
	 * set the f_energysavingDetailId 
	 */
	public void setF_energysavingDetailId(Integer f_energysavingDetailId) {
		this.f_energysavingDetailId = f_energysavingDetailId;
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
	 * get the f_emcprojectCycleIndex 
	 * @return the f_emcprojectCycleIndex
	 */
	public Integer getF_emcprojectCycleIndex() {
		return this.f_emcprojectCycleIndex;
	}
	
	/**
	 * set the f_emcprojectCycleIndex 
	 */
	public void setF_emcprojectCycleIndex(Integer f_emcprojectCycleIndex) {
		this.f_emcprojectCycleIndex = f_emcprojectCycleIndex;
	}
	
	/**
	 * get the f_energysavingDetailAcqcalcstep 
	 * @return the f_energysavingDetailAcqcalcstep
	 */
	public String getF_energysavingDetailAcqcalcstep() {
		return this.f_energysavingDetailAcqcalcstep;
	}
	
	/**
	 * set the f_energysavingDetailAcqcalcstep 
	 */
	public void setF_energysavingDetailAcqcalcstep(String f_energysavingDetailAcqcalcstep) {
		this.f_energysavingDetailAcqcalcstep = f_energysavingDetailAcqcalcstep;
	}
	
	/**
	 * get the f_energysavingDetailAcqvalue 
	 * @return the f_energysavingDetailAcqvalue
	 */
	public Double getF_energysavingDetailAcqvalue() {
		return this.f_energysavingDetailAcqvalue;
	}
	
	/**
	 * set the f_energysavingDetailAcqvalue 
	 */
	public void setF_energysavingDetailAcqvalue(Double f_energysavingDetailAcqvalue) {
		this.f_energysavingDetailAcqvalue = f_energysavingDetailAcqvalue;
	}
	
	/**
	 * get the f_energysavingDetailInputcalcstep 
	 * @return the f_energysavingDetailInputcalcstep
	 */
	public String getF_energysavingDetailInputcalcstep() {
		return this.f_energysavingDetailInputcalcstep;
	}
	
	/**
	 * set the f_energysavingDetailInputcalcstep 
	 */
	public void setF_energysavingDetailInputcalcstep(String f_energysavingDetailInputcalcstep) {
		this.f_energysavingDetailInputcalcstep = f_energysavingDetailInputcalcstep;
	}
	
	/**
	 * get the f_energysavingDetailInputvalue 
	 * @return the f_energysavingDetailInputvalue
	 */
	public Double getF_energysavingDetailInputvalue() {
		return this.f_energysavingDetailInputvalue;
	}
	
	/**
	 * set the f_energysavingDetailInputvalue 
	 */
	public void setF_energysavingDetailInputvalue(Double f_energysavingDetailInputvalue) {
		this.f_energysavingDetailInputvalue = f_energysavingDetailInputvalue;
	}
	
	/**
	 * get the value from Map
	 */
	public void fromMap(Map map) {
	
		setF_energysavingDetailId(NumberUtils.toInteger(StringUtils.toString(map.get("f_energysavingDetailId")), f_energysavingDetailId));
		setF_energysavingTypeId(NumberUtils.toInteger(StringUtils.toString(map.get("f_energysavingTypeId")), f_energysavingTypeId));
		setF_emcprojectCycleIndex(NumberUtils.toInteger(StringUtils.toString(map.get("f_emcprojectCycleIndex")), f_emcprojectCycleIndex));
		setF_energysavingDetailAcqcalcstep(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("f_energysavingDetailAcqcalcstep")), f_energysavingDetailAcqcalcstep));
		setF_energysavingDetailAcqvalue(NumberUtils.toDouble(StringUtils.toString(map.get("f_energysavingDetailAcqvalue")), f_energysavingDetailAcqvalue));
		setF_energysavingDetailInputcalcstep(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("f_energysavingDetailInputcalcstep")), f_energysavingDetailInputcalcstep));
		setF_energysavingDetailInputvalue(NumberUtils.toDouble(StringUtils.toString(map.get("f_energysavingDetailInputvalue")), f_energysavingDetailInputvalue));
	}
	
	/**
	 * set the value to Map
	 */
	public Map toMap() {
		
		Map map = new HashMap();
			map.put("f_energysavingDetailId",StringUtils.toString(f_energysavingDetailId, eiMetadata.getMeta("f_energysavingDetailId")));	
			map.put("f_energysavingTypeId",StringUtils.toString(f_energysavingTypeId, eiMetadata.getMeta("f_energysavingTypeId")));	
			map.put("f_emcprojectCycleIndex",StringUtils.toString(f_emcprojectCycleIndex, eiMetadata.getMeta("f_emcprojectCycleIndex")));	
			map.put("f_energysavingDetailAcqcalcstep",StringUtils.toString(f_energysavingDetailAcqcalcstep, eiMetadata.getMeta("f_energysavingDetailAcqcalcstep")));	
			map.put("f_energysavingDetailAcqvalue",StringUtils.toString(f_energysavingDetailAcqvalue, eiMetadata.getMeta("f_energysavingDetailAcqvalue")));	
			map.put("f_energysavingDetailInputcalcstep",StringUtils.toString(f_energysavingDetailInputcalcstep, eiMetadata.getMeta("f_energysavingDetailInputcalcstep")));	
			map.put("f_energysavingDetailInputvalue",StringUtils.toString(f_energysavingDetailInputvalue, eiMetadata.getMeta("f_energysavingDetailInputvalue")));	
			
		return map;
	
	}
}