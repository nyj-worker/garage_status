/* ==========================================================================
   남양주시 화물차고지 현장점검 스마트 맵 대시보드 - 스크립트 (app.js)
   데이터 기준일: 2026.11.16.
   ========================================================================== */

// =========================================================================
// 1. 제출된 PDF 데이터(2026.11.16. 기준) 내장 (관내 32개소 805대 + 관외 22시군 747대)
// =========================================================================
const localGarages = [
  // 관내 나대지 (15개 읍면동 - 557대)
  { id: "L01", name: "화도읍 일원 나대지", addr: "남양주시 화도읍 일원", type: "vacant", total: 106, inCity: 104, outCity: 2, note: "일반화물 36대 포함 (관내 최대 밀집)", lat: 37.6525, lng: 127.3015 },
  { id: "L02", name: "진건읍 일원 나대지", addr: "남양주시 진건읍 일원", type: "vacant", total: 75, inCity: 68, outCity: 7, note: "일반화물 54대, 관외차량 7대 점유", lat: 37.6625, lng: 127.1825 },
  { id: "L03", name: "진접읍 일원 나대지", addr: "남양주시 진접읍 일원", type: "vacant", total: 74, inCity: 72, outCity: 2, note: "일반화물 8대 포함", lat: 37.7210, lng: 127.1805 },
  { id: "L04", name: "양정동 일원 나대지", addr: "남양주시 양정동 일원", type: "vacant", total: 66, inCity: 62, outCity: 4, note: "일반화물 52대 집중, 관외 4대", lat: 37.6045, lng: 127.1855 },
  { id: "L05", name: "수동면 일원 나대지", addr: "남양주시 수동면 일원", type: "vacant", total: 52, inCity: 51, outCity: 1, note: "일반화물 22대 포함 (외곽 사각지대)", lat: 37.7255, lng: 127.3220 },
  { id: "L06", name: "와부읍 일원 나대지", addr: "남양주시 와부읍 일원", type: "vacant", total: 35, inCity: 35, outCity: 0, note: "전원 관내 등록 차량", lat: 37.5895, lng: 127.2225 },
  { id: "L07", name: "오남읍 일원 나대지", addr: "남양주시 오남읍 일원", type: "vacant", total: 31, inCity: 26, outCity: 5, note: "관외 등록 차량 5대 점유", lat: 37.6975, lng: 127.2035 },
  { id: "L08", name: "별내동 일원 나대지", addr: "남양주시 별내동 일원", type: "vacant", total: 23, inCity: 23, outCity: 0, note: "일반화물 11대 포함", lat: 37.6465, lng: 127.1265 },
  { id: "L09", name: "다산동 일원 나대지", addr: "남양주시 다산동 일원", type: "vacant", total: 23, inCity: 23, outCity: 0, note: "신도시 인접 나대지", lat: 37.6155, lng: 127.1525 },
  { id: "L10", name: "별내면 일원 나대지", addr: "남양주시 별내면 일원", type: "vacant", total: 16, inCity: 14, outCity: 2, note: "관외 2대 포함", lat: 37.6855, lng: 127.1285 },
  { id: "L11", name: "금곡동 일원 나대지", addr: "남양주시 금곡동 일원", type: "vacant", total: 16, inCity: 16, outCity: 0, note: "전원 관내 등록", lat: 37.6355, lng: 127.2135 },
  { id: "L12", name: "평내동 일원 나대지", addr: "남양주시 평내동 일원", type: "vacant", total: 13, inCity: 13, outCity: 0, note: "전원 관내 등록", lat: 37.6465, lng: 127.2415 },
  { id: "L13", name: "조안면 일원 나대지", addr: "남양주시 조안면 일원", type: "vacant", total: 12, inCity: 12, outCity: 0, note: "전원 관내 등록", lat: 37.5625, lng: 127.3055 },
  { id: "L14", name: "호평동 일원 나대지", addr: "남양주시 호평동 일원", type: "vacant", total: 9, inCity: 9, outCity: 0, note: "전원 관내 등록", lat: 37.6565, lng: 127.2475 },
  { id: "L15", name: "퇴계원면(읍) 일원 나대지", addr: "남양주시 퇴계원읍 일원", type: "vacant", total: 6, inCity: 6, outCity: 0, note: "전원 관내 등록", lat: 37.6475, lng: 127.1465 },

  // 관내 일반주차장 (17개소 - 248대)
  { id: "P01", name: "월산주차장", addr: "화도읍 월산리 20-5", type: "official", total: 57, inCity: 47, outCity: 10, note: "관외 등록 차량 최다 점유(10대)", lat: 37.6585, lng: 127.3260 },
  { id: "P02", name: "미디어주차장", addr: "별내2로 117", type: "official", total: 47, inCity: 39, outCity: 8, note: "관외 등록 차량 8대 점유", lat: 37.6510, lng: 127.1220 },
  { id: "P03", name: "탑사다리주차장", addr: "별내동 불암로109번길 23", type: "official", total: 31, inCity: 27, outCity: 4, note: "관외 등록 차량 4대 점유", lat: 37.6690, lng: 127.1140 },
  { id: "P04", name: "덕소주차장", addr: "와부읍 덕소리 469-1", type: "official", total: 29, inCity: 24, outCity: 5, note: "관외 등록 차량 5대 점유", lat: 37.5865, lng: 127.2145 },
  { id: "P05", name: "화도주차장", addr: "화도읍 묵현리 396-10", type: "official", total: 18, inCity: 18, outCity: 0, note: "전원 관내 차량", lat: 37.6645, lng: 127.2895 },
  { id: "P06", name: "경기물류주차장", addr: "화도읍 율석리 760-6", type: "official", total: 16, inCity: 16, outCity: 0, note: "전원 관내 차량", lat: 37.6435, lng: 127.2690 },
  { id: "P07", name: "하나주차장", addr: "진건읍 용정리 441-2 외 2필지", type: "official", total: 13, inCity: 13, outCity: 0, note: "일반화물 12대 포함", lat: 37.7120, lng: 127.1750 },
  { id: "P08", name: "월산주차장3 (19-13)", addr: "화도읍 월산리 19-13", type: "official", total: 6, inCity: 4, outCity: 2, note: "관외 등록 차량 2대", lat: 37.6598, lng: 127.3242 },
  { id: "P09", name: "빙그레주차장", addr: "다산동(도농동) 344-3", type: "official", total: 6, inCity: 5, outCity: 1, note: "관외 등록 차량 1대", lat: 37.6115, lng: 127.1580 },
  { id: "P10", name: "행복주차장", addr: "화도읍 마석우리 263-1", type: "official", total: 5, inCity: 5, outCity: 0, note: "전원 관내 차량", lat: 37.6530, lng: 127.3050 },
  { id: "P11", name: "창현주차장", addr: "화도읍 금곡리 848-4", type: "official", total: 5, inCity: 5, outCity: 0, note: "전원 관내 차량", lat: 37.6480, lng: 127.3180 },
  { id: "P12", name: "새말주차장", addr: "진접읍 부평리 804", type: "official", total: 5, inCity: 5, outCity: 0, note: "전원 관내 차량", lat: 37.7280, lng: 127.1850 },
  { id: "P13", name: "백두주차장", addr: "화도읍 묵현리 39-7", type: "official", total: 3, inCity: 3, outCity: 0, note: "전원 관내 차량", lat: 37.6662, lng: 127.2870 },
  { id: "P14", name: "용정리 57-5 차고지", addr: "진건읍 용정리 57-5", type: "official", total: 3, inCity: 3, outCity: 0, note: "전원 관내 차량", lat: 37.7095, lng: 127.1775 },
  { id: "P15", name: "퇴계원주차장", addr: "퇴계원읍 퇴계원리 345", type: "official", total: 2, inCity: 2, outCity: 0, note: "전원 관내 차량", lat: 37.6485, lng: 127.1430 },
  { id: "P16", name: "월산주차장3 (19-15)", addr: "화도읍 월산리 19-15", type: "official", total: 1, inCity: 1, outCity: 0, note: "전원 관내 차량", lat: 37.6592, lng: 127.3252 },
  { id: "P17", name: "경기주차장", addr: "삼패동 274-3", type: "official", total: 1, inCity: 1, outCity: 0, note: "전원 관내 차량", lat: 37.5960, lng: 127.1930 }
];

const outsideGarages = [
  { region: "포천시", total: 137, individual: 103, corporate: 34, risk: "1등급_원거리위험", lat: 37.8949, lng: 127.2003 },
  { region: "여주시", total: 125, individual: 8, corporate: 117, risk: "1등급_원거리위험", lat: 37.2983, lng: 127.6374 },
  { region: "충청북도", total: 124, individual: 98, corporate: 26, risk: "1등급_원거리위험", lat: 36.6357, lng: 127.4914 },
  { region: "연천군", total: 109, individual: 47, corporate: 62, risk: "1등급_원거리위험", lat: 38.0965, lng: 127.0748 },
  { region: "충청남도", total: 71, individual: 52, corporate: 19, risk: "1등급_원거리위험", lat: 36.6588, lng: 126.6728 },
  { region: "용인시", total: 43, individual: 9, corporate: 34, risk: "1등급_원거리위험", lat: 37.2410, lng: 127.1775 },
  { region: "인천시", total: 39, individual: 39, corporate: 0, risk: "1등급_원거리위험", lat: 37.4563, lng: 126.7052 },
  { region: "파주시", total: 17, individual: 10, corporate: 7, risk: "중위험_타시군", lat: 37.7599, lng: 126.7802 },
  { region: "이천시", total: 13, individual: 13, corporate: 0, risk: "중위험_타시군", lat: 37.2723, lng: 127.4350 },
  { region: "양주시", total: 13, individual: 6, corporate: 7, risk: "중위험_타시군", lat: 37.7853, lng: 127.0458 },
  { region: "양평군", total: 12, individual: 12, corporate: 0, risk: "인접시군", lat: 37.4917, lng: 127.4876 },
  { region: "오산시", total: 11, individual: 11, corporate: 0, risk: "중위험_타시군", lat: 37.1498, lng: 127.0772 },
  { region: "화성시", total: 7, individual: 7, corporate: 0, risk: "중위험_타시군", lat: 37.1995, lng: 126.8312 },
  { region: "평택시", total: 6, individual: 6, corporate: 0, risk: "중위험_타시군", lat: 36.9921, lng: 127.1129 },
  { region: "군포시", total: 6, individual: 6, corporate: 0, risk: "중위험_타시군", lat: 37.3616, lng: 126.9352 },
  { region: "의정부시", total: 4, individual: 4, corporate: 0, risk: "인접시군", lat: 37.7381, lng: 127.0337 },
  { region: "가평군", total: 3, individual: 3, corporate: 0, risk: "인접시군", lat: 37.8315, lng: 127.5095 },
  { region: "김포시", total: 2, individual: 2, corporate: 0, risk: "중위험_타시군", lat: 37.6152, lng: 126.7156 },
  { region: "광주시", total: 2, individual: 2, corporate: 0, risk: "인접시군", lat: 37.4294, lng: 127.2551 },
  { region: "강원도", total: 1, individual: 1, corporate: 0, risk: "1등급_원거리위험", lat: 37.8854, lng: 127.7298 },
  { region: "시흥시", total: 1, individual: 1, corporate: 0, risk: "중위험_타시군", lat: 37.3800, lng: 126.8029 },
  { region: "수원시", total: 1, individual: 1, corporate: 0, risk: "중위험_타시군", lat: 37.2636, lng: 127.0286 }
];

// 관내 거점별 위험 점수 및 점검 등급 자동 산출
localGarages.forEach(g => {
  let score = 0;
  if (g.type === 'vacant') score += 40;
  if (g.total >= 50) score += 25;
  else if (g.total >= 20) score += 15;
  if (g.outCity > 0) score += 20;
  g.riskScore = score;

  if (g.type === 'vacant' && g.total >= 30) {
    g.grade = "2등급_초고밀나대지";
  } else if (g.type === 'vacant') {
    g.grade = "2등급_관내나대지";
  } else if (g.outCity >= 5) {
    g.grade = "3등급_관외점유주차장";
  } else {
    g.grade = "일반_공식주차장";
  }
});
localGarages.sort((a, b) => b.riskScore - a.riskScore || b.total - a.total);

// 상태 관리 (브라우저 localStorage 연동)
let inspectionRecords = JSON.parse(localStorage.getItem("nyj_garage_inspections_2026") || "{}");
let currentMapMode = "local";
let currentFilter = "all";
let activeModalId = null;
let uploadedGradedRows = [];

let map = null;
let markerLayerGroup = null;
let inspectorMarker = null;

// =========================================================================
// 2. Leaflet 지도 초기화 (무인증 표준 도로지도 + OSM 미러 + 위성지도 전환)
// =========================================================================
function initMap() {
  map = L.map("map", {
    center: [37.6480, 127.2180],
    zoom: 12,
    zoomControl: true
  });

  // 1) Esri World Street Map (로컬 file:/// 및 웹 모두 403 차단 없이 로드되는 표준 도로지도)
  const standardStreetMap = L.tileLayer(
    "https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}",
    {
      attribution: "Tiles &copy; Esri &mdash; Source: Esri, HERE, Garmin, OpenStreetMap contributors | 남양주시 화물팀",
      maxZoom: 19
    }
  );

  // 2) OpenStreetMap DE 미러 서버 (로컬 파일 Referer 정책 우회 OSM 타일)
  const osmMirrorMap = L.tileLayer(
    "https://tile.openstreetmap.de/{z}/{x}/{y}.png",
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | 남양주시 화물팀',
      maxZoom: 18
    }
  );

  // 3) 위성지도 + 지명·도로 하이브리드 (나대지 실주차 및 공터 확인용)
  const satelliteBase = L.tileLayer(
    "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    {
      attribution: "Tiles &copy; Esri &mdash; Maxar, Earthstar Geographics",
      maxZoom: 19
    }
  );
  const satelliteLabels = L.tileLayer(
    "https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}",
    {
      maxZoom: 19,
      pane: "overlayPane"
    }
  );
  const hybridSatelliteGroup = L.layerGroup([satelliteBase, satelliteLabels]);

  standardStreetMap.addTo(map);

  L.control.layers(
    {
      "🗺️ 일반도로지도 (표준)": standardStreetMap,
      "🧭 OpenStreetMap (OSM)": osmMirrorMap,
      "🛰️ 위성지도 (나대지 공터 확인)": hybridSatelliteGroup
    },
    null,
    { position: "topright", collapsed: false }
  ).addTo(map);

  markerLayerGroup = L.layerGroup().addTo(map);

  const fitLocalBounds = () => {
    if (!map) return;
    map.invalidateSize({ animate: false });
    if (currentMapMode === "local") {
      const bounds = L.latLngBounds(localGarages.map(g => [g.lat, g.lng]));
      map.fitBounds(bounds, { padding: [38, 38], maxZoom: 12, animate: false });
    }
  };

  setTimeout(fitLocalBounds, 120);
  setTimeout(fitLocalBounds, 500);
  window.addEventListener("resize", () => map && map.invalidateSize());

  if (typeof ResizeObserver !== "undefined") {
    const ro = new ResizeObserver(() => map && map.invalidateSize());
    ro.observe(document.getElementById("map"));
  }
}

function renderMapMarkers() {
  if (!markerLayerGroup) return;
  markerLayerGroup.clearLayers();

  if (currentMapMode === "local") {
    const visibleCoords = [];

    localGarages.forEach(site => {
      if (currentFilter === "vacant" && site.type !== "vacant") return;
      if (currentFilter === "official" && site.type !== "official") return;
      if (currentFilter === "outside_occ" && site.outCity === 0) return;

      visibleCoords.push([site.lat, site.lng]);
      const rec = inspectionRecords[site.id] || { status: "미점검", observed: "", memo: "" };
      const isChecked = rec.status !== "미점검";

      let fillColor = site.type === "vacant" ? "#e11d48" : "#2563eb";
      if (isChecked) fillColor = "#10b981";

      const radius = Math.max(9, Math.min(24, 7 + Math.sqrt(site.total) * 1.7));

      const circle = L.circleMarker([site.lat, site.lng], {
        radius: radius,
        fillColor: fillColor,
        color: "#ffffff",
        weight: 2.5,
        opacity: 1,
        fillOpacity: 0.88
      });

      const statusBadge = getStatusBadgeHTML(rec.status);
      const popupHTML = `
        <div class="min-w-[230px] space-y-2">
          <div class="flex items-center justify-between gap-2">
            <span class="text-[11px] font-bold px-2 py-0.5 rounded ${site.type === 'vacant' ? 'bg-rose-100 text-rose-700' : 'bg-blue-100 text-blue-700'}">
              ${site.type === 'vacant' ? '관내 나대지' : '일반주차장'}
            </span>
            ${statusBadge}
          </div>
          <div>
            <div class="font-extrabold text-sm text-slate-900">${site.name}</div>
            <div class="text-xs text-slate-500">${site.addr}</div>
          </div>
          <div class="grid grid-cols-3 gap-1 bg-slate-50 p-2 rounded-lg text-center border border-slate-100">
            <div><div class="text-[10px] text-slate-400">소계</div><div class="font-bold text-slate-900 text-xs">${site.total}대</div></div>
            <div><div class="text-[10px] text-slate-400">관내</div><div class="font-bold text-blue-600 text-xs">${site.inCity}대</div></div>
            <div><div class="text-[10px] text-slate-400">관외</div><div class="font-bold text-amber-600 text-xs">${site.outCity}대</div></div>
          </div>
          <div class="text-[11px] text-slate-600 bg-amber-50/70 px-2 py-1 rounded border border-amber-100">
            💡 ${site.note}
          </div>
          <button onclick="openInspectionModal('${site.id}')" class="w-full py-1.5 rounded-lg bg-slate-900 hover:bg-blue-600 text-white text-xs font-bold transition">
            📝 현장 점검결과 입력/수정
          </button>
        </div>
      `;

      circle.bindPopup(popupHTML);
      circle.bindTooltip(`<strong>${site.name}</strong> (${site.total}대)`, { direction: "top", offset: [0, -6] });
      markerLayerGroup.addLayer(circle);
    });

    if (visibleCoords.length > 0 && map) {
      map.fitBounds(L.latLngBounds(visibleCoords), { padding: [38, 38], maxZoom: 13 });
    }
  } else {
    // Wide mode: 남양주시 본거지 + 관외 22개 시·군
    const nyjOrigin = L.circleMarker([37.6360, 127.2165], {
      radius: 14,
      fillColor: "#1d4ed8",
      color: "#ffffff",
      weight: 3,
      fillOpacity: 0.95
    }).bindPopup(`<strong>남양주시 (본거지)</strong><br/>관내 등록 화물차 1,499대 중 747대(49.8%)가 관외 차고지 등록`);
    markerLayerGroup.addLayer(nyjOrigin);

    const allWideCoords = [[37.6360, 127.2165]];
    outsideGarages.forEach(item => {
      allWideCoords.push([item.lat, item.lng]);
      const isHigh = item.risk === "1등급_원거리위험";
      const radius = Math.max(8, Math.min(25, 6 + Math.sqrt(item.total) * 1.6));

      const line = L.polyline([[37.6360, 127.2165], [item.lat, item.lng]], {
        color: isHigh ? "#d97706" : "#64748b",
        weight: isHigh ? 2.2 : 1.3,
        dashArray: "5, 6",
        opacity: 0.75
      });
      markerLayerGroup.addLayer(line);

      const marker = L.circleMarker([item.lat, item.lng], {
        radius: radius,
        fillColor: isHigh ? "#d97706" : "#475569",
        color: "#ffffff",
        weight: 2,
        fillOpacity: 0.9
      });

      marker.bindPopup(`
        <div class="min-w-[200px] space-y-1.5">
          <span class="text-[11px] font-bold px-2 py-0.5 rounded ${isHigh ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-700'}">${item.risk}</span>
          <div class="font-extrabold text-sm text-slate-900">${item.region} 차고지</div>
          <div class="text-xs text-slate-600">총 <strong>${item.total}대</strong> (개인 ${item.individual}대 / 일반 ${item.corporate}대)</div>
          <div class="text-[11px] text-rose-600 font-medium">※ 타 지자체 교차 점검 공문 발송 대상</div>
        </div>
      `);
      marker.bindTooltip(`<strong>${item.region}</strong>: ${item.total}대`, { direction: "top" });
      markerLayerGroup.addLayer(marker);
    });

    if (map) {
      map.fitBounds(L.latLngBounds(allWideCoords), { padding: [35, 35], maxZoom: 9 });
    }
  }
}

function setMapMode(mode) {
  currentMapMode = mode;
  const btnLocal = document.getElementById("btnModeLocal");
  const btnWide = document.getElementById("btnModeWide");
  const filterBar = document.getElementById("localFilterBar");

  map.invalidateSize();
  if (mode === "local") {
    btnLocal.className = "px-3 py-1.5 rounded-lg text-xs sm:text-sm font-bold bg-white text-blue-700 shadow-sm transition";
    btnWide.className = "px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-900 transition";
    filterBar.classList.remove("hidden");
  } else {
    btnWide.className = "px-3 py-1.5 rounded-lg text-xs sm:text-sm font-bold bg-white text-amber-700 shadow-sm transition";
    btnLocal.className = "px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-900 transition";
    filterBar.classList.add("hidden");
  }
  renderMapMarkers();
}

function setFilter(filterKey) {
  currentFilter = filterKey;
  document.querySelectorAll(".filter-pill").forEach(btn => {
    if (btn.dataset.filter === filterKey) {
      btn.classList.add("ring-2", "ring-offset-1", "ring-slate-800");
    } else {
      btn.classList.remove("ring-2", "ring-offset-1", "ring-slate-800");
    }
  });
  renderMapMarkers();
  renderSiteList();
}

function locateInspector() {
  if (!navigator.geolocation) {
    alert("현재 브라우저에서 GPS 위치 기능을 지원하지 않습니다.");
    return;
  }
  navigator.geolocation.getCurrentPosition(
    pos => {
      const { latitude, longitude } = pos.coords;
      if (inspectorMarker) map.removeLayer(inspectorMarker);
      inspectorMarker = L.circleMarker([latitude, longitude], {
        radius: 10,
        fillColor: "#10b981",
        color: "#ffffff",
        weight: 3,
        fillOpacity: 1
      }).addTo(map).bindPopup("<strong>📍 현재 점검반 위치</strong>").openPopup();
      map.flyTo([latitude, longitude], 14);
    },
    () => alert("위치 권한을 허용해 주시면 주변 차고지를 즉시 탐색할 수 있습니다.")
  );
}

// =========================================================================
// 3. 우선순위 현장점검 목록 및 점검입력 모달 관리
// =========================================================================
function getStatusBadgeHTML(status) {
  switch (status) {
    case "정상주차": return `<span class="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">✅ 정상주차</span>`;
    case "부재의심": return `<span class="text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">⚠️ 부재의심</span>`;
    case "적발계도": return `<span class="text-[11px] font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-700">🚨 적발·계도</span>`;
    default: return `<span class="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">⬜ 미점검</span>`;
  }
}

function renderSiteList() {
  const container = document.getElementById("siteListContainer");
  const keyword = document.getElementById("searchInput").value.trim().toLowerCase();
  const statusFilter = document.getElementById("statusFilter").value;

  const filtered = localGarages.filter(site => {
    if (currentFilter === "vacant" && site.type !== "vacant") return false;
    if (currentFilter === "official" && site.type !== "official") return false;
    if (currentFilter === "outside_occ" && site.outCity === 0) return false;

    const rec = inspectionRecords[site.id] || { status: "미점검" };
    if (statusFilter !== "all" && rec.status !== statusFilter) return false;

    if (keyword && !site.name.toLowerCase().includes(keyword) && !site.addr.toLowerCase().includes(keyword)) {
      return false;
    }
    return true;
  });

  if (filtered.length === 0) {
    container.innerHTML = `<div class="py-12 text-center text-xs text-slate-400">조건에 해당하는 차고지 거점이 없습니다.</div>`;
    return;
  }

  container.innerHTML = filtered.map(site => {
    const rec = inspectionRecords[site.id] || { status: "미점검", observed: "", memo: "" };
    return `
      <div class="py-3 px-2 hover:bg-slate-50 rounded-xl transition cursor-pointer group" onclick="focusSite('${site.id}')">
        <div class="flex items-start justify-between gap-2">
          <div class="space-y-0.5">
            <div class="flex items-center gap-1.5">
              <span class="text-[10px] font-extrabold px-1.5 py-0.5 rounded ${site.type === 'vacant' ? 'bg-rose-50 text-rose-600 border border-rose-200' : 'bg-blue-50 text-blue-600 border border-blue-200'}">
                ${site.type === 'vacant' ? '나대지' : '주차장'}
              </span>
              <span class="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-blue-600 transition">${site.name}</span>
            </div>
            <div class="text-[11px] text-slate-500">${site.addr}</div>
          </div>
          <div class="text-right shrink-0">
            <div class="text-sm font-extrabold text-slate-900">${site.total}대</div>
            <div class="text-[10px] text-slate-400">관내 ${site.inCity} / 관외 ${site.outCity}</div>
          </div>
        </div>
        <div class="mt-2 flex items-center justify-between">
          ${getStatusBadgeHTML(rec.status)}
          <button onclick="event.stopPropagation(); openInspectionModal('${site.id}')" class="text-[11px] font-semibold text-blue-600 hover:underline">
            점검기록 입력 &rarr;
          </button>
        </div>
        ${rec.memo ? `<div class="mt-1.5 text-[11px] text-slate-600 bg-slate-100 px-2 py-1 rounded truncate">💬 ${rec.memo}</div>` : ""}
      </div>
    `;
  }).join("");

  updateProgressKPI();
}

function focusSite(siteId) {
  const site = localGarages.find(s => s.id === siteId);
  if (!site) return;
  if (currentMapMode !== "local") setMapMode("local");
  map.invalidateSize();
  map.flyTo([site.lat, site.lng], 15, { duration: 0.7 });
  setTimeout(() => {
    markerLayerGroup.eachLayer(layer => {
      if (layer.getLatLng && Math.abs(layer.getLatLng().lat - site.lat) < 0.0001) {
        layer.openPopup();
      }
    });
  }, 750);
}

function openInspectionModal(siteId) {
  const site = localGarages.find(s => s.id === siteId);
  if (!site) return;
  activeModalId = siteId;
  const rec = inspectionRecords[siteId] || { status: "미점검", observed: "", memo: "" };

  const badge = document.getElementById("modalBadge");
  badge.textContent = site.type === "vacant" ? "2등급: 관내 나대지 차고지" : "관내 일반주차장";
  badge.className = `text-xs font-bold px-2 py-0.5 rounded ${site.type === "vacant" ? "bg-rose-100 text-rose-700" : "bg-blue-100 text-blue-700"}`;

  document.getElementById("modalTitle").textContent = site.name;
  document.getElementById("modalSubtitle").textContent = `${site.addr} · ${site.note}`;
  document.getElementById("modalTotal").textContent = `${site.total}대`;
  document.getElementById("modalIn").textContent = `${site.inCity}대`;
  document.getElementById("modalOut").textContent = `${site.outCity}대`;

  document.getElementById("modalStatus").value = rec.status;
  document.getElementById("modalObservedCount").value = rec.observed;
  document.getElementById("modalMemo").value = rec.memo;

  const modal = document.getElementById("inspectionModal");
  modal.classList.remove("hidden");
  modal.classList.add("flex");
}

function closeModal() {
  const modal = document.getElementById("inspectionModal");
  modal.classList.add("hidden");
  modal.classList.remove("flex");
  activeModalId = null;
}

function saveInspection() {
  if (!activeModalId) return;
  inspectionRecords[activeModalId] = {
    status: document.getElementById("modalStatus").value,
    observed: document.getElementById("modalObservedCount").value,
    memo: document.getElementById("modalMemo").value.trim(),
    updatedAt: new Date().toLocaleString("ko-KR")
  };
  localStorage.setItem("nyj_garage_inspections_2026", JSON.stringify(inspectionRecords));
  closeModal();
  renderMapMarkers();
  renderSiteList();
}

function resetAllInspections() {
  if (!confirm("저장된 모든 현장 점검 기록을 초기화하시겠습니까?")) return;
  inspectionRecords = {};
  localStorage.removeItem("nyj_garage_inspections_2026");
  renderMapMarkers();
  renderSiteList();
}

function updateProgressKPI() {
  const totalSites = localGarages.length;
  const checkedCount = localGarages.filter(s => inspectionRecords[s.id] && inspectionRecords[s.id].status !== "미점검").length;
  const pct = Math.round((checkedCount / totalSites) * 100);
  document.getElementById("kpiCheckedCount").textContent = `${checkedCount} / ${totalSites}개소`;
  document.getElementById("kpiCheckedPct").textContent = `${pct}%`;
  document.getElementById("kpiProgressBar").style.width = `${pct}%`;
}

// =========================================================================
// 4. Chart.js 통계 차트 시각화
// =========================================================================
function initCharts() {
  const top10Local = [...localGarages].sort((a, b) => b.total - a.total).slice(0, 10);
  new Chart(document.getElementById("localChart"), {
    type: "bar",
    data: {
      labels: top10Local.map(d => d.name.replace(" 일원 나대지", "(나대지)")),
      datasets: [
        { label: "관내 등록 차량", data: top10Local.map(d => d.inCity), backgroundColor: "#3b82f6", borderRadius: 4 },
        { label: "관외 등록 차량", data: top10Local.map(d => d.outCity), backgroundColor: "#f59e0b", borderRadius: 4 }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { position: "top", labels: { boxWidth: 12, font: { size: 11 } } } },
      scales: {
        x: { stacked: true, ticks: { font: { size: 10 } } },
        y: { stacked: true, beginAtZero: true }
      }
    }
  });

  const top10Outside = outsideGarages.slice(0, 10);
  new Chart(document.getElementById("outsideChart"), {
    type: "bar",
    data: {
      labels: top10Outside.map(d => d.region),
      datasets: [
        { label: "개인화물", data: top10Outside.map(d => d.individual), backgroundColor: "#6366f1", borderRadius: 4 },
        { label: "일반화물", data: top10Outside.map(d => d.corporate), backgroundColor: "#f43f5e", borderRadius: 4 }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { position: "top", labels: { boxWidth: 12, font: { size: 11 } } } },
      scales: {
        x: { stacked: true, ticks: { font: { size: 11 } } },
        y: { stacked: true, beginAtZero: true }
      }
    }
  });
}

// =========================================================================
// 5. SheetJS 엑셀 업로드(개별 차량 위험등급 분류) 및 점검결과 내보내기
// =========================================================================
function exportInspectionExcel() {
  const rows = localGarages.map((site, index) => {
    const rec = inspectionRecords[site.id] || { status: "미점검", observed: "", memo: "", updatedAt: "" };
    return {
      "점검순위": index + 1,
      "위험등급": site.grade,
      "유형": site.type === "vacant" ? "관내나대지" : "일반주차장",
      "차고지명(읍면동)": site.name,
      "소재지": site.addr,
      "등록소계(대)": site.total,
      "관내차량(대)": site.inCity,
      "관외차량(대)": site.outCity,
      "현장점검결과": rec.status,
      "현장확인대수": rec.observed,
      "현장메모": rec.memo,
      "점검일시": rec.updatedAt,
      "비고": site.note
    };
  });

  const wb = XLSX.utils.book_new();
  const wsLocal = XLSX.utils.json_to_sheet(rows);
  XLSX.utils.book_append_sheet(wb, wsLocal, "관내_현장점검결과");

  const outsideRows = outsideGarages.map((o, i) => ({
    "순위": i + 1,
    "위험등급": o.risk,
    "관외차고지(시군)": o.region,
    "소계(대)": o.total,
    "개인화물(대)": o.individual,
    "일반화물(대)": o.corporate
  }));
  const wsOutside = XLSX.utils.json_to_sheet(outsideRows);
  XLSX.utils.book_append_sheet(wb, wsOutside, "관외_원거리차고지");

  XLSX.writeFile(wb, `남양주시_화물차고지_현장점검결과_${new Date().toISOString().slice(0, 10)}.xlsx`);
}

function handleExcelUpload(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    const data = new Uint8Array(e.target.result);
    const workbook = XLSX.read(data, { type: "array" });
    const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = XLSX.utils.sheet_to_json(firstSheet, { defval: "" });

    if (jsonData.length === 0) {
      alert("엑셀 시트에 데이터가 없습니다.");
      return;
    }

    const highRiskRegions = ["포천시", "여주시", "충청북도", "연천군", "충청남도", "용인시", "인천시"];
    const officialKeywords = ["주차장", "경기물류", "용정리 57-5"];

    uploadedGradedRows = jsonData.map(row => {
      const gubun = String(row["차고지구분"] || row["구분"] || "");
      const sigun = String(row["차고지시군"] || row["시군"] || row["소재지"] || "");
      const addr = String(row["차고지상세주소"] || row["상세주소"] || row["차고지위치"] || sigun);
      const illegalCnt = Number(row["단속민원건수"] || row["적발건수"] || 0);

      const isOfficial = officialKeywords.some(k => addr.includes(k));
      const facilityType = gubun.includes("관외") ? "관외차고지" : (isOfficial ? "관내_일반주차장" : "관내_나대지");

      let grade = "4등급_일반관리";
      if (illegalCnt >= 1 && (gubun.includes("관외") || facilityType === "관내_나대지")) {
        grade = "0순위_즉시현장점검";
      } else if (gubun.includes("관외") && highRiskRegions.some(r => sigun.includes(r) || addr.includes(r))) {
        grade = "1등급_원거리서류의심";
      } else if (facilityType === "관내_나대지") {
        grade = "2등급_관내나대지점검";
      }

      return {
        ...row,
        "자동분류_유형": facilityType,
        "자동분류_점검등급": grade
      };
    });

    uploadedGradedRows.sort((a, b) => a["자동분류_점검등급"].localeCompare(b["자동분류_점검등급"]));

    const section = document.getElementById("uploadedExcelSection");
    section.classList.remove("hidden");
    document.getElementById("uploadedFileName").textContent = `📂 [${file.name}] 총 ${uploadedGradedRows.length.toLocaleString()}건 위험등급 자동 분류 완료`;

    const counts = { "0순위": 0, "1등급": 0, "2등급": 0, "4등급": 0 };
    uploadedGradedRows.forEach(r => {
      const g = r["자동분류_점검등급"].slice(0, 3);
      if (counts[g] !== undefined) counts[g]++;
    });

    document.getElementById("uploadedStatsCards").innerHTML = `
      <div class="p-3 rounded-xl bg-rose-50 border border-rose-200"><div class="text-xs text-rose-700 font-bold">0순위 즉시점검</div><div class="text-xl font-extrabold text-rose-800">${counts["0순위"]}건</div></div>
      <div class="p-3 rounded-xl bg-amber-50 border border-amber-200"><div class="text-xs text-amber-700 font-bold">1등급 원거리위험</div><div class="text-xl font-extrabold text-amber-800">${counts["1등급"]}건</div></div>
      <div class="p-3 rounded-xl bg-orange-50 border border-orange-200"><div class="text-xs text-orange-700 font-bold">2등급 관내나대지</div><div class="text-xl font-extrabold text-orange-800">${counts["2등급"]}건</div></div>
      <div class="p-3 rounded-xl bg-slate-50 border border-slate-200"><div class="text-xs text-slate-600 font-bold">기타 일반관리</div><div class="text-xl font-extrabold text-slate-800">${counts["4등급"]}건</div></div>
      <div class="p-3 rounded-xl bg-emerald-50 border border-emerald-200"><div class="text-xs text-emerald-700 font-bold">전체 분석건수</div><div class="text-xl font-extrabold text-emerald-800">${uploadedGradedRows.length}건</div></div>
    `;

    const cols = Object.keys(uploadedGradedRows[0]);
    document.getElementById("uploadedTableHead").innerHTML = `<tr>${cols.map(c => `<th class="px-3 py-2 font-semibold whitespace-nowrap">${c}</th>`).join("")}</tr>`;
    document.getElementById("uploadedTableBody").innerHTML = uploadedGradedRows.slice(0, 50).map(r => `
      <tr class="hover:bg-slate-50">
        ${cols.map(c => `<td class="px-3 py-2 whitespace-nowrap text-slate-700">${r[c]}</td>`).join("")}
      </tr>
    `).join("");

    section.scrollIntoView({ behavior: "smooth" });
  };
  reader.readAsArrayBuffer(file);
}

function downloadGradedVehiclesExcel() {
  if (!uploadedGradedRows.length) return;
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.json_to_sheet(uploadedGradedRows);
  XLSX.utils.book_append_sheet(wb, ws, "고위험군_점검대상");
  XLSX.writeFile(wb, `남양주시_개별차량_고위험군_분류결과_${new Date().toISOString().slice(0, 10)}.xlsx`);
}

// =========================================================================
// 6. 앱 초기화
// =========================================================================
window.addEventListener("load", () => {
  initMap();
  renderMapMarkers();
  renderSiteList();
  initCharts();
});
