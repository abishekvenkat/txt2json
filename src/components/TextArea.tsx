import React from 'react';
import { Textarea } from '@nextui-org/react';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomOneLight } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { Copy, Clipboard } from 'lucide-react';
import { Button } from '@nextui-org/react';

interface TextAreaProps {
  value: string;
  onChange?: (value: string) => void;
  readOnly?: boolean;
  label: string;
  placeholder?: string;
}

export const TextArea: React.FC<TextAreaProps> = ({
  value,
  onChange,
  readOnly = false,
  label,
  placeholder,
}) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(value);
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      onChange?.(text);
    } catch (err) {
      console.error('Failed to read clipboard contents: ', err);
    }
  };

  return (
    <div className="relative w-full">
      {readOnly ? (
        <div className="w-full">
          <div className="relative w-full min-h-[600px] rounded-lg border-2 border-default-200 bg-default-100">
            <div className="text-xs px-3 pt-2 text-default-700">{label}</div>
            <div className="h-[618px] overflow-auto">
              <SyntaxHighlighter
                language="json"
                style={atomOneLight}
                customStyle={{
                  margin: 0,
                  minHeight: '570px',
                  background: 'transparent'
                }}
              >
                {value || ' '}
              </SyntaxHighlighter>
            </div>
            <Button
              isIconOnly
              className="absolute top-2 right-2"
              size="sm"
              variant="light"
              onClick={handleCopy}
            >
              <Copy size={20} />
            </Button>
          </div>
        </div>
      ) : (
        <div className="w-full">
          <Textarea
            label={label}
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
            placeholder={placeholder}
            size="lg"
            className="w-full min-h-[600px]"
            classNames={{
              input: "min-h-[600px]",
              inputWrapper: "min-h-[600px]"
            }}
          />
          <Button
            isIconOnly
            className="absolute top-2 right-2"
            size="sm"
            variant="light"
            onClick={handlePaste}
          >
            <Clipboard size={20} />
          </Button>
        </div>
      )}
    </div>
  );
};