import React, { useState, useEffect } from 'react';
import { Building2, Plus, ArrowRight, MapPin, Loader2 } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const MyBusinesses = () => {
    const navigate = useNavigate();
    const [businesses, setBusinesses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchBusinesses = async () => {
            const token = localStorage.getItem('ratebiz_token');
            if (!token) {
                navigate('/login');
                return;
            }

            try {
                // TODO: Replace with actual endpoint to fetch user's businesses
                // Currently simulating empty or mocked response for UI dev
                // const response = await fetch('https://unimarket-mw.com/ratebiz/api/my-businesses', ...);

                // Mock simulation
                await new Promise(resolve => setTimeout(resolve, 1000));

                // For now, let's assume empty to show the empty state, 
                // or you can populate with mock data to test the card view.
                setBusinesses([]);

            } catch (err) {
                console.error('Failed to fetch businesses:', err);
                setError('Failed to load your businesses.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchBusinesses();
    }, [navigate]);

    return (
        <div style={{
            minHeight: '100vh',
            padding: '100px 20px 40px',
            maxWidth: '1200px',
            margin: '0 auto'
        }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                <div>
                    <h1 className="gradient-text" style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '8px' }}>
                        My Businesses
                    </h1>
                    <p style={{ color: 'var(--text-muted)' }}>Manage your business listings and reviews.</p>
                </div>
                <motion.button
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => navigate('/create-business')}
                    className="btn-primary"
                    style={{
                        padding: '10px 20px',
                        fontSize: '0.9rem',
                        borderRadius: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                    }}
                >
                    <Plus size={18} />
                    Add New Business
                </motion.button>
            </div>

            {isLoading ? (
                <div style={{ display: 'flex', justifyContent: 'center', padding: '60px' }}>
                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>
                        <Loader2 size={32} color="var(--primary)" />
                    </motion.div>
                </div>
            ) : error ? (
                <div style={{ textAlign: 'center', padding: '40px', color: 'var(--error)' }}>
                    {error}
                </div>
            ) : businesses.length === 0 ? (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass-card"
                    style={{
                        padding: '60px 20px',
                        textAlign: 'center',
                        borderRadius: '24px',
                        border: '1px dashed var(--glass-border)'
                    }}
                >
                    <div style={{
                        width: '80px',
                        height: '80px',
                        background: 'rgba(255, 255, 255, 0.05)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 24px auto'
                    }}>
                        <Building2 size={40} style={{ color: 'var(--text-muted)' }} />
                    </div>
                    <h2 style={{ fontSize: '1.5rem', marginBottom: '12px' }}>No businesses found</h2>
                    <p style={{ color: 'var(--text-muted)', maxWidth: '400px', margin: '0 auto 32px auto' }}>
                        You haven't added any businesses yet. List your business to start collecting reviews and growing your presence.
                    </p>
                    <button
                        onClick={() => navigate('/create-business')}
                        className="btn-primary"
                        style={{ padding: '12px 24px' }}
                    >
                        Create Your First Business
                    </button>
                </motion.div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
                    {businesses.map((business, index) => (
                        <motion.div
                            key={business.id || index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="glass-card"
                            style={{ padding: '24px', borderRadius: '20px', position: 'relative', overflow: 'hidden' }}
                        >
                            <div style={{ display: 'flex', alignItems: 'start', justifyContent: 'space-between', marginBottom: '16px' }}>
                                <div style={{
                                    width: '48px',
                                    height: '48px',
                                    background: 'linear-gradient(135deg, var(--primary), var(--accent-purple))',
                                    borderRadius: '12px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <Building2 size={24} color="white" />
                                </div>
                                <span style={{
                                    fontSize: '0.75rem',
                                    background: 'rgba(255, 255, 255, 0.1)',
                                    padding: '4px 12px',
                                    borderRadius: '20px',
                                    border: '1px solid var(--glass-border)'
                                }}>
                                    {business.category || 'Retail'}
                                </span>
                            </div>
                            <h3 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>{business.businessName || 'Business Name'}</h3>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '24px' }}>
                                <MapPin size={14} />
                                {business.location || 'Location'}
                            </div>
                            <Link
                                to={`/business/${business.id}`}
                                style={{
                                    textDecoration: 'none',
                                    color: 'white',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    fontSize: '0.9rem',
                                    fontWeight: '600'
                                }}
                            >
                                Manage Business <ArrowRight size={16} />
                            </Link>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyBusinesses;
