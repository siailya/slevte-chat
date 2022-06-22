import {readdirSync, readFile, writeFileSync} from "fs"

// Utility for generating resources


const gen = (files) => {
    return `<meta>
        <info author="siailya" name="Chat" version="16-06-22" type="script" />
        <min_mta_version server="1.3.4-0.00000" client="1.5.6-9.18728" />
    
        <file src="assets/index.html"/>
        
        <!-- generated -->
        ${files}
        <!-- end generated -->
    
        <script src="client.lua" type="client" cache="false" />
        <script src="server.lua" type="server" cache="false" />
</meta>`
}

const files = readdirSync("./dist/assets")

console.log("files list: " + files)

writeFileSync(
    "dist/meta.xml",
    gen(files.map(f => {
        return `        <file src="assets/assets/${f}"/>`
    }).join("\n"))
)

readFile("dist/assets/" + files.find(f => f.includes('.js')), 'utf8', function (err, data) {
    let result = data.replace("/assets/background.png", "http://mta/local/assets/assets/background.png");

    writeFileSync("dist/assets/" + files.find(f => f.includes('.js')), result, 'utf8');
});

readFile("dist/index.html", 'utf8', function (err, data) {
    let result = data.replace("<base>", "<base href=\"http://mta/local/\">")
        .replaceAll("/assets/", "assets/assets/");

    writeFileSync("dist/index.html", result, 'utf8');
});
