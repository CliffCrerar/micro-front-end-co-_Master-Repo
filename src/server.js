// const webpack = require('webpack');
// const middleware = require('webpack-dev-middleware');
// const compiler = webpack(require('./webpack.config'));
require("dotenv").config();
import express from "express";
import S3 from "aws-sdk/clients/s3";
import { writeFileSync } from "fs";
import { parse, join } from "path";
const app = express();

const s3Config = {
  bucketName: "appHost",
  dirName: "@micro-front-end-co",
  region: "eu-west-1",
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  s3Url: process.env.BUCKET_URI /* optional */,
};

const s3Client = new S3(s3Config);
console.log("s3Client: ", s3Client);

s3Client.listObjects(
  { Bucket: "micro-front.softwarecraft.co.za" },
  (err, res) => {
    let bucketList = [];
    try {
      if (err) {
        throw new Error(err);
      }
      console.log("res: ", res);
      console.log("err: ", err);
      let latestEntry = res[0];
      let apps = [];
      latestEntry.unixTimeStamp = new Date(entry.LastModified).getTime() / 1000;
      const bucketList = res.Contents.map((entry) => {
          

        const { base, dir, ext, name } = parse(entry.Key);
        if (ext !== ".js") return;
        entry.unixTimeStamp = new Date(entry.LastModified).getTime() / 1000;
        // const dirArr = dir.split("/");
        // const hash = dirArr.splice(dirArr.length - 1).join("");
        // const importKey = dirArr.join("/");

        
        
        latestEntry.Key === testEntry.Key && latestEntry.

        
        
        bucketList.push({
          unixTimeStamp: new Date(entry.LastModified).getTime() / 1000,
          stringTimeStamp: entry.LastModified,
          uri: join(process.env.BUCKET_URI, dir, name + ext),
          
          hash,
        });

        // console.log("bucketList: ", bucketList);
      });
      // .writeFileSync('./bucket-content.json',JSON.stringify(res.Contents),'utf8');
      const imports = createImports(bucketList);
      console.log("imports: ", imports);
    } catch (err) {
      console.error(err);
    }
  }
);

// console.log('s3Config: ', s3Config);

// app.use(
// //   middleware(compiler, {
//     // webpack-dev-middleware options
// //   })
// );
console.log();

function createImports(obj) {
  console.log("obj: ", obj);

  const ordered = obj
    .sort((a, b) => a - b).reduce((previousItem, currentItem,idx)=>{
        if(idx===1){
            return previousItem;
        } else if(previousItem.importKey!==currentItem.importKey){
            return currentItem
        }
    })
  console.log("ordered: ", ordered);
  return;
}

app.listen(3000, () => console.log("Example app listening on port 3000!"));
