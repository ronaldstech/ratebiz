import React from 'react';
import { Mail, Lock, LogIn, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Login = () => {
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
                    maxWidth: '450px',
                    padding: '40px',
                    position: 'relative',
                    overflow: 'hidden'
                }}
            >
                <div style={{
                    position: 'absolute',
                    top: '-50px',
                    right: '-50px',
                    width: '150px',
                    height: '150px',
                    background: 'rgba(37, 99, 235, 0.1)',
                    borderRadius: '50%',
                    filter: 'blur(40px)'
                }} />

                <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '8px', background: 'linear-gradient(to right, #fff, #94a3b8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                        RateBiz
                    </h1>
                    <p style={{ color: 'var(--text-muted)' }}>Welcome back! Please enter your details.</p>
                </div>

                <form onSubmit={(e) => e.preventDefault()}>
                    <div className="input-group">
                        <label>Email Address</label>
                        <div style={{ position: 'relative' }}>
                            <Mail size={18} style={{ position: 'absolute', left: '16px', top: '14px', color: 'var(--text-muted)' }} />
                            <input
                                type="email"
                                placeholder="you@example.com"
                                style={{ paddingLeft: '48px' }}
                            />
                        </div>
                    </div>

                    <div className="input-group">
                        <label>Password</label>
                        <div style={{ position: 'relative' }}>
                            <Lock size={18} style={{ position: 'absolute', left: '16px', top: '14px', color: 'var(--text-muted)' }} />
                            <input
                                type="password"
                                placeholder="••••••••"
                                style={{ paddingLeft: '48px' }}
                            />
                        </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px', fontSize: '0.875rem' }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', color: 'var(--text-muted)' }}>
                            <input type="checkbox" style={{ width: 'auto' }} /> Remember me
                        </label>
                        <a href="#" style={{ color: 'var(--primary)', textDecoration: 'none' }}>Forgot password?</a>
                    </div>

                    <button className="btn-primary" style={{ width: '100%', padding: '14px' }}>
                        <LogIn size={20} />
                        Sign In
                    </button>
                </form>

                <div style={{ marginTop: '32px', textAlign: 'center', color: 'var(--text-muted)' }}>
                    Don't have an account?{' '}
                    <Link to="/signup" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: '600' }}>
                        Sign Up
                    </Link>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;
