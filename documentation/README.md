# Harcama Takibim

Harcama Takibim, gelir ve giderleri tarih, tür, açıklama ve tutar bilgisiyle kaydeden, kayıtları tabloda listeleyip aramaya izin veren ve toplam gelir, toplam gider ile bakiyeyi anlık hesaplayan bir Angular uygulamasıdır.

Uygulama tamamen tarayıcıda çalışır. Backend ve veritabanı yoktur; kayıtlar tarayıcının `localStorage` alanında saklanır ve sayfa yenilendiğinde ya da tarayıcı kapatıldığında kaybolmaz.

## Özellikler

* Tek form üzerinden gelir veya gider ekleme
* Giderde zorunlu, gelirde isteğe bağlı açıklama
* İleri tarih seçimine izin vermeyen tarih alanı
* Gelirleri yeşil, giderleri kırmızı gösteren tablo
* Açıklamaya göre Türkçe karakter uyumlu arama
* Silmeden önce onay penceresi
* Toplam gelir, toplam gider, bakiye ve işlem sayısı özeti
* Kalıcı veri saklama

## Teknolojiler

<table><thead><tr><th width="272.5999755859375">Teknoloji</th><th>Kullanım amacı</th></tr></thead><tbody><tr><td>Angular </td><td>Bileşen yapısı, veri bağlama (data binding), olay bağlama (event binding) ve kontrol akışı blokları (<code>@if</code>, <code>@for</code>, <code>@empty</code>)</td></tr><tr><td>TypeScript</td><td>Uygulama mantığı ve veri modeli</td></tr><tr><td>CSS</td><td>Tema, düzen ve tasarım</td></tr><tr><td>HTML</td><td>Form, tablo, buton ve onay kutusu yapısı</td></tr><tr><td>SweetAlert2</td><td>Uyarı, onay ve bildirim pencereleri</td></tr><tr><td>Web Storage API</td><td><code>localStorage</code> ile verilerin sekme açık kaldığı sürece saklanması</td></tr></tbody></table>
