export type ModalComponentProps = {
    show: boolean,
    handleCloseModal: (route: any) => void,
    onSave?: () => void,
    route?: any,
}

export type DynamicFieldsProps = {
    protocolDescription: string;
    hosts: any[];
    paths: any[];
    snis: any[];
    headers: any[];
    sources: any[];
    destinations: any[];
    methods: any[];
    handleChange: (event: any, setState: React.Dispatch<React.SetStateAction<any>>, customHandler?: (value: any, checked?: boolean) => any) => void;
    setHosts: React.Dispatch<React.SetStateAction<any[]>>;
    setPaths: React.Dispatch<React.SetStateAction<any[]>>;
    setSnis: React.Dispatch<React.SetStateAction<any[]>>;
    setHeaders: React.Dispatch<React.SetStateAction<any[]>>;
    setSources: React.Dispatch<React.SetStateAction<any[]>>;
    setDestinations: React.Dispatch<React.SetStateAction<any[]>>;
    setMethods: React.Dispatch<React.SetStateAction<any[]>>;
  }

export type InputChangeEvent = React.ChangeEvent<{ value: unknown }> | React.ChangeEvent<HTMLInputElement>;
export type ItemsChangeEvent = { id: string; value: string }[];
export type SetState<T> = React.Dispatch<React.SetStateAction<T>>;