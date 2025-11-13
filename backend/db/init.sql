-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create questions table
CREATE TABLE IF NOT EXISTS questions (
    id SERIAL PRIMARY KEY,
    category_id INTEGER REFERENCES categories(id) ON DELETE CASCADE,
    question TEXT NOT NULL,
    options JSONB NOT NULL,
    correct_answer VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create scores table (optional for future use)
CREATE TABLE IF NOT EXISTS scores (
    id SERIAL PRIMARY KEY,
    category VARCHAR(100) NOT NULL,
    score INTEGER NOT NULL,
    total_questions INTEGER NOT NULL,
    player_name VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert categories
INSERT INTO categories (name) VALUES 
    ('Science'),
    ('History'),
    ('Technology'),
    ('Sports'),
    ('Movies')
ON CONFLICT (name) DO NOTHING;

-- Insert Science questions
INSERT INTO questions (category_id, question, options, correct_answer) VALUES
    ((SELECT id FROM categories WHERE name = 'Science'), 'What is the chemical symbol for gold?', '["Go", "Au", "Gd", "Ag"]', 'Au'),
    ((SELECT id FROM categories WHERE name = 'Science'), 'What planet is known as the Red Planet?', '["Venus", "Jupiter", "Mars", "Saturn"]', 'Mars'),
    ((SELECT id FROM categories WHERE name = 'Science'), 'What is the speed of light?', '["300,000 km/s", "150,000 km/s", "450,000 km/s", "600,000 km/s"]', '300,000 km/s'),
    ((SELECT id FROM categories WHERE name = 'Science'), 'How many bones are in the human body?', '["206", "205", "208", "210"]', '206'),
    ((SELECT id FROM categories WHERE name = 'Science'), 'What is H2O commonly known as?', '["Oxygen", "Hydrogen", "Water", "Carbon Dioxide"]', 'Water'),
    ((SELECT id FROM categories WHERE name = 'Science'), 'What is the hardest natural substance?', '["Gold", "Iron", "Diamond", "Titanium"]', 'Diamond'),
    ((SELECT id FROM categories WHERE name = 'Science'), 'What gas do plants absorb from the atmosphere?', '["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"]', 'Carbon Dioxide'),
    ((SELECT id FROM categories WHERE name = 'Science'), 'What is the powerhouse of the cell?', '["Nucleus", "Mitochondria", "Ribosome", "Chloroplast"]', 'Mitochondria'),
    ((SELECT id FROM categories WHERE name = 'Science'), 'What force keeps us on the ground?', '["Magnetism", "Gravity", "Friction", "Inertia"]', 'Gravity'),
    ((SELECT id FROM categories WHERE name = 'Science'), 'What is the largest organ in the human body?', '["Heart", "Brain", "Liver", "Skin"]', 'Skin');

-- Insert History questions
INSERT INTO questions (category_id, question, options, correct_answer) VALUES
    ((SELECT id FROM categories WHERE name = 'History'), 'Who was the first President of the United States?', '["Thomas Jefferson", "George Washington", "Abraham Lincoln", "John Adams"]', 'George Washington'),
    ((SELECT id FROM categories WHERE name = 'History'), 'In what year did World War II end?', '["1943", "1944", "1945", "1946"]', '1945'),
    ((SELECT id FROM categories WHERE name = 'History'), 'Who discovered America?', '["Christopher Columbus", "Amerigo Vespucci", "Leif Erikson", "Marco Polo"]', 'Christopher Columbus'),
    ((SELECT id FROM categories WHERE name = 'History'), 'What year did the Berlin Wall fall?', '["1987", "1989", "1991", "1993"]', '1989'),
    ((SELECT id FROM categories WHERE name = 'History'), 'Who was the first person to walk on the moon?', '["Buzz Aldrin", "Neil Armstrong", "Yuri Gagarin", "John Glenn"]', 'Neil Armstrong'),
    ((SELECT id FROM categories WHERE name = 'History'), 'What ancient wonder was located in Egypt?', '["Colossus of Rhodes", "Hanging Gardens", "Great Pyramid", "Lighthouse of Alexandria"]', 'Great Pyramid'),
    ((SELECT id FROM categories WHERE name = 'History'), 'Who painted the Mona Lisa?', '["Michelangelo", "Leonardo da Vinci", "Raphael", "Donatello"]', 'Leonardo da Vinci'),
    ((SELECT id FROM categories WHERE name = 'History'), 'What year was the Declaration of Independence signed?', '["1774", "1775", "1776", "1777"]', '1776'),
    ((SELECT id FROM categories WHERE name = 'History'), 'Who was the first female Prime Minister of the UK?', '["Margaret Thatcher", "Theresa May", "Queen Elizabeth", "Angela Merkel"]', 'Margaret Thatcher'),
    ((SELECT id FROM categories WHERE name = 'History'), 'What empire was ruled by Julius Caesar?', '["Greek Empire", "Roman Empire", "Persian Empire", "Byzantine Empire"]', 'Roman Empire');

-- Insert Technology questions
INSERT INTO questions (category_id, question, options, correct_answer) VALUES
    ((SELECT id FROM categories WHERE name = 'Technology'), 'What does CPU stand for?', '["Central Processing Unit", "Computer Personal Unit", "Central Processor Union", "Core Processing Unit"]', 'Central Processing Unit'),
    ((SELECT id FROM categories WHERE name = 'Technology'), 'Who founded Microsoft?', '["Steve Jobs", "Bill Gates", "Mark Zuckerberg", "Elon Musk"]', 'Bill Gates'),
    ((SELECT id FROM categories WHERE name = 'Technology'), 'What does HTML stand for?', '["HyperText Markup Language", "HighText Machine Language", "HyperTransfer Markup Language", "Home Tool Markup Language"]', 'HyperText Markup Language'),
    ((SELECT id FROM categories WHERE name = 'Technology'), 'What year was the first iPhone released?', '["2005", "2006", "2007", "2008"]', '2007'),
    ((SELECT id FROM categories WHERE name = 'Technology'), 'What does URL stand for?', '["Uniform Resource Locator", "Universal Resource Link", "Uniform Retrieval Locator", "Universal Reference Link"]', 'Uniform Resource Locator'),
    ((SELECT id FROM categories WHERE name = 'Technology'), 'Who is the CEO of Tesla?', '["Jeff Bezos", "Elon Musk", "Tim Cook", "Sundar Pichai"]', 'Elon Musk'),
    ((SELECT id FROM categories WHERE name = 'Technology'), 'What does RAM stand for?', '["Random Access Memory", "Read Access Memory", "Rapid Access Memory", "Runtime Application Memory"]', 'Random Access Memory'),
    ((SELECT id FROM categories WHERE name = 'Technology'), 'Which programming language is known for web development?', '["Python", "Java", "JavaScript", "C++"]', 'JavaScript'),
    ((SELECT id FROM categories WHERE name = 'Technology'), 'What does AI stand for?', '["Automated Intelligence", "Artificial Intelligence", "Advanced Intelligence", "Applied Intelligence"]', 'Artificial Intelligence'),
    ((SELECT id FROM categories WHERE name = 'Technology'), 'What company developed the Android OS?', '["Apple", "Microsoft", "Google", "Samsung"]', 'Google');

-- Insert Sports questions
INSERT INTO questions (category_id, question, options, correct_answer) VALUES
    ((SELECT id FROM categories WHERE name = 'Sports'), 'How many players are on a soccer team?', '["9", "10", "11", "12"]', '11'),
    ((SELECT id FROM categories WHERE name = 'Sports'), 'What sport is known as ''The Beautiful Game''?', '["Basketball", "Baseball", "Soccer", "Tennis"]', 'Soccer'),
    ((SELECT id FROM categories WHERE name = 'Sports'), 'How many rings are in the Olympic logo?', '["4", "5", "6", "7"]', '5'),
    ((SELECT id FROM categories WHERE name = 'Sports'), 'In what sport would you perform a slam dunk?', '["Volleyball", "Basketball", "Tennis", "Football"]', 'Basketball'),
    ((SELECT id FROM categories WHERE name = 'Sports'), 'What is the diameter of a basketball hoop in inches?', '["16", "17", "18", "19"]', '18'),
    ((SELECT id FROM categories WHERE name = 'Sports'), 'How many Grand Slam tournaments are there in tennis?', '["3", "4", "5", "6"]', '4'),
    ((SELECT id FROM categories WHERE name = 'Sports'), 'What country won the first FIFA World Cup?', '["Brazil", "Argentina", "Uruguay", "Germany"]', 'Uruguay'),
    ((SELECT id FROM categories WHERE name = 'Sports'), 'How many points is a touchdown worth in American football?', '["5", "6", "7", "8"]', '6'),
    ((SELECT id FROM categories WHERE name = 'Sports'), 'What is the maximum score in a single frame of bowling?', '["200", "250", "300", "350"]', '300'),
    ((SELECT id FROM categories WHERE name = 'Sports'), 'In which sport do you use a puck?', '["Soccer", "Hockey", "Rugby", "Cricket"]', 'Hockey');

-- Insert Movies questions
INSERT INTO questions (category_id, question, options, correct_answer) VALUES
    ((SELECT id FROM categories WHERE name = 'Movies'), 'Who directed Jurassic Park?', '["James Cameron", "Steven Spielberg", "George Lucas", "Peter Jackson"]', 'Steven Spielberg'),
    ((SELECT id FROM categories WHERE name = 'Movies'), 'What year was the first Toy Story movie released?', '["1993", "1995", "1997", "1999"]', '1995'),
    ((SELECT id FROM categories WHERE name = 'Movies'), 'What is the highest-grossing film of all time?', '["Titanic", "Avatar", "Avengers: Endgame", "Star Wars"]', 'Avatar'),
    ((SELECT id FROM categories WHERE name = 'Movies'), 'Who played Iron Man in the Marvel Cinematic Universe?', '["Chris Evans", "Robert Downey Jr.", "Chris Hemsworth", "Mark Ruffalo"]', 'Robert Downey Jr.'),
    ((SELECT id FROM categories WHERE name = 'Movies'), 'What movie features the quote ''I''ll be back''?', '["Die Hard", "Terminator", "Predator", "RoboCop"]', 'Terminator'),
    ((SELECT id FROM categories WHERE name = 'Movies'), 'Who won the Academy Award for Best Actor in 2020?', '["Leonardo DiCaprio", "Joaquin Phoenix", "Brad Pitt", "Adam Driver"]', 'Joaquin Phoenix'),
    ((SELECT id FROM categories WHERE name = 'Movies'), 'What is the name of the fictional African country in Black Panther?', '["Wakanda", "Zamunda", "Genovia", "Latveria"]', 'Wakanda'),
    ((SELECT id FROM categories WHERE name = 'Movies'), 'Which movie won Best Picture at the 2020 Oscars?', '["1917", "Joker", "Parasite", "Once Upon a Time in Hollywood"]', 'Parasite'),
    ((SELECT id FROM categories WHERE name = 'Movies'), 'What is the name of Harry Potter''s owl?', '["Hedwig", "Errol", "Pigwidgeon", "Crookshanks"]', 'Hedwig'),
    ((SELECT id FROM categories WHERE name = 'Movies'), 'Who directed The Dark Knight?', '["Zack Snyder", "Christopher Nolan", "Tim Burton", "Joel Schumacher"]', 'Christopher Nolan');
