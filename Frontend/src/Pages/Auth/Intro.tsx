import { useEffect, useRef } from "react";
import "../../Css/Intro.css";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";

const IntroPage = () => {
    const observerRef = useRef<IntersectionObserver | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        observerRef.current = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                    }
                });
            },
            { threshold: 0.1 }
        );

        const animatedElements = document.querySelectorAll(".animate-on-scroll");
        animatedElements.forEach((el) => observerRef.current?.observe(el));

        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect();
            }
        };
    }, []);

    return (
        <div className="intro-container" role="main">
            <section className="hero-section">
                <div className="hero-background">
                    <div className="gradient-orb orb-1"></div>
                    <div className="gradient-orb orb-2"></div>
                    <div className="gradient-orb orb-3"></div>
                </div>

                <div className="hero-content animate-on-scroll">
                    <div className="hero-badge">
                        <span className="badge-dot"></span>
                        Under Work
                    </div>

                    <h1 className="hero-headline">
                        One Platform for
                        <span className="headline-accent"> Every College Event</span>
                    </h1>

                    <p className="hero-subline">
                        Find events. Join. Earn points. Build your campus identity.
                    </p>

                    <div className="hero-ctas">
                        <button className="cta-button student-login" onClick={() => navigate("/login")}>
                            <span>Login</span>
                            <svg className="button-arrow" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                        <button className="cta-button admin-login"  onClick={() => navigate("/signup")}>
                            <span>Signup New User</span>
                        </button>
                    </div>

                    <div className="hero-stats">
                        <div className="stat-item">
                            <div className="stat-number">1</div>
                            <div className="stat-label">Colleges</div>
                        </div>
                        <div className="stat-divider"></div>
                        <div className="stat-item">
                            <div className="stat-number">1</div>
                            <div className="stat-label">Events</div>
                        </div>
                        <div className="stat-divider"></div>
                        <div className="stat-item">
                            <div className="stat-number">2</div>
                            <div className="stat-label">Students</div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="features-section">
                <div className="section-header animate-on-scroll">
                    <h2 className="section-title">Why Students Love It</h2>
                    <p className="section-subtitle">Everything you need to stay connected with your campus</p>
                </div>

                <div className="features-grid">
                    <div className="feature-card animate-on-scroll" style={{ animationDelay: "0.1s" }}>
                        <div className="feature-icon-wrapper">
                            <div className="feature-icon">🔍</div>
                        </div>
                        <h3 className="feature-title">Discover Events</h3>
                        <p className="feature-description">
                            Tech fests, workshops, sports, cultural — all in one place.
                            <strong> No WhatsApp spam, no confusion.</strong>
                        </p>
                        <div className="feature-link">
                            Explore Events →
                        </div>
                    </div>

                    <div className="feature-card animate-on-scroll" style={{ animationDelay: "0.2s" }}>
                        <div className="feature-icon-wrapper">
                            <div className="feature-icon">🏆</div>
                        </div>
                        <h3 className="feature-title">Participate & Earn</h3>
                        <p className="feature-description">
                            Join → Attend → Get points → Badges → Certificates.
                        </p>
                        <div className="feature-link">
                            See Rewards →
                        </div>
                    </div>

                    <div className="feature-card animate-on-scroll" style={{ animationDelay: "0.3s" }}>
                        <div className="feature-icon-wrapper">
                            <div className="feature-icon">👥</div>
                        </div>
                        <h3 className="feature-title">Grow with Mates</h3>
                        <p className="feature-description">
                            See what your friends are doing, team up, lead events.
                        </p>
                        <div className="feature-link">
                            Join Community →
                        </div>
                    </div>
                </div>
            </section>
            <section className="how-it-works-section animate-on-scroll">
                <h2 className="section-title">How it works</h2>

                <div className="steps-container">
                    <div className="step-card">
                        <div className="step-number">01</div>
                        <div className="step-content">
                            <h3 className="step-title">Find</h3>
                            <p className="step-description">Browse curated events near you</p>
                        </div>
                    </div>

                    <div className="step-arrow">→</div>

                    <div className="step-card">
                        <div className="step-number">02</div>
                        <div className="step-content">
                            <h3 className="step-title">Join</h3>
                            <p className="step-description">RSVP in one tap — calendar sync included</p>
                        </div>
                    </div>

                    <div className="step-arrow">→</div>

                    <div className="step-card">
                        <div className="step-number">03</div>
                        <div className="step-content">
                            <h3 className="step-title">Earn</h3>
                            <p className="step-description">Points, badges, certificates — build your profile</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="testimonials-section">
                <div className="testimonials-grid">
                    <div className="testimonial-card animate-on-scroll" style={{ animationDelay: "0.1s" }}>
                        <div className="quote-mark">"</div>
                        <p className="testimonial-text">Found a A.I workshop in minutes. No spam, just results.</p>
                        <div className="testimonial-author">
                            <div className="author-avatar">A</div>
                            <div className="author-info">
                                <div className="author-name">Himanshi</div>
                                <div className="author-college">AIIMS</div>
                            </div>
                        </div>
                    </div>

                    <div className="testimonial-card animate-on-scroll" style={{ animationDelay: "0.2s" }}>
                        <div className="quote-mark">"</div>
                        <p className="testimonial-text">Points and badges made campus life competitive in a good way.</p>
                        <div className="testimonial-author">
                            <div className="author-avatar">R</div>
                            <div className="author-info">
                                <div className="author-name">Jatin</div>
                                <div className="author-college">DU</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="faq-section animate-on-scroll">
                <h2 className="section-title">Quick FAQ</h2>

                <div className="faq-list">
                    <div className="faq-item">
                        <div className="faq-question">
                            <span>Is it free for students?</span>
                            <span className="faq-icon">+</span>
                        </div>
                        <div className="faq-answer">
                            Yes — students can join and participate for free.
                        </div>
                    </div>

                    <div className="faq-item">
                        <div className="faq-question">
                            <span>Can colleges manage events?</span>
                            <span className="faq-icon">+</span>
                        </div>
                        <div className="faq-answer">
                            Colleges and admins get a simple dashboard to post and verify events.
                        </div>
                    </div>
                </div>
            </section>

            <section className="final-cta-section animate-on-scroll">
                <div className="cta-content">
                    <h2 className="cta-title">Ready to get started?</h2>
                    <p className="cta-subtitle">Join thousands of students already using the platform</p>

                    <div className="cta-buttons">
                        <button className="cta-button student-login large" onClick={() => navigate("/login")}>
                            <span>Login</span>
                            <svg className="button-arrow" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                        <button className="cta-button admin-login outline"  onClick={() => navigate("/signup")}>
                            <span>Signup</span>
                        </button>
                    </div>
                </div>
            </section>

            <footer className="footer">
                <div className="footer-content">
                    <p className="footer-text">Made for students, by students.</p>
                    <div className="footer-links">
                        <NavLink to="/privacy" className="footer-link">Privacy</NavLink>
                        <span className="footer-dot">•</span>
                        <NavLink to="/terms" className="footer-link">Terms</NavLink>
                        <span className="footer-dot">•</span>
                        <NavLink to="/contact" className="footer-link">Contact</NavLink>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default IntroPage;