
package com.baosight.iplat4j.ee.dm.service;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import org.apache.log4j.Logger;

import com.baosight.iplat4j.core.ei.EiBlock;
import com.baosight.iplat4j.core.ei.EiColumn;
import com.baosight.iplat4j.core.ei.EiInfo;
import com.baosight.iplat4j.ep.ServiceEPBase;
/**
 * @author supan
 *
 */

public class ServiceEEDM57 extends ServiceEPBase {

	private static final Logger logger = Logger.getLogger(ServiceEEDM56.class);

	/**
	 * 页面初始化
	 * @param EiInfo
	 * @return EiInfo
	 */
	
	
	public EiInfo initLoad(EiInfo inInfo) {
		
		
	    EiBlock eiBlock = new EiBlock("result");

		 EiColumn eicol1 = new EiColumn("dbid");
		 eicol1.setDescName("实例ID1");

		 EiColumn eicol2 = new EiColumn("dbid2");
		 eicol2.setDescName("实例ID2");
	     
		 eiBlock.addMeta(eicol1);
		 eiBlock.addMeta(eicol2);
		 
		 
		 
		 ArrayList<String> Country=new ArrayList<String>();
		 ArrayList<String> City=new ArrayList<String>();
		 Country.add("中国");
		 Country.add("日本");
		 Country.add("美国");
		 Country.add("澳大利亚");
		 Country.add("韩国");
		 Country.add("朝鲜");
		 City.add("北京");
		 City.add("东京");
		 City.add("纽约");
		 City.add("悉尼");
		 City.add("首尔");
		 City.add("平壤");

		 for(int i=0;i<Country.size();i++)
		 {
			 Map<String,String> m=new HashMap<String,String>();
			 m.put("dbid", Country.get(i));
			 m.put("dbid2", City.get(i));
			 
			 eiBlock.addRow(m);
		 }
		 
//         Map<String,String> m=new HashMap<String,String>();
//		 Map<String,String> m1=new HashMap<String,String>();
//		 Map<String,String> m2=new HashMap<String,String>();
//		 Map<String,String> m3=new HashMap<String,String>();
//		 Map<String,String> m4=new HashMap<String,String>();
//		 Map<String,String> m5=new HashMap<String,String>();
//		 m.put("dbid", "中国");
//		 m.put("dbid2", "北京");
//		 m1.put("dbid", "日本");
//		 m1.put("dbid2", "东京");
//		 m2.put("dbid", "美国");
//		 m2.put("dbid2", "纽约");
//		 m3.put("dbid", "澳大利亚");
//		 m3.put("dbid2", "悉尼");
//		 m4.put("dbid", "韩国");
//		 m4.put("dbid2", "首尔");
//		 m5.put("dbid", "朝鲜");
//		 m5.put("dbid2", "平壤");
//		 eiBlock.addRow(m);
//		 eiBlock.addRow(m1);
//		 eiBlock.addRow(m2);
//		 eiBlock.addRow(m3);
//		 eiBlock.addRow(m4);
//		 eiBlock.addRow(m5);
		 EiInfo outInfo = new EiInfo();
		 outInfo.addBlock(eiBlock);
		
		 return outInfo;
		
		
		
		
		//return query(inInfo);
	}

//	/**
//	 * 查询
//	 * @param 包含查询参数的EiInfo
//	 * @return 包含查询结果数据集的EiInfo
//	 */
//	public EiInfo query(EiInfo inInfo) {
//
//		TEEDM01 teedm01 = new TEEDM01();
//
//		inInfo.setMethodParam(MethodParamConstants.sqlName, "teedm01.query");
//		inInfo.setMethodParam(MethodParamConstants.daoEPBaseBean, teedm01);
//
//		EiInfo outInfo = super.query(inInfo, true);
//
//		return outInfo;
//	}


	
	}
