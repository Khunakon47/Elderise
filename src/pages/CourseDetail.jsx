import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import "./CourseDetail.css"

const CourseDetail = () => {
    const [coursesCurrentPage, setCoursesCurrentPage] = useState(0);

    // Get courses cards per page
    const getCoursesCardsPerPage = () => {
        const width = window.innerWidth;
        if (width > 1200) return 4;
        if (width > 900) return 3;
        if (width > 600) return 2;
        return 1;
    };

    // Courses navigation
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

    // Handle window resize
    useEffect(() => {
        let resizeTimer;
        const handleResize = () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            setCoursesCurrentPage(0);
        }, 250);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Curriculum accordion
    const handleCurriculumClick = (e) => {
        const header = e.currentTarget;
        const curriculum = header.parentElement;
        const isOpen = curriculum.classList.contains('open');

        document.querySelectorAll('.course-detail-curriculum').forEach(item => {
        item.classList.remove('open');
        });

        if (!isOpen) {
        curriculum.classList.add('open');
        }
    };

    // FAQ accordion
    const handleFaqClick = (e) => {
        const question = e.currentTarget;
        const faqItem = question.parentElement;
        const isOpen = faqItem.classList.contains('open');

        document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('open');
        });

        if (!isOpen) {
        faqItem.classList.add('open');
        }
    };

    // Breadcrumb navigation
    const handleBreadcrumbClick = (text, isActive) => {
        if (!isActive) {
        alert('Navigate to: ' + text);
        }
    };

    // Video play button
    const handleVideoPlay = () => {
        alert('Video player would open here!');
    };

    // Enroll button
    const handleEnroll = () => {
        alert('Enrollment process would start here!');
    };

    // Wishlist button
    const handleWishlist = (e) => {
        const button = e.currentTarget;
        const icon = button.querySelector('i');
        const isAdded = icon.classList.contains('fa-heart') && !icon.classList.contains('far');

        if (isAdded) {
        icon.classList.remove('fas', 'fa-heart');
        icon.classList.add('far', 'fa-heart');
        button.style.background = 'white';
        button.style.borderColor = '#e5e7eb';
        button.style.color = '#6b7280';
        } else {
        icon.classList.remove('far');
        icon.classList.add('fas', 'fa-heart');
        button.style.background = '#10b98115';
        button.style.borderColor = '#10b981';
        button.style.color = '#10b981';
        }
    };

    // Follow button
    const handleFollow = (e) => {
        const button = e.currentTarget;
        const icon = button.querySelector('i');
        const isFollowing = icon.classList.contains('fa-user-check');

        if (isFollowing) {
        icon.classList.remove('fa-user-check');
        icon.classList.add('fa-user-plus');
        button.innerHTML = '<i class="fas fa-user-plus"></i> Follow';
        button.style.background = 'white';
        button.style.color = '#2563eb';
        } else {
        icon.classList.remove('fa-user-plus');
        icon.classList.add('fa-user-check');
        button.innerHTML = '<i class="fas fa-user-check"></i> Following';
        button.style.background = '#2563eb08';
        button.style.borderColor = '#2563eb';
        }
    };

    // Review helpful buttons
    const handleReviewHelpful = (e) => {
        const button = e.currentTarget;
        const isThumbsUp = button.querySelector('.fa-thumbs-up');
        const currentCount = parseInt(button.textContent.trim());
        const newCount = currentCount + 1;

        const icon = button.querySelector('i').outerHTML;
        button.innerHTML = icon + ' ' + newCount;
    };

  return (
    <div>
        {/* Navbar */}
        <Navbar />
        

        {/* Main Content */}
        <div className="course-detail-main-container">
            {/* Breadcrumb */}
            <div className="course-detail-breadcrumb">
                <span className="course-detail-breadcrumb-item" onClick={() => handleBreadcrumbClick('Categories', false)}>
                    Categories
                </span>
                <span>/</span>
                <span className="course-detail-breadcrumb-item" onClick={() => handleBreadcrumbClick('Handicrafts', false)}>
                    Handicrafts
                </span>
                <span>/</span>
                <span className="course-detail-breadcrumb-item active">Traditional Pottery Mastery</span>
            </div>

            {/* Header Section */}
            <div className="course-detail-header-section">
                {/* video-container */}
                <div className="course-detail-video-container">
                    <div className="course-detail-video-placeholder">
                    <div className="course-detail-play-button" onClick={handleVideoPlay}>
                        <i className="fas fa-play"></i>
                    </div>
                    <div className="course-detail-video-badge">
                        <i className="fas fa-check-circle"></i> Verified
                    </div>
                    </div>
                </div>

                {/* Sidebar Price Card */}
                <div className="course-detail-header-sidebar">
                    <div className="course-detail-price-card">
                    <div className="course-detail-price-section">
                        <div className="course-detail-price">$49.99</div>
                        <div className="course-detail-price-description">One-time payment • Lifetime access</div>
                    </div>

                    <button className="course-detail-enroll-btn" onClick={handleEnroll}>
                        <i className="fas fa-shopping-cart"></i> Enroll Now
                    </button>
                    <button className="course-detail-wishlist-btn" onClick={handleWishlist}>
                        <i className="far fa-heart"></i> Add to Wishlist
                    </button>

                    <div className="course-detail-features">
                        <p className="course-detail-features-title">This course includes:</p>
                        <div className="course-detail-feature">
                        <div className="course-detail-feature-icon"><i className="fas fa-play"></i></div>
                        <span>12 Video Lessons</span>
                        </div>
                        <div className="course-detail-feature">
                        <div className="course-detail-feature-icon"><i className="fas fa-video"></i></div>
                        <span>8 Hours 45 Minutes</span>
                        </div>
                        <div className="course-detail-feature">
                        <div className="course-detail-feature-icon"><i className="fas fa-certificate"></i></div>
                        <span>Certificate of Completion</span>
                        </div>
                        <div className="course-detail-feature">
                        <div className="course-detail-feature-icon"><i className="fas fa-infinity"></i></div>
                        <span>Lifetime Access</span>
                        </div>
                    </div>
                    </div>
                </div>
            </div>

            {/* sub container Section */}
            <div className="course-detail-sub-container">
                {/* Left-content */}
                <div className="course-detail-left-content">
                    {/* Course Title & Meta */}
                    <div className="course-detail-content-card">
                        <h1>Traditional Pottery Mastery</h1>
                        <div className="course-detail-meta-container">
                            <div className="course-detail-meta">
                                <span className="course-detail-stars">
                                    <i className="fas fa-star"></i> 
                                    <i className="fas fa-star"></i> 
                                    <i className="fas fa-star"></i> 
                                    <i className="fas fa-star"></i> 
                                    <i className="fas fa-star-half-alt"></i>
                                </span>
                                <span className="course-detail-rate-review">4.8</span>
                                <span className="course-detail-num-review">(324 reviews)</span>
                            </div>
                            <div className="course-detail-num-student">
                                <i className="fas fa-users"></i> 2,543 students enrolled
                            </div>
                        </div>

                        <h2 className="course-detail-section-title">
                            <i className="fas fa-book-open"></i>
                            Course Description
                        </h2>
                        <div className="course-detail-course-description">
                            <p>Welcome to the Complete Web Development Bootcamp, the only course you need to learn to code and become a full-stack web developer. With over 24 hours of HD video tutorials and building 16 real-world projects, this comprehensive course will take you from beginner to professional.</p>

                            <h3>Why This Course?</h3>
                            <p>At 15+ years of professional development experience, I've taken all my real-world knowledge and condensed it into this comprehensive bootcamp. The curriculum was developed over months of research and feedback from thousands of students and professional developers.</p>

                            <h3>What Makes This Course Different?</h3>
                            <ul>
                                <li><strong>Project-Based Learning:</strong> Build 16 real-world applications including e-commerce sites, social networks, and more</li>
                                <li><strong>Modern Technologies:</strong> Learn the latest tools and frameworks used by top companies</li>
                                <li><strong>Complete Coverage:</strong> From frontend to backend, databases to deployment</li>
                                <li><strong>Career Support:</strong> Resume reviews, interview preparation, and job search strategies</li>
                            </ul>

                            <h3>Course Structure</h3>
                            <p>The course is divided into 12 comprehensive sections, each building on the previous one. You'll start with the fundamentals and gradually work your way up to advanced concepts. Each section includes hands-on projects, coding challenges, and quizzes to reinforce your learning.</p>

                            <h3>Who Is This Course For?</h3>
                            <ul>
                                <li>Complete beginners who have never programmed before</li>
                                <li>Self-taught developers looking to fill knowledge gaps</li>
                                <li>Career changers wanting to break into tech</li>
                                <li>Students wanting to supplement their education</li>
                                <li>Anyone interested in building websites and web applications</li>
                            </ul>

                            <h3>Prerequisites</h3>
                            <p>No programming experience required! All you need is a computer and internet connection. I'll teach you everything from scratch.</p>
                        </div>
                    </div>

                    {/* What You'll Learn */}
                    <div className="course-detail-content-card">
                        <h2 className="course-detail-section-title">
                            <i className="fas fa-lightbulb"></i>
                            What You'll Learn
                        </h2>
                        <div className="course-detail-what-you-learn">
                            <div className="course-detail-learn-item">
                                <i className="fas fa-check-circle"></i>
                                <span>Build 16 web development projects for your portfolio</span>
                            </div>
                            <div className="course-detail-learn-item">
                                <i className="fas fa-check-circle"></i>
                                <span>Master HTML5, CSS3, and modern JavaScript ES6+</span>
                            </div>
                            <div className="course-detail-learn-item">
                                <i className="fas fa-check-circle"></i>
                                <span>Learn React.js and build dynamic single-page applications</span>
                            </div>
                            <div className="course-detail-learn-item">
                                <i className="fas fa-check-circle"></i>
                                <span>Backend development with Node.js and Express</span>
                            </div>
                            <div className="course-detail-learn-item">
                                <i className="fas fa-check-circle"></i>
                                <span>Database design with MongoDB and SQL</span>
                            </div>
                            <div className="course-detail-learn-item">
                                <i className="fas fa-check-circle"></i>
                                <span>RESTful API development and authentication</span>
                            </div>
                            <div className="course-detail-learn-item">
                                <i className="fas fa-check-circle"></i>
                                <span>Deploy applications to production servers</span>
                            </div>
                            <div className="course-detail-learn-item">
                                <i className="fas fa-check-circle"></i>
                                <span>Version control with Git and GitHub</span>
                            </div>
                        </div>
                    </div>

                    {/* Course Content */}
                    <div className="course-detail-content-card">
                        <h2 className="course-detail-section-title"><i className="fas fa-list-ul"></i>Course Curriculum</h2>
                        <p style={{ color: '#64748b', marginBottom: '2rem', fontSize: '0.9rem' }}>156 lectures • 24h 30m total length</p>
                        <div className="course-detail-curriculums">
                            <div className="course-detail-curriculum">
                                <div className="course-detail-curriculum-header" onClick={handleCurriculumClick}>
                                    <h4><i className="fas fa-chevron-down"></i>Section 1: Introduction to Web Development</h4>
                                    <span className="course-detail-section-meta">7 lessons • 45min</span>
                                </div>
                                <div className="course-detail-curriculum-lessons">
                                    <div className="course-detail-lesson-item">
                                        <div className="course-detail-lesson-info">
                                            <div className="course-detail-lesson-icon"><i className="fas fa-play"></i></div>
                                            <span className="course-detail-lesson-name">Welcome to the Course</span>
                                        </div>
                                        <span className="course-detail-lesson-duration">3:24</span>
                                    </div>

                                    <div className="course-detail-lesson-item">
                                        <div className="course-detail-lesson-info">
                                            <div className="course-detail-lesson-icon"><i className="fas fa-play"></i></div>
                                            <span className="course-detail-lesson-name">How the Web Works</span>
                                        </div>
                                        <span className="course-detail-lesson-duration">8:15</span>
                                    </div>

                                    <div className="course-detail-lesson-item">
                                        <div className="course-detail-lesson-info">
                                            <div className="course-detail-lesson-icon"><i className="fas fa-play"></i></div>
                                            <span className="course-detail-lesson-name">Setting Up Your Development Environment</span>
                                        </div>
                                        <span className="course-detail-lesson-duration">12:45</span>
                                    </div>

                                    <div className="course-detail-lesson-item">
                                        <div className="course-detail-lesson-info">
                                            <div className="course-detail-lesson-icon"><i className="fas fa-file-alt"></i></div>
                                            <span className="course-detail-lesson-name">Course Resources and Downloads</span>
                                        </div>
                                        <span className="course-detail-lesson-duration">2:10</span>
                                    </div>
                                </div>
                            </div>

                            <div className="course-detail-curriculum">
                                <div className="course-detail-curriculum-header" onClick={handleCurriculumClick}>
                                    <h4><i className="fas fa-chevron-down"></i>Section 2: HTML Fundamentals</h4>
                                    <span className="course-detail-section-meta">12 lessons • 1h 20min</span>
                                </div>
                                <div className="course-detail-curriculum-lessons">
                                    <div className="course-detail-lesson-item">
                                        <div className="course-detail-lesson-info">
                                            <div className="course-detail-lesson-icon"><i className="fas fa-play"></i></div>
                                            <span className="course-detail-lesson-name">Introduction to HTML</span>
                                        </div>
                                        <span className="course-detail-lesson-duration">6:30</span>
                                    </div>
                                </div>
                            </div>

                            <div className="course-detail-curriculum">
                                <div className="course-detail-curriculum-header" onClick={handleCurriculumClick}>
                                    <h4><i className="fas fa-chevron-down"></i>Section 3: CSS Styling and Layouts</h4>
                                    <span className="course-detail-section-meta">15 lessons • 2h 15min</span>
                                </div>
                            </div>

                            <div className="course-detail-curriculum">
                                <div className="course-detail-curriculum-header" onClick={handleCurriculumClick}>
                                    <h4><i className="fas fa-chevron-down"></i>Section 4: JavaScript Basics</h4>
                                    <span className="course-detail-section-meta">18 lessons • 2h 45min</span>
                                </div>
                            </div>

                            <div className="course-detail-curriculum">
                                <div className="course-detail-curriculum-header" onClick={handleCurriculumClick}>
                                    <h4><i className="fas fa-chevron-down"></i>Section 5: Advanced JavaScript & ES6+</h4>
                                    <span className="course-detail-section-meta">20 lessons • 3h 10min</span>
                                </div>
                            </div>

                            <div className="course-detail-curriculum">
                                <div className="course-detail-curriculum-header" onClick={handleCurriculumClick}>
                                    <h4><i className="fas fa-chevron-down"></i>Section 6: React.js - Building Modern UIs</h4>
                                    <span className="course-detail-section-meta">25 lessons • 4h 30min</span>
                                </div>
                            </div>

                            <div className="course-detail-curriculum">
                                <div className="course-detail-curriculum-header" onClick={handleCurriculumClick}>
                                    <h4><i className="fas fa-chevron-down"></i>Section 7: Node.js & Express Backend
                                    </h4>
                                    <span className="course-detail-section-meta">22 lessons • 3h 45min</span>
                                </div>
                            </div>

                            <div className="course-detail-curriculum">
                                <div className="course-detail-curriculum-header" onClick={handleCurriculumClick}>
                                    <h4><i className="fas fa-chevron-down"></i>Section 8: Database Design & MongoDB</h4>
                                    <span className="course-detail-section-meta">16 lessons • 2h 20min</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right-content */}
                <div className="course-detail-right-content">
                    {/* Instructor Card */}
                    <div className="course-detail-instructor">
                        <div className="course-detail-instructor-header">
                            <div className="course-detail-instructor-avatar">👩‍🦳</div>
                            <div className="course-detail-instructor-info">
                            <div className="course-detail-instructor-name">John Doe</div>
                            <div className="course-detail-instructor-title">Senior Web Developer & Tech Educator</div>
                            <div className="course-detail-instructor-rating">
                                <span className="course-detail-stars"><i className="fas fa-star"></i> 4.9</span>
                                <span>(892 reviews)</span>
                            </div>
                            </div>
                        </div>

                        <div className="course-detail-instructor-bio">
                            <p>Hi! I'm John Doe, a passionate web developer with over 15 years of professional experience. I've worked with companies like Google, Microsoft, and various startups, building everything from simple websites to complex enterprise applications.</p>
                            <p style={{ marginTop: '1rem' }}>After years of working in the industry, I discovered my true calling: teaching. I love breaking down complex concepts into easy-to-understand lessons and helping aspiring developers achieve their goals.</p>
                            <p style={{ marginTop: '1rem' }}>My courses have helped over 45,000 students worldwide land their dream jobs as web developers. I focus on practical, project-based learning because I believe the best way to learn is by doing.</p>
                            <p style={{ marginTop: '1rem' }}>When I'm not coding or teaching, you can find me hiking, reading sci-fi novels, or contributing to open-source projects.</p>
                        </div>

                        <button className="course-detail-follow-btn" onClick={handleFollow}>
                            <i className="fas fa-user-plus"></i> Follow
                        </button>
                    </div>

                    {/* Course Info */}
                    <div className="course-detail-info">
                        <div className="course-detail-info-title">
                            <i className="fas fa-info-circle"></i> Course Information
                        </div>
                        <div className="course-detail-info-item">
                            <span className="course-detail-info-label">Level</span>
                            <span className="course-detail-info-value">Beginner to Advanced</span>
                        </div>
                        <div className="course-detail-info-item">
                            <span className="course-detail-info-label">Duration</span>
                            <span className="course-detail-info-value">8 weeks (self-paced)</span>
                        </div>
                        <div className="course-detail-info-item">
                            <span className="course-detail-info-label">Language</span>
                            <span className="course-detail-info-value">English</span>
                        </div>
                        <div className="course-detail-info-item">
                            <span className="course-detail-info-label">Status</span>
                            <span className="course-detail-badge">Admin Verified ✓</span>
                        </div>
                        <div className="course-detail-info-item">
                            <span className="course-detail-info-label">Last Updated</span>
                            <span className="course-detail-info-value">2 weeks ago</span>
                        </div>
                    </div>

                    {/* Requirements */}
                    <div className="course-detail-requirements">
                        <h2 className="course-detail-requirements-title">Requirements</h2>
                        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <li style={{ display: 'flex', gap: '12px', color: '#4b5563', fontSize: '13px' }}>
                            <i className="fas fa-circle" style={{ color: '#2563eb', fontSize: '8px', marginTop: '6px' }}></i>
                            Basic pottery wheel or hand-building tools
                            </li>
                            <li style={{ display: 'flex', gap: '12px', color: '#4b5563', fontSize: '13px' }}>
                            <i className="fas fa-circle" style={{ color: '#2563eb', fontSize: '8px', marginTop: '6px' }}></i>
                            Access to a kiln (can be at a local pottery studio)
                            </li>
                            <li style={{ display: 'flex', gap: '12px', color: '#4b5563', fontSize: '13px' }}>
                            <i className="fas fa-circle" style={{ color: '#2563eb', fontSize: '8px', marginTop: '6px' }}></i>
                            Clay materials (provided guidelines included)
                            </li>
                            <li style={{ display: 'flex', gap: '12px', color: '#4b5563', fontSize: '13px' }}>
                            <i className="fas fa-circle" style={{ color: '#2563eb', fontSize: '8px', marginTop: '6px' }}></i>
                            No prior experience needed - perfect for beginners
                            </li>
                        </ul>
                    </div>

                    {/* Quality Badge */}
                    <div style={{ background: 'linear-gradient(135deg, #10b981, #34d399)', borderRadius: '16px', padding: '20px', color: 'white', textAlign: 'center', boxShadow: '0 4px 16px rgba(16, 185, 129, 0.2)' }}>
                        <div style={{ fontSize: '32px', marginBottom: '8px' }}>✓</div>
                        <div style={{ fontWeight: '700', marginBottom: '8px' }}>Quality Assured</div>
                        <div style={{ fontSize: '13px', opacity: '0.95' }}>This course has been reviewed and approved by our admin team to ensure the highest quality standards.</div>
                    </div>
                </div>
            </div>

            {/* Reviews Section */}
            <div className="course-detail-content-card">
                <h2 className="course-detail-reviews-title"><i className="fas fa-star"></i>Student Reviews</h2>

                <div className="reviews-summary">
                    <div className="rating-overview">
                        <div className="big-rating">4.8</div>
                        <div className="rating-stars-large">
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star-half-alt"></i>
                        </div>
                        <div className="total-reviews">2,450 reviews</div>
                    </div>

                    <div className="rating-breakdown">
                        <div className="rating-bar">
                            <span className="star-label">5 stars</span>
                            <div className="bar-container">
                            <div className="bar-fill" style={{ width: '78%' }}></div>
                            </div>
                            <span className="bar-percentage">78%</span>
                        </div>
                        <div className="rating-bar">
                            <span className="star-label">4 stars</span>
                            <div className="bar-container">
                            <div className="bar-fill" style={{ width: '15%' }}></div>
                            </div>
                            <span className="bar-percentage">15%</span>
                        </div>
                        <div className="rating-bar">
                            <span className="star-label">3 stars</span>
                            <div className="bar-container">
                            <div className="bar-fill" style={{ width: '5%' }}></div>
                            </div>
                            <span className="bar-percentage">5%</span>
                        </div>
                        <div className="rating-bar">
                            <span className="star-label">2 stars</span>
                            <div className="bar-container">
                            <div className="bar-fill" style={{ width: '1%' }}></div>
                            </div>
                            <span className="bar-percentage">1%</span>
                        </div>
                        <div className="rating-bar">
                            <span className="star-label">1 star</span>
                            <div className="bar-container">
                            <div className="bar-fill" style={{ width: '1%' }}></div>
                            </div>
                            <span className="bar-percentage">1%</span>
                        </div>
                    </div>
                </div>

                {/* Individual Reviews */}
                <div className="review-item">
                    <div className="review-header">
                    <div className="reviewer-avatar">SM</div>
                    <div className="reviewer-info">
                        <h5>Sarah Martinez</h5>
                        <div className="review-meta">
                        <span className="review-stars">
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                        </span>
                        <span>2 weeks ago</span>
                        </div>
                    </div>
                    </div>
                    <p className="review-text">Absolutely fantastic course! John's teaching style is clear and engaging. I went from knowing nothing about web development to building my own portfolio website in just 3 months. The projects are challenging but rewarding, and the support from John and the community is amazing. Highly recommended for anyone serious about learning web development!</p>
                    <div className="review-helpful">
                    <span>Was this helpful?</span>
                    <button onClick={handleReviewHelpful}><i className="fas fa-thumbs-up"></i> 145</button>
                    <button onClick={handleReviewHelpful}><i className="fas fa-thumbs-down"></i> 3</button>
                    </div>
                </div>

                <div className="review-item">
                    <div className="review-header">
                    <div className="reviewer-avatar">MK</div>
                    <div className="reviewer-info">
                        <h5>Michael Kim</h5>
                        <div className="review-meta">
                        <span className="review-stars">
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                        </span>
                        <span>1 month ago</span>
                        </div>
                    </div>
                    </div>
                    <p className="review-text">Best investment I've made in my career! After completing this course, I landed a junior developer position at a tech startup. The curriculum is comprehensive, up-to-date, and the projects really prepare you for real-world scenarios. John is an excellent instructor who genuinely cares about his students' success.</p>
                    <div className="review-helpful">
                    <span>Was this helpful?</span>
                    <button onClick={handleReviewHelpful}><i className="fas fa-thumbs-up"></i> 198</button>
                    <button onClick={handleReviewHelpful}><i className="fas fa-thumbs-down"></i> 2</button>
                    </div>
                </div>

                <div className="review-item">
                    <div className="review-header">
                    <div className="reviewer-avatar">EP</div>
                    <div className="reviewer-info">
                        <h5>Emily Parker</h5>
                        <div className="review-meta">
                        <span className="review-stars">
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="far fa-star"></i>
                        </span>
                        <span>2 months ago</span>
                        </div>
                    </div>
                    </div>
                    <p className="review-text">Great course with tons of valuable content. The only reason I'm giving 4 stars instead of 5 is that some sections could use more in-depth explanations. However, the projects are excellent and John is very responsive to questions. Overall, highly recommended for beginners!</p>
                    <div className="review-helpful">
                    <span>Was this helpful?</span>
                    <button onClick={handleReviewHelpful}><i className="fas fa-thumbs-up"></i> 87</button>
                    <button onClick={handleReviewHelpful}><i className="fas fa-thumbs-down"></i> 5</button>
                    </div>
                </div>
            </div>

            {/* Frequently Asked Questions Section */}
            <div className="course-detail-content-card">
            <h2 className="course-detail-reviews-title" style={{ textAlign: 'center' }}>
                <i className="fas fa-question-circle"></i>
                Frequently Asked Questions
            </h2>

            <div className="faq-list">
                <div className="faq-item">
                <div className="faq-question" onClick={handleFaqClick}>
                    <h4>How do I make a payment?</h4>
                    <i className="fas fa-chevron-down"></i>
                </div>
                <div className="faq-answer">
                    <p>We accept multiple payment methods including credit/debit cards (Visa, Mastercard), PayPal, and bank transfers. Simply click the "Enroll Now" button, select your preferred payment method, and follow the secure checkout process. All transactions are encrypted and secure.</p>
                </div>
                </div>

                <div className="faq-item">
                <div className="faq-question" onClick={handleFaqClick}>
                    <h4>Is there a money-back guarantee?</h4>
                    <i className="fas fa-chevron-down"></i>
                </div>
                <div className="faq-answer">
                    <p>Yes! We offer a 30-day money-back guarantee. If you're not satisfied with the course for any reason within the first 30 days, simply contact our support team for a full refund. No questions asked.</p>
                </div>
                </div>

                <div className="faq-item">
                <div className="faq-question" onClick={handleFaqClick}>
                    <h4>How long do I have access to the course?</h4>
                    <i className="fas fa-chevron-down"></i>
                </div>
                <div className="faq-answer">
                    <p>Once you enroll, you have lifetime access to the course content. This includes all future updates and additions to the course at no extra cost. You can learn at your own pace and revisit the materials anytime.</p>
                </div>
                </div>

                <div className="faq-item">
                <div className="faq-question" onClick={handleFaqClick}>
                    <h4>Can I download the course videos?</h4>
                    <i className="fas fa-chevron-down"></i>
                </div>
                <div className="faq-answer">
                    <p>Yes, all course videos are available for download so you can learn offline. Additionally, you can access the course on any device including desktop, laptop, tablet, and mobile phone.</p>
                </div>
                </div>

                <div className="faq-item">
                <div className="faq-question" onClick={handleFaqClick}>
                    <h4>Do I get a certificate upon completion?</h4>
                    <i className="fas fa-chevron-down"></i>
                </div>
                <div className="faq-answer">
                    <p>Absolutely! Upon completing all course requirements, you'll receive a certificate of completion that you can add to your resume, LinkedIn profile, or portfolio. The certificate includes the course title, completion date, and instructor signature.</p>
                </div>
                </div>

                <div className="faq-item">
                <div className="faq-question" onClick={handleFaqClick}>
                    <h4>Can I get help if I'm stuck?</h4>
                    <i className="fas fa-chevron-down"></i>
                </div>
                <div className="faq-answer">
                    <p>Yes! You can ask questions directly in the course Q&A section where the instructor and teaching assistants respond regularly. There's also an active student community where you can connect with fellow learners and get peer support.</p>
                </div>
                </div>

                <div className="faq-item">
                <div className="faq-question" onClick={handleFaqClick}>
                    <h4>Is this course suitable for complete beginners?</h4>
                    <i className="fas fa-chevron-down"></i>
                </div>
                <div className="faq-answer">
                    <p>Yes! This course is designed for beginners with no prior programming experience. We start from the very basics and gradually build up to advanced topics. The pace is carefully structured to ensure you understand each concept before moving forward.</p>
                </div>
                </div>
            </div>
            </div>

            {/* Related Courses Section */}
            <div className="course-detail-related-section">
                <h2 className="course-detail-section-title">
                    <i className="fas fa-graduation-cap"></i>
                    Related Courses You Might Like
                </h2>

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
                        <a href="#" className="home-course-popup-btn-outline">View Details</a>
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
                        <a href="#" className="home-course-popup-btn-outline">View Details</a>
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
                        <a href="#" className="home-course-popup-btn-outline">View Details</a>
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
                        <a href="#" className="home-course-popup-btn-outline">View Details</a>
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
                        <a href="#" className="home-course-popup-btn-outline">View Details</a>
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
                        <a href="#" className="home-course-popup-btn-outline">View Details</a>
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
                        <a href="#" className="home-course-popup-btn-outline">View Details</a>
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
                        <a href="#" className="home-course-popup-btn-outline">View Details</a>
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
            </div>
        </div>

        {/* Footer */}
        <Footer />
        
    </div>
  );
};

export default CourseDetail;