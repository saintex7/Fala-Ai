/**
 * Sistema de armazenamento local para o chat X9Ai
 * Gerencia o armazenamento e recuperação das mensagens no localStorage
 */

class X9AiStorage {
    constructor(userId) {
        this.userId = userId || 'default-user';
        this.storageKey = `x9ai_chat_${this.userId}`;
        this.maxMessages = 100; // Limite máximo de mensagens armazenadas
    }

    // Salva a conversa no localStorage
    saveConversation(messages) {
        try {
            const conversation = {
                timestamp: new Date().toISOString(),
                messages: messages.slice(-this.maxMessages) // Mantém apenas as últimas mensagens
            };
            localStorage.setItem(this.storageKey, JSON.stringify(conversation));
            return true;
        } catch (error) {
            console.error('Erro ao salvar conversa:', error);
            return false;
        }
    }

    // Carrega a conversa do localStorage
    loadConversation() {
        try {
            const savedData = localStorage.getItem(this.storageKey);
            if (savedData) {
                return JSON.parse(savedData).messages || [];
            }
            return [];
        } catch (error) {
            console.error('Erro ao carregar conversa:', error);
            return [];
        }
    }

    // Limpa a conversa do localStorage
    clearConversation() {
        try {
            localStorage.removeItem(this.storageKey);
            return true;
        } catch (error) {
            console.error('Erro ao limpar conversa:', error);
            return false;
        }
    }

    // Obtém o estilo atual do chat (formal/informal)
    getChatStyle() {
        try {
            return localStorage.getItem('x9ai_chat_style') || 'informal';
        } catch (error) {
            console.error('Erro ao obter estilo do chat:', error);
            return 'informal';
        }
    }

    // Define o estilo do chat (formal/informal)
    setChatStyle(style) {
        try {
            if (style === 'formal' || style === 'informal') {
                localStorage.setItem('x9ai_chat_style', style);
                return true;
            }
            return false;
        } catch (error) {
            console.error('Erro ao definir estilo do chat:', error);
            return false;
        }
    }
}
