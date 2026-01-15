import React, { useState, useEffect } from 'react';
import { Star, TrendingUp, ShieldCheck, Zap, ArrowRight, MessageSquare, MapPin, Users, Building2, Loader2, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import ReviewModal from '../components/ReviewModal';

const Home = () => {
    const navigate = useNavigate();
    const [businesses, setBusinesses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedBusiness, setSelectedBusiness] = useState(null);
    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    useEffect(() => {
        const fetchBusinesses = async () => {
            setIsLoading(true);
            try {
                const response = await fetch('https://unimarket-mw.com/ratebiz/api/businesses');

                if (!response.ok) {
                    throw new Error('Failed to fetch businesses');
                }

                const data = await response.json();

                // Handle different possible response structures
                let businessesData = [];
                if (Array.isArray(data)) {
                    businessesData = data;
                } else if (data.businesses && Array.isArray(data.businesses)) {
                    businessesData = data.businesses;
                } else if (data.data && Array.isArray(data.data)) {
                    businessesData = data.data;
                }

                setBusinesses(businessesData);
                setError('');
            } catch (err) {
                console.error('Failed to fetch businesses:', err);
                setError('Failed to load businesses. Please refresh the page.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchBusinesses();
    }, []);

    const handleRateClick = (business) => {
        const token = localStorage.getItem('ratebiz_token');
        if (!token) {
            navigate('/login');
            return;
        }
        setSelectedBusiness(business);
        setIsReviewModalOpen(true);
    };

    const handleReviewSuccess = () => {
        setShowSuccessMessage(true);
        setTimeout(() => setShowSuccessMessage(false), 3000);
    };

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
        <div className="container">
            {/* Success Toast */}
            <AnimatePresence>
                {showSuccessMessage && (
                    <motion.div
                        initial={{ opacity: 0, y: -50, x: '-50%' }}
                        animate={{ opacity: 1, y: 20, x: '-50%' }}
                        exit={{ opacity: 0, y: -50, x: '-50%' }}
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: '50%',
                            zIndex: 10000,
                            background: '#10b981',
                            color: 'white',
                            padding: '16px 24px',
                            borderRadius: '50px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            boxShadow: '0 10px 30px rgba(16, 185, 129, 0.3)',
                            fontWeight: '600'
                        }}
                    >
                        <CheckCircle size={24} /> Review Submitted Successfully!
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Hero Section */}
            <section style={{ textAlign: 'center', padding: '100px 0 80px' }}>
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    style={{
                        fontSize: 'clamp(3rem, 6vw, 4.5rem)',
                        fontWeight: '900',
                        marginBottom: '24px',
                        lineHeight: '1.1',
                        letterSpacing: '-1px'
                    }}
                >
                    Discover & Rate <br />
                    <span style={{
                        background: 'linear-gradient(135deg, var(--accent-cyan), var(--accent-purple))',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                    }}>
                        Trusted Businesses
                    </span>
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    style={{
                        color: 'var(--text-muted)',
                        fontSize: '1.125rem',
                        maxWidth: '650px',
                        margin: '0 auto 40px',
                        lineHeight: '1.6'
                    }}
                >
                    Join thousands of users sharing honest experiences about local businesses, products, and services in complete anonymity.
                </motion.p>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}
                >
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="btn-primary"
                        onClick={() => navigate('/signup')}
                        style={{ padding: '14px 32px', fontSize: '1.1rem', borderRadius: '16px' }}
                    >
                        Get Started <ArrowRight size={20} />
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.05, background: 'rgba(255, 255, 255, 0.1)' }}
                        whileTap={{ scale: 0.95 }}
                        style={{
                            background: 'rgba(255, 255, 255, 0.05)',
                            color: 'white',
                            border: '1px solid var(--glass-border)',
                            padding: '14px 32px',
                            borderRadius: '16px',
                            fontWeight: '600',
                            fontSize: '1.1rem',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                        }}
                    >
                        Explore Listings
                    </motion.button>
                </motion.div>
            </section>

            {/* Stats Section */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '24px',
                marginBottom: '100px'
            }}>
                {[
                    { icon: <TrendingUp className="text-cyan" size={28} />, label: "Growing Fast", sub: "500+ New Weekly" },
                    { icon: <ShieldCheck className="text-purple" size={28} />, label: "Verified Reviews", sub: "100% Authentic" },
                    { icon: <Zap className="text-yellow" size={28} />, label: "Instant Access", sub: "Free for Everyone" }
                ].map((stat, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="glass-card"
                        style={{ padding: '32px', textAlign: 'center', borderRadius: '24px', background: 'rgba(30, 41, 59, 0.4)' }}
                    >
                        <div style={{
                            marginBottom: '16px',
                            display: 'inline-flex',
                            padding: '16px',
                            background: 'rgba(255,255,255,0.03)',
                            borderRadius: '20px',
                            boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                        }}>
                            {stat.icon}
                        </div>
                        <div style={{ fontWeight: '700', fontSize: '1.25rem', marginBottom: '4px' }}>{stat.label}</div>
                        <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{stat.sub}</div>
                    </motion.div>
                ))}
            </div>

            {/* Listings Section */}
            <section style={{ paddingBottom: '100px' }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'end',
                    marginBottom: '40px'
                }}>
                    <div>
                        <h2 className="gradient-text" style={{ fontSize: '2.5rem', fontWeight: '800', lineHeight: 1.2 }}>Featured Businesses</h2>
                        <p style={{ color: 'var(--text-muted)', marginTop: '8px', fontSize: '1.1rem' }}>Top rated local businesses in your area</p>
                    </div>
                </div>

                {isLoading ? (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '32px' }}>
                        {[1, 2, 3].map(i => <BusinessCardSkeleton key={i} />)}
                    </div>
                ) : error ? (
                    <div style={{ textAlign: 'center', padding: '60px', color: 'var(--text-muted)' }}>
                        <p>{error}</p>
                    </div>
                ) : businesses.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '80px', background: 'rgba(255,255,255,0.02)', borderRadius: '24px', border: '1px dashed var(--glass-border)' }}>
                        <Building2 size={48} style={{ color: 'var(--text-muted)', marginBottom: '16px', opacity: 0.5 }} />
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '8px' }}>No businesses found yet</h3>
                        <p style={{ color: 'var(--text-muted)' }}>Be the first to list a business!</p>
                    </div>
                ) : (
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
                        gap: '32px'
                    }}>
                        {businesses.map((biz, index) => (
                            <motion.div
                                key={biz.id || index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.05 }}
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
                                    height: '220px',
                                    width: '100%',
                                    overflow: 'hidden',
                                    position: 'relative',
                                    background: 'rgba(0,0,0,0.2)'
                                }}>
                                    <img
                                        src={biz.imageUrl || "https://unimarket-mw.com/ratebiz/uploads/logo.png"}
                                        alt={biz.businessName}
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
                                        {biz.rating || '0.0'}
                                    </div>
                                </div>

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
                                            {biz.category || 'Local Business'}
                                        </span>
                                    </div>

                                    <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '8px', lineHeight: 1.3 }}>
                                        {biz.businessName}
                                    </h3>

                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '24px' }}>
                                        <MapPin size={16} />
                                        {biz.location || 'Location not specified'}
                                    </div>

                                    {/* Stats Row */}
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
                                                {biz.reviewCount || 0}
                                            </div>
                                        </div>
                                    </div>

                                    <div style={{ marginTop: 'auto', display: 'flex', gap: '12px' }}>
                                        <button
                                            onClick={() => handleRateClick(biz)}
                                            style={{
                                                flex: 1,
                                                padding: '12px',
                                                background: 'linear-gradient(135deg, var(--primary), var(--accent-purple))',
                                                border: 'none',
                                                borderRadius: '12px',
                                                color: 'white',
                                                fontWeight: '600',
                                                cursor: 'pointer',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                gap: '8px',
                                                transition: 'all 0.2s ease',
                                                boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)'
                                            }}
                                        >
                                            Rate <Star size={16} />
                                        </button>
                                        <Link
                                            to={`/business/${biz.id}`}
                                            style={{ flex: 1, textDecoration: 'none' }}
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
                                            }}>
                                                Details <ArrowRight size={16} />
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </section>

            <ReviewModal
                isOpen={isReviewModalOpen}
                onClose={() => setIsReviewModalOpen(false)}
                business={selectedBusiness}
                onSuccess={handleReviewSuccess}
            />
        </div>
    );
};

export default Home;
