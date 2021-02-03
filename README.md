# mmir-plugin-lang-support

[![MIT license](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
[![GitHub package.json version](https://img.shields.io/github/package-json/v/mmig/mmir-plugin-lang-support/master)](https://github.com/mmig/mmir-plugin-lang-support)
[![npm](https://img.shields.io/npm/v/mmir-plugin-lang-support)](https://www.npmjs.com/package/mmir-plugin-lang-support)
[![API](https://img.shields.io/badge/docs-API%20reference-orange.svg?style=flat)](https://mmig.github.io/mmir/api)
[![Guides](https://img.shields.io/badge/docs-guides-orange.svg?style=flat)](https://github.com/mmig/mmir/wiki)

tools for querying supported languages (ASR and TTS) and voices (TTS)

NOTE: for usage in cordova-plugins, copy `/www` or `/src` to the appropriate
      location in plugin, e.g. via the exported function
      ```javascript
      const installFiles = require('mmir-plugin-lang-support');

      installFiles(srcDirType: "src" | "www", targetDir: string, callback(err: Error | null))
      ```
