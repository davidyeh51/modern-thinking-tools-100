const fs = require('fs');

function loadDict(filepath) {
    const dict = {};
    const lines = fs.readFileSync(filepath, 'utf8').split('\n');
    for (const line of lines) {
        if (!line.trim()) continue;
        const parts = line.split('\t');
        if (parts.length >= 2) {
            // OpenCC dict format: char/phrase [tab] char/phrase [space] other...
            const from = parts[0];
            const to = parts[1].split(' ')[0]; // just take the first option
            dict[from] = to;
        }
    }
    return dict;
}

const stChars = loadDict('STCharacters.txt');
const stPhrases = loadDict('STPhrases.txt');

// Sort phrases by length descending to replace longest first
const phrases = Object.keys(stPhrases).sort((a, b) => b.length - a.length);

function convertContent(content) {
    let result = content;
    // Replace phrases
    for (const phrase of phrases) {
        if (result.includes(phrase)) {
            result = result.split(phrase).join(stPhrases[phrase]);
        }
    }
    // Replace characters
    let finalResult = '';
    for (let i = 0; i < result.length; i++) {
        const char = result[i];
        if (stChars[char]) {
            finalResult += stChars[char];
        } else {
            finalResult += char;
        }
    }
    
    // Additional domain specific fixes (since OpenCC is a bit literal)
    // E.g. "模块" -> "模組", "网络" -> "網路"
    finalResult = finalResult.replace(/模塊/g, '模組');
    finalResult = finalResult.replace(/網絡/g, '網路');
    finalResult = finalResult.replace(/程式碼/g, '程式碼');
    finalResult = finalResult.replace(/信息/g, '資訊');

    return finalResult;
}

const files = ['app.js', 'data.js', 'index.html'];

for (const file of files) {
    try {
        const content = fs.readFileSync(file, 'utf8');
        const converted = convertContent(content);
        if (content !== converted) {
            fs.writeFileSync(file, converted, 'utf8');
            console.log('Converted:', file);
        } else {
            console.log('No conversion needed for:', file);
        }
    } catch (e) {
        console.error('Failed on', file, e);
    }
}
