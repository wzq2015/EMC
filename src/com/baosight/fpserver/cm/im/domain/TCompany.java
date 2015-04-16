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
 * TCompany 
 *  
 */
public class TCompany extends DaoEPBase {

	private Integer f_companyId = new Integer(0);		
	private Integer f_areaId = new Integer(0);		
	private Integer f_parentCompanyId = new Integer(0);		
	private String f_companyName = " ";		
	private String f_companyDesc = " ";		
	private String f_companyAddress = " ";		
	private String f_companyAccount = " ";		
	private String f_companyTaxnumber = " ";		
	private String f_companyBank = " ";		
	private String f_companyOrgcode = " ";		
	private String f_companyZipcode = " ";		

	/**
	 * initialize the metadata 
	 */
	public void initMetaData() {
		EiColumn eiColumn;
		
	eiColumn = new EiColumn("f_companyId");
	eiColumn.setPrimaryKey(true);
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("f_areaId");
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("f_parentCompanyId");
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("f_companyName");
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("f_companyDesc");
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("f_companyAddress");
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("f_companyAccount");
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("f_companyTaxnumber");
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("f_companyBank");
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("f_companyOrgcode");
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("f_companyZipcode");
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	

	}
	/**
	 * the constructor
	 */
	public TCompany() {
		initMetaData();
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
	 * get the f_areaId 
	 * @return the f_areaId
	 */
	public Integer getF_areaId() {
		return this.f_areaId;
	}
	
	/**
	 * set the f_areaId 
	 */
	public void setF_areaId(Integer f_areaId) {
		this.f_areaId = f_areaId;
	}
	
	/**
	 * get the f_parentCompanyId 
	 * @return the f_parentCompanyId
	 */
	public Integer getF_parentCompanyId() {
		return this.f_parentCompanyId;
	}
	
	/**
	 * set the f_parentCompanyId 
	 */
	public void setF_parentCompanyId(Integer f_parentCompanyId) {
		this.f_parentCompanyId = f_parentCompanyId;
	}
	
	/**
	 * get the f_companyName 
	 * @return the f_companyName
	 */
	public String getF_companyName() {
		return this.f_companyName;
	}
	
	/**
	 * set the f_companyName 
	 */
	public void setF_companyName(String f_companyName) {
		this.f_companyName = f_companyName;
	}
	
	/**
	 * get the f_companyDesc 
	 * @return the f_companyDesc
	 */
	public String getF_companyDesc() {
		return this.f_companyDesc;
	}
	
	/**
	 * set the f_companyDesc 
	 */
	public void setF_companyDesc(String f_companyDesc) {
		this.f_companyDesc = f_companyDesc;
	}
	
	/**
	 * get the f_companyAddress 
	 * @return the f_companyAddress
	 */
	public String getF_companyAddress() {
		return this.f_companyAddress;
	}
	
	/**
	 * set the f_companyAddress 
	 */
	public void setF_companyAddress(String f_companyAddress) {
		this.f_companyAddress = f_companyAddress;
	}
	
	/**
	 * get the f_companyAccount 
	 * @return the f_companyAccount
	 */
	public String getF_companyAccount() {
		return this.f_companyAccount;
	}
	
	/**
	 * set the f_companyAccount 
	 */
	public void setF_companyAccount(String f_companyAccount) {
		this.f_companyAccount = f_companyAccount;
	}
	
	/**
	 * get the f_companyTaxnumber 
	 * @return the f_companyTaxnumber
	 */
	public String getF_companyTaxnumber() {
		return this.f_companyTaxnumber;
	}
	
	/**
	 * set the f_companyTaxnumber 
	 */
	public void setF_companyTaxnumber(String f_companyTaxnumber) {
		this.f_companyTaxnumber = f_companyTaxnumber;
	}
	
	/**
	 * get the f_companyBank 
	 * @return the f_companyBank
	 */
	public String getF_companyBank() {
		return this.f_companyBank;
	}
	
	/**
	 * set the f_companyBank 
	 */
	public void setF_companyBank(String f_companyBank) {
		this.f_companyBank = f_companyBank;
	}
	
	/**
	 * get the f_companyOrgcode 
	 * @return the f_companyOrgcode
	 */
	public String getF_companyOrgcode() {
		return this.f_companyOrgcode;
	}
	
	/**
	 * set the f_companyOrgcode 
	 */
	public void setF_companyOrgcode(String f_companyOrgcode) {
		this.f_companyOrgcode = f_companyOrgcode;
	}
	
	/**
	 * get the f_companyZipcode 
	 * @return the f_companyZipcode
	 */
	public String getF_companyZipcode() {
		return this.f_companyZipcode;
	}
	
	/**
	 * set the f_companyZipcode 
	 */
	public void setF_companyZipcode(String f_companyZipcode) {
		this.f_companyZipcode = f_companyZipcode;
	}
	
	/**
	 * get the value from Map
	 */
	public void fromMap(Map map) {
	
		setF_companyId(NumberUtils.toInteger(StringUtils.toString(map.get("f_companyId")), f_companyId));
		setF_areaId(NumberUtils.toInteger(StringUtils.toString(map.get("f_areaId")), f_areaId));
		setF_parentCompanyId(NumberUtils.toInteger(StringUtils.toString(map.get("f_parentCompanyId")), f_parentCompanyId));
		setF_companyName(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("f_companyName")), f_companyName));
		setF_companyDesc(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("f_companyDesc")), f_companyDesc));
		setF_companyAddress(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("f_companyAddress")), f_companyAddress));
		setF_companyAccount(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("f_companyAccount")), f_companyAccount));
		setF_companyTaxnumber(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("f_companyTaxnumber")), f_companyTaxnumber));
		setF_companyBank(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("f_companyBank")), f_companyBank));
		setF_companyOrgcode(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("f_companyOrgcode")), f_companyOrgcode));
		setF_companyZipcode(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("f_companyZipcode")), f_companyZipcode));
	}
	
	/**
	 * set the value to Map
	 */
	public Map toMap() {
		
		Map map = new HashMap();
			map.put("f_companyId",StringUtils.toString(f_companyId, eiMetadata.getMeta("f_companyId")));	
			map.put("f_areaId",StringUtils.toString(f_areaId, eiMetadata.getMeta("f_areaId")));	
			map.put("f_parentCompanyId",StringUtils.toString(f_parentCompanyId, eiMetadata.getMeta("f_parentCompanyId")));	
			map.put("f_companyName",StringUtils.toString(f_companyName, eiMetadata.getMeta("f_companyName")));	
			map.put("f_companyDesc",StringUtils.toString(f_companyDesc, eiMetadata.getMeta("f_companyDesc")));	
			map.put("f_companyAddress",StringUtils.toString(f_companyAddress, eiMetadata.getMeta("f_companyAddress")));	
			map.put("f_companyAccount",StringUtils.toString(f_companyAccount, eiMetadata.getMeta("f_companyAccount")));	
			map.put("f_companyTaxnumber",StringUtils.toString(f_companyTaxnumber, eiMetadata.getMeta("f_companyTaxnumber")));	
			map.put("f_companyBank",StringUtils.toString(f_companyBank, eiMetadata.getMeta("f_companyBank")));	
			map.put("f_companyOrgcode",StringUtils.toString(f_companyOrgcode, eiMetadata.getMeta("f_companyOrgcode")));	
			map.put("f_companyZipcode",StringUtils.toString(f_companyZipcode, eiMetadata.getMeta("f_companyZipcode")));	
			
		return map;
	
	}
}