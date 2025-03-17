import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Collapse from '@mui/material/Collapse';
import { FcFolder, FcFile } from "react-icons/fc";
import { useArchivesFileStyles } from './styles';
import { MdOutlineExpandMore } from "react-icons/md";
import { MdChevronRight } from "react-icons/md";

export const ArchivesFile = () => {
  const { root, menu, item, itemLabel, subMenu } = useArchivesFileStyles();
  const [openDocs, setOpenDocs] = useState(false);
  const [openSkeleton, setOpenSkeleton] = useState(false);

  const handleClick = (folder:string) => {
    if (folder === 'Docs') {
      setOpenDocs(!openDocs);
    } else if (folder === 'Skeleton') {
      setOpenSkeleton(!openSkeleton);
    }
  };

  return (
    <Paper className={root}>
      <MenuList className={menu}>
        <MenuItem onClick={() => handleClick('Docs')} className={item}>
         {openDocs ? <MdOutlineExpandMore /> : <MdChevronRight />}   
         <ListItemIcon>
           <FcFolder size={20}/>
         </ListItemIcon>
         <ListItemText className={itemLabel}>Docs</ListItemText>  
        </MenuItem>
          <Collapse in={openDocs} timeout="auto" unmountOnExit>
            <MenuList component="div" disablePadding className={subMenu}>
              <MenuItem className={item}>
                <ListItemIcon>
                  <FcFile size={20}/>
                </ListItemIcon>
                <ListItemText className={itemLabel}>index.md</ListItemText>
              </MenuItem>
            </MenuList>
          </Collapse>
        <MenuItem onClick={() => handleClick('Skeleton')} className={item}>
         {openSkeleton ? <MdOutlineExpandMore /> : <MdChevronRight />}
          <ListItemIcon>
              <FcFolder size={20}/>
            </ListItemIcon>
            <ListItemText className={itemLabel}>Skeleton</ListItemText> 
        </MenuItem>
          <Collapse in={openSkeleton} timeout="auto" unmountOnExit>
            <MenuList component="div" disablePadding className={subMenu}>
              <MenuItem className={item}>
                <ListItemIcon>
                  <FcFile size={20}/>
                </ListItemIcon>
                <ListItemText className={itemLabel}>template.yaml</ListItemText>
              </MenuItem>
            </MenuList>
          </Collapse>
        <MenuItem className={item}>
          <ListItemIcon>
            <FcFile size={20}/>
              </ListItemIcon>
            <ListItemText className={itemLabel}>README.MD</ListItemText>
          </MenuItem>
        <MenuItem className={item}>
            <ListItemIcon>
              <FcFile size={20}/>
            </ListItemIcon>
            <ListItemText className={itemLabel}>mkdocs.yml</ListItemText>
        </MenuItem>
         <MenuItem className={item}>
            <ListItemIcon>
              <FcFile size={20}/>
            </ListItemIcon>
            <ListItemText className={itemLabel}>template.yaml</ListItemText>
          </MenuItem>
      </MenuList>
    </Paper>
  );
};