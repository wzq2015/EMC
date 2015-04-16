/**
树控件Demo文件列表：
1. web -> EE -> DM -> EEDM19.jsp										前台页面
2. web -> EE -> DM -> EEDM19.js											前台javascript
3. src -> com.baosight.iplat4j.ee.dm.service.ServiceEEDM19.java			后台服务，实现增删改查的业务逻辑
4. src -> com.baosight.iplat4j.ee.dm.service.ServiceEEDM1901.java		定义如何获取树中的内容
5. src -> com.baosight.iplat4j.ee.dm.domain.EEDM19.java					定义javabean
6. scr -> com.baosight.iplat4j.ee.dm.sql.EEDM19.xml						定义sql语句映射
7. 数据库中iplat.TEE05表													包括公司、产品、规格、合同号、金额字段
*/

package com.baosight.iplat4j.ee.dm.domain;

import java.util.HashMap;
import java.util.Map;

import com.baosight.iplat4j.core.ei.EiColumn;
import com.baosight.iplat4j.ep.DaoEPBase;
import com.baosight.iplat4j.util.StringUtils;

/**
 * @author wuzhanqing
 * @since 2009-06-22
 */
public class EEDM19 extends DaoEPBase {

	private String contractID = " "; /* 协议标识 */
	private String product = " "; /* 商品 */
	private String spec = " "; /* 规格 */
	private String company = " "; /* 公司 */
	private String amount = " "; /* 金额 */

	/**
	 * initialize the metadata
	 */
	public void initMetaData() {
		EiColumn eiColumn;

		eiColumn = new EiColumn("contractID");
		eiColumn.setPrimaryKey(true);
		eiColumn.setFieldLength(16);
		eiColumn.setDescName("协议标识");
		eiMetadata.addMeta(eiColumn);

		eiColumn = new EiColumn("product");
		eiColumn.setFieldLength(16);
		eiColumn.setDescName("商品");
		eiMetadata.addMeta(eiColumn);

		eiColumn = new EiColumn("spec");
		eiColumn.setFieldLength(16);
		eiColumn.setDescName("规格");
		eiMetadata.addMeta(eiColumn);

		eiColumn = new EiColumn("company");
		eiColumn.setFieldLength(1);
		eiColumn.setDescName("公司");
		eiMetadata.addMeta(eiColumn);

		eiColumn = new EiColumn("amount");
		eiColumn.setFieldLength(1);
		eiColumn.setDescName("金额");
		eiMetadata.addMeta(eiColumn);
	}

	/**
	 * the constructor
	 */
	public EEDM19() {
		initMetaData();
	}


	/**
	 * @return the contractID
	 */
	public String getContractID() {
		return contractID;
	}

	/**
	 * @param contractID the contractID to set
	 */
	public void setContractID(String contractID) {
		this.contractID = contractID;
	}

	/**
	 * @return the product
	 */
	public String getProduct() {
		return product;
	}

	/**
	 * @param product the product to set
	 */
	public void setProduct(String product) {
		this.product = product;
	}

	/**
	 * @return the spec
	 */
	public String getSpec() {
		return spec;
	}

	/**
	 * @param spec the spec to set
	 */
	public void setSpec(String spec) {
		this.spec = spec;
	}

	/**
	 * @return the company
	 */
	public String getCompany() {
		return company;
	}

	/**
	 * @param company the company to set
	 */
	public void setCompany(String company) {
		this.company = company;
	}

	/**
	 * @return the amount
	 */
	public String getAmount() {
		return amount;
	}

	/**
	 * @param amount the amount to set
	 */
	public void setAmount(String amount) {
		this.amount = amount;
	}

	
	/**
	 * get the value from Map
	 */
	public void fromMap(Map map) {

		setContractID(StringUtils.defaultIfEmpty(StringUtils.toString(map
				.get("contractID")), contractID));
		setProduct(StringUtils.defaultIfEmpty(StringUtils.toString(map
				.get("product")), product));
		setSpec(StringUtils.defaultIfEmpty(StringUtils.toString(map
				.get("spec")), spec));
		setCompany(StringUtils.defaultIfEmpty(StringUtils.toString(map
				.get("company")), company));
		setAmount(StringUtils.defaultIfEmpty(StringUtils.toString(map
				.get("amount")), amount));
	}

	/**
	 * set the value to Map
	 */
	public Map toMap() {

		Map map = new HashMap();
		map.put("contractID", StringUtils.toString(contractID, eiMetadata
				.getMeta("contractID")));
		map.put("product", StringUtils.toString(product, eiMetadata
				.getMeta("product")));
		map.put("spec", StringUtils.toString(spec, eiMetadata
				.getMeta("spec")));
		map.put("company", StringUtils.toString(company, eiMetadata
				.getMeta("company")));
		map.put("amount", StringUtils.toString(amount, eiMetadata
				.getMeta("amount")));

		return map;
	}
}
