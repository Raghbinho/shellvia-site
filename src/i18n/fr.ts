import type { Dict } from "./types";

export const fr: Dict = {
  meta: {
    siteTitle: "Shellvia",
    description:
      "Sessions SSH, terminaux locaux, fichiers SFTP, tunnels, snippets : tout votre travail sur serveurs dans une app rapide, pensée pour le clavier.",
  },
  nav: {
    product: "Produit",
    download: "Télécharger",
    faq: "FAQ",
    downloadButton: "Télécharger",
    label: "Principale",
    switchLabel: "View in English",
  },
  pages: {
    home: "Shellvia",
    download: "Télécharger",
    legal: "Mentions légales",
    privacy: "Confidentialité",
  },
  footer: {
    releaseNotes: "Notes de version",
    privacy: "Confidentialité",
    legal: "Mentions légales",
    contact: "Contact",
    copyright: "© 2026 Shellvia",
  },
  // Shown on a French page to a non-French visitor.
  langBanner: {
    text: "This site is available in English",
    link: "View in English",
    close: "Close",
  },
  window: {
    files: "Fichiers",
    name: "Nom",
    size: "Taille",
    filter: "Filtrer",
    follow: "Suivre le terminal",
    tunnels: "Tunnels",
    tunnelsOne: "1 actif",
    tunnelsTwo: "2 actifs",
    connected: "Connecté",
    transfers: "Transferts",
    statusOne: "1 tunnel actif",
    statusTwo: "2 tunnels actifs",
    sizeBashrc: "3,1 Kio",
    sizeDeploy: "912 o",
    sizeIndex: "1,8 Kio",
    sizeRobots: "612 o",
    sizeEnv: "284 o",
  },
  hero: {
    kicker: "Client SSH pour Windows, macOS et Linux",
    kickerBadge: "gratuit",
    titleLine1: "Tous vos serveurs.",
    titleLine2: "Une seule app.",
    leadStrong: "Sessions SSH, terminaux locaux, fichiers SFTP, tunnels, snippets",
    leadRest: " : tout votre travail sur serveurs dans une app rapide, pensée pour le clavier.",
    download: "Télécharger pour {os}",
    features: "Voir les fonctions",
  },
  features: {
    title: "Tout ce qu'il faut.",
    titleEm: "Au même endroit.",
    sub: "Fini de jongler entre un terminal, un client SFTP, un gestionnaire de tunnels et un fichier de commandes.",
    files: {
      local: "Ce PC · C:\\Projets\\app",
      remote: "web-01 · /var/www/app",
      items: "2 éléments",
      transfers: "Transferts",
      title: "Glissez, c'est transféré.",
      before:
        "Double panneau local et distant, multi-sélection, file de transferts. Le panneau Fichiers suit le dossier de votre shell, distant ou local. Renommer, supprimer, droits ",
      code: "chmod",
      after: " : sans quitter l'app.",
    },
    sessions: {
      title: "Sessions organisées",
      before: "Dossiers, favoris, recherche. Import de ",
      after: ", rebond par un bastion.",
    },
    shells: {
      title: "Vos shells locaux aussi",
      text: "PowerShell, WSL, zsh… dans les mêmes onglets et volets divisés.",
    },
    tunnels: {
      title: "Tunnels en un clic",
      text: "Redirections locales, distantes et SOCKS5, suivies en direct.",
    },
    snippets: {
      title: "Snippets",
      text: "Vos commandes enregistrées, envoyées au terminal en un geste.",
    },
    multi: {
      title: "Multi-exécution",
      text: "Une saisie, envoyée à plusieurs terminaux à la fois.",
      done: "Fait.",
    },
    keys: {
      title: "Tout au clavier",
      before: "Palette de commandes et connexion rapide ",
      code: "user@hôte:port",
      ctrl: "Ctrl",
      shift: "Maj",
      connectTo: "Se connecter à",
    },
    agent: {
      title: "Clés et agent SSH",
      text: "Bibliothèque de clés et agent intégré qui demande votre accord.",
      asks: "demande",
      deny: "Refuser",
      allow: "Autoriser",
      granted: "✓ Signature accordée",
    },
    vault: {
      title: "Vos secrets restent chez vous",
      text: "Coffre chiffré local. Aucun compte, aucun cloud.",
      name: "Coffre local",
      encrypted: "chiffré",
    },
    also: {
      title: "Et aussi",
      chips: [
        "Onglets et volets divisés",
        "Import de known_hosts",
        "Empreintes vérifiées",
        "Test de connexion",
        "Corbeille pour les fichiers locaux",
        "Thèmes sombre et clair",
        "Densité compacte ou confortable",
        "Mises à jour signées",
        "Français et anglais",
      ],
    },
  },
  home: {
    title: "Shellvia — client SSH, SFTP et terminal",
    download: {
      title: "Gratuit.",
      titleEm: "Sans compte.",
      sub: "Téléchargez, installez, connectez-vous. Les mises à jour suivent automatiquement.",
      button: "Télécharger",
      windowsReq: "Windows 10/11",
      macosReq: "universel, macOS 11+",
      linuxReq: "toute distribution",
    },
    faq: {
      title: "Questions.",
      items: [
        { q: "Est-ce gratuit ?", a: "Oui. Shellvia est gratuit et ne demande aucun compte." },
        {
          q: "Où sont stockés mes mots de passe ?",
          a: "Dans un coffre chiffré sur votre ordinateur. Rien n'est envoyé ailleurs.",
        },
        {
          q: "Windows ou macOS affiche un avertissement à l'installation.",
          a: "Shellvia n'est pas encore signé : votre système demande donc une confirmation. La page Télécharger détaille les étapes.",
        },
        {
          q: "Puis-je reprendre ma configuration OpenSSH ?",
          a: "Oui. Shellvia importe vos fichiers ~/.ssh/config et known_hosts.",
        },
        {
          q: "Comment se font les mises à jour ?",
          a: "Elles sont automatiques et signées, et ne s'installent qu'avec votre accord.",
        },
      ],
    },
    closing: { title: "Connectez-vous." },
  },
};
