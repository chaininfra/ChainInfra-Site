"use client";

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// Lazy load RichTextEditor với dynamic import
const RichTextEditor = dynamic(
  () => import('./RichTextEditor'),
  {
    loading: () => (
      <div className="border border-gray-300 rounded-lg p-4 text-center text-gray-500 min-h-[200px] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-2"></div>
          <p>Loading rich text editor...</p>
        </div>
      </div>
    ),
    ssr: false, // Disable SSR để tránh hydration issues
  }
);

interface LazyRichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  height?: number;
}

const LazyRichTextEditor = ({ value, onChange, placeholder, height }: LazyRichTextEditorProps) => {
  return (
    <Suspense fallback={
      <div className="border border-gray-300 rounded-lg p-4 text-center text-gray-500 min-h-[200px] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-2"></div>
          <p>Loading rich text editor...</p>
        </div>
      </div>
    }>
      <RichTextEditor
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        height={height}
      />
    </Suspense>
  );
};

export default LazyRichTextEditor;
