import "./Footer.css"
const Footer = () => {
    const handleNewsletterSubmit = (e) => {
        e.preventDefault();
        const email = e.target.querySelector('.footer-newsletter-input').value;
        alert(`Thank you for subscribing with: ${email}`);
        e.target.reset();
    };

    return (
        <footer className="footer">
                <div className="footer-wave"></div>
                
                <div className="footer-content">
                {/* Brand Section */}
                <div className="footer-brand">
                    <div className="footer-logo">
                    <div className="footer-logo-icon">
                        <i className="fas fa-graduation-cap"></i>
                    </div>
                    <span className="footer-logo-text">Elderise</span>
                    </div>
                    <p className="footer-brand-description">
                    Connecting experienced mentors with eager learners. Where wisdom meets curiosity, and knowledge transcends generations. Learn from those who've walked the path.
                    </p>
                    
                    <div className="footer-stats">
                    <div className="footer-stat">
                        <div className="footer-stat-number">1,250+</div>
                        <div className="footer-stat-label">Expert Teachers</div>
                    </div>
                    <div className="footer-stat">
                        <div className="footer-stat-number">8,400+</div>
                        <div className="footer-stat-label">Active Students</div>
                    </div>
                    </div>
                </div>

                {/* Platform Links */}
                <div className="footer-section">
                    <h4>Platform</h4>
                    <ul>
                    <li><a href="#"><i className="fas fa-chevron-right"></i>About Us</a></li>
                    <li><a href="#"><i className="fas fa-chevron-right"></i>How It Works</a></li>
                    <li><a href="#"><i className="fas fa-chevron-right"></i>Success Stories</a></li>
                    <li><a href="#"><i className="fas fa-chevron-right"></i>Blog & News</a></li>
                    <li><a href="#"><i className="fas fa-chevron-right"></i>Careers</a></li>
                    </ul>
                </div>

                {/* For Learners */}
                <div className="footer-section">
                    <h4>For Learners</h4>
                    <ul>
                    <li><a href="#"><i className="fas fa-chevron-right"></i>Browse Courses</a></li>
                    <li><a href="#"><i className="fas fa-chevron-right"></i>My Learning</a></li>
                    <li><a href="#"><i className="fas fa-chevron-right"></i>Certificates</a></li>
                    <li><a href="#"><i className="fas fa-chevron-right"></i>Wishlist</a></li>
                    <li><a href="#"><i className="fas fa-chevron-right"></i>Gift Courses</a></li>
                    </ul>
                </div>

                {/* For Teachers */}
                <div className="footer-section">
                    <h4>For Teachers</h4>
                    <ul>
                    <li><a href="#"><i className="fas fa-chevron-right"></i>Teach on Elderise</a></li>
                    <li><a href="#"><i className="fas fa-chevron-right"></i>Teacher Dashboard</a></li>
                    <li><a href="#"><i className="fas fa-chevron-right"></i>Course Creation</a></li>
                    <li><a href="#"><i className="fas fa-chevron-right"></i>Earnings</a></li>
                    <li><a href="#"><i className="fas fa-chevron-right"></i>Resources</a></li>
                    </ul>
                </div>

                {/* Support */}
                <div className="footer-section">
                    <h4>Support</h4>
                    <ul>
                    <li><a href="#"><i className="fas fa-chevron-right"></i>Help Center</a></li>
                    <li><a href="#"><i className="fas fa-chevron-right"></i>FAQs</a></li>
                    <li><a href="#"><i className="fas fa-chevron-right"></i>Contact Us</a></li>
                    <li><a href="#"><i className="fas fa-chevron-right"></i>Privacy Policy</a></li>
                    <li><a href="#"><i className="fas fa-chevron-right"></i>Terms of Service</a></li>
                    </ul>
                </div>

                {/* Newsletter */}
                <div className="footer-newsletter">
                    <div className="footer-newsletter-content">
                    <h3>Stay Updated</h3>
                    <p>Subscribe to receive the latest courses, tips, and exclusive offers</p>
                    </div>
                    <form className="footer-newsletter-form" onSubmit={handleNewsletterSubmit}>
                    <input type="email" className="footer-newsletter-input" placeholder="Enter your email address" required />
                    <button type="submit" className="footer-newsletter-btn">
                        <i className="fas fa-paper-plane"></i> Subscribe
                    </button>
                    </form>
                </div>
                </div>

                {/* Footer Bottom */}
                <div className="footer-bottom">
                <div className="footer-bottom-left">
                    <div className="footer-copyright">
                    © 2024 Elderise. All rights reserved.
                    </div>
                    <div className="footer-tagline">
                    Empowering learning through experience and wisdom
                    </div>
                </div>

                <div className="footer-bottom-right">
                    {/* Payment Methods */}
                    <div className="footer-payment-methods">
                    <span className="footer-payment-label">We accept:</span>
                    <div className="footer-payment-icons">
                        <div className="payment-icon" title="Visa">
                        <i className="fab fa-cc-visa"></i>
                        </div>
                        <div className="payment-icon" title="Mastercard">
                        <i className="fab fa-cc-mastercard"></i>
                        </div>
                        <div className="payment-icon" title="PayPal">
                        <i className="fab fa-cc-paypal"></i>
                        </div>
                    </div>
                    </div>

                    {/* Social Links */}
                    <div className="footer-social">
                    <div className="social-icon" title="Facebook">
                        <i className="fab fa-facebook-f"></i>
                    </div>
                    <div className="social-icon" title="Twitter">
                        <i className="fab fa-twitter"></i>
                    </div>
                    <div className="social-icon" title="LinkedIn">
                        <i className="fab fa-linkedin-in"></i>
                    </div>
                    <div className="social-icon" title="Instagram">
                        <i className="fab fa-instagram"></i>
                    </div>
                    <div className="social-icon" title="YouTube">
                        <i className="fab fa-youtube"></i>
                    </div>
                    </div>
                </div>
                </div>
            </footer>
    );
};

export default Footer;