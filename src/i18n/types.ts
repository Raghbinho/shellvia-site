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
}
