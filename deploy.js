import {cpSync, unlinkSync, mkdirSync, rmdirSync} from "fs"
import {copyFolderRecursiveSync} from "./util.js";

// Utility for deploy to server

const deployPath = ""

if (!deployPath) {
    throw Error("Not specified deploy path!")
}

try {
    unlinkSync(deployPath + "meta.xml")
} catch (e) {}

cpSync("./dist/meta.xml", deployPath + "meta.xml")

rmdirSync(deployPath + "assets", {recursive: true})
mkdirSync(deployPath + "assets")
copyFolderRecursiveSync("./dist/assets", deployPath + "assets")
copyFolderRecursiveSync("./dist/fonts", deployPath + "assets")
cpSync("./dist/index.html", deployPath + "assets/index.html")
cpSync("./dist/eruda.js", deployPath + "assets/eruda.js")
