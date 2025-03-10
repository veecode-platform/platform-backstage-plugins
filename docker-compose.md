# Docker Compose 
Starts devportal stack using embedded docker compose configured.

## Profiles

Available profiles:
- **complete**: postgres, pgadmin, keycloak
- **basic**: postgres, keycloak

## Commads
Complete profile:
```bash
docker compose --profile=complete up -d
```
Basic profile:
```bash
docker compose --profile=basic up -d
```
Down:
```bash
docker compose --profile=complete down
```

```bash
docker compose --profile=basic down
```