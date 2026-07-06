/* 
 * Dev Keshav Hire - Portfolio Script File
 * Vanilla JS logic for smooth premium micro-interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const navbar = document.querySelector('.navbar-custom');
  const navLinks = document.querySelectorAll('.nav-link-custom');
  const sections = document.querySelectorAll('section');
  const contactForm = document.getElementById('portfolioContactForm');
  const currentYearSpan = document.getElementById('currentYear');
  
  // Update Footer Year
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }

  /* ==========================================================================
     Navbar Scroll Effect
     ========================================================================== */
  const checkScroll = () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  // Run on load and scroll
  window.addEventListener('scroll', checkScroll);
  checkScroll();

  /* ==========================================================================
     Active Section Link Highlighting (ScrollSpy using Intersection Observer)
     ========================================================================== */
  const observerOptions = {
    root: null,
    rootMargin: '-30% 0px -60% 0px', // Trigger when section is in the middle of viewport
    threshold: 0
  };

  const observerCallback = (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  };

  const observer = new IntersectionObserver(observerCallback, observerOptions);
  sections.forEach(section => observer.observe(section));

  /* ==========================================================================
     Mobile Nav Close on Link Click
     ========================================================================== */
  const navbarCollapse = document.getElementById('navbarNav');
  const navbarToggler = document.querySelector('.navbar-toggler-custom');
  
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navbarCollapse.classList.contains('show')) {
        // Bootstrap 5 API
        const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
        if (bsCollapse) {
          bsCollapse.hide();
        }
      }
    });
  });

  /* ==========================================================================
     Terminal Typewriter Simulation
     ========================================================================== */
  const terminalBody = document.getElementById('terminalBody');
  
  if (terminalBody) {
    // Clear initial markup to run typewriter
    terminalBody.innerHTML = '';
    
    const lines = [
      { type: 'input', text: 'whoami' },
      { type: 'output', text: 'Dev Keshav Hire' },
      { type: 'output', text: 'Role: Backend Java Developer' },
      { type: 'output', text: 'Core Focus: Java, Spring Boot, PostgreSQL, WebSockets' },
      { type: 'output', text: 'Status: Actively building scalable architectures' },
      { type: 'output', text: 'Current Goal: Writing clean, elegant backend logic' },
      { type: 'input', text: 'cat capabilities.txt' },
      { type: 'output_accent', text: '[System Design, API Development, Algorithms, DB Optimization]' }
    ];

    let currentLineIndex = 0;
    
    function writeTerminalLine() {
      if (currentLineIndex >= lines.length) {
        // Wait 5 seconds at the end of output, then type 'clear' to reset
        setTimeout(simulateClearCommand, 5000);
        return;
      }
      
      const lineData = lines[currentLineIndex];
      const lineElement = document.createElement('div');
      lineElement.className = 'terminal-line';
      
      if (lineData.type === 'input') {
        lineElement.innerHTML = `<span class="terminal-prompt">guest@dev-hire:~$</span> <span class="terminal-cmd"></span>`;
        terminalBody.appendChild(lineElement);
        
        const cmdSpan = lineElement.querySelector('.terminal-cmd');
        let charIndex = 0;
        
        function typeChar() {
          if (charIndex < lineData.text.length) {
            cmdSpan.textContent += lineData.text[charIndex];
            charIndex++;
            setTimeout(typeChar, 100);
          } else {
            currentLineIndex++;
            setTimeout(writeTerminalLine, 600);
          }
        }
        
        typeChar();
      } else {
        // Output line - renders immediately
        if (lineData.type === 'output_accent') {
          lineElement.innerHTML = `<span class="terminal-accent">${lineData.text}</span>`;
        } else {
          lineElement.innerHTML = `<span class="terminal-out">${lineData.text}</span>`;
        }
        terminalBody.appendChild(lineElement);
        currentLineIndex++;
        setTimeout(writeTerminalLine, 400);
      }
      
      // Auto-scroll terminal container
      terminalBody.scrollTop = terminalBody.scrollHeight;
    }

    function simulateClearCommand() {
      const clearPromptLine = document.createElement('div');
      clearPromptLine.className = 'terminal-line';
      clearPromptLine.innerHTML = `<span class="terminal-prompt">guest@dev-hire:~$</span> <span class="terminal-cmd"></span>`;
      terminalBody.appendChild(clearPromptLine);
      
      const cmdSpan = clearPromptLine.querySelector('.terminal-cmd');
      const clearText = 'clear';
      let charIndex = 0;
      
      function typeClearChar() {
        if (charIndex < clearText.length) {
          cmdSpan.textContent += clearText[charIndex];
          charIndex++;
          setTimeout(typeClearChar, 100);
        } else {
          // Wait 500ms after typing "clear", then clear screen and restart sequence
          setTimeout(() => {
            terminalBody.innerHTML = '';
            currentLineIndex = 0;
            writeTerminalLine();
          }, 500);
        }
      }
      
      typeClearChar();
      terminalBody.scrollTop = terminalBody.scrollHeight;
    }
    
    // Start typing after a short initial delay
    setTimeout(writeTerminalLine, 800);
  }

});
