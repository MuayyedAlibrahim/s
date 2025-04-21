let map, marker;

// İllere ait koordinatlar
const coordinates = {
    'Adana': { lat: 37.0, lng: 35.3213 },
    'Adıyaman': { lat: 37.7648, lng: 38.2786 },
    'Afyonkarahisar': { lat: 38.7507, lng: 30.5567 },
    'Ağrı': { lat: 39.7191, lng: 43.0503 },
    'Amasya': { lat: 40.6499, lng: 35.8353 },
    'Ankara': { lat: 39.9208, lng: 32.8541 },
    'Antalya': { lat: 36.8841, lng: 30.7056 },
    'Artvin': { lat: 41.183, lng: 41.8183 },
    'Aydın': { lat: 37.856, lng: 27.8416 },
    'Balıkesir': { lat: 39.6484, lng: 27.8826 },
    'Bilecik': { lat: 40.0567, lng: 30.0665 },
    'Bingöl': { lat: 38.8846, lng: 40.4939 },
    'Bitlis': { lat: 38.4015, lng: 42.1078 },
    'Bolu': { lat: 40.7306, lng: 31.5898 },
    'Burdur': { lat: 37.7203, lng: 30.2908 },
    'Bursa': { lat: 40.1826, lng: 29.0669 },
    'Çanakkale': { lat: 40.1553, lng: 26.4142 },
    'Çankırı': { lat: 40.6013, lng: 33.6134 },
    'Çorum': { lat: 40.5506, lng: 34.9556 },
    'Denizli': { lat: 37.7833, lng: 29.0947 },
    'Diyarbakır': { lat: 37.9144, lng: 40.2306 },
    'Edirne': { lat: 41.6764, lng: 26.555 },
    'Elazığ': { lat: 38.681, lng: 39.2264 },
    'Erzincan': { lat: 39.75, lng: 39.5 },
    'Erzurum': { lat: 39.9059, lng: 41.2659 },
    'Eskişehir': { lat: 39.7767, lng: 30.5206 },
    'Gaziantep': { lat: 37.0662, lng: 37.3833 },
    'Giresun': { lat: 40.9175, lng: 38.3926 },
    'Hatay': { lat: 36.4018, lng: 36.3498 },
    'Isparta': { lat: 37.7648, lng: 30.5567 },
    'İstanbul': { lat: 41.0082, lng: 28.9784 },
    'İzmir': { lat: 38.4192, lng: 27.1287 },
    'Kars': { lat: 40.6013, lng: 43.1016 },
    'Kayseri': { lat: 38.7322, lng: 35.4853 },
    'Kocaeli': { lat: 40.8533, lng: 29.8815 },
    'Konya': { lat: 37.8667, lng: 32.4833 },
    'Malatya': { lat: 38.35, lng: 38.3167 },
    'Manisa': { lat: 38.6191, lng: 27.4289 },
    'Mardin': { lat: 37.3212, lng: 40.7245 },
    'Mersin': { lat: 36.8, lng: 34.6333 },
    'Muğla': { lat: 37.2153, lng: 28.3636 },
    'Ordu': { lat: 40.9839, lng: 37.8785 },
    'Rize': { lat: 41.0255, lng: 40.5177 },
    'Samsun': { lat: 41.2867, lng: 36.33 },
    'Sivas': { lat: 39.7477, lng: 37.0179 },
    'Şanlıurfa': { lat: 37.1674, lng: 38.7955 },
    'Tekirdağ': { lat: 40.978, lng: 27.5081 },
    'Trabzon': { lat: 41.0015, lng: 39.7178 },
    'Van': { lat: 38.5012, lng: 43.383 },
};

// Sayfa yüklendikten sonra illeri listeye eklemek
document.addEventListener("DOMContentLoaded", function() {
    const select = document.getElementById("province");
    if (select) {
        for (const province in coordinates) {
            let option = document.createElement("option");
            option.value = province;
            option.textContent = province;
            select.appendChild(option);
        }
        
        // İl seçildiğinde harita konumunu güncelleme
        select.addEventListener('change', function() {
            updateMapLocation(this.value); // Seçilen ile göre haritayı güncelle
        });
    }

    // Harita başlatma
    function initMap() {
        const initialLocation = coordinates['İstanbul'];  // Başlangıç konumu İstanbul
        map = L.map('map').setView([initialLocation.lat, initialLocation.lng], 7);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors'
        }).addTo(map);

        marker = L.marker([initialLocation.lat, initialLocation.lng]).addTo(map);
    }

    // Harita konumunu güncelleme
    function updateMapLocation(province) {
        const coords = coordinates[province];
        if (coords) {
            // Haritayı ilgili il'e odakla
            map.setView([coords.lat, coords.lng], 13);
            // Marker'ı ilgili il'e taşı
            marker.setLatLng([coords.lat, coords.lng]);
        }
    }

    // Harita başlatıldıktan sonra konum değişimlerini dinle
    initMap();  // window.onload yerine doğrudan burada initMap fonksiyonunu çağırıyoruz
});

document.addEventListener("DOMContentLoaded", function () {
    flatpickr("#birthdate", {
        dateFormat: "d-m-Y", // Gün-Ay-Yıl formatında gösterir
        allowInput: true, // Kullanıcı elle de tarih girebilir
    });
});



                
