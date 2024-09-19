import React from 'react'
import ErrorBoundary from '../ErrorBoundary/ErrorBondary'
import { BoxComponent } from '../shared'
import { useKongServiceManagerContext } from '../../context'
import { ISpec } from '@veecode-platform/backstage-plugin-kong-service-manager-common'
import useAsync from 'react-use/esm/useAsync'
import { SpecCard } from './SpecCard'
import { useSpecListStyles } from './styles'
import { addSelectedSpec } from '../../context/state'

export const SpecList = () => {
  
  const [ selectedSpec, setSelectedSpec ] = React.useState<string>('');
  const { getSpecs, selectedSpecDispatch } = useKongServiceManagerContext();
  const { content } = useSpecListStyles();

  const fetchSpecs = async (): Promise<ISpec[]> => {
    const data = await getSpecs() as ISpec[];
    return data;
  };

  const {loading, error, value: allspecs } = useAsync(fetchSpecs,[]);

  React.useEffect(()=>{
    if(selectedSpec !== '' && allspecs){
      const specData = allspecs.filter(spec => spec.metadata.name === selectedSpec)[0];
      selectedSpecDispatch(addSelectedSpec(specData));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[selectedSpec])
  
  if(loading) <h1>Carregando</h1>  // TO DO

  if(error) <h1>Error</h1>  // TO DO

  if(allspecs && allspecs.length === 0) <h1>Nada pra mostrar</h1> // TO DO

  return (
    <ErrorBoundary>
      <BoxComponent title="All Specs">
        <div className={content}>
          {allspecs?.map(spec => 
            (
              <SpecCard
                key={spec.metadata.uid}
                title={spec.metadata.name}
                description={spec.metadata.description}
                owner={spec.spec.owner}
                tags={spec.metadata.tags} 
                setSpec={setSelectedSpec}           
            />
            )
          )}
        </div>
      </BoxComponent>
    </ErrorBoundary>
  )
}
