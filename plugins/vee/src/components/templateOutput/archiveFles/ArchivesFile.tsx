import React from 'react';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Collapse from '@mui/material/Collapse';
import { FcFolder, FcFile } from "react-icons/fc";
import { useArchivesFileStyles } from './styles';
import { MdOutlineExpandMore, MdChevronRight } from "react-icons/md";
import { ArchivesFileProps, TreeNode } from './types';

export const ArchivesFile: React.FC<ArchivesFileProps> = (props) => {
  const { data, handleCode } = props;
  const { root, menu, item, itemLabel, subMenu } = useArchivesFileStyles();
  const [menuOptions, setMenuOptions] = React.useState<Record<string, boolean>>({});

  const handleClick = (relativePath: string) => {
    setMenuOptions(prevState => ({
      ...prevState,
      [relativePath]: !prevState[relativePath]
    }));
  };

  const treeData = React.useMemo(() => {
    const rootNode: TreeNode = {
      name: 'root',
      relativePath: '',
      children: [],
      isFile: false,
    };

    const nodeMap: { [key: string]: TreeNode } = { '': rootNode };

    data.forEach(file => {
      const relativePath = file.relativePath || '';

      if (relativePath === file.name) {
        rootNode.children.push({
          name: file.name,
          relativePath: file.name,
          children: [],
          isFile: true,
          file: file,
        });
      } else {
        const parts = relativePath.split('/');
        const filename = parts.pop()!; 
        let currentPath = '';
        let currentNode = rootNode;

        parts.forEach((part) => {
          if (part) {
            const newPath = currentPath ? `${currentPath}/${part}` : part;
            if (!nodeMap[newPath]) {
              const newNode: TreeNode = {
                name: part,
                relativePath: newPath,
                children: [],
                isFile: false,
              };
              nodeMap[newPath] = newNode;
              currentNode.children.push(newNode);
            }
            currentNode = nodeMap[newPath];
            currentPath = newPath;
          }
        });

        currentNode.children.push({
          name: filename,
          relativePath: relativePath,
          children: [],
          isFile: true,
          file: file,
        });
      }
    });

    return rootNode.children;
  }, [data]);

  const getLanguageFromFilename = (filename: string) => {
    if (filename.startsWith('.')) {
      const extension = filename.substring(1).toLowerCase();
      return extension === 'md' ? 'markdown' : extension;
    }
    const parts = filename.split('.');
    if (parts.length > 1) {
      const extension = parts.pop()!.toLowerCase();
      return extension === 'md' ? 'markdown' : extension;
    }
    return 'text';
  };

  const renderTree = (nodes: TreeNode[], path = '') => {
    const folders: TreeNode[] = [];
    const files: TreeNode[] = [];

    nodes.forEach(node => {
      if (node.isFile) {
        files.push(node);
      } else {
        folders.push(node);
      }
    });

    const sortedNodes = [...folders, ...files];

    return sortedNodes.map(node => {
      const fullPath = path ? `${path}/${node.name}` : node.name;
      const isFolderOpen = !!menuOptions[node.relativePath];

      if (!node.isFile) {
        return (
          <React.Fragment key={fullPath}>
            <MenuItem onClick={() => handleClick(node.relativePath)} className={item}>
              {isFolderOpen ? <MdOutlineExpandMore /> : <MdChevronRight />}
              <ListItemIcon>
                <FcFolder size={20} />
              </ListItemIcon>
              <ListItemText className={itemLabel}>{node.name}</ListItemText>
            </MenuItem>
            <Collapse in={isFolderOpen} timeout="auto" unmountOnExit>
              <MenuList component="div" disablePadding className={subMenu}>
                {renderTree(node.children, node.relativePath)}
              </MenuList>
            </Collapse>
          </React.Fragment>
        );
      }

      return (
        <MenuItem
          className={item}
          key={fullPath}
          onClick={() => {
            if (node.file) {
              const language = getLanguageFromFilename(node.file.name);
              handleCode(language, node.file.content);
            }
          }}
        >
          <ListItemIcon>
            <FcFile size={20} />
          </ListItemIcon>
          <ListItemText className={itemLabel}>{node.name}</ListItemText>
        </MenuItem>
      );
    });
  };

  return (
    <Paper className={root}>
      <MenuList className={menu}>
        {renderTree(treeData)}
      </MenuList>
    </Paper>
  );
};