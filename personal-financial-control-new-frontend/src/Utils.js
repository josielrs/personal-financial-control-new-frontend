import { createRoot } from 'react-dom/client';
import { Alert } from 'react-bootstrap';

export const SERVER_ENDPOINT = "http://127.0.0.1:5000"

export const showInfoMessage = (message) => {
    const root = createRoot(document.getElementById("message"))
    root.render(
        <div id="messageContent" hidden={false}>
            <Alert variant="danger" onClose={() => document.getElementById("messageContent").hidden = true} dismissible>
                <Alert.Heading>Ops !! Algo deu errado.</Alert.Heading>
                <p>
                    {message}
                </p>
            </Alert>
        </div>
    )        
}

export const isUndefined = function(value){
  return !value || value == undefined
}