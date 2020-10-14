const videoElement = document.getElementById('video');
const button = document.getElementById('button');
const selectScreenButton = document.getElementById('select-screen-button');
const buttonContainer = document.getElementById('button-container');
/* 
capturing screen content using screen capture API.
getDisplayMedia() will allow method prompts the user to select and grant permission to 
capture the contents of a display or portion thereof(such as a window) as a MediaStream 
*/
async function screenCapture() {
  try {
    const mediaStream = await navigator.mediaDevices.getDisplayMedia();
    videoElement.srcObject = mediaStream;
    videoElement.onloadedmetadata = () => {
      videoElement.play();
    }
    buttonContainer.hidden = false;
    buttonContainer.style.marginRight = "30px";
  }
  catch (error) {
  }
}

button.addEventListener('click', async () => {
  if (document.pictureInPictureElement) {
    document
      .exitPictureInPicture()
      .catch(error => {
        // Error handling
      })
  } else {
    // Request Picture-in-Picture
    await videoElement.requestPictureInPicture();
    button.disabled = false;
  }
})

videoElement.addEventListener('enterpictureinpicture', () => {
  button.textContent = "Exit PIP mode";
});

videoElement.addEventListener('leavepictureinpicture', () => {
  button.textContent = "Enter PIP Mode";
});

selectScreenButton.addEventListener('click', () => screenCapture());
