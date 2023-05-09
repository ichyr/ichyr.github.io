const fs = require("fs");
const { render } = require("mustache");
const translit = require('ua-en-translit');

let vmilistMarkdownTemplate = fs.readFileSync("./src/templates/vmilist.md").toString()
let vmilistHTMLTemplate;
let vmilistJSONTemplate;

const renderVmilistMarkdown = (template, vmilist) => {
    return render(template, vmilist);
}

const saveFile = (content, folder,fileName, fileExtension) => {
    const folderExists = fs.existsSync(`${__dirname}/${folder}`);
    fs.writeFileSync(`${__dirname}/${folder}/${fileName}.${fileExtension}`, content);
}

exports.saveVmilistData = (vmilists, specializations) => {
    return vmilists.forEach(vmilist => {
        const vmilistMDContent = renderVmilistMarkdown(vmilistMarkdownTemplate, vmilist);
        saveFile(vmilistMDContent, '../output/vmilists', vmilist.en_name, 'md');
    });

}