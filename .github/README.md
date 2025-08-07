# GitHub Actions Workflows

This directory contains GitHub Actions workflows for automated CI/CD, code quality checks, and security scanning.

## Workflows

### 🚀 CI Workflow (`ci.yml`)
- **Triggers**: Push to master/main, Pull requests
- **Purpose**: Build and test the Astro project
- **Steps**:
  - Install dependencies with Bun
  - Build the project
  - Upload build artifacts

### 🌐 Deploy Workflow (`deploy.yml`)
- **Triggers**: Push to master, Manual dispatch
- **Purpose**: Deploy to GitHub Pages
- **Requirements**: GitHub Pages must be enabled in repository settings
- **Steps**:
  - Build the Astro site
  - Deploy to GitHub Pages using official actions

### 🎨 Code Quality Workflow (`quality.yml`)
- **Triggers**: Push to master/main, Pull requests
- **Purpose**: Check code quality and formatting
- **Steps**:
  - TypeScript type checking with Astro
  - Prettier formatting check
  - Build verification

### 🔒 Security Workflow (`security.yml`)
- **Triggers**: Push to master/main, Pull requests, Weekly schedule
- **Purpose**: Security audit and dependency review
- **Steps**:
  - Bun security audit
  - Dependency review for PRs

## Dependabot Configuration

The `dependabot.yml` file configures automatic dependency updates:
- **npm dependencies**: Weekly updates on Mondays
- **GitHub Actions**: Weekly updates on Mondays
- **Settings**: Auto-assign to repository owner

## Setup Instructions

### For GitHub Pages Deployment

**⚠️ IMPORTANT: Enable GitHub Pages first!**

1. **Go to your repository Settings → Pages**
2. **Set Source to "GitHub Actions"**
3. **The deploy workflow will automatically run on pushes to master**

If you skip step 2, the deployment will fail with "Get Pages site failed" error.

### Alternative: Manual Deployment

If you don't want to use GitHub Pages, the `build.yml` workflow will:
- Build your site on every push
- Upload build artifacts for manual download
- Allow you to deploy the `dist/` folder to any hosting service

### For Custom Domain

If using a custom domain, update the `site` property in `astro.config.mjs`:

```javascript
export default defineConfig({
  site: 'https://yourdomain.com',
  // ...
});
```

### Branch Protection

Consider setting up branch protection rules for the master branch:
1. Go to Settings → Branches
2. Add rule for master branch
3. Enable "Require status checks to pass before merging"
4. Select the CI and quality check workflows

## Workflow Status

You can monitor workflow status in the Actions tab of your repository. Each workflow provides detailed logs and artifact downloads when applicable.

## Troubleshooting

### Build Failures
- Check the CI workflow logs for specific error messages
- Ensure all dependencies are properly listed in `package.json`
- Verify npm lockfile is committed (`package-lock.json`)

### Deployment Issues

#### "Get Pages site failed" Error
- **Cause**: GitHub Pages is not enabled in repository settings
- **Solution**: Go to Settings → Pages → Set Source to "GitHub Actions"
- **Alternative**: Use the `build.yml` workflow for manual deployment

#### Build Success but Deployment Fails
- Verify GitHub Pages is enabled
- Check that the site URL in `astro.config.mjs` matches your deployment target
- Ensure the deploy workflow has proper permissions (should be automatic)

#### Custom Domain Issues
- Update `astro.config.mjs` with your domain
- Add CNAME file in `public/` directory if needed
- Verify DNS settings point to GitHub Pages

### Security Alerts
- Review security audit outputs in the security workflow
- Update dependencies as recommended by Dependabot PRs
- Check dependency review comments on pull requests

### Getting Help
- Check workflow logs in the Actions tab
- Review the error messages in build artifacts
- Ensure all required files are committed to the repository
