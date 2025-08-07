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

1. Go to your repository Settings → Pages
2. Set Source to "GitHub Actions"
3. The deploy workflow will automatically run on pushes to master

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
- Verify Bun lockfile is committed (`bun.lockb`)

### Deployment Issues
- Verify GitHub Pages is enabled
- Check that the site URL in `astro.config.mjs` matches your deployment target
- Ensure the deploy workflow has proper permissions

### Security Alerts
- Review security audit outputs in the security workflow
- Update dependencies as recommended by Dependabot PRs
- Check dependency review comments on pull requests
