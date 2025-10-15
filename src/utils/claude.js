/**
 * Claude API Integration
 *
 * SETUP INSTRUCTIONS:
 * 1. Get your API key from: https://console.anthropic.com/
 * 2. Create a .env file in the project root
 * 3. Add: VITE_CLAUDE_API_KEY=your_api_key_here
 * 4. Restart the dev server
 *
 * IMPORTANT: Never commit your API key to version control!
 * The .env file should be in .gitignore
 */

const API_KEY = import.meta.env.VITE_CLAUDE_API_KEY;
const API_URL = 'https://api.anthropic.com/v1/messages';
const MODEL = 'claude-3-5-sonnet-20241022'; // Latest model

/**
 * Generate text using Claude API
 * @param {string} prompt - The prompt to send to Claude
 * @param {number} maxTokens - Maximum tokens to generate
 * @returns {Promise<string>} Generated text
 */
export const generateWithClaude = async (prompt, maxTokens = 200) => {
  console.log('API Key available:', !!API_KEY);
  console.log('API Key length:', API_KEY ? API_KEY.length : 0);
  
  if (!API_KEY) {
    console.warn('Claude API key not configured. Using fallback responses.');
    return getFallbackResponse(prompt);
  }

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: maxTokens,
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('API Error Response:', error);
      throw new Error(error.error?.message || 'API request failed');
    }

    const data = await response.json();
    console.log('API Success:', data);
    return data.content[0].text;
  } catch (error) {
    console.error('Error calling Claude API:', error);
    console.error('Error details:', error.message);
    return getFallbackResponse(prompt);
  }
};

/**
 * Generate a personalized daily greeting
 * @param {object} user - User data
 * @param {string} timeOfDay - morning/afternoon/evening
 * @returns {Promise<string>} Greeting message
 */
export const generateDailyGreeting = async (user, timeOfDay) => {
  const weather = getCurrentWeatherMood();
  const prompt = `Generate a warm, personalized fall-themed greeting for ${user.name}.
It's ${timeOfDay} and the weather feels ${weather}.
Their interests include: ${user.preferences?.activities?.join(', ') || 'cozy activities'}.
Make it feel like a friend checking in. 2-3 sentences max. Use their name naturally.
Keep it uplifting and autumn-themed.`;

  return generateWithClaude(prompt, 150);
};

/**
 * Generate a fall-themed affirmation
 * @param {string} userName - User's name
 * @returns {Promise<string>} Affirmation
 */
export const generateAffirmation = async (userName) => {
  const prompt = `Create an uplifting, fall-themed affirmation for ${userName}.
Make it personal, warm, and encouraging. One beautiful sentence that celebrates
the autumn season and personal growth. Use nature metaphors if appropriate.`;

  return generateWithClaude(prompt, 100);
};

/**
 * Generate activity suggestions based on mood
 * @param {string} mood - Current mood
 * @param {object} user - User preferences
 * @returns {Promise<string>} Activity suggestions
 */
export const generateActivitySuggestions = async (mood, user) => {
  const prompt = `${user.name} is feeling ${mood} today. Based on their love of ${user.preferences?.activities?.join(', ') || 'cozy fall activities'},
and their preference for ${user.preferences?.weather || 'autumn weather'} days as a ${user.preferences?.dayTime === 'morning' ? 'morning person' : user.preferences?.dayTime === 'night' ? 'night owl' : 'afternoon adventurer'},
suggest 3 specific, personalized autumn activities they might enjoy right now.

For each activity:
- Give it a creative name
- Describe why it suits their current mood (${mood})
- Add specific details that match their preferences
- Include a gentle encouragement

Make it feel like advice from a close friend who knows them well. Each suggestion should be 2-3 sentences.`;

  return generateWithClaude(prompt, 350);
};

/**
 * Generate a poetic reflection on a journal entry
 * @param {string} entry - User's journal entry
 * @returns {Promise<string>} Poetic reflection
 */
export const generateJournalReflection = async (entry) => {
  const prompt = `Read this autumn moment someone captured: "${entry}"

Write a beautiful, poetic reflection (4-6 lines) in the style of a short autumn poem.
Use vivid autumn imagery, metaphors, and sensory details.
Capture both the emotion and the season's essence.
Make it feel like a small work of art that honors their memory.
Format as a short poem with line breaks.`;

  return generateWithClaude(prompt, 200);
};

/**
 * Generate a personalized response to mood selection
 * @param {string} mood - Selected mood
 * @param {string} userName - User's name
 * @param {object} userPreferences - User's preferences
 * @returns {Promise<string>} Response
 */
export const generateMoodResponse = async (mood, userName, userPreferences = {}) => {
  const activities = userPreferences?.activities?.join(', ') || 'cozy autumn activities';
  const weather = userPreferences?.weather || 'crisp autumn days';
  const dayTime = userPreferences?.dayTime || 'afternoon';

  const prompt = `${userName} just shared they're feeling ${mood}.

Write a warm, personalized response (4-5 sentences) that:
1. Acknowledges their feelings with genuine empathy
2. Connects their mood to the autumn season in a meaningful way
3. Considers their preferences: they enjoy ${activities}, prefer ${weather}, and are a ${dayTime === 'morning' ? 'morning person' : dayTime === 'night' ? 'night owl' : 'afternoon person'}
4. Offers gentle wisdom or encouragement that feels natural and comforting
5. Ends with a specific, actionable suggestion that matches their mood

Make it feel like a thoughtful message from a caring friend who truly understands them. Use autumn metaphors and imagery naturally.`;

  return generateWithClaude(prompt, 250);
};

/**
 * Fallback responses when API is not available
 * @param {string} prompt - Original prompt
 * @returns {string} Fallback response
 */
const getFallbackResponse = (prompt) => {
  const fallbacks = {
    greeting: [
      "Good morning! The autumn air is crisp today, perfect for cozy moments and warm beverages.",
      "Hello! I hope your day is filled with the simple joys of fall - rustling leaves and golden light.",
      "Welcome back! There's something magical about this time of year, isn't there?",
    ],
    affirmation: [
      "Like autumn leaves, you're at your most beautiful while embracing change.",
      "You carry warmth wherever you go, just like the golden hues of fall.",
      "Every season of growth includes moments of letting go - and that's perfectly okay.",
    ],
    journal: [
      "What a beautiful moment to capture. These are the memories that make autumn so special.",
      "There's something deeply moving about the way you notice the world around you.",
      "Thank you for sharing this piece of your autumn journey.",
    ],
    poem: [
      "The autumn breeze carries your thoughts gently. Take a moment to breathe and appreciate this season.",
      "Golden leaves dance in the wind, whispering secrets of change and renewal.",
      "In the quiet moments of fall, we find the most beautiful reflections of ourselves.",
      "The season of harvest brings gratitude for all the small wonders around us.",
      "Autumn's palette paints the world in warm hues, reminding us of life's beautiful transitions.",
    ],
    mood: [
      "I hear you. Whatever you're feeling right now is valid and worth acknowledging.",
      "These autumn days have a way of making us more introspective, don't they?",
      "It's okay to feel what you feel. The seasons remind us everything is temporary.",
    ],
  };

  // Simple keyword matching for fallback selection
  if (prompt.includes('greeting') || prompt.includes('Good morning')) {
    return fallbacks.greeting[Math.floor(Math.random() * fallbacks.greeting.length)];
  } else if (prompt.includes('affirmation')) {
    return fallbacks.affirmation[Math.floor(Math.random() * fallbacks.affirmation.length)];
  } else if (prompt.includes('journal') || prompt.includes('reflection')) {
    return fallbacks.journal[Math.floor(Math.random() * fallbacks.journal.length)];
  } else if (prompt.includes('poem') || prompt.includes('poetry') || prompt.includes('autumn poem')) {
    return fallbacks.poem[Math.floor(Math.random() * fallbacks.poem.length)];
  } else if (prompt.includes('mood') || prompt.includes('feeling')) {
    return fallbacks.mood[Math.floor(Math.random() * fallbacks.mood.length)];
  }

  return "The autumn breeze carries your thoughts gently. Take a moment to breathe and appreciate this season.";
};

/**
 * Generate a dream interpretation with autumn themes
 * @param {string} dreamDescription - Description of the dream
 * @param {string} userName - User's name
 * @returns {Promise<string>} Dream interpretation
 */
export const generateDreamInterpretation = async (dreamDescription, userName) => {
  const prompt = `${userName} had this dream: "${dreamDescription}"

Provide a thoughtful, autumn-themed dream interpretation (4-6 sentences) that:
1. Acknowledges the dream imagery with warmth and curiosity
2. Offers meaningful interpretations using autumn/fall metaphors (harvest, transition, letting go, change, preparation, reflection)
3. Connects dream symbols to potential life themes or emotions
4. Provides gentle, uplifting insights that feel supportive
5. Ends with an encouraging reflection about personal growth

Make it feel like wisdom from a caring friend who understands the symbolic language of dreams and the autumn season.`;

  return generateWithClaude(prompt, 300);
};

/**
 * Generate a personalized fall recipe
 * @param {string} userName - User's name
 * @param {object} preferences - Dietary preferences and favorite flavors
 * @returns {Promise<string>} Recipe with ingredients and instructions
 */
export const generateFallRecipe = async (userName, preferences = {}) => {
  const dietary = preferences.dietary || 'no restrictions';
  const flavors = preferences.favoriteFlavors || 'warm spices, apple, pumpkin';
  const difficulty = preferences.difficulty || 'easy';

  const prompt = `Create a personalized fall recipe for ${userName}.

Preferences:
- Dietary needs: ${dietary}
- Favorite flavors: ${flavors}
- Difficulty level: ${difficulty}

Generate a cozy autumn recipe with:
1. A creative, autumn-themed name
2. Brief description (2 sentences) about why it's perfect for fall
3. Ingredients list with measurements
4. Step-by-step instructions (numbered, clear, concise)
5. A warm serving suggestion or personal note

Format it beautifully and make it feel like a recipe shared from a friend's autumn kitchen.`;

  return generateWithClaude(prompt, 500);
};

/**
 * Generate a personalized autumn story
 * @param {string} userName - User's name
 * @param {string} theme - Story theme (cozy, adventure, magical, nostalgic)
 * @param {object} preferences - User preferences
 * @returns {Promise<string>} Short story
 */
export const generateAutumnStory = async (userName, theme, preferences = {}) => {
  const activities = preferences.activities?.join(', ') || 'cozy activities';

  const prompt = `Write a short, personalized autumn story for ${userName}.

Theme: ${theme}
Their interests: ${activities}

Create a heartwarming autumn story (250-350 words) that:
1. Features them as the main character (use their name naturally)
2. Has a ${theme} autumn atmosphere
3. Includes vivid fall imagery (colors, scents, sounds, textures)
4. Incorporates their interests in meaningful ways
5. Has a gentle, uplifting message about the season
6. Ends with a warm, satisfying conclusion

Make it feel like a cozy bedtime story that captures the magic of autumn and makes them feel special.`;

  return generateWithClaude(prompt, 600);
};

/**
 * Generate personalized gratitude prompts
 * @param {string} userName - User's name
 * @param {string} mood - Current mood
 * @returns {Promise<string>} Three gratitude prompts
 */
export const generateGratitudePrompts = async (userName, mood = 'reflective') => {
  const prompt = `Generate 3 personalized gratitude prompts for ${userName} who is feeling ${mood} today.

Each prompt should:
- Be specific and thought-provoking (not generic)
- Connect to autumn themes, nature, or the changing season
- Match their ${mood} mood
- Encourage deep reflection and appreciation
- Be formatted as a question or gentle invitation

Make them feel personal, creative, and aligned with the contemplative nature of fall.
Format as a numbered list (1., 2., 3.) with each prompt on its own line.`;

  return generateWithClaude(prompt, 250);
};

/**
 * Generate a daily autumn poem
 * @param {string} userName - User's name
 * @returns {Promise<string>} A beautiful autumn poem
 */
export const generateDailyPoem = async (userName) => {
  const prompt = `Write a beautiful, original autumn poem for ${userName}.

The poem should:
- Be 10-16 lines long with a clear rhyming scheme (ABAB or AABB pattern)
- Use vivid autumn imagery (colors, scents, textures, sounds, weather)
- Have a gentle, contemplative tone that feels personal
- Include themes of change, gratitude, natural beauty, or seasonal reflection
- Feel like a gift - something meaningful and memorable
- Use rich, descriptive language that paints a picture
- Have a clear structure with verses/stanzas
- End with a thoughtful, uplifting message

Make it feel like a beautiful piece of poetry that captures the magic and wonder of autumn. Use their name naturally in the poem.`;

  return generateWithClaude(prompt, 400);
};

/**
 * Get current weather mood (simulated)
 * @returns {string} Weather description
 */
const getCurrentWeatherMood = () => {
  const moods = ['crisp and sunny', 'cool and cloudy', 'perfectly cozy', 'refreshingly cool'];
  return moods[Math.floor(Math.random() * moods.length)];
};
