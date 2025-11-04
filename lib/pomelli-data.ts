// Pomelli Campaign Data
export interface CampaignCreative {
  title: string
  versions: {
    fileName: string
  }[]
}

export interface Campaign {
  creatives: CampaignCreative[]
}

export interface PomelliData {
  name: string
  overview: string
  websiteUrl: string
  brandValues: string[]
  visualAesthetics: string[]
  toneOfVoice: string[]
  fonts: string[]
  campaigns: Campaign[]
}

export const pomelliData: PomelliData = {
  "name": "tecxmate",
  "overview": "Tecxmate is an AI application development and business automation company that builds intelligent solutions leveraging machine learning and computer vision. They offer services in AI consulting, integration, and custom development to help partners streamline operations and drive business value.",
  "websiteUrl": "https://www.tecxmate.com/",
  "brandValues": [
    "Innovation",
    "Partnership",
    "Efficiency",
    "Expertise"
  ],
  "visualAesthetics": [
    "minimalist",
    "modern",
    "professional",
    "high-contrast",
    "sleek",
    "digital"
  ],
  "toneOfVoice": [
    "Professional",
    "Forward-thinking",
    "Expert",
    "Direct"
  ],
  "fonts": [
    "ibm plex sans jp",
    "inter"
  ],
  "campaigns": [
    {
      "creatives": [
        {
          "title": "Simplify the Complex. Automate the Future.",
          "versions": [
            {
              "fileName": "resource_bFmsBVV7CSE2K1BagLX_Dv.png"
            }
          ]
        },
        {
          "title": "The Bottleneck is Costing You.",
          "versions": [
            {
              "fileName": "resource_aGvaBigH7t12mE4m7bV4m9.png"
            }
          ]
        },
        {
          "title": "Tailored AI, Not Off-the-Shelf.",
          "versions": [
            {
              "fileName": "resource_8z-6rLv1c2dbr4Fq7XJ_zv.png"
            }
          ]
        },
        {
          "title": "Transform Efficiency into Growth.",
          "versions": [
            {
              "fileName": "resource_9arZg2N1bdwb2S6kRIkOwk.png"
            }
          ]
        }
      ]
    },
    {
      "creatives": [
        {
          "title": "Streamline Your Business Operations",
          "versions": [
            {
              "fileName": "resource_8V0Rd_9NG761cCIzkAQ_LK.png"
            }
          ]
        },
        {
          "title": "Challenge 1: Manual Data Entry",
          "versions": [
            {
              "fileName": "resource_aStPxfWMMAH68lKoG0Y4un.png"
            }
          ]
        },
        {
          "title": "The Tecxmate Solution",
          "versions": [
            {
              "fileName": "resource_89DlyqBDKe38gZgkz3r_HG.png"
            }
          ]
        },
        {
          "title": "The Impact: 30% Efficiency Gain",
          "versions": [
            {
              "fileName": "resource_a9yKcfqtQVP3Rsq5iq7kfr.png"
            }
          ]
        }
      ]
    },
    {
      "creatives": [
        {
          "title": "Automate the Complex.",
          "versions": [
            {
              "fileName": "resource_b6oO0xzUYIt5JyKhwkB4HK.png"
            }
          ]
        },
        {
          "title": "Complex Data, Simple Decisions.",
          "versions": [
            {
              "fileName": "resource_91C5urc9wuEa8uiywR94qz.png"
            }
          ]
        },
        {
          "title": "Computer Vision for Value.",
          "versions": [
            {
              "fileName": "resource_8tiqlbb3IQs3WQMZoPm4qy.png"
            }
          ]
        },
        {
          "title": "Drive Business Value.",
          "versions": [
            {
              "fileName": "resource_atoROj5Bpkta9g29yOEk_l.png"
            }
          ]
        }
      ]
    }
  ]
}

