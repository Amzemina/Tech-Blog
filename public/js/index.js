async function fetchPosts() {
   const response = await fetch(`/api/posts/posts`);
   const data = await response.json();
   
   const postContainer = document.querySelector('#post-container');
   
   data.forEach(post => {
    const postElement = document.createElement(`div`)
    postElement.id = `post-${post.id}`
    postElement.textContent = post.title
    postContainer.appendChild(postElement);
   })
}

fetchPosts();