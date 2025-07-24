let videoElement = document.createElement('video');
videoElement.crossOrigin = "anonymous";

function extractFrames() {
  const file = document.getElementById('videoInput').files[0];
  if (!file) return alert('Please select a video.');

  const url = URL.createObjectURL(file);
  videoElement.src = url;
  videoElement.load();

  videoElement.onloadedmetadata = async () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const framesContainer = document.getElementById('frames');
    framesContainer.innerHTML = '';

    canvas.width = videoElement.videoWidth;
    canvas.height = videoElement.videoHeight;

    const duration = videoElement.duration;
    const frameRate = 1; // extract 1 frame per second
    const totalFrames = Math.floor(duration * frameRate);

    for (let i = 0; i < totalFrames; i++) {
      videoElement.currentTime = i / frameRate;

      await new Promise(resolve => {
        videoElement.onseeked = () => {
          ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
          const imageDataUrl = canvas.toDataURL("image/jpeg");

          // Display
          const img = new Image();
          img.src = imageDataUrl;
          img.width = 320;

          // Download button
          const downloadBtn = document.createElement('a');
          downloadBtn.href = imageDataUrl;
          downloadBtn.download = `frame_${i + 1}.jpg`;
          downloadBtn.textContent = 'Download Frame';
          downloadBtn.style.display = 'block';

          const wrapper = document.createElement('div');
          wrapper.appendChild(img);
          wrapper.appendChild(downloadBtn);

          framesContainer.appendChild(wrapper);
          resolve();
        };
      });
    }
  };
}
