// Operations Map JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Operation data with member locations
    const operationsData = [
        {
            id: 'corum-sel',
            title: 'Çorum Sel Bölgesi Kurtarma',
            status: 'completed',
            coordinates: [40.5489, 34.9533], // Çorum coordinates
            zoomLevel: 10,
            memberLocations: [
                { position: [40.5589, 34.9633], title: 'Kurtarma Ekibi 1', info: '5 personel' },
                { position: [40.5389, 34.9433], title: 'Kurtarma Ekibi 2', info: '4 personel' },
                { position: [40.5689, 34.9733], title: 'Sağlık Ekibi', info: '3 personel' },
                { position: [40.5289, 34.9333], title: 'Lojistik Ekibi', info: '3 personel' }
            ],
            affectedAreas: [
                [40.5589, 34.9633],
                [40.5389, 34.9433],
                [40.5689, 34.9733],
                [40.5289, 34.9333],
                [40.5489, 34.9533]
            ]
        },
        {
            id: 'izmir-deprem',
            title: 'İzmir Deprem Bölgesi Tarama',
            status: 'ongoing',
            coordinates: [38.1952, 26.8417], // İzmir Seferihisar coordinates
            zoomLevel: 11,
            memberLocations: [
                { position: [38.2052, 26.8517], title: 'Arama Kurtarma Ekibi 1', info: '8 personel' },
                { position: [38.1852, 26.8317], title: 'Arama Kurtarma Ekibi 2', info: '7 personel' },
                { position: [38.2152, 26.8617], title: 'Sağlık Ekibi 1', info: '4 personel' },
                { position: [38.1752, 26.8217], title: 'Sağlık Ekibi 2', info: '4 personel' }
            ],
            affectedAreas: [
                [38.2052, 26.8517],
                [38.1852, 26.8317],
                [38.2152, 26.8617],
                [38.1752, 26.8217],
                [38.1952, 26.8417]
            ]
        },
        {
            id: 'ankara-yangin',
            title: 'Ankara Yangın Sonrası Yardım',
            status: 'active',
            coordinates: [40.6773, 32.6284], // Kızılcahamam coordinates
            zoomLevel: 11,
            memberLocations: [
                { position: [40.6873, 32.6384], title: 'Yardım Ekibi 1', info: '6 personel' },
                { position: [40.6673, 32.6184], title: 'Yardım Ekibi 2', info: '5 personel' },
                { position: [40.6973, 32.6484], title: 'Sağlık Ekibi', info: '4 personel' },
                { position: [40.6573, 32.6084], title: 'Lojistik Ekibi', info: '3 personel' }
            ],
            affectedAreas: [
                [40.6873, 32.6384],
                [40.6673, 32.6184],
                [40.6973, 32.6484],
                [40.6573, 32.6084],
                [40.6773, 32.6284]
            ]
        }
    ];

    // Initialize operations map
    let operationsMap = null;
    let currentOperationLayers = [];
    
    // Flag to track if map has been initialized
    let mapInitialized = false;

    // Add click event listeners to operation items
    document.querySelectorAll('.operation-item').forEach((item, index) => {
        // Add a data attribute to identify each operation
        item.setAttribute('data-operation-id', operationsData[index].id);
        
        // Add selectable class for styling
        item.classList.add('selectable');
        
        // Add click event listener
        item.addEventListener('click', function() {
            // Remove active class from all operation items
            document.querySelectorAll('.operation-item').forEach(op => {
                op.classList.remove('active-operation');
            });
            
            // Add active class to clicked operation item
            this.classList.add('active-operation');
            
            // Get operation ID from data attribute
            const operationId = this.getAttribute('data-operation-id');
            
            // Show detailed map for selected operation
            showOperationMap(operationId);
        });
    });

    // Function to show operation map
    function showOperationMap(operationId) {
        // Find the selected operation data
        const operation = operationsData.find(op => op.id === operationId);
        
        if (!operation) return;
        
        // Get the operations map container
        const mapContainer = document.querySelector('.operations-map');
        
        // Check if Leaflet is available
        if (typeof L === 'undefined') {
            console.error('Leaflet library is not loaded');
            return;
        }
        
        // Clear previous layers if map exists
        if (operationsMap && mapInitialized) {
            currentOperationLayers.forEach(layer => {
                operationsMap.removeLayer(layer);
            });
            currentOperationLayers = [];
            
            // Update the view for existing map
            operationsMap.setView(operation.coordinates, operation.zoomLevel);
            // Force a map refresh
            operationsMap.invalidateSize();
        } else {
            // Clear previous content only if we need to create a new map
            mapContainer.innerHTML = '';
            
            // Create a div for the map
            const mapDiv = document.createElement('div');
            mapDiv.id = 'detailed-operations-map';
            mapDiv.style.height = '400px';
            mapDiv.style.width = '100%';
            mapContainer.appendChild(mapDiv);
            
            // Create new map
            operationsMap = L.map('detailed-operations-map').setView(operation.coordinates, operation.zoomLevel);
            mapInitialized = true;
            
            // Add tile layer
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap contributors'
            }).addTo(operationsMap);
            
            // Add resize handler to ensure map renders correctly
            setTimeout(() => {
                operationsMap.invalidateSize();
            }, 100);
        }
        
        // Add operation center marker
        const centerMarker = L.marker(operation.coordinates, {
            icon: L.divIcon({
                className: 'custom-div-icon',
                html: `<div style="background-color: #ff511a; padding: 5px; border-radius: 50%;"><i class="fas fa-flag" style="color: white;"></i></div>`,
                iconSize: [30, 30]
            })
        }).bindPopup(`<strong>${operation.title}</strong><br>Operasyon Merkezi`);
        
        centerMarker.addTo(operationsMap);
        currentOperationLayers.push(centerMarker);
        
        // Add member location markers
        operation.memberLocations.forEach(member => {
            const memberMarker = L.marker(member.position, {
                icon: L.divIcon({
                    className: 'custom-div-icon',
                    html: `<div style="background-color: #007bff; padding: 5px; border-radius: 50%;"><i class="fas fa-user" style="color: white;"></i></div>`,
                    iconSize: [25, 25]
                })
            }).bindPopup(`<strong>${member.title}</strong><br>${member.info}`);
            
            memberMarker.addTo(operationsMap);
            currentOperationLayers.push(memberMarker);
        });
        
        // Ensure map is properly sized
        setTimeout(() => {
            operationsMap.invalidateSize();
        }, 200);
        
        // Add affected area polygon - modified to prevent navigation disruption
        if (operation.affectedAreas && operation.affectedAreas.length > 0) {
            // Create a more natural polygon shape instead of connecting team positions
            // This prevents the lines from connecting team members directly
            const centerPoint = operation.coordinates;
            const radius = 0.05; // Approximate radius in degrees
            
            // Create a circle-like polygon around the center point
            const circlePoints = [];
            for (let i = 0; i < 10; i++) {
                const angle = i * Math.PI / 5;
                const lat = centerPoint[0] + radius * Math.cos(angle);
                const lng = centerPoint[1] + radius * Math.sin(angle);
                circlePoints.push([lat, lng]);
            }
            
            const affectedArea = L.polygon(circlePoints, {
                color: '#ff6600',
                fillColor: '#ff9900',
                fillOpacity: 0.3
            }).bindPopup('Etkilenen Bölge');
            
            affectedArea.addTo(operationsMap);
            currentOperationLayers.push(affectedArea);
        }
        
        // Add route paths
        if (operation.routePaths && operation.routePaths.length > 0) {
            operation.routePaths.forEach(path => {
                const routeLine = L.polyline(path, {
                    color: '#3388ff',
                    weight: 3,
                    dashArray: '5, 10'
                }).bindPopup('Operasyon Rotası');
                
                routeLine.addTo(operationsMap);
                currentOperationLayers.push(routeLine);
            });
        }

        // Add operation info panel
        const infoPanel = document.createElement('div');
        infoPanel.className = 'operation-info-panel';
        infoPanel.innerHTML = `
            <h5>${operation.title}</h5>
            <p><strong>Durum:</strong> ${getStatusText(operation.status)}</p>
            <p><strong>Ekip Sayısı:</strong> ${operation.memberLocations.length}</p>
            <p><strong>Toplam Personel:</strong> ${calculateTotalPersonnel(operation)}</p>
        `;
        mapContainer.appendChild(infoPanel);
        
        // Update member info section
        updateMemberInfo(operation);
    }
    
    // Function to get status text in Turkish
    function getStatusText(status) {
        switch(status) {
            case 'completed': return 'Tamamlandı';
            case 'ongoing': return 'Devam Ediyor';
            case 'active': return 'Aktif';
            default: return status;
        }
    }
    
    // Function to calculate total personnel
    function calculateTotalPersonnel(operation) {
        let total = 0;
        operation.memberLocations.forEach(member => {
            // Extract number from info string (e.g., "5 personel" -> 5)
            const match = member.info.match(/(\d+)\s*personel/);
            if (match && match[1]) {
                total += parseInt(match[1], 10);
            }
        });
        return total;
    }
    
    // Function to update member info section
    function updateMemberInfo(operation) {
        const memberInfo = document.querySelector('.member-info');
        if (memberInfo) {
            memberInfo.innerHTML = `
                <p>Seçili Operasyon: <strong>${operation.title}</strong></p>
                <p>Aktif Saha Ekibi: <strong>${operation.memberLocations.length} Ekip</strong></p>
                <p>Toplam Personel: <strong>${calculateTotalPersonnel(operation)} Personel</strong></p>
            `;
        }
    }
    
    // Add CSS styles for the operations map
    const style = document.createElement('style');
    style.textContent = `
        .operation-item.selectable {
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .operation-item.selectable:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 20px rgba(0,0,0,0.1);
        }
        
        .operation-item.active-operation {
            border: 2px solid #ff511a;
            background-color: rgba(255, 81, 26, 0.05);
        }
        
        .operations-map {
            position: relative;
            min-height: 400px;
            margin-top: 20px;
            border-radius: 10px;
            overflow: hidden;
        }
        
        .operation-info-panel {
            background-color: white;
            padding: 15px;
            border-radius: 5px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            margin-top: 15px;
        }
        
        .member-info {
            margin-top: 10px;
            padding: 10px;
            background-color: #f8f9fa;
            border-radius: 5px;
        }
        
        /* Ensure no lines are drawn between points */
        .leaflet-overlay-pane path {
            stroke-opacity: 0.7 !important;
        }
        
        /* Hide any connecting lines between team members */
        .member-location line,
        .member-location polyline,
        .member-location path {
            display: none !important;
        }
        
        /* Prevent map navigation disruption */
        .leaflet-container {
            z-index: 1;
        }
        
        /* Ensure markers appear above polygons */
        .custom-div-icon {
            z-index: 1000 !important;
        }
        
        /* Make sure the affected area doesn't interfere with navigation */
        .leaflet-interactive {
            pointer-events: auto;
        }
    `;


    document.head.appendChild(style);
    
    // Trigger click on first operation to show its map by default with a delay to ensure DOM is ready
    setTimeout(() => {
        const firstOperation = document.querySelector('.operation-item');
        if (firstOperation) {
            firstOperation.click();
        }
    }, 300);
    
    // Add event listener for scroll and section visibility
    document.addEventListener('scroll', function() {
        const operationsSection = document.getElementById('operasyonlar');
        if (operationsSection && isElementInViewport(operationsSection) && operationsMap) {
            // Force map to recalculate its size when operations section is visible
            operationsMap.invalidateSize();
        }
    });
    
    // Helper function to check if element is in viewport
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0
        );
    }
});