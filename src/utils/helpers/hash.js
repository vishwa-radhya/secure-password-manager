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