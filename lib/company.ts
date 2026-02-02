/**
 * Centralized company information for Tecxmate
 * Update this file when company details change.
 */

export const company = {
  /** Brand/trading name */
  name: "Tecxmate",
  /** Legal names by locale */
  legalName: {
    en: "TECXMATE Corporation Ltd.",
    vi: "CÔNG TY TNHH TECXMATE",
    zh: "達盟科技有限公司",
  },
  /** Business formation type */
  formation: "Limited Liability Company (LLC)",
  /** Headquarters address (Vietnam) */
  address: {
    street: "Villa Park Complex, Phu Huu Ward",
    locality: "Ho Chi Minh City",
    country: "Vietnam",
    countryCode: "VN",
  },
  /** US address */
  addressUS: "30 N Gould St Ste N, Sheridan, WY 82801, USA",
  /** Taiwan address */
  addressTW: "No. 43, Section 4, Keelung Road, Daan District, Taipei 106335, Taiwan",
  /** Operating markets */
  operatingMarkets: ["Taiwan", "US", "Vietnam"],
  /** Contact email */
  contactEmail: "niko.tecx@gmail.com",
  /** Phone numbers by region (display + tel link format) */
  phone: {
    us: { display: "(+1) 6172729992", tel: "+16172729992" },
    tw: { display: "(+886) 9668602602", tel: "+8869668602602" },
    vn: { display: "(+84) 0337460602", tel: "+840337460602" },
  },
  /** Website URL */
  website: process.env.NEXT_PUBLIC_SITE_URL || "https://www.tecxmate.com",
} as const
