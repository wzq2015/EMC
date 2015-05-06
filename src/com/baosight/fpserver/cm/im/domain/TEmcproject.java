  /**
   * Generate time : 2015-04-30 11:33:18
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
 * TEmcproject 
 *  
 */
public class TEmcproject extends DaoEPBase {

	private Integer f_emcprojectId = new Integer(0);		
	private Integer f_companyId = new Integer(0);		
	private String f_emcprojectName = " ";		
	private String f_emcprojectDesc = " ";		
	private String f_emcprojectAddress = " ";		
	private String f_emcprojectLon = " ";		
	private String f_emcprojectLat = " ";		
	private String f_emcprojectConstructdate = " ";		
	private String f_emcprojectCommissioningdate = " ";		
	private String f_emcprojectResponsible = " ";		
	private String f_emcprojectConstructunit = " ";		
	private String f_emcprojectStartdate = " ";		
	private String f_emcprojectEnddate = " ";		
	private Integer f_emcprojectCycletype = new Integer(0);		
	private Integer f_emcprojectTotalcyclenumber = new Integer(0);		
	private Integer f_emcprojectType = new Integer(0);		
	private String f_emcprojectResEmail = " ";		
	private String f_emcprojectResPhonenumber = " ";		
	private String f_emcprojectCustomerpm = " ";		
	private String f_emcprojectCustomerpmEmail = " ";		
	private String f_emcprojectCustomerpmPhonenumber = " ";		
	private String f_emcprojectInitpage = " ";		
	private Integer f_emcprojectStatus = new Integer(0);		

	/**
	 * initialize the metadata 
	 */
	public void initMetaData() {
		EiColumn eiColumn;
		
	eiColumn = new EiColumn("f_emcprojectId");
	eiColumn.setPrimaryKey(true);
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("f_companyId");
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("f_emcprojectName");
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("f_emcprojectDesc");
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("f_emcprojectAddress");
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("f_emcprojectLon");
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("f_emcprojectLat");
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("f_emcprojectConstructdate");
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("f_emcprojectCommissioningdate");
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("f_emcprojectResponsible");
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("f_emcprojectConstructunit");
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("f_emcprojectStartdate");
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("f_emcprojectEnddate");
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("f_emcprojectCycletype");
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("f_emcprojectTotalcyclenumber");
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("f_emcprojectType");
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("f_emcprojectResEmail");
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("f_emcprojectResPhonenumber");
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("f_emcprojectCustomerpm");
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("f_emcprojectCustomerpmEmail");
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("f_emcprojectCustomerpmPhonenumber");
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("f_emcprojectInitpage");
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("f_emcprojectStatus");
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	

	}
	/**
	 * the constructor
	 */
	public TEmcproject() {
		initMetaData();
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
	 * get the f_companyId 
	 * @return the f_companyId
	 */
	public Integer getF_companyId() {
		return this.f_companyId;
	}
	
	/**
	 * set the f_companyId 
	 */
	public void setF_companyId(Integer f_companyId) {
		this.f_companyId = f_companyId;
	}
	
	/**
	 * get the f_emcprojectName 
	 * @return the f_emcprojectName
	 */
	public String getF_emcprojectName() {
		return this.f_emcprojectName;
	}
	
	/**
	 * set the f_emcprojectName 
	 */
	public void setF_emcprojectName(String f_emcprojectName) {
		this.f_emcprojectName = f_emcprojectName;
	}
	
	/**
	 * get the f_emcprojectDesc 
	 * @return the f_emcprojectDesc
	 */
	public String getF_emcprojectDesc() {
		return this.f_emcprojectDesc;
	}
	
	/**
	 * set the f_emcprojectDesc 
	 */
	public void setF_emcprojectDesc(String f_emcprojectDesc) {
		this.f_emcprojectDesc = f_emcprojectDesc;
	}
	
	/**
	 * get the f_emcprojectAddress 
	 * @return the f_emcprojectAddress
	 */
	public String getF_emcprojectAddress() {
		return this.f_emcprojectAddress;
	}
	
	/**
	 * set the f_emcprojectAddress 
	 */
	public void setF_emcprojectAddress(String f_emcprojectAddress) {
		this.f_emcprojectAddress = f_emcprojectAddress;
	}
	
	/**
	 * get the f_emcprojectLon 
	 * @return the f_emcprojectLon
	 */
	public String getF_emcprojectLon() {
		return this.f_emcprojectLon;
	}
	
	/**
	 * set the f_emcprojectLon 
	 */
	public void setF_emcprojectLon(String f_emcprojectLon) {
		this.f_emcprojectLon = f_emcprojectLon;
	}
	
	/**
	 * get the f_emcprojectLat 
	 * @return the f_emcprojectLat
	 */
	public String getF_emcprojectLat() {
		return this.f_emcprojectLat;
	}
	
	/**
	 * set the f_emcprojectLat 
	 */
	public void setF_emcprojectLat(String f_emcprojectLat) {
		this.f_emcprojectLat = f_emcprojectLat;
	}
	
	/**
	 * get the f_emcprojectConstructdate 
	 * @return the f_emcprojectConstructdate
	 */
	public String getF_emcprojectConstructdate() {
		return this.f_emcprojectConstructdate;
	}
	
	/**
	 * set the f_emcprojectConstructdate 
	 */
	public void setF_emcprojectConstructdate(String f_emcprojectConstructdate) {
		this.f_emcprojectConstructdate = f_emcprojectConstructdate;
	}
	
	/**
	 * get the f_emcprojectCommissioningdate 
	 * @return the f_emcprojectCommissioningdate
	 */
	public String getF_emcprojectCommissioningdate() {
		return this.f_emcprojectCommissioningdate;
	}
	
	/**
	 * set the f_emcprojectCommissioningdate 
	 */
	public void setF_emcprojectCommissioningdate(String f_emcprojectCommissioningdate) {
		this.f_emcprojectCommissioningdate = f_emcprojectCommissioningdate;
	}
	
	/**
	 * get the f_emcprojectResponsible 
	 * @return the f_emcprojectResponsible
	 */
	public String getF_emcprojectResponsible() {
		return this.f_emcprojectResponsible;
	}
	
	/**
	 * set the f_emcprojectResponsible 
	 */
	public void setF_emcprojectResponsible(String f_emcprojectResponsible) {
		this.f_emcprojectResponsible = f_emcprojectResponsible;
	}
	
	/**
	 * get the f_emcprojectConstructunit 
	 * @return the f_emcprojectConstructunit
	 */
	public String getF_emcprojectConstructunit() {
		return this.f_emcprojectConstructunit;
	}
	
	/**
	 * set the f_emcprojectConstructunit 
	 */
	public void setF_emcprojectConstructunit(String f_emcprojectConstructunit) {
		this.f_emcprojectConstructunit = f_emcprojectConstructunit;
	}
	
	/**
	 * get the f_emcprojectStartdate 
	 * @return the f_emcprojectStartdate
	 */
	public String getF_emcprojectStartdate() {
		return this.f_emcprojectStartdate;
	}
	
	/**
	 * set the f_emcprojectStartdate 
	 */
	public void setF_emcprojectStartdate(String f_emcprojectStartdate) {
		this.f_emcprojectStartdate = f_emcprojectStartdate;
	}
	
	/**
	 * get the f_emcprojectEnddate 
	 * @return the f_emcprojectEnddate
	 */
	public String getF_emcprojectEnddate() {
		return this.f_emcprojectEnddate;
	}
	
	/**
	 * set the f_emcprojectEnddate 
	 */
	public void setF_emcprojectEnddate(String f_emcprojectEnddate) {
		this.f_emcprojectEnddate = f_emcprojectEnddate;
	}
	
	/**
	 * get the f_emcprojectCycletype 
	 * @return the f_emcprojectCycletype
	 */
	public Integer getF_emcprojectCycletype() {
		return this.f_emcprojectCycletype;
	}
	
	/**
	 * set the f_emcprojectCycletype 
	 */
	public void setF_emcprojectCycletype(Integer f_emcprojectCycletype) {
		this.f_emcprojectCycletype = f_emcprojectCycletype;
	}
	
	/**
	 * get the f_emcprojectTotalcyclenumber 
	 * @return the f_emcprojectTotalcyclenumber
	 */
	public Integer getF_emcprojectTotalcyclenumber() {
		return this.f_emcprojectTotalcyclenumber;
	}
	
	/**
	 * set the f_emcprojectTotalcyclenumber 
	 */
	public void setF_emcprojectTotalcyclenumber(Integer f_emcprojectTotalcyclenumber) {
		this.f_emcprojectTotalcyclenumber = f_emcprojectTotalcyclenumber;
	}
	
	/**
	 * get the f_emcprojectType 
	 * @return the f_emcprojectType
	 */
	public Integer getF_emcprojectType() {
		return this.f_emcprojectType;
	}
	
	/**
	 * set the f_emcprojectType 
	 */
	public void setF_emcprojectType(Integer f_emcprojectType) {
		this.f_emcprojectType = f_emcprojectType;
	}
	
	/**
	 * get the f_emcprojectResEmail 
	 * @return the f_emcprojectResEmail
	 */
	public String getF_emcprojectResEmail() {
		return this.f_emcprojectResEmail;
	}
	
	/**
	 * set the f_emcprojectResEmail 
	 */
	public void setF_emcprojectResEmail(String f_emcprojectResEmail) {
		this.f_emcprojectResEmail = f_emcprojectResEmail;
	}
	
	/**
	 * get the f_emcprojectResPhonenumber 
	 * @return the f_emcprojectResPhonenumber
	 */
	public String getF_emcprojectResPhonenumber() {
		return this.f_emcprojectResPhonenumber;
	}
	
	/**
	 * set the f_emcprojectResPhonenumber 
	 */
	public void setF_emcprojectResPhonenumber(String f_emcprojectResPhonenumber) {
		this.f_emcprojectResPhonenumber = f_emcprojectResPhonenumber;
	}
	
	/**
	 * get the f_emcprojectCustomerpm 
	 * @return the f_emcprojectCustomerpm
	 */
	public String getF_emcprojectCustomerpm() {
		return this.f_emcprojectCustomerpm;
	}
	
	/**
	 * set the f_emcprojectCustomerpm 
	 */
	public void setF_emcprojectCustomerpm(String f_emcprojectCustomerpm) {
		this.f_emcprojectCustomerpm = f_emcprojectCustomerpm;
	}
	
	/**
	 * get the f_emcprojectCustomerpmEmail 
	 * @return the f_emcprojectCustomerpmEmail
	 */
	public String getF_emcprojectCustomerpmEmail() {
		return this.f_emcprojectCustomerpmEmail;
	}
	
	/**
	 * set the f_emcprojectCustomerpmEmail 
	 */
	public void setF_emcprojectCustomerpmEmail(String f_emcprojectCustomerpmEmail) {
		this.f_emcprojectCustomerpmEmail = f_emcprojectCustomerpmEmail;
	}
	
	/**
	 * get the f_emcprojectCustomerpmPhonenumber 
	 * @return the f_emcprojectCustomerpmPhonenumber
	 */
	public String getF_emcprojectCustomerpmPhonenumber() {
		return this.f_emcprojectCustomerpmPhonenumber;
	}
	
	/**
	 * set the f_emcprojectCustomerpmPhonenumber 
	 */
	public void setF_emcprojectCustomerpmPhonenumber(String f_emcprojectCustomerpmPhonenumber) {
		this.f_emcprojectCustomerpmPhonenumber = f_emcprojectCustomerpmPhonenumber;
	}
	
	/**
	 * get the f_emcprojectInitpage 
	 * @return the f_emcprojectInitpage
	 */
	public String getF_emcprojectInitpage() {
		return this.f_emcprojectInitpage;
	}
	
	/**
	 * set the f_emcprojectInitpage 
	 */
	public void setF_emcprojectInitpage(String f_emcprojectInitpage) {
		this.f_emcprojectInitpage = f_emcprojectInitpage;
	}
	
	/**
	 * get the f_emcprojectStatus 
	 * @return the f_emcprojectStatus
	 */
	public Integer getF_emcprojectStatus() {
		return this.f_emcprojectStatus;
	}
	
	/**
	 * set the f_emcprojectStatus 
	 */
	public void setF_emcprojectStatus(Integer f_emcprojectStatus) {
		this.f_emcprojectStatus = f_emcprojectStatus;
	}
	
	/**
	 * get the value from Map
	 */
	public void fromMap(Map map) {
	
		setF_emcprojectId(NumberUtils.toInteger(StringUtils.toString(map.get("f_emcprojectId")), f_emcprojectId));
		setF_companyId(NumberUtils.toInteger(StringUtils.toString(map.get("f_companyId")), f_companyId));
		setF_emcprojectName(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("f_emcprojectName")), f_emcprojectName));
		setF_emcprojectDesc(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("f_emcprojectDesc")), f_emcprojectDesc));
		setF_emcprojectAddress(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("f_emcprojectAddress")), f_emcprojectAddress));
		setF_emcprojectLon(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("f_emcprojectLon")), f_emcprojectLon));
		setF_emcprojectLat(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("f_emcprojectLat")), f_emcprojectLat));
		setF_emcprojectConstructdate(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("f_emcprojectConstructdate")), f_emcprojectConstructdate));
		setF_emcprojectCommissioningdate(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("f_emcprojectCommissioningdate")), f_emcprojectCommissioningdate));
		setF_emcprojectResponsible(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("f_emcprojectResponsible")), f_emcprojectResponsible));
		setF_emcprojectConstructunit(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("f_emcprojectConstructunit")), f_emcprojectConstructunit));
		setF_emcprojectStartdate(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("f_emcprojectStartdate")), f_emcprojectStartdate));
		setF_emcprojectEnddate(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("f_emcprojectEnddate")), f_emcprojectEnddate));
		setF_emcprojectCycletype(NumberUtils.toInteger(StringUtils.toString(map.get("f_emcprojectCycletype")), f_emcprojectCycletype));
		setF_emcprojectTotalcyclenumber(NumberUtils.toInteger(StringUtils.toString(map.get("f_emcprojectTotalcyclenumber")), f_emcprojectTotalcyclenumber));
		setF_emcprojectType(NumberUtils.toInteger(StringUtils.toString(map.get("f_emcprojectType")), f_emcprojectType));
		setF_emcprojectResEmail(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("f_emcprojectResEmail")), f_emcprojectResEmail));
		setF_emcprojectResPhonenumber(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("f_emcprojectResPhonenumber")), f_emcprojectResPhonenumber));
		setF_emcprojectCustomerpm(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("f_emcprojectCustomerpm")), f_emcprojectCustomerpm));
		setF_emcprojectCustomerpmEmail(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("f_emcprojectCustomerpmEmail")), f_emcprojectCustomerpmEmail));
		setF_emcprojectCustomerpmPhonenumber(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("f_emcprojectCustomerpmPhonenumber")), f_emcprojectCustomerpmPhonenumber));
		setF_emcprojectInitpage(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("f_emcprojectInitpage")), f_emcprojectInitpage));
		setF_emcprojectStatus(NumberUtils.toInteger(StringUtils.toString(map.get("f_emcprojectStatus")), f_emcprojectStatus));
	}
	
	/**
	 * set the value to Map
	 */
	public Map toMap() {
		
		Map map = new HashMap();
			map.put("f_emcprojectId",StringUtils.toString(f_emcprojectId, eiMetadata.getMeta("f_emcprojectId")));	
			map.put("f_companyId",StringUtils.toString(f_companyId, eiMetadata.getMeta("f_companyId")));	
			map.put("f_emcprojectName",StringUtils.toString(f_emcprojectName, eiMetadata.getMeta("f_emcprojectName")));	
			map.put("f_emcprojectDesc",StringUtils.toString(f_emcprojectDesc, eiMetadata.getMeta("f_emcprojectDesc")));	
			map.put("f_emcprojectAddress",StringUtils.toString(f_emcprojectAddress, eiMetadata.getMeta("f_emcprojectAddress")));	
			map.put("f_emcprojectLon",StringUtils.toString(f_emcprojectLon, eiMetadata.getMeta("f_emcprojectLon")));	
			map.put("f_emcprojectLat",StringUtils.toString(f_emcprojectLat, eiMetadata.getMeta("f_emcprojectLat")));	
			map.put("f_emcprojectConstructdate",StringUtils.toString(f_emcprojectConstructdate, eiMetadata.getMeta("f_emcprojectConstructdate")));	
			map.put("f_emcprojectCommissioningdate",StringUtils.toString(f_emcprojectCommissioningdate, eiMetadata.getMeta("f_emcprojectCommissioningdate")));	
			map.put("f_emcprojectResponsible",StringUtils.toString(f_emcprojectResponsible, eiMetadata.getMeta("f_emcprojectResponsible")));	
			map.put("f_emcprojectConstructunit",StringUtils.toString(f_emcprojectConstructunit, eiMetadata.getMeta("f_emcprojectConstructunit")));	
			map.put("f_emcprojectStartdate",StringUtils.toString(f_emcprojectStartdate, eiMetadata.getMeta("f_emcprojectStartdate")));	
			map.put("f_emcprojectEnddate",StringUtils.toString(f_emcprojectEnddate, eiMetadata.getMeta("f_emcprojectEnddate")));	
			map.put("f_emcprojectCycletype",StringUtils.toString(f_emcprojectCycletype, eiMetadata.getMeta("f_emcprojectCycletype")));	
			map.put("f_emcprojectTotalcyclenumber",StringUtils.toString(f_emcprojectTotalcyclenumber, eiMetadata.getMeta("f_emcprojectTotalcyclenumber")));	
			map.put("f_emcprojectType",StringUtils.toString(f_emcprojectType, eiMetadata.getMeta("f_emcprojectType")));	
			map.put("f_emcprojectResEmail",StringUtils.toString(f_emcprojectResEmail, eiMetadata.getMeta("f_emcprojectResEmail")));	
			map.put("f_emcprojectResPhonenumber",StringUtils.toString(f_emcprojectResPhonenumber, eiMetadata.getMeta("f_emcprojectResPhonenumber")));	
			map.put("f_emcprojectCustomerpm",StringUtils.toString(f_emcprojectCustomerpm, eiMetadata.getMeta("f_emcprojectCustomerpm")));	
			map.put("f_emcprojectCustomerpmEmail",StringUtils.toString(f_emcprojectCustomerpmEmail, eiMetadata.getMeta("f_emcprojectCustomerpmEmail")));	
			map.put("f_emcprojectCustomerpmPhonenumber",StringUtils.toString(f_emcprojectCustomerpmPhonenumber, eiMetadata.getMeta("f_emcprojectCustomerpmPhonenumber")));	
			map.put("f_emcprojectInitpage",StringUtils.toString(f_emcprojectInitpage, eiMetadata.getMeta("f_emcprojectInitpage")));	
			map.put("f_emcprojectStatus",StringUtils.toString(f_emcprojectStatus, eiMetadata.getMeta("f_emcprojectStatus")));	
			
		return map;
	
	}
}