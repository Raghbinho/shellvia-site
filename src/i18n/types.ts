export interface Dict {
  meta: {
    siteTitle: string;
    description: string;
  };
  nav: {
    product: string;
    download: string;
    faq: string;
    downloadButton: string;
    label: string;
    switchLabel: string;
  };
  pages: {
    home: string;
    download: string;
    legal: string;
    privacy: string;
  };
  footer: {
    releaseNotes: string;
    privacy: string;
    legal: string;
    contact: string;
    copyright: string;
  };
  langBanner: {
    text: string;
    link: string;
    close: string;
  };
  window: {
    files: string;
    name: string;
    size: string;
    filter: string;
    follow: string;
    tunnels: string;
    tunnelsOne: string;
    tunnelsTwo: string;
    connected: string;
    transfers: string;
    statusOne: string;
    statusTwo: string;
    sizeBashrc: string;
    sizeDeploy: string;
    sizeIndex: string;
    sizeRobots: string;
    sizeEnv: string;
  };
  hero: {
    kicker: string;
    kickerBadge: string;
    titleLine1: string;
    titleLine2: string;
    leadStrong: string;
    leadRest: string;
    download: string;
    features: string;
  };
}
