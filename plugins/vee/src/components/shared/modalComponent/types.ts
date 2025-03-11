export interface ModalComponentProps {
    title: string,
    open: boolean,
    handleClose: () => void,
    children: React.ReactNode
}

export type ModalVariantKey = "edit" | "create" | null