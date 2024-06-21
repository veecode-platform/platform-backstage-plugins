import React from 'react'
import { Button, Chip, Grid, Typography } from '@material-ui/core'
import { useErrorCardStyles } from './styles'
import { BsStars } from 'react-icons/bs';
import { ErrorCardProps } from './types';
import { parseErrorSolutionString } from '../../../../utils/helpers/parseErrorSolutionString';
import { ModalComponent } from '../ModalComponent';
import Lottie from 'react-lottie';
import errorAnimation from '../../../../assets/lotties/error.json';


const AnimationError = () => {
  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: errorAnimation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
  return (
    <Lottie
      options={defaultOptions}
      height={45}
      width={45}
      style={{ position: 'absolute', left:'-1rem' }}
    />
  );
};


export const ErrorCard : React.FC<ErrorCardProps> = (props) => {

  const [showModal, setShowModal] = React.useState<boolean>(false);
  const { message } = props
  const { card, cardTitle,title, footer,button } = useErrorCardStyles();
  const errorTitle = message.error[0].text;
  const {error, solution } =  parseErrorSolutionString(message.details);

  const handleModal = () =>  setShowModal(!showModal);

  return (
    <>
      <Grid item lg={5} className={card} spacing={3}>
        <div className={cardTitle}> 
          <AnimationError/>
          <Typography variant="h6" className={title}>
            {errorTitle}
          </Typography>
        </div>
        <div>
          <Chip style={{padding: '.5rem'}} label={message.kind} variant="default" size="small"/>
          <Chip style={{padding: '.5rem'}} label={message.name} variant="default" size="small"/>
        </div>
        <Typography variant="body1">{error}</Typography>
        <div className={footer}>
          <Button
            variant="outlined"
            color="primary"
            className={button}
            onClick={handleModal}
          >
            Analyze error <BsStars size={18} style={{ marginLeft: '1rem' }} />
          </Button>
        </div>
      </Grid>
      
      {showModal && (
        <ModalComponent 
          errorTitle={errorTitle}
          errorMessage={error}
          solution={solution}
          show={showModal} 
          handleCloseModal={handleModal}
          />
      )}
    </>
  );
}
