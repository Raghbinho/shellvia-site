# Shellvia Site — consignes pour Claude

Site vitrine statique de Shellvia (shellvia.com) : Next.js (export statique),
React 19, TypeScript strict. Le produit lui-même vit dans le dépôt `shellvia`.

## Commandes

```bash
pnpm dev         # serveur de développement
pnpm build       # export statique dans out/
pnpm lint
pnpm typecheck
pnpm test        # Vitest
```

## Règles

- Ne jamais pousser (`git push`), ne jamais toucher aux réglages du dépôt ni aux
  secrets sans accord explicite de l'utilisateur.
- Tous les textes vivent dans `src/i18n` ; aucun texte en dur dans les composants.
- Les maquettes de référence sont dans `design/` (`home.html`, `download.html`).
- Couleurs et polices : variables de `src/styles/tokens.css`, jamais en dur.
- Code et commits en anglais, docs en français. Commits conventionnels.
- Hébergement : nginx sur le VPS Hostinger `72.61.199.143` (d'autres sites y
  tournent : ne jamais agir sur le serveur soi-même). Configuration dans
  `deploy/` ; l'utilisateur lance `deploy/setup-vps.sh`. Le workflow Deploy
  envoie `out/` par rsync avec la clé `DEPLOY_SSH_KEY` (secret déposé par
  l'utilisateur).
