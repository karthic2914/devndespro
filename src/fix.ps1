$files = Get-ChildItem ".\public\seo" -Filter "*.html" -Recurse

foreach ($file in $files) {
  $p = $file.FullName
  $c = Get-Content $p -Raw

  $u = $c -replace 'background:\s*rgba\(30,\s*28,\s*40,\s*0\.95\);', 'background:#000;'

  $u = $u -replace [char]194, ''
  $u = $u -replace [char]226, ''
  $u = $u -replace [char]8364, ''
  $u = $u -replace [char]8482, "'"
  $u = $u -replace [char]339, '"'
  $u = $u -replace [char]157, '"'

  if ($u -ne $c) {
    Set-Content -Path $p -Value $u -Encoding UTF8
    Write-Host "Fixed $p"
  }
}