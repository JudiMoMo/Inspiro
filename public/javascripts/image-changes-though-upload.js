// Reusable function to handle image preview
function handleImagePreview(inputId, previewId) {
  const fileInput = document.getElementById(inputId);
  const previewImage = document.getElementById(previewId);

  if (!fileInput || !previewImage) return; // Exit if elements don't exist

  fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
      previewImage.src = URL.createObjectURL(file);
    }
  });
}

// Call the function for both, will only apply if IDs exist
handleImagePreview('profileImage', 'previewProfileImage');
handleImagePreview('coverImage', 'previewCoverImage');
