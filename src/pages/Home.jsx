import React from 'react';
import { Star, TrendingUp, ShieldCheck, Zap, ArrowRight, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const businesses = [
    {
        id: 1,
        name: "TechNova Solutions",
        category: "Software Development",
        rating: 4.8,
        reviews: 128,
        image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=400&q=80"
    },
    {
        id: 2,
        name: "GreenLeaf Cafe",
        category: "Food & Beverage",
        rating: 4.5,
        reviews: 85,
        image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=400&q=80"
    },
    {
        id: 3,
        name: "Elite Fitness Hub",
        category: "Health & Wellness",
        rating: 4.9,
        reviews: 210,
        image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=400&q=80"
    },
    {
        id: 4,
        name: "Zenith Marketing",
        category: "Marketing Agency",
        rating: 4.2,
        reviews: 56,
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=400&q=80"
    }
];

const Home = () => {
    const navigate = useNavigate();

    return (
        <div style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto' }}>
            {/* Hero Section */}
            <section style={{ textAlign: 'center', padding: '80px 0' }}>
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{
                        fontSize: 'clamp(2.5rem, 8vw, 4rem)',
                        fontWeight: '900',
                        marginBottom: '24px',
                        lineHeight: '1.1'
                    }}
                >
                    Discover & Rate <br />
                    <span style={{
                        background: 'linear-gradient(to right, var(--accent-cyan), var(--accent-purple))',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                    }}>
                        Trusted Businesses
                    </span>
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    style={{
                        color: 'var(--text-muted)',
                        fontSize: '1.25rem',
                        maxWidth: '600px',
                        margin: '0 auto 40px',
                        lineHeight: '1.6'
                    }}
                >
                    Join thousands of users sharing honest experiences about local businesses, products, and services in complete anonymity.
                </motion.p>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}
                >
                    <button className="btn-primary" onClick={() => navigate('/signup')}>
                        Get Started <ArrowRight size={20} />
                    </button>
                    <button style={{
                        background: 'rgba(255, 255, 255, 0.05)',
                        color: 'white',
                        border: '1px solid var(--glass-border)',
                        padding: '12px 24px',
                        borderRadius: '12px',
                        fontWeight: '600',
                        cursor: 'pointer'
                    }}>
                        Explore Listings
                    </button>
                </motion.div>
            </section>

            {/* Stats Section */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '24px',
                marginBottom: '80px'
            }}>
                {[
                    { icon: <TrendingUp className="text-cyan" />, label: "Growing Fast", sub: "500+ New Weekly" },
                    { icon: <ShieldCheck className="text-purple" />, label: "Verified Reviews", sub: "100% Authentic" },
                    { icon: <Zap className="text-yellow" />, label: "Instant Access", sub: "Free for Everyone" }
                ].map((stat, i) => (
                    <div key={i} className="glass-card" style={{ padding: '24px', textAlign: 'center' }}>
                        <div style={{ marginBottom: '12px', display: 'flex', justifyContent: 'center' }}>{stat.icon}</div>
                        <div style={{ fontWeight: '700', fontSize: '1.125rem' }}>{stat.label}</div>
                        <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>{stat.sub}</div>
                    </div>
                ))}
            </div>

            {/* Listings Section */}
            <section>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '32px'
                }}>
                    <h2 style={{ fontSize: '2rem', fontWeight: '800' }}>Featured Businesses</h2>
                    <a href="#" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: '600' }}>View All</a>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '24px'
                }}>
                    {businesses.map((biz) => (
                        <motion.div
                            key={biz.id}
                            whileHover={{ y: -5 }}
                            className="glass-card"
                            style={{ padding: '16px', overflow: 'hidden' }}
                        >
                            <div style={{
                                height: '180px',
                                borderRadius: '16px',
                                marginBottom: '16px',
                                backgroundImage: `url(${biz.image})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center'
                            }} />
                            <div style={{ padding: '0 8px' }}>
                                <div style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>
                                    {biz.category}
                                </div>
                                <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '12px' }}>{biz.name}</h3>

                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                        <Star size={16} fill="var(--accent-cyan)" color="var(--accent-cyan)" />
                                        <span style={{ fontWeight: '700' }}>{biz.rating}</span>
                                        <span style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>({biz.reviews})</span>
                                    </div>
                                    <button style={{
                                        padding: '8px',
                                        borderRadius: '50%',
                                        background: 'rgba(37, 99, 235, 0.1)',
                                        border: 'none',
                                        color: 'var(--primary)',
                                        cursor: 'pointer'
                                    }}>
                                        <MessageSquare size={18} />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Home;
