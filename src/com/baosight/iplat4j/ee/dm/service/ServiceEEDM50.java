/**
 * 
 */
package com.baosight.iplat4j.ee.dm.service;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;

import org.apache.log4j.Logger;

import com.baosight.iplat4j.common.ee.domain.TEEDM01;
import com.baosight.iplat4j.core.ei.EiConstant;
import com.baosight.iplat4j.core.ei.EiInfo;
import com.baosight.iplat4j.core.ei.json.EiInfo2Json;
import com.baosight.iplat4j.core.ei.json.Json2EiInfo;
import com.baosight.iplat4j.core.soa.SoaManager;
import com.baosight.iplat4j.ep.ServiceEPBase;
import com.baosight.iplat4j.ep.util.MethodParamConstants;

/**
 * 
 *
 */
public class ServiceEEDM50 extends ServiceEPBase {

	private static final Logger logger = Logger.getLogger(ServiceEEDM50.class);

	/**
	 * 页面初始化
	 * @param EiInfo
	 * @return EiInfo
	 */
	public EiInfo initLoad(EiInfo inInfo) {
		
		EiInfo info = new EiInfo();
		//info.setCell("inqu_status", 0, "form_ename", formEname);
		info.setCell(EiConstant.queryBlock, 0, "formName", "EEDF04");
		info.set(EiConstant.serviceName, "EDMD10");
		info.set(EiConstant.methodName, "queryForm");
		
		EiInfo out = SoaManager.call(info);
//		
//		System.out.println(EiInfo2Json.toJsonString(out));
		
		
		

//		TEEDM01 teedm01 = new TEEDM01();
//		
//		
//		
//		EiInfo outInfo = super.initLoad(inInfo, teedm01);
//		
//		InputStream in = getClass().getResourceAsStream("106_json.txt");
//		
//		try{
//			
//			BufferedReader reader = new BufferedReader(new InputStreamReader(in,"GBK")); 
//			
//			//System.out.println(reader.readLine());
//			//outInfo.set("testjson", reader.readLine());
//			outInfo = Json2EiInfo.parse(reader.readLine());
//		}catch(Exception e){
//			
//		}
		
		
		//EiInfo out = Json2EiInfo.parse("");
		
		return out;
	}

	
		
	

}
