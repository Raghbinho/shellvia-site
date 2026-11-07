// `pnpm build:prod` fails while any TODO( remains. A null address hides the
// "Address" line of the legal notice.
export const PUBLISHER: { name: string; address: string | null; email: string } = {
  name: "Ragheb BEN ABDELLATIF",
  address: null,
  email: "benabdellatif.ragheb@hotmail.fr",
};

// The VPS (72.61.199.143) is a Hostinger server. Details as published on
// Hostinger's legal page: check them there before the first release.
export const HOST = {
  name: "Hostinger International Ltd.",
  address: "61 Lordou Vironos Street, 6023 Larnaca, Cyprus",
} as const;
