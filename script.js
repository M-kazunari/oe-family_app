// ==========================================
// 【ログイン画面】Authenticator（認証コンポーネント）
// ==========================================
// 注意: これはESモジュール形式の例です
// import { Amplify } from 'aws-amplify';
// import { getCurrentUser } from 'aws-amplify/auth';
// import outputs from './amplify_outputs.json';

// // AWSの情報を読み込む
// Amplify.configure(outputs);

// // ログインしているかチェックする関数（例）
// async function checkUser() {
//     try {
//         const user = await getCurrentUser();
//         console.log("ログイン中:", user.username);
//     } catch (err) {
//         console.log("ログインしていません。ログイン画面へ誘導します。");
//         // ここでログイン画面を表示する処理を入れます
//     }
// }

// checkUser();

// ==========================================
// 【ハンバーガーメニュー】
// ==========================================
const hamburger = document.getElementById('js-hamburger');
const nav = document.getElementById('js-nav');

hamburger.addEventListener('click', function () {
    hamburger.classList.toggle('is-active');
    nav.classList.toggle('is-active');
});

// ==========================================
// 【ローディング】
// ==========================================
const loading = document.getElementById('js-loading');

window.addEventListener('load', () => {
    setTimeout( () => {
        loading.classList.add('is-loaded');
    },1000);
}); 

// ==========================================
// 【ダイアログ】
// ==========================================
const fabBtn = document.querySelector('.bl_fab'); // 「＋」ボタン
const dialog = document.getElementById('js-add-memo-dialog');
const cancelBtn = document.getElementById('js-cancel-btn');
const saveBtn = document.getElementById('js-save-btn');
const memoGrid = document.querySelector('.bl_memoGrid'); // メモを追加する場所

const inputTitle = document.getElementById('js-input-title');
const inputText = document.getElementById('js-input-text');

// 1. ダイアログを開く
fabBtn.addEventListener('click', () => {
    dialog.showModal(); // モーダルとして表示
});

// 2. ダイアログを閉じる（キャンセル）
cancelBtn.addEventListener('click', () => {
    dialog.close();
    clearInputs(); // 入力欄をクリア
});

// 3. メモを保存して追加する
saveBtn.addEventListener('click', () => {
    const title = inputTitle.value;
    const text = inputText.value;

    // 入力が空の場合はアラートを出して終了
    if (!title || !text) {
        alert('タイトルと内容を入力してください');
        return;
    }

    // 今日の日付を取得 (YYYY.MM.DD形式)
    const now = new Date();
    const dateStr = `${now.getFullYear()}.${String(now.getMonth() + 1).padStart(2, '0')}.${String(now.getDate()).padStart(2, '0')}`;

    // HTML要素を作成して追加
    addMemoCard(title, dateStr, text);

    // ダイアログを閉じてクリア
    dialog.close();
    clearInputs();
});

// 入力欄をクリアする関数
function clearInputs() {
    inputTitle.value = '';
    inputText.value = '';
}

// メモカードをHTMLに追加する関数
function addMemoCard(title, date, text) {
    // article要素を作成
    const article = document.createElement('article');
    article.className = 'bl_memoCard';

    // リンク要素を作成（実際は詳細ページへのリンクですが、今回は#としています）
    const link = document.createElement('a');
    link.href = '#';
    link.className = 'bl_memoCard_link';

    // タイトル
    const h2 = document.createElement('h2');
    h2.className = 'bl_memoCard_title';
    h2.textContent = title;

    // 日付
    const pDate = document.createElement('p');
    pDate.className = 'bl_memoCard_date';
    pDate.textContent = date;

    // 本文
    const pText = document.createElement('p');
    pText.className = 'bl_memoCard_txt';
    // 改行コードを<br>に変換して表示したい場合はinnerHTMLを使いますが、
    // XSS対策としてtextContentを使用し、CSSで改行を扱うのが安全です。
    // 今回はシンプルにテキストとして挿入します。
    pText.textContent = text;

    // 要素を組み立てる
    link.appendChild(h2);
    link.appendChild(pDate);
    link.appendChild(pText);
    article.appendChild(link);

    // グリッドの先頭に追加 (prependを使うと最初に追加されます)
    memoGrid.prepend(article);
}


// ==========================================
// 【大項目】 アプリケーションの初期化処理
// ==========================================

// ------------------------------------------
// 【中項目】 外部ライブラリの読み込み
// ------------------------------------------

// 【小項目】 環境変数の設定