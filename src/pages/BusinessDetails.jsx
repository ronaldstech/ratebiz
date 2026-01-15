import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Building2, MapPin, Star, MessageSquare, Calendar, User, Loader2, Trash2, Edit3, CheckCircle, Share2, ShieldCheck, Clock, TrendingUp, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ReviewModal from '../components/ReviewModal';

const DetailSkeleton = () => (
    <div className="container" style={{ paddingTop: '120px' }}>
        <div style={{ height: '300px', borderRadius: '32px', background: 'rgba(255,255,255,0.05)', marginBottom: '40px' }} className="skeleton" />
        <div className="detail-grid">
            <div>
                <div style={{ height: '200px', borderRadius: '24px', background: 'rgba(255,255,255,0.05)', marginBottom: '32px' }} className="skeleton" />
                <div style={{ height: '300px', borderRadius: '24px', background: 'rgba(255,255,255,0.05)' }} className="skeleton" />
            </div>
            <div style={{ height: '400px', borderRadius: '24px', background: 'rgba(255,255,255,0.05)' }} className="skeleton" />
        </div>
    </div>
);

const BusinessDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [business, setBusiness] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isReviewsLoading, setIsReviewsLoading] = useState(true);
    const [error, setError] = useState('');
    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
    const [userReview, setUserReview] = useState(null);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [successType, setSuccessType] = useState('submitted');
    const [sortBy, setSortBy] = useState('newest');
    const [toastMessage, setToastMessage] = useState('');

    const fetchData = useCallback(async () => {
        setIsLoading(true);
        setIsReviewsLoading(true);
        try {
            const bizRes = await fetch(`https://unimarket-mw.com/ratebiz/api/businesses/${id}`);
            if (!bizRes.ok) throw new Error('Business not found');
            const bizData = await bizRes.json();
            setBusiness(bizData);

            const reviewsRes = await fetch(`https://unimarket-mw.com/ratebiz/api/reviews?business_id=${id}`);
            if (reviewsRes.ok) {
                const reviewsData = await reviewsRes.json();
                const list = Array.isArray(reviewsData) ? reviewsData : (reviewsData.data || []);
                setReviews(list);

                const token = localStorage.getItem('ratebiz_token');
                const userData = localStorage.getItem('ratebiz_user');
                const guestReviewId = localStorage.getItem(`reviewed_biz_${id}`);

                let currentUserReview = null;

                if (token && userData && userData !== 'undefined' && userData !== 'null') {
                    try {
                        const user = JSON.parse(userData);
                        if (user && user.id) {
                            currentUserReview = list.find(r => r.user_id === user.id || r.userId === user.id);
                        }
                    } catch (e) {
                        console.error("Failed to parse user data", e);
                    }
                } else if (guestReviewId) {
                    currentUserReview = list.find(r => r.id === parseInt(guestReviewId)) || { id: guestReviewId, isGuest: true };
                }

                setUserReview(currentUserReview || null);
            }
        } catch (err) {
            console.error('Fetch error:', err);
            setError(err.message);
        } finally {
            setIsLoading(false);
            setIsReviewsLoading(false);
        }
    }, [id]);

    useEffect(() => {
        fetchData();
        window.scrollTo(0, 0);
    }, [fetchData]);

    // Sorting Logic
    const sortedReviews = useMemo(() => {
        return [...reviews].sort((a, b) => {
            if (sortBy === 'newest') return new Date(b.created_at) - new Date(a.created_at);
            if (sortBy === 'highest') return b.rating - a.rating;
            if (sortBy === 'lowest') return a.rating - b.rating;
            return 0;
        });
    }, [reviews, sortBy]);

    // Rating Distribution Calculation
    const ratingStats = useMemo(() => {
        const stats = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
        reviews.forEach(r => {
            const star = Math.round(r.rating);
            if (stats[star] !== undefined) stats[star]++;
        });
        return stats;
    }, [reviews]);

    const handleReviewSuccess = (type = 'submitted') => {
        setSuccessType(type);
        setToastMessage(`Review ${type === 'deleted' ? 'Deleted' : type === 'updated' ? 'Updated' : 'Submitted'} Successfully!`);
        setShowSuccessMessage(true);
        setTimeout(() => setShowSuccessMessage(false), 3000);
        fetchData();
    };

    const handleDeleteReview = async () => {
        if (!window.confirm('Are you sure you want to delete your review?')) return;
        const token = localStorage.getItem('ratebiz_token');
        try {
            const res = await fetch(`https://unimarket-mw.com/ratebiz/api/reviews/${userReview.id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) handleReviewSuccess('deleted');
        } catch (err) {
            console.error('Delete error:', err);
        }
    };

    const handleShare = () => {
        navigator.clipboard.writeText(window.location.href);
        setToastMessage('Link copied to clipboard!');
        setShowSuccessMessage(true);
        setTimeout(() => setShowSuccessMessage(false), 2000);
    };

    if (isLoading) return <DetailSkeleton />;

    if (error || !business) {
        return (
            <div className="container" style={{ textAlign: 'center', padding: '150px 0' }}>
                <Building2 size={80} style={{ opacity: 0.1, marginBottom: '24px' }} />
                <h2 style={{ marginBottom: '24px', fontSize: '2.5rem' }}>{error || 'Business not found'}</h2>
                <Link to="/"><button className="btn-primary">Back to Home</button></Link>
            </div>
        );
    }

    return (
        <div style={{ position: 'relative' }}>
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
                            background: toastMessage.includes('copied') ? 'var(--primary)' : '#10b981',
                            color: 'white',
                            padding: '16px 24px',
                            borderRadius: '50px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                            fontWeight: '600'
                        }}
                    >
                        {toastMessage.includes('copied') ? <Share2 size={20} /> : <CheckCircle size={24} />}
                        {toastMessage}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Hero Section */}
            <header className="hero-section">
                {business.imageUrl && (
                    <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundImage: `url(${business.imageUrl})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        filter: 'blur(40px) brightness(0.4)',
                        transform: 'scale(1.1)'
                    }} />
                )}
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(to bottom, transparent, #0f172a)'
                }} />

                <div className="container" style={{ position: 'relative', height: '100%', display: 'flex', alignItems: 'flex-end', paddingBottom: '60px' }}>
                    <Link to="/" style={{ position: 'absolute', top: '40px', left: '20px', display: 'flex', alignItems: 'center', gap: '8px', color: 'white', textDecoration: 'none', background: 'rgba(255,255,255,0.1)', padding: '8px 16px', borderRadius: '12px', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)', zIndex: 100 }}>
                        <ArrowLeft size={20} /> <span className="hide-mobile">Explore Businesses</span>
                    </Link>

                    <div className="hero-content-wrapper">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="business-image-lg"
                        >
                            {business.imageUrl ? (
                                <img src={business.imageUrl} alt={business.businessName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            ) : (
                                <Building2 size={80} className="text-cyan" style={{ opacity: 0.3 }} />
                            )}
                        </motion.div>

                        <div style={{ flex: 1, paddingBottom: '10px' }}>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                            >
                                <span style={{ background: 'var(--primary)', color: 'white', padding: '4px 12px', borderRadius: '8px', fontSize: '0.85rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '16px', display: 'inline-block' }}>
                                    {business.category}
                                </span>
                                <h1 style={{ fontSize: '4rem', fontWeight: '900', color: 'white', lineHeight: 1.1, marginBottom: '16px', textShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
                                    {business.businessName}
                                </h1>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '24px', color: 'rgba(255,255,255,0.8)', flexWrap: 'wrap' }}>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.1rem' }}><MapPin size={20} className="text-cyan" /> {business.location}</span>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.1rem' }}><ShieldCheck size={20} className="text-purple" /> Verified Marketplace</span>
                                </div>
                            </motion.div>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="rating-badge-xl"
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#fbbf24', fontSize: '3rem', fontWeight: '900', justifyContent: 'flex-end' }}>
                                <Star size={40} fill="#fbbf24" stroke="none" />
                                {parseFloat(business.rating || 0).toFixed(1)}
                            </div>
                            <p style={{ color: 'rgba(255,255,255,0.6)', marginTop: '4px', fontWeight: '600' }}>from {reviews.length} user reviews</p>
                        </motion.div>
                    </div>
                </div>
            </header>

            <main className="container" style={{ marginTop: '-40px', position: 'relative', zIndex: 10, paddingBottom: '100px' }}>
                <div className="detail-grid">

                    <div>
                        <motion.section
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="glass-card"
                            style={{ padding: '40px', marginBottom: '40px' }}
                        >
                            <h2 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '20px', color: 'white', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <Info size={24} className="text-cyan" /> About the business
                            </h2>
                            <p style={{ fontSize: '1.2rem', lineHeight: '1.8', color: 'rgba(255,255,255,0.7)', marginBottom: '32px' }}>
                                {business.description || 'This business has not yet provided a detailed description.'}
                            </p>

                            {/* Rating Distribution */}
                            <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '32px' }}>
                                <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '20px', color: 'rgba(255,255,255,0.9)' }}>Rating breakdown</h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                    {[5, 4, 3, 2, 1].map(star => {
                                        const count = ratingStats[star] || 0;
                                        const percent = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
                                        return (
                                            <div key={star} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                                <div style={{ width: '40px', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                                                    {star} <Star size={14} fill="currentColor" stroke="none" />
                                                </div>
                                                <div style={{ flex: 1, height: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', overflow: 'hidden' }}>
                                                    <motion.div
                                                        initial={{ width: 0 }}
                                                        animate={{ width: `${percent}%` }}
                                                        transition={{ duration: 1, ease: 'easeOut' }}
                                                        style={{ height: '100%', background: star >= 4 ? 'var(--primary)' : star >= 3 ? '#fbbf24' : '#f87171' }}
                                                    />
                                                </div>
                                                <div style={{ width: '40px', textAlign: 'right', fontSize: '0.9rem', color: 'var(--text-muted)' }}>{count}</div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </motion.section>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
                            <h2 style={{ fontSize: '1.75rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '12px', color: 'white' }}>
                                <MessageSquare size={28} className="text-purple" /> User Experiences
                            </h2>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Sort by:</span>
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', padding: '8px 16px', borderRadius: '10px', fontSize: '0.9rem', outline: 'none', cursor: 'pointer' }}
                                >
                                    <option value="newest">Most Recent</option>
                                    <option value="highest">Highest Rated</option>
                                    <option value="lowest">Lowest Rated</option>
                                </select>
                            </div>
                        </div>

                        {isReviewsLoading ? (
                            <div style={{ padding: '60px', textAlign: 'center' }}><Loader2 className="spin text-cyan" size={40} /></div>
                        ) : reviews.length === 0 ? (
                            <div className="glass-card" style={{ padding: '80px', textAlign: 'center', border: '1px dashed rgba(255,255,255,0.1)' }}>
                                <div style={{ width: '80px', height: '80px', background: 'rgba(255,255,255,0.03)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
                                    <MessageSquare size={40} style={{ opacity: 0.2 }} />
                                </div>
                                <h3 style={{ marginBottom: '12px' }}>No reviews yet</h3>
                                <p style={{ color: 'var(--text-muted)' }}>Be the first one to share your story!</p>
                            </div>
                        ) : (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                {sortedReviews.map((review, idx) => (
                                    <motion.div
                                        key={review.id || idx}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.05 * idx }}
                                        className="glass-card"
                                        style={{
                                            padding: '28px',
                                            border: userReview?.id === review.id ? '2px solid var(--primary)' : '1px solid var(--glass-border)',
                                            background: userReview?.id === review.id ? 'rgba(37, 99, 235, 0.05)' : 'var(--glass-bg)'
                                        }}
                                    >
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                                <div style={{
                                                    width: '52px',
                                                    height: '52px',
                                                    borderRadius: '16px',
                                                    background: userReview?.id === review.id ? 'var(--primary)' : 'rgba(255,255,255,0.05)',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    border: '1px solid rgba(255,255,255,0.1)'
                                                }}>
                                                    <User size={24} className={userReview?.id === review.id ? 'text-white' : 'text-cyan'} />
                                                </div>
                                                <div>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                        <h4 style={{ margin: 0, fontSize: '1.1rem', fontWeight: '700' }}>{review.userName || 'Anonymous User'}</h4>
                                                        {userReview?.id === review.id && (
                                                            <span style={{ fontSize: '0.75rem', background: 'var(--primary)', color: 'white', padding: '2px 8px', borderRadius: '4px', fontWeight: 'bold' }}>YOU</span>
                                                        )}
                                                    </div>
                                                    <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px' }}>
                                                        <Calendar size={14} /> {new Date(review.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                                                    </span>
                                                </div>
                                            </div>
                                            <div style={{
                                                background: 'rgba(251, 191, 36, 0.08)',
                                                color: '#fbbf24',
                                                padding: '8px 16px',
                                                borderRadius: '14px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '8px',
                                                fontWeight: '800',
                                                border: '1px solid rgba(251, 191, 36, 0.2)'
                                            }}>
                                                <Star size={18} fill="#fbbf24" stroke="none" /> {parseFloat(review.rating).toFixed(1)}
                                            </div>
                                        </div>
                                        <p className="review-text-indent" style={{ color: 'rgba(255,255,255,0.9)', lineHeight: '1.7', fontSize: '1.05rem', fontStyle: 'italic' }}>
                                            "{review.comment}"
                                        </p>
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </div>

                    <aside>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.4 }}
                            className="glass-card"
                            style={{
                                padding: '32px',
                                textAlign: 'center',
                                background: 'linear-gradient(180deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.9) 100%)',
                                position: 'sticky',
                                top: '100px'
                            }}
                        >
                            <div style={{ width: '64px', height: '64px', background: 'rgba(255,255,255,0.05)', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                                <TrendingUp size={32} className="text-cyan" />
                            </div>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '12px' }}>
                                {userReview ? 'Your Verdict' : 'Write a Review'}
                            </h3>
                            <p style={{ color: 'var(--text-muted)', marginBottom: '28px', lineHeight: '1.6' }}>
                                {userReview ? 'Your feedback helps the community make better choices!' : 'How was your experience with this business? Share your thoughts.'}
                            </p>

                            {!userReview || !userReview.isGuest ? (
                                <button
                                    onClick={() => setIsReviewModalOpen(true)}
                                    className="btn-primary"
                                    style={{
                                        width: '100%',
                                        padding: '18px',
                                        borderRadius: '18px',
                                        fontSize: '1.1rem',
                                        boxShadow: '0 10px 30px rgba(37, 99, 235, 0.3)'
                                    }}
                                >
                                    {userReview ? <><Edit3 size={22} /> Edit My Review</> : <><Star size={22} /> Rate Experience</>}
                                </button>
                            ) : (
                                <div style={{
                                    padding: '20px',
                                    background: 'rgba(16, 185, 129, 0.1)',
                                    borderRadius: '16px',
                                    color: '#10b981',
                                    fontWeight: '700',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '10px'
                                }}>
                                    <CheckCircle size={20} /> Rating Submitted
                                </div>
                            )}

                            <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
                                <button
                                    onClick={handleShare}
                                    style={{ flex: 1, padding: '12px', borderRadius: '14px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', cursor: 'pointer', transition: 'all 0.3s' }}
                                >
                                    <Share2 size={18} /> Share
                                </button>
                            </div>

                            {userReview && !userReview.isGuest && (
                                <button
                                    onClick={handleDeleteReview}
                                    style={{
                                        marginTop: '24px',
                                        background: 'transparent',
                                        border: 'none',
                                        color: '#f87171',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '8px',
                                        fontSize: '0.95rem',
                                        cursor: 'pointer',
                                        width: '100%',
                                        fontWeight: '600'
                                    }}
                                >
                                    <Trash2 size={18} /> Remove My Review
                                </button>
                            )}
                        </motion.div>
                    </aside>
                </div>
            </main>

            <ReviewModal
                isOpen={isReviewModalOpen}
                onClose={() => setIsReviewModalOpen(false)}
                business={business}
                existingReview={userReview}
                onSuccess={(type) => handleReviewSuccess(type)}
            />
        </div>
    );
};

export default BusinessDetails;
