import React from 'react';
import { Mail, Facebook, Twitter, Instagram, Linkedin, Send, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Footer = () => {
    return (
        <footer className="glass-card" style={{
            margin: '80px 16px 16px',
            padding: '60px 0 24px',
            borderRadius: '32px',
            border: '1px solid var(--glass-border)',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Background Glows */}
            <div style={{
                position: 'absolute',
                bottom: '-100px',
                left: '-100px',
                width: '300px',
                height: '300px',
                background: 'rgba(37, 99, 235, 0.05)',
                filter: 'blur(80px)',
                borderRadius: '50%',
                pointerEvents: 'none'
            }} />
            <div style={{
                position: 'absolute',
                top: '-50px',
                right: '-50px',
                width: '200px',
                height: '200px',
                background: 'rgba(129, 140, 248, 0.05)',
                filter: 'blur(60px)',
                borderRadius: '50%',
                pointerEvents: 'none'
            }} />

            <div className="container">
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: '60px',
                    marginBottom: '60px',
                    position: 'relative',
                    zIndex: 1
                }}>
                    {/* Brand Section */}
                    <div style={{ maxWidth: '320px' }}>
                        <Link to="/" style={{ textDecoration: 'none' }}>
                            <h3 style={{
                                fontSize: '1.75rem',
                                fontWeight: '900',
                                marginBottom: '20px',
                                background: 'linear-gradient(135deg, #fff 0%, var(--primary) 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                letterSpacing: '-0.5px'
                            }}>
                                RateBiz
                            </h3>
                        </Link>
                        <p style={{
                            color: 'var(--text-muted)',
                            fontSize: '0.925rem',
                            lineHeight: '1.7',
                            marginBottom: '24px'
                        }}>
                            The ultimate destination for transparent business reviews. We bridge the gap between customers and quality services through anonymous, authentic feedback.
                        </p>
                        <div style={{ display: 'flex', gap: '16px' }}>
                            {[
                                { Icon: Facebook, color: '#1877F2' },
                                { Icon: Twitter, color: '#1DA1F2' },
                                { Icon: Instagram, color: '#E4405F' },
                                { Icon: Linkedin, color: '#0A66C2' }
                            ].map((social, i) => (
                                <motion.a
                                    key={i}
                                    href="#"
                                    whileHover={{ y: -4, scale: 1.1 }}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        width: '40px',
                                        height: '40px',
                                        borderRadius: '12px',
                                        background: 'rgba(255, 255, 255, 0.05)',
                                        border: '1px solid var(--glass-border)',
                                        color: 'var(--text-muted)',
                                        transition: 'all 0.3s ease'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.color = social.color;
                                        e.currentTarget.style.borderColor = social.color + '44';
                                        e.currentTarget.style.background = social.color + '11';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.color = 'var(--text-muted)';
                                        e.currentTarget.style.borderColor = 'var(--glass-border)';
                                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                                    }}
                                >
                                    <social.Icon size={20} />
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    {/* Navigation Columns */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
                        <div>
                            <h4 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '24px', color: '#fff' }}>Platform</h4>
                            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                                {[
                                    { name: 'Home', path: '/' },
                                    { name: 'Browse Businesses', path: '/' },
                                    { name: 'Write a Review', path: '/login' },
                                    { name: 'Success Stories', path: '/' }
                                ].map((link, i) => (
                                    <li key={i}>
                                        <Link
                                            to={link.path}
                                            style={{
                                                color: 'var(--text-muted)',
                                                textDecoration: 'none',
                                                fontSize: '0.9rem',
                                                transition: 'color 0.3s ease',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '6px'
                                            }}
                                            onMouseEnter={(e) => e.currentTarget.style.color = 'var(--primary)'}
                                            onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
                                        >
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h4 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '24px', color: '#fff' }}>Support</h4>
                            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                                {[
                                    { name: 'Help Center', path: '/' },
                                    { name: 'Safety Guidelines', path: '/' },
                                    { name: 'Terms of Service', path: '/' },
                                    { name: 'Privacy Policy', path: '/' }
                                ].map((link, i) => (
                                    <li key={i}>
                                        <Link
                                            to={link.path}
                                            style={{
                                                color: 'var(--text-muted)',
                                                textDecoration: 'none',
                                                fontSize: '0.9rem',
                                                transition: 'color 0.3s ease'
                                            }}
                                            onMouseEnter={(e) => e.currentTarget.style.color = 'var(--primary)'}
                                            onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
                                        >
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Newsletter Section */}
                    <div>
                        <h4 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '16px', color: '#fff' }}>Stay Updated</h4>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '24px', lineHeight: '1.5' }}>
                            Subscribe to our newsletter for the latest trends and top-rated business alerts.
                        </p>
                        <div style={{ position: 'relative' }}>
                            <div style={{
                                display: 'flex',
                                background: 'rgba(255, 255, 255, 0.03)',
                                border: '1px solid var(--glass-border)',
                                borderRadius: '16px',
                                padding: '6px',
                                transition: 'all 0.3s ease',
                                boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)'
                            }}
                                onFocusCapture={(e) => {
                                    e.currentTarget.style.borderColor = 'var(--primary)';
                                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                                    e.currentTarget.style.boxShadow = '0 0 20px rgba(37, 99, 235, 0.15)';
                                }}
                                onBlurCapture={(e) => {
                                    e.currentTarget.style.borderColor = 'var(--glass-border)';
                                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                                    e.currentTarget.style.boxShadow = 'inset 0 2px 4px rgba(0,0,0,0.1)';
                                }}
                            >
                                <input
                                    type="email"
                                    placeholder="your@email.com"
                                    style={{
                                        flex: 1,
                                        background: 'transparent',
                                        border: 'none',
                                        padding: '10px 16px',
                                        color: 'white',
                                        fontSize: '0.9rem',
                                        outline: 'none'
                                    }}
                                />
                                <button className="btn-primary" style={{
                                    padding: '10px 18px',
                                    borderRadius: '12px',
                                    fontSize: '0.9rem'
                                }}>
                                    <Send size={16} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div style={{
                    paddingTop: '32px',
                    borderTop: '1px solid var(--glass-border)',
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '24px',
                    position: 'relative',
                    zIndex: 1
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{
                            width: '8px',
                            height: '8px',
                            borderRadius: '50%',
                            background: '#10b981',
                            boxShadow: '0 0 10px #10b981'
                        }} />
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: '500' }}>
                            System Status: All systems operational
                        </p>
                    </div>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                        © 2026 <span style={{ color: '#fff', fontWeight: '600' }}>RateBiz</span>. Built for transparency.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
