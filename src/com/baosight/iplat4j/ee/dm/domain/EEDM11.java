  /**
   * Generate time : 2008-07-18 10:39:10
   * Version : 1.0.1.V20070717
   */
package com.baosight.iplat4j.ee.dm.domain;

import java.io.UnsupportedEncodingException;
import java.util.HashMap;
import java.util.Map;

import com.baosight.iplat4j.core.ei.EiColumn;
import com.baosight.iplat4j.ep.DaoEPBase;
import com.baosight.iplat4j.util.StringUtils;
/**
 * EEDM11 
 * table comment : 协议信息表 
 */
public class EEDM11 extends DaoEPBase {

	private String protoCode = " ";		// 协议代号
	private String protoName = " ";		// 协议名称
	private String protoBrief = " ";		// 协议简介
	private byte[] protoMsg;	// 协议详细信息

	/**
	 * initialize the metadata 
	 */
	public void initMetaData() {
		EiColumn eiColumn;
		
	eiColumn = new EiColumn("protoCode");
	eiColumn.setPrimaryKey(true);
	eiColumn.setFieldLength(16);	
	eiColumn.setDescName("协议代号");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("protoName");
	eiColumn.setFieldLength(32);	
	eiColumn.setDescName("协议名称");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("protoBrief");
	eiColumn.setDescName("协议简介");
	eiMetadata.addMeta(eiColumn);
	
	eiColumn = new EiColumn("protoMsg");
	eiColumn.setDescName("协议详细信息");
	eiMetadata.addMeta(eiColumn);
	

	}
	/**
	 * the constructor
	 */
	public EEDM11() {
		initMetaData();
	}
	
	/**
	 * get the protoCode - 协议代号
	 * @return the protoCode
	 */
	public String getProtoCode() {
		return this.protoCode;
	}
	
	/**
	 * set the protoCode - 协议代号
	 */
	public void setProtoCode(String protoCode) {
		this.protoCode = protoCode;
	}
	
	/**
	 * get the protoName - 协议名称
	 * @return the protoName
	 */
	public String getProtoName() {
		return this.protoName;
	}
	
	/**
	 * set the protoName - 协议名称
	 */
	public void setProtoName(String protoName) {
		this.protoName = protoName;
	}
	
	/**
	 * get the protoBrief - 协议简介
	 * @return the protoBrief
	 */
	public String getProtoBrief() {
		return this.protoBrief;
	}
	
	/**
	 * set the protoBrief - 协议简介
	 */
	public void setProtoBrief(String protoBrief) {
		this.protoBrief = protoBrief;
	}
	
	/**
	 * get the protoMsg - 协议详细信息
	 * @return the protoMsg
	 */
	public byte[] getProtoMsg() {
		return this.protoMsg;
	}
	
	/**
	 * set the protoMsg - 协议详细信息
	 */
	public void setProtoMsg(byte[] protoMsg) {
		this.protoMsg = protoMsg;
	}
	
	/**
	 * get the value from Map
	 */
	public void fromMap(Map map) {
	
		setProtoCode(StringUtils.defaultIfEmpty(((String)map.get("protoCode")), protoCode));
		setProtoName(StringUtils.defaultIfEmpty(((String)map.get("protoName")), protoName));
		setProtoBrief(StringUtils.defaultIfEmpty(((String)map.get("protoBrief")), protoBrief));
			//TODO protoMsg cannot generate automatically ,byte[] dont support
		
		String proto_Msg=(String)map.get("protoMsg");

		byte[] proto_MsgBytes;
		try {
			proto_MsgBytes=(proto_Msg == null) ? null : proto_Msg.getBytes("UTF-8");
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
			proto_MsgBytes=null;
		}
		this.setProtoMsg(proto_MsgBytes);		
	}
	
	/**
	 * set the value to Map
	 */
	public Map toMap() {
		
		Map map = new HashMap();
			map.put("protoCode",StringUtils.toString(protoCode, eiMetadata.getMeta("protoCode").getFieldLength(), eiMetadata.getMeta("protoCode").getScaleLength()));	
			map.put("protoName",StringUtils.toString(protoName, eiMetadata.getMeta("protoName").getFieldLength(), eiMetadata.getMeta("protoName").getScaleLength()));	
			map.put("protoBrief",StringUtils.toString(protoBrief, eiMetadata.getMeta("protoBrief").getFieldLength(), eiMetadata.getMeta("protoBrief").getScaleLength()));	

			//body field is blob
			String proto_Msg;
			try {
				proto_Msg = (protoMsg==null)? null :new String(protoMsg ,"UTF-8") ;
			} catch (UnsupportedEncodingException e) {
				e.printStackTrace();
				proto_Msg=null;
			}
			map.put("protoMsg",proto_Msg);
			// body field end			
			
		return map;
	
	}
}