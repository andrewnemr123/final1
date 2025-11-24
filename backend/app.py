import os
from flask import Flask, jsonify, request
from flask_cors import CORS
import random
from pymongo import MongoClient


app = Flask(__name__)

# Configure CORS to allow requests from React frontend
CORS(app)

#get user data from mongo database
DB_URL = os.getenv("DB_URL", "mongodb://mongo:27017/final_project")
client = MongoClient(DB_URL)

try:
    db = client.get_default_database()
except Exception:
    # fallback
    db = client['final_project']
users = db.get_collection("users")

# Trivia questions database
QUESTIONS_DB = {
    'Science': [
        {
            'question': 'What is the chemical symbol for gold?',
            'answers': ['Go', 'Au', 'Gd', 'Ag'],
            'correct_answer': 'Au'
        },
        {
            'question': 'What planet is known as the Red Planet?',
            'answers': ['Venus', 'Jupiter', 'Mars', 'Saturn'],
            'correct_answer': 'Mars'
        },
        {
            'question': 'What is the speed of light?',
            'answers': ['300,000 km/s', '150,000 km/s', '450,000 km/s', '600,000 km/s'],
            'correct_answer': '300,000 km/s'
        },
        {
            'question': 'How many bones are in the human body?',
            'answers': ['206', '205', '208', '210'],
            'correct_answer': '206'
        },
        {
            'question': 'What is H2O commonly known as?',
            'answers': ['Oxygen', 'Hydrogen', 'Water', 'Carbon Dioxide'],
            'correct_answer': 'Water'
        },
        {
            'question': 'What is the hardest natural substance?',
            'answers': ['Gold', 'Iron', 'Diamond', 'Titanium'],
            'correct_answer': 'Diamond'
        },
        {
            'question': 'What gas do plants absorb from the atmosphere?',
            'answers': ['Oxygen', 'Nitrogen', 'Carbon Dioxide', 'Hydrogen'],
            'correct_answer': 'Carbon Dioxide'
        },
        {
            'question': 'What is the powerhouse of the cell?',
            'answers': ['Nucleus', 'Mitochondria', 'Ribosome', 'Chloroplast'],
            'correct_answer': 'Mitochondria'
        },
        {
            'question': 'What force keeps us on the ground?',
            'answers': ['Magnetism', 'Gravity', 'Friction', 'Inertia'],
            'correct_answer': 'Gravity'
        },
        {
            'question': 'What is the largest organ in the human body?',
            'answers': ['Heart', 'Brain', 'Liver', 'Skin'],
            'correct_answer': 'Skin'
        }
    ],

    'History': [
        {
            'question': 'Who was the first President of the United States?',
            'answers': ['Thomas Jefferson', 'George Washington', 'Abraham Lincoln', 'John Adams'],
            'correct_answer': 'George Washington'
        },
        {
            'question': 'In what year did World War II end?',
            'answers': ['1943', '1944', '1945', '1946'],
            'correct_answer': '1945'
        },
        {
            'question': 'Who discovered America?',
            'answers': ['Christopher Columbus', 'Amerigo Vespucci', 'Leif Erikson', 'Marco Polo'],
            'correct_answer': 'Christopher Columbus'
        },
        {
            'question': 'What year did the Berlin Wall fall?',
            'answers': ['1987', '1989', '1991', '1993'],
            'correct_answer': '1989'
        },
        {
            'question': 'Who was the first person to walk on the moon?',
            'answers': ['Buzz Aldrin', 'Neil Armstrong', 'Yuri Gagarin', 'John Glenn'],
            'correct_answer': 'Neil Armstrong'
        },
        {
            'question': 'What ancient wonder was located in Egypt?',
            'answers': ['Colossus of Rhodes', 'Hanging Gardens', 'Great Pyramid', 'Lighthouse of Alexandria'],
            'correct_answer': 'Great Pyramid'
        },
        {
            'question': 'Who painted the Mona Lisa?',
            'answers': ['Michelangelo', 'Leonardo da Vinci', 'Raphael', 'Donatello'],
            'correct_answer': 'Leonardo da Vinci'
        },
        {
            'question': 'What year was the Declaration of Independence signed?',
            'answers': ['1774', '1775', '1776', '1777'],
            'correct_answer': '1776'
        },
        {
            'question': 'Who was the first female Prime Minister of the UK?',
            'answers': ['Margaret Thatcher', 'Theresa May', 'Queen Elizabeth', 'Angela Merkel'],
            'correct_answer': 'Margaret Thatcher'
        },
        {
            'question': 'What empire was ruled by Julius Caesar?',
            'answers': ['Greek Empire', 'Roman Empire', 'Persian Empire', 'Byzantine Empire'],
            'correct_answer': 'Roman Empire'
        }
    ],

    'Technology': [
        {
            'question': 'What does CPU stand for?',
            'answers': ['Central Processing Unit', 'Computer Personal Unit', 'Central Processor Union', 'Core Processing Unit'],
            'correct_answer': 'Central Processing Unit'
        },
        {
            'question': 'Who founded Microsoft?',
            'answers': ['Steve Jobs', 'Bill Gates', 'Mark Zuckerberg', 'Elon Musk'],
            'correct_answer': 'Bill Gates'
        },
        {
            'question': 'What does HTML stand for?',
            'answers': ['HyperText Markup Language', 'HighText Machine Language', 'HyperTransfer Markup Language', 'Home Tool Markup Language'],
            'correct_answer': 'HyperText Markup Language'
        },
        {
            'question': 'What year was the first iPhone released?',
            'answers': ['2005', '2006', '2007', '2008'],
            'correct_answer': '2007'
        },
        {
            'question': 'What does URL stand for?',
            'answers': ['Uniform Resource Locator', 'Universal Resource Link', 'Uniform Retrieval Locator', 'Universal Reference Link'],
            'correct_answer': 'Uniform Resource Locator'
        },
        {
            'question': 'Who is the CEO of Tesla?',
            'answers': ['Jeff Bezos', 'Elon Musk', 'Tim Cook', 'Sundar Pichai'],
            'correct_answer': 'Elon Musk'
        },
        {
            'question': 'What does RAM stand for?',
            'answers': ['Random Access Memory', 'Read Access Memory', 'Rapid Access Memory', 'Runtime Application Memory'],
            'correct_answer': 'Random Access Memory'
        },
        {
            'question': 'Which programming language is known for web development?',
            'answers': ['Python', 'Java', 'JavaScript', 'C++'],
            'correct_answer': 'JavaScript'
        },
        {
            'question': 'What does AI stand for?',
            'answers': ['Automated Intelligence', 'Artificial Intelligence', 'Advanced Intelligence', 'Applied Intelligence'],
            'correct_answer': 'Artificial Intelligence'
        },
        {
            'question': 'What company developed the Android OS?',
            'answers': ['Apple', 'Microsoft', 'Google', 'Samsung'],
            'correct_answer': 'Google'
        }
    ],

    'Sports': [
        {
            'question': 'How many players are on a soccer team?',
            'answers': ['9', '10', '11', '12'],
            'correct_answer': '11'
        },
        {
            'question': 'What sport is known as \'The Beautiful Game\'?',
            'answers': ['Basketball', 'Baseball', 'Soccer', 'Tennis'],
            'correct_answer': 'Soccer'
        },
        {
            'question': 'How many rings are in the Olympic logo?',
            'answers': ['4', '5', '6', '7'],
            'correct_answer': '5'
        },
        {
            'question': 'In what sport would you perform a slam dunk?',
            'answers': ['Volleyball', 'Basketball', 'Tennis', 'Football'],
            'correct_answer': 'Basketball'
        },
        {
            'question': 'What is the diameter of a basketball hoop in inches?',
            'answers': ['16', '17', '18', '19'],
            'correct_answer': '18'
        },
        {
            'question': 'How many Grand Slam tournaments are there in tennis?',
            'answers': ['3', '4', '5', '6'],
            'correct_answer': '4'
        },
        {
            'question': 'What country won the first FIFA World Cup?',
            'answers': ['Brazil', 'Argentina', 'Uruguay', 'Germany'],
            'correct_answer': 'Uruguay'
        },
        {
            'question': 'How many points is a touchdown worth in American football?',
            'answers': ['5', '6', '7', '8'],
            'correct_answer': '6'
        },
        {
            'question': 'What is the maximum score in a single frame of bowling?',
            'answers': ['200', '250', '300', '350'],
            'correct_answer': '300'
        },
        {
            'question': 'In which sport do you use a puck?',
            'answers': ['Soccer', 'Hockey', 'Rugby', 'Cricket'],
            'correct_answer': 'Hockey'
        }
    ],

    'Movies': [
        {
            'question': 'Who directed Jurassic Park?',
            'answers': ['James Cameron', 'Steven Spielberg', 'George Lucas', 'Peter Jackson'],
            'correct_answer': 'Steven Spielberg'
        },
        {
            'question': 'What year was the first Toy Story movie released?',
            'answers': ['1993', '1995', '1997', '1999'],
            'correct_answer': '1995'
        },
        {
            'question': 'What is the highest-grossing film of all time?',
            'answers': ['Titanic', 'Avatar', 'Avengers: Endgame', 'Star Wars'],
            'correct_answer': 'Avatar'
        },
        {
            'question': 'Who played Iron Man in the Marvel Cinematic Universe?',
            'answers': ['Chris Evans', 'Robert Downey Jr.', 'Chris Hemsworth', 'Mark Ruffalo'],
            'correct_answer': 'Robert Downey Jr.'
        },
        {
            'question': 'What movie features the quote "I\'ll be back"?',
            'answers': ['Die Hard', 'Terminator', 'Predator', 'RoboCop'],
            'correct_answer': 'Terminator'
        },
        {
            'question': 'Who won the Academy Award for Best Actor in 2020?',
            'answers': ['Leonardo DiCaprio', 'Joaquin Phoenix', 'Brad Pitt', 'Adam Driver'],
            'correct_answer': 'Joaquin Phoenix'
        },
        {
            'question': 'What is the name of the fictional African country in Black Panther?',
            'answers': ['Wakanda', 'Zamunda', 'Genovia', 'Latveria'],
            'correct_answer': 'Wakanda'
        },
        {
            'question': 'Which movie won Best Picture at the 2020 Oscars?',
            'answers': ['1917', 'Joker', 'Parasite', 'Once Upon a Time in Hollywood'],
            'correct_answer': 'Parasite'
        },
        {
            'question': 'What is the name of Harry Potter\'s owl?',
            'answers': ['Hedwig', 'Errol', 'Pigwidgeon', 'Crookshanks'],
            'correct_answer': 'Hedwig'
        },
        {
            'question': 'Who directed The Dark Knight?',
            'answers': ['Zack Snyder', 'Christopher Nolan', 'Tim Burton', 'Joel Schumacher'],
            'correct_answer': 'Christopher Nolan'
        }
    ]
}



@app.route('/', methods=['GET'])
def home():
    """Health check endpoint"""
    return jsonify({'message': 'Trivia API is running!', 'status': 'ok'}), 200

@app.route('/api/categories', methods=['GET'])
def get_categories():
    """Get all available categories"""
    categories = list(QUESTIONS_DB.keys())
    return jsonify({'categories': categories}), 200

@app.route('/api/questions/<category>', methods=['GET'])
def get_questions(category):
    """Get questions for a specific category"""
    if category not in QUESTIONS_DB:
        return jsonify({'error': f'Category "{category}" not found'}), 404
    
    questions = QUESTIONS_DB[category]
    # Shuffle answers for each question
    shuffled_questions = []
    for q in questions:
        question_copy = q.copy()
        answers = question_copy['answers'].copy()
        random.shuffle(answers)
        question_copy['answers'] = answers
        shuffled_questions.append(question_copy)
    
    return jsonify({'category': category, 'questions': shuffled_questions}), 200

@app.route('/api/questions/<category>/random', methods=['GET'])
def get_random_questions(category):
    """Get random questions from a category"""
    count = request.args.get('count', default=5, type=int)
    
    if category not in QUESTIONS_DB:
        return jsonify({'error': f'Category "{category}" not found'}), 404
    
    questions = QUESTIONS_DB[category]
    selected_questions = random.sample(questions, min(count, len(questions)))
    
    # Shuffle answers
    shuffled_questions = []
    for q in selected_questions:
        question_copy = q.copy()
        answers = question_copy['answers'].copy()
        random.shuffle(answers)
        question_copy['answers'] = answers
        shuffled_questions.append(question_copy)
    
    return jsonify({'category': category, 'questions': shuffled_questions}), 200

@app.route('/api/validate', methods=['POST'])
def validate_answer():
    """Validate a user's answer"""
    data = request.get_json()
    
    if not data or 'question' not in data or 'answer' not in data:
        return jsonify({'error': 'Invalid request format'}), 400

    
    question_text = data['question']
    user_answer = data['answer']
    
    # Find the correct answer
    for category_questions in QUESTIONS_DB.values():
        for q in category_questions:
            if q['question'] == question_text:
                is_correct = user_answer == q['correct_answer']
                return jsonify({
                    'is_correct': is_correct,
                    'correct_answer': q['correct_answer']
                }), 200
    
    return jsonify({'error': 'Question not found'}), 404


#########################################################

# User registration and score management

# Register or get user
@app.route("/api/user", methods=["POST"])
def register_user():
    data = request.json or {}
    name = data.get("name")
    if not name:
        return jsonify({"error": "Name required"}), 400

    user = users.find_one({"name": name})

    if not user:
        user = {"name": name, "scores": {}}
        users.insert_one(user)

    return jsonify({'message':'user created','name': name}), 201

# Update score for a category
@app.route("/api/score", methods=["POST"])
def save_score():
    data = request.json or {}
    name = data.get("name")
    category = data.get("category")
    score = data.get("score")

    if not all([name, category, score is not None]):
        return jsonify({"error": "Missing name, category, or score"}), 400

    # ensure user exists, create if not
    users.update_one({'name': name}, {'$setOnInsert': {'scores': {}}}, upsert=True)

    # Only update if score is better
    user = users.find_one({"name": name}) or {"scores": {}}
    previous = user.get("scores", {}).get(category, 0)
    if score > previous:
        users.update_one(
            {"name": name},
            {"$set": {f"scores.{category}": score}}
        )

    return jsonify({"message": "Score saved"}), 200   


# Get leaderboard
@app.route("/api/leaderboard/<username>", methods=["GET"])
def leaderboard(username):
    user = users.find_one(
        {"name": username}, 
        {"_id": 0}
    )
    if not user:
        return jsonify({"error": "User not found"}), 404

    return jsonify(user), 200



if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)