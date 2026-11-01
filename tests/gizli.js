"use strict";
// Gizli test verisi (VA çözümleri): PP_GIZLI, yoksa ../proofpath-ops/kayitlar/gizli. Dosya yoksa [] döner (çağıran ATLANDI yazar).
const fs = require('fs'), path = require('path');
module.exports = function vaCozumler() {
  const dizin = [process.env.PP_GIZLI, path.join(__dirname, '..', '..', 'proofpath-ops', 'kayitlar', 'gizli')].find(d => d && fs.existsSync(d));
  if (!dizin) return [];
  return fs.readdirSync(dizin).filter(f => /^va-cozumler-.*\.json$/.test(f)).flatMap(f => JSON.parse(fs.readFileSync(path.join(dizin, f), 'utf8')));
};
