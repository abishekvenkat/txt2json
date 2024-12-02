import React from 'react';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import json from 'react-syntax-highlighter/dist/esm/languages/hljs/json';
import { TextArea } from './TextArea';

SyntaxHighlighter.registerLanguage('json', json);

interface JsonViewerProps {
  jsonString: string;
}

export const JsonViewer: React.FC<JsonViewerProps> = ({ jsonString }) => {
  return (
    
    <TextArea
      value={jsonString}
      label="JSON Output"
      readOnly
      placeholder="Converted JSON will appear here..."
    />
  );
};