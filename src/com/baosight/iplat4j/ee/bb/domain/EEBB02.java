/**
 * Generate time : 2011-07-27 10:56:58
 */
package com.baosight.iplat4j.ee.bb.domain;
import com.baosight.iplat4j.core.ei.EiColumn;
import com.baosight.iplat4j.ep.DaoEPBase;
import java.util.HashMap;
import java.util.Map;
import com.baosight.iplat4j.util.StringUtils;
import com.baosight.iplat4j.util.NumberUtils;

/**
 * EEBB02
 */
public class EEBB02 extends DaoEPBase {

	private String fdate = " "; /*  日期  */
	private String company = " "; /*  公司  */
	private String product = " "; /*  产品  */
	private Long prodQuantity = new Long(0); /*  产品产量  */
	private Long income = new Long(0); /*  营业收入  */
	private Long planIncome = new Long(0); /*  计划营业收入  */
	private Long sumIncome = new Long(0); /*  计划营业收入  */
	/**
	 * initialize the metadata 
	 */
	public void initMetaData() {
		EiColumn eiColumn;
		eiColumn = new EiColumn("fdate");
		eiColumn.setFieldLength(8);	  
		eiColumn.setDescName("日期");
		eiMetadata.addMeta(eiColumn);

		eiColumn = new EiColumn("company");
		eiColumn.setFieldLength(256);	  
		eiColumn.setDescName("公司");
		eiMetadata.addMeta(eiColumn);

		eiColumn = new EiColumn("product");
		eiColumn.setPrimaryKey(true);
		eiColumn.setFieldLength(256);	  
		eiColumn.setDescName("产品");
		eiMetadata.addMeta(eiColumn);

		eiColumn = new EiColumn("prodQuantity");
		eiColumn.setType("N");
		eiColumn.setFieldLength(10);	  
		eiColumn.setDescName("产品产量");
		eiMetadata.addMeta(eiColumn);

		eiColumn = new EiColumn("income");
		eiColumn.setType("N");
		eiColumn.setFieldLength(10);	  
		eiColumn.setDescName("营业收入");
		eiMetadata.addMeta(eiColumn);

		eiColumn = new EiColumn("planIncome");
		eiColumn.setType("N");
		eiColumn.setFieldLength(10);	  
		eiColumn.setDescName("计划营业收入");
		eiMetadata.addMeta(eiColumn);

		eiColumn = new EiColumn("sumIncome");
		eiColumn.setType("N");
		eiColumn.setFieldLength(10);	  
		eiColumn.setDescName("计划营业收入");
		eiMetadata.addMeta(eiColumn);

	}

	/**
	 * the constructor
	 */
	public EEBB02() {
		initMetaData();
	}

	/**
	 * get the fdate   -日期
	 * @return the fdate
	 */
	public String getFdate(){
		return this.fdate;
	}

	/**
	 * set the fdate  -日期
	 */
	public void setFdate(String fdate){
		this.fdate=fdate;
	}

	/**
	 * get the company   -公司
	 * @return the company
	 */
	public String getCompany(){
		return this.company;
	}

	/**
	 * set the company  -公司
	 */
	public void setCompany(String company){
		this.company=company;
	}

	/**
	 * get the product   -产品
	 * @return the product
	 */
	public String getProduct(){
		return this.product;
	}

	/**
	 * set the product  -产品
	 */
	public void setProduct(String product){
		this.product=product;
	}

	/**
	 * get the prodQuantity   -产品产量
	 * @return the prodQuantity
	 */
	public Long getProdQuantity(){
		return this.prodQuantity;
	}

	/**
	 * set the prodQuantity  -产品产量
	 */
	public void setProdQuantity(Long prodQuantity){
		this.prodQuantity=prodQuantity;
	}

	/**
	 * get the income   -营业收入
	 * @return the income
	 */
	public Long getIncome(){
		return this.income;
	}

	/**
	 * set the income  -营业收入
	 */
	public void setIncome(Long income){
		this.income=income;
	}

	/**
	 * get the planIncome   -计划营业收入
	 * @return the planIncome
	 */
	public Long getPlanIncome(){
		return this.planIncome;
	}

	/**
	 * set the planIncome  -计划营业收入
	 */
	public void setPlanIncome(Long planIncome){
		this.planIncome=planIncome;
	}

	/**
	 * get the sumIncome   -计划营业收入
	 * @return the sumIncome
	 */
	public Long getSumIncome(){
		return this.sumIncome;
	}

	/**
	 * set the sumIncome  -计划营业收入
	 */
	public void setSumIncome(Long sumIncome){
		this.sumIncome=sumIncome;
	}

	/**
	 * get the value from Map
	 */
	public void fromMap(Map map) {
		setFdate(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("fdate")), fdate));
		setCompany(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("company")), company));
		setProduct(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("product")), product));
		setProdQuantity(NumberUtils.toLong(StringUtils.toString(map.get("prodQuantity")), prodQuantity));
		setIncome(NumberUtils.toLong(StringUtils.toString(map.get("income")), income));
		setPlanIncome(NumberUtils.toLong(StringUtils.toString(map.get("planIncome")), planIncome));
		setSumIncome(NumberUtils.toLong(StringUtils.toString(map.get("sumIncome")), sumIncome));
	}

	/**
	 * set the value to Map
	 */
	public Map toMap() {
		Map map = new HashMap();
		map.put("fdate", StringUtils.toString(fdate, eiMetadata.getMeta("fdate")));
		map.put("company", StringUtils.toString(company, eiMetadata.getMeta("company")));
		map.put("product", StringUtils.toString(product, eiMetadata.getMeta("product")));
		map.put("prodQuantity", StringUtils.toString(prodQuantity, eiMetadata.getMeta("prodQuantity")));
		map.put("income", StringUtils.toString(income, eiMetadata.getMeta("income")));
		map.put("planIncome", StringUtils.toString(planIncome, eiMetadata.getMeta("planIncome")));
		map.put("sumIncome", StringUtils.toString(sumIncome, eiMetadata.getMeta("sumIncome")));
		return map;
	}
}
