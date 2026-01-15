import React, { useState } from 'react';
import { Building2, MapPin, Tag, FileText, Phone, ArrowRight, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const CreateBusiness = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        businessName: '',
        category: '',
        location: '',
        phone: '',
        description: ''
    });
    const [errors, setErrors] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.businessName.trim()) newErrors.businessName = 'Business Name is required';
        if (!formData.category) newErrors.category = 'Category is required';
        if (!formData.location.trim()) newErrors.location = 'Location is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        const token = localStorage.getItem('ratebiz_token');
        if (!token) {
            alert("You must be logged in to create a business.");
            navigate('/login');
            return;
        }

        setIsLoading(true);

        // Assume token is needed in headers
        try {
            const response = await fetch('https://unimarket-mw.com/ratebiz/api/businesses', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                console.log('Business created:', data);
                alert("Business created successfully!");
                navigate('/my-businesses'); // Redirect to business dashboard
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
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            paddingTop: '80px' // Account for navbar
        }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="glass-card"
                style={{
                    width: '100%',
                    maxWidth: '600px',
                    padding: '40px',
                    position: 'relative'
                }}
            >
                <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                    <div style={{
                        width: '64px',
                        height: '64px',
                        background: 'linear-gradient(135deg, var(--primary), var(--accent-purple))',
                        borderRadius: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 20px auto',
                        boxShadow: '0 8px 20px rgba(37, 99, 235, 0.3)'
                    }}>
                        <Building2 size={32} color="white" />
                    </div>
                    <h1 className="gradient-text" style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '8px' }}>
                        Create Business
                    </h1>
                    <p style={{ color: 'var(--text-muted)' }}>List your business on RateBiz and start collecting reviews.</p>
                </div>

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
            </motion.div>
        </div>
    );
};

export default CreateBusiness;
