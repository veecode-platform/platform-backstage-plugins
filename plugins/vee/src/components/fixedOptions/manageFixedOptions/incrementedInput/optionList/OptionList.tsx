import React, { useState } from "react";
import { OptionListProps } from "./types";
import { MdKeyboardArrowRight } from "react-icons/md";
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { useOptionsListStyles } from "./styles";
import IconButton from "@mui/material/IconButton";
import { MdEdit } from "react-icons/md";
import { FaTrashAlt } from "react-icons/fa";
import { FcCheckmark } from "react-icons/fc";
import { FcCancel } from "react-icons/fc";
import TextField from "@mui/material/TextField";
import { 
  initialOptionState, 
  OptionReducer, 
  setOption, 
  setOptionLabel, 
  setOptionPrompt 
} from "../../state";
import { OptionStateProps } from "../../state/optionState/types";

export const OptionList: React.FC<OptionListProps> = (props) => {
  const [expanded, setExpanded] = useState<string | false>(false);
  const [editingStates, setEditingStates] = useState<{ [id: string]: boolean }>({});
  const [ optionData, optionDataDispatch ] = React.useReducer(OptionReducer,initialOptionState)
  const { data, onRemoveOption, onEditOptionFromList } = props;
  const { root, accordion, accordionSummary, accordionActions, editButton, deleteButton, accordionDetails, input } = useOptionsListStyles();

  const handleChange = (panel: string) => (_event: React.SyntheticEvent, newExpanded: boolean) => {
    setExpanded(newExpanded ? panel : false);
  };

  const handleChangeOption = (e:React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const value = e.target.value;
    const name = e.target.name;
     e.stopPropagation();
     if(name === "label") optionDataDispatch(setOptionLabel(value));
     if(name === "prompt") optionDataDispatch(setOptionPrompt(value))
  }  

  const handleEditClick = (id: string) => {
    setEditingStates(prevState => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const handleSaveChanges = (id:string) => {
    onEditOptionFromList(optionData);
    handleEditClick(id);
  }

  const saveOptionInState = (item:OptionStateProps) => {
    optionDataDispatch(setOption(item))
  }

  return (
    <div className={root}>
      {data.map(item => (
        <MuiAccordion
          key={item.id}
          expanded={expanded === `panel${item.id}`}
          onChange={handleChange(`panel${item.id}`)}
          className={accordion}
          disableGutters
          elevation={0}
          square
        >
          <MuiAccordionSummary
            aria-controls={`panel${item.id}-content`}
            id={`panel${item.id}-header`}
            expandIcon={<MdKeyboardArrowRight size={25} />}
            className={accordionSummary}
          >
            {editingStates[item.id as string] ? (
              <TextField
                className={input}
                onChange={handleChangeOption}
                value={optionData.label ? optionData.label : item.label}
                label="Label option"
                name="label"
                variant="standard"
                placeholder="Insert the fixed option label"
                onClick={(e) => e.stopPropagation()}
              />
            ) : (
              <Typography component="span">{item.label}</Typography>
            )}

            <div className={accordionActions}>
              {editingStates[item.id as string] ? (
                <>
                  <IconButton
                    aria-label="save"
                    title="Save changes"
                    className={editButton}
                    onClick={() => handleSaveChanges(item.id as string)}
                  >
                    <FcCheckmark size={18} />
                  </IconButton>
                  <IconButton
                    aria-label="cancel"
                    title="Cancel"
                    className={deleteButton}
                    onClick={() => handleEditClick(item.id as string)}
                  >
                    <FcCancel size={18} />
                  </IconButton>
                </>
              ) : (
                <>
                  <IconButton
                    aria-label="edit"
                    title="Edit option"
                    className={editButton}
                    onClick={() => {
                      saveOptionInState(item)
                      handleEditClick(item.id as string)
                    }}
                  >
                    <MdEdit size={18} />
                  </IconButton>
                  <IconButton
                    aria-label="delete"
                    title="Delete option"
                    className={deleteButton}
                    onClick={() => {
                      onRemoveOption(item.id as string);
                    }}
                  >
                    <FaTrashAlt size={18} />
                  </IconButton>
                </>
              )}
            </div>
          </MuiAccordionSummary>
          <MuiAccordionDetails className={accordionDetails}>
            {editingStates[item.id as string] ? (
              <TextField
                multiline
                minRows={6}
                className={input}
                onChange={handleChangeOption}
                value={optionData.prompt ? optionData.prompt : item.prompt}
                label="Prompt"
                name="prompt"
                variant="standard"
                placeholder="Insert the prompt"
              />
            ) : (
              <Typography>{item.prompt}</Typography>
            )}
          </MuiAccordionDetails>
        </MuiAccordion>
      ))}
    </div>
  );
};