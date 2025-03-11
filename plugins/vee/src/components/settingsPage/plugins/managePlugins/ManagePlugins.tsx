import React from "react";
import { PageLayout, TableComponent,ModalComponent } from "../../../shared";
import { ManagePluginsRow, ModalVariantKey } from "./types";
import { AddPlugin } from "./addPlugin/AddPlugin";
import useAsync from "react-use/esm/useAsync";
import { useVeeContext } from "../../../../context";
import { UpdatePlugin } from "./updatePlugin";

export const ManagePlugins = () => {

    const [ showModal, setShowModal] = React.useState<boolean>(false);
    const { listAllPlugins, allPluginsState,  getPluginById, addPluginSelected, removePlugin } = useVeeContext();
    const [ modalVariant, setModalVariant ] = React.useState<ModalVariantKey>(null);

    const { loading, error } = useAsync(listAllPlugins,[]);

    const rows = React.useMemo(() => {
        return allPluginsState?.map(plugin => ({
            id: plugin.id,
            name: plugin.name,
            annotations: plugin.annotations ? plugin.annotations.flatMap( annotation => annotation.annotation) : []
        })) || [];
    }, [allPluginsState]);

    const modalTitle = () => {
        if (modalVariant){
           if (modalVariant === "create") return "Add a new plugin"
           return "Edit Plugin"
        }
        return "Manage plugins"
    }

    const handleClose = () => setShowModal(!showModal);

    const addNewPlugin = () => {
        setShowModal(true);
        setModalVariant("create")
    }
    const handleUpdatePlugin = async (id:string) => {
        const plugin = await getPluginById(id);
        if(plugin) addPluginSelected(plugin);
        setShowModal(true);
        setModalVariant("edit")
    }

    const handleRemovePlugin = async (id:string)=>{
        await removePlugin(id)
    }

    return (
        <>
         <PageLayout
          label="Manage Plugins"
          title="List, add, edite or delete plugins"
          createAction={addNewPlugin}
          goBack
          >
           <TableComponent 
              title="Plugins" 
              loading={loading}
              error={error}
              data={rows as ManagePluginsRow[]}
              actions
              onEdit={handleUpdatePlugin}
              onDelete={handleRemovePlugin}
              />
         </PageLayout>
         <ModalComponent 
           title={modalTitle()}
           open={showModal} 
           handleClose={handleClose} 
           >
          { modalVariant === "create" && <AddPlugin onCloseModal={handleClose}/>}
          { modalVariant === "edit" && <UpdatePlugin onCloseModal={handleClose}/>}
         </ModalComponent>
       </>
    )
}