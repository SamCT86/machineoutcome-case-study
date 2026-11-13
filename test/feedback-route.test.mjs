import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
const html=await readFile(new URL('../index.html',import.meta.url),'utf8');
const readme=await readFile(new URL('../README.md',import.meta.url),'utf8');
const contributing=await readFile(new URL('../CONTRIBUTING.md',import.meta.url),'utf8');
test('Site offers one optional email feedback route in first-use proof section',()=>{
 assert.match(html,/class="proof-actions"[\s\S]*?href="mailto:sarmad@machineoutcome\.com\?subject=MachineOutcome%20synthetic%20lab%20feedback"/);
 assert.match(html,/Feedback opens your email app/);
 assert.match(html,/please do not send customer data, private code, credentials or other secrets/);
 assert.match(html,/Replies are not guaranteed/);
 assert.equal((html.match(/mailto:sarmad@machineoutcome\.com/g)||[]).length,1);
});
test('Documentation does not point people to disabled GitHub issues',()=>{
 assert.doesNotMatch(readme+contributing,/github\.com\/SamCT86\/machineoutcome-case-study\/issues|Please open an issue first/i);
 assert.match(readme,/email the public project contact/);
 assert.match(contributing,/email the public project contact/);
});
test('A voluntary mailto does not add tracking, provider writes, or paid offers',()=>{
 assert.doesNotMatch(html,/https:\/\/[^"\s]*typeform|<form[^>]*feedback|fetch\(['"]https?:/i);
 assert.match(html,/PUBLIC · SYNTHETIC · NO WRITES/);
 assert.match(html,/No response time|Replies are not guaranteed/);
});
