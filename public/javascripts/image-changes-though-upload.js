// Reusable function to handle image preview
function handleImagePreview(inputId, previewId) {
  const fileInput = document.getElementById(inputId);
  const previewImage = document.getElementById(previewId);

  fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
      previewImage.src = URL.createObjectURL(file);
    }
  });
}

// Call the function for profileImage and coverImage
handleImagePreview('profileImage', 'previewProfileImage');
handleImagePreview('coverImage', 'previewCoverImage');
