$siteData = Get-Content "src/data/siteData.js" -Raw
$pattern = '\{ name: "(.*?)", logo: "(.*?)", link: "(.*?)" \}'
$matches = [regex]::Matches($siteData, $pattern)

$phpItems = @()
$order = 1
foreach ($m in $matches) {
    $name = $m.Groups[1].Value.Replace("'", "\'")
    $logo = $m.Groups[2].Value
    $link = $m.Groups[3].Value
    
    $cat = "lgu"
    if ($name -match "DOST|Department of Science|Department of Agriculture|DA-|BFAR|DENR|PSA|PHILIPPINE STATISTICS|DAR|DTI|NCIP|DSWD") {
        $cat = "gov"
    } elseif ($name -match "University|College|School|Academy|Institute|UNIIC|OMSC|RSU|MAPUA|UST|UPD|SIU|VNUA|UM|TUCST") {
        $cat = "academic"
    }

    $phpItems += "            ['title' => '$name', 'category' => '$cat', 'description' => '$name Partner', 'link' => '$link', 'image' => '$logo', 'sort_order' => $order]"
    $order++
}

$joined = $phpItems -join ",`n"
Set-Content -Path "extracted_ecosystem.php" -Value $joined
Write-Host "Extracted $($matches.Count) ecosystem partners."
