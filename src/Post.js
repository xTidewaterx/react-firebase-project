import Avatar from '@mui/material/Avatar';
import { useEffect, useId, useState } from 'react';
import { db } from './firebase';
import firebase, { Unsubscribe } from 'firebase';
import { Button } from '@mui/material';
import { firestore } from 'firebase';
import { display } from '@mui/system';




function Post({username, caption, imageUrl, postId, currentUser}) {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');
  const [reply, setReply] = useState('');
  const [replies, setReplies] = useState([])
  const [commentRepliesState, setCommentRepliesState] = useState([])
  const [replyId, setReplyId] = useState(null);
  //create post id
  //specific post id, every document has internally have collection id




useEffect(() => {
let unsubscribe;

  if(postId){
    //deep into collection and onwards
    //posts collection . then postid, then comments collection on that postid, and certain

 unsubscribe = db
    .collection("posts")
    .doc(postId)
    .collection("comments")
    .orderBy('timestamp', 'asc')
    .onSnapshot((snapshot) => {
      console.log(snapshot.docs)
      setComments(snapshot.docs.map((doc) => doc.data())); //if new comment we iterate through any new
    }); //we listen, nested listener, we listen to exact change of postid current nest ed specific 
    
  }

  return () => {
 
  }
}, [postId]); //change of postId update, on each submit i guess, psotid relevant in contact



//useeffect to monitor changes of postid, any new ids in database

useEffect(() => {
  let unsubscribe2;
  
    if(postId){
      //deep into collection and onwards
      //posts collection . then postid, then comments collection on that postid, and certain
  
   unsubscribe2 = db
      .collection("posts")
      .doc(postId)
      .collection("comments")
 
      .orderBy('timestamp', 'asc')
      .onSnapshot((snapshot) => {
        console.log(snapshot.docs)
        setReplies(snapshot.docs.map((doc) => doc.data())); //if new comment we iterate through any new
      }); //we listen, nested listener, we listen to exact change of postid current nest ed specific 
      
    }
  
    return () => {
   
    }
  }, [postId]); //change of postId update, on each submit i guess, psotid relevant in contact
  
  






















const postComment = (event) => {
  event.preventDefault();


console.log("postcomment")

console.log("postcomment")



console.log("postcomment")



console.log("postcomment")



console.log("postcomment")



console.log("postcomment")



console.log("postcomment")










  console.log(db.collection("posts").doc(postId).collection("comments").doc().id) //unique id from the documentreference unique on array


  console.log(db.collection("posts").doc(postId).collection("comments").doc()) //unique id from the documentreference unique on array



  console.log(db.collection("posts").doc(postId).collection("comments")) //unique id from the documentreference unique on array

  //long row of accesspoints, we have db link, then collection firebase directory link and renderedpostId
  db.collection("posts").doc(postId).collection("comments").add({
   
    text: comment,
    username: username,
    //commentId:  db.collection("posts").doc(postId).collection("comments").documentID,

  
  })
  .then(
    
    //    docRef => {console.log(docRef.id)}) 
    
    docRef => {console.log(docRef.id)
    //we now have value secure
    
    db.collection("posts").doc(postId).collection("comments").doc(docRef.id).update({
      text: comment,
      username: username,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      replies: [],
      commentId: docRef.id,}) 
      
      //commentId:  db.collection("posts").doc(postId).collection("comments").documentID,
  
    
    })//question, thos this exist anywhere::  iSzOGGj8cajry3ahV9B5, is this a comment id on post aaaaaa
//here we have the value of our comment id, comment id allows us to direct an array at a specific comment
//with specific id on comment
//our comments have an idall comments must relu on sepcific id 

//after promise resolved, in a cosmic divide , overwrite 
.then (console.log("hhhhhhhhhhhhhhhhhhhhhhhh")
)

}



useEffect(()=> {

  //atually, perhaphs state that changes is an array of all values we need, an array with text, username, and  all relevant
  //including our vital comments id to direct our new inputs, we have many values, different palces, for our entire 
  //our entire data update, we direct our values with the commentId, our values are the current values, with a change of the replies array in the comments id sepcific path array, comments is a collection with an array to update replies

if(replyId != null) {

  let currentArray = [];

console.log(replyId)
  currentArray = replyId[0].repliesArray; //when is repliesArray updated, this must be corre ct before we submit, we submit to the correct palce


  currentArray.push({"replyText": reply, "replyUsername": username})
   
  //db.collection("posts").doc(postId).collection("comments").doc(docRef.id).update({
    db.collection("posts").doc(postId).collection("comments").doc(replyId[0].replyId).update({
    text: replyId[0].currentText,
    username: username,
    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    replies:currentArray,
    commentId: replyId[0].replyId, 
    
})
  //all current values::
  //get all current values from comment id


  //db.collection("posts").doc(postId).collection("comments").doc("zBlP2PeW8brxbYEJN5wn").update({
}

  }, [replyId] )







const postReply = (event, param) => {
  event.preventDefault();

console.log(comments)

console.log(event)

//const res = await db.collection('posts').doc('comments').set(data);


//commentReplies.push({"replyusername": "Radical user", "replytext": "note:replyttext"})

//setCommentRepliesState(commentReplies)


  console.log(postId)
  //new postid, has to be commentid on event we have a 

  //long row of accesspoints, we have db link, then collection firebase directory link and renderedpostId
  db.collection("posts").doc(postId).collection("comments").doc("zBlP2PeW8brxbYEJN5wn").update({
    
    //now all is good, we must have the id iteration of dynamic within replying we will have value from area
    //comment id from area, and then keep values otherwise 


    text: "comments.text",
replies: [{"replyusername": "Radical user", "replytext": "note:replyttextttt"}]
  
  })



}











//const certainTarget = FirebaseFirestore.instance.collection("posts").where("reply")

console.log(comments)
const getRepliesWithinSpecificComment = db.collection('posts').doc(postId).collection("comments").doc(postId).collection("replies");

console.log(getRepliesWithinSpecificComment)


//we must find the entry into the db collection db link
comments.map((item) => {

  console.log(item.text)
  console.log(item.replies)

})















    return (
<div className='post'>
        <div className="post__header">
        <Avatar
        className="post__avatar"
        alt='Joj-yo'
        src="https://cordis.europa.eu/docs/news/images/2022-08/442056.jpg" />
      <h4>{username}</h4>
</div>

      
    
  <img className="post__image" src={imageUrl}></img>

   <h4 className='post__text'><strong>{username}</strong><p className='post__comment'>{caption}</p></h4>

<div className='post__comments'>

  {comments.map((comment, id) => (
    <div className='post__comments'>
    <div className='post__parentComment'>
    <p>
      <b>{comment.username}</b>{comment.text}
    </p>
</div>
{console.log(id)}


{  comment.replies.map((reply) => {

 return  <div className='post__replies'><b>{reply.replyUsername}</b>{reply.replyText}</div>


  })}
  
   
  <input 
     className='post__replyInput'

     type="text"
     placeholder='Reply...'
     //value={reply}
     onFocus={comment}
     onChange={(e) => {setReply(e.target.value)}}

    /> 
    <div className='post__replies' style={{display: "inline"}}><Button onClick={() => setReplyId([{"replyId": comment.commentId, "currentText": comment.text, "repliesArray": comment.replies} ])}>Reply</Button> </div>
    </div>
  ))}
</div>


<form className='post__commentBox'> 
<input
  className="post__input"
  type="text"
  placeholder="Add a Comment..."
  onFocus={comment}
  onBlur="Add a comment..."
 // value={comment}
  onChange={(e) => setComment(e.target.value)}
/>
</form>


<Button
className="post__button"
disabled={!comments}
type="submit"
onClick={postComment}


>Post</Button>

</div>
        
    )
}


export default Post





//total creation of pre updated stte:: <Button onClick={() => {setCommentRepliesState([{"text": comment.text, "username": comment.username, "commentId": comment.id}])}}>Reply here</Button> 


//<Button onClick={() => {setCommentRepliesState([{"text": comment.text, "username": comment.username, "commentId": comment.id}])}}>Reply here</Button>