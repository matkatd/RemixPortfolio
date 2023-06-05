// import EditorLexical from "./components/Lexical/EditorLexical";
import styles from "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Suspense, lazy } from "react";
import DraftEditor from "./components/DraftEditor";

export default function AdminEdit() {
  return (
    <div className="text-editor">
      <DraftEditor />
    </div>
  );
}

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}
