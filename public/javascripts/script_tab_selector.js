// script_posts.js
// This script handles the tab functionality for the posts page.

document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.tab');
    const contentArea = document.getElementById('tab-content');

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const tab = button.dataset.tab;
            console.log(`Loading content for tab: ${tab}`);

            fetch(`/profile/partials/${tab}`)
                .then(response => response.text())
                .then(html => {
                    document.getElementById('tab-content').innerHTML = html;
                })

                .catch(err => {
                    contentArea.innerHTML = `<p>Error loading content: ${err}</p>`;
                });
        });
    });

    //Add event to the like, comment and share buttons
    const likeButtons = document.querySelectorAll('.like-btn');
    const commentButtons = document.querySelectorAll('.comment-btn');
    const shareButtons = document.querySelectorAll('.share-btn');

    likeButtons.forEach(button => {

    })
});

//get the event for the follow button
async function followUser(userId) {
    try {
        const res = await fetch(`/follow/${userId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (res.ok) {
            alert('Followed successfully!');
        } else {
            alert('Something went wrong');
        }
    } catch (err) {
        console.error(err);
    }
}

