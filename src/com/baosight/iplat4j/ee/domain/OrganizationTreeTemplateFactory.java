package com.baosight.iplat4j.ee.domain;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.baosight.iplat4j.dao.Dao;
import com.baosight.iplat4j.ef.ui.template.tree.TreeTemplate;
import com.baosight.iplat4j.ef.ui.template.tree.TreeTemplateNode;
import com.baosight.iplat4j.ef.ui.template.tree.TreeTemplateUtils;

public class OrganizationTreeTemplateFactory {

	public final static String PARENT = "PARENT";

	private Dao templateDao;

	private int depth = -1;

	private Map parameter = new HashMap();

	public TreeTemplate getTreeTemplate(String id) {
		return createTemplate(id);
	}

	protected TreeTemplate createTemplate(String treeId) {
		TreeTemplate menu = TreeTemplateUtils.newTreeTemplate();
		List children = getChildrenNodes(treeId);
		for (int i = 0; i < children.size(); i++) {
			OrganizationNode node = (OrganizationNode) children.get(i);
			TreeTemplateNode topNode = menu.addTopNode(node.getLabel(), node
					.getText());
			createMenuNode(topNode, 1);
		}
		return menu;
	}

	protected void createMenuNode(TreeTemplateNode parent, int dep) {
		if ( depth != -1 && dep >= depth) {
			return;
		}

		List children = getChildrenNodes(parent.getLabel());	
		
		for (int i = 0; i < children.size(); i++) {
			OrganizationNode node = (OrganizationNode) children.get(i);
			TreeTemplateNode thisNode = parent.addSubNode(node.getLabel(), node
					.getText());
			createMenuNode(thisNode, dep+1);			
		}
	}

	private List getChildrenNodes(String parent) {
		parameter.put(PARENT, parent);
		List children = templateDao.query(parameter);
		return children;
	}

	public Dao getDao() {
		return templateDao;
	}

	public void setDao(Dao templateDao) {
		this.templateDao = templateDao;
	}

	public int getDepth() {
		return depth;
	}

	public void setDepth(int depth) {
		this.depth = depth;
	}

}
