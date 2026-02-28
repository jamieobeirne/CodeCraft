// Content Loader - Loads saved content from localStorage and applies it to the homepage
document.addEventListener('DOMContentLoaded', function() {
    const savedContent = localStorage.getItem('homepageContent');
    
    if (savedContent) {
        const content = JSON.parse(savedContent);
        applyContent(content);
    }
});

function applyContent(content) {
    // Helper function to get nested value from object
    function getNestedValue(obj, path) {
        return path.split('.').reduce((current, key) => current && current[key], obj);
    }

    // Helper function to set content
    function setContent(selector, value, isAttribute = false) {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
            if (isAttribute && element.tagName === 'A') {
                element.setAttribute('href', value || '#');
            } else {
                element.textContent = value || element.textContent;
            }
        });
    }

    // Apply Hero Section
    if (content.hero) {
        setContent('[data-content="hero.greeting"]', content.hero.greeting);
        setContent('[data-content="hero.name"]', content.hero.name);
        setContent('[data-content="hero.role"]', content.hero.role);
        setContent('[data-content="hero.description"]', content.hero.description);
        setContent('[data-content="hero.button1"]', content.hero.button1);
        setContent('[data-content="hero.button2"]', content.hero.button2);
        
        // Social links
        if (content.hero.social) {
            setContent('[data-content="hero.social.github"]', content.hero.social.github, true);
            setContent('[data-content="hero.social.linkedin"]', content.hero.social.linkedin, true);
            setContent('[data-content="hero.social.twitter"]', content.hero.social.twitter, true);
            setContent('[data-content="hero.social.email"]', content.hero.social.email ? `mailto:${content.hero.social.email}` : '#', true);
        }
    }

    // Apply Skills Section
    if (content.skills) {
        setContent('[data-content="skills.title"]', content.skills.title);
        setContent('[data-content="skills.html5"]', content.skills.html5);
        setContent('[data-content="skills.css3"]', content.skills.css3);
        setContent('[data-content="skills.javascript"]', content.skills.javascript);
        setContent('[data-content="skills.react"]', content.skills.react);
        setContent('[data-content="skills.nodejs"]', content.skills.nodejs);
        setContent('[data-content="skills.git"]', content.skills.git);
    }

    // Apply Projects Section
    if (content.projects) {
        setContent('[data-content="projects.title"]', content.projects.title);
        
        // Project 1
        if (content.projects.project1) {
            setContent('[data-content="projects.project1.title"]', content.projects.project1.title);
            setContent('[data-content="projects.project1.description"]', content.projects.project1.description);
            
            // Update project tags
            const tags1 = document.querySelector('[data-content="projects.project1.tags"]');
            if (tags1 && content.projects.project1.tags) {
                const tagArray = content.projects.project1.tags.split(',').map(t => t.trim());
                tags1.innerHTML = tagArray.map(tag => `<span class="tag">${tag}</span>`).join('');
            }
        }
        
        // Project 2
        if (content.projects.project2) {
            setContent('[data-content="projects.project2.title"]', content.projects.project2.title);
            setContent('[data-content="projects.project2.description"]', content.projects.project2.description);
            
            const tags2 = document.querySelector('[data-content="projects.project2.tags"]');
            if (tags2 && content.projects.project2.tags) {
                const tagArray = content.projects.project2.tags.split(',').map(t => t.trim());
                tags2.innerHTML = tagArray.map(tag => `<span class="tag">${tag}</span>`).join('');
            }
        }
        
        // Project 3
        if (content.projects.project3) {
            setContent('[data-content="projects.project3.title"]', content.projects.project3.title);
            setContent('[data-content="projects.project3.description"]', content.projects.project3.description);
            
            const tags3 = document.querySelector('[data-content="projects.project3.tags"]');
            if (tags3 && content.projects.project3.tags) {
                const tagArray = content.projects.project3.tags.split(',').map(t => t.trim());
                tags3.innerHTML = tagArray.map(tag => `<span class="tag">${tag}</span>`).join('');
            }
        }
    }

    // Apply Contact Section
    if (content.contact) {
        setContent('[data-content="contact.title"]', content.contact.title);
        setContent('[data-content="contact.description"]', content.contact.description);
        setContent('[data-content="contact.email"]', content.contact.email);
        setContent('[data-content="contact.phone"]', content.contact.phone);
        setContent('[data-content="contact.location"]', content.contact.location);
    }
}

