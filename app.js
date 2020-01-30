//imports
const os = require('os');
const fs = require('fs');
const path = require('path');
const compute = require('./tools/compute');
const parser = require('./tools/parser');
const replace = require('./tools/replace');
const formatter = require('./tools/formatter');

//constants
const startFolder = os.homedir();// './';
const inPath = path.join(startFolder, 'data', 'in');
const outPath = path.join(startFolder, 'data', 'out');

//Lets begin
console.log('checking "in"/"out" folders')

//Verify the paths
if(!fs.existsSync(inPath)){
    fs.mkdirSync(inPath, {recursive: true});
}

if(!fs.existsSync(outPath)){
    fs.mkdirSync(outPath, {recursive: true});
}

function processFile(file){
    console.log('processing ' + file);

    //read file
    let fullPath = path.join(inPath, file);
    let content = fs.readFileSync(fullPath)+'';

    //clean up content
    content = replace(content, '\r', '');

    //process the file
    let data = parser(content);
    let result = compute(data);
    let resultFileContent = formatter(result);

    //save result into a file
    let resultFullPath = path.join(outPath, file);
    fs.writeFileSync(resultFullPath, resultFileContent);
    console.log(file + ' processed');
}

//process all files in the folder
let files = fs.readdirSync(inPath);
if(files.length == 0){
    console.log('"in" path was empty');
} else {
    console.log('processing files in "in" path');
}

for(let i = 0; i < files.length; i ++){
    processFile(files[i]);
}

//then start watching the fodler
console.log('watching ' + inPath);
fs.watch(inPath, {recursive: false}, (e, file) => {
    console.log('detected a change in ' + file);

    //rename could be emited by deleted files as well
    if(e == 'rename' && !fs.existsSync(path.join(inPath, file))){
        console.log(file + ' was deleted, ignoring it...');
        return;
    }

    processFile(file);
})
