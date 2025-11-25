import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useNavigate } from "react-router-dom";
import "./BrowseCourses.css";

const BrowseCourses = () => {
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedFeatures, setSelectedFeatures] = useState([]);
    const [priceRange, setPriceRange] = useState('all');
    const [sortBy, setSortBy] = useState('relevance');
    const navigate = useNavigate();

    const ViewDetail = () => {
        navigate("/CourseDetail");
    };

    const [showScrollTop, setShowScrollTop] = useState(false);
    const [showCouponBanner, setShowCouponBanner] = useState(true);
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

    // Simulate courses data
    const allCourses = [
        {
        id: 1,
        title: 'AI Complete Course: Build AI Applications',
        instructor: 'John Smith',
        instructorTitle: 'AI Expert',
        price: 1199,
        originalPrice: 1699,
        image: 'https://www.skilllane.com/_next/image?url=https%3A%2F%2Fresource.skilllane.com%2Fcourses%2Fhighlight_imgs%2F000%2F006%2F159%2Fmedium_2x%2F%E0%B8%AB%E0%B8%B1%E0%B8%A7%E0%B9%80%E0%B8%A3%E0%B8%B7%E0%B9%88%E0%B8%AD%E0%B8%87%E0%B8%A2%E0%B9%88%E0%B8%AD%E0%B8%A2_(1)_1714461196.jpg&w=1920&q=75',
        category: 'AI & Data',
        level: 'Beginner',
        rating: 4.8,
        students: 2543
        },
        {
        id: 2,
        title: 'HPT: High-Performing Team Strategy',
        instructor: 'Sarah Johnson',
        instructorTitle: 'Business Coach',
        price: 3500,
        originalPrice: 4000,
        image: 'https://www.skilllane.com/_next/image?url=https%3A%2F%2Fresource.skilllane.com%2Fcourses%2Fhighlight_imgs%2F000%2F001%2F959%2Fmedium_2x%2F1959_banner_1._660x390_1646040573.png&w=1920&q=75',
        category: 'Business',
        level: 'Intermediate',
        rating: 4.9,
        students: 1820
        },
        {
        id: 3,
        title: 'AI Agent & OCR Automation Advanced',
        instructor: 'Mike Chen',
        instructorTitle: 'Tech Developer',
        price: 1990,
        originalPrice: 2250,
        image: 'https://www.skilllane.com/_next/image?url=https%3A%2F%2Fresource.skilllane.com%2Fcourses%2Fhighlight_imgs%2F000%2F006%2F942%2Fmedium_2x%2F660x390_1750735119.jpg&w=1920&q=75',
        category: 'AI & Data',
        level: 'Advanced',
        rating: 4.7,
        students: 956
        },
        {
        id: 4,
        title: 'AutoCAD Professional Design Course',
        instructor: 'David Lee',
        instructorTitle: 'CAD Specialist',
        price: 2490,
        originalPrice: 3200,
        image: 'https://www.skilllane.com/_next/image?url=https%3A%2F%2Fresource.skilllane.com%2Fcourses%2Fhighlight_imgs%2F000%2F006%2F028%2Fmedium_2x%2F660x390_1708325314.png&w=1920&q=75',
        category: 'Technology',
        level: 'Intermediate',
        rating: 4.6,
        students: 1234
        },
        {
        id: 5,
        title: 'Advanced AutoCAD Night Workshop',
        instructor: 'Lisa Wang',
        instructorTitle: 'Design Expert',
        price: 1890,
        originalPrice: 2500,
        image: 'https://www.skilllane.com/_next/image?url=https%3A%2F%2Fresource.skilllane.com%2Fcourses%2Fhighlight_imgs%2F000%2F007%2F005%2Fmedium_2x%2F660x390_1741076892.jpg&w=1920&q=75',
        category: 'Technology',
        level: 'Advanced',
        rating: 4.8,
        students: 789
        },
        {
        id: 6,
        title: 'Graphic Design Mastery Course',
        instructor: 'Amy Taylor',
        instructorTitle: 'Creative Director',
        price: 5900,
        originalPrice: 6990,
        image: 'https://www.skilllane.com/_next/image?url=https%3A%2F%2Fresource.skilllane.com%2Fcourses%2Fhighlight_imgs%2F000%2F006%2F195%2Fmedium_2x%2F660x390_1720521579.jpg&w=1920&q=75',
        category: 'Lifestyle',
        level: 'Beginner',
        rating: 4.9,
        students: 3456
        }
    ];

    const categories = [
        'Languages',
        'Business',
        'Finance & Investment',
        'AI & Data',
        'Technology',
        'Lifestyle',
        'Health & Wellness',
        'Music & Art'
    ];

    const features = [
        'Admin Verified',
        'Certificate',
        'Lifetime Access',
        'Free'
    ];

    // Filter logic
    const filteredCourses = allCourses.filter(course => {
        // Category filter
        if (selectedCategories.length > 0 && !selectedCategories.includes(course.category)) {
        return false;
        }

        // Price filter
        if (priceRange === 'free' && course.price > 0) return false;
        if (priceRange === 'paid' && course.price === 0) return false;
        if (priceRange === 'under2000' && course.price >= 2000) return false;
        if (priceRange === 'over2000' && course.price < 2000) return false;
        if (priceRange === 'under5000' && course.price >= 5000) return false;
        if (priceRange === 'over5000' && course.price < 5000) return false;

        return true;
    });

    // Sort logic
    const sortedCourses = [...filteredCourses].sort((a, b) => {
        switch (sortBy) {
        case 'price-low':
            return a.price - b.price;
        case 'price-high':
            return b.price - a.price;
        case 'rating':
            return b.rating - a.rating;
        case 'popular':
            return b.students - a.students;
        default:
            return 0;
        }
    });

    const handleCategoryChange = (category) => {
        setSelectedCategories(prev =>
        prev.includes(category)
            ? prev.filter(c => c !== category)
            : [...prev, category]
        );
    };

    const handleFeatureChange = (feature) => {
        setSelectedFeatures(prev =>
        prev.includes(feature)
            ? prev.filter(f => f !== feature)
            : [...prev, feature]
        );
    };

    return (
    <div>
        <Navbar />

        <div className="browse-courses-container">
            {/* Breadcrumb */}
            <div className="browse-courses-breadcrumb">
                <span className="browse-courses-breadcrumb-item">Categories</span>
                <span>/</span>
                <span className="browse-courses-breadcrumb-item active">Search results: Ai</span>
            </div>
            <h1 className="browse-courses-title">Search Results: Ai</h1>

            {/* Content Wrapper */}
            <div className="browse-courses-wrapper">
                {/* Sidebar Filter */}
                <aside className="browse-courses-sidebar">
                    {/* Filter Tiltle */}
                    <div className="browse-filter-section"><h3>Filters</h3></div>

                    {/* Categories Filter */}
                    <div className="browse-filter-section">
                        <button className="browse-filter-header"><h3>Categories</h3><i className="fas fa-chevron-up"></i></button>
                        <div className="browse-filter-content">
                            {categories.map((category) => (
                            <label key={category} className="browse-filter-checkbox">
                                <input type="checkbox" checked={selectedCategories.includes(category)} onChange={() => handleCategoryChange(category)}/>
                                <span className="browse-checkbox-custom"></span>
                                <span className="browse-checkbox-label">{category}</span>
                            </label>))}
                        </div>
                    </div>

                    {/* Features Filter */}
                    <div className="browse-filter-section">
                        <button className="browse-filter-header"><h3>Features</h3><i className="fas fa-chevron-up"></i></button>
                        <div className="browse-filter-content">
                            {features.map((feature) => (
                            <label key={feature} className="browse-filter-checkbox">
                                <input type="checkbox" checked={selectedFeatures.includes(feature)} onChange={() => handleFeatureChange(feature)}/>
                                <span className="browse-checkbox-custom"></span>
                                <span className="browse-checkbox-label">{feature}</span>
                            </label>))}
                        </div>
                    </div>

                    {/* Price Filter */}
                    <div className="browse-filter-section">
                        <button className="browse-filter-header"><h3>Price</h3><i className="fas fa-chevron-up"></i></button>
                        <div className="browse-filter-content">
                            <label className="browse-filter-radio">
                                <input type="radio" name="price" value="all" checked={priceRange === 'all'} onChange={(e) => setPriceRange(e.target.value)}/>
                                <span className="browse-radio-custom"></span>
                                <span className="browse-radio-label">All Courses</span>
                            </label>

                            <label className="browse-filter-radio">
                                <input type="radio" name="price" value="free" checked={priceRange === 'free'} onChange={(e) => setPriceRange(e.target.value)}/>
                                <span className="browse-radio-custom"></span>
                                <span className="browse-radio-label">Free</span>
                            </label>

                            <label className="browse-filter-radio">
                            <input
                                type="radio"
                                name="price"
                                value="paid"
                                checked={priceRange === 'paid'}
                                onChange={(e) => setPriceRange(e.target.value)}
                            />
                            <span className="browse-radio-custom"></span>
                            <span className="browse-radio-label">Paid</span>
                            </label>

                            <label className="browse-filter-radio">
                                <input
                                    type="radio"
                                    name="price"
                                    value="under2000"
                                    checked={priceRange === 'under2000'}
                                    onChange={(e) => setPriceRange(e.target.value)}
                                />
                                <span className="browse-radio-custom"></span>
                                <span className="browse-radio-label">Under 2,000 THB</span>
                            </label>

                            <label className="browse-filter-radio">
                                <input
                                    type="radio"
                                    name="price"
                                    value="over2000"
                                    checked={priceRange === 'over2000'}
                                    onChange={(e) => setPriceRange(e.target.value)}
                                />
                                <span className="browse-radio-custom"></span>
                                <span className="browse-radio-label">Over 2,000 THB</span>
                            </label>

                        </div>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="browse-courses-main">
                    {/* Results Header */}
                    <div className="browse-courses-results-header">
                        <div className="browse-courses-results-info">
                            <span className="browse-courses-results-count">Results: {sortedCourses.length} courses</span>
                        </div>
                        <div className="browse-courses-sort">
                            <select className="browse-courses-sort-select" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                                <option value="relevance">Most Relevant</option>
                                <option value="popular">Most Popular</option>
                                <option value="rating">Highest Rated</option>
                                <option value="price-low">Price: Low to High</option>
                                <option value="price-high">Price: High to Low</option>
                            </select>
                        </div>
                    </div>

                    {/* Courses Grid */}
                    <div className="browse-courses-grid">
                        {sortedCourses.map((course) => (
                            <div key={course.id} className="home-course-card">
                            <div className="home-course-image">
                                <img src={course.image} alt={course.title} />
                            </div>
                            <div className="home-course-content">
                                <div className="home-course-header">
                                <div className="home-course-instructor-avatar">
                                    {course.instructor.split(' ').map(n => n[0]).join('')}
                                </div>
                                <div className="home-course-instructor-info">
                                    <div className="home-course-instructor-name">{course.instructor}</div>
                                    <div className="home-course-instructor-title">{course.instructorTitle}</div>
                                </div>
                                </div>
                                <h3 className="home-course-title">{course.title}</h3>
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
                                <p className="home-course-description">
                                Master the skills you need to succeed in {course.category}. Learn from experienced instructors with real-world expertise.
                                </p>
                                <div className="home-course-footer">
                                <span className="home-course-price-current">{course.price.toLocaleString()} THB</span>
                                <span className="home-course-price-original">{course.originalPrice.toLocaleString()} THB</span>
                                </div>
                            </div>

                            {/* Course Popup */}
                            <div className="home-course-popup">
                                <h3 className="home-course-popup-title">{course.title}</h3>
                                <p className="home-course-popup-description">
                                Master the skills you need to succeed in {course.category}. Learn from experienced instructors with real-world expertise and build your portfolio with hands-on projects.
                                </p>
                                <ul className="home-course-popup-highlights">
                                <li><i className="fas fa-check-circle"></i> Comprehensive curriculum</li>
                                <li><i className="fas fa-check-circle"></i> {course.level} level</li>
                                <li><i className="fas fa-check-circle"></i> {course.rating} ⭐ ({course.students} students)</li>
                                <li><i className="fas fa-check-circle"></i> Certificate upon completion</li>
                                </ul>
                                <div className="home-course-popup-buttons">
                                <a href="#" className="home-course-popup-btn">Enroll Now</a>
                                <a onClick={ViewDetail} className="home-course-popup-btn-outline">View Details</a>
                                </div>
                            </div>
                            </div>
                        ))}
                    </div>

                    {/* No Results Message */}
                    {sortedCourses.length === 0 && (
                    <div className="browse-courses-no-results">
                        <i className="fas fa-search" style={{ fontSize: '48px', color: '#cbd5e1', marginBottom: '16px' }}></i>
                        <h3>No courses found</h3>
                        <p>Try adjusting your filters or search terms</p>
                    </div>
                    )}
                </main>
            </div>
        </div>

        <Footer />

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

export default BrowseCourses;