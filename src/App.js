import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import {db} from "./firebase";
import {auth} from "./firebase";
import Post from './Post';
import { Unsubscribe } from 'firebase';
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Input } from '@mui/material';
import ImageUpload from './components/ImageUpload';
import firebase from 'firebase';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

//button onclick signup

function App() {

const [posts, setPosts] = useState([])
const [usernameState, setUsernameState] = useState(null)
const [email, setEmail] = useState("")
const [password, setPassword] = useState("")
const [open, setOpen] = React.useState(false);
const handleOpen = () => setOpen(true);
const [user, setUser] = useState(null)
const [openSignIn, setOpenSignIn]= useState(false)
const [currentUsernameValue, setCurrentUsernameValue] = useState(null)

console.log(auth)
//listener, and user from firebase, username, username dependency, anytime change fire off this, onitor if user

useEffect (() => {
auth.onAuthStateChanged((authUser) => {
//userloggedin, on this

//survive refresh communicate with installed values, across refresh across battlefields, array mutation
if(authUser) {
   //this is firebase.user, connect installed value global
  setUser(authUser) //persitent cookie tracker, keep login, state not persistent, auth.onAuthStateChanged
  if(authUser.displayName) { //what is authuser.ddisplayname, something from cookies, we , if never before then we must create profile value, this is regiostered and witout interference
    //if user has displayname, then, if we just  created someone, we have the username we just created
    //if new user attribute, if new user then 
  } else {
    return authUser.updateProfile( {
      displayName:usernameState,
    })
  }


} else {
  setUser(null)

}
//frontend and backend listener 

})

return () => {
  //cleanup, call unsubsrcibe , cancel asynchronous calls, cancel all subsricbtion cleanup function, to avoid somehting
//unsubscribe need some data to rely on, we must connect our usefefct and snapshot, snapshot and unsubscirbe belongs together, hard listeners with unsubscribe, function needs values
}

},[user, usernameState])
//log in, update username, refire frontend, detach, without duplicated

useEffect(()=> {
//this is where the code runs 
//import db
console.log(db.collection('posts'))

//orderby timestamp desc

db.collection('posts').orderBy('timestamp', 'asc').onSnapshot(snapshot => {
//every time a new post is added, this code fires
//push into post, post takes data
setPosts(snapshot.docs.map(doc => ({

  id: doc.id,
  post: doc.data()
})));
  
  })
console.log(posts)


}, []) 


const signUp = (event) => {

  

  event.preventDefault();
  //state was lagging, we had it by deffault on fire:::

  auth.createUserWithEmailAndPassword( email, password)


  setUsernameState(usernameState)
  setCurrentUsernameValue(usernameState)


  .then((authUser) => {

//incorrect state, value different

//logging inside useeffect 




    //we have a problem that state is not updated on exact fire
 // we need to fire our update profile when we know our state is correct


    //our state is not updated when we push it to displayname, displayname is constant
  
    return authUser.user.updateProfile({
      displayName: usernameState,
    }).then(console.log(authUser.user.displayName))
  })
  .catch((error) => alert(error.message))
//backend vlaidation we are now with auth we return this value, backend and user 

}



const signIn = (event) => {
  event.preventDefault();
  

  auth.signInWithEmailAndPassword(email, password)
  .catch((error) => alert(error.message))

  setOpenSignIn(false)
}

const createUserNameValue =(e) => {

  const currentValue = e.currentTarget.value;

setUsernameState(currentValue)

}




const logAuth = () => {


  firebase.auth().onAuthStateChanged((user) => {
  

    setCurrentUsernameValue(usernameState)

console.log(user.displayName)
  
  if(user) {

console.log(user.uid)
console.log(user.displayName)
setCurrentUsernameValue(user.displayName)
console.log(user) // here we might have our contsant,
//if this constant exists we do certain things
  }


  else {

console.log("problem, firebase.auth must wait until certain change")
  }});
}






//bunch of array values, we have now saved what is values and auth from firebased

//posts inside of irebase snapshot powerful lsitener, every change document added chagned modified,
//imagine something following and immediately noting, update document, post update, refire this bit of code 
//on snapshot , on any change fire this code , bit of code 

//we now have connection and auth with firebase, we have snapshot to closely monitor any pulsating data to engage


//now databse is connected posts.map







  return (
    <div className="App">



 {/* i want*/}
 {/* file uploader/}
 {/* i want*/}




    
<Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
      <form className='app__signup'>
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
  
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>

          <img 
className="app__headerImage"
src= "https://www.siteexpert.biz/lib/image/instagram.png"
/> 






 <Input 
placeholder='username'
type="username"
value={usernameState}
onChange={createUserNameValue}
/>


<Input
placeholder='email'
type="text"
value={email}
onChange={(e) => setEmail(e.target.value)}
/>

<Input
placeholder='password'
type="password"
value={password}
onChange={(e) => setPassword(e.target.value)}
/> 
<Button type='submit' onClick={signUp}>Sign Up</Button>


          </Typography>
        </Box>
        </form>
      </Modal>






      <Modal
        open={openSignIn}
        onClose={() => setOpenSignIn(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
      <form className='app__signup'>
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
  
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>

          <img 
className="app__headerImage"
src= "https://www.siteexpert.biz/lib/image/instagram.png"
/> 







<Input
placeholder='email'
type="text"
value={email}
onChange={(e) => setEmail(e.target.value)}
/>

<Input
placeholder='password'
type="password"
value={password}
onChange={(e) => setPassword(e.target.value)}
/> 
<Button type='submit' onClick={signIn}>Sign In</Button>


          </Typography>
        </Box>
        </form>
      </Modal>

























  <div className="app__header">

<div className="app__headerImageContainer">
<img 
className="app__headerImage"
src= "https://www.siteexpert.biz/lib/image/instagram.png"
/> 

{

  user ? (
   <div className='app__headerButtonContainer'> <Button  onClick={() => auth.signOut()}>Logout</Button> </div>

 ): (
  <div className='app__headerButtonContainer'>
    <Button  onClick={() => setOpenSignIn(true)}>Sign In</Button>
 <Button  onClick={() => setOpen(true)}>Sign Up</Button>
 </div>

)}



</div>
<h1>Clone</h1>


<button onClick={logAuth}>Our displayname</button>


</div>

{user?.displayName ? (
  <ImageUpload username={user.displayName} />


): (
  <h3>Sorry, login required to upload</h3>
)}


{
  posts.map(({id, post}) => {

    return <Post key={post.id} username={post.username} caption={post.caption} imageUrl={post.imageUrl} postId= {id} currentUser={user?.displayName} />


  })
}



    </div>
  );
}



export default App;


//<h1>Instagram-Clone-Project</h1>