import React, { useState } from 'react';
import { Button } from '@nextui-org/react';
import { ArrowRightLeft, Loader2 } from 'lucide-react';
import { TextArea } from './TextArea';
import { JsonViewer } from './JsonViewer';

const naiveJSONFromText = (text: string) => {
  const match = text.match(/\{[\s\S]*\}/);
  if (!match) return null;

  try {
    return JSON.parse(match[0]);
  } catch {
    return null;
  }
};

export const Converter: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [outputJson, setOutputJson] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleConvert = async () => {
    if (!inputText.trim()) return;
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:11434/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'llama2',
          prompt: `Convert this text to JSON format, ensuring proper structure and formatting: ${inputText} 
          IMPORTANT: Do not return any additional text and return only the JSON response. No explanation needed.`,
          stream: false,
        }),
      });

      const data = await response.json();
      console.log('Response from Ollama:', data);
      const jsonResponse = data.response;
      
      const extractedJson = naiveJSONFromText(jsonResponse);
      if (extractedJson) {
        setOutputJson(JSON.stringify(extractedJson, null, 2));
      } else {
        try {
          const parsedJson = JSON.parse(jsonResponse);
          setOutputJson(JSON.stringify(parsedJson, null, 2));
        } catch {
          setOutputJson('Error: Could not extract valid JSON from the response');
        }
      }
    } catch (error) {
      console.error('Error converting text:', error);
      setOutputJson('Error converting text. Please ensure Ollama is running with the llama2 model.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto p-6">
      <div className="flex gap-6 items-start">
        <div className="flex-1">
          <TextArea
            value={inputText}
            onChange={setInputText}
            label="Text Input"
            placeholder="Enter your text here..."
          />
        </div>
        
        <div className="pt-12">
          <Button
            color="primary"
            size="lg"
            onClick={handleConvert}
            isDisabled={!inputText.trim()}
            className="p-6"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-6 h-6 animate-spin" />
                <span className="ml-2">Converting...</span>
              </>
            ) : (
              <>
                <ArrowRightLeft className="w-6 h-6" />
                <span className="ml-2">Convert</span>
              </>
            )}
          </Button>
        </div>

        <div className="flex-1">
          <JsonViewer jsonString={outputJson} />
        </div>
      </div>
      
      <p className="text-center text-sm text-gray-500">
        Data parsed on your device, use freely.
      </p>
    </div>
  );
};