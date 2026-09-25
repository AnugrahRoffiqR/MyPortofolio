# Skrip untuk mencari bagian SERVICES di style.css

# baca semua baris file CSS
$lines = Get-Content 'C:\Tugas Portofolio\style.css'
# indeks awal dan akhir (-1 berarti belum ditemukan)
$idxStart = -1
$idxEnd = -1
# cari baris yang mengandung kata SERVICES sebagai titik awal
for ($i=0; $i -lt $lines.Count; $i++) {
    if ($lines[$i] -match 'SERVICES') {
        $idxStart = $i - 1
        break
    }
}
# cari baris PROJECT setelah SERVICES sebagai titik akhir
for ($i=$idxStart; $i -lt $lines.Count; $i++) {
    if ($lines[$i] -match 'PROJECT') {
        $idxEnd = $i - 1
        break
    }
}
# tampilkan hasil pencarian
Write-Host "Start=$idxStart End=$idxEnd"
# jika kedua posisi ditemukan, tulis ulang file dengan baris dari rentang tersebut
if ($idxStart -ge 0 -and $idxEnd -gt $idxStart) {
    $newLines = $lines | Select-Object -Skip $idxStart -SkipLast ($lines.Count - $idxEnd - 1)
    $newLines | Set-Content 'C:\Tugas Portofolio\style.css'
    Write-Host "Removed lines $idxStart to $idxEnd"
} else {
    # bagian SERVICES tidak ditemukan
    Write-Host "Not found"
}
