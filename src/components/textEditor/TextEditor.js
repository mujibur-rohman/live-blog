import React from 'react';

import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './styles.css';

const TextEditor = ({ content, handleChange }) => {
  return (
    <div>
      <Editor
        editorState={content}
        wrapperClassName="text-wrapper"
        editorClassName="text-editor"
        toolbar={{
          options: ['inline', 'blockType', 'list', 'textAlign', 'history'],
          inline: {
            options: ['bold', 'italic', 'underline', 'strikethrough'],
          },
          list: {
            options: ['unordered', 'ordered'],
          },
          blockType: {
            inDropdown: false,
            options: ['Normal', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6'],
            dropdownClassName: 'bg-black',
          },
        }}
        onEditorStateChange={(editorState) => handleChange(editorState)}
      />
    </div>
  );
};

export default TextEditor;
