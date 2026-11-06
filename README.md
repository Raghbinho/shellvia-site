# Shellvia Site

Site vitrine de Shellvia (shellvia.com), généré en export statique avec Next.js.
Les maquettes de référence sont dans `design/`.

## Développement

```bash
pnpm install
pnpm dev          # http://localhost:3000
pnpm build        # export statique dans out/
pnpm build:prod   # build + refus des TODO( restants (voir « Éditeur »)
```

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
gh secret set FTP_HOST
gh secret set FTP_USER
gh secret set FTP_PASSWORD
gh secret set FTP_DIR            # doit finir par / ex. /domains/shellvia.com/public_html/
gh variable set UMAMI_WEBSITE_ID # identifiant Umami ; vide = pas de statistiques
```

Déploiement depuis le poste (mêmes variables d'environnement `FTP_HOST`,
`FTP_USER`, `FTP_PASSWORD`, `FTP_DIR`) :

```bash
pnpm deploy:ftp
```

`FTP_DIR` doit imp�rativement se terminer par `/` (exigence de l'action FTP ;
le workflow et le script refusent sinon).

Le script n'affiche jamais les valeurs, seulement le nom d'une variable absente.
`public/.htaccess` est forcé en fins de ligne LF (`.gitattributes`).

## Hostinger : domaines et SSL

1. Héberger les trois domaines sur le même hébergement : ajouter chaque domaine
   (hPanel, Sites web, Ajouter un site web) en pointant son dossier racine vers
   le même répertoire, ou configurer les deux autres en redirection 301 vers le
   domaine principal.
2. Pointer les DNS de chaque domaine vers l'hébergement (serveurs de noms
   Hostinger ou enregistrements A/AAAA indiqués dans hPanel).
3. Activer le SSL gratuit (hPanel, Sécurité, SSL) pour chaque domaine, puis
   activer « Forcer HTTPS ».
4. Créer un compte FTP dédié limité au dossier du site, et utiliser son
   identifiant comme `FTP_USER`.
