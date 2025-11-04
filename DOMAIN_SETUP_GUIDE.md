# Domain Setup Guide for Tecxmate.com

## Understanding the Error

**Error:** `DNS_PROBE_FINISHED_NXDOMAIN`

This means:
- The domain `www.tecxmate.com` doesn't have DNS records configured
- The browser can't find where your website is hosted
- DNS records need to point to Vercel's servers

## Step-by-Step Solution

### Step 1: Deploy Your Site to Vercel First

Before setting up the domain, make sure your site is deployed:

1. **Push your code to GitHub** (if not already):
   ```bash
   git add .
   git commit -m "Prepare for deployment"
   git push origin main
   ```

2. **Connect to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Deploy the project

3. **Get your Vercel deployment URL:**
   - After deployment, you'll get a URL like: `tecxmate-xxxxx.vercel.app`
   - This is your temporary URL until you add your domain

### Step 2: Add Domain to Vercel

1. **In Vercel Dashboard:**
   - Go to your project
   - Navigate to **Settings** → **Domains**
   - Click **Add Domain**

2. **Add your domains:**
   - `tecxmate.com` (root domain)
   - `www.tecxmate.com` (www subdomain)

3. **Vercel will show you DNS records to add**

### Step 3: Configure DNS Records

You need to add DNS records at your domain registrar. Here's what Vercel will tell you:

#### Option A: Use Vercel's Nameservers (Recommended)

**Easiest method - Vercel manages everything:**

1. **In Vercel Domains page**, you'll see nameservers like:
   ```
   ns1.vercel-dns.com
   ns2.vercel-dns.com
   ```

2. **Go to your domain registrar** (GoDaddy, Namecheap, Cloudflare, etc.)

3. **Change nameservers:**
   - Find "Nameservers" or "DNS" section
   - Replace existing nameservers with Vercel's nameservers
   - Save changes

4. **Wait 24-48 hours** for propagation (usually faster)

#### Option B: Add DNS Records Manually

If you want to keep your current nameservers:

**Add these records at your DNS provider:**

1. **A Record** (for root domain):
   ```
   Type: A
   Name: @ (or tecxmate.com)
   Value: 76.76.21.21 (Vercel's IP - check current one in Vercel dashboard)
   TTL: 3600
   ```

2. **CNAME Record** (for www subdomain):
   ```
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com (or what Vercel shows)
   TTL: 3600
   ```

3. **TXT Record** (for verification):
   ```
   Type: TXT
   Name: _vercel
   Value: vc-domain-verify=tecxmate.com,xxxxxxxxxxxxx
   TTL: 3600
   ```

### Step 4: Verify Domain Ownership (if needed)

If Vercel shows the verification message:

1. **Add TXT record** (as shown in Step 3, Option B)
2. **Wait for DNS propagation** (5-30 minutes usually)
3. **Click "Verify" in Vercel dashboard**
4. **Remove the TXT record** after verification (optional)

### Step 5: Wait for DNS Propagation

- **Usually takes:** 5-30 minutes
- **Maximum:** 24-48 hours
- **Check status:** https://dnschecker.org
  - Search for `tecxmate.com` and `www.tecxmate.com`
  - Check A and CNAME records

## Common DNS Providers

### GoDaddy
1. Go to **My Products** → **DNS** → **Manage DNS**
2. Add/Edit records as shown above
3. Save changes

### Namecheap
1. Go to **Domain List** → **Manage** → **Advanced DNS**
2. Add/Edit records as shown above
3. Save changes

### Cloudflare
1. Go to your domain → **DNS** → **Records**
2. Add/Edit records as shown above
3. Save changes
4. **Note:** Make sure proxy is OFF (grey cloud) for A records

### Google Domains
1. Go to **DNS** → **Custom records**
2. Add/Edit records as shown above
3. Save changes

## Verify Your Setup

### Check DNS Records:
```bash
# Check A record
nslookup tecxmate.com

# Check CNAME record
nslookup www.tecxmate.com

# Check TXT record
nslookup -type=TXT _vercel.tecxmate.com
```

### Online Tools:
- https://dnschecker.org
- https://www.whatsmydns.net
- https://mxtoolbox.com/DNSLookup.aspx

## Troubleshooting

### Still getting DNS_PROBE_FINISHED_NXDOMAIN?

1. **Check DNS propagation:**
   - Use dnschecker.org to see if records are live globally
   - Wait if records aren't propagated yet

2. **Verify records are correct:**
   - Double-check the values Vercel gave you
   - Make sure no typos in DNS records

3. **Clear browser cache:**
   - Try incognito/private mode
   - Clear DNS cache: `ipconfig /flushdns` (Windows) or `sudo dscacheutil -flushcache` (Mac)

4. **Check Vercel deployment:**
   - Make sure site is deployed and running
   - Check Vercel dashboard for any errors

5. **Check domain registrar:**
   - Make sure domain is active and not expired
   - Verify domain is unlocked

### Domain Not Working After 24 Hours?

1. **Contact your domain registrar** - they can help troubleshoot
2. **Check Vercel status** - make sure domain is properly added
3. **Try different DNS provider** - sometimes switching to Cloudflare helps

## Quick Checklist

- [ ] Site deployed to Vercel
- [ ] Domain added in Vercel dashboard
- [ ] DNS records added at registrar
- [ ] TXT record added for verification (if needed)
- [ ] Waited for DNS propagation
- [ ] Verified DNS records are live
- [ ] Domain verified in Vercel
- [ ] Site accessible at tecxmate.com

## Expected Timeline

1. **Deploy to Vercel:** 2-5 minutes
2. **Add DNS records:** 5 minutes
3. **DNS propagation:** 5-30 minutes (usually)
4. **Domain verification:** 1-5 minutes after DNS propagates
5. **Total:** Usually 15-45 minutes, max 48 hours

## Need Help?

If you're stuck:
1. Check Vercel's domain documentation: https://vercel.com/docs/concepts/projects/domains
2. Contact your domain registrar support
3. Check Vercel dashboard for specific error messages

---

**Note:** Make sure your domain is registered and active. If you just purchased it, wait 24-48 hours for it to fully activate before setting up DNS.

