export interface SpecCardProps {
    title: string,
    description: string,
    owner: string,
    tags: string[],
    setSpec: React.Dispatch<React.SetStateAction<string>>
}