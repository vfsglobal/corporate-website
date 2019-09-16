(async function() {
    await require('./create-sitemap-xml')();
    await require('./modify-articles')();
})();