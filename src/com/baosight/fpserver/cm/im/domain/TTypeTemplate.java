  /**
   * Generate time : 2015-04-27 16:27:23
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
 * TTypeTemplate 
 *  
 */
public class TTypeTemplate extends DaoEPBase {

	private Integer f_typeTemplateId = new Integer(0);		
	private String f_typeTemplateName = " ";		
	private String f_typeTemplateDesc = " ";		
	private Integer f_projectTypeId = new Integer(0);		

	/**
	 * initialize the metadata 
	 */
	public void initMetaData() {
		EiColumn eiColumn;
		
	eiColumn = new EiColumn("f_typeTemplateId");
	eiColumn.setPrimaryKey(true);
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("f_typeTemplateName");
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("f_typeTemplateDesc");
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("f_projectTypeId");
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	

	}
	/**
	 * the constructor
	 */
	public TTypeTemplate() {
		initMetaData();
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
	 * get the f_typeTemplateName 
	 * @return the f_typeTemplateName
	 */
	public String getF_typeTemplateName() {
		return this.f_typeTemplateName;
	}
	
	/**
	 * set the f_typeTemplateName 
	 */
	public void setF_typeTemplateName(String f_typeTemplateName) {
		this.f_typeTemplateName = f_typeTemplateName;
	}
	
	/**
	 * get the f_typeTemplateDesc 
	 * @return the f_typeTemplateDesc
	 */
	public String getF_typeTemplateDesc() {
		return this.f_typeTemplateDesc;
	}
	
	/**
	 * set the f_typeTemplateDesc 
	 */
	public void setF_typeTemplateDesc(String f_typeTemplateDesc) {
		this.f_typeTemplateDesc = f_typeTemplateDesc;
	}
	
	/**
	 * get the f_projectTypeId 
	 * @return the f_projectTypeId
	 */
	public Integer getF_projectTypeId() {
		return this.f_projectTypeId;
	}
	
	/**
	 * set the f_projectTypeId 
	 */
	public void setF_projectTypeId(Integer f_projectTypeId) {
		this.f_projectTypeId = f_projectTypeId;
	}
	
	/**
	 * get the value from Map
	 */
	public void fromMap(Map map) {
	
		setF_typeTemplateId(NumberUtils.toInteger(StringUtils.toString(map.get("f_typeTemplateId")), f_typeTemplateId));
		setF_typeTemplateName(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("f_typeTemplateName")), f_typeTemplateName));
		setF_typeTemplateDesc(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("f_typeTemplateDesc")), f_typeTemplateDesc));
		setF_projectTypeId(NumberUtils.toInteger(StringUtils.toString(map.get("f_projectTypeId")), f_projectTypeId));
	}
	
	/**
	 * set the value to Map
	 */
	public Map toMap() {
		
		Map map = new HashMap();
			map.put("f_typeTemplateId",StringUtils.toString(f_typeTemplateId, eiMetadata.getMeta("f_typeTemplateId")));	
			map.put("f_typeTemplateName",StringUtils.toString(f_typeTemplateName, eiMetadata.getMeta("f_typeTemplateName")));	
			map.put("f_typeTemplateDesc",StringUtils.toString(f_typeTemplateDesc, eiMetadata.getMeta("f_typeTemplateDesc")));	
			map.put("f_projectTypeId",StringUtils.toString(f_projectTypeId, eiMetadata.getMeta("f_projectTypeId")));	
			
		return map;
	
	}
}