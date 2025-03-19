import React from "react";
import { useVeeContext } from "../../../context";
import useAsync from "react-use/esm/useAsync";
import { ModalVariantKey } from "../../shared/modalComponent/types";
import { ModalComponent, PageLayout, TableComponent } from "../../shared";
import { manageFixedOptionRow } from "./types";
import { CreateFixedOption } from "./createFixedOption";
import { UpdateFixedOption } from "./updateFixedOption";

export const ManageFixedOptions = () => {
    const [ showModal, setShowModal] = React.useState<boolean>(false);
    const { listAllFixedOptions, allFixedOptionsState, getFixedOptionById, addFixedOptionSelected, removeFixedOption } = useVeeContext();
    const [ modalVariant, setModalVariant ] = React.useState<ModalVariantKey>(null);

    const { loading, error } = useAsync(listAllFixedOptions,[]);

    const rows = React.useMemo(()=>{
        return allFixedOptionsState.map( fixedOption => ({
            id: fixedOption.id,
            type: fixedOption.type
        }))
    },[allFixedOptionsState]);

    const modalTitle = () => {
        if (modalVariant){
           if (modalVariant === "create") return "Add a new fixed option"
           return "Edit fixed option"
        }
        return "Manage fixed options"
    };

    const handleClose = () => setShowModal(!showModal);

    const addNewFixedOption = () => {
        setModalVariant("create");
        setShowModal(true);
    }
    const handleUpdateFixedOption = async (id:string) => {
        const fixedOption = await getFixedOptionById(id);
        if(fixedOption) addFixedOptionSelected(fixedOption);
        setModalVariant("edit")
        setShowModal(true);
    }

    const handleRemoveFixedOption = async (id:string)=>{
        await removeFixedOption(id)
    }

     return (
            <>
             <PageLayout
              label="Manage fixed options"
              title="List, add, edite or delete fixed options"
              createAction={addNewFixedOption}
              goBack
              >
               <TableComponent 
                  title="Fixed options" 
                  loading={loading}
                  error={error}
                  data={rows as manageFixedOptionRow[]}
                  actions
                  onEdit={handleUpdateFixedOption}
                  onDelete={handleRemoveFixedOption}
                  />
             </PageLayout>
             <ModalComponent 
               title={modalTitle()}
               open={showModal} 
               handleClose={handleClose} 
               >
              { modalVariant === "create" && <CreateFixedOption onCloseModal={handleClose}/>}
              { modalVariant === "edit" &&  <UpdateFixedOption onCloseModal={handleClose}/>}
             </ModalComponent>
           </>
        )
}