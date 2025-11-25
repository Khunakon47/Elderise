import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import "./Navbar.css"

const Navbar = () => {
    const [activeSubmenu, setActiveSubmenu] = useState('lang');
    const [showDropdownRight, setShowDropdownRight] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const NavBrowse = () => {
        navigate("/BrowseCourses");
    };

    const NavHome = () => {
        navigate('/');
    };

    const NavSignin = () => {
        navigate("/Signin");
    };

    const NavSignup = () => {
        navigate("/choose-role");
    };
    
    const handleSearchKeyDown = (e) => {
        if (e.key === 'Enter') {
            const q = searchTerm.trim();
            if (q.length > 0) {
                navigate(`/BrowseCourses?search=${encodeURIComponent(q)}`);
            } else {
                navigate('/BrowseCourses');
            }
        }
    };
    
    const handleMenuHover = (target) => {
        setActiveSubmenu(target);
        setShowDropdownRight(true);
    };

    const handleNoSubHover = () => {
        setShowDropdownRight(false);
    };

    return (
        <div className="navbar-section">
                <div className="navbar-container">
                <div className="navbar-logo" onClick={NavHome} style={{ cursor: 'pointer' }}>Elderise</div>

                {/* Categories btn Dropdown */}
                <div className="navbar-dropdown">
                    <button className="navbar-dropdown-btn">
                    Categories
                    <span className="navbar-arrow-down">
                        <svg width="12" height="12" viewBox="0 0 20 20">
                        <path d="M5 7l5 5 5-5" stroke="#ffffffff" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </span>
                    </button>

                    <div className="navbar-dropdown-panel">
                    {/* LEFT MENU */}
                    <div className="navbar-dropdown-left">
                        <div 
                        onClick={NavBrowse}
                        className={`navbar-menu-item has-sub ${activeSubmenu === 'lang' ? 'active' : ''}`}
                        data-target="lang"
                        onMouseEnter={() => handleMenuHover('lang')}
                        >
                        Languages 
                        <span className="navbar-right-arrow">
                            <svg width="10" height="10" viewBox="0 0 20 20">
                            <path d="M7 5l5 5-5 5" stroke="#9ca3af" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </span>
                        </div>

                        <div 
                        onClick={NavBrowse}
                        className={`navbar-menu-item has-sub ${activeSubmenu === 'business' ? 'active' : ''}`}
                        data-target="business"
                        onMouseEnter={() => handleMenuHover('business')}
                        >
                        Business 
                        <span className="navbar-right-arrow">
                            <svg width="10" height="10" viewBox="0 0 20 20">
                            <path d="M7 5l5 5-5 5" stroke="#9ca3af" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </span>
                        </div>

                        <div 
                        onClick={NavBrowse}
                        className={`navbar-menu-item has-sub ${activeSubmenu === 'finance' ? 'active' : ''}`}
                        data-target="finance"
                        onMouseEnter={() => handleMenuHover('finance')}
                        >
                        Finance & Investment 
                        <span className="navbar-right-arrow">
                            <svg width="10" height="10" viewBox="0 0 20 20">
                            <path d="M7 5l5 5-5 5" stroke="#9ca3af" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </span>
                        </div>

                        <div 
                        onClick={NavBrowse}
                        className={`navbar-menu-item has-sub ${activeSubmenu === 'ai' ? 'active' : ''}`}
                        data-target="ai"
                        onMouseEnter={() => handleMenuHover('ai')}
                        >
                        AI & Data 
                        <span className="navbar-right-arrow">
                            <svg width="10" height="10" viewBox="0 0 20 20">
                            <path d="M7 5l5 5-5 5" stroke="#9ca3af" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </span>
                        </div>

                        <div 
                        onClick={NavBrowse}
                        className={`navbar-menu-item has-sub ${activeSubmenu === 'tech' ? 'active' : ''}`}
                        data-target="tech"
                        onMouseEnter={() => handleMenuHover('tech')}
                        >
                        Technology 
                        <span className="navbar-right-arrow">
                            <svg width="10" height="10" viewBox="0 0 20 20">
                            <path d="M7 5l5 5-5 5" stroke="#9ca3af" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </span>
                        </div>

                        <div 
                        onClick={NavBrowse}
                        className={`navbar-menu-item has-sub ${activeSubmenu === 'lifestyle' ? 'active' : ''}`}
                        data-target="lifestyle"
                        onMouseEnter={() => handleMenuHover('lifestyle')}
                        >
                        Lifestyle 
                        <span className="navbar-right-arrow">
                            <svg width="10" height="10" viewBox="0 0 20 20">
                            <path d="M7 5l5 5-5 5" stroke="#9ca3af" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </span>
                        </div>

                        <div 
                        onClick={NavBrowse}
                        className={`navbar-menu-item has-sub ${activeSubmenu === 'health' ? 'active' : ''}`}
                        data-target="health"
                        onMouseEnter={() => handleMenuHover('health')}
                        >
                        Health & Wellness 
                        <span className="navbar-right-arrow">
                            <svg width="10" height="10" viewBox="0 0 20 20">
                            <path d="M7 5l5 5-5 5" stroke="#9ca3af" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </span>
                        </div>

                        <div 
                        onClick={NavBrowse}
                        className={`navbar-menu-item has-sub ${activeSubmenu === 'music' ? 'active' : ''}`}
                        data-target="music"
                        onMouseEnter={() => handleMenuHover('music')}
                        >
                        Music & Art 
                        <span className="navbar-right-arrow">
                            <svg width="10" height="10" viewBox="0 0 20 20">
                            <path d="M7 5l5 5-5 5" stroke="#9ca3af" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </span>
                        </div>

                        <div 
                        onClick={NavBrowse}
                        className={`navbar-menu-item has-sub ${activeSubmenu === 'productivity' ? 'active' : ''}`}
                        data-target="productivity"
                        onMouseEnter={() => handleMenuHover('productivity')}
                        >
                        Productivity 
                        <span className="navbar-right-arrow">
                            <svg width="10" height="10" viewBox="0 0 20 20">
                            <path d="M7 5l5 5-5 5" stroke="#9ca3af" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </span>
                        </div>

                        {/* Divider */}
                        <div className="navbar-menu-divider"></div>

                        <div 
                        onClick={NavBrowse}
                        className="navbar-menu-item no-sub"
                        onMouseEnter={handleNoSubHover}
                        >
                        Free Courses
                        </div>
                        <div 
                        onClick={NavBrowse}
                        className="navbar-menu-item no-sub"
                        onMouseEnter={handleNoSubHover}
                        >
                        All Instructors
                        </div>
                    </div>

                    {/* RIGHT MENU */}
                    <div className="navbar-dropdown-right" style={{ display: showDropdownRight ? 'block' : 'none' }}>
                        <div className="navbar-submenu" id="lang" style={{ display: activeSubmenu === 'lang' ? 'flex' : 'none' }}>
                        <a onClick={NavBrowse}>English</a>
                        <a onClick={NavBrowse}>Japanese</a>
                        <a onClick={NavBrowse}>Korean</a>
                        <a onClick={NavBrowse}>Chinese</a>
                        <a onClick={NavBrowse}>Spanish</a>
                        <a onClick={NavBrowse}>Languages for Career</a>
                        </div>

                        <div className="navbar-submenu" id="business" style={{ display: activeSubmenu === 'business' ? 'flex' : 'none' }}>
                        <a onClick={NavBrowse}>Entrepreneurship</a>
                        <a onClick={NavBrowse}>Marketing</a>
                        <a onClick={NavBrowse}>Management</a>
                        </div>

                        <div className="navbar-submenu" id="finance" style={{ display: activeSubmenu === 'finance' ? 'flex' : 'none' }}>
                        <a onClick={NavBrowse}>Stock Investment</a>
                        <a onClick={NavBrowse}>Crypto & Blockchain</a>
                        <a onClick={NavBrowse}>Financial Planning</a>
                        <a onClick={NavBrowse}>Trading</a>
                        </div>

                        <div className="navbar-submenu" id="ai" style={{ display: activeSubmenu === 'ai' ? 'flex' : 'none' }}>
                        <a onClick={NavBrowse}>Machine Learning</a>
                        <a onClick={NavBrowse}>Deep Learning</a>
                        <a onClick={NavBrowse}>AI Tools</a>
                        <a onClick={NavBrowse}>Data Analysis</a>
                        </div>

                        <div className="navbar-submenu" id="tech" style={{ display: activeSubmenu === 'tech' ? 'flex' : 'none' }}>
                        <a onClick={NavBrowse}>Web Development</a>
                        <a onClick={NavBrowse}>Mobile Development</a>
                        <a onClick={NavBrowse}>Cybersecurity</a>
                        </div>

                        <div className="navbar-submenu" id="lifestyle" style={{ display: activeSubmenu === 'lifestyle' ? 'flex' : 'none' }}>
                        <a onClick={NavBrowse}>Photography</a>
                        <a onClick={NavBrowse}>Cooking</a>
                        <a onClick={NavBrowse}>Travel</a>
                        </div>

                        <div className="navbar-submenu" id="health" style={{ display: activeSubmenu === 'health' ? 'flex' : 'none' }}>
                        <a onClick={NavBrowse}>Fitness</a>
                        <a onClick={NavBrowse}>Mental Health</a>
                        <a onClick={NavBrowse}>Nutrition</a>
                        </div>

                        <div className="navbar-submenu" id="music" style={{ display: activeSubmenu === 'music' ? 'flex' : 'none' }}>
                        <a onClick={NavBrowse}>Music Production</a>
                        <a onClick={NavBrowse}>Singing</a>
                        <a onClick={NavBrowse}>Instruments</a>
                        </div>

                        <div className="navbar-submenu" id="productivity" style={{ display: activeSubmenu === 'productivity' ? 'flex' : 'none' }}>
                        <a onClick={NavBrowse}>Time Management</a>
                        <a onClick={NavBrowse}>Work Tools</a>
                        <a onClick={NavBrowse}>Leadership Skills</a>
                        </div>
                    </div>
                    </div>
                </div>

                <div className="navbar-search-container">
                    <i className="fas fa-search navbar-search-icon"></i>
                    <input
                        type="text"
                        className="navbar-searchbar"
                        placeholder="Search for courses, teachers, or skills..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyDown={handleSearchKeyDown}
                    />
                </div>

                <div className="navbar-links">
                    <a style={{cursor:"pointer"}} onClick={NavBrowse}>Courses</a>
                    <a href="#">Features</a>
                    <a href="#">How It Works</a>
                    <a href="#">About</a>
                </div>

                <div className="navbar-btns">
                    <a onClick={NavSignin} style={{cursor:"pointer"}} className="navbar-btn navbar-btn-signin">Sign In</a>
                    <a onClick={NavSignup} style={{cursor:"pointer"}} className="navbar-btn navbar-btn-signup">Sign Up</a>
                </div>
                </div>
        </div>
    );
};

export default Navbar;