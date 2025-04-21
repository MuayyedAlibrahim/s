// Harita başlatma
  var map = L.map('emergency-map').setView([39.9334, 32.8597], 6);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
  }).addTo(map);

  // Olay konumları ve detayları
  var events = [
      {
          coords: [40.5489, 34.9533], // Çorum
          title: "Çorum'da Sel Felaketi",
          type: "emergency",
          details: "Çorum'un kuzey ilçelerinde şiddetli yağışlar sonucu sel felaketi yaşandı. 3 köy tahliye edildi. Bölgede arama kurtarma çalışmaları devam ediyor.",
          date: "05 Mart 2025",
          icon_type: "flood"
      },
      {
          coords: [38.1952, 26.8417], // İzmir Seferihisar
          title: "İzmir'de 4.2 Şiddetinde Deprem",
          type: "warning",
          details: "İzmir'in Seferihisar ilçesi açıklarında 4.2 büyüklüğünde deprem meydana geldi. Can kaybı bildirilmedi. Hafif hasarlı binalar tespit edildi.",
          date: "28 Şubat 2025",
          icon_type: "earthquake"
      },
      {
          coords: [40.4725, 32.6506], // Kızılcahamam
          title: "Ankara'da Orman Yangını",
          type: "controlled",
          details: "Ankara'nın Kızılcahamam ilçesinde orman yangını çıktı. Yangın kontrol altına alındı. Soğutma çalışmaları devam ediyor.",
          date: "25 Şubat 2025",
          icon_type: "fire"
      },
      {
          coords: [40.9392, 40.0503], // Araklı
          title: "Trabzon'da Heyelan",
          type: "warning",
          details: "Trabzon'un Araklı ilçesinde şiddetli yağışlar sonucu heyelan meydana geldi. 2 ev tedbir amaçlı boşaltıldı. Bölgede çalışmalar sürüyor.",
          date: "20 Şubat 2025",
          icon_type: "flood"
      },
      {
          coords: [36.8969, 30.7133], // Antalya
          title: "Antalya'da Fırtına Hasarı",
          type: "controlled",
          details: "Antalya'da etkili olan fırtına nedeniyle bazı bölgelerde ağaçlar devrildi, çatılar hasar gördü. Ekipler hasarın giderilmesi için çalışıyor.",
          date: "15 Şubat 2025",
          icon_type: "wind"
      },
      {
          coords: [39.9000, 41.2700], // Palandöken
          title: "Erzurum'da Çığ Düşmesi",
          type: "warning",
          details: "Erzurum'un Palandöken ilçesinde çığ düşmesi meydana geldi. Yol ulaşıma kapandı. Karla mücadele ekipleri çalışmalarını sürdürüyor.",
          date: "10 Şubat 2025",
          icon_type: "snow"
      },
      {
          coords: [37.8764, 32.4846], // Konya
          title: "Konya'da Kum Fırtınası",
          type: "emergency",
          details: "Konya'da şiddetli rüzgar ve kum fırtınası nedeniyle görüş mesafesi düştü. Karayolunda ulaşım güçlükle sağlanıyor.",
          date: "08 Mart 2025",
          icon_type: "wind"
      },
      {
          coords: [41.0082, 28.9784], // İstanbul
          title: "İstanbul'da Şiddetli Yağış",
          type: "warning",
          details: "İstanbul'da etkili olan sağanak yağış nedeniyle bazı alt geçitlerde su birikintileri oluştu. Metro seferlerinde aksamalar yaşanıyor.",
          date: "07 Mart 2025",
          icon_type: "flood"
      },
      {
          coords: [37.0000, 35.3213], // Adana
          title: "Adana'da Sel Baskını",
          type: "emergency",
          details: "Adana'nın merkez ilçelerinde ani yağış sonucu sel baskını yaşandı. Birçok ev ve işyeri su altında kaldı.",
          date: "10 Mart 2025",
          icon_type: "flood"
      },
      {
          coords: [39.7500, 37.0000], // Sivas
          title: "Sivas'ta Kar Fırtınası",
          type: "warning",
          details: "Sivas'ta etkili olan kar fırtınası nedeniyle ulaşım aksadı. Bazı köy yolları ulaşıma kapandı.",
          date: "12 Mart 2025",
          icon_type: "snow"
      },
      {
          coords: [38.7312, 35.4787], // Kayseri
          title: "Kayseri'de Deprem",
          type: "emergency",
          details: "Kayseri'de 4.5 büyüklüğünde deprem meydana geldi. Bazı binalarda hasar oluştu.",
          date: "15 Mart 2025",
          icon_type: "earthquake"
      },
      {
          coords: [40.7650, 29.9400], // Kocaeli
          title: "Kocaeli'de Endüstriyel Yangın",
          type: "controlled",
          details: "Kocaeli'de bir fabrikada çıkan yangın kontrol altına alındı. Can kaybı yok.",
          date: "18 Mart 2025",
          icon_type: "fire"
      },
      {
          coords: [36.5500, 36.1667], // Hatay
          title: "Hatay'da Deprem",
          type: "emergency",
          details: "Hatay'da 4.8 büyüklüğünde deprem meydana geldi. Bazı binalarda hasar oluştu.",
          date: "20 Mart 2025",
          icon_type: "earthquake"
      },
      {
          coords: [37.8667, 27.8333], // Aydın
          title: "Aydın'da Orman Yangını",
          type: "warning",
          details: "Aydın'ın Kuşadası ilçesinde orman yangını çıktı. Müdahale çalışmaları devam ediyor.",
          date: "22 Mart 2025",
          icon_type: "fire"
      },
      {
          coords: [41.2867, 36.3300], // Samsun
          title: "Samsun'da Heyelan",
          type: "emergency",
          details: "Samsun'da şiddetli yağışlar sonucu heyelan meydana geldi. Bazı evler risk altında.",
          date: "25 Mart 2025",
          icon_type: "flood"
      },
      {
          coords: [39.9208, 32.8541], // Ankara
          title: "Ankara'da Fırtına",
          type: "warning",
          details: "Ankara'da şiddetli fırtına nedeniyle ağaçlar devrildi. Bazı bölgelerde elektrik kesintisi yaşanıyor.",
          date: "28 Mart 2025",
          icon_type: "wind"
      },
      {
          coords: [38.6333, 27.3667], // Manisa
          title: "Manisa'da Sel",
          type: "controlled",
          details: "Manisa'da yaşanan sel felaketi kontrol altına alındı. Hasar tespit çalışmaları sürüyor.",
          date: "30 Mart 2025",
          icon_type: "flood"
      },
      {
          coords: [37.5833, 36.9333], // Kahramanmaraş
          title: "Kahramanmaraş'ta Deprem",
          type: "warning",
          details: "Kahramanmaraş'ta 3.8 büyüklüğünde deprem meydana geldi. İlk belirlemelere göre hasar yok.",
          date: "02 Nisan 2025",
          icon_type: "earthquake"
      },
      {
          coords: [40.1833, 29.0667], // Bursa
          title: "Bursa'da Hortum",
          type: "emergency",
          details: "Bursa'nın sahil kesiminde hortum meydana geldi. Bazı binalarda hasar oluştu.",
          date: "05 Nisan 2025",
          icon_type: "wind"
      },
      {
          coords: [41.4500, 31.7833], // Zonguldak
          title: "Zonguldak'ta Maden Kazası",
          type: "emergency",
          details: "Zonguldak'ta bir maden ocağında göçük meydana geldi. Kurtarma çalışmaları devam ediyor.",
          date: "08 Nisan 2025",
          icon_type: "wind"
      },
  ];
  // İkon stilleri
  var icons = {
      emergency: L.divIcon({
          className: 'custom-div-icon',
          html: '<div style="background-color: #dc3545; padding: 5px; border-radius: 50%;"><i class="fas fa-exclamation-triangle" style="color: white;"></i></div>',
          iconSize: [30, 30]
      }),
      warning: L.divIcon({
          className: 'custom-div-icon',
          html: '<div style="background-color: #ffc107; padding: 5px; border-radius: 50%;"><i class="fas fa-exclamation" style="color: white;"></i></div>',
          iconSize: [30, 30]
      }),
      controlled: L.divIcon({
          className: 'custom-div-icon',
          html: '<div style="background-color: #28a745; padding: 5px; border-radius: 50%;"><i class="fas fa-check" style="color: white;"></i></div>',
          iconSize: [30, 30]
      }),
      // Olay tipine göre özel ikonlar
      flood: L.divIcon({
          className: 'custom-div-icon',
          html: '<div style="background-color: #0066cc; padding: 5px; border-radius: 50%;"><i class="fas fa-water" style="color: white;"></i></div>',
          iconSize: [30, 30]
      }),
      earthquake: L.divIcon({
          className: 'custom-div-icon',
          html: '<div style="background-color: #ff3300; padding: 5px; border-radius: 50%;"><i class="fas fa-house-damage" style="color: white;"></i></div>',
          iconSize: [30, 30]
      }),
      fire: L.divIcon({
          className: 'custom-div-icon',
          html: '<div style="background-color: #ff6600; padding: 5px; border-radius: 50%;"><i class="fas fa-fire" style="color: white;"></i></div>',
          iconSize: [30, 30]
      }),
      wind: L.divIcon({
          className: 'custom-div-icon',
          html: '<div style="background-color: #6699ff; padding: 5px; border-radius: 50%;"><i class="fas fa-wind" style="color: white;"></i></div>',
          iconSize: [30, 30]
      }),
      snow: L.divIcon({
          className: 'custom-div-icon',
          html: '<div style="background-color: #99ccff; padding: 5px; border-radius: 50%;"><i class="fas fa-snowflake" style="color: white;"></i></div>',
          iconSize: [30, 30]
      })
  };
  // Marker grupları
  var markerGroups = {
      flood: L.layerGroup(),
      earthquake: L.layerGroup(),
      fire: L.layerGroup(),
      wind: L.layerGroup(),
      snow: L.layerGroup()
  };

  // Olayları haritaya ekleme
  events.forEach(function(event) {
      var icon = event.icon_type && icons[event.icon_type] ? icons[event.icon_type] : icons[event.type];
      var marker = L.marker(event.coords, {icon: icon});
      
      var popupContent = '<div class="event-popup">' +
          '<h5>' + event.title + '</h5>' +
          '<p>' + event.details + '</p>' +
          '<p class="event-date"><i class="fas fa-calendar-alt"></i> ' + event.date + '</p>' +
          '<span class="event-status ' + event.type + '">' + 
          (event.type === 'emergency' ? 'Acil Durum' : 
           event.type === 'warning' ? 'Uyarı' : 'Kontrol Altında') + '</span>' +
          '</div>';
          
      marker.bindPopup(popupContent);

      // Marker'ı uygun gruba ekleme
      if (event.icon_type && markerGroups[event.icon_type]) {
          markerGroups[event.icon_type].addLayer(marker);
      }
  });

  // Tüm marker gruplarını haritaya ekleme
  Object.values(markerGroups).forEach(function(group) {
      group.addTo(map);
  });
  
  // Harita filtrelerini etkinleştirme
  document.getElementById('flood-toggle').addEventListener('change', function() {
      toggleMarkerGroup('flood', this.checked);
  });

  document.getElementById('earthquake-toggle').addEventListener('change', function() {
      toggleMarkerGroup('earthquake', this.checked);
  });

  document.getElementById('fire-toggle').addEventListener('change', function() {
      toggleMarkerGroup('fire', this.checked);
      toggleMarkerGroup('wind', this.checked);
  });

  document.getElementById('aid-toggle').addEventListener('change', function() {
      toggleMarkerGroup('snow', this.checked);
  });

  // Marker grubunu gösterme/gizleme
  function toggleMarkerGroup(type, show) {
      if (markerGroups[type]) {
          if (show) {
              markerGroups[type].addTo(map);
          } else {
              map.removeLayer(markerGroups[type]);
          }
      }
  }