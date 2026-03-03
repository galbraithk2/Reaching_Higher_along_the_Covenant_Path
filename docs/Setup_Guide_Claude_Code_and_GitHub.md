# Setup Guide: Claude Code + GitHub + Next.js (GitHub Pages)

A beginner-friendly, step-by-step guide to get your Next.js website running on GitHub Pages with Claude Code as your AI assistant.

---

## What You'll End Up With

- A GitHub repository with your website code
- Claude Code connected to that repo so it can help you build and edit your site
- Automatic deployment to GitHub Pages (your site goes live every time you push to `main`)
- A `CLAUDE.md` file that teaches Claude about your project so it gives better help

---

## Prerequisites (What You Need Before Starting)

- A computer with internet access
- A web browser (Chrome recommended)
- Your Next.js project code (or we'll create a fresh one)
- About 30-60 minutes

---

## PART 1: Set Up Your Accounts

### Step 1: Create a GitHub Account (skip if you already have one)

1. Go to [https://github.com](https://github.com)
2. Click **"Sign up"** in the top right
3. Enter your email, create a password, and choose a username
4. Follow the prompts to verify your email
5. You now have a GitHub account!

### Step 2: Create a Claude Account (skip if you already have one)

1. Go to [https://claude.ai](https://claude.ai)
2. Click **"Sign up"**
3. Create your account with email or Google sign-in
4. You'll need a **Claude Pro** or **Claude Max** subscription to use Claude Code

---

## PART 2: Create Your GitHub Repository

### Step 3: Create a New Repository on GitHub

1. Log into [github.com](https://github.com)
2. Click the **"+"** button in the top-right corner
3. Select **"New repository"**
4. Fill in:
   - **Repository name**: Choose a name for your project (e.g., `My_Project_Name`)
     - **Important**: This name becomes part of your website URL, so pick something meaningful
     - Example: if your repo is named `My_Project_Name`, your site will be at `https://yourusername.github.io/My_Project_Name`
   - **Description**: (Optional) A short description of your project
   - **Public**: Select **Public** (required for free GitHub Pages)
   - **Add a README**: Check this box
5. Click **"Create repository"**
6. **Copy your repository URL** — you'll need it later. It looks like: `https://github.com/yourusername/My_Project_Name`

---

## PART 3: Set Up Your Local Environment

### Step 4: Install Node.js (skip if already installed)

1. Go to [https://nodejs.org](https://nodejs.org)
2. Download the **LTS** version (the one on the left)
3. Run the installer — accept all defaults
4. To verify it worked, open a terminal/command prompt and type:
   ```
   node --version
   ```
   You should see something like `v20.x.x`
5. Also check npm:
   ```
   npm --version
   ```
   You should see a version number

### Step 5: Install Git (skip if already installed)

1. Go to [https://git-scm.com/downloads](https://git-scm.com/downloads)
2. Download and install for your operating system
3. Verify in terminal:
   ```
   git --version
   ```
4. Set up your identity (use the same email as your GitHub account):
   ```
   git config --global user.name "Your Name"
   git config --global user.email "your.email@example.com"
   ```

### Step 6: Clone Your Repository

1. Open your terminal/command prompt
2. Navigate to where you want your project folder (e.g., your Desktop):
   ```
   cd ~/Desktop
   ```
3. Clone your repo (replace with YOUR repo URL):
   ```
   git clone https://github.com/yourusername/My_Project_Name.git
   ```
4. Go into the project folder:
   ```
   cd My_Project_Name
   ```

---

## PART 4: Create Your Next.js Project

### Step 7: Initialize a Next.js Project

If you already have Next.js code, skip to Step 8.

1. From inside your project folder, run:
   ```
   npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir
   ```
   - The `.` means "create it in the current folder"
   - When prompted, accept the defaults or choose your preferences
2. Test that it works:
   ```
   npm run dev
   ```
3. Open your browser to `http://localhost:3000` — you should see the Next.js starter page
4. Press `Ctrl+C` in the terminal to stop the dev server

### Step 8: Configure for GitHub Pages

You need to make three changes so your site works on GitHub Pages.

#### 8a: Update `next.config.ts`

Open the file `next.config.ts` in the root of your project and replace its contents with this (change `My_Project_Name` to YOUR repository name):

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/My_Project_Name",
  images: { unoptimized: true },
};

export default nextConfig;
```

**What this does:**
- `output: "export"` — tells Next.js to create static HTML files (required for GitHub Pages)
- `basePath` — tells Next.js your site lives in a subfolder (because GitHub Pages serves it at `yourusername.github.io/My_Project_Name`)
- `images: { unoptimized: true }` — required because GitHub Pages can't do server-side image optimization

#### 8b: Create a Base Path Helper

Create the file `src/lib/basePath.ts`:

```typescript
export const BASE_PATH = "/My_Project_Name";
```

**What this does:** Gives you a constant to use when referencing images and other assets in your code. Use it like this:

```tsx
<img src={`${BASE_PATH}/images/my-photo.jpg`} alt="My photo" />
```

#### 8c: Create the GitHub Actions Deploy Workflow

1. Create the folders:
   ```
   mkdir -p .github/workflows
   ```
2. Create the file `.github/workflows/deploy.yml` with this content:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: out

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

**What this does:** Every time you push code to the `main` branch, GitHub will automatically build your site and publish it to GitHub Pages.

### Step 9: Test Your Build

Run:
```
npm run build
```

You should see it complete without errors and create an `out/` folder.

---

## PART 5: Enable GitHub Pages

### Step 10: Push Your Code to GitHub

```
git add .
git commit -m "Initial Next.js setup with GitHub Pages config"
git push origin main
```

### Step 11: Enable GitHub Pages in Repository Settings

1. Go to your repository on GitHub (e.g., `https://github.com/yourusername/My_Project_Name`)
2. Click **"Settings"** (tab at the top)
3. In the left sidebar, click **"Pages"**
4. Under **"Build and deployment"**:
   - **Source**: Select **"GitHub Actions"** (NOT "Deploy from a branch")
5. That's it! GitHub will use the workflow file you created

### Step 12: Verify Your Site is Live

1. Go to the **"Actions"** tab in your repository
2. You should see your workflow running (or completed)
3. Once it's done (green checkmark), your site is live at:
   ```
   https://yourusername.github.io/My_Project_Name
   ```
4. It may take 1-2 minutes after the workflow completes for the site to appear

---

## PART 6: Set Up Claude Code

### Step 13: Install Claude Code

#### Option A: Use Claude Code in the Browser (Easiest)

1. Go to [https://claude.ai](https://claude.ai) and log in
2. Click on **"Claude Code"** or go to the code interface
3. Connect your GitHub account when prompted
4. Select your repository

#### Option B: Install Claude Code CLI on Your Computer

1. Open your terminal and run:
   ```
   npm install -g @anthropic-ai/claude-code
   ```
2. Navigate to your project folder:
   ```
   cd ~/Desktop/My_Project_Name
   ```
3. Run Claude Code:
   ```
   claude
   ```
4. On first run, it will ask you to authenticate — follow the prompts to log in and connect to GitHub

### Step 14: Connect Claude Code to Your GitHub Repository

1. When Claude Code starts, it will detect your Git repository
2. If prompted to connect to GitHub, follow the authorization steps:
   - Click the link it provides
   - Authorize Claude Code to access your GitHub account
   - Select which repositories Claude can access (you can choose just your project)
3. Once connected, Claude Code can read your code, suggest changes, create commits, and push to GitHub

---

## PART 7: Create Your CLAUDE.md File (The Most Important Step!)

### Step 15: Create the CLAUDE.md File

The `CLAUDE.md` file is a special file that sits in the root of your project. It teaches Claude about your project so it gives you better, more relevant help. Think of it as an instruction manual for your AI assistant.

1. Create a file called `CLAUDE.md` in the root of your project folder (same level as `package.json`)
2. **Use the template provided in the second document** — customize it for YOUR project
3. The key sections to fill in:
   - **Project name and description** — what is your site about?
   - **Tech stack** — what technologies you're using
   - **Repo structure** — what files/folders your project has
   - **Base path** — your repository name (for GitHub Pages URLs)
   - **Must-not-break features** — things Claude should never accidentally break
   - **Quality requirements** — your standards for the site

### Step 16: Push the CLAUDE.md File

```
git add CLAUDE.md
git commit -m "Add CLAUDE.md project instructions for Claude Code"
git push origin main
```

---

## PART 8: Start Using Claude Code!

### Step 17: Your First Conversation

Now you can start asking Claude Code to help you! Here are some example prompts:

- **"Show me the current structure of my project"**
- **"Add a new section to the home page with a welcome message"**
- **"Change the background color of the header to blue"**
- **"Add a new page called About"**
- **"Make the site look better on mobile phones"**
- **"Fix any build errors"**

### Tips for Working with Claude Code

1. **Be specific**: Instead of "make it look better," say "increase the font size of the heading to 2rem and add 20px padding"
2. **One thing at a time**: Ask for one change, verify it works, then ask for the next
3. **Test after changes**: After Claude makes changes, run `npm run build` to make sure nothing broke
4. **Push regularly**: After changes you like, push to GitHub so they go live:
   ```
   git add .
   git commit -m "Description of what changed"
   git push origin main
   ```

---

## Quick Reference / Cheat Sheet

| Task | Command |
|------|---------|
| Start dev server (local preview) | `npm run dev` |
| Build the site | `npm run build` |
| Check for errors | `npm run lint` |
| See what files changed | `git status` |
| Save your changes | `git add .` then `git commit -m "message"` |
| Push to GitHub (makes site live) | `git push origin main` |
| Start Claude Code | `claude` |

---

## Troubleshooting

### "npm run build" fails
- Read the error message carefully — it usually tells you which file and line has the problem
- Ask Claude Code: "npm run build is failing with this error: [paste error]. Please fix it."

### Site shows 404 after deploying
- Make sure GitHub Pages source is set to **"GitHub Actions"** (not "Deploy from a branch")
- Check the Actions tab — is the workflow failing? Click on it to see error details
- Make sure your `basePath` in `next.config.ts` matches your repository name exactly

### Images not showing up
- Make sure images are in the `public/images/` folder
- Make sure you're using `BASE_PATH` in your image paths:
  ```tsx
  <img src={`${BASE_PATH}/images/photo.jpg`} alt="description" />
  ```

### Claude Code isn't seeing my latest changes
- Make sure you've saved all files
- If using the browser version, refresh the page
- If using CLI, try closing and reopening Claude Code

---

## Summary of Key Files

| File | Purpose |
|------|---------|
| `CLAUDE.md` | Instructions for Claude Code (your AI assistant) |
| `next.config.ts` | Next.js configuration (static export, base path) |
| `src/lib/basePath.ts` | Base path constant for asset URLs |
| `.github/workflows/deploy.yml` | Auto-deploy to GitHub Pages on push |
| `src/app/page.tsx` | Your main home page |
| `src/app/layout.tsx` | Root layout (wraps all pages) |
| `src/app/globals.css` | All your styles |
| `package.json` | Project dependencies and scripts |

---

*This guide was created to help you set up your own Claude Code + GitHub Pages project based on a working setup. If you get stuck, just ask Claude Code for help!*
