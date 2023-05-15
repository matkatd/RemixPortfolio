// https://ckeditor.com/docs/ckeditor5/latest/installation/getting-started/getting-and-setting-data.html
// Docs for WYSIWYG editor
import Editor from "./components/Editor";




export default function AdminNew() {
    return (
        // TODO: Well, this editor is kinda broken... first trying turning into component, but may need to find a different plugin
        // <Editor />
        <div>
            <Editor />
        </div>
    )
}