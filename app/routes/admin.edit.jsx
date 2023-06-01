import EditorLexical from "../routes/components/EditorLexical";
import SlateStyles from "../styles/slate.css";

export default function AdminEdit() {
  return (
    <div className="text-editor">
      <EditorLexical />
    </div>
  );
}

export function links() {
  return [{ rel: "stylesheet", href: SlateStyles }];
}
