//Show Blog content
const expandPostHandler = async (event) => {
  const card = event.target.closest('.card');
  const dataId = card.getAttribute('data-id');

  const cardBody = document.getElementById(`post-card-body-${dataId}`);
  const author = document.getElementById(`post-card-author-${dataId}`);

  cardBody.classList.toggle('hidden-light');
  author.classList.toggle('hidden-light');
};

//Add comment
const addCommentHandler = async (event) => {
  event.preventDefault();
  const dataId = event.target.getAttribute('data-id');
  const content = document.getElementById(`add-comment-content-${dataId}`).value.trim();
  const response = await fetch(`/api/posts/comment/${dataId}`, {
    method: 'POST',
    body: JSON.stringify({ content }),
    headers: { 'Content-Type': 'application/json' },
  });
  if (response.redirected) {
    document.location.replace('/login');
  } else {
    if (response.ok) {
      location.reload();
    } else {
      const json = await response.json();
      showErrorMessage(json.message);
    }
  }
}

//Delete comment 
const deleteCommentHandler = async (event) => {
  event.preventDefault();
    const dataId = event.target.getAttribute('data-id');
    const response = await fetch(`/api/posts/comment/${dataId}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });
  
    if (response.redirected) {
      document.location.replace('/login');
    } else {
      if (response.ok) {
        location.reload();
      } else {
        const json = await response.json();
        showErrorMessage(json.message);
      }
    }
}

// Event listener for deleting comments
const deleteCommentButtons = document.querySelectorAll('.delete-comment-button');
deleteCommentButtons.forEach(deleteCommentButton => {
  deleteCommentButton.addEventListener('click', deleteCommentHandler);
})

// Event listener for clicking on posts to edit
const expandableCards = document.querySelectorAll('.expandable');
expandableCards.forEach(expandableCard => {
  expandableCard.addEventListener('click', expandPostHandler);
})

// Event listener for commenting on post
const addCommentButtons = document.querySelectorAll('.add-comment-button');
addCommentButtons.forEach(addCommentButton => {
  addCommentButton.addEventListener('click', addCommentHandler);
})