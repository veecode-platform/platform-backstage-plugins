# Gitlab-pipelines Plugin

O Plugin Gitlab-pipelines integra o GitlabCi com seu componente backstage.
Ele oferece duas abordagens:
- Executar / Cancelar uma nova pipeline, listando o estado das últimas pipelines do seu projeto.
- Oferece uma lista de jobs manuais a serem executados sob demanda do usuário.

Começando:

Pré-requisitos:
  - Ter um projeto Backstage instalado localmente, <a href="https://backstage.io/docs/getting-started/create-an-app/" target="_blank">✔️ Como criar um aplicativo Backstage 📃 </a>.
  - Configure o catálogo e integre com Gitlab, <a href="https://backstage.io/docs/integrations/gitlab/locations" target="_blank">✔️ Como configurar a integração 📃</a> .

**Instalação**

```bash
yarn add --cwd packages/app @veecode-platform/backstage-plugin-gitlab-pipelines
```

Configuração
As etapas a seguir devem ser seguidas para garantir o funcionamento do plugin de forma correta.

1- Configuração de proxy
No arquivo `app-config.yaml`:
```yaml
proxy:

  '/gitlab-pipelines':
    # target: https://gitlab.com/api/v4
    target: https://gitlab.com/api/v4
    allowedHeaders: ['PRIVATE-TOKEN']
    headers:
      PRIVATE-TOKEN: ${GITLAB_TOKEN_SECRET}
      Accept: application/json 
```
