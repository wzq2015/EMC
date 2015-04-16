  /**
   * Generate time : 2008-07-22 13:30:25
   * Version : 1.0.1.V20070717
   */
package com.baosight.iplat4j.common.ee.domain;

import com.baosight.iplat4j.core.ei.EiColumn;
import com.baosight.iplat4j.ep.DaoEPBase;
import java.util.HashMap;
import java.util.Map;
import com.baosight.iplat4j.util.StringUtils;
/**
 * TEENT01 
 *  
 */
public class TEENT01 extends DaoEPBase {

	private String customerid = " ";		/* 客户ID*/
	private String firstname = " ";		/* 姓*/
	private String lastname = " ";		/* 名*/
	private String middleinitial = " ";		/* MIDDLE*/
	private String ssnumber = " ";		/* NUMBER*/
	private String mothermaidenname = " ";		/* 国籍*/
	private String customerlevel = " ";		/* 客户水平*/

	/**
	 * initialize the metadata 
	 */
	public void initMetaData() {
		EiColumn eiColumn;
		
	eiColumn = new EiColumn("customerid");
	eiColumn.setPrimaryKey(true);
	eiColumn.setFieldLength(255);	
	eiColumn.setDescName("客户ID");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("firstname");
	eiColumn.setFieldLength(64);	
	eiColumn.setDescName("姓");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("lastname");
	eiColumn.setFieldLength(64);	
	eiColumn.setDescName("名");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("middleinitial");
	eiColumn.setFieldLength(1);	
	eiColumn.setDescName("MIDDLE");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("ssnumber");
	eiColumn.setFieldLength(6);	
	eiColumn.setDescName("NUMBER");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("mothermaidenname");
	eiColumn.setFieldLength(64);	
	eiColumn.setDescName("国籍");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("customerlevel");
	eiColumn.setFieldLength(16);	
	eiColumn.setDescName("客户水平");
	eiMetadata.addMeta(eiColumn);
	

	}
	/**
	 * the constructor
	 */
	public TEENT01() {
		initMetaData();
	}
	
	/**
	 * get the customerid - 客户ID
	 * @return the customerid
	 */
	public String getCustomerid() {
		return this.customerid;
	}
	
	/**
	 * set the customerid - 客户ID
	 */
	public void setCustomerid(String customerid) {
		this.customerid = customerid;
	}
	
	/**
	 * get the firstname - 姓
	 * @return the firstname
	 */
	public String getFirstname() {
		return this.firstname;
	}
	
	/**
	 * set the firstname - 姓
	 */
	public void setFirstname(String firstname) {
		this.firstname = firstname;
	}
	
	/**
	 * get the lastname - 名
	 * @return the lastname
	 */
	public String getLastname() {
		return this.lastname;
	}
	
	/**
	 * set the lastname - 名
	 */
	public void setLastname(String lastname) {
		this.lastname = lastname;
	}
	
	/**
	 * get the middleinitial - MIDDLE
	 * @return the middleinitial
	 */
	public String getMiddleinitial() {
		return this.middleinitial;
	}
	
	/**
	 * set the middleinitial - MIDDLE
	 */
	public void setMiddleinitial(String middleinitial) {
		this.middleinitial = middleinitial;
	}
	
	/**
	 * get the ssnumber - NUMBER
	 * @return the ssnumber
	 */
	public String getSsnumber() {
		return this.ssnumber;
	}
	
	/**
	 * set the ssnumber - NUMBER
	 */
	public void setSsnumber(String ssnumber) {
		this.ssnumber = ssnumber;
	}
	
	/**
	 * get the mothermaidenname - 国籍
	 * @return the mothermaidenname
	 */
	public String getMothermaidenname() {
		return this.mothermaidenname;
	}
	
	/**
	 * set the mothermaidenname - 国籍
	 */
	public void setMothermaidenname(String mothermaidenname) {
		this.mothermaidenname = mothermaidenname;
	}
	
	/**
	 * get the customerlevel - 客户水平
	 * @return the customerlevel
	 */
	public String getCustomerlevel() {
		return this.customerlevel;
	}
	
	/**
	 * set the customerlevel - 客户水平
	 */
	public void setCustomerlevel(String customerlevel) {
		this.customerlevel = customerlevel;
	}
	
	/**
	 * get the value from Map
	 */
	public void fromMap(Map map) {
	
		setCustomerid(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("customerid")), customerid));
		setFirstname(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("firstname")), firstname));
		setLastname(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("lastname")), lastname));
		setMiddleinitial(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("middleinitial")), middleinitial));
		setSsnumber(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("ssnumber")), ssnumber));
		setMothermaidenname(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("mothermaidenname")), mothermaidenname));
		setCustomerlevel(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("customerlevel")), customerlevel));
	}
	
	/**
	 * set the value to Map
	 */
	public Map toMap() {
		
		Map map = new HashMap();
			map.put("customerid",StringUtils.toString(customerid, eiMetadata.getMeta("customerid")));	
			map.put("firstname",StringUtils.toString(firstname, eiMetadata.getMeta("firstname")));	
			map.put("lastname",StringUtils.toString(lastname, eiMetadata.getMeta("lastname")));	
			map.put("middleinitial",StringUtils.toString(middleinitial, eiMetadata.getMeta("middleinitial")));	
			map.put("ssnumber",StringUtils.toString(ssnumber, eiMetadata.getMeta("ssnumber")));	
			map.put("mothermaidenname",StringUtils.toString(mothermaidenname, eiMetadata.getMeta("mothermaidenname")));	
			map.put("customerlevel",StringUtils.toString(customerlevel, eiMetadata.getMeta("customerlevel")));	
			
		return map;
	
	}
}