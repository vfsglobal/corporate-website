var { get_file_extension } = require("./utils"),
  fs = require("fs"),
  config = {
    base_url: "https://www.vfsglobal.com/en/",
    loop_directories: {
      individuals: {},
      governments: {},
      general: {
        excludes: ["footprint-map.html"]
      }
    },
    xml_prefix: `<?xml version='1.0' encoding='UTF-8'?>

<urlset xmlns='http://www.sitemaps.org/schemas/sitemap/0.9'>`,
    xml_suffix: `</urlset>`,
    url_prefix: `<url><loc>`,
    url_suffix: `</loc></url>`
  };

module.exports = function create_sitemap() {
  var {
    base_url,
    loop_directories,
    xml_prefix,
    xml_suffix,
    url_prefix,
    url_suffix
  } = config;

  for (var folder in loop_directories) {
    let excludes = loop_directories[folder].excludes;

    var files = fs.readdirSync(folder),
      sitemap_code = xml_prefix;

    files.forEach(file_name => {
      if (
        get_file_extension(file_name).toLowerCase() == "html" &&
        (!excludes || excludes.indexOf(file_name.toLowerCase()) == -1)
      )
        sitemap_code += `\n${url_prefix}${base_url}${folder}/${file_name}${url_suffix}`;
    });

    sitemap_code += `\n${xml_suffix}`;

    var sitemap_stream = fs.createWriteStream(`${folder}/sitemap.xml`);
      sitemap_stream.end(sitemap_code);
  }

  console.log("\x1b[32m%s\x1b[0m", "sitemap.xml has been generated");
};
///
if (require.main === module) module.exports();