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
});

