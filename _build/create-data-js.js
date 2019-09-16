var config = {
    json_path: "assets/all-countries-data.json",
    output_js_path: "assets/js/all-countries-data.js"
};

var fs = require('fs'),
    json_file_content = fs.readFileSync(config.json_path, 'utf-8');

var output_js_stream = fs.createWriteStream(config.output_js_path);
    output_js_stream.end(`$.extend(vfs.data, ${json_file_content});`);

console.log("\x1b[32m%s\x1b[0m", "data js has been generated");