import { francAll } from 'franc-all';
import langs from 'langs';


export const detectLanguages = (input: string) => {
    const langResults = francAll(input);

    if (!langResults || langResults.length === 0) {
        return { message: "Sorry, I don't know that language", languages: [] };
    }

    const detectedLanguages = langResults
        .slice(0, 3) // Get top 3 results
        .map(([langCode, score]) => {
            const language = langs.where('3', langCode);
            if (score < 0.8) return null; // Only show if language is detected more than 80%
            if (!language) return null;
            return language
                ? { name: language.name, confidence: Math.round(score * 100) + '%' }
                : null;
        })
        .filter(lang => lang !== null);

    return {
        message: "Top language matches:",
        languages: detectedLanguages
    };
};

