const jsonfile = require("jsonfile");
const moment = require("moment");
const simpleGit = require("simple-git");

const FILE_PATH = "./data.json";
const git = simpleGit();

async function makeCommit(date) {
    const data = {
        date: date,
        random: Math.random()
    };

    await jsonfile.writeFile(FILE_PATH, data);

    await git.add([FILE_PATH]);
    await git.commit(date, { "--date": date });
}

async function run() {
    for (let i = 0; i < 365; i++) {
        const date = moment()
            .subtract(i, "days")
            .format();

        await makeCommit(date);
    }

    await git.push();
}

run();