import React, { useState } from 'react';
import { Building2, MapPin, Tag, FileText, Phone, ArrowRight, Plus, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ImageUpload from '../components/ImageUpload';

const CreateBusiness = ({ isOpen, onClose, onCreated }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        businessName: '',
        category: '',
        location: '',
        phone: '',
        description: ''
    });
    const [imageFile, setImageFile] = useState(null);
    const [errors, setErrors] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
    };

    const handleImageSelect = (file) => {
        setImageFile(file);
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.businessName.trim()) newErrors.businessName = 'Business Name is required';
        if (!formData.category) newErrors.category = 'Category is required';
        if (!formData.location.trim()) newErrors.location = 'Location is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const uploadImage = async (file) => {
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch('https://unimarket-mw.com/ratebiz/api/upload', {
                method: 'POST',
                body: formData
            });
            const data = await response.json();
            if (response.ok) {
                return data.url; // Adjust based on actual API response structure
            } else {
                throw new Error(data.message || 'Image upload failed');
            }
        } catch (error) {
            console.error('Image upload error:', error);
            throw error;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        const token = localStorage.getItem('ratebiz_token');
        if (!token) return;

        setIsLoading(true);

        try {
            let imageUrl = '';
            if (imageFile) {
                // Upload image first
                try {
                    imageUrl = await uploadImage(imageFile);
                } catch (uploadError) {
                    setErrors(prev => ({ ...prev, submit: "Failed to upload image. Please try again." }));
                    setIsLoading(false);
                    return;
                }
            }

            const payload = {
                ...formData,
                imageUrl // Add image URL to payload
            };

            const response = await fetch('https://unimarket-mw.com/ratebiz/api/businesses', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(payload)
            });

            const data = await response.json();

            if (response.ok) {
                console.log('Business created:', data);
                alert("Business created successfully!");
                // Reset form
                setFormData({
                    businessName: '',
                    category: '',
                    location: '',
                    phone: '',
                    description: ''
                });
                setImageFile(null);
                if (onCreated) onCreated(); // Trigger refresh
                onClose(); // Close drawer
            } else {
                console.error('Creation failed:', data);
                setErrors(prev => ({
                    ...prev,
                    submit: data.message || "Failed to create business."
                }));
            }
        } catch (error) {
            console.error('Network error:', error);
            setErrors(prev => ({
                ...prev,
                submit: "Network error. Please try again later."
            }));
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: 'rgba(0, 0, 0, 0.5)',
                            backdropFilter: 'blur(4px)',
                            zIndex: 1001
                        }}
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="glass-card"
                        style={{
                            position: 'fixed',
                            top: 0,
                            right: 0,
                            bottom: 0,
                            width: '100%',
                            maxWidth: '500px',
                            background: 'rgba(30, 41, 59, 0.95)',
                            borderLeft: '1px solid var(--glass-border)',
                            zIndex: 1002,
                            padding: '0',
                            overflowY: 'auto'
                        }}
                    >
                        <div style={{ padding: '24px', borderBottom: '1px solid var(--glass-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, background: 'rgba(30, 41, 59, 0.95)', zIndex: 10 }}>
                            <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: '700' }}>Create Business</h2>
                            <button
                                onClick={onClose}
                                style={{
                                    background: 'transparent',
                                    border: 'none',
                                    color: 'var(--text-muted)',
                                    cursor: 'pointer',
                                    padding: '8px',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                <X size={24} />
                            </button>
                        </div>

                        <div style={{ padding: '24px' }}>
                            {errors.submit && (
                                <div className="error-banner" style={{
                                    background: 'rgba(255, 59, 48, 0.1)',
                                    border: '1px solid var(--error)',
                                    color: 'var(--error)',
                                    padding: '12px',
                                    borderRadius: '8px',
                                    marginBottom: '20px',
                                    textAlign: 'center'
                                }}>
                                    {errors.submit}
                                </div>
                            )}

                            <form onSubmit={handleSubmit}>
                                <div className="form-grid" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

                                    {/* Image Upload Component */}
                                    <ImageUpload onImageSelect={handleImageSelect} selectedImage={imageFile} />

                                    <div className="input-group">
                                        <label>Business Name</label>
                                        <div className="input-wrapper">
                                            <Building2 size={18} className="input-icon" />
                                            <input
                                                type="text"
                                                name="businessName"
                                                placeholder="Tech Solutions Inc"
                                                value={formData.businessName}
                                                onChange={handleInputChange}
                                                className={errors.businessName ? 'error' : ''}
                                            />
                                        </div>
                                        {errors.businessName && <span className="error-text">{errors.businessName}</span>}
                                    </div>

                                    <div className="input-group">
                                        <label>Category</label>
                                        <div className="input-wrapper">
                                            <Tag size={18} className="input-icon" />
                                            <select
                                                name="category"
                                                value={formData.category}
                                                onChange={handleInputChange}
                                                className={errors.category ? 'error' : ''}
                                                style={{ width: '100%', background: 'transparent', border: 'none', outline: 'none', paddingLeft: '48px', color: 'white' }}
                                            >
                                                <option value="" style={{ color: 'black' }}>Select Category...</option>
                                                <option value="Retail" style={{ color: 'black' }}>Retail</option>
                                                <option value="Food & Dining" style={{ color: 'black' }}>Food & Dining</option>
                                                <option value="Service" style={{ color: 'black' }}>Service</option>
                                                <option value="Technology" style={{ color: 'black' }}>Technology</option>
                                                <option value="Healthcare" style={{ color: 'black' }}>Healthcare</option>
                                                <option value="Other" style={{ color: 'black' }}>Other</option>
                                            </select>
                                        </div>
                                        {errors.category && <span className="error-text">{errors.category}</span>}
                                    </div>

                                    <div className="input-group">
                                        <label>Phone Number</label>
                                        <div className="input-wrapper">
                                            <Phone size={18} className="input-icon" />
                                            <input
                                                type="tel"
                                                name="phone"
                                                placeholder="+1 234 567 890"
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>

                                    <div className="input-group">
                                        <label>Location / Address</label>
                                        <div className="input-wrapper">
                                            <MapPin size={18} className="input-icon" />
                                            <input
                                                type="text"
                                                name="location"
                                                placeholder="123 Business St, City"
                                                value={formData.location}
                                                onChange={handleInputChange}
                                                className={errors.location ? 'error' : ''}
                                            />
                                        </div>
                                        {errors.location && <span className="error-text">{errors.location}</span>}
                                    </div>

                                    <div className="input-group">
                                        <label>Description (Optional)</label>
                                        <div className="input-wrapper" style={{ alignItems: 'flex-start' }}>
                                            <FileText size={18} className="input-icon" style={{ marginTop: '12px' }} />
                                            <textarea
                                                name="description"
                                                placeholder="Tell us about your business..."
                                                value={formData.description}
                                                onChange={handleInputChange}
                                                style={{
                                                    minHeight: '100px',
                                                    paddingTop: '12px',
                                                    width: '100%',
                                                    background: 'rgba(255, 255, 255, 0.05)',
                                                    border: '1px solid var(--glass-border)',
                                                    borderRadius: '12px',
                                                    paddingLeft: '48px',
                                                    color: 'white',
                                                    resize: 'vertical'
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <button
                                    className="btn-primary"
                                    style={{ width: '100%', padding: '14px', marginTop: '24px' }}
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <motion.div
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                        >
                                            <ArrowRight size={20} />
                                        </motion.div>
                                    ) : (
                                        <>
                                            <Plus size={20} />
                                            Create Business
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default CreateBusiness;
