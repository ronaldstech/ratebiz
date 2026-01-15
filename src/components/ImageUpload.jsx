import React, { useRef, useState } from 'react';
import { Upload, Image as ImageIcon, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ImageUpload = ({ onImageSelect, selectedImage }) => {
    const fileInputRef = useRef(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [isDragging, setIsDragging] = useState(false);

    const handleFileSelect = (file) => {
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setPreviewUrl(e.target.result);
                onImageSelect(file);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleChange = (e) => {
        const file = e.target.files[0];
        handleFileSelect(file);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        handleFileSelect(file);
    };

    const clearImage = (e) => {
        e.stopPropagation();
        setPreviewUrl(null);
        onImageSelect(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    return (
        <div className="input-group">
            <label>Business Logo / Image</label>
            <div
                onClick={() => fileInputRef.current.click()}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                style={{
                    border: `2px dashed ${isDragging ? 'var(--primary)' : 'var(--glass-border)'}`,
                    borderRadius: '16px',
                    padding: '24px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    background: isDragging ? 'rgba(37, 99, 235, 0.1)' : 'rgba(255, 255, 255, 0.05)',
                    transition: 'all 0.3s ease',
                    position: 'relative',
                    minHeight: '160px',
                    overflow: 'hidden'
                }}
            >
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleChange}
                    accept="image/*"
                    style={{ display: 'none' }}
                />

                <AnimatePresence mode="wait">
                    {previewUrl ? (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            style={{ position: 'relative', width: '100%', height: '200px', display: 'flex', justifyContent: 'center' }}
                        >
                            <img
                                src={previewUrl}
                                alt="Preview"
                                style={{
                                    maxWidth: '100%',
                                    maxHeight: '100%',
                                    objectFit: 'contain',
                                    borderRadius: '8px'
                                }}
                            />
                            <button
                                onClick={clearImage}
                                style={{
                                    position: 'absolute',
                                    top: '-10px',
                                    right: '-10px',
                                    background: 'var(--error)',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '50%',
                                    padding: '4px',
                                    cursor: 'pointer',
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
                                }}
                            >
                                <X size={16} />
                            </button>
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            style={{ textAlign: 'center', color: 'var(--text-muted)' }}
                        >
                            <div style={{
                                width: '48px',
                                height: '48px',
                                background: 'rgba(255,255,255,0.1)',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: '0 auto 12px auto'
                            }}>
                                <Upload size={24} />
                            </div>
                            <p style={{ margin: '0 0 4px 0', fontWeight: '500', color: 'white' }}>Click or drag to upload logo</p>
                            <p style={{ margin: 0, fontSize: '0.8rem' }}>SVG, PNG, JPG (max 2MB)</p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default ImageUpload;
