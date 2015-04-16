package com.baosight.iplat4j.ee.service;

import com.baosight.iplat4j.core.ei.EiInfo;
import com.baosight.iplat4j.ee.domain.TEE60Z;
import com.baosight.iplat4j.ee.domain.TEE60ZZ;
import com.baosight.iplat4j.ep.util.QueryInfo;
import com.baosight.iplat4j.ep.util.ServiceEPSdsBase;

public class ServiceEE60ZZ extends ServiceEPSdsBase {
	
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

		
		//test chinese
		EiInfo outInfo1 = super.query(inInfo,"EE60ZZ.query",tee60);
		

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
		super.insert(inInfo,"EE60Z.insert");
		
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
