import React from "react";
import { Textarea } from "../components/ui/textarea";
import { Button } from "../components/ui/button";
import { useState,useEffect , useRef} from "react";
import { URL } from "../constants";
import Answer from "../components/answers";
import "../App.css";
import Loader from "../components/ui/loader";
import {GoogleGenAI} from "@google/genai"
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import {Prism as SyntaxHighlighter} from "react-syntax-highlighter"
import {vscDarkPlus} from "react-syntax-highlighter/dist/esm/styles/prism"

const FirstPage = () => {
  const [history, setHistory] = useState([
    {
      role: "user",
      parts: [{text: "Hi Can you help me "}]
    },
    {
      role: "model",
      parts: [{text: "Yes! how can I help you? "}]
    }
  ]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const chatBox = useRef(null)

  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  const ai = new GoogleGenAI({apiKey});

  async function submitMessage() {
    const chat = ai.chats.create({
      model: "gemini-2.0-flash",
      history
    });

    setHistory((prevHistory)=> [...prevHistory, {
      role:"user",
      parts:[{text:message}],
    }])

    setHistory((prevHistory)=> [...prevHistory, {
      role:"model",
      parts:[{text:""}],
    }])

    const chatResponse = await chat.sendMessageStream({message})
     
    for await (const chunk of chatResponse) {
      setHistory((prevHistory)=>{

        const newText = prevHistory[prevHistory.length - 1].parts[0].text + chunk.text;
        return [
          ...prevHistory.slice(0,-1),
          {
            role: "model",
            parts: [{text:newText}],
          },
        ];
        
    })
  }}

  useEffect(()=>{
    if(chatBox.current){
      chatBox.current.scrollTop=chatBox.current.scrollHeight;
    }
  },[history])

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);
  if (loading) return <Loader />;

  return (
    <div className="flex justify-center">
      <div className="text-white overflow-scroll container rounded mb-5 p-5 w-[600px] h-[65vh] flex flex-col gap-3 overflow-x-auto " ref={chatBox}>
        {
          history.length>0 && history.map(({role,parts},index)=>(
            role==="user" ? (<p className="bg-black/90 text-white px-4 py-2 not-first:max-w-80 rounded-lg me-auto font-medium font-inter">
              {parts[0].text}
            </p>) : (<p className="bg-white/80 text-black px-4 py-2 max-w-80 rounded-lg ms-auto font-medium font-inter">
              <Markdown 
                remarkPlugins={remarkGfm}
                components={{
                  code(props) {
                    const{children,className,node,...rest}=props;
                    const match = /language-(\w+)/.exec(className || "");
                    return match ? (
                      <SyntaxHighlighter
                      {...rest}
                      preTag="div"
                      children={String(children)}
                      language={match[1]}
                      style={vscDarkPlus}>
                      </SyntaxHighlighter>
                    ) : (
                      <code {...rest} className={className}>
                        {children}
                      </code>
                    )
                  }
                }}
                >
                  {parts[0].text}</Markdown>
            </p>)
          ))
        }
     
      </div>
      <div className="flex flex-col gap-2 fixed bottom-5 w-full ">
        <Textarea
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          className="text-white resize-none overflow-y-scroll h-20 p-2 rounded"
          placeholder="Type your code here..."
        />

        <div className="flex justify-center gap-x-4">
          <Button
            onClick={submitMessage}
            className="right-2 bg-green-600 hover:bg-green-700"
          >
            Submit
          </Button>
          
        </div>
      </div>
    </div>
  );
};

export default FirstPage;
