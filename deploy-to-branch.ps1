# PowerShell script to update deploy branch with only built files
# Usage: .\deploy-to-branch.ps1

Write-Host "🚀 Updating deploy branch with built files..." -ForegroundColor Cyan

# Build the project
Write-Host "📦 Building project..." -ForegroundColor Yellow
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Build failed!" -ForegroundColor Red
    exit 1
}

# Switch to deploy branch
Write-Host "🔄 Switching to deploy branch..." -ForegroundColor Yellow
git checkout deploy

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to switch to deploy branch!" -ForegroundColor Red
    exit 1
}

# Remove all files except dist
Write-Host "🧹 Cleaning deploy branch..." -ForegroundColor Yellow
Get-ChildItem -Path . -Exclude dist,.git | Remove-Item -Recurse -Force

# Copy files from dist to root
Write-Host "📋 Copying built files to root..." -ForegroundColor Yellow
Copy-Item -Path dist/* -Destination . -Recurse -Force

# Remove dist folder
Remove-Item -Path dist -Recurse -Force

# Add all files
Write-Host "➕ Staging files..." -ForegroundColor Yellow
git add .

# Commit
Write-Host "💾 Committing changes..." -ForegroundColor Yellow
git commit -m "Update deployment: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"

# Push
Write-Host "📤 Pushing to remote..." -ForegroundColor Yellow
git push

# Switch back to main
Write-Host "🔄 Switching back to main branch..." -ForegroundColor Yellow
git checkout main

Write-Host "✅ Deployment complete!" -ForegroundColor Green

