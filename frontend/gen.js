const fs = require('fs');
const items = JSON.parse(fs.readFileSync('extracted_partners.json', 'utf8'));
const phpItems = items.map((item, i) => {
  const name = item.name.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
  const logo = item.logo.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
  const link = item.link.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
  let cat = 'lgu';
  if (/DOST|Department of Science|Department of Agriculture|DA-|BFAR|DENR|PSA|PHILIPPINE STATISTICS|DAR|DTI|NCIP|DSWD/i.test(name)) {
    cat = 'gov';
  } else if (/University|College|School|Academy|Institute|UNIIC|OMSC|RSU|MAPUA|UST|UPD|SIU|VNUA|UM|TUCST/i.test(name)) {
    cat = 'academic';
  }
  return `            ['title' => '${name}', 'category' => '${cat}', 'description' => '${name} Partner', 'link' => '${link}', 'image' => '${logo}', 'sort_order' => ${i+1}]`;
});
fs.writeFileSync('php_ecosystem.txt', phpItems.join(',\n'));
console.log('Successfully generated PHP entries:', phpItems.length);
