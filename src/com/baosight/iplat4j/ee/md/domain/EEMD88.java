package com.baosight.iplat4j.ee.md.domain;

import com.baosight.iplat4j.core.ei.EiColumn;
import com.baosight.iplat4j.ep.DaoEPBase;
import java.util.HashMap;
import java.util.Map;
import com.baosight.iplat4j.util.StringUtils;
import com.baosight.iplat4j.util.NumberUtils;

/**
 * EEMD88
 */
public class EEMD88 extends DaoEPBase {

      private Integer jzglmaterialId;  /*  物料信息表_内码  */

      private String smName="";  /*  物料名称  */

      private String smType="";  /*  物料分类  */

      private String typeSpec="";  /*  型号规格  */


   /**
    * initialize the metadata 
    */
	public void initMetaData() {
	          EiColumn eiColumn;
              eiColumn = new EiColumn("jzglmaterialId");
              eiColumn.setPrimaryKey(false);
              eiColumn.setFieldLength(15);	
              eiColumn.setMaxLength(15);
              eiColumn.setDescName("物料信息表_内码");
              eiColumn.setType("N");
              eiColumn.setValueProperty("label");
              eiColumn.setEditor("Text");
              eiColumn.setReadonly(false);
              eiColumn.setVisible(true);
              eiColumn.setLabelProperty("value");
              eiMetadata.addMeta(eiColumn);
              eiColumn = new EiColumn("smName");
              eiColumn.setPrimaryKey(false);
              eiColumn.setFieldLength(100);	
              eiColumn.setMaxLength(100);
              eiColumn.setDescName("物料名称");
              eiColumn.setType("C");
              eiColumn.setValueProperty("label");
              eiColumn.setEditor("Text");
              eiColumn.setReadonly(false);
              eiColumn.setVisible(true);
              eiColumn.setLabelProperty("value");
              eiMetadata.addMeta(eiColumn);
              eiColumn = new EiColumn("smType");
              eiColumn.setPrimaryKey(false);
              eiColumn.setFieldLength(10);	
              eiColumn.setMaxLength(10);
              eiColumn.setDescName("物料分类");
              eiColumn.setType("C");
              eiColumn.setValueProperty("label");
              eiColumn.setEditor("Text");
              eiColumn.setReadonly(false);
              eiColumn.setVisible(true);
              eiColumn.setLabelProperty("value");
              eiMetadata.addMeta(eiColumn);
              eiColumn = new EiColumn("typeSpec");
              eiColumn.setPrimaryKey(false);
              eiColumn.setFieldLength(100);	
              eiColumn.setMaxLength(100);
              eiColumn.setDescName("型号规格");
              eiColumn.setType("C");
              eiColumn.setValueProperty("label");
              eiColumn.setEditor("Text");
              eiColumn.setReadonly(false);
              eiColumn.setVisible(true);
              eiColumn.setLabelProperty("value");
              eiMetadata.addMeta(eiColumn);
	}
   /**
    * the constructor
    */
	public EEMD88() {
		initMetaData();
	}
	
   /**
    *get the jzglmaterialId  - 物料信息表_内码
    *@return the jzglmaterialId
    */
	 public Integer getJzglmaterialId(){
	      return this.jzglmaterialId;
	 }
   /**
    *set the jzglmaterialId  - 物料信息表_内码
    */
	 public void setJzglmaterialId(Integer jzglmaterialId){
	      this.jzglmaterialId=jzglmaterialId;
	 }
   /**
    *get the smName  - 物料名称
    *@return the smName
    */
	 public String getSmName(){
	      return this.smName;
	 }
   /**
    *set the smName  - 物料名称
    */
	 public void setSmName(String smName){
	      this.smName=smName;
	 }
   /**
    *get the smType  - 物料分类
    *@return the smType
    */
	 public String getSmType(){
	      return this.smType;
	 }
   /**
    *set the smType  - 物料分类
    */
	 public void setSmType(String smType){
	      this.smType=smType;
	 }
   /**
    *get the typeSpec  - 型号规格
    *@return the typeSpec
    */
	 public String getTypeSpec(){
	      return this.typeSpec;
	 }
   /**
    *set the typeSpec  - 型号规格
    */
	 public void setTypeSpec(String typeSpec){
	      this.typeSpec=typeSpec;
	 }
   /**
    * get the value from Map
    */
	public void fromMap(Map map) {
          setJzglmaterialId(NumberUtils.toInteger(StringUtils.toString(map.get("jzglmaterialId")), jzglmaterialId));
          setSmName(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("smName")), smName));
          setSmType(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("smType")), smType));
          setTypeSpec(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("typeSpec")), typeSpec));
	}
	
   /**
    * set the value to Map
    */
	public Map toMap() {
        Map map = new HashMap();
	    map.put("jzglmaterialId",StringUtils.toString(jzglmaterialId, eiMetadata.getMeta("jzglmaterialId")));
	    map.put("smName",StringUtils.toString(smName, eiMetadata.getMeta("smName")));
	    map.put("smType",StringUtils.toString(smType, eiMetadata.getMeta("smType")));
	    map.put("typeSpec",StringUtils.toString(typeSpec, eiMetadata.getMeta("typeSpec")));
		return map;
	
	}
}