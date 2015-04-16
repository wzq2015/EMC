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
 * TDevice 
 *  
 */
public class TDevice extends DaoEPBase {

	private Integer f_deviceId = new Integer(0);		
	private Integer f_devicegroupId = new Integer(0);		
	private String f_deviceName = " ";		
	private String f_deviceDesc = " ";		
	private String f_devicePosition = " ";		
	private String f_deviceManufacture = " ";		
	private String f_deviceTypenumber = " ";		
	private String f_deviceSerialnumber = " ";		
	private String f_devicePurchasedate = " ";		
	private String f_deviceInstalldate = " ";		
	private String f_deviceWarrantydate = " ";		
	private String f_deviceLastinspectdate = " ";		
	private Integer f_deviceInspectcycle = new Integer(0);		

	/**
	 * initialize the metadata 
	 */
	public void initMetaData() {
		EiColumn eiColumn;
		
	eiColumn = new EiColumn("f_deviceId");
	eiColumn.setPrimaryKey(true);
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("f_devicegroupId");
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("f_deviceName");
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("f_deviceDesc");
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("f_devicePosition");
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("f_deviceManufacture");
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("f_deviceTypenumber");
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("f_deviceSerialnumber");
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("f_devicePurchasedate");
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("f_deviceInstalldate");
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("f_deviceWarrantydate");
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("f_deviceLastinspectdate");
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("f_deviceInspectcycle");
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	

	}
	/**
	 * the constructor
	 */
	public TDevice() {
		initMetaData();
	}
	
	/**
	 * get the f_deviceId 
	 * @return the f_deviceId
	 */
	public Integer getF_deviceId() {
		return this.f_deviceId;
	}
	
	/**
	 * set the f_deviceId 
	 */
	public void setF_deviceId(Integer f_deviceId) {
		this.f_deviceId = f_deviceId;
	}
	
	/**
	 * get the f_devicegroupId 
	 * @return the f_devicegroupId
	 */
	public Integer getF_devicegroupId() {
		return this.f_devicegroupId;
	}
	
	/**
	 * set the f_devicegroupId 
	 */
	public void setF_devicegroupId(Integer f_devicegroupId) {
		this.f_devicegroupId = f_devicegroupId;
	}
	
	/**
	 * get the f_deviceName 
	 * @return the f_deviceName
	 */
	public String getF_deviceName() {
		return this.f_deviceName;
	}
	
	/**
	 * set the f_deviceName 
	 */
	public void setF_deviceName(String f_deviceName) {
		this.f_deviceName = f_deviceName;
	}
	
	/**
	 * get the f_deviceDesc 
	 * @return the f_deviceDesc
	 */
	public String getF_deviceDesc() {
		return this.f_deviceDesc;
	}
	
	/**
	 * set the f_deviceDesc 
	 */
	public void setF_deviceDesc(String f_deviceDesc) {
		this.f_deviceDesc = f_deviceDesc;
	}
	
	/**
	 * get the f_devicePosition 
	 * @return the f_devicePosition
	 */
	public String getF_devicePosition() {
		return this.f_devicePosition;
	}
	
	/**
	 * set the f_devicePosition 
	 */
	public void setF_devicePosition(String f_devicePosition) {
		this.f_devicePosition = f_devicePosition;
	}
	
	/**
	 * get the f_deviceManufacture 
	 * @return the f_deviceManufacture
	 */
	public String getF_deviceManufacture() {
		return this.f_deviceManufacture;
	}
	
	/**
	 * set the f_deviceManufacture 
	 */
	public void setF_deviceManufacture(String f_deviceManufacture) {
		this.f_deviceManufacture = f_deviceManufacture;
	}
	
	/**
	 * get the f_deviceTypenumber 
	 * @return the f_deviceTypenumber
	 */
	public String getF_deviceTypenumber() {
		return this.f_deviceTypenumber;
	}
	
	/**
	 * set the f_deviceTypenumber 
	 */
	public void setF_deviceTypenumber(String f_deviceTypenumber) {
		this.f_deviceTypenumber = f_deviceTypenumber;
	}
	
	/**
	 * get the f_deviceSerialnumber 
	 * @return the f_deviceSerialnumber
	 */
	public String getF_deviceSerialnumber() {
		return this.f_deviceSerialnumber;
	}
	
	/**
	 * set the f_deviceSerialnumber 
	 */
	public void setF_deviceSerialnumber(String f_deviceSerialnumber) {
		this.f_deviceSerialnumber = f_deviceSerialnumber;
	}
	
	/**
	 * get the f_devicePurchasedate 
	 * @return the f_devicePurchasedate
	 */
	public String getF_devicePurchasedate() {
		return this.f_devicePurchasedate;
	}
	
	/**
	 * set the f_devicePurchasedate 
	 */
	public void setF_devicePurchasedate(String f_devicePurchasedate) {
		this.f_devicePurchasedate = f_devicePurchasedate;
	}
	
	/**
	 * get the f_deviceInstalldate 
	 * @return the f_deviceInstalldate
	 */
	public String getF_deviceInstalldate() {
		return this.f_deviceInstalldate;
	}
	
	/**
	 * set the f_deviceInstalldate 
	 */
	public void setF_deviceInstalldate(String f_deviceInstalldate) {
		this.f_deviceInstalldate = f_deviceInstalldate;
	}
	
	/**
	 * get the f_deviceWarrantydate 
	 * @return the f_deviceWarrantydate
	 */
	public String getF_deviceWarrantydate() {
		return this.f_deviceWarrantydate;
	}
	
	/**
	 * set the f_deviceWarrantydate 
	 */
	public void setF_deviceWarrantydate(String f_deviceWarrantydate) {
		this.f_deviceWarrantydate = f_deviceWarrantydate;
	}
	
	/**
	 * get the f_deviceLastinspectdate 
	 * @return the f_deviceLastinspectdate
	 */
	public String getF_deviceLastinspectdate() {
		return this.f_deviceLastinspectdate;
	}
	
	/**
	 * set the f_deviceLastinspectdate 
	 */
	public void setF_deviceLastinspectdate(String f_deviceLastinspectdate) {
		this.f_deviceLastinspectdate = f_deviceLastinspectdate;
	}
	
	/**
	 * get the f_deviceInspectcycle 
	 * @return the f_deviceInspectcycle
	 */
	public Integer getF_deviceInspectcycle() {
		return this.f_deviceInspectcycle;
	}
	
	/**
	 * set the f_deviceInspectcycle 
	 */
	public void setF_deviceInspectcycle(Integer f_deviceInspectcycle) {
		this.f_deviceInspectcycle = f_deviceInspectcycle;
	}
	
	/**
	 * get the value from Map
	 */
	public void fromMap(Map map) {
	
		setF_deviceId(NumberUtils.toInteger(StringUtils.toString(map.get("f_deviceId")), f_deviceId));
		setF_devicegroupId(NumberUtils.toInteger(StringUtils.toString(map.get("f_devicegroupId")), f_devicegroupId));
		setF_deviceName(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("f_deviceName")), f_deviceName));
		setF_deviceDesc(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("f_deviceDesc")), f_deviceDesc));
		setF_devicePosition(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("f_devicePosition")), f_devicePosition));
		setF_deviceManufacture(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("f_deviceManufacture")), f_deviceManufacture));
		setF_deviceTypenumber(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("f_deviceTypenumber")), f_deviceTypenumber));
		setF_deviceSerialnumber(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("f_deviceSerialnumber")), f_deviceSerialnumber));
		setF_devicePurchasedate(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("f_devicePurchasedate")), f_devicePurchasedate));
		setF_deviceInstalldate(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("f_deviceInstalldate")), f_deviceInstalldate));
		setF_deviceWarrantydate(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("f_deviceWarrantydate")), f_deviceWarrantydate));
		setF_deviceLastinspectdate(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("f_deviceLastinspectdate")), f_deviceLastinspectdate));
		setF_deviceInspectcycle(NumberUtils.toInteger(StringUtils.toString(map.get("f_deviceInspectcycle")), f_deviceInspectcycle));
	}
	
	/**
	 * set the value to Map
	 */
	public Map toMap() {
		
		Map map = new HashMap();
			map.put("f_deviceId",StringUtils.toString(f_deviceId, eiMetadata.getMeta("f_deviceId")));	
			map.put("f_devicegroupId",StringUtils.toString(f_devicegroupId, eiMetadata.getMeta("f_devicegroupId")));	
			map.put("f_deviceName",StringUtils.toString(f_deviceName, eiMetadata.getMeta("f_deviceName")));	
			map.put("f_deviceDesc",StringUtils.toString(f_deviceDesc, eiMetadata.getMeta("f_deviceDesc")));	
			map.put("f_devicePosition",StringUtils.toString(f_devicePosition, eiMetadata.getMeta("f_devicePosition")));	
			map.put("f_deviceManufacture",StringUtils.toString(f_deviceManufacture, eiMetadata.getMeta("f_deviceManufacture")));	
			map.put("f_deviceTypenumber",StringUtils.toString(f_deviceTypenumber, eiMetadata.getMeta("f_deviceTypenumber")));	
			map.put("f_deviceSerialnumber",StringUtils.toString(f_deviceSerialnumber, eiMetadata.getMeta("f_deviceSerialnumber")));	
			map.put("f_devicePurchasedate",StringUtils.toString(f_devicePurchasedate, eiMetadata.getMeta("f_devicePurchasedate")));	
			map.put("f_deviceInstalldate",StringUtils.toString(f_deviceInstalldate, eiMetadata.getMeta("f_deviceInstalldate")));	
			map.put("f_deviceWarrantydate",StringUtils.toString(f_deviceWarrantydate, eiMetadata.getMeta("f_deviceWarrantydate")));	
			map.put("f_deviceLastinspectdate",StringUtils.toString(f_deviceLastinspectdate, eiMetadata.getMeta("f_deviceLastinspectdate")));	
			map.put("f_deviceInspectcycle",StringUtils.toString(f_deviceInspectcycle, eiMetadata.getMeta("f_deviceInspectcycle")));	
			
		return map;
	
	}
}