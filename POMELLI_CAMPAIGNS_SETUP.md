# Pomelli Campaigns Integration Guide

## Overview

Your Pomelli marketing campaign creatives have been integrated into your website. The campaigns section displays your marketing materials in a beautiful, scrollable carousel.

## Campaign Data Structure

The campaigns data is stored in `lib/pomelli-data.ts` and includes:

- **3 Campaign Sets** with multiple creatives each
- **12 Total Creative Assets** with titles and image references
- **Brand information** (values, aesthetics, tone of voice)

## Image Setup

### Step 1: Add Campaign Images

You need to add the campaign images from Pomelli to your project:

1. **Create campaigns folder** (already created):
   ```
   public/campaigns/
   ```

2. **Add your images** with the exact filenames from Pomelli:
   ```
   public/campaigns/resource_bFmsBVV7CSE2K1BagLX_Dv.png
   public/campaigns/resource_aGvaBigH7t12mE4m7bV4m9.png
   public/campaigns/resource_8z-6rLv1c2dbr4Fq7XJ_zv.png
   public/campaigns/resource_9arZg2N1bdwb2S6kRIkOwk.png
   public/campaigns/resource_8V0Rd_9NG761cCIzkAQ_LK.png
   public/campaigns/resource_aStPxfWMMAH68lKoG0Y4un.png
   public/campaigns/resource_89DlyqBDKe38gZgkz3r_HG.png
   public/campaigns/resource_a9yKcfqtQVP3Rsq5iq7kfr.png
   public/campaigns/resource_b6oO0xzUYIt5JyKhwkB4HK.png
   public/campaigns/resource_91C5urc9wuEa8uiywR94qz.png
   public/campaigns/resource_8tiqlbb3IQs3WQMZoPm4qy.png
   public/campaigns/resource_atoROj5Bpkta9g29yOEk_l.png
   ```

### Step 2: Download Images from Pomelli

1. Go to your Pomelli account
2. Download each creative image
3. Save them to `public/campaigns/` with the exact filename from the JSON data

## Campaign Details

### Campaign 1: Core Messaging
- "Simplify the Complex. Automate the Future."
- "The Bottleneck is Costing You."
- "Tailored AI, Not Off-the-Shelf."
- "Transform Efficiency into Growth."

### Campaign 2: Business Operations
- "Streamline Your Business Operations"
- "Challenge 1: Manual Data Entry"
- "The Tecxmate Solution"
- "The Impact: 30% Efficiency Gain"

### Campaign 3: AI & Technology
- "Automate the Complex."
- "Complex Data, Simple Decisions."
- "Computer Vision for Value."
- "Drive Business Value."

## Features

### ✅ Implemented Features:
- **Horizontal scrollable carousel** with auto-scroll when cursor leaves
- **Click and drag** to manually scroll
- **Campaign selector buttons** to switch between campaigns
- **Navigation arrows** for campaign switching
- **Responsive design** - works on mobile and desktop
- **Image optimization** with Next.js Image component
- **Fallback handling** - shows placeholder if image not found

### 🎨 Design:
- Modern, minimalist design matching your brand
- Gradient overlays for text readability
- Smooth animations and transitions
- Professional presentation

## Location on Website

The campaigns section is added to your homepage:
- **Position:** After "Our Projects" section, before "Services"
- **URL:** `https://www.tecxmate.com/#campaigns`

## How It Works

1. **Campaign Selection:** Users can click campaign buttons to switch between the 3 campaign sets
2. **Horizontal Scroll:** Each campaign's creatives scroll horizontally
3. **Auto-scroll:** Automatically scrolls when cursor is not hovering
4. **Manual Control:** Click and drag or use navigation arrows

## Customization

### Update Campaign Data:
Edit `lib/pomelli-data.ts` to:
- Add new campaigns
- Update creative titles
- Change image filenames
- Modify brand information

### Styling:
Edit `components/campaigns-section.tsx` to:
- Change colors
- Adjust spacing
- Modify animations
- Update layout

### Image Paths:
If you want to change where images are stored:
1. Update `components/campaigns-section.tsx` line with image path
2. Move images to new location in `public/` folder

## Testing

After adding images:

1. **Start dev server:**
   ```bash
   npm run dev
   ```

2. **Visit homepage:**
   ```
   http://localhost:3000
   ```

3. **Scroll to campaigns section** or visit `#campaigns`

4. **Test features:**
   - Click campaign buttons
   - Scroll horizontally
   - Move cursor away (auto-scroll should start)
   - Click and drag to scroll

## Troubleshooting

### Images Not Showing?
- Check filenames match exactly (case-sensitive)
- Verify images are in `public/campaigns/` folder
- Check browser console for 404 errors
- Ensure image format is supported (PNG, JPG, etc.)

### Auto-scroll Not Working?
- Make sure cursor is not hovering over the carousel
- Check browser console for JavaScript errors
- Verify the component is mounted correctly

### Styling Issues?
- Clear browser cache
- Check Tailwind classes are correct
- Verify CSS is being loaded

## Next Steps

1. ✅ **Download images** from Pomelli
2. ✅ **Add to `public/campaigns/`** folder
3. ✅ **Test on localhost**
4. ✅ **Deploy to production**

Once images are added, your marketing campaigns will be live on your website! 🎉

