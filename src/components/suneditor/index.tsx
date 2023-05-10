import 'suneditor/dist/css/suneditor.min.css';
import React from 'react';
import SunEditor from 'suneditor-react';

import {
  align,
  blockquote,
  font,
  fontColor,
  fontSize,
  formatBlock,
  hiliteColor,
  horizontalRule,
  image,
  lineHeight,
  link,
  list,
  paragraphStyle,
  table,
  template,
  textStyle,
} from 'suneditor/src/plugins';
import theme from 'src/theme';
import { FormLabel } from '@mui/material';

interface ISunEditorComponent {
  onChange: (content: string) => void;
  content?: string;
  label?: string;
  height?: string;
}

const SunEditorComponent = ({
  onChange,
  content,
  label,
  height = '20vh',
}: ISunEditorComponent) => {
  const handleChange = (content: string) => {
    onChange(content);
  };
  return (
    <>
      <FormLabel
        sx={{
          fontWeight: '600',
          color: theme.palette.common.black,
          pb: 0,
        }}
      >
        {label}
      </FormLabel>
      <SunEditor
        onChange={handleChange}
        defaultValue={content}
        height={height}
        setOptions={{
          plugins: [
            align,
            font,
            fontColor,
            blockquote,
            fontSize,
            formatBlock,
            hiliteColor,
            horizontalRule,
            lineHeight,
            list,
            paragraphStyle,
            table,
            template,
            textStyle,
            image,
            link,
          ],
          buttonList: [
            ['undo', 'redo'],
            ['font', 'fontSize', 'formatBlock'],
            ['paragraphStyle'],
            ['blockquote'],
            [
              'bold',
              'underline',
              'italic',
              'strike',
              'subscript',
              'superscript',
            ],
            ['fontColor', 'hiliteColor'],
            ['removeFormat'],
            ['outdent', 'indent'],
            ['align', 'horizontalRule', 'list', 'lineHeight'],
            ['table', 'link'],
            ['codeView'],
            ['save'],
          ],
          formats: ['p', 'div', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
          font: [
            'Arial',
            'Open Sans ',
            'Moon Dance',
            'Lato',
            'Quicksand',
            'Roboto',
          ],
        }}
      />
    </>
  );
};

export default SunEditorComponent;
