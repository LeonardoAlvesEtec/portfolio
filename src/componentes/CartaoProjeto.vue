<template>
  <div class="cartao-projeto" :class="{ 'destaque': projeto.destaque }">
    <div v-if="projeto.destaque" class="badge-destaque">
       Destaque
    </div>
    
    <div class="cabecalho-projeto">
      <h3>{{ projeto.titulo }}</h3>
      <div class="metadados-projeto">
        <span class="data-projeto">{{ projeto.data }}</span>
        <span v-if="projeto.language" class="linguagem-projeto">
          {{ projeto.language }}
        </span>
      </div>
    </div>
    
    <div class="descricao-projeto">
      <p>{{ truncarDescricao(projeto.descricao) }}</p>
    </div>
    
    <div v-if="projeto.linguagens && projeto.linguagens.length > 0" class="tecnologias-projeto">
      <span v-for="tech in projeto.linguagens.slice(0, 3)" :key="tech" class="tag-tech">
        {{ tech }}
      </span>
      <span v-if="projeto.linguagens.length > 3" class="tag-tech mais">
        +{{ projeto.linguagens.length - 3 }}
      </span>
    </div>
    
    <div class="estatisticas-projeto">
      <div v-if="projeto.estrelas !== undefined" class="estatistica">
        <span class="valor">{{ formatarNumero(projeto.estrelas) }}</span>
      </div>
      <div v-if="projeto.forks !== undefined" class="estatistica">
        <span class="icone">🍴</span>
        <span class="valor">{{ formatarNumero(projeto.forks) }}</span>
      </div>
      <div class="estatistica tamanho">
        <span class="valor">{{ calcularTamanho(projeto.titulo) }}</span>
      </div>
    </div>
    
    <div class="links-projeto">
      <a :href="projeto.github" target="_blank" class="link-github">
        <span class="texto-link">Ver Código</span>
      </a>
      <a v-if="projeto.demo && projeto.demo !== '#'" :href="projeto.demo" target="_blank" class="link-demo">
        <span class="texto-link">Demo</span>
      </a>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  projeto: {
    type: Object,
    required: true
  }
})

const truncarDescricao = (descricao) => {
  if (!descricao) return 'Sem descrição'
  if (descricao.length > 100) {
    return descricao.substring(0, 100) + '...'
  }
  return descricao
}

const formatarNumero = (numero) => {
  if (numero >= 1000) {
    return (numero / 1000).toFixed(1) + 'k'
  }
  return numero.toString()
}

const calcularTamanho = (titulo) => {
  const tamanhos = ['Pequeno', 'Médio', 'Grande']
  const hash = titulo.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
  return tamanhos[hash % tamanhos.length]
}
</script>

<style scoped>
.cartao-projeto {
  background: linear-gradient(135deg, rgba(26, 54, 93, 0.95), rgba(10, 25, 49, 0.95));
  border: 1px solid rgba(0, 181, 216, 0.4);
  border-radius: 12px;
  padding: 25px;
  transition: all 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.cartao-projeto:hover {
  transform: translateY(-8px);
  border-color: var(--ciano);
  box-shadow: 0 12px 24px rgba(0, 181, 216, 0.15);
}

.cartao-projeto.destaque {
  border: 2px solid var(--amarelo-suave);
  background: linear-gradient(135deg, rgba(26, 54, 93, 0.98), rgba(236, 201, 75, 0.1));
}

.cartao-projeto.destaque::before {
  content: '';
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  background: linear-gradient(45deg, var(--amarelo-suave), var(--ciano), var(--rosa-suave));
  border-radius: 14px;
  z-index: -1;
  opacity: 0.3;
  animation: borderGlow 3s ease-in-out infinite;
}

@keyframes borderGlow {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 0.6; }
}

.badge-destaque {
  position: absolute;
  top: -10px;
  right: 15px;
  background: linear-gradient(45deg, var(--amarelo-suave), #f6ad55);
  color: var(--azul-noturno);
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: bold;
  font-family: 'Arial Black', sans-serif;
  box-shadow: 0 2px 8px rgba(236, 201, 75, 0.3);
}

.cabecalho-projeto {
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(0, 181, 216, 0.3);
}

.cabecalho-projeto h3 {
  color: var(--amarelo-suave);
  font-family: 'Arial Black', sans-serif;
  font-size: 1.3rem;
  margin: 0 0 8px 0;
  line-height: 1.3;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
}

.metadados-projeto {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--cinza-claro);
  font-size: 0.85rem;
  font-family: 'Courier New', monospace;
}

.linguagem-projeto {
  background: rgba(0, 181, 216, 0.2);
  padding: 3px 10px;
  border-radius: 12px;
  color: var(--ciano);
  font-weight: bold;
  font-size: 0.8rem;
}

.descricao-projeto {
  color: var(--cinza-claro);
  line-height: 1.5;
  margin-bottom: 20px;
  flex: 1;
  font-size: 0.95rem;
  opacity: 0.9;
}

.descricao-projeto p {
  margin: 0;
}

.tecnologias-projeto {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 20px;
}

.tag-tech {
  background: rgba(56, 178, 172, 0.2);
  color: var(--verde-suave);
  padding: 5px 12px;
  border-radius: 15px;
  font-size: 0.8rem;
  font-family: 'Arial', sans-serif;
  border: 1px solid rgba(56, 178, 172, 0.4);
  transition: all 0.3s ease;
}

.tag-tech:hover {
  background: rgba(56, 178, 172, 0.4);
  transform: translateY(-2px);
}

.tag-tech.mais {
  background: rgba(213, 63, 140, 0.2);
  color: var(--rosa-suave);
  border-color: rgba(213, 63, 140, 0.4);
}

.estatisticas-projeto {
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
  padding: 15px 0;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.estatistica {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  color: var(--cinza-claro);
  font-family: 'Arial', sans-serif;
}

.estatistica .icone {
  font-size: 1.2rem;
}

.estatistica .valor {
  font-size: 0.85rem;
  font-weight: bold;
  color: var(--ciano);
}

.estatistica.tamanho .valor {
  color: var(--verde-suave);
}

.links-projeto {
  display: flex;
  gap: 12px;
  margin-top: auto;
}

.link-github, .link-demo {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px 15px;
  border-radius: 8px;
  text-decoration: none;
  font-family: 'Arial', sans-serif;
  font-weight: bold;
  font-size: 0.9rem;
  transition: all 0.3s ease;
}

.link-github {
  background: linear-gradient(to right, var(--azul-marinho), var(--azul-noturno));
  border: 1px solid var(--ciano);
  color: var(--ciano);
}

.link-demo {
  background: linear-gradient(to right, rgba(236, 201, 75, 0.2), rgba(236, 201, 75, 0.1));
  border: 1px solid var(--amarelo-suave);
  color: var(--amarelo-suave);
}

.link-github:hover {
  background: linear-gradient(to right, var(--ciano), var(--azul-marinho));
  color: var(--azul-noturno);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 181, 216, 0.3);
}

.link-demo:hover {
  background: linear-gradient(to right, var(--amarelo-suave), rgba(236, 201, 75, 0.8));
  color: var(--azul-noturno);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(236, 201, 75, 0.3);
}

.icone-link {
  font-size: 1rem;
}

.texto-link {
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .cartao-projeto {
    padding: 20px;
  }
  
  .cabecalho-projeto h3 {
    font-size: 1.2rem;
  }
  
  .estatisticas-projeto {
    padding: 10px 0;
  }
  
  .links-projeto {
    flex-direction: column;
    gap: 10px;
  }
}

@media (max-width: 480px) {
  .cartao-projeto {
    padding: 15px;
  }
  
  .tecnologias-projeto {
    gap: 6px;
  }
  
  .tag-tech {
    padding: 4px 10px;
    font-size: 0.75rem;
  }
}
</style>