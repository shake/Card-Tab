import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const source = readFileSync(new URL('../workers.js', import.meta.url), 'utf8');

function assertAbsent(pattern, message) {
  assert.equal(pattern.test(source), false, message);
}

function assertPresent(pattern, message) {
  assert.equal(pattern.test(source), true, message);
}

assertAbsent(/WEATHER_API|weather-mini|\/api\/weather/, 'weather feature should be removed');

assertPresent(/privateNote/, 'private notes should be represented in link data');
assertPresent(/sanitizeLinkForPublic|redactPrivateNote|privateNote:\s*undefined/, 'public responses should redact private notes');
assertPresent(/note-modal|showNoteModal|copyPrivateNote/, 'private note modal and copy behavior should exist');

assertPresent(/currentCategoryView/, 'category tab view state should exist');
assertPresent(/setCategoryView/, 'category navigation should switch views instead of scrolling');
assertPresent(/location\.hash|history\.replaceState/, 'category view should sync to the URL hash');

assertPresent(/drop-target|setupDropContainers|card-container[^]*dragover/, 'category containers should be drop targets');
assertPresent(/\.\.\.originalLink|Object\.assign\(\{\},\s*originalLink/, 'drag saves should preserve all link fields');

assertPresent(/findDuplicateLink|duplicate/i, 'duplicate URL warning should exist');
assertPresent(/archive-theme|Archive Yellow|archive yellow/i, 'archive yellow theme should exist');
