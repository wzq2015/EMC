  /**
   * Generate time : 2013-11-21 13:53:49
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
 * TReportTemplate 
 *  
 */
public class TReportTemplate extends DaoEPBase {

	private Integer f_reportTemplateId = new Integer(0);		
	private Integer f_emcprojectId = new Integer(0);		
	private Integer f_reportTemplateType = new Integer(0);		
	private String f_reportTemplateName = " ";		
	private String f_reportTemplateDesc = " ";		
	private String f_reportTemplatePath = " ";		
	private String f_reportTemplateModifiedtime = " ";		
	private Integer f_reportTemplateAutogenerate = new Integer(0);		

	/**
	 * initialize the metadata 
	 */
	public void initMetaData() {
		EiColumn eiColumn;
		
	eiColumn = new EiColumn("f_reportTemplateId");
	eiColumn.setPrimaryKey(true);
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("f_emcprojectId");
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("f_reportTemplateType");
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("f_reportTemplateName");
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("f_reportTemplateDesc");
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("f_reportTemplatePath");
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("f_reportTemplateModifiedtime");
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("f_reportTemplateAutogenerate");
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	

	}
	/**
	 * the constructor
	 */
	public TReportTemplate() {
		initMetaData();
	}
	
	/**
	 * get the f_reportTemplateId 
	 * @return the f_reportTemplateId
	 */
	public Integer getF_reportTemplateId() {
		return this.f_reportTemplateId;
	}
	
	/**
	 * set the f_reportTemplateId 
	 */
	public void setF_reportTemplateId(Integer f_reportTemplateId) {
		this.f_reportTemplateId = f_reportTemplateId;
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
	 * get the f_reportTemplateType 
	 * @return the f_reportTemplateType
	 */
	public Integer getF_reportTemplateType() {
		return this.f_reportTemplateType;
	}
	
	/**
	 * set the f_reportTemplateType 
	 */
	public void setF_reportTemplateType(Integer f_reportTemplateType) {
		this.f_reportTemplateType = f_reportTemplateType;
	}
	
	/**
	 * get the f_reportTemplateName 
	 * @return the f_reportTemplateName
	 */
	public String getF_reportTemplateName() {
		return this.f_reportTemplateName;
	}
	
	/**
	 * set the f_reportTemplateName 
	 */
	public void setF_reportTemplateName(String f_reportTemplateName) {
		this.f_reportTemplateName = f_reportTemplateName;
	}
	
	/**
	 * get the f_reportTemplateDesc 
	 * @return the f_reportTemplateDesc
	 */
	public String getF_reportTemplateDesc() {
		return this.f_reportTemplateDesc;
	}
	
	/**
	 * set the f_reportTemplateDesc 
	 */
	public void setF_reportTemplateDesc(String f_reportTemplateDesc) {
		this.f_reportTemplateDesc = f_reportTemplateDesc;
	}
	
	/**
	 * get the f_reportTemplatePath 
	 * @return the f_reportTemplatePath
	 */
	public String getF_reportTemplatePath() {
		return this.f_reportTemplatePath;
	}
	
	/**
	 * set the f_reportTemplatePath 
	 */
	public void setF_reportTemplatePath(String f_reportTemplatePath) {
		this.f_reportTemplatePath = f_reportTemplatePath;
	}
	
	/**
	 * get the f_reportTemplateModifiedtime 
	 * @return the f_reportTemplateModifiedtime
	 */
	public String getF_reportTemplateModifiedtime() {
		return this.f_reportTemplateModifiedtime;
	}
	
	/**
	 * set the f_reportTemplateModifiedtime 
	 */
	public void setF_reportTemplateModifiedtime(String f_reportTemplateModifiedtime) {
		this.f_reportTemplateModifiedtime = f_reportTemplateModifiedtime;
	}
	
	/**
	 * get the f_reportTemplateAutogenerate 
	 * @return the f_reportTemplateAutogenerate
	 */
	public Integer getF_reportTemplateAutogenerate() {
		return this.f_reportTemplateAutogenerate;
	}
	
	/**
	 * set the f_reportTemplateAutogenerate 
	 */
	public void setF_reportTemplateAutogenerate(Integer f_reportTemplateAutogenerate) {
		this.f_reportTemplateAutogenerate = f_reportTemplateAutogenerate;
	}
	
	/**
	 * get the value from Map
	 */
	public void fromMap(Map map) {
	
		setF_reportTemplateId(NumberUtils.toInteger(StringUtils.toString(map.get("f_reportTemplateId")), f_reportTemplateId));
		setF_emcprojectId(NumberUtils.toInteger(StringUtils.toString(map.get("f_emcprojectId")), f_emcprojectId));
		setF_reportTemplateType(NumberUtils.toInteger(StringUtils.toString(map.get("f_reportTemplateType")), f_reportTemplateType));
		setF_reportTemplateName(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("f_reportTemplateName")), f_reportTemplateName));
		setF_reportTemplateDesc(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("f_reportTemplateDesc")), f_reportTemplateDesc));
		setF_reportTemplatePath(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("f_reportTemplatePath")), f_reportTemplatePath));
		setF_reportTemplateModifiedtime(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("f_reportTemplateModifiedtime")), f_reportTemplateModifiedtime));
		setF_reportTemplateAutogenerate(NumberUtils.toInteger(StringUtils.toString(map.get("f_reportTemplateAutogenerate")), f_reportTemplateAutogenerate));
	}
	
	/**
	 * set the value to Map
	 */
	public Map toMap() {
		
		Map map = new HashMap();
			map.put("f_reportTemplateId",StringUtils.toString(f_reportTemplateId, eiMetadata.getMeta("f_reportTemplateId")));	
			map.put("f_emcprojectId",StringUtils.toString(f_emcprojectId, eiMetadata.getMeta("f_emcprojectId")));	
			map.put("f_reportTemplateType",StringUtils.toString(f_reportTemplateType, eiMetadata.getMeta("f_reportTemplateType")));	
			map.put("f_reportTemplateName",StringUtils.toString(f_reportTemplateName, eiMetadata.getMeta("f_reportTemplateName")));	
			map.put("f_reportTemplateDesc",StringUtils.toString(f_reportTemplateDesc, eiMetadata.getMeta("f_reportTemplateDesc")));	
			map.put("f_reportTemplatePath",StringUtils.toString(f_reportTemplatePath, eiMetadata.getMeta("f_reportTemplatePath")));	
			map.put("f_reportTemplateModifiedtime",StringUtils.toString(f_reportTemplateModifiedtime, eiMetadata.getMeta("f_reportTemplateModifiedtime")));	
			map.put("f_reportTemplateAutogenerate",StringUtils.toString(f_reportTemplateAutogenerate, eiMetadata.getMeta("f_reportTemplateAutogenerate")));	
			
		return map;
	
	}
}