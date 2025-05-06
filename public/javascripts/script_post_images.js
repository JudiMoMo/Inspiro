const input = document.getElementById('image');
const previewContainer = document.getElementById('previewContainer');

input.addEventListener('change', () => {
  previewContainer.innerHTML = ''; // Clear previous previews

  const files = input.files;

  if (files.length > 3) {
    alert('You can upload a maximum of 3 images.');
    input.value = '';
    return;
  }

  Array.from(files).forEach(file => {
    const reader = new FileReader();
    reader.onload = function(e) {
      const img = document.createElement('img');
      img.src = e.target.result;
      img.classList.add('preview-img');
      previewContainer.appendChild(img);
    };
    reader.readAsDataURL(file);
  });
});