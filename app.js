import fs from "fs/promises";
import {createFile} from "./helperFunctions.js";

//Here i am listing all of the possible commands i can listen to:
const CREATE_A_FILE = "create a file";

async function watcherFunc() {
  //Below i first start by opening the file then i use a watcher method
  const fileHandler = await fs.open("./commands.txt");
  const fileWatcher = fs.watch("./commands.txt");
  
  //since the fileHandler objects inherits from the <EventEmitter> class i can make use of events
  fileHandler.on("change", async () => {
    //Before i begin reading the file i must determine the size of the buffer which will store the data
    // just so i can save space and memory and not waste proper memory spaces and i do so using the fileHandler stat property
    const fileStat = await fileHandler.stat();
    const fileSize = fileStat.size;
    const fileBuffer = Buffer.alloc(fileSize);
    const offset = 0;
    const length = fileSize - offset;
    const position = 0;
    await fileHandler.read(
      fileBuffer,
      offset,
      length,
      position,
    );

    const contents = fileBuffer.toString("utf-8").split("\n");
    contents.forEach(async (line) => {
        if(line.includes(CREATE_A_FILE)){
            const fileName = line.substring(CREATE_A_FILE.length + 1)
            await createFile(fileName);
        }
    })
    console.log(contents)
    
  });

  //Here i use an async for loop which iterates over async iterators
  for await (const event of fileWatcher) {
    if(event.eventType === "change"){
        fileHandler.emit("change");
    }
  }

  fileHandler.close();
}



await watcherFunc();
