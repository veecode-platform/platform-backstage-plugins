import { ClusterNodes } from "../../../utils/types"
import { NodeInfoActionType } from "../state"

export type InfoButtonProps = {
    info: Partial<ClusterNodes>,
    toggleDrawer: React.Dispatch<React.SetStateAction<boolean>>,
    nodeInfoDispatch: React.Dispatch<NodeInfoActionType>
}