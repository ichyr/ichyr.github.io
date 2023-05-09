const dbClient = require('./database');
const fs = require('fs');
const { saveVmilistData, copyVmilistsAvatars } = require('./vmilists');

const execute = async () => {
    const vmilistsRaw = fs.readFileSync(`${__dirname}/../json/enrichedVmilists.json`);
    const vmilists = JSON.parse(vmilistsRaw);


    const specializationsRaw = fs.readFileSync(`${__dirname}/../json/specializations.json`);
    const specializations = JSON.parse(specializationsRaw);

    const specdataRaw = fs.readFileSync(`${__dirname}/../json/specdata.json`);
    const specdata = JSON.parse(specdataRaw);

    saveVmilistData(vmilists);
    // copyVmilistsAvatars(vmilists);
}

execute();