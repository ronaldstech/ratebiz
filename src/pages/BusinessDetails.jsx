import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Building2 } from 'lucide-react';
import { motion } from 'framer-motion';

const BusinessDetails = () => {
    const { id } = useParams();

    return (
        <div style={{
            minHeight: '80vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            textAlign: 'center'
        }}>
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-card"
                style={{
                    padding: '60px',
                    maxWidth: '500px',
                    width: '100%',
                    borderRadius: '32px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
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
                    marginBottom: '24px'
                }}>
                    <Building2 size={40} className="text-cyan" />
                </div>

                <h1 className="gradient-text" style={{ marginBottom: '16px' }}>Business Details</h1>
                <p style={{ color: 'var(--text-muted)', marginBottom: '32px', fontSize: '1.1rem' }}>
                    You are viewing the details for business ID: <span style={{ color: 'white', fontWeight: 'bold' }}>{id}</span>
                </p>
                <p style={{ color: 'var(--text-muted)', marginBottom: '32px' }}>
                    This feature is currently under construction. Check back soon for full business profiles, reviews, and more!
                </p>

                <Link to="/" style={{ textDecoration: 'none' }}>
                    <button className="btn-primary" style={{ padding: '12px 24px', borderRadius: '12px' }}>
                        <ArrowLeft size={18} /> Back to Home
                    </button>
                </Link>
            </motion.div>
        </div>
    );
};

export default BusinessDetails;
