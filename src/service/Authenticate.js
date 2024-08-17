import axios from "axios"
function ApplyToken(token) {
if(token) {

    axios.defaults.headers =  {


Authorization: `${token}`

    }


}


}
export {

    ApplyToken


}