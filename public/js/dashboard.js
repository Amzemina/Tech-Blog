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
  
  const editPostHandler = async (event) => {
    const card = event.target.closest('.card');
    const dataId = card.getAttribute('data-id');
    
    document.querySelector(`#user-post-title-${dataId}`).contentEditable = true;
    document.querySelector(`#user-post-content-${dataId}`).contentEditable = true;
  };

  const editableCards = document.querySelectorAll('.editable');

  editableCards.forEach(editableCard => {
    editableCard.addEventListener('click', editPostHandler);
  })
  document.querySelector('#create-post').addEventListener('click', createPostHandler);
  document.querySelector('#add-post').addEventListener('click', addPostHandler);