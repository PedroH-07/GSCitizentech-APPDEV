# EcoDenúncia - Monitoramento e Combate ao Descarte Irregular de Lixo

## 1. Contextualização do Problema, Objetivo e ODS
O descarte inadequado de resíduos sólidos em vias públicas, terrenos baldios e áreas de preservação traz graves consequências socioambientais, tais como a proliferação de vetores de doenças, entupimento de bueiros e alagamentos[cite: 2].

* **Público-alvo:** Moradores urbanos, líderes comunitários e órgãos de fiscalização/gestão pública municipal[cite: 1].
* **Objetivo:** Oferecer uma plataforma *CitizenTech* simples e acessível que permita registrar ocorrências de descarte irregular de lixo e visualizar indicadores para orientar ações de limpeza urbana[cite: 1].
* **ODS Relacionado:** **ODS 11 - Cidades e Comunidades Sustentáveis** (Meta 11.6: reduzir o impacto ambiental negativo per capita das cidades, prestando especial atenção à gestão de resíduos municipais)[cite: 1].

---

## 2. Tecnologias Utilizadas
* **Frontend:** HTML5, CSS3 e JavaScript (Vanilla JS)[cite: 2].
* **Backend:** Node.js e Express.js[cite: 1, 2].
* **Banco de Dados:** MongoDB com Mongoose (ODM)[cite: 1, 2].

---

## 3. Estrutura de Arquivos
```text
citizentech-descarte-lixo/
├── models/
│   └── Denuncia.js       # Schema do Mongoose (MongoDB)
├── public/
│   ├── index.html        # Interface gráfica
│   ├── style.css         # Estilização
│   └── script.js         # Client-side (Fetch API)
├── package.json          # Dependências do projeto
├── server.js             # Servidor Express, API REST e rotas
└── README.md             # Documentação do projeto
```

---

## 4. Instruções de Execução

### Pré-requisitos
* **Node.js** (v14 ou superior) instalado na máquina.
* **MongoDB Community Server** instalado localmente na porta padrão (`27017`).

### Passo a Passo

1. **Clonar/Baixar o repositório:**
   Navegue até a pasta raiz do projeto via terminal.

2. **Instalar as dependências:**
   ```bash
   npm install
   ```

3. **Iniciar o serviço do MongoDB (caso o serviço esteja em modo manual no Windows):**
   * **Windows (CMD como Administrador):**
     ```cmd
     net start MongoDB
     ```
   * **Linux/macOS:**
     ```bash
     sudo systemctl start mongod
     ```

4. **Iniciar a aplicação:**
   ```bash
   npm start
   ```

5. **Acessar o sistema:**
   Abra o navegador e acesse a URL: [http://localhost:3000](http://localhost:3000)

---

## 5. Explicação dos Indicadores
A aplicação processa e exibe em tempo real dois indicadores principais a partir dos registros gravados no banco de dados[cite: 2]:

1. **Total de Ocorrências:**
   * **Como é processado:** Consulta no banco de dados utilizando o método `countDocuments()` do Mongoose[cite: 2].
   * **Utilidade:** Apresenta o volume acumulado de denúncias recebidas na plataforma, servindo como métrica geral do engajamento comunitário[cite: 1, 2].

2. **Resumo por Volume:**
   * **Como é processado:** Utiliza um pipeline de agregação do MongoDB (`aggregate`) com o operador `$group` agrupando os registros por tipo de volume (`Pequeno`, `Médio`, `Grande`) e contabilizando suas ocorrências[cite: 2].
   * **Utilidade:** Permite identificar a gravidade dos descartes cadastrados para priorização das equipes de logística de limpeza (ex: resíduos de grande porte exigem maquinário pesado ou caçambas)[cite: 1, 2].

---

## 6. Vídeo Pitch (2 a 3 minutos)
* **Link do Vídeo:** [COLE_AQUI_O_LINK_DO_SEU_VIDEO_NO_YOUTUBE][cite: 2]

---

## 7. Integrantes
* **Pedro Henrique dos Santos Cardoso** - RM563268
* **Gabriel Gibin Leoncio** - RM565462
* **Rai Augusto Ribeiro** - RM562870
