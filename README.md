# txt2json

A local text-to-JSON converter built with React and powered by Ollama's LLama2 model.

## Features

- Convert plain text to structured JSON format
- Local processing using Ollama
- Real-time conversion
- Copy/paste functionality
- Syntax highlighting for JSON output
- Responsive design

## Prerequisites

- Node.js (v18 or higher)
- Ollama installed with LLama2 model
- npm

## Installation

1. Clone the repository

```bash
git clone https://github.com/abishekvenkat/txt2json.git
cd txt2json
```

2. Install dependencies

```bash
npm install
```

3. Start Ollama server with LLama2 model
```bash
ollama run llama2
```

4. Start the development server
```bash
npm run dev
```

The application will be available at `http://localhost:9122`

## Usage

1. Enter or paste your text in the left input area
2. Click the "Convert" button
3. View and copy the formatted JSON output from the right panel

## Note

Ensure that Ollama is running with the LLama2 model before using the converter. All text processing is done locally on your device.