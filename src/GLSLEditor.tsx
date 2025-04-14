import React from "react";
import Editor, { Monaco, OnMount } from "@monaco-editor/react";
import { fragmentShaderSource, Shader, updateFragmentShader } from "./Shader";
import { editor } from "monaco-editor";

type GLSLEditorProps = {
    shaderRef: React.RefObject<Shader | null>;
    glRef: React.RefObject<WebGL2RenderingContext | null>;
}

const GLSLEditor: React.FC<GLSLEditorProps> = (props: GLSLEditorProps) => {

    const editorRef = React.useRef<editor.IStandaloneCodeEditor | null>(null);
    const glRef = props.glRef;

    const handleEditorDidMount: OnMount = (editor: editor.IStandaloneCodeEditor) => {
        editorRef.current = editor;
    };

    const onClick = () => {
        const shader = props.shaderRef.current;
        if (!shader) return;
        const gl = glRef.current;
        if (!gl) return;
        const editor = editorRef.current;
        if (!editor) return;
        const source = editor.getValue();
        updateFragmentShader(gl, shader, source);
    }

    return (
        <>
            <button onClick={onClick} style={{ width: "100%", marginBottom: "1rem" }}>
                Compile Shader
            </button >
            <Editor
                height="90vh"
                defaultLanguage="glsl"
                defaultValue={fragmentShaderSource}
                theme="vs-dark"
                onMount={handleEditorDidMount}

            />
        </>
    );
};

export default GLSLEditor;
