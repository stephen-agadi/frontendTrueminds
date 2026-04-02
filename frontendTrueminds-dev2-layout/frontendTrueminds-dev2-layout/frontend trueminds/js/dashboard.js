
        // Mock API Functions
        const API = {
            getUser: () => {
                return new Promise((resolve) => {
                    setTimeout(() => {
                        resolve({
                            name: 'Mark Johnson',
                            email: 'mark.j@example.com',
                            avatar: 'MK',
                            role: 'Student'
                        });
                    }, 500);
                });
            },

            getCourseProgress: () => {
                return new Promise((resolve) => {
                    setTimeout(() => {
                        resolve([
                            {
                                id: 1,
                                name: 'Advanced Web Development',
                                progress: 75,
                                status: 'in-progress',
                                thumbnail: '🌐',
                                lastAccessed: '2 hours ago'
                            },
                            {
                                id: 2,
                                name: 'UI/UX Design Fundamentals',
                                progress: 45,
                                status: 'in-progress',
                                thumbnail: '🎨',
                                lastAccessed: '1 day ago'
                            },
                            {
                                id: 3,
                                name: 'Data Science with Python',
                                progress: 90,
                                status: 'in-progress',
                                thumbnail: '📊',
                                lastAccessed: '3 days ago'
                            },
                            {
                                id: 4,
                                name: 'Mobile App Development',
                                progress: 20,
                                status: 'pending',
                                thumbnail: '📱',
                                lastAccessed: '1 week ago'
                            }
                        ]);
                    }, 600);
                });
            },

            getUpcomingTasks: () => {
                return new Promise((resolve) => {
                    setTimeout(() => {
                        resolve([
                            {
                                id: 1,
                                title: 'JavaScript Assignment Due',
                                course: 'Advanced Web Development',
                                dueDate: '2026-04-03',
                                priority: 'high'
                            },
                            {
                                id: 2,
                                title: 'React Project Submission',
                                course: 'Frontend Frameworks',
                                dueDate: '2026-04-05',
                                priority: 'medium'
                            },
                            {
                                id: 3,
                                title: 'Database Design Quiz',
                                course: 'Backend Development',
                                dueDate: '2026-04-07',
                                priority: 'low'
                            }
                        ]);
                    }, 700);
                });
            }
        };

        // Render Functions
        function renderCourses(courses) {
            const container = document.getElementById('coursesList');
            container.innerHTML = courses.map(course => `
                <div class="course-item">
                    <div class="course-thumbnail">${course.thumbnail}</div>
                    <div class="course-details">
                        <div class="course-name">${course.name}</div>
                        <div class="course-meta">
                            <span class="status-badge badge-${course.status}">${course.status.replace('-', ' ')}</span>
                            <span>${course.progress}% complete</span>
                            <span>•</span>
                            <span>${course.lastAccessed}</span>
                        </div>
                    </div>
                    <button class="continue-btn">Continue</button>
                </div>
            `).join('');
        }

        function renderEvents(tasks) {
            const container = document.getElementById('eventsList');
            const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

            // Convert tasks to events
            const events = tasks.map((task, index) => {
                const date = new Date(task.dueDate);
                return {
                    day: date.getDate(),
                    month: months[date.getMonth()],
                    title: task.title,
                    time: '11:59 PM',
                    type: 'Deadline'
                };
            });

            // Add some additional events
            events.push(
                { day: 5, month: 'Apr', title: 'Live Workshop: React Hooks', time: '2:00 PM', type: 'Workshop' },
                { day: 8, month: 'Apr', title: 'Group Study Session', time: '4:00 PM', type: 'Meeting' }
            );

            container.innerHTML = events.map(event => `
                <div class="event-item">
                    <div class="event-date">
                        <span class="event-day">${event.day}</span>
                        <span class="event-month">${event.month}</span>
                    </div>
                    <div class="event-details">
                        <h4>${event.title}</h4>
                        <div class="event-time">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="12" cy="12" r="10"></circle>
                                <polyline points="12 6 12 12 16 14"></polyline>
                            </svg>
                            ${event.time} • ${event.type}
                        </div>
                    </div>
                </div>
            `).join('');
        }

        // Initialize Dashboard
        async function initDashboard() {
            try {
                // Show loading state
                document.getElementById('coursesList').innerHTML = '<div class="skeleton" style="height: 80px;"></div>'.repeat(3);
                document.getElementById('eventsList').innerHTML = '<div class="skeleton" style="height: 60px;"></div>'.repeat(4);

                // Fetch data
                const [user, courses, tasks] = await Promise.all([
                    API.getUser(),
                    API.getCourseProgress(),
                    API.getUpcomingTasks()
                ]);

                // Render data
                renderCourses(courses);
                renderEvents(tasks);

                // Animate progress circle
                setTimeout(() => {
                    const progressBar = document.querySelector('.progress-bar');
                    progressBar.style.strokeDashoffset = '92.4';
                }, 300);

            } catch (error) {
                console.error('Error loading dashboard:', error);
            }
        }

        // Event Listeners
        document.addEventListener('DOMContentLoaded', initDashboard);

        // Add click handlers for buttons
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('continue-btn')) {
                const courseName = e.target.closest('.course-item').querySelector('.course-name').textContent;
                showNotification(`Continuing ${courseName}...`);
            }
        });

        // Notification helper
        function showNotification(message) {
            const notification = document.createElement('div');
            notification.style.cssText = `
                position: fixed;
                bottom: 20px;
                right: 20px;
                background: var(--dark-navy);
                color: white;
                padding: 1rem 1.5rem;
                border-radius: 12px;
                box-shadow: 0 10px 25px rgba(0,0,0,0.2);
                z-index: 1000;
                font-weight: 500;
                animation: slideIn 0.3s ease;
            `;
            notification.textContent = message;
            document.body.appendChild(notification);

            setTimeout(() => {
                notification.style.animation = 'slideOut 0.3s ease';
                setTimeout(() => notification.remove(), 300);
            }, 3000);
        }

        // Add animation keyframes dynamically
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(style);