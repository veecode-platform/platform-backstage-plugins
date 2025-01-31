import React from 'react'
import ErrorBoundary from '../ErrorBoundary/ErrorBondary'
import { BoxComponent, LoadingComponent, MissingAnnotation } from '../shared'
import { useKongServiceManagerContext } from '../../context'
import { IDefinition } from '@veecode-platform/backstage-plugin-kong-service-manager-common'
import useAsync from 'react-use/esm/useAsync'
import { SpecCard } from './SpecCard'
import { useSpecListStyles } from './styles'
import { addSelectedSpec } from '../../context/state'
import { isKongManagerSpecAvailable } from '../../hooks'
import { SpecListProps } from './types'
import { Typography } from '@material-ui/core'


const SpecListWrapper : React.FC<SpecListProps> = (props) => {
  
  const { children } = props;
  const { content } = useSpecListStyles();

  return (
    <ErrorBoundary>
      <BoxComponent title="All Specs">
        <div className={content}>
          {children}
        </div>
      </BoxComponent>
    </ErrorBoundary>
  )
}


const SpecList = () => {
  
  const [ selectedSpec, setSelectedSpec ] = React.useState<string>('');
  const { entity, selectedSpecDispatch,getSpecs } = useKongServiceManagerContext();
  const { noSpec } = useSpecListStyles();

  const fetchSpecs = async (): Promise<IDefinition[]> => {
    const data = await getSpecs();
    return data as IDefinition[];
  };

  const {loading, value: allspecs } = useAsync(fetchSpecs,[]);

  React.useEffect(()=>{
    if(selectedSpec !== '' && allspecs){
      const specData = allspecs.filter(spec => spec.info.title === selectedSpec)[0];
      selectedSpecDispatch(addSelectedSpec(specData));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[selectedSpec])

  if (loading) (<SpecListWrapper> 
    <LoadingComponent/> 
  </SpecListWrapper>);

  if (isKongManagerSpecAvailable(entity)) (
  <SpecListWrapper> 
    <MissingAnnotation annotation="kong-manager/spec"/> 
  </SpecListWrapper>);

  if(allspecs && allspecs.length === 0)(
    <SpecListWrapper>
      <div className={noSpec}>
        <Typography variant="body1">No spec found...</Typography>
      </div>
    </SpecListWrapper>
  )

  return (
    <SpecListWrapper>
      {allspecs && allspecs.map(spec => 
        (
          <SpecCard
            key={spec.info.title}
            title={spec.info.title}
            description={spec.info.description}
            owner={entity.spec?.owner as string}
            setSpec={setSelectedSpec}           
          />
        )
      )}
    </SpecListWrapper>
  )
}


export default React.memo(SpecList);