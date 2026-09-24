# A decisão limitada antes do modelo

[Baixar worksheet em PDF (PT-BR)](jev-decision-fit-worksheet-pt.pdf)

**English:** A free 10-minute worksheet for choosing between deterministic code, bounded semantic decisions, and generative models. This public preview is in Brazilian Portuguese.

Um worksheet curto para decidir se uma parte de um fluxo de agente precisa de código, uma decisão semântica limitada ou um modelo generativo. Adaptado do Jev Operator Kit v0.1. Não requer Jev para usar o checklist.

## 1. Descreva uma decisão real

Preencha antes de escolher qualquer modelo:

- **Entrada que o sistema recebe:**
- **Saídas permitidas (IDs estáveis):**
- **Ação posterior à decisão:**
- **Quem valida e executa essa ação:**
- **O que ocorre com uma resposta desconhecida, ambígua ou indisponível:**

Se não conseguir listar as saídas ou definir o fallback, a tarefa ainda está ampla demais.

## 2. Use a opção mais simples que resolve

| Tipo de decisão | Comece com | Exemplo |
|---|---|---|
| Regra exata sobre dado confiável | Código determinístico | `amount > 500` exige revisão |
| Julgamento semântico com opções finitas | Avalie um classificador/decisor limitado | Mensagem vai para uma de quatro filas |
| Texto, síntese, explicação ou raciocínio aberto | Modelo generativo | Redigir resposta com contexto |
| Ação de alto impacto | Política determinística + aprovação necessária | Autorizar pagamento ou exclusão |

Uma chamada de decisão não é automaticamente melhor que uma condição simples. Compare com o caminho atual antes de substituir algo.

## 3. Esboce o fluxo seguro

```text
entrada
  ↓
regras exatas / negações / permissões (código)
  ↓
opções limitadas descritas ao decisor
  ↓
resultado → validar enum/ID contra allowlist local
  ↓
fallback seguro em timeout, ID inválido ou incerteza
  ↓
política e autorização final (código)
  ↓
executar ou pedir revisão humana
```

### Exemplo de roteamento

Um classificador propõe `billing`, `technical`, `account` ou `review`. A aplicação deve:

1. Rejeitar qualquer ID fora dessas quatro opções.
2. Encaminhar `review`, erro ou baixa confiança para uma fila controlada por uma pessoa.
3. Aplicar verificações de acesso antes de consultar ou alterar dados da conta.
4. Registrar a categoria, a confiança quando disponível, a latência e o uso de fallback — sem guardar conteúdo privado desnecessário.

O classificador sugere a fila; a aplicação continua responsável por dados, acesso e execução.

## 4. Compare com o baseline

Teste o mesmo conjunto de casos no sistema atual e na alternativa. Rotule a resposta esperada antes de olhar os resultados. Uma linha por caso pode conter:

```text
case_id,expected_route,selected_route,correct,valid_output,latency_ms,fallback,cost_basis
```

Olhe pelo menos para:

- **Correção de rota:** escolheu a opção esperada?
- **Saída válida:** retornou uma opção permitida?
- **Fallback:** quantos casos foram para revisão ou caminho antigo?
- **Latência ponta a ponta:** inclua chamadas adicionais e retries.
- **Custo total do fluxo:** inclua fallback, tokens/contexto e infraestrutura pertinente.
- **Impacto de erro:** o que acontece quando escolhe a opção errada?

Não generalize a partir de exemplos de demonstração. Use casos representativos, mantenha separado o conjunto usado para ajustar limiares e reavalie mudanças de dados, prompt, modelo ou SDK.

## 5. Critério simples para seguir ou parar

- **Seguir para teste controlado:** saídas são limitadas, validação/fallback estão implementados e existe baseline comparável.
- **Manter código:** as regras exatas cobrem o caso de forma clara e confiável.
- **Escalar para pessoa:** erro é caro, input é ambíguo, serviço está indisponível ou confiança não foi validada.
- **Parar a experiência:** resultado não melhora o fluxo ponta a ponta ou a operação extra não compensa.

## Limites

Este worksheet não prova que Jev é mais rápido, barato, preciso ou seguro para o seu caso. Jev é uma opção a avaliar para decisões semânticas limitadas. Acesso ao Jev e cobrança do fornecedor são separados. Verifique SDKs e termos atuais antes de implementar.

## Próximo passo

Escolha uma decisão limitada e preencha as cinco linhas da seção 1. Se quiser mais exemplos TypeScript/Python, receitas de fallback, estudos de caso e um harness offline, veja o [Jev Operator Kit](https://jevtools.gumroad.com/l/jev-operator-kit?utm_source=github&utm_medium=organic-social&utm_campaign=launch30d-sep2026&utm_content=product-page). Disclosure: a amostra e o kit são do mesmo autor; o kit é pago.



