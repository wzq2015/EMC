  /**
   * Generate time : 2014-04-23 9:31:55
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
 * Hisalarm 
 *  
 */
public class Hisalarm extends DaoEPBase {

	private String fdNodename = " ";		
	private String fdTagname = " ";		
	private Integer fdAlarmtype = new Integer(0);		
	private String fdOccurtime = " ";		
	private String fdStatus = " ";		
	private String fdTagdesp = " ";		
	private String fdEgu = " ";		
	private String fdClassname = " ";		
	private String fdSubsystem = " ";		
	private String fdCategory = " ";		
	private Integer fdPriority = new Integer(0);		
	private String fdConfirmtime = " ";		
	private String fdRecovertime = " ";		
	private String fdConfirmperson = " ";		
	private String fdCurvalue = " ";		
	private Integer fdAlarmid = new Integer(0);		

	/**
	 * initialize the metadata 
	 */
	public void initMetaData() {
		EiColumn eiColumn;
		
	eiColumn = new EiColumn("fdNodename");
	eiColumn.setPrimaryKey(true);
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("fdTagname");
	eiColumn.setPrimaryKey(true);
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("fdAlarmtype");
	eiColumn.setPrimaryKey(true);
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("fdOccurtime");
	eiColumn.setPrimaryKey(true);
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("fdStatus");
	eiColumn.setPrimaryKey(true);
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("fdTagdesp");
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("fdEgu");
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("fdClassname");
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("fdSubsystem");
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("fdCategory");
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("fdPriority");
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("fdConfirmtime");
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("fdRecovertime");
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("fdConfirmperson");
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("fdCurvalue");
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("fdAlarmid");
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	

	}
	/**
	 * the constructor
	 */
	public Hisalarm() {
		initMetaData();
	}
	
	/**
	 * get the fdNodename 
	 * @return the fdNodename
	 */
	public String getFdNodename() {
		return this.fdNodename;
	}
	
	/**
	 * set the fdNodename 
	 */
	public void setFdNodename(String fdNodename) {
		this.fdNodename = fdNodename;
	}
	
	/**
	 * get the fdTagname 
	 * @return the fdTagname
	 */
	public String getFdTagname() {
		return this.fdTagname;
	}
	
	/**
	 * set the fdTagname 
	 */
	public void setFdTagname(String fdTagname) {
		this.fdTagname = fdTagname;
	}
	
	/**
	 * get the fdAlarmtype 
	 * @return the fdAlarmtype
	 */
	public Integer getFdAlarmtype() {
		return this.fdAlarmtype;
	}
	
	/**
	 * set the fdAlarmtype 
	 */
	public void setFdAlarmtype(Integer fdAlarmtype) {
		this.fdAlarmtype = fdAlarmtype;
	}
	
	/**
	 * get the fdOccurtime 
	 * @return the fdOccurtime
	 */
	public String getFdOccurtime() {
		return this.fdOccurtime;
	}
	
	/**
	 * set the fdOccurtime 
	 */
	public void setFdOccurtime(String fdOccurtime) {
		this.fdOccurtime = fdOccurtime;
	}
	
	/**
	 * get the fdStatus 
	 * @return the fdStatus
	 */
	public String getFdStatus() {
		return this.fdStatus;
	}
	
	/**
	 * set the fdStatus 
	 */
	public void setFdStatus(String fdStatus) {
		this.fdStatus = fdStatus;
	}
	
	/**
	 * get the fdTagdesp 
	 * @return the fdTagdesp
	 */
	public String getFdTagdesp() {
		return this.fdTagdesp;
	}
	
	/**
	 * set the fdTagdesp 
	 */
	public void setFdTagdesp(String fdTagdesp) {
		this.fdTagdesp = fdTagdesp;
	}
	
	/**
	 * get the fdEgu 
	 * @return the fdEgu
	 */
	public String getFdEgu() {
		return this.fdEgu;
	}
	
	/**
	 * set the fdEgu 
	 */
	public void setFdEgu(String fdEgu) {
		this.fdEgu = fdEgu;
	}
	
	/**
	 * get the fdClassname 
	 * @return the fdClassname
	 */
	public String getFdClassname() {
		return this.fdClassname;
	}
	
	/**
	 * set the fdClassname 
	 */
	public void setFdClassname(String fdClassname) {
		this.fdClassname = fdClassname;
	}
	
	/**
	 * get the fdSubsystem 
	 * @return the fdSubsystem
	 */
	public String getFdSubsystem() {
		return this.fdSubsystem;
	}
	
	/**
	 * set the fdSubsystem 
	 */
	public void setFdSubsystem(String fdSubsystem) {
		this.fdSubsystem = fdSubsystem;
	}
	
	/**
	 * get the fdCategory 
	 * @return the fdCategory
	 */
	public String getFdCategory() {
		return this.fdCategory;
	}
	
	/**
	 * set the fdCategory 
	 */
	public void setFdCategory(String fdCategory) {
		this.fdCategory = fdCategory;
	}
	
	/**
	 * get the fdPriority 
	 * @return the fdPriority
	 */
	public Integer getFdPriority() {
		return this.fdPriority;
	}
	
	/**
	 * set the fdPriority 
	 */
	public void setFdPriority(Integer fdPriority) {
		this.fdPriority = fdPriority;
	}
	
	/**
	 * get the fdConfirmtime 
	 * @return the fdConfirmtime
	 */
	public String getFdConfirmtime() {
		return this.fdConfirmtime;
	}
	
	/**
	 * set the fdConfirmtime 
	 */
	public void setFdConfirmtime(String fdConfirmtime) {
		this.fdConfirmtime = fdConfirmtime;
	}
	
	/**
	 * get the fdRecovertime 
	 * @return the fdRecovertime
	 */
	public String getFdRecovertime() {
		return this.fdRecovertime;
	}
	
	/**
	 * set the fdRecovertime 
	 */
	public void setFdRecovertime(String fdRecovertime) {
		this.fdRecovertime = fdRecovertime;
	}
	
	/**
	 * get the fdConfirmperson 
	 * @return the fdConfirmperson
	 */
	public String getFdConfirmperson() {
		return this.fdConfirmperson;
	}
	
	/**
	 * set the fdConfirmperson 
	 */
	public void setFdConfirmperson(String fdConfirmperson) {
		this.fdConfirmperson = fdConfirmperson;
	}
	
	/**
	 * get the fdCurvalue 
	 * @return the fdCurvalue
	 */
	public String getFdCurvalue() {
		return this.fdCurvalue;
	}
	
	/**
	 * set the fdCurvalue 
	 */
	public void setFdCurvalue(String fdCurvalue) {
		this.fdCurvalue = fdCurvalue;
	}
	
	/**
	 * get the fdAlarmid 
	 * @return the fdAlarmid
	 */
	public Integer getFdAlarmid() {
		return this.fdAlarmid;
	}
	
	/**
	 * set the fdAlarmid 
	 */
	public void setFdAlarmid(Integer fdAlarmid) {
		this.fdAlarmid = fdAlarmid;
	}
	
	/**
	 * get the value from Map
	 */
	public void fromMap(Map map) {
	
		setFdNodename(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("fdNodename")), fdNodename));
		setFdTagname(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("fdTagname")), fdTagname));
		setFdAlarmtype(NumberUtils.toInteger(StringUtils.toString(map.get("fdAlarmtype")), fdAlarmtype));
		setFdOccurtime(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("fdOccurtime")), fdOccurtime));
		setFdStatus(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("fdStatus")), fdStatus));
		setFdTagdesp(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("fdTagdesp")), fdTagdesp));
		setFdEgu(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("fdEgu")), fdEgu));
		setFdClassname(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("fdClassname")), fdClassname));
		setFdSubsystem(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("fdSubsystem")), fdSubsystem));
		setFdCategory(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("fdCategory")), fdCategory));
		setFdPriority(NumberUtils.toInteger(StringUtils.toString(map.get("fdPriority")), fdPriority));
		setFdConfirmtime(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("fdConfirmtime")), fdConfirmtime));
		setFdRecovertime(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("fdRecovertime")), fdRecovertime));
		setFdConfirmperson(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("fdConfirmperson")), fdConfirmperson));
		setFdCurvalue(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("fdCurvalue")), fdCurvalue));
		setFdAlarmid(NumberUtils.toInteger(StringUtils.toString(map.get("fdAlarmid")), fdAlarmid));
	}
	
	/**
	 * set the value to Map
	 */
	public Map toMap() {
		
		Map map = new HashMap();
			map.put("fdNodename",StringUtils.toString(fdNodename, eiMetadata.getMeta("fdNodename")));	
			map.put("fdTagname",StringUtils.toString(fdTagname, eiMetadata.getMeta("fdTagname")));	
			map.put("fdAlarmtype",StringUtils.toString(fdAlarmtype, eiMetadata.getMeta("fdAlarmtype")));	
			map.put("fdOccurtime",StringUtils.toString(fdOccurtime, eiMetadata.getMeta("fdOccurtime")));	
			map.put("fdStatus",StringUtils.toString(fdStatus, eiMetadata.getMeta("fdStatus")));	
			map.put("fdTagdesp",StringUtils.toString(fdTagdesp, eiMetadata.getMeta("fdTagdesp")));	
			map.put("fdEgu",StringUtils.toString(fdEgu, eiMetadata.getMeta("fdEgu")));	
			map.put("fdClassname",StringUtils.toString(fdClassname, eiMetadata.getMeta("fdClassname")));	
			map.put("fdSubsystem",StringUtils.toString(fdSubsystem, eiMetadata.getMeta("fdSubsystem")));	
			map.put("fdCategory",StringUtils.toString(fdCategory, eiMetadata.getMeta("fdCategory")));	
			map.put("fdPriority",StringUtils.toString(fdPriority, eiMetadata.getMeta("fdPriority")));	
			map.put("fdConfirmtime",StringUtils.toString(fdConfirmtime, eiMetadata.getMeta("fdConfirmtime")));	
			map.put("fdRecovertime",StringUtils.toString(fdRecovertime, eiMetadata.getMeta("fdRecovertime")));	
			map.put("fdConfirmperson",StringUtils.toString(fdConfirmperson, eiMetadata.getMeta("fdConfirmperson")));	
			map.put("fdCurvalue",StringUtils.toString(fdCurvalue, eiMetadata.getMeta("fdCurvalue")));	
			map.put("fdAlarmid",StringUtils.toString(fdAlarmid, eiMetadata.getMeta("fdAlarmid")));	
			
		return map;
	
	}
}