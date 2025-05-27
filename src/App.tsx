import { useState } from 'react'
import WebSocketDialog from './websocket.dialog'

function App() {
  const timestamp = new Date().toLocaleTimeString()
  const [prompt, setPrompt] = useState('')
  const [isDisabled, setIsDisabled] = useState(true)
  const [showDialog, setShowDialog] = useState(true)
  // 入力変更をハンドリング
  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const input = event.target.value
    setPrompt(input)
    // ここで文字数を表示するロジックを追加できます
    console.log(`文字数: ${input.length}/500`)
    const shouldDisable = !input.trim() || input.length > 500
    setIsDisabled(shouldDisable)
  }

  // Key入力をハンドリング
  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    switch (event.key) {
      case 'Enter':
        if (event.shiftKey) {
          event.preventDefault()
          if (!isDisabled) {
            console.log('メッセージ送信:', prompt.trim())
            setPrompt('')
            setIsDisabled(true)
          }
        }
        break

      case 'Backspace':
        event.preventDefault()
        if (event.shiftKey) {
          console.log('Shift + Backspaceキーが押されました')
          setPrompt('') // バックスペースキーで入力をクリア
        } else {
          setPrompt(prompt.slice(0, -1))
        }
        break

      default:
        break
    }
  }

  function handleDialogClose() {
    setShowDialog(false)
    ws.close()
    console.log('WebSocket接続を閉じました')
  }

  return (
    <div className="flex h-dvh w-full bg-white text-black relative">
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
                <button
                  type="button"
                  className="ml-2"
                  disabled={isDisabled}
                  onClick={() => {
                    if (prompt.trim) {
                      console.log('メッセージ送信:', prompt.trim())
                      ws?.send(prompt.trim())
                      setPrompt('')
                      setIsDisabled(true)
                    }
                  }}
                >
                  <p
                    className={`py-1 px-2 border-gray-600 border-2 rounded-md text-sm text-gray-600
                  ${
                    isDisabled
                      ? 'border-gray-300 text-gray-400 bg-gray-50'
                      : 'border-gray-600 text-gray-600 hover:bg-gray-50 cursor-pointer'
                  }`}
                  >
                    送信
                  </p>
                </button>
              </div>
              <small className="text-xs text-right text-gray-500 mt-auto">{`${prompt.length}/500文字`}</small>
            </div>
          </section>
        </article>
      </main>
      <WebSocketDialog isOpen={showDialog} onClose={handleDialogClose} />
    </div>
  )
}

export default App
