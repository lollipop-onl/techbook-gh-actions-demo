import { Selector, ClientFunction } from 'testcafe';

/** 名前入力欄の要素 */
const nameInput = Selector('.form-field > input');
/** 送信ボタンの要素 */
const submitButton = Selector('.submit-button');
/** 名前が表示されている要素 */
const nameElement = Selector('.footer-button');
/** テストのユーザー名 */
const testName = '山田太郎';
/** NuxtのページURLを取得する */
const getPagePath = ClientFunction(() => {
  const { hash } = window.location;
  const href = hash.replace(/^#/, '');

  return href.replace(/^(.*)\?.*/, '$1');
});

// シナリオ全体の見出しと開始時点のページURL
fixture`デモプロジェクト E2Eテスト`.page`http://localhost:8080`;

// テストシナリオ
test('フォーム送信後、/greetingへ遷移する', async (t) => {
  await t
    // 名前入力欄に名前を入力
    .typeText(nameInput, testName)
    // 送信ボタン押下
    .click(submitButton)
    // ページURLがが /greeting かどうか
    .expect(getPagePath())
    .eql('/greeting');
});

// テストシナリオ
test('フォーム送信後、画面上に入力値が表示される', async (t) => {
  await t
    // 名前入力欄に名前を入力
    .typeText(nameInput, testName)
    // 送信ボタン押下
    .click(submitButton)
    // 名前表示に入力した指名が含まれるかどうか
    .expect(nameElement.textContent)
    .contains(testName);
});

// テストシナリオ
test('挨拶画面へ直接アクセスするとフォームページへリダイレクトする', async (t) => {
  await t
    // #/greeting へ遷移
    .navigateTo('#/greeting')
    // 名前入力欄が表示されるまで待機
    .expect(nameInput.exists)
    .ok()
    // ページURLが / かどうか
    .expect(getPagePath())
    .eql('/');
});
