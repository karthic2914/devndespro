$files = Get-ChildItem ".\public\seo", ".\public\no\seo" -Filter "*.html" -Recurse

$css = @'
.lang-toggle{
  display:inline-flex;
  align-items:center;
  border:1px solid rgba(255,255,255,.18);
  border-radius:999px;
  overflow:hidden;
  margin-right:1rem;
  background:rgba(255,255,255,.04);
}
.lang-toggle a{
  color:rgba(244,240,232,.7);
  text-decoration:none;
  padding:.32rem .75rem;
  font-size:.78rem;
  font-weight:700;
  letter-spacing:.08em;
}
.lang-toggle a.active{
  background:#FF6B2B;
  color:#fff;
}
'@

foreach ($file in $files) {
  $content = Get-Content $file.FullName -Raw

  if ($content -notmatch '\.lang-toggle') {
    $content = $content -replace '</style>', "$css`n</style>"
    Set-Content -Path $file.FullName -Value $content -Encoding UTF8
    Write-Host "Added style: $($file.Name)"
  }
}