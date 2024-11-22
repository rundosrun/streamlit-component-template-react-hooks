import "tui-image-editor/dist/tui-image-editor.css"
import "tui-color-picker/dist/tui-color-picker.css"

import React, { useRef, useEffect, FC } from "react"
import TuiImageEditor from "tui-image-editor"
import { useRenderData } from "streamlit-component-lib-react-hooks"

import whiteTheme from "./whiteTheme"
import "./styles.css"

interface ImageEditorProps {
  includeUI: {
    loadImage: {
      path: string
      name: string
    }
    theme: {}
    menu: string[]
    initMenu: string
    uiSize: {
      width: string
      height: string
    }
    menuBarPosition: string
  }
  // cssMaxWidth: number
  // cssMaxHeight: number
  // selectionStyle: {
  //   cornerSize: number
  //   rotatingPointOffset: number
  // }
}

const ImageEditor: FC<ImageEditorProps> = (props) => {
  const rootEl = useRef<HTMLDivElement>(null)
  const imageEditorInst = useRef<TuiImageEditor | null>(null)

  useEffect(() => {
    if (rootEl.current) {
      imageEditorInst.current = new TuiImageEditor(rootEl.current, {
        ...props,
      })
    }

    return () => {
      if (imageEditorInst.current) {
        imageEditorInst.current.destroy()
        imageEditorInst.current = null
      }
    }
  }, [props])

  return <div ref={rootEl} />
}

export default function App() {
  const renderData = useRenderData()

  const imagePath = renderData.args["imagePath"]
  const width = renderData.args["width"] || "100%"
  const height = renderData.args["height"] || "900px"

  const props: ImageEditorProps = {
    includeUI: {
      loadImage: {
        path: imagePath,
        name: "Image",
      },
      menu: ["text"],
      theme: whiteTheme,
      initMenu: "text",
      menuBarPosition: "bottom",
      uiSize: {
        width,
        height,
      },
    },
    // cssMaxWidth: 700,
    // cssMaxHeight: 500,
    // selectionStyle: {
    //   cornerSize: 20,
    //   rotatingPointOffset: 70,
    // },
  }

  return (
    <div>
      <ImageEditor {...props} />
    </div>
  )
}
