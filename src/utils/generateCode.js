import crypto from "crypto"

const generateCode = () =>{
    const mainString ="abbsjjsghjwj2672888gwbsbsb27282822"

    let shortCode = ""

    for(let i =0;i<6;i++){
        shortCode += mainString.charAt(Math.floor(Math.random() * 62))


    }

    return shortCode
}


export default generateCode