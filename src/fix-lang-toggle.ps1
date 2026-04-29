$files = Get-ChildItem ".\public\no\seo" -Filter "*.html" -Recurse
$count = 0

foreach ($file in $files) {
    $name = $file.Name
    $enPath = "/seo/$name"
    $noPath = "/no/seo/$name"

    $content = Get-Content $file.FullName -Raw

    $toggle = '<div class="lang-toggle" style="margin-right:15px;"><a href="' + $enPath + '">EN</a> | <a href="' + $noPath + '" class="active">NO</a></div>'

    if ($content -match 'lang-toggle') {
        $content = [regex]::Replace($content, '<div class="lang-toggle".*?</div>', $toggle, 1)
    }
    else {
        $content = [regex]::Replace($content, '(<a[^>]*>BACK TO HOME</a>)', ($toggle + '$1'), 1)
    }

    Set-Content -Path $file.FullName -Value $content -Encoding UTF8
    $count++
}

Write-Host "DONE. Toggle inserted/fixed in $count NO files."