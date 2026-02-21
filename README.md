# Reaching Higher: The Covenant Path

Reaching Higher as we follow Christ on the Covenant Path

---

## How to Build & Deploy Your Own Website (No Coding Experience Needed)

### What You'll Need
- A computer with internet access
- A free GitHub account
- A free Vercel account
- Access to an AI assistant (like Claude or ChatGPT)

---

### Step 1: Create a GitHub Account
1. Go to [github.com](https://github.com)
2. Click **Sign up**
3. Enter your email, create a password, and choose a username
4. Follow the prompts to finish creating your account

### Step 2: Create a New Repository
1. Once logged in, click the **+** button in the top-right corner and select **New repository**
2. Give it a name (e.g., `my-website`)
3. Check the box that says **Add a README file**
4. Click **Create repository**

### Step 3: Open Your Repository in GitHub Codespaces
1. On your new repository page, click the green **Code** button
2. Click the **Codespaces** tab
3. Click **Create codespace on main**
4. Wait for it to load — this opens a code editor right in your browser (no install needed!)

### Step 4: Set Up a Next.js Project Using AI
1. In the Codespace, open the **Terminal** (it should be at the bottom of the screen; if not, click **Terminal > New Terminal** in the top menu)
2. Type this command and press Enter:
   ```
   npx create-next-app@latest . --yes
   ```
3. Wait for it to finish installing (this may take a minute or two)
4. To see your site locally, type:
   ```
   npm run dev
   ```
5. A popup will appear with a link — click it to preview your site!

### Step 5: Ask AI to Help You Build Your Site
1. Open an AI assistant (like [claude.ai](https://claude.ai) or [chatgpt.com](https://chatgpt.com))
2. Tell it what you want! For example:
   - *"I have a blank Next.js project. Help me create a simple event page with a hero image, event details, and a footer."*
   - *"Make the background light gray with dark text and teal accent colors."*
   - *"Add a section with cards that show booth names and descriptions."*
3. The AI will give you code — copy it and paste it into the files in your Codespace
4. The main files you'll edit are:
   - `src/app/page.tsx` — your page content
   - `src/app/globals.css` — your styling
   - `src/app/layout.tsx` — page title and fonts

### Step 6: Save Your Changes to GitHub
1. In the Codespace, click the **Source Control** icon on the left sidebar (it looks like a branch)
2. You'll see a list of changed files
3. Type a short message describing what you did (e.g., "Added event page")
4. Click the **Commit** button (checkmark icon)
5. Click **Sync Changes** to push your code to GitHub

### Step 7: Deploy to the Internet with Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click **Sign Up** and choose **Continue with GitHub**
3. Authorize Vercel to access your GitHub account
4. Click **Add New Project**
5. Find your repository in the list and click **Import**
6. Leave all settings as default and click **Deploy**
7. Wait about 1-2 minutes — Vercel will build and publish your site
8. You'll get a live URL like `my-website.vercel.app` — that's your website!

### Step 8: Make Updates Anytime
1. Open your Codespace from GitHub (or go to [github.dev](https://github.dev) and open your repo)
2. Make changes to your files (ask AI for help!)
3. Commit and sync your changes (Step 6)
4. Vercel will automatically redeploy your site within a minute — no extra steps needed

---

### Tips
- **Images**: Put images in the `public/images/` folder, then reference them as `/images/your-image.jpg`
- **PDFs**: Put PDFs in `public/pdfs/` and link to them as `/pdfs/your-file.pdf`
- **Custom domain**: In Vercel, go to your project settings > Domains to add your own domain name
- **Ask AI anything**: If you get stuck, paste the error message into your AI assistant and ask for help
