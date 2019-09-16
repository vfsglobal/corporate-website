const { Builder } = require("selenium-webdriver"),
  pretty = require("pretty"),
  { async_for_each } = require("./utils"),
  fs = require("fs"),
  progress = require("cli-progress"),
  config = {
    folder: "individuals",
    file_match_pattern: /^article-/i,
    server_url: "http://127.0.0.1:8887",
    invalid_title: "127.0.0.1",
    jquery_script_path: 'assets/js/vendor/common/jquery-3.2.1.min.js',
    write_prefix: "<!doctype html>",
    scripts: {
      get_all_article_data: function (callback) {
        var blog_menu_index = 3
          blog_nav_data = window.vue_app.all_navigation.main_sub_nav.nav_data[blog_menu_index].sub_nav.nav_data.inner_sub_nav.nav_data,
          all_article_data = {};

        blog_nav_data.forEach(article_group => {
          article_group.hidden_child_nav.nav_data.forEach(article_data => {
            var { href, image_name } = article_data;
            all_article_data[href.substring(href.lastIndexOf('/') + 1)] = {
              ...article_data,
              image_path: image_name ? `assets/images/blog/${article_group.image_folder_name}/extra-large/${image_name}` : ''
            };
          });
        });

        callback(all_article_data);
      },
      init: function (jquery_code, callback) {
        window.$for_article_iframe = $(`<iframe id="for_article">`).attr({
          sandbox: "allow-same-origin"
        })
          .on('load', function () {
            if (!this.src && !this.srcdoc)
              return;

            var cur_window = this.contentWindow,
              cur_document = this.contentDocument;
            script = cur_document.querySelector('script:last-child').textContent.trim();

            cur_window.eval(script);
            cur_window.eval(jquery_code);

            var live_path = "https://www.vfsglobal.com/en/",
              cur_article_desc = cur_window.master_page_data && cur_window.master_page_data.main_sub_heading,
              cur_image_path = cur_article_data.image_path &&  (live_path + cur_article_data.image_path),
              get_correct_text = (function () {
                var $el = $('<div>');

                return function (html) {
                  html = html || '';

                  return $el
                    .html(html)
                    .text()
                    .trim()
                    .replace(/\s+/g, " ");
                };
              })();

            cur_article_desc = cur_article_desc && (cur_article_desc.heading || cur_article_desc);

            var $head = $(cur_document).find("head");

            $head.find('meta[property^="og:"]').remove();

            $head.append(
              `<meta property="og:url" content="${live_path + cur_file_path}" />`,
              `<meta property="og:type" content="article" />`,
              `<meta property="og:title" content="${get_correct_text(cur_article_data.html)}" />`,
              `<meta property="og:description" content="${get_correct_text(
                cur_article_desc
              )}" />`,
              `<meta property="og:image" content="${cur_image_path}" />`,
              `<meta property="og:image:width" content="1500" />`,
              `<meta property="og:image:height" content="640" />`
            );

            window.node_callback(cur_document.documentElement.outerHTML);
          })
          .appendTo("body");

        callback();
      },
      get_article_html: function (file_path, file_code, article_data, callback) {
        window.node_callback = callback;
        window.cur_file_path = file_path;
        window.cur_article_data = article_data;
        window.$for_article_iframe.attr('srcdoc', file_code);
      }
    }
  };

module.exports = async function () {
  var {
    folder,
    file_match_pattern,
    server_url,
    invalid_title,
    jquery_script_path,
    write_prefix,
    scripts
  } = config,
    driver = await new Builder().forBrowser("chrome").build();

  try {
    var files = fs.readdirSync(folder),
      article_files = files.filter(file_name =>
        file_name.match(file_match_pattern)
      ),
      jquery_code = fs.readFileSync(jquery_script_path, 'utf-8'),
      bar = new progress.Bar({}, progress.Presets.shades_classic),
      all_article_data;

    await driver.get(`${server_url}/${folder}/`);

    if ((await driver.getTitle()) == invalid_title)
      throw Error(
        `server ${server_url} is not open, please open the same by chrome app '200 OK'`
      );

    all_article_data = await driver.executeAsyncScript(scripts.get_all_article_data);

    if (Object.keys(all_article_data).length != article_files.length)
      throw Error('mismatching number of article html files and article data given in config.js');

    await driver.executeAsyncScript(scripts.init, jquery_code);

    bar.start(article_files.length, 0);

    await async_for_each(article_files, async function (file_name, index) {
      var filePath = `${folder}/${file_name}`,
        new_html = await driver.executeAsyncScript(scripts.get_article_html, filePath, fs.readFileSync(filePath, 'utf-8'), all_article_data[file_name]);

      if (!new_html)
        throw Error(`invalid html ${String(new_html)} for file ${file_name}`);

      new_html = pretty(write_prefix + new_html, {
        ocd: true
      });

      fs.writeFileSync(filePath, new_html);

      bar.update(index + 1);
    });
  } catch (e) {
    console.error("\x1b[31m%s\x1b[0m", e.message);
  } finally {
    bar.stop();
    await driver.quit();
  }
};
////
if (require.main === module) module.exports();