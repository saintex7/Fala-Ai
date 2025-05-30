function postComment(chave) {
  const name = document.getElementById('name').value;
  const msg = document.getElementById('message').value;
  const file = document.getElementById('fileUpload').files[0];

  if (!name || !msg) return alert("Preencha todos os campos!");

  const reader = new FileReader();
  reader.onloadend = function () {
    const imageData = file ? reader.result : null;
    const comment = { name, msg, imageData };
    let comments = JSON.parse(localStorage.getItem('comments_' + chave) || '[]');
    comments.push(comment);
    localStorage.setItem('comments_' + chave, JSON.stringify(comments));
    document.getElementById('name').value = '';
    document.getElementById('message').value = '';
    document.getElementById('fileUpload').value = '';
    renderComments(chave);
  };
  if (file) reader.readAsDataURL(file);
  else reader.onloadend();
}

function renderComments(chave) {
  const chatBox = document.getElementById('chatBox');
  const comments = JSON.parse(localStorage.getItem('comments_' + chave) || '[]');
  chatBox.innerHTML = '<h4>Comentários:</h4>';
  comments.forEach(c => {
    let html = `<div class='msg'><span>${c.name}:</span> ${c.msg}`;
    if (c.imageData) {
      html += `<br><img src="${c.imageData}" style="max-width: 100%; border-radius: 8px; margin-top: 10px;">`;
    }
    html += `</div>`;
    chatBox.innerHTML += html;
  });
}
