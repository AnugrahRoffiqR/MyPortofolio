$lines = Get-Content 'C:\Tugas Portofolio\style.css'
$idxStart = -1
$idxEnd = -1
for ($i=0; $i -lt $lines.Count; $i++) {
    if ($lines[$i] -match 'SERVICES') {
        $idxStart = $i - 1
        break
    }
}
for ($i=$idxStart; $i -lt $lines.Count; $i++) {
    if ($lines[$i] -match 'PROJECT') {
        $idxEnd = $i - 1
        break
    }
}
Write-Host "Start=$idxStart End=$idxEnd"
if ($idxStart -ge 0 -and $idxEnd -gt $idxStart) {
    $newLines = $lines | Select-Object -Skip $idxStart -SkipLast ($lines.Count - $idxEnd - 1)
    $newLines | Set-Content 'C:\Tugas Portofolio\style.css'
    Write-Host "Removed lines $idxStart to $idxEnd"
} else {
    Write-Host "Not found"
}