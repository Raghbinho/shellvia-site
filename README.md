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
| Réglages | `.env.development` (versionné) | aucun | secrets GitHub, ou `.env.deploy.local` |
| Version proposée | fausse (`src/lib/fixtures/release.json`) | vraie dernière version | vraie dernière version |
| Statistiques Umami | non | non | oui si `UMAMI_WEBSITE_ID` est défini |

Pour tester `pnpm dev` avec la vraie version publiée, commenter la ligne de
`.env.development`. Aucun fichier `.env*` ne contient de secret versionné :
`.env.deploy.local` est ignoré par git.

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

Le workflow `.github/workflows/deploy.yml` s'exécute à chaque push sur `main`
(ou à la main) : mêmes contrôles que la CI, `pnpm build:prod`, puis envoi de
`out/` en FTPS. Les actions tierces sont épinglées par SHA de commit.

Secrets et variable à définir une fois (par vous, avec `gh`, sans les écrire
dans le dépôt) :

```bash
gh secret set FTP_HOST         # nom d'hôte correspondant au certificat TLS de Hostinger
gh secret set FTP_USER
gh secret set FTP_PASSWORD
gh secret set FTP_DIR            # doit finir par / ex. /domains/shellvia.com/public_html/
gh variable set UMAMI_WEBSITE_ID # identifiant Umami ; vide = pas de statistiques
```

Déploiement depuis le poste : copier `.env.deploy.example` en
`.env.deploy.local` (ignoré par git), le remplir, puis :

```bash
pnpm deploy:ftp   # build:prod avec ces réglages, puis envoi FTPS de out/
```

Une variable déjà définie dans le terminal l'emporte sur le fichier.

`FTP_DIR` doit impérativement se terminer par `/` (exigence de l'action FTP ;
le workflow et le script refusent sinon). Valeur : `/` quand le compte FTP est
limité au dossier du site (cas recommandé ci-dessous) ; sinon
`/domains/shellvia.com/public_html/`.

`FTP_HOST` doit être le nom d'hôte qui correspond au certificat TLS de Hostinger :
le workflow active `security: strict` (vérification du certificat), donc une
adresse IP ou un autre nom fait échouer l'envoi.

Un `pnpm deploy:ftp` local sans `NEXT_PUBLIC_UMAMI_WEBSITE_ID` publie des pages
sans statistiques d'audience (le script prévient) : renseignez-la dans
`.env.deploy.local`.

Le script n'affiche jamais les valeurs, seulement le nom d'une variable absente.
`public/.htaccess` est forcé en fins de ligne LF (`.gitattributes`).

## Hostinger : domaines et SSL

1. Héberger les trois domaines sur le même hébergement : ajouter chaque domaine
   (hPanel, Sites web, Ajouter un site web) en pointant son dossier racine vers
   le même répertoire (recommandé : `public/.htaccess` redirige alors shellvia.fr
   vers `https://shellvia.com/fr/…` et shellvia.app vers shellvia.com). Éviter la
   redirection 301 de hPanel, qui perdrait la correspondance `/fr/` de
   shellvia.fr ; si vous l'utilisez malgré tout, shellvia.fr doit pointer vers
   `https://shellvia.com/fr/`.
2. Pointer les DNS de chaque domaine vers l'hébergement (serveurs de noms
   Hostinger ou enregistrements A/AAAA indiqués dans hPanel).
3. Activer le SSL gratuit (hPanel, Sécurité, SSL) pour chaque domaine. Ne pas
   activer « Forcer HTTPS » dans hPanel : `.htaccess` force déjà HTTPS, et ce
   réglage peut être écrasé par les déploiements.
4. Créer un compte FTP dédié limité au dossier du site, et utiliser son
   identifiant comme `FTP_USER`.
