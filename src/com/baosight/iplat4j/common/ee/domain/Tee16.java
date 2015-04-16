  /**
   * Generate time : 2009-04-14 10:19:42
   * Version : 1.0.1.V20070717
   */
package com.baosight.iplat4j.common.ee.domain;

import com.baosight.iplat4j.util.NumberUtils;
import com.baosight.iplat4j.core.ei.EiColumn;
import com.baosight.iplat4j.ep.DaoEPBase;
import java.util.HashMap;
import java.util.Map;
import com.baosight.iplat4j.util.StringUtils;
/**
 * Tee16 
 * table comment : GRID大数据量测试 
 */
public class Tee16 extends DaoEPBase {

	private Double double1 = new Double(0);		// 数据一
	private Double double2 = new Double(0);		// 数据二
	private Double double3 = new Double(0);		// 数据三
	private Double double4 = new Double(0);		// 数据四
	private Double double5 = new Double(0);		// 数据五
	private Double double6 = new Double(0);		// 数据六
	private Double double7 = new Double(0);		// 数据七
	private Double double8 = new Double(0);		// 数据八
	private Double double9 = new Double(0);		// 数据九
	private Double double10 = new Double(0);		// 数据十
	private Double double11 = new Double(0);		// 数据十一
	private Double double12 = new Double(0);		// 数据十二
	private Double double13 = new Double(0);		// 数据十三
	private Double double14 = new Double(0);		// 数据十四
	private Double double15 = new Double(0);		// 数据十五
	private Double double16 = new Double(0);		// 数据十六
	private Double double17 = new Double(0);		// 数据十七
	private Double double18 = new Double(0);		// 数据十八
	private Double double19 = new Double(0);		// 数据十九
	private Double double20 = new Double(0);		// 数据二十

	/**
	 * initialize the metadata 
	 */
	public void initMetaData() {
		EiColumn eiColumn;
		
	eiColumn = new EiColumn("double1");
	eiColumn.setType("N");
	eiColumn.setScaleLength(4);
	eiColumn.setFieldLength(10);
	eiColumn.setDescName("数据一");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("double2");
	eiColumn.setType("N");
	eiColumn.setScaleLength(4);
	eiColumn.setFieldLength(10);
	eiColumn.setDescName("数据二");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("double3");
	eiColumn.setType("N");
	eiColumn.setScaleLength(4);
	eiColumn.setFieldLength(10);
	eiColumn.setDescName("数据三");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("double4");
	eiColumn.setType("N");
	eiColumn.setScaleLength(4);
	eiColumn.setFieldLength(10);
	eiColumn.setDescName("数据四");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("double5");
	eiColumn.setType("N");
	eiColumn.setScaleLength(4);
	eiColumn.setFieldLength(10);
	eiColumn.setDescName("数据五");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("double6");
	eiColumn.setType("N");
	eiColumn.setScaleLength(4);
	eiColumn.setFieldLength(10);
	eiColumn.setDescName("数据六");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("double7");
	eiColumn.setType("N");
	eiColumn.setScaleLength(4);
	eiColumn.setFieldLength(10);
	eiColumn.setDescName("数据七");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("double8");
	eiColumn.setType("N");
	eiColumn.setScaleLength(4);
	eiColumn.setFieldLength(10);
	eiColumn.setDescName("数据八");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("double9");
	eiColumn.setType("N");
	eiColumn.setScaleLength(4);
	eiColumn.setFieldLength(10);
	eiColumn.setDescName("数据九");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("double10");
	eiColumn.setType("N");
	eiColumn.setScaleLength(4);
	eiColumn.setFieldLength(10);
	eiColumn.setDescName("数据十");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("double11");
	eiColumn.setType("N");
	eiColumn.setScaleLength(4);
	eiColumn.setFieldLength(10);
	eiColumn.setDescName("数据十一");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("double12");
	eiColumn.setType("N");
	eiColumn.setScaleLength(4);
	eiColumn.setFieldLength(10);
	eiColumn.setDescName("数据十二");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("double13");
	eiColumn.setType("N");
	eiColumn.setScaleLength(4);
	eiColumn.setFieldLength(10);
	eiColumn.setDescName("数据十三");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("double14");
	eiColumn.setType("N");
	eiColumn.setScaleLength(4);
	eiColumn.setFieldLength(10);
	eiColumn.setDescName("数据十四");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("double15");
	eiColumn.setType("N");
	eiColumn.setScaleLength(4);
	eiColumn.setFieldLength(10);
	eiColumn.setDescName("数据十五");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("double16");
	eiColumn.setType("N");
	eiColumn.setScaleLength(4);
	eiColumn.setFieldLength(10);
	eiColumn.setDescName("数据十六");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("double17");
	eiColumn.setType("N");
	eiColumn.setScaleLength(4);
	eiColumn.setFieldLength(10);
	eiColumn.setDescName("数据十七");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("double18");
	eiColumn.setType("N");
	eiColumn.setScaleLength(4);
	eiColumn.setFieldLength(10);
	eiColumn.setDescName("数据十八");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("double19");
	eiColumn.setType("N");
	eiColumn.setScaleLength(4);
	eiColumn.setFieldLength(10);
	eiColumn.setDescName("数据十九");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("double20");
	eiColumn.setType("N");
	eiColumn.setScaleLength(4);
	eiColumn.setFieldLength(10);
	eiColumn.setDescName("数据二十");
	eiMetadata.addMeta(eiColumn);
	

	}
	/**
	 * the constructor
	 */
	public Tee16() {
		initMetaData();
	}
	
	/**
	 * get the double1 - 数据一
	 * @return the double1
	 */
	public Double getDouble1() {
		return this.double1;
	}
	
	/**
	 * set the double1 - 数据一
	 */
	public void setDouble1(Double double1) {
		this.double1 = double1;
	}
	
	/**
	 * get the double2 - 数据二
	 * @return the double2
	 */
	public Double getDouble2() {
		return this.double2;
	}
	
	/**
	 * set the double2 - 数据二
	 */
	public void setDouble2(Double double2) {
		this.double2 = double2;
	}
	
	/**
	 * get the double3 - 数据三
	 * @return the double3
	 */
	public Double getDouble3() {
		return this.double3;
	}
	
	/**
	 * set the double3 - 数据三
	 */
	public void setDouble3(Double double3) {
		this.double3 = double3;
	}
	
	/**
	 * get the double4 - 数据四
	 * @return the double4
	 */
	public Double getDouble4() {
		return this.double4;
	}
	
	/**
	 * set the double4 - 数据四
	 */
	public void setDouble4(Double double4) {
		this.double4 = double4;
	}
	
	/**
	 * get the double5 - 数据五
	 * @return the double5
	 */
	public Double getDouble5() {
		return this.double5;
	}
	
	/**
	 * set the double5 - 数据五
	 */
	public void setDouble5(Double double5) {
		this.double5 = double5;
	}
	
	/**
	 * get the double6 - 数据六
	 * @return the double6
	 */
	public Double getDouble6() {
		return this.double6;
	}
	
	/**
	 * set the double6 - 数据六
	 */
	public void setDouble6(Double double6) {
		this.double6 = double6;
	}
	
	/**
	 * get the double7 - 数据七
	 * @return the double7
	 */
	public Double getDouble7() {
		return this.double7;
	}
	
	/**
	 * set the double7 - 数据七
	 */
	public void setDouble7(Double double7) {
		this.double7 = double7;
	}
	
	/**
	 * get the double8 - 数据八
	 * @return the double8
	 */
	public Double getDouble8() {
		return this.double8;
	}
	
	/**
	 * set the double8 - 数据八
	 */
	public void setDouble8(Double double8) {
		this.double8 = double8;
	}
	
	/**
	 * get the double9 - 数据九
	 * @return the double9
	 */
	public Double getDouble9() {
		return this.double9;
	}
	
	/**
	 * set the double9 - 数据九
	 */
	public void setDouble9(Double double9) {
		this.double9 = double9;
	}
	
	/**
	 * get the double10 - 数据十
	 * @return the double10
	 */
	public Double getDouble10() {
		return this.double10;
	}
	
	/**
	 * set the double10 - 数据十
	 */
	public void setDouble10(Double double10) {
		this.double10 = double10;
	}
	
	/**
	 * get the double11 - 数据十一
	 * @return the double11
	 */
	public Double getDouble11() {
		return this.double11;
	}
	
	/**
	 * set the double11 - 数据十一
	 */
	public void setDouble11(Double double11) {
		this.double11 = double11;
	}
	
	/**
	 * get the double12 - 数据十二
	 * @return the double12
	 */
	public Double getDouble12() {
		return this.double12;
	}
	
	/**
	 * set the double12 - 数据十二
	 */
	public void setDouble12(Double double12) {
		this.double12 = double12;
	}
	
	/**
	 * get the double13 - 数据十三
	 * @return the double13
	 */
	public Double getDouble13() {
		return this.double13;
	}
	
	/**
	 * set the double13 - 数据十三
	 */
	public void setDouble13(Double double13) {
		this.double13 = double13;
	}
	
	/**
	 * get the double14 - 数据十四
	 * @return the double14
	 */
	public Double getDouble14() {
		return this.double14;
	}
	
	/**
	 * set the double14 - 数据十四
	 */
	public void setDouble14(Double double14) {
		this.double14 = double14;
	}
	
	/**
	 * get the double15 - 数据十五
	 * @return the double15
	 */
	public Double getDouble15() {
		return this.double15;
	}
	
	/**
	 * set the double15 - 数据十五
	 */
	public void setDouble15(Double double15) {
		this.double15 = double15;
	}
	
	/**
	 * get the double16 - 数据十六
	 * @return the double16
	 */
	public Double getDouble16() {
		return this.double16;
	}
	
	/**
	 * set the double16 - 数据十六
	 */
	public void setDouble16(Double double16) {
		this.double16 = double16;
	}
	
	/**
	 * get the double17 - 数据十七
	 * @return the double17
	 */
	public Double getDouble17() {
		return this.double17;
	}
	
	/**
	 * set the double17 - 数据十七
	 */
	public void setDouble17(Double double17) {
		this.double17 = double17;
	}
	
	/**
	 * get the double18 - 数据十八
	 * @return the double18
	 */
	public Double getDouble18() {
		return this.double18;
	}
	
	/**
	 * set the double18 - 数据十八
	 */
	public void setDouble18(Double double18) {
		this.double18 = double18;
	}
	
	/**
	 * get the double19 - 数据十九
	 * @return the double19
	 */
	public Double getDouble19() {
		return this.double19;
	}
	
	/**
	 * set the double19 - 数据十九
	 */
	public void setDouble19(Double double19) {
		this.double19 = double19;
	}
	
	/**
	 * get the double20 - 数据二十
	 * @return the double20
	 */
	public Double getDouble20() {
		return this.double20;
	}
	
	/**
	 * set the double20 - 数据二十
	 */
	public void setDouble20(Double double20) {
		this.double20 = double20;
	}
	
	/**
	 * get the value from Map
	 */
	public void fromMap(Map map) {
	
		setDouble1(NumberUtils.toDouble(((String)map.get("double1")), double1));
		setDouble2(NumberUtils.toDouble(((String)map.get("double2")), double2));
		setDouble3(NumberUtils.toDouble(((String)map.get("double3")), double3));
		setDouble4(NumberUtils.toDouble(((String)map.get("double4")), double4));
		setDouble5(NumberUtils.toDouble(((String)map.get("double5")), double5));
		setDouble6(NumberUtils.toDouble(((String)map.get("double6")), double6));
		setDouble7(NumberUtils.toDouble(((String)map.get("double7")), double7));
		setDouble8(NumberUtils.toDouble(((String)map.get("double8")), double8));
		setDouble9(NumberUtils.toDouble(((String)map.get("double9")), double9));
		setDouble10(NumberUtils.toDouble(((String)map.get("double10")), double10));
		setDouble11(NumberUtils.toDouble(((String)map.get("double11")), double11));
		setDouble12(NumberUtils.toDouble(((String)map.get("double12")), double12));
		setDouble13(NumberUtils.toDouble(((String)map.get("double13")), double13));
		setDouble14(NumberUtils.toDouble(((String)map.get("double14")), double14));
		setDouble15(NumberUtils.toDouble(((String)map.get("double15")), double15));
		setDouble16(NumberUtils.toDouble(((String)map.get("double16")), double16));
		setDouble17(NumberUtils.toDouble(((String)map.get("double17")), double17));
		setDouble18(NumberUtils.toDouble(((String)map.get("double18")), double18));
		setDouble19(NumberUtils.toDouble(((String)map.get("double19")), double19));
		setDouble20(NumberUtils.toDouble(((String)map.get("double20")), double20));
	}
	
	/**
	 * set the value to Map
	 */
	public Map toMap() {
		
		Map map = new HashMap();
			map.put("double1",StringUtils.toString(double1, eiMetadata.getMeta("double1").getFieldLength(), eiMetadata.getMeta("double1").getScaleLength()));	
			map.put("double2",StringUtils.toString(double2, eiMetadata.getMeta("double2").getFieldLength(), eiMetadata.getMeta("double2").getScaleLength()));	
			map.put("double3",StringUtils.toString(double3, eiMetadata.getMeta("double3").getFieldLength(), eiMetadata.getMeta("double3").getScaleLength()));	
			map.put("double4",StringUtils.toString(double4, eiMetadata.getMeta("double4").getFieldLength(), eiMetadata.getMeta("double4").getScaleLength()));	
			map.put("double5",StringUtils.toString(double5, eiMetadata.getMeta("double5").getFieldLength(), eiMetadata.getMeta("double5").getScaleLength()));	
			map.put("double6",StringUtils.toString(double6, eiMetadata.getMeta("double6").getFieldLength(), eiMetadata.getMeta("double6").getScaleLength()));	
			map.put("double7",StringUtils.toString(double7, eiMetadata.getMeta("double7").getFieldLength(), eiMetadata.getMeta("double7").getScaleLength()));	
			map.put("double8",StringUtils.toString(double8, eiMetadata.getMeta("double8").getFieldLength(), eiMetadata.getMeta("double8").getScaleLength()));	
			map.put("double9",StringUtils.toString(double9, eiMetadata.getMeta("double9").getFieldLength(), eiMetadata.getMeta("double9").getScaleLength()));	
			map.put("double10",StringUtils.toString(double10, eiMetadata.getMeta("double10").getFieldLength(), eiMetadata.getMeta("double10").getScaleLength()));	
			map.put("double11",StringUtils.toString(double11, eiMetadata.getMeta("double11").getFieldLength(), eiMetadata.getMeta("double11").getScaleLength()));	
			map.put("double12",StringUtils.toString(double12, eiMetadata.getMeta("double12").getFieldLength(), eiMetadata.getMeta("double12").getScaleLength()));	
			map.put("double13",StringUtils.toString(double13, eiMetadata.getMeta("double13").getFieldLength(), eiMetadata.getMeta("double13").getScaleLength()));	
			map.put("double14",StringUtils.toString(double14, eiMetadata.getMeta("double14").getFieldLength(), eiMetadata.getMeta("double14").getScaleLength()));	
			map.put("double15",StringUtils.toString(double15, eiMetadata.getMeta("double15").getFieldLength(), eiMetadata.getMeta("double15").getScaleLength()));	
			map.put("double16",StringUtils.toString(double16, eiMetadata.getMeta("double16").getFieldLength(), eiMetadata.getMeta("double16").getScaleLength()));	
			map.put("double17",StringUtils.toString(double17, eiMetadata.getMeta("double17").getFieldLength(), eiMetadata.getMeta("double17").getScaleLength()));	
			map.put("double18",StringUtils.toString(double18, eiMetadata.getMeta("double18").getFieldLength(), eiMetadata.getMeta("double18").getScaleLength()));	
			map.put("double19",StringUtils.toString(double19, eiMetadata.getMeta("double19").getFieldLength(), eiMetadata.getMeta("double19").getScaleLength()));	
			map.put("double20",StringUtils.toString(double20, eiMetadata.getMeta("double20").getFieldLength(), eiMetadata.getMeta("double20").getScaleLength()));	
			
		return map;
	
	}
}