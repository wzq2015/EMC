package com.baosight.iplat4j.ee.dm.service;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.baosight.iplat4j.common.ed.domain.TEDPI10;
import com.baosight.iplat4j.common.ed.domain.Tedmd01;
import com.baosight.iplat4j.core.ei.EiBlock;
import com.baosight.iplat4j.core.ei.EiColumn;
import com.baosight.iplat4j.core.ei.EiConstant;
import com.baosight.iplat4j.core.ei.EiInfo;
import com.baosight.iplat4j.core.spring.SpringApplicationContext;
import com.baosight.iplat4j.ed.md.api.SeqGeneraterFacade;
import com.baosight.iplat4j.ep.ServiceEPBase;

public class ServiceEEDM00 extends ServiceEPBase {
	private static final Log logger = LogFactory.getLog(ServiceEEDM00.class);

	protected SeqGeneraterFacade getSeqGeneraterFacade() {
		return (SeqGeneraterFacade) SpringApplicationContext
				.getBean("edSeqGeneraterFacade");
	}

	public EiInfo initLoad(EiInfo inInfo) {
		EiInfo outInfo = super.initLoad(inInfo, new Tedmd01());
		return outInfo;
	}

	/**
	 * 获取示例节点
	 * */
	public EiInfo loadDemoNodes(EiInfo info){
		info.addBlock(generateParentNodeBlock(info));
		EiInfo out =  super.query(info, "EEDM00.queryDemo", new TEDPI10(), false, null, "parentNode_block", "parentNode_block", "parentNode_block");
		return out;
	}
	/**
	 * 获取示例节点2
	 * */
	public EiInfo loadLeafNodes(EiInfo info){
		info.addBlock(generateLeafNodeBlock(info));
		EiInfo out =  super.query(info, "EEDM00.queryDemo", new TEDPI10(), false, null, "leafNode_block", "leafNode_block", "leafNode_block");
		return out;
	}

	/**
	 * 构造一个页面Block
	 * @return
	 */
	private EiBlock generateParentNodeBlock(EiInfo info){
		EiBlock formsBlock = new EiBlock( "parentNode_block" );

		formsBlock.set(EiConstant.offsetStr, 0);
		formsBlock.set(EiConstant.limitStr, 1000);
		TEDPI10 tedpi10 = new TEDPI10();
		formsBlock.addBlockMeta(tedpi10.eiMetadata);
		formsBlock.setCell(0, "tree_ename",info.get("tree_ename"));
		return formsBlock;
	}
	/**
	 * 构造一个页面Block
	 * @return
	 */
	private EiBlock generateLeafNodeBlock(EiInfo info){
		EiBlock formsBlock = new EiBlock( "leafNode_block" );

		formsBlock.set(EiConstant.offsetStr, 0);
		formsBlock.set(EiConstant.limitStr, 1000);
		TEDPI10 tedpi10 = new TEDPI10();
		formsBlock.addBlockMeta(tedpi10.eiMetadata);
		formsBlock.setCell(0, "tree_ename",info.get("tree_ename"));
		return formsBlock;
	}
}
