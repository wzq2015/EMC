  /**
   * Generate time : 2015-04-29 16:38:41
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
 * TExpensetypeTemplate 
 *  
 */
public class TExpensetypeTemplate extends DaoEPBase {

	private Integer f_expensetypeTemplateId = new Integer(0);		
	private String f_expenseTypeName = " ";		
	private String f_expenseTypeDesc = " ";		
	private Integer f_typeTemplateId = new Integer(0);		

	/**
	 * initialize the metadata 
	 */
	public void initMetaData() {
		EiColumn eiColumn;
		
	eiColumn = new EiColumn("f_expensetypeTemplateId");
	eiColumn.setPrimaryKey(true);
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("f_expenseTypeName");
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("f_expenseTypeDesc");
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("f_typeTemplateId");
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	

	}
	/**
	 * the constructor
	 */
	public TExpensetypeTemplate() {
		initMetaData();
	}
	
	/**
	 * get the f_expensetypeTemplateId 
	 * @return the f_expensetypeTemplateId
	 */
	public Integer getF_expensetypeTemplateId() {
		return this.f_expensetypeTemplateId;
	}
	
	/**
	 * set the f_expensetypeTemplateId 
	 */
	public void setF_expensetypeTemplateId(Integer f_expensetypeTemplateId) {
		this.f_expensetypeTemplateId = f_expensetypeTemplateId;
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
	
		setF_expensetypeTemplateId(NumberUtils.toInteger(StringUtils.toString(map.get("f_expensetypeTemplateId")), f_expensetypeTemplateId));
		setF_expenseTypeName(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("f_expenseTypeName")), f_expenseTypeName));
		setF_expenseTypeDesc(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("f_expenseTypeDesc")), f_expenseTypeDesc));
		setF_typeTemplateId(NumberUtils.toInteger(StringUtils.toString(map.get("f_typeTemplateId")), f_typeTemplateId));
	}
	
	/**
	 * set the value to Map
	 */
	public Map toMap() {
		
		Map map = new HashMap();
			map.put("f_expensetypeTemplateId",StringUtils.toString(f_expensetypeTemplateId, eiMetadata.getMeta("f_expensetypeTemplateId")));	
			map.put("f_expenseTypeName",StringUtils.toString(f_expenseTypeName, eiMetadata.getMeta("f_expenseTypeName")));	
			map.put("f_expenseTypeDesc",StringUtils.toString(f_expenseTypeDesc, eiMetadata.getMeta("f_expenseTypeDesc")));	
			map.put("f_typeTemplateId",StringUtils.toString(f_typeTemplateId, eiMetadata.getMeta("f_typeTemplateId")));	
			
		return map;
	
	}
}