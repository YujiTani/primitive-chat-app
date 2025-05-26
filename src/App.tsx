import { useState } from 'react'

function App() {
  const timestamp = new Date().toLocaleTimeString()
  const [prompt, setPrompt] = useState('')

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const input = event.target.value
    setPrompt(input)
    const charCount = input.length
    // ここで文字数を表示するロジックを追加できます
    console.log(`文字数: ${charCount}/500`)
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    switch (event.key) {
      case 'Enter':
        event.preventDefault()
        // 送信処理をここに追加
        console.log('Enterキーが押されました')
        break

      case 'Backspace':
        event.preventDefault()
        setPrompt('') // バックスペースキーで入力をクリア
        console.log('Backspaceキーが押され、入力がクリアされました')
        break

      default:
        console.log(`他のキーが押されました: ${event.key}`)
        break
    }
  }

  return (
    <div className="flex h-dvh w-full bg-white text-black">
      <div className="p-2 w-80 bg-white border-r border-gtay-300 flex flex-col">
        <h1 className="text-2xl">Chat App</h1>
        <p>text</p>
      </div>

      <main className="flex-1 flex flex-col">
        <h1 className="bg-blue-700 text-white p-2">Message Area</h1>
        <article className="flex flex-col h-full">
          <section className="p-2">
            <p>
              <span>{timestamp}</span>:<span>user name</span>
              テキスト
            </p>
            <p>テキスト</p>
            <p>テキスト</p>
            <p>テキスト</p>
          </section>

          <section className="p-2 mt-auto mb-0 border-t border-gray-300">
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-center">
                <input
                  type="text"
                  className="flex-1 p-1.5 text-gray-600"
                  value={prompt}
                  placeholder="メッセージを入力"
                  maxLength={500}
                  autoFocus
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                />
                <button className="ml-2">
                  <p className="py-1 px-2 border-gray-600 border-2 rounded-md text-sm text-gray-600">
                    送信
                  </p>
                </button>
              </div>
              <small className="text-xs text-right text-gray-500 mt-auto">0/500文字</small>
            </div>
          </section>
        </article>
      </main>
    </div>
  )
}

export default App
