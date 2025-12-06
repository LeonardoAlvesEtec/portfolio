<template>
  <header class="cabecalho">
    <div class="banner">
      <div class="titulo-site">
        <h1>
          <span class="piscando">★</span>
          Portfólio do {{ nome }}
          <span class="piscando">★</span>
        </h1>
        <p class="subtitulo">"Sob Construção" desde {{ anoAtual }}</p>
      </div>
    </div>

    <nav class="navegacao">
      <div class="faixa-animada">
        <marquee behavior="scroll" direction="left">
           Bem-vindo ao meu portfólio! • Desenvolvedor Web • Artista Independente •
        </marquee>
      </div>
      
      <div class="links-navegacao">
        <a href="#inicio" class="link-nav"> Início</a>
        <a href="#sobre" class="link-nav"> Sobre</a>
        <a href="#projetos" class="link-nav"> Projetos</a>
        <a href="#contato" class="link-nav"> Contato</a>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { ref, computed } from 'vue'

const nome = ref('Leonardo')
const anoAtual = computed(() => new Date().getFullYear())
</script>

<style scoped>
.cabecalho {
  background: linear-gradient(45deg, #330066, #000033);
  border-bottom: 5px double var(--amarelo);
  padding: 15px 0;
  margin-bottom: 20px;
}

.banner {
  text-align: center;
  padding: 20px;
  background: rgba(0, 0, 0, 0.7);
  border: 3px outset #6666ff;
  margin: 0 20px 15px 20px;
}

.titulo-site h1 {
  font-family: 'Impact', fantasy;
  font-size: 2.2rem;
  color: var(--amarelo);
  text-shadow: 3px 3px 0 var(--rosa-neon);
  margin: 0;
}

.subtitulo {
  font-family: 'Comic Sans MS', cursive;
  color: var(--laranja);
  margin-top: 8px;
  font-size: 1.1rem;
}

.navegacao {
  padding: 0 20px;
}

.faixa-animada {
  background: #000;
  border: 1px solid var(--rosa-neon);
  margin-bottom: 15px;
  overflow: hidden;
}

.faixa-animada marquee {
  color: var(--amarelo);
  font-size: 0.9rem;
  padding: 5px 0;
  font-family: 'Arial', sans-serif;
}

.links-navegacao {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 15px;
}

.link-nav {
  padding: 10px 20px;
  background: linear-gradient(to bottom, #333399, #000066);
  border: 3px outset #6666cc;
  font-family: 'Arial Black', sans-serif;
  font-size: 0.95rem;
  transition: all 0.3s;
}

.link-nav:hover {
  background: linear-gradient(to bottom, #6666ff, #3333cc);
  border: 3px inset #9999ff;
  transform: translateY(2px);
  text-decoration: none;
}
</style>