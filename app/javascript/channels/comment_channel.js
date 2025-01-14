import consumer from "./consumer";
import { formatTime } from "timediff";

document.addEventListener("turbo:load", function () {
  console.log("JavaScript is loaded");
  initializeCommentForm();
});

// グローバル変数でサブスクリプションを保持
let commentChannel;

function initializeCommentForm() {
  console.log("Initializing comment form");

  // 新しいルーティングパスに対応する正規表現
  const pathMatch = location.pathname.match(/\/rooms\/(\d+)\/places\/(\d+)/);

  if (pathMatch) {
    const roomId = pathMatch[1];
    const placeId = pathMatch[2];

    // 既存のサブスクリプションを解除
    if (commentChannel) {
      commentChannel.unsubscribe();
    }

    // 新しいサブスクリプションを作成
    commentChannel = consumer.subscriptions.create({
      channel: "CommentChannel",
      room_id: roomId,  // 新しいルーティングに合わせてroom_idを追加
      place_id: placeId
    }, {

      connected() {
        // Called when the subscription is ready for use on the server
      },

      disconnected() {
        // Called when the subscription has been terminated by the server
      },

      received(data) {
        const timeString = formatTime(data.comment.created_at);

        const html = `
            <div class="comment">
              <div class="comment-left">
                <div class="comment-text">
                  <p>${data.comment.text}</p>
                </div>
              </div>
              <div class="comment-right">
                <div class="comment-user">
                  <p>${data.user.nickname}</p>
                </div>
                <div class="comment-timestamp">
                  <p>${timeString}</p>
                </div>
              </div>
            </div>`;
        const comments = document.getElementById("comments");
        comments.insertAdjacentHTML('beforeend', html);
        const commentForm = document.getElementById("comment-form");
        commentForm.reset();
      }
    });
  }
}


// document.addEventListener('DOMContentLoaded', (event) => {
//   const textArea = document.querySelector('.comment-text');

//   textArea.addEventListener('input', autoResize);
//   autoResize.call(textArea); // 初期の高さ設定

//   function autoResize() {
//     this.style.height = 'auto'; // 高さをリセット
//     this.style.height = (this.scrollHeight) + 'px'; // scrollHeight を基に高さを再計算
//   }
// });