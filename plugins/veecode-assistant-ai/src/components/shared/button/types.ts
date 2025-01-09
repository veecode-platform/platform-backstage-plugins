export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{
    variant: "primary" | "secondary" | "danger" ,
    children: string | React.ReactNode
}