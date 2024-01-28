const chatinput=document.querySelector(".chat-input textarea");
const sendchatbtn=document.querySelector(".chat-input span");
const chatbox=document.querySelector(".chatbox");
const chatbotToggler=document.querySelector(".chatbot-toggler")


let usermessage;
const createchatli=(message, classname)=>{
    const chatli=document.createElement("li");
    chatli.classList.add("chat",classname);
    let chatcontent=classname ==="outgoing" ? `<p>${message}</p>` : `<span class="material-symbols-outlined">smart_toy</span><p></p>`;
    chatli.innerHTML=chatcontent;
    chatli.querySelector("p").textContent=message;
    return chatli;
}

const generateResponse=(incomingChatLi)=>{
    const au="http://127.0.0.1:5000/query"
    const messageElement=incomingChatLi.querySelector("p")

    const reop={
        method: "POST",
        headers:{
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: usermessage })
    }
    fetch(au,reop).then(res=>res.json()).then(data=>{
        console.log(data) // check from here and make changes
        //messageElement.textContent=data.choices[] // make acc to your output and comment out
    }).catch((error)=>{
        console.log(error);
        //messageElement.textContent="Something isn't right :("; // change to apka error format
    }).finally(()=>chatbox.scrollTo(0,chatbox.scrollHeight));
}




const handlechat=()=>{
    usermessage=chatinput.value.trim();
    if(!usermessage) return;
    chatinput.value="";

    chatbox.appendChild(createchatli(usermessage,"outgoing"));
    chatbox.scrollTo(0,chatbox.scrollHeight);
    setTimeout(()=>{
        const incomingChatLi=createchatli("Thinking...","incoming")
        chatbox.appendChild(incomingChatLi);
        chatbox.scrollTo(0,chatbox.scrollHeight);
        generateResponse(incomingChatLi);
    },600);
}
sendchatbtn.addEventListener("click",handlechat)
chatbotToggler.addEventListener("click",()=> document.body.classList.toggle("show-chatbot"))