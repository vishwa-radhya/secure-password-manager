import { realtimeDb } from "../firebase/firebase";
import { update,ref } from "firebase/database";
import { auth } from "../firebase/firebase";

const updateDb=async(isFavourite,key,favCount)=>{
        try {
            const currentCount = favCount || 0;
            const favouritesCount = isFavourite ? currentCount - 1 : currentCount + 1;
            const updates = {};
            updates[`users/${auth.currentUser.uid}/favouritesCount`] = favouritesCount;
            updates[`userPasswords/${auth.currentUser.uid}/${key}/isFavourite`] = !isFavourite;
            await update(ref(realtimeDb), updates);
          } catch (error) {
            console.error("Error updating favourites:", error);
            throw error;
          }
    }

export const handleFavClick=async(isFavourite,key,favCount)=>{
        try{
            await updateDb(isFavourite,key,favCount)
            return 1;
        }catch(e){
            console.error(e)
            return 0;
        }
    }