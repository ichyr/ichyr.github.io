const dbClient = require('./database');
const fs = require('fs');
const { saveVmilistData } = require('./vmilists');

const execute = async () => {
    const vmilistsRaw = fs.readFileSync(`${__dirname}/../json/enrichedVmilists.json`);
    const vmilistsNoComputedProperties = JSON.parse(vmilistsRaw);
    // addition of computed properties
    const vmilists = vmilistsNoComputedProperties.map(v => {
        const d = new Date(v.updated_at);
        var options = {
            weekday: "short",
            year: "numeric",
            month: "2-digit",
            day: "numeric"
        };
        const lastUpdatedAt = d.toLocaleDateString('uk-UA', options);

        return {
            ...v,
            avatarRelativePath: `../images/${v.en_name}/${v.avatar}`,
            avatarThumbRelativePath: `../images/${v.en_name}/thumb_${v.avatar}`,
            lastUpdatedAt,
            ownHTMLHref: `${v.en_name}.html`
        };
    })

    const specializationsRaw = fs.readFileSync(`${__dirname}/../json/specializations.json`);
    const specializations = JSON.parse(specializationsRaw);

    const specdataRaw = fs.readFileSync(`${__dirname}/../json/specdata.json`);
    const specdata = JSON.parse(specdataRaw);

    saveVmilistData(vmilists);
}

execute();