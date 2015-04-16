package com.baosight.iplat4j.ee.service;

import java.util.HashMap;
import java.util.List;

import com.baosight.iplat4j.core.ei.EiInfo;
import com.baosight.iplat4j.ee.domain.TEE60Z;
import com.baosight.iplat4j.ee.domain.TEE60ZZ;
import com.baosight.iplat4j.ep.ServiceEPBase;
import com.baosight.iplat4j.ep.util.QueryInfo;

public class ServiceEE60Z extends ServiceEPBase {
	
	private int i = 0;
	
	public EiInfo initLoad(EiInfo inInfo) {
		TEE60Z tee60 = new TEE60Z();
		return super.initLoad(inInfo,tee60);
	}
	
	
	public EiInfo queryByName(EiInfo inInfo) {
		
		String sql = inInfo.getString("querySqlName");
		return super.query(inInfo,sql);
		
	}
	public EiInfo query(EiInfo inInfo) {
		//inInfo.getBlock("").getRows().remove(0);
		TEE60ZZ tee60 = new TEE60ZZ();
//		HashMap map = new HashMap();
//		List list ;
//		QueryInfo qInfo = this.getQueryInfo(inInfo);
//		int i = dao.count("EE60Z.query", qInfo.getParam());
//		dao.query("EE60Z.query2", qInfo.getParam(), qInfo.getOffset(), qInfo.getLimit());

		
		//test chinese
		EiInfo outInfo1 = super.query(inInfo,"EE60ZZ.query",tee60);
		
		//test non sql
//		EiInfo outInfo2 = super.query(inInfo,"EE60Z.query3cc",tee60);
		
//		list = dao.query("EE60Z.subquery",qInfo.getParam());
//		list = dao.query("EE60Z.subquery2",qInfo.getParam());
		
//		try{
//			map.put("column1", "number1");
//			map.put("column2", "number2");
//			map.put("table", "tee60");
//			list = dao.query("EE60Z.dynaQuery",map);
//			}catch (Exception ex)
//			{
//				System.out.println(ex);
//			}
//			try{	
//				map.put("column1", "form_ename");
//				map.put("column2", "form_cname");
//				map.put("table", "tedfa00");
//				list = dao.query("EE60Z.dynaQuery",map);
//			}catch (Exception ex) {
//				System.out.println(ex);
//			}
//
//			try{
//				map.put("column1", "number1");
//				map.put("column2", "number2");
//				map.put("table", "tee60");
//				list = dao.query("EE60Z.dynaQuery2",map);
//				}catch (Exception ex)
//				{
//					System.out.println(ex);
//				}
//				try{
//					map.put("column1", "form_ename");
//					map.put("column2", "form_cname");
//					map.put("table", "tedfa00");
//					list = dao.query("EE60Z.dynaQuery2",map);
//				}catch (Exception ex) {
//					System.out.println(ex);
//				}

			
//		map.put("selectStr", " select * from iplat.tedfa00 ");
//		list = dao.query("EE60Z.dynaQueryFull",map);
//		
//		map.put("selectStr", " select * from iplat.tedfa01 ");
//		list = dao.query("EE60Z.dynaQueryFull", map);

		System.out.println(inInfo.get("count_i"));
		outInfo1.set("count_i", Integer.toString(i++));
		System.out.println(outInfo1.get("count_i"));
		System.out.println("**********");
		return outInfo1;
	}
	
	public EiInfo detele(EiInfo inInfo) {
		TEE60Z tee60 = new TEE60Z();

		super.delete(inInfo,"EE60Z.delete",tee60,true,null);
		return query(inInfo);
	}
	
	public EiInfo insert(EiInfo inInfo) {
		TEE60Z tee60 = new TEE60Z();
		
		System.out.println(super.count("EE60Z.count", null));

		super.insert(inInfo,"EE60Z.insert",tee60,true,null);

		System.out.println(super.count("EE60Z.count", null));

		super.insert(inInfo,"EE60Z.insert",tee60,true,null);

		return query(inInfo);
	}
	
	public EiInfo update(EiInfo inInfo) {
		TEE60Z tee60 = new TEE60Z();

		try{
		super.update(inInfo,"EE60Z.updateC1",null,false,null);
		}catch (Exception ex)
		{
			//nothing
		}
		try{
		super.update(inInfo,"EE60Z.updateC2",null,false,null);
		}catch (Exception ex) {
			//nothing
		}
		try{
		super.update(inInfo,"EE60Z.update2",null,false,null);
		}catch (Exception ex) {
			//nothing
		}

		return query(inInfo);
	}
	
	public EiInfo testName(EiInfo inInfo)
	{
		QueryInfo qInfo = this.getQueryInfo(inInfo);
		try{
		dao.query("EE60Z.query2", qInfo.getParam());
		}catch (Exception ex)
		{
			//nothing
		}
		try{
		dao.query("EE60Z.aaa.query2", qInfo.getParam());
		}catch(Exception ex)
		{
			//nothing
		}
		try{
		dao.query("EE60Z.bbb.query2", qInfo.getParam());
		}catch(Exception ex)
		{
			//nothing
		}
		try{
		dao.query("EE60Z.EE60Z.bbb.query2", qInfo.getParam());
		}catch(Exception ex)
		{
			//nothing
		}
		
		return inInfo;

	}

}
