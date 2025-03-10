import React from "react";
import { PageLayout, TableComponent,ModalComponent } from "../../../shared";
import { ManagePluginsRow, ModalVariantKey } from "./types";
import { AddPlugin } from "./addPlugin/AddPlugin";
import useAsync from "react-use/esm/useAsync";
import { useVeeContext } from "../../../../context";
import { UpdatePlugin } from "./updatePlugin";

export const ManagePlugins = () => {

    const [ showModal, setShowModal] = React.useState<boolean>(false);
    const { listAllPlugins, getPluginById, addPluginSelected } = useVeeContext();
    const [ modalVariant, setModalVariant ] = React.useState<ModalVariantKey>(null);

    const { value: allPlugins, loading, error } = useAsync(listAllPlugins,[]);

    const rows = React.useMemo(() => {
        return allPlugins?.map(plugin => ({
            id: plugin.id,
            name: plugin.name,
            annotations: [plugin.annotations[0]?.annotation as string]
        })) || [];
    }, [allPlugins]);

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
    const updatePlugin = async (id:string) => {
        const plugin = await getPluginById(id);
        // eslint-disable-next-line no-console
        console.log("SALVEI ESSE PRUGGGG >>>", plugin)
        if(plugin) addPluginSelected(plugin);
        setShowModal(true);
        setModalVariant("edit")
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
              onEdit={updatePlugin}
              onDelete={()=>{}}
              />
         </PageLayout>
         <ModalComponent 
           title={modalTitle()}
           open={showModal} 
           handleClose={handleClose} 
           >
          { modalVariant === "create" && <AddPlugin/>}
          { modalVariant === "edit" && <UpdatePlugin/>}
         </ModalComponent>
       </>
    )
}