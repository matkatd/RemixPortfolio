"use client";

import StarterKit from "@tiptap/starter-kit";
import { useEditor, EditorContent } from "@tiptap/react";
import { Color } from "@tiptap/extension-color";
import { TextStyle } from "@tiptap/extension-text-style";
import { ListItem } from "@tiptap/extension-list-item";
import Dropcursor from "@tiptap/extension-dropcursor";
import Image from "@tiptap/extension-image";
import ToolBar from "./ToolBar";
import TextAlign from "@tiptap/extension-text-align";
import Link from "@tiptap/extension-link";
import { isRouteErrorResponse, useRouteError } from "@remix-run/react";

export function ErrorBoundary() {
  const error = useRouteError();
  if (isRouteErrorResponse(error)) {
    return (
      <div className="error-boundary">
        <h2>Oopsie on the Tiptap editor</h2>
        <p>
          Status: {error.status}: {error.statusText}
        </p>
        <p>{error.data.message}</p>
      </div>
    );
  }

  let errorMessage = "Unknown Error";
  return (
    <div className="error-boundary">
      <h1>Uh oh... on Tiptatp editor</h1>
      <p>Something went wrong.</p>
      <pre>{errorMessage}</pre>
    </div>
  );
}

const Tiptap = ({ project, childToParent }) => {
  const starterContent = project
    ? project.writeup.join(" ")
    : "<p>Hello World! 🌎️</p>";

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
        },
      }),
      Color.configure({ types: [TextStyle.name, ListItem.name] }),
      TextStyle.configure({ types: [ListItem.name] }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Link.configure({
        protocols: ["mailto"],
      }),
      Image,
    ],
    content: starterContent,
    onUpdate({ editor }) {
      if (editor) {
        childToParent(editor.getHTML());
      }
    },
  });

  // This might work: https://dev.to/timvermaercke/uploading-files-to-google-cloud-storage-with-remixrun-3c5c

  return (
    <div className="editor">
      <ToolBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default Tiptap;
