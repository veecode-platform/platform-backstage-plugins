export interface StepperComponentProps {
    onCloseModal: () => void;
    processing: boolean;
    onProcessing: React.Dispatch<React.SetStateAction<boolean>>
}