import React from "react";
import { ModalComponent, PageLayout, TableComponent } from "../../shared";
import { AddStack } from "./addStack";
import { UpdateStack } from "./updateStack";
import useAsync from "react-use/esm/useAsync";
import { ModalVariantKey } from "../../shared/modalComponent/types";
import { useVeeContext } from "../../../context";
import { ManageStacksRow } from "./types";

export const ManageStacks = () => {

    const [ showModal, setShowModal] = React.useState<boolean>(false);
    const { allStacksState, listAllStacks, getStackById, addStackSelected, removeStack } = useVeeContext();
    const [ modalVariant, setModalVariant ] = React.useState<ModalVariantKey>(null);

    const { loading, error } = useAsync(listAllStacks,[]);

    const rows = React.useMemo(() => {
        return allStacksState?.map(stack => ({
            id: stack.id,
            name: stack.name,
            plugins: stack.plugins ? stack.plugins.flatMap(plugins => plugins.name) : []
        })) || [];
    }, [allStacksState]);

    const modalTitle = () => {
        if (modalVariant){
           if (modalVariant === "create") return "Add a new stack"
           return "Edit stack"
        }
        return "Manage stacks"
    }

    const handleClose = () => setShowModal(!showModal);

    const addNewStack = () => {
        setModalVariant("create");
        setShowModal(true);
    }
    const handleUpdateStack = async (id:string) => {
        const stack = await getStackById(id);
        if(stack) addStackSelected(stack);
        setModalVariant("edit");
        setShowModal(true);
    }

    const handleRemoveStack = async (id:string)=>{
        await removeStack(id)
    }

    return (
        <PageLayout
         label="Manage Stacks"
         title="List, create, edite or delete Stacks"
         createAction={addNewStack}
         goBack
         >
          <TableComponent 
              title="Stacks" 
              loading={loading}
              error={error}
              data={rows as ManageStacksRow[]}
              actions
              onEdit={handleUpdateStack}
              onDelete={handleRemoveStack}
             />
             <ModalComponent 
                title={modalTitle()}
                open={showModal} 
                handleClose={handleClose} 
                >
                { modalVariant === "create" && <AddStack onCloseModal={handleClose}/>}
                { modalVariant === "edit" && <UpdateStack onCloseModal={handleClose}/>}
             </ModalComponent>
        </PageLayout>
    )
}