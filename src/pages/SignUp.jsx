import React, { useState } from 'react';
import { Mail, Lock, User, Building2, UserPlus, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const SignUp = () => {
    const [role, setRole] = useState('user'); // 'user' or 'business'

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
        }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="glass-card"
                style={{
                    width: '100%',
                    maxWidth: '500px',
                    padding: '40px',
                    position: 'relative'
                }}
            >
                <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '8px', background: 'linear-gradient(to right, #fff, #94a3b8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                        Create Account
                    </h1>
                    <p style={{ color: 'var(--text-muted)' }}>Join RateBiz to start reviewing or growing your business.</p>
                </div>

                <div style={{
                    display: 'flex',
                    background: 'rgba(255, 255, 255, 0.05)',
                    padding: '4px',
                    borderRadius: '12px',
                    marginBottom: '32px',
                    position: 'relative'
                }}>
                    <motion.div
                        style={{
                            position: 'absolute',
                            top: '4px',
                            left: role === 'user' ? '4px' : 'calc(50% + 2px)',
                            width: '48%',
                            height: 'calc(100% - 8px)',
                            background: 'var(--primary)',
                            borderRadius: '8px',
                            zIndex: 0
                        }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                    <button
                        onClick={() => setRole('user')}
                        style={{
                            flex: 1,
                            padding: '10px',
                            border: 'none',
                            background: 'transparent',
                            color: role === 'user' ? 'white' : 'var(--text-muted)',
                            cursor: 'pointer',
                            fontWeight: '600',
                            zIndex: 1,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px'
                        }}
                    >
                        <User size={18} /> User
                    </button>
                    <button
                        onClick={() => setRole('business')}
                        style={{
                            flex: 1,
                            padding: '10px',
                            border: 'none',
                            background: 'transparent',
                            color: role === 'business' ? 'white' : 'var(--text-muted)',
                            cursor: 'pointer',
                            fontWeight: '600',
                            zIndex: 1,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px'
                        }}
                    >
                        <Building2 size={18} /> Business
                    </button>
                </div>

                <form onSubmit={(e) => e.preventDefault()}>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={role}
                            initial={{ opacity: 0, x: role === 'user' ? -10 : 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: role === 'user' ? 10 : -10 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="input-group">
                                <label>{role === 'user' ? 'Full Name' : 'Business Owner Name'}</label>
                                <div style={{ position: 'relative' }}>
                                    <User size={18} style={{ position: 'absolute', left: '16px', top: '14px', color: 'var(--text-muted)' }} />
                                    <input type="text" placeholder="John Doe" style={{ paddingLeft: '48px' }} />
                                </div>
                            </div>

                            {role === 'business' && (
                                <div className="input-group">
                                    <label>Business Name</label>
                                    <div style={{ position: 'relative' }}>
                                        <Building2 size={18} style={{ position: 'absolute', left: '16px', top: '14px', color: 'var(--text-muted)' }} />
                                        <input type="text" placeholder="Tech Solutions Inc" style={{ paddingLeft: '48px' }} />
                                    </div>
                                </div>
                            )}

                            <div className="input-group">
                                <label>Email Address</label>
                                <div style={{ position: 'relative' }}>
                                    <Mail size={18} style={{ position: 'absolute', left: '16px', top: '14px', color: 'var(--text-muted)' }} />
                                    <input type="email" placeholder="you@example.com" style={{ paddingLeft: '48px' }} />
                                </div>
                            </div>

                            <div className="input-group">
                                <label>Password</label>
                                <div style={{ position: 'relative' }}>
                                    <Lock size={18} style={{ position: 'absolute', left: '16px', top: '14px', color: 'var(--text-muted)' }} />
                                    <input type="password" placeholder="••••••••" style={{ paddingLeft: '48px' }} />
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    <button className="btn-primary" style={{ width: '100%', padding: '14px', marginTop: '16px' }}>
                        <UserPlus size={20} />
                        Create {role === 'user' ? 'User' : 'Business'} Account
                    </button>
                </form>

                <div style={{ marginTop: '32px', textAlign: 'center', color: 'var(--text-muted)' }}>
                    Already have an account?{' '}
                    <Link to="/login" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: '600' }}>
                        Sign In
                    </Link>
                </div>
            </motion.div>
        </div>
    );
};

export default SignUp;
