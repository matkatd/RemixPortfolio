"use client";

import StarterKit from "@tiptap/starter-kit";
import { useEditor, EditorContent } from "@tiptap/react";
import { Color } from "@tiptap/extension-color";
import { TextStyle } from "@tiptap/extension-text-style";
import { ListItem } from "@tiptap/extension-list-item";
import Image from "@tiptap/extension-image";
import { lowlight } from "lowlight";
import TextAlign from "@tiptap/extension-text-align";
import Link from "@tiptap/extension-link";
import { isRouteErrorResponse, useRouteError } from "@remix-run/react";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import css from "highlight.js/lib/languages/css";
import js from "highlight.js/lib/languages/javascript";
import ts from "highlight.js/lib/languages/typescript";
import html from "highlight.js/lib/languages/xml";
import cpp from "highlight.js/lib/languages/cpp";

lowlight.registerLanguage("html", html);
lowlight.registerLanguage("css", css);
lowlight.registerLanguage("js", js);
lowlight.registerAlias("jsx", "js");
lowlight.registerLanguage("cpp", cpp);
lowlight.registerLanguage("ts", ts);

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

const ReadOnlyTiptap = ({ project }) => {
  const starterContent = project.writeup.join(" ");

  const editor = useEditor({
    editable: false,
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
      CodeBlockLowlight.configure({
        lowlight,
      }),
      Image,
    ],
    content: starterContent,
  });

  return (
    <div className="editor">
      <EditorContent editor={editor} />
    </div>
  );
};

export default ReadOnlyTiptap;
