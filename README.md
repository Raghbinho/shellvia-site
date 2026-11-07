# Shellvia Site

Site vitrine de Shellvia (shellvia.com), généré en export statique avec Next.js.
Les maquettes de référence sont dans `design/`.

## Développement

```bash
pnpm install
pnpm dev          # http://localhost:3000
pnpm build        # export statique dans out/
pnpm preview      # build puis http://localhost:4000 (comme en production)
pnpm build:prod   # build + refus des TODO( restants (voir « Éditeur »)
```

## Environnements

| | Test local (`pnpm dev`) | Aperçu (`pnpm preview`) | Production |
|---|---|---|---|
| Réglages | `.env.development` (versionné) | aucun | secret et variable GitHub |
| Version proposée | fausse (`src/lib/fixtures/release.json`) | vraie dernière version | vraie dernière version |
| Statistiques Umami | non | non | oui si `UMAMI_WEBSITE_ID` est défini |

Pour tester `pnpm dev` avec la vraie version publiée, commenter la ligne de
`.env.development`. Aucun secret n'est dans le dépôt.

## Tests

```bash
pnpm lint && pnpm typecheck
pnpm test         # Vitest (composants et scripts/*.test.mjs)
pnpm e2e          # Playwright (chromium) sur un build avec release factice
pnpm check:links  # chaque lien interne de out/ pointe vers un fichier
```

Première fois : `pnpm exec playwright install chromium`.

## Éditeur (mentions légales)

Avant la première mise en ligne, remplir les champs `TODO(...)` de
`src/content/publisher.ts`. Tant qu'il en reste, `pnpm build:prod` échoue : le
workflow de déploiement échouera donc volontairement à cette étape.

## Déploiement

Le site est servi par nginx sur le VPS Hostinger `72.61.199.143`, dans
`/var/www/shellvia`. Le workflow `.github/workflows/deploy.yml` s'exécute à
chaque push sur `main` (ou à la main) : mêmes contrôles que la CI,
`pnpm build:prod`, puis envoi de `out/` par rsync en SSH. Les actions tierces
sont épinglées par SHA de commit.

- Secret `DEPLOY_SSH_KEY` : clé privée réservée au déploiement. Sur le serveur,
  elle ne permet qu'une chose : écrire avec rsync dans `/var/www/shellvia`
  (utilisateur `deploy`, commande imposée `rrsync -wo`).
- Variable `UMAMI_WEBSITE_ID` : identifiant Umami Cloud, public (il apparaît
  dans chaque page).
- La clé d'hôte du VPS est épinglée dans `deploy/known_hosts` : si le serveur
  est réinstallé, la remplacer (`ssh-keyscan -t ed25519 72.61.199.143`) après
  avoir comparé l'empreinte avec celle affichée sur le serveur.

Lancer un déploiement sans push (publie `main` tel qu'il est sur GitHub) :

```bash
pnpm run deploy
```

## Mise en place du VPS (une fois)

1. **DNS** (Hostinger, Domaines, DNS) : pour shellvia.com, shellvia.fr et
   shellvia.app, un enregistrement A `@` et un A `www` vers `72.61.199.143`
   (supprimer les anciens A/AAAA et CNAME `www`).
2. **Clé de déploiement**, sur votre poste :
   `ssh-keygen -t ed25519 -N '' -C shellvia-deploy -f $HOME/.ssh/shellvia_deploy`,
   puis `Get-Content $HOME/.ssh/shellvia_deploy -Raw | gh secret set DEPLOY_SSH_KEY -R Raghbinho/shellvia-site` (PowerShell).
3. **Serveur** : copier le dossier `deploy/` et la clé publique, puis lancer le
   script (relisez-le avant) :

   ```bash
   scp -r deploy <vous>@72.61.199.143:/tmp/shellvia-deploy
   scp $HOME/.ssh/shellvia_deploy.pub <vous>@72.61.199.143:/tmp/shellvia-deploy/
   ssh <vous>@72.61.199.143
   sudo bash /tmp/shellvia-deploy/setup-vps.sh /tmp/shellvia-deploy/shellvia_deploy.pub <e-mail>
   ```

   Il installe certbot et rsync, crée l'utilisateur `deploy` et
   `/var/www/shellvia`, obtient un certificat Let's Encrypt pour les six noms
   (renouvelé automatiquement), puis ajoute le site nginx sans toucher aux
   autres. Il peut être relancé sans risque.
4. Comparer l'empreinte affichée à la fin avec `ssh-keygen -lf deploy/known_hosts`.
