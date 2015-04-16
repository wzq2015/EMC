  /**
   * Generate time : 2008-07-18 15:50:12
   * Version : 1.0.1.V20070717
   */
package com.baosight.iplat4j.ee.dm.domain;

import com.baosight.iplat4j.core.ei.EiColumn;
import com.baosight.iplat4j.ep.DaoEPBase;
import java.util.HashMap;
import java.util.Map;
import com.baosight.iplat4j.util.StringUtils;
/**
 * EEDM06 
 * table comment : 文件信息表 
 */
public class EEDM06 extends DaoEPBase {

	private String fileCode = " ";		// 文件代号
	private String fileName = " ";		// 文件名称
	private String fileUrl = " ";		// 文件路径
	private String haveObj = " ";		// 是否具有文件对象

	/**
	 * initialize the metadata 
	 */
	public void initMetaData() {
		EiColumn eiColumn;
		
	eiColumn = new EiColumn("fileCode");
	eiColumn.setPrimaryKey(true);
	eiColumn.setFieldLength(255);	
	eiColumn.setDescName("文件代号");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("fileName");
	eiColumn.setFieldLength(255);	
	eiColumn.setDescName("文件名称");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("fileUrl");
	eiColumn.setFieldLength(255);	
	eiColumn.setDescName("文件路径");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("haveObj");
	eiColumn.setFieldLength(255);	
	eiColumn.setDescName("是否具有文件对象");
	eiMetadata.addMeta(eiColumn);

	}
	/**
	 * the constructor
	 */
	public EEDM06() {
		initMetaData();
	}
	
	/**
	 * get the fileCode - 文件代号
	 * @return the fileCode
	 */
	public String getFileCode() {
		return this.fileCode;
	}
	
	/**
	 * set the fileCode - 文件代号
	 */
	public void setFileCode(String fileCode) {
		this.fileCode = fileCode;
	}
	
	/**
	 * get the fileName - 文件名称
	 * @return the fileName
	 */
	public String getFileName() {
		return this.fileName;
	}
	
	/**
	 * set the fileName - 文件名称
	 */
	public void setFileName(String fileName) {
		this.fileName = fileName;
	}
	
	/**
	 * get the fileUrl - 文件路径
	 * @return the fileUrl
	 */
	public String getFileUrl() {
		return this.fileUrl;
	}
	
	/**
	 * set the fileUrl - 文件路径
	 */
	public void setFileUrl(String fileUrl) {
		this.fileUrl = fileUrl;
	}
	
	/**
	 * get the haveObj - 是否具有文件对象
	 * @return the haveObj
	 */
	public String getHaveObj() {
		return this.haveObj;
	}
	
	/**
	 * set the haveObj - 是否具有文件对象
	 */
	public void setHaveObj(String haveObj) {
		this.haveObj = haveObj;
	}
	
	/**
	 * get the value from Map
	 */
	public void fromMap(Map map) {
	
		setFileCode(StringUtils.defaultIfEmpty(((String)map.get("fileCode")), fileCode));
		setFileName(StringUtils.defaultIfEmpty(((String)map.get("fileName")), fileName));
		setFileUrl(StringUtils.defaultIfEmpty(((String)map.get("fileUrl")), fileUrl));
		setHaveObj(StringUtils.defaultIfEmpty(((String)map.get("haveObj")), haveObj));
			//TODO fileObj cannot generate automatically ,byte[] dont support
	}
	
	/**
	 * set the value to Map
	 */
	public Map toMap() {
		
		Map map = new HashMap();
			map.put("fileCode",StringUtils.toString(fileCode, eiMetadata.getMeta("fileCode").getFieldLength(), eiMetadata.getMeta("fileCode").getScaleLength()));	
			map.put("fileName",StringUtils.toString(fileName, eiMetadata.getMeta("fileName").getFieldLength(), eiMetadata.getMeta("fileName").getScaleLength()));	
			map.put("fileUrl",StringUtils.toString(fileUrl, eiMetadata.getMeta("fileUrl").getFieldLength(), eiMetadata.getMeta("fileUrl").getScaleLength()));	
			map.put("haveObj",StringUtils.toString(haveObj, eiMetadata.getMeta("haveObj").getFieldLength(), eiMetadata.getMeta("haveObj").getScaleLength()));	
			
		return map;
	
	}
}