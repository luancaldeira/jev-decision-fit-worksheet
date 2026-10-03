# Does this agent decision need a model?

A free five-line worksheet for developers. Use it on one real decision before adding a model call. No Jev account or email is needed.

Prefer to work offline? The [fillable English PDF](decision-fit-worksheet-en.pdf) accepts a short answer on each line. Download it to fill in your PDF viewer, or print it. No response is sent to the author.

## Fill in these five lines

1. **Input:** What trusted data and ambiguous text does the application receive?
2. **Allowed outputs:** Which stable IDs may the decision return? Include `review` when a person may need to decide.
3. **Exact rules:** Which cases can your code settle from trusted data?
4. **Failure route:** What happens on an unknown ID, low confidence, timeout, or provider error?
5. **Final authority:** Which code checks arguments, permissions, and the resource immediately before an action runs?

If you cannot name the allowed outputs or the failure route, narrow the task before choosing a model.

## A concrete example

**Ticket:** “I was charged twice after the app froze.”

- **Input:** Ticket text plus any invoice or account fields your application has verified.
- **Allowed outputs:** `billing`, `technical`, `account`, `review`.
- **Exact rule:** If a verified duplicate-charge event and your policy settle the route, branch in code.
- **Semantic case:** If the relevant meaning is still ambiguous, evaluate a bounded decision over the four IDs. Treat its answer as a proposal.
- **Failure route:** Unknown output or uncertainty goes to `review`; a timeout follows a bounded retry or review policy.
- **Final authority:** The application validates the chosen ID and arguments, checks the user's access to the account, and then routes or requests review.

This is an illustrative ticket, not a recorded Jev decision or a benchmark result.

Prefer to inspect code first? The public [TypeScript support-ticket router](https://github.com/luancaldeira/jev-decision-fit-worksheet/tree/main/examples/typescript) uses synthetic input, checks a local allowlist, and sends uncertain outcomes to human review. It prints a recommendation and performs no action.

## Choose the simplest fitting method

| Decision shape | Start with |
|---|---|
| An exact rule over trusted data | Deterministic code |
| Ambiguous meaning with finite, named outcomes | Evaluate a bounded classifier/decision model |
| Writing, synthesis, or open-ended reasoning | Generative model |
| A high-impact action | Deterministic policy and required approval |

A model's selected tool or label does not grant permission to act.

## Compare before replacing your current path

Label a small set of representative cases *before* looking at model results. Run the same cases through your current route and the candidate. Record:

`case_id, expected_route, selected_route, valid_output, correct_route, fallback, end_to_end_ms, cost_basis`

Report the number of cases and the definitions of every rate. Count retries, review, and provider time in the full path. Keep tuning cases separate from evaluation cases. If the new route does not improve the outcome that matters to you, keep the simpler path.

## Next step

Pick one bounded decision in your own workflow and fill in the five lines above. For TypeScript/Python quickstarts, 16 recipes, three case studies, and a harness for your own measurements, see the paid [Jev Operator Kit](https://jevtools.gumroad.com/l/jev-operator-kit?utm_source=github&utm_medium=sample&utm_campaign=english-sample&utm_content=worksheet) (US$19 one-time purchase). Its local TypeScript validation tests need no Jev key. I created both this worksheet and the kit. Live Jev access and provider billing are separate; future updates are not promised.
