function createPost() {
  const name = document.getElementById('name').value.trim();
  const content = document.getElementById('content').value.trim();
  const imageInput = document.getElementById('imageUpload');
  if (!name || !content) {
    alert('Preencha seu nome e o conteúdo do post!');
    return;
  }

  const reader = new FileReader();
  reader.onload = function(e) {
    const imageData = e.target.result || null;
    savePost(name, content, imageData);
    document.getElementById('name').value = '';
    document.getElementById('content').value = '';
    imageInput.value = '';
  };

  if (imageInput.files.length > 0) {
    reader.readAsDataURL(imageInput.files[0]);
  } else {
    reader.onload({target: {result: null}});
  }
}

function savePost(name, content, imageData) {
  const posts = JSON.parse(localStorage.getItem('posts') || '[]');
  posts.unshift({ name, content, imageData });
  localStorage.setItem('posts', JSON.stringify(posts));
  renderPosts();
}

function renderPosts() {
  const feed = document.getElementById('feed');
  const posts = JSON.parse(localStorage.getItem('posts') || '[]');
  feed.innerHTML = '';
  posts.forEach(post => {
    const div = document.createElement('div');
    div.classList.add('post');
    div.innerHTML = `
      <div class="post-header">${post.name}</div>
      <div class="post-content">${post.content}</div>
      ${post.imageData ? `<img src="${post.imageData}" alt="Imagem do post">` : ''}
    `;
    feed.appendChild(div);
  });
}

window.onload = function() {
  renderPosts();
};
