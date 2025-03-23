import React from "react";
import { Button, CodeBlockComponent, PageLayout } from "../shared"
import { useVeeContext } from "../../context";
import Grid2  from "@mui/material/Grid2";
import { ArchivesFile } from "./archiveFles";
import  Box  from "@mui/material/Box";
import { FaGitAlt } from "react-icons/fa";
import { RiFileDownloadFill } from "react-icons/ri";
import { useTemplateOutputStyles } from "./styles";
import { useNavigate } from "react-router-dom";
import { getLanguageFromFilename } from "../../utils/helpers/getLanguageFromFilename";
import { downloadTemplateFolder } from "../../utils/helpers/downloadTemplateFolder";

export type CodeBlockProps = {
  language: string,
  code: string
}

export const TemplateOutput = () => {
    const [codeBlock, setCodeBlock] = React.useState<CodeBlockProps>({language: "javascript",code:"console.log('Hello word)"});
    const { templateOutputState, clearTemplateHistory } = useVeeContext();
    const navigate = useNavigate();
    const { root, codeSection, footer, buttonsGroup } = useTemplateOutputStyles();

    const handleCode = (lang:string,code:string) => setCodeBlock({language:lang, code});

    const handleBack = () => {
      clearTemplateHistory();
      navigate("/vee")
    };

    const handleTemplateDownload = () => {
      if(templateOutputState){
        downloadTemplateFolder(templateOutputState)
      }
    }

    const templateFiles = React.useMemo(()=>{
      if(templateOutputState){
        const fileSelected = templateOutputState.files.find(file => file.name === "template.yaml");
        if(fileSelected){
          const language = getLanguageFromFilename(fileSelected.name)
          handleCode(language,templateOutputState.files[0].content)
        }

        return templateOutputState.files
      }
      return []
    },[templateOutputState])

    React.useEffect(()=>{
      if(templateOutputState){
        // TODO
      // eslint-disable-next-line no-console
      console.log(templateOutputState)
      }
    },[templateOutputState])

    return (
      <PageLayout 
        label="Generating a template with AI"
        title={templateOutputState ? templateOutputState.templateName : 'Template output'}
        >
        <Grid2 className={root} spacing={2} container>
           <Grid2 size={{ md: 2 }}>
             <ArchivesFile
              data={templateFiles}
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
                    <Button variant="danger" onClick={handleBack}> Cancel</Button>
                    <Button variant="primary" onClick={handleTemplateDownload}> <RiFileDownloadFill/> Save</Button>
                    <Button variant="dark"> <FaGitAlt/> Publish</Button>
                </div>
            </Box>
           </Grid2>
        </Grid2>
    </PageLayout>
    )
}