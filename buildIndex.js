var fs = require('fs');

var walk = function (dir, done) {
    var results = [];
    fs.readdir(dir, function (err, list) {
        if (err) {
            done(err);
            return;
        }
        var i = 0;
        (function next() {
            var file = list[i++];
            if (!file) {
                done(null, results);
                return;
            }
            file = dir + '/' + file;
            fs.stat(file, function (err, stat) {
                if (stat && stat.isDirectory()) {
                    walk(file, function (err, res) {
                        results = results.concat(res);
                        next();
                    });
                } else {
                    results.push(file);
                    next();
                }
            });
        })();
    });
};

walk("./serverRoot", function (err, results) {
    if (err) throw err;
    console.log(results);
    var files = [];
    results.forEach(function (fileLink) {
        files.push({
            link: fileLink.replace(/.\/serverRoot/, ""),
            name: fileLink.replace(/^.\/serverRoot\/(.+\/)?([^\/]+)$/, "$2"),
            type: fileLink.replace(/^.+\.([^\.]+)$/, "$1").toUpperCase(),
            group: fileLink.replace(/^.\/serverRoot\/(.+)\/[^\/]+$/, "$1").replace(/.\/serverRoot/, "").replace(/\//g, "->")
        });
    });
    fs.writeFileSync("./serverRoot/index.json", JSON.stringify({files: files}, null, 4));
});