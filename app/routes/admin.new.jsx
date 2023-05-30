// https://ckeditor.com/docs/ckeditor5/latest/installation/getting-started/getting-and-setting-data.html
// Docs for WYSIWYG editor

import EditorSlate from "./components/Editor";
import SlateStyles from "../styles/slate.css";

export default function AdminNew() {
  return (
    <div className="text-editor">
      <EditorSlate />
    </div>
  );
}

export function links() {
  return [{ rel: "stylesheet", href: SlateStyles }];
}
