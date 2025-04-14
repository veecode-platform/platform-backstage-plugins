import { Box, Chip, Tooltip } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import { themeVariables } from "../../utils/constants/themeVariables";

export interface OptionCardTagsProps {
    tags: string[]
}

const useOptionCardTagsStyles = makeStyles({
  chips: {
    width: '100%',
    display: 'flex',
    alignSelf: 'center',
    justifyContent: 'flex-end',
    paddingTop: '.5rem'
  },
  chipStyle:{
    backgroundColor: themeVariables.colors.darkGrey,
    color: themeVariables.colors.white,
  },
  tooltipStyle: {
    backgroundColor: themeVariables.colors.darkGrey,
    color: themeVariables.colors.white,
    padding: '0.5rem'
  }
});

export const OptionCardTags : React.FC<OptionCardTagsProps> = ({ tags }) => {
    const { chips,chipStyle, tooltipStyle } = useOptionCardTagsStyles();
    return (
      <Box className={chips}>
        <Tooltip
          placement="right-start"
          arrow
          className={tooltipStyle}
          title={
            <>
              {tags.map((tag: string) => (
                <Chip key={tag} label={tag} size="small" className={chipStyle}/>
              ))}
            </>
          }
        >
          <Chip label="tags" size="medium" className={chipStyle}/>
        </Tooltip>
      </Box>
    );
}