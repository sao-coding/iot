import { Toaster } from "react-hot-toast"

const ToasterNotify = () => {
  return (
    <Toaster
      position='top-right'
      toastOptions={{
        className: ""
      }}
    />
  )
}

export default ToasterNotify
