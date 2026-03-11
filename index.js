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

    const start = moment("2025-09-15");
    const end = moment("2026-03-10");

    let day = start.clone();

    while (day.isSameOrBefore(end)) {

        if (Math.random() < 0.5) {

            const commits = Math.floor(Math.random() * 5) + 1;

            for (let i = 0; i < commits; i++) {

                const date = day.clone().add(i, "seconds").format();

                await makeCommit(date);

            }

        }

        day.add(1, "day");
    }

    console.log("Finished generating commits. Pushing to GitHub...");
    await git.push("origin", "main");
    console.log("Push complete.");
}

run();