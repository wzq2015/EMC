/**
 * 
 */
package com.baosight.iplat4j.ee.dm.service;

import org.apache.log4j.Logger;

import com.baosight.iplat4j.common.ee.domain.TEEDM01;
import com.baosight.iplat4j.common.ee.domain.TEEDM04;
import com.baosight.iplat4j.core.ei.EiBlock;
import com.baosight.iplat4j.core.ei.EiConstant;
import com.baosight.iplat4j.core.ei.EiInfo;
import com.baosight.iplat4j.core.soa.SoaManager;
import com.baosight.iplat4j.core.threadlocal.UserSession;
import com.baosight.iplat4j.ep.ServiceEPBase;
import com.baosight.iplat4j.ep.util.MethodParamConstants;

/**
 * @author yangfujun
 * edite by wangyuqiu 2008-7-22
 */
public class ServiceEEDM02 extends ServiceEPBase {

//	private static final String USER_SESSION_LOG = "userSessionLog";
	private static final Logger logger = Logger.getLogger(ServiceEEDM02.class);

	/**
	 * 页面初始化
	 * @param EiInfo 包含初始化参数
	 * @return EiInfo 包含Product及Company的元数据信息
	 */
	public EiInfo initLoad(EiInfo inInfo) {
		TEEDM04 teedm04 = new TEEDM04();
		EiInfo outInfo = super.initLoad(inInfo, teedm04);
		
		outInfo.addBlock(getCompanyBlock());
		
		// 从UserSession获取当前登录用户名
		logger.info("当前登录用户为：" + UserSession.getLoginName());
		
		return outInfo;
	}

	/**
	 * 根据EiInfo包含的查询参数查询Product记录
	 * @param 包含查询参数的EiInfo
	 * @return 包含查询结果数据集的EiInfo
	 */
	public EiInfo query(EiInfo inInfo) {
		TEEDM04 teedm04 = new TEEDM04();

		inInfo.setMethodParam(MethodParamConstants.sqlName, "EEDM04.query2");
		inInfo.setMethodParam(MethodParamConstants.daoEPBaseBean, teedm04);
		EiInfo outInfo = super.query(inInfo, true);
		
		outInfo.addBlock(getCompanyBlock());
		
//		UserSessionLog log = (UserSessionLog) UserSession.getInSessionProperty(USER_SESSION_LOG);
//		if (log == null) {
//			log = new UserSessionLog();
//			UserSession.setOutSessionProperty(USER_SESSION_LOG, log);
//		}
//		
//		logger.info(log);

		return outInfo;
	}
	
	/**
	 * 得到包含Company记录的Block
	 * @return 包含Company记录的Block
	 */
	protected EiBlock getCompanyBlock() {
		// 复用用ServiceEEDM01.query
		EiInfo info = new EiInfo();
		info.set(EiConstant.serviceName, "EEDM01");
		info.set(EiConstant.methodName, "query");
		EiInfo outInfo = SoaManager.call(info);
		
		// 将BlockId="result"改为"company"
		EiBlock block = outInfo.getBlock("result");
		block.getBlockMeta().setBlockId("company");
		return block;
	}
	
	/**
	 * 取得公司信息的eiinfo
	 * @param inInfo
	 * @return
	 */
	public EiInfo getCompany(EiInfo inInfo) {
		inInfo.setMethodParam(MethodParamConstants.sqlName, "teedm01.query");
		inInfo.setMethodParam(MethodParamConstants.daoEPBaseBean, new TEEDM01());
		inInfo.setMethodParam(MethodParamConstants.outDataBlock, "company");
		inInfo.setMethodParam(MethodParamConstants.inDataBlock, "company");
		return super.query(inInfo, true);
	}
	/**
	 * 添加EiInfo中包含的新记录
	 * @param 包含添加记录的EiInfo
	 * @return 返回添加记录后重新查询得到的结果数据集的EiInfo
	 */
	public EiInfo insert(EiInfo inInfo) {
		TEEDM04 teedm04 = new TEEDM04();

		inInfo.set(EiConstant.sqlName, "teedm04.insert");
		inInfo.getBlock("result").setBlockMeta(teedm04.eiMetadata);
		inInfo.addBlock(getCompanyBlock());
		super.insert(inInfo);
		
//		UserSessionLog log = (UserSessionLog) UserSession.getInSessionProperty(USER_SESSION_LOG);
//		log.inserts += inInfo.getBlock(EiConstant.resultBlock).getRowCount();
		
		return query(inInfo);
	}

	/**
	 * 修改EiInfo中指定的记录
	 * @param 包含修改记录的EiInfo
	 * @return 返回修改指定记录后重新查询得到的结果数据集的EiInfo
	 */
	public EiInfo update(EiInfo inInfo) {
		TEEDM04 teedm04 = new TEEDM04();
		
		inInfo.set(EiConstant.sqlName, "teedm04.update");
		inInfo.getBlock("result").setBlockMeta(teedm04.eiMetadata);

		super.update(inInfo);
		
//		UserSessionLog log = (UserSessionLog) UserSession.getInSessionProperty(USER_SESSION_LOG);
//		log.updates += inInfo.getBlock(EiConstant.resultBlock).getRowCount();
		
		return query(inInfo);
	}

	/**
	 * 删除EiInfo中指定的记录
	 * @param 包含删除参数的EiInfo
	 * @return 返回删除指定记录后重新查询的结果数据集的EiInfo
	 */
	public EiInfo delete(EiInfo inInfo) {
		TEEDM04 teedm04 = new TEEDM04();
		
		inInfo.set(EiConstant.sqlName, "teedm04.delete");
		inInfo.getBlock("result").setBlockMeta(teedm04.eiMetadata);

		super.delete(inInfo);
		
//		UserSessionLog log = (UserSessionLog) UserSession.getInSessionProperty(USER_SESSION_LOG);
//		log.deletes += inInfo.getBlock(EiConstant.resultBlock).getRowCount();
		
		return query(inInfo); //删除记录后重新查询刷新显示页面
	}

//	/**
//	 * 记录当前用户回话操作信息的对象
//	 */
//	class UserSessionLog implements Serializable {
//		
//		private static final long serialVersionUID = 5638545966407312286L;
//		
//		int inserts;	/** 新增记录数 */
//		int updates;	/** 修改记录数 */
//		int deletes;	/** 删除记录数 */
//		
//		public String toString() {
//			return	"当前用户回话新增" + inserts + 
//					"记录，修改" + updates + 
//					"记录，删除" + deletes + "记录";
//		}
//	}
}
