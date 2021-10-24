import React from 'react';
import { Editor } from '@tinymce/tinymce-react';

const RichTextEditor = (props) => {
  return (
    <Editor
      apiKey="mqjp19j7s814osukaw32ul1epfsa6tq2gk4zy229fvog9vud"
      init={{
        height: 300,
        menubar: false,
        plugins: [
          'advlist autolink lists link image charmap print preview anchor',
          'searchreplace visualblocks code fullscreen',
          'insertdatetime media table paste code wordcount',
        ],
        toolbar:
          'undo redo | formatselect | ' +
          'bold italic backcolor | alignleft aligncenter ' +
          'alignright alignjustify | bullist numlist outdent indent | ' +
          'removeformat | link image',
        content_style:
          'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
      }}
      {...props}
    />
  );
};

export default RichTextEditor;
