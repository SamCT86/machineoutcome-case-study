import { verifyMutationOutcome } from "./src/reference-outcome-verifier.mjs";
import { SCENARIOS, escapeHtml, evaluateControls } from "./src/demo-model.mjs";

const form = document.querySelector("#lab-form");
const presets = document.querySelector("#presets");
const result = document.querySelector("#result");
const validation = document.querySelector("#validation");
const resetButton = document.querySelector("[data-reset]");
const guidedButton = document.querySelector("[data-run-guided]");
let selected = "ambiguousVerified";

function setControls(values) {
  for (const [key, value] of Object.entries(values)) form.elements[key].value = value;
}

function readControls() {
  return Object.fromEntries(["ack", "prestate", "readback", "poststate", "identity"].map((key) => [key, form.elements[key].value]));
}

function renderPresets() {
  presets.innerHTML = "";
  for (const [key, scenario] of Object.entries(SCENARIOS)) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "preset";
    button.dataset.scenario = key;
    button.setAttribute("aria-pressed", String(key === selected));
    button.innerHTML = '<b>' + escapeHtml(scenario.title) + '</b><span>' + escapeHtml(scenario.hint) + '</span>';
    button.addEventListener("click", () => {
      selected = key;
      setControls(scenario.controls);
      validation.textContent = "";
      renderPresets();
      evaluate(scenario.controls);
    });
    presets.append(button);
  }
}

function evaluate(controls) {
  validation.textContent = "";
  try {
    const evaluation = evaluateControls(controls, verifyMutationOutcome);
    result.innerHTML = evaluation.markup;
    return evaluation.output;
  } catch (error) {
    validation.textContent = "VERIFIER_REFUSED_INPUT: " + (error instanceof Error ? error.message : String(error));
    result.innerHTML = '<div class="empty-state"><p class="eyebrow">FAIL CLOSED</p><h3>Invalid evidence contract.</h3><p>The public verifier rejected the input instead of guessing.</p></div>';
    return null;
  }
}

form.addEventListener("change", (event) => {
  if (!(event.target instanceof HTMLSelectElement)) return;
  selected = "custom";
  renderPresets();
  evaluate(readControls());
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  selected = "custom";
  renderPresets();
  evaluate(readControls());
});

resetButton.addEventListener("click", () => {
  selected = "ambiguousVerified";
  setControls(SCENARIOS.ambiguousVerified.controls);
  renderPresets();
  validation.textContent = "";
  result.innerHTML = '<div class="empty-state"><p class="eyebrow">READY</p><h3>Run an ambiguous action.</h3><p>You will get an outcome status, reason, safe retry decision, evidence trace and the exact verifier input/output.</p></div>';
});

guidedButton.addEventListener("click", () => {
  selected = "ambiguousVerified";
  setControls(SCENARIOS.ambiguousVerified.controls);
  renderPresets();
  evaluate(SCENARIOS.ambiguousVerified.controls);
  document.querySelector("#lab").scrollIntoView({ behavior: "smooth", block: "start" });
});

setControls(SCENARIOS.ambiguousVerified.controls);
renderPresets();
