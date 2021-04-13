import { Button, ButtonGroup, Input } from '@material-ui/core';
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addImageToOrderSaga } from '../../redux/actionCreators/orderAC';
import firebase from './firebase'
import SaveIcon from '@material-ui/icons/Save';


export function Storage({ id }) {

  const [file, setFile] = useState({});

  const dispatch = useDispatch();
  
  const handleChange = (e) => {
    setFile(e.target.files[0]);
  }

  const handleSave = () => {
    if (file.name) {
      const storageRef = firebase.storage().ref();

      console.log(file)

      var metadata = {
        contentType: file.type
      };

      var uploadTask = storageRef.child('images/' + file.name).put(file, metadata);

      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
        (snapshot) => {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
              console.log('Upload is paused');
              break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
              console.log('Upload is running');
              break;
          }
        },
        (error) => {
          // A full list of error codes is available at
          // https://firebase.google.com/docs/storage/web/handle-errors
          switch (error.code) {
            case 'storage/unauthorized':
              // User doesn't have permission to access the object
              break;
            case 'storage/canceled':
              // User canceled the upload
              break;

            // ...

            case 'storage/unknown':
              // Unknown error occurred, inspect error.serverResponse
              break;
          }
        },
        () => {
          // Upload completed successfully, now we can get the download URL
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            console.log('File available at', downloadURL);
            dispatch(addImageToOrderSaga(downloadURL, file.name, id))
          });
        }
      );
      setFile({})

    }
  }
  // const showImage = () => {
  //   let storageRef = firebase.storage().ref()
  //   let spaceRef = storageRef.child('images/' + file.name)
  //   storageRef.child('images/' + file.name).getDownloadURL().then((url) => {
  //   })
  // }

  return (
    <div>
     
      <ButtonGroup>
        <Input type="file" onChange={(e) => handleChange(e)} />
        <Button color="inherit" startIcon={<SaveIcon />} onClick={handleSave}>Сохранить</Button>
      </ButtonGroup>
   
    </div>
  )

}

export default Storage
