$enFiles = Get-ChildItem ".\public\seo" -Filter "*.html" -Recurse
$count = 0

foreach ($file in $enFiles) {
    $name = $file.Name
    $enPath = "/seo/$name"
    $noPath = "/no/seo/$name"

    $content = Get-Content $file.FullName -Raw

    $toggle = '<div class="lang-toggle"><a href="' + $enPath + '" class="active">EN</a><a href="' + $noPath + '">NO</a></div>'

    $content = $content -replace '<div class="lang-toggle">.*?</div>', $toggle

    Set-Content -Path $file.FullName -Value $content -Encoding UTF8
    $count++
}

$noFiles = Get-ChildItem ".\public\no\seo" -Filter "*.html" -Recurse

foreach ($file in $noFiles) {
    $name = $file.Name
    $enPath = "/seo/$name"
    $noPath = "/no/seo/$name"

    $content = Get-Content $file.FullName -Raw

    $toggle = '<div class="lang-toggle"><a href="' + $enPath + '">EN</a><a href="' + $noPath + '" class="active">NO</a></div>'

    $content = $content -replace '<div class="lang-toggle">.*?</div>', $toggle

    Set-Content -Path $file.FullName -Value $content -Encoding UTF8
    $count++
}

Write-Host "DONE. Language toggle fixed in $count files."