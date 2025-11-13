# Quiz Application

A full-stack trivia quiz application with a React frontend, Node.js/Express backend, and PostgreSQL database.

## Architecture Overview

The application consists of three main components:

1. **Frontend**: React-based single-page application served by Nginx
2. **Backend**: Express.js REST API server
3. **Database**: PostgreSQL database for storing categories, questions, and scores

## Features

- Multiple quiz categories (Science, History, Technology, Sports, Movies)
- 10 questions per category
- Real-time scoring
- Results screen with answer review
- REST API for quiz data
- Optional score tracking (future feature)
- Containerized deployment with Docker Compose

## Tech Stack

### Frontend
- React 19.2.0
- React Scripts 5.0.1
- CSS3

### Backend
- Node.js 18
- Express.js 4.18
- PostgreSQL (node-postgres)
- CORS enabled
- Environment-based configuration

### Database
- PostgreSQL 15 Alpine

## Project Structure

```
.
├── frontend/                  # React frontend application
│   ├── public/               # Static assets
│   ├── src/
│   │   ├── components/       # React components
│   │   ├── Styles/          # CSS styles
│   │   ├── App.js           # Main application component
│   │   ├── mockData.js      # Fallback data
│   │   └── index.js         # Entry point
│   ├── Dockerfile           # Frontend container configuration
│   ├── nginx.conf           # Nginx server configuration
│   └── package.json         # Frontend dependencies
│
├── backend/                  # Express backend API
│   ├── db/
│   │   ├── connection.js    # Database connection logic
│   │   └── init.sql         # Database schema and seed data
│   ├── routes/
│   │   ├── categories.js    # Category endpoints
│   │   ├── questions.js     # Question endpoints
│   │   └── scores.js        # Score endpoints
│   ├── server.js            # Express server entry point
│   ├── Dockerfile           # Backend container configuration
│   └── package.json         # Backend dependencies
│
├── docker-compose.yml        # Multi-container orchestration
└── README.md                # This file
```

## API Endpoints

### Categories
- `GET /api/categories` - Get all available quiz categories

### Questions
- `GET /api/questions/:category` - Get all questions for a specific category
- `GET /api/questions/:category/random?limit=10` - Get random questions from a category

### Scores (Optional)
- `POST /api/scores` - Save quiz results
- `GET /api/scores/top?limit=10` - Get top scores

## Setup Instructions

### Prerequisites
- Docker and Docker Compose installed
- Git

### Quick Start with Docker Compose

1. Clone the repository:
```bash
git clone <repository-url>
cd final1
```

2. Start all services:
```bash
docker-compose up --build
```

3. Access the application:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000
   - Database: localhost:5432

4. Stop all services:
```bash
docker-compose down
```

5. Remove all data (including database volume):
```bash
docker-compose down -v
```

### Local Development Setup

#### Backend Development

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file from example:
```bash
cp .env.example .env
```

4. Start PostgreSQL (if not using Docker):
```bash
# Using Docker for database only
docker run -d \
  --name quiz-postgres \
  -e POSTGRES_USER=quizuser \
  -e POSTGRES_PASSWORD=quizpass \
  -e POSTGRES_DB=quizdb \
  -p 5432:5432 \
  -v $(pwd)/db/init.sql:/docker-entrypoint-initdb.d/init.sql \
  postgres:15-alpine
```

5. Start the backend server:
```bash
npm start
# or for development with auto-reload
npm run dev
```

#### Frontend Development

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
cp .env.example .env
```

4. Start the development server:
```bash
npm start
```

5. Run tests:
```bash
npm test
```

6. Build for production:
```bash
npm run build
```

## Environment Variables

### Backend (.env)
```
PORT=5000
DATABASE_URL=postgresql://quizuser:quizpass@localhost:5432/quizdb
NODE_ENV=development
```

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:5000
```

## Database Schema

### Categories Table
```sql
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Questions Table
```sql
CREATE TABLE questions (
    id SERIAL PRIMARY KEY,
    category_id INTEGER REFERENCES categories(id) ON DELETE CASCADE,
    question TEXT NOT NULL,
    options JSONB NOT NULL,
    correct_answer VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Scores Table
```sql
CREATE TABLE scores (
    id SERIAL PRIMARY KEY,
    category VARCHAR(100) NOT NULL,
    score INTEGER NOT NULL,
    total_questions INTEGER NOT NULL,
    player_name VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Docker Commands

### Build and Start All Services
```bash
docker-compose up --build
```

### Start Services in Detached Mode
```bash
docker-compose up -d
```

### View Logs
```bash
docker-compose logs -f
docker-compose logs -f backend  # Backend only
docker-compose logs -f frontend # Frontend only
docker-compose logs -f db       # Database only
```

### Stop Services
```bash
docker-compose stop
```

### Remove Services and Volumes
```bash
docker-compose down -v
```

### Rebuild a Specific Service
```bash
docker-compose build backend
docker-compose up -d backend
```

## Development Notes

### API Fallback
The frontend is designed to work with or without the backend API:
- If the API is available, it fetches data from the database
- If the API is unavailable, it falls back to mock data in `mockData.js`

### CORS Configuration
The backend is configured to allow requests from any origin. In production, update the CORS settings to only allow specific origins.

### Database Connection
The backend implements retry logic to wait for the database to be ready, which is essential in a Docker Compose environment where services start simultaneously.

### Security
- Use environment variables for sensitive data
- Never commit `.env` files to version control
- Update default credentials in production
- Implement proper input validation and sanitization
- Use parameterized queries to prevent SQL injection

## Troubleshooting

### Database Connection Issues
If the backend can't connect to the database:
```bash
# Check if database is running
docker-compose ps

# Check database logs
docker-compose logs db

# Restart services
docker-compose restart
```

### Port Already in Use
If ports 3000, 5000, or 5432 are already in use, you can modify them in `docker-compose.yml`.

### Frontend Not Connecting to Backend
1. Verify the backend is running: http://localhost:5000/health
2. Check the `REACT_APP_API_URL` environment variable
3. Rebuild the frontend if environment variables changed

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the ISC License.
