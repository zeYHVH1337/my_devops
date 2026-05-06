# my_devops

Dépôt personnel de configurations, scripts et pratiques DevOps.

## Contenu

- Scripts d'automatisation
- Configurations CI/CD
- Outils et utilitaires DevOps

## Prérequis

- [git-flow](https://github.com/nvie/gitflow) — workflow de branches Git
- [gh](https://cli.github.com/) — GitHub CLI

## Workflow

Ce dépôt suit la convention **git-flow** :

| Branche | Rôle |
|---------|------|
| `main` | Code stable, prêt pour la production |
| `develop` | Intégration des fonctionnalités |
| `feature/*` | Nouvelles fonctionnalités |
| `release/*` | Préparation des releases |
| `hotfix/*` | Correctifs urgents |

### Initialiser git-flow

```bash
git flow init
```

### Créer une fonctionnalité

```bash
git flow feature start ma-fonctionnalite
# ... travail ...
git flow feature finish ma-fonctionnalite
```
