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
 * TEmcprojectCycle 
 *  
 */
public class TEmcprojectCycle extends DaoEPBase {

	private Integer f_emcprojectCycleId = new Integer(0);		
	private Integer f_emcprojectId = new Integer(0);		
	private Integer f_emcprojectCycleCycleindex = new Integer(0);		
	private String f_emcprojectCycleStarttime = " ";		
	private String f_emcprojectCycleEndtime = " ";		

	/**
	 * initialize the metadata 
	 */
	public void initMetaData() {
		EiColumn eiColumn;
		
	eiColumn = new EiColumn("f_emcprojectCycleId");
	eiColumn.setPrimaryKey(true);
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("f_emcprojectId");
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("f_emcprojectCycleCycleindex");
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("f_emcprojectCycleStarttime");
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("f_emcprojectCycleEndtime");
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	

	}
	/**
	 * the constructor
	 */
	public TEmcprojectCycle() {
		initMetaData();
	}
	
	/**
	 * get the f_emcprojectCycleId 
	 * @return the f_emcprojectCycleId
	 */
	public Integer getF_emcprojectCycleId() {
		return this.f_emcprojectCycleId;
	}
	
	/**
	 * set the f_emcprojectCycleId 
	 */
	public void setF_emcprojectCycleId(Integer f_emcprojectCycleId) {
		this.f_emcprojectCycleId = f_emcprojectCycleId;
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
	 * get the f_emcprojectCycleCycleindex 
	 * @return the f_emcprojectCycleCycleindex
	 */
	public Integer getF_emcprojectCycleCycleindex() {
		return this.f_emcprojectCycleCycleindex;
	}
	
	/**
	 * set the f_emcprojectCycleCycleindex 
	 */
	public void setF_emcprojectCycleCycleindex(Integer f_emcprojectCycleCycleindex) {
		this.f_emcprojectCycleCycleindex = f_emcprojectCycleCycleindex;
	}
	
	/**
	 * get the f_emcprojectCycleStarttime 
	 * @return the f_emcprojectCycleStarttime
	 */
	public String getF_emcprojectCycleStarttime() {
		return this.f_emcprojectCycleStarttime;
	}
	
	/**
	 * set the f_emcprojectCycleStarttime 
	 */
	public void setF_emcprojectCycleStarttime(String f_emcprojectCycleStarttime) {
		this.f_emcprojectCycleStarttime = f_emcprojectCycleStarttime;
	}
	
	/**
	 * get the f_emcprojectCycleEndtime 
	 * @return the f_emcprojectCycleEndtime
	 */
	public String getF_emcprojectCycleEndtime() {
		return this.f_emcprojectCycleEndtime;
	}
	
	/**
	 * set the f_emcprojectCycleEndtime 
	 */
	public void setF_emcprojectCycleEndtime(String f_emcprojectCycleEndtime) {
		this.f_emcprojectCycleEndtime = f_emcprojectCycleEndtime;
	}
	
	/**
	 * get the value from Map
	 */
	public void fromMap(Map map) {
	
		setF_emcprojectCycleId(NumberUtils.toInteger(StringUtils.toString(map.get("f_emcprojectCycleId")), f_emcprojectCycleId));
		setF_emcprojectId(NumberUtils.toInteger(StringUtils.toString(map.get("f_emcprojectId")), f_emcprojectId));
		setF_emcprojectCycleCycleindex(NumberUtils.toInteger(StringUtils.toString(map.get("f_emcprojectCycleCycleindex")), f_emcprojectCycleCycleindex));
		setF_emcprojectCycleStarttime(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("f_emcprojectCycleStarttime")), f_emcprojectCycleStarttime));
		setF_emcprojectCycleEndtime(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("f_emcprojectCycleEndtime")), f_emcprojectCycleEndtime));
	}
	
	/**
	 * set the value to Map
	 */
	public Map toMap() {
		
		Map map = new HashMap();
			map.put("f_emcprojectCycleId",StringUtils.toString(f_emcprojectCycleId, eiMetadata.getMeta("f_emcprojectCycleId")));	
			map.put("f_emcprojectId",StringUtils.toString(f_emcprojectId, eiMetadata.getMeta("f_emcprojectId")));	
			map.put("f_emcprojectCycleCycleindex",StringUtils.toString(f_emcprojectCycleCycleindex, eiMetadata.getMeta("f_emcprojectCycleCycleindex")));	
			map.put("f_emcprojectCycleStarttime",StringUtils.toString(f_emcprojectCycleStarttime, eiMetadata.getMeta("f_emcprojectCycleStarttime")));	
			map.put("f_emcprojectCycleEndtime",StringUtils.toString(f_emcprojectCycleEndtime, eiMetadata.getMeta("f_emcprojectCycleEndtime")));	
			
		return map;
	
	}
}