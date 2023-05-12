
const path = require("path")
const fs = require("fs");
const { render } = require("mustache");
const translit = require('ua-en-translit');

let vmilistMarkdownTemplate = fs.readFileSync("./src/templates/vmilist.md").toString()
let vmilistHTMLTemplate = fs.readFileSync("./src/templates/vmilist.html").toString();
let indexHTMLTemplate = fs.readFileSync("./src/templates/index.html").toString();
let vmilistJSONTemplate;

const renderTemplate = (template, content) => {
    return render(template, content);
}

const saveFile = (content, folder, fileName, fileExtension) => {
    const folderExists = fs.existsSync(`${__dirname}/${folder}`);
    fs.writeFileSync(`${__dirname}/${folder}/${fileName}.${fileExtension}`, content);
}

const createIndexHTML = (vmilists) => {
    const specializations = vmilists.reduce((acc, vmilist) => {
        if (!acc[vmilist.specialization_name]) {
            acc[vmilist.specialization_name] = {
                name: vmilist.specialization_name,
                vmilists: []
            };
        }
        acc[vmilist.specialization_name].vmilists.push(vmilist);
        return acc;
    }, {});

    const specData = {
        'specializations': Object.values(specializations)
    }

    const indexPage = renderTemplate(indexHTMLTemplate, specData);
    saveFile(indexPage, '../output/vmilists', 'index', 'html');

}

exports.saveVmilistData = (vmilists) => {
    vmilists.forEach(vmilist => {
        const vmilistMDContent = renderTemplate(vmilistMarkdownTemplate, vmilist);
        saveFile(vmilistMDContent, '../output/vmilists', vmilist.en_name, 'md');

        const html = renderTemplate(vmilistHTMLTemplate, vmilist);
        saveFile(html, '../output/vmilists', vmilist.en_name, 'html');
    });
    
    createIndexHTML(vmilists);
}

exports.copyVmilistsAvatars = (vmilists) => {
    vmilists.forEach(vmilist => {
        vmilists.forEach(vmilist => {
            var targetDir = `${__dirname}/../output/images/${vmilist.en_name}/`;

            if (!fs.existsSync(targetDir)) {
                fs.mkdirSync(targetDir, { recursive: true });
            }

            var sourceDir = `${__dirname}/../vmilistAvatars/${vmilist.id}/`;

            copyRecursiveSync(sourceDir, targetDir);
        })

    });
}

/**
 * Look ma, it's cp -R.
 * @param {string} src  The path to the thing to copy.
 * @param {string} dest The path to the new copy.
 */
var copyRecursiveSync = function (src, dest) {
    var exists = fs.existsSync(src);
    var stats = exists && fs.statSync(src);
    var isDirectory = exists && stats.isDirectory();
    try {
        if (isDirectory) {
            fs.readdirSync(src).forEach(function (childItemName) {
                copyRecursiveSync(path.join(src, childItemName),
                    path.join(dest, childItemName));
            });
        } else {
            fs.copyFileSync(src, dest);
        }
    } catch (err) {
        console.log('No folder = ', src);
    }
};