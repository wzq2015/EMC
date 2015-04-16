package com.baosight.iplat4j.ee.dd.service;
import org.apache.log4j.Logger;

import com.baosight.iplat4j.common.ee.domain.TEE11;
import com.baosight.iplat4j.core.ei.EiInfo;
import com.baosight.iplat4j.core.exception.PlatException;
import com.baosight.iplat4j.core.soa.SoaManager;
import com.baosight.iplat4j.ep.ServiceEPBase;
import com.baosight.iplat4j.util.DateUtils;

public class ServiceEEDD00 extends ServiceEPBase {

	private static final Logger logger = Logger.getLogger(ServiceEEDD00.class);

	private static int i = 0;
	
	public EiInfo initLoad(EiInfo inInfo) {
		TEE11 tee11 = new TEE11();
		EiInfo outInfo = super.initLoad(inInfo, tee11);
		return outInfo;
	}

	public EiInfo query(EiInfo inInfo) {
		i++;
		TEE11 tee11 = new TEE11();
		EiInfo outInfo = super.query(inInfo, "tee11.query", tee11);
		
//		if (i%2 == 0)
			return outInfo;
//		else
//			throw new PlatException("测试异常");

	}	
	
	//测试异常的catch并throw,应该回滚
	public EiInfo delete(EiInfo inInfo) {
		super.delete(inInfo,"tee11.delete");
		inInfo.set("methodName", "query");
		EiInfo outInfo = new EiInfo();
		try{
		  outInfo = SoaManager.invoke(inInfo);
		}catch(Exception e)
		{
			logger.error(e);
			if(e instanceof PlatException)
				throw (PlatException)e;
		}
		return outInfo;
	}

	//test,call query by soaManager
	//测试异常,不catch,应回滚
	public EiInfo update(EiInfo inInfo) {
		super.update(inInfo,"tee11.update");

		inInfo.set("methodName", "query");
		return SoaManager.invoke(inInfo);
	}

	//测试异常的catch,应该不回滚
	public EiInfo insert(EiInfo inInfo) {
		super.insert(inInfo,"tee11.insert");
		EiInfo outInfo = new EiInfo();
		try{
		  outInfo = query(inInfo);
		}catch(Exception e)
		{
			logger.error(e);
		}
		return outInfo;
	}

	//测试异常的catch,应该不回滚
	public EiInfo insert2(EiInfo inInfo) {
		insert(inInfo,"tee11.insert");
		EiInfo outInfo = new EiInfo();
		try{
		  outInfo = query(inInfo);
		}catch(Exception e)
		{
			logger.error(e);
		}
		return outInfo;
	}
	
	//测试调用
	public EiInfo insertTest(EiInfo inInfo) {
		
		TEE11 tee11 = new TEE11();
		tee11.rec_creator = DateUtils.curTimeStr6();

		dao.insert("tee11.insert", tee11);
		
		EiInfo outInfo = new EiInfo();
		
		outInfo.setStatus(-1);
		
		//throw new PlatException("sdfdsf");

		return outInfo;
	}


}