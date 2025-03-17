export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{
    variant: "primary" | "secondary" | "dark" | "danger" ,
    children: string | React.ReactNode
}