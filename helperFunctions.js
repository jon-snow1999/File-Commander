import fs from "fs/promises";

export async function createFile(filePath) {
    //Here i check if the file already exists or not, if it does then nothing will happen, but if it doesn't
    //Then the file at the given path will be created
    try{
        const fileHandler = await fs.open(filePath, "r");
        fileHandler.close();
        console.log(`the File path ${filePath} already exists`);
    } catch (err){
        const fileHandler = await fs.open(filePath, "w");
        fileHandler.close();
        console.log(`The filepath ${filePath} had been created`);
    }
    
}

