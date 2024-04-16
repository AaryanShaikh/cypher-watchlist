const fs = require('fs');

function readJsonFile(filePath) {
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error(`Error reading file from disk: ${error}`);
    }
}

function findDuplicateTitles(data) {
    const titles = {};
    const duplicates = [];
    const titlesToIgnore = ["Ted", "Mr. & Mrs. Smith", "Inazuma Eleven", "Attack on Titan"]

    data.forEach(item => {
        if (titlesToIgnore.includes(item.title)) {
            return; 
        }
        if (titles[item.title]) {
            if (!duplicates.includes(item.title)) {
                duplicates.push(item.title);
            }
        } else {
            titles[item.title] = true;
        }
    });

    return duplicates;
}

function main() {
    const jsonFilePath = './data/rawData.json'; // Replace with your JSON file path

    const data = readJsonFile(jsonFilePath);
    const repeatedFields = findDuplicateTitles(data);

    if (repeatedFields.length > 0) {
        console.log(`The following ${repeatedFields.length} fields are repeated:\n ${repeatedFields}`);
    } else {
        console.log(`No repeated fields found in ${data.length.toLocaleString()} records`);
    }
}

main();