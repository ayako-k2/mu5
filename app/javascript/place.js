function initAutocomplete() {
  const map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 35.681, lng: 139.767 },
    zoom: 13,
    mapTypeId: "roadmap",
  });

  const input = document.getElementById("pac-input");
  const searchBox = new google.maps.places.SearchBox(input);
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

  map.addListener("bounds_changed", () => {
    searchBox.setBounds(map.getBounds());
  });

  let markers = [];

  searchBox.addListener("places_changed", () => {
    const places = searchBox.getPlaces();

    if (places.length === 0) {
      return;
    }

    markers.forEach((marker) => {
      marker.setMap(null);
    });
    markers = [];

    const bounds = new google.maps.LatLngBounds();
    places.forEach((place) => {
      if (!place.geometry || !place.geometry.location) {
        console.log("Returned place contains no geometry");
        return;
      }

      const placeInfo = {
        name: place.name,
        category: place.types ? place.types.join(", ") : "N/A",
        address: place.formatted_address || "N/A",
        url: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.name)}&query_place_id=${place.place_id}`,
        website: place.website || "N/A",
        latitude: place.geometry.location.lat(),
        longitude: place.geometry.location.lng(),
        place_id: place.place_id,
        prefecture: extractPrefecture(place.formatted_address),
      };

      console.log("Extracted place info:", placeInfo);

      // Populate the form fields
      document.getElementById("name").value = placeInfo.name;
      document.getElementById("category").value = placeInfo.category;
      document.getElementById("address").value = placeInfo.address;
      document.getElementById("url").value = placeInfo.url;
      document.getElementById("website").value = placeInfo.website;
      document.getElementById("latitude").value = placeInfo.latitude;
      document.getElementById("longitude").value = placeInfo.longitude;
      document.getElementById("place_id").value = placeInfo.place_id;
      document.getElementById("prefecture").value = placeInfo.prefecture;

      if (place.geometry.viewport) {
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });

    map.fitBounds(bounds);
  });
}

// Prefecture extraction helper function
function extractPrefecture(address) {
  const prefectures = [
    "北海道", "青森県", "岩手県", "宮城県", "秋田県", "山形県", "福島県",
    "茨城県", "栃木県", "群馬県", "埼玉県", "千葉県", "東京都", "神奈川県",
    "新潟県", "富山県", "石川県", "福井県", "山梨県", "長野県", "岐阜県",
    "静岡県", "愛知県", "三重県", "滋賀県", "京都府", "大阪府", "兵庫県",
    "奈良県", "和歌山県", "鳥取県", "島根県", "岡山県", "広島県", "山口県",
    "徳島県", "香川県", "愛媛県", "高知県", "福岡県", "佐賀県", "長崎県",
    "熊本県", "大分県", "宮崎県", "鹿児島県", "沖縄県",
  ];

  for (const prefecture of prefectures) {
    if (address.includes(prefecture)) {
      return prefecture;
    }
  }
  return "不明";
}

document.addEventListener("DOMContentLoaded", initAutocomplete);


