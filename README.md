# mmir-plugin-lang-support

[![MIT license](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
[![GitHub package.json version](https://img.shields.io/github/package-json/v/mmig/mmir-plugin-lang-support/master)](https://github.com/mmig/mmir-plugin-lang-support)
[![npm](https://img.shields.io/npm/v/mmir-plugin-lang-support)](https://www.npmjs.com/package/mmir-plugin-lang-support)
[![API](https://img.shields.io/badge/docs-API%20reference-orange.svg?style=flat)](https://mmig.github.io/mmir/api)
[![Guides](https://img.shields.io/badge/docs-guides-orange.svg?style=flat)](https://github.com/mmig/mmir/wiki)

tools for querying supported languages (ASR and TTS) and voices (TTS):
provides functionality for querying for supported ASR and TTS languages and voices.


## Initialization

Intialization of `LanguageSupport` instance with language data.

```typescript

// example data with array of arrays
// (alternatively data could be specified as array of dictionaries)

const asrLanguages = [
  //	[0] Language, [1]	6 char
  ["Arabic (Egypt)", "ara-EGY"],

  // ... or as dictionary:
  //{lang: "Arabic (Egypt)", code: "ara-EGY"}
  ...
];
const ttsLanguages = [
  //[0] Language, [1]	6 char, [2]	Voice Name, [3]	M / F
  ["Catalan", "cat-ESP", "Julio", "M"],

  // ... or as dictionary:
  //{lang: "Catalan", code: "cat-ESP", name: "Julio", gender: "M"}
 ...
];
const metaData: LanguageSupportIndex = {
  asrLabel:  0, // or dictionary example: 'lang'
  asrCode:   1, // or dictionary example: 'code'

  ttsCode:   1, // or dictionary example: 'code'
  ttsName:   2, // or dictionary example: 'name'
  ttsGender: 3  // or dictionary example: 'gender'
};
const transformGender = (data: 'F' | 'M') => data === 'F'? 'female' : 'male';

const langSupport = new LanguageSupport(
  asrLanguages,
  ttsLanguages,
  transformGender,
  metaData
);

```

## API

API for querying languages / voices via `LanguageSupport` instance.

```typescript
/**
 * query for ASR language
 *
 * @param type "code" | "label"
 * 					type of returned list: language code, language name
 *
 * @returns {Array<string>} list of strings of language codes or names
 */
getASR(type: "code" | "label"): string[];

/** get list of supported TTS language codes */
getTTS(type: "code"): string[];
/** get list of supported TTS languages (i.e. language labels) */
getTTS(type: "label"): string[];
/** get list of supported TTS voice details (OPTIONAL: filter for language (code) and/or voice gender) */
getTTS(type: "voice", langCode?: string, gender?: Gender): LabeledVoiceDetails[];
/** get list of supported TTS voices (OPTIONAL: filter for language (code) and/or voice gender) */
getTTS(type: "voiceName", langCode?: string, gender?: Gender): string[];
/**
 * query for TTS languages for voices
 *
 * @param type {"code" | "label" | "voice" | "voiceName"}
 * 					type of returned list: language code, language name, voice information, voice-name
 * @param [langCode] {String} OPTIONAL
 * 				if present for  "voice" or "voiceName", only voices with matching language code will be returned
 * 				Format: ISO3 language-code (lower-case) and optional ISO3 country-code (upper case), e.g. "eng-USA", "spa_ESP", "deu"
 * @param [gender] {Gender} OPTIONAL
 * 				if present for  "voice" or "voiceName", only voices with matching gender will be returned
 *
 * @returns {VoiceInfo} list of strings, depending on type parameter; in case of "voice" a list of voice-objects:
 * 				{name: STRING, language: STRING, gender: Gender}
 */
getTTS(type: "code" | "label" | "voice" | "voiceName", langCode?: string, gender?: Gender): (string | LabeledVoiceDetails)[];

/**
 * select a voice by its name or by filter (gender) and language-code
 *
 * @param  {string} langCode the language-code (may include a country-code); NOTE if a voice-name matches, the langCode is ignored!
 * @param  {string} query the voice name or filter-query; if FALSY the first matching voice for langCode will be used
 * @return {Voice} the voice matching the query (may be a "best match", i.e. not exactly match the query)
 */
ttsSelectVoiceFor(langCode: string, query?: Gender | string): LabeledVoiceDetails;

/**
 * get "best" matching voice for a language:
 * will try to select a voice with the specified gender (if specified) and country-code (if specified).
 *
 * If no matching voice (for specified gender and/or country-code) can be found, a voice that matches
 * the language-code will be returned.
 *
 * I.e. the function will always return a voice, as long as the language does have any voice; if the
 * language is not supported, NULL is returned.
 *
 *
 * NOTE: if gender and country-code are specified, the gender-specification is prioritized, i.e. the returned
 *       voice may have a different country-code.
 *
 *  @param langCode {String}
 *  			an ISO3 language code (lower case), optionally with ISO3 country code (upper case)
 *  @param [filter] {Gender} OPTIONAL
 *  			the (preferred) gender for the voice
 *
 *  @returns {VoiceResult} the best matching voice as {voice: {name: STRING, language: STRING, gender: Gender}, language: <language param>, filter: <filter param>}
 *           or NULL, if not voice could be found for that language
 */
getBestVoice(langCode: string, gender?: Gender): VoiceResult;

interface VoiceResult {
  voice: LabeledVoiceDetails;
  language: string;
  filter: string;
}

interface LabeledVoiceDetails {
  /** the name of the voice */
  name: string;
  /** a (human readable) label for the voice (if not available, returns same value as the name) */
  label: string;
  /** the language (code) of the voice */
  language: string;
  /** the gender of the voice */
  gender: "female" | "male" | "unknown";
  /** if voice is locally available or requires network/internet access */
  local: boolean | undefined;
}
```

## Integrations Notes

for usage in cordova-plugins, copy `/www` or `/src` to the appropriate
location in plugin, e.g. via the exported function
```javascript
const installFiles = require('mmir-plugin-lang-support');

installFiles(srcDirType: "src" | "www", targetDir: string, callback(err: Error | null))
```
