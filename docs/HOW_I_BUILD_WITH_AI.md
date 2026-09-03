# How I build with AI

MachineOutcome is an AI-oriented system built in an AI-assisted workflow. The important distinction is between **AI as implementation leverage** and **evidence as the quality gate**.

## Where AI helps

I use AI to accelerate work such as:

- exploring system shapes;
- breaking down ambiguous requirements;
- drafting and revising implementation candidates;
- reasoning across integration boundaries;
- generating edge-case and test ideas;
- reviewing assumptions and documentation.

## What I do not delegate to plausibility

The workflow still needs an explicit owner for:

- the task being evaluated;
- what evidence is authoritative;
- what counts as a verified outcome;
- when evidence is insufficient;
- whether two outcomes are actually comparable;
- which historical facts may be amended rather than silently rewritten;
- whether external content can influence evaluator rules.

## My quality model

```text
AI-assisted candidate
        ↓
constraint + authority check
        ↓
implementation / integration
        ↓
independent or inspectable evidence
        ↓
verified / failed / unknown
        ↓
accept / revise / narrow the claim
```

The goal is not to prove that every line was handwritten. The goal is to show that AI can increase execution speed without replacing system judgment or evidence discipline.
