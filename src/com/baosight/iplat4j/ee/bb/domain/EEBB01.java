/**
 * Generate time : 2011-07-26 16:40:59
 */
package com.baosight.iplat4j.ee.bb.domain;
import com.baosight.iplat4j.core.ei.EiColumn;
import com.baosight.iplat4j.ep.DaoEPBase;
import java.util.HashMap;
import java.util.Map;
import com.baosight.iplat4j.util.StringUtils;

/**
 * EEBB01
 */
public class EEBB01 extends DaoEPBase {

	private String companyCode = " "; /*  公司代号  */
	private String companyName = " "; /*  公司名称  */
	private String companyTel = " "; /*  公司电话  */
	private String companyAddr = " "; /*  公司地址  */
	private String countryCode = " "; /*  国家代号  */
	private String companyDate = " "; /*  成立日期  */
	/**
	 * initialize the metadata 
	 */
	public void initMetaData() {
		EiColumn eiColumn;
		eiColumn = new EiColumn("companyCode");
		eiColumn.setPrimaryKey(true);
		eiColumn.setFieldLength(255);	  
		eiColumn.setDescName("公司代号");
		eiMetadata.addMeta(eiColumn);

		eiColumn = new EiColumn("companyName");
		eiColumn.setFieldLength(255);	  
		eiColumn.setDescName("公司名称");
		eiMetadata.addMeta(eiColumn);

		eiColumn = new EiColumn("companyTel");
		eiColumn.setFieldLength(255);	  
		eiColumn.setDescName("公司电话");
		eiMetadata.addMeta(eiColumn);

		eiColumn = new EiColumn("companyAddr");
		eiColumn.setFieldLength(255);	  
		eiColumn.setDescName("公司地址");
		eiMetadata.addMeta(eiColumn);

		eiColumn = new EiColumn("countryCode");
		eiColumn.setFieldLength(255);	  
		eiColumn.setDescName("国家代号");
		eiMetadata.addMeta(eiColumn);

		eiColumn = new EiColumn("companyDate");
		eiColumn.setFieldLength(255);	  
		eiColumn.setDescName("成立日期");
		eiMetadata.addMeta(eiColumn);

	}

	/**
	 * the constructor
	 */
	public EEBB01() {
		initMetaData();
	}

	/**
	 * get the companyCode   -公司代号
	 * @return the companyCode
	 */
	public String getCompanyCode(){
		return this.companyCode;
	}

	/**
	 * set the companyCode  -公司代号
	 */
	public void setCompanyCode(String companyCode){
		this.companyCode=companyCode;
	}

	/**
	 * get the companyName   -公司名称
	 * @return the companyName
	 */
	public String getCompanyName(){
		return this.companyName;
	}

	/**
	 * set the companyName  -公司名称
	 */
	public void setCompanyName(String companyName){
		this.companyName=companyName;
	}

	/**
	 * get the companyTel   -公司电话
	 * @return the companyTel
	 */
	public String getCompanyTel(){
		return this.companyTel;
	}

	/**
	 * set the companyTel  -公司电话
	 */
	public void setCompanyTel(String companyTel){
		this.companyTel=companyTel;
	}

	/**
	 * get the companyAddr   -公司地址
	 * @return the companyAddr
	 */
	public String getCompanyAddr(){
		return this.companyAddr;
	}

	/**
	 * set the companyAddr  -公司地址
	 */
	public void setCompanyAddr(String companyAddr){
		this.companyAddr=companyAddr;
	}

	/**
	 * get the countryCode   -国家代号
	 * @return the countryCode
	 */
	public String getCountryCode(){
		return this.countryCode;
	}

	/**
	 * set the countryCode  -国家代号
	 */
	public void setCountryCode(String countryCode){
		this.countryCode=countryCode;
	}

	/**
	 * get the companyDate   -成立日期
	 * @return the companyDate
	 */
	public String getCompanyDate(){
		return this.companyDate;
	}

	/**
	 * set the companyDate  -成立日期
	 */
	public void setCompanyDate(String companyDate){
		this.companyDate=companyDate;
	}

	/**
	 * get the value from Map
	 */
	public void fromMap(Map map) {
		setCompanyCode(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("companyCode")), companyCode));
		setCompanyName(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("companyName")), companyName));
		setCompanyTel(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("companyTel")), companyTel));
		setCompanyAddr(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("companyAddr")), companyAddr));
		setCountryCode(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("countryCode")), countryCode));
		setCompanyDate(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("companyDate")), companyDate));
	}

	/**
	 * set the value to Map
	 */
	public Map toMap() {
		Map map = new HashMap();
		map.put("companyCode", StringUtils.toString(companyCode, eiMetadata.getMeta("companyCode")));
		map.put("companyName", StringUtils.toString(companyName, eiMetadata.getMeta("companyName")));
		map.put("companyTel", StringUtils.toString(companyTel, eiMetadata.getMeta("companyTel")));
		map.put("companyAddr", StringUtils.toString(companyAddr, eiMetadata.getMeta("companyAddr")));
		map.put("countryCode", StringUtils.toString(countryCode, eiMetadata.getMeta("countryCode")));
		map.put("companyDate", StringUtils.toString(companyDate, eiMetadata.getMeta("companyDate")));
		return map;
	}
}
