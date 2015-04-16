/**
 *
 */
package com.baosight.iplat4j.ee.dm.service;

import com.baosight.iplat4j.common.constant.EPResource;
import com.baosight.iplat4j.common.ee.domain.TEEDM01;
import com.baosight.iplat4j.common.ee.domain.TEEDM04;
import com.baosight.iplat4j.core.ei.EiConstant;
import com.baosight.iplat4j.core.ei.EiInfo;
import com.baosight.iplat4j.core.threadlocal.UserSession;
import com.baosight.iplat4j.ee.dm.utils.EEDMUtils;
import com.baosight.iplat4j.ep.ServiceEPBase;
import com.baosight.iplat4j.ep.util.MethodParamConstants;
import com.baosight.iplat4j.util.util.EiInfoUtil;

import java.util.HashMap;
import java.util.Map;

/**
 * @author wangyuqiu
 * 该类实现基本表单的查询 修改 功能
 */
public class ServiceEEDM03 extends ServiceEPBase {
    private String INQU_PROID = "inqu_status-0-productCode";
    private String RESULT_PROID = "result-0-productCode";

    /**
     * 初始加载函数
     */

    public EiInfo initLoad(EiInfo inInfo) {
        EiInfo outInfo = super.query(inInfo,"teedm04.query",new TEEDM04());
        outInfo.addBlock(EEDMUtils.generateBlock("product",new TEEDM04(),"teedm04.query"));
        outInfo.addBlock(EEDMUtils.generateBlock("company",new TEEDM01(),"teedm01.query"));
        outInfo.setMsgByKey(EPResource.EP_2001, new String[]{String.valueOf(UserSession.getLoginName())});
        return outInfo;
    }

    /**
     * 查询功能函数
     */
    public EiInfo query(EiInfo inInfo){
        inInfo.setMethodParam(MethodParamConstants.sqlName, "teedm04.query");
        if(inInfo.getBlock(EiConstant.resultBlock)!=null&&inInfo.getBlock(EiConstant.resultBlock).getAttr()==null){
            Map hashMap = new HashMap();
            hashMap.put("limit",1);
            hashMap.put("offset",0);
            hashMap.put("showCount",true);
            inInfo.getBlock("result").setAttr(hashMap);
        }
        inInfo.setMethodParam(MethodParamConstants.daoEPBaseBean, new TEEDM04());
        EiInfo outInfo = super.query(inInfo,true);
        outInfo.addBlock(EEDMUtils.generateBlock("product",new TEEDM04(),"teedm04.query"));
        outInfo.addBlock(EEDMUtils.generateBlock("company",new TEEDM01(),"teedm01.query"));


        return outInfo;
    }

    /**
     * 修改功能函数
     */
    public EiInfo update(EiInfo inInfo){
        TEEDM04 eedm04 = new TEEDM04();
        inInfo.getBlock(EiConstant.resultBlock).setBlockMeta(eedm04.eiMetadata);
        eedm04.fromMap(inInfo.getBlock(EiConstant.resultBlock).getRow(0));
        dao.update("teedm04.update", eedm04);
        inInfo.setMsgByKey(EPResource.EP_1000, new String[] {
                String.valueOf(1), "更新" });
        inInfo.set(INQU_PROID, inInfo.get(RESULT_PROID));
        return query(inInfo);
    }


}
