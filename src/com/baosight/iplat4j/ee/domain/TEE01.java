package com.baosight.iplat4j.ee.domain;

import java.util.ArrayList;
import java.util.List;

import com.baosight.iplat4j.ef.ui.tree.LoadTreeModel;
import com.baosight.iplat4j.ef.ui.tree.TreeNode;
import com.baosight.iplat4j.ef.ui.tree.TreeNodeImpl;

public class TEE01 implements LoadTreeModel {
	private static int signal = 0;
	private final static String KEY_MESSAGE = "message";
	
	public TreeNode[] getChildren(String parent) {
		signal++;		
		List ret = new ArrayList();
		for (int i = 0; i < 10; i++) {			
			if ( signal % 2 == 0 ){
				TreeNode tnode = new TreeNodeImpl(parent + i, parent + i, false);
				tnode.setProperty( KEY_MESSAGE , "hello, I am " + tnode.getLabel());
				ret.add(tnode);
			}else{
				TreeNode tnode = new TreeNodeImpl(parent + i, "$" + parent + i, false);
				tnode.setProperty( KEY_MESSAGE , "hello, I am " + tnode.getLabel());
				ret.add(tnode);
			}			
		}
		return (TreeNode[]) ret.toArray(new TreeNode[] {});
	}

	public TreeNode[] getTopNodes() {
		List ret = new ArrayList();
		for (int i = 0; i < 10; i++) {
			boolean leaf = false;
			if ( i < 5 ) leaf = true;
			
			TreeNode tnode = new TreeNodeImpl(i + "", i + "", leaf);
			tnode.setProperty( KEY_MESSAGE , "hello, I am " + tnode.getLabel());
			ret.add(tnode);
		}
		return (TreeNode[]) ret.toArray(new TreeNode[] {});
	}

	public TreeNode getParent(String element) {
		int len = element.length();
		if ( len == 1 ){
			return null;
		}
		String parent = element.substring( 0 , len-1 );		
		TreeNode tnode = new TreeNodeImpl(parent, parent, false);
		return tnode;		
	}

}
