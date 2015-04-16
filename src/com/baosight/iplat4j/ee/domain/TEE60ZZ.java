  /**
   * Generate time : 2007-05-23 10:27:05
   * Version : 1.0.1.V20070521
   */
package com.baosight.iplat4j.ee.domain;

import com.baosight.iplat4j.util.NumberUtils;
import com.baosight.iplat4j.core.ei.EiColumn;
import com.baosight.iplat4j.ep.DaoEPBase;
import java.util.HashMap;
import java.util.Map;
import com.baosight.iplat4j.util.StringUtils;
/**
 * TEE60ZZ 
 *  
 */
public class TEE60ZZ extends DaoEPBase {

	private Double number1 = new Double(0);		
	private Double number2 = new Double(0);		
	private Float number3 = new Float(0);		
	private Float number4 = new Float(0);		
	private Float number5 = new Float(0);		
	private Long number6 = new Long(0);	

	/**
	 * initialize the metadata 
	 */
	public void initMetaData() {
		EiColumn eiColumn;
		
	eiColumn = new EiColumn("number1");
	eiColumn.setPrimaryKey(true);
	eiColumn.setType("N");
	eiColumn.setScaleLength(2);
	eiColumn.setFieldLength(10);
	eiColumn.setDescName("number1");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("number2");
	eiColumn.setType("N");
	eiColumn.setScaleLength(2);
	eiColumn.setFieldLength(22);
	eiColumn.setDescName("number2");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("number3");
	eiColumn.setType("N");
	eiColumn.setScaleLength(2);
	eiColumn.setFieldLength(6);
	eiColumn.setDescName("number3");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("number4");
	eiColumn.setType("N");
	eiColumn.setScaleLength(2);
	eiColumn.setFieldLength(4);
	eiColumn.setDescName("number4");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("number5");
	eiColumn.setType("N");
	eiColumn.setScaleLength(2);
	eiColumn.setFieldLength(4);
	eiColumn.setDescName("number5");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("number6");
	eiColumn.setType("N");
	eiColumn.setScaleLength(0);
	eiColumn.setFieldLength(38);
	eiColumn.setDescName("number6");
	eiMetadata.addMeta(eiColumn);
	

	}
	/**
	 * the constructor
	 */
	public TEE60ZZ() {
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
	public Float getNumber3() {
		return this.number3;
	}
	
	/**
	 * set the number3 
	 */
	public void setNumber3(Float number3) {
		this.number3 = number3;
	}
	
	/**
	 * get the number4 
	 * @return the number4
	 */
	public Float getNumber4() {
		return this.number4;
	}
	
	/**
	 * set the number4 
	 */
	public void setNumber4(Float number4) {
		this.number4 = number4;
	}
	
	/**
	 * get the number5 
	 * @return the number5
	 */
	public Float getNumber5() {
		return this.number5;
	}
	
	/**
	 * set the number5 
	 */
	public void setNumber5(Float number5) {
		this.number5 = number5;
	}
	
	/**
	 * get the number6 
	 * @return the number6
	 */
	public Long getNumber6() {
		return this.number6;
	}
	
	/**
	 * set the number6 
	 */
	public void setNumber6(Long number6) {
		this.number6 = number6;
	}
	
	/**
	 * get the value from Map
	 */
	public void fromMap(Map map) {
	
		setNumber1(NumberUtils.toDouble(((String)map.get("number1")), number1));
		setNumber2(NumberUtils.toDouble(((String)map.get("number2")), number2));
		setNumber3(NumberUtils.toFloat(((String)map.get("number3")), number3));
		setNumber4(NumberUtils.toFloat(((String)map.get("number4")), number4));
		setNumber5(NumberUtils.toFloat(((String)map.get("number5")), number5));
		setNumber6(NumberUtils.toLong(((String)map.get("number6")), number6));
	}
	
	/**
	 * set the value to Map
	 */
	public Map toMap() {
		
		Map map = new HashMap();
			map.put("number1",StringUtils.toString(number1, eiMetadata.getMeta("number1").getFieldLength(), eiMetadata.getMeta("number1").getScaleLength()));	
			map.put("number2",StringUtils.toString(number2, eiMetadata.getMeta("number2").getFieldLength(), eiMetadata.getMeta("number2").getScaleLength()));	
			map.put("number3",StringUtils.toString(number3, eiMetadata.getMeta("number3").getFieldLength(), eiMetadata.getMeta("number3").getScaleLength()));	
			map.put("number4",StringUtils.toString(number4, eiMetadata.getMeta("number4").getFieldLength(), eiMetadata.getMeta("number4").getScaleLength()));	
			map.put("number5",StringUtils.toString(number5, eiMetadata.getMeta("number5").getFieldLength(), eiMetadata.getMeta("number5").getScaleLength()));	
			map.put("number6",StringUtils.toString(number6, eiMetadata.getMeta("number6").getFieldLength(), eiMetadata.getMeta("number6").getScaleLength()));	
			
		return map;
	
	}
}