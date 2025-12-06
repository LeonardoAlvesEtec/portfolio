<template>
  <footer class="rodape">
    <div class="info-contato">
      <h3> Entre em Contato</h3>
      <div class="contatos">
        <a href="mailto:seuemail@exemplo.com" class="contato-link">
        Email
        </a>
        <a href="https://github.com/seuusuario" target="_blank" class="contato-link">
           GitHub
        </a>
        <a href="https://linkedin.com/in/seuusuario" target="_blank" class="contato-link">
           LinkedIn
        </a>
      </div>
    </div>
    
    <div class="direitos-autorais">
      <p>© {{ anoAtual }} {{ nome }}. Todos os direitos não reservados.</p>
      <p class="contador-visitas">
         Visitantes: {{ contadorVisitas }}
      </p>
    </div>
  </footer>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const nome = ref('Leonardo')
const anoAtual = ref(new Date().getFullYear())
const contadorVisitas = ref(1)

onMounted(() => {
  const salvo = localStorage.getItem('visitas')
  if (salvo) {
    contadorVisitas.value = parseInt(salvo) + 1
  }
  localStorage.setItem('visitas', contadorVisitas.value)
})
</script>

<style scoped>
.rodape {
  background: linear-gradient(to top, #000033, #000066);
  border-top: 5px double var(--amarelo);
  padding: 30px 20px;
  margin-top: 40px;
  text-align: center;
}

.info-contato {
  margin-bottom: 25px;
}

.info-contato h3 {
  color: var(--amarelo);
  font-family: 'Impact', fantasy;
  margin-bottom: 15px;
  font-size: 1.5rem;
}

.contatos {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
}

.contato-link {
  display: flex;
  align-items: center;
  gap: 10px;
  background: linear-gradient(45deg, #006666, #003333);
  border: 3px outset #00cccc;
  padding: 12px 24px;
  text-decoration: none;
  color: white;
  font-family: 'Arial Black', sans-serif;
  font-size: 1rem;
}

.contato-link:hover {
  background: linear-gradient(45deg, #009999, #006666);
  border: 3px inset #66ffff;
  transform: translateY(-2px);
  text-decoration: none;
}

.direitos-autorais {
  color: #99ccff;
  font-family: 'Courier New', monospace;
  font-size: 0.9rem;
  margin-top: 20px;
}

.contador-visitas {
  margin-top: 10px;
  font-family: 'LCD', 'Courier New', monospace;
  color: var(--verde-terminal);
  font-size: 1.1rem;
}

.emoji {
  font-size: 1.2rem;
}
</style>