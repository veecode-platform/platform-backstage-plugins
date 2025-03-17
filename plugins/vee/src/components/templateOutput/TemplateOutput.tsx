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

export const TemplateOutput = () => {
    const { instructionsState } = useVeeContext();
    const { root, codeSection, footer, buttonsGroup } = useTemplateOutputStyles();

    return (
      <PageLayout 
        label="Generating a template with AI"
        title={instructionsState.templateName ?? 'Template output'}
        >
        <Grid2 className={root} spacing={2} container>
           <Grid2 size={{ md: 2 }}>
             <ArchivesFile
              data={templateDataMock}
             />
           </Grid2>
           <Grid2 size={{ md: 8 }} className={codeSection}>
              <CodeBlockComponent 
                code={`console.log("Hello World")`} 
                language="js"
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