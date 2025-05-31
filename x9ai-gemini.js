/**
 * Integração com a API do Gemini para o X9Ai
 */

class GeminiAPI {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.baseUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';
    }

    async generateResponse(prompt, isAcademic = false) {
        try {
            // Configura o contexto apropriado para o Gemini
            const context = isAcademic 
                ? "Você é o X9Ai, um assistente escolar brasileiro. Responda de forma clara, precisa e acadêmica, como um professor experiente."
                : "Você é o X9Ai, um assistente brasileiro descontraído. Use gírias e linguagem informal, mas sem vulgaridades. Seja simpático e engraçado.";

            const response = await fetch(`${this.baseUrl}?key=${this.apiKey}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: `${context}\n\n${prompt}`
                        }]
                    }],
                    generationConfig: {
                        temperature: isAcademic ? 0.3 : 0.8,
                        topK: 40,
                        topP: 0.8,
                        maxOutputTokens: 1024
                    }
                })
            });

            const data = await response.json();
            return data.candidates[0].content.parts[0].text;
        } catch (error) {
            console.error('Erro ao chamar Gemini API:', error);
            return isAcademic 
                ? "Desculpe, estou com dificuldades técnicas. Por favor, tente novamente mais tarde."
                : "Pô, deu ruim aqui no meu sistema! Tenta de novo aí, meu chapa!";
        }
    }
}
