"use client"
// InitializedMDXEditor.tsx
import type {ForwardedRef} from "react";
import {
    headingsPlugin,
    listsPlugin,
    quotePlugin,
    thematicBreakPlugin,
    markdownShortcutPlugin,
    MDXEditor,
    type MDXEditorMethods,
    type MDXEditorProps,
    toolbarPlugin,
    UndoRedo,
    BoldItalicUnderlineToggles,
    BlockTypeSelect,
    CodeToggle,
    CreateLink,
    DiffSourceToggleWrapper,
    diffSourcePlugin,
    ChangeAdmonitionType,
    directivesPlugin,
    AdmonitionDirectiveDescriptor,
    InsertAdmonition,
    InsertCodeBlock,
    InsertFrontmatter,
    frontmatterPlugin,
    imagePlugin,
    InsertSandpack,
    InsertTable,
    InsertThematicBreak,
    ListsToggle,
    ShowSandpackInfo,
    linkPlugin,
    linkDialogPlugin,
    tablePlugin,
    sandpackPlugin,
    SandpackConfig, codeMirrorPlugin, ChangeCodeMirrorLanguage, codeBlockPlugin, KitchenSinkToolbar,
} from "@mdxeditor/editor";

const defaultSnippetContent = `
export default function App() {
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
    </div>
  );
}
`.trim()

const reactSandpackConfig: SandpackConfig = {
    defaultPreset: 'react',
    presets: [
        {
            label: 'React',
            name: 'react',
            meta: 'live',
            sandpackTemplate: 'react',
            sandpackTheme: 'light',
            snippetFileName: '/App.js',
            snippetLanguage: 'jsx',
            initialSnippetContent: defaultSnippetContent,
        },
    ],
}

const allPlugins = (diffMarkdown: string) => [
    toolbarPlugin({
        toolbarContents: () => <KitchenSinkToolbar />
    }),
    headingsPlugin(),
    listsPlugin(),
    quotePlugin(),
    thematicBreakPlugin(),
    markdownShortcutPlugin(),
    diffSourcePlugin(),
    directivesPlugin({directiveDescriptors: [AdmonitionDirectiveDescriptor]}),
    frontmatterPlugin(),
    imagePlugin({
        // imageUploadHandler: () => {
        // //     Handle image upload
        // },
        // // imageAutocompleteSuggestions: [],
        // imagePreviewHandler: () => {}
    }),
    linkPlugin(),
    linkDialogPlugin({
        // linkAutocompleteSuggestions: []
    }),
    tablePlugin(),
    codeBlockPlugin({ defaultCodeBlockLanguage: 'rb' }),
    sandpackPlugin({ sandpackConfig: reactSandpackConfig }),
    codeMirrorPlugin({
        codeBlockLanguages: {
            js: 'JavaScript',
            css: 'CSS',
            txt: 'Text',
            tsx: 'TypeScript',
            rb: 'Ruby',
            jsx: 'JavaScript (React)',
            py: 'Python',
            bash: 'Bash'
        }
    }),
    diffSourcePlugin({ viewMode: 'rich-text', diffMarkdown })
]

// const jsxComponentDescriptors =

// Only import this to the next file
export default function InitializedMDXEditor(
    {
        editorRef,
        ...props
    }: {
        editorRef: ForwardedRef<MDXEditorMethods> | null
    } & MDXEditorProps) {

    return (
        <MDXEditor
            plugins={allPlugins(props.markdown)}
            {...props}
            ref={editorRef}
        />
    );
}
