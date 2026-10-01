//I start by importing all the required files for the project
import fs from "fs/promises";
import { createFile } from "./helperFunctions.js";
import { deleteFile } from "./helperFunctions.js";
import { renameFile } from "./helperFunctions.js";
import { addContentToFile } from "./helperFunctions.js";
import { Commands } from "./commands.js";


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
    await fileHandler.read(fileBuffer, offset, length, position);

    const contents = fileBuffer.toString("utf-8").split("\n");
    contents.forEach(async (line) => {
      // create a file <path>
      if (line.includes(Commands.CREATE_A_FILE)) {
        const fileName = line.substring(Commands.CREATE_A_FILE.length + 1);
        await createFile(fileName);
      }

      // delete a file <path>
      if(line.includes(Commands.DELETE_A_FILE)){
        const fileName = line.substring(Commands.DELETE_A_FILE.length + 1);
        await deleteFile(fileName);
      }

      //rename a file <path> to <newPath>
      if(line.includes(Commands.RENAME_A_FILE)){
        const toIndex = line.indexOf(" to ");
        const fileName = line.substring(Commands.RENAME_A_FILE.length + 1, toIndex);
        const newName = line.slice(toIndex + " to ".length);
        await renameFile(fileName, newName);
        
      }

      //add to a file <path> this content: <content>
      if(line.includes(Commands.ADD_TO_FILE)){
        const thisContentIndex = line.indexOf(" this content: ");
        const fileName = line.substring(Commands.ADD_TO_FILE.length + 1, thisContentIndex);
        const contentToAdd = line.slice(thisContentIndex + " this content: ".length);
        await addContentToFile(fileName, contentToAdd);
      }
    });
  });

  //Here i use an async for loop which iterates over async iterators
  for await (const event of fileWatcher) {
    if (event.eventType === "change") {
      fileHandler.emit("change");
    }
  }

  fileHandler.close();
}

await watcherFunc();
