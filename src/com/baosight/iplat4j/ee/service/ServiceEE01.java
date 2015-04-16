/**
 * 
 */
package com.baosight.iplat4j.ee.service;

import com.baosight.iplat4j.core.ei.EiInfo;
import com.baosight.iplat4j.ee.domain.TEE01;
import com.baosight.iplat4j.ep.ServiceEPBase;
import com.baosight.iplat4j.logging.Logger;
import com.baosight.iplat4j.logging.LoggerFactory;
/**
 * @author 
 * 
 */
public class ServiceEE01 extends ServiceEPBase
{
	private static Logger logger = LoggerFactory.getLogger( ServiceEE01.class );
	
	public EiInfo initLoad( EiInfo inInfo )
	{		
		if ( logger.isDebugEnabled() )
		{
			logger.debug( "ServiceEE01:: initLoad invoked .... " );
		}
		EiInfo outInfo = new EiInfo();

		TEE01 loadTree = new TEE01();
		outInfo.set( "orgtree" , loadTree);
		
		return outInfo;
	}

}
