const fs = require('fs');

try {
    let data = fs.readFileSync('test_output.json', 'utf8');
    // Supprimer le Byte Order Mark (BOM) si présent
    if (data.charCodeAt(0) === 0xFEFF) {
        data = data.slice(1);
    }
    let parsed;
    try {
        parsed = JSON.parse(data);
    } catch {
        let data16 = fs.readFileSync('test_output.json', 'utf16le');
        if (data16.charCodeAt(0) === 0xFEFF) data16 = data16.slice(1);
        parsed = JSON.parse(data16);
    }
    
        let output = "";
        parsed.testResults.forEach(tr => {
            tr.assertionResults.forEach(ar => {
                if (ar.status === 'failed') {
                    output += `\n❌ TEST FAILED: ${ar.title}\n`;
                    ar.failureMessages.forEach(msg => output += msg + '\n');
                }
            });
        });
        fs.writeFileSync('parsed_clean_errors.txt', output, 'utf8');
    } catch (e) {
        fs.writeFileSync('parsed_clean_errors.txt', "Error reading JSON: " + e.message, 'utf8');
    }
