const fs = require('fs');
const seederPath = '../backend/database/seeders/DatabaseSeeder.php';
let seederContent = fs.readFileSync(seederPath, 'utf8');
const phpEntries = fs.readFileSync('php_ecosystem.txt', 'utf8');

const regex = /(\$ecosystem = \[)[\s\S]*?(\];\s*foreach \(\$ecosystem)/;
seederContent = seederContent.replace(regex, `$1\n${phpEntries}\n        $2`);
fs.writeFileSync(seederPath, seederContent);
console.log('DatabaseSeeder.php updated with all ecosystem items!');
