import axios from "axios"
function ApplyToken(token) {
if(token) {

    axios.defaults.header =  {


Authorization: `${token}`

    }


}


}
export {

    ApplyToken


}