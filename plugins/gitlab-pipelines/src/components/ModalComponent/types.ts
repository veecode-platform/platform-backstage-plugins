import { ReactNode } from "react"

export type ModalComponentProps = {
    open: boolean,
    modalType: "Pipeline" | "Job",
    title: string,
    subtitle: ReactNode,
    handleModal: () => void,
    handleStartAction: () => Promise<void>
  }