import React, { useState, useEffect, useCallback } from 'react';
import { Building2, Plus, ArrowRight, MapPin, Loader2, Star, TrendingUp, Users } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import CreateBusiness from './CreateBusiness';

const MyBusinesses = () => {
    const navigate = useNavigate();
    const [businesses, setBusinesses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const fetchBusinesses = useCallback(async () => {
        const token = localStorage.getItem('ratebiz_token');
        if (!token) {
            navigate('/login');
            return;
        }

        setIsLoading(true);
        try {
            const response = await fetch('https://unimarket-mw.com/ratebiz/api/my-businesses', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.status === 401) {
                localStorage.removeItem('ratebiz_token');
                navigate('/login');
                return;
            }

            if (!response.ok) {
                throw new Error('Failed to fetch businesses');
            }

            const data = await response.json();

            // Handle different possible response structures
            if (Array.isArray(data)) {
                setBusinesses(data);
            } else if (data.businesses && Array.isArray(data.businesses)) {
                setBusinesses(data.businesses);
            } else if (data.data && Array.isArray(data.data)) {
                setBusinesses(data.data);
            } else {
                setBusinesses([]);
            }
            setError('');
        } catch (err) {
            console.error('Failed to fetch businesses:', err);
            setError('Failed to load your businesses. Please try again.');
        } finally {
            setIsLoading(false);
        }
    }, [navigate]);

    useEffect(() => {
        fetchBusinesses();
    }, [fetchBusinesses]);

    // Skeleton Loader Component
    const BusinessCardSkeleton = () => (
        <div className="glass-card" style={{ padding: '0', overflow: 'hidden', height: '100%', minHeight: '380px', display: 'flex', flexDirection: 'column' }}>
            <div className="skeleton" style={{ height: '180px', width: '100%', borderRadius: '0' }} />
            <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                    <div className="skeleton" style={{ width: '80px', height: '24px', borderRadius: '12px' }} />
                    <div className="skeleton" style={{ width: '60px', height: '24px', borderRadius: '12px' }} />
                </div>
                <div className="skeleton" style={{ width: '70%', height: '32px', marginBottom: '12px' }} />
                <div className="skeleton" style={{ width: '40%', height: '20px', marginBottom: '24px' }} />
                <div style={{ marginTop: 'auto', display: 'flex', gap: '12px' }}>
                    <div className="skeleton" style={{ flex: 1, height: '40px', borderRadius: '12px' }} />
                </div>
            </div>
        </div>
    );

    return (
        <div style={{
            minHeight: '100vh',
            padding: '100px 20px 60px',
            maxWidth: '1200px',
            margin: '0 auto'
        }}>
            {/* Header Section */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'end',
                marginBottom: '48px',
                flexWrap: 'wrap',
                gap: '20px'
            }}>
                <div>
                    <h1 className="gradient-text" style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '8px', lineHeight: 1.2 }}>
                        My Businesses
                    </h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Manage your listings, track performance, and grow your audience.</p>
                </div>
                <motion.button
                    whileHover={{ y: -2, boxShadow: '0 8px 24px rgba(37, 99, 235, 0.4)' }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setIsDrawerOpen(true)}
                    className="btn-primary"
                    style={{
                        padding: '12px 24px',
                        fontSize: '1rem',
                        borderRadius: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        height: 'fit-content'
                    }}
                >
                    <Plus size={20} />
                    Add New Business
                </motion.button>
            </div>

            {isLoading ? (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '32px' }}>
                    {[1, 2, 3].map(i => <BusinessCardSkeleton key={i} />)}
                </div>
            ) : error ? (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--error)' }}
                >
                    <p style={{ fontSize: '1.1rem', marginBottom: '16px' }}>{error}</p>
                    <button
                        onClick={fetchBusinesses}
                        className="btn-secondary"
                        style={{
                            padding: '10px 24px',
                            background: 'rgba(255,255,255,0.05)',
                            border: '1px solid var(--glass-border)',
                            color: 'white',
                            borderRadius: '12px',
                            cursor: 'pointer'
                        }}
                    >
                        Try Again
                    </button>
                </motion.div>
            ) : businesses.length === 0 ? (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="glass-card"
                    style={{
                        padding: '80px 20px',
                        textAlign: 'center',
                        borderRadius: '32px',
                        border: '1px dashed var(--glass-border)',
                        background: 'linear-gradient(180deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0) 100%)'
                    }}
                >
                    <div style={{
                        width: '100px',
                        height: '100px',
                        background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.1), rgba(129, 140, 248, 0.1))',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 32px auto',
                        boxShadow: '0 0 40px rgba(37, 99, 235, 0.1)'
                    }}>
                        <Building2 size={48} style={{ color: 'var(--primary)' }} />
                    </div>
                    <h2 style={{ fontSize: '2rem', marginBottom: '16px', fontWeight: '700' }}>No businesses found</h2>
                    <p style={{ color: 'var(--text-muted)', maxWidth: '500px', margin: '0 auto 40px auto', fontSize: '1.1rem', lineHeight: 1.6 }}>
                        You haven't listed any businesses yet. Create your first listing today to start collecting reviews and building your online reputation.
                    </p>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsDrawerOpen(true)}
                        className="btn-primary"
                        style={{ padding: '16px 32px', fontSize: '1.1rem' }}
                    >
                        Create Your First Business
                    </motion.button>
                </motion.div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '32px' }}>
                    {businesses.map((business, index) => (
                        <motion.div
                            key={business.id || index}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.5, ease: "easeOut" }}
                            whileHover={{ y: -8, transition: { duration: 0.2 } }}
                            className="glass-card"
                            style={{
                                padding: '0',
                                borderRadius: '24px',
                                position: 'relative',
                                overflow: 'hidden',
                                display: 'flex',
                                flexDirection: 'column',
                                height: '100%',
                                border: '1px solid rgba(255,255,255,0.08)'
                            }}
                        >
                            {/* Card Image Area */}
                            <div style={{
                                height: '200px',
                                width: '100%',
                                overflow: 'hidden',
                                position: 'relative',
                                background: 'rgba(0,0,0,0.2)'
                            }}>
                                <img
                                    src={business.imageUrl || "https://unimarket-mw.com/ratebiz/uploads/logo.png"}
                                    alt={business.businessName}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        transition: 'transform 0.5s ease'
                                    }}
                                    className="card-image"
                                />
                                <div style={{
                                    position: 'absolute',
                                    top: '16px',
                                    right: '16px',
                                    background: 'rgba(0,0,0,0.6)',
                                    backdropFilter: 'blur(8px)',
                                    padding: '6px 12px',
                                    borderRadius: '20px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '4px',
                                    fontSize: '0.875rem',
                                    color: '#fbbf24',
                                    fontWeight: '600'
                                }}>
                                    <Star size={14} fill="#fbbf24" />
                                    {business.rating || '0.0'}
                                </div>
                            </div>

                            {/* Card Content */}
                            <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '12px' }}>
                                    <span style={{
                                        fontSize: '0.75rem',
                                        background: 'rgba(37, 99, 235, 0.15)',
                                        color: '#60a5fa',
                                        padding: '6px 12px',
                                        borderRadius: '20px',
                                        fontWeight: '600',
                                        letterSpacing: '0.5px',
                                        textTransform: 'uppercase'
                                    }}>
                                        {business.category || 'Retail'}
                                    </span>
                                </div>

                                <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '8px', lineHeight: 1.3 }}>
                                    {business.businessName || 'Business Name'}
                                </h3>

                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '24px' }}>
                                    <MapPin size={16} />
                                    {business.location || 'Location not set'}
                                </div>

                                {/* Stats Row (Mock for now) */}
                                <div style={{
                                    display: 'flex',
                                    gap: '16px',
                                    marginBottom: '24px',
                                    paddingBottom: '24px',
                                    borderBottom: '1px solid rgba(255,255,255,0.05)'
                                }}>
                                    <div style={{ flex: 1 }}>
                                        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Total Reviews</p>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '1rem', fontWeight: '600' }}>
                                            <Users size={16} color="var(--accent-purple)" />
                                            {business.reviewCount || 0}
                                        </div>
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Avg Rating</p>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '1rem', fontWeight: '600' }}>
                                            <TrendingUp size={16} color="var(--accent-cyan)" />
                                            {business.rating || '0.0'}
                                        </div>
                                    </div>
                                </div>

                                <Link
                                    to={`/business/${business.id}`}
                                    style={{
                                        textDecoration: 'none',
                                        width: '100%',
                                        marginTop: 'auto'
                                    }}
                                >
                                    <button style={{
                                        width: '100%',
                                        padding: '12px',
                                        background: 'rgba(255,255,255,0.05)',
                                        border: '1px solid var(--glass-border)',
                                        borderRadius: '12px',
                                        color: 'white',
                                        fontWeight: '600',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '8px',
                                        transition: 'all 0.2s ease'
                                    }}
                                        onMouseOver={(e) => {
                                            e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                                            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
                                        }}
                                        onMouseOut={(e) => {
                                            e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                                            e.currentTarget.style.borderColor = 'var(--glass-border)';
                                        }}
                                    >
                                        Manage Dashboard <ArrowRight size={16} />
                                    </button>
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}

            <CreateBusiness
                isOpen={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
                onCreated={fetchBusinesses}
            />
        </div>
    );
};

export default MyBusinesses;
