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

  function handleClose(event: MouseEvent) {
    if (onClose) {
      onClose(event)
    }
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
      <button type="button" className="mt-2 p-1.5 border-2 rounded-xl" onClick={handleClose}>
        close
      </button>
    </dialog>
  )
}

export default WebSocketDialog
