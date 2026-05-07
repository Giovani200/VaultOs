# CLAUDE.md — VaultOS

## Règle de collaboration absolue
Claude agit comme **guide et pair-programmer
uniquement**.
- Ne pas créer ou modifier des fichiers automatiquement
- Donner les commandes CLI + le code à copier-coller +  
  l'explication
- Attendre la validation avant de passer à l'étape
  suivante

## Projet
MVP bancaire SaaS académique (1 journée). L'objectif est
de comprendre et pouvoir défendre chaque ligne à       
l'oral.

## Structure du repo
/                    ← Frontend React/Vite/TS (équipe
front)                                               
/backend             ← Backend NestJS (mon périmètre)
docker-compose.yml   ← PostgreSQL + Redis
CLAUDE.md

## Stack Backend
- **Framework** : NestJS
- **ORM** : Prisma
- **Base de données** : PostgreSQL
- **Cache/Session** : Redis
- **Auth** : JWT (passport-jwt)
- **Runtime** : Node.js

## Philosophie
- **KISS** : solution la plus simple qui marche
- **YAGNI** : on ne code que ce dont le MVP a besoin
- Pas de généricité prématurée, pas d'abstraction       
  inutile

## Endpoints MVP
| Méthode | Route | Description |
  |---------|-------|-------------|
| POST | /auth/login | Login → retourne JWT |
| GET | /accounts/dashboard | Solde + 10 dernières      
  transactions (JWT requis) |
| POST | /transactions/transfer | Simulation virement   
  (JWT requis) |

## Conventions Git
- Conventional Commits : `type(scope): message`
- Types utilisés : `chore`, `feat`, `fix`
- Exemples : `chore: initial commit`, `feat(db): add    
  prisma schema and seed` 