$source = ".\public\seo"
$dest = ".\public\no\seo"

# Ensure destination exists
New-Item -ItemType Directory -Force -Path $dest | Out-Null

$files = Get-ChildItem $source -Filter *.html

foreach ($file in $files) {

    $content = Get-Content $file.FullName -Raw

    # 🔁 Basic translations (you can expand later)
    $content = $content.Replace("Web Design", "Nettsidedesign")
    $content = $content.Replace("Web Development", "Nettutvikling")
    $content = $content.Replace("Full Stack", "Fullstack")
    $content = $content.Replace("Get Free Quote", "Få et gratis tilbud")
    $content = $content.Replace("Contact", "Kontakt")
    $content = $content.Replace("Services", "Tjenester")
    $content = $content.Replace("Work", "Arbeid")
    $content = $content.Replace("Skills", "Ferdigheter")
    $content = $content.Replace("Blog", "Blogg")

    # Replace heading phrases
    $content = $content.Replace("We Design", "Vi designer")
    $content = $content.Replace("We Build", "Vi bygger")
    $content = $content.Replace("We Grow", "Vi vokser")

    # Replace CTA lines
    $content = $content.Replace("Start your project", "Start prosjektet ditt")
    $content = $content.Replace("Request a quote", "Be om tilbud")

    # Fix HTML lang
    $content = $content -replace '<html lang="en">', '<html lang="no">'

    # Add hreflang (basic)
    $url = $file.Name
    $content = $content -replace '</head>', "<link rel=`"alternate`" hreflang=`"no`" href=`"https://devndespro.com/no/$url`" />`n</head>"

    # Save to new folder
    $newPath = Join-Path $dest $file.Name
    Set-Content -Path $newPath -Value $content -Encoding UTF8

    Write-Host "Created NO version: $($file.Name)"
}