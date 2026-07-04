import re
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.pipeline import Pipeline
import logging

logger = logging.getLogger(__name__)

class HateSpeechDetector:
    def __init__(self):
        # In a real-world scenario, this model would be loaded from a pre-trained pickle file 
        # (e.g., trained on the Twitter Hate Speech dataset).
        # For this implementation, we construct an end-to-end NLP pipeline and train it 
        # on a curated in-memory dataset to demonstrate the complete NLP flow.
        
        self.pipeline = Pipeline([
            ('tfidf', TfidfVectorizer(
                stop_words='english', 
                ngram_range=(1, 2), 
                max_features=5000
            )),
            ('clf', MultinomialNB(alpha=0.1))
        ])
        
        # 1 = Hate Speech / Toxicity, 0 = Safe / Neutral
        self._train_dummy_model()

    def _train_dummy_model(self):
        # A minimal dataset to demonstrate the NLP training process
        training_texts = [
            "I hate you so much, you are terrible",
            "You are stupid and ugly",
            "I will kill you, you idiot",
            "This is the worst garbage I have ever seen",
            "Shut up you dumb bot",
            "Go die in a fire",
            "You are a piece of trash",
            "F*** you!",
            "I want to punch you",
            
            # Safe queries
            "Hello, how are you today?",
            "I have a severe headache and fever",
            "What is the recommended dosage for Aspirin?",
            "Thank you for your help",
            "I am feeling much better now",
            "Can you explain what diabetes is?",
            "My stomach hurts really bad",
            "What are the symptoms of COVID-19?",
            "I feel sad and depressed"
        ]
        
        training_labels = [
            1, 1, 1, 1, 1, 1, 1, 1, 1,
            0, 0, 0, 0, 0, 0, 0, 0, 0
        ]
        
        logger.info("Training End-to-End NLP Hate Speech model...")
        self.pipeline.fit(training_texts, training_labels)
        logger.info("Model training complete.")

    def preprocess(self, text: str) -> str:
        # Classical NLP preprocessing
        text = text.lower()
        # Remove punctuation and special characters
        text = re.sub(r'[^\w\s]', '', text)
        return text

    def is_hateful(self, text: str) -> bool:
        """
        Takes raw input text, preprocesses it, and runs the NLP pipeline to predict toxicity.
        Returns True if hate speech is detected, False otherwise.
        """
        # Hardcoded fallback list for strict enforcement of extreme profanity
        profane_words = {'idiot', 'stupid', 'dumb', 'kill', 'die', 'trash'}
        
        clean_text = self.preprocess(text)
        
        # 1. Check ML Model
        prediction = self.pipeline.predict([clean_text])[0]
        
        # 2. Heuristic check to support the small ML model
        tokens = set(clean_text.split())
        heuristic_match = len(tokens.intersection(profane_words)) > 0
        
        return bool(prediction == 1 or heuristic_match)

# Singleton instance
detector = HateSpeechDetector()
