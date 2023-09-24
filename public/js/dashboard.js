const createPostHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#post-title').value.trim();
    const content = document.querySelector('#post-content').value.trim();

    const response = await fetch('/api/posts/create', {
      method: 'POST',
      body: JSON.stringify({title, content }),
      headers: { 'Content-Type': 'application/json' },
    });
  
    if (response.ok) {
      location.reload();
    } else {
        const json = await response.json();
        showErrorMessage(json.message)
    }
  };

  const addPostHandler = async (event) => {
    const formDiv = document.getElementById('add-post-form')
    formDiv.classList.remove('hidden')
    event.target.classList.add('hidden')
  };
  
  const showEditPostHandler = async (event) => {
    const card = event.target.closest('.card');
    const dataId = card.getAttribute('data-id');
    
    const titleEl = document.querySelector(`#user-post-title-${dataId}`)
    titleEl.contentEditable = true;
    titleEl.classList.add('editing');
    const contentEl = document.querySelector(`#user-post-content-${dataId}`)
    contentEl.contentEditable = true;
    contentEl.classList.add('editing');

    const footerEl = document.querySelector(`#user-post-footer-${dataId}`);
    footerEl.classList.remove('hidden');
  };

  const saveEditPostHandler = async (event) => {
    event.preventDefault();
    const dataId = event.target.getAttribute('data-id');
    const title = document.getElementById(`user-post-title-${dataId}`).textContent.trim();
    const content = document.getElementById(`user-post-content-${dataId}`).textContent.trim();

    console.log(dataId)

    console.log(title)
    console.log(content)
    const response = await fetch(`/api/posts/update/${dataId}`, {
      method: 'PUT',
      body: JSON.stringify({title, content }),
      headers: { 'Content-Type': 'application/json' },
    });
  
    if (response.ok) {
      location.reload();
    } else {
        const json = await response.json();
        showErrorMessage(json.message)
    }
  }
  
  const cancelEditPostHandler = async (event) => {
    event.stopPropagation();
    const dataId = event.target.getAttribute('data-id');
    
    const titleEl = document.querySelector(`#user-post-title-${dataId}`)
    titleEl.contentEditable = false;
    titleEl.classList.remove('editing');
    const contentEl = document.querySelector(`#user-post-content-${dataId}`)
    contentEl.contentEditable = false;
    contentEl.classList.remove('editing');

    const footerEl = document.querySelector(`#user-post-footer-${dataId}`);
    footerEl.classList.add('hidden');
    console.log('cancelling',dataId)
  };

  // Add event listener for clicking on posts to edit
  const editableCards = document.querySelectorAll('.editable');

  editableCards.forEach(editableCard => {
    editableCard.addEventListener('click', showEditPostHandler);
  })

  // Add event listener for saving post edits
  const updateButtons = document.querySelectorAll('.user-post-save');

  updateButtons.forEach(updateButton => {
    updateButton.addEventListener('click', saveEditPostHandler);
  })

  // Add event listener for cancelling post edits
  const cancelButtons = document.querySelectorAll('.user-post-cancel');

  cancelButtons.forEach(cancelButton => {
    cancelButton.addEventListener('click', cancelEditPostHandler);
  })

  // Event listener to reveal new post form
  document.querySelector('#create-post').addEventListener('click', createPostHandler);
  // Event listener for saving new post
  document.querySelector('#add-post').addEventListener('click', addPostHandler);