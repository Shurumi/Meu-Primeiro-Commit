/**
 * FinCalc — Calculadora de Juros Compostos
 * Lógica principal de cálculo e renderização
 * Versão 1.0.0
 */

// ─── Estado Global ──────────────────────────────────────────────
let grafico = null;
let tabelaData = [];

// ─── Utilitários de Formatação ────────────────────────────────────────
/**
 * Formata um número como moeda BRL
 * @param {number} valor
 * @returns {string}
 */
function formatarMoeda(valor) {
  return valor.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

/**
 * Formata um número como percentual
 * @param {number} valor
 * @returns {string}
 */
function formatarPorcentagem(valor) {
  return valor.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }) + '%';
}

// ─── Cálculo Principal ───────────────────────────────────────────────
/**
 * Calcula montante de juros compostos com ou sem aportes mensais
 * Fórmula básica:  M = C * (1 + i)^n
 * Com aportes:     M = C * (1 + i)^n + PMT * [(1 + i)^n - 1] / i
 *
 * @param {number} capital  - Capital inicial (PV)
 * @param {number} taxa     - Taxa de juros por período (decimal)
 * @param {number} periodos - Número de períodos
 * @param {number} aporte   - Aporte por período (PMT)
 * @returns {object} - Resultado detalhado do cálculo
 */
function calcularJurosCompostos(capital, taxa, periodos, aporte) {
  const evolucao = [];
  let saldo = capital;
  let totalAportado = 0;
  let totalJuros = 0;

  for (let n = 1; n <= periodos; n++) {
    const jurosPeriodo = saldo * taxa;
    saldo = saldo + jurosPeriodo + aporte;
    totalAportado += aporte;
    totalJuros += jurosPeriodo;

    evolucao.push({
      periodo: n,
      capitalInvestido: capital + totalAportado,
      jurosPeriodo: jurosPeriodo,
      jurosAcumulados: totalJuros,
      montante: saldo
    });
  }

  const montanteFinal = saldo;
  const jurosSobreCapital = capital * (Math.pow(1 + taxa, periodos) - 1);
  const jurosSobreAportes = totalJuros - jurosSobreCapital;
  const crescimentoPct = ((montanteFinal - capital) / capital) * 100;

  return {
    montanteFinal,
    capitalInicial: capital,
    totalAportado,
    totalJuros,
    jurosSobreCapital,
    jurosSobreAportes,
    crescimentoPct,
    evolucao
  };
}

// ─── Função Principal de Cálculo ─────────────────────────────────────────
function calcular() {
  const capitalInput = parseFloat(document.getElementById('capital').value) || 0;
  const taxaInput    = parseFloat(document.getElementById('taxa').value) || 0;
  const tempoInput   = parseInt(document.getElementById('tempo').value) || 0;
  const aporteInput  = parseFloat(document.getElementById('aporte').value) || 0;

  const periodoTaxa  = document.querySelector('input[name="periodo-taxa"]:checked').value;
  const periodoTempo = document.querySelector('input[name="periodo-tempo"]:checked').value;

  if (capitalInput <= 0) { exibirErro('O capital inicial deve ser maior que zero.'); return; }
  if (taxaInput <= 0)    { exibirErro('A taxa de juros deve ser maior que zero.'); return; }
  if (tempoInput <= 0)   { exibirErro('O período deve ser maior que zero.'); return; }

  let taxaMensal = periodoTaxa === 'anual'
    ? Math.pow(1 + taxaInput / 100, 1 / 12) - 1
    : taxaInput / 100;

  let periodosMeses = periodoTempo === 'anos' ? tempoInput * 12 : tempoInput;

  const resultado = calcularJurosCompostos(capitalInput, taxaMensal, periodosMeses, aporteInput);

  atualizarResultados(resultado, capitalInput, taxaInput, periodosMeses, taxaMensal, periodoTaxa, aporteInput);
  renderizarGrafico(resultado.evolucao);
  renderizarTabela(resultado.evolucao);
  atualizarHeroCards(resultado);
}

// ─── Atualização dos Resultados ─────────────────────────────────────────────
function atualizarResultados(resultado, capital, taxaInput, periodos, taxaMensal, tipoTaxa, aporte) {
  document.getElementById('result-montante').textContent = formatarMoeda(resultado.montanteFinal);
  document.getElementById('result-capital').textContent  = formatarMoeda(resultado.capitalInicial);
  document.getElementById('result-juros').textContent    = formatarMoeda(resultado.totalJuros);
  document.getElementById('result-crescimento-pct').textContent =
    `+${formatarPorcentagem(resultado.crescimentoPct)} de crescimento`;

  const rowAportes = document.getElementById('row-aportes');
  if (aporte > 0) {
    rowAportes.style.display = 'grid';
    document.getElementById('result-aportes').textContent       = formatarMoeda(resultado.totalAportado);
    document.getElementById('result-juros-aportes').textContent = formatarMoeda(resultado.jurosSobreAportes);
  } else {
    rowAportes.style.display = 'none';
  }

  const taxaExibida = tipoTaxa === 'anual'
    ? `${taxaInput}% a.a. → ${(taxaMensal * 100).toFixed(4)}% a.m.`
    : `${taxaInput}% a.m.`;

  document.getElementById('formula-display').innerHTML = `
    <p class="formula-text">${aporte > 0 ? 'M = C×(1+i)ⁿ + PMT×[(1+i)ⁿ−1]/i' : 'M = C × (1 + i)ⁿ'}</p>
    <div class="formula-legend">
      <span><b>M</b> = ${formatarMoeda(resultado.montanteFinal)}</span>
      <span><b>C</b> = ${formatarMoeda(capital)}</span>
      <span><b>i</b> = ${taxaExibida}</span>
      <span><b>n</b> = ${periodos} meses</span>
      ${aporte > 0 ? `<span><b>PMT</b> = ${formatarMoeda(aporte)}/mês</span>` : ''}
    </div>
  `;
}

// ─── Gráfico ──────────────────────────────────────────────────────────────────
function renderizarGrafico(evolucao) {
  document.getElementById('chart-section').style.display = 'block';
  const labels     = evolucao.map(e => `Mês ${e.periodo}`);
  const montantes  = evolucao.map(e => +e.montante.toFixed(2));
  const jurosAcum  = evolucao.map(e => +e.jurosAcumulados.toFixed(2));
  const capitalInv = evolucao.map(e => +e.capitalInvestido.toFixed(2));
  const ctx = document.getElementById('grafico').getContext('2d');
  if (grafico) grafico.destroy();

  grafico = new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [
        { label: 'Montante Total', data: montantes, borderColor: 'hsl(230, 80%, 65%)', backgroundColor: 'hsla(230, 80%, 65%, 0.1)', borderWidth: 2.5, pointRadius: evolucao.length > 60 ? 0 : 3, pointHoverRadius: 6, fill: true, tension: 0.4 },
        { label: 'Juros Acumulados', data: jurosAcum, borderColor: 'hsl(142, 70%, 50%)', backgroundColor: 'hsla(142, 70%, 50%, 0.08)', borderWidth: 2, pointRadius: evolucao.length > 60 ? 0 : 3, pointHoverRadius: 6, fill: true, tension: 0.4, borderDash: [6, 3] },
        { label: 'Capital Investido', data: capitalInv, borderColor: 'hsl(220, 15%, 40%)', backgroundColor: 'transparent', borderWidth: 1.5, pointRadius: 0, tension: 0.4, borderDash: [4, 4] }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { intersect: false, mode: 'index' },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: 'hsl(225, 20%, 13%)',
          borderColor: 'hsl(225, 20%, 22%)',
          borderWidth: 1,
          titleColor: 'hsl(220, 20%, 92%)',
          bodyColor: 'hsl(220, 15%, 58%)',
          padding: 12,
          callbacks: { label: ctx => ` ${ctx.dataset.label}: ${formatarMoeda(ctx.raw)}` }
        }
      },
      scales: {
        x: { ticks: { color: 'hsl(220, 15%, 40%)', maxTicksLimit: 12, font: { size: 11 } }, grid: { color: 'hsla(225, 20%, 22%, 0.5)', drawBorder: false } },
        y: {
          ticks: { color: 'hsl(220, 15%, 40%)', font: { size: 11 }, callback: val => { if (val >= 1_000_000) return 'R$ ' + (val/1_000_000).toFixed(1)+'M'; if (val >= 1_000) return 'R$ ' + (val/1_000).toFixed(0)+'k'; return 'R$ ' + val; } },
          grid: { color: 'hsla(225, 20%, 22%, 0.5)', drawBorder: false }
        }
      }
    }
  });
}

// ─── Tabela ──────────────────────────────────────────────────────────────────────
function renderizarTabela(evolucao) {
  document.getElementById('table-section').style.display = 'block';
  tabelaData = evolucao;
  const tbody = document.getElementById('tabela-body');
  tbody.innerHTML = '';
  const limite = Math.min(evolucao.length, 120);

  for (let i = 0; i < limite; i++) {
    const e = evolucao[i];
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>Mês ${e.periodo}</td>
      <td>${formatarMoeda(e.capitalInvestido)}</td>
      <td class="green">${formatarMoeda(e.jurosPeriodo)}</td>
      <td class="green">${formatarMoeda(e.jurosAcumulados)}</td>
      <td class="highlight">${formatarMoeda(e.montante)}</td>
    `;
    tbody.appendChild(tr);
  }

  if (evolucao.length > 120) {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td colspan="5" style="text-align:center;color:var(--text-dim);padding:16px">... e mais ${evolucao.length - 120} períodos (exportar CSV para ver todos)</td>`;
    tbody.appendChild(tr);
  }
}

// ─── Hero Cards ──────────────────────────────────────────────────────────────────
function atualizarHeroCards(resultado) {
  document.getElementById('hero-montante').textContent    = formatarMoeda(resultado.montanteFinal);
  document.getElementById('hero-rendimento').textContent  = formatarMoeda(resultado.totalJuros);
  document.getElementById('hero-crescimento').textContent = '+' + formatarPorcentagem(resultado.crescimentoPct);
}

// ─── Exportar CSV ───────────────────────────────────────────────────────────────────
function exportarCSV() {
  if (!tabelaData.length) return;
  const header = ['Período', 'Capital + Aportes', 'Juros do Período', 'Juros Acumulados', 'Montante'];
  const linhas = [header.join(';')];
  tabelaData.forEach(e => {
    linhas.push([`Mês ${e.periodo}`, e.capitalInvestido.toFixed(2).replace('.',','), e.jurosPeriodo.toFixed(2).replace('.',','), e.jurosAcumulados.toFixed(2).replace('.',','), e.montante.toFixed(2).replace('.',',')].join(';'));
  });
  const blob = new Blob(['\uFEFF' + linhas.join('\n')], { type: 'text/csv;charset=utf-8;' });
  const url  = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'juros-compostos-evolucao.csv';
  link.click();
  URL.revokeObjectURL(url);
}

// ─── Limpar ────────────────────────────────────────────────────────────────────────────
function limpar() {
  ['capital','taxa','tempo','aporte'].forEach(id => document.getElementById(id).value = '');
  document.getElementById('result-montante').textContent = 'R$ 0,00';
  document.getElementById('result-capital').textContent  = 'R$ 0,00';
  document.getElementById('result-juros').textContent    = 'R$ 0,00';
  document.getElementById('result-crescimento-pct').textContent = '+0,00% de crescimento';
  document.getElementById('chart-section').style.display = 'none';
  document.getElementById('table-section').style.display = 'none';
  document.getElementById('row-aportes').style.display   = 'none';
  document.getElementById('hero-montante').textContent    = 'R$ 0,00';
  document.getElementById('hero-rendimento').textContent  = 'R$ 0,00';
  document.getElementById('hero-crescimento').textContent = '0,00%';
  document.getElementById('formula-display').innerHTML = `
    <p class="formula-text">M = C × (1 + i)ⁿ</p>
    <div class="formula-legend">
      <span><b>M</b> = Montante</span><span><b>C</b> = Capital inicial</span>
      <span><b>i</b> = Taxa de juros</span><span><b>n</b> = Período</span>
    </div>
  `;
  tabelaData = [];
  if (grafico) { grafico.destroy(); grafico = null; }
}

function exibirErro(msg) { alert('⚠️ ' + msg); }

document.querySelectorAll('input[name="periodo-tempo"]').forEach(r => {
  r.addEventListener('change', () => { document.getElementById('suffix-tempo').textContent = r.value === 'anos' ? 'anos' : 'meses'; });
});

document.querySelectorAll('.form-input').forEach(input => {
  input.addEventListener('keydown', e => { if (e.key === 'Enter') calcular(); });
});

window.addEventListener('DOMContentLoaded', () => { calcular(); });