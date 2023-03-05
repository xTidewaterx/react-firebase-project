import { useState } from "react";
import { Button } from "@mui/material";
import {storage, db} from "../firebase";
import firebase from "firebase";
import { firestore } from "firebase";



function ImageUpload({username}) {

    const [image, setImage] = useState(null)
    const [url, setUrl] = useState("")
    const [progress, setProgress] = useState(0)
    const [caption, setCaption] = useState("")
   

    function logInput(e) {

        const inputValue = e.currentTarget.value;
        
        setCaption(inputValue)
        
        }

        function handleChange (e) {
            //if our file selector is connected to a file choose the first array value from data values

            if(e.target.files[0]) {
                console.log(e.target.files[0])
                setImage(e.target.files[0]) 
                console.log(e.target.files[0])
                
                if(image != null) {
                    console.log(image)
                }

                }
                
              
        }


const handleUpload = () => {
    console.log(image)

    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    console.log(storage.ref(`images/${image.name}`).put(image))

//we add image to the endpoint, we now upload registery firebase

uploadTask.on(
    "state_changed",
    (snapshot) => {

        //progress function....
        const progress= Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100 //okay we have values of totalbytes divided by bytes sent in, so we know the percentag value of bytes versus totalbytes from database

        );
        setProgress(progress);
    },



    //next argument
//error function
(error) => {
    console.log(error);
    alert(error.message);
},
() => { 
    //already uploaded, now we access from firebase with firebase storage link
console.log(username)
console.log(username)
    //complete function...
    storage
    .ref("images")
    .child(image.name) //get med download url, we have storage access, storage is firebase link
    .getDownloadURL()
    .then(url => {
        db.collection("posts").add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(), //identify as a function (), have values syncrhonous
            caption: caption,
            imageUrl: url,
            username: username  //url got hold of with getDownloadUrl then url =>

        });
        setProgress(0);
        setCaption("");
        setImage(null) // have all state values dependant on data be reset on implement
    });
}
);
};



//blob problem, string value formatting 




    return (

        <div className="app__imageUploader">

    
<progress className="app__progressBar" value={progress} max="100" />
<input type="text" placeholder="Enter a caption..." 
onChange={logInput} value={caption}/>

<input type="file" onChange={handleChange}/>

<Button type="button" onClick={handleUpload}>
    Upload
</Button>

        </div>
    );


}


export default ImageUpload