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
 * TExpenseType 
 *  
 */
public class TExpenseType extends DaoEPBase {

	private Integer f_expenseTypeId = new Integer(0);		
	private Integer f_emcprojectId = new Integer(0);		
	private String f_expenseTypeName = " ";		
	private String f_expenseTypeDesc = " ";		

	/**
	 * initialize the metadata 
	 */
	public void initMetaData() {
		EiColumn eiColumn;
		
	eiColumn = new EiColumn("f_expenseTypeId");
	eiColumn.setPrimaryKey(true);
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("f_emcprojectId");
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("f_expenseTypeName");
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("f_expenseTypeDesc");
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	

	}
	/**
	 * the constructor
	 */
	public TExpenseType() {
		initMetaData();
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
	 * get the f_expenseTypeName 
	 * @return the f_expenseTypeName
	 */
	public String getF_expenseTypeName() {
		return this.f_expenseTypeName;
	}
	
	/**
	 * set the f_expenseTypeName 
	 */
	public void setF_expenseTypeName(String f_expenseTypeName) {
		this.f_expenseTypeName = f_expenseTypeName;
	}
	
	/**
	 * get the f_expenseTypeDesc 
	 * @return the f_expenseTypeDesc
	 */
	public String getF_expenseTypeDesc() {
		return this.f_expenseTypeDesc;
	}
	
	/**
	 * set the f_expenseTypeDesc 
	 */
	public void setF_expenseTypeDesc(String f_expenseTypeDesc) {
		this.f_expenseTypeDesc = f_expenseTypeDesc;
	}
	
	/**
	 * get the value from Map
	 */
	public void fromMap(Map map) {
	
		setF_expenseTypeId(NumberUtils.toInteger(StringUtils.toString(map.get("f_expenseTypeId")), f_expenseTypeId));
		setF_emcprojectId(NumberUtils.toInteger(StringUtils.toString(map.get("f_emcprojectId")), f_emcprojectId));
		setF_expenseTypeName(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("f_expenseTypeName")), f_expenseTypeName));
		setF_expenseTypeDesc(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("f_expenseTypeDesc")), f_expenseTypeDesc));
	}
	
	/**
	 * set the value to Map
	 */
	public Map toMap() {
		
		Map map = new HashMap();
			map.put("f_expenseTypeId",StringUtils.toString(f_expenseTypeId, eiMetadata.getMeta("f_expenseTypeId")));	
			map.put("f_emcprojectId",StringUtils.toString(f_emcprojectId, eiMetadata.getMeta("f_emcprojectId")));	
			map.put("f_expenseTypeName",StringUtils.toString(f_expenseTypeName, eiMetadata.getMeta("f_expenseTypeName")));	
			map.put("f_expenseTypeDesc",StringUtils.toString(f_expenseTypeDesc, eiMetadata.getMeta("f_expenseTypeDesc")));	
			
		return map;
	
	}
}