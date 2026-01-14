import React from 'react';
import { Search, UserCircle, Menu, LogIn, UserPlus } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();

    return (
        <nav className="glass-card" style={{
            position: 'sticky',
            top: '16px',
            left: '16px',
            right: '16px',
            margin: '0 16px',
            padding: '12px 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            zIndex: 1000,
            borderRadius: '20px',
            border: '1px solid var(--glass-border)'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '40px' }}>
                <Link to="/" style={{
                    textDecoration: 'none',
                    fontSize: '1.5rem',
                    fontWeight: '800',
                    background: 'linear-gradient(to right, #fff, var(--primary))',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                }}>
                    RateBiz
                </Link>

                <div style={{
                    position: 'relative',
                    display: 'none',
                    '@media (minWidth: 768px)': { display: 'block' }
                }}>
                    <Search size={18} style={{
                        position: 'absolute',
                        left: '12px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: 'var(--text-muted)'
                    }} />
                    <input
                        type="text"
                        placeholder="Search businesses..."
                        style={{
                            background: 'rgba(255, 255, 255, 0.05)',
                            border: '1px solid var(--glass-border)',
                            borderRadius: '12px',
                            padding: '8px 16px 8px 40px',
                            color: 'white',
                            width: '300px',
                            fontSize: '0.875rem'
                        }}
                    />
                </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Link to="/login" style={{
                    textDecoration: 'none',
                    color: 'white',
                    fontWeight: '600',
                    fontSize: '0.875rem',
                    padding: '8px 16px'
                }}>
                    Login
                </Link>
                <button
                    onClick={() => navigate('/signup')}
                    className="btn-primary"
                    style={{
                        padding: '8px 20px',
                        fontSize: '0.875rem',
                        borderRadius: '10px'
                    }}
                >
                    <UserPlus size={16} />
                    Join Now
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
