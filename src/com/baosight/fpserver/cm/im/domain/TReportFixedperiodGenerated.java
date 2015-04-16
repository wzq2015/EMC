  /**
   * Generate time : 2013-11-21 16:26:04
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
 * TReportFixedperiodGenerated 
 *  
 */
public class TReportFixedperiodGenerated extends DaoEPBase {

	private Integer f_reportFixedperiodGeneratedId = new Integer(0);		
	private Integer f_reportTemplateId = new Integer(0);		
	private String f_reportFixedperiodGeneratedYear = " ";		
	private Integer f_reportFixedperiodGeneratedIndex = new Integer(0);		
	private Integer f_reportFixedperiodGeneratedCycleindex = new Integer(0);		
	private byte[] f_reportFixedperiodGeneratedContent;	

	/**
	 * initialize the metadata 
	 */
	public void initMetaData() {
		EiColumn eiColumn;
		
	eiColumn = new EiColumn("f_reportFixedperiodGeneratedId");
	eiColumn.setPrimaryKey(true);
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("f_reportTemplateId");
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("f_reportFixedperiodGeneratedYear");
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("f_reportFixedperiodGeneratedIndex");
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("f_reportFixedperiodGeneratedCycleindex");
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("f_reportFixedperiodGeneratedContent");
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	

	}
	/**
	 * the constructor
	 */
	public TReportFixedperiodGenerated() {
		initMetaData();
	}
	
	/**
	 * get the f_reportFixedperiodGeneratedId 
	 * @return the f_reportFixedperiodGeneratedId
	 */
	public Integer getF_reportFixedperiodGeneratedId() {
		return this.f_reportFixedperiodGeneratedId;
	}
	
	/**
	 * set the f_reportFixedperiodGeneratedId 
	 */
	public void setF_reportFixedperiodGeneratedId(Integer f_reportFixedperiodGeneratedId) {
		this.f_reportFixedperiodGeneratedId = f_reportFixedperiodGeneratedId;
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
	 * get the f_reportFixedperiodGeneratedYear 
	 * @return the f_reportFixedperiodGeneratedYear
	 */
	public String getF_reportFixedperiodGeneratedYear() {
		return this.f_reportFixedperiodGeneratedYear;
	}
	
	/**
	 * set the f_reportFixedperiodGeneratedYear 
	 */
	public void setF_reportFixedperiodGeneratedYear(String f_reportFixedperiodGeneratedYear) {
		this.f_reportFixedperiodGeneratedYear = f_reportFixedperiodGeneratedYear;
	}
	
	/**
	 * get the f_reportFixedperiodGeneratedIndex 
	 * @return the f_reportFixedperiodGeneratedIndex
	 */
	public Integer getF_reportFixedperiodGeneratedIndex() {
		return this.f_reportFixedperiodGeneratedIndex;
	}
	
	/**
	 * set the f_reportFixedperiodGeneratedIndex 
	 */
	public void setF_reportFixedperiodGeneratedIndex(Integer f_reportFixedperiodGeneratedIndex) {
		this.f_reportFixedperiodGeneratedIndex = f_reportFixedperiodGeneratedIndex;
	}
	
	/**
	 * get the f_reportFixedperiodGeneratedCycleindex 
	 * @return the f_reportFixedperiodGeneratedCycleindex
	 */
	public Integer getF_reportFixedperiodGeneratedCycleindex() {
		return this.f_reportFixedperiodGeneratedCycleindex;
	}
	
	/**
	 * set the f_reportFixedperiodGeneratedCycleindex 
	 */
	public void setF_reportFixedperiodGeneratedCycleindex(Integer f_reportFixedperiodGeneratedCycleindex) {
		this.f_reportFixedperiodGeneratedCycleindex = f_reportFixedperiodGeneratedCycleindex;
	}
	
	/**
	 * get the f_reportFixedperiodGeneratedContent 
	 * @return the f_reportFixedperiodGeneratedContent
	 */
	public byte[] getF_reportFixedperiodGeneratedContent() {
		return this.f_reportFixedperiodGeneratedContent;
	}
	
	/**
	 * set the f_reportFixedperiodGeneratedContent 
	 */
	public void setF_reportFixedperiodGeneratedContent(byte[] f_reportFixedperiodGeneratedContent) {
		this.f_reportFixedperiodGeneratedContent = f_reportFixedperiodGeneratedContent;
	}
	
	/**
	 * get the value from Map
	 */
	public void fromMap(Map map) {
	
		setF_reportFixedperiodGeneratedId(NumberUtils.toInteger(StringUtils.toString(map.get("f_reportFixedperiodGeneratedId")), f_reportFixedperiodGeneratedId));
		setF_reportTemplateId(NumberUtils.toInteger(StringUtils.toString(map.get("f_reportTemplateId")), f_reportTemplateId));
		setF_reportFixedperiodGeneratedYear(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("f_reportFixedperiodGeneratedYear")), f_reportFixedperiodGeneratedYear));
		setF_reportFixedperiodGeneratedIndex(NumberUtils.toInteger(StringUtils.toString(map.get("f_reportFixedperiodGeneratedIndex")), f_reportFixedperiodGeneratedIndex));
		setF_reportFixedperiodGeneratedCycleindex(NumberUtils.toInteger(StringUtils.toString(map.get("f_reportFixedperiodGeneratedCycleindex")), f_reportFixedperiodGeneratedCycleindex));
			//TODO f_reportFixedperiodGeneratedContent cannot generate automatically ,byte[] dont support
	}
	
	/**
	 * set the value to Map
	 */
	public Map toMap() {
		
		Map map = new HashMap();
			map.put("f_reportFixedperiodGeneratedId",StringUtils.toString(f_reportFixedperiodGeneratedId, eiMetadata.getMeta("f_reportFixedperiodGeneratedId")));	
			map.put("f_reportTemplateId",StringUtils.toString(f_reportTemplateId, eiMetadata.getMeta("f_reportTemplateId")));	
			map.put("f_reportFixedperiodGeneratedYear",StringUtils.toString(f_reportFixedperiodGeneratedYear, eiMetadata.getMeta("f_reportFixedperiodGeneratedYear")));	
			map.put("f_reportFixedperiodGeneratedIndex",StringUtils.toString(f_reportFixedperiodGeneratedIndex, eiMetadata.getMeta("f_reportFixedperiodGeneratedIndex")));	
			map.put("f_reportFixedperiodGeneratedCycleindex",StringUtils.toString(f_reportFixedperiodGeneratedCycleindex, eiMetadata.getMeta("f_reportFixedperiodGeneratedCycleindex")));	
			map.put("f_reportFixedperiodGeneratedContent",StringUtils.toString(f_reportFixedperiodGeneratedContent, eiMetadata.getMeta("f_reportFixedperiodGeneratedContent")));	
			
		return map;
	
	}
}