const fs = require('fs');
const OpenCC = require('opencc-js');

// Init converter
const converter = OpenCC.Converter({ from: 'cn', to: 'tw' });

function convertFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf-8');
    const converted = converter(content);
    if (content !== converted) {
        fs.writeFileSync(filePath, converted, 'utf-8');
        console.log('Converted:', filePath);
    } else {
        console.log('No conversion needed for:', filePath);
    }
}

const files = ['data.js', 'app.js', 'index.html'];

for (const file of files) {
    try {
        convertFile(file);
    } catch(err) {
        console.error('Error converting', file, err);
    }
}
