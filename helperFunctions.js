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
    try{
        const renameConfirm = await fs.rename(filePath, fileName);
        console.log(`File has been renamed to ${fileName}`);
    } catch (err){
        console.log("Seems like the file doesn't exist or it already been renamed");
    }
}

export async function addContentToFile(filePath, content) {
    try{
        const appendingConfirmation = await fs.appendFile(filePath, content + "\n", {encoding:"utf-8"});
        console.log(`the content "${content}" has been added to the file: "${filePath}"`)
    } catch (err){
        console.log("Seems like the data has already been appended");
    }
}

