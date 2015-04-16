package com.baosight.iplat4j.ee.dm.service;

import com.baosight.iplat4j.core.ei.EiConstant;
import com.baosight.iplat4j.core.ei.EiInfo;
import com.baosight.iplat4j.core.soa.SoaManager;
import com.baosight.iplat4j.ee.dm.domain.Teedm31;
import com.baosight.iplat4j.ee.dm.utils.DMCommonTool;
import com.baosight.iplat4j.ep.ServiceEPBase;

public class ServiceEEDM31 extends ServiceEPBase 
{
	public EiInfo initLoad( EiInfo info )
	{
		EiInfo rnInfo = super.initLoad( info );
		return DMCommonTool.addRequiredBlocks( rnInfo );
	}
	
	public EiInfo query( EiInfo info )
	{
		long timeStart = System.currentTimeMillis();
		
		Teedm31  eedm31 = new Teedm31();
		EiInfo rnInfo = super.query(info, "EEDM31.query", eedm31 );
		rnInfo = DMCommonTool.addRequiredBlocks( rnInfo );
		long timeEnd = System.currentTimeMillis();
		
		rnInfo.set( "serviceSpanTime", new Integer( (int)(timeEnd - timeStart) ) );
		
		return rnInfo;
	}

	public static void main(String[] args) 
	{
		EiInfo info = new EiInfo();
		info.set( EiConstant.serviceName, "EEDM31" );
		info.set( EiConstant.methodName, "query" );
		
		info = SoaManager.invoke( info );
		
		System.out.println( "end" );

	}
}
