# TypeScript sample: bounded support routing

A small runnable example for the worksheet. It asks Jev to choose from a fixed list, validates the result against a local allowlist, and routes invalid, low-confidence, or failed responses to human review.

The script prints a recommendation only. It does not dispatch a ticket, change an account, or perform another action. It uses synthetic ticket text; do not paste customer data or secrets into this example.

## Requirements

- Node.js 20 or newer.
- A TypeSafe API key with access to Jev. Provider access and billing are separate from this sample.
- The official JavaScript/TypeScript SDK pinned to version 0.6.0.

## Run

```sh
npm install
```

PowerShell:

```powershell
$env:TYPESAFE_API_KEY = '<your-key>'
npm start
```

macOS or Linux:

```sh
export TYPESAFE_API_KEY='<your-key>'
npm start
```

Keep the key in the environment. Do not add it to source files, commit it, or log it.

With no key, the script prints a `review` fallback. The code has been typechecked and that offline path has been run; a live Jev response has not been verified for this sample.

## Decision boundary

- The candidate queues and validation allowlist live in the application.
- A response outside the allowlist, missing or invalid confidence, confidence below `0.80`, or request failure routes to `review`.
- The `0.80` threshold is an illustrative placeholder. Choose thresholds from labeled examples that represent your own workflow.
- A returned `review` queue still requires human review.
- Application policy, permissions, and execution remain outside the model call.

This is a code example, not a benchmark. It makes no claim about accuracy, cost savings, speed, or safety.

## References

- [Official JavaScript SDK quickstart](https://docs.typesafe.ai/sdk/javascript)
- [Official SDK package](https://www.npmjs.com/package/@typesafe-ai/sdk)
