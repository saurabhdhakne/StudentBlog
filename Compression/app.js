var fs = require("fs"),
    zlib = require("zlib"),
    filename= "./saturn.jpg",
    compress = zlib.createGzip(), // compress
    decompress = zlib.createGunzip(), // decompress
    readstream = fs.createReadStream(filename);
function compressfile(filename){
    var newfilename = filename+".srb",
        writestream = fs.createWriteStream(newfilename);
    readstream.pipe(compress).pipe(writestream);
}
function decompressfile(filename){
    var newfilename = filename.replace(".srb",""),
        writestream = fs.createWriteStream(newfilename);
    readstream.pipe(decompress).pipe(writestream);
    
}
if(/.srb$/i.test(filename)==true){
    decompressfile(filename)
}
else {
    compressfile(filename);
}