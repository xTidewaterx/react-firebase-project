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



useEffect(() => {
let unsubscribe;

  if(postId){

 unsubscribe = db
    .collection("posts")
    .doc(postId)
    .collection("comments")
    .orderBy('timestamp', 'asc')
    .onSnapshot((snapshot) => {
      console.log(snapshot.docs)
      setComments(snapshot.docs.map((doc) => doc.data())); //if new comment we iterate through any new
    }); 
    
  }

  return () => {
 
  }
}, [postId]); 



useEffect(() => {
  let unsubscribe2;
  
    if(postId){
   
   unsubscribe2 = db
      .collection("posts")
      .doc(postId)
      .collection("comments")
 
      .orderBy('timestamp', 'asc')
      .onSnapshot((snapshot) => {
        console.log(snapshot.docs)
        setReplies(snapshot.docs.map((doc) => doc.data())); 
      }); 
    }
  
    return () => {
   
    }
  }, [postId]); 
  
  






const postComment = (event) => {
  event.preventDefault();




  //long row of accesspoints, we have db link, then collection firebase directory link and renderedpostId
  db.collection("posts").doc(postId).collection("comments").add({
   
    text: comment,
    username: username,
    //commentId:  db.collection("posts").doc(postId).collection("comments").documentID,

  
  })
  .then(

    
    docRef => {console.log(docRef.id)
    //we now have value secure
    
    db.collection("posts").doc(postId).collection("comments").doc(docRef.id).update({
      text: comment,
      username: username,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      replies: [],
      commentId: docRef.id,}) 
      
      //commentId:  db.collection("posts").doc(postId).collection("comments").documentID,
  
    
    })


}



useEffect(()=> {

 

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

}

  }, [replyId] )


















console.log(comments)
const getRepliesWithinSpecificComment = db.collection('posts').doc(postId).collection("comments").doc(postId).collection("replies");

console.log(getRepliesWithinSpecificComment)


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





