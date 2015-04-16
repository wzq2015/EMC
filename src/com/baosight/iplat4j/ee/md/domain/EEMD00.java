package com.baosight.iplat4j.ee.md.domain;

import com.baosight.iplat4j.core.ei.EiColumn;
import com.baosight.iplat4j.ep.DaoEPBase;
import java.util.HashMap;
import java.util.Map;
import com.baosight.iplat4j.util.StringUtils;

/**
 * EEMD00
 */
public class EEMD00 extends DaoEPBase {

	private String recCreator = ""; /* 记录创建责任者 */

	private String recCreateTime = ""; /* 记录创建时间 */

	private String recRevisor = ""; /* 记录修改责任者 */

	private String recReviseTime = ""; /* 记录修改时刻 */

	private String archiveFlag = ""; /* 归档标记 */

	private String formEname = ""; /* 画面英文名 */

	private String formCname = ""; /* 画面中文名 */

	private String formLoadPath = ""; /* 画面载入的路径 */

	private String formType = ""; /* 画面类型 */

	private String moduleEname1 = ""; /* 一级模块英文名 */

	private String moduleEname2 = ""; /* 二级模块英文名 */

	private String initLoadServiceEname = ""; /* 初始处理服务英文名 */

	private String isGrade = ""; /* 是否设置分级授权 */

	private String isAuth = ""; /* 是否授权 */

	private String formParam = ""; /* 画面参数 */

	private String formStyle = ""; /* 画面技术风格 */

	/**
	 * initialize the metadata
	 */
	public void initMetaData() {
		EiColumn eiColumn;
		eiColumn = new EiColumn("recCreator");
		eiColumn.setPrimaryKey(false);
		eiColumn.setFieldLength(256);
		eiColumn.setMaxLength(256);
		eiColumn.setDescName("记录创建责任者");
		eiColumn.setType("C");
		eiColumn.setDateFormat("yyyyMMddHHmmss");
		eiColumn.setValueProperty("label");
		eiColumn.setEditor("Text");
		eiColumn.setReadonly(false);
		eiColumn.setVisible(true);
		eiColumn.setDisplayType("Text");
		eiColumn.setLabelProperty("value");
		eiMetadata.addMeta(eiColumn);

		eiColumn = new EiColumn("recCreateTime");
		eiColumn.setPrimaryKey(false);
		eiColumn.setFieldLength(14);
		eiColumn.setMaxLength(14);
		eiColumn.setDescName("记录创建时间");
		eiColumn.setType("C");
		eiColumn.setDateFormat("yyyyMMddHHmmss");
		eiColumn.setValueProperty("label");
		eiColumn.setEditor("Text");
		eiColumn.setReadonly(false);
		eiColumn.setVisible(true);
		eiColumn.setDisplayType("Text");
		eiColumn.setLabelProperty("value");
		eiMetadata.addMeta(eiColumn);

		eiColumn = new EiColumn("recRevisor");
		eiColumn.setPrimaryKey(false);
		eiColumn.setFieldLength(256);
		eiColumn.setMaxLength(256);
		eiColumn.setDescName("记录修改责任者");
		eiColumn.setType("C");
		eiColumn.setDateFormat("yyyyMMddHHmmss");
		eiColumn.setValueProperty("label");
		eiColumn.setEditor("Text");
		eiColumn.setReadonly(false);
		eiColumn.setVisible(true);
		eiColumn.setDisplayType("Text");
		eiColumn.setLabelProperty("value");
		eiMetadata.addMeta(eiColumn);

		eiColumn = new EiColumn("recReviseTime");
		eiColumn.setPrimaryKey(false);
		eiColumn.setFieldLength(14);
		eiColumn.setMaxLength(14);
		eiColumn.setDescName("记录修改时刻");
		eiColumn.setType("C");
		eiColumn.setDateFormat("yyyyMMddHHmmss");
		eiColumn.setValueProperty("label");
		eiColumn.setEditor("Text");
		eiColumn.setReadonly(false);
		eiColumn.setVisible(true);
		eiColumn.setDisplayType("Text");
		eiColumn.setLabelProperty("value");
		eiMetadata.addMeta(eiColumn);

		eiColumn = new EiColumn("archiveFlag");
		eiColumn.setPrimaryKey(false);
		eiColumn.setFieldLength(1);
		eiColumn.setMaxLength(1);
		eiColumn.setDescName("归档标记");
		eiColumn.setType("C");
		eiColumn.setDateFormat("yyyyMMddHHmmss");
		eiColumn.setValueProperty("label");
		eiColumn.setEditor("Text");
		eiColumn.setReadonly(false);
		eiColumn.setVisible(true);
		eiColumn.setDisplayType("Text");
		eiColumn.setLabelProperty("value");
		eiMetadata.addMeta(eiColumn);

		eiColumn = new EiColumn("formEname");
		eiColumn.setPrimaryKey(false);
		eiColumn.setFieldLength(8);
		eiColumn.setMaxLength(8);
		eiColumn.setDescName("画面英文名");
		eiColumn.setType("C");
		eiColumn.setDateFormat("yyyyMMddHHmmss");
		eiColumn.setValueProperty("label");
		eiColumn.setEditor("Text");
		eiColumn.setReadonly(false);
		eiColumn.setVisible(true);
		eiColumn.setDisplayType("Text");
		eiColumn.setLabelProperty("value");
		eiMetadata.addMeta(eiColumn);

		eiColumn = new EiColumn("formCname");
		eiColumn.setPrimaryKey(false);
		eiColumn.setFieldLength(50);
		eiColumn.setMaxLength(50);
		eiColumn.setDescName("画面中文名");
		eiColumn.setType("C");
		eiColumn.setDateFormat("yyyyMMddHHmmss");
		eiColumn.setValueProperty("label");
		eiColumn.setEditor("Text");
		eiColumn.setReadonly(false);
		eiColumn.setVisible(true);
		eiColumn.setDisplayType("Text");
		eiColumn.setLabelProperty("value");
		eiMetadata.addMeta(eiColumn);

		eiColumn = new EiColumn("formLoadPath");
		eiColumn.setPrimaryKey(false);
		eiColumn.setFieldLength(250);
		eiColumn.setMaxLength(250);
		eiColumn.setDescName("画面载入的路径");
		eiColumn.setType("C");
		eiColumn.setDateFormat("yyyyMMddHHmmss");
		eiColumn.setValueProperty("label");
		eiColumn.setEditor("Text");
		eiColumn.setReadonly(false);
		eiColumn.setVisible(true);
		eiColumn.setDisplayType("Text");
		eiColumn.setLabelProperty("value");
		eiMetadata.addMeta(eiColumn);

		eiColumn = new EiColumn("formType");
		eiColumn.setPrimaryKey(false);
		eiColumn.setFieldLength(1);
		eiColumn.setMaxLength(1);
		eiColumn.setDescName("画面类型");
		eiColumn.setType("C");
		eiColumn.setDateFormat("yyyyMMddHHmmss");
		eiColumn.setValueProperty("label");
		eiColumn.setEditor("ComboBox");
		eiColumn.setReadonly(false);
		eiColumn.setVisible(true);
		eiColumn.setDisplayType("Text");
		eiColumn.setLabelProperty("value");
		eiMetadata.addMeta(eiColumn);

		eiColumn = new EiColumn("moduleEname1");
		eiColumn.setPrimaryKey(false);
		eiColumn.setFieldLength(10);
		eiColumn.setMaxLength(10);
		eiColumn.setDescName("一级模块英文名");
		eiColumn.setType("C");
		eiColumn.setDateFormat("yyyyMMddHHmmss");
		eiColumn.setValueProperty("label");
		eiColumn.setEditor("Text");
		eiColumn.setReadonly(false);
		eiColumn.setVisible(true);
		eiColumn.setDisplayType("Text");
		eiColumn.setLabelProperty("value");
		eiMetadata.addMeta(eiColumn);

		eiColumn = new EiColumn("moduleEname2");
		eiColumn.setPrimaryKey(false);
		eiColumn.setFieldLength(10);
		eiColumn.setMaxLength(10);
		eiColumn.setDescName("二级模块英文名");
		eiColumn.setType("C");
		eiColumn.setDateFormat("yyyyMMddHHmmss");
		eiColumn.setValueProperty("label");
		eiColumn.setEditor("Text");
		eiColumn.setReadonly(false);
		eiColumn.setVisible(true);
		eiColumn.setDisplayType("Text");
		eiColumn.setLabelProperty("value");
		eiMetadata.addMeta(eiColumn);

		eiColumn = new EiColumn("initLoadServiceEname");
		eiColumn.setPrimaryKey(false);
		eiColumn.setFieldLength(30);
		eiColumn.setMaxLength(30);
		eiColumn.setDescName("初始处理服务英文名");
		eiColumn.setType("C");
		eiColumn.setDateFormat("yyyyMMddHHmmss");
		eiColumn.setValueProperty("label");
		eiColumn.setEditor("Text");
		eiColumn.setReadonly(false);
		eiColumn.setVisible(true);
		eiColumn.setDisplayType("Text");
		eiColumn.setLabelProperty("value");
		eiMetadata.addMeta(eiColumn);

		eiColumn = new EiColumn("isGrade");
		eiColumn.setPrimaryKey(false);
		eiColumn.setFieldLength(10);
		eiColumn.setMaxLength(10);
		eiColumn.setDescName("是否设置分级授权");
		eiColumn.setType("C");
		eiColumn.setDateFormat("yyyyMMddHHmmss");
		eiColumn.setValueProperty("label");
		eiColumn.setEditor("Text");
		eiColumn.setReadonly(false);
		eiColumn.setVisible(true);
		eiColumn.setDisplayType("Text");
		eiColumn.setLabelProperty("value");
		eiMetadata.addMeta(eiColumn);

		eiColumn = new EiColumn("isAuth");
		eiColumn.setPrimaryKey(false);
		eiColumn.setFieldLength(10);
		eiColumn.setMaxLength(10);
		eiColumn.setDescName("是否授权");
		eiColumn.setType("C");
		eiColumn.setDateFormat("yyyyMMddHHmmss");
		eiColumn.setValueProperty("label");
		eiColumn.setEditor("Text");
		eiColumn.setReadonly(false);
		eiColumn.setVisible(true);
		eiColumn.setDisplayType("Text");
		eiColumn.setLabelProperty("value");
		eiMetadata.addMeta(eiColumn);

		eiColumn = new EiColumn("formParam");
		eiColumn.setPrimaryKey(false);
		eiColumn.setFieldLength(255);
		eiColumn.setMaxLength(255);
		eiColumn.setDescName("画面参数");
		eiColumn.setType("C");
		eiColumn.setDateFormat("yyyyMMddHHmmss");
		eiColumn.setValueProperty("label");
		eiColumn.setEditor("Text");
		eiColumn.setReadonly(false);
		eiColumn.setVisible(true);
		eiColumn.setDisplayType("Text");
		eiColumn.setLabelProperty("value");
		eiMetadata.addMeta(eiColumn);

		eiColumn = new EiColumn("formStyle");
		eiColumn.setPrimaryKey(false);
		eiColumn.setFieldLength(2);
		eiColumn.setMaxLength(2);
		eiColumn.setDescName("画面技术风格");
		eiColumn.setType("C");
		eiColumn.setDateFormat("yyyyMMddHHmmss");
		eiColumn.setValueProperty("label");
		eiColumn.setEditor("Text");
		eiColumn.setReadonly(false);
		eiColumn.setVisible(true);
		eiColumn.setDisplayType("Text");
		eiColumn.setLabelProperty("value");
		eiMetadata.addMeta(eiColumn);

	}

	/**
	 * the constructor
	 */
	public EEMD00() {
		initMetaData();
	}

	/**
	 * get the recCreator - 记录创建责任者
	 * 
	 * @return the recCreator
	 */
	public String getRecCreator() {
		return this.recCreator;
	}

	/**
	 * set the recCreator - 记录创建责任者
	 */
	public void setRecCreator(String recCreator) {
		this.recCreator = recCreator;
	}

	/**
	 * get the recCreateTime - 记录创建时间
	 * 
	 * @return the recCreateTime
	 */
	public String getRecCreateTime() {
		return this.recCreateTime;
	}

	/**
	 * set the recCreateTime - 记录创建时间
	 */
	public void setRecCreateTime(String recCreateTime) {
		this.recCreateTime = recCreateTime;
	}

	/**
	 * get the recRevisor - 记录修改责任者
	 * 
	 * @return the recRevisor
	 */
	public String getRecRevisor() {
		return this.recRevisor;
	}

	/**
	 * set the recRevisor - 记录修改责任者
	 */
	public void setRecRevisor(String recRevisor) {
		this.recRevisor = recRevisor;
	}

	/**
	 * get the recReviseTime - 记录修改时刻
	 * 
	 * @return the recReviseTime
	 */
	public String getRecReviseTime() {
		return this.recReviseTime;
	}

	/**
	 * set the recReviseTime - 记录修改时刻
	 */
	public void setRecReviseTime(String recReviseTime) {
		this.recReviseTime = recReviseTime;
	}

	/**
	 * get the archiveFlag - 归档标记
	 * 
	 * @return the archiveFlag
	 */
	public String getArchiveFlag() {
		return this.archiveFlag;
	}

	/**
	 * set the archiveFlag - 归档标记
	 */
	public void setArchiveFlag(String archiveFlag) {
		this.archiveFlag = archiveFlag;
	}

	/**
	 * get the formEname - 画面英文名
	 * 
	 * @return the formEname
	 */
	public String getFormEname() {
		return this.formEname;
	}

	/**
	 * set the formEname - 画面英文名
	 */
	public void setFormEname(String formEname) {
		this.formEname = formEname;
	}

	/**
	 * get the formCname - 画面中文名
	 * 
	 * @return the formCname
	 */
	public String getFormCname() {
		return this.formCname;
	}

	/**
	 * set the formCname - 画面中文名
	 */
	public void setFormCname(String formCname) {
		this.formCname = formCname;
	}

	/**
	 * get the formLoadPath - 画面载入的路径
	 * 
	 * @return the formLoadPath
	 */
	public String getFormLoadPath() {
		return this.formLoadPath;
	}

	/**
	 * set the formLoadPath - 画面载入的路径
	 */
	public void setFormLoadPath(String formLoadPath) {
		this.formLoadPath = formLoadPath;
	}

	/**
	 * get the formType - 画面类型
	 * 
	 * @return the formType
	 */
	public String getFormType() {
		return this.formType;
	}

	/**
	 * set the formType - 画面类型
	 */
	public void setFormType(String formType) {
		this.formType = formType;
	}

	/**
	 * get the moduleEname1 - 一级模块英文名
	 * 
	 * @return the moduleEname1
	 */
	public String getModuleEname1() {
		return this.moduleEname1;
	}

	/**
	 * set the moduleEname1 - 一级模块英文名
	 */
	public void setModuleEname1(String moduleEname1) {
		this.moduleEname1 = moduleEname1;
	}

	/**
	 * get the moduleEname2 - 二级模块英文名
	 * 
	 * @return the moduleEname2
	 */
	public String getModuleEname2() {
		return this.moduleEname2;
	}

	/**
	 * set the moduleEname2 - 二级模块英文名
	 */
	public void setModuleEname2(String moduleEname2) {
		this.moduleEname2 = moduleEname2;
	}

	/**
	 * get the initLoadServiceEname - 初始处理服务英文名
	 * 
	 * @return the initLoadServiceEname
	 */
	public String getInitLoadServiceEname() {
		return this.initLoadServiceEname;
	}

	/**
	 * set the initLoadServiceEname - 初始处理服务英文名
	 */
	public void setInitLoadServiceEname(String initLoadServiceEname) {
		this.initLoadServiceEname = initLoadServiceEname;
	}

	/**
	 * get the isGrade - 是否设置分级授权
	 * 
	 * @return the isGrade
	 */
	public String getIsGrade() {
		return this.isGrade;
	}

	/**
	 * set the isGrade - 是否设置分级授权
	 */
	public void setIsGrade(String isGrade) {
		this.isGrade = isGrade;
	}

	/**
	 * get the isAuth - 是否授权
	 * 
	 * @return the isAuth
	 */
	public String getIsAuth() {
		return this.isAuth;
	}

	/**
	 * set the isAuth - 是否授权
	 */
	public void setIsAuth(String isAuth) {
		this.isAuth = isAuth;
	}

	/**
	 * get the formParam - 画面参数
	 * 
	 * @return the formParam
	 */
	public String getFormParam() {
		return this.formParam;
	}

	/**
	 * set the formParam - 画面参数
	 */
	public void setFormParam(String formParam) {
		this.formParam = formParam;
	}

	/**
	 * get the formStyle - 画面技术风格
	 * 
	 * @return the formStyle
	 */
	public String getFormStyle() {
		return this.formStyle;
	}

	/**
	 * set the formStyle - 画面技术风格
	 */
	public void setFormStyle(String formStyle) {
		this.formStyle = formStyle;
	}

	/**
	 * get the value from Map
	 */
	public void fromMap(Map map) {
		setRecCreator(StringUtils.defaultIfEmpty(StringUtils.toString(map
				.get("recCreator")), recCreator));
		setRecCreateTime(StringUtils.defaultIfEmpty(StringUtils.toString(map
				.get("recCreateTime")), recCreateTime));
		setRecRevisor(StringUtils.defaultIfEmpty(StringUtils.toString(map
				.get("recRevisor")), recRevisor));
		setRecReviseTime(StringUtils.defaultIfEmpty(StringUtils.toString(map
				.get("recReviseTime")), recReviseTime));
		setArchiveFlag(StringUtils.defaultIfEmpty(StringUtils.toString(map
				.get("archiveFlag")), archiveFlag));
		setFormEname(StringUtils.defaultIfEmpty(StringUtils.toString(map
				.get("formEname")), formEname));
		setFormCname(StringUtils.defaultIfEmpty(StringUtils.toString(map
				.get("formCname")), formCname));
		setFormLoadPath(StringUtils.defaultIfEmpty(StringUtils.toString(map
				.get("formLoadPath")), formLoadPath));
		setFormType(StringUtils.defaultIfEmpty(StringUtils.toString(map
				.get("formType")), formType));
		setModuleEname1(StringUtils.defaultIfEmpty(StringUtils.toString(map
				.get("moduleEname1")), moduleEname1));
		setModuleEname2(StringUtils.defaultIfEmpty(StringUtils.toString(map
				.get("moduleEname2")), moduleEname2));
		setInitLoadServiceEname(StringUtils.defaultIfEmpty(StringUtils
				.toString(map.get("initLoadServiceEname")),
				initLoadServiceEname));
		setIsGrade(StringUtils.defaultIfEmpty(StringUtils.toString(map
				.get("isGrade")), isGrade));
		setIsAuth(StringUtils.defaultIfEmpty(StringUtils.toString(map
				.get("isAuth")), isAuth));
		setFormParam(StringUtils.defaultIfEmpty(StringUtils.toString(map
				.get("formParam")), formParam));
		setFormStyle(StringUtils.defaultIfEmpty(StringUtils.toString(map
				.get("formStyle")), formStyle));
	}

	/**
	 * set the value to Map
	 */
	public Map toMap() {
		Map map = new HashMap();
		map.put("recCreator", StringUtils.toString(recCreator, eiMetadata
				.getMeta("recCreator")));
		map.put("recCreateTime", StringUtils.toString(recCreateTime, eiMetadata
				.getMeta("recCreateTime")));
		map.put("recRevisor", StringUtils.toString(recRevisor, eiMetadata
				.getMeta("recRevisor")));
		map.put("recReviseTime", StringUtils.toString(recReviseTime, eiMetadata
				.getMeta("recReviseTime")));
		map.put("archiveFlag", StringUtils.toString(archiveFlag, eiMetadata
				.getMeta("archiveFlag")));
		map.put("formEname", StringUtils.toString(formEname, eiMetadata
				.getMeta("formEname")));
		map.put("formCname", StringUtils.toString(formCname, eiMetadata
				.getMeta("formCname")));
		map.put("formLoadPath", StringUtils.toString(formLoadPath, eiMetadata
				.getMeta("formLoadPath")));
		map.put("formType", StringUtils.toString(formType, eiMetadata
				.getMeta("formType")));
		map.put("moduleEname1", StringUtils.toString(moduleEname1, eiMetadata
				.getMeta("moduleEname1")));
		map.put("moduleEname2", StringUtils.toString(moduleEname2, eiMetadata
				.getMeta("moduleEname2")));
		map.put("initLoadServiceEname", StringUtils.toString(
				initLoadServiceEname, eiMetadata
						.getMeta("initLoadServiceEname")));
		map.put("isGrade", StringUtils.toString(isGrade, eiMetadata
				.getMeta("isGrade")));
		map.put("isAuth", StringUtils.toString(isAuth, eiMetadata
				.getMeta("isAuth")));
		map.put("formParam", StringUtils.toString(formParam, eiMetadata
				.getMeta("formParam")));
		map.put("formStyle", StringUtils.toString(formStyle, eiMetadata
				.getMeta("formStyle")));
		return map;

	}
}