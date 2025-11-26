import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import "./home.css"
import { useNavigate } from "react-router-dom";

const Home = () => {
    const [coursesCurrentPage, setCoursesCurrentPage] = useState(0);
    const [categoriesCurrentIndex, setCategoriesCurrentIndex] = useState(0);
    const [showScrollTop, setShowScrollTop] = useState(false);
    const [showCouponBanner, setShowCouponBanner] = useState(true);

    const navigate = useNavigate();

    const ViewDetail = () => {
        navigate("/CourseDetail");
    };

    const BrowseCourse = () => {
        navigate("/BrowseCourses");
    };

    const getCoursesCardsPerPage = () => {
        const width = window.innerWidth;
        if (width > 1200) return 4;
        if (width > 900) return 3;
        if (width > 600) return 2;
        return 1;
    };

    const handleCoursesNext = () => {
        const cardsPerPage = getCoursesCardsPerPage();
        const totalPages = Math.ceil(6 / cardsPerPage);
        if (coursesCurrentPage < totalPages - 1) {
        setCoursesCurrentPage(prev => prev + 1);
        }
    };

    const handleCoursesPrev = () => {
        if (coursesCurrentPage > 0) {
        setCoursesCurrentPage(prev => prev - 1);
        }
    };

    useEffect(() => {
        const handleScroll = () => {
        setShowScrollTop(window.pageYOffset > 300);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        let resizeTimer;
        const handleResize = () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
            setCoursesCurrentPage(0);
            setCategoriesCurrentIndex(0);
        }, 250);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const getCategoriesColumnsPerView = () => {
        const width = window.innerWidth;
        if (width > 1200) return 4;
        if (width > 900) return 3;
        if (width > 600) return 2;
        return 1;
    };

    const handleCategoriesNext = () => {
        const columnsPerView = getCategoriesColumnsPerView();
        if (categoriesCurrentIndex < 6 - columnsPerView) {
        setCategoriesCurrentIndex(prev => prev + 1);
        }
    };

    const handleCategoriesPrev = () => {
        if (categoriesCurrentIndex > 0) {
        setCategoriesCurrentIndex(prev => prev - 1);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
        top: 0,
        behavior: 'smooth'
        });
    };

    const handleCouponClick = () => {
        alert('Opening coupon page! 🎉');
    };

    const dismissCoupon = (e) => {
        e.stopPropagation();
        
        // ซ่อน coupon banner ก่อน
        const couponBanner = document.querySelector('.coupon-banner');
        if (couponBanner) {
            couponBanner.style.animation = 'slideOut 0.3s ease-out forwards';
        }
        
        // รอให้ animation เสร็จก่อนแล้วค่อยเลื่อนปุ่มลงมา
        setTimeout(() => {
            setShowCouponBanner(false);
            
            const scrollTopBtn = document.getElementById('scrollToTop');
            if (scrollTopBtn) {
                scrollTopBtn.classList.add('coupon-hidden');
            }
        }, 300);
    };

  return (
    <div>
        {/* Navbar Section */}
        <Navbar/>

        {/* Hero Section */}
        <section className="home-hero-section">
            <div className="home-hero-container">
            <div className="home-hero-content">
                <h1>Unlock <span>Wisdom</span> from Experience</h1>
                <p>A learning platform connecting valuable knowledge and experience from seniors to those seeking to develop new skills and grow personally.</p>
                <div className="home-hero-btns">
                <a onClick={BrowseCourse} style={{cursor:"pointer"}} className="home-hero-btn home-hero-btn-primary"><i className="fas fa-search"></i> Explore Courses</a>
                <a href="#" className="home-hero-btn home-hero-btn-secondary">How It Works</a>
                </div>
            </div>
            <div className="home-hero-image">
                <img src="/images/cover.svg" alt="Elder Teaching" />
            </div>
            </div>
        </section>

        {/* Stats Section */}
        <section className="home-stats-section">
            <div className="home-stats-container">
            <div className="home-stat-item">
                <div className="home-stat-number">1,250+</div>
                <div className="home-stat-label">Expert Teachers</div>
            </div>
            <div className="home-stat-item">
                <div className="home-stat-number">8,400+</div>
                <div className="home-stat-label">Happy Students</div>
            </div>
            <div className="home-stat-item">
                <div className="home-stat-number">350+</div>
                <div className="home-stat-label">Quality Courses</div>
            </div>
            <div className="home-stat-item">
                <div className="home-stat-number">4.8/5</div>
                <div className="home-stat-label">Satisfaction Rate</div>
            </div>
            </div>
        </section>

        {/* Popular Courses */}
        <section className="home-courses-section">
            <div className="home-courses-header">
            <h2 className="home-courses-title">Popular Courses</h2>
            <a onClick={BrowseCourse} style={{cursor:"pointer"}} className="home-courses-view-all-btn">
                View All<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M9 18l6-6-6-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </a>
            </div>

            <div className="home-courses-wrapper">
            <button 
                className={`home-courses-nav-button prev ${coursesCurrentPage > 0 ? 'visible' : ''}`}
                id="home-courses-prevBtn"
                onClick={handleCoursesPrev}
            >
                <svg viewBox="0 0 24 24" fill="none">
                <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </button>

            <div className="home-courses-container">
                <div 
                className="home-courses-track" 
                id="home-coursesTrack"
                style={{
                    transform: `translateX(-${coursesCurrentPage * getCoursesCardsPerPage() * (document.querySelector('.home-course-card')?.offsetWidth + 20 || 0)}px)`
                }}
                >
                {/* Course 1 */}
                <div className="home-course-card">
                    <div className="home-course-image">
                    <img src="https://www.skilllane.com/_next/image?url=https%3A%2F%2Fresource.skilllane.com%2Fcourses%2Fhighlight_imgs%2F000%2F006%2F159%2Fmedium_2x%2F%E0%B8%AB%E0%B8%B1%E0%B8%A7%E0%B9%80%E0%B8%A3%E0%B8%B7%E0%B9%88%E0%B8%AD%E0%B8%87%E0%B8%A2%E0%B9%88%E0%B8%AD%E0%B8%A2_(1)_1714461196.jpg&w=1920&q=75" alt="Course thumbnail" />
                    </div>
                    <div className="home-course-content">
                    <div className="home-course-header">
                        <div className="home-course-instructor-avatar">JD</div>
                        <div className="home-course-instructor-info">
                        <div className="home-course-instructor-name">John Doe</div>
                        <div className="home-course-instructor-title">Senior Web Developer</div>
                        </div>
                    </div>
                    <h3 className="home-course-title">Complete Web Development Bootcamp 2024</h3>
                    <div className="home-course-meta">
                        <div className="home-course-meta-item">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span>24 hours</span>
                        </div>
                        <div className="home-course-meta-item">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span>156 lessons</span>
                        </div>
                    </div>
                    <p className="home-course-description">Master modern web development with HTML, CSS, JavaScript, React, Node.js, and more. Build real-world projects and launch your career.</p>
                    <div className="home-course-footer">
                        <span className="home-course-price-current">2,490 THB</span>
                        <span className="home-course-price-original">3,500 THB</span>
                    </div>
                    </div>

                    {/* pop-up hover */}
                    <div className="home-course-popup">
                    <h3 className="home-course-popup-title">Complete Web Development Bootcamp 2024</h3>
                    <p className="home-course-popup-description">Master modern web development with HTML, CSS, JavaScript, React, Node.js, and more. Build real-world projects and launch your career.</p>
                    <ul className="home-course-popup-highlights">
                        <li><i className="fas fa-check-circle"></i> Learn HTML, CSS, JavaScript fundamentals</li>
                        <li><i className="fas fa-check-circle"></i> Master React and Node.js</li>
                        <li><i className="fas fa-check-circle"></i> Build 10+ real-world projects</li>
                        <li><i className="fas fa-check-circle"></i> Certificate upon completion</li>
                    </ul>
                    <div className="home-course-popup-buttons">
                        <a href="#" className="home-course-popup-btn">Enroll Now</a>
                        <a onClick={ViewDetail} className="home-course-popup-btn-outline">View Details</a>
                    </div>
                    </div>
                </div>

                {/* Course 2 */}
                <div className="home-course-card">
                    <div className="home-course-image">
                    <img src="https://www.skilllane.com/_next/image?url=https%3A%2F%2Fresource.skilllane.com%2Fcourses%2Fhighlight_imgs%2F000%2F001%2F959%2Fmedium_2x%2F1959_banner_1._660x390_1646040573.png&w=1920&q=75" alt="Course thumbnail" />
                    </div>
                    <div className="home-course-content">
                    <div className="home-course-header">
                        <div className="home-course-instructor-avatar">EW</div>
                        <div className="home-course-instructor-info">
                        <div className="home-course-instructor-name">Emily Wang</div>
                        <div className="home-course-instructor-title">Data Scientist</div>
                        </div>
                    </div>
                    <h3 className="home-course-title">Data Science & Machine Learning with Python</h3>
                    <div className="home-course-meta">
                        <div className="home-course-meta-item">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span>32 hours</span>
                        </div>
                        <div className="home-course-meta-item">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span>210 lessons</span>
                        </div>
                    </div>
                    <p className="home-course-description">Comprehensive course covering data analysis, visualization, machine learning algorithms, and deep learning with TensorFlow and PyTorch frameworks.</p>
                    <div className="home-course-footer">
                        <span className="home-course-price-current">2,990 THB</span>
                        <span className="home-course-price-original">4,990 THB</span>
                    </div>
                    </div>

                    {/* pop-up hover */}
                    <div className="home-course-popup">
                    <h3 className="home-course-popup-title">Data Science & Machine Learning with Python</h3>
                    <p className="home-course-popup-description">Comprehensive course covering data analysis, visualization, machine learning algorithms, and practical AI projects using Python.</p>
                    <ul className="home-course-popup-highlights">
                        <li><i className="fas fa-check-circle"></i> Python programming for data science</li>
                        <li><i className="fas fa-check-circle"></i> Machine learning algorithms</li>
                        <li><i className="fas fa-check-circle"></i> Data visualization techniques</li>
                        <li><i className="fas fa-check-circle"></i> Real-world AI projects</li>
                    </ul>
                    <div className="home-course-popup-buttons">
                        <a href="#" className="home-course-popup-btn">Enroll Now</a>
                        <a onClick={ViewDetail} className="home-course-popup-btn-outline">View Details</a>
                    </div>
                    </div>
                </div>

                {/* Course 3 */}
                <div className="home-course-card">
                    <div className="home-course-image">
                    <img src="https://www.skilllane.com/_next/image?url=https%3A%2F%2Fresource.skilllane.com%2Fcourses%2Fhighlight_imgs%2F000%2F006%2F942%2Fmedium_2x%2F660x390_1750735119.jpg&w=1920&q=75" alt="Course thumbnail" />
                    </div>
                    <div className="home-course-content">
                    <div className="home-course-header">
                        <div className="home-course-instructor-avatar">DK</div>
                        <div className="home-course-instructor-info">
                        <div className="home-course-instructor-name">David Kim</div>
                        <div className="home-course-instructor-title">Mobile App Developer</div>
                        </div>
                    </div>
                    <h3 className="home-course-title">Mobile App Development with React Native</h3>
                    <div className="home-course-meta">
                        <div className="home-course-meta-item">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span>28 hours</span>
                        </div>
                        <div className="home-course-meta-item">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span>180 lessons</span>
                        </div>
                    </div>
                    <p className="home-course-description">Build cross-platform mobile apps for iOS and Android using React Native. Learn navigation, state management, and publish to app stores.</p>
                    <div className="home-course-footer">
                        <span className="home-course-price-current">2,690 THB</span>
                        <span className="home-course-price-original">3,790 THB</span>
                    </div>
                    </div>

                    {/* pop-up hover */}
                    <div className="home-course-popup">
                    <h3 className="home-course-popup-title">Mobile App Development with React Native</h3>
                    <p className="home-course-popup-description">Build cross-platform mobile apps for iOS and Android using React Native. Learn navigation, state management, and app deployment.</p>
                    <ul className="home-course-popup-highlights">
                        <li><i className="fas fa-check-circle"></i> React Native fundamentals</li>
                        <li><i className="fas fa-check-circle"></i> Navigation and state management</li>
                        <li><i className="fas fa-check-circle"></i> Native device features</li>
                        <li><i className="fas fa-check-circle"></i> App Store deployment</li>
                    </ul>
                    <div className="home-course-popup-buttons">
                        <a href="#" className="home-course-popup-btn">Enroll Now</a>
                        <a onClick={ViewDetail} className="home-course-popup-btn-outline">View Details</a>
                    </div>
                    </div>
                </div>

                {/* Course 4 */}
                <div className="home-course-card">
                    <div className="home-course-image">
                    <img src="https://www.skilllane.com/_next/image?url=https%3A%2F%2Fresource.skilllane.com%2Fcourses%2Fhighlight_imgs%2F000%2F006%2F028%2Fmedium_2x%2F660x390_1708325314.png&w=1920&q=75" alt="Course thumbnail" />
                    </div>
                    <div className="home-course-content">
                    <div className="home-course-header">
                        <div className="home-course-instructor-avatar">LT</div>
                        <div className="home-course-instructor-info">
                        <div className="home-course-instructor-name">Lisa Thompson</div>
                        <div className="home-course-instructor-title">Digital Marketing Expert</div>
                        </div>
                    </div>
                    <h3 className="home-course-title">Digital Marketing Masterclass: SEO, Social Media & Ads</h3>
                    <div className="home-course-meta">
                        <div className="home-course-meta-item">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span>22 hours</span>
                        </div>
                        <div className="home-course-meta-item">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span>145 lessons</span>
                        </div>
                    </div>
                    <p className="home-course-description">Master digital marketing strategies including SEO, social media marketing, Google Ads, Facebook Ads, and content marketing to grow your business.</p>
                    <div className="home-course-footer">
                        <span className="home-course-price-current">1,890 THB</span>
                        <span className="home-course-price-original">2,990 THB</span>
                    </div>
                    </div>

                    {/* pop-up hover */}
                    <div className="home-course-popup">
                    <h3 className="home-course-popup-title">Digital Marketing Masterclass</h3>
                    <p className="home-course-popup-description">Master digital marketing strategies including SEO, social media marketing, Google Ads, and analytics to grow your business online.</p>
                    <ul className="home-course-popup-highlights">
                        <li><i className="fas fa-check-circle"></i> SEO and content marketing</li>
                        <li><i className="fas fa-check-circle"></i> Social media strategies</li>
                        <li><i className="fas fa-check-circle"></i> Google Ads mastery</li>
                        <li><i className="fas fa-check-circle"></i> Analytics and tracking</li>
                    </ul>
                    <div className="home-course-popup-buttons">
                        <a href="#" className="home-course-popup-btn">Enroll Now</a>
                        <a onClick={ViewDetail} className="home-course-popup-btn-outline">View Details</a>
                    </div>
                    </div>
                </div>

                {/* Course 5 */}
                <div className="home-course-card">
                    <div className="home-course-image">
                    <img src="https://www.skilllane.com/_next/image?url=https%3A%2F%2Fresource.skilllane.com%2Fcourses%2Fhighlight_imgs%2F000%2F007%2F005%2Fmedium_2x%2F660x390_1741076892.jpg&w=1920&q=75" alt="Course thumbnail" />
                    </div>
                    <div className="home-course-content">
                    <div className="home-course-header">
                        <div className="home-course-instructor-avatar">RC</div>
                        <div className="home-course-instructor-info">
                        <div className="home-course-instructor-name">Robert Chen</div>
                        <div className="home-course-instructor-title">Blockchain Developer</div>
                        </div>
                    </div>
                    <h3 className="home-course-title">Blockchain & Cryptocurrency Development Bootcamp</h3>
                    <div className="home-course-meta">
                        <div className="home-course-meta-item">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span>30 hours</span>
                        </div>
                        <div className="home-course-meta-item">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span>195 lessons</span>
                        </div>
                    </div>
                    <p className="home-course-description">Learn blockchain technology, smart contracts, Ethereum, Solidity, and build decentralized applications (DApps) from scratch.</p>
                    <div className="home-course-footer">
                        <span className="home-course-price-current">3,490 THB</span>
                        <span className="home-course-price-original">5,990 THB</span>
                    </div>
                    </div>

                    {/* pop-up hover */}
                    <div className="home-course-popup">
                    <h3 className="home-course-popup-title">Blockchain & Cryptocurrency Development</h3>
                    <p className="home-course-popup-description">Learn blockchain technology, smart contracts, Ethereum, Solidity, and build decentralized applications from scratch.</p>
                    <ul className="home-course-popup-highlights">
                        <li><i className="fas fa-check-circle"></i> Blockchain fundamentals</li>
                        <li><i className="fas fa-check-circle"></i> Smart contract development</li>
                        <li><i className="fas fa-check-circle"></i> Solidity programming</li>
                        <li><i className="fas fa-check-circle"></i> Build DApps</li>
                    </ul>
                    <div className="home-course-popup-buttons">
                        <a href="#" className="home-course-popup-btn">Enroll Now</a>
                        <a onClick={ViewDetail} className="home-course-popup-btn-outline">View Details</a>
                    </div>
                    </div>
                </div>

                {/* Course 6 */}
                <div className="home-course-card">
                    <div className="home-course-image">
                    <img src="https://www.skilllane.com/_next/image?url=https%3A%2F%2Fresource.skilllane.com%2Fcourses%2Fhighlight_imgs%2F000%2F006%2F195%2Fmedium_2x%2F660x390_1720521579.jpg&w=1920&q=75" alt="Course thumbnail" />
                    </div>
                    <div className="home-course-content">
                    <div className="home-course-header">
                        <div className="home-course-instructor-avatar">AP</div>
                        <div className="home-course-instructor-info">
                        <div className="home-course-instructor-name">Anna Patel</div>
                        <div className="home-course-instructor-title">DevOps Engineer</div>
                        </div>
                    </div>
                    <h3 className="home-course-title">DevOps Engineering: Docker, Kubernetes & AWS</h3>
                    <div className="home-course-meta">
                        <div className="home-course-meta-item">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span>26 hours</span>
                        </div>
                        <div className="home-course-meta-item">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span>168 lessons</span>
                        </div>
                    </div>
                    <p className="home-course-description">Master DevOps practices with Docker, Kubernetes, CI/CD pipelines, AWS cloud services, and infrastructure automation for modern applications.</p>
                    <div className="home-course-footer">
                        <span className="home-course-price-current">2,790 THB</span>
                        <span className="home-course-price-original">4,290 THB</span>
                    </div>
                    </div>

                    {/* pop-up hover */}
                    <div className="home-course-popup">
                    <h3 className="home-course-popup-title">DevOps Engineering: Docker, Kubernetes & AWS</h3>
                    <p className="home-course-popup-description">Master DevOps practices with Docker, Kubernetes, CI/CD pipelines, and AWS cloud services for modern applications.</p>
                    <ul className="home-course-popup-highlights">
                        <li><i className="fas fa-check-circle"></i> Docker containerization</li>
                        <li><i className="fas fa-check-circle"></i> Kubernetes orchestration</li>
                        <li><i className="fas fa-check-circle"></i> CI/CD pipelines</li>
                        <li><i className="fas fa-check-circle"></i> AWS cloud services</li>
                    </ul>
                    <div className="home-course-popup-buttons">
                        <a href="#" className="home-course-popup-btn">Enroll Now</a>
                        <a onClick={ViewDetail} className="home-course-popup-btn-outline">View Details</a>
                    </div>
                    </div>
                </div>

                {/* Course 7 */}
                <div className="home-course-card">
                    <div className="home-course-image">
                        <img src="https://www.skilllane.com/_next/image?url=https%3A%2F%2Fresource.skilllane.com%2Fcourses%2Fhighlight_imgs%2F000%2F000%2F683%2Fmedium_2x%2F660_1646036203.png&w=1920&q=75" alt="Course thumbnail" />
                    </div>

                    <div className="home-course-content">
                        <div className="home-course-header">
                            <div className="home-course-instructor-avatar">AM</div>
                            <div className="home-course-instructor-info">
                                <div className="home-course-instructor-name">Alex Morgan</div>
                                <div className="home-course-instructor-title">Cybersecurity Expert</div>
                            </div>
                        </div>

                        <h3 className="home-course-title">Cybersecurity & Ethical Hacking Fundamentals</h3>

                        <div className="home-course-meta">
                            <div className="home-course-meta-item">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" 
                                        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                                <span>26 hours</span>
                            </div>

                            <div className="home-course-meta-item">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" 
                                        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                                <span>165 lessons</span>
                            </div>
                        </div>

                        <p className="home-course-description">
                            Learn ethical hacking, penetration testing, and cybersecurity defense strategies for modern systems and networks.
                        </p>

                        <div className="home-course-footer">
                            <span className="home-course-price-current">3,290 THB</span>
                            <span className="home-course-price-original">5,490 THB</span>
                        </div>
                    </div>

                    {/* pop-up hover */}
                    <div className="home-course-popup">
                        <h3 className="home-course-popup-title">Cybersecurity & Ethical Hacking Fundamentals</h3>
                        <p className="home-course-popup-description">
                            Master ethical hacking, penetration testing, cybersecurity tools, and real-world security techniques.
                        </p>

                        <ul className="home-course-popup-highlights">
                            <li><i className="fas fa-check-circle"></i> Ethical hacking techniques</li>
                            <li><i className="fas fa-check-circle"></i> Penetration testing tools</li>
                            <li><i className="fas fa-check-circle"></i> Network security fundamentals</li>
                            <li><i className="fas fa-check-circle"></i> Real-world cyber lab practice</li>
                        </ul>

                        <div className="home-course-popup-buttons">
                            <a href="#" className="home-course-popup-btn">Enroll Now</a>
                            <a onClick={ViewDetail} className="home-course-popup-btn-outline">View Details</a>
                        </div>
                    </div>
                </div>

                {/* Course 8 */}
                <div className="home-course-card">
                    <div className="home-course-image">
                        <img src="https://www.skilllane.com/_next/image?url=https%3A%2F%2Fresource.skilllane.com%2Fcourses%2Fhighlight_imgs%2F000%2F006%2F597%2Fmedium_2x%2FBannerWeb-banner-660x390_1737539692.jpg&w=1920&q=75" alt="Course thumbnail" />
                    </div>

                    <div className="home-course-content">
                        <div className="home-course-header">
                            <div className="home-course-instructor-avatar">SJ</div>
                            <div className="home-course-instructor-info">
                                <div className="home-course-instructor-name">Sarah Johnson</div>
                                <div className="home-course-instructor-title">Finance Analyst</div>
                            </div>
                        </div>

                        <h3 className="home-course-title">Financial Analysis & Investment Strategy</h3>

                        <div className="home-course-meta">
                            <div className="home-course-meta-item">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" 
                                        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                                <span>20 hours</span>
                            </div>

                            <div className="home-course-meta-item">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" 
                                        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                                <span>120 lessons</span>
                            </div>
                        </div>

                        <p className="home-course-description">
                            Learn stock valuation, ratio analysis, investment strategies, and portfolio construction for long-term returns.
                        </p>

                        <div className="home-course-footer">
                            <span className="home-course-price-current">2,290 THB</span>
                            <span className="home-course-price-original">3,990 THB</span>
                        </div>
                    </div>

                    {/* pop-up hover */}
                    <div className="home-course-popup">
                        <h3 className="home-course-popup-title">Financial Analysis & Investment Strategy</h3>
                        <p className="home-course-popup-description">
                            A complete guide to analyzing financial statements, valuing companies, and building investment portfolios.
                        </p>

                        <ul className="home-course-popup-highlights">
                            <li><i className="fas fa-check-circle"></i> Financial statement analysis</li>
                            <li><i className="fas fa-check-circle"></i> Stock valuation techniques</li>
                            <li><i className="fas fa-check-circle"></i> Portfolio strategy</li>
                            <li><i className="fas fa-check-circle"></i> Real investment case studies</li>
                        </ul>

                        <div className="home-course-popup-buttons">
                            <a href="#" className="home-course-popup-btn">Enroll Now</a>
                            <a onClick={ViewDetail} className="home-course-popup-btn-outline">View Details</a>
                        </div>
                    </div>
                </div>

                </div>
            </div>

            <button 
                className={`home-courses-nav-button next ${coursesCurrentPage < Math.ceil(6 / getCoursesCardsPerPage()) - 1 ? 'visible' : ''}`}
                id="home-courses-nextBtn"
                onClick={handleCoursesNext}
            >
                <svg viewBox="0 0 24 24" fill="none">
                <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </button>
            </div>
        </section>

        {/* Latest Courses */}
        <section className="home-courses-section">
            <div className="home-courses-header">
                <h2 className="home-courses-title">Latest Courses</h2>
                <a href="#" className="home-courses-view-all-btn">
                    View All<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M9 18l6-6-6-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </a>
            </div>

            <div className="home-courses-wrapper">
                <div className="home-courses-container">
                    <div className="home-courses-track">
                        {/* Course 1 */}
                        <div className="home-course-card">
                            <div className="home-course-image">
                                <img src="https://www.skilllane.com/_next/image?url=https%3A%2F%2Fresource.skilllane.com%2Fcourses%2Fhighlight_imgs%2F000%2F004%2F128%2Fmedium_2x%2F660x390_TUXSA_MBA_CC_Artificial-Intelligence-in-Business-Management_1761709965.png&w=1920&q=75" 
                                alt="Course thumbnail" />
                            </div>

                            <div className="home-course-content">
                                <div className="home-course-header">
                                    <div className="home-course-instructor-avatar">SR</div>
                                    <div className="home-course-instructor-info">
                                        <div className="home-course-instructor-name">Sophia Reynolds</div>
                                        <div className="home-course-instructor-title">AI & Business Innovation Specialist</div>
                                    </div>
                                </div>

                                <h3 className="home-course-title">Artificial Intelligence for Business Strategy</h3>

                                <div className="home-course-meta">
                                    <div className="home-course-meta-item">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                            <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                        <span>18 hours</span>
                                    </div>
                                    <div className="home-course-meta-item">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                            <path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                        <span>95 lessons</span>
                                    </div>
                                </div>

                                <p className="home-course-description">
                                    Learn how to apply AI technologies to business operations, decision-making, and strategic planning to gain a competitive advantage.
                                </p>

                                <div className="home-course-footer">
                                    <span className="home-course-price-current">2,190 THB</span>
                                    <span className="home-course-price-original">3,200 THB</span>
                                </div>
                            </div>

                            <div className="home-course-popup">
                                <h3 className="home-course-popup-title">Artificial Intelligence for Business Strategy</h3>
                                <p className="home-course-popup-description">
                                    Understand AI fundamentals and learn how to use AI tools to optimize operations and accelerate business growth.
                                </p>

                                <ul className="home-course-popup-highlights">
                                    <li><i className="fas fa-check-circle"></i> AI foundations for business leaders</li>
                                    <li><i className="fas fa-check-circle"></i> Process automation with AI</li>
                                    <li><i className="fas fa-check-circle"></i> Improve decision-making with predictive analytics</li>
                                    <li><i className="fas fa-check-circle"></i> Real corporate case studies</li>
                                </ul>

                                <div className="home-course-popup-buttons">
                                    <a href="#" className="home-course-popup-btn">Enroll Now</a>
                                    <a onClick={ViewDetail} className="home-course-popup-btn-outline">View Details</a>
                                </div>
                            </div>
                        </div>

                        {/* Course 2 */}
                        <div className="home-course-card">
                            <div className="home-course-image">
                                <img src="https://www.skilllane.com/_next/image?url=https%3A%2F%2Fresource.skilllane.com%2Fcourses%2Fhighlight_imgs%2F000%2F006%2F903%2Fmedium_2x%2F660x390_1758008854.jpg&w=1920&q=75" 
                                alt="Course thumbnail" />
                            </div>

                            <div className="home-course-content">
                                <div className="home-course-header">
                                    <div className="home-course-instructor-avatar">ML</div>
                                    <div className="home-course-instructor-info">
                                        <div className="home-course-instructor-name">Michael Lee</div>
                                        <div className="home-course-instructor-title">Senior Machine Learning Engineer</div>
                                    </div>
                                </div>

                                <h3 className="home-course-title">Practical Machine Learning & Data Engineering</h3>

                                <div className="home-course-meta">
                                    <div className="home-course-meta-item">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                            <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                        <span>30 hours</span>
                                    </div>
                                    <div className="home-course-meta-item">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                            <path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                        <span>160 lessons</span>
                                    </div>
                                </div>

                                <p className="home-course-description">
                                    Learn real-world machine learning workflows, data pipelines, feature engineering, and model deployment for production systems.
                                </p>

                                <div className="home-course-footer">
                                    <span className="home-course-price-current">3,200 THB</span>
                                    <span className="home-course-price-original">4,500 THB</span>
                                </div>
                            </div>

                            <div className="home-course-popup">
                                <h3 className="home-course-popup-title">Practical Machine Learning & Data Engineering</h3>
                                <p className="home-course-popup-description">
                                    Build scalable ML systems from data ingestion to model serving using modern industry tools.
                                </p>
                                <ul className="home-course-popup-highlights">
                                    <li><i className="fas fa-check-circle"></i> End-to-end ML workflow</li>
                                    <li><i className="fas fa-check-circle"></i> Data pipeline construction</li>
                                    <li><i className="fas fa-check-circle"></i> Model deployment techniques</li>
                                    <li><i className="fas fa-check-circle"></i> Practical hands-on projects</li>
                                </ul>
                                <div className="home-course-popup-buttons">
                                    <a href="#" className="home-course-popup-btn">Enroll Now</a>
                                    <a onClick={ViewDetail} className="home-course-popup-btn-outline">View Details</a>
                                </div>
                            </div>
                        </div>

                        {/* Course 3 */}
                        <div className="home-course-card">
                            <div className="home-course-image">
                                <img src="https://www.skilllane.com/_next/image?url=https%3A%2F%2Fresource.skilllane.com%2Fcourses%2Fhighlight_imgs%2F000%2F006%2F452%2Fmedium_2x%2F660x390_1757324177.jpg&w=1920&q=75" 
                                alt="Course thumbnail" />
                            </div>

                            <div className="home-course-content">
                                <div className="home-course-header">
                                    <div className="home-course-instructor-avatar">AM</div>
                                    <div className="home-course-instructor-info">
                                        <div className="home-course-instructor-name">Alex Morgan</div>
                                        <div className="home-course-instructor-title">Full-Stack Mobile Developer</div>
                                    </div>
                                </div>

                                <h3 className="home-course-title">Advanced React Native: Build Production-Ready Apps</h3>

                                <div className="home-course-meta">
                                    <div className="home-course-meta-item">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                            <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                        <span>26 hours</span>
                                    </div>
                                    <div className="home-course-meta-item">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                            <path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                        <span>150 lessons</span>
                                    </div>
                                </div>

                                <p className="home-course-description">
                                    Master advanced React Native concepts including animations, performance optimization, backend integration, and publishing apps.
                                </p>

                                <div className="home-course-footer">
                                    <span className="home-course-price-current">2,450 THB</span>
                                    <span className="home-course-price-original">3,500 THB</span>
                                </div>
                            </div>

                            <div className="home-course-popup">
                                <h3 className="home-course-popup-title">Advanced React Native</h3>
                                <p className="home-course-popup-description">
                                    Build real production-ready mobile apps with advanced techniques and modern toolkits.
                                </p>
                                <ul className="home-course-popup-highlights">
                                    <li><i className="fas fa-check-circle"></i> Advanced UI/UX animations</li>
                                    <li><i className="fas fa-check-circle"></i> API & backend integration</li>
                                    <li><i className="fas fa-check-circle"></i> Performance improvements</li>
                                    <li><i className="fas fa-check-circle"></i> Deploy to App Store & Google Play</li>
                                </ul>

                                <div className="home-course-popup-buttons">
                                    <a href="#" className="home-course-popup-btn">Enroll Now</a>
                                    <a onClick={ViewDetail} className="home-course-popup-btn-outline">View Details</a>
                                </div>
                            </div>
                        </div>

                        {/* Course 4 */}
                        <div className="home-course-card">
                            <div className="home-course-image">
                                <img src="https://www.skilllane.com/_next/image?url=https%3A%2F%2Fresource.skilllane.com%2Fcourses%2Fhighlight_imgs%2F000%2F007%2F361%2Fmedium_2x%2FBannerWeb-banner-660x390_1757574376.jpg&w=1920&q=75" 
                                alt="Course thumbnail" />
                            </div>

                            <div className="home-course-content">
                                <div className="home-course-header">
                                    <div className="home-course-instructor-avatar">CH</div>
                                    <div className="home-course-instructor-info">
                                        <div className="home-course-instructor-name">Charlotte Hayes</div>
                                        <div className="home-course-instructor-title">Performance Marketing Strategist</div>
                                    </div>
                                </div>

                                <h3 className="home-course-title">Performance Marketing: SEO, Analytics & Paid Ads</h3>

                                <div className="home-course-meta">
                                    <div className="home-course-meta-item">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                            <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                        <span>20 hours</span>
                                    </div>

                                    <div className="home-course-meta-item">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                            <path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                        <span>120 lessons</span>
                                    </div>
                                </div>

                                <p className="home-course-description">
                                    Learn high-impact digital marketing techniques focusing on SEO, analytics, and paid advertising to boost conversions and revenue.
                                </p>

                                <div className="home-course-footer">
                                    <span className="home-course-price-current">1,790 THB</span>
                                    <span className="home-course-price-original">2,600 THB</span>
                                </div>
                            </div>

                            <div className="home-course-popup">
                                <h3 className="home-course-popup-title">Performance Marketing Mastery</h3>
                                <p className="home-course-popup-description">
                                    Develop the skills needed to run data-driven marketing campaigns that deliver measurable results.
                                </p>
                                <ul className="home-course-popup-highlights">
                                    <li><i className="fas fa-check-circle"></i> Google Ads & Meta Ads</li>
                                    <li><i className="fas fa-check-circle"></i> Conversion tracking & analytics</li>
                                    <li><i className="fas fa-check-circle"></i> SEO optimization</li>
                                    <li><i className="fas fa-check-circle"></i> Real case studies</li>
                                </ul>

                                <div className="home-course-popup-buttons">
                                    <a href="#" className="home-course-popup-btn">Enroll Now</a>
                                    <a onClick={ViewDetail} className="home-course-popup-btn-outline">View Details</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* Skill to Heal */}
        <section className="home-courses-section">
            <div className="home-courses-header">
                <h2 className="home-courses-title">Skill to Heal : First Aid for Your Mind ดูแลใจ คือทักษะที่ทุกคนพัฒนาได้</h2>
                <a href="#" className="home-courses-view-all-btn">
                    View All<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M9 18l6-6-6-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </a>
            </div>

            <div className="home-courses-wrapper">
                <div className="home-courses-container">
                    <div className="home-courses-track">
                        {/* Course 1 */}
                        <div className="home-course-card">
                            <div className="home-course-image">
                                <img src="https://www.skilllane.com/_next/image?url=https%3A%2F%2Fresource.skilllane.com%2Fcourses%2Fhighlight_imgs%2F000%2F007%2F686%2Fmedium_2x%2FBannerWeb-banner-660x390_1759907719.jpg&w=1920&q=75" alt="Course thumbnail" />
                            </div>
                            <div className="home-course-content">
                                <div className="home-course-header">
                                    <div className="home-course-instructor-avatar">AM</div>
                                    <div className="home-course-instructor-info">
                                        <div className="home-course-instructor-name">Anna Mitchell</div>
                                        <div className="home-course-instructor-title">Certified Mental Health Coach</div>
                                    </div>
                                </div>
                                <h3 className="home-course-title">Foundations of Mental Well-Being & Emotional Balance</h3>
                                <div className="home-course-meta">
                                    <div className="home-course-meta-item">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                            <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                        <span>12 hours</span>
                                    </div>
                                    <div className="home-course-meta-item">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                            <path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                        <span>84 lessons</span>
                                    </div>
                                </div>
                                <p className="home-course-description">
                                    Learn the essential principles of mental well-being, emotional regulation, and self-awareness through practical techniques that you can apply every day.
                                </p>
                                <div className="home-course-footer">
                                    <span className="home-course-price-current">1,490 THB</span>
                                    <span className="home-course-price-original">2,490 THB</span>
                                </div>
                            </div>

                            {/* pop-up hover */}
                            <div className="home-course-popup">
                                <h3 className="home-course-popup-title">Foundations of Mental Well-Being</h3>
                                <p className="home-course-popup-description">
                                    Build long-lasting emotional strength with guided exercises, mindset development, and scientifically backed well-being habits.
                                </p>
                                <ul className="home-course-popup-highlights">
                                    <li><i className="fas fa-check-circle"></i> Emotional awareness techniques</li>
                                    <li><i className="fas fa-check-circle"></i> Stress and anxiety management</li>
                                    <li><i className="fas fa-check-circle"></i> Practical reflection exercises</li>
                                    <li><i className="fas fa-check-circle"></i> Certificate upon completion</li>
                                </ul>
                                <div className="home-course-popup-buttons">
                                    <a href="#" className="home-course-popup-btn">Enroll Now</a>
                                    <a onClick={ViewDetail} className="home-course-popup-btn-outline">View Details</a>
                                </div>
                            </div>
                        </div>

                        {/* Course 2 */}
                        <div className="home-course-card">
                            <div className="home-course-image">
                                <img src="https://www.skilllane.com/_next/image?url=https%3A%2F%2Fresource.skilllane.com%2Fcourses%2Fhighlight_imgs%2F000%2F007%2F687%2Fmedium_2x%2FWeb-banner-660x390_1759908846.jpg&w=1920&q=75" alt="Course thumbnail" />
                            </div>
                            <div className="home-course-content">
                                <div className="home-course-header">
                                    <div className="home-course-instructor-avatar">RS</div>
                                    <div className="home-course-instructor-info">
                                        <div className="home-course-instructor-name">Rachel Simmons</div>
                                        <div className="home-course-instructor-title">Psychological First Aid Specialist</div>
                                    </div>
                                </div>
                                <h3 className="home-course-title">Psychological First Aid (PFA) for Everyday Situations</h3>
                                <div className="home-course-meta">
                                    <div className="home-course-meta-item">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                            <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                        <span>10 hours</span>
                                    </div>
                                    <div className="home-course-meta-item">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                            <path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                        <span>95 lessons</span>
                                    </div>
                                </div>
                                <p className="home-course-description">
                                    Learn how to support others during emotional distress using evidence-based psychological first aid frameworks suitable for real-life scenarios.
                                </p>
                                <div className="home-course-footer">
                                    <span className="home-course-price-current">1,290 THB</span>
                                    <span className="home-course-price-original">2,290 THB</span>
                                </div>
                            </div>

                            {/* pop-up hover */}
                            <div className="home-course-popup">
                                <h3 className="home-course-popup-title">Psychological First Aid (PFA)</h3>
                                <p className="home-course-popup-description">
                                    Step-by-step guidance on identifying distress, offering emotional support, and responding safely during mental health challenges.
                                </p>
                                <ul className="home-course-popup-highlights">
                                    <li><i className="fas fa-check-circle"></i> PFA principles & best practices</li>
                                    <li><i className="fas fa-check-circle"></i> Supporting people in crisis</li>
                                    <li><i className="fas fa-check-circle"></i> Communication techniques</li>
                                    <li><i className="fas fa-check-circle"></i> Practical scenario training</li>
                                </ul>
                                <div className="home-course-popup-buttons">
                                    <a href="#" className="home-course-popup-btn">Enroll Now</a>
                                    <a onClick={ViewDetail} className="home-course-popup-btn-outline">View Details</a>
                                </div>
                            </div>
                        </div>

                        {/* Course 3 */}
                        <div className="home-course-card">
                            <div className="home-course-image">
                                <img src="https://www.skilllane.com/_next/image?url=https%3A%2F%2Fresource.skilllane.com%2Fcourses%2Fhighlight_imgs%2F000%2F007%2F688%2Fmedium_2x%2FBannerWeb-banner-660x390_1759917333.jpg&w=1920&q=75" alt="Course thumbnail" />
                            </div>

                            <div className="home-course-content">
                                <div className="home-course-header">
                                    <div className="home-course-instructor-avatar">JK</div>
                                    <div className="home-course-instructor-info">
                                        <div className="home-course-instructor-name">Jason Keller</div>
                                        <div className="home-course-instructor-title">Mindfulness & Meditation Instructor</div>
                                    </div>
                                </div>

                                <h3 className="home-course-title">Mindfulness for Stress Reduction & Calm Living</h3>

                                <div className="home-course-meta">
                                    <div className="home-course-meta-item">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                            <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                        <span>14 hours</span>
                                    </div>
                                    <div className="home-course-meta-item">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                            <path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                        <span>120 lessons</span>
                                    </div>
                                </div>

                                <p className="home-course-description">
                                    Calm your mind with guided mindfulness practices designed to reduce stress, enhance clarity, and improve emotional resilience.
                                </p>

                                <div className="home-course-footer">
                                    <span className="home-course-price-current">1,590 THB</span>
                                    <span className="home-course-price-original">2,490 THB</span>
                                </div>
                            </div>

                            {/* pop-up */}
                            <div className="home-course-popup">
                                <h3 className="home-course-popup-title">Mindfulness for Stress Reduction</h3>
                                <p className="home-course-popup-description">
                                    Incorporate mindfulness into your daily life with breathing exercises, grounding techniques, and guided meditations.
                                </p>

                                <ul className="home-course-popup-highlights">
                                    <li><i className="fas fa-check-circle"></i> Breathing & grounding exercises</li>
                                    <li><i className="fas fa-check-circle"></i> Focus & concentration training</li>
                                    <li><i className="fas fa-check-circle"></i> Stress reduction techniques</li>
                                    <li><i className="fas fa-check-circle"></i> Guided meditation sessions</li>
                                </ul>

                                <div className="home-course-popup-buttons">
                                    <a href="#" className="home-course-popup-btn">Enroll Now</a>
                                    <a onClick={ViewDetail} className="home-course-popup-btn-outline">View Details</a>
                                </div>
                            </div>
                        </div>

                        {/* Course 4 */}
                        <div className="home-course-card">
                            <div className="home-course-image">
                                <img src="https://www.skilllane.com/_next/image?url=https%3A%2F%2Fresource.skilllane.com%2Fcourses%2Fhighlight_imgs%2F000%2F007%2F689%2Fmedium_2x%2FBannerWeb-banner-660x390_1759910835.jpg&w=1920&q=75" alt="Course thumbnail" />
                            </div>

                            <div className="home-course-content">
                                <div className="home-course-header">
                                    <div className="home-course-instructor-avatar">HB</div>
                                    <div className="home-course-instructor-info">
                                        <div className="home-course-instructor-name">Hannah Brooks</div>
                                        <div className="home-course-instructor-title">Relationship & Communication Coach</div>
                                    </div>
                                </div>

                                <h3 className="home-course-title">Healthy Communication & Emotional Intelligence Skills</h3>

                                <div className="home-course-meta">
                                    <div className="home-course-meta-item">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                            <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                        <span>18 hours</span>
                                    </div>

                                    <div className="home-course-meta-item">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                            <path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                        <span>132 lessons</span>
                                    </div>
                                </div>

                                <p className="home-course-description">
                                    Improve your communication skills, strengthen relationships, and develop emotional intelligence for personal and professional growth.
                                </p>

                                <div className="home-course-footer">
                                    <span className="home-course-price-current">1,490 THB</span>
                                    <span className="home-course-price-original">2,590 THB</span>
                                </div>
                            </div>

                            {/* pop-up */}
                            <div className="home-course-popup">
                                <h3 className="home-course-popup-title">Healthy Communication Skills</h3>
                                <p className="home-course-popup-description">
                                    Learn how to express yourself clearly, understand emotions, and build stronger relationships through effective communication.
                                </p>

                                <ul className="home-course-popup-highlights">
                                    <li><i className="fas fa-check-circle"></i> Conflict resolution techniques</li>
                                    <li><i className="fas fa-check-circle"></i> Listening & empathy skills</li>
                                    <li><i className="fas fa-check-circle"></i> Emotional intelligence development</li>
                                    <li><i className="fas fa-check-circle"></i> Real-world communication scenarios</li>
                                </ul>

                                <div className="home-course-popup-buttons">
                                    <a href="#" className="home-course-popup-btn">Enroll Now</a>
                                    <a onClick={ViewDetail} className="home-course-popup-btn-outline">View Details</a>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>

        {/* Popular Categories */}
        <section className="home-pop-categories-section">
            <div className="home-pop-categories-header">
            <h2>Popular Categories</h2>
            <p>Explore diverse skills and knowledge from experienced mentors</p>
            </div>
            <div className="home-pop-categories-wrapper">
            <button 
                className={`home-pop-categories-nav-button prev ${categoriesCurrentIndex > 0 ? 'visible' : ''}`}
                id="home-pop-categories-prevBtn"
                onClick={handleCategoriesPrev}
            >
                <svg viewBox="0 0 24 24" fill="none">
                <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </button>

            <div className="home-pop-categories-container">
                <div 
                className="home-pop-categories-track" 
                id="home-pop-categoriesTrack"
                style={{
                    transform: `translateX(-${categoriesCurrentIndex * (document.querySelector('.home-pop-categories-column')?.offsetWidth + 16 || 0)}px)`
                }}
                >
                {/* Column 1 */}
                <div className="home-pop-categories-column">
                    <a onClick={BrowseCourse} className="home-pop-category-card">
                    <span>Languages</span>
                    <svg className="home-pop-categories-arrow-icon" viewBox="0 0 24 24" fill="none">
                        <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    </a>
                    <a onClick={BrowseCourse} className="home-pop-category-card">
                    <span>Business</span>
                    <svg className="home-pop-categories-arrow-icon" viewBox="0 0 24 24" fill="none">
                        <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    </a>
                </div>

                {/* Column 2 */}
                <div className="home-pop-categories-column">
                    <a onClick={BrowseCourse} className="home-pop-category-card">
                    <span>Finance & Investment</span>
                    <svg className="home-pop-categories-arrow-icon" viewBox="0 0 24 24" fill="none">
                        <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    </a>
                    <a onClick={BrowseCourse} className="home-pop-category-card">
                    <span>AI & Data</span>
                    <svg className="home-pop-categories-arrow-icon" viewBox="0 0 24 24" fill="none">
                        <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    </a>
                </div>

                {/* Column 3 */}
                <div className="home-pop-categories-column">
                    <a onClick={BrowseCourse} className="home-pop-category-card">
                    <span>Technology</span>
                    <svg className="home-pop-categories-arrow-icon" viewBox="0 0 24 24" fill="none">
                        <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    </a>
                    <a onClick={BrowseCourse} className="home-pop-category-card">
                    <span>Lifestyle</span>
                    <svg className="home-pop-categories-arrow-icon" viewBox="0 0 24 24" fill="none">
                        <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    </a>
                </div>

                {/* Column 4 */}
                <div className="home-pop-categories-column">
                    <a onClick={BrowseCourse} className="home-pop-category-card">
                    <span>Health & Wellness</span>
                    <svg className="home-pop-categories-arrow-icon" viewBox="0 0 24 24" fill="none">
                        <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    </a>
                    <a onClick={BrowseCourse} className="home-pop-category-card">
                    <span>Music & Art</span>
                    <svg className="home-pop-categories-arrow-icon" viewBox="0 0 24 24" fill="none">
                        <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    </a>
                </div>

                {/* Column 5 */}
                <div className="home-pop-categories-column">
                    <a onClick={BrowseCourse} className="home-pop-category-card">
                    <span>Productivity</span>
                    <svg className="home-pop-categories-arrow-icon" viewBox="0 0 24 24" fill="none">
                        <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    </a>
                    <a onClick={BrowseCourse} className="home-pop-category-card">
                    <span>Free Courses</span>
                    <svg className="home-pop-categories-arrow-icon" viewBox="0 0 24 24" fill="none">
                        <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    </a>
                </div>

                {/* Column 6 */}
                <div className="home-pop-categories-column">
                    <a onClick={BrowseCourse} className="home-pop-category-card">
                    <span>All Instructors</span>
                    <svg className="home-pop-categories-arrow-icon" viewBox="0 0 24 24" fill="none">
                        <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    </a>
                </div>
                </div>
            </div>

            <button 
                className={`home-pop-categories-nav-button next ${categoriesCurrentIndex < 6 - getCategoriesColumnsPerView() ? 'visible' : ''}`}
                id="home-pop-categories-nextBtn"
                onClick={handleCategoriesNext}
            >
                <svg viewBox="0 0 24 24" fill="none">
                <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </button>
            </div>
        </section>

        {/* Featured Learning Paths */}
        <section className="home-courses-section">
            <div className="home-courses-header">
                <h2 className="home-courses-title">Featured Learning Paths: Start Your Journey to Success</h2>
                <a href="#" className="home-courses-view-all-btn">
                    View All
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M9 18l6-6-6-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </a>
            </div>

            <div className="home-courses-wrapper">
                <div className="home-courses-container">
                    <div className="home-courses-track">

                    {/* Course 1 – NEW CONTENT */}
                    <div className="home-course-card">
                        <div className="home-course-image">
                            <img src="https://www.skilllane.com/_next/image?url=https%3A%2F%2Fresource.skilllane.com%2Fcourses%2Fhighlight_imgs%2F000%2F006%2F952%2Fmedium_2x%2F660x390_1756267229.jpg&w=1920&q=75" alt="Course thumbnail" />
                        </div>

                        <div className="home-course-content">
                            <div className="home-course-header">
                                <div className="home-course-instructor-avatar">AR</div>
                                <div className="home-course-instructor-info">
                                    <div className="home-course-instructor-name">Alex Rivera</div>
                                    <div className="home-course-instructor-title">Full-Stack Software Engineer</div>
                                </div>
                            </div>

                            <h3 className="home-course-title">Full-Stack Developer Roadmap 2025</h3>

                            <div className="home-course-meta">
                                <div className="home-course-meta-item">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                    <span>30 hours</span>
                                </div>
                                <div className="home-course-meta-item">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                    <span>160 lessons</span>
                                </div>
                            </div>

                            <p className="home-course-description">
                                A complete roadmap to becoming a full-stack developer using modern technologies including JavaScript, React, Node.js, and databases.
                            </p>

                            <div className="home-course-footer">
                                <span className="home-course-price-current">2,590 THB</span>
                                <span className="home-course-price-original">3,900 THB</span>
                            </div>
                        </div>

                        {/* pop-up hover */}
                        <div className="home-course-popup">
                            <h3 className="home-course-popup-title">Full-Stack Developer Roadmap 2025</h3>
                            <p className="home-course-popup-description">
                                Learn full-stack development from basics to advanced topics. Build portfolio-ready projects and prepare for real-world development.
                            </p>
                            <ul className="home-course-popup-highlights">
                                <li><i className="fas fa-check-circle"></i> Frontend + backend fundamentals</li>
                                <li><i className="fas fa-check-circle"></i> Build full web applications</li>
                                <li><i className="fas fa-check-circle"></i> Database & API development</li>
                                <li><i className="fas fa-check-circle"></i> Job-ready project portfolio</li>
                            </ul>
                            <div className="home-course-popup-buttons">
                                <a href="#" className="home-course-popup-btn">Enroll Now</a>
                                <a onClick={ViewDetail} className="home-course-popup-btn-outline">View Details</a>
                            </div>
                        </div>
                    </div>

                    {/* Course 2 – NEW CONTENT */}
                    <div className="home-course-card">
                        <div className="home-course-image">
                            <img src="https://www.skilllane.com/_next/image?url=https%3A%2F%2Fresource.skilllane.com%2Fcourses%2Fhighlight_imgs%2F000%2F007%2F452%2Fmedium_2x%2FBannerWeb-banner-660x390_1755865182.jpg&w=1920&q=75" alt="Course thumbnail" />
                        </div>

                        <div className="home-course-content">
                            <div className="home-course-header">
                                <div className="home-course-instructor-avatar">SM</div>
                                <div className="home-course-instructor-info">
                                    <div className="home-course-instructor-name">Sarah Mitchell</div>
                                    <div className="home-course-instructor-title">AI & Machine Learning Engineer</div>
                                </div>
                            </div>

                            <h3 className="home-course-title">AI Essentials: Machine Learning & Deep Learning</h3>

                            <div className="home-course-meta">
                                <div className="home-course-meta-item">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                    <span>35 hours</span>
                                </div>
                                <div className="home-course-meta-item">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                    <span>200 lessons</span>
                                </div>
                            </div>

                            <p className="home-course-description">
                                Learn essential machine learning and deep learning concepts with hands-on projects using Python, TensorFlow, and PyTorch.
                            </p>

                            <div className="home-course-footer">
                                <span className="home-course-price-current">3,200 THB</span>
                                <span className="home-course-price-original">4,900 THB</span>
                            </div>
                        </div>

                        {/* pop-up hover */}
                        <div className="home-course-popup">
                            <h3 className="home-course-popup-title">AI Essentials: Machine Learning & Deep Learning</h3>
                            <p className="home-course-popup-description">
                                Build a solid foundation in AI through practical ML and DL projects that prepare you for real-world applications.
                            </p>
                            <ul className="home-course-popup-highlights">
                                <li><i className="fas fa-check-circle"></i> Machine learning fundamentals</li>
                                <li><i className="fas fa-check-circle"></i> Neural networks & deep learning</li>
                                <li><i className="fas fa-check-circle"></i> Hands-on coding labs</li>
                                <li><i className="fas fa-check-circle"></i> Real AI case studies</li>
                            </ul>
                            <div className="home-course-popup-buttons">
                                <a href="#" className="home-course-popup-btn">Enroll Now</a>
                                <a onClick={ViewDetail} className="home-course-popup-btn-outline">View Details</a>
                            </div>
                        </div>
                    </div>

                    {/* Course 3 – NEW CONTENT */}
                    <div className="home-course-card">
                        <div className="home-course-image">
                            <img src="https://www.skilllane.com/_next/image?url=https%3A%2F%2Fresource.skilllane.com%2Fcourses%2Fhighlight_imgs%2F000%2F007%2F459%2Fmedium_2x%2F660x390_1754023548.jpg&w=1920&q=75" alt="Course thumbnail" />
                        </div>

                        <div className="home-course-content">
                            <div className="home-course-header">
                                <div className="home-course-instructor-avatar">JM</div>
                                <div className="home-course-instructor-info">
                                    <div className="home-course-instructor-name">Jacob Morgan</div>
                                    <div className="home-course-instructor-title">Senior Mobile Engineer</div>
                                </div>
                            </div>

                            <h3 className="home-course-title">Flutter & Dart Mobile Development Bootcamp</h3>

                            <div className="home-course-meta">
                                <div className="home-course-meta-item">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                    <span>26 hours</span>
                                </div>
                                <div className="home-course-meta-item">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                    <span>175 lessons</span>
                                </div>
                            </div>

                            <p className="home-course-description">
                                Learn to build high-performance mobile apps with Flutter and Dart. Create iOS and Android apps from a single codebase.
                            </p>

                            <div className="home-course-footer">
                                <span className="home-course-price-current">2,750 THB</span>
                                <span className="home-course-price-original">3,600 THB</span>
                            </div>
                        </div>

                        {/* pop-up hover */}
                        <div className="home-course-popup">
                            <h3 className="home-course-popup-title">Flutter & Dart Mobile Development Bootcamp</h3>
                            <p className="home-course-popup-description">
                                Build modern cross-platform mobile apps with Flutter. Learn UI design, state management, and publishing apps.
                            </p>
                            <ul className="home-course-popup-highlights">
                                <li><i className="fas fa-check-circle"></i> Flutter UI & widgets</li>
                                <li><i className="fas fa-check-circle"></i> State management techniques</li>
                                <li><i className="fas fa-check-circle"></i> API integration</li>
                                <li><i className="fas fa-check-circle"></i> Publish to App Store & Play Store</li>
                            </ul>
                            <div className="home-course-popup-buttons">
                                <a href="#" className="home-course-popup-btn">Enroll Now</a>
                                <a onClick={ViewDetail} className="home-course-popup-btn-outline">View Details</a>
                            </div>
                        </div>
                    </div>

                    {/* Course 4 – NEW CONTENT */}
                    <div className="home-course-card">
                        <div className="home-course-image">
                            <img src="https://www.skilllane.com/_next/image?url=https%3A%2F%2Fresource.skilllane.com%2Fcourses%2Fhighlight_imgs%2F000%2F005%2F320%2Fmedium_2x%2FBannerWeb-banner-660x390_1706009103.jpg&w=1920&q=75" alt="Course thumbnail" />
                        </div>

                        <div className="home-course-content">
                            <div className="home-course-header">
                                <div className="home-course-instructor-avatar">CM</div>
                                <div className="home-course-instructor-info">
                                    <div className="home-course-instructor-name">Chloe Martinez</div>
                                    <div className="home-course-instructor-title">Marketing Strategist</div>
                                </div>
                            </div>

                            <h3 className="home-course-title">Modern Digital Marketing 360° Certification</h3>

                            <div className="home-course-meta">
                                <div className="home-course-meta-item">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                    <span>20 hours</span>
                                </div>
                                <div className="home-course-meta-item">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                    <span>140 lessons</span>
                                </div>
                            </div>

                            <p className="home-course-description">
                                A complete marketing certification covering SEO, content marketing, ads management, analytics, and brand strategy.
                            </p>

                            <div className="home-course-footer">
                                <span className="home-course-price-current">1,950 THB</span>
                                <span className="home-course-price-original">2,990 THB</span>
                            </div>
                        </div>

                        {/* pop-up hover */}
                        <div className="home-course-popup">
                            <h3 className="home-course-popup-title">Modern Digital Marketing 360° Certification</h3>
                            <p className="home-course-popup-description">
                                Learn all essential digital marketing skills to grow brands, drive conversions, and build long-term digital strategy.
                            </p>
                            <ul className="home-course-popup-highlights">
                                <li><i className="fas fa-check-circle"></i> SEO & content strategy</li>
                                <li><i className="fas fa-check-circle"></i> Social media & ads</li>
                                <li><i className="fas fa-check-circle"></i> Analytics & optimization</li>
                                <li><i className="fas fa-check-circle"></i> Practical marketing projects</li>
                            </ul>
                            <div className="home-course-popup-buttons">
                                <a href="#" className="home-course-popup-btn">Enroll Now</a>
                                <a onClick={ViewDetail} className="home-course-popup-btn-outline">View Details</a>
                            </div>
                        </div>
                    </div>

                    </div>
                </div>
            </div>
        </section>

        {/* Free courses */}
        <section className="home-courses-section">
            <div className="home-courses-header">
                <h2 className="home-courses-title">Popular free courses</h2>
                <a href="#" className="home-courses-view-all-btn">
                    View All<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M9 18l6-6-6-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </a>
            </div>

            <div className="home-courses-wrapper">
                <div className="home-courses-container">
                    <div className="home-courses-track">
                    {/* Course 1 */}
                    <div className="home-course-card">
                        <div className="home-course-image">
                        <img src="https://www.skilllane.com/_next/image?url=https%3A%2F%2Fresource.skilllane.com%2Fcourses%2Fhighlight_imgs%2F000%2F007%2F614%2Fmedium_2x%2F660x390_(8)_1758532797.jpg&w=1920&q=75" alt="Course thumbnail" />
                        </div>
                        <div className="home-course-content">
                        <div className="home-course-header">
                            <div className="home-course-instructor-avatar">AM</div>
                            <div className="home-course-instructor-info">
                            <div className="home-course-instructor-name">Anna Mitchell</div>
                            <div className="home-course-instructor-title">UX/UI Designer</div>
                            </div>
                        </div>
                        <h3 className="home-course-title">UX/UI Design Fundamentals for Beginners</h3>
                        <div className="home-course-meta">
                            <div className="home-course-meta-item">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            <span>18 hours</span>
                            </div>
                            <div className="home-course-meta-item">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            <span>120 lessons</span>
                            </div>
                        </div>
                        <p className="home-course-description">Learn the fundamentals of UX/UI design, wireframing, prototyping, and user research using Figma. Perfect for beginners who want to build real design projects.</p>
                        <div className="home-course-footer">
                            <span className="home-course-price-current">Free</span>
                            <span className="home-course-price-original">990 THB</span>
                        </div>
                        </div>

                        {/* pop-up hover */}
                        <div className="home-course-popup">
                        <h3 className="home-course-popup-title">UX/UI Design Fundamentals for Beginners</h3>
                        <p className="home-course-popup-description">Master the essentials of modern UX/UI design. Learn how to create wireframes, prototypes, and user flows while working on practical design projects using Figma.</p>
                        <ul className="home-course-popup-highlights">
                            <li><i className="fas fa-check-circle"></i> UX fundamentals and user research</li>
                            <li><i className="fas fa-check-circle"></i> UI design principles</li>
                            <li><i className="fas fa-check-circle"></i> Wireframing & prototyping in Figma</li>
                            <li><i className="fas fa-check-circle"></i> Portfolio-ready projects</li>
                        </ul>
                        <div className="home-course-popup-buttons">
                            <a href="#" className="home-course-popup-btn">Enroll Now</a>
                            <a onClick={ViewDetail} className="home-course-popup-btn-outline">View Details</a>
                        </div>
                        </div>
                    </div>

                    {/* Course 2 */}
                    <div className="home-course-card">
                        <div className="home-course-image">
                        <img src="https://www.skilllane.com/_next/image?url=https%3A%2F%2Fresource.skilllane.com%2Fcourses%2Fhighlight_imgs%2F000%2F007%2F656%2Fmedium_2x%2F660x390_(2)_1758857915.jpg&w=1920&q=75" alt="Course thumbnail" />
                        </div>
                        <div className="home-course-content">
                        <div className="home-course-header">
                            <div className="home-course-instructor-avatar">RS</div>
                            <div className="home-course-instructor-info">
                            <div className="home-course-instructor-name">Robert Stevens</div>
                            <div className="home-course-instructor-title">Cybersecurity Specialist</div>
                            </div>
                        </div>
                        <h3 className="home-course-title">Introduction to Cybersecurity & Ethical Hacking</h3>
                        <div className="home-course-meta">
                            <div className="home-course-meta-item">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            <span>20 hours</span>
                            </div>
                            <div className="home-course-meta-item">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            <span>95 lessons</span>
                            </div>
                        </div>
                        <p className="home-course-description">Learn cybersecurity basics, ethical hacking principles, network security, and threat prevention. Designed for beginners entering the cybersecurity field.</p>
                        <div className="home-course-footer">
                            <span className="home-course-price-current">Free</span>
                            <span className="home-course-price-original">1,290 THB</span>
                        </div>
                        </div>

                        {/* pop-up hover */}
                        <div className="home-course-popup">
                        <h3 className="home-course-popup-title">Introduction to Cybersecurity & Ethical Hacking</h3>
                        <p className="home-course-popup-description">Understand how cyber attacks work and how to defend systems. Learn ethical hacking fundamentals, network vulnerabilities, and hands-on security techniques.</p>
                        <ul className="home-course-popup-highlights">
                            <li><i className="fas fa-check-circle"></i> Cybersecurity fundamentals</li>
                            <li><i className="fas fa-check-circle"></i> Ethical hacking basics</li>
                            <li><i className="fas fa-check-circle"></i> Network vulnerabilities</li>
                            <li><i className="fas fa-check-circle"></i> Practical security techniques</li>
                        </ul>
                        <div className="home-course-popup-buttons">
                            <a href="#" className="home-course-popup-btn">Enroll Now</a>
                            <a onClick={ViewDetail} className="home-course-popup-btn-outline">View Details</a>
                        </div>
                        </div>
                    </div>

                    {/* Course 3 */}
                    <div className="home-course-card">
                        <div className="home-course-image">
                        <img src="https://www.skilllane.com/_next/image?url=https%3A%2F%2Fresource.skilllane.com%2Fcourses%2Fhighlight_imgs%2F000%2F006%2F378%2Fmedium_2x%2F660x390-3_1738318677.png&w=1920&q=75" alt="Course thumbnail" />
                        </div>
                        <div className="home-course-content">
                        <div className="home-course-header">
                            <div className="home-course-instructor-avatar">CL</div>
                            <div className="home-course-instructor-info">
                            <div className="home-course-instructor-name">Christine Lee</div>
                            <div className="home-course-instructor-title">Financial Analyst</div>
                            </div>
                        </div>
                        <h3 className="home-course-title">Financial Literacy: Personal Finance & Investing</h3>
                        <div className="home-course-meta">
                            <div className="home-course-meta-item">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            <span>12 hours</span>
                            </div>
                            <div className="home-course-meta-item">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            <span>80 lessons</span>
                            </div>
                        </div>
                        <p className="home-course-description">Learn how to manage money, budget effectively, reduce financial risks, and start investing with confidence—even with zero prior knowledge.</p>
                        <div className="home-course-footer">
                            <span className="home-course-price-current">Free</span>
                            <span className="home-course-price-original">1,590 THB</span>
                        </div>
                        </div>

                        {/* pop-up hover */}
                        <div className="home-course-popup">
                        <h3 className="home-course-popup-title">Financial Literacy: Personal Finance & Investing</h3>
                        <p className="home-course-popup-description">A practical guide to personal finance covering saving, budgeting, debt management, and long-term investing strategies suitable for beginners.</p>
                        <ul className="home-course-popup-highlights">
                            <li><i className="fas fa-check-circle"></i> Budgeting & saving strategies</li>
                            <li><i className="fas fa-check-circle"></i> Debt management</li>
                            <li><i className="fas fa-check-circle"></i> Investing for beginners</li>
                            <li><i className="fas fa-check-circle"></i> Long-term wealth planning</li>
                        </ul>
                        <div className="home-course-popup-buttons">
                            <a href="#" className="home-course-popup-btn">Enroll Now</a>
                            <a onClick={ViewDetail} className="home-course-popup-btn-outline">View Details</a>
                        </div>
                        </div>
                    </div>

                    {/* Course 4 */}
                    <div className="home-course-card">
                        <div className="home-course-image">
                        <img src="https://www.skilllane.com/_next/image?url=https%3A%2F%2Fresource.skilllane.com%2Fcourses%2Fhighlight_imgs%2F000%2F006%2F044%2Fmedium_2x%2F1708569328355_1708569434.jpg&w=1920&q=75" alt="Course thumbnail" />
                        </div>
                        <div className="home-course-content">
                        <div className="home-course-header">
                            <div className="home-course-instructor-avatar">MT</div>
                            <div className="home-course-instructor-info">
                            <div className="home-course-instructor-name">Michael Turner</div>
                            <div className="home-course-instructor-title">AI Engineer</div>
                            </div>
                        </div>
                        <h3 className="home-course-title">AI for Everyone: Understanding Modern Artificial Intelligence</h3>
                        <div className="home-course-meta">
                            <div className="home-course-meta-item">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            <span>15 hours</span>
                            </div>
                            <div className="home-course-meta-item">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            <span>110 lessons</span>
                            </div>
                        </div>
                        <p className="home-course-description">An easy-to-understand introduction to AI, machine learning, neural networks, and real-world AI applications without coding requirements.</p>
                        <div className="home-course-footer">
                            <span className="home-course-price-current">Free</span>
                            <span className="home-course-price-original">1,890 THB</span>
                        </div>
                        </div>

                        {/* pop-up hover */}
                        <div className="home-course-popup">
                        <h3 className="home-course-popup-title">AI for Everyone: Understanding Modern Artificial Intelligence</h3>
                        <p className="home-course-popup-description">Explore how AI works, the basics of machine learning, and how AI technologies are used in business, healthcare, finance, and everyday life.</p>
                        <ul className="home-course-popup-highlights">
                            <li><i className="fas fa-check-circle"></i> AI & ML fundamentals</li>
                            <li><i className="fas fa-check-circle"></i> Neural network basics</li>
                            <li><i className="fas fa-check-circle"></i> Real-world AI applications</li>
                            <li><i className="fas fa-check-circle"></i> Future of AI technology</li>
                        </ul>
                        <div className="home-course-popup-buttons">
                            <a href="#" className="home-course-popup-btn">Enroll Now</a>
                            <a onClick={ViewDetail} className="home-course-popup-btn-outline">View Details</a>
                        </div>
                        </div>
                    </div>

                    </div>
                </div>
            </div>
        </section>

        {/* Features Section */}
        <section className="home-features-section">
            <div className="home-features-container">
            <div className="home-features-header">
                <h2 className="home-features-title">What Makes Us Different?</h2>
                <p className="home-features-subtitle">Discover the key features that set us apart from the rest</p>
            </div>

            <div className="home-features-grid">
                <div className="home-feature-card">
                <div className="home-feature-icon">
                    <i className="fas fa-check-circle"></i>
                </div>
                <h3 className="home-feature-title">Admin Verified Courses</h3>
                <p className="home-feature-description">Every course is reviewed and approved by our admin team to ensure the highest quality standards.</p>
                </div>

                <div className="home-feature-card">
                <div className="home-feature-icon">
                    <i className="fas fa-users"></i>
                </div>
                <h3 className="home-feature-title">Experienced Teachers</h3>
                <p className="home-feature-description">Learn from seniors with 10-50+ years of real-world expertise in their fields.</p>
                </div>

                <div className="home-feature-card">
                <div className="home-feature-icon">
                    <i className="fas fa-award"></i>
                </div>
                <h3 className="home-feature-title">Lifetime Access</h3>
                <p className="home-feature-description">Purchase once and access your courses forever with regular updates included.</p>
                </div>

                <div className="home-feature-card">
                <div className="home-feature-icon">
                    <i className="fas fa-video"></i>
                </div>
                <h3 className="home-feature-title">Quality Content</h3>
                <p className="home-feature-description">High-quality recorded videos and live sessions conducted by verified instructors.</p>
                </div>

                <div className="home-feature-card">
                <div className="home-feature-icon">
                    <i className="fas fa-certificate"></i>
                </div>
                <h3 className="home-feature-title">Certifications</h3>
                <p className="home-feature-description">Earn recognized certificates upon completion of each course.</p>
                </div>

                <div className="home-feature-card">
                <div className="home-feature-icon">
                    <i className="fas fa-headset"></i>
                </div>
                <h3 className="home-feature-title">24/7 Support</h3>
                <p className="home-feature-description">Get help whenever you need it from our dedicated support team.</p>
                </div>
            </div>
            </div>
        </section>

        {/* CTA Section */}
        <section className="home-cta-section">
            <div className="home-cta-container">
            <h1>Numerous Elderise Online Courses are Waiting for You to Explore</h1>
            <h3>You can learn anywhere, anytime with over 4,700 courses. 
                <br />Ready to enhance the skills and competencies you need? Start learning today!</h3>
            <button onClick={BrowseCourse} className="home-cta-view-all-btn"><i className="fas fa-search"></i> Explore Courses</button>
            </div>
        </section>

        {/* Footer Section */}
        <Footer/>

        {/* Bottom right corner Section */}
        <div className="home-BRC-container">
            {/* Scroll to Top Button */}
            <button 
                className={`scroll-to-top ${showScrollTop ? 'visible' : ''} ${!showCouponBanner ? 'coupon-hidden' : ''}`}
                id="scrollToTop" 
                aria-label="Scroll to top"
                onClick={scrollToTop}
            >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 19V5M5 12l7-7 7 7"/>
            </svg>
            </button>

            {/* Coupon Banner */}
            <div className={`coupon-banner ${!showCouponBanner ? 'hidden' : ''}`}>
            <div className="coupon-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/>
                <polyline points="7.5 4.21 12 6.81 16.5 4.21"/>
                <polyline points="7.5 19.79 7.5 14.6 3 12"/>
                <polyline points="21 12 16.5 14.6 16.5 19.79"/>
                <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
                <line x1="12" y1="22.08" x2="12" y2="12"/>
                </svg>
            </div>
            <div className="coupon-content">
                <div className="coupon-title">Get 300 THB Free</div>
                <div className="coupon-subtitle">For your first course purchase</div>
            </div>
            <button className="coupon-button" id="couponBanner" onClick={handleCouponClick}>Claim Now</button>
            <button className="coupon-dismiss" id="dismissCoupon" aria-label="Dismiss" onClick={dismissCoupon}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
            </button>
            </div>
        </div>

    </div>
  );
};

export default Home;