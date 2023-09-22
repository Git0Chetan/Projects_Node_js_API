

const quo=document.getElementById("quotes");
const auth=document.getElementById("author");
const tweet=document.getElementById("tweetme");
let realdata=" ";
let rd=" ";

const tweetNow=()=>{
    let tp=`https://twitter.com/intent/tweet?text=${rd.text}`;
    window.open(tp);
}

const getnewQuotes=()=>{
    let rnum=Math.floor(Math.random()*10);
    rd=realdata[rnum];
    quo.innerText=`${rd.text}`;
    if(rd.author==null){
        auth.innerText="UNKNOWN";
    }
    else{
        auth.innerText=`${rd.author}`;
    }
    
};

const api="https://type.fit/api/quotes";


const getQuotes=async()=>{
    try{
        let data=await fetch((api));
        realdata=await data.json();
        getnewQuotes();
    }catch(error){};
};

getQuotes();

tweet.addEventListener('click',tweetNow);