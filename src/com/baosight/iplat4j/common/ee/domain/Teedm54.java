  /**
   * Generate time : 2011-09-05 10:13:53
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
 * Teedm54 
 * table comment : 组织架构图(横向)测试表 
 */
public class Teedm54 extends DaoEPBase {

	private String nodeEname = " ";		/* 节点编号*/
	private String nodeCname = " ";		/* 节点中文名*/
	private String treeEname = " ";		/* 父节点编号*/
	private Integer nodeType = new Integer(0);		/* 节点类型*/

	/**
	 * initialize the metadata 
	 */
	public void initMetaData() {
		EiColumn eiColumn;
		
	eiColumn = new EiColumn("nodeEname");
	eiColumn.setPrimaryKey(true);
	eiColumn.setFieldLength(30);	
	eiColumn.setDescName("节点编号");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("nodeCname");
	eiColumn.setFieldLength(80);	
	eiColumn.setDescName("节点中文名");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("treeEname");
	eiColumn.setFieldLength(30);	
	eiColumn.setDescName("父节点编号");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("nodeType");
	eiColumn.setType("N");
	eiColumn.setScaleLength(0);
	eiColumn.setFieldLength(1);
	eiColumn.setDescName("节点类型");
	eiMetadata.addMeta(eiColumn);
	

	}
	/**
	 * the constructor
	 */
	public Teedm54() {
		initMetaData();
	}
	
	/**
	 * get the nodeEname - 节点编号
	 * @return the nodeEname
	 */
	public String getNodeEname() {
		return this.nodeEname;
	}
	
	/**
	 * set the nodeEname - 节点编号
	 */
	public void setNodeEname(String nodeEname) {
		this.nodeEname = nodeEname;
	}
	
	/**
	 * get the nodeCname - 节点中文名
	 * @return the nodeCname
	 */
	public String getNodeCname() {
		return this.nodeCname;
	}
	
	/**
	 * set the nodeCname - 节点中文名
	 */
	public void setNodeCname(String nodeCname) {
		this.nodeCname = nodeCname;
	}
	
	/**
	 * get the treeEname - 父节点编号
	 * @return the treeEname
	 */
	public String getTreeEname() {
		return this.treeEname;
	}
	
	/**
	 * set the treeEname - 父节点编号
	 */
	public void setTreeEname(String treeEname) {
		this.treeEname = treeEname;
	}
	
	/**
	 * get the nodeType - 节点类型
	 * @return the nodeType
	 */
	public Integer getNodeType() {
		return this.nodeType;
	}
	
	/**
	 * set the nodeType - 节点类型
	 */
	public void setNodeType(Integer nodeType) {
		this.nodeType = nodeType;
	}
	
	/**
	 * get the value from Map
	 */
	public void fromMap(Map map) {
	
		setNodeEname(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("nodeEname")), nodeEname));
		setNodeCname(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("nodeCname")), nodeCname));
		setTreeEname(StringUtils.defaultIfEmpty(StringUtils.toString(map.get("treeEname")), treeEname));
		setNodeType(NumberUtils.toInteger(StringUtils.toString(map.get("nodeType")), nodeType));
	}
	
	/**
	 * set the value to Map
	 */
	public Map toMap() {
		
		Map map = new HashMap();
			map.put("nodeEname",StringUtils.toString(nodeEname, eiMetadata.getMeta("nodeEname")));	
			map.put("nodeCname",StringUtils.toString(nodeCname, eiMetadata.getMeta("nodeCname")));	
			map.put("treeEname",StringUtils.toString(treeEname, eiMetadata.getMeta("treeEname")));	
			map.put("nodeType",StringUtils.toString(nodeType, eiMetadata.getMeta("nodeType")));	
			
		return map;
	
	}
}