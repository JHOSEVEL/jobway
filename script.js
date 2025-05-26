document.getElementById('registrationForm').addEventListener('submit', function(event) {
            event.preventDefault(); // Impede o envio padrão do formulário

            // 1. Coleta e Limpeza de Dados dos Campos de Input/Select
            const nome = document.getElementById('name').value.trim(); // .trim() remove espaços extras
            const email = document.getElementById('email').value.trim();
            let whatsapp = document.getElementById('whatsapp').value;
            whatsapp = whatsapp.replace(/\D/g, ''); // Remove caracteres não numéricos
            const area = document.getElementById('area').value.trim();
            const city = document.getElementById('city').value.trim();
            const neighborhood = document.getElementById('neighborhood').value.trim();


            // 2. Coleta de Dados dos Checkboxes (Áreas de Experiência)
            const experienceCheckboxes = document.querySelectorAll('input[name="experience_areas"]:checked');
            const experienceAreas = Array.from(experienceCheckboxes).map(cb => cb.value).join(', ');
            // Se nenhuma área de experiência for selecionada, use uma string padrão
            const displayExperienceAreas = experienceAreas ? experienceAreas : 'Nenhuma selecionada';

            // 3. Coleta de Dados dos Checkboxes (Soft Skills)
            const softSkillsCheckboxes = document.querySelectorAll('input[name="soft_skills"]:checked');
            const softSkills = Array.from(softSkillsCheckboxes).map(cb => cb.value).join(', ');

            // Se nenhuma soft skill for selecionada, use uma string padrão
            const displaySoftSkills = softSkills ? softSkills : 'Nenhuma selecionada';


            // **ATENÇÃO**: Substitua 'SEUNUMERODOWHATSAPP' pelo número de telefone COMPLETO,
            // incluindo o código do país e o DDD, sem o sinal de '+'.
            // Exemplo para Brasil (55) com DDD 48 e número 912345678: '5548912345678'
            const numeroWhatsAppDestino = '558589500747'; // <--- VERIFIQUE E ALTERE AQUI!

            // 4. Monta a Mensagem para o WhatsApp
            const textoMensagem = `*Novo cadastro recebido do site:*\n\n` +
                                `*Dados Pessoais:*\n` +
                                `Nome: ${nome}\n` +
                                `Email: ${email}\n` +
                                `WhatsApp do Cliente: ${whatsapp}\n\n` +
                                `*Detalhes da Busca:*\n` +
                                 `Área de Interesse: ${area || 'Não informada'}\n` + // Adicionado fallback
                                 `Cidade: ${city || 'Não informada'}\n` + // Adicionado fallback
                                 `Bairro: ${neighborhood || 'Não informado'}\n\n` + // Adicionado fallback
                                `*Qualificações:*\n` +
                                `Áreas de Experiência: ${displayExperienceAreas}\n` +
                                `Soft Skills: ${displaySoftSkills}`;

            // 5. Codifica a Mensagem para URL
            const textoCodificado = encodeURIComponent(textoMensagem);

            // 6. Cria o Link wa.me
            const linkWhatsApp = `https://wa.me/${numeroWhatsAppDestino}?text=${textoCodificado}`;

            // 7. Abre o Link em uma Nova Aba/Janela
            window.open(linkWhatsApp, '_blank');

            // 8. Opcional: Mostrar mensagem de sucesso e limpar o formulário
            document.getElementById('successMessage').classList.remove('hidden');
            this.reset(); // Limpa todos os campos do formulário
            
            // Limpa manualmente os checkboxes para garantir
            document.querySelectorAll('input[name="experience_areas"]').forEach(cb => cb.checked = false);
            document.querySelectorAll('input[name="soft_skills"]').forEach(cb => cb.checked = false);


            // Opcional: Esconder a mensagem de sucesso após alguns segundos
            setTimeout(() => {
                document.getElementById('successMessage').classList.add('hidden');
            }, 5000);
        });

        // Lógica para limitar seleção de checkboxes de Soft Skills a 5
        document.querySelectorAll('input[name="soft_skills"]').forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                const checkedCount = document.querySelectorAll('input[name="soft_skills"]:checked').length;
                if (checkedCount > 5) {
                    this.checked = false; // Desmarca o último checkbox clicado
                    alert('Você pode selecionar no máximo 5 Soft Skills.');
                }
            });
        });

        // Lógica para limitar seleção de checkboxes de Áreas de Experiência (ex: a 5)
        document.querySelectorAll('input[name="experience_areas"]').forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                const checkedCount = document.querySelectorAll('input[name="experience_areas"]:checked').length;
                if (checkedCount > 5) { // Altere este número se o limite for diferente
                    this.checked = false;
                    alert('Você pode selecionar no máximo 5 Áreas de Experiência.');
                }
            });
        });


        // Get references to the button and the mobile menu
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

// Add an event listener to the button
mobileMenuButton.addEventListener('click', () => {
    // Toggle the 'hidden' class on the mobile menu
    mobileMenu.classList.toggle('hidden');
});

// Optional: Close the mobile menu when a link is clicked
const mobileMenuLinks = mobileMenu.querySelectorAll('a');

mobileMenuLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden'); // Hide the menu
    });
});