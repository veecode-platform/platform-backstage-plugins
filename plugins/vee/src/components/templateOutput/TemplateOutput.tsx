import React from "react";
import { Button, CodeBlockComponent, PageLayout } from "../shared"
import { useVeeContext } from "../../context";
import Grid2  from "@mui/material/Grid2";
import { ArchivesFile } from "./archiveFles";
import  Box  from "@mui/material/Box";
import { FaGitAlt } from "react-icons/fa";
import { RiFileDownloadFill } from "react-icons/ri";
import { useTemplateOutputStyles } from "./styles";
import { templateDataMock } from "../../mock/template";

export type CodeBlockProps = {
  language: string,
  code: string
}

export const TemplateOutput = () => {
    const [codeBlock, setCodeBlock] = React.useState<CodeBlockProps>({language: "javascript",code:"console.log('Hello word)"});
    const { instructionsState } = useVeeContext();
    const { root, codeSection, footer, buttonsGroup } = useTemplateOutputStyles();

    const handleCode = (lang:string,code:string) => setCodeBlock({language:lang, code});

    React.useEffect(()=>{
      // TODO
      const fileSelected = templateDataMock.find(file => file.name === "template.yaml")
      handleCode(fileSelected!.originalFormat as string,templateDataMock[0].content)
    },[])

    return (
      <PageLayout 
        label="Generating a template with AI"
        title={instructionsState.templateName ?? 'Template output'}
        >
        <Grid2 className={root} spacing={2} container>
           <Grid2 size={{ md: 2 }}>
             <ArchivesFile
              data={templateDataMock}
              handleCode={handleCode}
             />
           </Grid2>
           <Grid2 size={{ md: 8 }} className={codeSection}>
              <CodeBlockComponent 
                code={codeBlock.code} 
                language={codeBlock.language}
                />
           </Grid2>
           <Grid2 size={{ md: 2 }}>
            <Box className={footer}>
                <div className={buttonsGroup}>
                    <Button variant="primary"> <RiFileDownloadFill/> Save</Button>
                    <Button variant="dark"> <FaGitAlt/> Publish</Button>
                </div>
            </Box>
           </Grid2>
        </Grid2>
    </PageLayout>
    )
}