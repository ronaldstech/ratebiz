import React, { useState, useEffect, useMemo } from 'react';
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
                if (!response.ok) throw new Error('Failed to fetch businesses');
                const data = await response.json();
                let businessesData = Array.isArray(data) ? data : (data.businesses || data.data || []);
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

    const categorizedData = useMemo(() => {
        return {
            recentlyAdded: [...businesses].sort((a, b) => (b.id || 0) - (a.id || 0)).slice(0, 10),
            topRated: [...businesses].filter(b => parseFloat(b.rating || 0) >= 4).sort((a, b) => parseFloat(b.rating || 0) - parseFloat(a.rating || 0)).slice(0, 10),
            mostPopular: [...businesses].sort((a, b) => (b.reviewCount || 0) - (a.reviewCount || 0)).slice(0, 10)
        };
    }, [businesses]);

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

    const Section = ({ title, subtitle, items, icon: Icon, colorClass }) => (
        <section className="home-section">
            <div className="section-header">
                <div>
                    <h2 style={{ fontSize: '2rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '12px', color: 'white', marginBottom: '8px' }}>
                        <Icon size={28} className={colorClass} /> {title}
                    </h2>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem' }}>{subtitle}</p>
                </div>
                <button style={{ background: 'transparent', border: 'none', color: 'var(--primary)', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
                    View All <ArrowRight size={16} />
                </button>
            </div>

            <div className="horizontal-scroll-container">
                {items.length === 0 ? (
                    <div style={{ padding: '40px', background: 'rgba(255,255,255,0.02)', borderRadius: '24px', border: '1px dashed var(--glass-border)', width: '100%', textAlign: 'center' }}>
                        <p style={{ color: 'var(--text-muted)' }}>No businesses found in this category yet.</p>
                    </div>
                ) : (
                    items.map((biz, index) => (
                        <div key={biz.id || index} className="horizontal-scroll-item">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.05 }}
                                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                                className="glass-card"
                                style={{ padding: '0', borderRadius: '24px', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', height: '100%', border: '1px solid rgba(255,255,255,0.08)' }}
                            >
                                <div style={{ height: '180px', width: '100%', overflow: 'hidden', position: 'relative', background: 'rgba(0,0,0,0.2)' }}>
                                    <img src={biz.imageUrl || "https://unimarket-mw.com/ratebiz/uploads/logo.png"} alt={biz.businessName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    <div style={{ position: 'absolute', top: '12px', right: '12px', background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)', padding: '4px 10px', borderRadius: '14px', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem', color: '#fbbf24', fontWeight: '600', border: '1px solid rgba(255,255,255,0.1)' }}>
                                        <Star size={12} fill="#fbbf24" stroke="none" /> {parseFloat(biz.rating || 0).toFixed(1)}
                                    </div>
                                    <div style={{ position: 'absolute', bottom: '12px', left: '12px', background: 'rgba(37, 99, 235, 0.2)', backdropFilter: 'blur(8px)', padding: '4px 10px', borderRadius: '10px', fontSize: '0.7rem', color: '#60a5fa', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px', border: '1px solid rgba(37, 99, 235, 0.3)' }}>
                                        {biz.category || 'Retail'}
                                    </div>
                                </div>
                                <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                                    <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '8px', color: 'white', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{biz.businessName}</h3>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '20px' }}><MapPin size={14} /> {biz.location}</div>
                                    <div style={{ marginTop: 'auto', display: 'flex', gap: '8px' }}>
                                        <button onClick={() => handleRateClick(biz)} style={{ flex: 1, padding: '10px', background: 'linear-gradient(135deg, var(--primary), var(--accent-purple))', border: 'none', borderRadius: '10px', color: 'white', fontWeight: '600', cursor: 'pointer', fontSize: '0.9rem' }}>Rate</button>
                                        <Link to={`/business/${biz.id}`} style={{ flex: 1, textDecoration: 'none' }}>
                                            <button style={{ width: '100%', padding: '10px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', borderRadius: '10px', color: 'white', fontWeight: '600', cursor: 'pointer', fontSize: '0.9rem' }}>Details</button>
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    ))
                )}
            </div>
        </section>
    );

    const BusinessCardSkeleton = () => (
        <div className="horizontal-scroll-item">
            <div className="glass-card" style={{ padding: '0', overflow: 'hidden', height: '350px', display: 'flex', flexDirection: 'column' }}>
                <div className="skeleton" style={{ height: '180px', width: '100%', borderRadius: '0' }} />
                <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <div className="skeleton" style={{ width: '70%', height: '24px', marginBottom: '12px' }} />
                    <div className="skeleton" style={{ width: '40%', height: '16px', marginBottom: '20px' }} />
                    <div style={{ marginTop: 'auto', display: 'flex', gap: '8px' }}>
                        <div className="skeleton" style={{ flex: 1, height: '36px', borderRadius: '10px' }} />
                        <div className="skeleton" style={{ flex: 1, height: '36px', borderRadius: '10px' }} />
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="container">
            <AnimatePresence>
                {showSuccessMessage && (
                    <motion.div initial={{ opacity: 0, y: -50, x: '-50%' }} animate={{ opacity: 1, y: 20, x: '-50%' }} exit={{ opacity: 0, y: -50, x: '-50%' }} style={{ position: 'fixed', top: 0, left: '50%', zIndex: 10000, background: '#10b981', color: 'white', padding: '16px 24px', borderRadius: '50px', display: 'flex', alignItems: 'center', gap: '12px', boxShadow: '0 10px 30px rgba(16, 185, 129, 0.3)', fontWeight: '600' }}><CheckCircle size={24} /> Review Submitted Successfully!</motion.div>
                )}
            </AnimatePresence>

            <header className="home-hero">
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} style={{ display: 'inline-flex', padding: '8px 20px', background: 'rgba(37, 99, 235, 0.1)', borderRadius: '100px', color: 'var(--accent-cyan)', fontSize: '0.9rem', fontWeight: '700', marginBottom: '24px', border: '1px solid rgba(37, 99, 235, 0.2)', letterSpacing: '1px', textTransform: 'uppercase' }}>🚀 Real Feedback. Real Results.</motion.div>
                <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} style={{ fontSize: 'clamp(3rem, 7vw, 4.8rem)', fontWeight: '900', marginBottom: '24px', lineHeight: '1.05', letterSpacing: '-2px', color: 'white' }}>Find the Best <br /><span style={{ background: 'linear-gradient(135deg, var(--accent-cyan), var(--accent-purple))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Local Services</span></motion.h1>
                <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }} style={{ color: 'var(--text-muted)', fontSize: '1.2rem', maxWidth: '650px', margin: '0 auto 48px', lineHeight: '1.7' }}>Browse through verified reviews and rankings from the community. Share your honest experience anonymously.</motion.p>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '40px' }}>
                    <button className="btn-primary" onClick={() => navigate('/signup')} style={{ padding: '16px 36px', fontSize: '1.1rem', borderRadius: '18px' }}>Join Community <ArrowRight size={20} /></button>
                    <button style={{ background: 'rgba(255, 255, 255, 0.05)', color: 'white', border: '1px solid var(--glass-border)', padding: '16px 36px', borderRadius: '18px', fontWeight: '600', fontSize: '1.1rem', cursor: 'pointer', backdropFilter: 'blur(10px)' }}>List Your Business</button>
                </motion.div>

                <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }} style={{ color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px', fontSize: '0.9rem', opacity: 0.5 }}>
                    Scroll to explore <div style={{ width: '1px', height: '40px', background: 'linear-gradient(to bottom, var(--primary), transparent)' }} />
                </motion.div>
            </header>

            {isLoading ? (
                <>
                    <div style={{ marginBottom: '60px' }}><div className="skeleton" style={{ width: '200px', height: '32px', marginBottom: '20px' }} /><div className="horizontal-scroll-container">{[1, 2, 3, 4].map(i => <BusinessCardSkeleton key={i} />)}</div></div>
                    <div style={{ marginBottom: '60px' }}><div className="skeleton" style={{ width: '200px', height: '32px', marginBottom: '20px' }} /><div className="horizontal-scroll-container">{[1, 2, 3, 4].map(i => <BusinessCardSkeleton key={i} />)}</div></div>
                </>
            ) : error ? (
                <div style={{ textAlign: 'center', padding: '100px 0', color: 'var(--text-muted)' }}><p>{error}</p></div>
            ) : (
                <main style={{ paddingBottom: '120px' }}>
                    <Section title="New Arrivals" subtitle="Freshly listed businesses waiting for your verdict" items={categorizedData.recentlyAdded} icon={Zap} colorClass="text-yellow" />
                    <Section title="Top Performers" subtitle="Highest rated experiences as voted by the community" items={categorizedData.topRated} icon={TrendingUp} colorClass="text-cyan" />
                    <Section title="Community Favorites" subtitle="Most discussed businesses with highest engagement" items={categorizedData.mostPopular} icon={Users} colorClass="text-purple" />
                </main>
            )}

            <ReviewModal isOpen={isReviewModalOpen} onClose={() => setIsReviewModalOpen(false)} business={selectedBusiness} onSuccess={handleReviewSuccess} />
        </div>
    );
};

export default Home;
