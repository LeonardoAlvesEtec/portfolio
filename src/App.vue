<template>
  <div id="app">
    <div v-if="carregando && repositorios.length === 0" class="tela-carregamento">
      <div class="loader-retro">
        <div class="loader-text">Carregando Portfólio...</div>
        <div class="loader-bar">
          <div class="loader-progress"></div>
        </div>
      </div>
    </div>

    <div v-else>
      <Cabecalho :nome="nome" />
      
      <main class="container">

        <section id="inicio" class="secao">
          <div class="perfil">
            <div class="avatar-container">
              <img v-if="avatarUrl" :src="avatarUrl" alt="Avatar" class="avatar" />
              <div v-else class="avatar-placeholder">👨‍💻</div>
              <div class="status-online">
                <span class="status-dot"></span> Online
              </div>
            </div>
            
            <div class="info-perfil">
              <h1>Olá, eu sou <span class="destaque-nome">{{ nome }}</span></h1>
              <p class="bio">{{ bio || 'Desenvolvedor web e entusiasta das artes' }}</p>
              <div class="estatisticas">
                <div class="stat">
                  <span class="stat-numero">{{ repositorios.length }}</span>
                  <span class="stat-label">Repositórios</span>
                </div>
                <div class="stat">
                  <span class="stat-numero">{{ seguidores || '0' }}</span>
                  <span class="stat-label">Seguidores</span>
                </div>
                <div class="stat">
                  <span class="stat-numero">{{ seguindo || '0' }}</span>
                  <span class="stat-label">Seguindo</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="sobre" class="secao">
          <h2 class="titulo-secao"> Sobre Mim</h2>
          <div class="conteudo-sobre">
            <div class="habilidades">
              <h3> Minhas Tecnologias</h3>
              <div class="nuvem-tags">
                <span v-for="tag in tecnologias" :key="tag" class="tag-tech">
                  {{ tag }}
                </span>
              </div>
            </div>
            
            <div class="historico">
              <h3> Minha Jornada</h3>
              <p>{{ historia || 'Desenvolvedor com foco em frontend, criando interfaces modernas com Vue.js e React.' }}</p>
              <div class="interesses">
                <h4> Interesses:</h4>
                <div class="lista-interesses">
                  <span class="interesse">Frontend Development</span>
                  <span class="interesse"> UI/UX Design</span>
                  <span class="interesse"> Responsive Design</span>
                  <span class="interesse"> Performance Web</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="projetos" class="secao">
          <div class="cabecalho-projetos">
            <h2 class="titulo-secao"> Meus Projetos</h2>
            <div class="filtros">
              <button 
                v-for="linguagem in linguagensUnicas" 
                :key="linguagem"
                @click="filtrarPorLinguagem(linguagem)"
                :class="{ active: filtroLinguagem === linguagem }"
                class="filtro-btn"
              >
                {{ linguagem || 'Todas' }}
              </button>
              <button @click="limparFiltro" class="filtro-btn">
                 Ver Todos
              </button>
            </div>
          </div>

          <div v-if="carregando && repositorios.length === 0" class="carregando">
            <div class="spinner"></div>
            <p>Carregando projetos do GitHub...</p>
          </div>

          <div v-else-if="erro" class="erro">
            <p> {{ erro }}</p>
            <button @click="buscarDadosGitHub" class="botao-retro">
              Tentar Novamente
            </button>
          </div>

          <div v-else class="grade-projetos">
            <CartaoProjeto 
              v-for="repo in repositoriosFiltrados" 
              :key="repo.id" 
              :projeto="repo" 
            />
            
            <div v-if="repositoriosFiltrados.length === 0" class="sem-projetos">
              <p>Nenhum projeto encontrado com o filtro atual.</p>
            </div>
          </div>

          <div class="info-github">
            <p>
              <a :href="githubUrl" target="_blank" class="link-github">
                 Ver mais no GitHub →
              </a>
            </p>
          </div>
        </section>

        <section id="contato" class="secao">
          <h2 class="titulo-secao"> Vamos Conversar?</h2>
          <div class="conteudo-contato">
            <div class="info-contato">
              <h3> Entre em Contato</h3>
              <div class="links-contato">
                <a href="mailto:leonardo.silva1795@gmail.com" class="link-contato">
                  <span class="texto">leonardo.silva1795@gmail.com</span>
                </a>
                <a :href="githubUrl" target="_blank" class="link-contato">
                  <span class="texto">GitHub</span>
                </a>
                <a v-if="linkedin" :href="linkedin" target="_blank" class="link-contato">
                  <span class="texto">LinkedIn</span>
                </a>
              </div>
            </div>

            <div class="formulario-contato">
              <h3> Envie uma Mensagem</h3>
              <div class="grupo-form">
                <input type="text" v-model="formNome" placeholder="Seu nome" class="input-retro">
              </div>
              <div class="grupo-form">
                <input type="email" v-model="formEmail" placeholder="seu@email.com" class="input-retro">
              </div>
              <div class="grupo-form">
                <textarea v-model="formMensagem" placeholder="Digite sua mensagem..." rows="4" class="textarea-retro"></textarea>
              </div>
              <button @click="enviarMensagem" class="botao-retro" :disabled="enviando">
                {{ enviando ? ' Enviando...' : ' Enviar Mensagem' }}
              </button>
              <p v-if="mensagemEnviada" class="mensagem-sucesso">
                 Mensagem enviada! Obrigado!
              </p>
            </div>
          </div>
        </section>
      </main>

      <Rodape :nome="nome" :anoAtual="anoAtual" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import Cabecalho from './componentes/Cabecalho.vue'
import Rodape from './componentes/Rodape.vue'
import CartaoProjeto from './componentes/CartaoProjeto.vue'
import './assets/estilos/retro.css'

const usuarioGitHub = ref('LeonardoAlvesEtec')
const nome = ref('Leonardo')

const githubUrl = computed(() => `https://github.com/${usuarioGitHub.value}`)

const avatarUrl = ref('')
const bio = ref('')
const seguidores = ref(0)
const seguindo = ref(0)
const repositorios = ref([])
const carregando = ref(true)
const erro = ref('')

const filtroLinguagem = ref('')
const linguagensUnicas = computed(() => {
  const linguagens = repositorios.value
    .map(repo => repo.language)
    .filter(Boolean)
    .filter((lang, index, arr) => arr.indexOf(lang) === index)
  return ['Todas', ...linguagens]
})

const repositoriosFiltrados = computed(() => {
  if (!filtroLinguagem.value || filtroLinguagem.value === 'Todas') {
    return repositorios.value
  }
  return repositorios.value.filter(repo => repo.language === filtroLinguagem.value)
})

const buscarDadosGitHub = async () => {
  try {
    carregando.value = true
    erro.value = ''
    const respostaPerfil = await fetch(`https://api.github.com/users/${usuarioGitHub.value}`)
    if (!respostaPerfil.ok) throw new Error('Usuário não encontrado')
    
    const perfil = await respostaPerfil.json()
    nome.value = perfil.name || usuarioGitHub.value
    avatarUrl.value = perfil.avatar_url
    bio.value = perfil.bio
    seguidores.value = perfil.followers
    seguindo.value = perfil.following
    
    const respostaRepos = await fetch(`https://api.github.com/users/${usuarioGitHub.value}/repos?sort=updated&per_page=50`)
    const repos = await respostaRepos.json()
    
    repositorios.value = repos.map(repo => ({
      id: repo.id,
      titulo: repo.name,
      descricao: repo.description || 'Sem descrição',
      data: new Date(repo.updated_at).getFullYear().toString(),
      linguagens: [repo.language].filter(Boolean),
      language: repo.language,
      github: repo.html_url,
      demo: repo.homepage || '#',
      estrelas: repo.stargazers_count,
      forks: repo.forks_count,
      destaque: repo.stargazers_count > 5
    }))
    
  } catch (err) {
    console.error('Erro ao buscar dados do GitHub:', err)
    erro.value = `Erro ao carregar projetos: ${err.message}`
    
    repositorios.value = [
      {
        id: 1,
        titulo: 'Portfólio Retrô',
        descricao: 'Este site com design inspirado nos anos 90',
        data: '2024',
        linguagens: ['Vue.js', 'CSS'],
        language: 'Vue',
        github: 'https://github.com/LeonardoAlvesEtec',
        demo: '#',
        estrelas: 0,
        forks: 0,
        destaque: true
      }
    ]
  } finally {
    carregando.value = false
  }
}

const filtrarPorLinguagem = (linguagem) => {
  filtroLinguagem.value = linguagem === 'Todas' ? '' : linguagem
}

const limparFiltro = () => {
  filtroLinguagem.value = ''
}

const tecnologias = ref([
  'Vue.js', 'JavaScript', 'HTML5', 'CSS3', 'Node.js',
  'Git', 'React', 'TypeScript', 'SASS', 'Webpack'
])

const historia = ref('Sou um desenvolvedor web, formado pela Etec Antônio Furlan. Gosto de páginas com teor mais artístico e pessoal (como o Neocities). Trabalhei no desenvolvimento do SAAT, aplicativo hoje utilizado pela Secretaria de Mobilidade Urbana de Barueri')

const email = ref('leonardo.silva1795@gmail.com')
const linkedin = ref('')
const anoAtual = new Date().getFullYear()

const formNome = ref('')
const formEmail = ref('')
const formMensagem = ref('')
const enviando = ref(false)
const mensagemEnviada = ref(false)

const enviarMensagem = () => {
  if (!formNome.value || !formEmail.value || !formMensagem.value) {
    alert('Por favor, preencha todos os campos!')
    return
  }

  enviando.value = true
  
  setTimeout(() => {
    console.log('Mensagem enviada:', {
      nome: formNome.value,
      email: formEmail.value,
      mensagem: formMensagem.value
    })
    
    enviando.value = false
    mensagemEnviada.value = true
    
    formNome.value = ''
    formEmail.value = ''
    formMensagem.value = ''
    
    setTimeout(() => {
      mensagemEnviada.value = false
    }, 5000)
  }, 1500)
}

onMounted(() => {
  buscarDadosGitHub()
})
</script>

<style scoped>
.tela-carregamento {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--azul-noturno);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.loader-retro {
  text-align: center;
}

.loader-text {
  color: var(--ciano);
  font-family: 'Courier New', monospace;
  font-size: 1.2rem;
  margin-bottom: 20px;
  animation: blink 1.5s infinite;
}

.loader-bar {
  width: 300px;
  height: 20px;
  background: rgba(0, 0, 0, 0.5);
  border: 2px inset var(--ciano);
  overflow: hidden;
}

.loader-progress {
  height: 100%;
  width: 30%;
  background: linear-gradient(90deg, var(--ciano), var(--verde-suave));
  animation: loading 2s ease-in-out infinite;
}

@keyframes loading {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(400%); }
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.container {
  flex: 1;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.secao {
  background: rgba(26, 54, 93, 0.7);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(0, 181, 216, 0.3);
  border-radius: 12px;
  padding: 30px;
  margin-bottom: 30px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}

.titulo-secao {
  color: var(--amarelo-suave);
  font-family: 'Arial Black', sans-serif;
  font-size: 1.8rem;
  margin-bottom: 25px;
  padding-bottom: 10px;
  border-bottom: 2px solid var(--ciano);
}

.perfil {
  display: flex;
  align-items: center;
  gap: 40px;
  flex-wrap: wrap;
}

.avatar-container {
  text-align: center;
}

.avatar {
  width: 180px;
  height: 180px;
  border-radius: 50%;
  border: 4px solid var(--ciano);
  object-fit: cover;
  box-shadow: 0 0 20px rgba(0, 181, 216, 0.4);
}

.avatar-placeholder {
  width: 180px;
  height: 180px;
  border-radius: 50%;
  border: 4px solid var(--ciano);
  background: linear-gradient(45deg, var(--azul-marinho), var(--ciano));
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 4rem;
  color: white;
  box-shadow: 0 0 20px rgba(0, 181, 216, 0.4);
}

.status-online {
  margin-top: 10px;
  color: var(--verde-suave);
  font-family: 'Arial', sans-serif;
  font-weight: bold;
}

.status-dot {
  display: inline-block;
  width: 8px;
  height: 8px;
  background: var(--verde-suave);
  border-radius: 50%;
  margin-right: 5px;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.info-perfil {
  flex: 1;
  min-width: 300px;
}

.destaque-nome {
  color: var(--amarelo-suave);
  font-weight: bold;
}

.bio {
  color: var(--cinza-claro);
  font-size: 1.1rem;
  line-height: 1.6;
  margin: 15px 0;
}

.estatisticas {
  display: flex;
  gap: 30px;
  margin-top: 20px;
}

.stat {
  text-align: center;
}

.stat-numero {
  display: block;
  font-size: 2rem;
  font-weight: bold;
  color: var(--ciano);
  font-family: 'Courier New', monospace;
}

.stat-label {
  display: block;
  color: var(--cinza-claro);
  font-size: 0.9rem;
  margin-top: 5px;
}

.conteudo-sobre {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
}

@media (max-width: 768px) {
  .conteudo-sobre {
    grid-template-columns: 1fr;
  }
}

.nuvem-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 15px;
}

.tag-tech {
  background: rgba(56, 178, 172, 0.2);
  color: var(--verde-suave);
  padding: 8px 15px;
  border-radius: 20px;
  border: 1px solid var(--verde-suave);
  font-family: 'Arial', sans-serif;
  font-size: 0.9rem;
  transition: all 0.3s ease;
}

.tag-tech:hover {
  background: rgba(56, 178, 172, 0.4);
  transform: translateY(-2px);
}

.historico p {
  color: var(--cinza-claro);
  line-height: 1.6;
  margin-bottom: 20px;
}

.lista-interesses {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 10px;
}

.interesse {
  background: rgba(236, 201, 75, 0.2);
  color: var(--amarelo-suave);
  padding: 6px 12px;
  border-radius: 15px;
  border: 1px solid var(--amarelo-suave);
  font-size: 0.85rem;
}

.cabecalho-projetos {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 15px;
  margin-bottom: 25px;
}

.filtros {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.filtro-btn {
  background: rgba(26, 54, 93, 0.8);
  border: 1px solid var(--ciano);
  color: var(--cinza-claro);
  padding: 8px 16px;
  border-radius: 20px;
  cursor: pointer;
  font-family: 'Arial', sans-serif;
  font-size: 0.9rem;
  transition: all 0.3s ease;
}

.filtro-btn:hover,
.filtro-btn.active {
  background: var(--ciano);
  color: var(--azul-noturno);
}

.carregando {
  text-align: center;
  padding: 50px;
  color: var(--cinza-claro);
}

.spinner {
  width: 50px;
  height: 50px;
  border: 4px solid rgba(0, 181, 216, 0.3);
  border-top-color: var(--ciano);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 20px;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.erro {
  text-align: center;
  padding: 40px;
  color: var(--rosa-suave);
  background: rgba(213, 63, 140, 0.1);
  border-radius: 8px;
  border: 1px solid var(--rosa-suave);
}

.grade-projetos {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 25px;
}

.sem-projetos {
  text-align: center;
  padding: 40px;
  color: var(--cinza-claro);
  grid-column: 1 / -1;
}

.info-github {
  text-align: center;
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid rgba(0, 181, 216, 0.3);
}

.link-github {
  color: var(--amarelo-suave);
  font-size: 1.1rem;
  font-weight: bold;
}

.link-github:hover {
  color: var(--ciano);
}

/* Contato */
.conteudo-contato {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
}

@media (max-width: 768px) {
  .conteudo-contato {
    grid-template-columns: 1fr;
  }
}

.info-contato h3,
.formulario-contato h3 {
  color: var(--amarelo-suave);
  margin-bottom: 20px;
}

.links-contato {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.link-contato {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 15px;
  background: rgba(26, 54, 93, 0.8);
  border: 1px solid var(--ciano);
  border-radius: 8px;
  transition: all 0.3s ease;
}

.link-contato:hover {
  background: rgba(0, 181, 216, 0.2);
  transform: translateX(5px);
}

.icone {
  font-size: 1.5rem;
}

.texto {
  font-size: 1.1rem;
  font-weight: 500;
}

.grupo-form {
  margin-bottom: 20px;
}

.input-retro,
.textarea-retro {
  width: 100%;
  padding: 12px 15px;
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid var(--ciano);
  border-radius: 6px;
  color: var(--cinza-claro);
  font-family: 'Arial', sans-serif;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.input-retro:focus,
.textarea-retro:focus {
  outline: none;
  border-color: var(--amarelo-suave);
  box-shadow: 0 0 0 3px rgba(236, 201, 75, 0.2);
}

.textarea-retro {
  resize: vertical;
  min-height: 120px;
}

.mensagem-sucesso {
  color: var(--verde-suave);
  margin-top: 15px;
  text-align: center;
  font-weight: bold;
  animation: fadeIn 0.5s ease;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.grade-projetos {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 25px;
  margin-top: 20px;
}

.sem-projetos {
  text-align: center;
  padding: 40px;
  color: var(--cinza-claro);
  grid-column: 1 / -1;
  background: rgba(26, 54, 93, 0.5);
  border-radius: 10px;
  border: 1px dashed var(--ciano);
}

.filtros {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 15px;
}

.filtro-btn {
  background: rgba(26, 54, 93, 0.8);
  border: 1px solid var(--ciano);
  color: var(--cinza-claro);
  padding: 8px 16px;
  border-radius: 20px;
  cursor: pointer;
  font-family: 'Arial', sans-serif;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  white-space: nowrap;
}

.filtro-btn:hover,
.filtro-btn.active {
  background: var(--ciano);
  color: var(--azul-noturno);
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 181, 216, 0.3);
}

.carregando {
  text-align: center;
  padding: 50px;
  color: var(--cinza-claro);
  background: rgba(26, 54, 93, 0.5);
  border-radius: 10px;
  margin: 20px 0;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 4px solid rgba(0, 181, 216, 0.3);
  border-top-color: var(--ciano);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 20px;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.cabecalho-projetos {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 25px;
}

@media (min-width: 768px) {
  .cabecalho-projetos {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
}

#projetos.secao {
  padding-bottom: 40px;
}

.grade-projetos {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 70px; 
  margin-top: 20px;
}

.cartao-projeto {
  min-height: 320px;
}

.secao + .secao {
  margin-top: 20px;
}

</style>