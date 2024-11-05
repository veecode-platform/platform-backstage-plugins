import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Typography,
  Button,
  TextField,
  IconButton,
  Avatar,
  Tooltip,
  Paper,
} from '@material-ui/core';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChatIcon from '@material-ui/icons/Chat';
import SendIcon from '@material-ui/icons/Send';
import CloseIcon from '@material-ui/icons/Close';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useApi, errorApiRef, configApiRef } from '@backstage/core-plugin-api';
import { useAiChatComponentStyles } from './styles';
import { DirectoryEditor, DirectoryEditorFile, Message } from './types';



export const AIChatComponent: React.FC<{
  containerStyle?: React.CSSProperties;
  directoryEditor: DirectoryEditor;
}> = ({ containerStyle, directoryEditor }) => {
  const classes = useAiChatComponentStyles();
  const [isOpen, setIsOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [threadId, setThreadId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const errorApi = useApi(errorApiRef);
  const configApi = useApi(configApiRef);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const addMessage = useCallback((message: Message) => {
    setMessages(prev => [...prev, message]);
  }, []);

  const callOpenAI = useCallback(
    async (message: string) => {
      setIsLoading(true);
      try {
        const templateContent = directoryEditor.files
          .map((file: DirectoryEditorFile) => `${file.path}:\n${file.content}`)
          .join('\n\n');

        let currentThreadId = threadId;
        if (!currentThreadId) {
          const backendBaseUrl = configApi.getString('backend.baseUrl');
          const response = await fetch(
            `${backendBaseUrl}/api/ai-chat/start-chat`,
            {
              method: 'POST',
            },
          );
          if (!response.ok) {
            throw new Error(`Falha ao iniciar chat: ${response.statusText}`);
          }
          const data = await response.json();
          currentThreadId = data.threadId;
          setThreadId(currentThreadId);
        }

        const backendBaseUrl = configApi.getString('backend.baseUrl');
        const response = await fetch(`${backendBaseUrl}/api/ai-chat/chat`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message,
            threadId: currentThreadId,
            templateContent,
          }),
        });

        if (!response.ok) {
          throw new Error(`Falha na chamada da API: ${response.statusText}`);
        }

        const data = await response.json();
        return data.content;
      } catch (error:any) {
        errorApi.post(new Error(`Erro ao processar solicitação: ${error}`));
        return `Desculpe, ocorreu um erro ao processar sua solicitação: ${error}`;
      } finally {
        setIsLoading(false);
      }
    },
    [directoryEditor, threadId, errorApi, configApi],
  );

  const handleSend = useCallback(async () => {
    if (input.trim()) {
      addMessage({ text: input, sender: 'user' });
      setInput('');

      const aiResponse = await callOpenAI(input);
      addMessage({ text: aiResponse, sender: 'ai' });
    }
  }, [input, addMessage, callOpenAI]);

  const handleCopyCode = useCallback((code: string) => {
    window.navigator.clipboard.writeText(code);
  }, []);

  const handleChatToggle = useCallback(() => {
    if (isFullscreen) {
      document
        .exitFullscreen()
        .catch(() => {
          // Ignora o erro se não estiver em tela cheia
        })
        .finally(() => {
          setIsFullscreen(false);
          setIsOpen(!isOpen);
        });
    } else {
      setIsOpen(!isOpen);
    }
  }, [isFullscreen, isOpen]);

  const handleFullscreenToggle = useCallback(() => {
    if (isFullscreen) {
      document
        .exitFullscreen()
        .catch(() => {
          // Ignora o erro se não estiver em tela cheia
        })
        .finally(() => {
          setIsFullscreen(false);
        });
    } else {
      const chatElement = document.getElementById('chat-container');
      if (chatElement) {
        chatElement
          .requestFullscreen()
          .then(() => {
            setIsFullscreen(true);
          })
          .catch(() => {
            // Ignora o erro se não puder entrar em tela cheia
          });
      }
    }
  }, [isFullscreen]);

  const handleClose = useCallback(() => {
    if (isFullscreen) {
      document
        .exitFullscreen()
        .catch(() => {
          // Ignora o erro se não estiver em tela cheia
        })
        .finally(() => {
          setIsFullscreen(false);
          setIsOpen(false);
        });
    } else {
      setIsOpen(false);
    }
  }, [isFullscreen]);

  const renderMessage = useCallback(
    (msg: Message, index: number) => (
      <Paper
        key={index}
        className={`${classes.messageContainer} ${
          msg.sender === 'user' ? classes.userMessage : classes.aiMessage
        }`}
        elevation={1}
      >
        {msg.sender === 'ai' && (
          <Avatar
            className={classes.avatar}
            src="/placeholder.svg?height=32&width=32"
          >
            AI
          </Avatar>
        )}
        <div className={classes.messageContent}>
          {msg.text.split('```').map((part, i) =>
            i % 2 === 0 ? (
              <Typography key={i} variant="body1" component="div">
                {part.split('\n').map((line, j) => (
                  <React.Fragment key={j}>
                    {line}
                    <br />
                  </React.Fragment>
                ))}
              </Typography>
            ) : (
              <div key={i} className={classes.codeBlock}>
                <SyntaxHighlighter
                  language="javascript"
                  style={materialDark}
                  customStyle={{ margin: 0 }}
                >
                  {part.trim()}
                </SyntaxHighlighter>
                <IconButton
                  className={classes.copyButton}
                  onClick={() => handleCopyCode(part.trim())}
                  size="small"
                >
                  <FileCopyIcon fontSize="small" />
                </IconButton>
              </div>
            ),
          )}
        </div>
      </Paper>
    ),
    [classes, handleCopyCode],
  );

  return (
    <Paper
      id="chat-container"
      className={`${classes.chatContainer} ${
        isOpen ? classes.chatExpanded : ''
      } ${isFullscreen ? classes.chatFullscreen : ''}`}
      elevation={3}
      style={containerStyle}
    >
      <div className={classes.chatHeader}>
        <Button
          onClick={handleChatToggle}
          startIcon={<ChatIcon />}
          endIcon={isOpen ? <ExpandMoreIcon /> : <ExpandLessIcon />}
          color="inherit"
        >
          Chat IA
        </Button>
        {isOpen && (
          <div className={classes.headerActions}>
            <Tooltip title={isFullscreen ? 'Sair da tela cheia' : 'Tela cheia'}>
              <IconButton
                className={classes.closeButton}
                onClick={handleFullscreenToggle}
              >
                <FullscreenIcon />
              </IconButton>
            </Tooltip>
            <IconButton className={classes.closeButton} onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </div>
        )}
      </div>
      {isOpen && (
        <>
          <div className={classes.chatContent}>
            {messages.map((msg, index) => renderMessage(msg, index))}
            {isLoading && <Typography>Carregando resposta...</Typography>}
            <div ref={messagesEndRef} />
          </div>
          <div className={classes.chatInput}>
            <TextField
              className={classes.chatTextField}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder="Digite sua mensagem..."
              variant="outlined"
              size="small"
              multiline
              maxRows={3}
              disabled={isLoading}
            />
            <IconButton
              className={classes.sendButton}
              onClick={handleSend}
              color="primary"
              disabled={!input.trim() || isLoading}
            >
              <SendIcon />
            </IconButton>
          </div>
        </>
      )}
    </Paper>
  );
};