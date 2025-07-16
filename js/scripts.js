//
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Função para encolher a barra de navegação
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink');
        } else {
            navbarCollapsible.classList.add('navbar-shrink');
        }
    };

    // Encolhe a barra de navegação ao carregar a página
    navbarShrink();

    // Encolhe a barra de navegação quando a página é rolada
    document.addEventListener('scroll', navbarShrink);

    // Ativa o Bootstrap scrollspy no elemento de navegação principal
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            offset: 74,
        });
    }

    // Recolhe a barra de navegação responsiva quando um item é clicado
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });


    // ================== LÓGICA DO FORMULÁRIO DE CONTATO ==================
    // Seleciona o formulário pelo ID
    const form = document.getElementById('contactForm');

    // Verifica se o formulário realmente existe na página antes de adicionar o listener
    if (form) {
        // Adiciona o "escutador" para o evento de envio (submit)
        form.addEventListener('submit', function(event) {
            // Previne o comportamento padrão do formulário (que é recarregar a página)
            event.preventDefault();
            
            const formData = new FormData(form);
            const submitButton = document.getElementById('submitButton');
            
            // Dá um feedback visual para o usuário
            submitButton.disabled = true;
            submitButton.innerText = "Enviando...";
            
            // Envia os dados para o formsubmit.co usando a Fetch API (AJAX)
            fetch(form.action, {
              method: 'POST',
              body: formData,
              headers: {
                'Accept': 'application/json' // Pede uma resposta em formato JSON
              }
            })
            .then(response => response.json()) // Converte a resposta do servidor para JSON
            .then(data => {
              // Verifica se o envio foi bem-sucedido
              if (data.success) {
                alert("Mensagem enviada com sucesso!");
                form.reset(); // Limpa os campos do formulário
              } else {
                alert("Ocorreu um erro no envio. Tente novamente.");
                console.error(data); // Mostra o erro no console para depuração
              }
            })
            .catch(error => {
              // Lida com erros de rede (ex: sem internet)
              console.error('Erro na requisição:', error);
              alert("Ocorreu um erro de conexão. Verifique sua internet e tente novamente.");
            })
            .finally(() => {
                // Executa sempre, seja sucesso ou falha
                // Reabilita o botão e restaura o texto original
                submitButton.disabled = false;
                submitButton.innerText = "Enviar Mensagem";
            });
        });
    }
    // ================== FIM DA LÓGICA DO FORMULÁRIO ==================

});


// ================== LÓGICA DO GRÁFICO WORDCLOUD ==================
// Executa quando a página e todos os seus recursos (imagens, etc.) forem carregados
window.onload = () => {
    // Verifica se existe um elemento <canvas> na página
    if (document.getElementById('canvas')) {
        const words = [
            { key:"The Weeknd", value: 9   }, { key:"Pink Floyd", value:5},
            { key:"Chico Science", value:3}, { key:"Legião Urbana", value: 2},
            { key:"Post Malone", value: 2}, { key:"Guns N' Roses", value: 2},
            { key:"TIAGO IORC", value: 1}, { key:"Linkin Park", value: 1},
            { key:"Iron Maiden", value: 1}, { key:"Charlie Brown Jr.", value: 1},
            { key:"Matanza", value: 1}, { key:"Raul Seixas", value: 1},
            { key:"Eminem", value: 1}, { key:"David Guetta", value: 1},
            { key:"System Of A Down", value: 1}, { key:"BaianaSystem", value: 1},
            { key:"Rammstein", value: 1}, { key:"Daft Punk", value: 1},
            { key:"Nação Zumbi", value: 3}, { key:"Scorpions", value: 1},
            { key:"Sia", value: 1}, { key:"Caetano Veloso", value: 1},
            { key:"David Bowie", value: 1}, { key:"Metallica", value: 1},
            { key:"Emicida", value: 1}, { key:"Doja Cax`t", value: 1},
            { key:"Twenty One Pilots", value: 1}, { key:"AC/DC", value: 1},
            { key:"Bob Marley & The Wailers", value: 1}, { key:"DUDA BEAT", value: 1},
            { key:"Slipknot", value: 1}, { key:"Queen", value: 1},
            { key:"Gorillaz", value: 1},
        ];
        const data = {
          labels: words.map((d) => d.key),
          datasets: [
            {
              label: '',
              data: words.map((d) => 9 + d.value * 5),
            },
          ],
        };
        const ctx = document.getElementById('canvas').getContext('2d');
        
        // Garanta que Chart.js e o plugin wordcloud estejam carregados antes desta linha
        window.myBar = new Chart(ctx, {
          type: 'wordCloud',
          data: data,
          options: {
            title: {
              display: false, // Títulos geralmente são feitos em HTML
            },
            plugins: {
              legend: {
                display: false,
              },
            },
          },
        });
    }
};