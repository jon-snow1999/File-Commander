import fs from "fs/promises";
import { buffer } from "stream/consumers";

async function watcherFunc() {
    //Below i first start by opening the file then i use a watcher method
    const fileHandler = await fs.open("./commands.txt");
    const fileWatcher = fs.watch("./commands.txt");
    
    //Here i use an async for loop which iterates over async iterators
    for await (const event of fileWatcher){
        //Before i begin reading the file i must determine the size of the buffer which will store the data 
        // just so i can save space and memory and not waste proper memory spaces and i do so using the fileHandler stat property
        const fileStat = await fileHandler.stat();
        const fileSize = fileStat.size;
        const fileBuffer = Buffer.alloc(fileSize);
        const offset = 0;
        const length = fileSize - offset;
        const position = 0;
        const fileContent = await fileHandler.read(fileBuffer, offset, length, position);
        console.log(fileContent.buffer.toString("utf-8"));
    }

    fileHandler.close();
}


await watcherFunc();
