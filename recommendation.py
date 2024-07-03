import pandas as pd
from surprise import Dataset, Reader, SVD
from surprise.model_selection import train_test_split

# Sample data (user_id, item_id, rating)
data = {
    'user_id': [1, 1, 1, 2, 2, 3, 3, 3, 4, 4],
    'item_id': ['A', 'B', 'C', 'A', 'D', 'B', 'C', 'D', 'A', 'B'],
    'rating': [5, 3, 4, 3, 5, 4, 2, 4, 3, 5]
}

# Create a DataFrame
df = pd.DataFrame(data)

# Create a Surprise dataset
reader = Reader(rating_scale=(1, 5))
dataset = Dataset.load_from_df(df[['user_id', 'item_id', 'rating']], reader)

# Split the data into training and testing sets
trainset, testset = train_test_split(dataset, test_size=0.25, random_state=42)

# Use SVD algorithm
algo = SVD()

# Train the model
algo.fit(trainset)

# Make predictions
predictions = algo.test(testset)

# Function to get top N recommendations for a user
def get_top_n_recommendations(predictions, n=3):
    top_n = {}
    for uid, iid, true_r, est, _ in predictions:
        if uid not in top_n:
            top_n[uid] = []
        top_n[uid].append((iid, est))
    
    for uid, user_ratings in top_n.items():
        user_ratings.sort(key=lambda x: x[1], reverse=True)
        top_n[uid] = user_ratings[:n]
    
    return top_n

# Get top 3 recommendations for each user
top_n = get_top_n_recommendations(predictions, n=3)

# Print recommendations
for uid, user_ratings in top_n.items():
    print(f"Top 3 recommendations for user {uid}:")
    for iid, est in user_ratings:
        print(f"Item: {iid}, Estimated rating: {est:.2f}")
    print()