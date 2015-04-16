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
 * Teedm33 
 * table comment : EF_GRID_100列性能测试 
 */
public class Teedm33 extends DaoEPBase {

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
	private String col51 = " ";		
	private String col52 = " ";		
	private String col53 = " ";		
	private String col54 = " ";		
	private String col55 = " ";		
	private String col56 = " ";		
	private String col57 = " ";		
	private String col58 = " ";		
	private String col59 = " ";		
	private String col60 = " ";		
	private String col61 = " ";		
	private String col62 = " ";		
	private String col63 = " ";		
	private String col64 = " ";		
	private String col65 = " ";		
	private String col66 = " ";		
	private String col67 = " ";		
	private String col68 = " ";		
	private String col69 = " ";		
	private String col70 = " ";		
	private String col71 = " ";		
	private String col72 = " ";		
	private String col73 = " ";		
	private String col74 = " ";		
	private String col75 = " ";		
	private String col76 = " ";		
	private String col77 = " ";		
	private String col78 = " ";		
	private String col79 = " ";		
	private String col80 = " ";		
	private String col81 = " ";		
	private String col82 = " ";		
	private String col83 = " ";		
	private String col84 = " ";		
	private String col85 = " ";		
	private String col86 = " ";		
	private String col87 = " ";		
	private String col88 = " ";		
	private String col89 = " ";		
	private String col90 = " ";		
	private String col91 = " ";		
	private String col92 = " ";		
	private String col93 = " ";		
	private String col94 = " ";		
	private String col95 = " ";		
	private String col96 = " ";		
	private String col97 = " ";		
	private String col98 = " ";		
	private String col99 = " ";		
	private String col100 = " ";		

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
	
	eiColumn = new EiColumn("col51");
	eiColumn.setFieldLength(5);	
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("col52");
	eiColumn.setFieldLength(5);	
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("col53");
	eiColumn.setFieldLength(5);	
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("col54");
	eiColumn.setFieldLength(5);	
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("col55");
	eiColumn.setFieldLength(5);	
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("col56");
	eiColumn.setFieldLength(5);	
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("col57");
	eiColumn.setFieldLength(5);	
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("col58");
	eiColumn.setFieldLength(5);	
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("col59");
	eiColumn.setFieldLength(5);	
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("col60");
	eiColumn.setFieldLength(5);	
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("col61");
	eiColumn.setFieldLength(5);	
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("col62");
	eiColumn.setFieldLength(5);	
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("col63");
	eiColumn.setFieldLength(5);	
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("col64");
	eiColumn.setFieldLength(5);	
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("col65");
	eiColumn.setFieldLength(5);	
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("col66");
	eiColumn.setFieldLength(5);	
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("col67");
	eiColumn.setFieldLength(5);	
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("col68");
	eiColumn.setFieldLength(5);	
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("col69");
	eiColumn.setFieldLength(5);	
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("col70");
	eiColumn.setFieldLength(5);	
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("col71");
	eiColumn.setFieldLength(5);	
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("col72");
	eiColumn.setFieldLength(5);	
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("col73");
	eiColumn.setFieldLength(5);	
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("col74");
	eiColumn.setFieldLength(5);	
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("col75");
	eiColumn.setFieldLength(5);	
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("col76");
	eiColumn.setFieldLength(5);	
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("col77");
	eiColumn.setFieldLength(5);	
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("col78");
	eiColumn.setFieldLength(5);	
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("col79");
	eiColumn.setFieldLength(5);	
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("col80");
	eiColumn.setFieldLength(5);	
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("col81");
	eiColumn.setFieldLength(5);	
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("col82");
	eiColumn.setFieldLength(5);	
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("col83");
	eiColumn.setFieldLength(5);	
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("col84");
	eiColumn.setFieldLength(5);	
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("col85");
	eiColumn.setFieldLength(5);	
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("col86");
	eiColumn.setFieldLength(5);	
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("col87");
	eiColumn.setFieldLength(5);	
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("col88");
	eiColumn.setFieldLength(5);	
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("col89");
	eiColumn.setFieldLength(5);	
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("col90");
	eiColumn.setFieldLength(5);	
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("col91");
	eiColumn.setFieldLength(5);	
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("col92");
	eiColumn.setFieldLength(5);	
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("col93");
	eiColumn.setFieldLength(5);	
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("col94");
	eiColumn.setFieldLength(5);	
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("col95");
	eiColumn.setFieldLength(5);	
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("col96");
	eiColumn.setFieldLength(5);	
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("col97");
	eiColumn.setFieldLength(5);	
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("col98");
	eiColumn.setFieldLength(5);	
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("col99");
	eiColumn.setFieldLength(5);	
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("col100");
	eiColumn.setFieldLength(5);	
	eiColumn.setDescName(" ");
	eiMetadata.addMeta(eiColumn);
	

	}
	/**
	 * the constructor
	 */
	public Teedm33() {
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
	 * get the col51 
	 * @return the col51
	 */
	public String getCol51() {
		return this.col51;
	}
	
	/**
	 * set the col51 
	 */
	public void setCol51(String col51) {
		this.col51 = col51;
	}
	
	/**
	 * get the col52 
	 * @return the col52
	 */
	public String getCol52() {
		return this.col52;
	}
	
	/**
	 * set the col52 
	 */
	public void setCol52(String col52) {
		this.col52 = col52;
	}
	
	/**
	 * get the col53 
	 * @return the col53
	 */
	public String getCol53() {
		return this.col53;
	}
	
	/**
	 * set the col53 
	 */
	public void setCol53(String col53) {
		this.col53 = col53;
	}
	
	/**
	 * get the col54 
	 * @return the col54
	 */
	public String getCol54() {
		return this.col54;
	}
	
	/**
	 * set the col54 
	 */
	public void setCol54(String col54) {
		this.col54 = col54;
	}
	
	/**
	 * get the col55 
	 * @return the col55
	 */
	public String getCol55() {
		return this.col55;
	}
	
	/**
	 * set the col55 
	 */
	public void setCol55(String col55) {
		this.col55 = col55;
	}
	
	/**
	 * get the col56 
	 * @return the col56
	 */
	public String getCol56() {
		return this.col56;
	}
	
	/**
	 * set the col56 
	 */
	public void setCol56(String col56) {
		this.col56 = col56;
	}
	
	/**
	 * get the col57 
	 * @return the col57
	 */
	public String getCol57() {
		return this.col57;
	}
	
	/**
	 * set the col57 
	 */
	public void setCol57(String col57) {
		this.col57 = col57;
	}
	
	/**
	 * get the col58 
	 * @return the col58
	 */
	public String getCol58() {
		return this.col58;
	}
	
	/**
	 * set the col58 
	 */
	public void setCol58(String col58) {
		this.col58 = col58;
	}
	
	/**
	 * get the col59 
	 * @return the col59
	 */
	public String getCol59() {
		return this.col59;
	}
	
	/**
	 * set the col59 
	 */
	public void setCol59(String col59) {
		this.col59 = col59;
	}
	
	/**
	 * get the col60 
	 * @return the col60
	 */
	public String getCol60() {
		return this.col60;
	}
	
	/**
	 * set the col60 
	 */
	public void setCol60(String col60) {
		this.col60 = col60;
	}
	
	/**
	 * get the col61 
	 * @return the col61
	 */
	public String getCol61() {
		return this.col61;
	}
	
	/**
	 * set the col61 
	 */
	public void setCol61(String col61) {
		this.col61 = col61;
	}
	
	/**
	 * get the col62 
	 * @return the col62
	 */
	public String getCol62() {
		return this.col62;
	}
	
	/**
	 * set the col62 
	 */
	public void setCol62(String col62) {
		this.col62 = col62;
	}
	
	/**
	 * get the col63 
	 * @return the col63
	 */
	public String getCol63() {
		return this.col63;
	}
	
	/**
	 * set the col63 
	 */
	public void setCol63(String col63) {
		this.col63 = col63;
	}
	
	/**
	 * get the col64 
	 * @return the col64
	 */
	public String getCol64() {
		return this.col64;
	}
	
	/**
	 * set the col64 
	 */
	public void setCol64(String col64) {
		this.col64 = col64;
	}
	
	/**
	 * get the col65 
	 * @return the col65
	 */
	public String getCol65() {
		return this.col65;
	}
	
	/**
	 * set the col65 
	 */
	public void setCol65(String col65) {
		this.col65 = col65;
	}
	
	/**
	 * get the col66 
	 * @return the col66
	 */
	public String getCol66() {
		return this.col66;
	}
	
	/**
	 * set the col66 
	 */
	public void setCol66(String col66) {
		this.col66 = col66;
	}
	
	/**
	 * get the col67 
	 * @return the col67
	 */
	public String getCol67() {
		return this.col67;
	}
	
	/**
	 * set the col67 
	 */
	public void setCol67(String col67) {
		this.col67 = col67;
	}
	
	/**
	 * get the col68 
	 * @return the col68
	 */
	public String getCol68() {
		return this.col68;
	}
	
	/**
	 * set the col68 
	 */
	public void setCol68(String col68) {
		this.col68 = col68;
	}
	
	/**
	 * get the col69 
	 * @return the col69
	 */
	public String getCol69() {
		return this.col69;
	}
	
	/**
	 * set the col69 
	 */
	public void setCol69(String col69) {
		this.col69 = col69;
	}
	
	/**
	 * get the col70 
	 * @return the col70
	 */
	public String getCol70() {
		return this.col70;
	}
	
	/**
	 * set the col70 
	 */
	public void setCol70(String col70) {
		this.col70 = col70;
	}
	
	/**
	 * get the col71 
	 * @return the col71
	 */
	public String getCol71() {
		return this.col71;
	}
	
	/**
	 * set the col71 
	 */
	public void setCol71(String col71) {
		this.col71 = col71;
	}
	
	/**
	 * get the col72 
	 * @return the col72
	 */
	public String getCol72() {
		return this.col72;
	}
	
	/**
	 * set the col72 
	 */
	public void setCol72(String col72) {
		this.col72 = col72;
	}
	
	/**
	 * get the col73 
	 * @return the col73
	 */
	public String getCol73() {
		return this.col73;
	}
	
	/**
	 * set the col73 
	 */
	public void setCol73(String col73) {
		this.col73 = col73;
	}
	
	/**
	 * get the col74 
	 * @return the col74
	 */
	public String getCol74() {
		return this.col74;
	}
	
	/**
	 * set the col74 
	 */
	public void setCol74(String col74) {
		this.col74 = col74;
	}
	
	/**
	 * get the col75 
	 * @return the col75
	 */
	public String getCol75() {
		return this.col75;
	}
	
	/**
	 * set the col75 
	 */
	public void setCol75(String col75) {
		this.col75 = col75;
	}
	
	/**
	 * get the col76 
	 * @return the col76
	 */
	public String getCol76() {
		return this.col76;
	}
	
	/**
	 * set the col76 
	 */
	public void setCol76(String col76) {
		this.col76 = col76;
	}
	
	/**
	 * get the col77 
	 * @return the col77
	 */
	public String getCol77() {
		return this.col77;
	}
	
	/**
	 * set the col77 
	 */
	public void setCol77(String col77) {
		this.col77 = col77;
	}
	
	/**
	 * get the col78 
	 * @return the col78
	 */
	public String getCol78() {
		return this.col78;
	}
	
	/**
	 * set the col78 
	 */
	public void setCol78(String col78) {
		this.col78 = col78;
	}
	
	/**
	 * get the col79 
	 * @return the col79
	 */
	public String getCol79() {
		return this.col79;
	}
	
	/**
	 * set the col79 
	 */
	public void setCol79(String col79) {
		this.col79 = col79;
	}
	
	/**
	 * get the col80 
	 * @return the col80
	 */
	public String getCol80() {
		return this.col80;
	}
	
	/**
	 * set the col80 
	 */
	public void setCol80(String col80) {
		this.col80 = col80;
	}
	
	/**
	 * get the col81 
	 * @return the col81
	 */
	public String getCol81() {
		return this.col81;
	}
	
	/**
	 * set the col81 
	 */
	public void setCol81(String col81) {
		this.col81 = col81;
	}
	
	/**
	 * get the col82 
	 * @return the col82
	 */
	public String getCol82() {
		return this.col82;
	}
	
	/**
	 * set the col82 
	 */
	public void setCol82(String col82) {
		this.col82 = col82;
	}
	
	/**
	 * get the col83 
	 * @return the col83
	 */
	public String getCol83() {
		return this.col83;
	}
	
	/**
	 * set the col83 
	 */
	public void setCol83(String col83) {
		this.col83 = col83;
	}
	
	/**
	 * get the col84 
	 * @return the col84
	 */
	public String getCol84() {
		return this.col84;
	}
	
	/**
	 * set the col84 
	 */
	public void setCol84(String col84) {
		this.col84 = col84;
	}
	
	/**
	 * get the col85 
	 * @return the col85
	 */
	public String getCol85() {
		return this.col85;
	}
	
	/**
	 * set the col85 
	 */
	public void setCol85(String col85) {
		this.col85 = col85;
	}
	
	/**
	 * get the col86 
	 * @return the col86
	 */
	public String getCol86() {
		return this.col86;
	}
	
	/**
	 * set the col86 
	 */
	public void setCol86(String col86) {
		this.col86 = col86;
	}
	
	/**
	 * get the col87 
	 * @return the col87
	 */
	public String getCol87() {
		return this.col87;
	}
	
	/**
	 * set the col87 
	 */
	public void setCol87(String col87) {
		this.col87 = col87;
	}
	
	/**
	 * get the col88 
	 * @return the col88
	 */
	public String getCol88() {
		return this.col88;
	}
	
	/**
	 * set the col88 
	 */
	public void setCol88(String col88) {
		this.col88 = col88;
	}
	
	/**
	 * get the col89 
	 * @return the col89
	 */
	public String getCol89() {
		return this.col89;
	}
	
	/**
	 * set the col89 
	 */
	public void setCol89(String col89) {
		this.col89 = col89;
	}
	
	/**
	 * get the col90 
	 * @return the col90
	 */
	public String getCol90() {
		return this.col90;
	}
	
	/**
	 * set the col90 
	 */
	public void setCol90(String col90) {
		this.col90 = col90;
	}
	
	/**
	 * get the col91 
	 * @return the col91
	 */
	public String getCol91() {
		return this.col91;
	}
	
	/**
	 * set the col91 
	 */
	public void setCol91(String col91) {
		this.col91 = col91;
	}
	
	/**
	 * get the col92 
	 * @return the col92
	 */
	public String getCol92() {
		return this.col92;
	}
	
	/**
	 * set the col92 
	 */
	public void setCol92(String col92) {
		this.col92 = col92;
	}
	
	/**
	 * get the col93 
	 * @return the col93
	 */
	public String getCol93() {
		return this.col93;
	}
	
	/**
	 * set the col93 
	 */
	public void setCol93(String col93) {
		this.col93 = col93;
	}
	
	/**
	 * get the col94 
	 * @return the col94
	 */
	public String getCol94() {
		return this.col94;
	}
	
	/**
	 * set the col94 
	 */
	public void setCol94(String col94) {
		this.col94 = col94;
	}
	
	/**
	 * get the col95 
	 * @return the col95
	 */
	public String getCol95() {
		return this.col95;
	}
	
	/**
	 * set the col95 
	 */
	public void setCol95(String col95) {
		this.col95 = col95;
	}
	
	/**
	 * get the col96 
	 * @return the col96
	 */
	public String getCol96() {
		return this.col96;
	}
	
	/**
	 * set the col96 
	 */
	public void setCol96(String col96) {
		this.col96 = col96;
	}
	
	/**
	 * get the col97 
	 * @return the col97
	 */
	public String getCol97() {
		return this.col97;
	}
	
	/**
	 * set the col97 
	 */
	public void setCol97(String col97) {
		this.col97 = col97;
	}
	
	/**
	 * get the col98 
	 * @return the col98
	 */
	public String getCol98() {
		return this.col98;
	}
	
	/**
	 * set the col98 
	 */
	public void setCol98(String col98) {
		this.col98 = col98;
	}
	
	/**
	 * get the col99 
	 * @return the col99
	 */
	public String getCol99() {
		return this.col99;
	}
	
	/**
	 * set the col99 
	 */
	public void setCol99(String col99) {
		this.col99 = col99;
	}
	
	/**
	 * get the col100 
	 * @return the col100
	 */
	public String getCol100() {
		return this.col100;
	}
	
	/**
	 * set the col100 
	 */
	public void setCol100(String col100) {
		this.col100 = col100;
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
		setCol51(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("col51")), col51));
		setCol52(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("col52")), col52));
		setCol53(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("col53")), col53));
		setCol54(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("col54")), col54));
		setCol55(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("col55")), col55));
		setCol56(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("col56")), col56));
		setCol57(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("col57")), col57));
		setCol58(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("col58")), col58));
		setCol59(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("col59")), col59));
		setCol60(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("col60")), col60));
		setCol61(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("col61")), col61));
		setCol62(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("col62")), col62));
		setCol63(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("col63")), col63));
		setCol64(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("col64")), col64));
		setCol65(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("col65")), col65));
		setCol66(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("col66")), col66));
		setCol67(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("col67")), col67));
		setCol68(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("col68")), col68));
		setCol69(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("col69")), col69));
		setCol70(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("col70")), col70));
		setCol71(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("col71")), col71));
		setCol72(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("col72")), col72));
		setCol73(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("col73")), col73));
		setCol74(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("col74")), col74));
		setCol75(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("col75")), col75));
		setCol76(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("col76")), col76));
		setCol77(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("col77")), col77));
		setCol78(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("col78")), col78));
		setCol79(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("col79")), col79));
		setCol80(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("col80")), col80));
		setCol81(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("col81")), col81));
		setCol82(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("col82")), col82));
		setCol83(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("col83")), col83));
		setCol84(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("col84")), col84));
		setCol85(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("col85")), col85));
		setCol86(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("col86")), col86));
		setCol87(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("col87")), col87));
		setCol88(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("col88")), col88));
		setCol89(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("col89")), col89));
		setCol90(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("col90")), col90));
		setCol91(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("col91")), col91));
		setCol92(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("col92")), col92));
		setCol93(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("col93")), col93));
		setCol94(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("col94")), col94));
		setCol95(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("col95")), col95));
		setCol96(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("col96")), col96));
		setCol97(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("col97")), col97));
		setCol98(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("col98")), col98));
		setCol99(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("col99")), col99));
		setCol100(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("col100")), col100));
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
			map.put("col51",StringUtils.toString(col51, eiMetadata.getMeta("col51")));	
			map.put("col52",StringUtils.toString(col52, eiMetadata.getMeta("col52")));	
			map.put("col53",StringUtils.toString(col53, eiMetadata.getMeta("col53")));	
			map.put("col54",StringUtils.toString(col54, eiMetadata.getMeta("col54")));	
			map.put("col55",StringUtils.toString(col55, eiMetadata.getMeta("col55")));	
			map.put("col56",StringUtils.toString(col56, eiMetadata.getMeta("col56")));	
			map.put("col57",StringUtils.toString(col57, eiMetadata.getMeta("col57")));	
			map.put("col58",StringUtils.toString(col58, eiMetadata.getMeta("col58")));	
			map.put("col59",StringUtils.toString(col59, eiMetadata.getMeta("col59")));	
			map.put("col60",StringUtils.toString(col60, eiMetadata.getMeta("col60")));	
			map.put("col61",StringUtils.toString(col61, eiMetadata.getMeta("col61")));	
			map.put("col62",StringUtils.toString(col62, eiMetadata.getMeta("col62")));	
			map.put("col63",StringUtils.toString(col63, eiMetadata.getMeta("col63")));	
			map.put("col64",StringUtils.toString(col64, eiMetadata.getMeta("col64")));	
			map.put("col65",StringUtils.toString(col65, eiMetadata.getMeta("col65")));	
			map.put("col66",StringUtils.toString(col66, eiMetadata.getMeta("col66")));	
			map.put("col67",StringUtils.toString(col67, eiMetadata.getMeta("col67")));	
			map.put("col68",StringUtils.toString(col68, eiMetadata.getMeta("col68")));	
			map.put("col69",StringUtils.toString(col69, eiMetadata.getMeta("col69")));	
			map.put("col70",StringUtils.toString(col70, eiMetadata.getMeta("col70")));	
			map.put("col71",StringUtils.toString(col71, eiMetadata.getMeta("col71")));	
			map.put("col72",StringUtils.toString(col72, eiMetadata.getMeta("col72")));	
			map.put("col73",StringUtils.toString(col73, eiMetadata.getMeta("col73")));	
			map.put("col74",StringUtils.toString(col74, eiMetadata.getMeta("col74")));	
			map.put("col75",StringUtils.toString(col75, eiMetadata.getMeta("col75")));	
			map.put("col76",StringUtils.toString(col76, eiMetadata.getMeta("col76")));	
			map.put("col77",StringUtils.toString(col77, eiMetadata.getMeta("col77")));	
			map.put("col78",StringUtils.toString(col78, eiMetadata.getMeta("col78")));	
			map.put("col79",StringUtils.toString(col79, eiMetadata.getMeta("col79")));	
			map.put("col80",StringUtils.toString(col80, eiMetadata.getMeta("col80")));	
			map.put("col81",StringUtils.toString(col81, eiMetadata.getMeta("col81")));	
			map.put("col82",StringUtils.toString(col82, eiMetadata.getMeta("col82")));	
			map.put("col83",StringUtils.toString(col83, eiMetadata.getMeta("col83")));	
			map.put("col84",StringUtils.toString(col84, eiMetadata.getMeta("col84")));	
			map.put("col85",StringUtils.toString(col85, eiMetadata.getMeta("col85")));	
			map.put("col86",StringUtils.toString(col86, eiMetadata.getMeta("col86")));	
			map.put("col87",StringUtils.toString(col87, eiMetadata.getMeta("col87")));	
			map.put("col88",StringUtils.toString(col88, eiMetadata.getMeta("col88")));	
			map.put("col89",StringUtils.toString(col89, eiMetadata.getMeta("col89")));	
			map.put("col90",StringUtils.toString(col90, eiMetadata.getMeta("col90")));	
			map.put("col91",StringUtils.toString(col91, eiMetadata.getMeta("col91")));	
			map.put("col92",StringUtils.toString(col92, eiMetadata.getMeta("col92")));	
			map.put("col93",StringUtils.toString(col93, eiMetadata.getMeta("col93")));	
			map.put("col94",StringUtils.toString(col94, eiMetadata.getMeta("col94")));	
			map.put("col95",StringUtils.toString(col95, eiMetadata.getMeta("col95")));	
			map.put("col96",StringUtils.toString(col96, eiMetadata.getMeta("col96")));	
			map.put("col97",StringUtils.toString(col97, eiMetadata.getMeta("col97")));	
			map.put("col98",StringUtils.toString(col98, eiMetadata.getMeta("col98")));	
			map.put("col99",StringUtils.toString(col99, eiMetadata.getMeta("col99")));	
			map.put("col100",StringUtils.toString(col100, eiMetadata.getMeta("col100")));	
			
		return map;
	
	}
}