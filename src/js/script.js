/* ============================================================
   ROWTORK ENGENHARIA - LÓGICA DE INTERATIVIDADE (JS)
   Funcionalidades: Scroll dinâmico, Animações e Redirecionamento
   ============================================================ */

// 1. COMPORTAMENTO DO CABEÇALHO (HEADER)
// Adiciona sombra ao menu quando o usuário rola a página
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    // Se a rolagem passar de 50px, aplica sombra e efeito visual
    if (window.scrollY > 50) {
        header.style.boxShadow = "0 2px 15px rgba(0, 0, 0, 0.1)";
        header.style.transition = "0.3s";
    } else {
        header.style.boxShadow = "none";
    }
});


// 2. ANIMAÇÃO DE ENTRADA (REVEAL ON SCROLL)
// Faz os itens de serviço aparecerem suavemente ao deslizar a tela
const observerOptions = {
    threshold: 0.2 // Dispara a animação quando 20% do item está visível
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
        }
    });
}, observerOptions);

// Aplica o estado inicial (invisível e deslocado) nos cards de serviço
document.querySelectorAll('.servico-item').forEach(item => {
    item.style.opacity = "0";
    item.style.transform = "translateY(50px)";
    item.style.transition = "all 0.6s ease-out";
    observer.observe(item);
});


// 3. NAVEGAÇÃO SUAVE (SMOOTH SCROLL)
// Suaviza o movimento ao clicar nos links do menu (#home, #servicos, etc)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault(); // Impede o salto brusco padrão

        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});


// 4. LÓGICA DO BOTÃO DE WHATSAPP
// Cria um efeito de "processamento" antes de redirecionar para o contato
const btnWhats = document.getElementById('btn-whatsapp');
const msgRedirecionar = document.getElementById('msg-redirecionando');

if (btnWhats) {
    btnWhats.addEventListener('click', function (e) {
        e.preventDefault(); // Pausa o redirecionamento imediato

        // Inicia feedback visual de processamento técnico
        msgRedirecionar.style.display = 'block';
        this.innerHTML = '<i class="fas fa-sync-alt fa-spin"></i> PROCESSANDO...';
        this.style.opacity = '0.7';

        // Simula um tempo de conexão (1.5 segundos) para passar credibilidade
        setTimeout(() => {
            window.open(this.href, '_blank');

            // Restaura o estado original do botão após o disparo
            this.innerHTML = '<i class="fab fa-whatsapp"></i> Conversar Com Especialista';
            this.style.opacity = '1';
            msgRedirecionar.style.display = 'none';
        }, 1500);
    });
}

// Log de Verificação no Console
console.log("Sistema Rowtork Engenharia: Online e Operante.");