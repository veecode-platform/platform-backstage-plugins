/*
 * Copyright 2024 The Backstage Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@material-ui/core';

export const AIChat: React.FC = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<string[]>([]);

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, `Você: ${input}`]);
      // Aqui você adicionaria a lógica para enviar a mensagem para a API de IA
      setInput('');
    }
  };

  return (
    <Box>
      <Typography variant="h2">Chat AI</Typography>
      <Box>
        {messages.map((msg, index) => (
          <Typography key={index}>{msg}</Typography>
        ))}
      </Box>
      <TextField
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Digite sua mensagem..."
        fullWidth
      />
      <Button onClick={handleSend} variant="contained" color="primary">
        Enviar
      </Button>
    </Box>
  );
};