import consumer from "channels/consumer"

if(location.pathname.match(/\/places\/\d/)){

  consumer.subscriptions.create({
    channel: "CommentChannel",
    place_id: location.pathname.match(/\d+/)[0]
  }, {
    connected() {
      // Called when the subscription is ready for use on the server
    },

    disconnected() {
      // Called when the subscription has been terminated by the server
    },

    received(data) {
      const html = `
         <div class="comment">
          <div class="comment-left">
            <div class="comment-showtext">
              ${data.comment.text.replace(/\n/g, "<br>")}
            </div>
          </div>
          <div class="comment-right">
            <div class="user-info">
              ${data.user.nickname}
            </div>
            <div class="comment-time">
              ${jstDate}
            </div>
          </div>
        </div>`
      const comments = document.getElementById("comments")
      comments.insertAdjacentHTML('beforeend', html)
      const commentForm = document.getElementById("comment-form")
      commentForm.reset();
    }
 });
}



document.addEventListener('DOMContentLoaded', (event) => {
  const textArea = document.querySelector('.comment-text');

  textArea.addEventListener('input', autoResize);
  autoResize.call(textArea); // 初期の高さ設定

  function autoResize() {
    this.style.height = 'auto'; // 高さをリセット
    this.style.height = (this.scrollHeight) + 'px'; // scrollHeight を基に高さを再計算
  }
});

