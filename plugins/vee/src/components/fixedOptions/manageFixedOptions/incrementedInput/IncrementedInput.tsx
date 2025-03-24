import React from "react";
import TextField from "@mui/material/TextField";
import  Grid2  from "@mui/material/Grid2";
import { IoAddOutline } from "react-icons/io5";
import IconButton from "@mui/material/IconButton";
import { RiResetRightLine } from "react-icons/ri";
import Box from '@mui/material/Box';
import { useIncrementedInputStyles } from "./styles";
import { OptionsList } from "./optionsList";
import { 
  addNewOptionToList, 
  initialOptionsListState, 
  OptionsListReducer, 
  removeOptionFromList, 
  updateOptionFromList,
  initialOptionState, 
  OptionReducer,
  resetOption,
  setOptionLabel, 
  setOptionPrompt,
  setOptionsList
} from "../state";
import { v4 as uuidv4 } from 'uuid';
import { Button, InfoBox } from "../../../shared";
import { IOption } from "@veecode-platform/backstage-plugin-vee-common";
import { IncrementedInputProps } from "./types";


export const IncrementedInput : React.FC<IncrementedInputProps> = (props) => {
    
    const [ showInputs, setShowInputs ] = React.useState<boolean>(false);
    const [ optionState, optionDispatch ] = React.useReducer(OptionReducer,initialOptionState);
    const [ optionsListState, optionsListDispatch ] = React.useReducer(OptionsListReducer, initialOptionsListState);
    const { onSaveOptions, allOptions } = props;
    const { root, newOptionStyle,inputGroup,input, buttonGroup, resetButton,addButton,footerButton } = useIncrementedInputStyles();

    const handleChangeOption = (e:React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      const value = e.target.value;
      const name = e.target.name;
       e.stopPropagation();
       if(name === "label") optionDispatch(setOptionLabel(value));
       if(name === "prompt") optionDispatch(setOptionPrompt(value))
    }  

    const resetInputOption = () => optionDispatch(resetOption());

    const addOptionToList = () => {
      if(optionState.label !== "" && optionState.prompt !== ""){
        const generatedId = uuidv4();
        const newOption = {...optionState, id: optionState.id ? optionState.id : generatedId} as IOption;
        optionsListDispatch(addNewOptionToList(newOption));
        onSaveOptions([...optionsListState, newOption])
        resetInputOption()
      }
    }

    const editOptionFromList = (optionData: IOption) => {
      optionsListDispatch(updateOptionFromList(optionData))
    }

    const handleDeleteOption = (id:string) => {
      optionsListDispatch(removeOptionFromList(id))
    }

    const handleOpenInputs = () => {
      resetInputOption();
      setShowInputs(true);
    }

    const saveAllOptionsToFixedOptions = () => onSaveOptions(optionsListState);

    React.useEffect(()=>{
      if(allOptions){
        optionsListDispatch(setOptionsList(allOptions))
      }
    },[allOptions])

    return (
      <div className={root}>
        { (optionsListState.length === 0 && !showInputs ) ? 
          (<InfoBox message="No option to show, please create one."/> ) : 
          (<OptionsList 
             data={optionsListState}
             onRemoveOption={handleDeleteOption}
             onEditOptionFromList={editOptionFromList}
             onSaveOptions={saveAllOptionsToFixedOptions}
             />)
        }
        { showInputs && (
          <Grid2 container className={newOptionStyle} alignItems="flex-start" justifyContent="space-between">
              <Grid2 size={{ md: 10 }}>
                <Box className={inputGroup}>
                    <TextField
                        className={input}
                        onChange={handleChangeOption}
                        value={optionState.label}
                        label="Label option"
                        name="label"
                    />
                    <TextField
                        className={input}
                        multiline
                        minRows={5}
                        onChange={handleChangeOption}
                        value={optionState.prompt ?? "Ensure the response includes modular, maintainable code ready for a pull request..."}
                        label="Prompt"
                        name="prompt"
                    />
                </Box>
                <div className={footerButton}>
                  <Button 
                  variant="danger"
                  onClick={()=>setShowInputs(false)}
                  >Close</Button>
                </div>
              </Grid2>
              <Grid2 size={{ md: 2}}>
                <Box className={buttonGroup}>
                    <IconButton
                        size="large"
                        aria-label="save"
                        title="Add option"
                        className={addButton}
                        onClick={addOptionToList}
                        >
                        <IoAddOutline />
                    </IconButton>
                    <IconButton
                        size="large"
                        aria-label="reset"
                        title="Reset"
                        className={resetButton}
                        onClick={resetInputOption}
                        >
                        <RiResetRightLine />
                    </IconButton>
                </Box>
              </Grid2>
          </Grid2>
        )}

        { !showInputs && (<IconButton
          aria-label="save"
          title="Add option"
          className={addButton}
          onClick={handleOpenInputs}>
          <IoAddOutline />
        </IconButton>)}
        </div>
    )
}