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
        Image,
        Dropcursor,
      }),
      Color.configure({ types: [TextStyle.name, ListItem.name] }),
      TextStyle.configure({ types: [ListItem.name] }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Link.configure({
        protocols: ["mailto"],
      }),
    ],
    content: starterContent,
    onUpdate({ editor }) {
      if (editor) {
        childToParent(editor.getHTML());
      }
    },
  });
  // TODO: allow user to insert images and have them uploaded to GSP
  // This might work: https://dev.to/timvermaercke/uploading-files-to-google-cloud-storage-with-remixrun-3c5c

  return (
    <div className="editor">
      <ToolBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default Tiptap;
