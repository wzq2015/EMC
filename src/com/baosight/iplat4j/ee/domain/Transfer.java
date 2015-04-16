  /**
   * Generate time : 2008-06-04 11:03:52
   * Version : 1.0.1.V20070727
   */
package com.baosight.iplat4j.ee.domain;

import java.math.BigDecimal;
import com.baosight.iplat4j.util.NumberUtils;
import com.baosight.iplat4j.core.ei.EiColumn;
import com.baosight.iplat4j.ep.DaoEPBase;
import java.util.HashMap;
import java.util.Map;
import com.baosight.iplat4j.util.StringUtils;
/**
 * Transfer 
 *  
 */
public class Transfer extends DaoEPBase {

	private String transferid = " ";		/* 转帐ID*/
	private String sourceaccount = " ";		/* 源帐户*/
	private String destinationaccount = " ";		/* 目的帐户*/
	private BigDecimal amount = new BigDecimal("0");		/* 金额*/
	private String description = " ";		/* 描述*/

	/**
	 * initialize the metadata 
	 */
	public void initMetaData() {
		EiColumn eiColumn;
		
	eiColumn = new EiColumn("transferid");
	eiColumn.setPrimaryKey(true);
	eiColumn.setFieldLength(50);	
	eiColumn.setDescName("转帐ID");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("sourceaccount");
	eiColumn.setFieldLength(50);	
	eiColumn.setDescName("源帐户");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("destinationaccount");
	eiColumn.setFieldLength(50);	
	eiColumn.setDescName("目的帐户");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("amount");
	eiColumn.setType("N");
	eiColumn.setScaleLength(2);
	eiColumn.setFieldLength(18);
	eiColumn.setDescName("金额");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("description");
	eiColumn.setFieldLength(50);	
	eiColumn.setDescName("描述");
	eiMetadata.addMeta(eiColumn);
	

	}
	/**
	 * the constructor
	 */
	public Transfer() {
		initMetaData();
	}
	
	/**
	 * get the transferid - 转帐ID
	 * @return the transferid
	 */
	public String getTransferid() {
		return this.transferid;
	}
	
	/**
	 * set the transferid - 转帐ID
	 */
	public void setTransferid(String transferid) {
		this.transferid = transferid;
	}
	
	/**
	 * get the sourceaccount - 源帐户
	 * @return the sourceaccount
	 */
	public String getSourceaccount() {
		return this.sourceaccount;
	}
	
	/**
	 * set the sourceaccount - 源帐户
	 */
	public void setSourceaccount(String sourceaccount) {
		this.sourceaccount = sourceaccount;
	}
	
	/**
	 * get the destinationaccount - 目的帐户
	 * @return the destinationaccount
	 */
	public String getDestinationaccount() {
		return this.destinationaccount;
	}
	
	/**
	 * set the destinationaccount - 目的帐户
	 */
	public void setDestinationaccount(String destinationaccount) {
		this.destinationaccount = destinationaccount;
	}
	
	/**
	 * get the amount - 金额
	 * @return the amount
	 */
	public BigDecimal getAmount() {
		return this.amount;
	}
	
	/**
	 * set the amount - 金额
	 */
	public void setAmount(BigDecimal amount) {
		this.amount = amount;
	}
	
	/**
	 * get the description - 描述
	 * @return the description
	 */
	public String getDescription() {
		return this.description;
	}
	
	/**
	 * set the description - 描述
	 */
	public void setDescription(String description) {
		this.description = description;
	}
	
	/**
	 * get the value from Map
	 */
	public void fromMap(Map map) {
	
		setTransferid(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("transferid")), transferid));
		setSourceaccount(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("sourceaccount")), sourceaccount));
		setDestinationaccount(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("destinationaccount")), destinationaccount));
		setAmount(NumberUtils.toBigDecimal(StringUtils.toString(map.get("amount")), amount));
		setDescription(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("description")), description));
	}
	
	/**
	 * set the value to Map
	 */
	public Map toMap() {
		
		Map map = new HashMap();
			map.put("transferid",StringUtils.toString(transferid, eiMetadata.getMeta("transferid")));	
			map.put("sourceaccount",StringUtils.toString(sourceaccount, eiMetadata.getMeta("sourceaccount")));	
			map.put("destinationaccount",StringUtils.toString(destinationaccount, eiMetadata.getMeta("destinationaccount")));	
			map.put("amount",StringUtils.toString(amount, eiMetadata.getMeta("amount")));	
			map.put("description",StringUtils.toString(description, eiMetadata.getMeta("description")));	
			
		return map;
	
	}
}