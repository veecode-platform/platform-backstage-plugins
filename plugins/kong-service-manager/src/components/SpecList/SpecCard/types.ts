export interface SpecCardProps {
    title: string,
    description: string,
    owner: string,
    setSpec: React.Dispatch<React.SetStateAction<string>>
}