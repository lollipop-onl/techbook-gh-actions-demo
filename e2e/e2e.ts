import { Selector, ClientFunction } from 'testcafe'

const nameInput = Selector('.form > .form__input')
const submitButton = Selector('.form > .form__submit')
const userNameElement = Selector('.greeting > .greeting__name')
const testUserName = '山田太郎'
const getPagePath = ClientFunction(() => {
  const { hash } = window.location
  const href = hash.replace(/^#/, '')

  return href.replace(/^(.*)\?.*/, '$1')
})

fixture `デモプロジェクト E2Eテスト`
  .page `http://localhost:8080`

test('フォーム送信後、/greetingへ遷移する', async (t) => {
  await t
    .typeText(nameInput, testUserName)
    .click(submitButton)
    .expect(getPagePath())
    .eql('/greeting')
})

test('フォーム送信後、画面上に入力値が表示される', async (t) => {
  await t
    .typeText(nameInput, testUserName)
    .click(submitButton)
    .expect(userNameElement.textContent)
    .contains(testUserName)
})

test('挨拶画面へ直接アクセスするとフォームページへリダイレクトする', async (t) => {
  await t
    .navigateTo('#/greeting')
    .expect(nameInput.exists)
    .ok()
    .expect(getPagePath())
    .eql('/')
})
