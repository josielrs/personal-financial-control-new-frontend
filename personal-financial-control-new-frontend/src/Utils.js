import { createRoot } from 'react-dom/client';

export const SERVER_ENDPOINT = "http://127.0.0.1:5000"

export const showInfoMessage = (message,type) => {
    const root = createRoot(document.getElementById("message"))
    root.render(
        <div id="messageContent" className='warning' hidden={false}>
            <label id="messageContent">{message}</label><br/><br/>
            <button id="messageReaded" onClick={()=>{document.getElementById("messageContent").hidden = true}}><strong>OK</strong></button>
        </div>
    )        
}

export const isUndefined = function(value){
  return !value || value == undefined
}