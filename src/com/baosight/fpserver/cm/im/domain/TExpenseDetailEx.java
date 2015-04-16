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
 * TExpenseDetail 
 *  
 */
public class TExpenseDetailEx extends DaoEPBase {

	private Integer f_expenseDetailId = new Integer(0);		
	private Integer f_expenseTypeId = new Integer(0);
	private Integer f_emcprojectId = new Integer(0);		
	private String f_expenseTypeName = " ";	
	private String f_expenseDetailTime = " ";		
	private Double f_expenseDetailValue = new Double(0);	
	private String f_expenseDetailDesc = " ";		

	/**
	 * initialize the metadata 
	 */
	public void initMetaData() {
		EiColumn eiColumn;
		
	eiColumn = new EiColumn("f_expenseDetailId");
	eiColumn.setPrimaryKey(true);
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("f_expenseTypeId");
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("f_emcprojectId");
	eiColumn.setPrimaryKey(true);
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("f_expenseTypeName");
	eiColumn.setPrimaryKey(true);
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("f_expenseDetailTime");
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("f_expenseDetailValue");
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	eiColumn.setScaleLength(2);
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("f_expenseDetailDesc");
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);

	}
	/**
	 * the constructor
	 */
	public TExpenseDetailEx() {
		initMetaData();
	}
	
	/**
	 * get the f_expenseDetailId 
	 * @return the f_expenseDetailId
	 */
	public Integer getF_expenseDetailId() {
		return this.f_expenseDetailId;
	}
	
	/**
	 * set the f_expenseDetailId 
	 */
	public void setF_expenseDetailId(Integer f_expenseDetailId) {
		this.f_expenseDetailId = f_expenseDetailId;
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
	 * get the f_expenseDetailTime 
	 * @return the f_expenseDetailTime
	 */
	public String getF_expenseDetailTime() {
		return this.f_expenseDetailTime;
	}
	
	/**
	 * set the f_expenseDetailTime 
	 */
	public void setF_expenseDetailTime(String f_expenseDetailTime) {
		this.f_expenseDetailTime = f_expenseDetailTime;
	}
	
	/**
	 * get the f_expenseDetailValue 
	 * @return the f_expenseDetailValue
	 */
	public Double getF_expenseDetailValue() {
		return this.f_expenseDetailValue;
	}
	
	/**
	 * set the f_expenseDetailValue 
	 */
	public void setF_expenseDetailValue(Double f_expenseDetailValue) {
		this.f_expenseDetailValue = f_expenseDetailValue;
	}
	
	/**
	 * get the f_expenseDetailDesc 
	 * @return the f_expenseDetailDesc
	 */
	public String getF_expenseDetailDesc() {
		return this.f_expenseDetailDesc;
	}
	
	/**
	 * set the f_expenseDetailDesc 
	 */
	public void setF_expenseDetailDesc(String f_expenseDetailDesc) {
		this.f_expenseDetailDesc = f_expenseDetailDesc;
	}
	
	/**
	 * get the value from Map
	 */
	public void fromMap(Map map) {
	
		setF_expenseDetailId(NumberUtils.toInteger(StringUtils.toString(map.get("f_expenseDetailId")), f_expenseDetailId));
		setF_expenseTypeId(NumberUtils.toInteger(StringUtils.toString(map.get("f_expenseTypeId")), f_expenseTypeId));
		setF_emcprojectId(NumberUtils.toInteger(StringUtils.toString(map.get("f_emcprojectId")), f_emcprojectId));
		setF_expenseTypeName(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("f_expenseTypeName")), f_expenseTypeName));
		setF_expenseDetailTime(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("f_expenseDetailTime")), f_expenseDetailTime));
		setF_expenseDetailValue(NumberUtils.toDouble(StringUtils.toString(map.get("f_expenseDetailValue")), f_expenseDetailValue));
		setF_expenseDetailDesc(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("f_expenseDetailDesc")), f_expenseDetailDesc));
	}
	
	/**
	 * set the value to Map
	 */
	public Map toMap() {
		
		Map map = new HashMap();
			map.put("f_expenseDetailId",StringUtils.toString(f_expenseDetailId, eiMetadata.getMeta("f_expenseDetailId")));	
			map.put("f_expenseTypeId",StringUtils.toString(f_expenseTypeId, eiMetadata.getMeta("f_expenseTypeId")));	
			map.put("f_emcprojectId",StringUtils.toString(f_emcprojectId, eiMetadata.getMeta("f_emcprojectId")));	
			map.put("f_expenseTypeName",StringUtils.toString(f_expenseTypeName, eiMetadata.getMeta("f_expenseTypeName")));				
			map.put("f_expenseDetailTime",StringUtils.toString(f_expenseDetailTime, eiMetadata.getMeta("f_expenseDetailTime")));	
			map.put("f_expenseDetailValue",StringUtils.toString(f_expenseDetailValue, eiMetadata.getMeta("f_expenseDetailValue")));	
			map.put("f_expenseDetailDesc",StringUtils.toString(f_expenseDetailDesc, eiMetadata.getMeta("f_expenseDetailDesc")));	
			
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