/**
 * Sistema principal do assistente X9Ai com integração Gemini
 */

class X9AiAssistant {
    constructor(apiKey) {
        // Elementos da interface
        this.chatContainer = document.querySelector('.x9ai-chat-container');
        this.chatMessages = document.getElementById('chatMessages');
        this.userInput = document.getElementById('userMessageInput');
        this.sendBtn = document.getElementById('sendMessageBtn');
        this.closeBtn = document.getElementById('closeChatBtn');
        this.clearBtn = document.getElementById('clearChatBtn');
        this.toggleStyleBtn = document.getElementById('toggleStyleBtn');

        // Configurações
        this.userId = this.getUserId();
        this.storage = new X9AiStorage(this.userId);
        this.chatStyle = this.storage.getChatStyle();
        this.isTyping = false;
        
        // Integração com Gemini
        this.gemini = new GeminiAPI(apiKey);

        // Inicialização
        this.initChat();
        this.setupEventListeners();
        this.showWelcomeMessage();
    }

    // ... (mantém todos os métodos anteriores até generateResponse)

    // Gera uma resposta do X9Ai usando a API do Gemini
    async generateResponse(userMessage) {
        // Remove o indicador de digitação
        this.hideTypingIndicator();

        // Determina se a mensagem é acadêmica (requer resposta formal)
        const isAcademicQuestion = this.isAcademicQuestion(userMessage);

        try {
            // Gera a resposta usando a API do Gemini
            const responseText = await this.gemini.generateResponse(
                `Usuário perguntou: "${userMessage}"`,
                isAcademicQuestion || this.chatStyle === 'formal'
            );

            // Cria e exibe a mensagem do X9Ai
            const x9aiMessage = {
                sender: 'x9ai',
                text: this.cleanResponse(responseText),
                timestamp: new Date().toISOString(),
                isAcademic: isAcademicQuestion
            };

            this.displayMessage(x9aiMessage);
            this.saveMessage(x9aiMessage);
        } catch (error) {
            console.error('Erro ao gerar resposta:', error);
            
            const errorMessage = {
                sender: 'x9ai',
                text: this.chatStyle === 'formal' 
                    ? "Desculpe, estou tendo dificuldades técnicas no momento. Por favor, tente novamente mais tarde." 
                    : "Pô, deu um ruim aqui no sistema! Tenta de novo aí, meu chapa! 😅",
                timestamp: new Date().toISOString(),
                isAcademic: false
            };
            
            this.displayMessage(errorMessage);
            this.saveMessage(errorMessage);
        }
    }

    // Limpa a resposta removendo possíveis auto-referências a IAs
    cleanResponse(text) {
        return text
            .replace(/^(Gemini|Bard|IA|AI|Inteligência Artificial):?/i, 'X9Ai:')
            .replace(/como (uma )?(IA|AI|Inteligência Artificial)/i, 'como o X9Ai')
            .replace(/(sou|sou um|sou uma) (IA|AI|Inteligência Artificial)/i, '$1 o X9Ai');
    }

    // ... (mantém os demais métodos)
}

// Inicializa o chat com sua API Key do Gemini
document.addEventListener('DOMContentLoaded', () => {
    const apiKey = 'AIzaSyAY7JE-ONVQi0c8io5aO3niBm7_Xy0vwRY'; // Substitua pela sua chave real
    const x9aiChat = new X9AiAssistant(apiKey);
});
