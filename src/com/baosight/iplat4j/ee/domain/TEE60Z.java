package com.baosight.iplat4j.ee.domain;

import com.baosight.iplat4j.core.ei.EiColumn;
import com.baosight.iplat4j.ep.DaoEPBase;
import java.util.HashMap;
import java.util.Map;
/**
 * TEE60 
 */
public class TEE60Z extends DaoEPBase {
	private Double number1;
	private Double number2;
	private Double number3;
	private Double number4;
	private Double number5;
	private Double number6;
	
	private String form_ename = "";
	private String form_cname = "";

	public String getForm_cname() {
		return form_cname;
	}
	public void setForm_cname(String form_cname) {
		this.form_cname = form_cname;
	}
	public String getForm_ename() {
		return form_ename;
	}
	public void setForm_ename(String form_ename) {
		this.form_ename = form_ename;
	}
	/**
	 * initialize the metadata 
	 */
	public void initMetaData() {
		EiColumn eiColumn;
		
	eiColumn = new EiColumn("number1");
	eiColumn.setPrimaryKey(true);
	eiColumn.setDescName("数值1");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("number2");
	eiColumn.setDescName("数值2");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("number3");
	eiColumn.setDescName("数值3");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("number4");
	eiColumn.setDescName("数值4");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("number5");
	eiColumn.setDescName("数值5");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("number6");
	eiColumn.setDescName("数值6");
	eiMetadata.addMeta(eiColumn);
	

	}
	/**
	 * the constructor
	 */
	public TEE60Z() {
		initMetaData();
	}
	
	/**
	 * get the number1
	 * @return the number1
	 */
	public Double getNumber1() {
		return this.number1;
	}
	
	/**
	 * set the number1
	 */
	public void setNumber1(Double number1) {
		this.number1 = number1;
	}
	
	/**
	 * get the number2
	 * @return the number2
	 */
	public Double getNumber2() {
		return this.number2;
	}
	
	/**
	 * set the number2
	 */
	public void setNumber2(Double number2) {
		this.number2 = number2;
	}
	
	/**
	 * get the number3
	 * @return the number3
	 */
	public Double getNumber3() {
		return this.number3;
	}
	
	/**
	 * set the number3
	 */
	public void setNumber3(Double number3) {
		this.number3 = number3;
	}
	
	/**
	 * get the number4
	 * @return the number4
	 */
	public Double getNumber4() {
		return this.number4;
	}
	
	/**
	 * set the number4
	 */
	public void setNumber4(Double number4) {
		this.number4 = number4;
	}
	
	/**
	 * get the number5
	 * @return the number5
	 */
	public Double getNumber5() {
		return this.number5;
	}
	
	/**
	 * set the number5
	 */
	public void setNumber5(Double number5) {
		this.number5 = number5;
	}
	
	/**
	 * get the number6
	 * @return the number6
	 */
	public Double getNumber6() {
		return this.number6;
	}
	
	/**
	 * set the number6
	 */
	public void setNumber6(Double number6) {
		this.number6 = number6;
	}
	
	/**
	 * get the value from Map
	 */
	public void fromMap(Map map) {
	
		setNumber1(Double.valueOf((String)map.get("number1")));
		setNumber2(Double.valueOf((String)map.get("number2")));
		setNumber3(Double.valueOf((String)map.get("number3")));
		setNumber4(Double.valueOf((String)map.get("number4")));
		setNumber5(Double.valueOf((String)map.get("number5")));
		setNumber6(Double.valueOf((String)map.get("number6")));
	}
	
	/**
	 * set the value to Map
	 */
	public Map toMap() {
		
		Map map = new HashMap();
			map.put("number1",number1);	
			map.put("number2",number2);	
			map.put("number3",number3);	
			map.put("number4",number4);	
			map.put("number5",number5);	
			map.put("number6",number6);	
			
		return map;
	
	}
}