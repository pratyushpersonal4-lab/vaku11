// JavaScript for the romantic apology website - COMPLETELY FIXED VERSION
let currentPage = 1;
const totalPages = 16;
let isNavigating = false;

// Simple navigation functions with proper debouncing
function nextPage() {
    // Prevent navigation if already at last page or currently navigating
    if (isNavigating || currentPage >= totalPages) {
        console.log('Next blocked: navigating=' + isNavigating + ', currentPage=' + currentPage + '/' + totalPages);
        return;
    }
    
    console.log('🔄 NEXT: Moving from page ' + currentPage + ' to ' + (currentPage + 1));
    
    // Set navigation lock
    isNavigating = true;
    disableButtons();
    
    // Increment page counter FIRST
    currentPage = currentPage + 1;
    
    // Show the new page
    showPage(currentPage);
    
    // Re-enable navigation after brief delay
    setTimeout(() => {
        isNavigating = false;
        enableButtons();
        console.log('✅ Navigation unlocked, now on page ' + currentPage);
    }, 250);
}

function previousPage() {
    // Prevent navigation if already at first page or currently navigating
    if (isNavigating || currentPage <= 1) {
        console.log('Previous blocked: navigating=' + isNavigating + ', currentPage=' + currentPage);
        return;
    }
    
    console.log('🔄 PREVIOUS: Moving from page ' + currentPage + ' to ' + (currentPage - 1));
    
    // Set navigation lock
    isNavigating = true;
    disableButtons();
    
    // Decrement page counter FIRST
    currentPage = currentPage - 1;
    
    // Show the new page
    showPage(currentPage);
    
    // Re-enable navigation after brief delay
    setTimeout(() => {
        isNavigating = false;
        enableButtons();
        console.log('✅ Navigation unlocked, now on page ' + currentPage);
    }, 250);
}

// Show specific page with robust display logic
function showPage(pageNumber) {
    console.log('📄 SHOWING PAGE: ' + pageNumber + ' (requested)');
    
    // Validate page number
    if (pageNumber < 1 || pageNumber > totalPages) {
        console.error('❌ Invalid page number: ' + pageNumber);
        return;
    }
    
    // Force hide ALL pages first
    console.log('🔄 Hiding all pages...');
    for (let i = 1; i <= totalPages; i++) {
        const page = document.getElementById('page' + i);
        if (page) {
            page.classList.remove('active');
            page.style.display = 'none';
            page.style.opacity = '0';
        }
    }
    
    // Show target page with animation
    const targetPage = document.getElementById('page' + pageNumber);
    if (targetPage) {
        console.log('✅ Displaying page' + pageNumber + ' element');
        
        // Use requestAnimationFrame for smooth transition
        requestAnimationFrame(() => {
            targetPage.style.display = 'flex';
            targetPage.style.opacity = '1';
            targetPage.classList.add('active');
            
            console.log('✅ Page ' + pageNumber + ' is now visible and active');
        });
    } else {
        console.error('❌ Page element not found: page' + pageNumber);
        return;
    }
    
    // Update all UI elements
    updateIndicators(pageNumber);
    updateNavigation(pageNumber);
    updateProgress(pageNumber);
    
    console.log('🎯 Page ' + pageNumber + ' fully loaded and displayed');
}

// Update page indicators
function updateIndicators(pageNumber) {
    console.log('🔢 Updating indicators for page ' + pageNumber);
    
    const indicators = document.querySelectorAll('.indicator');
    indicators.forEach((indicator, index) => {
        const indicatorPageNumber = index + 1;
        
        if (indicatorPageNumber === pageNumber) {
            indicator.classList.add('active');
            console.log('✅ Activated indicator ' + indicatorPageNumber);
        } else {
            indicator.classList.remove('active');
        }
    });
}

// Update navigation buttons state
function updateNavigation(pageNumber) {
    console.log('🔘 Updating navigation buttons for page ' + pageNumber);
    
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    
    if (!prevBtn || !nextBtn) {
        console.error('❌ Navigation buttons not found');
        return;
    }
    
    // Update previous button
    if (pageNumber <= 1) {
        prevBtn.disabled = true;
        prevBtn.style.opacity = '0.5';
        console.log('🔒 Previous button disabled (first page)');
    } else {
        prevBtn.disabled = false;
        prevBtn.style.opacity = '1';
        console.log('🔓 Previous button enabled');
    }
    
    // Update next button
    if (pageNumber >= totalPages) {
        nextBtn.disabled = true;
        nextBtn.textContent = 'The End ❤️';
        nextBtn.style.opacity = '0.5';
        console.log('🔒 Next button disabled (last page)');
    } else {
        nextBtn.disabled = false;
        nextBtn.textContent = 'Next ❯';
        nextBtn.style.opacity = '1';
        console.log('🔓 Next button enabled');
    }
}

// Disable all navigation buttons temporarily
function disableButtons() {
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    
    if (prevBtn) {
        prevBtn.disabled = true;
        prevBtn.style.opacity = '0.5';
    }
    if (nextBtn) {
        nextBtn.disabled = true;
        nextBtn.style.opacity = '0.5';
    }
    
    console.log('🔒 All buttons temporarily disabled');
}

// Enable navigation buttons based on current page
function enableButtons() {
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    
    // Re-enable based on current position
    if (prevBtn && currentPage > 1) {
        prevBtn.disabled = false;
        prevBtn.style.opacity = '1';
    }
    if (nextBtn && currentPage < totalPages) {
        nextBtn.disabled = false;
        nextBtn.style.opacity = '1';
    }
    
    console.log('🔓 Buttons re-enabled based on position');
}

// Update progress tracking
function updateProgress(pageNumber) {
    const progress = Math.round((pageNumber / totalPages) * 100);
    document.title = `My Apology to Vaku ❤️ (${pageNumber}/${totalPages} - ${progress}%)`;
    console.log('📊 Progress: ' + progress + '% (Page ' + pageNumber + ' of ' + totalPages + ')');
}

// Restart the journey
function restartJourney() {
    console.log('🔄 RESTARTING JOURNEY');
    
    // Reset state
    isNavigating = false;
    currentPage = 1;
    
    // Show first page
    showPage(1);
    
    // Add celebration effect
    const celebration = document.createElement('div');
    celebration.innerHTML = '💕 Starting over with love... 💕';
    celebration.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: var(--color-primary);
        color: var(--color-btn-primary-text);
        padding: var(--space-16) var(--space-24);
        border-radius: var(--radius-full);
        z-index: 10000;
        font-size: var(--font-size-lg);
        font-weight: var(--font-weight-medium);
        box-shadow: var(--shadow-lg);
        animation: fadeInUp 0.5s ease;
        pointer-events: none;
    `;
    
    document.body.appendChild(celebration);
    
    setTimeout(() => {
        if (celebration.parentNode) {
            celebration.parentNode.removeChild(celebration);
        }
    }, 2000);
    
    console.log('✅ Journey restarted successfully');
}

// Initialize page indicators with click functionality
function initializeIndicators() {
    console.log('🔢 Initializing page indicators...');
    
    const indicators = document.querySelectorAll('.indicator');
    console.log('Found ' + indicators.length + ' indicators');
    
    indicators.forEach((indicator, index) => {
        const pageNumber = index + 1;
        
        // Remove existing listeners
        indicator.removeEventListener('click', handleIndicatorClick);
        
        // Add new listener
        indicator.addEventListener('click', function(e) {
            e.preventDefault();
            if (isNavigating) {
                console.log('⏳ Indicator click ignored - navigation in progress');
                return;
            }
            
            console.log('🎯 Indicator clicked: jumping to page ' + pageNumber);
            currentPage = pageNumber;
            showPage(currentPage);
        });
        
        indicator.title = `Go to page ${pageNumber}`;
        console.log('✅ Indicator ' + pageNumber + ' initialized');
    });
}

// Handle indicator clicks
function handleIndicatorClick(pageNumber) {
    if (isNavigating) return;
    
    console.log('🎯 Direct page jump to: ' + pageNumber);
    currentPage = pageNumber;
    showPage(currentPage);
}

// Keyboard navigation
function handleKeyPress(event) {
    if (isNavigating) {
        console.log('⏳ Key press ignored - navigation in progress');
        return;
    }
    
    switch(event.key) {
        case 'ArrowRight':
        case ' ':
            event.preventDefault();
            console.log('⌨️ Right arrow/space pressed');
            if (currentPage < totalPages) {
                nextPage();
            }
            break;
        case 'ArrowLeft':
            event.preventDefault();
            console.log('⌨️ Left arrow pressed');
            if (currentPage > 1) {
                previousPage();
            }
            break;
        case 'Home':
            event.preventDefault();
            console.log('⌨️ Home key pressed');
            currentPage = 1;
            showPage(1);
            break;
        case 'End':
            event.preventDefault();
            console.log('⌨️ End key pressed');
            currentPage = totalPages;
            showPage(totalPages);
            break;
    }
}

// Touch/swipe support for mobile
let touchStartX = 0;
let touchEndX = 0;

function handleTouchStart(event) {
    touchStartX = event.touches[0].clientX;
}

function handleTouchEnd(event) {
    touchEndX = event.changedTouches[0].clientX;
    handleSwipe();
}

function handleSwipe() {
    if (isNavigating) return;
    
    const swipeThreshold = 50;
    const swipeDistance = touchEndX - touchStartX;
    
    if (Math.abs(swipeDistance) > swipeThreshold) {
        if (swipeDistance > 0 && currentPage > 1) {
            console.log('👆 Swipe right detected - previous page');
            previousPage();
        } else if (swipeDistance < 0 && currentPage < totalPages) {
            console.log('👆 Swipe left detected - next page');
            nextPage();
        }
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 INITIALIZING ROMANTIC APOLOGY WEBSITE');
    console.log('📱 16-page navigation system starting...');
    console.log('🎯 Target: Fix "Next" button skipping 2 pages issue');
    
    // Validate all pages exist
    let pagesFound = 0;
    for (let i = 1; i <= totalPages; i++) {
        const page = document.getElementById('page' + i);
        if (page) {
            pagesFound++;
            console.log('✅ Found page' + i);
        } else {
            console.error('❌ Missing page' + i);
        }
    }
    console.log('📊 Pages found: ' + pagesFound + '/' + totalPages);
    
    // Initialize page indicators
    initializeIndicators();
    
    // Set up navigation button click handlers
    const nextBtn = document.getElementById('next-btn');
    const prevBtn = document.getElementById('prev-btn');
    const restartBtn = document.getElementById('restart-btn');
    
    if (nextBtn) {
        nextBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('🖱️ Next button clicked');
            nextPage();
        });
        console.log('✅ Next button listener attached');
    } else {
        console.error('❌ Next button not found');
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('🖱️ Previous button clicked');
            previousPage();
        });
        console.log('✅ Previous button listener attached');
    } else {
        console.error('❌ Previous button not found');
    }
    
    if (restartBtn) {
        restartBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('🖱️ Restart button clicked');
            restartJourney();
        });
        console.log('✅ Restart button listener attached');
    }
    
    // Set up keyboard navigation
    document.addEventListener('keydown', handleKeyPress);
    console.log('✅ Keyboard navigation enabled');
    
    // Set up touch navigation for mobile
    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchend', handleTouchEnd, { passive: true });
    console.log('✅ Touch/swipe navigation enabled');
    
    // Initialize clean state
    currentPage = 1;
    isNavigating = false;
    
    // Force hide all pages first
    console.log('🧹 Cleaning up initial page state...');
    for (let i = 1; i <= totalPages; i++) {
        const page = document.getElementById('page' + i);
        if (page) {
            page.classList.remove('active');
            page.style.display = 'none';
            page.style.opacity = '0';
        }
    }
    
    // Show first page
    console.log('🏁 Displaying initial page...');
    showPage(1);
    
    console.log('💕 WEBSITE FULLY INITIALIZED!');
    console.log('🎯 Navigation Fix: Each click = exactly 1 page advancement');
    console.log('⌨️  Keyboard: Arrow keys, Space, Home, End');
    console.log('📱 Mobile: Swipe left/right');
    console.log('🔢 Indicators: Click any dot to jump to that page');
    
    // Final state verification
    setTimeout(() => {
        console.log('🔍 FINAL STATE CHECK:');
        console.log('- Current page:', currentPage);
        console.log('- Total pages:', totalPages);
        console.log('- Navigation locked:', isNavigating);
        console.log('- Page 1 visible:', document.getElementById('page1').style.display);
        console.log('- Page 1 active class:', document.getElementById('page1').classList.contains('active'));
    }, 100);
});

// Debugging utilities
function getCurrentPageInfo() {
    return {
        currentPage: currentPage,
        totalPages: totalPages,
        progress: Math.round((currentPage / totalPages) * 100),
        isFirstPage: currentPage === 1,
        isLastPage: currentPage === totalPages,
        isNavigating: isNavigating,
        visiblePageId: getVisiblePageId()
    };
}

function getVisiblePageId() {
    for (let i = 1; i <= totalPages; i++) {
        const page = document.getElementById('page' + i);
        if (page && page.style.display !== 'none' && page.classList.contains('active')) {
            return 'page' + i;
        }
    }
    return 'none';
}

// Test navigation function
function testNavigation() {
    console.log('🧪 RUNNING NAVIGATION TEST:');
    console.log('Initial state:', getCurrentPageInfo());
    
    let testStep = 1;
    
    function runTestStep() {
        if (testStep <= 5) {
            console.log(`🧪 Test step ${testStep}: Clicking next...`);
            nextPage();
            
            setTimeout(() => {
                console.log(`Result after step ${testStep}:`, getCurrentPageInfo());
                testStep++;
                runTestStep();
            }, 600);
        } else {
            console.log('🧪 Navigation test completed!');
        }
    }
    
    setTimeout(runTestStep, 1000);
}

// Export functions for global access
window.nextPage = nextPage;
window.previousPage = previousPage;
window.restartJourney = restartJourney;
window.getCurrentPageInfo = getCurrentPageInfo;
window.testNavigation = testNavigation;