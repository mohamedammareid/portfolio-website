document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. Mobile Burger Menu Logic
    // ==========================================
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (mobileMenu && navMenu) {
        const menuIcon = mobileMenu.querySelector('i');
        
        function toggleMenu() {
            navMenu.classList.toggle('active');
            if (navMenu.classList.contains('active')) {
                menuIcon.classList.replace('fa-bars', 'fa-times');
            } else {
                menuIcon.classList.replace('fa-times', 'fa-bars');
            }
        }

        mobileMenu.addEventListener('click', toggleMenu);

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (navMenu.classList.contains('active')) toggleMenu();
            });
        });
    }

    // ==========================================
    // 2. Typing Effect
    // ==========================================
    const typingText = document.querySelector('.typing-text');
    if (typingText) {
        const textArray = ["Web Developer.", "Backend Engineer.", "Shopify Expert.", "AI Agents Builder."];
        let textIndex = 0, charIndex = 0, isDeleting = false;

        function type() {
            const currentText = textArray[textIndex];
            if (isDeleting) {
                typingText.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typingText.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
            }

            let typeSpeed = isDeleting ? 40 : 100;
            if (!isDeleting && charIndex === currentText.length) {
                typeSpeed = 2000; isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % textArray.length;
                typeSpeed = 500;
            }
            setTimeout(type, typeSpeed);
        }
        type();
    }

    // ==========================================
    // 3. Header & Back To Top Button
    // ==========================================
    const bttBtn = document.getElementById('btt-btn');
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 150) {
            if (bttBtn) bttBtn.classList.add('show');
            if (header) header.classList.add('scrolled');
        } else {
            if (bttBtn) bttBtn.classList.remove('show');
            if (header) header.classList.remove('scrolled');
        }
    });

    // ==========================================
    // 4. Background Canvas Animations (Particles & Matrix)
    // ==========================================
    const canvas = document.getElementById('code-bg');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particlesArray = [];
        window.matrixMode = false;
        let drops = [];
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*</>{}=[]'.split('');

        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        resizeCanvas();

        const symbols = ['{ }', '</>', '01', '10', '=>', '[]', '()', 'AI', 'API'];

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 10 + 10;
                this.speedY = (Math.random() * 0.4) - 0.2;
                this.speedX = (Math.random() * 0.4) - 0.2;
                this.symbol = symbols[Math.floor(Math.random() * symbols.length)];
                this.opacity = Math.random() * 0.1 + 0.05;
            }
            update() {
                this.y -= this.speedY; this.x -= this.speedX;
                if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
                if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
            }
            draw() {
                ctx.font = `${this.size}px monospace`;
                ctx.fillStyle = `rgba(74, 222, 128, ${this.opacity})`;
                ctx.fillText(this.symbol, this.x, this.y);
            }
        }

        function initParticles() {
            particlesArray = [];
            const particleCount = window.innerWidth < 768 ? 20 : 40;
            for (let i = 0; i < particleCount; i++) {
                particlesArray.push(new Particle());
            }
        }

        function animateParticles() {
            if (window.matrixMode) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particlesArray.forEach(p => { p.update(); p.draw(); });
            requestAnimationFrame(animateParticles);
        }

        initParticles();
        animateParticles();

        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                resizeCanvas();
                if (!window.matrixMode) {
                    initParticles();
                } else {
                    let fontSize = 14;
                    let columns = canvas.width / fontSize;
                    drops = [];
                    for (let x = 0; x < columns; x++) drops[x] = 1;
                }
            }, 200);
        });

        // Matrix Easter Egg Setup
        let typedStr = '';
        window.addEventListener('keydown', (e) => {
            typedStr += e.key.toLowerCase();
            if (typedStr.length > 6) typedStr = typedStr.substring(1);
            if (typedStr === 'matrix' && !window.matrixMode) {
                window.matrixMode = true;
                document.documentElement.setAttribute('data-theme', 'dark');
                initMatrix();
            }
        });

        function initMatrix() {
            resizeCanvas();
            let fontSize = 14;
            let columns = canvas.width / fontSize;
            drops = [];
            for (let x = 0; x < columns; x++) drops[x] = 1;

            function drawMatrix() {
                ctx.fillStyle = 'rgba(15, 17, 21, 0.05)';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.fillStyle = '#4ade80';
                ctx.font = fontSize + 'px monospace';

                for (let i = 0; i < drops.length; i++) {
                    let text = chars[Math.floor(Math.random() * chars.length)];
                    ctx.fillText(text, i * fontSize, drops[i] * fontSize);
                    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
                    drops[i]++;
                }
            }
            setInterval(drawMatrix, 33);
        }
    }

    // ==========================================
    // 5. Interactive Terminal (Full Resume Edition)
    // ==========================================
    const termInput = document.getElementById('term-input');
    const termHistory = document.getElementById('term-history');
    const termBody = document.getElementById('term-body');

    if (termInput && termHistory && termBody) {
        const welcomeMessage = `
<pre style="color: var(--accent-color); font-size: 10px; line-height: 1.2;">
       __        
  ___ / / __ __  
 / _ \\_ \\ \\ \\ /  
 \\___/___/ /_\\_\\ 
</pre>
<div>System initialized. AI Backend Modules loaded.</div>
<div style="margin-bottom: 15px;">Type <span class="highlight">'help'</span> to see available commands.</div>`;

        termHistory.innerHTML = welcomeMessage;

        const commands = {
            help: `Available commands:<br>
  - <span class="highlight">whoami</span>         : Profile summary & details<br>
  - <span class="highlight">experience</span>     : Professional work history<br>
  - <span class="highlight">education</span>      : Academic background<br>
  - <span class="highlight">skills</span>         : Technical arsenal<br>
  - <span class="highlight">projects</span>       : Featured works & implementations<br>
  - <span class="highlight">certifications</span> : Verified licenses & certificates<br>
  - <span class="highlight">courses</span>        : Continued education<br>
  - <span class="highlight">languages</span>      : Spoken languages<br>
  - <span class="highlight">contact</span>        : Contact information<br>
  - <span class="highlight">theme [mode]</span>   : Switch UI theme (light/dark)<br>
  - <span class="highlight">matrix</span>         : Initiate matrix protocol<br>
  - <span class="highlight">hack</span>           : [REDACTED]<br>
  - <span class="highlight">cowsay [msg]</span>   : An important message from a cow<br>
  - <span class="highlight">play snake</span>     : Launch retro snake game<br>
  - <span class="highlight">clear</span>          : Clear terminal screen`,

            whoami: `<span style="color: #4ade80; font-weight: bold;">Mohamed Eid</span><br>
AI Backend Engineer | Python | FastAPI | AI Agents | Cloud Computing<br>
Location: Giza, Egypt<br><br>
<span style="color: #8b949e;">About:</span> Aspiring AI Backend Engineer with a strong foundation in software engineering, backend development, and AI-powered applications. Passionate about building scalable systems using Python, FastAPI, databases, cloud technologies, and modern AI frameworks. Driven by the goal of bridging technology, business needs, and AI to create impactful digital products.`,

            experience: `<span style="color: #ffbd2e;">[Nov 2025 - Present]</span> <strong>Shopify Developer</strong> @ Italian Corner<br>
  - Own the full technical operation & growth infrastructure.<br>
  - Manage UI/UX, conversions (CRO), Liquid, custom integrations & Meta Ads APIs.<br><br>
<span style="color: #ffbd2e;">[Dec 2025 - Present]</span> <strong>Founder</strong> @ o1x<br>
  - Engineering high-performance solutions and Logic Blocks.<br>
  - Building Custom Shopify stores, Automation workflows, and AI Agents.<br><br>
<span style="color: #ffbd2e;">[Jun 2025 - Nov 2025]</span> <strong>Automation Engineer</strong> @ On-chat.live<br>
  - Deployed intelligent AI Chatbots (Meta apps, WhatsApp, IG).<br>
  - Architected automated response systems and integrated LLMs.<br><br>
<span style="color: #8b949e;">[Sep 2022 - Nov 2022]</span> <strong>Data Entry Clerk</strong> @ Gessraha Pharmacies<br>
<span style="color: #8b949e;">[Jul 2019 - Sep 2019]</span> <strong>Data Entry Clerk</strong> @ SMART dry clean`,

            education: `<span style="color: #4ade80;">[2024 - 2028]</span> <strong>Bachelor's, Business Information Systems</strong><br>
  - Advanced Academy (Economics, Accounting, Marketing, Admin)<br><br>
<span style="color: #4ade80;">[Nov 2024 - Present]</span> <strong>Computer Science</strong><br>
  - CS50 / Harvard University`,

            skills: `<strong style="color: #ff5f56;">AI & Data:</strong> AI Agents, LLM Integration, LangChain, Artificial Intelligence, SQL, Vector DBs, Algorithm Design<br>
<strong style="color: #ffbd2e;">Backend Web:</strong> Python, FastAPI, Flask, Django, PostgreSQL, Docker, AWS, Cloud Computing<br>
<strong style="color: #27c93f;">Frontend & E-commerce:</strong> JavaScript, HTML/CSS, UI/UX, Shopify Architecture, Liquid, E-commerce Optimization<br>
<strong style="color: #8b949e;">Other Tools:</strong> Git, Proxmox, System Administration, n8n, UiPath, Meta Ads (CAPI)`,

            projects: `<pre style="color: #8b949e; font-size: 12px; font-family: monospace;">
[
  { "name": "Italian Corner", "type": "E-commerce Architecture", "tech": ["Shopify", "Front-End", "UI/UX"] },
  { "name": "o1x Website", "type": "Agency Platform", "tech": ["Front-End Development"] },
  { "name": "Fake Hotel Room Booking", "type": "Backend System", "tech": ["Python", "OOP", "Validation"] },
  { "name": "Task Manager (Todo list)", "type": "Web Application", "tech": ["HTML/CSS", "JavaScript", "Bootstrap"] }
]</pre>`,

            certifications: `- <strong>Claude 101</strong> (Anthropic, Apr 2026)<br>
- <strong>Claude Code 101</strong> (Anthropic, Apr 2026)<br>
- <strong>CS50P: Intro to Programming with Python</strong> (Harvard/CS50, Dec 2024)<br>
- <strong>CS50x: Intro to Computer Science</strong> (Harvard/CS50, Nov 2024)`,

            courses: `- <strong>AI Agents in LangGraph</strong> (LANGGRAPH101)<br>
- <strong>CompTIA 220-1101 A+ & SY0-701 Security+</strong> (Professor Messer)<br>
- <strong>Mastering Python & Front-End Dev</strong> (Elzero / Codezilla)<br>
- <strong>Adobe Premiere Pro & After Effects</strong> (Mostafa Makram)`,

            languages: `<span style="color: #27c93f;">Arabic:</span> Native or bilingual proficiency<br>
<span style="color: #27c93f;">English:</span> Professional working proficiency (Duolingo Score: 130)`,

            contact: `Email: meid@gmail.com<br>Location: Giza, Egypt<br>LinkedIn: /in/mohamedammareid<br>GitHub: /mohamedammareid`,

            sudo: `<span style='color: #ff5f56;'>[ERROR] Permission denied.</span> Mohamed is the only superuser here. This incident has been reported to the root directory.`
        };

        termInput.addEventListener('keydown', function (e) {
            if (e.key === 'Enter') {
                const rawCmd = this.value.trim();
                const cmdParts = rawCmd.toLowerCase().split(' ');
                const mainCmd = cmdParts[0];

                this.value = '';
                if (rawCmd === '') return;

                termHistory.innerHTML += `<div><span class="prompt">$</span> <span style="color: #fff;">${rawCmd}</span></div>`;

                let response = "";

                if (mainCmd === 'clear') {
                    termHistory.innerHTML = '';
                    return;
                }
                else if (mainCmd === 'matrix') {
                    document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'm'}));
                    document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'a'}));
                    document.dispatchEvent(new KeyboardEvent('keydown', {'key': 't'}));
                    document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'r'}));
                    document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'i'}));
                    document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'x'}));
                    response = "<span style='color: #27c93f;'>Matrix protocol initiated... Follow the white rabbit.</span>";
                }
                else if (mainCmd === 'theme') {
                    if (cmdParts[1] === 'light') {
                        document.documentElement.setAttribute('data-theme', 'light');
                        response = "Theme switched to light mode.";
                    } else if (cmdParts[1] === 'dark') {
                        document.documentElement.setAttribute('data-theme', 'dark');
                        response = "Theme switched to dark mode.";
                    } else {
                        response = "Usage: theme light OR theme dark";
                    }
                }
                else if (mainCmd === 'hack') {
                    const hackDivId = 'hack-' + Date.now();
                    response = `<div id="${hackDivId}" style="color: #27c93f; font-family: monospace; font-size: 13px; margin-top: 10px;"></div>`;
                    setTimeout(() => {
                        const hackDiv = document.getElementById(hackDivId);
                        if (!hackDiv) return;
                        let lines = [
                            "Initializing connection to target host...",
                            "Bypassing mainframe firewalls...",
                            "Decrypting SHA-256 hashes: [||||||||||] 100%",
                            "Extracting sensitive payloads...",
                            "Injecting SQL anomalies...",
                            "Routing through 7 proxies...",
                            "Accessing root directory...",
                            "ACCESS GRANTED."
                        ];
                        let i = 0;
                        let interval = setInterval(() => {
                            if (i < lines.length) {
                                hackDiv.innerHTML += `<div>> ${lines[i]}</div>`;
                                termBody.scrollTop = termBody.scrollHeight;
                                i++;
                            } else {
                                clearInterval(interval);
                                hackDiv.innerHTML += `<div style="color: #ff5f56; font-size: 20px; font-weight: bold; margin-top: 10px;">SYSTEM COMPROMISED</div>`;
                                termBody.scrollTop = termBody.scrollHeight;
                            }
                        }, 400);
                    }, 50);
                }
                else if (mainCmd === 'cowsay') {
                    let msg = cmdParts.slice(1).join(' ') || "Moo.";
                    let topBorder = " _" + "_".repeat(msg.length) + "_ ";
                    let bottomBorder = " -" + "-".repeat(msg.length) + "- ";
                    response = `<pre style="color: #fff; line-height: 1.2; font-family: monospace; font-size: 13px;">
${topBorder}
&lt; ${msg} &gt;
${bottomBorder}
        \\   ^__^
         \\  (oo)\\_______
            (__)\\       )\\/\\
                ||----w |
                ||     ||
</pre>`;
                }
                else if (mainCmd === 'play' && cmdParts[1] === 'snake') {
                    const canvasId = 'snake-' + Date.now();
                    response = `<div style="margin-bottom: 10px;">Starting Snake... Use arrow keys to play! Click terminal to focus.</div>
                    <canvas id="${canvasId}" width="300" height="300" style="border: 2px solid #333; background: #000; border-radius: 8px; box-shadow: 0 5px 15px rgba(0,0,0,0.5);"></canvas>`;
                    
                    setTimeout(() => {
                        const sCanvas = document.getElementById(canvasId);
                        if (!sCanvas) return;
                        const sCtx = sCanvas.getContext('2d');
                        let snake = [{x: 150, y: 150}];
                        let dx = 10; let dy = 0;
                        let foodX; let foodY;
                        let score = 0;
                        
                        function createFood() {
                            foodX = Math.round((Math.random() * 290) / 10) * 10;
                            foodY = Math.round((Math.random() * 290) / 10) * 10;
                        }
                        createFood();

                        function main() {
                            if (!document.body.contains(sCanvas)) return; // Stop loop if terminal cleared
                            if (hasGameEnded()) {
                                sCtx.fillStyle = 'rgba(0, 0, 0, 0.7)';
                                sCtx.fillRect(0, 0, sCanvas.width, sCanvas.height);
                                sCtx.fillStyle = '#ff5f56';
                                sCtx.font = 'bold 24px monospace';
                                sCtx.textAlign = 'center';
                                sCtx.fillText("GAME OVER", 150, 140);
                                sCtx.fillStyle = '#fff';
                                sCtx.font = '16px monospace';
                                sCtx.fillText("Score: " + score, 150, 170);
                                return;
                            }
                            setTimeout(function onTick() {
                                clearCanvas();
                                drawFood();
                                advanceSnake();
                                drawSnake();
                                main();
                            }, 100);
                        }
                        
                        function clearCanvas() {
                            sCtx.fillStyle = '#000';
                            sCtx.fillRect(0, 0, sCanvas.width, sCanvas.height);
                        }
                        
                        function drawSnake() {
                            snake.forEach((part, index) => {
                                sCtx.fillStyle = index === 0 ? '#4ade80' : '#22c55e';
                                sCtx.fillRect(part.x, part.y, 10, 10);
                                sCtx.strokeStyle = '#000';
                                sCtx.strokeRect(part.x, part.y, 10, 10);
                            });
                        }
                        
                        function advanceSnake() {
                            const head = {x: snake[0].x + dx, y: snake[0].y + dy};
                            snake.unshift(head);
                            if (head.x === foodX && head.y === foodY) {
                                score += 10;
                                createFood();
                            } else {
                                snake.pop();
                            }
                        }
                        
                        function drawFood() {
                            sCtx.fillStyle = '#ff5f56';
                            sCtx.fillRect(foodX, foodY, 10, 10);
                        }
                        
                        function hasGameEnded() {
                            for (let i = 4; i < snake.length; i++) {
                                if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) return true;
                            }
                            return snake[0].x < 0 || snake[0].x > 290 || snake[0].y < 0 || snake[0].y > 290;
                        }
                        
                        termInput.addEventListener('keydown', function snakeKey(e) {
                            if (!document.body.contains(sCanvas)) {
                                termInput.removeEventListener('keydown', snakeKey);
                                return;
                            }
                            const LEFT = 37; const RIGHT = 39; const UP = 38; const DOWN = 40;
                            if (e.keyCode === LEFT && dx !== 10) { dx = -10; dy = 0; e.preventDefault(); }
                            if (e.keyCode === RIGHT && dx !== -10) { dx = 10; dy = 0; e.preventDefault(); }
                            if (e.keyCode === UP && dy !== 10) { dx = 0; dy = -10; e.preventDefault(); }
                            if (e.keyCode === DOWN && dy !== -10) { dx = 0; dy = 10; e.preventDefault(); }
                        });
                        
                        main();
                        termBody.scrollTop = termBody.scrollHeight;
                    }, 100);
                }
                else if (commands[mainCmd]) {
                    response = commands[mainCmd];
                }
                else {
                    response = `bash: ${mainCmd}: command not found. Type 'help' for available commands.`;
                }

                termHistory.innerHTML += `<div style="margin-bottom: 15px; margin-top: 5px; line-height: 1.5;">${response}</div>`;
                termBody.scrollTop = termBody.scrollHeight;
            }
        });

        termBody.addEventListener('click', () => {
            termInput.focus();
        });
    }

    // ==========================================
    // 6. Scroll Reveal
    // ==========================================
    const reveals = document.querySelectorAll('.reveal');
    function revealOnScroll() {
        reveals.forEach(rev => {
            if (rev.getBoundingClientRect().top < window.innerHeight - 100) rev.classList.add('active');
        });
    }
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();

    // ==========================================
    // 7. Terminal Maximize / Restore Feature
    // ==========================================
    const terminalWindow = document.getElementById('terminal-window');
    const termMaxBtn = document.getElementById('term-max');
    const termCloseBtn = document.getElementById('term-close');

    if (terminalWindow) {
        if (termMaxBtn) {
            termMaxBtn.addEventListener('click', () => {
                terminalWindow.classList.add('maximized');
                if (termInput) termInput.focus(); 
                if (termBody) termBody.scrollTop = termBody.scrollHeight; 
            });
        }
        
        if (termCloseBtn) {
            termCloseBtn.addEventListener('click', () => {
                terminalWindow.classList.remove('maximized');
                if (termInput) termInput.focus();
            });
        }

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && terminalWindow.classList.contains('maximized')) {
                terminalWindow.classList.remove('maximized');
                if (termInput) termInput.focus();
            }
        });
    }

    // ==========================================
    // 8. Snarky AI Chatbot
    // ==========================================
    const chatToggle = document.getElementById('chat-toggle');
    const chatWidget = document.getElementById('chat-widget');
    const closeChat = document.getElementById('close-chat');
    const chatInput = document.getElementById('chat-input');
    const sendChat = document.getElementById('send-chat');
    const chatMessages = document.getElementById('chat-messages');

    if (chatToggle && chatWidget) {
        chatToggle.addEventListener('click', () => {
            chatWidget.classList.toggle('show');
            if (chatWidget.classList.contains('show')) chatInput.focus();
        });
        
        closeChat.addEventListener('click', () => chatWidget.classList.remove('show'));

        function appendMessage(text, type) {
            const msgDiv = document.createElement('div');
            msgDiv.className = `message ${type}-msg`;
            msgDiv.textContent = text;
            chatMessages.appendChild(msgDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }

        const snarkyResponses = [
            { keywords: ['price', 'cost', 'charge', 'rate', 'money', 'expensive'], reply: "He's basically priceless, but you can probably afford him if you email meid@gmail.com. Just don't lowball, I'm watching. 🤖" },
            { keywords: ['experience', 'work', 'job', 'hire'], reply: "He's been building scalable APIs, AI Agents, and Shopify stores. He founded o1x and survived CS50. What more do you want?" },
            { keywords: ['skill', 'stack', 'tech', 'language'], reply: "Python, FastAPI, JS, Vector DBs, AI Agents. Basically, he talks to machines better than he talks to humans." },
            { keywords: ['hello', 'hi', 'hey', 'sup'], reply: "Hello human. I am the snarky AI. Ask me about Mohamed's resume or I'm going back to sleep." },
            { keywords: ['joke', 'funny'], reply: "Why do programmers prefer dark mode? Because light attracts bugs. ...Okay, Mohamed wrote that joke, don't blame me." },
            { keywords: ['contact', 'email', 'phone'], reply: "You can reach him at meid@gmail.com or +20 100 211 9691. Tell him his AI sent you." },
        ];

        function getBotResponse(input) {
            let lowerInput = input.toLowerCase();
            for (let item of snarkyResponses) {
                if (item.keywords.some(kw => lowerInput.includes(kw))) {
                    return item.reply;
                }
            }
            const fallbacks = [
                "I have no idea what you just said. Try asking about his 'skills' or 'experience'.",
                "Does not compute. Ask me about Mohamed's pricing instead.",
                "I'm just a simple regex bot disguised as AI. Please use simpler words like 'contact' or 'hire'."
            ];
            return fallbacks[Math.floor(Math.random() * fallbacks.length)];
        }

        function handleChatSubmit() {
            const text = chatInput.value.trim();
            if (!text) return;
            appendMessage(text, 'user');
            chatInput.value = '';

            // Simulated typing delay
            const typingId = 'typing-' + Date.now();
            setTimeout(() => {
                const typingMsg = document.createElement('div');
                typingMsg.className = 'message bot-msg';
                typingMsg.id = typingId;
                typingMsg.innerHTML = '<i class="fas fa-ellipsis-h" style="animation: blink 1s infinite;"></i>';
                chatMessages.appendChild(typingMsg);
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }, 300);

            setTimeout(() => {
                const typingMsg = document.getElementById(typingId);
                if (typingMsg) typingMsg.remove();
                appendMessage(getBotResponse(text), 'bot');
            }, 1200 + Math.random() * 800);
        }

        sendChat.addEventListener('click', handleChatSubmit);
        chatInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') handleChatSubmit();
        });
    }

    // ==========================================
    // 9. Flashlight Cursor Logic
    // ==========================================
    const cursorDot = document.getElementById('cursor-dot');
    const flashlight = document.getElementById('flashlight-cursor');
    
    if (cursorDot && flashlight && window.matchMedia("(pointer: fine)").matches) {
        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;
        let flashX = mouseX;
        let flashY = mouseY;
        
        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            cursorDot.style.left = `${mouseX}px`;
            cursorDot.style.top = `${mouseY}px`;
        });
        
        function animateFlashlight() {
            flashX += (mouseX - flashX) * 0.15; // Smooth trailing physics
            flashY += (mouseY - flashY) * 0.15;
            flashlight.style.left = `${flashX}px`;
            flashlight.style.top = `${flashY}px`;
            requestAnimationFrame(animateFlashlight);
        }
        animateFlashlight();
        
        const interactables = document.querySelectorAll('a, button, input, textarea, .contact-card, .btn');
        interactables.forEach(el => {
            el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
            el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
        });
    }

    // ==========================================
    // 10. Konami Code (Retro Mode)
    // ==========================================
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;
    
    document.addEventListener('keydown', (e) => {
        if (e.key.toLowerCase() === konamiCode[konamiIndex].toLowerCase()) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                document.body.classList.toggle('retro-mode');
                konamiIndex = 0;
                
                // Show brief notification
                const notif = document.createElement('div');
                notif.textContent = "RETRO MODE ACTIVATED";
                notif.style.cssText = "position:fixed; top:20px; left:50%; transform:translateX(-50%); background:#0f0; color:#000; padding:10px 20px; font-family:monospace; font-weight:bold; z-index:10000; font-size:24px;";
                document.body.appendChild(notif);
                setTimeout(() => notif.remove(), 2000);
            }
        } else {
            konamiIndex = 0;
        }
    });

    // ==========================================
    // 11. Gravity Fall (Do Not Click)
    // ==========================================
    const dangerBtn = document.getElementById('danger-btn');
    if (dangerBtn) {
        dangerBtn.addEventListener('mouseenter', () => {
            dangerBtn.style.opacity = '1';
            dangerBtn.style.boxShadow = '0 0 10px rgba(255, 95, 86, 0.6)';
        });
        dangerBtn.addEventListener('mouseleave', () => {
            dangerBtn.style.opacity = '0.4';
            dangerBtn.style.boxShadow = 'none';
        });
        
        dangerBtn.addEventListener('click', () => {
            if (window.gravityActive) return;
            window.gravityActive = true;
            
            // Show alert
            const alertBox = document.createElement('div');
            alertBox.textContent = "WARNING: GRAVITY INTEGRITY COMPROMISED";
            alertBox.style.cssText = "position:fixed; top:40%; left:50%; transform:translate(-50%, -50%); background:#ff5f56; color:#fff; padding:20px 40px; font-family:monospace; font-weight:bold; z-index:99999; font-size:clamp(16px, 4vw, 30px); box-shadow: 0 0 50px #ff5f56; text-align: center; border-radius: 8px;";
            document.body.appendChild(alertBox);
            
            setTimeout(() => {
                alertBox.remove();
                startGravityFall();
            }, 2000);
        });

        function startGravityFall() {
            const blocks = document.querySelectorAll('.card, .skill-card, .contact-card, .terminal-window, .section-title, h1, h2, p, .logo');
            
            let physicsBodies = [];
            blocks.forEach(el => {
                const rect = el.getBoundingClientRect();
                physicsBodies.push({
                    el: el,
                    x: rect.left,
                    y: rect.top,
                    vx: (Math.random() - 0.5) * 15, // horizontal velocity
                    vy: (Math.random() - 0.5) * 5,  // initial vertical velocity
                    rotation: 0,
                    vr: (Math.random() - 0.5) * 12, // angular velocity
                    width: rect.width,
                    height: rect.height
                });
                
                // Detach from layout flow
                el.style.position = 'fixed';
                el.style.left = rect.left + 'px';
                el.style.top = rect.top + 'px';
                el.style.margin = '0';
                el.style.width = rect.width + 'px';
                el.style.height = rect.height + 'px';
                el.style.zIndex = '9000';
                el.style.transition = 'none'; // Disable CSS transitions for physics
            });
            
            document.body.style.overflow = 'hidden';
            
            const gravity = 0.6;
            const bounce = -0.5;
            
            function physicsLoop() {
                const floorY = window.innerHeight;
                physicsBodies.forEach(b => {
                    b.vy += gravity;
                    b.x += b.vx;
                    b.y += b.vy;
                    b.rotation += b.vr;
                    
                    // Floor collision
                    if (b.y + b.height > floorY) {
                        b.y = floorY - b.height;
                        b.vy *= bounce;
                        b.vx *= 0.8; // friction
                        b.vr *= 0.8; // friction
                    }
                    // Wall collision
                    if (b.x < 0) {
                        b.x = 0;
                        b.vx *= bounce;
                    } else if (b.x + b.width > window.innerWidth) {
                        b.x = window.innerWidth - b.width;
                        b.vx *= bounce;
                    }
                    
                    b.el.style.left = b.x + 'px';
                    b.el.style.top = b.y + 'px';
                    b.el.style.transform = `rotate(${b.rotation}deg)`;
                });
                requestAnimationFrame(physicsLoop);
            }
            physicsLoop();
        }
    }
});