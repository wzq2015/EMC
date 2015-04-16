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
 * Teedm32 
 * table comment : EF_GRID_50列性能测试 
 */
public class Teedm32 extends DaoEPBase {

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
	private String col21 = " ";		
	private String col22 = " ";		
	private String col23 = " ";		
	private String col24 = " ";		
	private String col25 = " ";		
	private String col26 = " ";		
	private String col27 = " ";		
	private String col28 = " ";		
	private String col29 = " ";		
	private String col30 = " ";		
	private String col31 = " ";		
	private String col32 = " ";		
	private String col33 = " ";		
	private String col34 = " ";		
	private String col35 = " ";		
	private String col36 = " ";		
	private String col37 = " ";		
	private String col38 = " ";		
	private String col39 = " ";		
	private String col40 = " ";		
	private String col41 = " ";		
	private String col42 = " ";		
	private String col43 = " ";		
	private String col44 = " ";		
	private String col45 = " ";		
	private String col46 = " ";		
	private String col47 = " ";		
	private String col48 = " ";		
	private String col49 = " ";		
	private String col50 = " ";		

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
	
	eiColumn = new EiColumn("col21");
	eiColumn.setFieldLength(5);	
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("col22");
	eiColumn.setFieldLength(5);	
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("col23");
	eiColumn.setFieldLength(5);	
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("col24");
	eiColumn.setFieldLength(5);	
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("col25");
	eiColumn.setFieldLength(5);	
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("col26");
	eiColumn.setFieldLength(5);	
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("col27");
	eiColumn.setFieldLength(5);	
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("col28");
	eiColumn.setFieldLength(5);	
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("col29");
	eiColumn.setFieldLength(5);	
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("col30");
	eiColumn.setFieldLength(5);	
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("col31");
	eiColumn.setFieldLength(5);	
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("col32");
	eiColumn.setFieldLength(5);	
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("col33");
	eiColumn.setFieldLength(5);	
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("col34");
	eiColumn.setFieldLength(5);	
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("col35");
	eiColumn.setFieldLength(5);	
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("col36");
	eiColumn.setFieldLength(5);	
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("col37");
	eiColumn.setFieldLength(5);	
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("col38");
	eiColumn.setFieldLength(5);	
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("col39");
	eiColumn.setFieldLength(5);	
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("col40");
	eiColumn.setFieldLength(5);	
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("col41");
	eiColumn.setFieldLength(5);	
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("col42");
	eiColumn.setFieldLength(5);	
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("col43");
	eiColumn.setFieldLength(5);	
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("col44");
	eiColumn.setFieldLength(5);	
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("col45");
	eiColumn.setFieldLength(5);	
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("col46");
	eiColumn.setFieldLength(5);	
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("col47");
	eiColumn.setFieldLength(5);	
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("col48");
	eiColumn.setFieldLength(5);	
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("col49");
	eiColumn.setFieldLength(5);	
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("col50");
	eiColumn.setFieldLength(5);	
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	

	}
	/**
	 * the constructor
	 */
	public Teedm32() {
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
	 * get the col21 
	 * @return the col21
	 */
	public String getCol21() {
		return this.col21;
	}
	
	/**
	 * set the col21 
	 */
	public void setCol21(String col21) {
		this.col21 = col21;
	}
	
	/**
	 * get the col22 
	 * @return the col22
	 */
	public String getCol22() {
		return this.col22;
	}
	
	/**
	 * set the col22 
	 */
	public void setCol22(String col22) {
		this.col22 = col22;
	}
	
	/**
	 * get the col23 
	 * @return the col23
	 */
	public String getCol23() {
		return this.col23;
	}
	
	/**
	 * set the col23 
	 */
	public void setCol23(String col23) {
		this.col23 = col23;
	}
	
	/**
	 * get the col24 
	 * @return the col24
	 */
	public String getCol24() {
		return this.col24;
	}
	
	/**
	 * set the col24 
	 */
	public void setCol24(String col24) {
		this.col24 = col24;
	}
	
	/**
	 * get the col25 
	 * @return the col25
	 */
	public String getCol25() {
		return this.col25;
	}
	
	/**
	 * set the col25 
	 */
	public void setCol25(String col25) {
		this.col25 = col25;
	}
	
	/**
	 * get the col26 
	 * @return the col26
	 */
	public String getCol26() {
		return this.col26;
	}
	
	/**
	 * set the col26 
	 */
	public void setCol26(String col26) {
		this.col26 = col26;
	}
	
	/**
	 * get the col27 
	 * @return the col27
	 */
	public String getCol27() {
		return this.col27;
	}
	
	/**
	 * set the col27 
	 */
	public void setCol27(String col27) {
		this.col27 = col27;
	}
	
	/**
	 * get the col28 
	 * @return the col28
	 */
	public String getCol28() {
		return this.col28;
	}
	
	/**
	 * set the col28 
	 */
	public void setCol28(String col28) {
		this.col28 = col28;
	}
	
	/**
	 * get the col29 
	 * @return the col29
	 */
	public String getCol29() {
		return this.col29;
	}
	
	/**
	 * set the col29 
	 */
	public void setCol29(String col29) {
		this.col29 = col29;
	}
	
	/**
	 * get the col30 
	 * @return the col30
	 */
	public String getCol30() {
		return this.col30;
	}
	
	/**
	 * set the col30 
	 */
	public void setCol30(String col30) {
		this.col30 = col30;
	}
	
	/**
	 * get the col31 
	 * @return the col31
	 */
	public String getCol31() {
		return this.col31;
	}
	
	/**
	 * set the col31 
	 */
	public void setCol31(String col31) {
		this.col31 = col31;
	}
	
	/**
	 * get the col32 
	 * @return the col32
	 */
	public String getCol32() {
		return this.col32;
	}
	
	/**
	 * set the col32 
	 */
	public void setCol32(String col32) {
		this.col32 = col32;
	}
	
	/**
	 * get the col33 
	 * @return the col33
	 */
	public String getCol33() {
		return this.col33;
	}
	
	/**
	 * set the col33 
	 */
	public void setCol33(String col33) {
		this.col33 = col33;
	}
	
	/**
	 * get the col34 
	 * @return the col34
	 */
	public String getCol34() {
		return this.col34;
	}
	
	/**
	 * set the col34 
	 */
	public void setCol34(String col34) {
		this.col34 = col34;
	}
	
	/**
	 * get the col35 
	 * @return the col35
	 */
	public String getCol35() {
		return this.col35;
	}
	
	/**
	 * set the col35 
	 */
	public void setCol35(String col35) {
		this.col35 = col35;
	}
	
	/**
	 * get the col36 
	 * @return the col36
	 */
	public String getCol36() {
		return this.col36;
	}
	
	/**
	 * set the col36 
	 */
	public void setCol36(String col36) {
		this.col36 = col36;
	}
	
	/**
	 * get the col37 
	 * @return the col37
	 */
	public String getCol37() {
		return this.col37;
	}
	
	/**
	 * set the col37 
	 */
	public void setCol37(String col37) {
		this.col37 = col37;
	}
	
	/**
	 * get the col38 
	 * @return the col38
	 */
	public String getCol38() {
		return this.col38;
	}
	
	/**
	 * set the col38 
	 */
	public void setCol38(String col38) {
		this.col38 = col38;
	}
	
	/**
	 * get the col39 
	 * @return the col39
	 */
	public String getCol39() {
		return this.col39;
	}
	
	/**
	 * set the col39 
	 */
	public void setCol39(String col39) {
		this.col39 = col39;
	}
	
	/**
	 * get the col40 
	 * @return the col40
	 */
	public String getCol40() {
		return this.col40;
	}
	
	/**
	 * set the col40 
	 */
	public void setCol40(String col40) {
		this.col40 = col40;
	}
	
	/**
	 * get the col41 
	 * @return the col41
	 */
	public String getCol41() {
		return this.col41;
	}
	
	/**
	 * set the col41 
	 */
	public void setCol41(String col41) {
		this.col41 = col41;
	}
	
	/**
	 * get the col42 
	 * @return the col42
	 */
	public String getCol42() {
		return this.col42;
	}
	
	/**
	 * set the col42 
	 */
	public void setCol42(String col42) {
		this.col42 = col42;
	}
	
	/**
	 * get the col43 
	 * @return the col43
	 */
	public String getCol43() {
		return this.col43;
	}
	
	/**
	 * set the col43 
	 */
	public void setCol43(String col43) {
		this.col43 = col43;
	}
	
	/**
	 * get the col44 
	 * @return the col44
	 */
	public String getCol44() {
		return this.col44;
	}
	
	/**
	 * set the col44 
	 */
	public void setCol44(String col44) {
		this.col44 = col44;
	}
	
	/**
	 * get the col45 
	 * @return the col45
	 */
	public String getCol45() {
		return this.col45;
	}
	
	/**
	 * set the col45 
	 */
	public void setCol45(String col45) {
		this.col45 = col45;
	}
	
	/**
	 * get the col46 
	 * @return the col46
	 */
	public String getCol46() {
		return this.col46;
	}
	
	/**
	 * set the col46 
	 */
	public void setCol46(String col46) {
		this.col46 = col46;
	}
	
	/**
	 * get the col47 
	 * @return the col47
	 */
	public String getCol47() {
		return this.col47;
	}
	
	/**
	 * set the col47 
	 */
	public void setCol47(String col47) {
		this.col47 = col47;
	}
	
	/**
	 * get the col48 
	 * @return the col48
	 */
	public String getCol48() {
		return this.col48;
	}
	
	/**
	 * set the col48 
	 */
	public void setCol48(String col48) {
		this.col48 = col48;
	}
	
	/**
	 * get the col49 
	 * @return the col49
	 */
	public String getCol49() {
		return this.col49;
	}
	
	/**
	 * set the col49 
	 */
	public void setCol49(String col49) {
		this.col49 = col49;
	}
	
	/**
	 * get the col50 
	 * @return the col50
	 */
	public String getCol50() {
		return this.col50;
	}
	
	/**
	 * set the col50 
	 */
	public void setCol50(String col50) {
		this.col50 = col50;
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
		setCol21(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("col21")), col21));
		setCol22(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("col22")), col22));
		setCol23(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("col23")), col23));
		setCol24(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("col24")), col24));
		setCol25(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("col25")), col25));
		setCol26(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("col26")), col26));
		setCol27(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("col27")), col27));
		setCol28(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("col28")), col28));
		setCol29(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("col29")), col29));
		setCol30(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("col30")), col30));
		setCol31(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("col31")), col31));
		setCol32(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("col32")), col32));
		setCol33(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("col33")), col33));
		setCol34(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("col34")), col34));
		setCol35(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("col35")), col35));
		setCol36(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("col36")), col36));
		setCol37(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("col37")), col37));
		setCol38(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("col38")), col38));
		setCol39(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("col39")), col39));
		setCol40(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("col40")), col40));
		setCol41(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("col41")), col41));
		setCol42(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("col42")), col42));
		setCol43(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("col43")), col43));
		setCol44(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("col44")), col44));
		setCol45(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("col45")), col45));
		setCol46(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("col46")), col46));
		setCol47(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("col47")), col47));
		setCol48(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("col48")), col48));
		setCol49(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("col49")), col49));
		setCol50(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("col50")), col50));
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
			map.put("col21",StringUtils.toString(col21, eiMetadata.getMeta("col21")));	
			map.put("col22",StringUtils.toString(col22, eiMetadata.getMeta("col22")));	
			map.put("col23",StringUtils.toString(col23, eiMetadata.getMeta("col23")));	
			map.put("col24",StringUtils.toString(col24, eiMetadata.getMeta("col24")));	
			map.put("col25",StringUtils.toString(col25, eiMetadata.getMeta("col25")));	
			map.put("col26",StringUtils.toString(col26, eiMetadata.getMeta("col26")));	
			map.put("col27",StringUtils.toString(col27, eiMetadata.getMeta("col27")));	
			map.put("col28",StringUtils.toString(col28, eiMetadata.getMeta("col28")));	
			map.put("col29",StringUtils.toString(col29, eiMetadata.getMeta("col29")));	
			map.put("col30",StringUtils.toString(col30, eiMetadata.getMeta("col30")));	
			map.put("col31",StringUtils.toString(col31, eiMetadata.getMeta("col31")));	
			map.put("col32",StringUtils.toString(col32, eiMetadata.getMeta("col32")));	
			map.put("col33",StringUtils.toString(col33, eiMetadata.getMeta("col33")));	
			map.put("col34",StringUtils.toString(col34, eiMetadata.getMeta("col34")));	
			map.put("col35",StringUtils.toString(col35, eiMetadata.getMeta("col35")));	
			map.put("col36",StringUtils.toString(col36, eiMetadata.getMeta("col36")));	
			map.put("col37",StringUtils.toString(col37, eiMetadata.getMeta("col37")));	
			map.put("col38",StringUtils.toString(col38, eiMetadata.getMeta("col38")));	
			map.put("col39",StringUtils.toString(col39, eiMetadata.getMeta("col39")));	
			map.put("col40",StringUtils.toString(col40, eiMetadata.getMeta("col40")));	
			map.put("col41",StringUtils.toString(col41, eiMetadata.getMeta("col41")));	
			map.put("col42",StringUtils.toString(col42, eiMetadata.getMeta("col42")));	
			map.put("col43",StringUtils.toString(col43, eiMetadata.getMeta("col43")));	
			map.put("col44",StringUtils.toString(col44, eiMetadata.getMeta("col44")));	
			map.put("col45",StringUtils.toString(col45, eiMetadata.getMeta("col45")));	
			map.put("col46",StringUtils.toString(col46, eiMetadata.getMeta("col46")));	
			map.put("col47",StringUtils.toString(col47, eiMetadata.getMeta("col47")));	
			map.put("col48",StringUtils.toString(col48, eiMetadata.getMeta("col48")));	
			map.put("col49",StringUtils.toString(col49, eiMetadata.getMeta("col49")));	
			map.put("col50",StringUtils.toString(col50, eiMetadata.getMeta("col50")));	
			
		return map;
	
	}
}