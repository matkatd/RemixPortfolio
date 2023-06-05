import { Suspense, useState } from "react";
import { Editor } from "../../react-draft-wysiwyg.client";
import { ClientOnly } from "remix-utils";
export default function DraftEditor() {
  const [editorState, setEditorState] = useState({});
  //   console.log(Editor);
  return (
    <Suspense fallback={null}>
      <Editor
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName"
        editorClassName="editorClassName"
      />
    </Suspense>
  );
}
