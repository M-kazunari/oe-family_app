// ==========================================
// 【ログイン画面】Authenticator（認証コンポーネント）
// ==========================================
import { generateClient } from 'aws-amplify/data';
import { Amplify } from 'aws-amplify';
import outputs from './amplify_outputs.json';

Amplify.configure(outputs);

// データベース操作用のクライアントを生成
const client = generateClient();

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
saveBtn.addEventListener('click', async () => {
    const title = inputTitle.value;
    const text = inputText.value;

    if (!title || !text) {
        alert('タイトルと内容を入力してください');
        return;
    }

    const now = new Date();
    const dateStr = `${now.getFullYear()}.${String(now.getMonth() + 1).padStart(2, '0')}.${String(now.getDate()).padStart(2, '0')}`;

    try {
        // --- ここからがAWSへの書き込み処理 ---
        const { data: newNote, errors } = await client.models.Note.create({
            title: title,
            content: text,
            date: dateStr
        });

        if (errors) {
            console.error("保存エラー:", errors);
            return;
        }

        console.log("AWSに保存成功！:", newNote);
        // ------------------------------------

        // 保存に成功したら、画面にカードを表示
        addMemoCard(newNote.title, newNote.date, newNote.content);

        dialog.close();
        clearInputs();

    } catch (error) {
        console.error("通信エラー:", error);
        alert("保存に失敗しました。ネット接続を確認してください。");
    }
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