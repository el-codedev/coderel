// Wait for the HTML to be fully loaded before running scripts that interact with the DOM
document.addEventListener('DOMContentLoaded', function() {

  // Set the current year in the footer
  const yearSpan = document.getElementById('currentYear');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  } else {
    console.error('Error: Element with ID "currentYear" not found in the HTML.');
  }

  // Video error handling
  const fullVideo = document.getElementById('fullVideo');
  if (fullVideo) {
    fullVideo.addEventListener('error', function(e) {
      console.error('Video Error:', e);
      // Consider a less intrusive notification than alert, or just log for debugging.
      // alert('There was a problem playing this video. The format may not be supported.');
    });
  }
});

// These functions need to be globally accessible if called directly from HTML onclick attributes
function showLargeImage(imgElement, mediaSrc) {
  const overlay = document.getElementById('imageOverlay');
  const fullImage = document.getElementById('fullImage');
  const fullVideo = document.getElementById('fullVideo');

  // Defensive checks: Ensure modal elements exist
  if (!overlay || !fullImage || !fullVideo) {
    console.error('Modal elements (imageOverlay, fullImage, or fullVideo) not found!');
    return; // Stop if essential elements are missing
  }

  const isVideo = /\.(mp4|webm|ogg|mov|avi)$/i.test(mediaSrc);

  // Hide and reset both media elements
  fullImage.style.display = 'none';
  fullImage.src = '';
  fullVideo.style.display = 'none';
  if (typeof fullVideo.pause === 'function') {
    fullVideo.pause(); // Ensure pause is a function before calling
  }
  fullVideo.src = '';
  fullVideo.removeAttribute('autoplay'); // Explicitly remove autoplay before setting new src

  if (isVideo) {
    fullVideo.src = mediaSrc;
    fullVideo.style.display = 'block';
    fullVideo.controls = true; // Always show controls for accessibility
    // Autoplay for videos is often blocked by browsers if not muted or without prior user interaction.
    // Forcing muted autoplay is more reliable:
    // fullVideo.muted = true;
    // fullVideo.play().catch(err => {
    //   console.warn('Autoplay for video was blocked or failed:', err);
    //   // Ensure controls are visible if autoplay fails
    //   fullVideo.controls = true;
    // });
    // If you want sound, it's often better to let the user click play via controls.
  } else {
    fullImage.src = mediaSrc;
    fullImage.style.display = 'block';
  }
  overlay.style.display = 'flex'; // Show the overlay
}

function closeImage(event) {
  const overlay = document.getElementById('imageOverlay');

  if (!overlay) {
    console.error('Overlay element not found for closing!');
    return;
  }

  // Only close if clicking directly on the overlay background
  // (event.target is the element that was clicked)
  if (event.target === overlay) {
    const fullImage = document.getElementById('fullImage');
    const fullVideo = document.getElementById('fullVideo');

    overlay.style.display = 'none'; // Hide the overlay

    if (fullImage) {
      fullImage.src = '';
      fullImage.style.display = 'none';
    }
    if (fullVideo) {
      if (typeof fullVideo.pause === 'function') {
        fullVideo.pause();
      }
      fullVideo.src = '';
      fullVideo.style.display = 'none';
    }
  }
}