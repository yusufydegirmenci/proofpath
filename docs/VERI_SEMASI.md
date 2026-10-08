# Veri şeması

Artifact `db` koleksiyonları. Çoğu yalnızca sahibine açıktır.

Herkese okuma, sahibine yazma: `league`, `cheers`, `league_notes` (`league/{self}` ve `cheers/{self}` herkes kendi belgesine yazabilir).

Yalnızca sahip: `prefs`, `projects`, `interview`, `profile`, `topics`, `days`, `exams`, `reports`, `story`, `rewards`, `badges`, `lessons`, `playbook`, `playbook_history`, `tickets`, `ticket_reviews`, `ticket_replies`, `audit`, `audit_votes`, `attempts`, `flags`, `inbox`, `progress`, `mistakes`, `reading`, `words`, `desk`.

## Önemli belgeler

- `prefs/main`: `{fs, simple, hc, pace}` (yazı boyutu, sade mod, yüksek kontrast, tempo). Koçlar okur.
- `projects/<id>`: `{title, why, kind, pid, lv, status, steps:[{t,done,ts,note}], notes[], claude[], created, finished}`. Hazır yollar `path-<pid>` kimliğini kullanır; adım ayrıntıları koddaki `PATHS` içindedir.
- `league/<uid>`: gün kaydı `d[tarih] = {v:2, qs:[soru indeksleri], rv:[tekrar indeksleri], n, ...}` ve `miss:[{i,d}]` (en çok 20).
- `lessons/<tarih>-<ccna|eng>`: koçun yazdığı ders blokları.
- `playbook/main`: koç kuralları (sürümlü).
- `progress/<tarih>`: günlük sayaçlar (`proj_n` vb.).

XP: proje adımı başına 10×seviye, proje tamamlama 60×seviye.
