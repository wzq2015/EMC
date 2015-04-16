  /**
   * Generate time : 2008-07-18 10:18:14
   * Version : 1.0.1.V20070727
   */
package com.baosight.iplat4j.common.ee.domain;

import com.baosight.iplat4j.core.ei.EiColumn;
import com.baosight.iplat4j.ep.DaoEPBase;
import java.util.HashMap;
import java.util.Map;
import com.baosight.iplat4j.util.StringUtils;
/**
 * TEEDM04 
 * table comment : 产品信息表 
 */
public class TEEDM04 extends DaoEPBase {

	private String productCode = " ";		/* 产品代号*/
	private String productName = " ";		/* 产品名称*/
	private String companyCode = " ";		/* 公司代号*/
	private String productPrice = " ";		/* 价格*/
	private String isproduced = " ";		/* 是否生产*/

	/**
	 * initialize the metadata 
	 */
	public void initMetaData() {
		EiColumn eiColumn;
		
	eiColumn = new EiColumn("productCode");
	eiColumn.setPrimaryKey(true);
	eiColumn.setFieldLength(255);	
	eiColumn.setDescName("产品代号");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("productName");
	eiColumn.setFieldLength(255);	
	eiColumn.setDescName("产品名称");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("companyCode");
	eiColumn.setFieldLength(255);	
	eiColumn.setDescName("公司代号");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("productPrice");
	eiColumn.setFieldLength(255);	
	eiColumn.setDescName("价格");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("isproduced");
	eiColumn.setFieldLength(10);	
	eiColumn.setDescName("是否生产");
	eiMetadata.addMeta(eiColumn);
	

	}
	/**
	 * the constructor
	 */
	public TEEDM04() {
		initMetaData();
	}
	
	/**
	 * get the productCode - 产品代号
	 * @return the productCode
	 */
	public String getProductCode() {
		return this.productCode;
	}
	
	/**
	 * set the productCode - 产品代号
	 */
	public void setProductCode(String productCode) {
		this.productCode = productCode;
	}
	
	/**
	 * get the productName - 产品名称
	 * @return the productName
	 */
	public String getProductName() {
		return this.productName;
	}
	
	/**
	 * set the productName - 产品名称
	 */
	public void setProductName(String productName) {
		this.productName = productName;
	}
	
	/**
	 * get the companyCode - 公司代号
	 * @return the companyCode
	 */
	public String getCompanyCode() {
		return this.companyCode;
	}
	
	/**
	 * set the companyCode - 公司代号
	 */
	public void setCompanyCode(String companyCode) {
		this.companyCode = companyCode;
	}
	
	/**
	 * get the productPrice - 价格
	 * @return the productPrice
	 */
	public String getProductPrice() {
		return this.productPrice;
	}
	
	/**
	 * set the productPrice - 价格
	 */
	public void setProductPrice(String productPrice) {
		this.productPrice = productPrice;
	}
	
	/**
	 * get the isproduced - 是否生产
	 * @return the isproduced
	 */
	public String getIsproduced() {
		return this.isproduced;
	}
	
	/**
	 * set the isproduced - 是否生产
	 */
	public void setIsproduced(String isproduced) {
		this.isproduced = isproduced;
	}
	
	/**
	 * get the value from Map
	 */
	public void fromMap(Map map) {
	
		setProductCode(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("productCode")), productCode));
		setProductName(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("productName")), productName));
		setCompanyCode(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("companyCode")), companyCode));
		setProductPrice(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("productPrice")), productPrice));
		setIsproduced(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("isproduced")), isproduced));
	}
	
	/**
	 * set the value to Map
	 */
	public Map toMap() {
		
		Map map = new HashMap();
			map.put("productCode",StringUtils.toString(productCode, eiMetadata.getMeta("productCode")));	
			map.put("productName",StringUtils.toString(productName, eiMetadata.getMeta("productName")));	
			map.put("companyCode",StringUtils.toString(companyCode, eiMetadata.getMeta("companyCode")));	
			map.put("productPrice",StringUtils.toString(productPrice, eiMetadata.getMeta("productPrice")));	
			map.put("isproduced",StringUtils.toString(isproduced, eiMetadata.getMeta("isproduced")));	
			
		return map;
	
	}
}