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
    legal: string;
    privacy: string;
    legalTitle: string;
    privacyTitle: string;
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
  features: {
    title: string;
    titleEm: string;
    sub: string;
    files: {
      local: string;
      remote: string;
      items: string;
      transfers: string;
      title: string;
      before: string;
      code: string;
      after: string;
    };
    sessions: { title: string; before: string; after: string };
    shells: { title: string; text: string };
    tunnels: { title: string; text: string };
    snippets: { title: string; text: string };
    multi: { title: string; text: string; done: string };
    keys: {
      title: string;
      before: string;
      code: string;
      ctrl: string;
      shift: string;
      connectTo: string;
    };
    agent: {
      title: string;
      text: string;
      asks: string;
      deny: string;
      allow: string;
      granted: string;
    };
    vault: { title: string; text: string; name: string; encrypted: string };
    also: { title: string; chips: string[] };
  };
  home: {
    title: string;
    download: {
      title: string;
      titleEm: string;
      sub: string;
      button: string;
      windowsReq: string;
      macosReq: string;
      linuxReq: string;
    };
    faq: {
      title: string;
      items: { q: string; a: string }[];
    };
    closing: { title: string };
    osNames: { windows: string; macos: string; linux: string };
  };
  download: {
    metaTitle: string;
    title: string;
    titleEm: string;
    lead: string;
    yourSystem: string;
    chooseSystem: string;
    productFor: string;
    version: string;
    button: string;
    altPrompt: string;
    altLink: string;
    releaseNotes: string;
    meta: Record<"windows" | "macos" | "linux", string>;
    allTitle: string;
    detectedTag: string;
    requirements: Record<"windows" | "macos" | "linux", string>;
    formatNotes: Record<"exe" | "msi" | "dmg" | "appimage" | "deb" | "rpm", string>;
    downloadFile: string;
    firstTitle: string;
    steps: Record<"windows" | "macos" | "linux", string[]>;
    notSigned: string;
    allReleases: string;
    why: Array<{ title: string; text: string }>;
  };
  legal: {
    publisherTitle: string;
    publisherName: string;
    publisherAddress: string;
    contactTitle: string;
    contactText: string;
    hostTitle: string;
    hostName: string;
    hostAddress: string;
    contentTitle: string;
    contentText: string;
  };
  privacy: {
    intro: string;
    siteTitle: string;
    siteNoAccount: string;
    measureTitle: string;
    measureText: string;
    downloadsTitle: string;
    downloadsText: string;
    appTitle: string;
    appText: string;
    contactTitle: string;
    contactText: string;
  };
}
