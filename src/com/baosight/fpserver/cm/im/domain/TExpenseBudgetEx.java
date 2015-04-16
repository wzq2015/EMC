  /**
   * Generate time : 2013-08-27 11:17:21
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
 * TExpenseBudget 
 *  
 */
public class TExpenseBudgetEx extends DaoEPBase {

	private Integer f_expenseBudgetId = new Integer(0);		
	private Integer f_expenseTypeId = new Integer(0);	
	private Integer f_emcprojectId = new Integer(0);		
	private String f_expenseTypeName = " ";	
	private String f_expenseBudgetYear = " ";		
	private Integer f_expenseBudgetIndex = new Integer(0);		
	private Double f_expenseBudgetPlannedvalue = new Double(0);		

	/**
	 * initialize the metadata 
	 */
	public void initMetaData() {
	EiColumn eiColumn;
		
	eiColumn = new EiColumn("f_emcprojectId");
	eiColumn.setPrimaryKey(true);
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("f_expenseTypeName");
	eiColumn.setPrimaryKey(true);
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
		
	eiColumn = new EiColumn("f_expenseBudgetId");
	eiColumn.setPrimaryKey(true);
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("f_expenseTypeId");
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("f_expenseBudgetYear");
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("f_expenseBudgetIndex");
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("f_expenseBudgetPlannedvalue");
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	eiColumn.setScaleLength(2);
	eiMetadata.addMeta(eiColumn);
	

	}
	/**
	 * the constructor
	 */
	public TExpenseBudgetEx() {
		initMetaData();
	}
	
	/**
	 * get the f_expenseBudgetId 
	 * @return the f_expenseBudgetId
	 */
	public Integer getF_expenseBudgetId() {
		return this.f_expenseBudgetId;
	}
	
	/**
	 * set the f_expenseBudgetId 
	 */
	public void setF_expenseBudgetId(Integer f_expenseBudgetId) {
		this.f_expenseBudgetId = f_expenseBudgetId;
	}
	
	/**
	 * get the f_expenseTypeId 
	 * @return the f_expenseTypeId
	 */
	public Integer getF_expenseTypeId() {
		return this.f_expenseTypeId;
	}
	
	/**
	 * set the f_expenseTypeId 
	 */
	public void setF_expenseTypeId(Integer f_expenseTypeId) {
		this.f_expenseTypeId = f_expenseTypeId;
	}
	
	/**
	 * get the f_expenseBudgetYear 
	 * @return the f_expenseBudgetYear
	 */
	public String getF_expenseBudgetYear() {
		return this.f_expenseBudgetYear;
	}
	
	/**
	 * set the f_expenseBudgetYear 
	 */
	public void setF_expenseBudgetYear(String f_expenseBudgetYear) {
		this.f_expenseBudgetYear = f_expenseBudgetYear;
	}
	
	/**
	 * get the f_expenseBudgetIndex 
	 * @return the f_expenseBudgetIndex
	 */
	public Integer getF_expenseBudgetIndex() {
		return this.f_expenseBudgetIndex;
	}
	
	/**
	 * set the f_expenseBudgetIndex 
	 */
	public void setF_expenseBudgetIndex(Integer f_expenseBudgetIndex) {
		this.f_expenseBudgetIndex = f_expenseBudgetIndex;
	}
	
	/**
	 * get the f_expenseBudgetPlannedvalue 
	 * @return the f_expenseBudgetPlannedvalue
	 */
	public Double getF_expenseBudgetPlannedvalue() {
		return this.f_expenseBudgetPlannedvalue;
	}
	
	/**
	 * set the f_expenseBudgetPlannedvalue 
	 */
	public void setF_expenseBudgetPlannedvalue(Double f_expenseBudgetPlannedvalue) {
		this.f_expenseBudgetPlannedvalue = f_expenseBudgetPlannedvalue;
	}
	
	/**
	 * get the value from Map
	 */
	public void fromMap(Map map) {
	
		setF_expenseBudgetId(NumberUtils.toInteger(StringUtils.toString(map.get("f_expenseBudgetId")), f_expenseBudgetId));
		setF_expenseTypeId(NumberUtils.toInteger(StringUtils.toString(map.get("f_expenseTypeId")), f_expenseTypeId));
		setF_emcprojectId(NumberUtils.toInteger(StringUtils.toString(map.get("f_emcprojectId")), f_emcprojectId));
		setF_expenseTypeName(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("f_expenseTypeName")), f_expenseTypeName));
		setF_expenseBudgetYear(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("f_expenseBudgetYear")), f_expenseBudgetYear));
		setF_expenseBudgetIndex(NumberUtils.toInteger(StringUtils.toString(map.get("f_expenseBudgetIndex")), f_expenseBudgetIndex));
		setF_expenseBudgetPlannedvalue(NumberUtils.toDouble(StringUtils.toString(map.get("f_expenseBudgetPlannedvalue")), f_expenseBudgetPlannedvalue));
	}
	
	/**
	 * set the value to Map
	 */
	public Map toMap() {
		
		Map map = new HashMap();
			map.put("f_expenseBudgetId",StringUtils.toString(f_expenseBudgetId, eiMetadata.getMeta("f_expenseBudgetId")));	
			map.put("f_expenseTypeId",StringUtils.toString(f_expenseTypeId, eiMetadata.getMeta("f_expenseTypeId")));	
			map.put("f_emcprojectId",StringUtils.toString(f_emcprojectId, eiMetadata.getMeta("f_emcprojectId")));	
			map.put("f_expenseTypeName",StringUtils.toString(f_expenseTypeName, eiMetadata.getMeta("f_expenseTypeName")));				
			map.put("f_expenseBudgetYear",StringUtils.toString(f_expenseBudgetYear, eiMetadata.getMeta("f_expenseBudgetYear")));	
			map.put("f_expenseBudgetIndex",StringUtils.toString(f_expenseBudgetIndex, eiMetadata.getMeta("f_expenseBudgetIndex")));	
			map.put("f_expenseBudgetPlannedvalue",StringUtils.toString(f_expenseBudgetPlannedvalue, eiMetadata.getMeta("f_expenseBudgetPlannedvalue")));	
			
		return map;
	
	}
	public Integer getF_emcprojectId() {
		return f_emcprojectId;
	}
	public void setF_emcprojectId(Integer f_emcprojectId) {
		this.f_emcprojectId = f_emcprojectId;
	}
	public String getF_expenseTypeName() {
		return f_expenseTypeName;
	}
	public void setF_expenseTypeName(String f_expenseTypeName) {
		this.f_expenseTypeName = f_expenseTypeName;
	}
}