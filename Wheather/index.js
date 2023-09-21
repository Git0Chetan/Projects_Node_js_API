
const http=require('http');
const fs=require('fs');
var requests=require('requests');


const homeFile=fs.readFileSync("home.html","utf-8");

const replaceval=(tempval,orgval)=>{
    let temperature=tempval.replace("{%tempVal%}",Math.round((orgval.main.temp-273.15)*100)/100);
    temperature=temperature.replace("{%tempmin%}",(orgval.main.temp_min-273.15).toFixed(2));
    temperature=temperature.replace("{%tempmax%}",(orgval.main.temp_max-273.15).toFixed(2));
    temperature=temperature.replace("{%location%}",orgval.name);
    temperature=temperature.replace("{%country%}",orgval.sys.country);
    return temperature;
};

const server=http.createServer((req,res)=>{
    if(req.url == "/"){
        requests("https://api.openweathermap.org/data/2.5/weather?q=pune&appid=5648dceae86bae33075e06dbe505a492")
            .on('data',(chunk)=>{
                const objdata=JSON.parse(chunk);
                const arrData=[objdata];
                
                // console.log(Math.round(arrData[0].main.temp-273.15));
                const realTimeData=arrData.map((val)=>replaceval(homeFile,val)).join(" ");
                res.write(realTimeData);
            })
            .on('end', (err)=> {
                if (err) return console.log('connection closed due to errors', err);
                res.end();
            });
    }
});


server.listen(8000,"127.0.0.1"),()=>{
    console.log("listening to the port no 8000");
};