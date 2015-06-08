  /**
   * Generate time : 2015-06-03 17:06:52
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
 * TmpEventTable 
 *  
 */
public class TmpEventTable extends DaoEPBase {

	private Integer eid = new Integer(0);		
	private String ename = " ";		
	private String edesc = " ";		
	private Integer etype = new Integer(0);		
	private Integer e_belongId = new Integer(0);		
	private Integer ptid = new Integer(0);		
	private String ptname = " ";		
	private String belongPname = " ";		
	private String e_belongName = " ";		

	/**
	 * initialize the metadata 
	 */
	public void initMetaData() {
		EiColumn eiColumn;
		
	eiColumn = new EiColumn("eid");
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("ename");
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("edesc");
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("etype");
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("e_belongId");
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("ptid");
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("ptname");
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("belongPname");
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("e_belongName");
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	

	}
	/**
	 * the constructor
	 */
	public TmpEventTable() {
		initMetaData();
	}
	
	/**
	 * get the eid 
	 * @return the eid
	 */
	public Integer getEid() {
		return this.eid;
	}
	
	/**
	 * set the eid 
	 */
	public void setEid(Integer eid) {
		this.eid = eid;
	}
	
	/**
	 * get the ename 
	 * @return the ename
	 */
	public String getEname() {
		return this.ename;
	}
	
	/**
	 * set the ename 
	 */
	public void setEname(String ename) {
		this.ename = ename;
	}
	
	/**
	 * get the edesc 
	 * @return the edesc
	 */
	public String getEdesc() {
		return this.edesc;
	}
	
	/**
	 * set the edesc 
	 */
	public void setEdesc(String edesc) {
		this.edesc = edesc;
	}
	
	/**
	 * get the etype 
	 * @return the etype
	 */
	public Integer getEtype() {
		return this.etype;
	}
	
	/**
	 * set the etype 
	 */
	public void setEtype(Integer etype) {
		this.etype = etype;
	}
	
	/**
	 * get the e_belongId 
	 * @return the e_belongId
	 */
	public Integer getE_belongId() {
		return this.e_belongId;
	}
	
	/**
	 * set the e_belongId 
	 */
	public void setE_belongId(Integer e_belongId) {
		this.e_belongId = e_belongId;
	}
	
	/**
	 * get the ptid 
	 * @return the ptid
	 */
	public Integer getPtid() {
		return this.ptid;
	}
	
	/**
	 * set the ptid 
	 */
	public void setPtid(Integer ptid) {
		this.ptid = ptid;
	}
	
	/**
	 * get the ptname 
	 * @return the ptname
	 */
	public String getPtname() {
		return this.ptname;
	}
	
	/**
	 * set the ptname 
	 */
	public void setPtname(String ptname) {
		this.ptname = ptname;
	}
	
	/**
	 * get the belongPname 
	 * @return the belongPname
	 */
	public String getBelongPname() {
		return this.belongPname;
	}
	
	/**
	 * set the belongPname 
	 */
	public void setBelongPname(String belongPname) {
		this.belongPname = belongPname;
	}
	
	/**
	 * get the e_belongName 
	 * @return the e_belongName
	 */
	public String getE_belongName() {
		return this.e_belongName;
	}
	
	/**
	 * set the e_belongName 
	 */
	public void setE_belongName(String e_belongName) {
		this.e_belongName = e_belongName;
	}
	
	/**
	 * get the value from Map
	 */
	public void fromMap(Map map) {
	
		setEid(NumberUtils.toInteger(StringUtils.toString(map.get("eid")), eid));
		setEname(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("ename")), ename));
		setEdesc(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("edesc")), edesc));
		setEtype(NumberUtils.toInteger(StringUtils.toString(map.get("etype")), etype));
		setE_belongId(NumberUtils.toInteger(StringUtils.toString(map.get("e_belongId")), e_belongId));
		setPtid(NumberUtils.toInteger(StringUtils.toString(map.get("ptid")), ptid));
		setPtname(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("ptname")), ptname));
		setBelongPname(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("belongPname")), belongPname));
		setE_belongName(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("e_belongName")), e_belongName));
	}
	
	/**
	 * set the value to Map
	 */
	public Map toMap() {
		
		Map map = new HashMap();
			map.put("eid",StringUtils.toString(eid, eiMetadata.getMeta("eid")));	
			map.put("ename",StringUtils.toString(ename, eiMetadata.getMeta("ename")));	
			map.put("edesc",StringUtils.toString(edesc, eiMetadata.getMeta("edesc")));	
			map.put("etype",StringUtils.toString(etype, eiMetadata.getMeta("etype")));	
			map.put("e_belongId",StringUtils.toString(e_belongId, eiMetadata.getMeta("e_belongId")));	
			map.put("ptid",StringUtils.toString(ptid, eiMetadata.getMeta("ptid")));	
			map.put("ptname",StringUtils.toString(ptname, eiMetadata.getMeta("ptname")));	
			map.put("belongPname",StringUtils.toString(belongPname, eiMetadata.getMeta("belongPname")));	
			map.put("e_belongName",StringUtils.toString(e_belongName, eiMetadata.getMeta("e_belongName")));	
			
		return map;
	
	}
}