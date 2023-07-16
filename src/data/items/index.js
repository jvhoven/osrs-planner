const search = require("./search.json")
const fs = require("node:fs")

const noDuplicates = Object.entries(search).flatMap(([id, data]) => {
    if (data.duplicate) {
        return [];
    }

    const { type, duplicate, ...rest } = data;
    return rest;
}, {});

fs.writeFileSync("./search-no-duplicates.json", JSON.stringify(noDuplicates));