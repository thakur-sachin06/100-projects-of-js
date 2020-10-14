const videoElement = document.getElementById('video');
const button = document.getElementById('button');
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
  }
  catch (error) {
  }
}

button.addEventListener('click', async () => {
  button.disabled = true;
  // start PIP.
  await videoElement.requestPictureInPicture();
  button.disabled = false;
})

screenCapture();