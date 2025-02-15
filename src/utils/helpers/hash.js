import bcrypt from 'bcryptjs';

export const hashPassword=(password)=>{
    const salt= bcrypt.genSaltSync(10);
    return  bcrypt.hashSync(password,salt);
}

export const compareHashPassword=async(password,hash)=>{
   try{
    const match = await bcrypt.compare(password,hash);
    if(match){
        return "match"
    }else{
        return "unmatch"
    }
   }catch(e){
    console.error(e);
    return "error"
   }
}

export const arrayBufferToBase64=(buffer)=>{
    let binary='';
    const bytes = new Uint8Array(buffer);
    const len = bytes.length;
    for(let i=0;i<len;i++){
        binary+=String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
}

export const encryptData=async(plainText,key)=>{
    //gen random initialization vector - 12 bytes
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const encoder = new TextEncoder();
    const data = encoder.encode(plainText);

    //encrypt pass with AES-GCM 
    const cipherBuffer = await crypto.subtle.encrypt(
        {
            name:"AES-GCM",
            iv,
        },
        key,
        data
    );

    // converting iv and ciphertext to Base64
    return{
        iv:arrayBufferToBase64(iv),
        cipherText:arrayBufferToBase64(cipherBuffer),
    }
}