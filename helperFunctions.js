import fs from "fs/promises";

export async function createFile(fileName) {
    try{
        const fileConfirmation = await fs.writeFile(fileName, "Hello there");
    } catch (err) {
        console.log(err);
    }
    
}

