import { makeStyles, Theme } from "@material-ui/core";

export const useAiChatComponentStyles = makeStyles((theme: Theme) => ({
    chatContainer: {
      position: 'fixed',
      bottom: theme.spacing(2),
      right: theme.spacing(2),
      width: '300px',
      height: '48px',
      backgroundColor: theme.palette.background.paper,
      transition: 'all 0.3s ease-in-out',
      zIndex: 1000,
      borderRadius: theme.shape.borderRadius,
      display: 'flex',
      flexDirection: 'column',
      boxShadow: theme.shadows[3],
      overflow: 'hidden',
    },
    chatExpanded: {
      width: '400px',
      height: '600px',
    },
    chatFullscreen: {
      width: '80%',
      height: '80%',
      maxWidth: '1200px',
      maxHeight: '800px',
    },
    chatHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: theme.spacing(1, 2),
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
    },
    headerActions: {
      display: 'flex',
      gap: theme.spacing(1),
    },
    chatContent: {
      flexGrow: 1,
      overflowY: 'auto',
      padding: theme.spacing(2),
      display: 'flex',
      flexDirection: 'column',
    },
    chatInput: {
      display: 'flex',
      padding: theme.spacing(2),
      borderTop: `1px solid ${theme.palette.divider}`,
    },
    chatTextField: {
      flex: 1,
      marginRight: theme.spacing(1),
    },
    messageContainer: {
      display: 'flex',
      marginBottom: theme.spacing(2),
      padding: theme.spacing(1),
      maxWidth: '80%',
    },
    userMessage: {
      alignSelf: 'flex-end',
      backgroundColor: theme.palette.primary.light,
      color: theme.palette.primary.contrastText,
    },
    aiMessage: {
      alignSelf: 'flex-start',
      backgroundColor: theme.palette.grey[100],
      color: theme.palette.common.black,
    },
    messageContent: {
      display: 'flex',
      flexDirection: 'column',
      color: theme.palette.common.black,
    },
    codeBlock: {
      position: 'relative',
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
    copyButton: {
      position: 'absolute',
      top: theme.spacing(1),
      right: theme.spacing(1),
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      color: theme.palette.common.black,
      '&:hover': {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
      },
    },
    avatar: {
      width: 32,
      height: 32,
      marginRight: theme.spacing(1),
    },
    closeButton: {
      padding: 0,
      color: theme.palette.primary.contrastText,
    },
    sendButton: {
      padding: theme.spacing(1),
    },
  }));
  