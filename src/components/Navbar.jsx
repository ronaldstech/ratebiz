import React, { useState, useEffect } from 'react';
import { Search, UserPlus, LogIn, Menu, X, ArrowRight } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isScrolled, setIsScrolled] = useState(false);
    const [searchFocused, setSearchFocused] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setMobileMenuOpen(false);
    }, [location.pathname]);

    return (
        <nav style={{
            position: 'fixed',
            top: '0',
            left: '0',
            right: '0',
            zIndex: 1000,
            padding: isScrolled ? '8px 8px' : '12px 8px',
            transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
        }}>
            <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="glass-card"
                style={{
                    maxWidth: '1200px',
                    margin: '0 auto',
                    padding: '8px 16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderRadius: '20px',
                    border: '1px solid var(--glass-border)',
                    background: isScrolled ? 'rgba(15, 23, 42, 0.8)' : 'var(--glass-bg)',
                    boxShadow: isScrolled ? '0 10px 30px -10px rgba(0,0,0,0.5)' : '0 8px 32px 0 rgba(0, 0, 0, 0.37)'
                }}
            >
                {/* Logo Section */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
                    <Link to="/" style={{ textDecoration: 'none' }}>
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                        >
                            <div style={{
                                width: '32px',
                                height: '32px',
                                background: 'linear-gradient(135deg, var(--primary), var(--accent-purple))',
                                borderRadius: '8px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white',
                                fontWeight: '900',
                                fontSize: '1.2rem',
                                boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)'
                            }}>
                                R
                            </div>
                            <span style={{
                                fontSize: '1.4rem',
                                fontWeight: '800',
                                background: 'linear-gradient(to right, #fff, #94a3b8)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                letterSpacing: '-0.5px'
                            }}>
                                RateBiz
                            </span>
                        </motion.div>
                    </Link>

                    {/* Desktop Search Bar */}
                    <div style={{
                        position: 'relative',
                        display: 'none',
                        '@media (min-width: 992px)': { display: 'block' }
                    }} className="desktop-search">
                        <motion.div
                            animate={{
                                width: searchFocused ? '350px' : '280px',
                                borderColor: searchFocused ? 'var(--primary)' : 'var(--glass-border)'
                            }}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                background: 'rgba(255, 255, 255, 0.03)',
                                border: '1px solid var(--glass-border)',
                                borderRadius: '14px',
                                padding: '6px 14px',
                                transition: 'all 0.3s ease'
                            }}
                        >
                            <Search
                                size={18}
                                style={{
                                    color: searchFocused ? 'var(--primary)' : 'var(--text-muted)',
                                    transition: 'color 0.3s ease'
                                }}
                            />
                            <input
                                type="text"
                                placeholder="Search experiences..."
                                onFocus={() => setSearchFocused(true)}
                                onBlur={() => setSearchFocused(false)}
                                style={{
                                    background: 'transparent',
                                    border: 'none',
                                    padding: '6px 12px',
                                    color: 'white',
                                    fontSize: '0.875rem',
                                    outline: 'none',
                                    width: '100%'
                                }}
                            />
                        </motion.div>
                    </div>
                </div>

                {/* Desktop Actions */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }} className="desktop-actions">
                    {localStorage.getItem('ratebiz_token') ? (
                        <>
                            <Link to="/my-businesses" style={{
                                textDecoration: 'none',
                                color: 'var(--text-muted)',
                                fontSize: '0.9rem',
                                fontWeight: '600',
                                transition: 'color 0.3s ease'
                            }}
                                onMouseEnter={(e) => e.target.style.color = '#fff'}
                                onMouseLeave={(e) => e.target.style.color = 'var(--text-muted)'}
                            >
                                Businesses
                            </Link>
                            <button
                                onClick={() => {
                                    localStorage.removeItem('ratebiz_token');
                                    localStorage.removeItem('ratebiz_user');
                                    navigate('/login');
                                }}
                                className="btn-primary"
                                style={{
                                    padding: '8px 20px',
                                    fontSize: '0.875rem',
                                    borderRadius: '12px',
                                    background: 'rgba(239, 68, 68, 0.2)',
                                    border: '1px solid rgba(239, 68, 68, 0.3)',
                                    color: '#fca5a5'
                                }}
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" style={{
                                textDecoration: 'none',
                                color: 'var(--text-muted)',
                                fontSize: '0.9rem',
                                fontWeight: '600',
                                transition: 'color 0.3s ease'
                            }}
                                onMouseEnter={(e) => e.target.style.color = '#fff'}
                                onMouseLeave={(e) => e.target.style.color = 'var(--text-muted)'}
                            >
                                Sign In
                            </Link>
                            <motion.button
                                whileHover={{ y: -2, boxShadow: '0 6px 20px rgba(37, 99, 235, 0.4)' }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => navigate('/signup')}
                                className="btn-primary"
                                style={{
                                    padding: '10px 24px',
                                    fontSize: '0.875rem',
                                    borderRadius: '12px'
                                }}
                            >
                                Join Now
                                <ArrowRight size={16} />
                            </motion.button>
                        </>
                    )}
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    style={{
                        display: 'none',
                        background: 'transparent',
                        border: 'none',
                        color: 'white',
                        cursor: 'pointer',
                        padding: '8px'
                    }}
                    className="mobile-toggle"
                >
                    {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </motion.div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        style={{
                            position: 'absolute',
                            top: '100%',
                            left: '16px',
                            right: '16px',
                            marginTop: '12px',
                            zIndex: 999
                        }}
                    >
                        <div className="glass-card" style={{ padding: '24px', borderRadius: '24px' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                <div style={{ position: 'relative' }}>
                                    <Search size={18} style={{ position: 'absolute', left: '12px', top: '12px', color: 'var(--text-muted)' }} />
                                    <input
                                        type="text"
                                        placeholder="Search..."
                                        style={{
                                            width: '100%',
                                            background: 'rgba(255, 255, 255, 0.05)',
                                            border: '1px solid var(--glass-border)',
                                            borderRadius: '12px',
                                            padding: '10px 12px 10px 40px',
                                            color: 'white',
                                            outline: 'none'
                                        }}
                                    />
                                </div>
                                <Link to="/login" style={{ textDecoration: 'none', color: 'white', fontWeight: '600' }}>Sign In</Link>
                                <button
                                    onClick={() => navigate('/signup')}
                                    className="btn-primary"
                                    style={{ width: '100%' }}
                                >
                                    Join Now
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <style>{`
                @media (max-width: 991px) {
                    .desktop-search, .desktop-actions { display: none !important; }
                    .mobile-toggle { display: block !important; }
                }
                @media (min-width: 992px) {
                    .desktop-search { display: block !important; }
                }
            `}</style>
        </nav>
    );
};

export default Navbar;
