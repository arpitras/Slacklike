import { collection, doc, getDoc, getDocs, query, setDoc, where } from "firebase/firestore";
import { addDoc} from "firebase/firestore";
import { db } from "../firebase";

function delay() {
    // `delay` returns a promise
    return new Promise(function (resolve, reject) {
        // Only `delay` is able to resolve or reject the promise
        setTimeout(function () {
            resolve(42); // After 3 seconds, resolve the promise with value 42
        }, 3000);
    });
}

export const getAllUsers = async (id) => {
    const q = query(collection(db, "users"), where("userId", "!=", id));

    const querySnapshot = await getDocs(q);

    //await delay();

    return querySnapshot;

}



export const createUser = async (user) => {
    const q = query(collection(db, "users"), where("userId", "==", user.userId));

    const alreadyThere = await getDocs(q);

    if (alreadyThere.size)
        return;
    // if (q)
    //     return;

    const task1 = await addDoc(collection(db, "users"), {
        userId: user.userId,
        name: user.name,
        phoneNumber: user.phoneNumber,
        email: user.email,
        imgUrl: user.imgUrl
    });

    const users = await getAllUsers(user.userId)
    if(!users.size)
    return;


    users.docs.map(async (element)=>{
        const userData = element.data();
        const key = user.userId > userData.userId ? user.userId + userData.userId : userData.userId + user.userId;

    const docRef = await setDoc(doc(db, "directMessages", key), {
        name: key,
    });
    })

    
}