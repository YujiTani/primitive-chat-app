import { type MouseEvent, useRef } from 'react'

type WebSocketDialogProps = {
  isOpen?: boolean
  onClose?: (event: MouseEvent) => void
}

/**
 * WebSocketと通信を開始するダイアログコンポーネント
 * @param props.onClose - 閉じるボタンのハンドラー
 */
function WebSocketDialog({ isOpen = true, onClose }: WebSocketDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const port = import.meta.env.VITE_WEB_SOCKET_PORT || 3000

  async function startWebSocketConnection() {
    // 再レンダリングが走らない場所で、接続を開始する必要がある
    // 接続開始するコンポーネントが必要で、そこから接続を行う
    const ws = new WebSocket(`ws://localhost:${port}`)
    console.log(`WebSocket接続: ws://localhost:${port} ${ws.readyState}`)
    closeDialog()
  }

  function handleClose(event: MouseEvent) {
    if (onClose) {
      onClose(event)
    }
    closeDialog()
  }

  function closeDialog() {
    if (dialogRef.current) {
      dialogRef.current.close()
    }
  }

  //   useEffect(() => {
  //     if (dialogRef.current) {
  //       // ダイアログが開かれたときにフォーカスを設定
  //       console.log(dialogRef.current)
  //     }
  //   }, [dialogRef])

  return (
    <dialog
      open
      ref={dialogRef}
      className={`${isOpen ? 'block' : 'hidden'} flex flex-col items-center justify-center absolute top-1/2 left-1/2 -translate-1/2 w-1/2 h-1/2 bg-white bg-opacity-50 border border-gray-300 rounded-lg shadow-lg`}
    >
      <h2>WebSocket Gate</h2>
      <p>チャットを開始します</p>
      <div className="flex gap-3">
        <button
          type="button"
          className="mt-2 p-1.5 border-2 rounded-xl"
          onClick={startWebSocketConnection}
        >
          チャット開始
        </button>
        <button type="button" className="mt-2 p-1.5 border-2 rounded-xl" onClick={handleClose}>
          覗くだけ
        </button>
      </div>
    </dialog>
  )
}

export default WebSocketDialog
