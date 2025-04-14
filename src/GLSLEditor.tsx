import React from "react";
import Editor, { Monaco, OnMount } from "@monaco-editor/react";
import { fragmentShaderSource } from "./Shader";
import { editor } from "monaco-editor";

const GLSLEditor: React.FC = () => {
    const handleEditorDidMount: OnMount = (editor: editor.IStandaloneCodeEditor, monaco: Monaco) => {
        console.log("Editor is mounted and ready to use!", editor);
    };

    return (
        <Editor
            height="90vh"
            defaultLanguage="glsl"
            defaultValue={fragmentShaderSource}
            theme="vs-dark"
            onMount={handleEditorDidMount}
        />
    );
};

export default GLSLEditor;
