# İçerik güvenliği politikası (CSP) — yalnız Report-Only önerisi

Site GitHub Pages'te barındırılıyor; `Content-Security-Policy-Report-Only` yalnız **HTTP başlığı** olarak çalışır, `<meta>` ile tarayıcılar yok sayar. Bu yüzden sayfaya eklenmedi; başlık ayarlayabilen bir barındırmaya (Cloudflare/Netlify vb.) geçilince aşağıdaki politika ÖNCE Report-Only olarak denenir, ihlaller incelendikten sonra zorlanır.

```
default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' 'wasm-unsafe-eval' https://cdn.jsdelivr.net;
style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' data: https://fonts.gstatic.com;
img-src 'self' data: blob: https:; connect-src 'self' https://*.supabase.co wss://*.supabase.co https://cdn.jsdelivr.net;
worker-src 'self' blob:; object-src 'none'; base-uri 'self'; form-action 'self'
```
`unsafe-inline`/`unsafe-eval` mevcut kod (satır içi betik/stil, Pyodide) için gerekli; Report-Only çıktısına göre sıkılaştırılır.
