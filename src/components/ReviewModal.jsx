import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, Loader2, MessageSquare, Send } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ReviewModal = ({ isOpen, onClose, business, existingReview, onSuccess }) => {
    const navigate = useNavigate();
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [comment, setComment] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    // Pre-fill data if editing
    useEffect(() => {
        if (isOpen) {
            if (existingReview) {
                setRating(existingReview.rating);
                setComment(existingReview.comment);
            } else {
                setRating(0);
                setComment('');
            }
            setError('');
        }
    }, [isOpen, existingReview]);

    const handleRatingMove = (e, index) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const x = e.clientX - rect.left;
        const isHalf = x < width / 2;
        setHoverRating(isHalf ? index - 0.5 : index);
    };

    const handleRatingClick = (e, index) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const x = e.clientX - rect.left;
        const isHalf = x < width / 2;
        setRating(isHalf ? index - 0.5 : index);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem('ratebiz_token');

        // Guest user restriction check
        if (!token) {
            const guestReviewed = localStorage.getItem(`reviewed_biz_${business.id}`);
            if (guestReviewed) {
                setError('As a guest, you can only submit one review per business.');
                return;
            }
        }

        if (rating === 0) {
            setError('Please select a rating');
            return;
        }

        if (!comment.trim()) {
            setError('Please write a review comment');
            return;
        }

        setIsSubmitting(true);
        setError('');

        try {
            const method = existingReview ? 'PUT' : 'POST';
            const url = existingReview
                ? `https://unimarket-mw.com/ratebiz/api/reviews/${existingReview.id}`
                : 'https://unimarket-mw.com/ratebiz/api/reviews';

            const response = await fetch(url, {
                method: method,
                headers: {
                    'Authorization': token ? `Bearer ${token}` : '',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    business_id: business.id,
                    rating: rating,
                    comment: comment
                })
            });

            if (!response.ok) {
                if (response.status === 401 && token) {
                    navigate('/login');
                    return;
                }
                const data = await response.json();
                throw new Error(data.message || 'Failed to submit review');
            }

            const responseData = await response.json();

            // Track Guest submission locally
            if (!token && !existingReview) {
                localStorage.setItem(`reviewed_biz_${business.id}`, responseData.id || 'true');
            }

            // Success
            onSuccess?.(existingReview ? 'updated' : 'submitted');
            onClose();

            if (!existingReview) {
                setRating(0);
                setComment('');
            }
        } catch (err) {
            console.error('Submit review error:', err);
            setError(err.message || 'Something went wrong. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: 'rgba(0, 0, 0, 0.7)',
                            backdropFilter: 'blur(8px)',
                            zIndex: 9998
                        }}
                    />

                    {/* Modal */}
                    <div style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 9999,
                        pointerEvents: 'none'
                    }}>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            style={{
                                width: '100%',
                                maxWidth: '500px',
                                background: 'rgba(30, 41, 59, 0.95)',
                                border: '1px solid var(--glass-border)',
                                borderRadius: '24px',
                                padding: '32px',
                                boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
                                pointerEvents: 'auto',
                                margin: '20px'
                            }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                                <div>
                                    <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '4px' }}>
                                        {existingReview ? 'Update Your Review' : 'Rate Business'}
                                    </h2>
                                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                                        Sharing your experience with <span style={{ color: 'white', fontWeight: '600' }}>{business?.businessName}</span>
                                    </p>
                                </div>
                                <button
                                    onClick={onClose}
                                    style={{
                                        background: 'rgba(255, 255, 255, 0.05)',
                                        border: 'none',
                                        borderRadius: '50%',
                                        width: '36px',
                                        height: '36px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: 'var(--text-muted)',
                                        cursor: 'pointer'
                                    }}
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit}>
                                {/* Star Rating */}
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '32px' }}>
                                    <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }} onMouseLeave={() => setHoverRating(0)}>
                                        {[1, 2, 3, 4, 5].map((index) => {
                                            const activeRating = hoverRating || rating;
                                            const isFilled = activeRating >= index;
                                            const isHalf = activeRating === index - 0.5;

                                            return (
                                                <div
                                                    key={index}
                                                    onMouseMove={(e) => handleRatingMove(e, index)}
                                                    onClick={(e) => handleRatingClick(e, index)}
                                                    style={{
                                                        cursor: 'pointer',
                                                        position: 'relative',
                                                        padding: '4px'
                                                    }}
                                                >
                                                    <Star
                                                        size={32}
                                                        color="rgba(255,255,255,0.2)"
                                                        fill="rgba(255,255,255,0.05)"
                                                    />

                                                    {(isFilled || isHalf) && (
                                                        <div style={{
                                                            position: 'absolute',
                                                            top: '4px',
                                                            left: '4px',
                                                            overflow: 'hidden',
                                                            width: isHalf ? '50%' : '100%',
                                                            pointerEvents: 'none'
                                                        }}>
                                                            <Star
                                                                size={32}
                                                                fill="#ec4899"
                                                                color="#ec4899"
                                                                style={{ filter: 'drop-shadow(0 0 8px rgba(236, 72, 153, 0.5))' }}
                                                            />
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                    <span style={{ color: rating > 0 ? '#ec4899' : 'var(--text-muted)', fontWeight: '600', minHeight: '24px' }}>
                                        {hoverRating > 0 ? hoverRating : rating > 0 ? rating : 'Select a rating'}
                                    </span>
                                </div>

                                {/* Comment Input */}
                                <div style={{ marginBottom: '24px' }}>
                                    <label style={{ display: 'block', color: 'var(--text-muted)', marginBottom: '8px', fontSize: '0.9rem' }}>
                                        Write your review
                                    </label>
                                    <div style={{ position: 'relative' }}>
                                        <MessageSquare size={18} style={{ position: 'absolute', left: '16px', top: '16px', color: 'var(--text-muted)' }} />
                                        <textarea
                                            value={comment}
                                            onChange={(e) => setComment(e.target.value)}
                                            placeholder="Tell us about your experience..."
                                            style={{
                                                width: '100%',
                                                background: 'rgba(255, 255, 255, 0.05)',
                                                border: '1px solid var(--glass-border)',
                                                borderRadius: '16px',
                                                padding: '16px 16px 16px 48px',
                                                color: 'white',
                                                minHeight: '120px',
                                                resize: 'vertical',
                                                fontFamily: 'inherit',
                                                fontSize: '1rem'
                                            }}
                                        />
                                    </div>
                                </div>

                                {/* Error Message */}
                                {error && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        style={{
                                            background: 'rgba(239, 68, 68, 0.1)',
                                            border: '1px solid rgba(239, 68, 68, 0.2)',
                                            color: '#ef4444',
                                            padding: '12px',
                                            borderRadius: '12px',
                                            fontSize: '0.9rem',
                                            marginBottom: '20px',
                                            textAlign: 'center'
                                        }}
                                    >
                                        {error}
                                    </motion.div>
                                )}

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="btn-primary"
                                    style={{
                                        width: '100%',
                                        padding: '16px',
                                        borderRadius: '16px',
                                        fontSize: '1rem',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '8px',
                                        opacity: isSubmitting ? 0.7 : 1
                                    }}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 size={20} className="spin" /> Processing...
                                        </>
                                    ) : (
                                        <>
                                            {existingReview ? 'Update Review' : 'Submit Review'} <Send size={18} />
                                        </>
                                    )}
                                </button>
                            </form>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
};

export default ReviewModal;
