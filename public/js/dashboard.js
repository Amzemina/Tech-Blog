//Save new user blog post
const saveNewPostHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#post-title').value.trim();
    const content = document.querySelector('#post-content').value.trim();

    const response = await fetch('/api/posts/create', {
      method: 'POST',
      body: JSON.stringify({title, content }),
      headers: { 'Content-Type': 'application/json' },
    });
  
    if (response.redirected) {
      document.location.replace(response.url);
    } else {
      if (response.ok) {
        location.reload();
      } else {
        const json = await response.json();
        showErrorMessage(json.message);
      }
    }
  };

 //and new blog post form show and hide
  const addPostHandler = async (event) => {
    const formDiv = document.getElementById('add-post-form')
    formDiv.classList.remove('hidden')
    event.target.classList.add('hidden')
  };
  
  //shows which post is being edited
  const showEditPostHandler = async (event) => {
    const card = event.target.closest('.card');
    const dataId = card.getAttribute('data-id');
    if (isAlreadyEditing > -1 && isAlreadyEditing !== dataId) {
        showErrorMessage('You can only edit one post at a time');
    } else if (isAlreadyEditing > -1 && isAlreadyEditing === dataId) {
        return;
    } else {
        isAlreadyEditing = dataId;
        
        const titleEl = document.querySelector(`#user-post-title-${dataId}`)
        titleEl.contentEditable = true;
        card.classList.add('editing');
        const contentEl = document.querySelector(`#user-post-content-${dataId}`)
        contentEl.contentEditable = true;

        const footerEl = document.querySelector(`#user-post-footer-${dataId}`);
        footerEl.classList.remove('hidden');
    }
  };

  //save update post
  const saveEditPostHandler = async (event) => {
    event.preventDefault();
    const dataId = event.target.getAttribute('data-id');
    const title = document.getElementById(`user-post-title-${dataId}`).textContent.trim();
    const content = document.getElementById(`user-post-content-${dataId}`).textContent.trim();
    const response = await fetch(`/api/posts/update/${dataId}`, {
        method: 'PUT',
        body: JSON.stringify({title, content }),
        headers: { 'Content-Type': 'application/json' },
    });
    
    if (response.redirected) {
      document.location.replace(response.url);
    } else {
      if (response.ok) {
        location.reload();
      } else {
        const json = await response.json();
        showErrorMessage(json.message);
      }
    }
  }
  
  //cancel update post
  const cancelEditPostHandler = async (event) => {
    event.stopPropagation();
    document.location.reload();
  };
  
  //cancel new user blog post
  const cancelNewPostHandler = async (event) => {
    event.stopPropagation();
    document.location.reload();
  };

  //delete user blog post
  const deletePostHandler = async (event) => {
    event.preventDefault();
    const dataId = event.target.getAttribute('data-id');
    const response = await fetch(`/api/posts/delete/${dataId}`, {
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

  //variable to only edit one post at a time
  let isAlreadyEditing = -1;

  // Event listener for clicking on posts to edit
  const editableCards = document.querySelectorAll('.editable');

  editableCards.forEach(editableCard => {
    editableCard.addEventListener('click', showEditPostHandler);
  })

  // Event listener for saving post edits
  const updateButtons = document.querySelectorAll('.user-post-save');

  updateButtons.forEach(updateButton => {
    updateButton.addEventListener('click', saveEditPostHandler);
  })

  // Event listener for cancelling post edits
  const cancelButtons = document.querySelectorAll('.user-post-cancel');

  cancelButtons.forEach(cancelButton => {
    cancelButton.addEventListener('click', cancelEditPostHandler);
  })

  // Event listener for deleting posts
  const deleteButtons = document.querySelectorAll('.user-post-delete');

  deleteButtons.forEach(deleteButton => {
    deleteButton.addEventListener('click', deletePostHandler);
  })

  // Event listener to reveal new post form
  document.querySelector('#new-post-save').addEventListener('click', saveNewPostHandler);
  // Event listener to reveal new post form
  document.querySelector('#new-post-cancel').addEventListener('click', cancelNewPostHandler);
  // Event listener for saving new post
  document.querySelector('#add-post').addEventListener('click', addPostHandler);