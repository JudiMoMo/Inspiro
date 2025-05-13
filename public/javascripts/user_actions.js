document.addEventListener('DOMContentLoaded', () => {

    //Add event to the like, comment and share buttons
    const likeButtons = document.querySelectorAll('.like-btn');
    const commentButtons = document.querySelectorAll('.comment-btn');
    const shareButtons = document.querySelectorAll('.share-btn');

    likeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const postId = button.dataset.postId;
            const isLiked = button.classList.contains('liked');

            const url = isLiked ? `/posts/${postId}/unlike` : `/posts/${postId}/like`;
            const method = isLiked ? 'DELETE' : 'POST';

            fetch(url, { method: method })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        // Toggle like state visually
                        button.classList.toggle('liked');
                        // Optional: update icon (assuming a <i> inside the button)
                        const icon = button.querySelector('i');
                        if (icon) {
                            icon.classList.toggle('fas'); // Toggle the 'fas' class separately
                            icon.classList.toggle('far'); // Ensure 'far' is also toggled (outline)
                        }

                    } else {
                        alert(data.message || 'Error toggling like.');
                    }
                })
                .catch(err => console.error(err));
        });
    });

});