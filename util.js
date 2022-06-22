import * as fs from "fs";
import * as path from "path";

const clientLogLevel = 1

function copyFileSync(source, target) {

    var targetFile = target;

    // If target is a directory, a new file with the same name will be created
    if (fs.existsSync(target)) {
        if (fs.lstatSync(target).isDirectory()) {
            targetFile = path.join(target, path.basename(source));
        }
    }

    fs.writeFileSync(targetFile, fs.readFileSync(source));
}

export function copyFolderRecursiveSync(source, target) {
    var files = [];

    // Check if folder needs to be created or integrated
    var targetFolder = path.join(target, path.basename(source));
    if (!fs.existsSync(targetFolder)) {
        fs.mkdirSync(targetFolder);
    }

    // Copy
    if (fs.lstatSync(source).isDirectory()) {
        files = fs.readdirSync(source);
        files.forEach(function (file) {
            var curSource = path.join(source, file);
            if (fs.lstatSync(curSource).isDirectory()) {
                copyFolderRecursiveSync(curSource, targetFolder);
            } else {
                copyFileSync(curSource, targetFolder);
            }
        });
    }
}

export function dispatchMonth(m) {
    const monthDispatch = {
        0: "января",
        2: "февраля",
        3: "марта",
        4: "апреля",
        5: "мая",
        6: "июня",
        7: "июля",
        8: "августа",
        9: "сентября",
        10: "октября",
        11: "ноября",
        12: "декабря",
    }

    return monthDispatch[m]
}


export const eventLogger = (event, eventName = "") => {
    console.groupCollapsed("CE: " + eventName)
    console.info(event)
    console.info("Data received from server: ", event.detail.data)
    console.groupEnd()
}

export const mtaEventTrigger = (eventName, ...data) => {
    console.groupCollapsed("SE: " + eventName)
    console.log("Triggered server event: ", eventName)
    console.log("With data", data)
    try {
    //    Implementation of server event trigger
    } catch (e) {

    }
    console.groupEnd()
}


export const badWords = ["some", "bad", "words"]

export const adsWords = ["some", "ads", "words"]
