  /**
   * Generate time : 2010-01-25 14:30:36
   * Version : 1.0.1.V20070717
   */
package com.baosight.iplat4j.ee.dm.domain;

import com.baosight.iplat4j.util.NumberUtils;
import com.baosight.iplat4j.core.ei.EiColumn;
import com.baosight.iplat4j.ep.DaoEPBase;
import java.util.HashMap;
import java.util.Map;
import com.baosight.iplat4j.util.StringUtils;
/**
 * Teedm31 
 * table comment : EF_GRID_20列性能测试 
 */
public class Teedm31 extends DaoEPBase {

	private String name = " ";		/* 名称*/
	private String displayName = " ";		/* 显示名称*/
	private String moduleType = " ";		/* 类型*/
	private String parent = " ";		/* 父模块*/
	private String application = " ";		/* 应用系统*/
	private String version = " ";		/* 版本*/
	private Integer archieveFlag = new Integer(0);		/* 归档标记*/
	private Integer loadOnDemand = new Integer(0);		/* 按需加载*/
	private String createTime = " ";		/* 创建时间*/
	private String modifyTime = " ";		/* 修改时间*/
	private String tableSpaceName = " ";		/* 表空间名称*/
	private Integer tableSpaceSize = new Integer(0);		/* 表空间大小*/
	private Integer price = new Integer(0);		/* 模块售价*/
	private String creator = " ";		/* 创建者*/
	private String moduleDesc = " ";		/*  描述 */
	private String typeFullName = " ";		/* 类型全名*/
	private String moduleLink = " ";		/* 链接*/
	private String col18 = " ";		
	private String col19 = " ";		
	private String col20 = " ";		

	/**
	 * initialize the metadata 
	 */
	public void initMetaData() {
		EiColumn eiColumn;
		
	eiColumn = new EiColumn("name");
	eiColumn.setPrimaryKey(true);
	eiColumn.setFieldLength(8);	
	eiColumn.setDescName("名称");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("displayName");
	eiColumn.setFieldLength(64);	
	eiColumn.setDescName("显示名称");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("moduleType");
	eiColumn.setFieldLength(1);	
	eiColumn.setDescName("类型");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("parent");
	eiColumn.setFieldLength(8);	
	eiColumn.setDescName("父模块");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("application");
	eiColumn.setFieldLength(8);	
	eiColumn.setDescName("应用系统");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("version");
	eiColumn.setFieldLength(24);	
	eiColumn.setDescName("版本");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("archieveFlag");
	eiColumn.setType("N");
	eiColumn.setScaleLength(0);
	eiColumn.setFieldLength(1);
	eiColumn.setDescName("归档标记");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("loadOnDemand");
	eiColumn.setType("N");
	eiColumn.setScaleLength(0);
	eiColumn.setFieldLength(1);
	eiColumn.setDescName("按需加载");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("createTime");
	eiColumn.setFieldLength(14);	
	eiColumn.setDescName("创建时间");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("modifyTime");
	eiColumn.setFieldLength(14);	
	eiColumn.setDescName("修改时间");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("tableSpaceName");
	eiColumn.setFieldLength(256);	
	eiColumn.setDescName("表空间名称");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("tableSpaceSize");
	eiColumn.setType("N");
	eiColumn.setScaleLength(0);
	eiColumn.setFieldLength(9);
	eiColumn.setDescName("表空间大小");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("price");
	eiColumn.setType("N");
	eiColumn.setScaleLength(0);
	eiColumn.setFieldLength(9);
	eiColumn.setDescName("模块售价");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("creator");
	eiColumn.setFieldLength(32);	
	eiColumn.setDescName("创建者");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("moduleDesc");
	eiColumn.setFieldLength(256);	
	eiColumn.setDescName(" 描述 ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("typeFullName");
	eiColumn.setFieldLength(256);	
	eiColumn.setDescName("类型全名");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("moduleLink");
	eiColumn.setFieldLength(256);	
	eiColumn.setDescName("链接");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("col18");
	eiColumn.setFieldLength(50);	
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("col19");
	eiColumn.setFieldLength(50);	
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("col20");
	eiColumn.setFieldLength(50);	
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	

	}
	/**
	 * the constructor
	 */
	public Teedm31() {
		initMetaData();
	}
	
	/**
	 * get the name - 名称
	 * @return the name
	 */
	public String getName() {
		return this.name;
	}
	
	/**
	 * set the name - 名称
	 */
	public void setName(String name) {
		this.name = name;
	}
	
	/**
	 * get the displayName - 显示名称
	 * @return the displayName
	 */
	public String getDisplayName() {
		return this.displayName;
	}
	
	/**
	 * set the displayName - 显示名称
	 */
	public void setDisplayName(String displayName) {
		this.displayName = displayName;
	}
	
	/**
	 * get the moduleType - 类型
	 * @return the moduleType
	 */
	public String getModuleType() {
		return this.moduleType;
	}
	
	/**
	 * set the moduleType - 类型
	 */
	public void setModuleType(String moduleType) {
		this.moduleType = moduleType;
	}
	
	/**
	 * get the parent - 父模块
	 * @return the parent
	 */
	public String getParent() {
		return this.parent;
	}
	
	/**
	 * set the parent - 父模块
	 */
	public void setParent(String parent) {
		this.parent = parent;
	}
	
	/**
	 * get the application - 应用系统
	 * @return the application
	 */
	public String getApplication() {
		return this.application;
	}
	
	/**
	 * set the application - 应用系统
	 */
	public void setApplication(String application) {
		this.application = application;
	}
	
	/**
	 * get the version - 版本
	 * @return the version
	 */
	public String getVersion() {
		return this.version;
	}
	
	/**
	 * set the version - 版本
	 */
	public void setVersion(String version) {
		this.version = version;
	}
	
	/**
	 * get the archieveFlag - 归档标记
	 * @return the archieveFlag
	 */
	public Integer getArchieveFlag() {
		return this.archieveFlag;
	}
	
	/**
	 * set the archieveFlag - 归档标记
	 */
	public void setArchieveFlag(Integer archieveFlag) {
		this.archieveFlag = archieveFlag;
	}
	
	/**
	 * get the loadOnDemand - 按需加载
	 * @return the loadOnDemand
	 */
	public Integer getLoadOnDemand() {
		return this.loadOnDemand;
	}
	
	/**
	 * set the loadOnDemand - 按需加载
	 */
	public void setLoadOnDemand(Integer loadOnDemand) {
		this.loadOnDemand = loadOnDemand;
	}
	
	/**
	 * get the createTime - 创建时间
	 * @return the createTime
	 */
	public String getCreateTime() {
		return this.createTime;
	}
	
	/**
	 * set the createTime - 创建时间
	 */
	public void setCreateTime(String createTime) {
		this.createTime = createTime;
	}
	
	/**
	 * get the modifyTime - 修改时间
	 * @return the modifyTime
	 */
	public String getModifyTime() {
		return this.modifyTime;
	}
	
	/**
	 * set the modifyTime - 修改时间
	 */
	public void setModifyTime(String modifyTime) {
		this.modifyTime = modifyTime;
	}
	
	/**
	 * get the tableSpaceName - 表空间名称
	 * @return the tableSpaceName
	 */
	public String getTableSpaceName() {
		return this.tableSpaceName;
	}
	
	/**
	 * set the tableSpaceName - 表空间名称
	 */
	public void setTableSpaceName(String tableSpaceName) {
		this.tableSpaceName = tableSpaceName;
	}
	
	/**
	 * get the tableSpaceSize - 表空间大小
	 * @return the tableSpaceSize
	 */
	public Integer getTableSpaceSize() {
		return this.tableSpaceSize;
	}
	
	/**
	 * set the tableSpaceSize - 表空间大小
	 */
	public void setTableSpaceSize(Integer tableSpaceSize) {
		this.tableSpaceSize = tableSpaceSize;
	}
	
	/**
	 * get the price - 模块售价
	 * @return the price
	 */
	public Integer getPrice() {
		return this.price;
	}
	
	/**
	 * set the price - 模块售价
	 */
	public void setPrice(Integer price) {
		this.price = price;
	}
	
	/**
	 * get the creator - 创建者
	 * @return the creator
	 */
	public String getCreator() {
		return this.creator;
	}
	
	/**
	 * set the creator - 创建者
	 */
	public void setCreator(String creator) {
		this.creator = creator;
	}
	
	/**
	 * get the moduleDesc -  描述 
	 * @return the moduleDesc
	 */
	public String getModuleDesc() {
		return this.moduleDesc;
	}
	
	/**
	 * set the moduleDesc -  描述 
	 */
	public void setModuleDesc(String moduleDesc) {
		this.moduleDesc = moduleDesc;
	}
	
	/**
	 * get the typeFullName - 类型全名
	 * @return the typeFullName
	 */
	public String getTypeFullName() {
		return this.typeFullName;
	}
	
	/**
	 * set the typeFullName - 类型全名
	 */
	public void setTypeFullName(String typeFullName) {
		this.typeFullName = typeFullName;
	}
	
	/**
	 * get the moduleLink - 链接
	 * @return the moduleLink
	 */
	public String getModuleLink() {
		return this.moduleLink;
	}
	
	/**
	 * set the moduleLink - 链接
	 */
	public void setModuleLink(String moduleLink) {
		this.moduleLink = moduleLink;
	}
	
	/**
	 * get the col18 
	 * @return the col18
	 */
	public String getCol18() {
		return this.col18;
	}
	
	/**
	 * set the col18 
	 */
	public void setCol18(String col18) {
		this.col18 = col18;
	}
	
	/**
	 * get the col19 
	 * @return the col19
	 */
	public String getCol19() {
		return this.col19;
	}
	
	/**
	 * set the col19 
	 */
	public void setCol19(String col19) {
		this.col19 = col19;
	}
	
	/**
	 * get the col20 
	 * @return the col20
	 */
	public String getCol20() {
		return this.col20;
	}
	
	/**
	 * set the col20 
	 */
	public void setCol20(String col20) {
		this.col20 = col20;
	}
	
	/**
	 * get the value from Map
	 */
	public void fromMap(Map map) {
	
		setName(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("name")), name));
		setDisplayName(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("displayName")), displayName));
		setModuleType(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("moduleType")), moduleType));
		setParent(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("parent")), parent));
		setApplication(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("application")), application));
		setVersion(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("version")), version));
		setArchieveFlag(NumberUtils.toInteger(StringUtils.toString(map.get("archieveFlag")), archieveFlag));
		setLoadOnDemand(NumberUtils.toInteger(StringUtils.toString(map.get("loadOnDemand")), loadOnDemand));
		setCreateTime(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("createTime")), createTime));
		setModifyTime(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("modifyTime")), modifyTime));
		setTableSpaceName(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("tableSpaceName")), tableSpaceName));
		setTableSpaceSize(NumberUtils.toInteger(StringUtils.toString(map.get("tableSpaceSize")), tableSpaceSize));
		setPrice(NumberUtils.toInteger(StringUtils.toString(map.get("price")), price));
		setCreator(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("creator")), creator));
		setModuleDesc(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("moduleDesc")), moduleDesc));
		setTypeFullName(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("typeFullName")), typeFullName));
		setModuleLink(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("moduleLink")), moduleLink));
		setCol18(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("col18")), col18));
		setCol19(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("col19")), col19));
		setCol20(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("col20")), col20));
	}
	
	/**
	 * set the value to Map
	 */
	public Map toMap() {
		
		Map map = new HashMap();
			map.put("name",StringUtils.toString(name, eiMetadata.getMeta("name")));	
			map.put("displayName",StringUtils.toString(displayName, eiMetadata.getMeta("displayName")));	
			map.put("moduleType",StringUtils.toString(moduleType, eiMetadata.getMeta("moduleType")));	
			map.put("parent",StringUtils.toString(parent, eiMetadata.getMeta("parent")));	
			map.put("application",StringUtils.toString(application, eiMetadata.getMeta("application")));	
			map.put("version",StringUtils.toString(version, eiMetadata.getMeta("version")));	
			map.put("archieveFlag",StringUtils.toString(archieveFlag, eiMetadata.getMeta("archieveFlag")));	
			map.put("loadOnDemand",StringUtils.toString(loadOnDemand, eiMetadata.getMeta("loadOnDemand")));	
			map.put("createTime",StringUtils.toString(createTime, eiMetadata.getMeta("createTime")));	
			map.put("modifyTime",StringUtils.toString(modifyTime, eiMetadata.getMeta("modifyTime")));	
			map.put("tableSpaceName",StringUtils.toString(tableSpaceName, eiMetadata.getMeta("tableSpaceName")));	
			map.put("tableSpaceSize",StringUtils.toString(tableSpaceSize, eiMetadata.getMeta("tableSpaceSize")));	
			map.put("price",StringUtils.toString(price, eiMetadata.getMeta("price")));	
			map.put("creator",StringUtils.toString(creator, eiMetadata.getMeta("creator")));	
			map.put("moduleDesc",StringUtils.toString(moduleDesc, eiMetadata.getMeta("moduleDesc")));	
			map.put("typeFullName",StringUtils.toString(typeFullName, eiMetadata.getMeta("typeFullName")));	
			map.put("moduleLink",StringUtils.toString(moduleLink, eiMetadata.getMeta("moduleLink")));	
			map.put("col18",StringUtils.toString(col18, eiMetadata.getMeta("col18")));	
			map.put("col19",StringUtils.toString(col19, eiMetadata.getMeta("col19")));	
			map.put("col20",StringUtils.toString(col20, eiMetadata.getMeta("col20")));	
			
		return map;
	
	}
}