"use client";

import React, { useState, useRef, useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import CodeBlock from '@tiptap/extension-code-block';
import Blockquote from '@tiptap/extension-blockquote';
import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';

// Optimized Material-UI imports - specific components only
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';

// Optimized icon imports - specific icons only
import FormatBold from '@mui/icons-material/FormatBold';
import FormatItalic from '@mui/icons-material/FormatItalic';
import FormatUnderlined from '@mui/icons-material/FormatUnderlined';
import FormatListBulleted from '@mui/icons-material/FormatListBulleted';
import FormatListNumbered from '@mui/icons-material/FormatListNumbered';
import LinkIcon from '@mui/icons-material/Link';
import ImageIcon from '@mui/icons-material/Image';
import Code from '@mui/icons-material/Code';
import FormatQuote from '@mui/icons-material/FormatQuote';
import VideoLibrary from '@mui/icons-material/VideoLibrary';
import FormatAlignLeft from '@mui/icons-material/FormatAlignLeft';
import FormatAlignCenter from '@mui/icons-material/FormatAlignCenter';
import FormatAlignRight from '@mui/icons-material/FormatAlignRight';
import FormatAlignJustify from '@mui/icons-material/FormatAlignJustify';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  height?: number;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ 
  value, 
  onChange, 
  placeholder = "Nhập nội dung bài viết...",
  height = 400 
}) => {
  const [imageDialogOpen, setImageDialogOpen] = useState(false);
  const [videoDialogOpen, setVideoDialogOpen] = useState(false);
  const [linkDialogOpen, setLinkDialogOpen] = useState(false);
  const [selectedText, setSelectedText] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Tiptap Editor
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        // Disable extensions that we want to configure separately
        bulletList: false,
        orderedList: false,
        codeBlock: false,
        blockquote: false,
        link: false,
        underline: false,
      }),
      Image,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          target: '_blank',
          rel: 'noopener noreferrer',
        },
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Underline,
      CodeBlock,
      Blockquote,
      BulletList,
      OrderedList,
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-lg max-w-none focus:outline-none',
        style: `min-height: ${height}px; padding: 16.5px 14px;`,
      },
    },
    immediatelyRender: false,
  });

  // Common style for toolbar buttons
  const iconButtonStyle = {
    color: 'hsl(var(--muted-foreground))',
    '&:hover': {
      backgroundColor: 'hsl(var(--accent))',
      color: 'hsl(var(--accent-foreground))',
    }
  };

  // Format functions
  const formatBold = () => editor?.chain().focus().toggleBold().run();
  const formatItalic = () => editor?.chain().focus().toggleItalic().run();
  const formatUnderline = () => editor?.chain().focus().toggleUnderline().run();
  const formatBulletList = () => editor?.chain().focus().toggleBulletList().run();
  const formatNumberedList = () => editor?.chain().focus().toggleOrderedList().run();
  const formatCode = () => editor?.chain().focus().toggleCode().run();
  const formatCodeBlock = () => editor?.chain().focus().toggleCodeBlock().run();
  const formatQuote = () => editor?.chain().focus().toggleBlockquote().run();
  const formatAlignLeft = () => editor?.chain().focus().setTextAlign('left').run();
  const formatAlignCenter = () => editor?.chain().focus().setTextAlign('center').run();
  const formatAlignRight = () => editor?.chain().focus().setTextAlign('right').run();
  const formatAlignJustify = () => editor?.chain().focus().setTextAlign('justify').run();

  const openLinkDialog = () => {
    if (editor) {
      const { from, to } = editor.state.selection;
      const text = editor.state.doc.textBetween(from, to);
      setSelectedText(text);
      setLinkDialogOpen(true);
    }
  };

  const handleLinkInsert = (url: string, linkText: string) => {
    if (editor && url) {
      if (selectedText) {
        editor.chain().focus().setLink({ href: url }).run();
      } else {
        editor.chain().focus().insertContent(`<a href="${url}" target="_blank" rel="noopener noreferrer">${linkText || url}</a>`).run();
      }
    }
    setLinkDialogOpen(false);
    setSelectedText('');
  };

  const [bucketImages, setBucketImages] = useState<string[]>([]);
  const [bucketVideos, setBucketVideos] = useState<string[]>([]);
  const [isLoadingBucket, setIsLoadingBucket] = useState(false);

  // Fetch images and videos from bucket
  const fetchBucketMedia = async () => {
    setIsLoadingBucket(true);
    try {
      // Fetch images
      const imagesResponse = await fetch('/api/admin/bucket-media?type=images');
      if (imagesResponse.ok) {
        const images = await imagesResponse.json();
        setBucketImages(images);
      }

      // Fetch videos
      const videosResponse = await fetch('/api/admin/bucket-media?type=videos');
      if (videosResponse.ok) {
        const videos = await videosResponse.json();
        setBucketVideos(videos);
      }
    } catch (error) {
      console.error('Error fetching bucket media:', error);
    } finally {
      setIsLoadingBucket(false);
    }
  };

  const openImageDialog = () => {
    fetchBucketMedia();
    setImageDialogOpen(true);
  };

  const handleImageUpload = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok && editor) {
        const data = await response.json();
        editor.chain().focus().setImage({ src: data.url, alt: file.name }).run();
        // Refresh bucket media after upload
        fetchBucketMedia();
      } else {
        console.error('Upload failed');
      }
    } catch (error) {
      console.error('Upload error:', error);
    }
    setImageDialogOpen(false);
  };

  const handleImageSelect = (imageUrl: string, imageName: string) => {
    if (editor) {
      editor.chain().focus().setImage({ src: imageUrl, alt: imageName }).run();
    }
    setImageDialogOpen(false);
  };

  const handleVideoUpload = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok && editor) {
        const data = await response.json();
        const videoHtml = `<video controls width="100%" style="max-width: 800px; margin: 1rem 0;">
          <source src="${data.url}" type="${file.type}">
          Your browser does not support the video tag.
        </video>`;
        editor.chain().focus().insertContent(videoHtml).run();
        // Refresh bucket media after upload
        fetchBucketMedia();
      } else {
        console.error('Video upload failed');
      }
    } catch (error) {
      console.error('Video upload error:', error);
    }
    setVideoDialogOpen(false);
  };

  const handleVideoSelect = (videoUrl: string, videoName: string) => {
    if (editor) {
      const videoHtml = `<video controls width="100%" style="max-width: 800px; margin: 1rem 0;">
        <source src="${videoUrl}" type="video/mp4">
        Your browser does not support the video tag.
      </video>`;
      editor.chain().focus().insertContent(videoHtml).run();
    }
    setVideoDialogOpen(false);
  };

  // Fix aria-hidden issues when editor is focused
  useEffect(() => {
    const fixAriaHidden = () => {
      // Fix for editor focus
      const editorElement = document.querySelector('.ProseMirror');
      if (editorElement && document.activeElement === editorElement) {
        let parent = editorElement.parentElement;
        while (parent) {
          if (parent.getAttribute('aria-hidden') === 'true') {
            parent.removeAttribute('aria-hidden');
          }
          parent = parent.parentElement;
        }
      }

      // Fix for any focused element
      const focusedElement = document.activeElement;
      if (focusedElement) {
        let parent = focusedElement.parentElement;
        while (parent) {
          if (parent.getAttribute('aria-hidden') === 'true') {
            parent.removeAttribute('aria-hidden');
          }
          parent = parent.parentElement;
        }
      }
    };

    // Fix on mount and when editor changes
    fixAriaHidden();
    
    // Also fix when editor gets focus
    const handleFocus = () => {
      setTimeout(fixAriaHidden, 0);
    };

    // Fix when any element gets focus
    const handleGlobalFocus = () => {
      setTimeout(fixAriaHidden, 0);
    };

    if (editor) {
      editor.on('focus', handleFocus);
    }

    // Listen for focus events globally
    document.addEventListener('focusin', handleGlobalFocus);

    return () => {
      if (editor) {
        editor.off('focus', handleFocus);
      }
      document.removeEventListener('focusin', handleGlobalFocus);
    };
  }, [editor]);

  // Additional fix for aria-hidden issues on mount and when dialogs open
  useEffect(() => {
    const fixAllAriaHidden = () => {
      // Remove aria-hidden from all elements that have focused descendants
      const allElements = document.querySelectorAll('[aria-hidden="true"]');
      allElements.forEach(element => {
        const hasFocusedDescendant = element.querySelector(':focus');
        if (hasFocusedDescendant) {
          element.removeAttribute('aria-hidden');
        }
      });
    };

    // Fix on mount
    fixAllAriaHidden();

    // Fix when dialogs open
    const handleDialogOpen = () => {
      setTimeout(fixAllAriaHidden, 100);
    };

    // Listen for dialog open events
    document.addEventListener('click', (e) => {
      if (e.target && (e.target as Element).closest('[role="dialog"]')) {
        handleDialogOpen();
      }
    });

    return () => {
      document.removeEventListener('click', handleDialogOpen);
    };
  }, []);

  if (!editor) {
    return (
      <Box sx={{ 
        border: '1px solid hsl(var(--border))', 
        borderRadius: 2,
        backgroundColor: 'hsl(var(--card))',
        padding: '16px',
        textAlign: 'center',
        color: 'hsl(var(--muted-foreground))'
      }}>
        <Typography>Loading editor...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ 
      border: '1px solid hsl(var(--border))', 
      borderRadius: 2,
      backgroundColor: 'hsl(var(--card))',
      overflow: 'hidden'
    }}>
      <Paper 
        elevation={0} 
        sx={{ 
          backgroundColor: 'hsl(var(--muted))',
          color: 'hsl(var(--muted-foreground))',
          boxShadow: 'none',
          borderBottom: '1px solid hsl(var(--border))'
        }}
      >
        <Toolbar variant="dense" sx={{ 
          minHeight: '48px', 
          gap: 1,
          backgroundColor: 'transparent'
        }}>
          {/* Text Formatting */}
          <IconButton 
            size="small" 
            onClick={formatBold} 
            title="Bold (Ctrl+B)" 
            sx={{
              ...iconButtonStyle,
              ...(editor.isActive('bold') && { backgroundColor: 'hsl(var(--accent))', color: 'hsl(var(--accent-foreground))' })
            }}
          >
            <FormatBold />
          </IconButton>
          <IconButton 
            size="small" 
            onClick={formatItalic} 
            title="Italic (Ctrl+I)" 
            sx={{
              ...iconButtonStyle,
              ...(editor.isActive('italic') && { backgroundColor: 'hsl(var(--accent))', color: 'hsl(var(--accent-foreground))' })
            }}
          >
            <FormatItalic />
          </IconButton>
          <IconButton 
            size="small" 
            onClick={formatUnderline} 
            title="Underline" 
            sx={{
              ...iconButtonStyle,
              ...(editor.isActive('underline') && { backgroundColor: 'hsl(var(--accent))', color: 'hsl(var(--accent-foreground))' })
            }}
          >
            <FormatUnderlined />
          </IconButton>
          
          <Divider orientation="vertical" flexItem sx={{ borderColor: 'hsl(var(--border))' }} />
          
          {/* Lists */}
          <IconButton 
            size="small" 
            onClick={formatBulletList} 
            title="Bullet List" 
            sx={{
              ...iconButtonStyle,
              ...(editor.isActive('bulletList') && { backgroundColor: 'hsl(var(--accent))', color: 'hsl(var(--accent-foreground))' })
            }}
          >
            <FormatListBulleted />
          </IconButton>
          <IconButton 
            size="small" 
            onClick={formatNumberedList} 
            title="Numbered List" 
            sx={{
              ...iconButtonStyle,
              ...(editor.isActive('orderedList') && { backgroundColor: 'hsl(var(--accent))', color: 'hsl(var(--accent-foreground))' })
            }}
          >
            <FormatListNumbered />
          </IconButton>
          
          <Divider orientation="vertical" flexItem sx={{ borderColor: 'hsl(var(--border))' }} />
          
          {/* Insert */}
          <IconButton size="small" onClick={openLinkDialog} title="Insert Link" sx={iconButtonStyle}>
            <LinkIcon />
          </IconButton>
          <IconButton size="small" onClick={openImageDialog} title="Insert Image" sx={iconButtonStyle}>
            <ImageIcon />
          </IconButton>
          <IconButton size="small" onClick={() => setVideoDialogOpen(true)} title="Insert Video" sx={iconButtonStyle}>
            <VideoLibrary />
          </IconButton>
          
          <Divider orientation="vertical" flexItem sx={{ borderColor: 'hsl(var(--border))' }} />
          
          {/* Code & Quote */}
          <IconButton 
            size="small" 
            onClick={formatCode} 
            title="Inline Code" 
            sx={{
              ...iconButtonStyle,
              ...(editor.isActive('code') && { backgroundColor: 'hsl(var(--accent))', color: 'hsl(var(--accent-foreground))' })
            }}
          >
            <Code />
          </IconButton>
          <IconButton 
            size="small" 
            onClick={formatCodeBlock} 
            title="Code Block" 
            sx={{
              ...iconButtonStyle,
              ...(editor.isActive('codeBlock') && { backgroundColor: 'hsl(var(--accent))', color: 'hsl(var(--accent-foreground))' })
            }}
          >
            <Code />
          </IconButton>
          <IconButton 
            size="small" 
            onClick={formatQuote} 
            title="Quote" 
            sx={{
              ...iconButtonStyle,
              ...(editor.isActive('blockquote') && { backgroundColor: 'hsl(var(--accent))', color: 'hsl(var(--accent-foreground))' })
            }}
          >
            <FormatQuote />
          </IconButton>
          
          <Divider orientation="vertical" flexItem sx={{ borderColor: 'hsl(var(--border))' }} />
          
          {/* Text Alignment */}
          <IconButton 
            size="small" 
            onClick={formatAlignLeft} 
            title="Align Left" 
            sx={{
              ...iconButtonStyle,
              ...(editor.isActive({ textAlign: 'left' }) && { backgroundColor: 'hsl(var(--accent))', color: 'hsl(var(--accent-foreground))' })
            }}
          >
            <FormatAlignLeft />
          </IconButton>
          <IconButton 
            size="small" 
            onClick={formatAlignCenter} 
            title="Align Center" 
            sx={{
              ...iconButtonStyle,
              ...(editor.isActive({ textAlign: 'center' }) && { backgroundColor: 'hsl(var(--accent))', color: 'hsl(var(--accent-foreground))' })
            }}
          >
            <FormatAlignCenter />
          </IconButton>
          <IconButton 
            size="small" 
            onClick={formatAlignRight} 
            title="Align Right" 
            sx={{
              ...iconButtonStyle,
              ...(editor.isActive({ textAlign: 'right' }) && { backgroundColor: 'hsl(var(--accent))', color: 'hsl(var(--accent-foreground))' })
            }}
          >
            <FormatAlignRight />
          </IconButton>
          <IconButton 
            size="small" 
            onClick={formatAlignJustify} 
            title="Align Justify" 
            sx={{
              ...iconButtonStyle,
              ...(editor.isActive({ textAlign: 'justify' }) && { backgroundColor: 'hsl(var(--accent))', color: 'hsl(var(--accent-foreground))' })
            }}
          >
            <FormatAlignJustify />
          </IconButton>
        </Toolbar>
        
        <Divider sx={{ borderColor: 'hsl(var(--border))' }} />
        
        {/* Tiptap Editor Content */}
        <Box sx={{ 
          backgroundColor: 'hsl(var(--card))',
          color: 'hsl(var(--card-foreground))',
          minHeight: height,
        }}>
          <EditorContent 
            editor={editor} 
            style={{
              fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace',
              fontSize: '14px',
              lineHeight: '1.5',
            }}
            onFocus={() => {
              // Ensure parent elements don't have aria-hidden when editor is focused
              const editorElement = document.querySelector('.ProseMirror');
              if (editorElement) {
                let parent = editorElement.parentElement;
                while (parent) {
                  if (parent.getAttribute('aria-hidden') === 'true') {
                    parent.removeAttribute('aria-hidden');
                  }
                  parent = parent.parentElement;
                }
              }
            }}
          />
        </Box>
      </Paper>

      {/* Link Dialog */}
      <LinkDialog
        open={linkDialogOpen}
        onClose={() => setLinkDialogOpen(false)}
        onInsert={handleLinkInsert}
        selectedText={selectedText}
      />

      {/* Image Dialog */}
      <ImageDialog
        open={imageDialogOpen}
        onClose={() => setImageDialogOpen(false)}
        onUpload={handleImageUpload}
        onSelect={handleImageSelect}
        bucketImages={bucketImages}
        isLoadingBucket={isLoadingBucket}
      />

      {/* Video Dialog */}
      <VideoDialog
        open={videoDialogOpen}
        onClose={() => setVideoDialogOpen(false)}
        onUpload={handleVideoUpload}
        onSelect={handleVideoSelect}
        bucketVideos={bucketVideos}
        isLoadingBucket={isLoadingBucket}
      />

      <style jsx global>{`
        .ProseMirror {
          outline: none;
          padding: 16.5px 14px;
          min-height: ${height}px;
        }
        
        .ProseMirror p.is-editor-empty:first-child::before {
          color: hsl(var(--muted-foreground));
          content: attr(data-placeholder);
          float: left;
          height: 0;
          pointer-events: none;
        }
        
        .ProseMirror strong {
          font-weight: bold;
        }
        
        .ProseMirror em {
          font-style: italic;
        }
        
        .ProseMirror u {
          text-decoration: underline;
        }
        
        .ProseMirror code {
          background-color: hsl(var(--muted));
          padding: 2px 4px;
          border-radius: 3px;
          font-family: Monaco, Menlo, "Ubuntu Mono", monospace;
          font-size: 0.9em;
        }
        
        .ProseMirror pre {
          background-color: hsl(var(--muted));
          padding: 1rem;
          border-radius: 8px;
          overflow-x: auto;
        }
        
        .ProseMirror pre code {
          background: transparent;
          padding: 0;
        }
        
        .ProseMirror blockquote {
          border-left: 4px solid hsl(var(--accent));
          margin: 1rem 0;
          padding: 0.5rem 1rem;
          background-color: hsl(var(--muted) / 0.3);
          border-radius: 0 8px 8px 0;
        }
        
        .ProseMirror ul,
        .ProseMirror ol {
          padding-left: 1.5rem;
        }
        
        .ProseMirror img {
          max-width: 100%;
          height: auto;
          margin: 1rem 0;
        }
        
        .ProseMirror video {
          max-width: 100%;
          height: auto;
          margin: 1rem 0;
        }
        
        .ProseMirror a {
          color: hsl(var(--primary));
          text-decoration: underline;
        }
        
        .ProseMirror a:hover {
          color: hsl(var(--primary) / 0.8);
        }
      `}</style>
    </Box>
  );
};

// Link Dialog Component
interface LinkDialogProps {
  open: boolean;
  onClose: () => void;
  onInsert: (url: string, text: string) => void;
  selectedText: string;
}

const LinkDialog: React.FC<LinkDialogProps> = ({ open, onClose, onInsert, selectedText }) => {
  const [url, setUrl] = useState('');
  const [linkText, setLinkText] = useState(selectedText);

  React.useEffect(() => {
    setLinkText(selectedText);
  }, [selectedText]);

  const dialogPaperStyle = {
    backgroundColor: 'hsl(var(--card))',
    color: 'hsl(var(--card-foreground))',
    border: '1px solid hsl(var(--border))',
  };

  const dialogTextFieldStyle = {
    '& .MuiOutlinedInput-root': {
      backgroundColor: 'hsl(var(--input))',
      color: 'hsl(var(--foreground))',
      '& fieldset': {
        borderColor: 'hsl(var(--border))',
      },
      '&:hover fieldset': {
        borderColor: 'hsl(var(--ring))',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'hsl(var(--ring))',
      },
    },
    '& .MuiInputLabel-root': {
      color: 'hsl(var(--muted-foreground))',
      '&.Mui-focused': {
        color: 'hsl(var(--ring))',
      },
    },
  };

  const handleInsert = () => {
    onInsert(url, linkText);
    setUrl('');
    setLinkText('');
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="sm" 
      fullWidth
      PaperProps={{ sx: dialogPaperStyle }}
    >
      <DialogTitle sx={{ color: 'hsl(var(--card-foreground))' }}>Insert Link</DialogTitle>
      <DialogContent>
        <Typography variant="body2" sx={{ mb: 2, color: 'hsl(var(--muted-foreground))' }}>
          {selectedText ? `Link text: "${selectedText}"` : 'Enter link details below'}
        </Typography>
        <Input
          autoFocus
          margin="dense"
          placeholder="URL"
          type="url"
          fullWidth
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          sx={{ mb: 2, ...dialogTextFieldStyle }}
        />
        {!selectedText && (
          <Input
            margin="dense"
            placeholder="Link Text (optional)"
            fullWidth
            value={linkText}
            onChange={(e) => setLinkText(e.target.value)}
            sx={dialogTextFieldStyle}
          />
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleInsert} variant="contained" disabled={!url}>
          Insert
        </Button>
      </DialogActions>
    </Dialog>
  );
};

// Image Dialog Component
interface ImageDialogProps {
  open: boolean;
  onClose: () => void;
  onUpload: (file: File) => void;
  onSelect: (url: string, name: string) => void;
  bucketImages: string[];
  isLoadingBucket: boolean;
}

const ImageDialog: React.FC<ImageDialogProps> = ({ 
  open, 
  onClose, 
  onUpload, 
  onSelect,
  bucketImages,
  isLoadingBucket
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [activeTab, setActiveTab] = useState<'upload' | 'bucket'>('upload');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const dialogPaperStyle = {
    backgroundColor: 'hsl(var(--card))',
    color: 'hsl(var(--card-foreground))',
    border: '1px solid hsl(var(--border))',
    borderRadius: '12px',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  };

  const tabButtonStyle = {
    color: 'hsl(var(--muted-foreground))',
    borderBottom: '2px solid transparent',
    borderRadius: 0,
    textTransform: 'none',
    fontWeight: 500,
    px: 3,
    py: 1.5,
    '&:hover': {
      backgroundColor: 'hsl(var(--accent) / 0.1)',
      color: 'hsl(var(--foreground))',
    },
  };

  const activeTabStyle = {
    color: 'hsl(var(--primary))',
    borderBottom: '2px solid hsl(var(--primary))',
    backgroundColor: 'hsl(var(--accent) / 0.1)',
  };

  const mediaGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
    gap: 2,
    maxHeight: '400px',
    overflowY: 'auto',
    p: 1,
    backgroundColor: 'hsl(var(--muted) / 0.1)',
    borderRadius: 1,
  };

  const mediaItemStyle = {
    border: '1px solid hsl(var(--border))',
    borderRadius: 2,
    p: 1.5,
    cursor: 'pointer',
    backgroundColor: 'hsl(var(--card))',
    transition: 'all 0.2s ease-in-out',
    '&:hover': {
      borderColor: 'hsl(var(--primary))',
      backgroundColor: 'hsl(var(--accent) / 0.1)',
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      onUpload(selectedFile);
      setSelectedFile(null);
    }
  };

  const handleClose = () => {
    setSelectedFile(null);
    setActiveTab('upload');
    onClose();
  };

  const getFileNameFromUrl = (url: string) => {
    const urlParts = url.split('/');
    return urlParts[urlParts.length - 1] || 'image';
  };

  return (
    <Dialog 
      open={open} 
      onClose={handleClose} 
      maxWidth="md" 
      fullWidth
      PaperProps={{ sx: dialogPaperStyle }}
    >
      <DialogTitle sx={{ color: 'hsl(var(--card-foreground))' }}>Insert Image</DialogTitle>
      <DialogContent>
        {/* Tabs */}
        <Box sx={{ borderBottom: 1, borderColor: 'hsl(var(--border))', mb: 3 }}>
          <Box sx={{ display: 'flex' }}>
            <Button
              onClick={() => setActiveTab('upload')}
              sx={{
                ...tabButtonStyle,
                ...(activeTab === 'upload' && activeTabStyle)
              }}
            >
              Upload New
            </Button>
            <Button
              onClick={() => setActiveTab('bucket')}
              sx={{
                ...tabButtonStyle,
                ...(activeTab === 'bucket' && activeTabStyle)
              }}
            >
              Choose from Bucket ({bucketImages.length})
            </Button>
          </Box>
        </Box>

        {/* Upload Tab */}
        {activeTab === 'upload' && (
          <Box>
            <Input
              ref={fileInputRef}
              type="file"
              inputProps={{ accept: 'image/*' }}
              onChange={handleFileSelect}
              fullWidth
              sx={{
                '& .MuiInput-input': {
                  color: 'hsl(var(--muted-foreground))',
                  '&::file-selector-button': {
                    color: 'hsl(var(--primary))',
                    backgroundColor: 'hsl(var(--primary-foreground))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '6px',
                    padding: '8px 16px',
                    marginRight: '12px',
                    cursor: 'pointer',
                    '&:hover': {
                      backgroundColor: 'hsl(var(--primary) / 0.9)',
                    }
                  }
                }
              }}
            />
            {selectedFile && (
              <Typography variant="body2" sx={{ mt: 1, color: 'hsl(var(--muted-foreground))' }}>
                Selected: {selectedFile.name}
              </Typography>
            )}
          </Box>
        )}

        {/* Bucket Tab */}
        {activeTab === 'bucket' && (
          <Box>
            {isLoadingBucket ? (
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <Typography>Loading images...</Typography>
              </Box>
            ) : bucketImages.length > 0 ? (
              <Box sx={mediaGridStyle}>
                {bucketImages.map((imageUrl, index) => (
                  <Box
                    key={index}
                    sx={mediaItemStyle}
                    onClick={() => onSelect(imageUrl, getFileNameFromUrl(imageUrl))}
                  >
                    <img
                      src={imageUrl}
                      alt={`Image ${index + 1}`}
                      style={{
                        width: '100%',
                        height: '80px',
                        objectFit: 'cover',
                        borderRadius: '4px'
                      }}
                    />
                    <Typography variant="caption" sx={{ 
                      display: 'block', 
                      mt: 1, 
                      textAlign: 'center',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}>
                      {getFileNameFromUrl(imageUrl)}
                    </Typography>
                  </Box>
                ))}
              </Box>
            ) : (
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <Typography sx={{ color: 'hsl(var(--muted-foreground))' }}>No images found in bucket</Typography>
              </Box>
              )}
          </Box>
        )}
      </DialogContent>
      <DialogActions sx={{ px: 3, py: 2, gap: 1 }}>
        <Button 
          onClick={handleClose}
          sx={{
            color: 'hsl(var(--muted-foreground))',
            '&:hover': {
              backgroundColor: 'hsl(var(--accent) / 0.1)',
            }
          }}
        >
          Cancel
        </Button>
        {activeTab === 'upload' && (
          <Button 
            onClick={handleUpload} 
            variant="contained" 
            disabled={!selectedFile}
            sx={{
              backgroundColor: 'hsl(var(--primary))',
              color: 'hsl(var(--primary-foreground))',
              '&:hover': {
                backgroundColor: 'hsl(var(--primary) / 0.9)',
              },
              '&:disabled': {
                backgroundColor: 'hsl(var(--muted))',
                color: 'hsl(var(--muted-foreground))',
              }
            }}
          >
            Upload & Insert
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

// Video Dialog Component
interface VideoDialogProps {
  open: boolean;
  onClose: () => void;
  onUpload: (file: File) => void;
  onSelect: (url: string, name: string) => void;
  bucketVideos: string[];
  isLoadingBucket: boolean;
}

const VideoDialog: React.FC<VideoDialogProps> = ({ 
  open, 
  onClose, 
  onUpload, 
  onSelect,
  bucketVideos,
  isLoadingBucket
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [activeTab, setActiveTab] = useState<'upload' | 'bucket'>('upload');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const dialogPaperStyle = {
    backgroundColor: 'hsl(var(--card))',
    color: 'hsl(var(--card-foreground))',
    border: '1px solid hsl(var(--border))',
    borderRadius: '12px',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  };

  const tabButtonStyle = {
    color: 'hsl(var(--muted-foreground))',
    borderBottom: '2px solid transparent',
    borderRadius: 0,
    textTransform: 'none',
    fontWeight: 500,
    px: 3,
    py: 1.5,
    '&:hover': {
      backgroundColor: 'hsl(var(--accent) / 0.1)',
      color: 'hsl(var(--foreground))',
    },
  };

  const activeTabStyle = {
    color: 'hsl(var(--primary))',
    borderBottom: '2px solid hsl(var(--primary))',
    backgroundColor: 'hsl(var(--accent) / 0.1)',
  };

  const mediaGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
    gap: 2,
    maxHeight: '400px',
    overflowY: 'auto',
    p: 1,
    backgroundColor: 'hsl(var(--muted) / 0.1)',
    borderRadius: 1,
  };

  const mediaItemStyle = {
    border: '1px solid hsl(var(--border))',
    borderRadius: 2,
    p: 1.5,
    cursor: 'pointer',
    backgroundColor: 'hsl(var(--card))',
    transition: 'all 0.2s ease-in-out',
    '&:hover': {
      borderColor: 'hsl(var(--primary))',
      backgroundColor: 'hsl(var(--accent) / 0.1)',
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      onUpload(selectedFile);
      setSelectedFile(null);
    }
  };

  const handleClose = () => {
    setSelectedFile(null);
    setActiveTab('upload');
    onClose();
  };

  const getFileNameFromUrl = (url: string) => {
    const urlParts = url.split('/');
    return urlParts[urlParts.length - 1] || 'video';
  };

  return (
    <Dialog 
      open={open} 
      onClose={handleClose} 
      maxWidth="md" 
      fullWidth
      PaperProps={{ sx: dialogPaperStyle }}
    >
      <DialogTitle sx={{ color: 'hsl(var(--card-foreground))' }}>Insert Video</DialogTitle>
      <DialogContent>
        {/* Tabs */}
        <Box sx={{ borderBottom: 1, borderColor: 'hsl(var(--border))', mb: 3 }}>
          <Box sx={{ display: 'flex' }}>
            <Button
              onClick={() => setActiveTab('upload')}
              sx={{
                ...tabButtonStyle,
                ...(activeTab === 'upload' && activeTabStyle)
              }}
            >
              Upload New
            </Button>
            <Button
              onClick={() => setActiveTab('bucket')}
              sx={{
                ...tabButtonStyle,
                ...(activeTab === 'bucket' && activeTabStyle)
              }}
            >
              Choose from Bucket ({bucketVideos.length})
            </Button>
          </Box>
        </Box>

        {/* Upload Tab */}
        {activeTab === 'upload' && (
          <Box>
            <Input
              ref={fileInputRef}
              type="file"
              inputProps={{ accept: 'video/*' }}
              onChange={handleFileSelect}
              fullWidth
              sx={{
                '& .MuiInput-input': {
                  color: 'hsl(var(--muted-foreground))',
                  '&::file-selector-button': {
                    color: 'hsl(var(--primary))',
                    backgroundColor: 'hsl(var(--primary-foreground))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '6px',
                    padding: '8px 16px',
                    marginRight: '12px',
                    cursor: 'pointer',
                    '&:hover': {
                      backgroundColor: 'hsl(var(--primary) / 0.9)',
                    }
                  }
                }
              }}
            />
            {selectedFile && (
              <Typography variant="body2" sx={{ mt: 1, color: 'hsl(var(--muted-foreground))' }}>
                Selected: {selectedFile.name} ({(selectedFile.size / (1024 * 1024)).toFixed(2)} MB)
              </Typography>
            )}
          </Box>
        )}

        {/* Bucket Tab */}
        {activeTab === 'bucket' && (
          <Box>
            {isLoadingBucket ? (
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <Typography>Loading videos...</Typography>
              </Box>
            ) : bucketVideos.length > 0 ? (
              <Box sx={mediaGridStyle}>
                {bucketVideos.map((videoUrl, index) => (
                  <Box
                    key={index}
                    sx={mediaItemStyle}
                    onClick={() => onSelect(videoUrl, getFileNameFromUrl(videoUrl))}
                  >
                    <Box sx={{
                      width: '100%',
                      height: '80px',
                      backgroundColor: 'hsl(var(--muted))',
                      borderRadius: '4px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 1
                    }}>
                      <Typography variant="h6" color="textSecondary">
                        🎥
                      </Typography>
                    </Box>
                    <Typography variant="caption" sx={{ 
                      display: 'block', 
                      textAlign: 'center',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}>
                      {getFileNameFromUrl(videoUrl)}
                    </Typography>
                  </Box>
                ))}
              </Box>
            ) : (
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <Typography sx={{ color: 'hsl(var(--muted-foreground))' }}>No videos found in bucket</Typography>
              </Box>
            )}
          </Box>
        )}
      </DialogContent>
      <DialogActions sx={{ px: 3, py: 2, gap: 1 }}>
        <Button 
          onClick={handleClose}
          sx={{
            color: 'hsl(var(--muted-foreground))',
            '&:hover': {
              backgroundColor: 'hsl(var(--accent) / 0.1)',
            }
          }}
        >
          Cancel
        </Button>
        {activeTab === 'upload' && (
          <Button 
            onClick={handleUpload} 
            variant="contained" 
            disabled={!selectedFile}
            sx={{
              backgroundColor: 'hsl(var(--primary))',
              color: 'hsl(var(--primary-foreground))',
              '&:hover': {
                backgroundColor: 'hsl(var(--primary) / 0.9)',
              },
              '&:disabled': {
                backgroundColor: 'hsl(var(--muted))',
                color: 'hsl(var(--muted-foreground))',
              }
            }}
          >
            Upload & Insert
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default RichTextEditor;