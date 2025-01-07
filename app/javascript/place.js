import { typeToCategoryMap } from "./type_to_category_map";

document.addEventListener("turbo:load", function () {
  initializeMap();
});

function initializeMap() {
  const mapElement = document.getElementById("map");

  if (!mapElement) {
    return;
  }

  // 登録済みの場所を取得
  let places;
  try {
    places = JSON.parse(mapElement.getAttribute("data-places")) || [];
  } catch (error) {
    console.error("Invalid JSON format in data-places:", error);
    places = []; // デフォルト値
  }

  // 地図の初期設定
  const map = new google.maps.Map(mapElement, {
    center: { lat: 35.6895, lng: 139.6917 }, // 東京
    zoom: 12,
  });

  // 登録済みの場所にピンを立てる
  places.forEach((place) => {
    const marker = new google.maps.Marker({
      map: map,
      position: { lat: place.latitude, lng: place.longitude },
      title: place.name,
    });

    // 詳細情報の内容を作成
    const infoWindowContent = `
      <div>
        <h3>${place.name}</h3>
        <p><strong>住所:</strong> ${place.address}</p>
        <p><strong>カテゴリ:</strong> ${place.category || "なし"}</p>
        <p><a href="${place.url}" target="_blank">詳細を見る</a></p>
      </div>
    `;

    const infoWindow = new google.maps.InfoWindow({
      content: infoWindowContent,
    });

    // クリックイベントでInfoWindowを表示
    marker.addListener("click", () => {
      infoWindow.open(map, marker);
    });
  });



  // 以下、検索ボックスやその他のコードをそのまま使用
  const input = document.getElementById("mapSearchBox");
  const searchBox = new google.maps.places.SearchBox(input);
  const formElement = document.getElementById("place-form");
  let currentMarker = null;

  formElement.style.display = "none";

  map.addListener("bounds_changed", () => {
    searchBox.setBounds(map.getBounds());
  });

  searchBox.addListener("places_changed", () => {
    const places = searchBox.getPlaces();

    if (places.length === 0) {
      formElement.style.display = "none";
      alert("場所が見つかりませんでした。別の場所を検索してください。");
      return;
    }

    const place = places[0];
    formElement.style.display = "block";

    document.getElementById("category").value = getReadableCategory(place.types);
    function getReadableCategory(types) {
      if (!types || types.length === 0) return "カテゴリ不明";
      for (const type of types) {
        if (typeToCategoryMap[type]) {
          return typeToCategoryMap[type];
        }
      }
      return "その他";
    }

    document.getElementById("name").value = place.name || "";
    document.getElementById("prefecture").value =
      place.address_components?.find((comp) =>
        comp.types.includes("administrative_area_level_1")
      )?.long_name || "";
    document.getElementById("address").value = (place.formatted_address || "").replace(/^日本、\s*/, "");
    document.getElementById("url").value = place.url || "";
    document.getElementById("website").value = place.website || "";
    document.getElementById("latitude").value = place.geometry.location.lat();
    document.getElementById("longitude").value = place.geometry.location.lng();
    document.getElementById("place_id").value = place.place_id || "";

    if (currentMarker) {
      currentMarker.setMap(null);
    }

    currentMarker = new google.maps.Marker({
      map: map,
      position: place.geometry.location,
      title: place.name,
    });

    map.setCenter(place.geometry.location);
    map.setZoom(15);
  });
}