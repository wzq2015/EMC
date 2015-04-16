package com.baosight.iplat4j.ee.dm.utils;

import java.util.HashMap;
import java.util.Map;

import com.baosight.iplat4j.core.ei.EiBlock;
import com.baosight.iplat4j.core.ei.EiColumn;
import com.baosight.iplat4j.core.ei.EiConstant;
import com.baosight.iplat4j.core.ei.EiInfo;
import com.baosight.iplat4j.core.soa.SoaManager;

public class DMCommonTool 
{
	public static EiInfo addRequiredBlocks( EiInfo info )
	{
		info.addBlock( getAppEiInfo() );
		
		EiBlock typeBlock = new EiBlock( "Type" );
		EiColumn column1 = new EiColumn( "moduleType" );
		column1.setType( "C" );
		
		EiColumn column2 = new EiColumn( "moduleTypeDisplayName" );
		column2.setType( "C" );
		
		typeBlock.addMeta( column1 );
		typeBlock.addMeta( column2 );
		
		Map typeMap1 = new HashMap();
		typeMap1.put( "moduleType", "0" );
		typeMap1.put( "moduleTypeDisplayName", "基础模块" );
		
		Map typeMap2 = new HashMap();
		typeMap2.put( "moduleType", "1" );
		typeMap2.put( "moduleTypeDisplayName", "业务模块" );
		
		typeBlock.addRow( typeMap1 );
		typeBlock.addRow( typeMap2 );
		
		info.addBlock( typeBlock );
		
		// 服务调用终止时间
		return info;
	}
	
	private static EiBlock getAppEiInfo() 
	{
		EiInfo info = new EiInfo();
		info.set( EiConstant.serviceName , "EDPI01" );
		info.set( EiConstant.methodName, "query" );
		
		info = SoaManager.invoke( info );
		
		EiBlock block = info.getBlock( EiConstant.resultBlock );
		
		EiBlock appBlock = new EiBlock("Application");
		
		EiColumn column1 = new EiColumn( "application" );
		column1.setType( "C" );
		
		EiColumn column2 = new EiColumn( "applicationName" );
		column2.setType( "C" );
		
		appBlock.addMeta( column1 );
		appBlock.addMeta( column2 );
		
		for( int i = 0; i < block.getRowCount(); i++ )
		{
			Map row = new HashMap();
			row.put( "application", block.getRow( i ).get( "projectEname" ) );
			row.put( "applicationName", block.getRow( i ).get( "projectEname" ) );
			appBlock.addRow( row );
		}
		
		return appBlock;
	}

}
