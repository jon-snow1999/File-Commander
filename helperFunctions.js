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

export async function deleteFile(filePath) {
    try{
        const deletetionConfirmation = await fs.unlink(filePath);
        console.log(`The file ${filePath} has successfully been deleted`);
    } catch (err){
        console.log("it seems that maybe the file doesn't exist");
    }
    
}

export async function renameFile(filePath, fileName) {
    console.log(`the file at ${filePath} will be renamed to ${fileName}`);
}

export async function addContentToFile(filePath, content) {
    console.log(`the content: ${content} will be added to the file with the path ${filePath}`);
}

