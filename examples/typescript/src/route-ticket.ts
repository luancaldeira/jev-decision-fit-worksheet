import { choice, TypeSafeClient } from '@typesafe-ai/sdk';

const queues = ['billing', 'account', 'technical', 'review'] as const;
type Queue = (typeof queues)[number];
const allowedQueues = new Set<string>(queues);
const reviewThreshold = 0.8;

// Synthetic input only. Replace with a minimized, policy-approved representation.
const ticket = 'I was charged twice and need help with the duplicate invoice.';
const startedAt = performance.now();

async function main(): Promise<void> {
  try {
    const client = new TypeSafeClient();
    const response = await client.systemOne({
      state: { ticket },
      questions: {
        queue: choice('Which team should review this support ticket?', {
          billing: 'Charges, invoices, refunds, and payment issues',
          account: 'Login, identity, and account access',
          technical: 'Product errors, setup, and troubleshooting',
          review: 'Ambiguous or out-of-scope tickets needing human triage',
        }),
      },
    });

    const answer = response.answers.queue;
    const confidence = Number.isFinite(answer.confidence) &&
      answer.confidence >= 0 && answer.confidence <= 1
      ? answer.confidence
      : null;
    const validChoice = allowedQueues.has(answer.choice);
    const needsFallback = !validChoice || confidence === null || confidence < reviewThreshold;
    const route: Queue = needsFallback ? 'review' : answer.choice as Queue;

    // This prints a recommendation only; application code owns authorization and execution.
    console.log(JSON.stringify({
      route,
      confidence,
      fallback: needsFallback,
      humanReviewRequired: route === 'review',
      latencyMs: Math.round(performance.now() - startedAt),
    }));
  } catch (error) {
    // Keep failures on the controlled review path and avoid logging ticket contents or secrets.
    console.log(JSON.stringify({
      route: 'review',
      confidence: null,
      fallback: true,
      humanReviewRequired: true,
      reason: error instanceof Error ? error.name : 'unknown_error',
      latencyMs: Math.round(performance.now() - startedAt),
    }));
  }
}

await main();
