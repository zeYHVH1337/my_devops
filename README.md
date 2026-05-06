# my_devops

Dépôt personnel de configurations, scripts et pratiques DevOps.

## Contenu

| Dossier / Fichier | Description |
|---|---|
| `scripts/` | Scripts d'automatisation shell |
| `ci/` | Configurations CI/CD (GitHub Actions, etc.) |
| `CLAUDE.md` | Instructions pour Claude Code dans ce dépôt |

## Prérequis

- [git](https://git-scm.com/) >= 2.x
- [git-flow](https://github.com/nvie/gitflow) — workflow de branches Git (`brew install git-flow`)
- [gh](https://cli.github.com/) — GitHub CLI (`brew install gh`)

## Installation

```bash
git clone https://github.com/zeYHVH1337/my_devops.git
cd my_devops
git flow init -d
```

## Workflow git-flow

Ce dépôt suit la convention **git-flow** :

| Branche | Rôle |
|---|---|
| `main` | Code stable, prêt pour la production |
| `develop` | Intégration des fonctionnalités |
| `feature/*` | Nouvelles fonctionnalités |
| `release/*` | Préparation des releases |
| `hotfix/*` | Correctifs urgents |

### Commandes essentielles

```bash
# Initialiser git-flow
git flow init

# Nouvelle fonctionnalité
git flow feature start ma-fonctionnalite
git flow feature finish ma-fonctionnalite

# Créer une Pull Request
gh pr create --fill

# Lister les workflows GitHub Actions
gh workflow list
```

## Licence

Usage personnel — tous droits réservés.
