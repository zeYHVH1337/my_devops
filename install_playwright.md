# Installer et configurer Playwright MCP dans Claude Code

> Retour d'expérience complet issu de 5+ tentatives échouées avant de trouver la bonne méthode.  
> Dernière mise à jour : 2026-05-06

---

## Prérequis

- Claude Code CLI installé (`claude --version`)
- Node.js / npm disponible
- macOS avec Homebrew (les chemins ci-dessous sont pour Apple Silicon)

---

## Installation du binaire

```bash
npm install -g @playwright/mcp
```

Vérifier l'installation :

```bash
playwright-mcp --version
# → 0.0.73 (ou supérieur)
which playwright-mcp
# → /opt/homebrew/bin/playwright-mcp
```

---

## Configuration dans Claude Code — LA seule méthode qui fonctionne

### Piège majeur : les bons et les mauvais fichiers

Claude Code **v2.1+** stocke la configuration MCP dans **`~/.claude.json`** (à la racine du home), sous la clé `projects["/chemin/absolu/projet"].mcpServers`.

Les fichiers suivants sont **ignorés pour les MCP** (erreur classique) :

| Fichier | Rôle réel | MCP ? |
|---|---|---|
| `~/.claude/settings.json` | Thème, préférences UI | ❌ Non |
| `.claude/settings.json` (projet) | Permissions, hooks | ❌ Non |
| `.claude/mcp.json` | Format non reconnu | ❌ Non |
| `mcp.json` à la racine | Non lu par Claude Code | ❌ Non |
| **`~/.claude.json`** | **Config MCP** | **✅ Oui** |

### Commande à utiliser (depuis le dossier projet)

```bash
cd /chemin/vers/mon/projet
claude mcp add playwright /opt/homebrew/bin/playwright-mcp
```

Cette commande écrit automatiquement dans `~/.claude.json` au bon endroit.

### Vérifier que ça fonctionne

```bash
claude mcp list
# → playwright: /opt/homebrew/bin/playwright-mcp - ✓ Connected
```

Redémarrer la session Claude Code pour que les outils `browser_*` soient disponibles.

---

## Mode headful vs headless

Le mode **headful** (avec fenêtre visible) est le **défaut** de playwright-mcp — ne rien préciser.

```bash
# ✅ Correct — headful par défaut
claude mcp add playwright /opt/homebrew/bin/playwright-mcp

# ❌ Incorrect — --headless=false est une option INVALIDE qui fait planter le serveur
claude mcp add playwright /opt/homebrew/bin/playwright-mcp -- --headless=false

# Pour forcer headless (cas particulier)
claude mcp add playwright /opt/homebrew/bin/playwright-mcp -- --headless
```

---

## Utilisation dans Claude Code

Une fois connecté, les outils disponibles sont :

| Outil | Usage |
|---|---|
| `browser_navigate` | Aller à une URL |
| `browser_snapshot` | Capturer l'arbre d'accessibilité (préférer au screenshot) |
| `browser_click` | Cliquer sur un élément |
| `browser_type` | Taper du texte dans un champ |
| `browser_evaluate` | Exécuter du JavaScript dans la page |
| `browser_fill_form` | Remplir un formulaire |
| `browser_press_key` | Envoyer une touche clavier |

**Règle d'or** : ne jamais fermer le navigateur automatiquement (`browser_close`). L'utilisateur décide quand fermer.

---

## Cas pratique — Sites Shopify

### Problème : overlays qui interceptent les clics

Sur les boutiques Shopify, l'élément `<shopify-forms-embed>` intercepte tous les pointer events.  
Résultat : `browser_click` timeout sur n'importe quel bouton.

### Solution : supprimer l'overlay via JavaScript avant de cliquer

```javascript
// À exécuter avec browser_evaluate en début de session sur un site Shopify
() => {
  document.querySelector('shopify-forms-embed')?.remove();
  document.querySelector('dialog')?.remove(); // ferme aussi les modales bonus
}
```

### Navigation search sur Shopify

Si le bouton loupe est bloqué par un overlay, naviguer directement par URL :

```
/search?q=mon+produit&type=product
```

Plus fiable que de cliquer sur l'icône de recherche dans le header.

---

## Nettoyage des fichiers parasites

Si vous avez tenté des configurations alternatives, supprimer les fichiers inutiles :

```bash
rm /chemin/projet/mcp.json               # non lu par Claude Code
rm /chemin/projet/.claude/mcp.json       # format non reconnu
```

Garder uniquement :
- `~/.claude.json` — géré par `claude mcp add`, ne pas éditer à la main
- `~/.claude/settings.json` — thème, préférences (pas les MCP)
- `.claude/settings.json` — permissions projet, hooks

---

## Résumé en une ligne

```bash
cd mon-projet && claude mcp add playwright /opt/homebrew/bin/playwright-mcp
```

C'est tout. Le reste est du bruit.
