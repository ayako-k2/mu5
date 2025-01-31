document.addEventListener('turbo:load', function () {

  const postForm = document.getElementById('avatar');

  const previewList = document.getElementById('previews');

  if (!postForm) return null;

  const fileField = document.querySelector('input[type="file"][id="avatar"]');

  fileField.addEventListener('change', function (e) {

    // 古いプレビューが存在する場合は削除
    const alreadyPreview = document.querySelector('.preview');
    if (alreadyPreview) {
      alreadyPreview.remove();
    };

    const file = e.target.files[0];
    const blob = window.URL.createObjectURL(file);

     // 画像を表示するためのdiv要素を生成
     const previewWrapper = document.createElement('div');
     previewWrapper.setAttribute('class', 'preview');
 
     // 表示する画像を生成
     const previewImage = document.createElement('img');
     previewImage.setAttribute('class', 'preview-image');
     previewImage.setAttribute('src', blob);

     previewImage.style.width = '100px';
    previewImage.style.height = '100px';
    previewImage.style.objectFit = 'cover';
    previewImage.style.borderRadius = '50%';

     // 生成したHTMLの要素をブラウザに表示させる
    previewWrapper.appendChild(previewImage);
    previewList.appendChild(previewWrapper);
      });
});