export const separatorArray=['!','@','#','$','%','^','&','*','-',')','(','+','_','.','/'];
export const baseInfo={
    Password:"None",
    Guesses:"None",
    Guesses_log10:"None",
    Pattern:"None",
    Matched_word:"None",
    Dictionary_name:"None"
}
export const defaultChecklist={
    has8Characters:false,
    hasUpperCase:false,
    hasLowercase:false,
    hasNumbers:false,
    hasSymbols:false
}
export const passwordCriteriaArray=['ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz','0123456789','!@#$%^&*()_+=-`~[]\\{}|;\':",./<>?'];
export const statusColors=["rgb(252, 121, 121)","orange","rgb(235, 230, 75)","rgb(192, 236, 73)","rgb(113, 225, 52)","rgb(122, 121, 121)"];
export const statusCodeName=['very weak','weak','moderate','strong','very Strong','status'];
export const crackTimeCodeNames={
    online_throttling_100_per_hour:"Unknown time",
    online_no_throttling_10_per_second:"Unknown time",
    offline_slow_hashing_1e4_per_second:"Unknown time",
    offline_fast_hashing_1e10_per_second:"Unknown time"
}
export const crackTimeInterfaceNames=["Online, limited attempts","Online, no limits","Offline, slow hashing","Offline, fast hashing"];
export const passwordCheckList=['Contains atleast 8 characters','Contains uppercase letters (A-Z)','Contains lowercase letters (a-z)','Contains numbers (0-9)','Contains symbols (`~!@#$%^&*()=+-*/|.,_?)'];