  /**
   * Generate time : 2013-12-19 16:32:39
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
 * TOperationLog 
 *  
 */
public class TOperationLog extends DaoEPBase {

	private Integer f_operationLogId = new Integer(0);		
	private Integer f_emcprojectId = new Integer(0);		
	private String f_operationTime = " ";		
	private Integer f_operationType = new Integer(0);		
	private String f_operationContent = " ";		
	private String f_userName = " ";		
	private String f_operationClientip = " ";		

	/**
	 * initialize the metadata 
	 */
	public void initMetaData() {
		EiColumn eiColumn;
		
	eiColumn = new EiColumn("f_operationLogId");
	eiColumn.setPrimaryKey(true);
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("f_emcprojectId");
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("f_operationTime");
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("f_operationType");
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("f_operationContent");
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("f_userName");
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("f_operationClientip");
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	

	}
	/**
	 * the constructor
	 */
	public TOperationLog() {
		initMetaData();
	}
	
	/**
	 * get the f_operationLogId 
	 * @return the f_operationLogId
	 */
	public Integer getF_operationLogId() {
		return this.f_operationLogId;
	}
	
	/**
	 * set the f_operationLogId 
	 */
	public void setF_operationLogId(Integer f_operationLogId) {
		this.f_operationLogId = f_operationLogId;
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
	 * get the f_operationTime 
	 * @return the f_operationTime
	 */
	public String getF_operationTime() {
		return this.f_operationTime;
	}
	
	/**
	 * set the f_operationTime 
	 */
	public void setF_operationTime(String f_operationTime) {
		this.f_operationTime = f_operationTime;
	}
	
	/**
	 * get the f_operationType 
	 * @return the f_operationType
	 */
	public Integer getF_operationType() {
		return this.f_operationType;
	}
	
	/**
	 * set the f_operationType 
	 */
	public void setF_operationType(Integer f_operationType) {
		this.f_operationType = f_operationType;
	}
	
	/**
	 * get the f_operationContent 
	 * @return the f_operationContent
	 */
	public String getF_operationContent() {
		return this.f_operationContent;
	}
	
	/**
	 * set the f_operationContent 
	 */
	public void setF_operationContent(String f_operationContent) {
		this.f_operationContent = f_operationContent;
	}
	
	/**
	 * get the f_userName 
	 * @return the f_userName
	 */
	public String getF_userName() {
		return this.f_userName;
	}
	
	/**
	 * set the f_userName 
	 */
	public void setF_userName(String f_userName) {
		this.f_userName = f_userName;
	}
	
	/**
	 * get the f_operationClientip 
	 * @return the f_operationClientip
	 */
	public String getF_operationClientip() {
		return this.f_operationClientip;
	}
	
	/**
	 * set the f_operationClientip 
	 */
	public void setF_operationClientip(String f_operationClientip) {
		this.f_operationClientip = f_operationClientip;
	}
	
	/**
	 * get the value from Map
	 */
	public void fromMap(Map map) {
	
		setF_operationLogId(NumberUtils.toInteger(StringUtils.toString(map.get("f_operationLogId")), f_operationLogId));
		setF_emcprojectId(NumberUtils.toInteger(StringUtils.toString(map.get("f_emcprojectId")), f_emcprojectId));
		setF_operationTime(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("f_operationTime")), f_operationTime));
		setF_operationType(NumberUtils.toInteger(StringUtils.toString(map.get("f_operationType")), f_operationType));
		setF_operationContent(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("f_operationContent")), f_operationContent));
		setF_userName(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("f_userName")), f_userName));
		setF_operationClientip(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("f_operationClientip")), f_operationClientip));
	}
	
	/**
	 * set the value to Map
	 */
	public Map toMap() {
		
		Map map = new HashMap();
			map.put("f_operationLogId",StringUtils.toString(f_operationLogId, eiMetadata.getMeta("f_operationLogId")));	
			map.put("f_emcprojectId",StringUtils.toString(f_emcprojectId, eiMetadata.getMeta("f_emcprojectId")));	
			map.put("f_operationTime",StringUtils.toString(f_operationTime, eiMetadata.getMeta("f_operationTime")));	
			map.put("f_operationType",StringUtils.toString(f_operationType, eiMetadata.getMeta("f_operationType")));	
			map.put("f_operationContent",StringUtils.toString(f_operationContent, eiMetadata.getMeta("f_operationContent")));	
			map.put("f_userName",StringUtils.toString(f_userName, eiMetadata.getMeta("f_userName")));	
			map.put("f_operationClientip",StringUtils.toString(f_operationClientip, eiMetadata.getMeta("f_operationClientip")));	
			
		return map;
	
	}
}