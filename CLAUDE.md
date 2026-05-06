# CLAUDE.md — my_devops

Contexte et conventions pour Claude Code dans ce dépôt DevOps.

## Objectif du dépôt

Scripts, configurations et automatisations DevOps personnels.

## Conventions

- Workflow de branches : **git-flow** (`main` / `develop` / `feature/*` / `release/*` / `hotfix/*`)
- GitHub CLI (`gh`) pour toutes les interactions avec GitHub (PRs, issues, releases)
- Scripts shell : bash ou zsh, POSIX-compatible quand c'est possible
- Pas de secrets dans le dépôt — utiliser des variables d'environnement ou un gestionnaire de secrets

## Commandes utiles

```bash
# Initialiser git-flow sur un nouveau clone
git flow init -d

# Créer une PR depuis la branche courante
gh pr create --fill

# Lister les workflows GitHub Actions
gh workflow list
```

## Instructions pour Claude

- Proposer des scripts robustes avec gestion d'erreurs (`set -euo pipefail`)
- Privilégier la lisibilité et la maintenabilité sur la concision
- Documenter les prérequis en tête de chaque script
- Tester les commandes destructives avec `--dry-run` quand disponible
