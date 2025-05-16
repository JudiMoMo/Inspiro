document.addEventListener('DOMContentLoaded', () => {

    //Add event to the like, comment and share buttons
    const likeButtons = document.querySelectorAll('.like-btn');

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
                        // ✅ THIS is where you put the toggle logic
                        button.classList.toggle('liked');
                        const icon = button.querySelector('i');
                        if (icon) {
                            if (button.classList.contains('liked')) {
                                icon.classList.remove('far');
                                icon.classList.add('fas');
                            } else {
                                icon.classList.remove('fas');
                                icon.classList.add('far');
                            }
                        }

                    } else {
                        alert(data.message || 'Error toggling like.');
                    }
                })
                .catch(err => console.error(err));
        });

    });
});

function toggleFollow(userId, followUserId) {
    const button = document.getElementById(`follow-btn-${userId}`);
    const isFollowing = button.getAttribute('data-following') === 'true';

    const url = isFollowing
        ? `/user/${userId}/unfollow`
        : `/user/${userId}/follow`;
    const method = isFollowing ? 'DELETE' : 'POST';
    fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId, followUserId })
    })
        .then(response => response.json())
        .then(data => {
            if (isFollowing) {
                button.querySelector('span').innerText = 'Follow';
                button.setAttribute('data-following', 'false');
            } else {
                button.querySelector('span').innerText = 'Unfollow';
                button.setAttribute('data-following', 'true');
            }
            console.log(data.message);
        })
        .catch(error => console.error('Error:', error));
}
