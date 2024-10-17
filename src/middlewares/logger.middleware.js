import fs from 'fs';
import winston from 'winston';
const fspromise=fs.promises;
/*
async function log(logdata) {
    try{
        logdata=`\n ${new Date().toString()}-${logdata}`
        await fspromise.appendFile('log.txt',logdata);

    }catch(err){
        console.log(err);
    }
}
    */
   const logger=winston.createLogger({
      level:'info',
      format:winston.format.json(),
      defaultMeta:{service:'request-logging'},
      transports:[
        new winston.transports.File({filename:'log.txt'}),
      ]
   });
const loggermiddleware=async(req,res,next)=>{
    if(!req.url.includes('signin')){
    const logdata=`${req.url}-${JSON.stringify(req.body)}`;
    logger.info(logdata);
   // await log(logdata);
    }
    next();
}
export default loggermiddleware;