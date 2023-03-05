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

useEffect (() => {
auth.onAuthStateChanged((authUser) => {



if(authUser) {
 
  setUser(authUser) 
  if(authUser.displayName) { 

  } else {
    return authUser.updateProfile( {
      displayName:usernameState,
    })
  }


} else {
  setUser(null)

}

})

return () => {

}

},[user, usernameState])

useEffect(()=> {

console.log(db.collection('posts'))



db.collection('posts').orderBy('timestamp', 'asc').onSnapshot(snapshot => {

setPosts(snapshot.docs.map(doc => ({

  id: doc.id,
  post: doc.data()
})));
  
  })
console.log(posts)


}, []) 


const signUp = (event) => {

  

  event.preventDefault();


  auth.createUserWithEmailAndPassword( email, password)


  setUsernameState(usernameState)
  setCurrentUsernameValue(usernameState)


  .then((authUser) => {




    return authUser.user.updateProfile({
      displayName: usernameState,
    }).then(console.log(authUser.user.displayName))
  })
  .catch((error) => alert(error.message))

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
console.log(user) 
  }


  else {

console.log("problem, firebase.auth must wait until certain change")
  }});
}














  return (
    <div className="App">






    
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


